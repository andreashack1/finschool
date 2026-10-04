/* eslint-disable @typescript-eslint/no-require-imports -- Gamification browser QA. */
const {chromium}=require(process.env.FINLY_PLAYWRIGHT_PATH||'playwright');
const AxeBuilder=require(process.env.FINLY_AXE_PATH||'@axe-core/playwright').default;
const assert=require('node:assert/strict'),fs=require('node:fs');
const {load}=require('./learning-test-content.cjs');
const engine=load('src/lib/progress.ts'),registry=load('src/content/lessons/index.ts');
const base=process.env.FINLY_BASE_URL||'http://127.0.0.1:3100',key=engine.PROGRESS_STORAGE_KEY;
const results=[],errors=[];
const read=page=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
async function goto(page,route){await page.goto(base+route,{waitUntil:'networkidle'});}
async function noOverflow(page){assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,page.url());}
const { displayedCorrectIndex } = require('./browser-lesson-options.cjs');
async function play(page,lesson,{wrong=false,double=false}={}){
 for(const screen of lesson.screens){
  await page.getByRole('heading',{name:screen.title,exact:true}).waitFor();
  if(screen.type==='final')break;
  if(engine.isAnswerScreen(screen)){
   const count=screen.type==='adevarat_fals'?2:screen.options.length,correct=await displayedCorrectIndex(page,screen),chosen=wrong?(correct+1)%count:correct;
   await page.locator('.lesson-answer').nth(chosen).click();
   await page.locator('.lesson-feedback').waitFor();
   assert.equal(await page.locator('.lesson-answer:disabled').count(),count);
  }
  if(screen.type==='recap'&&double)await page.locator('.lesson-continue').evaluate(b=>{b.click();b.click();});
  else await page.locator('.lesson-continue').click();
 }
 await page.locator('.lesson-finish').waitFor();
 await noOverflow(page);
}
async function simulator(page){
 await goto(page,'/?tab=simulator');
 for(let i=0;i<5;i++){await page.locator('.sim-choices button').first().click();await page.locator('.sim-feedback').waitFor();await page.locator('.sim-feedback button').click();}
 await page.locator('.sim-finish').waitFor();
}
async function audit(page,label){
 const report=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 assert.deepEqual(report.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[],label);
 results.push({accessibility:label,violations:0});
}
async function contextFor(browser,width,{state,legacy,learning,date='2026-10-03T10:00:00Z',blocked=false}={}){
 const context=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
 await context.addInitScript(({key,state,legacy,learning,blocked})=>{
  // Initialize only once per tab; refresh must preserve actions.
  if(!sessionStorage.getItem('qa-seeded')){
   if(state)localStorage.setItem(key,JSON.stringify(state));
   if(legacy)localStorage.setItem(key,JSON.stringify(legacy));
   if(learning)localStorage.setItem('finly-learning-progress-v1',JSON.stringify(learning));
   sessionStorage.setItem('qa-seeded','yes');
  }
  if(blocked){Storage.prototype.getItem=function(){throw Error('storage blocked');};Storage.prototype.setItem=function(){throw Error('storage blocked');};}
 },{key,state,legacy,learning,blocked});
 const page=await context.newPage();
 await page.clock.setFixedTime(new Date(date));
 page.on('pageerror',e=>errors.push(e.message));
 return {context,page};
}
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  for(const width of [375,390,430,1440]){
   const {context,page}=await contextFor(browser,width);
   await goto(page,'/');
   assert.match(await page.locator('.status-row').innerText(),/0 XP/);
   assert.match(await page.locator('.status-row').innerText(),/0 zile/);
   assert.match(await page.locator('.status-row').innerText(),/0\/1 activitate azi/);
   assert.match(await page.locator('.gamification-level').innerText(),/Money Beginner/);
   assert.equal(await page.locator('.gamification-level [role=progressbar]').getAttribute('aria-valuenow'),'0');
   await noOverflow(page);
   await page.screenshot({path:`artifacts/gamification-home-empty-${width}.png`,fullPage:true});
   await goto(page,'/?tab=profile');
   assert.equal(await page.locator('.achievement').count(),8);
   assert.equal(await page.locator('.achievement.unlocked').count(),0);
   assert.deepEqual(await page.locator('.profile-stats strong').allTextContents(),['0','0','0','0']);
   await noOverflow(page);await audit(page,'profile '+width);
   await page.screenshot({path:`artifacts/gamification-profile-empty-${width}.png`,fullPage:true});
   // First completion with mistakes, then first perfect replay, then no farming.
   await goto(page,'/lectie/ce-este-inflatia');
   await play(page,registry.getLessonById('ce-este-inflatia'),{wrong:true,double:true});
   assert.equal((await read(page)).totalXp,30);
   const first=await read(page);assert.equal(first.lessonStats['ce-este-inflatia'].sessionIds.length,1);
   await page.reload({waitUntil:'networkidle'});
   assert.equal((await read(page)).totalXp,30);
   await play(page,registry.getLessonById('ce-este-inflatia'));
   assert.equal((await read(page)).totalXp,50);
   await page.reload({waitUntil:'networkidle'});
   await play(page,registry.getLessonById('ce-este-inflatia'));
   assert.equal((await read(page)).totalXp,50);
   // A legitimate pending level: daily 99 -> 114. One answer even when wrong.
   const levelState={...engine.createEmptyProgress(),totalXp:99};
   await page.evaluate(({key,state})=>localStorage.setItem(key,JSON.stringify(state)),{key,state:levelState});
   await goto(page,'/');
   const today='2026-10-03',challenge=engine.selectDailyChallenge(today),wrongOption=challenge.options.find(o=>o.id!==challenge.correctOptionId);
   await page.getByRole('button',{name:wrongOption.label,exact:true}).click();
   await page.locator('.finly-level-dialog').waitFor({state:'visible'});
   assert.equal(await page.locator('.finly-level-dialog h2').innerText(),'Budget Rookie');
   assert.equal((await read(page)).totalXp,114);
   await page.waitForFunction(key=>JSON.parse(localStorage.getItem(key)).highestCelebratedLevel===2,key);
   await noOverflow(page);await audit(page,'level-up '+width);
   await page.screenshot({path:`artifacts/gamification-level-up-${width}.png`,fullPage:true});
   await page.locator('.finly-level-dialog .app-button').click();
   assert.equal(await page.locator('.challenge-answers button:disabled').count(),4);
   assert.match(await page.locator('.challenge-feedback').innerText(),/Nu chiar/);
   await audit(page,'daily wrong '+width);
   await page.screenshot({path:`artifacts/gamification-daily-wrong-${width}.png`,fullPage:true});
   await page.reload({waitUntil:'networkidle'});
   assert.equal((await read(page)).totalXp,114);
   assert.equal(await page.locator('.challenge-answers button:disabled').count(),4);
   assert.equal(await page.locator('.finly-level-dialog').count(),0);
   assert.match(await page.locator('.status-row').innerText(),/1 activitate azi/);
   // First achievement toast is persisted and seen exactly once.
   await goto(page,'/lectie/ce-este-inflatia');
   await play(page,registry.getLessonById('ce-este-inflatia'));
   await page.locator('.finly-achievement-toast').waitFor();
   assert.equal(await page.locator('.finly-achievement-toast strong').innerText(),'Primul pas');
   await page.waitForFunction(key=>JSON.parse(localStorage.getItem(key)).achievements.seenToastIds.includes('first-step'),key);
   await noOverflow(page);await audit(page,'achievement toast '+width);
   await page.screenshot({path:`artifacts/gamification-achievement-toast-${width}.png`,fullPage:true});
   await page.locator('.finly-achievement-toast button').click();
   await goto(page,'/?tab=profile');
   assert.equal(await page.locator('[data-achievement="first-step"].unlocked').count(),1);
   assert.equal(await page.locator('.finly-achievement-toast').count(),0);
   await noOverflow(page);
   await page.screenshot({path:`artifacts/gamification-profile-progress-${width}.png`,fullPage:true});
   const beforeSim=(await read(page)).totalXp;
   await simulator(page);
   assert.equal((await read(page)).totalXp,beforeSim+50);
   await page.locator('.sim-finish button').click();
   for(let i=0;i<5;i++){await page.locator('.sim-choices button').first().click();await page.locator('.sim-feedback').waitFor();await page.locator('.sim-feedback button').click();}
   assert.equal((await read(page)).totalXp,beforeSim+50);
   await noOverflow(page);
   results.push({width,replayPerfect:true,doubleClickSafe:true,dailyWrongReward:true,persistedAnswer:true,simulatorOnce:true});
   await context.close();
  }
  // Preserve 720 XP, all stable IDs, old streak record and simulator state.
  const old={version:0,state:{xp:720,streak:7,record:14,completed:['salary','simulator'],lastStudy:null,simulation:{step:5,balance:2130,savings:1000,history:['saved']}}};
  let qa=await contextFor(browser,390,{legacy:old,learning:{version:1,completedLessonIds:['salariu-brut-vs-net','primul-buget'],lastLessonId:'ce-este-inflatia'}});
  await goto(qa.page,'/');
  const migrated=await read(qa.page);
  assert.equal(migrated.totalXp,720);assert.equal(migrated.version,1);assert.equal(migrated.longestStreak,14);
  assert.ok(migrated.completedLessonIds.includes('primul-buget'));
  assert.ok(migrated.awardedRewardKeys.includes('lesson:salariu-brut-vs-net'));
  assert.ok(migrated.simulatorCompletions.includes('simulator'));
  assert.equal(migrated.highestCelebratedLevel,4);
  assert.equal(await qa.page.locator('.gamification-level [role=progressbar]').getAttribute('aria-valuenow'),'30');
  assert.equal(await qa.page.locator('.finly-level-dialog').count(),0);
  assert.equal(await qa.page.locator('.finly-achievement-toast').count(),0);
  await qa.page.screenshot({path:'artifacts/gamification-legacy-migration.png',fullPage:true});
  await qa.context.close();results.push({legacyMigration:'passed'});
  // A pending multi-level celebration survives refresh; migration does not create it.
  qa=await contextFor(browser,375,{state:{...engine.createEmptyProgress(),totalXp:650,highestCelebratedLevel:1}});
  await goto(qa.page,'/');
  await qa.page.locator('.finly-level-dialog').waitFor({state:'visible'});
  assert.match(await qa.page.locator('.finly-level-dialog p').innerText(),/Ai urcat 3 niveluri/);
  await qa.page.locator('.finly-level-dialog .app-button').click();
  await qa.page.reload({waitUntil:'networkidle'});
  assert.equal(await qa.page.locator('.finly-level-dialog').count(),0);
  await qa.context.close();results.push({pendingMultiLevel:'passed'});
  // Max-level and corrupt/partially invalid data remain usable.
  for(const state of [{version:1,totalXp:5000},{version:1,totalXp:-500,completedLessonIds:['a','a']}]){
   qa=await contextFor(browser,430,{state});
   await goto(qa.page,'/?tab=profile');await noOverflow(qa.page);
   assert.ok(!(await qa.page.locator('.profile-card').innerText()).match(/NaN|undefined|Infinity/));
   if(state.totalXp===5000)assert.match(await qa.page.locator('.profile-card').innerText(),/Nivel maxim/);
   else assert.equal((await read(qa.page)).totalXp,0);
   await qa.context.close();
  }
  qa=await contextFor(browser,390);
  await goto(qa.page,'/');
  await qa.page.evaluate(key=>localStorage.setItem(key,'{broken'),key);
  await qa.page.reload({waitUntil:'networkidle'});
  assert.match(await qa.page.locator('.status-row').innerText(),/0 XP/);
  await qa.context.close();results.push({invalidStorage:'passed'});
  // Storage blocked: keep feedback, XP and navigation working in memory.
  qa=await contextFor(browser,375,{blocked:true});
  await goto(qa.page,'/');
  await qa.page.locator('.challenge-answers button').first().click();
  await qa.page.locator('.challenge-feedback').waitFor();
  assert.match(await qa.page.locator('.status-row').innerText(),/15 XP/);
  await qa.page.locator('.bottom-nav a').last().click();
  await qa.page.locator('.profile-card').waitFor();
  assert.equal(await qa.page.locator('.profile-stats strong').first().innerText(),'15');
  await qa.context.close();results.push({blockedStorageMemory:'passed'});
  // Explicit Bucharest next day, with no browser timezone dependence.
  qa=await contextFor(browser,390,{date:'2026-10-03T20:30:00Z'});
  await goto(qa.page,'/');
  await qa.page.locator('.challenge-answers button').first().click();await qa.page.locator('.challenge-feedback').waitFor();
  const firstQuestion=await qa.page.locator('.daily-card > p').innerText();
  await qa.page.clock.setFixedTime(new Date('2026-10-03T23:30:00Z'));
  await qa.page.reload({waitUntil:'networkidle'});
  assert.equal(await qa.page.locator('.challenge-answers button:disabled').count(),0);
  assert.notEqual(await qa.page.locator('.daily-card > p').innerText(),firstQuestion);
  await qa.page.locator('.challenge-answers button').first().click();await qa.page.locator('.challenge-feedback').waitFor();
  const nextDay=await read(qa.page);assert.equal(nextDay.totalXp,30);assert.deepEqual(nextDay.activityDates,['2026-10-03','2026-10-04']);
  await qa.context.close();results.push({bucharestNextDay:'passed'});
  // Two tabs racing to submit the same date cannot duplicate a reward.
  qa=await contextFor(browser,390);
  await goto(qa.page,'/');
  const second=await qa.context.newPage();await second.clock.setFixedTime(new Date('2026-10-03T10:00:00Z'));await goto(second,'/');
  // Native clicks do not wait for enabled state: the first transaction may
  // already disable the other tab through its storage event, which is valid.
  await Promise.all([qa.page.locator('.challenge-answers button').first().evaluate(b=>b.click()),second.locator('.challenge-answers button').nth(1).evaluate(b=>b.click())]);
  await qa.page.locator('.challenge-feedback').waitFor();await second.locator('.challenge-feedback').waitFor();
  assert.equal((await read(qa.page)).totalXp,15);
  assert.equal((await read(qa.page)).awardedRewardKeys.filter(k=>k.startsWith('daily:')).length,1);
  await qa.context.close();results.push({twoTabsAtomic:'passed'});
  assert.deepEqual(errors,[]);
  fs.writeFileSync('artifacts/gamification-browser-results.json',JSON.stringify({results,errors},null,2));
  console.log(JSON.stringify({results,errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
