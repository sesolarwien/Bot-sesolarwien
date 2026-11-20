"""Prüft das fertige PDF so, wie es beim Drucken ankommt.

Rendert jede Seite als Bild und kontrolliert:
  – wie viele Seiten das PDF hat (es muss genau eine sein),
  – wie groß die Seite ist (A4 quer: 297 × 210 mm),
  – ob der QR-Code vollständig auf Seite 1 liegt und sich lesen lässt.
"""
import cv2
import pypdfium2 as pdfium

doc = pdfium.PdfDocument('phonetastic-email-blatt.pdf')
fehler = []

if len(doc) != 1:
    fehler.append(f'{len(doc)} Seiten statt einer – der Drucker verteilt das Blatt')
print('Seiten:', len(doc))

for i, seite in enumerate(doc):
    b, h = seite.get_size()
    breite_mm, hoehe_mm = round(b / 72 * 25.4), round(h / 72 * 25.4)
    print(f'  Seite {i + 1}: {breite_mm} × {hoehe_mm} mm')
    if (breite_mm, hoehe_mm) != (297, 210):
        fehler.append(f'Seite {i + 1} ist {breite_mm} × {hoehe_mm} mm, nicht A4 quer')
    seite.render(scale=1.6).to_pil().save(f'pruefung-seite-{i + 1}.png')

# QR auf der ersten Seite suchen; auf der ganzen Seite scheitert der
# Erkenner, weil er stark verkleinert – darum nur der untere Bereich.
img = cv2.imread('pruefung-seite-1.png')
h, w = img.shape[:2]
aus = img[int(h * 0.55):h, int(w * 0.28):int(w * 0.72)]
ok, txt, *_ = cv2.QRCodeDetector().detectAndDecodeMulti(aus)
print('QR auf Seite 1:', txt[0] if ok else 'NICHT GEFUNDEN')
if not ok or txt[0] != 'mailto:info@phonetastic.at':
    fehler.append('QR-Code auf Seite 1 nicht lesbar')

print('\n' + ('\n'.join('FEHLER: ' + f for f in fehler) if fehler else 'alles in Ordnung'))
