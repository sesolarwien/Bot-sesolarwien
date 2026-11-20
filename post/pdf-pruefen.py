#!/usr/bin/env python3
"""
Prueft die fertigen Flyer-PDF: genau eine Seite, Format A4 hoch, und das
Motiv reicht bis an alle vier Kanten (kein weisser Streifen).

Aufruf:  python3 pdf-pruefen.py
"""

import glob
import os
import sys

import numpy as np
import pypdfium2 as pdfium

DPI = 150
TOLERANZ_MM = 0.5          # so viel Abweichung von A4 ist unkritisch
RAND_MM = 0.5              # so viel weisser Rand ist noch in Ordnung

A4 = (210.0, 297.0)
hier = os.path.dirname(os.path.abspath(__file__))
fehler = []

dateien = sorted(glob.glob(os.path.join(hier, '*flyer-a4.pdf')))
if not dateien:
    sys.exit('Keine Flyer-PDF gefunden – zuerst "node pdf.js" laufen lassen.')

for pfad in dateien:
    name = os.path.basename(pfad)
    doc = pdfium.PdfDocument(pfad)

    if len(doc) != 1:
        fehler.append('%s: %d Seiten statt einer' % (name, len(doc)))

    breite_pt, hoehe_pt = doc[0].get_size()
    breite_mm = breite_pt / 72 * 25.4
    hoehe_mm = hoehe_pt / 72 * 25.4
    if (abs(breite_mm - A4[0]) > TOLERANZ_MM
            or abs(hoehe_mm - A4[1]) > TOLERANZ_MM):
        fehler.append('%s: %.1f x %.1f mm statt %.0f x %.0f mm'
                      % (name, breite_mm, hoehe_mm, *A4))

    # Motiv bis an die Kante? Nicht-weisse Pixel suchen.
    bild = doc[0].render(scale=DPI / 72).to_numpy()[:, :, :3]
    motiv = (bild < 248).any(axis=2)
    if not motiv.any():
        fehler.append('%s: Seite ist leer' % name)
        continue
    zeilen = np.where(motiv.any(axis=1))[0]
    spalten = np.where(motiv.any(axis=0))[0]
    mm = lambda px: px / DPI * 25.4
    raender = {
        'oben': mm(zeilen[0]),
        'unten': mm(bild.shape[0] - 1 - zeilen[-1]),
        'links': mm(spalten[0]),
        'rechts': mm(bild.shape[1] - 1 - spalten[-1]),
    }
    zu_viel = {k: v for k, v in raender.items() if v > RAND_MM}
    if zu_viel:
        fehler.append('%s: weisser Streifen – %s' % (
            name, ', '.join('%s %.2f mm' % (k, v) for k, v in zu_viel.items())))

    print('%-42s %d Seite  %.1f x %.1f mm  Raender: %s'
          % (name, len(doc), breite_mm, hoehe_mm,
             ' '.join('%s %.2f' % (k, v) for k, v in raender.items())))

print()
if fehler:
    print('PROBLEME:')
    for f in fehler:
        print('  ! ' + f)
    sys.exit(1)
print('Alle Flyer-PDF in Ordnung: eine Seite, A4 hoch, randlos.')
