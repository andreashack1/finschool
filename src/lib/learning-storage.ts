// Compatibility helpers for old content/routes. All storage I/O lives in progress.ts.
import type { LearningProgress } from "../types/learning";
export { legacyLessonIds } from "./progress";
export const LEARNING_STORAGE_KEY = "finly-learning-progress-v1";
export const emptyProgress = (): LearningProgress => ({ version: 1, completedLessonIds: [], lastLessonId: null, updatedAt: null });
export function parseProgress(raw: string | null): LearningProgress {
  try {
    const value: unknown = raw ? JSON.parse(raw) : null;
    if (!value || typeof value !== "object" || !("completedLessonIds" in value) || !Array.isArray(value.completedLessonIds)) return emptyProgress();
    return { ...emptyProgress(), completedLessonIds: [...new Set(value.completedLessonIds.filter((id: unknown): id is string => typeof id === "string"))], lastLessonId: "lastLessonId" in value && typeof value.lastLessonId === "string" ? value.lastLessonId : null, updatedAt: "updatedAt" in value && typeof value.updatedAt === "string" ? value.updatedAt : null };
  } catch { return emptyProgress(); }
}
