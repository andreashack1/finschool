"use client";

import { useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const initialSimulation = { step: 0, balance: 3500, savings: 0, history: [] as string[] };
type Simulation = typeof initialSimulation;
type Progress = {
  xp: number; streak: number; record: number; completed: string[]; lastStudy: string | null;
  simulation: Simulation;
  award: (id: string, xp: number) => void;
  saveSimulation: (simulation: Simulation) => void;
};
export function today() { return new Date().toLocaleDateString("sv-SE"); }
export const useProgress = create<Progress>()(persist((set) => ({
  xp: 720, streak: 7, record: 14, completed: [], lastStudy: null,
  simulation: initialSimulation,
  award: (id, xp) => set(state => {
    if (state.completed.includes(id)) return state;
    const date = today();
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const streak = state.lastStudy === date ? state.streak : state.lastStudy === yesterday.toLocaleDateString("sv-SE") || !state.lastStudy ? state.streak + 1 : 1;
    return { xp: state.xp + xp, completed: [...state.completed, id], lastStudy: date, streak, record: Math.max(state.record, streak) };
  }),
  saveSimulation: simulation => set({ simulation }),
}), { name: "finly-progress-v2", skipHydration: true,
  storage: createJSONStorage(() => ({
    getItem: (name) => {
      try {
        const raw = window.localStorage.getItem(name);
        if (!raw) return null;
        const parsed: unknown = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object" || !("state" in parsed) || !parsed.state || typeof parsed.state !== "object") return null;
        const state = parsed.state;
        if (!("xp" in state) || typeof state.xp !== "number" || !Number.isFinite(state.xp) || state.xp < 0 || !("completed" in state) || !Array.isArray(state.completed) || !state.completed.every((id: unknown) => typeof id === "string")) return null;
        if (!("streak" in state) || typeof state.streak !== "number" || !Number.isInteger(state.streak) || state.streak < 0 || !("record" in state) || typeof state.record !== "number" || !Number.isInteger(state.record) || state.record < 0) return null;
        if (!("simulation" in state) || !state.simulation || typeof state.simulation !== "object") return null;
        const sim = state.simulation;
        if (!("step" in sim) || typeof sim.step !== "number" || !Number.isInteger(sim.step) || sim.step < 0 || !("balance" in sim) || typeof sim.balance !== "number" || !Number.isFinite(sim.balance) || !("savings" in sim) || typeof sim.savings !== "number" || !Number.isFinite(sim.savings) || !("history" in sim) || !Array.isArray(sim.history) || !sim.history.every((entry: unknown) => typeof entry === "string")) return null;
        // Whitelist persisted data: malformed extra keys cannot replace store actions.
        return JSON.stringify({ version: 0, state: { xp: state.xp, streak: state.streak, record: state.record, completed: state.completed, lastStudy: "lastStudy" in state && typeof state.lastStudy === "string" ? state.lastStudy : null, simulation: { step: sim.step, balance: sim.balance, savings: sim.savings, history: sim.history } } });
      } catch { return null; }
    },
    setItem: (name, value) => { try { window.localStorage.setItem(name, value); } catch { /* Progress still works in memory. */ } },
    removeItem: name => { try { window.localStorage.removeItem(name); } catch { /* Storage can be disabled. */ } },
  })),
}));
export function useSavedProgress() {
  useEffect(() => { void useProgress.persist.rehydrate(); }, []);
  return useProgress();
}
export function levelFor(xp: number) { return Math.floor(xp / 200) + 1; }
