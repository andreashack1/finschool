/* eslint-disable @typescript-eslint/no-require-imports -- Deterministic catalog audit. */
const fs=require('node:fs');
const {load}=require('./learning-test-content.cjs');
const {getReadyLessons}=load('src/content/lessons/index.ts');
const {isCopiedTakeaway,normalizeTakeaway}=load('src/types/learning-schema.ts');
const changes=require('../artifacts/lesson-quality/changes.json');
const errors=[],repeatedQuestions=[],reviewCandidates=[];
const lessons=getReadyLessons();
for(const lesson of lessons){
  const seen=new Map();
  for(const screen of lesson.screens){
    if(screen.question){
      const normalized=normalizeTakeaway(screen.question);
      if(seen.has(normalized))repeatedQuestions.push({lessonId:lesson.id,screenId:screen.id,other:seen.get(normalized)});
      seen.set(normalized,screen.id);
      if(screen.title==='Tu ce ai verifica?')errors.push(lesson.id+':'+screen.id+': universal title');
      if(screen.options?.some(o=>/culoarea|fontul|magie|întâmplare/iu.test(o.label ?? '')))reviewCandidates.push({lessonId:lesson.id,screenId:screen.id,question:screen.question});
    }
    for(const item of screen.items ?? [])if(item.detail && isCopiedTakeaway(item.body,item.detail))errors.push(lesson.id+':'+item.id+': copied detail');
  }
}
const rewritten=changes.reduce((n,c)=>n+c.rewritten.length,0);
const before=require('../artifacts/lesson-quality/before.json');
const questionCount=before.reduce((n,l)=>n+l.screens.filter(s=>s.question).length,0);
const report={status:'Catalog editorial pass implemented; +30–40 second average is not confirmed by timing evidence',lessons:lessons.length,questions:lessons.reduce((n,l)=>n+l.screens.filter(s=>s.question).length,0),questionsUnchanged:questionCount-rewritten,questionsRewritten:rewritten,questionsAdded:0,questionsRemoved:0,lessonsWithQuestionEdits:changes.filter(c=>c.rewritten.length).length,takeawayDetailsRewritten:changes.reduce((n,c)=>n+c.rewrittenDetails,0),expandRemoved:changes.reduce((n,c)=>n+c.removedDetails,0),genericTitlesRemoved:changes.reduce((n,c)=>n+c.promptsRemoved,0),repeatedQuestions,reviewCandidates,errors,duration:'5-minute labels retained. No screens added. Deeper distractors, applied wording and optional elaborations target slightly more reflection; actual average duration requires learner timing.',databaseMigration:'NONE'};
fs.writeFileSync('artifacts/lesson-quality/audit.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(errors.length)process.exitCode=1;
