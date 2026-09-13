const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport: { width: 700, height: 700 } });
  await p.goto('file://' + path.join(__dirname, 'favicon.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const el = await p.$('#icon');
  await el.screenshot({ path: path.join(__dirname, 'favicon-512.png'), omitBackground: true });
  await b.close();
  console.log('favicon-512.png geschrieben');
})();
