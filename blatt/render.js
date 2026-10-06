const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

// Das Blatt ist in Millimetern aufgebaut (297 × 210 mm = A4 quer).
// In CSS-Pixeln bei 96 dpi sind das 1122,5 × 793,7 px.
const BREITE_PX = 297 / 25.4 * 96;   // 1122,5
const HOEHE_PX = 210 / 25.4 * 96;    // 793,7
const DPI = 300;
const SKALA = DPI / 96;              // 3,125 → PNG wird 3508 × 2480 px

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

  // ---- PNG in Druckauflösung ----
  const p = await b.newPage({
    viewport: { width: Math.ceil(BREITE_PX) + 40, height: Math.ceil(HOEHE_PX) + 40 },
    deviceScaleFactor: SKALA,
  });
  await p.goto('file://' + path.join(__dirname, 'email-blatt.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);

  const bericht = await p.evaluate(() => {
    const blatt = document.querySelector('#blatt');
    const r = blatt.getBoundingClientRect();
    const mm = (px) => px / 96 * 25.4;
    const out = [];
    if (blatt.scrollHeight > blatt.clientHeight + 1)
      out.push(`Inhalt ${blatt.scrollHeight}px > Platz ${blatt.clientHeight}px`);
    blatt.querySelectorAll('*').forEach((el) => {
      const e = el.getBoundingClientRect();
      if (!e.width) return;
      // Mindestens 8 mm Abstand zu jeder Blattkante
      const rand = 8;
      if (mm(e.left - r.left) < rand || mm(r.right - e.right) < rand ||
          mm(e.top - r.top) < rand || mm(r.bottom - e.bottom) < rand)
        out.push(`zu nah am Blattrand: ${el.className || el.tagName}`);
      if (el.scrollWidth > el.clientWidth + 1)
        out.push(`zu breit: "${(el.textContent || '').trim().slice(0, 30)}"`);
    });
    return [...new Set(out)];
  });
  console.log(bericht.length ? 'PROBLEME:' : 'Aufteilung ok');
  bericht.forEach((x) => console.log('  ! ' + x));

  const el = await p.$('#blatt');
  await el.screenshot({ path: path.join(__dirname, 'phonetastic-email-blatt.png') });

  // ---- PDF: echte A4-Seite quer ----
  const pdf = await b.newPage({ viewport: { width: Math.ceil(BREITE_PX), height: Math.ceil(HOEHE_PX) } });
  await pdf.goto('file://' + path.join(__dirname, 'email-blatt.html'));
  await pdf.evaluate(() => document.fonts.ready);
  await pdf.waitForTimeout(400);
  await pdf.pdf({
    path: path.join(__dirname, 'phonetastic-email-blatt.pdf'),
    format: 'A4', landscape: true, preferCSSPageSize: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await b.close();
  console.log('geschrieben: phonetastic-email-blatt.png und .pdf');
})();
