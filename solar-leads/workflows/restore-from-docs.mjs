// ============================================================================
//  Wiederherstellung — Bilder aus den veröffentlichten Microsites zurückholen
// ============================================================================
//
//  Wozu? Die gerenderten Dachbilder liegen normalerweise nur lokal in
//  output/ und werden absichtlich NICHT auf GitHub gespeichert (zu groß).
//  ABER: In jeder Seite unter docs/ sind sie als Base64 eingebettet.
//  Dieses Skript holt sie da wieder heraus.
//
//  Damit kann man nach einem frischen "git clone" weiterarbeiten, ohne
//  neu rendern zu müssen (spart fal.ai-Guthaben).
//
//  So startest du es (im Ordner solar-leads/):
//    node workflows/restore-from-docs.mjs
//
//  Ergebnis:
//    output/<slug>.png           = Satellitenbild (vorher)
//    output/<slug>-rendered.png  = Dach mit Solaranlage
//    output/adressen.txt         = Adressliste zum Neuberechnen
// ============================================================================

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = join(__dirname, '..', '..', 'docs');
const OUTPUT_DIR = join(__dirname, '..', 'output');

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  let files;
  try {
    files = (await readdir(DOCS_DIR)).filter(f => f.endsWith('.html') && f !== 'index.html');
  } catch {
    console.error(`❌ Ordner nicht gefunden: ${DOCS_DIR}`);
    console.error('   Bist du im Ordner solar-leads/ und liegt docs/ daneben?');
    process.exit(1);
  }
  if (!files.length) { console.error('❌ Keine Microsites in docs/ gefunden.'); process.exit(1); }

  const adressen = [];
  let ok = 0;

  for (const f of files) {
    const slug = f.replace(/\.html$/, '');
    const html = await readFile(join(DOCS_DIR, f), 'utf8');

    // ACHTUNG Reihenfolge: In photoBlock() steht das GERENDERTE Bild zuerst
    // (ba-after), danach das Original (ba-before).
    const imgs = [...html.matchAll(/data:image\/(?:png|jpeg);base64,([A-Za-z0-9+/=]+)/g)];
    if (imgs.length < 2) {
      console.warn(`  ⚠️  ${slug}: nur ${imgs.length} Bild(er) — übersprungen.`);
      continue;
    }
    await writeFile(join(OUTPUT_DIR, `${slug}-rendered.png`), Buffer.from(imgs[0][1], 'base64'));
    await writeFile(join(OUTPUT_DIR, `${slug}.png`),          Buffer.from(imgs[1][1], 'base64'));

    // Adresse aus der Kopfzeile lesen:  <p>Himmelstraße 45 · 1190 Wien</p>
    const m = html.match(/<p>([^<]*?)\s*·\s*(\d{4})\s+([^<]+?)<\/p>/);
    if (m) adressen.push(`${m[1].trim()}, ${m[2]} ${m[3].trim()}`);

    console.log(`  ✅ ${slug}`);
    ok++;
  }

  const listPath = join(OUTPUT_DIR, 'adressen.txt');
  await writeFile(listPath, adressen.join('\n') + '\n');

  console.log(`\n✅ ${ok} Haus/Häuser wiederhergestellt (je 2 Bilder).`);
  console.log(`📄 Adressliste: output/adressen.txt (${adressen.length} Adressen)\n`);
  console.log('NÄCHSTER SCHRITT — Wirtschaftlichkeit neu berechnen:');
  console.log('Die alten Werte (bis 95 kWp) stammen aus der Zeit vor dem kWp-Deckel.');
  console.log('Workflow 1 für jede Adresse neu laufen lassen, z. B.:\n');
  console.log('  while IFS= read -r a; do node workflows/01-fetch-property.mjs "$a"; done < output/adressen.txt\n');
  console.log('Danach Workflow 4 (Microsites) und Workflow 13 (E-Mail-Bild).');
}

main().catch(err => { console.error('❌ Fehler:', err.message); process.exit(1); });
