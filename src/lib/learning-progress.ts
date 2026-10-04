import { getLessonsByCategory, getLessonsByChapter, isLessonUnlocked } from "../content/lessons";
import type { Lesson, LessonState } from "../types/learning";
export function progressFor(lessons: readonly Lesson[], completed: readonly string[]) {
  const ready = lessons.filter(l => l.status === "ready");
  const count = ready.filter(l => completed.includes(l.id)).length;
  return { completed: count, available: ready.length, total: lessons.length, percentage: ready.length ? Math.round(count / ready.length * 100) : 0 };
}
export const categoryProgress = (id: string, completed: readonly string[]) => progressFor(getLessonsByCategory(id), completed);
export const chapterProgress = (id: string, completed: readonly string[], categoryId?: string) => progressFor(getLessonsByChapter(id, categoryId), completed);
export function lessonState(lesson: Lesson, completed: readonly string[]): LessonState {
  if (lesson.status === "coming-soon") return "coming-soon";
  if (completed.includes(lesson.id)) return "completed";
  return isLessonUnlocked(lesson, completed) ? "current" : "locked";
}
