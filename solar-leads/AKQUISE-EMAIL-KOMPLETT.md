# 📧 Die Akquise-E-Mail — komplett, zum Kopieren

Eine fertige E-Mail an Solar-Installateure, mit Demo-Bild direkt im Text.
Du ersetzt nur die **[eckigen Klammern]**.

---

## ⚠️ Zuerst lesen: So verschickst du sie rechtssicher

In Österreich ist **Werbe-E-Mail ohne vorherige Zustimmung verboten** — auch
an Firmen (§ 174 TKG 2021). Strafrahmen bis 50.000 €, zuständig ist das
Fernmeldebüro. Es gibt keine B2B-Ausnahme im Gesetzestext.

**Was das praktisch heißt — die sichere Reihenfolge:**

| Weg | Risiko | Empfehlung |
|---|---|---|
| **1. Kontaktformular auf deren Website** | ✅ sehr gering | **So startest du.** Die Firma stellt das Formular hin, um kontaktiert zu werden. |
| **2. Anruf, dann Mail auf Wunsch** | ✅ gering | Am Telefon sagt er „schicken Sie mir was" → **jetzt hast du die Zustimmung.** |
| **3. Direkte Kalt-Mail** | ⚠️ formal unzulässig | Nur einzeln + personalisiert, nie als Serienmail. |

👉 **Mein Rat:** Nimm für die ersten Firmen das **Kontaktformular** (Kurzversion
unten) oder ruf an. Beides bringt ohnehin mehr Antworten als eine Kalt-Mail.

**Außerdem:** Vor unaufgeforderten Mails die **ECG-Liste der RTR**
(ecg.rtr.at) prüfen — wer dort steht, darf nicht angeschrieben werden.

**Und ganz wichtig, unabhängig vom Recht:** Verschick die Mail **nie an alle
gleichzeitig**. Einzeln, 5–8 pro Tag, jede mit dem richtigen Namen und Gebiet.
Eine erkennbare Serienmail wird weder gelesen noch beantwortet.

---

## ✉️ Die E-Mail

### Betreffzeile (eine auswählen)

- `Solar-Termine in [Gebiet] – persönliche Dachbilder statt Flyer`
- `[Firmenname]: vorqualifizierte PV-Termine in [Gebiet]?`
- `Frage zur Zusammenarbeit – Solar-Beratungstermine [Gebiet]`

> Nicht verwenden: „Kooperationsanfrage", „Neukundengewinnung",
> „Leads" — das riecht nach Massenmail und landet im Spam.

---

### Der Text

```
Guten Tag Herr/Frau [Nachname],

ich schreibe Ihnen, weil Sie in [Gebiet, z. B. Wien-Döbling und Umgebung]
arbeiten — genau dort läuft gerade mein Projekt.

Kurz, worum es geht: Ich schreibe Einfamilienhaus-Besitzer per Post an.
Nicht mit einem Flyer, sondern mit einem Bild ihres eigenen Dachs —
einmal so wie es heute aussieht, einmal mit Solaranlage. Dazu die
berechneten Zahlen für genau dieses Dach.

        [HIER DAS DEMO-BILD EINFÜGEN]

Das Haus oben ist echt. Dachfläche, Ausrichtung und Ertrag stammen aus
Vermessungsdaten, nicht aus einer groben Schätzung.

Wer auf so eine Karte reagiert, hat sich mit dem Thema schon beschäftigt.
Diese Beratungstermine gebe ich exklusiv an einen Installateur pro Gebiet
weiter — nicht an fünf gleichzeitig.

So sieht die persönliche Seite aus, auf der der Hausbesitzer landet:
[DEMO-LINK]

Für den Anfang würde ich es Ihnen einfach beweisen: Ich übernehme die
Kosten für die ersten 50 Häuser, und die ersten zwei Termine bekommen
Sie kostenlos. Kommt nichts dabei heraus, haben Sie nichts verloren.

Hätten Sie diese Woche 10 Minuten für ein kurzes Telefonat?

Beste Grüße
[Dein Name]

[Markenname]
[Telefon] · [E-Mail]
[Website]
```

---

### Was du in jeder Mail änderst (dauert 2 Minuten)

1. **[Nachname]** — vom Impressum oder der Team-Seite. Niemals „Sehr geehrte
   Damen und Herren" — das ist das Erkennungszeichen einer Massenmail.
2. **[Gebiet]** — der Bezirk, in dem die Firma tatsächlich arbeitet.
3. **Erster Satz** — ein konkreter Bezug zur Firma. Zum Beispiel:
   *„…weil Sie laut Ihrer Website vor allem Einfamilienhäuser machen"* oder
   *„…weil Sie in Döbling schon einige Anlagen gebaut haben."*

Mehr nicht. Der Rest bleibt gleich.

---

## 🖼️ Das Demo-Bild

Erzeugen (im Ordner `solar-leads/`):

```
node workflows/13-email-demo.mjs
```

Ergebnis: `output/<haus>-email.jpg` — links das Dach heute, rechts mit
Solaranlage, unten deine Marke und die echten Werte.

**So kommt es in die Mail:** Bild **in den Text ziehen** (Gmail und Outlook
betten es dann ein), nicht als Dateianhang anhängen. Ein Anhang wird oft gar
nicht geöffnet — und reine Anhänge erhöhen die Spam-Wahrscheinlichkeit.

> ⚠️ **Nur ein Bild pro Mail.** Mehrere Bilder + Links = Spamfilter.

---

## 💬 Kurzversion für das Kontaktformular (empfohlener Start)

Formulare haben oft ein Zeichenlimit — diese Version passt überall:

```
Guten Tag,

ich erzeuge in [Gebiet] Solar-Beratungstermine: Hausbesitzer bekommen
per Post ein Bild ihres eigenen Dachs mit Solaranlage plus die Zahlen
dazu. Wer sich meldet, will ernsthaft beraten werden.

Diese Termine vergebe ich exklusiv an einen Installateur pro Gebiet.
Die ersten zwei wären für Sie kostenlos.

Beispiel: [DEMO-LINK]

Hätten Sie 10 Minuten Zeit für ein Telefonat?

[Dein Name] · [Telefon]
```

---

## ✅ Checkliste vor dem Absenden

- [ ] Richtiger **Nachname** drin? (häufigster Fehler)
- [ ] **Gebiet** stimmt mit dem Arbeitsgebiet der Firma überein?
- [ ] **Demo-Link** angeklickt und geprüft, dass die Seite lädt?
- [ ] **Bild im Text**, nicht als Anhang?
- [ ] Absender ist deine **Firmenadresse**, nicht privates Gmail?
- [ ] **Signatur** mit Telefonnummer? (ohne Nummer wirkt es unseriös)
- [ ] In **BCC niemand** — jede Mail einzeln verschicken

---

## 📅 Was nach dem Absenden passiert

| Wann | Was |
|---|---|
| **Tag 1** | Mail raus (oder Formular) |
| **Tag 2–3** | **Anrufen:** „Ich hab Ihnen Montag geschrieben wegen Solar-Terminen — haben Sie kurz Zeit?" ← **Hier passiert der Abschluss, nicht in der Mail** |
| **Tag 6** | Eine Nachfass-Mail (siehe `AKQUISE-EMAILS.md`, E-Mail 2) |
| **danach** | Abhaken und weiter zur nächsten Firma |

**Die Mail verkauft nicht. Sie sorgt nur dafür, dass dein Anruf nicht kalt
ist.** Der Leitfaden für das Gespräch: `TELEFON-LEITFADEN.md`

---

## 📊 Erwartung

Von 10 angeschriebenen Firmen antworten **1–2** von selbst.
Mit Nachtelefonieren sprichst du mit **4–6**.
Das ist normal — nicht entmutigen lassen.
