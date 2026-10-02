"use client";
import { useEffect, useSyncExternalStore } from "react";
import { emptyProgress, LEARNING_STORAGE_KEY, readLearningProgress, writeLearningProgress } from "./learning-storage";
import type { LearningProgress } from "../types/learning";
const serverSnapshot = emptyProgress();
let snapshot = serverSnapshot;
let hydrated = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(listener => listener());
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
function hydrate() { if (!hydrated) { hydrated = true; snapshot = readLearningProgress(); notify(); } }
function publish(next: LearningProgress) { snapshot = next; writeLearningProgress(next); notify(); }
export function saveLastLesson(id: string) { hydrate(); if (snapshot.lastLessonId !== id) publish({ ...snapshot, lastLessonId: id, updatedAt: new Date().toISOString() }); }
export function saveCompletedLesson(id: string) {
  hydrate();
  const firstCompletion = !snapshot.completedLessonIds.includes(id);
  publish({ ...snapshot, completedLessonIds: firstCompletion ? [...snapshot.completedLessonIds, id] : snapshot.completedLessonIds, lastLessonId: null, updatedAt: new Date().toISOString() });
  return firstCompletion;
}
export function useLearningProgress() {
  const progress = useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot);
  useEffect(() => {
    hydrate();
    const sync = (event: StorageEvent) => { if (event.key === LEARNING_STORAGE_KEY || event.key === null) { snapshot = readLearningProgress(); notify(); } };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  return progress;
}
