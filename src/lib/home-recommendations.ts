import { getNextLesson, getReadyLessons, isLessonUnlocked } from "../content/lessons";
import type { ReadyLesson } from "../types/learning";

/** Secondary Home discovery, in canonical curriculum order. Never a recap list. */
export function getHomeRecommendations(completed: readonly string[], lastLessonId?: string | null): ReadyLesson[] {
  const current = getNextLesson(completed, lastLessonId);
  const candidates = getReadyLessons().filter(lesson =>
    lesson.id !== current?.id && !completed.includes(lesson.id) && isLessonUnlocked(lesson, completed)
  );
  const first = candidates[0];
  if (!first) return [];
  const second = candidates.find(lesson => lesson.categoryId !== first.categoryId) ?? candidates[1];
  return second ? [first, second] : [first];
}
