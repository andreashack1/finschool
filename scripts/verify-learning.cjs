/* eslint-disable @typescript-eslint/no-require-imports -- Content and persistence contract checks. */
const assert = require('node:assert/strict');
const { load } = require('./learning-test-content.cjs');
const { categories } = load('src/content/categories.ts');
const registry = load('src/content/lessons/index.ts');
const { isValidScreen } = load('src/lib/learning-validation.ts');
const { categoryProgress, chapterProgress, lessonState, progressFor } = load('src/lib/learning-progress.ts');
const storage = load('src/lib/learning-storage.ts');
assert.equal(categories.length, 6);
assert.deepEqual(categories.filter(c => c.status === 'active').map(c => c.id), ['primul-job', 'economia-pe-scurt']);
assert.equal(new Set(registry.lessons.map(l => l.id)).size, registry.lessons.length);
assert.equal(new Set(registry.lessons.map(l => l.slug)).size, registry.lessons.length);
for (const category of categories) {
  assert.ok(category.chapters.length);
  for (const chapter of category.chapters) {
    assert.ok(chapter.lessons.length);
    for (const metadata of chapter.lessons) {
      const lesson = registry.getLessonById(metadata.id);
      assert.ok(lesson);
      assert.equal(lesson.categoryId, category.id);
      assert.equal(lesson.chapterId, chapter.id);
      assert.equal(registry.getLessonBySlug(lesson.slug), lesson);
    }
  }
}
for (const lesson of registry.getReadyLessons()) {
  assert.ok(lesson.screens.length);
  assert.equal(new Set(lesson.screens.map(s => s.id)).size, lesson.screens.length);
  for (const screen of lesson.screens) {
    assert.equal(isValidScreen(screen), true, `${lesson.id}/${screen.id}`);
    if (screen.type !== 'text' && screen.type !== 'true-false') assert.equal(screen.options.length, 4);
  }
}
const salary = registry.getLessonById('salariu-brut-vs-net');
assert.ok(salary.screens.length >= 20 && salary.screens.length <= 25);
const interactions = salary.screens.filter(s => s.type !== 'text');
assert.ok(interactions.length >= 15 && interactions.length <= 20);
assert.ok(interactions.filter(s => s.type === 'true-false').length / interactions.length <= .15);
assert.equal(registry.getNextLesson([]).id, salary.id);
assert.equal(lessonState(salary, []), 'current');
assert.equal(categoryProgress('primul-job', []).percentage, 0);
assert.equal(categoryProgress('primul-job', [salary.id]).percentage, 100);
assert.equal(chapterProgress(salary.chapterId, [salary.id]).percentage, 100);
assert.equal(registry.getNextLesson([salary.id]).id, 'ce-este-inflatia');
assert.equal(registry.getNextLesson([], 'ce-este-inflatia').id, 'ce-este-inflatia');
assert.equal(registry.getNextLesson(registry.getActiveReadyLessons().map(l => l.id)), undefined);
assert.equal(categoryProgress('economii', []).percentage, 0);
assert.equal(registry.getLessonById('missing'), undefined);
assert.equal(lessonState(registry.getLessonById('ce-este-salariul'), []), 'coming-soon');
assert.equal(isValidScreen({ type: 'quick-calc', id: 'x', title: 'x', question: 'x', explanation: 'x', context: 'x', options: [{ id: 'a', value: 1 }, { id: 'b', value: 2 }], expectedAnswer: 3 }), false);
assert.equal(isValidScreen({ ...salary.screens[1], correctOption: 'missing' }), false);
assert.equal(isValidScreen({ ...salary.screens[1], options: [] }), false);
// Simulate publishing future ready lessons: no player changes required.
const futureIndex = registry.lessons.findIndex(l => l.id === 'ce-intra-in-cont');
const oldFuture = registry.lessons[futureIndex];
const future = { ...oldFuture, status: 'ready', screens: salary.screens };
registry.lessons[futureIndex] = future;
assert.equal(lessonState(future, []), 'locked');
assert.equal(lessonState(future, [salary.id]), 'current');
assert.equal(categoryProgress('primul-job', [salary.id]).percentage, 50);
assert.equal(chapterProgress(salary.chapterId, [salary.id]).percentage, 50);
assert.equal(registry.getNextLesson([salary.id]).id, future.id);
assert.equal(progressFor([salary, future], [salary.id, salary.id]).completed, 1);
registry.lessons[futureIndex] = oldFuture;
assert.deepEqual(storage.parseProgress(null), storage.emptyProgress());
assert.deepEqual(storage.parseProgress('{invalid'), storage.emptyProgress());
assert.deepEqual(storage.parseProgress('{"version":2,"completedLessonIds":[]}'), storage.emptyProgress());
assert.deepEqual(storage.parseProgress('{"version":1,"completedLessonIds":[3]}'), storage.emptyProgress());
assert.deepEqual(storage.parseProgress('{"version":1,"completedLessonIds":["a","a"]}').completedLessonIds, ['a']);
const values = new Map();
global.window = { localStorage: { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) } };
assert.deepEqual(storage.readLearningProgress(), storage.emptyProgress());
values.set('finly-progress-v2', JSON.stringify({ state: { completed: ['salary', 'inflatie', 'simulator'] } }));
assert.deepEqual(storage.readLearningProgress().completedLessonIds, ['salariu-brut-vs-net', 'ce-este-inflatia']);
values.set(storage.LEARNING_STORAGE_KEY, 'broken');
assert.deepEqual(storage.readLearningProgress(), storage.emptyProgress());
global.window.localStorage.getItem = () => { throw new Error('blocked'); };
global.window.localStorage.setItem = () => { throw new Error('quota'); };
assert.deepEqual(storage.readLearningProgress(), storage.emptyProgress());
assert.equal(storage.writeLearningProgress(storage.emptyProgress()), false);
delete global.window;
assert.deepEqual(storage.readLearningProgress(), storage.emptyProgress());
console.log(`Learning contracts passed: ${registry.lessons.length} lessons, ${registry.getReadyLessons().length} ready, ${salary.screens.length} salary screens (${interactions.length} interactive).`);
