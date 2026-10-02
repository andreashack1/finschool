import type { LearningProgress } from "../types/learning";
export const LEARNING_STORAGE_KEY = "finly-learning-progress-v1";
export const emptyProgress = (): LearningProgress => ({ version: 1, completedLessonIds: [], lastLessonId: null, updatedAt: null });
export const legacyLessonIds: Readonly<Record<string, string>> = { salary: "salariu-brut-vs-net", inflatie: "ce-este-inflatia", carduri: "card-debit-vs-credit", buget: "primul-buget" };
export function parseProgress(raw: string | null): LearningProgress {
  if (!raw) return emptyProgress();
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || !("version" in value) || value.version !== 1 || !("completedLessonIds" in value) || !Array.isArray(value.completedLessonIds) || !value.completedLessonIds.every((id: unknown) => typeof id === "string")) return emptyProgress();
    return { version: 1, completedLessonIds: [...new Set(value.completedLessonIds as string[])], lastLessonId: "lastLessonId" in value && typeof value.lastLessonId === "string" ? value.lastLessonId : null, updatedAt: "updatedAt" in value && typeof value.updatedAt === "string" ? value.updatedAt : null };
  } catch { return emptyProgress(); }
}
export function readLearningProgress(): LearningProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    const raw = window.localStorage.getItem(LEARNING_STORAGE_KEY);
    if (raw !== null) return parseProgress(raw);
    const legacy: unknown = JSON.parse(window.localStorage.getItem("finly-progress-v2") ?? "null");
    if (!legacy || typeof legacy !== "object" || !("state" in legacy) || !legacy.state || typeof legacy.state !== "object" || !("completed" in legacy.state) || !Array.isArray(legacy.state.completed)) return emptyProgress();
    const completedLessonIds = legacy.state.completed.flatMap((id: unknown) => typeof id === "string" && legacyLessonIds[id] ? [legacyLessonIds[id]] : []);
    const progress = { ...emptyProgress(), completedLessonIds: [...new Set(completedLessonIds)] };
    writeLearningProgress(progress);
    return progress;
  } catch { return emptyProgress(); }
}
export function writeLearningProgress(progress: LearningProgress): boolean {
  if (typeof window === "undefined") return false;
  try { window.localStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(progress)); return true; }
  catch { return false; }
}
