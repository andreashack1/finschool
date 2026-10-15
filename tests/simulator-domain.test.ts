import { describe, expect, it } from 'vitest';
import { simulatorConfig } from '../src/content/simulator/config';
import { simulatorEventSource } from '../src/content/simulator/events';
import { addDays, compareDayKeys, dayKey, dayKeySchema, dayOfMonth, daysBetween, daysInMonth, endOfMonth, formatDayKey, monthKey, nextMonth, parseDayKey, startOfMonth } from '../src/lib/simulator/calendar';
import { clockSnapshot, getEffectiveDay, parseDevOffset } from '../src/lib/simulator/clock';
import { bani, formatLei, lei, moneyBaniSchema } from '../src/lib/simulator/money';
import { resolveMissedEvent } from '../src/lib/simulator/missed';
import { arrayChoice, createRng, dailySeed, seedFromParts, uniformInt } from '../src/lib/simulator/rng';
import { calculateBalance, settle } from '../src/lib/simulator/settle';
import { deriveRunState } from '../src/lib/simulator/state';
import { effectDefinitionSchema, eventDefinitionSchema, ledgerEntrySchema, persistedEffectSchema, simulatorConfigSchema } from '../src/lib/simulator/types';
import { day, fixtureEvent, fixtureRun, runId } from './simulator-fixtures';

describe('Simulator civil calendar: host-timezone independent', () => {
  it.each([
    ['2026-10-06T20:59:00Z', '2026-10-06'], ['2026-10-06T21:01:00Z', '2026-10-07'],
    ['2026-10-24T21:30:00Z', '2026-10-25'], ['2026-10-25T00:59:00Z', '2026-10-25'],
    ['2026-10-25T01:01:00Z', '2026-10-25'], ['2026-10-25T21:59:00Z', '2026-10-25'], ['2026-10-25T22:01:00Z', '2026-10-26'],
    ['2026-03-28T21:59:00Z', '2026-03-28'], ['2026-03-28T22:01:00Z', '2026-03-29'],
    ['2026-03-29T00:59:00Z', '2026-03-29'], ['2026-03-29T01:01:00Z', '2026-03-29'], ['2026-03-29T21:01:00Z', '2026-03-30'],
  ])('maps %s to %s in Bucharest', (instant, expected) => expect(dayKey(new Date(instant))).toBe(expected));
  it.each([
    ['2026-03-28', '2026-03-29'], ['2026-03-29', '2026-03-30'], ['2026-10-24', '2026-10-25'], ['2026-10-25', '2026-10-26'],
    ['2026-04-30', '2026-05-01'], ['2026-01-31', '2026-02-01'], ['2026-12-31', '2027-01-01'],
    ['2026-02-28', '2026-03-01'], ['2028-02-28', '2028-02-29'], ['2028-02-29', '2028-03-01'],
  ])('advances civil %s to %s', (a, b) => { expect(addDays(day(a), 1)).toBe(b); expect(addDays(day(b), -1)).toBe(a); expect(daysBetween(day(a), day(b))).toBe(1); });
  it('provides month helpers and comparisons', () => {
    expect(parseDayKey(day('2026-10-25'))).toEqual({ year: 2026, month: 10, day: 25 });
    expect(formatDayKey(2026, 10, 25)).toBe('2026-10-25'); expect(dayOfMonth(day('2026-10-25'))).toBe(25);
    expect(startOfMonth(day('2028-02-20'))).toBe('2028-02-01'); expect(endOfMonth(day('2028-02-20'))).toBe('2028-02-29');
    expect(nextMonth(day('2026-12-31'))).toBe('2027-01-01'); expect(monthKey(day('2026-10-25'))).toBe('2026-10');
    expect(daysInMonth(2026, 2)).toBe(28); expect(daysInMonth(2028, 2)).toBe(29);
    expect(compareDayKeys(day('2026-10-24'), day('2026-10-25'))).toBe(-1);
    expect(compareDayKeys(day('2026-10-25'), day('2026-10-25'))).toBe(0);
  });
  it.each(['2026-02-31', '2026-02-29', '2028-13-01', '2026-10-00', '26-10-01', '2026-10-25T00:00:00Z'])('rejects invalid %s', value => expect(dayKeySchema.safeParse(value).success).toBe(false));
});

describe('Money, config and extensible schemas', () => {
  it('uses integer bani including fractional lei display', () => { expect(lei(2000)).toBe(200000); expect(lei(14.5)).toBe(1450); expect(lei(29.99)).toBe(2999); expect(formatLei(lei(2000))).toContain('2.000'); expect(() => lei(1.001)).toThrow(); });
  it.each([NaN, Infinity, -Infinity, 0.5, Number.MAX_SAFE_INTEGER + 1])('rejects invalid bani %s', value => expect(moneyBaniSchema.safeParse(value).success).toBe(false));
  it('fails fast for invalid config and preserves canonical values', () => {
    expect(simulatorConfig.timezone).toBe('Europe/Bucharest'); expect(simulatorConfig.startAge).toBe(18);
    for (const patch of [{ minEventsPerDay: 5 }, { monthlyIncomeBani: -1 }, { payday: 0 }, { payday: 32 }, { timezone: 'UTC' }, { rulesVersion: 2 }, { rngVersion: 2 }, { fixedExpenses: [simulatorConfig.fixedExpenses[0], simulatorConfig.fixedExpenses[0]] }, { fixedExpenses: [{ ...simulatorConfig.fixedExpenses[0], dueDay: 32 }] }]) expect(simulatorConfigSchema.safeParse({ ...simulatorConfig, ...patch }).success).toBe(false);
  });
  it('rejects malformed future event content without creating any actual content', () => {
    const event = fixtureEvent();
    for (const optiuni of [[], [event.optiuni[0]], [event.optiuni[0], event.optiuni[0], event.optiuni[2]], [{ ...event.optiuni[2], costBani: lei(1) }], [{ ...event.optiuni[2], effects: [{ type: 'future_effect', durationDays: -1, value: 1 }] }]]) expect(eventDefinitionSchema.safeParse({ ...event, optiuni }).success).toBe(false);
    for (const patch of [{ allowedMonths: [13] }, { allowedMonths: [1, 1] }, { minDayOfMonth: 20, maxDayOfMonth: 10 }, { weight: Infinity }, { timeWindow: { start: '23:00', end: '01:00' } }, { timeWindow: { start: '24:00', end: '25:00' } }]) expect(eventDefinitionSchema.safeParse({ ...event, reguli: { ...event.reguli, ...patch } }).success).toBe(false);
    expect(eventDefinitionSchema.safeParse({ ...event, categorie: 'wrong' }).success).toBe(false);
    expect(effectDefinitionSchema.safeParse({ type: 'future_extension', durationDays: 1, value: { amount: 5 } }).success).toBe(true);
    expect(simulatorEventSource.getDefinitions()).toEqual([]);
  });
});

describe('Versioned deterministic RNG and missed decisions', () => {
  it('has stable sequences, choices and unambiguous namespaces', () => {
    const seed = dailySeed(runId, day('2026-10-25'), 'events', 1), a = createRng(seed), b = createRng(seed);
    const actual = Array.from({ length: 8 }, () => a());
    expect(actual).toEqual(Array.from({ length: 8 }, () => b()));
    expect(actual).not.toEqual(Array.from({ length: 8 }, createRng(dailySeed(runId, day('2026-10-26'), 'events', 1))));
    expect(seedFromParts('ab', 'c')).not.toBe(seedFromParts('a', 'bc'));
    expect(arrayChoice(createRng(seed), ['a', 'b', 'c'])).toBe(arrayChoice(createRng(seed), ['a', 'b', 'c']));
    expect(uniformInt(createRng(seed), 3, 3)).toBe(3); expect(() => arrayChoice(createRng(seed), [])).toThrow();
  });
  it('prefers paid affordable choices deterministically and builds correct ledger', () => {
    const context = { runId, day: day('2026-10-25'), rngVersion: 1 as const };
    const result = resolveMissedEvent(fixtureEvent(), lei(10), context);
    expect(result).toEqual(resolveMissedEvent(fixtureEvent(), lei(10), context));
    expect(result.option.id).toBe('choice_a'); expect(result.entry).toMatchObject({ kind: 'decizie_automata', autoResolved: true, amountBani: -lei(10), label: 'Ai ratat. S-a ales automat: A' });
    expect(result.entry.refKey).toBe(`${runId}:2026-10-25:missed:test_event`);
  });
  it.each([0, -50, 9])('uses only explicit free fallbacks with %s lei', balance => {
    const result = resolveMissedEvent(fixtureEvent(), lei(balance), { runId, day: day('2026-10-25'), rngVersion: 1 });
    expect(result.option.fallbackWhenUnaffordable).toBe(true); expect(result.entry.amountBani).toBe(0);
  });
  it('never invents an option for invalid content', () => expect(() => resolveMissedEvent({ ...fixtureEvent(), optiuni: [] }, lei(50), { runId, day: day('2026-10-25'), rngVersion: 1 })).toThrow('Regulile'));
  it('uses approximately equal probability across 10,000 deterministic seeds', () => {
    const counts: Record<string, number> = { choice_a: 0, choice_b: 0 };
    for (let i = 0; i < 10000; i++) counts[resolveMissedEvent(fixtureEvent(), lei(100), { runId: `fixture_${i}`, day: day('2026-10-25'), rngVersion: 1 }).option.id]++;
    expect(counts.choice_a).toBeGreaterThan(4700); expect(counts.choice_a).toBeLessThan(5300); expect(counts.choice_b).toBe(10000 - counts.choice_a);
  });
});

describe('Pure settlement and derived state', () => {
  it('starts on day 1 with salary before transport, without initial balance', () => {
    const result = settle(fixtureRun('2026-10-01'), [], day('2026-10-01'));
    expect(result.newEntries.map(e => e.kind)).toEqual(['salariu', 'cheltuiala_fixa']);
    expect(result.newEntries.map(e => e.sequence)).toEqual([200, 301]);
    expect(calculateBalance(result.newEntries)).toBe(lei(2000 - 120));
  });
  it.each(['2026-10-02', '2026-10-06', '2026-10-31'])('starts %s with initial balance, salary only next month', start => {
    const run = fixtureRun(start), initial = settle(run, [], day(start));
    expect(initial.newEntries.map(e => e.kind)).toEqual(['ajustare']);
    const next = settle({ ...run, lastSettledOn: initial.settledThrough }, initial.newEntries, day('2026-11-01'));
    expect(next.newEntries.filter(e => e.kind === 'salariu').map(e => e.day)).toEqual(['2026-11-01']);
  });
  it('supports generalized payday before, on and after start', () => {
    const config = simulatorConfigSchema.parse({ ...simulatorConfig, payday: 12 });
    for (const start of [10, 12, 13]) {
      const run = fixtureRun(`2026-10-${start}`, config), result = settle(run, [], day('2026-10-31'));
      expect(result.newEntries.some(e => e.kind === 'salariu')).toBe(start <= 12);
      expect(result.newEntries.some(e => e.kind === 'ajustare')).toBe(start !== 12);
    }
  });
  it.each([['2026-10-04', 1], ['2026-10-05', 1], ['2026-10-06', 0]] as const)('housing from %s applies %s times without retroactive charges', (start, count) => {
    const result = settle(fixtureRun(start), [], day('2026-10-06'));
    expect(result.newEntries.filter(e => e.category === 'locuinta')).toHaveLength(count);
  });
  it('handles ten days absence, all obligations, empty days and idempotency', () => {
    const run = fixtureRun('2026-10-02'), first = settle(run, [], day('2026-10-12'));
    expect(first.settledThrough).toBe('2026-10-12');
    expect(first.newEntries.map(e => e.day)).toEqual(['2026-10-02', '2026-10-05', '2026-10-10']);
    expect(settle({ ...run, lastSettledOn: first.settledThrough }, first.newEntries, day('2026-10-12')).newEntries).toEqual([]);
    expect(settle(run, first.newEntries, day('2026-10-12')).newEntries).toEqual([]);
    expect(settle({ ...run, lastSettledOn: first.settledThrough }, first.newEntries, day('2026-10-13')).settledThrough).toBe('2026-10-13');
  });
  it('orders same-day obligations by config and permits negative balance', () => {
    const config = simulatorConfigSchema.parse({ ...simulatorConfig, fixedExpenses: simulatorConfig.fixedExpenses.map(e => ({ ...e, dueDay: 5 })).reverse() });
    const result = settle(fixtureRun('2026-10-05', config, 'chirie'), [], day('2026-10-05'));
    expect(result.newEntries.map(e => e.refKey.split(':').at(-1))).toEqual(['balance', 'housing', 'transport', 'subscriptions', 'phone']);
    expect(calculateBalance(result.newEntries)).toBe(lei(400 - 800 - 120 - 50 - 40));
  });
  it('uses the saved snapshot, never the latest economy', () => {
    const config = simulatorConfigSchema.parse({ ...simulatorConfig, monthlyIncomeBani: lei(1234) });
    expect(settle(fixtureRun('2026-10-01', config), [], day('2026-10-01')).newEntries[0].amountBani).toBe(lei(1234));
    expect(() => settle({ ...fixtureRun(), rulesVersion: 2 } as unknown as ReturnType<typeof fixtureRun>, [], day('2026-10-02'))).toThrow('Regulile');
  });
  it('never settles future days or reverses the cursor', () => {
    expect(settle(fixtureRun('2026-10-02'), [], day('2026-10-01'))).toEqual({ newEntries: [], settledThrough: null });
    expect(() => settle({ ...fixtureRun(), lastSettledOn: day('2026-10-10') }, [], day('2026-10-09'))).toThrow('Data');
  });
  it('calculates lifetime balance, only current month negatives, inclusive effects and flags', () => {
    const run = fixtureRun('2026-10-02'), result = settle(run, [], day('2026-11-05'));
    const auto = ledgerEntrySchema.parse({ day: day('2026-11-03'), sequence: 9000, kind: 'decizie_automata', category: 'mancare', amountBani: -lei(10), label: 'Test', refKey: 'test_auto', autoResolved: true });
    const effect = persistedEffectSchema.parse({ effectKey: 'test_effect', type: 'future_type', startsOn: day('2026-11-04'), endsOn: day('2026-11-05'), value: 1, sourceRef: 'test' });
    const state = deriveRunState(run, [...result.newEntries, auto], [effect, { ...effect, effectKey: 'expired', endsOn: day('2026-11-04') }], [{ key: 'test_flag', value: true, setOn: day('2026-11-01'), sourceRef: 'test' }], day('2026-11-05'));
    expect(state.balanceBani).toBe(calculateBalance([...result.newEntries, auto]));
    expect(state.spentByCategoryThisMonth).toEqual({ locuinta: lei(300), transport: lei(120), mancare: lei(10) });
    expect(state.activeEffects).toEqual([effect]); expect(state.flags).toEqual({ test_flag: true }); expect(state.autoResolvedDecisionsThisMonth).toBe(1);
    expect(bani(0)).toBe(0);
  });
});

describe('Logical dev clock', () => {
  it('advances civil days across DST in development', () => expect(getEffectiveDay(new Date('2026-10-24T12:00:00Z'), 2, 'development')).toBe('2026-10-26'));
  it('ignores forged production offsets absolutely', () => expect(clockSnapshot(new Date('2026-10-25T12:00:00Z'), 999, 'production')).toEqual({ realDay: '2026-10-25', effectiveDay: '2026-10-25', offsetDays: 0 }));
  it.each(['-1', '1.5', 'Infinity', '99999999', 'junk'])('ignores invalid offset %s', value => expect(parseDevOffset(value)).toBe(0));
});
