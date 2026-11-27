# 🛠️ Aktueller Auftrag für Claude auf dem Mac

> Diese Datei ist die Arbeitsanweisung. Wenn du sie liest: führ sie aus.
> Danach den erledigten Teil hier abhaken.

---

## Ziel

Die öffentliche Demo (`docs/`) versandfertig machen, damit sie an
Solar-Installateure geschickt werden kann. Sie ist aktuell veraltet
und teilweise unbrauchbar.

## Ausgangslage (geprüft am 27.11.)

**Problem 1 — unrealistische Anlagengrößen.** Vier Seiten zeigen
38, 42, 57 und **95 kWp**. Das sind keine Einfamilienhäuser, sondern
Wohnblöcke, Gewerbe und eine Baustelle. Diese Werte stammen aus der
Zeit vor dem `MAX_HOME_KWP`-Deckel in Workflow 1. Ein Installateur
erkennt das sofort — Glaubwürdigkeit weg.

**Problem 2 — kein Finanzierungs-Block.** Keine Seite zeigt den neuen
Block „Monatsrate − Stromersparnis = Eigenaufwand". Der kommt über
Workflow 4.

**Problem 3 — Render-Qualität schwankt.** Bei vielen Häusern liegen
die Panels nicht auf dem Zieldach, sondern über Nachbardächern,
Straßen oder einer Baustelle.

---

## Aufgaben

- [ ] **1.** Prüfen, ob in `output/prospects.json` noch die alten
      Wirtschaftlichkeitswerte stehen (38/42/57/95 kWp). Wenn ja: die
      betroffenen Häuser mit **Workflow 1** neu berechnen, damit der
      kWp-Deckel und die korrigierte Eigenverbrauchs-Logik greifen.
      Achtung: Workflow 1 überschreibt nur `<slug>.png`, die
      gerenderten Bilder (`<slug>-rendered.png`) bleiben erhalten.

- [ ] **2.** Microsites neu bauen:
      `node workflows/04-build-microsite.mjs`
      Danach stichprobenartig prüfen, dass der Finanzierungs-Block
      drin ist (im HTML nach `Monatsrate` suchen).

- [ ] **3.** Demo-Bild für die Akquise-Mails erzeugen:
      `node workflows/13-email-demo.mjs`
      Ergebnis: `output/<haus>-email.jpg` — Vorher/Nachher nebeneinander.

- [ ] **4.** **Demo ausmisten.** Nur die **5 überzeugendsten** Häuser
      bleiben in `docs/`. Kriterien:
      - echtes Einfamilienhaus (kein Wohnblock, kein Gewerbe)
      - Panels sitzen sauber auf dem **Zieldach**, nicht auf
        Nachbarhäusern oder der Straße
      - realistische Anlagengröße (etwa 5–12 kWp)

      **Muss rein:** `himmelstrasse-45-1190-wien` (bestes Bild)
      **Muss raus:** `mariahilfer-str-12`, `ketzergasse-14`,
      `kalksburger-str-34`, `perchtoldsdorfer-str-12`

      Bei den übrigen: Renders selbst anschauen und entscheiden.
      Lieber 5 gute als 15 durchwachsene.

- [ ] **5.** `docs/index.html` an die verbleibenden Häuser anpassen
      (keine toten Links).

- [ ] **6.** Committen und pushen.

- [ ] **7.** Rückmeldung an Semih: Welche 5 Häuser sind übrig, und
      laden die Seiten unter
      `https://sesolarwien.github.io/Bot-sesolarwien/` wirklich?

---

## Hinweise

- `.env` nie committen.
- Der Branch ist `claude/modest-hopper-6U1Xe`.
- Bei Push-Konflikt: `git pull --rebase`, dann erneut pushen.
- Die gerenderten Bilder in `output/` gibt es **nur auf diesem Mac**
  (absichtlich nicht auf GitHub). Nicht löschen.
