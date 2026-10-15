import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const {load}=require('./learning-test-content.cjs');
const lesson=load('src/content/lessons/index.ts').getReadyLessons()[0];
const {getCorrectAnswerId,isAnswerScreen}=load('src/lib/progress.ts');
const {chromium}=await import(process.env.FINLY_PLAYWRIGHT_PATH || 'file:///C:/Users/Fabian/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs');
const origin=process.env.FINLY_BASE_URL || 'http://127.0.0.1:3124';
const assert=(value,message)=>{if(!value)throw new Error(message);};
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const report={viewports:[],errors:[]};
const trial=index=>({version:1,lessonId:lesson.id,operationId:crypto.randomUUID(),startedAt:new Date().toISOString(),completedAt:null,screenIndex:index,shuffleSeed:crypto.randomUUID(),answers:[],completed:false});
try {
  for(const width of [320,390,430]){
    const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    const page=await context.newPage();page.on('pageerror',error=>report.errors.push(error.message));
    await page.addInitScript(value=>localStorage.setItem('finly-onboarding-progress:v1',JSON.stringify(value)),trial(lesson.screens.findIndex(s=>s.type==='tine_minte')));
    await page.goto(origin+'/incepe');await page.locator('.lesson-remember').waitFor();
    const first=page.locator('.lesson-remember article').first(),button=first.getByRole('button');
    assert(await button.getAttribute('aria-expanded')==='false','Starts collapsed');
    assert(await first.locator('.remember-preview').isVisible(),'Summary visible while collapsed');
    assert(!(await first.locator('.remember-body').isVisible()),'Details hidden while collapsed');
    await button.focus();await page.keyboard.press('Enter');
    assert(await button.getAttribute('aria-expanded')==='true','Keyboard expansion');
    assert(await first.locator('.remember-body').isVisible(),'Details visible');
    assert(await first.locator('.remember-preview').isVisible(),'Summary remains visible');
    assert(await first.locator('.remember-preview').innerText()!==await first.locator('.remember-body').innerText(),'Distinct detail');
    const target=await button.boundingBox();assert(target.height>=44,'Mobile touch target');
    assert(await button.evaluate(el=>getComputedStyle(el).outlineStyle)!=='none','Visible keyboard focus');
    await page.screenshot({path:`artifacts/lesson-quality/remember-expanded-${width}.png`,fullPage:true});
    await page.keyboard.press('Space');assert(await button.getAttribute('aria-expanded')==='false','Keyboard collapse');
    assert(!(await first.locator('.remember-body').isVisible()),'Collapsed details hidden');
    const action=page.locator('.remember-action');assert(await action.getByRole('button').count()===0,'No plus without detail');
    assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'No recap overflow');
    await context.close();
    const questionsContext=await browser.newContext({viewport:{width,height:900}}),questionsPage=await questionsContext.newPage();
    questionsPage.on('pageerror',error=>report.errors.push(error.message));
    await questionsPage.addInitScript(value=>localStorage.setItem('finly-onboarding-progress:v1',JSON.stringify(value)),trial(lesson.screens.findIndex(s=>'caseId' in s && s.type!=='caz_real')));
    await questionsPage.goto(origin+'/incepe');await questionsPage.locator('.lesson-answers').waitFor();
    assert(!(await questionsPage.locator('body').innerText()).includes('Tu ce ai verifica?'),'No universal prompt');
    assert(await questionsPage.locator('.lesson-lead-in').count()===0,'No empty lead-in');
    assert(await questionsPage.locator('h1').innerText()===lesson.screens.find(s=>'caseId' in s && s.type!=='caz_real').question,'Question owns heading without extra title');
    assert(!await questionsPage.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'No question overflow');
    await questionsPage.screenshot({path:`artifacts/lesson-quality/case-question-${width}.png`,fullPage:true});
    await questionsContext.close();report.viewports.push({width,expand:true,collapse:true,keyboard:true,optionalDetail:true,optionalLeadIn:true,overflow:false});
  }
  const context=await browser.newContext({viewport:{width:390,height:900}}),page=await context.newPage();
  page.on('pageerror',error=>report.errors.push(error.message));
  await page.addInitScript(value=>localStorage.setItem('finly-onboarding-progress:v1',JSON.stringify(value)),trial(0));
  await page.goto(origin+'/incepe');await page.locator('.lesson-question').waitFor();
  for(const screen of lesson.screens.slice(0,-1)){
    const previous=await page.locator('.lesson-count').innerText();
    if(isAnswerScreen(screen))await page.locator(`button.lesson-answer[data-option-id="${getCorrectAnswerId(screen)}"]`).click();
    await page.locator('button.lesson-continue').click();
    await page.waitForFunction(value=>document.querySelector('.lesson-count')?.textContent!==value || document.querySelector('.lesson-finish'),previous);
  }
  await page.locator('.lesson-finish').waitFor();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-onboarding-progress:v1')));
  assert(saved.completed && saved.answers.length===lesson.screens.filter(isAnswerScreen).length,'Complete trial evidence');
  assert(await page.getByRole('link',{name:'Salvează progresul și continuă',exact:true}).count()===1,'Completion save flow');
  assert(await page.evaluate(()=>localStorage.getItem('finly-progress-v2'))===null,'No permanent legacy progress');
  report.trial={completed:true,answers:saved.answers.length,stableScreenIds:true,saveFlow:true};
  await page.screenshot({path:'artifacts/lesson-quality/trial-completed-390.png',fullPage:true});
  await context.close();
  assert(report.errors.length===0,report.errors.join('\n'));
  fs.writeFileSync('artifacts/lesson-quality/browser.json',JSON.stringify(report,null,2));
  console.log('PASS: 320/390/430px disclosures, keyboard/focus, optional details, case heading, overflow and full trial completion.');
}finally{await browser.close();}
