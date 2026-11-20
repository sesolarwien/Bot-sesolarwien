#!/usr/bin/env python3
"""
Baut aus den fertigen Flyer-PNG die Druck-PDF.

Warum nicht direkt aus dem HTML drucken: Chromium wertet beim PDF-Druck
"-webkit-background-clip: text" nicht aus. Der Neon-Verlauf, der nur in
den Buchstaben von PHONETASTIC stehen soll, lief dadurch ueber die ganze
Seite, und der Schriftzug war auf dem Verlauf fast unsichtbar. Im PNG
stimmt die Darstellung, also wird das PNG auf die Seite gelegt.

Die PNG sind 2480 x 3508 px. Bei 300 dpi ergibt das genau 210 x 297 mm,
also A4 ohne Umrechnen.

Aufruf:  python3 pdf.py
"""

import os
import sys

from PIL import Image

DPI = 300
A4_PX = (2480, 3508)

PAARE = [
    ('phonetastic-eroeffnung-flyer-a4.png', 'phonetastic-eroeffnung-flyer-a4.pdf'),
    ('phonetastic-einladung-flyer-a4.png', 'phonetastic-einladung-flyer-a4.pdf'),
]

hier = os.path.dirname(os.path.abspath(__file__))

for quelle, ziel in PAARE:
    pfad = os.path.join(hier, quelle)
    if not os.path.exists(pfad):
        sys.exit('Fehlt: %s – zuerst "node render.js" laufen lassen.' % quelle)

    bild = Image.open(pfad)
    if bild.size != A4_PX:
        sys.exit('%s ist %d x %d px, erwartet %d x %d px.'
                 % (quelle, *bild.size, *A4_PX))

    # Ohne Alphakanal, sonst legt Pillow die Seite auf Schwarz.
    if bild.mode != 'RGB':
        hintergrund = Image.new('RGB', bild.size, 'white')
        hintergrund.paste(bild, mask=bild.split()[-1] if 'A' in bild.mode else None)
        bild = hintergrund

    bild.save(os.path.join(hier, ziel), 'PDF', resolution=DPI)
    mm = (bild.width / DPI * 25.4, bild.height / DPI * 25.4)
    print('%-42s -> %-42s %.0f x %.0f mm' % (quelle, ziel, *mm))

print('\nZum Pruefen: python3 pdf-pruefen.py')
