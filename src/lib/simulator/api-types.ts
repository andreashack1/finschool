import { lifeProfileSchema } from './life-profile';
import { z } from 'zod';
import { dayKeySchema } from './calendar';
import { moneyBaniSchema } from './money';
import { housingSchema, ledgerEntrySchema, persistedEffectSchema, runSchema } from './types';

export const startRunInputSchema = z.strictObject({ lifeProfile: lifeProfileSchema.optional(), housing: housingSchema, profile: z.enum(['liceu', 'lucrez']).optional() });
export const emptyInputSchema = z.strictObject({});
export const devClockInputSchema = z.strictObject({ increment: z.union([z.literal(1), z.literal(7), z.literal(30)]) });
export const simulatorResponseSchema = z.strictObject({
  run: runSchema.nullable(), created: z.boolean().optional(),
  realDay: dayKeySchema, effectiveDay: dayKeySchema, offsetDays: z.number().int().min(0),
  effectiveNow: z.iso.datetime().optional(),
  state: z.strictObject({
    runId: z.uuid(), balanceBani: moneyBaniSchema, balanceFormatted: z.string(), currentDay: dayKeySchema,
    spentByCategoryThisMonth: z.record(z.string(), moneyBaniSchema), activeEffects: z.array(persistedEffectSchema),
    flags: z.record(z.string(), z.boolean()), autoResolvedDecisionsThisMonth: z.number().int().min(0), ledgerThisMonth: z.array(ledgerEntrySchema),
  }).nullable(),
});
export type SimulatorResponse = z.infer<typeof simulatorResponseSchema>;
