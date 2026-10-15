import { z } from 'zod';
import { DateKeySchema } from './progress-schema';
import { calculateStreak, getBucharestDateKey } from './progress';
import { addCalendarDays } from './bucharest-date';
import { freezeLedger } from './account/calendar';
import { gamificationConfig } from '../content/gamification-config';
import type { ProgressState } from '../types/progress';

export const StreakMomentSchema = z.object({
  id: z.uuid(), type: z.enum(['streak_incremented','freeze_consumed','freeze_refilled','streak_broken']),
  effective_day: DateKeySchema, semantic_key: z.string(),
  created_at: z.iso.datetime({offset:true}).optional(),
  payload: z.object({ schemaVersion:z.literal(1), streakBefore:z.number().int().nonnegative(), streakAfter:z.number().int().nonnegative(), freezeBefore:z.number().int().min(0).max(gamificationConfig.freeze.maxBalance), freezeAfter:z.number().int().min(0).max(gamificationConfig.freeze.maxBalance), freezeDays:z.array(DateKeySchema) }),
});
export type StreakMoment = z.infer<typeof StreakMomentSchema>;
export type MomentDraft = Omit<StreakMoment,'id'>;
const atDay=(day:string)=>new Date(`${day}T12:00:00Z`);
export const streakLabel=(n:number)=>`${n} ${n===1?'zi':'zile'} la rând`;
export const freezeLabel=(n:number)=>`${n} ${n===1?'Freeze rămas':'Freeze-uri rămase'}`;

// Snapshots are display metadata, never a second source of business truth.
export function buildStreakMoments(previous:ProgressState,next:ProgressState,now:Date):MomentDraft[] {
  const today=getBucharestDateKey(now), drafts:MomentDraft[]=[];
  const add=(type:StreakMoment['type'],day:string,before:number,after:number,freezeBefore:number,freezeAfter:number,freezeDays:string[]=[])=>drafts.push({type,effective_day:day,semantic_key:`${type}:${day}`,payload:{schemaVersion:1,streakBefore:before,streakAfter:after,freezeBefore,freezeAfter,freezeDays}});
  for(const day of next.freezeDates.filter(d=>!previous.freezeDates.includes(d))) {
    const balance=freezeLedger(next,atDay(day)).freezeBalance;
    const count=calculateStreak(next,day).current;
    add('freeze_consumed',day,count,count,Math.min(gamificationConfig.freeze.maxBalance,balance+1),balance,[day]);
  }
  const start=previous.maxSeenDateKey ?? today;
  for(let day=start;day<today;day=addCalendarDays(day,1)) {
    const before=calculateStreak(next,day).current;
    if(before>0 && !next.activityDates.includes(day) && !next.freezeDates.includes(day) && calculateStreak(next,addCalendarDays(day,1)).current===0) {
      const balance=freezeLedger(next,atDay(day)).freezeBalance;
      add('streak_broken',day,before,0,balance,balance);
    }
  }
  for(const day of next.activityDates.filter(d=>!previous.activityDates.includes(d))) {
    const late=day<today && next.activityDates.some(d=>d>day);
    const after=calculateStreak(next,late?today:day).current;
    const without={...next,activityDates:next.activityDates.filter(d=>d!==day)};
    const before=calculateStreak(late?previous:without,late?today:day).current;
    if(after>before) {
      const balance=freezeLedger(next,atDay(day)).freezeBalance;
      add('streak_incremented',day,before,after,balance,balance);
    }
  }
  if(previous.lastFreezeGrantDateKey) for(let day=addCalendarDays(previous.lastFreezeGrantDateKey,7);day<=today;day=addCalendarDays(day,7)) {
    const before=freezeLedger(next,atDay(addCalendarDays(day,-1))).freezeBalance;
    if(before<gamificationConfig.freeze.maxBalance) add('freeze_refilled',day,calculateStreak(next,day).current,calculateStreak(next,day).current,before,Math.min(gamificationConfig.freeze.maxBalance,before+gamificationConfig.freeze.weeklyGrant));
  }
  return drafts.sort((a,b)=>a.effective_day.localeCompare(b.effective_day));
}

export type MomentPresentation={type:StreakMoment['type'];ids:string[];payload:StreakMoment['payload']};
export function coalesceStreakMoments(events:StreakMoment[]):MomentPresentation[] {
  if(!events.length)return [];
  // Commit order matters for late offline activity: its effective day can be
  // older while its canonical display snapshot is newer. Within a transaction,
  // use civil order for the catch-up sequence.
  const compare=(a:StreakMoment,b:StreakMoment)=>(a.created_at && b.created_at?Date.parse(a.created_at)-Date.parse(b.created_at):0) || a.effective_day.localeCompare(b.effective_day);
  const sorted=[...events].sort(compare);
  const broken=sorted.filter(e=>e.type==='streak_broken').at(-1);
  const frozen=sorted.filter(e=>e.type==='freeze_consumed' && (!broken || compare(e,broken)>0));
  const lastFrozen=frozen.at(-1);
  const cutoff=lastFrozen ?? broken;
  const increments=sorted.filter(e=>e.type==='streak_incremented' && (!cutoff || compare(e,cutoff)>0));
  const lastIncrement=increments.at(-1), refills=sorted.filter(e=>e.type==='freeze_refilled');
  const queue:MomentPresentation[]=[];
  if(broken) {
    const group=sorted.filter(e=>compare(e,broken)<=0 && e.type!=='freeze_refilled');
    queue.push({type:'streak_broken',ids:group.map(e=>e.id),payload:{...broken.payload,freezeDays:group.flatMap(e=>e.payload.freezeDays)}});
  }
  if(lastFrozen) queue.push({type:'freeze_consumed',ids:sorted.filter(e=>(!broken || compare(e,broken)>0) && compare(e,lastFrozen)<=0 && e.type!=='freeze_refilled').map(e=>e.id),payload:{...lastFrozen.payload,freezeDays:frozen.flatMap(e=>e.payload.freezeDays)}});
  if(lastIncrement) queue.push({type:'streak_incremented',ids:increments.map(e=>e.id),payload:lastIncrement.payload});
  if(refills.length) queue.push({type:'freeze_refilled',ids:refills.map(e=>e.id),payload:refills.at(-1)!.payload});
  return queue;
}
