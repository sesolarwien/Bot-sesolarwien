"""Liest den QR-Code aus dem fertigen Blatt wieder aus.

Auf der ganzen A4-Seite scheitert der Erkenner, weil er das Bild
vorher stark verkleinert – darum wird der Bereich um den Code
ausgeschnitten und dort gesucht.
"""
import cv2

img = cv2.imread('phonetastic-email-blatt.png')
h, w = img.shape[:2]
aus = img[int(h * 0.58):int(h * 0.92), int(w * 0.50):int(w * 0.85)]
ok, txt, *_ = cv2.QRCodeDetector().detectAndDecodeMulti(aus)
print('QR lesbar:', ok, txt if ok else '')
