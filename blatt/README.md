# E-Mail-Blatt A4

Ein weißes A4-Blatt mit der E-Mail-Adresse, zum Ausdrucken, Kopieren
oder Aufhängen im Geschäft.

| Datei | Wofür |
|---|---|
| `phonetastic-email-blatt.pdf` | zum Drucken und Kopieren (A4) |
| `phonetastic-email-blatt.png` | 2480 × 3508 (300 dpi), falls ein Bild gebraucht wird |

Darauf steht die **öffentliche** Adresse `info@phonetastic.at`, nicht das
Outlook-Postfach: Post an `info@` wird über KAS dorthin weitergeleitet,
und nur `info@` steht auch auf der Website und im Impressum.

Der QR-Code öffnet beim Scannen direkt eine neue E-Mail an diese Adresse
(`mailto:info@phonetastic.at`, aus dem fertigen Bild wieder ausgelesen).

Schrift ist Schwarz auf Weiß, damit das Blatt auch auf einem
Schwarz-Weiß-Kopierer scharf bleibt und wenig Toner braucht. Bewusst
**ohne Öffnungszeiten** – die stehen auf der Website und im
Google-Profil und ändern sich leichter als eine gedruckte Adresse.

## Neu erzeugen

```bash
cd blatt
node render.js   # erzeugt PNG und PDF, prüft die Aufteilung
```

QR-Code neu bauen (nur nötig, wenn sich die Adresse ändert):

```bash
python3 -c "import segno; segno.make('mailto:info@phonetastic.at', error='m').save('qr-mail.svg', scale=10, border=2, dark='#000000', light='#ffffff')"
```
