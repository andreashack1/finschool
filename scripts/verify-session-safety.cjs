/* eslint-disable @typescript-eslint/no-require-imports -- Browser session and reward compatibility checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const { load } = require('./learning-test-content.cjs');
const registry = load('src/content/lessons/index.ts');
const engine = load('src/lib/progress.ts');
const base = process.env.FINLY_BASE_URL || 'http://127.0.0.1:3100';
const salary = registry.getLessonById('salariu-brut-vs-net');
const budget = registry.getLessonById('primul-buget');
const input = lesson => lesson.screens.filter(engine.isAnswerScreen).map(screen => ({ screenId: screen.id, selectedOptionId: engine.getCorrectAnswerId(screen) }));
const old = engine.completeLessonSession(engine.createEmptyProgress(), { lessonId: salary.id, sessionId: 'already-earned', answers: input(salary) }, new Date()).progress;
old.achievements.seenToastIds = [...old.achievements.unlockedIds];
old.uniqueCorrectAnswers.push('phishing:retired-question');
const { displayedCorrectIndex } = require('./browser-lesson-options.cjs');
const results = [];
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [375, 390, 430, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.addLocatorHandler(page.locator('.finly-level-dialog'), async () => page.locator('.finly-level-dialog .app-button').click());
      await page.goto(base, { waitUntil: 'networkidle' });
      await page.evaluate(progress => localStorage.setItem('finly-progress-v2', JSON.stringify(progress)), old);
      await page.goto(base + '/lectie/' + budget.id, { waitUntil: 'networkidle' });
      for (const screen of budget.screens.slice(0, 4)) {
        await page.getByRole('heading', { name: screen.title, exact: true }).waitFor();
        if (engine.isAnswerScreen(screen)) await page.locator('.lesson-answer').nth(await displayedCorrectIndex(page, screen)).click();
        await page.locator('.lesson-continue').click();
      }
      await page.reload({ waitUntil: 'networkidle' });
      await page.getByRole('heading', { name: budget.screens[0].title, exact: true }).waitFor();
      const read = () => page.evaluate(() => JSON.parse(localStorage.getItem('finly-progress-v2')));
      let saved = await read();
      for (const key of ['totalXp', 'completedLessonIds', 'awardedRewardKeys', 'uniqueCorrectAnswers', 'activityDates', 'achievements']) assert.deepEqual(saved[key], old[key]);
      assert.equal(await page.locator('.lesson-question-count').count(), 0);
      async function finish(oneWrong, inspectCase = false) {
        let question = 0;
        for (const screen of budget.screens) {
          await page.getByRole('heading', { name: screen.title, exact: true }).waitFor();
          if (screen.type === 'final') break;
          if (engine.isAnswerScreen(screen)) {
            if (inspectCase && screen.caseId && question === 4) {
              const prior = await read();
              const step = await page.locator('.lesson-progress').getAttribute('aria-valuenow');
              await page.getByRole('button', { name: 'Recitește cazul' }).click();
              const dialog = page.locator('dialog.lesson-case-dialog');
              await dialog.waitFor();
              assert.ok((await dialog.boundingBox()).height <= 844 * .8);
              await page.keyboard.press('Tab');
              assert.equal(await page.getByRole('button', { name: 'Închide cazul' }).evaluate(element => element === document.activeElement), true);
              await page.keyboard.press('1');
              assert.equal(await page.locator('.lesson-answer:disabled').count(), 0);
              await page.screenshot({ path: 'artifacts/extended-case-modal-' + width + '.png' });
              await page.keyboard.press('Escape');
              await dialog.waitFor({ state: 'detached' });
              assert.equal(await page.locator('.lesson-progress').getAttribute('aria-valuenow'), step);
              assert.deepEqual(await read(), prior);
            }
            const index = await displayedCorrectIndex(page, screen);
            const count = screen.type === 'adevarat_fals' ? 2 : screen.options.length;
            await page.locator('.lesson-answer').nth(oneWrong && question === 0 ? (index + 1) % count : index).click();
            await page.locator('.lesson-feedback').waitFor();
            question++;
          }
          await page.locator('.lesson-continue').click();
        }
      }
      await finish(true, true);
      saved = await read();
      assert.equal(saved.totalXp, old.totalXp + 30);
      assert.ok(!saved.awardedRewardKeys.includes('perfect:' + budget.id));
      await page.getByRole('button', { name: 'Refă lecția' }).click();
      await finish(false);
      saved = await read();
      assert.equal(saved.totalXp, old.totalXp + 50);
      await page.getByRole('button', { name: 'Refă lecția' }).click();
      await finish(false);
      saved = await read();
      assert.equal(saved.totalXp, old.totalXp + 50);
      assert.ok(saved.completedLessonIds.includes(salary.id));
      assert.ok(saved.uniqueCorrectAnswers.includes('phishing:retired-question'));
      for (const key of old.awardedRewardKeys) assert.ok(saved.awardedRewardKeys.includes(key));
      results.push({ width, sessionReloadStartsAtOne: true, globalProgressPreserved: true, oneMistakeXp: 30, laterPerfectXp: 20, replayXp: 0, caseModalNeutral: true });
      await context.close();
    }
    fs.writeFileSync('artifacts/extended-session-safety.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
