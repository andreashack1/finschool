import 'server-only';
import { z } from 'zod';
import { goalInputSchema } from '../savings-goal';
import { jsonSchema } from '../types';
import type { SimulatorClock } from '../clock';
import { SimulatorError } from '../errors';
import { simulatorDatabase } from './database';
import { loadRun, simulatorState } from './service';
import { effectiveNow } from './events';
import { assertMonthlyReviewComplete } from './monthly-review';

export async function mutateGoal(userId: string, clock: SimulatorClock, raw: unknown) {
  const input = goalInputSchema.parse(raw);
  for (let attempt = 0; attempt < 4; attempt++) {
    await simulatorState(userId, clock);
    const loaded = await loadRun(userId);
    if (!loaded) throw new SimulatorError('SIMULATOR_CONFLICT', 409);
    assertMonthlyReviewComplete(loaded, clock);
    const result = await simulatorDatabase().rpc('mutate_simulator_goal', { p_user:userId,p_run:loaded.run.id,p_expected:loaded.revision,p_day:clock.effectiveDay,p_now:effectiveNow(clock).toISOString(),p_development:process.env.NODE_ENV==='development',p_input:jsonSchema.parse(input) });
    if (result.error) { console.error('Simulator goal mutation failed', result.error); throw new SimulatorError('GOAL_UNAVAILABLE', 503); }
    const response = z.object({ status:z.string() }).parse(result.data);
    if (response.status==='conflict') continue;
    if (response.status==='applied' || response.status==='retry') return;
    if (response.status==='review_required') throw new SimulatorError('MONTHLY_REVIEW_REQUIRED', 409);
    const errors = { insufficient:'GOAL_INSUFFICIENT', over_target:'GOAL_OVER_TARGET', over_saved:'GOAL_OVER_SAVED', below_saved:'GOAL_TARGET_BELOW_SAVED', exists:'GOAL_EXISTS', missing:'GOAL_MISSING', invalid:'INVALID_SIMULATOR_INPUT' } as const;
    throw new SimulatorError(errors[response.status as keyof typeof errors] ?? 'GOAL_UNAVAILABLE');
  }
  throw new SimulatorError('SIMULATOR_CONFLICT', 409);
}
