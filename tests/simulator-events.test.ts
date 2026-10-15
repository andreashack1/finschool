import { describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
import { catalogV1 } from '../src/content/simulator/events/catalog-v1.server';
import { eventPolicyV1 } from '../src/content/simulator/events/policy-v1';
import { eventCatalog, eventPolicy } from '../src/content/simulator/events/registry.server';
import { validateCatalog, validateCatalogPolicy } from '../src/lib/simulator/events/validate';
import { engineSchema, snapshotSchema, type EventDefinitionV1, type EventInstance } from '../src/lib/simulator/events/types';
import { planEventDay, materializeSnapshot, frequencyReason } from '../src/lib/simulator/events/planner';
import { automaticOption, resolveEvent, optionAvailability } from '../src/lib/simulator/events/resolve';
import { synchronizeEvents } from '../src/lib/simulator/events/synchronize';
import { localInstant, nextLocalMidnight, intervalFits } from '../src/lib/simulator/events/time';
import { calculateBalance, settle } from '../src/lib/simulator/settle';
import { bani } from '../src/lib/simulator/money';
import { day, fixtureRun, runId, userA } from './simulator-fixtures';

const engine = () => engineSchema.parse({ scheduleProfile: 'liceu', startedAt: '2026-10-01T00:00:00.000Z', catalogVersion: 1, policyVersion: 1, policySnapshot: eventPolicyV1, lastClosedDay: null, processedAt: null });
const input = (key = runId) => ({ runId: key, userId: userA, rngVersion: 1 as const, day: day('2026-10-02'), engine: engine(), catalog: catalogV1, history: [] as EventInstance[], plannedAt: '2026-10-02T08:00:00.000Z' });
function event(definition = catalogV1[6]): EventInstance {
  const variation = definition.variations[0];
  return { id: '44444444-4444-4444-8444-444444444444', runId, userId: userA, day: day('2026-10-09'), definitionId: definition.id, definitionVersion: 1, familyId: definition.familyId, variationId: variation.id,
    scheduledAt: localInstant(day('2026-10-09'), 1080).toISOString(), expiresAt: nextLocalMidnight(day('2026-10-09')).toISOString(), snapshotVersion: 1, snapshot: materializeSnapshot(runId, 1, day('2026-10-09'), definition, variation), status: 'pending', resolutionMode: null, selectedOptionId: null, selectedCostBani: null, feedbackSnapshot: null, resolvedAt: null, activityStartAt: null, activityEndAt: null, generationKey: 'fixture', cancelReason: null, createdAt: '2026-10-09T00:00:00.000Z' };
}
describe('Chapter 3 catalog and version validation', () => {
  it('exactly 12 families, 24 contexts, 72 choices, one free fallback each', () => {
    expect(catalogV1).toHaveLength(12);
    for (const d of catalogV1) { expect(d.variations).toHaveLength(2); for (const v of d.variations) { expect(v.options).toHaveLength(3); expect(v.options.filter(o => o.fallbackWhenUnaffordable)).toHaveLength(1); } }
    expect(() => validateCatalogPolicy(catalogV1, eventPolicyV1)).not.toThrow();
  });
  it.each(['duplicate', 'missing_fallback', 'multiple_fallbacks', 'negative', 'cycle', 'duration', 'weight', 'window', 'rule'])('rejects invalid %s catalog', kind => {
    const copy = structuredClone(catalogV1), d = copy[0], o = d.variations[0].options;
    if (kind === 'duplicate') copy.push(d);
    if (kind === 'missing_fallback') o[2].fallbackWhenUnaffordable = false;
    if (kind === 'multiple_fallbacks') o[0].fallbackWhenUnaffordable = true;
    if (kind === 'negative') o[0].priceModel = { type: 'fixed', amountBani: bani(-1) };
    if (kind === 'cycle') o[0].priceModel = { type: 'base_plus_addon', baseOptionId: o[0].id, minAddonBani: bani(1), maxAddonBani: bani(2) };
    if (kind === 'duration') o[0].durationMinutes = -1;
    if (kind === 'weight') d.weight = 0;
    if (kind === 'window') Reflect.set(d, 'allowedWindows', ['invalid']);
    if (kind === 'rule') Reflect.set(d.rules, 'expression', 'eval');
    expect(() => validateCatalog(copy)).toThrow();
  });
  it('keeps v1 available and rejects unavailable versions', () => { expect(eventCatalog(1)).toEqual(catalogV1); expect(eventPolicy(1)).toEqual(eventPolicyV1); expect(() => eventCatalog(3)).toThrow(); });
  it('fixes integer prices independently and preserves bundle relationships for 250 seeds', () => {
    for (let seed = 0; seed < 250; seed++) for (const d of catalogV1) for (const v of d.variations) {
      const s = materializeSnapshot(`price-${seed}`, 1, day('2026-10-09'), d, v);
      expect(s.options.every(o => Number.isInteger(o.costBani) && o.costBani >= 0)).toBe(true);
      for (const option of v.options) if (option.priceModel.type === 'base_plus_addon') expect(s.options.find(o => o.id === option.id)!.costBani).toBeGreaterThanOrEqual(s.options.find(o => o.id === (option.priceModel.type === 'base_plus_addon' ? option.priceModel.baseOptionId : ''))!.costBani);
    }
  });
  it('saved snapshots survive later content changes', () => { const e = event(), saved = structuredClone(e.snapshot), changed = structuredClone(catalogV1); changed[6].variations[0].title = 'Changed'; expect(e.snapshot).toEqual(saved); expect(snapshotSchema.parse(saved)).toEqual(saved); });
});
describe('Deterministic profile-aware planning', () => {
  it('identical input and accidental catalog/variation/option order produce identical plans', () => {
    const a = input(), b = { ...a, catalog: [...catalogV1].reverse() };
    expect(planEventDay(a)).toEqual(planEventDay(a)); expect(planEventDay(b)).toEqual(planEventDay(a));
  });
  it.each(['liceu', 'lucrez'] as const)('%s activity windows respect occupied schedule', profile => {
    const a = input(); a.engine.scheduleProfile = profile;
    for (let i = 0; i < 60; i++) for (const e of planEventDay({ ...a, runId: `schedule-${i}` }).instances) for (const o of e.snapshot.options) expect(intervalFits(e.day, e.scheduledAt, o.durationMinutes, profile, a.engine.policySnapshot)).toBe(true);
  });
  it('activation at 20:00 never reconstructs breakfast/lunch; next day restores all windows', () => {
    const a = input(); a.engine.startedAt = localInstant(a.day, 1200).toISOString();
    for (let i = 0; i < 60; i++) expect(planEventDay({ ...a, runId: `activation-${i}` }).instances.every(e => e.scheduledAt >= a.engine.startedAt)).toBe(true);
    const next = { ...a, day: day('2026-10-03') }; next.engine.policySnapshot.routineChances.morning = 1;
    expect(planEventDay(next).instances.some(e => e.scheduledAt < localInstant(next.day, 480).toISOString())).toBe(true);
  });
  it('never generates before activation', () => { const a = input(); a.engine.startedAt = '2026-10-03T00:00:00.000Z'; expect(planEventDay(a).instances).toEqual([]); });
  it('weekend-only situations never appear on weekdays', () => { for (let i = 0; i < 60; i++) expect(planEventDay(input(`weekday-${i}`)).instances.every(e => !['picnic','weekend_terrace'].includes(e.definitionId))).toBe(true); });
  it('cooldown 3: Monday to Thursday, same family includes both variations', () => {
    const d = catalogV1.find(d => d.id === 'friends_coffee')!, history = [{ ...event(d), day: day('2026-10-05') }];
    expect(frequencyReason(d, day('2026-10-06'), history, engine(), catalogV1)).toBe('cooldown');
    expect(frequencyReason(d, day('2026-10-07'), history, engine(), catalogV1)).toBe('cooldown');
    expect(frequencyReason(d, day('2026-10-08'), history, engine(), catalogV1)).toBeNull();
    expect(frequencyReason({ ...d, rules: { ...d.rules, cooldownDays: 1 } }, day('2026-10-06'), history, engine(), catalogV1)).toBeNull();
  });
  it('rolling social limit counts planned appearances in current+previous six days', () => {
    const d = catalogV1.find(d => d.id === 'friends_coffee')!, history = ['2026-10-03','2026-10-04','2026-10-05'].map(date => ({ ...event(catalogV1[6]), day: day(date) }));
    expect(frequencyReason(d, day('2026-10-09'), history, engine(), catalogV1)).toBe('group_limit');
    expect(frequencyReason(d, day('2026-10-10'), history, engine(), catalogV1)).toBeNull();
  });
  it('lunch exclusion allows at most one lunch family per day', () => { const a = input(); a.engine.policySnapshot.additionalChance = 1; a.engine.policySnapshot.routineChances.lunch = 1; for (let i = 0; i < 60; i++) expect(planEventDay({ ...a, runId: `lunch-${i}` }).instances.filter(e => ['lunch','colleagues_lunch'].includes(e.definitionId)).length).toBeLessThanOrEqual(1); });
  it('thousands of deterministic fixtures have normal rhythm around 1–2 and permit zero', () => {
    let sum = 0, zeros = 0;
    for (let i = 0; i < 2000; i++) { const count = planEventDay(input(`rhythm-${i}`)).instances.length; sum += count; if (!count) zeros++; }
    expect(sum / 2000).toBeGreaterThan(1); expect(sum / 2000).toBeLessThan(2.5); expect(zeros).toBeGreaterThan(0);
  }, 60000);
  it('synthetic eligible plan can exceed four, irrespective of deprecated maxEventsPerDay', () => {
    const a = input(); a.day = day('2026-10-03'); a.engine.policySnapshot.additionalChance = 1; a.engine.policySnapshot.groups = {}; a.engine.policySnapshot.minGapMinutes = 1;
    const synthetic: EventDefinitionV1[] = catalogV1.map(d => ({ ...d, cadenceClass: 'additional', rules: { ...d.rules, groups: [], exclusionGroup: undefined } }));
    expect(fixtureRun().configSnapshot.maxEventsPerDay).toBe(4);
    expect(planEventDay({ ...a, catalog: synthetic }).instances.length).toBeGreaterThan(4);
  });
});
describe('Authoritative decisions and chronological absence processing', () => {
  it('unaffordable paid choices rejected; negative balance retains free fallback', () => {
    const e = event(), opts = optionAvailability(e, bani(-100), [], engine());
    expect(opts.filter(o => !o.unavailableReason)).toHaveLength(1);
    expect(() => resolveEvent(e, opts[0].id, 'manual', e.scheduledAt, bani(0), [], engine(), 0)).toThrow();
  });
  it('free produces no ledger; paid exactly one semantic entry anchored to scheduled time', () => {
    const e = event(), free = e.snapshot.options[2], paid = e.snapshot.options[0];
    expect(resolveEvent(e, free.id, 'manual', e.scheduledAt, bani(-1), [], engine(), 0).entry).toBeNull();
    const result = resolveEvent(e, paid.id, 'manual', '2026-10-09T20:59:00.000Z', bani(10000), [], engine(), 0);
    expect(result.entry?.amountBani).toBe(-paid.costBani); expect(result.entry?.refKey).toBe(`${runId}:event:${e.id}:cost`); expect(result.instance.activityStartAt).toBe(e.scheduledAt);
  });
  it('overlap removes paid/free activities while compatible intervals remain eligible', () => {
    const e = event(), accepted = resolveEvent(e, e.snapshot.options[0].id, 'manual', e.scheduledAt, bani(10000), [], engine(), 0).instance;
    const next = { ...e, id: '55555555-5555-4555-8555-555555555555' };
    expect(optionAvailability(next, bani(10000), [accepted], engine())[0].unavailableReason).toBe('activity_overlap');
    next.scheduledAt = localInstant(next.day, 1260).toISOString(); expect(optionAvailability(next, bani(10000), [accepted], engine())[0].unavailableReason).toBeNull();
  });
  it('automatic choices are deterministic, affordable, uniform over eligible options', () => {
    const counts = new Map<string, number>(), e = event();
    expect(automaticOption(e, bani(10000), [], engine(), 1)).toBe(automaticOption(e, bani(10000), [], engine(), 1));
    expect(automaticOption(e, bani(-1), [], engine(), 1)).toBe(e.snapshot.options[2].id);
    for (let i = 0; i < 3000; i++) { const selected = automaticOption({ ...e, generationKey: `uniform-${i}` }, bani(10000), [], engine(), 1); counts.set(selected, (counts.get(selected) ?? 0) + 1); }
    expect(counts.size).toBe(3); for (const count of counts.values()) { expect(count).toBeGreaterThan(800); expect(count).toBeLessThan(1200); }
  });
  it.each([['2026-03-29',23], ['2026-10-25',25]] as const)('local midnight handles %s (%s hours)', (date, hours) => { const d = day(date); expect((nextLocalMidnight(d).getTime() - localInstant(d, 0).getTime()) / 3600000).toBe(hours); });
  it('yesterday event cannot use new-day salary and automatic ledger keeps event day', () => {
    const run = fixtureRun('2026-10-09'); run.lastSettledOn = run.startedOn;
    run.configSnapshot = { ...run.configSnapshot, payday: 10 };
    const e = event(), active = engine(); active.startedAt = '2026-10-09T00:00:00.000Z';
    const state = { run, ledger: [], engine: active, revision: 0, instances: [e], days: [{ day: e.day, catalogVersion: 1 as const, policyVersion: 1 as const, plannedAt: e.createdAt, closedAt: null, eventCount: 1 }] };
    const result = synchronizeEvents(state, localInstant(day('2026-10-10'), 1), catalogV1);
    expect(result.instances.find(x => x.id === e.id)?.selectedCostBani).toBe(0);
    expect(result.ledger.some(l => l.kind === 'salariu' && l.day === day('2026-10-10'))).toBe(true);
  });
  it('multiple batches match a conceptual chronological run, markers prevent reload generation', () => {
    const run = fixtureRun('2026-10-01'), initial = settle(run, [], run.startedOn); run.lastSettledOn = initial.settledThrough;
    const state = { run, ledger: initial.newEntries, engine: engine(), instances: [], days: [], revision: 0 };
    const now = localInstant(day('2026-11-12'), 1000);
    const first = synchronizeEvents(state, now, catalogV1); expect(first.caughtUp).toBe(false); expect(first.days).toHaveLength(31);
    const second = synchronizeEvents(first, now, catalogV1); expect(second.caughtUp).toBe(true);
    let daily = state as Parameters<typeof synchronizeEvents>[0];
    for (let date = 1; date <= 31; date++) daily = synchronizeEvents(daily, localInstant(day(`2026-10-${String(date).padStart(2,'0')}`), 1439), catalogV1);
    const rest = synchronizeEvents(daily, now, catalogV1);
    expect(rest.instances.map(e => [e.id,e.selectedOptionId,e.selectedCostBani])).toEqual(second.instances.map(e => [e.id,e.selectedOptionId,e.selectedCostBani]));
    expect(calculateBalance(rest.ledger)).toBe(calculateBalance(second.ledger));
    const reload = synchronizeEvents(second, now, catalogV1); expect(reload.newInstances).toEqual([]); expect(reload.newEntries).toEqual([]);
  }, 60000);
});
