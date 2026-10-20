// Full browser QA against real Next routes and the actual migration in PGlite.
// Only the Supabase Auth HTTP provider is simulated. No remote credentials used.
import fs from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { PGlite } from '@electric-sql/pglite';
const {chromium}=await import(process.env.FINLY_PLAYWRIGHT_PATH || 'file:///C:/Users/Fabian/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs');
const origin='http://127.0.0.1:3135',provider='http://127.0.0.1:3136';
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
async function login(page,password='abcdefgh'){
  await page.goto(origin+'/autentificare');await page.getByLabel('Email',{exact:true}).fill('browser@example.test');await page.getByLabel('Parolă',{exact:true}).fill(password);await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
}
try{
  fs.mkdirSync('artifacts/home-cleanup',{recursive:true});
  await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;");
  await db.exec(fs.readFileSync('supabase/migrations/0001_accounts_and_progress.sql','utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/0002_username_check.sql','utf8'));
  await db.exec(fs.readFileSync('supabase/migrations/0011_streak_freeze_moments.sql','utf8'));
  await new Promise(resolve=>server.listen(3136,'127.0.0.1',resolve));
  next=spawn(process.execPath,['--use-system-ca','node_modules/next/dist/bin/next','dev','--webpack','--hostname','127.0.0.1','--port','3135'],{env:{...process.env,NEXT_PUBLIC_SUPABASE_URL:provider,NEXT_PUBLIC_SUPABASE_ANON_KEY:'local-qa-anon',SUPABASE_SERVICE_ROLE_KEY:'local-qa-server-secret',NEXT_PUBLIC_APP_URL:origin},cwd:"C:\\Users\\Fabian\\finly-home-cleanup-qa",stdio:['ignore','pipe','pipe'],windowsHide:true});
  const log=fs.createWriteStream('artifacts/home-cleanup/next.log');next.stdout.pipe(log);next.stderr.pipe(log);
  let ready=false;for(let i=0;i<120;i++){if(next.exitCode!==null)throw Error('Next QA process stopped');try{const response=await fetch(origin+'/bun-venit');if(response.ok){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,500));}assert(ready,'Next QA did not start');

  const user={id:crypto.randomUUID(),email:'browser@example.test',aud:'authenticated',role:'authenticated',created_at:new Date().toISOString(),app_metadata:{provider:'email'},user_metadata:{username:'home_qa',display_name:'Home QA',age_range:'20+',terms:true,privacy:true,terms_version:'2026-10-draft',privacy_version:'2026-10-draft'}};
  await db.query('insert into auth.users values($1,$2::jsonb)',[user.id,JSON.stringify(user.user_metadata)]);users.set(user.id,{user,password:'abcdefgh'});
  browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const context=await browser.newContext();const page=await context.newPage();activePage=page;
  await login(page);
  for(const width of [390,375,360,350,1440]){
    await page.setViewportSize({width,height:900});await page.goto(origin+'/');await page.locator('.recommendation-row').first().waitFor();
    assert(await page.locator('.recommendation-row').count()===2,'Expected two recommendations');
    assert(await page.locator('.category-tile').count()===5,'Expected five categories');
    assert(!await page.getByText('Explorează',{exact:false}).count(),'Explorează remains');
    assert(!await page.getByText('Învață în 5 minute').count(),'Old heading remains');
    assert(await page.locator('.recommendation-all').getAttribute('href')==='/lectii','Catalog link');
    const current=await page.locator('.continue-bottom a').getAttribute('href');
    assert(!(await page.locator('.recommendation-row').evaluateAll(rows=>rows.map(r=>r.getAttribute('href')))).includes(current),'Duplicate Continue');
    const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,rows:[...document.querySelectorAll('.recommendation-row')].map(r=>r.getBoundingClientRect().height),height:document.documentElement.scrollHeight,carousel:document.querySelector('.category-scroll').scrollWidth>document.querySelector('.category-scroll').clientWidth}));
    assert(!metrics.overflow,'Viewport overflow');
    assert(await page.locator('.daily-card').count()===1,'Daily challenge missing');assert(await page.locator('.fini-tip').count()===1,'Fini missing');assert(await page.locator('.simulator-teaser').count()===1,'Simulator missing');
    await page.locator('.category-scroll').evaluate(el=>el.scrollLeft=el.scrollWidth);assert(await page.locator('.category-tile').last().isVisible(),'Last category');
    await page.screenshot({path:'artifacts/home-cleanup/home-'+width+'.png',fullPage:true});report.viewports.push({width,...metrics});
  }
  await page.locator('.recommendation-all').click();await page.waitForURL('**/lectii');
  const groups=[...fs.readFileSync('src/content/categories.ts','utf8').matchAll(/"lessons": (\[[^\]]*\])/g)].map(m=>JSON.parse(m[1]));
  const ids=groups.flat();const remaining=[groups[2].at(-1),groups[5].at(-1)];
  for(const count of [1,0]){
    await page.route('**/api/progress',async route=>{const response=await route.fetch();const data=await response.json();data.progress.lessonStats=Object.fromEntries(ids.filter(id=>count===0 || !remaining.includes(id)).map(id=>[id,{completed:true,bestFirstTryCorrect:0,questionCount:0,perfectEver:false,completionCount:1,sessionIds:[]}]));await route.fulfill({response,json:data});});
    await page.goto(origin+'/');await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();await page.waitForTimeout(600);
    assert(await page.locator('.recommendation-row').count()===count,'Wrong sparse count '+count);
    assert(await page.locator('.recommendation-section').count()===(count?1:0),'Empty section remains');
    report.checks.push('Rendered '+count+' recommendations from intercepted QA progress');await page.unroute('**/api/progress');
  }

  fs.writeFileSync('artifacts/home-cleanup/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report.viewports));
}catch(error){if(activePage && !activePage.isClosed())await activePage.screenshot({path:'artifacts/home-cleanup/local-failure.png',fullPage:true});console.error(JSON.stringify({apiFailures:report.apiFailures,providerFailures:report.providerFailures,errors:report.errors}));throw error;}finally{
  await browser?.close();if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});
  await new Promise(resolve=>server.close(resolve));await db.close();
}
