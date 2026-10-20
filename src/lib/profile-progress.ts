import { achievements, type Achievement } from '../content/achievements';
import { categories } from '../content/categories';
import { getReadyLessons } from '../content/lessons';
import { getAchievementProgress, getCompletedLessonIds } from './progress';
import { progressFor } from './learning-progress';
import type { ProgressState } from '../types/progress';

const trackFor = (a: Achievement) => {
  const c = a.condition;
  if (c.type === 'daily-answers' || c.type === 'daily-correct') return 'challenges';
  return `${c.type}:${c.categoryId ?? ''}:${c.refId ?? ''}`;
};
function goalKind(a: Achievement) {
  switch (a.condition.type) {
    case 'completed-lessons': return 'learning';
    case 'perfect-lessons': return 'quality';
    case 'longest-streak': case 'daily-goals': return 'consistency';
    case 'category': case 'chapter': case 'lesson': case 'specialist': return 'subject';
    case 'daily-answers': case 'daily-correct': return 'practice';
    case 'simulator': return 'life';
    case 'total-xp': return 'xp';
  }
}

/** Presentation only: unlock records, timestamps and award conditions remain authoritative. */
export function getActiveAchievements(progress: ProgressState): Achievement[] {
  const nextByTrack = new Map<string, Achievement>();
  for (const achievement of achievements) {
    const count = getAchievementProgress(achievement, progress);
    if (progress.achievementUnlocks[achievement.id] || count.current >= count.target) continue;
    const track = trackFor(achievement), previous = nextByTrack.get(track);
    if (!previous || achievement.condition.target < previous.condition.target) nextByTrack.set(track, achievement);
  }
  const candidates = [...nextByTrack.values()].sort((a, b) => {
    const countA = getAchievementProgress(a, progress), countB = getAchievementProgress(b, progress);
    return countB.percentage - countA.percentage || achievements.indexOf(a) - achievements.indexOf(b);
  });
  const selected: Achievement[] = [];
  for (const kind of ['learning', 'consistency', 'quality', 'subject', 'practice', 'life', 'xp']) {
    const next = candidates.find(a => goalKind(a) === kind);
    if (next && selected.length < 5) selected.push(next);
  }
  for (const candidate of candidates) {
    if (selected.length === 5) break;
    if (!selected.includes(candidate)) selected.push(candidate);
  }
  return selected;
}

export function getProfileLearningProgress(progress: ProgressState) {
  const ready = getReadyLessons(), completed = getCompletedLessonIds(progress);
  const overall = progressFor(ready, completed);
  const currentCategory = ready.find(l => l.id === progress.lastLessonId)?.categoryId;
  const inProgress = categories.map(category => {
    const lessons = ready.filter(l => l.categoryId === category.id);
    const lastActivity = lessons.flatMap(l => progress.lessonStats[l.id]?.lastCompletedAt ?? []).sort().at(-1) ?? '';
    return { category, ...progressFor(lessons, completed), lastActivity };
  }).filter(c => c.completed > 0 && c.completed < c.available).sort((a, b) =>
    Number(b.category.id === currentCategory) - Number(a.category.id === currentCategory)
    || b.lastActivity.localeCompare(a.lastActivity) || b.percentage - a.percentage || a.category.order - b.category.order);
  return { ...overall, categories: inProgress.slice(0, 3) };
}
