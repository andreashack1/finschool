/* eslint-disable @typescript-eslint/no-require-imports -- Browser learning-system integration checks. */
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { load } = require('./learning-test-content.cjs');
const { getReadyLessons, getActiveReadyLessons } = load('src/content/lessons/index.ts');
const { LEARNING_STORAGE_KEY } = load('src/lib/learning-storage.ts');
const base = process.env.FINLY_BASE_URL || 'http://127.0.0.1:3100';
function correctIndex(screen) {
  if (screen.type === 'true-false') return screen.correctAnswer ? 0 : 1;
  if (screen.type === 'quick-calc') return screen.options.findIndex(o => o.value === screen.expectedAnswer);
  return screen.options.findIndex(o => o.id === screen.correctOption);
}
async function noOverflow(page) { assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, page.url()); }
async function play(page, lesson, wrong = false, keyboard = false) {
  for (let i = 0; i < lesson.screens.length; i++) {
    const screen = lesson.screens[i];
    await page.getByRole('heading', { name: screen.title, exact: true }).waitFor();
    assert.equal(await page.getByRole('progressbar').getAttribute('aria-valuenow'), String(Math.round(i / lesson.screens.length * 100)));
    await noOverflow(page);
    if (screen.type !== 'text') {
      const correct = correctIndex(screen);
      const chosen = wrong ? (correct + 1) % (screen.type === 'true-false' ? 2 : screen.options.length) : correct;
      if (keyboard) await page.keyboard.press(String(chosen + 1));
      else await page.locator('.lesson-answer').nth(chosen).click();
      await page.locator('.lesson-feedback').waitFor();
      assert.equal(await page.locator('.lesson-feedback-title strong').innerText(), wrong ? 'Nu chiar.' : 'Exact.');
      assert.equal(await page.locator('.lesson-answer.correct').count(), 1);
      assert.equal(await page.locator('.lesson-answer:disabled').count(), screen.type === 'true-false' ? 2 : screen.options.length);
      assert.ok(await page.locator('.lesson-feedback > p').innerText());
      assert.equal(await page.locator('.lesson-question h1').innerText(), screen.title);
      await noOverflow(page);
      if (!wrong && lesson.id === 'salariu-brut-vs-net' && [1, 10].includes(i)) await page.screenshot({ path: 'artifacts/learning-screen-' + page.viewportSize().width + '-' + i + '.png', fullPage: true });
    }
    if (keyboard) { await page.locator('.lesson-continue').focus(); await page.keyboard.press('Enter'); }
    else await page.locator('.lesson-continue').click();
  }
  await page.getByRole('heading', { name: 'Gata. Ai prins ideea.' }).waitFor();
  assert.equal(await page.getByRole('progressbar').getAttribute('aria-valuenow'), '100');
  await noOverflow(page);
}
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  const errors = [];
  try {
    for (const width of [375, 390, 430, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      assert.match(await page.locator('.continue-card h2').innerText(), /Salariu brut/);
      assert.equal(await page.locator('.continue-card a').getAttribute('href'), '/lectie/salariu-brut-vs-net');
      await noOverflow(page);
      await page.goto(base + '/lectii', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.course-card').count(), 6);
      assert.equal(await page.locator('a.course-card').count(), 2);
      assert.equal(await page.locator('article.learning-soon').count(), 4);
      assert.equal(await page.getByRole('progressbar').first().getAttribute('aria-valuenow'), '0');
      await noOverflow(page);
      await page.screenshot({ path: 'artifacts/learning-categories-' + width + '.png', fullPage: true });
      await page.locator('a.course-card').first().click();
      await page.waitForURL('**/lectii/primul-job');
      assert.equal(await page.locator('.learning-chapter').count(), 4);
      assert.equal(await page.locator('.path-row.current').count(), 1);
      assert.equal(await page.getByRole('progressbar').first().getAttribute('aria-valuenow'), '0');
      await noOverflow(page);
      await page.screenshot({ path: 'artifacts/learning-chapter-' + width + '.png', fullPage: true });
      await page.locator('.path-row.current').click();
      await page.waitForURL('**/lectie/salariu-brut-vs-net');
      await page.getByRole('heading', { name: 'Ai primul job. Dar cât primești?' }).waitFor();
      // Opening a lesson only records lastLessonId; it cannot complete it.
      const initial = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), LEARNING_STORAGE_KEY);
      assert.deepEqual(initial.completedLessonIds, []);
      assert.equal(initial.lastLessonId, 'salariu-brut-vs-net');
      await page.reload({ waitUntil: 'networkidle' });
      await play(page, getReadyLessons().find(l => l.id === 'salariu-brut-vs-net'), false, width === 1440);
      let progress = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), LEARNING_STORAGE_KEY);
      assert.deepEqual(progress.completedLessonIds, ['salariu-brut-vs-net']);
      assert.equal(progress.lastLessonId, null);
      assert.match(await page.locator('.lesson-reward').innerText(), /30 XP/);
      assert.equal(await page.getByRole('link', { name: 'Următoarea lecție' }).getAttribute('href'), '/lectie/ce-este-inflatia');
      await page.screenshot({ path: 'artifacts/learning-finish-' + width + '.png', fullPage: true });
      const xpAfter = await page.evaluate(() => JSON.parse(localStorage.getItem('finly-progress-v2')).state.xp);
      assert.equal(xpAfter, 750);
      await page.getByRole('link', { name: 'Înapoi la Primul job' }).click();
      await page.waitForURL('**/lectii/primul-job#primul-tau-salariu');
      assert.equal(await page.locator('.path-row.completed').count(), 1);
      const bars = await page.getByRole('progressbar').all();
      for (const bar of bars) assert.equal(await bar.getAttribute('aria-valuenow'), '100');
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.continue-card h2').innerText(), 'Ce este inflația?');
      await page.locator('.continue-card a').click();
      await page.waitForURL('**/lectie/ce-este-inflatia');
      await play(page, getReadyLessons().find(l => l.id === 'ce-este-inflatia'), width === 390);
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      assert.match(await page.locator('.continue-card h2').innerText(), /Ai terminat lecțiile disponibile/);
      await page.goto(base + '/lectii', { waitUntil: 'networkidle' });
      for (const bar of await page.getByRole('progressbar').all()) assert.equal(await bar.getAttribute('aria-valuenow'), '100');
      // Retaking with every answer wrong still teaches, and cannot award XP again.
      await page.goto(base + '/lectie/salariu-brut-vs-net', { waitUntil: 'networkidle' });
      await play(page, getReadyLessons().find(l => l.id === 'salariu-brut-vs-net'), true);
      assert.match(await page.locator('.lesson-reward').innerText(), /repetate/);
      const xpRetake = await page.evaluate(() => JSON.parse(localStorage.getItem('finly-progress-v2')).state.xp);
      assert.equal(xpRetake, 770);
      progress = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), LEARNING_STORAGE_KEY);
      assert.equal(new Set(progress.completedLessonIds).size, progress.completedLessonIds.length);
      await page.goto(base + '/lectie/blabla', { waitUntil: 'networkidle' });
      await page.getByRole('heading', { name: 'Lecția nu există.' }).waitFor();
      await page.goto(base + '/lectie/ce-este-salariul', { waitUntil: 'networkidle' });
      await page.getByRole('heading', { name: 'Lecția asta vine în curând.' }).waitFor();
      await page.goto(base + '/lectii/economii', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('.path-row.current').count(), 0);
      assert.equal(await page.getByRole('progressbar').count(), 0);
      await noOverflow(page);
      await context.close();
      results.push({ width, salary: 'correct + all wrong + retake', inflation: 'complete', progress: '0 → 100', xp: 'no duplicate', overflow: false });
    }
    for (const invalid of ['{broken', '{"version":1,"completedLessonIds":[5]}']) {
      const context = await browser.newContext();
      await context.addInitScript(({ key, invalid }) => { localStorage.setItem(key, invalid); localStorage.setItem('finly-progress-v2', 'invalid'); }, { key: LEARNING_STORAGE_KEY, invalid });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      assert.match(await page.locator('.continue-card h2').innerText(), /Salariu brut/);
      await page.goto(base + '/lectii/primul-job', { waitUntil: 'networkidle' });
      assert.equal(await page.getByRole('progressbar').first().getAttribute('aria-valuenow'), '0');
      await context.close();
    }
    // Disabled storage: a whole lesson still works in memory.
    const context = await browser.newContext();
    await context.addInitScript(() => {
      Storage.prototype.getItem = () => { throw new Error('blocked storage'); };
      Storage.prototype.setItem = () => { throw new Error('quota exceeded'); };
    });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + '/lectie/ce-este-inflatia', { waitUntil: 'networkidle' });
    await play(page, getReadyLessons().find(l => l.id === 'ce-este-inflatia'));
    await page.getByRole('link', { name: 'Înapoi la Economia pe scurt' }).click();
    assert.equal(await page.getByRole('progressbar').first().getAttribute('aria-valuenow'), '100');
    await context.close();
    // Remaining existing quick content uses the same player and preserved routes.
    const legacyContext = await browser.newContext();
    const legacyPage = await legacyContext.newPage();
    for (const [old, id] of [['carduri', 'card-debit-vs-credit'], ['buget', 'primul-buget']]) {
      await legacyPage.goto(base + '/rapid?lesson=' + old, { waitUntil: 'networkidle' });
      assert.equal(new URL(legacyPage.url()).pathname, '/lectie/' + id);
      await play(legacyPage, getReadyLessons().find(l => l.id === id));
    }
    await legacyPage.goto(base + '/lectie', { waitUntil: 'networkidle' });
    assert.equal(new URL(legacyPage.url()).pathname, '/lectie/salariu-brut-vs-net');
    await legacyContext.close();
    // Migration preserves completion and reward totals from the existing app.
    const migrationContext = await browser.newContext();
    await migrationContext.addInitScript(() => {
      if (!localStorage.getItem('finly-progress-v2')) localStorage.setItem('finly-progress-v2', JSON.stringify({ state: { xp: 999, streak: 3, record: 7, completed: ['salary'], lastStudy: null, simulation: { step: 0, balance: 3500, savings: 0, history: [] } }, version: 0 }));
    });
    const migrated = await migrationContext.newPage();
    await migrated.goto(base + '/', { waitUntil: 'networkidle' });
    assert.equal(await migrated.locator('.continue-card h2').innerText(), 'Ce este inflația?');
    assert.deepEqual(await migrated.evaluate(key => JSON.parse(localStorage.getItem(key)).completedLessonIds, LEARNING_STORAGE_KEY), ['salariu-brut-vs-net']);
    await migrated.goto(base + '/lectie/salariu-brut-vs-net', { waitUntil: 'networkidle' });
    await play(migrated, getReadyLessons().find(l => l.id === 'salariu-brut-vs-net'));
    assert.equal(await migrated.evaluate(() => JSON.parse(localStorage.getItem('finly-progress-v2')).state.xp), 999);
    await migrationContext.close();
    assert.deepEqual(errors, []);
    fs.writeFileSync('artifacts/learning-verification.json', JSON.stringify({ results, storage: ['empty', 'corrupted', 'blocked', 'quota'], readyLessons: getReadyLessons().length, activeReady: getActiveReadyLessons().length, errors }, null, 2));
    console.log(JSON.stringify({ results, errors }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
