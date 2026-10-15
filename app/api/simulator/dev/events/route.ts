import { z } from 'zod';
import { readBody } from '../../../../../src/lib/account/http';
import { simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { getServerClock, advanceDevMinutes } from '../../../../../src/lib/simulator/server/clock';
import { syncSimulatorThrough, effectiveNow } from '../../../../../src/lib/simulator/server/events';
import { eventCatalog } from '../../../../../src/content/simulator/events/registry.server';
import { planEventDay, rngNamespaces } from '../../../../../src/lib/simulator/events/planner';
import { dayKey } from '../../../../../src/lib/simulator/calendar';
import { seedFromParts } from '../../../../../src/lib/simulator/rng';
import { buildSimulatorStateAt, currentStateItems, effectActiveAt } from '../../../../../src/lib/simulator/consequences/state';
import { catalogReport } from '../../../../../src/lib/simulator/events/life-report';
import { eventPolicy } from '../../../../../src/content/simulator/events/registry.server';
import { planningEngineForDay } from '../../../../../src/lib/simulator/events/decision-policy';
import { presentationTitleAudit } from '../../../../../src/content/simulator/events/catalog-v2.server';
async function diagnostics(userId: string, clock: Awaited<ReturnType<typeof getServerClock>>) {
  const loaded = await syncSimulatorThrough(userId, clock);
  const engine = loaded?.engine, now = effectiveNow(clock);
  const planningEngine=engine?planningEngineForDay(engine,dayKey(now)):null;
  const state = loaded?.consequenceState, at = now.toISOString();
  return { realTime: new Date().toISOString(), effectiveTime: now.toISOString(), engine, catalog:catalogReport(eventCatalog(2),eventPolicy(2)), days: loaded?.days, instances: loaded?.instances, ledger: loaded?.ledger, caughtUp: loaded?.caughtUp, rngNamespaces,
    presentationTitleAudit,
    decisionDiagnostics:loaded?.instances.map(e=>({id:e.id,scheduledAt:e.scheduledAt,availableAt:e.scheduledAt,expiresAt:e.expiresAt,decisionWindowMinutes:(Date.parse(e.expiresAt)-Date.parse(e.scheduledAt))/60000,status:e.status,resolutionMode:e.resolutionMode,selectedOptionId:e.selectedOptionId,presentation:e.snapshot.presentation??null})),
    seeds: loaded?.instances.map(e => ({ id: e.id, autoResolution: seedFromParts(loaded.run.rngVersion, loaded.run.id, e.day, 'auto_resolve', e.generationKey) })),
    state: state ? {
      currentFlags: [...buildSimulatorStateAt(state, at).activeFlags].map(([key, operation]) => ({ key, operation })),
      operations: state.operations, flagHistory: state.operations.filter(o => ['set_flag', 'clear_flag'].includes(o.descriptor.type)),
      activeEffects: state.effects.filter(e => effectActiveAt(e, at)),
      futureEffects: state.effects.filter(e => e.startsAt > at && (e.endedAt === null || e.endedAt > e.startsAt)),
      expiredEffects: state.effects.filter(e => e.expiresAt <= at), endedEffects: state.effects.filter(e => e.endedAt !== null && e.endedAt <= at),
      currentStates: currentStateItems(state, at),
    } : null,
    planningPolicyVersion:planningEngine?.policyVersion,
    rejected: loaded && planningEngine ? planEventDay({ lifeProfile: loaded.run.configSnapshot.lifeProfile, runId: loaded.run.id, userId, rngVersion: loaded.run.rngVersion, day: dayKey(now), engine:planningEngine, catalog: eventCatalog(planningEngine.catalogVersion), history: loaded.instances.filter(e => e.day < dayKey(now)), plannedAt: now.toISOString(), diagnostics: true, consequenceState: state }).rejected : [] };
}
export async function GET(request: Request) { return simulatorApi(request, async user => diagnostics(user.id, await getServerClock()), true); }
export async function POST(request: Request) { return simulatorApi(request, async user => {
  const { minutes } = z.strictObject({ minutes: z.union([z.literal(1), z.literal(29), z.literal(15), z.literal(60), z.literal(360), z.literal(1440), z.literal(10080)]) }).parse(await readBody(request));
  return diagnostics(user.id, await advanceDevMinutes(minutes));
}, true); }
