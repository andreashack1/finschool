import { z } from "zod";

const integer = z.number().int().nonnegative();
const source = z.object({ xp: integer, countsTowardDailyGoal: z.boolean(), countsTowardEarnedXp: z.boolean() });
export const GamificationConfigSchema = z.object({
  storageVersion: z.literal(2),
  rewards: z.object({ lesson_question_first_try: source, lesson_completion: source, lesson_perfect: source, lesson_replay_improvement: source, daily_challenge_correct: source, daily_goal_bonus: source, streak_milestone: source, simulator_completion: source, debug_adjustment: source }),
  maxReplayXp: integer, dailyGoalTargetXp: z.number().int().positive(),
  levels: z.array(z.object({ level: z.number().int().positive(), title: z.string().min(1), minXp: integer })).min(1),
  streakMilestones: z.array(z.object({ days: z.number().int().positive(), xp: integer })),
  freeze: z.object({ initialBalance: integer, weeklyGrant: integer, maxBalance: integer }),
  dailyChallengeCount: z.number().int().min(31), challengeRotationVersion: z.number().int().positive(),
  specialistMinReadyLessons: z.number().int().positive(), simulatorId: z.string().min(1), debugXpAmount: integer,
  ui: z.object({ toastMs: integer, momentDelayMs: integer, clockRefreshMs: integer, countUpMs: integer }),
}).superRefine((c, ctx) => {
  if (c.levels[0].minXp !== 0 || c.levels.some((l, i) => l.level !== i + 1 || (i > 0 && l.minXp <= c.levels[i - 1].minXp))) ctx.addIssue({ code: "custom", message: "Levels must be unique, consecutive and have strictly increasing thresholds starting at 0." });
  if (c.streakMilestones.some((m, i) => i > 0 && m.days <= c.streakMilestones[i - 1].days)) ctx.addIssue({ code: "custom", message: "Streak milestones must be unique and sorted." });
  if (c.freeze.maxBalance < Math.max(c.freeze.weeklyGrant, c.freeze.initialBalance)) ctx.addIssue({ code: "custom", message: "Freeze cap must cover the initial balance and weekly grant." });
});
const qualifying = (xp: number) => ({ xp, countsTowardDailyGoal: true, countsTowardEarnedXp: true });
const excluded = (xp: number) => ({ xp, countsTowardDailyGoal: false, countsTowardEarnedXp: true });
export const gamificationConfig = GamificationConfigSchema.parse({
  storageVersion: 2,
  rewards: { lesson_question_first_try: qualifying(4), lesson_completion: qualifying(20), lesson_perfect: qualifying(15), lesson_replay_improvement: qualifying(0), daily_challenge_correct: qualifying(15), daily_goal_bonus: excluded(10), streak_milestone: excluded(0), simulator_completion: excluded(100), debug_adjustment: { xp: 0, countsTowardDailyGoal: false, countsTowardEarnedXp: false } },
  maxReplayXp: 10, dailyGoalTargetXp: 50,
  levels: [
    { level: 1, title: "Money Beginner", minXp: 0 }, { level: 2, title: "Budget Rookie", minXp: 150 },
    { level: 3, title: "Money Explorer", minXp: 400 }, { level: 4, title: "Money Smart", minXp: 800 },
    { level: 5, title: "Budget Builder", minXp: 1400 }, { level: 6, title: "Finance Pro", minXp: 2200 },
    { level: 7, title: "Money Master", minXp: 3200 }, { level: 8, title: "Money Mentor", minXp: 4500 },
  ],
  streakMilestones: [{ days: 3, xp: 25 }, { days: 7, xp: 75 }, { days: 14, xp: 150 }, { days: 30, xp: 300 }],
  freeze: { initialBalance: 1, weeklyGrant: 1, maxBalance: 2 },
  dailyChallengeCount: 40, challengeRotationVersion: 1, specialistMinReadyLessons: 3, simulatorId: "simulator", debugXpAmount: 100,
  ui: { toastMs: 5000, momentDelayMs: 200, clockRefreshMs: 30000, countUpMs: 450 },
});
export const QUESTION_FIRST_TRY_XP = gamificationConfig.rewards.lesson_question_first_try.xp;
export const LESSON_COMPLETION_XP = gamificationConfig.rewards.lesson_completion.xp;
export const PERFECT_LESSON_XP = gamificationConfig.rewards.lesson_perfect.xp;
export const MAX_REPLAY_XP = gamificationConfig.maxReplayXp;
export const DAILY_CHALLENGE_CORRECT_XP = gamificationConfig.rewards.daily_challenge_correct.xp;
export const DAILY_GOAL_TARGET_XP = gamificationConfig.dailyGoalTargetXp;
export const DAILY_GOAL_BONUS_XP = gamificationConfig.rewards.daily_goal_bonus.xp;
export const SIMULATOR_COMPLETION_XP = gamificationConfig.rewards.simulator_completion.xp;

export const FREEZE_WEEKLY_GRANT = gamificationConfig.freeze.weeklyGrant;
export const FREEZE_MAX_BALANCE = gamificationConfig.freeze.maxBalance;
export const DAILY_CHALLENGE_COUNT = gamificationConfig.dailyChallengeCount;
