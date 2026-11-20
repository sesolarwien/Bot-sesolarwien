const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const JOBS = [
  { id: 'knapp-hell',    out: 'phonetastic-logo-quer-hell-freigestellt.png',   frei: true },
  { id: 'knapp-dunkel',  out: 'phonetastic-logo-quer-dunkel-freigestellt.png', frei: true },
  { id: 'quadrat-hell',  out: 'phonetastic-logo-quadrat-hell.png' },
  { id: 'quadrat-dunkel', out: 'phonetastic-logo-quadrat-dunkel.png' },
];

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 1600, height: 1200 } });
  await p.goto('file://' + path.join(__dirname, 'logo-export.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);

  for (const j of JOBS) {
    const el = await p.$('#' + j.id);
    const groesse = await el.evaluate((e) => {
      const r = e.getBoundingClientRect();
      return Math.round(r.width) + ' × ' + Math.round(r.height);
    });
    await el.screenshot({ path: path.join(__dirname, j.out), omitBackground: !!j.frei });
    console.log(`${j.out}  ${groesse}${j.frei ? '  (freigestellt)' : ''}`);
  }
  await b.close();
})();
