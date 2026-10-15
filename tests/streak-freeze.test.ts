import { describe,it,expect } from 'vitest';
import { createEmptyProgress,reconcileCalendar,calculateStreak,finishAction,getTotalXp } from '../src/lib/progress';
import { addCalendarDays } from '../src/lib/bucharest-date';
import { reconcileAccountCalendar } from '../src/lib/account/calendar';
import { buildStreakMoments,coalesceStreakMoments,freezeLabel,streakLabel,type MomentDraft,type StreakMoment } from '../src/lib/streak-moments';
const at=(day:string)=>new Date(`${day}T12:00:00Z`);
const start=(day='2026-10-09',n=8)=>({...createEmptyProgress(at(addCalendarDays(day,1-n))),activityDates:Array.from({length:n},(_,i)=>addCalendarDays(day,i+1-n)),maxSeenDateKey:day,lastFreezeGrantDateKey:'2026-10-05',freezeBalance:2});
const events=(drafts:MomentDraft[]):StreakMoment[]=>drafts.map(d=>({...d,id:crypto.randomUUID()}));
describe('Final civil streak and freeze rules',()=>{
  it('one, two and three missed days settle chronologically without XP',()=>{
    const p=start('2026-10-05');
    for(const [day,count,streak] of [['2026-10-07',1,8],['2026-10-08',2,8],['2026-10-09',2,0]] as const){
      const settled=reconcileCalendar(p,at(day));expect(settled.freezeDates).toHaveLength(count);expect(settled.freezeBalance).toBe(2-count);expect(calculateStreak(settled,day).current).toBe(streak);expect(getTotalXp(settled)).toBe(0);expect(settled.activityDates).toEqual(p.activityDates);
      expect(reconcileCalendar(settled,at(day))).toEqual(settled);
    }
  });
  it('next activity is 9 after two protections, 1 after three misses',()=>{
    const p=start('2026-10-05');
    expect(finishAction(p,p,[],at('2026-10-08'),true).streakAfter).toBe(9);
    expect(finishAction(p,p,[],at('2026-10-09'),true).streakAfter).toBe(1);
  });
  it('zero inventory breaks; subsequent absence does not consume new grants',()=>{
    const p={...start(),freezeBalance:0};const settled=reconcileCalendar(p,at('2026-10-27'));
    expect(settled.freezeDates).toEqual([]);expect(settled.freezeBalance).toBe(2);expect(calculateStreak(settled,'2026-10-27').current).toBe(0);
  });
  it('Sunday cannot use Monday inventory; Monday itself can',()=>{
    const p={...start('2026-10-10'),freezeBalance:0};
    const monday=reconcileCalendar(p,at('2026-10-12'));expect(monday.freezeDates).toEqual([]);expect(monday.freezeBalance).toBe(1);expect(calculateStreak(monday,'2026-10-12').current).toBe(0);
    const active=finishAction(monday,monday,[],at('2026-10-12'),true).progress;
    const wed=reconcileCalendar(active,at('2026-10-14'));expect(wed.freezeDates).toEqual(['2026-10-13']);expect(wed.freezeBalance).toBe(0);
    const mondayMiss={...start('2026-10-11'),freezeBalance:0};const tuesday=reconcileCalendar(mondayMiss,at('2026-10-13'));
    expect(tuesday.freezeDates).toEqual(['2026-10-12']);expect(tuesday.freezeBalance).toBe(0);expect(calculateStreak(tuesday,'2026-10-13').current).toBe(8);
  });
  it('Friday one charge: Saturday saved, Sunday breaks, Monday refill stays',()=>{
    const p={...start(),freezeBalance:1};const settled=reconcileCalendar(p,at('2026-10-13'));
    expect(settled.freezeDates).toEqual(['2026-10-10']);expect(settled.freezeBalance).toBe(1);expect(calculateStreak(settled,'2026-10-13').current).toBe(0);
  });
  it('6 plus frozen day plus activity hits milestone 7 exactly once',()=>{
    const p=start('2026-10-05',6);const result=finishAction(p,p,[],at('2026-10-07'),true);
    expect(result.streakAfter).toBe(7);expect(result.newEvents.filter(e=>e.type==='streak_milestone' && e.amount===75)).toHaveLength(1);
    expect(finishAction(result.progress,result.progress,[],at('2026-10-07'),true).newEvents).toEqual([]);
  });
  it.each([['2026-03-28','2026-03-31'],['2026-10-24','2026-10-27']])('DST calendar %s -> %s',(day,end)=>{
    const p={...start(day),lastFreezeGrantDateKey:addCalendarDays(day,-5)};const s=reconcileCalendar(p,at(end));
    expect(s.freezeDates).toEqual([addCalendarDays(day,1),addCalendarDays(day,2)]);expect(calculateStreak(s,end).current).toBe(8);
  });
  it('server account catch-up keeps history and inventory stable on repeated reads',()=>{
    const p=start('2026-10-05');const settled=reconcileAccountCalendar(p,at('2026-10-08'));
    expect(settled.freezeDates).toEqual(['2026-10-06','2026-10-07']);expect(settled.freezeBalance).toBe(0);
    expect(reconcileAccountCalendar(settled,at('2026-10-08'))).toEqual(settled);
    expect(reconcileAccountCalendar(settled,at('2026-10-15')).freezeDates).toEqual(settled.freezeDates);
  });
  it('existing accounts retain their one-charge historical allocation',()=>{
    const p={...start('2026-10-05',1),freezeInitialBalance:1,freezeBalance:1};
    const settled=reconcileAccountCalendar(p,at('2026-10-08'));
    expect(settled.freezeDates).toEqual(['2026-10-06']);expect(settled.freezeBalance).toBe(0);expect(calculateStreak(settled,'2026-10-08').current).toBe(0);
    expect(reconcileAccountCalendar(settled,at('2026-10-08')).freezeDates).toEqual(settled.freezeDates);
  });
});
describe('Durable presentation planning',()=>{
  it('0 -> 1 then same-day activity produces one increment event',()=>{
    const p=createEmptyProgress(at('2026-10-06'));const first=finishAction(p,p,[],at('2026-10-06'),true).progress;
    expect(buildStreakMoments(p,first,at('2026-10-06'))).toEqual([expect.objectContaining({type:'streak_incremented',payload:expect.objectContaining({streakBefore:0,streakAfter:1})})]);
    const second=finishAction(first,first,[],at('2026-10-06'),true).progress;expect(buildStreakMoments(first,second,at('2026-10-06'))).toEqual([]);
  });
  it('two freeze days become a single unchanged-streak presentation',()=>{
    const p=start('2026-10-05'),next=reconcileCalendar(p,at('2026-10-08'));const queue=coalesceStreakMoments(events(buildStreakMoments(p,next,at('2026-10-08'))));
    expect(queue).toHaveLength(1);expect(queue[0]).toMatchObject({type:'freeze_consumed',payload:{streakBefore:8,streakAfter:8,freezeAfter:0,freezeDays:['2026-10-06','2026-10-07']}});expect(queue[0].ids).toHaveLength(2);
  });
  it('two freezes then break produce one summary and acknowledge all three',()=>{
    const p=start('2026-10-05'),next=reconcileCalendar(p,at('2026-10-09'));const queue=coalesceStreakMoments(events(buildStreakMoments(p,next,at('2026-10-09'))));
    expect(queue).toHaveLength(1);expect(queue[0].type).toBe('streak_broken');expect(queue[0].ids).toHaveLength(3);expect(queue[0].payload.freezeDays).toHaveLength(2);
  });
  it('protection and a new active day queue sequentially',()=>{
    const p=start('2026-10-05'),next=finishAction(p,p,[],at('2026-10-07'),true).progress;
    expect(coalesceStreakMoments(events(buildStreakMoments(p,next,at('2026-10-07')))).map(q=>q.type)).toEqual(['freeze_consumed','streak_incremented']);
  });
  it('Monday refill creates one small event, capped refill creates none',()=>{
    const p={...createEmptyProgress(at('2026-10-11')),freezeInitialBalance:0,freezeBalance:0};const next=reconcileCalendar(p,at('2026-10-12'));
    expect(buildStreakMoments(p,next,at('2026-10-12')).map(e=>e.type)).toEqual(['freeze_refilled']);
    expect(buildStreakMoments(next,next,at('2026-10-12'))).toEqual([]);
    const capped={...p,freezeInitialBalance:2,freezeBalance:2};expect(buildStreakMoments(capped,reconcileCalendar(capped,at('2026-10-12')),at('2026-10-12'))).toEqual([]);
  });
  it('uses Romanian singular and plural',()=>{expect(streakLabel(1)).toBe('1 zi la rând');expect(streakLabel(2)).toBe('2 zile la rând');expect(freezeLabel(1)).toBe('1 Freeze rămas');expect(freezeLabel(0)).toBe('0 Freeze-uri rămase');expect(freezeLabel(2)).toBe('2 Freeze-uri rămase');});
  it('late historical activity never presents an obsolete lower streak number',()=>{
    const previous={...createEmptyProgress(at('2026-10-10')),activityDates:['2026-10-08','2026-10-09','2026-10-10']};
    const next={...previous,activityDates:['2026-10-06',...previous.activityDates]};
    expect(buildStreakMoments(previous,next,at('2026-10-10'))).toEqual([]);
  });
  it('a later commit for an older offline day presents its latest canonical number',()=>{
    const p=start('2026-10-05'),saved=reconcileCalendar(p,at('2026-10-07'));
    const freeze=events(buildStreakMoments(p,saved,at('2026-10-07')))[0];
    const increment:StreakMoment={id:crypto.randomUUID(),type:'streak_incremented',effective_day:'2026-10-05',semantic_key:'streak_incremented:2026-10-05',created_at:'2026-10-08T12:00:00Z',payload:{schemaVersion:1,streakBefore:8,streakAfter:9,freezeBefore:1,freezeAfter:1,freezeDays:[]}};
    freeze.created_at='2026-10-07T12:00:00Z';
    const queue=coalesceStreakMoments([increment,freeze]);expect(queue.map(q=>q.type)).toEqual(['freeze_consumed','streak_incremented']);expect(queue[1].payload.streakAfter).toBe(9);
  });
});
