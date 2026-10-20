// Full browser QA against real Next routes and the actual migration in PGlite.
// Only the Supabase Auth HTTP provider is simulated. No remote credentials used.
import fs from 'node:fs';
import http from 'node:http';
import { createServer as portProbe } from 'node:net';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { PGlite } from '@electric-sql/pglite';
const {chromium}=await import(process.env.FINLY_PLAYWRIGHT_PATH || 'file:///C:/Users/Fabian/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs');
const qaPort=Number(process.env.FINLY_RECOVERY_QA_PORT || 3143);
const origin='http://127.0.0.1:'+qaPort,provider='http://127.0.0.1:'+(qaPort+1);
const recoveryLinks=[],recoveryTokens=new Map();
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
      else if(name!=='apply_progress_mutation')return json(res,{code:'PGRST202',message:'RPC outside this auth fixture'},404);
      else {sql='select public.apply_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8) as result';args=[body.p_user,body.p_operation,body.p_type,body.p_revision,JSON.stringify(body.p_state),JSON.stringify(body.p_result),body.p_streak,body.p_longest];}
      return json(res,(await db.query(sql,args)).rows[0].result);
    }
    if(url.pathname.endsWith('/recover')){
      const entry=[...users.values()].find(v=>v.user.email===body.email);
      if(entry){const hash=crypto.randomUUID(),link=new URL(url.searchParams.get('redirect_to'));link.searchParams.set('token_hash',hash);link.searchParams.set('type','recovery');recoveryTokens.set(hash,entry);recoveryLinks.push(link.href);}
      return json(res,{});
    }
    if(url.pathname.endsWith('/verify')){
      const entry=recoveryTokens.get(body.token_hash);recoveryTokens.delete(body.token_hash);
      return entry && body.type==='recovery'?json(res,session(entry.user)):json(res,{error_code:'otp_expired',msg:'Invalid recovery link'},403);
    }
    if(url.pathname.endsWith('/signup')){
      const user={id:crypto.randomUUID(),email:body.email,aud:'authenticated',role:'authenticated',created_at:new Date().toISOString(),app_metadata:{provider:'email'},user_metadata:body.data};
      await db.query('insert into auth.users values($1,$2::jsonb)',[user.id,JSON.stringify(body.data)]);users.set(user.id,{user,password:body.password});return json(res,session(user));
    }
    if(url.pathname.endsWith('/token')){
      const entry=url.searchParams.get('grant_type')==='refresh_token'?users.get(body.refresh_token):[...users.values()].find(v=>v.user.email===body.email && v.password===body.password);
      return entry?json(res,session(entry.user)):json(res,{msg:'Invalid login credentials'},400);
    }

    if(url.pathname.endsWith('/user')){
      const jwt=req.headers.authorization?.replace('Bearer ','');const id=jwt?JSON.parse(Buffer.from(jwt.split('.')[1],'base64url').toString()).sub:null;const entry=users.get(id);
      if(!entry)return json(res,{msg:'Invalid session'},401);if(req.method==='PUT' && body.password)entry.password=body.password;return json(res,entry.user);
    }
    if(url.pathname.endsWith('/logout')){res.writeHead(204);return res.end();}
    return json(res,{});
  }catch(error){report.providerFailures.push(error.code || 'LOCAL_PROVIDER_ERROR');json(res,{code:error.code || 'LOCAL_PROVIDER_ERROR',message:'Local test provider failure'},400);}
});

try{
 fs.mkdirSync('artifacts/password-recovery',{recursive:true});
 await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;");
 for(const file of ['0001_accounts_and_progress.sql','0002_username_check.sql','0011_streak_freeze_moments.sql'])await db.exec(fs.readFileSync('supabase/migrations/'+file,'utf8'));
 const user={id:crypto.randomUUID(),email:'recovery@example.test',email_confirmed_at:new Date().toISOString(),aud:'authenticated',role:'authenticated',created_at:new Date().toISOString(),app_metadata:{provider:'email'},user_metadata:{username:'recovery_user',age_range:'20+',terms:true,privacy:true,terms_version:'2026-10-draft',privacy_version:'2026-10-draft'}};
 await db.query('insert into auth.users values($1,$2::jsonb)',[user.id,JSON.stringify(user.user_metadata)]);users.set(user.id,{user,password:'oldpassword'});
 await new Promise(resolve=>server.listen(qaPort+1,'127.0.0.1',resolve));
 const workspace=fs.mkdtempSync(path.join(os.tmpdir(),'finly-recovery-qa-'));
 for(const dir of ['app','src'])fs.cpSync(dir,path.join(workspace,dir),{recursive:true});
 for(const file of ['package.json','package-lock.json','tsconfig.json','next-env.d.ts','postcss.config.mjs','proxy.ts'])if(fs.existsSync(file))fs.copyFileSync(file,path.join(workspace,file));
 for(const dir of ['node_modules','public'])fs.symlinkSync(path.resolve(dir),path.join(workspace,dir),'junction');
 fs.writeFileSync(path.join(workspace,'next.config.ts'),fs.readFileSync('next.config.ts','utf8').replace('const nextConfig: NextConfig = {','const nextConfig: NextConfig = { turbopack: { root: process.cwd() },'));
 // Fail closed rather than accidentally exercising a stale QA server.
 await new Promise((resolve,reject)=>{const probe=portProbe();probe.once('error',reject);probe.listen(qaPort,'127.0.0.1',()=>probe.close(resolve));});
 const output=fs.openSync('artifacts/password-recovery/server.log','w');
 next=spawn(process.execPath,['--use-system-ca',path.resolve('node_modules/next/dist/bin/next'),'dev','--webpack','--hostname','127.0.0.1','--port',String(qaPort)],{cwd:workspace,env:{...process.env,NEXT_PUBLIC_SUPABASE_URL:provider,NEXT_PUBLIC_SUPABASE_ANON_KEY:'local-qa-anon',SUPABASE_SERVICE_ROLE_KEY:'local-qa-secret',NEXT_PUBLIC_APP_URL:origin,FINLY_DEV_AUTH_EMAIL_ORIGIN:origin},stdio:['ignore',output,output],windowsHide:true});
 let ready=false;for(let i=0;i<100;i++){if(next.exitCode!==null)throw Error('Next stopped');try{if((await fetch(origin+'/autentificare')).ok){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,500));}assert(ready,'Next not ready');
 browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:390,height:900}});const initialPage=await context.newPage();activePage=initialPage;initialPage.on('pageerror',e=>report.errors.push(e.message));
 await initialPage.goto(origin+'/autentificare');await initialPage.getByRole('link',{name:'Ai uitat parola?'}).click();await initialPage.waitForURL('**/resetare-parola');await initialPage.waitForFunction(()=>{const form=document.querySelector('form');return form && Object.keys(form).some(key=>key.startsWith('__reactProps'));});await initialPage.getByLabel('Email',{exact:true}).fill(user.email);await initialPage.getByRole('button',{name:'Trimite linkul',exact:true}).click();
 await initialPage.getByText('Dacă există un cont pentru această adresă, vei primi un email cu instrucțiuni.',{exact:true}).waitFor();assert(recoveryLinks.length===1,'No simulated email');
 const link=recoveryLinks[0];assert(new URL(link).origin===origin,'Wrong local callback');assert(new URL(link).pathname==='/actualizeaza-parola','Wrong callback path');
 await initialPage.reload();await initialPage.getByRole('button',{name:/Retrimite peste/}).waitFor();assert(await initialPage.getByRole('button',{name:/Retrimite peste/}).isDisabled(),'Reset cooldown lost on reload');
 const tab=await context.newPage();await tab.goto(origin+'/resetare-parola');await tab.getByRole('button',{name:/Retrimite peste/}).waitFor();assert(await tab.getByRole('button',{name:/Retrimite peste/}).isDisabled(),'Other tab missed cooldown');await tab.close();
 await initialPage.evaluate(()=>sessionStorage.setItem('finly.passwordResetAvailableAt',String(Date.now()-1000)));await initialPage.reload();await initialPage.getByRole('button',{name:'Retrimite linkul',exact:true}).waitFor();assert(await initialPage.getByRole('button',{name:'Retrimite linkul',exact:true}).isEnabled(),'Cooldown never expires');
 const hash=new URL(link).searchParams.get('token_hash');
 const cross=await browser.newContext();
 assert((await cross.cookies()).length===0,'Recovery browser unexpectedly has cookies');
 const prefetch=await cross.request.get(link);assert(prefetch.ok(),'Prefetch failed');assert(recoveryTokens.has(hash),'GET consumed token');
 await context.close();
 const page=await cross.newPage();activePage=page;page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(link);await page.getByRole('heading',{name:'Alege o parolă nouă.',exact:true}).waitFor();assert(recoveryTokens.has(hash),'Render consumed token');
 assert(!(await cross.cookies()).some(c=>c.name.includes('code-verifier')),'GET requires a PKCE verifier');
 await page.getByLabel('Parolă nouă',{exact:true}).fill('newpassword');await page.getByLabel('Confirmă parola nouă',{exact:true}).fill('differentpassword');await page.getByRole('button',{name:'Salvează parola'}).click();await page.getByRole('alert').filter({hasText:'cele două parole să coincidă'}).waitFor();
 assert(recoveryTokens.has(hash),'Mismatch consumed token');
 await page.getByLabel('Confirmă parola nouă',{exact:true}).fill('newpassword');
 for(const width of [320,390,430]){await page.setViewportSize({width,height:900});assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'Mobile overflow');}
 await page.screenshot({path:'artifacts/password-recovery/new-password.png',fullPage:true});
 await page.getByRole('button',{name:'Salvează parola'}).click();await page.waitForURL(origin+'/');await page.getByRole('heading',{name:'Ce învățăm azi?',exact:true}).waitFor();
 assert(users.get(user.id).password==='newpassword','Password unchanged');assert(!(await cross.cookies()).some(c=>c.name==='finly-recovery'),'Proof not consumed');
 assert((await page.request.get(origin+'/api/progress')).status()===200,'Session lost after update');
 const replay=await page.request.post(origin+'/api/account/auth',{headers:{Origin:origin,'X-Finly-Account':user.id},data:{action:'update',data:{password:'replayedpassword',repeatPassword:'replayedpassword'}}});assert(replay.status()===403,'Consumed proof reused');
 await page.goto(origin+'/profil');await page.getByRole('button',{name:'Editează profilul',exact:true}).click();await page.getByRole('button',{name:'Deconectează-te',exact:true}).click();await page.waitForURL('**/bun-venit');
 await page.goto(origin+'/autentificare');await page.waitForFunction(()=>{const form=document.querySelector('form');return form && Object.keys(form).some(key=>key.startsWith('__reactProps'));});await page.getByLabel('Email',{exact:true}).fill(user.email);await page.getByLabel('Parolă',{exact:true}).fill('oldpassword');await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('alert').filter({hasText:'Email sau parolă incorectă.'}).waitFor();
 await page.getByLabel('Parolă',{exact:true}).fill('newpassword');await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?',exact:true}).waitFor();
 await page.goto(link);await page.getByRole('heading',{name:'Alege o parolă nouă.',exact:true}).waitFor();await page.getByLabel('Parolă nouă',{exact:true}).fill('anotherpassword');await page.getByLabel('Confirmă parola nouă',{exact:true}).fill('anotherpassword');await page.getByRole('button',{name:'Salvează parola'}).click();await page.getByRole('alert').filter({hasText:'Linkul nu mai este valid sau a expirat.'}).waitFor();assert(await page.getByRole('link',{name:'Cere un link nou'}).getAttribute('href')==='/resetare-parola','No expired recovery action');
 assert(report.errors.length===0,report.errors.join(';'));assert(report.providerFailures.length===0,'Provider fixture failed: '+report.providerFailures.join(','));
 const serverLog=fs.readFileSync('artifacts/password-recovery/server.log','utf8');for(const url of recoveryLinks)assert(!serverLog.includes(new URL(url).searchParams.get('token_hash')),'Recovery token in request log');assert(!serverLog.includes('newpassword') && !serverLog.includes('oldpassword'),'Sensitive request data in server log');
 report.checks=['Browser A reset request → Browser B prefetch GET does not consume token → form → submit-only verifyOtp','Persistent reset cooldown and matching password validation; 320/390/430px','Real update endpoint → simulated Auth update → session remains → direct home','Consumed cookie denied; logout; old password rejected; new password accepted; used link shows recovery error'];
 fs.writeFileSync('artifacts/password-recovery/report.json',JSON.stringify(report,null,2));console.log('PASS: full local recovery browser/API/PostgreSQL flow. SMTP/Auth delivery simulated; hosted settings and real inbox NOT verified.');
}catch(error){if(activePage && !activePage.isClosed())await activePage.screenshot({path:'artifacts/password-recovery/failure.png',fullPage:true});throw error;}finally{
 await browser?.close();if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});
 if(server.listening){server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}await db.close();
}
