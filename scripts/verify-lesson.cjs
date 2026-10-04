/* eslint-disable @typescript-eslint/no-require-imports -- Browser learning and adjacent-feature regressions. */
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { load } = require('./learning-test-content.cjs');
const { categories } = load('src/content/categories.ts');
const { getReadyLessons, getLessonById, legacyQuickLessons } = load('src/content/lessons/index.ts');
const { PROGRESS_STORAGE_KEY: LEARNING_STORAGE_KEY, createEmptyProgress: emptyProgress } = load('src/lib/progress.ts');
const { categoryProgress } = load('src/lib/learning-progress.ts');
const engine = load('src/lib/progress.ts');
const base = process.env.FINLY_BASE_URL || 'http://127.0.0.1:3100';
const results=[], errors=[];
async function noOverflow(page) { assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),false,page.url()); }
async function goto(page, route) {await page.goto(base+route,{waitUntil:'networkidle'});await noOverflow(page);}
const { displayedCorrectIndex } = require('./browser-lesson-options.cjs');
async function play(page,lesson,width,{wrong=false,keyboard=false,legacy=false}={}) {
  const before=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),LEARNING_STORAGE_KEY);
  const questionTypes=['variante','adevarat_fals','scenariu','calcul'];
  for(let i=0;i<lesson.screens.length;i++){
    const s=lesson.screens[i];
    await page.getByRole('heading',{name:s.title,exact:true}).waitFor();
    assert.equal(await page.getByRole('progressbar',{name:'Progresul lecției',exact:true}).getAttribute('aria-valuenow'),String(s.type==='final'?100:Math.round((i+1)/lesson.screens.length*100)));
    await noOverflow(page);
    assert.equal(await page.locator('.lesson-question-count').count(),questionTypes.includes(s.type)?1:0);
    if(questionTypes.includes(s.type)) assert.equal(await page.locator('.lesson-question-count').innerText(),'Întrebarea '+lesson.screens.slice(0,i+1).filter(x=>questionTypes.includes(x.type)).length+' din '+lesson.screens.filter(x=>questionTypes.includes(x.type)).length);
    if(s.type==='explicatie'||s.type==='caz_real') await page.screenshot({path:'artifacts/extended-'+width+'-'+lesson.id+'-'+s.id+'.png',fullPage:true});
    if(s.type==='tine_minte'){
      assert.equal(await page.locator('.lesson-remember article').count(),s.items.length);
      assert.equal(await page.locator('.lesson-remember button').first().getAttribute('aria-expanded'),'true');
      const data=await page.evaluate(()=>localStorage.getItem('finly-progress-v2'));
      await page.locator('.lesson-remember button').last().click();
      assert.equal(await page.evaluate(()=>localStorage.getItem('finly-progress-v2')),data);
      await noOverflow(page);
      await page.screenshot({path:'artifacts/extended-remember-'+width+'-'+lesson.id+'.png',fullPage:true});
    }
    if(s.type==='final'){
      const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),LEARNING_STORAGE_KEY);
      assert.ok(saved.completedLessonIds.includes(lesson.id));
      if(!legacy) assert.ok((await page.locator('.lesson-category-progress').innerText()).includes(categoryProgress(lesson.categoryId,saved.completedLessonIds).percentage+'% completat'));
      await page.screenshot({path:`artifacts/curriculum-final-${width}-${lesson.id}.png`,fullPage:true});
      break;
    }
    if(s.type==='recap'){
      assert.equal(await page.locator('.learning-recap li').count(),s.points.length);
      // Completion is not persisted on entering recap.
      if(!before.completedLessonIds.includes(lesson.id)) {
        const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),LEARNING_STORAGE_KEY);
        assert.ok(!saved.completedLessonIds.includes(lesson.id));
      }
      await page.screenshot({path:`artifacts/curriculum-recap-${width}-${lesson.id}.png`,fullPage:true});
    }
    if(questionTypes.includes(s.type)){
      if(s.caseId){const data=await page.evaluate(()=>localStorage.getItem('finly-progress-v2'));await page.getByRole('button',{name:'Recitește cazul'}).click();await page.locator('dialog.lesson-case-dialog').waitFor();await noOverflow(page);await page.keyboard.press('Escape');await page.locator('dialog.lesson-case-dialog').waitFor({state:'detached'});assert.equal(await page.getByRole('button',{name:'Recitește cazul'}).evaluate(el=>el===document.activeElement),true);assert.equal(await page.evaluate(()=>localStorage.getItem('finly-progress-v2')),data);}
      const correct=await displayedCorrectIndex(page,s),count=s.type==='adevarat_fals'?2:s.options.length;
      const chosen=wrong?(correct+1)%count:correct;
      if(keyboard) await page.keyboard.press(String(chosen+1)); else await page.locator('.lesson-answer').nth(chosen).click();
      await page.locator('.lesson-feedback').waitFor();
      assert.equal(await page.locator('.lesson-feedback-title strong').innerText(),wrong?'Nu chiar.':'Corect.');
      assert.equal(await page.locator('.lesson-answer.correct').count(),1);
      assert.equal(await page.locator('.lesson-answer:disabled').count(),count);
      assert.ok(await page.locator('.lesson-feedback > p').innerText());
      if(s.caseId){await page.getByRole('button',{name:'Recitește cazul'}).click();await page.getByRole('button',{name:'Închide cazul'}).click();assert.equal(await page.locator('.lesson-answer:disabled').count(),count);assert.equal(await page.locator('.lesson-feedback-title strong').innerText(),wrong?'Nu chiar.':'Corect.');}
      assert.equal(await page.locator('.lesson-question h1').innerText(),s.title);
      await noOverflow(page);
      if(i===2||i===5) await page.screenshot({path:`artifacts/curriculum-feedback-${width}-${lesson.id}-${wrong?'wrong':'correct'}.png`,fullPage:true});
    }
    if(keyboard){await page.locator('.lesson-continue').focus();await page.keyboard.press('Enter');}
    else await page.locator('.lesson-continue').click();
  }
}
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try {
    for(const width of [375,390,430,1440]){
      const context=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
      const page=await context.newPage();
      page.on('pageerror',e=>errors.push(e.message));
      await page.addLocatorHandler(page.locator('.finly-level-dialog'), async () => { await page.locator('.finly-level-dialog .app-button').click(); });
      page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
      await goto(page,'/');
      assert.match(await page.locator('.continue-card h2').innerText(),/Phishing/);
      assert.equal(await page.locator('.continue-card a').getAttribute('href'),'/lectie/phishing');
      await goto(page,'/lectii');
      assert.equal(await page.locator('a.course-card').count(),12);
      assert.deepEqual(await page.locator('.course-card h3').allTextContents(),categories.map(c=>c.title));
      assert.deepEqual(await page.locator('.difficulty-badge').allTextContents(),['Ușor','Ușor','Ușor','Ușor','Ușor','Mediu','Mediu','Mediu','Mediu','Mediu','Greu','Greu']);
      assert.equal(await page.getByRole('progressbar').count(),6);
      assert.equal(await page.locator('.learning-card-count').nth(5).innerText(),'4 capitole · 12 lecții');
      await page.screenshot({path:`artifacts/curriculum-categories-${width}.png`,fullPage:true});
      for(const id of ['economii','primul-job','economia-pe-scurt','credite-si-datorii','siguranta-financiara','investitii-de-la-zero']){
        await goto(page,'/lectii/'+id);
        const category=categories.find(c=>c.id===id);
        assert.equal(await page.locator('.screen-heading h1').innerText(),category.title);
        assert.equal(await page.locator('.learning-chapter').count(),category.chapters.length);
        assert.equal(await page.locator('.path-row').count(),category.chapters.reduce((n,c)=>n+c.lessons.length,0));
        assert.equal(await page.locator('.path-row.current').count(),1);
        if(id==='investitii-de-la-zero'){
          assert.equal(await page.locator('.difficulty-box strong').innerText(),'Greu · Nivel avansat');
          assert.equal(await page.locator('.difficulty-box p').first().innerText(),'Aici învățăm cum funcționează investițiile și ce riscuri au. E educație, nu sfat financiar. Poți pierde bani când investești.');
          assert.equal(await page.locator('.difficulty-box a').getAttribute('href'),'/lectii/economii');
          await page.locator('.difficulty-box a').click();
          await page.waitForURL('**/lectii/economii');
          await page.goBack({waitUntil:'networkidle'});
        }
        await page.screenshot({path:`artifacts/curriculum-category-${width}-${id}.png`,fullPage:true});
      }
      const ready=getReadyLessons();
      let expectedXp=0;
      for(const lesson of ready){
        await goto(page,'/');
        assert.equal(await page.locator('.continue-card a').getAttribute('href'),'/lectie/'+lesson.id);
        await page.locator('.continue-card a').click();
        const wrong=lesson.id==='primul-buget';
        await play(page,lesson,width,{wrong,keyboard:width===390});
        expectedXp+=lesson.xp+(wrong?0:20);
        assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-progress-v2')).totalXp),expectedXp);
        await page.reload({waitUntil:'networkidle'});
        await goto(page,'/lectie/'+lesson.id);
        await play(page,lesson,width,{wrong:!wrong});
        if(wrong) expectedXp+=20;
        assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-progress-v2')).totalXp),expectedXp);
        await goto(page,'/lectie/'+lesson.id);
        await play(page,lesson,width,{wrong:true});
        assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-progress-v2')).totalXp),expectedXp);
      }
      let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-progress-v2')));
      assert.ok(saved.achievements.unlockedIds.includes('budget-ready'));
      assert.equal(saved.uniqueCorrectAnswers.filter(k=>k.startsWith('phishing:')).length,9);
      assert.equal(saved.achievements.unlockedIds.includes('trained-eye'),true);
      assert.equal(saved.activityDates.length,1);
      assert.equal(engine.calculateStreak(saved,engine.getBucharestDateKey(new Date())).current,1);
      for(const quick of legacyQuickLessons){
        await goto(page,'/rapid?lesson=carduri');
        await play(page,quick,width,{legacy:true});expectedXp+=quick.xp+20;
      }
      await goto(page,'/rapid?lesson=buget');
      await play(page,getLessonById('primul-buget'),width,{legacy:true});
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-progress-v2')).totalXp),expectedXp);
      const xp=expectedXp;
      await goto(page,'/');
      assert.equal(await page.locator('.continue-card h2').innerText(),'Ai terminat toate lecțiile disponibile.');
      await page.locator('.challenge-answers button').first().click();
      await page.locator('.challenge-feedback').waitFor();
      assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-progress-v2')).totalXp),xp+15);
      assert.equal(await page.locator('.challenge-answers button:disabled').count(),4);
      await goto(page,'/lectie/missing-id');
      await page.getByRole('heading',{name:'Lecția nu există.'}).waitFor();
      await goto(page,'/lectie/primul-contract-de-munca');
      await page.getByRole('heading',{name:'Lecția asta vine în curând.'}).waitFor();
      assert.equal(await page.locator('.lesson-finish a').getAttribute('href'),'/lectii/primul-job');
      await goto(page,'/rapid?lesson=salary');
      assert.ok(page.url().endsWith('/lectie/salariu-brut-vs-net'));
      await goto(page,'/?tab=profile'); await page.getByRole('heading',{name:'Progresul tău.'}).waitFor();
      await goto(page,'/?tab=simulator'); assert.ok(await page.locator('.simulator-screen, .sim-event, .sim-start, .sim-goal').count());
      for(let step=0;step<5;step++){
        await page.locator('.sim-choices button').first().click();
        await page.locator('.sim-feedback').waitFor();
        await noOverflow(page);
        await page.locator('.sim-feedback button').click();
      }
      await page.locator('.sim-finish').waitFor();
      const savedSim=await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-progress-v2')));
      assert.equal(savedSim.simulation.savings,1000);
      assert.equal(savedSim.simulation.balance,2130);
      assert.equal(savedSim.totalXp,xp+65);
      assert.ok(savedSim.simulatorCompletions.includes('simulator'));
      await page.reload({waitUntil:'networkidle'});
      await page.locator('.sim-finish').waitFor();
      results.push({width,lessonsCompleted:ready.length,legacyQuickPreserved:true,dailyChallenge:true,retakeXpStable:true,overflow:false});
      await context.close();
    }
    const fixtures=[
      ['no-key',null,'Phishing'],
      ['valid-empty',JSON.stringify(emptyProgress()),'Phishing'],
      ['one-completed',JSON.stringify({...emptyProgress(),completedLessonIds:['salariu-brut-vs-net']}),'Phishing'],
      ['all-completed',JSON.stringify({...emptyProgress(),completedLessonIds:getReadyLessons().map(l=>l.id)}),'Ai terminat toate lecțiile disponibile.'],
      ['corrupt','{bad-json','Phishing'],
      ['legacy',null,'Phishing']
    ];
    for(const [label,raw,expected] of fixtures){
      const context=await browser.newContext({viewport:{width:390,height:844}});
      await context.addInitScript(({raw,key,label})=>{
        if(raw!==null)localStorage.setItem(key,raw);
        if(label==='legacy')localStorage.setItem('finly-progress-v2',JSON.stringify({version:0,state:{xp:800,streak:3,record:5,completed:['salary'],lastStudy:null,simulation:{step:0,balance:3500,savings:0,history:[]}}}));
      },{raw,key:LEARNING_STORAGE_KEY,label});
      const page=await context.newPage();
      await page.addLocatorHandler(page.locator('.finly-level-dialog'), async () => { await page.locator('.finly-level-dialog .app-button').click(); });
      await goto(page,'/');
      assert.equal(await page.locator('.continue-card h2').innerText(),expected);
      if(label==='legacy'){
        await goto(page,'/lectie/salariu-brut-vs-net');
        await play(page,getLessonById('salariu-brut-vs-net'),390,{wrong:true});
        assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-progress-v2')).totalXp),800);
      }
      results.push({storage:label,passed:true});
      await context.close();
    }
    assert.deepEqual(errors,[]);
    fs.writeFileSync('artifacts/curriculum-browser-results.json',JSON.stringify({results,errors},null,2));
    console.log(JSON.stringify({results,errors},null,2));
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
