import { simulatorEvents } from '../../content/simulator-events';
import { getLessonById, getLegacyQuickLesson } from '../../content/lessons';
import { calculateStreak, completeDailyChallenge, completeLessonSession, finishAction, getCurrentLevel, getTotalXp, markAchievementToastSeen, markFreezeToastSeen, markLevelCelebrated, saveSimulationStep, selectDailyChallenge, setLastLesson, getBucharestDateKey } from '../progress';
import type { DomainResult, ProgressState } from '../../types/progress';
import { getFirstCurriculumLesson } from './first-lesson';
import { AccountError } from './errors';
import { freezeLedger,precedingCalendarDay,reconcileAccountCalendar } from './calendar';
import type { ProgressOperation } from './contracts';
import { validateLessonEvidence } from './evidence';
const simulatorOptions=simulatorEvents.map(event=>event.options);export function simulatorChoices(history: readonly string[]) { return history.map((title,i) => { const choice = simulatorOptions[i]?.findIndex(o => o.title===title); if (choice===undefined || choice<0) throw new AccountError('INVALID_OPERATION'); return choice; }); }
export function neutralResult(progress: ProgressState): DomainResult {
  const level = getCurrentLevel(getTotalXp(progress)); const streak = calculateStreak(progress, progress.maxSeenDateKey ?? getBucharestDateKey(new Date())).current;
  return { progress, newEvents:[], xpGained:0, xpBreakdown:[], levelBefore:level, levelAfter:level, levelUpCount:0, levelUp:null, streakBefore:streak, streakAfter:streak, freezeConsumed:[], dailyGoalCompleted:false, achievementsUnlocked:[] };
}
export function validateOperationTime(operation: ProgressOperation, accountCreatedAt: string, now: Date) {
  const time = new Date(operation.occurredAt);
  if (!Number.isFinite(time.getTime()) || time.getTime()>now.getTime()+300000) throw new AccountError('INVALID_OPERATION');
  const trial = operation.type==='completeLesson' && operation.payload.trial;
  if (!trial && time.getTime()<new Date(accountCreatedAt).getTime()) throw new AccountError('INVALID_OPERATION');
  if (trial && (!operation.payload.startedAt || operation.payload.lessonId!==getFirstCurriculumLesson()?.id || new Date(operation.payload.startedAt)>time)) throw new AccountError('INVALID_OPERATION');
  return time>now ? now : time;
}
export function applyAccountOperation(previous: ProgressState, operation: ProgressOperation, accountCreatedAt: string, now: Date): DomainResult {
  const occurred = validateOperationTime(operation,accountCreatedAt,now);
  // Activity retains its device occurrence date. The server later reconciles to
  // today's calendar; future client time and pre-account events are rejected.
  const day=getBucharestDateKey(occurred);
  const activity=operation.type==='completeLesson' || operation.type==='answerDailyChallenge';
  const refund=activity && previous.freezeDates.includes(day);
  const eventBase={...previous,freezeDates:refund?previous.freezeDates.filter(date=>date!==day):previous.freezeDates};
  const ledger=freezeLedger(eventBase,precedingCalendarDay(occurred));
  const atEvent = { ...eventBase,freezeBalance:ledger.freezeBalance,lastFreezeGrantDateKey:ledger.lastFreezeGrantDateKey,lastFreezeGrantWeekKey:ledger.lastFreezeGrantWeekKey,maxSeenAt:occurred.toISOString(),maxSeenDateKey:day };
  let result: DomainResult;
  switch(operation.type) {
    case 'completeLesson': {
      const lesson = getLessonById(operation.payload.lessonId) ?? getLegacyQuickLesson(operation.payload.lessonId);
      if (!lesson || lesson.status!=='ready') throw new AccountError('INVALID_OPERATION');
      validateLessonEvidence(lesson,operation.payload.answers);
      result = completeLessonSession(atEvent,{ lessonId:lesson.id, sessionId:operation.operationId, answers:operation.payload.answers },occurred); break;
    }
    case 'answerDailyChallenge': {
      if(!selectDailyChallenge(day).options.some(option=>option.id===operation.payload.selectedOptionId))throw new AccountError('INVALID_OPERATION');
      result=completeDailyChallenge(atEvent,operation.payload.selectedOptionId,occurred); break;
    }
    case 'simulator': {
      const simulation = { step:0,balance:3500,savings:0,history:[] as string[] };
      for (const [index,choice] of operation.payload.choices.entries()) { const option=simulatorOptions[index][choice]; if (option.cost>simulation.balance) throw new AccountError('INVALID_OPERATION'); simulation.step++;simulation.balance-=option.cost;simulation.savings+=option.save;simulation.history.push(option.title); }
      result=saveSimulationStep(atEvent,simulation,occurred); break;
    }
    case 'lastLesson': {
      if (!getLessonById(operation.payload.id) && !getLegacyQuickLesson(operation.payload.id)) throw new AccountError('INVALID_OPERATION');
      result=neutralResult(setLastLesson(previous,operation.payload.id,now));break;
    }
    case 'achievementSeen': if(!previous.achievementUnlocks[operation.payload.id])throw new AccountError('INVALID_OPERATION');result=neutralResult(markAchievementToastSeen(previous,operation.payload.id));break;
    case 'freezeSeen': if(!previous.freezeDates.includes(operation.payload.day))throw new AccountError('INVALID_OPERATION');result=neutralResult(markFreezeToastSeen(previous,operation.payload.day));break;
    case 'levelSeen': result=neutralResult(markLevelCelebrated(previous));break;
  }
  // A late offline activity may connect days already synced from another device.
  // Re-evaluate through the same engine at the latest *existing* activity day;
  // this never manufactures an activity day for opening or syncing the app.
  const latestActivity=result.progress.activityDates.at(-1);
  if(activity && latestActivity && latestActivity>day) {
    const atLatest=new Date(`${latestActivity}T12:00:00Z`);
    const valid=freezeLedger(result.progress,now);
    const base={...result.progress,freezeDates:valid.validDates};const earlier=freezeLedger(base,precedingCalendarDay(atLatest));
    result=finishAction(previous,{...base,freezeBalance:earlier.freezeBalance,lastFreezeGrantDateKey:earlier.lastFreezeGrantDateKey,lastFreezeGrantWeekKey:earlier.lastFreezeGrantWeekKey,maxSeenAt:atLatest.toISOString(),maxSeenDateKey:latestActivity},[],atLatest,true,result.lesson);
  }
  if(operation.type==='completeLesson') {
    const id=operation.payload.lessonId;const old=previous.lessonStats[id];const current=result.progress.lessonStats[id];
    if(old && current)result.progress={...result.progress,lessonStats:{...result.progress.lessonStats,[id]:{...current,firstCompletedAt:[old.firstCompletedAt,current.firstCompletedAt].filter((value):value is string=>Boolean(value)).sort()[0],lastCompletedAt:[old.lastCompletedAt,current.lastCompletedAt].filter((value):value is string=>Boolean(value)).sort().at(-1)}}};
  }
  result.progress=reconcileAccountCalendar(result.progress,now);
  result.streakBefore=calculateStreak(previous,getBucharestDateKey(now)).current;
  result.streakAfter=calculateStreak(result.progress,getBucharestDateKey(now)).current;
  result.freezeConsumed=result.progress.freezeDates.filter(date=>!previous.freezeDates.includes(date));
  return result;
}
