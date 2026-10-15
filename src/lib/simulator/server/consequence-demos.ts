import 'server-only';
import { consequenceDemoCatalog, type DemoScenario } from '../../../content/simulator/events/consequence-demos.server';
import { dayKey } from '../calendar';
import type { SimulatorClock } from '../clock';
import { SimulatorError } from '../errors';
import { planEventDay } from '../events/planner';
import { localInstant } from '../events/time';
import { jsonSchema } from '../types';
import { simulatorDatabase } from './database';
import { effectiveNow, syncSimulatorThrough } from './events';
import { eventPolicy } from '../../../content/simulator/events/registry.server';
import { decisionExpiry } from '../events/decision-policy';

export async function planConsequenceDemo(userId: string, scenario: DemoScenario, clock: SimulatorClock) {
  if (process.env.NODE_ENV !== 'development') throw new SimulatorError('INVALID_SIMULATOR_INPUT', 404);
  for (let attempt = 0; attempt < 4; attempt++) {
    const loaded = await syncSimulatorThrough(userId, clock), now = effectiveNow(clock), day = dayKey(now);
    if (!loaded?.engine || !loaded.caughtUp) throw new SimulatorError('SIMULATOR_CONFLICT', 409);
    const minuteParts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Bucharest', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
    const minute = Number(minuteParts.find(p => p.type === 'hour')?.value) * 60 + Number(minuteParts.find(p => p.type === 'minute')?.value);
    if (minute >= 1438) throw new SimulatorError('INVALID_SIMULATOR_INPUT');
    const engine = structuredClone(loaded.engine);
    // Chapter 4 fixtures retain their original planner, even on an upgraded run.
    engine.catalogVersion=1; engine.policyVersion=1; engine.policySnapshot=eventPolicy(1);
    // A tiny dev-only scheduling window. Persisted profile/policy are untouched.
    engine.startedAt = localInstant(day, 0).toISOString();
    engine.policySnapshot.additionalChance = 1;
    engine.policySnapshot.minGapMinutes = 1;
    engine.policySnapshot.windows.evening = { start: minute + 1, end: minute + 2 };
    const plan = planEventDay({ runId: loaded.run.id, userId, rngVersion: loaded.run.rngVersion, day, engine,
      catalog: consequenceDemoCatalog(scenario), history: loaded.instances, plannedAt: new Date().toISOString(), diagnostics: true,
      consequenceState: loaded.consequenceState, evaluationAt: now.toISOString() });
    if (!plan.instances.length) return { created: 0, rejected: plan.rejected };
    if(loaded.engine.policyVersion===3)for(const instance of plan.instances)instance.expiresAt=decisionExpiry(instance.scheduledAt);
    const marker = loaded.days.find(d => d.day === day)!;
    const response = await simulatorDatabase().rpc('commit_simulator_events', { p_user: userId, p_run: loaded.run.id, p_expected: loaded.revision,
      p_settled: loaded.run.lastSettledOn, p_through: loaded.run.lastSettledOn!, p_engine: jsonSchema.parse(loaded.engine),
      p_days: jsonSchema.parse([{ ...marker, eventCount: marker.eventCount + plan.instances.length }]), p_instances: jsonSchema.parse(plan.instances),
      p_entries: [], p_now: now.toISOString(), p_development: true, p_operations: [] });
    if (response.error) throw new SimulatorError('SIMULATOR_UNAVAILABLE', 503);
    if (response.data && typeof response.data === 'object' && !Array.isArray(response.data) && response.data.status === 'conflict') continue;
    return { created: plan.instances.length, rejected: plan.rejected };
  }
  throw new SimulatorError('SIMULATOR_CONFLICT', 409);
}
