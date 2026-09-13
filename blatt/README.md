# Kopie-Blatt A4 quer

Ein weißes A4-Blatt im Querformat mit **nur drei Dingen**: groß „KOPIE",
darunter die E-Mail-Adresse und der QR-Code. Sonst nichts – kein Logo,
keine Adresse, keine Öffnungszeiten.

| Datei | Wofür |
|---|---|
| `phonetastic-email-blatt.pdf` | zum Drucken und Kopieren – eine Seite A4 quer (297 × 210 mm) |
| `phonetastic-email-blatt.png` | 3508 × 2480 px = A4 quer bei 300 dpi |

**Zur Seitengröße:** Die Gestaltung ist 1754 × 1240 px groß, das ist A4
quer bei 150 dpi. Chromium rechnet Pixelangaben im PDF aber mit 96 dpi
um – als Seitenmaß in Pixeln angegeben ergäbe das eine Seite von
464 × 328 mm, und der Drucker verteilt sie auf zwei Blätter. Darum wird
das PDF mit `format: 'A4', landscape: true` erzeugt und die Gestaltung
per `@media print` auf 0,639977 verkleinert (1122,5 CSS-Pixel ÷ 1754).
Nach jeder Änderung prüfen:

```bash
python3 -c "import re; d=open('phonetastic-email-blatt.pdf','rb').read(); \
  print([(round(float(v.split()[2])/72*25.4), round(float(v.split()[3])/72*25.4)) \
  for v in set(re.findall(rb'/MediaBox\s*\[([^\]]+)\]', d))])"
```

Darauf steht die **öffentliche** Adresse `info@phonetastic.at`, nicht das
Outlook-Postfach: Post an `info@` wird über KAS dorthin weitergeleitet,
und nur `info@` steht auch auf der Website und im Impressum.

Der QR-Code öffnet beim Scannen direkt eine neue E-Mail an diese Adresse
(`mailto:info@phonetastic.at`). Nachprüfen mit `python3 qr-pruefen.py` –
das Skript schneidet den Bereich um den Code aus, weil der Erkenner an
der ganzen A4-Seite scheitert.

Alles in Schwarz auf Weiß, damit das Blatt auf jedem Kopierer scharf
bleibt und wenig Toner braucht.

## Neu erzeugen

```bash
cd blatt
node render.js        # erzeugt PNG und PDF, prüft die Aufteilung
python3 qr-pruefen.py # liest den QR aus dem fertigen Blatt zurück
```

QR-Code neu bauen (nur nötig, wenn sich die Adresse ändert):

```bash
python3 -c "import segno; segno.make('mailto:info@phonetastic.at', error='m').save('qr-mail.svg', scale=10, border=2, dark='#000000', light='#ffffff')"
```
