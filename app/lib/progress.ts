"use client";
// Keep the existing import path while delegating to the canonical engine.
export { initialSimulation, getCurrentLevel, getLevelProgress, calculateStreak, getBucharestDateKey as today } from "@/src/lib/progress";
export { useProgressData as useSavedProgress, updateSimulation } from "@/src/lib/use-progress";
