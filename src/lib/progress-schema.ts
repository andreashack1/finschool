import { z } from "zod";
import { gamificationConfig } from "../content/gamification-config";
import { isDateKey } from "./bucharest-date";
const text = z.string().min(1), integer = z.number().int().nonnegative(), iso = z.iso.datetime();
export const DateKeySchema = z.string().refine(isDateKey, "Invalid calendar date");
export const XpEventTypeSchema = z.enum(["lesson_question_first_try", "lesson_completion", "lesson_perfect", "lesson_replay_improvement", "daily_challenge_correct", "daily_goal_bonus", "streak_milestone", "simulator_completion", "debug_adjustment"]);
export const XpEventSchema = z.object({ id: text, type: XpEventTypeSchema, amount: integer, refId: text.optional(), lessonId: text.optional(), screenId: text.optional(), createdAt: iso, bucharestDateKey: DateKeySchema });
export const LessonStatsSchema = z.object({ completed: z.boolean(), firstCompletedAt: iso.optional(), lastCompletedAt: iso.optional(), bestFirstTryCorrect: integer, questionCount: integer, perfectEver: z.boolean(), completionCount: integer, sessionIds: z.array(text) });
export const DailyChallengeResultSchema = z.object({ challengeId: text, selectedOptionId: text, correct: z.boolean(), answeredAt: iso });
export const SimulationSchema = z.object({ step: integer.max(5), balance: z.number().finite().nonnegative(), savings: z.number().finite().nonnegative(), history: z.array(z.string()) });
const level = z.object({ level: z.number().int().positive(), title: text, minXp: integer });
export const LevelUpSchema = z.object({ from: level, to: level, levelsGained: z.number().int().positive() });
export const ProgressSchema = z.object({
  version: z.literal(2), xp_events: z.array(XpEventSchema), lessonStats: z.record(text, LessonStatsSchema),
  activityDates: z.array(DateKeySchema), freezeDates: z.array(DateKeySchema), freezeBalance: integer.max(gamificationConfig.freeze.maxBalance),
  lastFreezeGrantWeekKey: text.nullable(), lastFreezeGrantDateKey: DateKeySchema.nullable(),
  dailyChallenges: z.record(DateKeySchema, DailyChallengeResultSchema), achievementUnlocks: z.record(text, z.object({ unlockedAt: iso })),
  seenAchievementToastIds: z.array(text), seenFreezeToastDates: z.array(DateKeySchema), pendingLevelUp: LevelUpSchema.nullable(),
  simulation: SimulationSchema, uniqueCorrectAnswers: z.array(text), lastLessonId: text.nullable(),
  maxSeenDateKey: DateKeySchema.nullable(), maxSeenAt: iso.nullable(), createdAt: iso.nullable(), updatedAt: iso.nullable(),
});

