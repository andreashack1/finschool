/* eslint-disable @typescript-eslint/no-require-imports -- Stable visual order and semantic answer integration checks. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const { load } = require('./learning-test-content.cjs');
const { displayedCorrectIndex } = require('./browser-lesson-options.cjs');
const registry = load('src/content/lessons/index.ts');
const engine = load('src/lib/progress.ts');
const lesson = registry.getReadyLessons().find(lesson => lesson.id === 'phishing');
const base = process.env.FINLY_BASE_URL || 'http://127.0.0.1:3100';
const errors = [], results = [];
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    for (const width of [375, 390, 430, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      await page.addLocatorHandler(page.locator('.finly-level-dialog'), async () => page.locator('.finly-level-dialog .app-button').click());
      await page.goto(`${base}/lectie/${lesson.id}`, { waitUntil: 'networkidle' });
      const orders = () => page.locator('.lesson-answer').evaluateAll(elements => elements.map(element => element.getAttribute('data-option-id')));
      const storage = () => page.evaluate(() => localStorage.getItem('finly-progress-v2'));
      const domainStorage = async () => {
        const progress = JSON.parse(await storage());
        // Existing achievement toasts mark themselves seen asynchronously;
        // this UI acknowledgement is unrelated to opening the case reader.
        progress.seenAchievementToastIds = [];
        return JSON.stringify(progress);
      };
      const rounds = [];
      for (let round = 0; round < 3; round++) {
        const sessionOrder = {};
        let question = 0;
        for (const screen of lesson.screens) {
          await page.getByRole('heading', { name: screen.title, exact: true }).waitFor();
          if (screen.type === 'final') break;
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
          if (engine.isAnswerScreen(screen)) {
            const originalOrder = await orders();
            sessionOrder[screen.id] = originalOrder;
            const correctIndex = await displayedCorrectIndex(page, screen);
            const correctId = engine.getCorrectAnswerId(screen);
            if (screen.type === 'adevarat_fals') assert.deepEqual(originalOrder, ['true', 'false']);
            await page.setViewportSize({ width: width + 1, height: 845 });
            await page.setViewportSize({ width, height: 844 });
            assert.deepEqual(await orders(), originalOrder, 'Resize preserves order');
            const savedBefore = await domainStorage();
            const progressBefore = await page.locator('.lesson-progress').getAttribute('aria-valuenow');
            if (screen.caseId) {
              await page.getByRole('button', { name: 'Recitește cazul' }).click();
              await page.locator('dialog.lesson-case-dialog').waitFor();
              await page.keyboard.press('1');
              assert.equal(await page.locator('.lesson-answer:disabled').count(), 0);
              await page.keyboard.press('Escape');
              await page.locator('dialog.lesson-case-dialog').waitFor({ state: 'detached' });
              assert.deepEqual(await orders(), originalOrder, 'Case reader preserves order');
              assert.equal(await domainStorage(), savedBefore);
              assert.equal(await page.locator('.lesson-progress').getAttribute('aria-valuenow'), progressBefore);
              assert.equal(await page.getByRole('button', { name: 'Recitește cazul' }).evaluate(element => element === document.activeElement), true);
            }
            const wrong = round === 0 && question === 0;
            const chosenIndex = wrong ? (correctIndex + 1) % originalOrder.length : correctIndex;
            // Numeric shortcuts must follow displayed order, including after shuffle.
            await page.keyboard.press(String(chosenIndex + 1));
            await page.locator('.lesson-feedback').waitFor();
            assert.deepEqual(await orders(), originalOrder, 'Feedback preserves order');
            assert.equal(await page.locator('.lesson-answer[aria-pressed="true"]').getAttribute('data-option-id'), originalOrder[chosenIndex]);
            assert.equal(await page.locator('.lesson-answer.correct').getAttribute('data-option-id'), correctId);
            assert.equal(await page.locator('.lesson-feedback-title strong').innerText(), wrong ? 'Nu chiar.' : 'Corect.');
            assert.equal(await page.locator('.lesson-feedback > p').innerText(), wrong ? screen.incorrectFeedback : screen.correctFeedback);
            if (wrong) assert.equal(await page.locator('.lesson-answer.wrong').getAttribute('data-option-id'), originalOrder[chosenIndex]);
            if (screen.caseId) {
              await page.getByRole('button', { name: 'Recitește cazul' }).click();
              await page.getByRole('button', { name: 'Închide cazul' }).click();
              assert.deepEqual(await orders(), originalOrder, 'Case reader after submit preserves order');
              assert.equal(await page.locator('.lesson-answer[aria-pressed="true"]').getAttribute('data-option-id'), originalOrder[chosenIndex]);
            }
            if (round === 0 && question === 0) await page.screenshot({ path: `artifacts/shuffle-wrong-${width}.png`, fullPage: true });
            question++;
          }
          await page.locator('.lesson-continue').click();
        }
        const progress = JSON.parse(await storage());
        assert.equal(engine.getTotalXp(progress), round === 0 ? 62 : 66);
        assert.ok(engine.getCompletedLessonIds(progress).includes(lesson.id));
        assert.equal(progress.uniqueCorrectAnswers.filter(key => key.startsWith(`${lesson.id}:`)).length, round === 0 ? 8 : 9);
        assert.ok(Boolean(progress.achievementUnlocks['trained-eye']));
        rounds.push(sessionOrder);
        if (round < 2) await page.getByRole('button', { name: 'Refă lecția' }).click();
      }
      results.push({ width, stableAfterResizeFeedbackAndCaseReader: true, shortcutsFollowDisplayedOrder: true,
        trueFalseOrderFixed: true, oneMistakeWithGoalXp: 62, laterImprovementXp: 4, rewardedReplayXp: 0,
        uniqueMastery: 9, replayOrderDiffered: JSON.stringify(rounds[0]) !== JSON.stringify(rounds[1]) });
      await context.close();
    }
    assert.deepEqual(errors, []);
    fs.writeFileSync('artifacts/option-shuffle-browser.json', JSON.stringify({ results, errors }, null, 2));
    console.log(JSON.stringify({ results, errors }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

