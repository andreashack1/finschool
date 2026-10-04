/* eslint-disable @typescript-eslint/no-require-imports -- Pure content, display-order and reward contract tests. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { load } = require('./learning-test-content.cjs');
const registry = load('src/content/lessons/index.ts');
const engine = load('src/lib/progress.ts');
const { LessonScreenSchema } = load('src/types/learning-schema.ts');
const { validateContentTree } = load('src/lib/learning-validation.ts');
const { categories } = load('src/content/categories.ts');
const { shuffleOptions, shouldShuffleOptions, getDisplayOptions, validateAnswerPositions, answerPositionDistribution } = load('src/lib/lesson-options.ts');
const lessons = [...registry.getReadyLessons(), ...registry.legacyQuickLessons];
const before = JSON.parse(fs.readFileSync('artifacts/answer-options-before.json', 'utf8'));
const normalize = lesson => {
  const result = structuredClone(lesson);
  for (const screen of result.screens) if (shouldShuffleOptions(screen)) screen.options.sort((a, b) => a.id.localeCompare(b.id));
  return result;
};
assert.deepEqual(lessons.map(lesson => lesson.id), before.map(lesson => lesson.id));
const now = new Date('2026-10-04T10:00:00Z');
for (const lesson of lessons) {
  const previous = before.find(value => value.id === lesson.id);
  // Covers every text, feedback, ID, correct mapping, screen order and metadata.
  assert.deepEqual(normalize(lesson), normalize(previous), `Only eligible option order may change: ${lesson.id}`);
  validateAnswerPositions(lesson);
  const original = JSON.stringify(lesson);
  for (const screen of lesson.screens) {
    const first = getDisplayOptions(screen, lesson.id, 'session-one');
    for (let i = 0; i < 10; i++) assert.deepEqual(getDisplayOptions(screen, lesson.id, 'session-one'), first);
    if (screen.type === 'adevarat_fals') {
      assert.equal(shouldShuffleOptions(screen), false);
      assert.deepEqual(first.map(option => option.label), ['Adevărat', 'Fals']);
    }
    if (screen.type === 'calcul') {
      assert.equal(shouldShuffleOptions(screen), false);
      assert.deepEqual(first.map(option => option.id), screen.options.map(option => option.id));
    }
    if (shouldShuffleOptions(screen)) {
      assert.deepEqual(first.map(option => option.id).sort(), screen.options.map(option => option.id).sort());
      const correct = engine.getCorrectAnswerId(screen);
      assert.equal(first.find(option => option.id === correct).label, screen.options.find(option => option.id === correct).label);
      assert.notEqual(first.find(option => option.id !== correct).id, correct);
      const fixed = { ...screen, shuffle: false };
      assert.equal(LessonScreenSchema.parse(fixed).shuffle, false);
      assert.equal(shouldShuffleOptions(fixed), false);
      for (const seed of ['one', 'two']) assert.deepEqual(getDisplayOptions(fixed, lesson.id, seed), screen.options);
    }
  }
  assert.equal(JSON.stringify(lesson), original, 'Imported content is immutable');
  const answers = seed => lesson.screens.filter(engine.isAnswerScreen).map(screen => ({
    screenId: screen.id,
    selectedOptionId: getDisplayOptions(screen, lesson.id, seed).find(option => option.id === engine.getCorrectAnswerId(screen)).id,
  }));
  const first = engine.completeLessonSession(engine.createEmptyProgress(), { lessonId: lesson.id, sessionId: 'one', answers: answers('one') }, now);
  assert.equal(first.xpGained, lesson.xp + 20);
  const replay = engine.completeLessonSession(first.progress, { lessonId: lesson.id, sessionId: 'two', answers: answers('two') }, now);
  assert.equal(replay.xpGained, 0);
  assert.deepEqual(replay.progress.uniqueCorrectAnswers, first.progress.uniqueCorrectAnswers);
  assert.deepEqual(replay.progress.completedLessonIds, first.progress.completedLessonIds);
  assert.deepEqual(replay.progress.awardedRewardKeys, first.progress.awardedRewardKeys);
  const wrong = answers('wrong');
  const screen = lesson.screens.find(screen => screen.id === wrong[0].screenId);
  wrong[0].selectedOptionId = getDisplayOptions(screen, lesson.id, 'wrong').find(option => option.id !== engine.getCorrectAnswerId(screen)).id;
  const mistaken = engine.completeLessonSession(engine.createEmptyProgress(), { lessonId: lesson.id, sessionId: 'wrong', answers: wrong }, now);
  assert.equal(mistaken.xpGained, lesson.xp);
  assert.equal(engine.completeLessonSession(mistaken.progress, { lessonId: lesson.id, sessionId: 'later', answers: answers('later') }, now).xpGained, 20);
}

const input = Object.freeze(['a', 'b', 'c', 'd'].map(id => Object.freeze({ id })));
assert.equal(new Set(Array.from({ length: 30 }, (_, i) => shuffleOptions(input, String(i)).map(option => option.id).join(''))).size > 1, true);
assert.deepEqual(input.map(option => option.id), ['a', 'b', 'c', 'd']);
assert.notEqual(shuffleOptions(input, 'seed'), input);
assert.deepEqual(shuffleOptions([], 'seed'), []);
assert.deepEqual(shuffleOptions(['one'], 'seed'), ['one']);
const q = (id, position, arity = 3, shuffle) => ({ id, type: 'variante', title: id, question: id, explanation: id, options: Array.from({ length: arity }, (_, i) => ({ id: String(i), label: `${id}-${i}` })), correctOption: String(position), ...(shuffle === undefined ? {} : { shuffle }) });
const fixture = screens => ({ ...lessons[0], screens });
assert.throws(() => validateAnswerPositions(fixture([q('q1', 0), q('q2', 0), q('q3', 0)])), /position "A" appears 3 times consecutively on screens q1, q2, q3/);
assert.throws(() => validateAnswerPositions(fixture([q('q1', 0), q('q2', 1), q('q3', 0), q('q4', 1)])), /unbalanced.*3-option/);
validateAnswerPositions(fixture([q('q1', 0), q('q2', 0)]));
validateAnswerPositions(fixture([q('q1', 0), q('q2', 1), q('q3', 2), q('q4', 0, 4), q('q5', 1, 4), q('q6', 2, 4), q('q7', 3, 4)]));
validateAnswerPositions(fixture([q('q1', 0, 3, false), q('q2', 0, 3, false), q('q3', 0, 3, false)]));
assert.throws(() => validateAnswerPositions(fixture([
  q('q1', 0), { type: 'adevarat_fals', id: 'tf', correctAnswer: false },
  q('q2', 0, 4), q('exception', 2, 3, false), q('q3', 0),
])), /screens q1, q2, q3/);
const logical = q('logical', 2, 3, false);
logical.options[2].label = 'Toate cele de mai sus';
assert.deepEqual(getDisplayOptions(logical, 'lesson', 'seed'), logical.options);
const biased = structuredClone(lessons[0]);
for (const screen of biased.screens.filter(shouldShuffleOptions)) {
  const correct = screen.options.find(option => option.id === screen.correctOption);
  screen.options = [correct, ...screen.options.filter(option => option.id !== screen.correctOption)];
}
assert.throws(() => validateContentTree(categories, registry.lessons.map(lesson => lesson.id === biased.id ? biased : lesson)), /appears 3 times consecutively/);
const report = lessons.map(lesson => {
  const { questions, groups } = answerPositionDistribution(lesson);
  return { id: lesson.id, title: lesson.title, sequence: questions.map(q => String.fromCharCode(65 + q.position)).join(' '), groups: [...groups].map(([arity, counts]) => ({ arity, counts })), contentVersion: lesson.contentVersion ?? null };
});
fs.writeFileSync('artifacts/answer-options-distribution.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
console.log('PASS: static balance, exact text/ID/metadata integrity, seeded shuffle stability, exclusions, immutability, first attempts, perfect/replay rewards and unique mastery.');
