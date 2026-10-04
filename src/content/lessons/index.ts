import { categories } from "../categories";
import { LessonSchema } from "../../types/learning-schema";
import { validateContentTree } from "../../lib/learning-validation";
import type { Lesson, ReadyLesson } from "../../types/learning";
import { salaryLesson } from "./salariu-brut-vs-net";
import { inflationLesson } from "./inflatia";
import { comingSoonLessons, legacyLessons } from "./coming-soon";
import { cardLesson } from "./card-debit-vs-credit";
import { budgetLesson } from "./primul-buget";
import { emergencyFundLesson } from "./fondul-de-urgenta";
import { creditScoreLesson } from "./scorul-de-credit";
import { phishingLesson } from "./phishing";
import { compoundInterestLesson } from "./dobanda-compusa";
import { ReadyLessonSchema } from "../../types/learning-schema";
import { validateAnswerPositions } from "../../lib/lesson-options";

// Only the unpublished card experience still has separate legacy content.
export const legacyQuickLessons = ReadyLessonSchema.array().parse([cardLesson]);
for (const lesson of legacyQuickLessons) {
  validateAnswerPositions(lesson);
  const category = categories.find(c => c.id === lesson.categoryId);
  if (!category?.chapters.some(c => c.id === lesson.chapterId)) throw new Error(`Legacy quick lesson "${lesson.id}" references an invalid category/chapter`);
}
// Published lessons also resolve from their old quick URLs, using one object.
const publishedQuickLessonIds = [budgetLesson.id];
export const getLegacyQuickLesson = (id: string) => legacyQuickLessons.find(l => l.id === id) ?? (publishedQuickLessonIds.includes(id) ? getReadyLessons().find(l => l.id === id) : undefined);

const content = [salaryLesson, inflationLesson, budgetLesson, emergencyFundLesson, creditScoreLesson, phishingLesson, compoundInterestLesson, ...comingSoonLessons];
validateContentTree(categories, content, legacyLessons);
const registry = new Map(LessonSchema.array().parse(content).map(l => [l.id, l]));
// The declared curriculum is the only source of pedagogical order.
export const lessons: Lesson[] = categories.flatMap(c => c.chapters.flatMap(ch => ch.lessons.map(id => registry.get(id)!)));
export const getLessonById = (id: string) => lessons.find(l => l.id === id) ?? legacyLessons.find(l => l.id === id);
export const getLessonBySlug = (slug: string) => lessons.find(l => l.slug === slug) ?? legacyLessons.find(l => l.slug === slug);
export const getLessonsByCategory = (id: string) => lessons.filter(l => l.categoryId === id);
export const getLessonsByChapter = (id: string, categoryId?: string) => lessons.filter(l => l.chapterId === id && (!categoryId || l.categoryId === categoryId));
export const getReadyLessons = () => lessons.filter((l): l is ReadyLesson => l.status === "ready");
export const getActiveReadyLessons = getReadyLessons;
export function getNextLesson(completed: readonly string[], lastLessonId?: string | null): ReadyLesson | undefined {
  const available = getReadyLessons().filter(l => !completed.includes(l.id) && isLessonUnlocked(l, completed));
  return available.find(l => l.id === lastLessonId) ?? available[0];
}
export const getNextIncompleteLesson = getNextLesson;
// Progression is linear inside each category. Coming-soon never blocks.
export function isLessonUnlocked(lesson: Lesson, completed: readonly string[]): boolean {
  if (lesson.status !== "ready") return false;
  const ready = getLessonsByCategory(lesson.categoryId).filter(l => l.status === "ready");
  const index = ready.findIndex(l => l.id === lesson.id);
  return index >= 0 && ready.slice(0, index).every(l => completed.includes(l.id));
}
