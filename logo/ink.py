"""Findet die tatsächliche Fläche der Schrift im fertigen Bild.

Vergleicht jeden Bildpunkt mit einer stark weichgezeichneten Fassung:
Wo der Unterschied groß ist, steht Schrift – das funktioniert sowohl auf
dem dunklen Verlauf als auch auf Weiß.
"""
import sys, cv2, numpy as np

for f in sys.argv[1:]:
    img = cv2.imread(f).astype(np.int16)
    weich = cv2.GaussianBlur(img, (0, 0), 40).astype(np.int16)
    diff = np.abs(img - weich).max(axis=2)
    # Am Bildrand erzeugt die Weichzeichnung selbst Unterschiede, und
    # weiche Verläufe im Hintergrund ebenso – darum ein Rand ohne
    # Auswertung und eine Schwelle, die nur Schriftkanten trifft.
    rand = 12
    diff[:rand, :] = 0; diff[-rand:, :] = 0
    diff[:, :rand] = 0; diff[:, -rand:] = 0
    ys, xs = np.nonzero(diff > 55)
    h, w = diff.shape
    print(f)
    if len(xs) == 0:
        print('  nichts gefunden'); continue
    print(f'  Schrift: x {xs.min()}–{xs.max()}   y {ys.min()}–{ys.max()}')
    print(f'  Rand: links {xs.min()}  rechts {w - xs.max()}  oben {ys.min()}  unten {h - ys.max()}')
    print(f'  Versatz zur Mitte: x {(xs.min()+xs.max())/2 - w/2:+.0f}  y {(ys.min()+ys.max())/2 - h/2:+.0f}')
    if abs(w - h) < 2:   # quadratisch: bleibt alles im runden Beschnitt?
        import numpy as np2
        r = np2.hypot(xs - w/2, ys - h/2).max()
        rand = 'PASST' if r < w/2 - 20 else 'ZU NAH AM RUNDEN BESCHNITT'
        print(f'  weitester Punkt: {r:.0f} von {w/2:.0f}  → {rand}')
