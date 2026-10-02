import { categories } from "../categories";
import type { Lesson, ReadyLesson } from "../../types/learning";
import { salaryLesson } from "./salariu-brut-vs-net";
import { inflationLesson } from "./ce-este-inflatia";
import { cardLesson } from "./card-debit-vs-credit";
import { budgetLesson } from "./primul-buget";

const content: readonly ReadyLesson[] = [salaryLesson, inflationLesson, cardLesson, budgetLesson];
// Derive unavailable metadata from the catalog, without empty lesson files.
export const lessons: readonly Lesson[] = categories.flatMap(category => category.chapters.flatMap(chapter => chapter.lessons.map(metadata => content.find(l => l.id === metadata.id) ?? { ...metadata, status: "coming-soon" as const })));
export const getLessonById = (id: string) => lessons.find(l => l.id === id);
export const getLessonBySlug = (slug: string) => lessons.find(l => l.slug === slug);
export const getLessonsByCategory = (id: string) => lessons.filter(l => l.categoryId === id);
export const getLessonsByChapter = (id: string) => lessons.filter(l => l.chapterId === id);
export const getReadyLessons = () => lessons.filter((l): l is ReadyLesson => l.status === "ready");
export const getActiveReadyLessons = () => getReadyLessons().filter(l => categories.some(c => c.id === l.categoryId && c.status === "active"));

export function getNextLesson(completed: readonly string[], lastLessonId?: string | null): ReadyLesson | undefined {
  const available = getActiveReadyLessons().filter(l => !completed.includes(l.id) && isLessonUnlocked(l, completed));
  return available.find(l => l.id === lastLessonId) ?? available[0];
}
// Sequential chapters and lessons; unpublished content never blocks ready lessons.
export function isLessonUnlocked(lesson: Lesson, completed: readonly string[]): boolean {
  if (lesson.status !== "ready") return false;
  const ready = getLessonsByCategory(lesson.categoryId).filter(l => l.status === "ready");
  const index = ready.findIndex(l => l.id === lesson.id);
  return index >= 0 && ready.slice(0, index).every(l => completed.includes(l.id));
}
