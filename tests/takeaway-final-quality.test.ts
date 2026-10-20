import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe,it,expect } from 'vitest';
import { getReadyLessons } from '../src/content/lessons';
import { RememberScreenSchema, isCopiedTakeaway, wordCount } from '../src/types/learning-schema';
import { HighlightedDetail, RememberReading } from '../app/components/lesson-reading';
import type { ReadyLesson } from '../src/types/learning';

const before:ReadyLesson[]=JSON.parse(readFileSync('artifacts/final-quality/lessons-before.json','utf8'));
describe('All ready recap cards: two authored information levels',()=>{
 it('preserves all identity, progression, rewards and content outside the recap',()=>{
  const current=getReadyLessons();expect(current).toHaveLength(100);
  for(const old of before){
   const lesson=current.find(l=>l.id===old.id)!;
   expect({...lesson,screens:undefined}).toEqual({...old,screens:undefined});
   expect(lesson.screens.map(s=>[s.id,s.type])).toEqual(old.screens.map(s=>[s.id,s.type]));
   for(const screen of old.screens){
    const next=lesson.screens.find(s=>s.id===screen.id)!;
    if(screen.type==='tine_minte'&&next.type==='tine_minte')expect(next.items.map(i=>[i.id,i.type,i.title])).toEqual(screen.items.map(i=>[i.id,i.type,i.title]));
    else expect(next).toEqual(screen);
   }
  }
 });
 it('requires useful details and one to three valid highlights on all 407 cards',()=>{
  let count=0;
  for(const lesson of getReadyLessons())for(const screen of lesson.screens)if(screen.type==='tine_minte'){
   expect(RememberScreenSchema.safeParse(screen).success).toBe(true);
   const html=renderToStaticMarkup(createElement(RememberReading,{screen}));
   expect(html.match(/aria-expanded="false"/g)).toHaveLength(screen.items.length);
   for(const item of screen.items){
    count++;expect(wordCount(item.body)).toBeLessThanOrEqual(40);expect(wordCount(item.detail)).toBeGreaterThanOrEqual(10);
    expect(isCopiedTakeaway(item.body,item.detail)).toBe(false);
    expect(item.detailHighlights.length).toBeGreaterThanOrEqual(1);expect(item.detailHighlights.length).toBeLessThanOrEqual(3);
   }
  }
  expect(count).toBe(407);
 });
 it('rejects missing, duplicate, absent and excessive highlights',()=>{
  const screen=structuredClone(getReadyLessons()[0].screens.find(s=>s.type==='tine_minte')!);
  expect(RememberScreenSchema.safeParse({...screen,items:screen.items.map((i,n)=>n?i:{...i,detail:undefined})}).success).toBe(false);
  for(const terms of [[],['absent keyword'],['lei','LEI'],['a','b','c','d']]){
   const changed=structuredClone(screen);changed.items[0].detailHighlights=terms;
   expect(RememberScreenSchema.safeParse(changed).success).toBe(false);
  }
 });
 it('rejects tiny rewrites but allows financial terms in a distinct explanation',()=>{
  expect(isCopiedTakeaway('Netul este suma care intră efectiv în cont.','Ține minte: netul este suma care intră în cont.')).toBe(true);
  expect(isCopiedTakeaway('Netul este suma care intră în cont.','Din net plătești apoi transportul și chiria; suma încasată nu este aceeași cu suma rămasă după acestea.')).toBe(false);
 });
 it('matches exact escaped phrases, preserves casing and renders strings safely',()=>{
  const html=renderToStaticMarkup(createElement(HighlightedDetail,{text:'BRUT și brut. <script>alert(1)</script> C++',terms:['brut','C++']}));
  expect(html).toContain('>BRUT</strong>');expect(html).toContain('>brut</strong>');expect(html).toContain('>C++</strong>');expect(html).not.toContain('<script>');expect(html).toContain('&lt;script&gt;');
 });
});
