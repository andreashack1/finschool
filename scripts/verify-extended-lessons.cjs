/* eslint-disable @typescript-eslint/no-require-imports -- Pure content contract tests. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { load } = require('./learning-test-content.cjs');
const { getReadyLessons } = load('src/content/lessons/index.ts');
const { ReadyLessonSchema, wordCount } = load('src/types/learning-schema.ts');
const { validateContentTree } = load('src/lib/learning-validation.ts');
const { categories } = load('src/content/categories.ts');
const registry = load('src/content/lessons/index.ts');
const engine = load('src/lib/progress.ts');
const previous = JSON.parse(fs.readFileSync('artifacts/extended-lessons-before.json', 'utf8'));
const copy = value => structuredClone(value);
const lessons = getReadyLessons();
assert.equal(lessons.length, 7);
for (const lesson of lessons) {
  const old = previous.find(value => value.id === lesson.id);
  assert.ok(old);
  for (const key of ['id', 'categoryId', 'chapterId', 'xp']) assert.equal(lesson[key], old[key]);
  assert.equal(lesson.minutes, 5);
  assert.equal(lesson.contentVersion, 2);
  assert.equal(lesson.formatVersion, 2);
  assert.ok(ReadyLessonSchema.safeParse(lesson).success);
  const questions = lesson.screens.filter(engine.isAnswerScreen);
  assert.equal(questions.length, 9);
  assert.equal(lesson.screens.length, 16);
  for (const screen of lesson.screens.filter(value => value.type === 'explicatie')) assert.ok(wordCount(screen.paragraphs.join(' ')) >= 80);
  const answers = questions.map(screen => ({ screenId: screen.id, selectedOptionId: engine.getCorrectAnswerId(screen) }));
  const now = new Date('2026-10-03T10:00:00Z');
  const first = engine.completeLessonSession(engine.createEmptyProgress(), { lessonId: lesson.id, sessionId: 'perfect', answers }, now);
  assert.equal(first.xpGained, 81);
  const replay = engine.completeLessonSession(first.progress, { lessonId: lesson.id, sessionId: 'new-content-replay', answers }, now);
  assert.equal(replay.xpGained, 0);
  const preserved = engine.normalizeProgress({ ...first.progress, uniqueCorrectAnswers: [...first.progress.uniqueCorrectAnswers, lesson.id + ':old-semantic-question'] }, now);
  assert.deepEqual(engine.getCompletedLessonIds(preserved), engine.getCompletedLessonIds(first.progress));
  assert.deepEqual(preserved.xp_events, first.progress.xp_events);
  assert.equal(engine.getTotalXp(preserved), engine.getTotalXp(first.progress));
  assert.ok(preserved.uniqueCorrectAnswers.includes(lesson.id + ':old-semantic-question'));
  const mistaken = engine.completeLessonSession(engine.createEmptyProgress(), { lessonId: lesson.id, sessionId: 'one-mistake', answers: answers.map((answer, index) => index ? answer : { ...answer, selectedOptionId: 'wrong' }) }, now);
  assert.equal(mistaken.xpGained, 62);
  assert.equal(engine.completeLessonSession(mistaken.progress, { lessonId: lesson.id, sessionId: 'later-perfect', answers }, now).xpGained, 4);
}
const valid = lessons[0];
const updated = copy(valid);
updated.contentVersion = 3;
assert.ok(ReadyLessonSchema.safeParse(updated).success, 'content revision keeps the declared format');
const legacyUpdated = copy(registry.legacyQuickLessons[0]);
legacyUpdated.contentVersion = 2;
assert.ok(ReadyLessonSchema.safeParse(legacyUpdated).success, 'legacy revisions do not acquire the extended format');
function fails(label, mutate, expected) {
  const lesson = copy(valid);
  mutate(lesson);
  const result = ReadyLessonSchema.safeParse(lesson);
  assert.equal(result.success, false, label);
  assert.match(result.error.message, expected, label);
  assert.throws(() => validateContentTree(categories, registry.lessons.map(value => value.id === lesson.id ? lesson : value)), new RegExp('Lesson "' + lesson.id + '"'), label);
}
fails('seven questions', lesson => lesson.screens.splice(12, 2), /expected 9 interactive questions, found 7/);
fails('missing remember', lesson => lesson.screens.splice(14, 1), /tine_minte/);
fails('short case', lesson => lesson.screens[7].paragraphs = ['Prea scurt.', 'Tot scurt.'], /expected 120-200/);
fails('long explanation', lesson => lesson.screens[1].paragraphs = [Array(151).fill('cuvânt').join(' '), 'Încă un paragraf.'], /expected 80-150/);
fails('dangling case', lesson => lesson.screens[8].caseId = 'missing', /missing previous case/);
fails('final not last', lesson => [lesson.screens[14], lesson.screens[15]] = [lesson.screens[15], lesson.screens[14]], /then final/);
fails('missing feedback', lesson => delete lesson.screens[2].incorrectFeedback, /requires correct and incorrect feedback/);
fails('duplicate screen', lesson => lesson.screens[3].id = lesson.screens[2].id, /duplicate screen IDs/);
fails('invalid option', lesson => lesson.screens[2].correctOption = 'missing', /missing correct option/);
fails('duplicate option', lesson => lesson.screens[2].options[1].id = lesson.screens[2].options[0].id, /duplicate option IDs/);
fails('action required', lesson => lesson.screens[14].items.at(-1).title = 'Altceva', /Ce poți face azi/);
fails('missing content version', lesson => delete lesson.contentVersion, /requires contentVersion/);
for (const id of ['link', 'pin', 'cod']) assert.ok(valid.screens.some(screen => screen.id === id));
fs.writeFileSync('artifacts/extended-content-validation.json', JSON.stringify({
  lessons: lessons.map(lesson => ({
    id: lesson.id, categoryId: lesson.categoryId, chapterId: lesson.chapterId,
    minutes: lesson.minutes, xp: lesson.xp, contentVersion: lesson.contentVersion,
    formatVersion: lesson.formatVersion, steps: lesson.screens.length,
    questions: lesson.screens.filter(engine.isAnswerScreen).length,
    questionTypes: [...new Set(lesson.screens.filter(engine.isAnswerScreen).map(screen => screen.type))],
    explanationWords: lesson.screens.filter(screen => screen.type === 'explicatie').map(screen => wordCount(screen.paragraphs.join(' '))),
    caseWords: wordCount(lesson.screens[7].paragraphs.join(' ')),
    rememberItems: lesson.screens[14].items.length,
  })),
  invalidContentRejected: true, originalIdsAndXpPreserved: true,
  perfectSessionWithGoalXp: 81, oneMistakeWithGoalXp: 62, laterImprovementXp: 4, rewardedReplayXp: 0,
  historicalMasteryPreserved: true,
}, null, 2));
console.log('PASS: seven extended lessons, 112 steps, 63 questions; invalid formats throw; IDs, rewards, completed progress and historical mastery preserved.');

