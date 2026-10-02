/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS browser verification, outside the app bundle. */
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  for (const width of [1440, 1024, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const landing = `${process.env.FINLY_BASE_URL || 'http://localhost:3000'}/despre`;
    const response = await page.goto(landing, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.hero-mascot').waitFor({ state: 'visible' });
    await page.screenshot({ path: `artifacts/finly-${width}.png`, fullPage: true });
    const layout = await page.evaluate(() => ({
      viewport: innerWidth, documentWidth: document.documentElement.scrollWidth,
      headingSize: getComputedStyle(document.querySelector('h1')).fontSize,
      headingFamily: getComputedStyle(document.querySelector('h1')).fontFamily,
      imageLoaded: document.querySelector('.hero-mascot').naturalWidth > 0,
      missingAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(h => h.length > 1 && !document.querySelector(h)),
      overflowElements: [...document.querySelectorAll('main *, header *, footer *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1); }).map(el => `${el.tagName}.${el.className}`).slice(0, 10),
    }));
    if (layout.documentWidth > width || !layout.imageLoaded || layout.missingAnchors.length || errors.length || response.status() !== 200) throw new Error(JSON.stringify({ width, layout, errors, status: response.status() }));
    const quiz = page.locator('.product-window');
    await quiz.getByRole('button', { name: /Poți cumpăra mai mult/ }).click();
    await quiz.getByText('Mai încearcă. Ești aici să înveți.').waitFor();
    await quiz.getByRole('button', { name: /Puterea ta de cumpărare scade/ }).click();
    await quiz.getByText('Exact. Ai prins ideea!').waitFor();
    const ctas = page.getByRole('link', { name: 'Începe gratuit', exact: true });
    for (let i = 0; i < await ctas.count(); i++) {
      await ctas.nth(i).click();
      await page.waitForURL('**/lectie/salariu-brut-vs-net');
      await page.getByRole('heading', { name: 'Ai primul job. Dar cât primești?' }).waitFor();
      await page.getByRole('link', { name: 'Închide lecția' }).click();
      await page.goto(landing, { waitUntil: 'networkidle' });
    }
    if (width <= 800) {
      await page.getByRole('button', { name: 'Deschide meniul' }).click();
      await page.locator('.mobile-menu').getByRole('link', { name: 'Începe gratuit' }).click();
      await page.waitForURL('**/lectie/salariu-brut-vs-net');
      await page.getByRole('link', { name: 'Închide lecția' }).click();
      await page.goto(landing, { waitUntil: 'networkidle' });
      await page.getByRole('button', { name: 'Deschide meniul' }).click();
      await page.locator('.mobile-menu').getByRole('link', { name: 'Ce înveți' }).click();
      if (await page.locator('.mobile-menu').count()) throw new Error(`Menu did not close at ${width}`);
    } else {
      await page.getByRole('link', { name: /Hai să începem/ }).click();
      await page.waitForURL('**/lectie/salariu-brut-vs-net');
      await page.getByRole('link', { name: 'Închide lecția' }).click();
      await page.goto(landing, { waitUntil: 'networkidle' });
    }
    await page.getByRole('button', { name: 'Confidențialitate', exact: true }).click();
    await page.locator('.info-dialog').waitFor({ state: 'visible' });
    await page.keyboard.press('Escape');
    results.push({ width, ...layout, errors, interactions: 'passed' });
    await page.close();
  }
  fs.writeFileSync('artifacts/verification.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
