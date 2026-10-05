import fs from 'node:fs';
import path from 'node:path';
const {chromium}=await import(process.env.FINLY_PLAYWRIGHT_PATH || 'file:///C:/Users/Fabian/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs');
const origin=process.env.FINLY_QA_URL || 'http://127.0.0.1:3110';
const assert=(value,message)=>{if(!value)throw new Error(message);};
(async()=>{
  fs.mkdirSync('artifacts/account-qa',{recursive:true});
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const report={origin,viewports:[],routes:[],trial:null,errors:[]};
  for(const width of [375,390,430,1440]){
    const context=await browser.newContext({viewport:{width,height:900}});const page=await context.newPage();
    page.on('pageerror',error=>report.errors.push(error.message));
    for(const route of ['/bun-venit','/creeaza-cont','/autentificare','/verifica-email','/resetare-parola','/actualizeaza-parola','/termeni','/confidentialitate']){
      await page.goto(origin+route);await page.locator('h1').waitFor();await page.waitForTimeout(500);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert(!overflow,`${width} overflow ${route}`);
      await page.screenshot({path:`artifacts/account-qa/${width}-${route.slice(1)}.png`,fullPage:true});
      report.viewports.push({width,route,overflow});
    }
    await context.close();
  }
  const context=await browser.newContext({viewport:{width:390,height:900}});const page=await context.newPage();page.on('pageerror',error=>report.errors.push(error.message));
  for(const route of ['/','/lectii','/lectie/salariu-brut-vs-net','/profil','/simulator','/rapid','/despre']){await page.goto(origin+route);await page.waitForURL('**/bun-venit');report.routes.push({route,result:'/bun-venit'});}
  await page.getByRole('link',{name:'Începe prima lecție',exact:true}).click();await page.locator('.lesson-question').waitFor();
  const firstId=await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-onboarding-progress:v1')).operationId);
  await page.locator('button.lesson-continue').click();await page.reload();await page.locator('.lesson-question').waitFor();
  const resume=await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-onboarding-progress:v1')));assert(resume.screenIndex===1,'Trial did not resume');assert(resume.operationId===firstId,'Trial operation ID changed');
  for(let screen=0;screen<25;screen++){
    if(await page.locator('.lesson-finish').count())break;
    const options=page.locator('button.lesson-answer');if(await options.count())await options.first().click();
    await page.locator('button.lesson-continue').click();await page.waitForTimeout(100);
  }
  await page.locator('.lesson-finish').waitFor();assert(await page.getByRole('link',{name:'Salvează progresul și continuă'}).count()===1,'Missing trial save CTA');assert(await page.getByRole('link',{name:'Următoarea lecție'}).count()===0,'Guest can continue');
  await page.screenshot({path:'artifacts/account-qa/trial-final-390.png',fullPage:true});
  report.trial=await page.evaluate(()=>JSON.parse(localStorage.getItem('finly-onboarding-progress:v1')));assert(report.trial.completed && report.trial.answers.length>0,'Missing trial evidence');
  const legacy=await page.evaluate(()=>localStorage.getItem('finly-progress-v2'));assert(legacy===null,'Trial created permanent local progress');
  await page.getByRole('link',{name:'Salvează progresul și continuă'}).click();await page.getByRole('heading',{name:'Primul pas e făcut.'}).waitFor();
  await page.waitForTimeout(500);await page.screenshot({path:'artifacts/account-qa/gate-390.png',fullPage:true});
  for(const route of ['/bun-venit','/incepe']){await page.goto(origin+route);await page.waitForURL('**/salveaza-progresul');report.routes.push({route,result:'/salveaza-progresul'});}
  await page.goto(origin+'/creeaza-cont');await page.getByLabel('Interval de vârstă').selectOption('Sub 14');assert(await page.getByRole('button',{name:'Creează-mi cont',exact:true}).isDisabled(),'Under 14 not blocked');
  await page.getByLabel('Interval de vârstă').selectOption('14-15');assert(await page.getByRole('checkbox',{name:'Un părinte sau tutore știe că îmi fac cont.'}).count()===1,'Missing parental acknowledgement');
  await context.close();await browser.close();assert(report.errors.length===0,report.errors.join('\n'));fs.writeFileSync(path.resolve('artifacts/account-qa/report.json'),JSON.stringify(report,null,2));console.log(`PASS: ${report.viewports.length} viewport/route checks, ${report.routes.length} redirect checks, real trial completion/resume/gate, age rules; no page errors.`);
})().catch(error=>{console.error(error.message);process.exit(1);});
