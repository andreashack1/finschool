/* eslint-disable @typescript-eslint/no-require-imports -- Content/persistence contract tests. */
const assert = require('node:assert/strict');
const { load } = require('./learning-test-content.cjs');
const { categories } = load('src/content/categories.ts');
const registry = load('src/content/lessons/index.ts');
const { validateContentTree, isValidScreen } = load('src/lib/learning-validation.ts');
const { CategorySchema, LessonSchema } = load('src/types/learning-schema.ts');
const { categoryProgress, chapterProgress, lessonState, progressFor } = load('src/lib/learning-progress.ts');

const before = require('../artifacts/curriculum-before.json');
const salary = registry.getLessonById('salariu-brut-vs-net');
const inflation = registry.getLessonById('ce-este-inflatia');
const readyIds = ['phishing','primul-buget','fondul-de-urgenta',salary.id,inflation.id,'scorul-de-credit','dobanda-compusa'];
assert.equal(categories.length, 12);
assert.equal(registry.lessons.length, 119);
assert.deepEqual(categories.map(c => c.order), Array.from({length:12}, (_,i)=>i+1));
assert.deepEqual(categories.map(c=>c.chapters.reduce((n,ch)=>n+ch.lessons.length,0)), [9,10,10,9,9,12,11,7,11,9,8,14]);
assert.deepEqual(registry.getReadyLessons().map(l=>l.id), readyIds);
assert.deepEqual(registry.legacyQuickLessons.map(l=>l.id), ['card-debit-vs-credit']);
for (const quick of registry.legacyQuickLessons) assert.ok(LessonSchema.safeParse(quick).success);
assert.equal(inflation.screens.length, 16);
const published=[
 ['ce-este-inflatia','Inflația','economia-pe-scurt','preturi','calcul','adevarat_fals'],
 ['fondul-de-urgenta','Fondul de urgență','economii','siguranta-ta-financiara','calcul','scenariu'],
 ['primul-buget','Primul tău buget','economii','bugetul','calcul','scenariu'],
 ['scorul-de-credit','Scorul de credit','credite-si-datorii','bazele-creditului','adevarat_fals','scenariu'],
 ['phishing','Phishing','siguranta-financiara','mesaje-si-apeluri-false','adevarat_fals','scenariu'],
 ['dobanda-compusa','Dobânda compusă','investitii-de-la-zero','bazele','variante','explicatie'],
];
for(const [id,title,categoryId,chapterId] of published){
 const lesson=registry.getLessonById(id);
 assert.equal(lesson.title,title);assert.equal(lesson.categoryId,categoryId);assert.equal(lesson.chapterId,chapterId);
 assert.equal(lesson.xp,30);assert.equal(lesson.minutes,5);assert.equal(lesson.status,'ready');
 assert.equal(registry.lessons.filter(l=>l.id===id||l.title===title).length,1);
 assert.equal(lesson.screens.length,16); assert.equal(lesson.screens.filter(s=>'question' in s).length,9); assert.equal(lesson.contentVersion,2);
 assert.ok(categories.find(c=>c.id===categoryId).chapters.find(ch=>ch.id===chapterId).lessons.includes(id));
}
assert.equal(registry.getLegacyQuickLesson('primul-buget'),registry.getLessonById('primul-buget'));
assert.deepEqual(registry.getLessonById('dobanda-compusa').screens.filter(s=>s.type==='calcul').map(s=>s.expectedAnswer),[1100,1210,1331,121]);
assert.equal(inflation.screens[5].expectedAnswer,22);
assert.equal(registry.getLessonById('fondul-de-urgenta').screens[5].expectedAnswer,5400);
assert.equal(registry.getLessonById('primul-buget').screens[5].expectedAnswer,400);
assert.equal(categoryProgress('economii',[]).percentage,0);
assert.equal(categoryProgress('economii',['primul-buget']).percentage,50);
assert.equal(categoryProgress('economii',['primul-buget','fondul-de-urgenta']).percentage,100);
assert.equal(lessonState(registry.getLessonById('fondul-de-urgenta'),[]),'locked');
assert.equal(lessonState(registry.getLessonById('fondul-de-urgenta'),['primul-buget']),'current');
for(const categoryId of ['siguranta-financiara','primul-job','economia-pe-scurt','credite-si-datorii','investitii-de-la-zero']) assert.equal(categoryProgress(categoryId,[]).available,1);
const engine=load('src/lib/progress.ts'), now=new Date('2026-10-03T10:00:00Z');
for(const [id] of published){
 const lesson=registry.getLessonById(id),questions=lesson.screens.filter(engine.isAnswerScreen);
 const answers=questions.map(s=>({screenId:s.id,selectedOptionId:engine.getCorrectAnswerId(s)}));
 const imperfect=answers.map((a,i)=>i===0?{...a,selectedOptionId:'wrong'}:a);
 const base=engine.completeLessonSession(engine.createEmptyProgress(),{lessonId:id,sessionId:'first',answers:imperfect},now);
 assert.equal(base.xpGained,62);
 const perfect=engine.completeLessonSession(base.progress,{lessonId:id,sessionId:'perfect',answers},now);
 assert.equal(perfect.xpGained,4);
 assert.equal(engine.completeLessonSession(perfect.progress,{lessonId:id,sessionId:'replay',answers},now).xpGained,0);
 assert.equal(engine.completeLessonSession(perfect.progress,{lessonId:id,sessionId:'perfect',answers},now).xpGained,0);
 assert.equal(perfect.progress.uniqueCorrectAnswers.length,questions.length);
 if(id==='primul-buget')assert.ok(Boolean(base.progress.achievementUnlocks['budget-ready']));
 if(id==='phishing'){
  const achievement=load('src/content/achievements.ts').achievements.find(a=>a.id==='trained-eye');
  assert.deepEqual(engine.getAchievementProgress(achievement,perfect.progress),{current:1,target:1,percentage:100,label:"1 din 1"});
 }
}
assert.equal(engine.getTotalXp(engine.normalizeProgress({version:0,state:{xp:123,completed:["inflatie"]}},now)),0);
for (const old of before) {
  assert.ok(categories.some(c=>c.id===old.id), 'Preserve category '+old.id);
  for (const ch of old.chapters) for (const lesson of ch.lessons) assert.ok(registry.getLessonById(lesson.id), 'Preserve lesson '+lesson.id);
}
for (const lesson of registry.lessons) {
  assert.ok(LessonSchema.safeParse(lesson).success);
  if (lesson.status==='coming-soon') assert.equal(lesson.screens, undefined);
  else {
    assert.equal(lesson.screens.at(-2).type, 'tine_minte');
    assert.equal(lesson.screens.at(-1).type, 'final');
    for (const screen of lesson.screens) assert.ok(isValidScreen(screen), lesson.id+'/'+screen.id);
  }
}
assert.equal(registry.getNextLesson([]).id, 'phishing');
assert.equal(registry.getNextLesson([salary.id]).id, 'phishing');
assert.equal(registry.getNextLesson([], inflation.id).id, inflation.id);
assert.equal(registry.getNextLesson(readyIds), undefined);
for (const lesson of [salary, inflation]) {
  assert.equal(lessonState(lesson, []), 'current');
  assert.equal(categoryProgress(lesson.categoryId, []).percentage, 0);
  assert.equal(categoryProgress(lesson.categoryId, [lesson.id]).percentage, 100);
  assert.equal(categoryProgress(lesson.categoryId, [lesson.id]).available, 1);
  assert.equal(chapterProgress(lesson.chapterId, [lesson.id], lesson.categoryId).percentage, 100);
}
assert.equal(categoryProgress('investitii-de-la-zero', []).available, 1);
assert.equal(lessonState(registry.getLessonById('primul-contract-de-munca'), []), 'coming-soon');
const futureIndex=registry.lessons.findIndex(l=>l.id==='fluturasul-de-salariu');
const original=registry.lessons[futureIndex];
const future={...original,status:'ready',screens:salary.screens};
registry.lessons[futureIndex]=future;
assert.equal(lessonState(future, []), 'locked');
assert.equal(lessonState(future, [salary.id]), 'current');
assert.equal(categoryProgress(salary.categoryId, [salary.id]).percentage, 50);
assert.equal(progressFor([salary, future], [salary.id,salary.id]).completed, 1);
assert.equal(registry.getNextLesson(readyIds).id, future.id);
registry.lessons[futureIndex]=original;

// Negative content fixtures must fail with actionable errors.
const copy = x => JSON.parse(JSON.stringify(x));
const invalidTree=(mutate, expected)=>{const c=copy(categories), l=copy(registry.lessons);mutate(c,l);assert.throws(()=>validateContentTree(c,l),expected);};
invalidTree(c=>{c[1].id=c[0].id;},/Duplicate category/);
invalidTree((c,l)=>{l[1].id=l[0].id;},/Duplicate lesson/);
invalidTree(c=>{c[0].chapters[0].lessons[0]='missing';},/references missing lesson/);
invalidTree((c,l)=>{l[0].chapterId='missing';},/chapter reference/);
invalidTree((c,l)=>{l[0].categoryId='missing';},/category\/chapter reference/);
invalidTree(c=>{c[1].chapters[0].lessons.push(c[0].chapters[0].lessons[0]);},/more than one chapter/);
invalidTree(c=>{c[1].order=c[0].order;},/order/);
assert.equal(CategorySchema.safeParse({...categories[0],difficulty:'invalid'}).success,false);
assert.equal(LessonSchema.safeParse({...salary,screens:[]}).success,false);
assert.equal(LessonSchema.safeParse({...salary,status:'invalid'}).success,false);
assert.equal(LessonSchema.safeParse({...original,screens:salary.screens}).success,false);
assert.equal(isValidScreen({...inflation.screens[2],correctOption:'missing'}),false);
assert.equal(isValidScreen({...inflation.screens[2],options:[]}),false);
assert.equal(isValidScreen({type:'calcul',id:'x',title:'x',question:'x',context:'x',explanation:'x',options:[{id:'a',value:1},{id:'b',value:2},{id:'c',value:4}],expectedAnswer:3}),false);
console.log('PASS: 12 categories, 119 lessons, 7 ready; existing IDs, validation failures, progress and unlock. Storage contracts: verify-progress.cjs.');

