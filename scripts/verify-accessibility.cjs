/* eslint-disable @typescript-eslint/no-require-imports -- Browser accessibility and adjacent-flow regression checks. */
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const AxeBuilder = require(process.env.FINLY_AXE_PATH || '@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.FINLY_BASE_URL || 'http://127.0.0.1:3100';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const width of [375, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const scan = async label => {
        const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        results.push({ width, label, violations: result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      };
      for (const route of ['/', '/lectii', '/lectii/primul-job', '/lectii/economia-pe-scurt', '/?tab=profile', '/?tab=simulator']) {
        await page.goto(base + route, { waitUntil: 'networkidle' });
        await scan(route);
      }
      await page.goto(base + '/lectie/salariu-brut-vs-net', { waitUntil: 'networkidle' });
      await page.getByRole('heading', { name: 'Ai primul job. Dar cât primești?' }).waitFor();
      await scan('player intro');
      await page.locator('.lesson-continue').click();
      await scan('player four answers');
      await page.keyboard.press('2');
      await page.locator('.lesson-feedback').waitFor();
      await scan('player wrong + correct revealed');
      await page.keyboard.press('Enter');
      await page.getByRole('heading', { name: 'Brutul e startul. Netul e ce rămâne.' }).waitFor();
      await context.close();
    }
    fs.writeFileSync('artifacts/learning-accessibility.json', JSON.stringify(results, null, 2));
    const failures = results.filter(r => r.violations.length);
    console.log(JSON.stringify({ scans: results.length, failures }, null, 2));
    assert.equal(failures.length, 0);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
