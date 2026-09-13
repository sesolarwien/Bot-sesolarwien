# Kopie-Blatt A4 quer

Ein weißes A4-Blatt im Querformat mit **nur drei Dingen**: groß „KOPIE",
darunter die E-Mail-Adresse und der QR-Code. Sonst nichts – kein Logo,
keine Adresse, keine Öffnungszeiten.

| Datei | Wofür |
|---|---|
| `phonetastic-email-blatt.pdf` | zum Drucken und Kopieren – eine Seite A4 quer (297 × 210 mm) |
| `phonetastic-email-blatt.png` | 3508 × 2480 px = A4 quer bei 300 dpi |

**Zur Seitengröße:** Das Blatt ist direkt in Millimetern aufgebaut
(297 × 210 mm) und damit exakt so groß wie die Druckseite – nichts wird
umgerechnet oder nachträglich verkleinert. Ringsum bleiben mindestens
14 mm frei, mehr als jeder Drucker als nicht bedruckbaren Rand braucht.

Früher war die Seitengröße in Pixeln angegeben. Chromium rechnet die mit
96 dpi um, wodurch eine Seite von 464 × 328 mm entstand, die der Drucker
auf mehrere Blätter verteilt hat.

`pdf-pruefen.py` rendert das fertige PDF Seite für Seite und meldet,
wenn es mehr als eine Seite hat, die Seite nicht A4 quer ist oder der
QR-Code nicht vollständig und lesbar auf Seite 1 liegt.

## Drucken

Das **PDF** ausdrucken, nicht das PNG – ein Bild hat keine Seitengröße,
und Bildbetrachter skalieren es beliebig. Im Druckdialog:

* Papier **A4**
* Ausrichtung **Querformat** (steht im PDF, manche Drucker fragen trotzdem)
* Größe **100 % / Tatsächliche Größe** oder **An Seite anpassen**
* **Beidseitig ausschalten**, sonst bleibt die Rückseite unnötig belegt

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
