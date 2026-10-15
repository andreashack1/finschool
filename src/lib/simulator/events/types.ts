import { z } from 'zod';
import { dayKeySchema } from '../calendar';
import { costBaniSchema, moneyBaniSchema } from '../money';
import { categorySchema, stableKeySchema } from '../types';
import { consequencesSchema, stateRulesSchema } from '../consequences/types';
import { lifeMetadataSchema, opportunities, semanticTags } from './life-taxonomy';

export const profileSchema = z.enum(['liceu', 'lucrez']);
export type ScheduleProfile = z.infer<typeof profileSchema>;
export const windowIdSchema = z.enum(['morning', 'lunch', 'after_program', 'evening', 'weekend_day']);
export type WindowId = z.infer<typeof windowIdSchema>;
const minute = z.number().int().min(0).max(1440);
export const scheduleSchema = z.strictObject({ start: minute, end: minute }).refine(s => s.start < s.end);
export const exceptionSchema = z.discriminatedUnion('type', [
  z.strictObject({ type: z.literal('free_day'), day: dayKeySchema }),
  z.strictObject({ type: z.literal('custom_schedule'), day: dayKeySchema, occupied: scheduleSchema }),
]);
export const policyV1Schema = z.strictObject({
  version: z.literal(1), minGapMinutes: z.number().int().min(1), batchDays: z.number().int().min(1).max(31),
  routineChances: z.record(windowIdSchema, z.number().min(0).max(1)), additionalChance: z.number().min(0).max(1),
  profiles: z.strictObject({ liceu: scheduleSchema, lucrez: scheduleSchema }),
  windows: z.record(windowIdSchema, scheduleSchema),
  groups: z.record(stableKeySchema, z.strictObject({ days: z.number().int().min(1), max: z.number().int().min(1) })),
  exceptions: z.array(exceptionSchema),
}).refine(p => new Set(p.exceptions.map(e => e.day)).size === p.exceptions.length, 'Excepții duplicate');
export const policyV2Schema = z.strictObject({
  ...policyV1Schema.shape,
  version: z.literal(2),
  opportunityChances: z.record(z.enum(opportunities), z.number().min(0).max(1)),
  rarityWeights: z.strictObject({ common: z.number().positive().finite(), occasional: z.number().positive().finite(), rare: z.number().positive().finite() }),
  semanticHistoryDays: z.number().int().min(1).max(30),
  semanticHardDays: z.partialRecord(z.enum(semanticTags), z.number().int().min(1).max(90)),
  repeatWeightFactor: z.number().positive().max(1),
  upgrade: z.strictObject({ startsOn: dayKeySchema, previousPolicy: policyV1Schema }).optional(),
}).refine(p => new Set(p.exceptions.map(e => e.day)).size === p.exceptions.length, 'Excepții duplicate');
export const policyV3Schema = z.strictObject({
  ...policyV2Schema.shape, version: z.literal(3), decisionWindowMinutes: z.literal(30),
  decisionUpgrade: z.strictObject({ startsOn: dayKeySchema, previousPolicy: policyV2Schema }).optional(),
});
export const policySchema = z.union([policyV1Schema, policyV2Schema, policyV3Schema]);
export type EventPolicy = z.infer<typeof policySchema>;
export const engineSchema = z.strictObject({
  scheduleProfile: profileSchema, startedAt: z.iso.datetime(), catalogVersion: z.union([z.literal(1),z.literal(2)]), policyVersion: z.union([z.literal(1),z.literal(2),z.literal(3)]),
  policySnapshot: policySchema, lastClosedDay: dayKeySchema.nullable(), processedAt: z.iso.datetime().nullable(),
}).refine(e => e.policyVersion === e.policySnapshot.version);
export type EventEngine = z.infer<typeof engineSchema>;
export const rulesSchema = z.strictObject({
  cooldownDays: z.number().int().min(0), maxPerMonth: z.number().int().min(1).optional(),
  weekendOnly: z.boolean().default(false), groups: z.array(stableKeySchema), exclusionGroup: stableKeySchema.optional(),
  requiresFutureFeature: z.boolean().default(false),
  state: stateRulesSchema.optional(),
});
export const priceSchema = z.discriminatedUnion('type', [
  z.strictObject({ type: z.literal('fixed'), amountBani: costBaniSchema }),
  z.strictObject({ type: z.literal('range'), minBani: costBaniSchema, maxBani: costBaniSchema }).refine(p => p.minBani <= p.maxBani),
  z.strictObject({ type: z.literal('base_plus_addon'), baseOptionId: stableKeySchema, minAddonBani: costBaniSchema, maxAddonBani: costBaniSchema }).refine(p => p.minAddonBani <= p.maxAddonBani),
]);
export const optionDefinitionSchema = z.strictObject({
  id: stableKeySchema, label: z.string().min(1), priceModel: priceSchema, feedback: z.string().min(1),
  durationMinutes: z.number().int().min(0).max(1440), fallbackWhenUnaffordable: z.boolean(),
  consequences: consequencesSchema.optional(), state: stateRulesSchema.optional(),
});
export const presentationSchema = z.strictObject({
  title: z.string().trim().min(1).max(80), context: z.string().trim().min(1).max(350),
  bullets: z.array(z.strictObject({ text: z.string().trim().min(1).max(130), amountBani: costBaniSchema.optional(), amountKind: z.enum(['exact','approx']).optional() })).min(2).max(5),
});
export const presentationDefinitionSchema = z.strictObject({
  title: z.string().trim().min(1).max(80), context: z.string().trim().min(1).max(350),
  bullets: z.array(z.strictObject({ text: z.string().trim().min(1).max(130), costOptionId: stableKeySchema.optional() })).min(2).max(5),
});
export const variationSchema = z.strictObject({
  id: stableKeySchema, title: z.string().min(1), description: z.string().min(1), weight: z.number().positive().finite(),
  presentation: presentationDefinitionSchema.optional(), options: z.array(optionDefinitionSchema).min(2).max(4), additionalRules: rulesSchema.optional(),
});
export const definitionSchema = z.strictObject({
  id: stableKeySchema, version: z.number().int().positive(), familyId: stableKeySchema, category: categorySchema,
  cadenceClass: z.enum(['routine', 'additional']), variations: z.array(variationSchema).min(1).max(4), rules: rulesSchema,
  life: lifeMetadataSchema.optional(),
  weight: z.number().positive().finite(), allowedWindows: z.array(windowIdSchema).min(1), expirationPolicy: z.literal('local_midnight'),
});
export type EventDefinitionV1 = z.infer<typeof definitionSchema>;
export type EventVariation = z.infer<typeof variationSchema>;
export const snapshotSchema = z.strictObject({
  version: z.literal(1), title: z.string().min(1), description: z.string().min(1), variationId: stableKeySchema,
  presentation: presentationSchema.optional(), category: categorySchema, options: z.array(z.strictObject({
    id: stableKeySchema, label: z.string().min(1), costBani: costBaniSchema, feedback: z.string().min(1),
    durationMinutes: z.number().int().min(0).max(1440), fallbackWhenUnaffordable: z.boolean(),
    consequences: consequencesSchema.optional(), state: stateRulesSchema.optional(),
  })).min(2).max(4),
  life: lifeMetadataSchema.optional(),
  relevance: z.array(stateRulesSchema).max(2).optional(),
}).refine(s => new Set(s.options.map(o => o.id)).size === s.options.length && s.options.filter(o => o.fallbackWhenUnaffordable).length === 1 && s.options.every(o => !o.fallbackWhenUnaffordable || (o.costBani === 0 && o.durationMinutes === 0)), 'Fallback sau opțiuni invalide');
export type EventSnapshot = z.infer<typeof snapshotSchema>;
export const instanceSchema = z.strictObject({
  id: z.uuid(), runId: z.uuid(), userId: z.uuid(), day: dayKeySchema, definitionId: stableKeySchema,
  definitionVersion: z.number().int().positive(), familyId: stableKeySchema, variationId: stableKeySchema,
  scheduledAt: z.iso.datetime(), expiresAt: z.iso.datetime(), snapshotVersion: z.literal(1), snapshot: snapshotSchema,
  status: z.enum(['pending', 'resolved', 'cancelled']), resolutionMode: z.enum(['manual', 'automatic']).nullable(),
  selectedOptionId: stableKeySchema.nullable(), selectedCostBani: costBaniSchema.nullable(), feedbackSnapshot: z.string().nullable(),
  resolvedAt: z.iso.datetime().nullable(), activityStartAt: z.iso.datetime().nullable(), activityEndAt: z.iso.datetime().nullable(),
  generationKey: z.string().min(1), cancelReason: z.string().nullable(), createdAt: z.iso.datetime(),
  resolutionEffectiveAt: z.iso.datetime().nullable().optional(), cancelledAt: z.iso.datetime().nullable().optional(),
  balanceAfterChoiceBani: moneyBaniSchema.nullable().optional(),
}).superRefine((e, ctx) => {
  if (e.scheduledAt >= e.expiresAt || e.variationId !== e.snapshot.variationId) ctx.addIssue({ code: 'custom', message: 'Instanță inconsistentă' });
  if (e.status === 'resolved' && (!e.resolutionMode || !e.resolvedAt || !e.selectedOptionId || e.selectedCostBani === null || !e.feedbackSnapshot)) ctx.addIssue({ code: 'custom', message: 'Rezolvare incompletă' });
  if (e.status === 'pending' && [e.resolutionMode, e.selectedOptionId, e.selectedCostBani, e.feedbackSnapshot, e.resolvedAt, e.activityStartAt, e.activityEndAt].some(v => v !== null)) ctx.addIssue({ code: 'custom', message: 'Pending cu rezolvare' });
  if (e.status === 'cancelled' && !e.cancelReason) ctx.addIssue({ code: 'custom', message: 'Lipsește motivul anulării' });
});
export type EventInstance = z.infer<typeof instanceSchema>;
export const eventDaySchema = z.strictObject({
  day: dayKeySchema, catalogVersion: z.union([z.literal(1),z.literal(2)]), policyVersion: z.union([z.literal(1),z.literal(2),z.literal(3)]), plannedAt: z.iso.datetime(),
  closedAt: z.iso.datetime().nullable(), eventCount: z.number().int().nonnegative(),
});
export type EventDay = z.infer<typeof eventDaySchema>;
export const publicEventSchema = z.strictObject({
  id: z.uuid(), title: z.string(), description: z.string(), presentation: presentationSchema.optional(), balanceAfterChoiceBani: moneyBaniSchema.nullable().optional(), category: categorySchema, scheduledAt: z.iso.datetime(), expiresAt: z.iso.datetime(),
  status: z.enum(['pending', 'resolved', 'cancelled']), resolutionMode: z.enum(['manual', 'automatic']).nullable(),
  selectedOptionId: z.string().nullable(), selectedCostBani: costBaniSchema.nullable(), feedback: z.string().nullable(),
  options: z.array(z.strictObject({ id: stableKeySchema, label: z.string(), costBani: costBaniSchema, durationMinutes: z.number(), unavailableReason: z.enum(['insufficient_funds', 'activity_overlap', 'schedule_conflict', 'catching_up', 'state_changed']).nullable() })),
});
export type PublicEvent = z.infer<typeof publicEventSchema>;
export const eventAreaSchema = z.object({
  serverNow:z.iso.datetime().optional(),
  engineStatus: z.enum(['needs_profile', 'active']), profile: profileSchema.nullable(),
  pending: z.array(publicEventSchema), resolved: z.array(publicEventSchema), revision: z.number().int().nonnegative(),
  caughtUp: z.boolean(), processedThrough: dayKeySchema, targetDay: dayKeySchema, remainingDaysEstimate: z.number().int().nonnegative(),
  nextRefreshAt: z.iso.datetime(),
});
export type EventArea = z.infer<typeof eventAreaSchema>;
