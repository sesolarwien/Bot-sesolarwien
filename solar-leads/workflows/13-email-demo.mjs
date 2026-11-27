// ============================================================================
//  Workflow 13 — Demo-Bild für die Akquise-E-Mail
// ============================================================================
//
//  Erzeugt EIN Bild zum Einfügen in die E-Mail an Solar-Installateure:
//    links  = echtes Satellitenbild des Dachs  ("VORHER")
//    rechts = dasselbe Dach mit Solaranlage    ("MIT SOLAR")
//    unten  = Marke + die echten Eckdaten dieses Hauses
//
//  Das ist der Beweis im Posteingang — der Empfänger muss nichts anklicken.
//
//  So startest du es (im Ordner solar-leads/):
//    node workflows/13-email-demo.mjs <slug>    # ein bestimmtes Haus
//    node workflows/13-email-demo.mjs           # bestes Haus automatisch
//
//  Voraussetzung: output/<slug>.png UND output/<slug>-rendered.png
//  Ergebnis: output/<slug>-email.jpg  (ca. 1200 px breit, < 250 KB)
// ============================================================================

try { await import('dotenv/config'); } catch {}
import Jimp from 'jimp';
import { readFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'output');
const STORE = join(OUTPUT_DIR, 'prospects.json');
const BRAND = process.env.SENDER_NAME || 'Solar Wien';

// Layout (Pixel). Zwei quadratische Bilder nebeneinander + Fussleiste.
const PANE = 596, GAP = 8, FOOT = 112;
const W = PANE * 2 + GAP, H = PANE + FOOT;
// Auf welchen Bildausschnitt zoomen wir? 1.0 = ganzes Bild, 0.45 = enger Ausschnitt.
const ZOOM = Number(process.env.EMAIL_DEMO_ZOOM || 0.5);

async function main() {
  const wanted = (process.argv[2] || '').trim();
  const list = JSON.parse(await readFile(STORE, 'utf8'));

  let targets = list.filter(p => p.roof_suitable);
  if (wanted) targets = targets.filter(p => p.slug === wanted);
  // Ohne Angabe: bestes Haus (hoechster Score) mit vorhandenem Render.
  else targets = targets.sort((a, b) => (b.suitability_score || 0) - (a.suitability_score || 0));

  for (const p of targets) {
    if (!(await exists(`${p.slug}.png`)) || !(await exists(`${p.slug}-rendered.png`))) {
      if (wanted) { console.error(`❌ ${p.slug}: Satellit oder Render fehlt.`); process.exit(1); }
      continue;
    }
    const out = await build(p);
    console.log(`✅ ${out}`);
    console.log('\n   Dieses Bild in die E-Mail einfuegen (in Gmail/Outlook einfach');
    console.log('   in den Text ziehen) — NICHT nur als Anhang, sonst sieht es keiner.');
    return;
  }
  console.error('❌ Kein Haus mit Satellitenbild UND Render gefunden.');
  console.error('   Zuerst Workflow 1 (Analyse) und Workflow 3 (Render) laufen lassen.');
  process.exit(1);
}

async function build(p) {
  const before = await Jimp.read(join(OUTPUT_DIR, `${p.slug}.png`));
  const after  = await Jimp.read(join(OUTPUT_DIR, `${p.slug}-rendered.png`));

  // Beide Bilder identisch zuschneiden, damit Vorher/Nachher exakt deckungsgleich sind.
  for (const im of [before, after]) {
    const s = Math.min(im.bitmap.width, im.bitmap.height);
    const side = Math.round(s * ZOOM);
    im.crop(Math.round((im.bitmap.width - side) / 2), Math.round((im.bitmap.height - side) / 2), side, side);
    im.resize(PANE, PANE);
  }

  const canvas = new Jimp(W, H, 0x0f172aff);
  canvas.composite(before, 0, 0);
  canvas.composite(after, PANE + GAP, 0);

  const fLbl  = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const fVal  = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const fSmall= await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);

  // Beschriftungen oben links auf jedem Bild (dunkles Kaestchen dahinter).
  await pill(canvas, 18, 18, 'VORHER', fLbl);
  await pill(canvas, PANE + GAP + 18, 18, 'MIT SOLAR', fLbl);

  // Fussleiste: Marke links, Kennzahlen rechts.
  const fy = PANE;
  canvas.scan(0, fy, W, FOOT, function (x, y, i) {
    this.bitmap.data[i] = 15; this.bitmap.data[i+1] = 23; this.bitmap.data[i+2] = 42;
  });
  canvas.print(fVal, 26, fy + 20, BRAND);
  // Hinweis: Bitmap-Schrift kann keine Umlaute -> bewusst umlautfrei formuliert.
  canvas.print(fSmall, 28, fy + 62, 'Dachdaten aus echter Vermessung');

  const vals = [
    [`${num(p.system_size_kwp)} kWp`, 'Anlage'],
    [`${num(p.annual_savings_eur)} EUR`, 'pro Jahr'],
    [p.payback_years != null ? `${String(p.payback_years).replace('.', ',')} J.` : '-', 'Amortisation'],
  ];
  let x = W - 26;
  for (const [v, l] of vals.reverse()) {
    const wv = Jimp.measureText(fVal, v), wl = Jimp.measureText(fSmall, l);
    const colW = Math.max(wv, wl);
    x -= colW;
    canvas.print(fVal, x, fy + 20, v);
    canvas.print(fSmall, x, fy + 62, l);
    x -= 44;
  }

  const out = join(OUTPUT_DIR, `${p.slug}-email.jpg`);
  canvas.quality(82);
  await canvas.writeAsync(out);
  return `output/${p.slug}-email.jpg`;
}

// Halbtransparentes Kaestchen mit Text (damit die Beschriftung immer lesbar ist).
async function pill(canvas, x, y, text, font) {
  const tw = Jimp.measureText(font, text), th = Jimp.measureTextHeight(font, text, tw);
  const box = new Jimp(tw + 28, th + 14, 0x0f172acc);
  canvas.composite(box, x, y);
  canvas.print(font, x + 14, y + 6, text);
}

async function exists(name) { try { await access(join(OUTPUT_DIR, name)); return true; } catch { return false; } }
function num(n) { return n == null ? '-' : new Intl.NumberFormat('de-DE').format(Math.round(n)); }

main().catch(err => { console.error('❌ Fehler:', err.message); process.exit(1); });
