/* eslint-disable @typescript-eslint/no-require-imports -- Development tools exercise production domain actions. */
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict'), fs = require('node:fs');
const { load } = require('./learning-test-content.cjs'), engine = load('src/lib/progress.ts');
const base = process.env.FINLY_DEV_URL || 'http://localhost:3000', key = engine.PROGRESS_STORAGE_KEY;
const read = page => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const page = await context.newPage(), errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(base, { waitUntil: 'networkidle' }); await page.getByRole('button', { name: 'Dev', exact: true }).click();
    await page.getByRole('button', { name: 'Resetează tot', exact: true }).click(); await page.getByRole('button', { name: '+100 XP', exact: true }).click();
    await page.waitForFunction(key => JSON.parse(localStorage.getItem(key)).xp_events.some(e => e.type === 'debug_adjustment'), key);
    let p = await read(page); assert.equal(engine.getTotalXp(p), 100); assert.equal(engine.getEarnedXpExcludingDebug(p), 0); assert.equal(p.activityDates.length, 0);
    await page.getByRole('button', { name: '+100 XP', exact: true }).click(); await page.locator('.finly-level-dialog').waitFor(); assert.match(await page.locator('.finly-level-dialog').innerText(), /Budget Rookie/); await page.locator('.finly-level-dialog .app-button').click();
    const before = (await read(page)).maxSeenDateKey; await page.getByRole('button', { name: 'Mută data cu +1 zi' }).click(); await page.waitForFunction(({key,before}) => JSON.parse(localStorage.getItem(key)).maxSeenDateKey > before, { key, before });
    await page.getByRole('button', { name: 'Resetează tot', exact: true }).click(); await page.waitForFunction(key => JSON.parse(localStorage.getItem(key)).xp_events.length === 0, key); p = await read(page); assert.equal(engine.getTotalXp(p), 0); assert.equal(p.freezeBalance, 1); assert.equal(p.maxSeenDateKey, before);
    await page.goto(base + '/lectie/phishing', { waitUntil: 'networkidle' }); await page.getByRole('button', { name: 'Dev', exact: true }).click(); await page.getByRole('button', { name: 'Termină lecția curentă' }).click(); await page.locator('.lesson-finish').waitFor(); p = await read(page); assert.equal(engine.getTotalXp(p), 81); assert.equal(p.lessonStats.phishing.bestFirstTryCorrect, 9); assert.ok(p.achievementUnlocks.perfectionist); assert.equal(p.activityDates.length, 1);
    assert.deepEqual(errors, []); fs.writeFileSync('artifacts/gamification-v2-dev.json', JSON.stringify({ reset: true, virtualDateAndReset: true, debugExclusions: true, levelUp: true, completeLessonUsesDomain: true, errors }, null, 2)); console.log('PASS development reset, virtual day, debug XP, level-up and real lesson completion.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

