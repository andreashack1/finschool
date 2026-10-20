import { describe, expect, it } from 'vitest';
import { dailyFinlyFacts, getDailyFinlyFact } from '../src/content/daily-facts';
import { categories } from '../src/content/categories';
import { getLessonById } from '../src/content/lessons';
import { addCalendarDays, getBucharestDateKey } from '../src/lib/bucharest-date';

describe('daily curriculum facts',()=>{
  it('has stable unique IDs and valid curriculum references',()=>{
    expect(dailyFinlyFacts.length).toBeGreaterThanOrEqual(30);
    expect(new Set(dailyFinlyFacts.map(f=>f.id)).size).toBe(dailyFinlyFacts.length);
    for(const fact of dailyFinlyFacts){
      expect(fact.text.trim().length).toBeGreaterThan(30);
      expect(categories.some(c=>c.id===fact.categoryId),fact.id).toBe(true);
      expect(getLessonById(fact.lessonId)?.categoryId,fact.id).toBe(fact.categoryId);
    }
  });
  it('selects the same catalog object across repeated renders and advances one step per civil day',()=>{
    const today='2026-10-17',fact=getDailyFinlyFact(today);
    for(let render=0;render<10;render++)expect(getDailyFinlyFact(today)).toBe(fact);
    const index=dailyFinlyFacts.indexOf(fact);
    expect(getDailyFinlyFact(addCalendarDays(today,1))).toBe(dailyFinlyFacts[(index+1)%dailyFinlyFacts.length]);
    expect(getDailyFinlyFact(addCalendarDays(today,dailyFinlyFacts.length))).toBe(fact);
  });
  it('rotates categories including the loop boundary',()=>{
    dailyFinlyFacts.forEach((fact,i)=>expect(fact.categoryId).not.toBe(dailyFinlyFacts[(i+1)%dailyFinlyFacts.length].categoryId));
  });
  it('uses Bucharest midnight across DST rather than a browser UTC date',()=>{
    expect(getBucharestDateKey(new Date('2026-10-24T21:30:00Z'))).toBe('2026-10-25');
    expect(getDailyFinlyFact('2026-10-25')).toBe(getDailyFinlyFact(getBucharestDateKey(new Date('2026-10-25T21:30:00Z'))));
    expect(()=>getDailyFinlyFact('2026-02-30')).toThrow();
  });
});
