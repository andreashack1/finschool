/* eslint-disable @typescript-eslint/no-require-imports -- Emits the explicit, static production registry. */
const fs = require('node:fs');
const { load } = require('./learning-test-content.cjs');
const { entries } = require('./final-curriculum-map.cjs');
const previous = load('src/content/lessons/coming-soon.ts');
const active = new Set(entries.map(e => e.id));
const retired = [...previous.comingSoonLessons, ...previous.legacyLessons].filter(l => !active.has(l.id));
fs.writeFileSync('src/content/archive/retired-lessons.ts', 'import { ComingSoonLessonSchema } from "../../types/learning-schema";\n\n// Compatibility metadata only; excluded from curriculum, progression and XP.\nexport const retiredLessons = ComingSoonLessonSchema.array().parse(' + JSON.stringify(retired, null, 2) + ');\n');
fs.writeFileSync('src/content/lessons/coming-soon.ts', 'import type { Lesson } from "../../types/learning";\nexport { retiredLessons as legacyLessons } from "../archive/retired-lessons";\n// All one hundred active lessons are published.\nexport const comingSoonLessons: Lesson[] = [];\n');
const preservedFiles = {
  'salariu-brut-vs-net': ['salariu-brut-vs-net','salaryLesson'],
  'ce-este-inflatia': ['inflatia','inflationLesson'],
  'primul-buget': ['primul-buget','budgetLesson'],
  'fondul-de-urgenta': ['fondul-de-urgenta','emergencyFundLesson'],
  'scorul-de-credit': ['scorul-de-credit','creditScoreLesson'],
  'phishing': ['phishing','phishingLesson'],
  'dobanda-compusa': ['dobanda-compusa','compoundInterestLesson']
};
for (const entry of entries.filter(e => e.existing)) {
  const file = 'src/content/lessons/' + preservedFiles[entry.id][0] + '.ts';
  let source = fs.readFileSync(file, 'utf8');
  for (const key of ['categoryId', 'chapterId']) source = source.replace(new RegExp('("?' + key + '"?\\s*:\\s*)"[^"]+"'), '$1"' + entry[key] + '"');
  fs.writeFileSync(file, source);
}
const imports = entries.map((entry,i) => {
  const [file,name] = preservedFiles[entry.id] ?? [entry.id,'lesson'];
  return 'import { ' + name + ' as lesson' + i + ' } from "./' + file + '";';
});
fs.writeFileSync('src/content/lessons/index.ts', `import { categories, getCategory } from "../categories";
import { LessonSchema, ReadyLessonSchema } from "../../types/learning-schema";
import { validateContentTree } from "../../lib/learning-validation";
import { validateAnswerPositions } from "../../lib/lesson-options";
import type { Lesson, ReadyLesson } from "../../types/learning";
import { retiredLessons } from "../archive/retired-lessons";
import { cardLesson } from "./card-debit-vs-credit";
${imports.join('\n')}

// One static object per active lesson; the category tree supplies ordering.
const content = LessonSchema.array().parse([${entries.map((_,i) => 'lesson'+i).join(', ')}]);
validateContentTree(categories, content);
const registry = new Map(content.map(lesson => [lesson.id, lesson]));
export const lessons: Lesson[] = categories.flatMap(category => category.chapters.flatMap(chapter => chapter.lessons.map(id => registry.get(id)!)));
const retiredRegistry = new Map(retiredLessons.map(lesson => [lesson.id, lesson]));
export const legacyQuickLessons = ReadyLessonSchema.array().parse([cardLesson]);
for (const lesson of legacyQuickLessons) {
  validateAnswerPositions(lesson);
  const category = getCategory(lesson.categoryId);
  if (!category?.chapters.some(chapter => chapter.id === lesson.chapterId)) throw new Error('Invalid legacy quick lesson location: ' + lesson.id);
}
export const getLessonById = (id: string) => registry.get(id) ?? retiredRegistry.get(id);
export const getLessonBySlug = (slug: string) => lessons.find(lesson => lesson.slug === slug) ?? retiredLessons.find(lesson => lesson.slug === slug);
export const getLegacyQuickLesson = (id: string) => legacyQuickLessons.find(lesson => lesson.id === id) ?? (id === "primul-buget" ? getLessonById(id) as ReadyLesson : undefined);
export const getLessonsByCategory = (id: string) => lessons.filter(lesson => lesson.categoryId === (getCategory(id)?.id ?? id));
export const getLessonsByChapter = (id: string, categoryId?: string) => lessons.filter(lesson => lesson.chapterId === id && (!categoryId || lesson.categoryId === (getCategory(categoryId)?.id ?? categoryId)));
export const getReadyLessons = () => lessons.filter((lesson): lesson is ReadyLesson => lesson.status === "ready");
export const getActiveReadyLessons = getReadyLessons;
export function getNextLesson(completed: readonly string[], lastLessonId?: string | null): ReadyLesson | undefined {
  const available = getReadyLessons().filter(lesson => !completed.includes(lesson.id) && isLessonUnlocked(lesson, completed));
  return available.find(lesson => lesson.id === lastLessonId) ?? available[0];
}
export const getNextIncompleteLesson = getNextLesson;
export function isLessonUnlocked(lesson: Lesson, completed: readonly string[]): boolean {
  if (lesson.status !== "ready") return false;
  const ready = getLessonsByCategory(lesson.categoryId).filter(lesson => lesson.status === "ready");
  const index = ready.findIndex(candidate => candidate.id === lesson.id);
  return index >= 0 && ready.slice(0, index).every(candidate => completed.includes(candidate.id));
}
`);
console.log('Integrated 100 ready lessons; preserved seven published IDs, quick lessons and ' + retired.length + ' retired URLs.');
