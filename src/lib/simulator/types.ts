import { z } from 'zod';
import { lifeProfileSchema } from './life-profile';
import { dayKeySchema, type DayKey } from './calendar';
import { costBaniSchema, storedMoneySchema, type MoneyBani } from './money';

export const stableKeySchema = z.string().regex(/^[a-z][a-z0-9_]*$/).max(100);
export const categorySchema = z.enum(['mancare', 'iesiri', 'cumparaturi', 'abonamente', 'transport', 'locuinta', 'sanatate', 'tehnologie', 'scoala', 'neprevazute', 'economii', 'venit']);
export type Category = z.infer<typeof categorySchema>;
export const housingSchema = z.enum(['parinti', 'chirie']);
export type Housing = z.infer<typeof housingSchema>;
export const jsonSchema = z.json();
export type JsonValue = z.infer<typeof jsonSchema>;
export const effectDefinitionSchema = z.strictObject({
  // Extensible keys, e.g. acopera_mancarea / telefon_stricat / abonament_activ / buget_redus.
  type: stableKeySchema, durationDays: z.number().int().min(1).max(36500),
  value: jsonSchema, metadata: z.record(z.string(), jsonSchema).optional(),
});
export const eventOptionSchema = z.strictObject({
  id: stableKeySchema, label: z.string().min(1), costBani: costBaniSchema,
  effects: z.array(effectDefinitionSchema), feedback: z.string().min(1),
  fallbackWhenUnaffordable: z.boolean().default(false),
}).refine(o => !o.fallbackWhenUnaffordable || o.costBani === 0, 'Fallback trebuie să fie gratuit');
const timeSchema = z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/);
export const eventRulesSchema = z.strictObject({
  maxPerMonth: z.number().int().min(1).optional(), cooldownDays: z.number().int().min(0),
  allowedMonths: z.array(z.number().int().min(1).max(12)).refine(a => new Set(a).size === a.length).optional(),
  minDayOfMonth: z.number().int().min(1).max(31).optional(), maxDayOfMonth: z.number().int().min(1).max(31).optional(),
  requiredHousing: housingSchema.optional(), requiredFlags: z.array(stableKeySchema), excludedFlags: z.array(stableKeySchema),
  weight: z.number().positive(),
  timeWindow: z.strictObject({ start: timeSchema, end: timeSchema }).refine(w => w.start < w.end, 'Fereastra trebuie să fie în aceeași zi').optional(),
}).refine(r => (r.minDayOfMonth ?? 1) <= (r.maxDayOfMonth ?? 31), 'Interval de zile invalid');
export const eventDefinitionSchema = z.strictObject({
  id: stableKeySchema, version: z.number().int().min(1), titlu: z.string().min(1), descriere: z.string().min(1),
  categorie: categorySchema, tip: z.enum(['zilnic', 'unic']), optiuni: z.array(eventOptionSchema).min(1), reguli: eventRulesSchema,
}).refine(e => new Set(e.optiuni.map(o => o.id)).size === e.optiuni.length, 'ID-uri de opțiuni duplicate')
  .refine(e => e.optiuni.some(o => o.fallbackWhenUnaffordable && o.costBani === 0), 'Lipsește opțiunea fallback');
export type EventDefinition = z.infer<typeof eventDefinitionSchema>;
export type EventOption = z.infer<typeof eventOptionSchema>;
export interface SimulatorEventSource { getDefinitions(): readonly EventDefinition[]; }

const fixedExpenseSchema = z.strictObject({ id: stableKeySchema, label: z.string().min(1), category: categorySchema, dueDay: z.number().int().min(1).max(31), amountBani: costBaniSchema, order: z.number().int().min(0) });
export const simulatorConfigSchema = z.strictObject({
  lifeProfile: lifeProfileSchema.optional(),
  recurringInflows: z.array(z.strictObject({ id: stableKeySchema, label: z.string().min(1), amountBani: costBaniSchema, dueDay: z.number().int().min(1).max(31), order: z.number().int().min(201).max(299) })).optional(),
  timezone: z.literal('Europe/Bucharest'), rulesVersion: z.literal(1), rngVersion: z.literal(1),
  startAge: z.number().int().min(0), payday: z.number().int().min(1).max(31),
  minEventsPerDay: z.number().int().min(0), maxEventsPerDay: z.number().int().min(0),
  monthlyIncomeBani: costBaniSchema, startingBalanceBani: costBaniSchema,
  housing: z.strictObject({ parinti: fixedExpenseSchema, chirie: fixedExpenseSchema }),
  fixedExpenses: z.array(fixedExpenseSchema).max(699),
}).superRefine((c, ctx) => {
  if (c.minEventsPerDay > c.maxEventsPerDay) ctx.addIssue({ code: 'custom', message: 'minEventsPerDay depășește maxEventsPerDay' });
  for (const housing of ['parinti', 'chirie'] as const) {
    const expenses = [c.housing[housing], ...c.fixedExpenses];
    if (new Set(expenses.map(e => e.id)).size !== expenses.length) ctx.addIssue({ code: 'custom', message: 'ID-uri de cheltuieli duplicate' });
    if (new Set(expenses.map(e => e.order)).size !== expenses.length) ctx.addIssue({ code: 'custom', message: 'Ordine de cheltuieli duplicată' });
  }
});
export type SimulatorConfig = z.infer<typeof simulatorConfigSchema>;
export const ledgerEntrySchema = z.strictObject({
  day: dayKeySchema, sequence: z.number().int().min(0), kind: z.enum(['salariu', 'cheltuiala_fixa', 'eveniment', 'decizie_automata', 'ajustare', 'abonament', 'transfer_obiectiv']),
  category: categorySchema, amountBani: storedMoneySchema, label: z.string().min(1), refKey: z.string().min(1).max(500), autoResolved: z.boolean().default(false),
});
export type LedgerEntry = z.infer<typeof ledgerEntrySchema>;
export const runSchema = z.strictObject({
  id: z.uuid(), userId: z.uuid(), startedOn: dayKeySchema, startAge: z.number().int().min(0),
  monthlyIncomeBani: costBaniSchema, housing: housingSchema, status: z.enum(['activ', 'inchis']),
  rulesVersion: z.literal(1), rngVersion: z.literal(1), configSnapshot: simulatorConfigSchema,
  lastSettledOn: dayKeySchema.nullable(),
}).refine(r => r.startAge === r.configSnapshot.startAge && r.monthlyIncomeBani === r.configSnapshot.monthlyIncomeBani && r.rulesVersion === r.configSnapshot.rulesVersion && r.rngVersion === r.configSnapshot.rngVersion, 'Snapshot incompatibil cu run-ul')
  .refine(r => r.lastSettledOn === null || r.lastSettledOn >= r.startedOn, 'Cursor invalid');
export type SimulatorRun = z.infer<typeof runSchema>;
export const persistedEffectSchema = z.strictObject({
  effectKey: stableKeySchema, type: stableKeySchema, startsOn: dayKeySchema, endsOn: dayKeySchema,
  value: jsonSchema, metadata: z.record(z.string(), jsonSchema).optional(), sourceRef: z.string().min(1),
}).refine(e => e.endsOn >= e.startsOn, 'Durată invalidă');
export type PersistedEffect = z.infer<typeof persistedEffectSchema>;
export const persistedFlagSchema = z.strictObject({ key: stableKeySchema, value: z.boolean(), setOn: dayKeySchema, sourceRef: z.string().min(1) });
export type PersistedFlag = z.infer<typeof persistedFlagSchema>;
export interface RunState {
  balanceBani: MoneyBani; currentDay: DayKey; spentByCategoryThisMonth: Partial<Record<Category, MoneyBani>>;
  activeEffects: PersistedEffect[]; flags: Record<string, boolean>; autoResolvedDecisionsThisMonth: number;
}
/** Stable day order: start 100, salary 200, ordered obligations 300..999,
 * future occurrences 1000..8999, end-of-day automatic decisions 9000+. */
export const ledgerSequence = { start: 100, salary: 200, fixed: 300, events: 1000, missed: 9000 } as const;
