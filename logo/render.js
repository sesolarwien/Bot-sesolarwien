const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

// Ob das Zeichen mittig sitzt und im Kreis bleibt, misst mitte.py an
// den fertigen Bildern – zuverlässiger als die Rahmen der Elemente,
// weil dort auch runde und leere Kästen mitgezählt würden.
const VARIANTEN = [
  { id: 'a', out: 'phonetastic-profilbild-a-monogramm.png' },
  { id: 'b', out: 'phonetastic-profilbild-b-wortmarke.png' },
  { id: 'c', out: 'phonetastic-profilbild-c-handy.png' },
  { id: 'd', out: 'phonetastic-profilbild-d-hell.png' },
  { id: 'e', out: 'phonetastic-profilbild-e-siegel-p.png' },
  { id: 'f', out: 'phonetastic-profilbild-f-siegel-handy.png' },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } });
  await page.goto('file://' + path.join(__dirname, 'logo.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  for (const v of VARIANTEN) {
    const el = await page.$('#' + v.id);

    await el.screenshot({ path: path.join(__dirname, v.out) });
    console.log('geschrieben: ' + v.out);
  }

  // Querformat: hier sind die Leistungen wirklich lesbar
  const quer = await browser.newPage({ viewport: { width: 2500, height: 900 } });
  await quer.goto('file://' + path.join(__dirname, 'logo-quer.html'));
  await quer.evaluate(() => document.fonts.ready);
  await quer.waitForTimeout(400);
  for (const q of [
    { id: 'quer-dunkel', out: 'phonetastic-logo-quer-dunkel.png' },
    { id: 'quer-hell', out: 'phonetastic-logo-quer-hell.png' },
  ]) {
    const el = await quer.$('#' + q.id);
    // Läuft der Text über den Rand?
    const zuBreit = await el.evaluate((box) => {
      const r = box.getBoundingClientRect();
      const t = box.querySelector('.text').getBoundingClientRect();
      return t.right > r.right - 40 ? Math.round(t.right - r.right) : 0;
    });
    await el.screenshot({ path: path.join(__dirname, q.out) });
    console.log('geschrieben: ' + q.out + (zuBreit ? '  ZU BREIT um ' + zuBreit + 'px' : ''));
  }

  await browser.close();
})();
