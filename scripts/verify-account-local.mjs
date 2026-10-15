// Full browser QA against real Next routes and the actual migration in PGlite.
// Only the Supabase Auth HTTP provider is simulated. No remote credentials used.
import fs from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { PGlite } from '@electric-sql/pglite';
const {chromium}=await import(process.env.FINLY_PLAYWRIGHT_PATH || 'file:///C:/Users/Fabian/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs');
const origin='http://127.0.0.1:3115',provider='http://127.0.0.1:3116';
const assert=(value,message)=>{if(!value)throw new Error(message);};
const db=new PGlite(),users=new Map();
let next,browser,activePage,slowRead=false;
const report={mode:'local Next + actual PostgreSQL migration; simulated Auth provider',viewports:[],checks:[],errors:[],apiFailures:[],providerFailures:[]};
const json=(res,value,status=200)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(value));};
const token=user=>`${Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64url')}.${Buffer.from(JSON.stringify({sub:user.id,exp:Math.floor(Date.now()/1000)+3600,iat:Math.floor(Date.now()/1000),role:'authenticated',aud:'authenticated'})).toString('base64url')}.local-test-signature`;
const session=user=>({access_token:token(user),refresh_token:user.id,expires_in:3600,token_type:'bearer',user});
const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,provider);let text='';for await(const chunk of req)text+=chunk;const body=text?JSON.parse(text):{};
    if(url.pathname.startsWith('/rest/v1/rpc/')){
      const name=url.pathname.split('/').at(-1);let sql,args;
      if(name==='username_available'){sql='select public.username_available($1) as result';args=[body.candidate];}
      else if(name==='read_account_progress'){if(slowRead)await new Promise(resolve=>setTimeout(resolve,1000));sql='select public.read_account_progress($1) as result';args=[body.p_user];}
      else if(name==='update_account_profile'){sql='select public.update_account_profile($1,$2,$3) as result';args=[body.p_user,body.p_username,body.p_display_name];}
      else if(name==='claim_streak_moments'){sql='select public.claim_streak_moments($1,$2) as result';args=[body.p_user,body.p_claim];}
      else if(name==='acknowledge_streak_moments'){sql='select public.acknowledge_streak_moments($1,$2,$3) as result';args=[body.p_user,body.p_claim,body.p_ids];}
      else if(name==='apply_streak_progress_mutation'){sql='select public.apply_streak_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8,$9::jsonb) as result';args=[body.p_user,body.p_operation,body.p_type,body.p_revision,JSON.stringify(body.p_state),JSON.stringify(body.p_result),body.p_streak,body.p_longest,JSON.stringify(body.p_moments)];}
      else {sql='select public.apply_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8) as result';args=[body.p_user,body.p_operation,body.p_type,body.p_revision,JSON.stringify(body.p_state),JSON.stringify(body.p_result),body.p_streak,body.p_longest];}
      return json(res,(await db.query(sql,args)).rows[0].result);
    }
    if(url.pathname.endsWith('/signup')){
      const user={id:crypto.randomUUID(),email:body.email,aud:'authenticated',role:'authenticated',created_at:new Date().toISOString(),app_metadata:{provider:'email'},user_metadata:body.data};
      await db.query('insert into auth.users values($1,$2::jsonb)',[user.id,JSON.stringify(body.data)]);users.set(user.id,{user,password:body.password});return json(res,session(user));
    }
    if(url.pathname.endsWith('/token')){
      const entry=url.searchParams.get('grant_type')==='refresh_token'?users.get(body.refresh_token):[...users.values()].find(v=>v.user.email===body.email && v.password===body.password);
      return entry?json(res,session(entry.user)):json(res,{msg:'Invalid login credentials'},400);
    }
    if(url.pathname.endsWith('/verify'))return json(res,session([...users.values()][0].user));
    if(url.pathname.endsWith('/user')){
      const jwt=req.headers.authorization?.replace('Bearer ','');const id=jwt?JSON.parse(Buffer.from(jwt.split('.')[1],'base64url').toString()).sub:null;const entry=users.get(id);
      if(!entry)return json(res,{msg:'Invalid session'},401);if(req.method==='PUT' && body.password)entry.password=body.password;return json(res,entry.user);
    }
    if(url.pathname.endsWith('/logout')){res.writeHead(204);return res.end();}
    return json(res,{});
  }catch(error){report.providerFailures.push(error.code || 'LOCAL_PROVIDER_ERROR');json(res,{code:error.code || 'LOCAL_PROVIDER_ERROR',message:'Local test provider failure'},400);}
});
async function screenshot(page,width,route,label=route.slice(1)||'home'){
  await page.setViewportSize({width,height:900});await page.goto(origin+route);
  try{await page.locator('h1').waitFor();}catch(error){await page.screenshot({path:'artifacts/account-qa/route-failure.png',fullPage:true});console.error(JSON.stringify({route,width,finalPath:new URL(page.url()).pathname,text:(await page.locator('body').innerText()).slice(0,350)}));throw error;}
  await page.waitForTimeout(350);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert(!overflow,`${width}: overflow ${route}`);
  if(route==='/')assert(await page.evaluate(()=>{const text=document.querySelector('.continue-copy')?.getBoundingClientRect(),fini=document.querySelector('.continue-fini')?.getBoundingClientRect();return text && fini && text.right<=fini.left;}),`${width}: Fini overlaps lesson copy`);
  assert(!await page.getByText('Andrei',{exact:true}).count(),'Old fake name');assert(!await page.getByText('Continuă ca oaspete',{exact:true}).count(),'Old guest CTA');
  await page.screenshot({path:`artifacts/account-qa/${width}-${label}.png`,fullPage:true});report.viewports.push({width,route,overflow});
}
async function snapshot(page){const response=await page.request.get(origin+'/api/progress');assert(response.ok(),'Progress GET failed');return response.json();}
const cloudFields=s=>({stats:s.statsSummary,lessons:s.progress.lessonStats,daily:s.progress.dailyChallenges,achievements:s.progress.achievementUnlocks,activity:s.progress.activityDates,freezes:s.progress.freezeDates});
async function login(page,password='abcdefgh'){
  await page.goto(origin+'/autentificare');await page.getByLabel('Email',{exact:true}).fill('browser@example.test');await page.getByLabel('Parolă',{exact:true}).fill(password);await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
}
try{
  fs.mkdirSync('artifacts/account-qa',{recursive:true});
  await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;");
  await db.exec(fs.readFileSync('supabase/migrations/0001_accounts_and_progress.sql','utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/0002_username_check.sql','utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/0011_streak_freeze_moments.sql','utf8'));
  await new Promise(resolve=>server.listen(3116,'127.0.0.1',resolve));
  next=spawn(process.execPath,['--use-system-ca','node_modules/next/dist/bin/next',process.env.FINLY_QA_PRODUCTION?'start':'dev','--hostname','127.0.0.1','--port','3115'],{env:{...process.env,NEXT_PUBLIC_SUPABASE_URL:provider,NEXT_PUBLIC_SUPABASE_ANON_KEY:'local-qa-anon',SUPABASE_SERVICE_ROLE_KEY:'local-qa-server-secret',NEXT_PUBLIC_APP_URL:origin},stdio:['ignore','pipe','pipe'],windowsHide:true});
  next.stdout.resume();next.stderr.resume();
  let ready=false;for(let i=0;i<120;i++){if(next.exitCode!==null)throw Error('Next QA process stopped');try{const response=await fetch(origin+'/bun-venit');if(response.ok){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,500));}assert(ready,'Next QA did not start');
  if(!process.env.FINLY_QA_REUSE_PUBLIC){const publicQa=spawn(process.execPath,['scripts/verify-account-browser.mjs'],{env:{...process.env,FINLY_QA_URL:origin},stdio:'inherit',windowsHide:true});assert(await new Promise(resolve=>publicQa.on('exit',resolve))===0,'Public browser QA failed');}
  report.checks.push('Public routes/forms: 32 viewport checks; trial completion, refresh, gate and age rules');
  const trial=JSON.parse(fs.readFileSync('artifacts/account-qa/report.json','utf8')).trial;
  browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  for(const width of [375,390,430,1440]){
    const trialContext=await browser.newContext({viewport:{width,height:900}});const p=await trialContext.newPage();await screenshot(p,width,'/incepe');
    await p.evaluate(t=>localStorage.setItem('finly-onboarding-progress:v1',JSON.stringify(t)),trial);await screenshot(p,width,'/salveaza-progresul');await trialContext.close();
  }
  const context=await browser.newContext({viewport:{width:390,height:900}});const page=await context.newPage();page.on('pageerror',error=>report.errors.push(error.message));
  activePage=page;
  page.on('response',async response=>{const url=new URL(response.url());if(url.pathname.startsWith('/api/') && !response.ok()){let code;try{code=(await response.json()).error?.code;}catch{}report.apiFailures.push({path:url.pathname,status:response.status(),code});}});
  await page.goto(origin+'/auth/callback?next=https://evil.test');await page.locator('p[role=alert]').waitFor();assert(new URL(page.url()).origin===origin,'Open redirect');
  await page.goto(origin+'/autentificare');await page.getByLabel('Email',{exact:true}).fill('browser@example.test');await page.getByLabel('Parolă',{exact:true}).fill('wrongpassword');await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.locator('p[role=alert]').waitFor();assert(await page.locator('p[role=alert]').evaluate(el=>el===document.activeElement),'Error is not focused');
  await page.screenshot({path:'artifacts/account-qa/login-error-390.png',fullPage:true});report.checks.push('Invalid login/error focus, expired confirmation message and safe callback redirect');
  await page.goto(origin+'/creeaza-cont');await page.evaluate(t=>localStorage.setItem('finly-onboarding-progress:v1',JSON.stringify(t)),trial);
  await page.getByLabel('Email',{exact:true}).fill('browser@example.test');await page.getByLabel('Username',{exact:true}).fill('browser_user');await page.locator('[name=displayName]').fill('Ștefania');await page.getByLabel('Interval de vârstă').selectOption('20+');
  await page.getByLabel('Parolă',{exact:true}).fill('abcdefgh');await page.getByLabel('Repetă parola',{exact:true}).fill('abcdefgh');
  for(const [path,sectionCount] of [['/termeni',16],['/confidentialitate',19]]){
    const popupPromise=page.waitForEvent('popup');await page.locator(`a[href="${path}"]`).click();const popup=await popupPromise;await popup.waitForLoadState('domcontentloaded');
    assert(new URL(popup.url()).pathname===path,'Legal link URL');assert((await popup.locator('body').innerText()).includes('Ciornă în lucru — de verificat de un jurist înainte de lansarea publică.'),'Missing legal draft warning');
    assert(await popup.locator('.legal-document section').count()===sectionCount,'Missing legal sections');assert(await popup.locator('time').getAttribute('datetime')==='2026-10-07','Legal date mismatch');
    for(const link of await popup.locator('nav[aria-label="Cuprins"] a').all()){
      const href=await link.getAttribute('href');assert(await popup.locator(href).count()===1,'Broken TOC anchor');
    }
    await popup.locator('nav[aria-label="Cuprins"] a').last().click();assert(new URL(popup.url()).hash==='#contact','TOC click failed');await popup.close();
    assert(await page.getByLabel('Email',{exact:true}).inputValue()==='browser@example.test','Legal link lost email');assert(await page.getByLabel('Username',{exact:true}).inputValue()==='browser_user','Legal link lost username');
    assert(await page.locator('[name=displayName]').inputValue()==='Ștefania','Legal link lost display name');assert(await page.locator('[name=ageRange]').inputValue()==='20+','Legal link lost age');assert(await page.locator('#password').inputValue()==='abcdefgh','Legal link lost password');
  }
  let usernameRequests=0;const countUsername=request=>{if(new URL(request.url()).pathname==='/api/account/username')usernameRequests++;};page.on('request',countUsername);
  for(const value of ['ab','Fabian!','fab ian','admin','finly','support']){
    const before=usernameRequests;await page.locator('#username').fill(value);await page.waitForTimeout(550);assert(usernameRequests===before,'Invalid username made request');assert(await page.locator('#username').evaluate(el=>!el.validity.valid),'Invalid username accepted');
  }
  await page.locator('#username').evaluate(el=>{const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;setter.call(el,'abcdefghijklmnopqrstu');el.dispatchEvent(new Event('input',{bubbles:true}));});
  assert(await page.locator('#username').evaluate(el=>!el.validity.valid),'Too-long username accepted');
  await page.locator('#username').fill('browser_user');await page.getByText('Disponibil',{exact:true}).waitFor();
  await page.route('**/api/account/username?*',async route=>{
    const value=new URL(route.request().url()).searchParams.get('username');
    if(value==='fab')await new Promise(resolve=>setTimeout(resolve,900));
    try{await route.fulfill({json:{available:value!=='fab'}});}catch{/* Aborted request is expected. */}
  });
  await page.locator('#username').fill('fab');await page.waitForTimeout(500);await page.locator('#username').fill('fabia');await page.locator('#username').fill('fabian123');await page.getByText('Disponibil',{exact:true}).waitFor();await page.waitForTimeout(1000);assert(await page.locator('#username').inputValue()==='fabian123','Username changed');assert(await page.locator('#username-status').innerText()==='Disponibil','Stale response won');await page.unroute('**/api/account/username?*');
  await page.route('**/api/account/username?*',route=>route.fulfill({json:{available:false}}));await page.locator('#username').fill('taken_user');await page.getByText('Deja folosit',{exact:true}).waitFor();assert(await page.locator('#username').evaluate(el=>!el.validity.valid),'Taken username did not block');await page.unroute('**/api/account/username?*');
  await page.route('**/api/account/username?*',()=>{});await page.locator('#username').fill('timeout_user');await page.getByText('Se verifică…',{exact:true}).waitFor();
  // Measure the actual DOM update, not Playwright's polling delay.
  const checkElapsed=await page.evaluate(copy=>new Promise(resolve=>{
    const started=performance.now(),target=document.querySelector('#username-status');
    const observer=new MutationObserver(()=>{if(target.textContent===copy){clearTimeout(deadline);observer.disconnect();resolve(performance.now()-started);}});
    const deadline=setTimeout(()=>{observer.disconnect();resolve(7000);},7000);
    if(target.textContent===copy){clearTimeout(deadline);resolve(0);return;}
    observer.observe(target,{childList:true,characterData:true,subtree:true});
  }),'Nu am putut verifica acum. Poți continua, verificăm la creare.');
  assert(checkElapsed<5800,'Username checking exceeded timeout');assert(await page.locator('#username').evaluate(el=>el.validity.valid),'Timeout blocked valid username');await page.unroute('**/api/account/username?*');
  page.off('request',countUsername);await page.locator('#username').fill('browser_user');await page.getByText('Disponibil',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Creează-mi cont',exact:true}).click();await page.getByText('Trebuie să accepți Termenii și Politica de confidențialitate pentru a crea contul.',{exact:true}).waitFor();
  await page.locator('[name=terms]').check();await page.locator('[name=privacy]').check();await page.getByLabel('Interval de vârstă').selectOption('14-15');await page.getByRole('button',{name:'Creează-mi cont',exact:true}).click();await page.getByText('Pentru intervalul 14–15 ani trebuie să confirmi că un părinte sau tutore știe că îți creezi cont.',{exact:true}).waitFor();
  await page.getByLabel('Interval de vârstă').selectOption('18-19');assert(await page.locator('[name=parentalConsent]').count()===0,'Parental acknowledgement required for 18-19');await page.getByLabel('Interval de vârstă').selectOption('20+');
  await page.route('**/api/account/auth',route=>route.fulfill({status:409,json:{error:{code:'USERNAME_TAKEN'}}}));await page.getByRole('button',{name:'Creează-mi cont',exact:true}).click();await page.getByText('Username-ul e deja folosit. Alege altul.',{exact:true}).waitFor();
  assert(await page.locator('[name=email]').inputValue()==='browser@example.test' && await page.locator('[name=displayName]').inputValue()==='Ștefania' && await page.locator('[name=ageRange]').inputValue()==='20+' && await page.locator('#password').inputValue()==='abcdefgh' && await page.locator('#repeatPassword').inputValue()==='abcdefgh' && await page.locator('[name=terms]').isChecked() && await page.locator('[name=privacy]').isChecked(),'Username conflict reset form');await page.unroute('**/api/account/auth');
  // A failed availability request must still allow the real signup endpoint.
  await page.route('**/api/account/username?*',route=>route.fulfill({status:503,json:{error:{code:'SERVER_ERROR'}}}));await page.locator('#username').fill('browser_user_retry');await page.getByText('Nu am putut verifica acum. Poți continua, verificăm la creare.',{exact:true}).waitFor();
  report.checks.push('Legal drafts/TOC/date/new-tab form preservation; local invalid/reserved usernames; available/taken/stale/5s timeout; consent/age validation; conflict preserves fields; signup after unknown availability');
  await page.getByRole('button',{name:'Arată parola',exact:true}).focus();await page.keyboard.press('Enter');assert(await page.locator('#password').getAttribute('type')==='text','Password keyboard show failed');await page.getByRole('button',{name:'Ascunde parola',exact:true}).click();
  for(const checkbox of await page.getByRole('checkbox').all())await checkbox.check();await page.getByRole('button',{name:'Creează-mi cont',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
  const first=await snapshot(page);assert(first.statsSummary.completedLessons===1 && first.statsSummary.totalXp>0,'Trial import failed');assert(await page.evaluate(()=>localStorage.getItem('finly-onboarding-progress:v1'))===null,'Trial not cleared');
  await page.unroute('**/api/account/username?*');
  const operation={operationId:trial.operationId,type:'completeLesson',occurredAt:trial.completedAt,payload:{lessonId:trial.lessonId,answers:trial.answers,trial:true,startedAt:trial.startedAt}};
  const duplicate=await page.request.post(origin+'/api/progress',{headers:{Origin:origin,'X-Finly-Account':first.userId},data:operation});const retry=await duplicate.json();assert(retry.duplicate && retry.snapshot.statsSummary.totalXp===first.statsSummary.totalXp,'Retry duplicates XP');
  report.checks.push('Signup → trial import through actual Next API and SQL; duplicate operation adds no XP or attempt');
  for(const width of [375,390,430,1440]){await screenshot(page,width,'/','home');await screenshot(page,width,'/profil','profil');await page.getByRole('button',{name:'Editează profilul',exact:true}).click();await page.screenshot({path:`artifacts/account-qa/${width}-profil-edit.png`,fullPage:true});}
  await page.goto(origin+'/');const cached=await snapshot(page);
  await page.evaluate(s=>localStorage.setItem(`finly-account-cache:v1:${s.userId}`,JSON.stringify({...s,revision:99999,profile:{...s.profile,display_name:'CACHE_FAKE_NAME'}})),cached);
  slowRead=true;await page.reload();await page.locator('.account-loading').waitFor();assert(!(await page.locator('body').innerText()).includes('CACHE_FAKE_NAME'),'Unverified local cache flashed');await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();slowRead=false;
  report.checks.push('Delayed cloud fetch displays loading; forged cached name never flashes');
  await page.locator('.continue-bottom .app-button').click();await page.locator('.lesson-question').waitFor();
  for(let screen=0;screen<25;screen++){
    if(await page.locator('.lesson-finish').count())break;
    const options=page.locator('button.lesson-answer');if(await options.count())await options.first().click();
    const count=await page.locator('.lesson-count').innerText();await page.locator('button.lesson-continue').click();
    await page.waitForFunction(previous=>document.querySelector('.lesson-count')?.textContent!==previous || document.querySelector('.lesson-finish'),count);
  }
  await page.locator('.lesson-finish').waitFor();assert((await snapshot(page)).statsSummary.completedLessons===2,'Signed-in lesson completion not saved');
  await page.goto(origin+'/');await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
  report.checks.push('Authenticated second lesson completes through lesson player and persists in cloud SQL');
  await page.locator('.challenge-answers button').first().click();await page.locator('.challenge-feedback').waitFor();
  await page.reload();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();const afterDaily=await snapshot(page);assert(Object.keys(afterDaily.progress.dailyChallenges).length===1,'Daily selection not persisted');
  const state=await context.storageState();await context.close();const reopened=await browser.newContext({storageState:state});const reopenedPage=await reopened.newPage();reopenedPage.on('pageerror',error=>report.errors.push(error.message));await reopenedPage.goto(origin+'/');await reopenedPage.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();assert((await snapshot(reopenedPage)).statsSummary.totalXp===afterDaily.statsSummary.totalXp,'Session/progress reopen mismatch');
  report.checks.push('Cookie persistence across browser contexts and reload; Daily Challenge saved by actual SQL');
  for(const route of ['/bun-venit','/incepe','/creeaza-cont','/autentificare']){await reopenedPage.goto(origin+route);await reopenedPage.waitForURL(origin+'/');}
  await reopenedPage.goto(origin+'/profil');await reopenedPage.getByRole('button',{name:'Deconectează-te',exact:true}).click();await reopenedPage.waitForURL('**/bun-venit');
  assert(!(await reopened.cookies()).some(cookie=>cookie.name.includes('auth-token')),'Session cookie remains after logout');await reopenedPage.reload();await reopenedPage.waitForURL('**/bun-venit');await reopenedPage.goto(origin+'/profil');await reopenedPage.waitForURL('**/bun-venit');assert(!(await reopenedPage.locator('body').innerText()).includes('Ștefania'),'Old profile exposed');assert((await reopenedPage.request.get(origin+'/api/progress')).status()===401,'Protected API accessible after logout');
  await login(reopenedPage);assert((await snapshot(reopenedPage)).statsSummary.totalXp===afterDaily.statsSummary.totalXp,'Relogin XP mismatch');
  report.checks.push('Logout → welcome → refresh → protected profile redirects; auth cookies absent, protected API 401, no previous profile; same account DB progress restored');
  const device=await browser.newContext();const secondPage=await device.newPage();secondPage.on('pageerror',error=>report.errors.push(error.message));await login(secondPage);assert(JSON.stringify(cloudFields(await snapshot(secondPage)))===JSON.stringify(cloudFields(afterDaily)),'Second browser cloud fields mismatch');await device.close();
  report.checks.push('Logout/login and independent browser recover the same DB progress; authenticated entry redirects');
  await reopenedPage.goto(origin+'/profil');await reopenedPage.getByRole('button',{name:'Deconectează-te',exact:true}).click();await reopenedPage.waitForURL('**/bun-venit');
  await reopenedPage.goto(origin+'/creeaza-cont');await reopenedPage.locator('[name=email]').fill('browser_b@example.test');await reopenedPage.locator('#username').fill('browser_beta');await reopenedPage.locator('[name=displayName]').fill('Utilizator B');await reopenedPage.locator('[name=ageRange]').selectOption('18-19');await reopenedPage.locator('#password').fill('abcdefgh');await reopenedPage.locator('#repeatPassword').fill('abcdefgh');await reopenedPage.locator('[name=terms]').check();await reopenedPage.locator('[name=privacy]').check();await reopenedPage.getByRole('button',{name:'Creează-mi cont',exact:true}).click();await reopenedPage.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
  const beta=await snapshot(reopenedPage);assert(beta.profile.display_name==='Utilizator B' && beta.statsSummary.totalXp===0,'A progress leaked into B');await reopenedPage.goto(origin+'/profil');assert(!(await reopenedPage.locator('body').innerText()).includes('Ștefania'),'A profile leaked into B');await reopenedPage.getByRole('button',{name:'Deconectează-te',exact:true}).click();await reopenedPage.waitForURL('**/bun-venit');await login(reopenedPage);assert((await snapshot(reopenedPage)).statsSummary.totalXp===afterDaily.statsSummary.totalXp,'A DB progress lost after B');
  report.checks.push('User A logout → User B signup/login: B profile and zero XP, no A data; A login restores DB progress');
  await reopenedPage.goto(origin+'/profil');
  await reopenedPage.route('**/api/account/auth',route=>route.abort('failed'));await reopenedPage.route('**/auth/v1/logout*',route=>route.fulfill({status:503,json:{msg:'Simulated outage'}}));
  await reopenedPage.getByRole('button',{name:'Deconectează-te',exact:true}).click();await reopenedPage.getByText('Nu te-am putut deconecta. Încearcă din nou.',{exact:true}).waitFor({timeout:15000});
  const hidden=await reopenedPage.locator('body').innerText();assert(!hidden.includes('Ștefania') && !hidden.includes('XP total'),'Logout failure left account visible');assert(hidden.includes('Nu putem confirma închiderea sesiunii pe server.'),'Unconfirmed logout hidden');
  assert(await reopenedPage.evaluate(id=>localStorage.getItem(`finly-account-cache:v1:${id}`)===null && localStorage.getItem(`finly-sync-queue:v1:${id}`)===null,first.userId),'Logout failure left A cache/queue');
  await reopenedPage.unroute('**/api/account/auth');await reopenedPage.unroute('**/auth/v1/logout*');await reopenedPage.getByRole('button',{name:'Reîncearcă deconectarea',exact:true}).click();await reopenedPage.waitForURL('**/bun-venit');await login(reopenedPage);
  report.checks.push('Logout transport outage: private profile hidden, account cache/queue cleared, uncertain server session explicitly reported, retry then login succeeds');
  await reopenedPage.goto(origin+'/auth/callback?token_hash=local-recovery&type=recovery');await reopenedPage.getByRole('heading',{name:'Alege o parolă nouă.'}).waitFor();
  for(const width of [375,390,430,1440])await screenshot(reopenedPage,width,'/actualizeaza-parola','actualizeaza-parola-valid');
  await reopenedPage.getByLabel('Parolă',{exact:true}).fill('newpassword');await reopenedPage.getByLabel('Repetă parola',{exact:true}).fill('newpassword');await reopenedPage.getByRole('button',{name:'Salvează parola',exact:true}).click();await reopenedPage.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
  await reopenedPage.goto(origin+'/profil');await reopenedPage.getByRole('button',{name:'Deconectează-te',exact:true}).click();await reopenedPage.waitForURL('**/bun-venit');await login(reopenedPage,'newpassword');
  report.checks.push('Recovery OTP callback, signed proof, password form and login with new password (simulated Auth)');
  await reopened.close();assert(report.errors.length===0,report.errors.join('\n'));
  fs.writeFileSync('artifacts/account-qa/local-report.json',JSON.stringify(report,null,2));console.log(`PASS: ${report.viewports.length} additional viewport checks; ${report.checks.length} local end-to-end checks. Remote Supabase NOT tested.`);
}catch(error){if(activePage && !activePage.isClosed())await activePage.screenshot({path:'artifacts/account-qa/local-failure.png',fullPage:true});console.error(JSON.stringify({apiFailures:report.apiFailures,providerFailures:report.providerFailures,errors:report.errors}));throw error;}finally{
  await browser?.close();if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});
  await new Promise(resolve=>server.close(resolve));await db.close();
}
