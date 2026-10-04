/* eslint-disable @typescript-eslint/no-require-imports -- Production browser integration QA for progress v2. */
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const AxeBuilder = require(process.env.FINLY_AXE_PATH || '@axe-core/playwright').default;
const assert = require('node:assert/strict'), fs = require('node:fs');
const { load } = require('./learning-test-content.cjs');
const engine = load('src/lib/progress.ts'), registry = load('src/content/lessons/index.ts');
const { displayedCorrectIndex } = require('./browser-lesson-options.cjs');
const base = process.env.FINLY_BASE_URL || 'http://127.0.0.1:3100', key = engine.PROGRESS_STORAGE_KEY;
const lesson = registry.getReadyLessons().find(l => l.id === 'phishing'), results = [], errors = [];
const read = page => page.evaluate(key => JSON.parse(localStorage.getItem(key)), key);
const goto = (page, route) => page.goto(base + route, { waitUntil: 'networkidle' });
async function noOverflow(page) { assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, page.url()); }
async function audit(page, label) { const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze(); assert.deepEqual(report.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [], label); }
async function play(page, score, replay = false) {
  let q = 0;
  for (const screen of lesson.screens) {
    if (screen.type === 'final') break;
    await page.getByRole('heading', { name: screen.title, exact: true }).waitFor();
    await noOverflow(page);
    if (engine.isAnswerScreen(screen)) {
      const order = await page.locator('.lesson-answer').evaluateAll(elements => elements.map(e => e.dataset.optionId));
      const correct = await displayedCorrectIndex(page, screen), chosen = q < score ? correct : (correct + 1) % order.length;
      const before = engine.getTotalXp(await read(page));
      if (screen.caseId) { await page.getByRole('button', { name: 'Recitește cazul' }).click(); await page.keyboard.press('Escape'); assert.deepEqual(await page.locator('.lesson-answer').evaluateAll(elements => elements.map(e => e.dataset.optionId)), order); }
      await page.keyboard.press(String(chosen + 1));
      await page.locator('.lesson-feedback').waitFor();
      assert.deepEqual(await page.locator('.lesson-answer').evaluateAll(elements => elements.map(e => e.dataset.optionId)), order);
      assert.equal(await page.locator('.lesson-answer.correct').getAttribute('data-option-id'), engine.getCorrectAnswerId(screen));
      assert.equal(await page.locator('.pending-question-xp').count(), !replay && q < score ? 1 : 0);
      assert.equal(engine.getTotalXp(await read(page)), before, 'Question XP remains pending');
      if (screen.caseId) { await page.getByRole('button', { name: 'Recitește cazul' }).click(); await page.getByRole('button', { name: 'Închide cazul' }).click(); assert.deepEqual(await page.locator('.lesson-answer').evaluateAll(elements => elements.map(e => e.dataset.optionId)), order); }
      q++;
    }
    if (screen.type === 'tine_minte') await page.locator('.lesson-continue').evaluate(button => { button.click(); button.click(); });
    else { try { await page.locator('.lesson-continue').click({ timeout: 8000 }); } catch (error) { await page.screenshot({ path: 'artifacts/gamification-v2-failure.png', fullPage: true }); console.error('Screen', screen.id, 'replay', replay, await page.locator('.lesson-continue').evaluate(el => ({ rect: el.getBoundingClientRect().toJSON(), animation: getComputedStyle(el).animation, scroll: scrollY, active: document.activeElement.outerHTML.slice(0,200), dialogs: document.querySelectorAll('dialog[open]').length }))); throw error; } }
  }
  await page.locator('.lesson-finish').waitFor(); await noOverflow(page);
}
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [375, 390, 430, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
      const page = await context.newPage(); await page.clock.setFixedTime(new Date('2026-10-04T12:00:00Z'));
      page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      await page.addLocatorHandler(page.locator('.finly-level-dialog'), async () => page.locator('.finly-level-dialog .app-button').click());
      await page.addLocatorHandler(page.locator('.finly-achievement-toast'), async () => page.locator('.finly-achievement-toast button').click());
      await context.addInitScript(key => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem(key, JSON.stringify({ version: 1, totalXp: 900, completedLessonIds: ['phishing'] })); sessionStorage.setItem('seeded', 'yes'); } }, key);
      await goto(page, '/'); await page.getByText('Money Beginner', { exact: false }).waitFor(); await noOverflow(page);
      let p = await read(page); assert.equal(p.version, 2); assert.equal(engine.getTotalXp(p), 0); assert.equal(p.freezeBalance, 1); assert.equal(engine.getCompletedLessonCount(p), 0);
      assert.match(await page.locator('.daily-goal-status').innerText(), /0 \/ 50 XP/); assert.equal(await page.locator('.gamification-dev').count(), 0);
      await audit(page, `home-${width}`); await page.screenshot({ path: `artifacts/gamification-v2-home-${width}.png`, fullPage: true });
      await goto(page, '/?tab=profile'); await page.locator('.profile-card').waitFor(); await noOverflow(page); assert.match(await page.locator('.achievements .section-top').innerText(), /0 \/ 21/); await audit(page, `profile-${width}`); await page.screenshot({ path: `artifacts/gamification-v2-profile-${width}.png`, fullPage: true });
      await goto(page, '/lectie/phishing'); await play(page, 7); p = await read(page); assert.equal(engine.getTotalXp(p), 48); assert.equal(p.lessonStats.phishing.bestFirstTryCorrect, 7); assert.match(await page.locator('.lesson-reward-summary').innerText(), /7 din 9/); assert.match(await page.locator('.daily-goal-status').innerText(), /48 \/ 50 XP/); await audit(page, `lesson-final-${width}`); await page.screenshot({ path: `artifacts/gamification-v2-final-${width}.png`, fullPage: true });
      await page.reload({ waitUntil: 'networkidle' }); assert.equal(engine.getTotalXp(await read(page)), 48); assert.equal((await read(page)).lessonStats.phishing.completionCount, 1);
      await goto(page, '/'); const challenge = engine.selectDailyChallenge('2026-10-04'); await page.getByRole('button', { name: challenge.options.find(o => o.id === challenge.correctOptionId).label, exact: true }).click(); await page.locator('.challenge-feedback').waitFor(); p = await read(page); assert.equal(engine.getTotalXp(p), 73); assert.equal(engine.getQualifyingXpForDate(p, '2026-10-04'), 63); await page.reload({ waitUntil: 'networkidle' }); assert.equal(engine.getTotalXp(await read(page)), 73); assert.equal(await page.locator('.challenge-answers button:disabled').count(), challenge.options.length);
      await goto(page, '/lectie/phishing'); await play(page, 9, true); p = await read(page); assert.equal(engine.getTotalXp(p), 81); assert.equal(p.xp_events.filter(e => e.type === 'lesson_perfect').length, 0); assert.ok(p.achievementUnlocks.perfectionist); assert.equal(p.uniqueCorrectAnswers.length, 9);
      await page.getByRole('button', { name: 'Refă lecția' }).click(); await play(page, 9, true); assert.equal(engine.getTotalXp(await read(page)), 81);
      await goto(page, '/?tab=simulator'); const activityBefore = (await read(page)).activityDates, goalBefore = engine.getQualifyingXpForDate(await read(page), '2026-10-04');
      for (let i = 0; i < 5; i++) { await page.locator('.sim-choices button').first().click(); await page.locator('.sim-feedback').waitFor(); await page.locator('.sim-feedback button').click(); }
      await page.locator('.sim-finish').waitFor(); p = await read(page); assert.equal(engine.getTotalXp(p), 181); assert.ok(p.achievementUnlocks['first-month']); assert.deepEqual(p.activityDates, activityBefore); assert.equal(engine.getQualifyingXpForDate(p, '2026-10-04'), goalBefore); await noOverflow(page);
      await page.locator('.sim-finish button').click(); for (let i = 0; i < 5; i++) { await page.locator('.sim-choices button').first().click(); await page.locator('.sim-feedback button').click(); } await page.locator('.sim-finish').waitFor(); assert.equal(engine.getTotalXp(await read(page)), 181);
      await goto(page, '/?tab=profile'); assert.match(await page.locator('.profile-card').innerText(), /Budget Rookie/); assert.match(await page.locator('.profile-stats').innerText(), /181/); assert.equal(await page.locator('.activity-week .activity-day').count(), 7); await audit(page, `earned-profile-${width}`);
      await goto(page, '/'); assert.match(await page.locator('.gamification-level').innerText(), /31 \/ 250 XP/); await noOverflow(page); await context.close();
      results.push({ width, resetV2: true, lessonFirst: 48, dailyAction: 25, replayImprovement: 8, simulatorOnce: 100, finalXp: 181, pendingOnly: true, stableShuffleAndCase: true, reloadNoDuplicate: true, accessibilityViolations: 0 });
    }
    // A perfect first completion gets 71 lesson XP + 10 Daily Goal XP.
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' }); const page = await context.newPage(); await page.clock.setFixedTime(new Date('2026-10-04T12:00:00Z')); await goto(page, '/lectie/phishing'); await play(page, 9); assert.equal(engine.getTotalXp(await read(page)), 81); await context.close();
    // Future-version storage remains untouched even after a daily action.
    const future = await browser.newContext(); await future.addInitScript(key => localStorage.setItem(key, JSON.stringify({ version: 3, future: 'keep' })), key); const fp = await future.newPage(); await goto(fp, '/'); await fp.locator('.challenge-answers button').first().click(); await fp.locator('.challenge-feedback').waitFor(); assert.deepEqual(await read(fp), { version: 3, future: 'keep' }); await future.close();
    assert.deepEqual(errors, []); fs.writeFileSync('artifacts/gamification-v2-browser.json', JSON.stringify({ results, errors, perfectFirstWithGoal: 81, futureVersionPreserved: true }, null, 2)); console.log(JSON.stringify({ results, errors }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });


