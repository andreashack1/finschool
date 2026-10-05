import { z } from 'zod';
import { ProgressSchema } from '../progress-schema';
import { ProfileSchema } from './schemas';
import type { DomainResult } from '../../types/progress';
const base = { operationId: z.uuid(), occurredAt: z.iso.datetime() };
const answer = z.object({ screenId: z.string().min(1).max(100), selectedOptionId: z.string().min(1).max(100) }).strict();
export const OperationSchema = z.discriminatedUnion('type', [
  z.object({ ...base, type: z.literal('completeLesson'), payload: z.object({ lessonId: z.string().min(1).max(120), answers: z.array(answer).min(1).max(30), trial: z.boolean().default(false), startedAt: z.iso.datetime().optional() }).strict() }).strict(),
  z.object({ ...base, type: z.literal('answerDailyChallenge'), payload: z.object({ selectedOptionId: z.string().min(1).max(100) }).strict() }).strict(),
  z.object({ ...base, type: z.literal('simulator'), payload: z.object({ choices: z.array(z.number().int().min(0).max(1)).max(5) }).strict() }).strict(),
  z.object({ ...base, type: z.literal('lastLesson'), payload: z.object({ id: z.string().min(1).max(120) }).strict() }).strict(),
  z.object({ ...base, type: z.literal('achievementSeen'), payload: z.object({ id: z.string().min(1).max(100) }).strict() }).strict(),
  z.object({ ...base, type: z.literal('freezeSeen'), payload: z.object({ day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }).strict() }).strict(),
  z.object({ ...base, type: z.literal('levelSeen'), payload: z.object({}).strict() }).strict(),
]);
export type ProgressOperation = z.infer<typeof OperationSchema>;
export const StatsSummarySchema=z.object({totalXp:z.number().int().nonnegative(),completedLessons:z.number().int().nonnegative(),currentStreak:z.number().int().nonnegative(),longestStreak:z.number().int().nonnegative(),freezeBalance:z.number().int().nonnegative(),level:z.object({level:z.number().int().positive(),title:z.string(),minXp:z.number().int().nonnegative()})});
export const SnapshotSchema = z.object({ version: z.literal(1), userId: z.uuid(), revision: z.number().int().nonnegative(), email: z.string().nullable(), profile: ProfileSchema, progress: ProgressSchema,statsSummary:StatsSummarySchema, serverTime: z.iso.datetime() });
export type AccountProgressSnapshot = z.infer<typeof SnapshotSchema>;
export type MutationResponse = { snapshot: AccountProgressSnapshot; mutationResult: DomainResult; duplicate: boolean };
