import type { DayKey } from './calendar';

export type RandomSource = () => number;
/** Version 1: xmur3 seed hashing + mulberry32. Deterministic, NOT cryptographic. */
export function seedFromParts(...parts: readonly (string | number)[]): string { return JSON.stringify(['finly_sim', ...parts]); }
export function createRng(seed: string): RandomSource {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  h = Math.imul(h ^ h >>> 16, 2246822507);
  h = Math.imul(h ^ h >>> 13, 3266489909);
  let state = (h ^ h >>> 16) >>> 0;
  return () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let t = Math.imul(state ^ state >>> 15, 1 | state);
    t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
export function dailySeed(runId: string, day: DayKey, namespace: string, rngVersion: 1, eventId?: string): string {
  if (rngVersion !== 1) throw new RangeError('Unsupported RNG version');
  return seedFromParts(`v${rngVersion}`, runId, day, namespace, ...(eventId ? [eventId] : []));
}
export function uniformInt(rng: RandomSource, min: number, max: number): number {
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || max < min || !Number.isSafeInteger(max - min + 1)) throw new RangeError('Invalid selection range');
  return min + Math.floor(rng() * (max - min + 1));
}
export function arrayChoice<T>(rng: RandomSource, values: readonly T[]): T {
  if (!values.length) throw new RangeError('Empty selection pool');
  return values[uniformInt(rng, 0, values.length - 1)];
}
