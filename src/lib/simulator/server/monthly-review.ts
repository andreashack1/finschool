import 'server-only';
import { z } from 'zod';
import { buildMonthlyReview, closedReviewPeriods, financialClosedThrough, monthlySnapshotSchema, reviewAckSchema } from '../monthly-review';
import type { SimulatorClock } from '../clock';
import { SimulatorError } from '../errors';
import { jsonSchema } from '../types';
import { loadRun, simulatorState } from './service';
import { simulatorDatabase } from './database';

export async function finalizeClosedMonths(userId:string, loaded:NonNullable<Awaited<ReturnType<typeof loadRun>>>, clock:SimulatorClock, db=simulatorDatabase(), attempt=0):Promise<void> {
  const through=loaded.engine ? loaded.engine.lastClosedDay : financialClosedThrough(loaded.run,clock.effectiveDay);
  let previous;
  for(const period of closedReviewPeriods(loaded.run,clock.effectiveDay,through)) {
    const existing=loaded.monthlyReviews.find(r=>r.snapshot.monthKey===period.start.slice(0,7));
    if(existing){previous=existing.snapshot;continue;}
    const snapshot=buildMonthlyReview(loaded.run,loaded.ledger,period.start,period.end,previous,loaded.instances);
    const result=await db.rpc('finalize_simulator_month',{p_user:userId,p_run:loaded.run.id,p_expected:loaded.revision,p_day:clock.effectiveDay,p_snapshot:jsonSchema.parse(snapshot)});
    if(result.error)throw new SimulatorError('SIMULATOR_UNAVAILABLE',503);
    const response=z.discriminatedUnion('status',[z.object({status:z.literal('applied'),snapshot:monthlySnapshotSchema}),z.object({status:z.literal('conflict')})]).parse(result.data);
    if(response.status==='conflict'){
      const fresh=await loadRun(userId,db);
      if(!fresh || attempt>=1)throw new SimulatorError('SIMULATOR_CONFLICT',409);
      return finalizeClosedMonths(userId,fresh,clock,db,attempt+1);
    }
    // The locked RPC returns the winning snapshot without another lifetime read.
    previous=response.snapshot;
  }
}
export function assertMonthlyReviewComplete(loaded:NonNullable<Awaited<ReturnType<typeof loadRun>>>, clock:SimulatorClock) {
  const missing=closedReviewPeriods(loaded.run,clock.effectiveDay,financialClosedThrough(loaded.run,clock.effectiveDay)).some(p=>!loaded.monthlyReviews.some(r=>r.snapshot.monthKey===p.start.slice(0,7)));
  if(missing || loaded.monthlyReviews.some(r=>!r.reviewedAt))throw new SimulatorError('MONTHLY_REVIEW_REQUIRED',409);
}
export async function acknowledgeMonthlyReview(userId:string, clock:SimulatorClock, raw:unknown) {
  const input=reviewAckSchema.parse(raw);
  await simulatorState(userId,clock);
  const loaded=await loadRun(userId);
  if(!loaded)throw new SimulatorError('INVALID_SIMULATOR_INPUT',404);
  const result=await simulatorDatabase().rpc('acknowledge_simulator_month',{p_user:userId,p_run:loaded.run.id,p_review:input.reviewId,p_operation:input.operationId});
  if(result.error)throw new SimulatorError('SIMULATOR_UNAVAILABLE',503);
  const status=z.object({status:z.enum(['applied','required','invalid'])}).parse(result.data).status;
  if(status==='required')throw new SimulatorError('MONTHLY_REVIEW_REQUIRED',409);
  if(status==='invalid')throw new SimulatorError('INVALID_SIMULATOR_INPUT',404);
  const { simulatorPageState }=await import('./chapter-two');
  return simulatorPageState(userId,clock);
}
