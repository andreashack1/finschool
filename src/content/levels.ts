import { z } from "zod";
export const LevelSchema = z.object({ level: z.number().int().positive(), title: z.string().trim().min(1), minXp: z.number().int().nonnegative() });
export function validateLevels(value: unknown) {
  const parsed = LevelSchema.array().length(7).parse(value);
  if (parsed.some((level, i) => level.level !== i + 1 || (i === 0 ? level.minXp !== 0 : level.minXp <= parsed[i - 1].minXp))) throw new Error("Levels must have unique consecutive numbers and strictly increasing XP thresholds, starting at zero");
  return parsed;
}
export const levels = validateLevels([
  { level: 1, title: "Money Beginner", minXp: 0 },
  { level: 2, title: "Budget Rookie", minXp: 100 },
  { level: 3, title: "Money Explorer", minXp: 300 },
  { level: 4, title: "Money Smart", minXp: 600 },
  { level: 5, title: "Budget Builder", minXp: 1000 },
  { level: 6, title: "Finance Pro", minXp: 1600 },
  { level: 7, title: "Money Master", minXp: 2500 },
]);
