# Logo und Profilbild

Alle Dateien tragen die Wortmarke bzw. das Zeichen im Neon-Verlauf
grün → blau.

## Rund – für das Instagram-Profilbild (1080 × 1080)

Instagram schneidet das Quadrat rund zu und zeigt es klein an: 150 px im
Profil am Rechner, 110 px in der App, 56 px im Feed, 32 px bei
Kommentaren. Alles Wichtige bleibt darum im inneren Kreis.

| Datei | Variante | Leistungen enthalten? |
|---|---|---|
| `phonetastic-profilbild-e-siegel-p.png` | **E** – Siegel mit P | ja, als Ring · lesbar ab ~150 px |
| `phonetastic-profilbild-f-siegel-handy.png` | **F** – Siegel mit Handy | ja, als Ring · lesbar ab ~150 px |
| `phonetastic-profilbild-a-monogramm.png` | **A** – P auf Dunkel | nein · bis 32 px erkennbar |
| `phonetastic-profilbild-c-handy.png` | **C** – P im Handy | nein · bis 32 px erkennbar |
| `phonetastic-profilbild-b-wortmarke.png` | **B** – PHONE / TASTIC | nein · bis 56 px lesbar |
| `phonetastic-profilbild-d-hell.png` | **D** – P auf Weiß | nein · Kreisrand auf Weiß unsichtbar |
| `phonetastic-profilbild-vergleich.png` | Übersicht | alle Varianten in allen Größen |

Die vier Leistungen passen nur als Ring ins runde Bild, und dieser Ring
ist unterhalb von etwa 110 px nicht mehr lesbar. Im Feed und in
Kommentaren wirkt er dann als Muster. Wer die Leistungen überall lesbar
braucht, schreibt sie zusätzlich in den Instagram-Namen und die Bio –
beide stehen direkt neben dem Profilbild.

## Quer – für Schild, Website-Kopf, Flyer, Briefpapier (2400 × 760)

| Datei | Grund |
|---|---|
| `phonetastic-logo-quer-dunkel.png` | dunkel |
| `phonetastic-logo-quer-hell.png` | weiß |

Hier stehen Zeichen, Wortmarke und die Zeile
„Reparatur · Zubehör · An- & Verkauf · SIM-Karten" nebeneinander und
sind in jeder sinnvollen Größe lesbar.

## Neu erzeugen / ändern

```bash
cd logo
node render.js                                      # alle PNG
python3 mitte.py phonetastic-profilbild-[a-f]*.png  # Mitte und Kreisrand
python3 ink.py phonetastic-logo-quer-*.png          # Ränder im Querformat
```

`mitte.py` sucht die farbigen Pixel im fertigen Bild und meldet, wie weit
das Zeichen aus der Mitte steht und wie nah es dem runden Beschnitt
kommt. `ink.py` findet über einen Vergleich mit der weichgezeichneten
Fassung die tatsächliche Fläche der Schrift – damit wurden die Ränder im
Querformat ausgeglichen (das Handy-Zeichen hat in seiner Zeichenfläche
links Luft, die Gruppe stand dadurch 18 px zu weit rechts).

Ein „P" sitzt außerdem in seinem Schriftkasten nicht mittig; die
gemessene Korrektur steht als `transform` bei `.mono` in `logo.html`.

Die Vorschau in Originalgrößen liegt in `vorschau.html`.
