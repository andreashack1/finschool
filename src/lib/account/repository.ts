import 'server-only';
import type { User } from '@supabase/supabase-js';
import { adminSupabase } from '../supabase/admin';
import { accountSnapshotToProgressState, accountProgressSummary, DatabaseSnapshotSchema } from './mapping';
import { applyAccountOperation } from './domain';
import { reconcileAccountCalendar } from './calendar';
import { calculateStreak, evaluateAchievements, getBucharestDateKey } from '../progress';
import { AccountError } from './errors';
import { SnapshotSchema, type ProgressOperation, type MutationResponse } from './contracts';
import type { DomainResult, ProgressState } from '../../types/progress';
import { z } from 'zod';
import { buildStreakMoments } from '../streak-moments';
import { isMissingStreakRpc } from './streak-rpc';
const ApplySchema = z.object({ status:z.enum(['applied','duplicate','conflict']), result:z.unknown().optional() });
async function read(user: User) {
  const { data,error }=await adminSupabase().rpc('read_account_progress',{p_user:user.id});
  if (error) throw new AccountError('SERVER_ERROR',503);
  const db=DatabaseSnapshotSchema.parse(data); const now=new Date();
  return { profile:db.profile, revision:Number(db.stats?.revision ?? 0), progress:accountSnapshotToProgressState(data,now),now };
}
async function apply(user:User,revision:number,state:ProgressState,operation:ProgressOperation|null,result:DomainResult|null,previous:ProgressState,now:Date) {
  const streak=calculateStreak(state,getBucharestDateKey(now));
  // Store only the outcome metadata; every response loads a fresh snapshot.
  const metadata=result?(({progress,...outcome}:DomainResult)=>{void progress;return outcome;})(result):null;
  const params={p_user:user.id,p_operation:operation?.operationId ?? null,p_type:operation?.type ?? 'reconcile',p_revision:revision,p_state:state,p_result:metadata,p_streak:streak.current,p_longest:streak.longest};
  let { data,error }=await adminSupabase().rpc('apply_streak_progress_mutation',{...params,p_moments:buildStreakMoments(previous,state,now)});
  if(isMissingStreakRpc(error,'apply_streak_progress_mutation')) {
    // The legacy transaction retains its revision lock, operation deduplication
    // and all business/history writes. Durable visuals activate after 0011.
    ({data,error}=await adminSupabase().rpc('apply_progress_mutation',params));
  }
  if (error) throw new AccountError('SERVER_ERROR',503);
  return ApplySchema.parse(data);
}
export async function getAccountSnapshot(user:User) {
  for(let attempt=0;attempt<8;attempt++) {
    const data=await read(user); const progress=evaluateAchievements(reconcileAccountCalendar(data.progress,data.now),data.now);
    const comparable=(state:ProgressState)=>JSON.stringify({...state,maxSeenAt:null,updatedAt:null});
    if (comparable(progress)!==comparable(data.progress) || data.revision===0) {
      const saved=await apply(user,data.revision,progress,null,null,data.progress,data.now);if(saved.status==='conflict')continue;
      return getAccountSnapshot(user);
    }
    return SnapshotSchema.parse({version:1,userId:user.id,email:user.email ?? null,revision:data.revision,profile:data.profile,progress,statsSummary:accountProgressSummary(progress,data.now),serverTime:data.now.toISOString()});
  }
  throw new AccountError('SERVER_ERROR',503);
}
export async function mutateAccountProgress(user:User,operation:ProgressOperation):Promise<MutationResponse> {
  for(let attempt=0;attempt<12;attempt++) {
    const data=await read(user);
    const result=applyAccountOperation(data.progress,operation,user.created_at,data.now);
    const saved=await apply(user,data.revision,result.progress,operation,result,data.progress,data.now);
    if(saved.status==='conflict')continue;
    const snapshot=await getAccountSnapshot(user);
    // Only a trusted private RPC stores this result; the browser never supplies it.
    const mutationResult=(saved.result ?? result) as Omit<DomainResult,'progress'>;
    return {snapshot,mutationResult:{...mutationResult,progress:snapshot.progress},duplicate:saved.status==='duplicate'};
  }
  throw new AccountError('SERVER_ERROR',503);
}
