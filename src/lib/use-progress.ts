"use client";
import { useEffect, useSyncExternalStore } from "react";
import { getNow, advanceDebugDay, resetDebugClock } from "./clock";
import { gamificationConfig } from "../content/gamification-config";
import type { DomainResult, LessonSessionResult, ProgressState, SimulationState } from "../types/progress";
import { createEmptyProgress, loadProgress, saveProgress, PROGRESS_STORAGE_KEY, normalizeProgress, getEffectiveDateKey, getTotalXp, getCompletedLessonIds, getSimulatorCompletionIds, addDebugXp, markFreezeToastSeen, completeLessonSession, completeDailyChallenge, saveSimulationStep, markAchievementToastSeen, markLevelCelebrated, setLastLesson } from "./progress";

type Snapshot = { progress: ProgressState; hydrated: boolean; todayKey: string | null };
const serverSnapshot: Snapshot = { progress: createEmptyProgress(), hydrated: false, todayKey: null };
let snapshot = serverSnapshot, initialized = false, storageHealthy = false;
let queue: Promise<unknown> = Promise.resolve();
const listeners = new Set<() => void>();
const publish = (progress: ProgressState, now: Date) => { snapshot = { progress, hydrated: true, todayKey: getEffectiveDateKey(progress, now) }; listeners.forEach(l => l()); };
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
function initialize() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  const now = getNow(), loaded = loadProgress(now);
  storageHealthy = loaded.changed ? saveProgress(loaded.progress) : loaded.persisted;
  publish(loaded.progress, now);
  window.addEventListener("storage", event => {
    if (event.key === PROGRESS_STORAGE_KEY || event.key === null) {
      const now = getNow(), loaded = loadProgress(now);
      storageHealthy = loaded.persisted;
      publish(loaded.progress, now);
    }
  });
  // A foreground tab crosses Bucharest midnight without refresh.
  const refreshDate = () => {
    if (snapshot.todayKey !== getEffectiveDateKey(snapshot.progress, getNow())) void commit(p => normalizeProgress(p, getNow()));
  };
  window.addEventListener("focus", refreshDate);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshDate(); });
  window.setInterval(refreshDate, gamificationConfig.ui.clockRefreshMs);
}
async function exclusive<T>(action: () => T): Promise<T> {
  if (typeof navigator !== "undefined" && navigator.locks) return navigator.locks.request(PROGRESS_STORAGE_KEY, action);
  return action();
}
// One atomic state calculation/write per action. The queue prevents same-tab
// races; Web Locks + reading the latest canonical state protect multiple tabs.
function transaction<T>(transform: (progress: ProgressState, now: Date) => { progress: ProgressState; result: T }): Promise<T> {
  initialize();
  const task = queue.then(() => exclusive(() => {
    const now = getNow(), loaded = storageHealthy ? loadProgress(now) : null;
    const previous = loaded?.persisted ? loaded.progress : normalizeProgress(snapshot.progress, now);
    const { progress, result } = transform(previous, now);
    if (JSON.stringify(progress) !== JSON.stringify(previous) || loaded?.changed) storageHealthy = saveProgress(progress);
    publish(progress, now);
    return result;
  }));
  queue = task.catch(() => undefined);
  return task;
}
function commit(transform: (progress: ProgressState, now: Date) => ProgressState) {
  return transaction((progress, now) => ({ progress: transform(progress, now), result: undefined }));
}
function domain(transform: (progress: ProgressState, now: Date) => DomainResult) {
  return transaction((progress, now) => { const result = transform(progress, now); return { progress: result.progress, result }; });
}
export const finishLessonSession = (session: LessonSessionResult) => domain((p, now) => completeLessonSession(p, session, now));
export const submitDailyChallenge = (optionId: string) => domain((p, now) => completeDailyChallenge(p, optionId, now));
export const updateSimulation = (simulation: SimulationState) => domain((p, now) => saveSimulationStep(p, simulation, now));
export const saveLastLesson = (id: string) => commit((p, now) => setLastLesson(p, id, now));
export const acknowledgeAchievement = (id: string) => commit(p => markAchievementToastSeen(p, id));
export const acknowledgeLevel = () => commit(markLevelCelebrated);
export function useProgressData() {
  const state = useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot);
  useEffect(initialize, []);
  return { ...state.progress, totalXp: getTotalXp(state.progress), completedLessonIds: getCompletedLessonIds(state.progress), simulatorCompletions: getSimulatorCompletionIds(state.progress), hydrated: state.hydrated, todayKey: state.todayKey };
}
export const acknowledgeFreeze = (date: string) => commit(p => markFreezeToastSeen(p, date));
export const debugAddXp = () => process.env.NODE_ENV === "development" ? domain((p, now) => addDebugXp(p, crypto.randomUUID(), now)) : Promise.resolve(null);
export const debugAdvanceDay = () => { if (process.env.NODE_ENV === "development") { advanceDebugDay(); return commit((p, now) => normalizeProgress(p, now)); } return Promise.resolve(); };
export const debugReset = () => { if (process.env.NODE_ENV === "development") { resetDebugClock(); return commit((_p, now) => createEmptyProgress(now)); } return Promise.resolve(); };
let activeLessonCompletion: (() => Promise<void>) | null = null;
export function registerDebugLessonCompletion(action: (() => Promise<void>) | null) { if (process.env.NODE_ENV === "development") activeLessonCompletion = action; }
export const debugCompleteCurrentLesson = async () => { if (process.env.NODE_ENV === "development" && activeLessonCompletion) await activeLessonCompletion(); };

