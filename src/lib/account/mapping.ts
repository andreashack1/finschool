import { z } from 'zod';
import { createEmptyProgress,getProfileStats,getBucharestDateKey } from '../progress';
import type { ProgressState } from '../../types/progress';
import { ProgressSchema } from '../progress-schema';
import { ProfileSchema } from './schemas';
const record = z.record(z.string(), z.unknown());
export const DatabaseSnapshotSchema = z.object({ profile: ProfileSchema, stats: record.nullable(), lessons: z.array(record), events: z.array(record), activity: z.array(z.string()), freezes: z.array(z.string()), achievements: z.array(record), daily: z.array(record) });
export function accountProgressSummary(progress:ProgressState,now:Date) {const stats=getProfileStats(progress,getBucharestDateKey(now));return {totalXp:stats.totalXp,completedLessons:stats.completedLessons,currentStreak:stats.current,longestStreak:stats.longest,freezeBalance:stats.freeze.balance,level:stats.level};}
export function accountSnapshotToProgressState(input: unknown, now: Date) {
  const db = DatabaseSnapshotSchema.parse(input);
  const meta = record.parse(db.stats?.state_meta ?? {});
  const base = createEmptyProgress(new Date(db.profile.created_at));
  return ProgressSchema.parse({ ...base, ...meta,
    freezeBalance: db.stats ? db.stats.streak_freezes : base.freezeBalance,
    xp_events: db.events.map(e => ({ id: e.event_key, type: e.source, amount: e.amount, refId: e.ref_id ?? undefined, lessonId: e.lesson_id ?? undefined, screenId: e.screen_id ?? undefined, createdAt: new Date(String(e.created_at)).toISOString(), bucharestDateKey: e.bucharest_day })),
    lessonStats: Object.fromEntries(db.lessons.map(l => [l.lesson_id, { completed: true, bestFirstTryCorrect: l.best_correct, questionCount: l.total_questions, completionCount: l.attempts, perfectEver: l.perfect_ever, sessionIds: l.session_ids, firstCompletedAt: new Date(String(l.first_completed_at)).toISOString(), lastCompletedAt: new Date(String(l.last_completed_at)).toISOString() }])),
    activityDates: db.activity, freezeDates: db.freezes,
    dailyChallenges: Object.fromEntries(db.daily.map(d => [d.day, { challengeId: d.challenge_id, selectedOptionId: d.selected_option_id, correct: d.correct, answeredAt: new Date(String(d.answered_at)).toISOString() }])),
    achievementUnlocks: Object.fromEntries(db.achievements.map(a => [a.achievement_id, { unlockedAt: new Date(String(a.unlocked_at)).toISOString() }])),
    seenAchievementToastIds: db.achievements.filter(a => a.notified_at).map(a => a.achievement_id),
    updatedAt: db.stats?.updated_at ? new Date(String(db.stats.updated_at)).toISOString() : now.toISOString(),
  });
}
