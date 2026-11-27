# 🛠️ Aktueller Auftrag für Claude auf dem Mac

> Diese Datei ist die Arbeitsanweisung. Wenn du sie liest: führ sie aus.

---

## Ausgangslage

Der bisherige Mac-Ordner `~/Downloads/Bot--claude-modest-hopper-6U1Xe`
ist ein **ZIP-Download ohne Git** und mehrere Monate alt. Deshalb fehlen
dort die neueren Workflows (13, restore-from-docs) und der
Finanzierungs-Block in Workflow 4.

Der aktuelle Stand liegt auf GitHub:
**https://github.com/sesolarwien/Bot-sesolarwien**
Branch: **`claude/modest-hopper-6U1Xe`** (nicht main!)

**Die gerenderten Dachbilder sind NICHT verloren.** Sie stecken als
Base64 in den Seiten unter `docs/` und werden von
`workflows/restore-from-docs.mjs` wieder herausgeholt. Es muss also
nichts neu gerendert werden (spart fal.ai-Guthaben).

---

## Aufgaben

- [ ] **1. Frisch klonen** (in den Home-Ordner, als `solar`):

      cd ~
      git clone -b claude/modest-hopper-6U1Xe https://github.com/sesolarwien/Bot-sesolarwien solar
      cd solar/solar-leads

- [ ] **2. ⚠️ WICHTIG: Die `.env` mitnehmen.** Sie enthält die API-Keys
      und liegt absichtlich nicht auf GitHub. Aus dem alten Ordner kopieren:

      cp ~/Downloads/Bot--claude-modest-hopper-6U1Xe/solar-leads/.env ~/solar/solar-leads/.env

      Falls dort keine `.env` liegt: suchen mit
      `find ~ -name ".env" -path "*solar-leads*"`.
      Wenn es wirklich keine gibt → Semih fragen, nicht weitermachen.
      Ohne `GOOGLE_MAPS_API_KEY` schlägt Schritt 5 fehl.

- [ ] **3. Pakete installieren:**  `npm install`

- [ ] **4. Bilder zurückholen:**  `node workflows/restore-from-docs.mjs`
      Erwartet: 15 Häuser, 30 PNG-Dateien, `output/adressen.txt`.

- [ ] **5. Wirtschaftlichkeit neu berechnen.** Die alten Werte (bis
      95 kWp) stammen aus der Zeit vor dem `MAX_HOME_KWP`-Deckel:

      while IFS= read -r a; do node workflows/01-fetch-property.mjs "$a"; done < output/adressen.txt

      Danach prüfen: In `output/prospects.json` darf **kein**
      `system_size_kwp` über ~12 stehen.
      (Workflow 1 überschreibt nur `<slug>.png` — die `-rendered.png`
      bleiben erhalten. Das ist so gewollt.)

- [ ] **6. Microsites neu bauen:**  `node workflows/04-build-microsite.mjs`
      Kontrolle: im erzeugten HTML muss `Monatsrate` vorkommen
      (das ist der neue Finanzierungs-Block).

- [ ] **7. Demo-Bild für die Akquise-Mails:**
      `node workflows/13-email-demo.mjs`
      Ergebnis: `output/<haus>-email.jpg` (Vorher/Nachher nebeneinander).

- [ ] **8. Demo ausmisten.** Nur die **5 überzeugendsten** Häuser kommen
      nach `docs/`. Kriterien:
      - echtes Einfamilienhaus (kein Wohnblock, kein Gewerbe, keine Baustelle)
      - Panels sitzen sauber auf dem **Zieldach**, nicht auf Nachbarhäusern
        oder der Straße
      - realistische Anlagengröße (etwa 5–12 kWp)

      **Muss rein:** `himmelstrasse-45-1190-wien` (bestes Bild)
      **Muss raus:** `mariahilfer-str-12`, `ketzergasse-14`,
      `kalksburger-str-34`, `perchtoldsdorfer-str-12`

      Bei den übrigen: Renders selbst anschauen und entscheiden.
      Lieber 5 gute als 15 durchwachsene.

- [ ] **9.** `docs/index.html` an die verbleibenden Häuser anpassen
      (keine toten Links).

- [ ] **10.** Committen und auf `claude/modest-hopper-6U1Xe` pushen.

- [ ] **11.** Semih berichten: Welche 5 Häuser sind übrig? Welche kWp-Werte
      haben sie jetzt? Laden die Seiten unter
      `https://sesolarwien.github.io/Bot-sesolarwien/`?

---

## Hinweise

- `.env` **niemals** committen (steht in `.gitignore`).
- Bei Push-Konflikt: `git pull --rebase`, dann erneut pushen.
- Der alte Ordner `~/Downloads/Bot--claude-modest-hopper-6U1Xe` kann
  bleiben, wo er ist — aber ab jetzt wird in `~/solar` gearbeitet.
  Erst löschen, wenn alles oben funktioniert hat.
