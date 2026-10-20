import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { QuestionLeadIn, RememberReading } from '../app/components/lesson-reading';
import { getReadyLessons, getLessonById } from '../src/content/lessons';
import { ReadyLessonSchema, RememberScreenSchema, isCopiedTakeaway } from '../src/types/learning-schema';
import { completeLessonSession, createEmptyProgress, getCorrectAnswerId, getTotalXp, isAnswerScreen, normalizeProgress } from '../src/lib/progress';
import { readTrial, saveTrial, startTrial, clearTrial } from '../src/lib/account/onboarding';
import type { ReadyLesson, RememberScreen } from '../src/types/learning';

const before: ReadyLesson[] = JSON.parse(readFileSync('artifacts/lesson-quality/before.json','utf8'));
const changes: {id:string;rewritten:string[]}[] = JSON.parse(readFileSync('artifacts/lesson-quality/changes.json','utf8'));
const lessons = getReadyLessons();
const now = new Date('2026-10-14T09:00:00Z');
const remember = (detail = 'Compară totalul creditului pentru aceeași durată.'): RememberScreen => ({type:'tine_minte',id:'remember',title:'Ține minte',items:[
  ...Array.from({length:3},(_,index)=>({id:String(index),title:'Idee',body:'O rată mică nu descrie tot costul.',detail,detailHighlights:['totalul'],type:'normal' as const})),
  {id:'action',title:'Ce poți face azi',body:'Compară două oferte pentru aceeași durată.',detail:'Folosește aceeași sumă împrumutată ca să poți compara ofertele.',detailHighlights:['sumă'],type:'action'}
]});
afterEach(()=>{clearTrial();vi.unstubAllGlobals();});

describe('Lesson quality contracts',()=>{
  it('loads all production lessons and preserves teaching material, placement and reward inputs',()=>{
    expect(lessons).toHaveLength(100);
    for(const old of before){
      const current=lessons.find(l=>l.id===old.id)!;
      expect(ReadyLessonSchema.safeParse(current).success).toBe(true);
      for(const key of ['id','slug','categoryId','chapterId','title','description','objective','quizFocus','xp','minutes','sourceUrls'] as const) expect(current[key]).toEqual(old[key]);
      expect(current.screens.map(s=>s.id)).toEqual(old.screens.map(s=>s.id));
      expect(current.screens.filter(isAnswerScreen).length).toBe(old.screens.filter(isAnswerScreen).length);
      const rewritten=changes.find(c=>c.id===old.id)?.rewritten ?? [];
      for(const screen of old.screens){
        const next=current.screens.find(s=>s.id===screen.id)!;
        if(screen.type==='tine_minte' && next.type==='tine_minte') expect(next.items.map(i=>[i.id,i.title,i.type])).toEqual(screen.items.map(i=>[i.id,i.title,i.type]));
        else if(!isAnswerScreen(screen)) expect(next).toEqual(screen);
        else {
          expect(getCorrectAnswerId(next)).toBe(getCorrectAnswerId(screen));
          if(!rewritten.includes(screen.id)){
            const expected={...screen};if(expected.title==='Tu ce ai verifica?')delete expected.title;
            expect(next).toEqual(expected);
          }
        }
      }
    }
  });
  it('keeps representative good questions and useful calculations',()=>{
    const lesson=getLessonById('ce-sunt-banii') as ReadyLesson;
    expect(lesson.screens.find(s=>s.id==='q2')).toEqual(before[0].screens.find(s=>s.id==='q2'));
    expect(lessons.some(l=>l.screens.some(s=>s.type==='calcul'))).toBe(true);
    const interest=getLessonById('dobanda') as ReadyLesson;
    const question=interest.screens.find(s=>s.id==='q3')!;
    expect('question' in question && question.question).toContain('împrumut');
    const taught=interest.screens.slice(0,interest.screens.indexOf(question)).filter(s=>s.type==='explicatie').flatMap(s=>s.paragraphs ?? []).join(' ');
    expect(taught).toContain('Comisioanele');expect(taught).toContain('perioadă');
  });
  it('rejects normalized copies and short-prefix copies, permits related elaboration and requires details',()=>{
    expect(RememberScreenSchema.safeParse(remember(' O RATĂ MICĂ — nu descrie tot costul! ')).success).toBe(false);
    expect(RememberScreenSchema.safeParse(remember('De reținut: o rată mică nu descrie tot costul.')).success).toBe(false);
    expect(RememberScreenSchema.safeParse(remember('Perioada mai lungă poate reduce plata lunară. Compară totalul rambursat pentru aceeași valoare împrumutată.')).success).toBe(true);
    const missing=remember();delete (missing.items[0] as Partial<RememberScreen['items'][number]>).detail;expect(RememberScreenSchema.safeParse(missing).success).toBe(false);
    expect(RememberScreenSchema.safeParse(remember('   ')).success).toBe(false);
    for(const lesson of lessons) for(const screen of lesson.screens) if(screen.type==='tine_minte') for(const item of screen.items) if(item.detail) expect(isCopiedTakeaway(item.body,item.detail)).toBe(false);
  });
  it('renders a disclosure for every item with connected collapsed details',()=>{
    const plain=renderToStaticMarkup(createElement(RememberReading,{screen:remember()}));
    expect(plain.match(/<button/g)).toHaveLength(4);expect(plain).toContain('aria-expanded="false"');
    const detailed=renderToStaticMarkup(createElement(RememberReading,{screen:remember('Compară totalul. Verifică perioada.')}));
    expect(detailed).toContain('aria-expanded="false"');expect(detailed).toContain('aria-hidden="true"');
    expect(detailed.replace(/<[^>]+>/g,'')).toContain('Compară totalul. Verifică perioada.');expect(detailed).toContain('class="remember-keyword"');
  });
  it('renders a content-owned lead-in and no placeholder when it is absent',()=>{
    const interest=getLessonById('dobanda') as ReadyLesson;
    const question=interest.screens.find(s=>s.id==='q6');
    expect(question && 'leadIn' in question && question.leadIn).toBeTruthy();
    const text=question && 'leadIn' in question ? question.leadIn : undefined;
    expect(renderToStaticMarkup(createElement(QuestionLeadIn,{text}))).toContain(text);
    expect(renderToStaticMarkup(createElement(QuestionLeadIn,{}))).toBe('');
  });
  it('accepts variable meaningful practice counts while retaining structural validation',()=>{
    const shorter=structuredClone(lessons[0]);shorter.screens.splice(12,2);
    expect(ReadyLessonSchema.safeParse(shorter).success).toBe(true);
    const longer=structuredClone(lessons[0]);longer.screens.splice(-2,0,{...longer.screens[2],id:'transfer-addition'});
    expect(ReadyLessonSchema.safeParse(longer).success).toBe(true);
  });
  it('authoring supports variable counts, requires authored details and protects curated files',()=>{
    const source=readFileSync('scripts/write-curriculum-lessons.cjs','utf8');
    const canonical=JSON.parse(readFileSync('artifacts/canonical-curriculum.json','utf8'));
    const content=getLessonById('dobanda') as ReadyLesson;
    let generated='';let existing=false;
    const fakeFs={existsSync:()=>existing,readFileSync:()=>'{"contentVersion":3}',writeFileSync:(_file:string,value:string)=>{generated=value;}};
    const compiled={exports:{} as {write:(id:string,records:unknown[])=>void}};
    new Function('require','module','console',source)((id:string)=>id==='node:fs'?fakeFs:id==='node:path'?path:canonical,compiled,{log:()=>{}});
    const questions=content.screens.filter(isAnswerScreen).map(s=>[s.question,s.type==='adevarat_fals'?s.correctAnswer:'Răspuns corect','Alternativa A','Alternativa B',s.explanation]);
    const recap=content.screens.find(s=>s.type==='tine_minte')!;
    const record=(count:number)=>[content.title,content.objective,content.description,content.screens.filter(s=>s.type==='explicatie').map(s=>s.paragraphs!.join('\n\n')),content.screens.find(s=>s.type==='caz_real')!.paragraphs,Array.from({length:count},(_,i)=>questions[i%questions.length]),recap.items.slice(0,-1).map(i=>[i.title,i.body,i.detail,i.detailHighlights]),[recap.items.at(-1)!.body,recap.items.at(-1)!.detail,recap.items.at(-1)!.detailHighlights]];
    const missing=record(7);missing[7]='Compară o ofertă.';expect(()=>compiled.exports.write(content.categoryId,[missing])).toThrow('Every takeaway requires authored detail');
    for(const count of [7,10]){
      compiled.exports.write(content.categoryId,[record(count)]);
      const raw=JSON.parse(generated.slice(generated.indexOf('= ')+2).replace(/;\s*$/u,''));
      expect(ReadyLessonSchema.safeParse(raw).success).toBe(true);
      expect(raw.screens.filter((s:{question?:string})=>s.question)).toHaveLength(count);
      expect(raw.screens.some((s:{title?:string})=>s.title==='Tu ce ai verifica?')).toBe(false);
      expect(raw.screens.find((s:{type:string})=>s.type==='tine_minte').items.every((i:{detail?:string;detailHighlights?:string[]})=>i.detail&&i.detailHighlights?.length)).toBe(true);
    }
    existing=true;expect(()=>compiled.exports.write(content.categoryId,[record(9)])).toThrow('Refusing to overwrite curated content');
  });
  it('preserves completion, historical XP and replay rules across catalog revisions',()=>{
    for(const lesson of lessons){
      const answers=lesson.screens.filter(isAnswerScreen).map(s=>({screenId:s.id,selectedOptionId:getCorrectAnswerId(s)!}));
      const first=completeLessonSession(createEmptyProgress(now),{lessonId:lesson.id,sessionId:'first',answers},now);
      expect(first.xpGained).toBe(81);
      const preserved=normalizeProgress(first.progress,now);
      expect(preserved.lessonStats[lesson.id].completed).toBe(true);
      expect(getTotalXp(preserved)).toBe(getTotalXp(first.progress));
      const replay=completeLessonSession(preserved,{lessonId:lesson.id,sessionId:'replay',answers},now);
      expect(replay.xpGained).toBe(0);
      expect(replay.progress.xp_events).toEqual(first.progress.xp_events);
    }
  });
  it('resumes a pre-existing trial position and its stable answer keys safely',()=>{
    const values=new Map<string,string>();vi.stubGlobal('localStorage',{getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v),removeItem:(k:string)=>values.delete(k)});
    const trial=startTrial();saveTrial({...trial,screenIndex:5,answers:[{screenId:'q1',selectedOptionId:'0'},{screenId:'q2',selectedOptionId:'1'}]});
    expect(readTrial()?.screenIndex).toBe(5);expect(readTrial()?.answers).toHaveLength(2);
  });
  it('has no universal case-question title in the renderable catalog',()=>{
    for(const lesson of lessons)for(const screen of lesson.screens)expect(screen.title).not.toBe('Tu ce ai verifica?');
  });
});
