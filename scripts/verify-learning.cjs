/* eslint-disable @typescript-eslint/no-require-imports -- Canonical curriculum, compatibility and progression contracts. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { load } = require('./learning-test-content.cjs');
const { categories, getCategory } = load('src/content/categories.ts');
const registry = load('src/content/lessons/index.ts');
const { validateContentTree, isValidScreen } = load('src/lib/learning-validation.ts');
const { CategorySchema, LessonSchema } = load('src/types/learning-schema.ts');
const { categoryProgress, chapterProgress, lessonState, progressFor } = load('src/lib/learning-progress.ts');
const engine = load('src/lib/progress.ts');
const canonical = require('../artifacts/canonical-curriculum.json');
const before = require('../artifacts/curriculum-final-before.json');
const oldCategories = require('../artifacts/curriculum-before.json');
const { retiredLessons } = load('src/content/archive/retired-lessons.ts');
const ready = registry.getReadyLessons();
assert.equal(categories.length, 10);
assert.equal(registry.lessons.length, 100);
assert.equal(ready.length, 100);
assert.equal(new Set(ready.map(l => l.id)).size, 100);
assert.deepEqual(categories.map(c => c.order), Array.from({ length: 10 }, (_, i) => i + 1));
assert.deepEqual(categories.map(c => c.chapters.length), Array(10).fill(3));
assert.deepEqual(categories.map(c => c.chapters.reduce((n, ch) => n + ch.lessons.length, 0)), Array(10).fill(10));
assert.deepEqual(ready.map(l => [l.id,l.title,l.categoryId,l.chapterId]), canonical.map(l => [l.id,l.title,l.categoryId,l.chapterId]));
assert.deepEqual(registry.legacyQuickLessons.map(l => l.id), ['card-debit-vs-credit']);
assert.equal(registry.getLegacyQuickLesson('primul-buget'), registry.getLessonById('primul-buget'));
assert.equal(registry.getLegacyQuickLesson('unknown'), undefined);
assert.equal(getCategory('cum-functioneaza-banii').id, 'cuvintele-banilor');
assert.equal(getCategory('economia-pe-scurt').id, 'cuvintele-banilor');
assert.equal(registry.getLessonsByCategory('economia-pe-scurt').length, 10);

// Published semantic screens remain identical; only location changes.
for (const old of before.written) {
  const lesson = old.formatVersion === 2 ? registry.getLessonById(old.id) : registry.getLegacyQuickLesson(old.id);
  assert.ok(lesson, old.id);
  for (const key of ['id','slug','title','xp','minutes','contentVersion','formatVersion']) assert.equal(lesson[key], old[key], old.id + ':' + key);
  assert.deepEqual(lesson.screens, old.screens, 'Preserve question meaning and answer IDs: ' + old.id);
}
for (const category of [...oldCategories, ...before.categories]) for (const chapter of category.chapters) for (const old of chapter.lessons) {
  const id = typeof old === 'string' ? old : old.id;
  assert.ok(registry.getLessonById(id), 'Preserve old lesson URL: ' + id);
}
for (const retired of retiredLessons) {
  assert.equal(registry.getLessonById(retired.id), retired);
  assert.equal(registry.getLessonBySlug(retired.slug), retired);
  assert.ok(!ready.some(l => l.id === retired.id));
  assert.ok(LessonSchema.safeParse(retired).success);
}

for (const category of categories) {
  const list = registry.getLessonsByCategory(category.id);
  assert.equal(categoryProgress(category.id, []).available, 10);
  assert.equal(categoryProgress(category.id, []).percentage, 0);
  assert.equal(lessonState(list[0], []), 'current');
  for (let i = 0; i < list.length; i++) {
    const prefix = list.slice(0, i).map(l => l.id);
    assert.equal(lessonState(list[i], prefix), 'current', list[i].id);
    if (i) assert.equal(lessonState(list[i], prefix.slice(0, -1)), 'locked', list[i].id);
    assert.equal(categoryProgress(category.id, prefix).percentage, i * 10);
    assert.equal(progressFor(list, [...prefix,...prefix]).completed, i, 'Duplicate IDs do not inflate completion');
    assert.equal(registry.getNextLesson(prefix, list[i].id).id, list[i].id);
  }
  assert.equal(categoryProgress(category.id, list.map(l => l.id)).percentage, 100);
  for (const chapter of category.chapters) assert.equal(chapterProgress(chapter.id, chapter.lessons, category.id).percentage, 100);
}
assert.equal(registry.getNextLesson([]).id, 'ce-sunt-banii');
assert.equal(registry.getNextLesson([], 'primul-contract-de-munca').id, 'primul-contract-de-munca');
assert.notEqual(registry.getNextLesson([], 'ce-este-inflatia').id, 'ce-este-inflatia', 'A locked last lesson cannot bypass its prerequisites');
assert.equal(registry.getNextLesson(ready.map(l => l.id)), undefined);
assert.equal(registry.getLessonById('unknown'), undefined);
assert.equal(registry.getLessonBySlug('unknown'), undefined);
for (const lesson of ready) {
  assert.ok(LessonSchema.safeParse(lesson).success, lesson.id);
  assert.equal(registry.getLessonBySlug(lesson.slug), lesson);
  for (const screen of lesson.screens) assert.ok(isValidScreen(screen), lesson.id + ':' + screen.id);
}

const now = new Date('2026-10-05T12:00:00Z');
const preserved = engine.normalizeProgress(before.normalized, now);
assert.equal(engine.getTotalXp(preserved), before.totalXp);
assert.deepEqual(preserved.xp_events, before.normalized.xp_events);
assert.deepEqual(preserved.lessonStats, before.normalized.lessonStats);
assert.deepEqual(preserved.uniqueCorrectAnswers, before.normalized.uniqueCorrectAnswers);
for (const [id, unlock] of Object.entries(before.normalized.achievementUnlocks)) assert.deepEqual(preserved.achievementUnlocks[id], unlock);

const invalidTree = (mutate, expected) => {
  const c = structuredClone(categories), l = structuredClone(registry.lessons);
  mutate(c,l); assert.throws(() => validateContentTree(c,l), expected);
};
invalidTree(c => { c[1].id = c[0].id; }, /Duplicate category/);
invalidTree((c,l) => { l[1].id = l[0].id; }, /Duplicate lesson/);
invalidTree(c => { c[0].chapters[0].lessons[0] = 'missing'; }, /references missing lesson/);
invalidTree((c,l) => { l[0].chapterId = 'missing'; }, /chapter reference/);
invalidTree((c,l) => { l[0].categoryId = 'missing'; }, /category\/chapter reference/);
invalidTree(c => { c[1].chapters[0].lessons.push(c[0].chapters[0].lessons[0]); }, /more than one chapter/);
invalidTree(c => { c[1].order = c[0].order; }, /order/);
assert.equal(CategorySchema.safeParse({ ...categories[0], difficulty: 'invalid' }).success, false);
assert.equal(LessonSchema.safeParse({ ...ready[0], screens: [] }).success, false);
assert.equal(LessonSchema.safeParse({ ...ready[0], status: 'invalid' }).success, false);
assert.equal(isValidScreen({ ...ready[0].screens[2], correctOption: 'missing' }), false);
fs.writeFileSync('artifacts/curriculum-complete-validation.json', JSON.stringify({
  categories: categories.map(c => ({ id: c.id, chapters: c.chapters.length, lessons: registry.getLessonsByCategory(c.id).length })),
  readyLessons: ready.length, steps: ready.reduce((n,l) => n + l.screens.length, 0),
  questions: ready.reduce((n,l) => n + l.screens.filter(engine.isAnswerScreen).length, 0),
  retiredUrls: retiredLessons.length, publishedContentPreserved: true,
  progressionVerified: true, progressLedgerPreserved: true, preservedXp: before.totalXp,
}, null, 2));
console.log('PASS: 10 categories, 30 chapters, 100 ready lessons; canonical order, historical URLs/content, unlocks, progress and XP ledger preserved.');
