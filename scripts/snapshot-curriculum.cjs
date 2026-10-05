/* eslint-disable @typescript-eslint/no-require-imports -- Local audit tool. */
const fs = require('node:fs');
const { load } = require('./learning-test-content.cjs');
const registry = load('src/content/lessons/index.ts');
const engine = load('src/lib/progress.ts');
const { categories } = load('src/content/categories.ts');
const now = new Date('2026-10-05T10:00:00Z');
const written = [...registry.getReadyLessons(), ...registry.legacyQuickLessons];
let progress = engine.createEmptyProgress(now);
for (const lesson of registry.getReadyLessons()) {
  const answers = lesson.screens.filter(engine.isAnswerScreen).map(s => ({ screenId: s.id, selectedOptionId: engine.getCorrectAnswerId(s) }));
  progress = engine.completeLessonSession(progress, { lessonId: lesson.id, sessionId: 'before-curriculum-' + lesson.id, answers }, now).progress;
}
fs.writeFileSync('artifacts/curriculum-final-before.json', JSON.stringify({ categories, written, progress, normalized: engine.normalizeProgress(progress, now), totalXp: engine.getTotalXp(progress), profile: engine.getProfileStats(progress, '2026-10-05') }, null, 2));
console.log('Saved full written content and progress v2 invariants.');
