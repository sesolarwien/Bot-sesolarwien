const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });

  // PNG in Druckauflösung
  const p = await b.newPage({ viewport: { width: 1820, height: 1300 }, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(__dirname, 'email-blatt.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);

  const bericht = await p.evaluate(() => {
    const blatt = document.querySelector('#blatt');
    const r = blatt.getBoundingClientRect();
    const out = [];
    if (blatt.scrollHeight > blatt.clientHeight + 1)
      out.push(`Inhalt ${blatt.scrollHeight}px > Platz ${blatt.clientHeight}px`);
    blatt.querySelectorAll('*').forEach((el) => {
      const b = el.getBoundingClientRect();
      if (!b.width) return;
      if (b.right > r.right - 1 || b.left < r.left + 1)
        out.push(`ragt über den Rand: ${el.className || el.tagName}`);
      if (el.scrollWidth > el.clientWidth + 1)
        out.push(`zu breit: "${(el.textContent || '').trim().slice(0, 30)}"`);
    });
    return [...new Set(out)];
  });
  console.log(bericht.length ? 'PROBLEME:' : 'Aufteilung ok');
  bericht.forEach((x) => console.log('  ! ' + x));

  const el = await p.$('#blatt');
  await el.screenshot({ path: path.join(__dirname, 'phonetastic-email-blatt.png') });

  // PDF für die Druckerei bzw. zum Kopieren
  const pdf = await b.newPage({ viewport: { width: 1754, height: 1240 } });
  await pdf.goto('file://' + path.join(__dirname, 'email-blatt.html'));
  await pdf.evaluate(() => document.fonts.ready);
  await pdf.waitForTimeout(400);
  await pdf.pdf({
    path: path.join(__dirname, 'phonetastic-email-blatt.pdf'),
    width: '1754px', height: '1240px', printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await b.close();
  console.log('geschrieben: phonetastic-email-blatt.png und .pdf');
})();
