/* eslint-disable @typescript-eslint/no-require-imports -- Focus, persisted notifications and level/freeze production UX. */
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const AxeBuilder = require(process.env.FINLY_AXE_PATH || '@axe-core/playwright').default;
const assert = require('node:assert/strict'), fs = require('node:fs');
const { load } = require('./learning-test-content.cjs'), engine = load('src/lib/progress.ts');
const base = process.env.FINLY_BASE_URL || 'http://127.0.0.1:3100', key = engine.PROGRESS_STORAGE_KEY;
async function seed(browser, state, date, width) {
  const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
  await context.addInitScript(({key,state}) => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem(key, JSON.stringify(state)); sessionStorage.setItem('seeded', 'yes'); } }, { key, state });
  const page = await context.newPage(); await page.clock.setFixedTime(date); return { context, page };
}
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true }), results = [], errors = [];
  try {
    for (const width of [375, 390, 430, 1440]) {
      const date = new Date('2026-10-04T12:00:00Z'), initial = engine.createEmptyProgress(date);
      const event = { id: 'debug:multi-level', type: 'debug_adjustment', amount: 850, createdAt: date.toISOString(), bucharestDateKey: '2026-10-04' };
      const state = engine.finishAction(initial, initial, [event], date).progress;
      const { context, page } = await seed(browser, state, date, width); page.on('pageerror', e => errors.push(e.message));
      await page.goto(base, { waitUntil: 'networkidle' }); await page.locator('.finly-level-dialog').waitFor(); assert.match(await page.locator('.finly-level-dialog').innerText(), /Ai urcat 3 niveluri/); assert.match(await page.locator('.finly-level-dialog').innerText(), /Money Smart/);
      assert.equal(await page.locator('.finly-level-dialog .app-button').evaluate(el => el === document.activeElement), true);
      const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze(); assert.equal(audit.violations.length, 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false); await page.screenshot({ path: `artifacts/gamification-v2-level-up-${width}.png`, fullPage: true });
      await page.keyboard.press('Escape'); await page.reload({ waitUntil: 'networkidle' }); assert.equal(await page.locator('.finly-level-dialog').count(), 0); await context.close();
      const monday = new Date('2026-10-05T12:00:00Z'), old = { ...engine.createEmptyProgress(monday), activityDates: ['2026-10-05'] };
      const freeze = await seed(browser, old, new Date('2026-10-07T12:00:00Z'), width); freeze.page.on('pageerror', e => errors.push(e.message)); await freeze.page.goto(base, { waitUntil: 'networkidle' }); await freeze.page.getByText('Freeze folosit', { exact: true }).waitFor(); assert.equal(await freeze.page.locator('.finly-achievement-toast .freeze-notification').count(), 1);
      await freeze.page.locator('.finly-achievement-toast button').click(); await freeze.page.goto(base + '/?tab=profile', { waitUntil: 'networkidle' }); assert.equal(await freeze.page.locator('.activity-day.freeze').count(), 1); assert.equal(await freeze.page.locator('.finly-achievement-toast').count(), 0); assert.equal(await freeze.page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      const saved = await freeze.page.evaluate(key => JSON.parse(localStorage.getItem(key)), key); assert.equal(engine.getTotalXp(saved), 0); assert.equal(saved.activityDates.length, 1); assert.equal(saved.freezeBalance, 0); assert.deepEqual(saved.seenFreezeToastDates, ['2026-10-06']);
      await freeze.page.reload({ waitUntil: 'networkidle' }); assert.equal(await freeze.page.locator('.finly-achievement-toast').count(), 0); await freeze.context.close(); results.push({ width, multiLevelOneDialog: true, focusAndEscape: true, notificationNoRepeat: true, freezeDayAndBalance: true, noOverflow: true });
    }
    assert.deepEqual(errors, []); fs.writeFileSync('artifacts/gamification-v2-moments.json', JSON.stringify({ results, errors }, null, 2)); console.log('PASS production level-up and freeze moments at 375/390/430/1440px.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
