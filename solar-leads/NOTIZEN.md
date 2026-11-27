# 📌 Notizen & Verbesserungen — Solar-Lead-System

Gesammelte Erkenntnisse und nächste Verbesserungen. Lebendiges Dokument.

---

## ⚖️ 1. Rechtssicherheit (DSGVO / Österreich) — WICHTIG

**Grundsatz:** Adressierte Postwerbung darf auf **„berechtigtes Interesse"**
(Art. 6 (1) f DSGVO, Erwägungsgrund 47) gestützt werden — der rechtlich
einfachste Werbekanal (anders als E-Mail/Telefon = brauchen Einwilligung).

**Pflichten (unabhängig vom Versanddienst):**
- Adressen nur aus rechtmäßiger Quelle (OSM/öffentliche Daten; Eigentümer aus Grundbuch nur mit Sorgfalt)
- Informationspflicht (Art. 14) erfüllen
- **Robinsonliste** (WKO) prüfen + Widerspruch/Opt-out respektieren
- Absender + Opt-out auf jeder Karte (✅ bereits drauf)

**Beim Druck-/Versanddienst (POKAmax, EchtPost, Lettershop):**
- **Auftragsverarbeitungsvertrag (AVV)** abschließen — sie verarbeiten Adressen
  in unserem Auftrag. EU-Anbieter (DE) ist DSGVO-mäßig besser als US-Dienst.

**Vor großem Versand:** einmal von österr. DSGVO-Anwalt absegnen lassen.

### Haftung vermeiden (Punkt "Genauigkeit/Vertrauen")
Nie etwas Verbindliches versprechen — nur **einladen** (wie die US-Anbieter):
- Render-Bild beschriften: **„So könnte Ihr Dach mit Solar aussehen —
  unverbindliche Visualisierung"**
- ROI immer als **„Schätzwerte — finale Auslegung durch den Installateur"**
- Nie „Sie sparen X €", sondern **„bis zu / typischerweise"**
- CTA = **kostenlose, unverbindliche Beratung** (echte Zahlen macht der Installateur vor Ort)

---

## 💼 2. Zwei Geschäftsmodelle (man kann beides anbieten)

**Modell A — Termin-/Lead-Agentur (Originalplan)**
- Wir fahren die Kampagnen selbst, erzeugen qualifizierte Termine,
  **verkaufen Termine** an Installateure (Pay-per-Termin / Provision).
- + höhere Marge pro Abschluss  − wir tragen Kosten + Conversion-Risiko, mehr Operations.

**Modell B — System als Service vermieten (wie reworked.ai)**
- Wir bieten Installateuren unser **System** an. Sie wählen einen Bezirk,
  unser System verschickt die personalisierten Postkarten **unter ihrer Marke**,
  Termine gehen direkt an sie. Abrechnung pro Haus / Monatspaket.
- + planbarer/wiederkehrender Umsatz, weniger Risiko/Operations für uns,
  leichteres „Ja" (Tool statt unbewiesener Leads)  − weniger Wert pro Einheit.

**Empfehlung:** Mit A starten, um Conversion zu beweisen → dann B als
skalierbares, wiederkehrendes Modell (oder beides parallel anbieten).

---

## 🖼️ 3. Bild-Qualität — KAPITEL ABGESCHLOSSEN (20.06.)

**Entscheidung:** Produktions-Render = **Workflow 3 (Flux Kontext, ganzes Bild)**
— Stand von letzter Woche. Das ist die beste Qualität, die wir hinbekommen.

Getestet & VERWORFEN (brachten KEINE Verbesserung):
- Straßenansicht (W11): in AT oft Dach nicht sichtbar / Haus verdeckt
- Dach-Maske + Flux Fill (W3c): Inpainting erzeugte keine sichtbaren Panels
- Hybrid Kontext + Masken-Composite: Panels zu blass, schlechter als W3
- Geometrischer Render (W3b): sah künstlich aus

-> Experiment-Workflows bleiben im Repo, werden aber NICHT genutzt.
Falls je nötig: nur Workflow 3 verwenden. Kapitel Rendern ist zu.

Die guten Renders von letzter Woche stecken bereits in der Live-Demo (docs/).

---

## 🧪 4. Test-Plan (billig herausfinden, ob es funktioniert)

Bevor groß investiert wird — zwei Dinge beweisen (~200–400 €, 2 Wochen):
1. **Verkaufs-Test:** mit 5 lokalen Installateuren reden, Demo zeigen.
   Sagt einer „Ja, dafür zahle ich X €"? → starkes Signal.
2. **Conversion-Test:** 50–100 echte Karten in 1 Bezirk. Messen: QR-Scans, Buchungen.

Benchmarks (US): Antwortquote **3–5 %**, Abschluss **3,2× besser als Online-Ads**,
Kosten ~2,7–4,5 $/Haus.

---

## ⚠️ 5. Live-Demo ist veraltet — VOR dem Versand an Firmen erneuern!

Geprüft am 27.11.: die 15 Seiten in `docs/` stammen aus einer alten Version.

**Zwei Probleme:**
1. **Unrealistische Anlagengrößen** auf 4 Seiten: 38 / 42 / 57 / **95 kWp**.
   Das sind keine Einfamilienhäuser, sondern Wohnblöcke/Gewerbe. Ein
   Installateur sieht das sofort → Glaubwürdigkeit weg. (Der `MAX_HOME_KWP`-
   Deckel kam erst nach diesen Renders.)
2. **Kein Finanzierungs-Block** (Monatsrate) auf irgendeiner Seite.

**Render-Qualität schwankt stark** (Stichprobe aller 15):
- Gut, Panels sauber auf dem Zieldach: **himmelstrasse-45** ⭐ (bestes Bild),
  cobenzlgasse-40, rodauner-str-6
- Schlecht, Panels über Nachbardächer/Straße/Baustelle verteilt:
  kalksburger-str-34, mariahilfer-str-12, ketzergasse-14, khekgasse-20,
  perchtoldsdorfer-str-12 + 18, hardtgasse-30, esslinger-hauptstrasse-50

**To-do auf dem Mac:** Adressen auf echte Einfamilienhäuser beschränken,
Workflow 1 + 3 + 4 neu laufen lassen, **nur die 5 besten** nach `docs/`
kopieren. Lieber 5 überzeugende als 15 durchwachsene.

---

## ⚖️ 6. E-Mail-Akquise in Österreich — § 174 TKG 2021

Werbe-E-Mail **ohne vorherige Zustimmung ist unzulässig — auch B2B**.
Kein Unternehmer-Ausnahmetatbestand im Gesetz. Bis 50.000 € Strafe
(Fernmeldebüro). Dasselbe gilt für Werbeanrufe.

**Sichere Reihenfolge:** 1) Kontaktformular der Firma → 2) Telefonat, dann
Mail auf Wunsch (= Zustimmung) → 3) erst zuletzt direkte Kalt-Mail, einzeln
und personalisiert, nie als Serienmail. Vorher **ECG-Liste (ecg.rtr.at)**
prüfen.

Details + fertige Texte: `AKQUISE-EMAIL-KOMPLETT.md`

---

## ✅ Status (Stand der Technik)
Komplett gebaut: W1 Analyse · W2 Adressen sammeln · W3 KI-Render ·
W4 Microsite · W5 Postkarte · W6 Angebot · W7 Video · W8 Mailing-Export ·
W9 Versand (EchtPost + POKAmax) · W10 PDF. Live-Demo auf GitHub Pages.
Offen: Versanddienst-Freischaltung, Eigentümer-Namen (optional), Dashboard.
