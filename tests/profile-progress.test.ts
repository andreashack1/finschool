import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { achievements } from '../src/content/achievements';
import { categories } from '../src/content/categories';
import { getReadyLessons } from '../src/content/lessons';
import { createEmptyProgress, evaluateAchievements } from '../src/lib/progress';
import { getActiveAchievements, getProfileLearningProgress } from '../src/lib/profile-progress';
import { AchievementsList, ProfileLearningProgress } from '../app/components/gamification-ui';
import type { ProgressState } from '../src/types/progress';

const now=new Date('2026-10-17T12:00:00Z'),ready=getReadyLessons();
function complete(p:ProgressState,ids:string[],perfect=false){
  for(const id of ids)p.lessonStats[id]={completed:true,firstCompletedAt:now.toISOString(),lastCompletedAt:now.toISOString(),bestFirstTryCorrect:perfect?10:6,questionCount:10,perfectEver:perfect,completionCount:1,sessionIds:[]};
  return evaluateAchievements(p,now);
}
describe('active achievement presentation preserves the catalog',()=>{
  it('keeps all 21 definitions and renders at most five diverse incomplete goals',()=>{
    const p=createEmptyProgress(now),before=structuredClone(p),active=getActiveAchievements(p);
    expect(achievements).toHaveLength(21);expect(active).toHaveLength(5);
    expect(new Set(active.map(a=>a.condition.type)).size).toBe(5);
    expect(getActiveAchievements(p)).toEqual(active);expect(p).toEqual(before);
    const html=renderToStaticMarkup(createElement(AchievementsList,{progress:p}));
    expect(html.match(/data-achievement=/g)).toHaveLength(5);expect(html).toContain('0 deblocate');expect(html).not.toContain('/ 21');
  });
  it('selects only the nearest incomplete learning milestone and replaces it after unlock',()=>{
    let p=complete(createEmptyProgress(now),ready.slice(0,3).map(l=>l.id));
    let learning=getActiveAchievements(p).filter(a=>a.condition.type==='completed-lessons');
    expect(learning.map(a=>a.id)).toEqual(['serious-student']);
    const historical=structuredClone(p.achievementUnlocks);
    p=complete(p,ready.slice(3,5).map(l=>l.id));
    learning=getActiveAchievements(p).filter(a=>a.condition.type==='completed-lessons');
    expect(learning.map(a=>a.id)).toEqual(['passionate']);
    expect(p.achievementUnlocks['serious-student']).toBeDefined();
    for(const id of Object.keys(historical))expect(p.achievementUnlocks[id]).toEqual(historical[id]);
  });
  it('never selects two milestones from an XP, streak, perfect or challenge track',()=>{
    const p=complete(createEmptyProgress(now),ready.slice(0,3).map(l=>l.id),true);
    const active=getActiveAchievements(p);
    for(const type of ['completed-lessons','perfect-lessons','longest-streak','total-xp'])expect(active.filter(a=>a.condition.type===type).length).toBeLessThanOrEqual(1);
    expect(active.filter(a=>['daily-answers','daily-correct'].includes(a.condition.type)).length).toBeLessThanOrEqual(1);
    expect(active.every(a=>!p.achievementUnlocks[a.id])).toBe(true);
  });
  it('keeps all unlock timestamps and shows a completed state with no active rows',()=>{
    const p=createEmptyProgress(now);
    p.achievementUnlocks=Object.fromEntries(achievements.map(a=>[a.id,{unlockedAt:now.toISOString()}]));
    const before=structuredClone(p);expect(getActiveAchievements(p)).toEqual([]);
    const html=renderToStaticMarkup(createElement(AchievementsList,{progress:p}));
    expect(html).toContain('21 deblocate');expect(html).toContain('Ai deblocat toate realizările disponibile');expect(html).not.toContain('data-achievement=');expect(p).toEqual(before);
  });
  it('keeps SimLife and challenges represented before filling spare slots with more subject goals',()=>{
    const p=createEmptyProgress(now);
    for(const a of achievements.filter(a=>['completed-lessons','perfect-lessons','longest-streak','daily-goals','total-xp'].includes(a.condition.type)))p.achievementUnlocks[a.id]={unlockedAt:now.toISOString()};
    const active=getActiveAchievements(p);
    expect(active.some(a=>a.condition.type==='simulator')).toBe(true);
    expect(active.some(a=>['daily-answers','daily-correct'].includes(a.condition.type))).toBe(true);
    expect(active).toHaveLength(5);
  });
  it('preserves the SimLife internal identity and unlock condition',()=>{
    const a=achievements.find(a=>a.id==='first-month')!;
    expect(a.condition).toEqual({type:'simulator',target:1,refId:'simulator'});expect(a.group).toBe('SimLife');expect(a.description).toBe('Completează prima lună în SimLife.');
  });
});
describe('compact canonical learning progress',()=>{
  it('uses the ready curriculum count and ignores unknown/historical IDs in the total',()=>{
    const p=complete(createEmptyProgress(now),[...ready.slice(0,3).map(l=>l.id),'unknown-historical']);
    const summary=getProfileLearningProgress(p);
    expect(summary.completed).toBe(3);expect(summary.available).toBe(ready.length);expect(summary.percentage).toBe(Math.round(3/ready.length*100));
  });
  it('shows at most three started unfinished categories, preferring the current one',()=>{
    const ids=categories.slice(0,5).map(c=>ready.find(l=>l.categoryId===c.id)!.id);
    const p=complete(createEmptyProgress(now),ids);p.lastLessonId=ids[4];
    const summary=getProfileLearningProgress(p);
    expect(summary.categories).toHaveLength(3);expect(summary.categories[0].category.id).toBe(categories[4].id);
    expect(summary.categories.every(c=>c.completed>0&&c.completed<c.available)).toBe(true);expect(getProfileLearningProgress(p)).toEqual(summary);
  });
  it('handles empty, completed category and completed curriculum states',()=>{
    const empty=createEmptyProgress(now);expect(getProfileLearningProgress(empty).categories).toEqual([]);
    expect(renderToStaticMarkup(createElement(ProfileLearningProgress,{progress:empty}))).toContain('Primele tale categorii');
    const firstCategory=ready.filter(l=>l.categoryId===categories[0].id);
    expect(getProfileLearningProgress(complete(createEmptyProgress(now),firstCategory.map(l=>l.id))).categories).toEqual([]);
    const full=complete(createEmptyProgress(now),ready.map(l=>l.id)),summary=getProfileLearningProgress(full);
    expect(summary.completed).toBe(ready.length);expect(summary.percentage).toBe(100);expect(summary.categories).toEqual([]);
    const html=renderToStaticMarkup(createElement(ProfileLearningProgress,{progress:full}));expect(html).toContain('Ai parcurs toate lecțiile disponibile');expect(html).toContain(`${ready.length} din ${ready.length} lecții`);
  });
});
