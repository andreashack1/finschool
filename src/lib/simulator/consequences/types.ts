import { z } from 'zod';
import { stableKeySchema } from '../types';

const id = z.string().min(1).max(60).regex(/^[a-z][a-z0-9_-]*$/);
export const presentationSchema = z.strictObject({
  title: z.string().min(1).max(160), description: z.string().max(500).optional(),
  iconKey: stableKeySchema.optional(), priority: z.number().int().min(0).max(100).default(0),
  visibility: z.enum(['internal', 'user']),
});
const scalar = z.union([z.boolean(), z.string().max(200), z.number().finite()]);
export const effectValueSchema = z.record(stableKeySchema, scalar).refine(v => Object.keys(v).length <= 20, 'Payload prea mare');
export const overlapPolicySchema = z.enum(['replace', 'extend', 'independent']);
export const consequenceSchema = z.discriminatedUnion('type', [
  z.strictObject({ id, type: z.literal('set_flag'), key: stableKeySchema, value: z.boolean().default(true), presentation: presentationSchema.optional() }),
  z.strictObject({ id, type: z.literal('clear_flag'), key: stableKeySchema }),
  z.strictObject({ id, type: z.literal('add_effect'), effectType: stableKeySchema, familyKey: stableKeySchema,
    durationDays: z.number().int().min(1).max(3650), startOffsetDays: z.number().int().min(0).max(3650),
    overlapPolicy: overlapPolicySchema, value: effectValueSchema, presentation: presentationSchema.optional() }),
  z.strictObject({ id, type: z.literal('remove_effect'), target: z.union([
    z.strictObject({ familyKey: stableKeySchema }), z.strictObject({ effectKey: stableKeySchema }),
  ]) }),
]);
export type ConsequenceDescriptor = z.infer<typeof consequenceSchema>;
export const consequencesSchema = z.array(consequenceSchema).max(20).superRefine((items, ctx) => {
  const ids = new Set<string>(), flags = new Map<string, string>(), added = new Set<string>(), removed = new Set<string>();
  for (const item of items) {
    if (ids.has(item.id)) ctx.addIssue({ code: 'custom', message: 'Consequence ID duplicat' });
    ids.add(item.id);
    if (item.type === 'set_flag' || item.type === 'clear_flag') {
      if (flags.has(item.key)) ctx.addIssue({ code: 'custom', message: 'Operații contradictorii sau duplicate pe flag' });
      flags.set(item.key, item.type);
    }
    if (item.type === 'add_effect') {
      if (added.has(item.familyKey)) ctx.addIssue({ code: 'custom', message: 'Familie adăugată de două ori în aceeași opțiune' });
      added.add(item.familyKey);
    }
    if (item.type === 'remove_effect' && 'familyKey' in item.target) removed.add(item.target.familyKey);
  }
  if ([...added].some(key => removed.has(key))) ctx.addIssue({ code: 'custom', message: 'Add/remove pentru aceeași familie' });
});
const keys = z.array(stableKeySchema).max(30).refine(a => new Set(a).size === a.length);
export const stateRulesSchema = z.strictObject({
  requiredFlags: keys.optional(), excludedFlags: keys.optional(), requiredEffects: keys.optional(), excludedEffects: keys.optional(),
}).superRefine((rules, ctx) => {
  if (rules.requiredFlags?.some(k => rules.excludedFlags?.includes(k)) || rules.requiredEffects?.some(k => rules.excludedEffects?.includes(k))) ctx.addIssue({ code: 'custom', message: 'Cerințe contradictorii' });
});
export type StateRules = z.infer<typeof stateRulesSchema>;
export const stateEffectSchema = z.strictObject({
  effectKey: stableKeySchema, effectType: stableKeySchema, familyKey: stableKeySchema,
  startsAt: z.iso.datetime(), expiresAt: z.iso.datetime(), endedAt: z.iso.datetime().nullable(),
  value: effectValueSchema, presentation: presentationSchema.optional(), overlapPolicy: overlapPolicySchema,
  sourceInstanceId: z.uuid().nullable(), sourceOptionId: id.nullable(), consequenceId: id.nullable(),
  effectiveAt: z.iso.datetime(), recordedAt: z.iso.datetime(),
}).refine(e => e.startsAt < e.expiresAt && e.effectiveAt <= e.startsAt, 'Interval efect invalid');
export type StateEffect = z.infer<typeof stateEffectSchema>;
export const stateOperationSchema = z.strictObject({
  idempotencyKey: z.string().min(1).max(400), sourceInstanceId: z.uuid().nullable(), sourceOptionId: id.nullable(),
  consequenceId: id, consequenceIndex: z.number().int().min(0), sequence: z.number().int().min(0),
  descriptor: consequenceSchema, effectiveAt: z.iso.datetime(), recordedAt: z.iso.datetime(),
  applied: z.boolean(), effect: stateEffectSchema.nullable(), endedEffectKeys: z.array(stableKeySchema),
  endsAt: z.iso.datetime().nullable(),
});
export type StateOperation = z.infer<typeof stateOperationSchema>;
export interface ConsequenceState {
  operations: StateOperation[]; effects: StateEffect[];
  // Efficient current flag projection from sim_flags. Historical reads still
  // use the operation log whenever evaluation precedes the projection boundary.
  flagProjection?: { through: string; operations: StateOperation[] };
}
export const currentStateItemSchema = z.strictObject({
  id: z.string(), kind: z.enum(['flag', 'effect']), title: z.string(), description: z.string().optional(),
  iconKey: stableKeySchema.optional(), priority: z.number(), startsAt: z.iso.datetime(), expiresAt: z.iso.datetime().optional(),
  remainingDays: z.number().int().positive().optional(), validityLabel: z.string().optional(),
});
export type CurrentStateItem = z.infer<typeof currentStateItemSchema>;
