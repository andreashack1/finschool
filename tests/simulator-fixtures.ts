import { simulatorConfig } from '../src/content/simulator/config';
import { dayKeySchema } from '../src/lib/simulator/calendar';
import { lei } from '../src/lib/simulator/money';
import { eventDefinitionSchema, runSchema, type SimulatorConfig } from '../src/lib/simulator/types';

export const userA = '11111111-1111-4111-8111-111111111111';
export const userB = '22222222-2222-4222-8222-222222222222';
export const runId = '33333333-3333-4333-8333-333333333333';
export const day = (value: string) => dayKeySchema.parse(value);
export function fixtureRun(start = '2026-10-02', config: SimulatorConfig = simulatorConfig, housing: 'parinti' | 'chirie' = 'parinti') {
  return runSchema.parse({ id: runId, userId: userA, startedOn: day(start), startAge: config.startAge, monthlyIncomeBani: config.monthlyIncomeBani, housing, status: 'activ', rulesVersion: config.rulesVersion, rngVersion: config.rngVersion, configSnapshot: config, lastSettledOn: null });
}
// Synthetic definitions exist only in tests, never the production content registry.
export const fixtureEvent = () => eventDefinitionSchema.parse({
  id: 'test_event', version: 1, titlu: 'Test', descriere: 'Fixture', categorie: 'mancare', tip: 'zilnic',
  optiuni: [
    { id: 'choice_a', label: 'A', costBani: lei(10), effects: [], feedback: 'Test A' },
    { id: 'choice_b', label: 'B', costBani: lei(20), effects: [], feedback: 'Test B' },
    { id: 'fallback_a', label: 'Fallback A', costBani: lei(0), effects: [], feedback: 'Test', fallbackWhenUnaffordable: true },
    { id: 'fallback_b', label: 'Fallback B', costBani: lei(0), effects: [], feedback: 'Test', fallbackWhenUnaffordable: true },
  ], reguli: { cooldownDays: 0, requiredFlags: [], excludedFlags: [], weight: 1 },
});
