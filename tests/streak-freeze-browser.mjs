// Reuse the existing local Auth/SDK/Postgres harness, keeping remote data untouched.
import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
if(!process.env.FINLY_STREAK_BROWSER_ISOLATED){
  const isolated=path.resolve('..','finly-streak-qa-20261012');fs.mkdirSync(isolated,{recursive:true});
  for(const entry of ['app','src','public','supabase','tests','scripts','package.json','package-lock.json','tsconfig.json','next.config.ts','next-env.d.ts','postcss.config.mjs','proxy.ts'])if(fs.existsSync(entry))fs.cpSync(entry,path.join(isolated,entry),{recursive:true});
  if(!fs.existsSync(path.join(isolated,'node_modules')))fs.symlinkSync(path.resolve('node_modules'),path.join(isolated,'node_modules'),'junction');
  const code=await new Promise(resolve=>{const child=spawn(process.execPath,['tests/streak-freeze-browser.mjs'],{cwd:isolated,env:{...process.env,FINLY_STREAK_BROWSER_ISOLATED:'1'},stdio:'inherit',windowsHide:true});child.on('exit',resolve);});
  fs.cpSync(path.join(isolated,'artifacts','streak-freeze'),'artifacts/streak-freeze',{recursive:true});
  process.exit(Number(code??1));
}
let source=fs.readFileSync('tests/simulator-browser.mjs','utf8');
const tail=source.slice(source.lastIndexOf('\n} catch (error)')).replace("  fs.writeFileSync", "  if(page){await page.screenshot({path:'artifacts/streak-freeze/failure.png'});console.log(await page.evaluate(()=>({hidden:document.hidden,moments:window.finlyMoments})));console.log((await db.query('select type,acknowledged_at,claim_until from public.streak_moments')).rows);console.log((await page.locator('body').innerText()).slice(-2500));}\n  fs.writeFileSync");
source=source.slice(0,source.indexOf("  await page.goto(origin + '/simulator/dev');"));
source=source.slice(0,source.indexOf('async function api('))+source.slice(source.indexOf('\ntry {',source.indexOf('async function api(')));
// Production serving avoids Next dev-manifest writes racing repeated full
// document navigations. Build with the same local provider environment.
source=source.replace("  next = spawn(process.execPath",String.raw`
  const build=spawn(process.execPath,['--use-system-ca','node_modules/next/dist/bin/next','build','--webpack'],{env:{...process.env,NEXT_PUBLIC_SUPABASE_URL:provider,NEXT_PUBLIC_SUPABASE_ANON_KEY:'local-qa-anon',SUPABASE_SERVICE_ROLE_KEY:'local-qa-service',NEXT_PUBLIC_APP_URL:origin},stdio:['ignore','pipe','pipe'],windowsHide:true});
  const buildLog=fs.createWriteStream('artifacts/streak-freeze/build.log');build.stdout.pipe(buildLog);build.stderr.pipe(buildLog);
  const buildCode=await new Promise(resolve=>build.on('exit',resolve));assert(buildCode===0,'Isolated QA production build failed');
  next = spawn(process.execPath`);
source=source.replace("'dev', '--hostname'","'start', '--hostname'");
source=source.replace("        read_account_progress:",String.raw`
        apply_streak_progress_mutation: ['select public.apply_streak_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8,$9::jsonb) as result', [body.p_user,body.p_operation,body.p_type,body.p_revision,JSON.stringify(body.p_state),JSON.stringify(body.p_result),body.p_streak,body.p_longest,JSON.stringify(body.p_moments)]],
        claim_streak_moments: ['select public.claim_streak_moments($1,$2) as result',[body.p_user,body.p_claim]],
        acknowledge_streak_moments: ['select public.acknowledge_streak_moments($1,$2,$3) as result',[body.p_user,body.p_claim,body.p_ids]],
        read_account_progress:`);
source=source.replace("'0003_simulator_foundation.sql'", "'0003_simulator_foundation.sql','0011_streak_freeze_moments.sql'");
source+=String.raw`
  const record=report.checks.push.bind(report.checks);report.checks.push=(...checks)=>{checks.forEach(check=>console.log(check));return record(...checks);};
  // Notifications are outside this repair; isolate their transport from streak QA.
  await context.route('**/api/notifications',route=>route.fulfill({json:{items:[],unread:0}}));
  await context.route('**/api/notifications/preferences',route=>route.fulfill({json:{configured:false,preferences:{push_enabled:false,events_push_enabled:true,payments_push_enabled:true,monthly_review_push_enabled:true,quiet_hours_enabled:true}}}));
  await context.addInitScript(()=>{
    window.finlyMoments=[];window.addEventListener('finly-streak-moment',event=>window.finlyMoments.push(event.detail));
  });
  await page.goto(origin+'/autentificare');
  await page.getByLabel('Email',{exact:true}).fill('simulator_a@finly.test');await page.getByLabel('Parolă',{exact:true}).fill('localtestpass');
  await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
  const userId=[...users.values()][0].user.id;
  const snapshot=async()=>{
    const response=await page.request.get(origin+'/api/progress',{headers:{'X-Finly-Account':userId}});assert(response.ok(),'Snapshot API '+response.status());return response.json();
  };
  const dayKey=date=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  const today=dayKey(new Date()),add=(day,n)=>{const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);};
  const seed=async(missed=0,n=8)=>{
    // Finish real queued activity before replacing the disposable database
    // fixture. Unmount the old account host so reward acknowledgments cannot
    // race the next fixture with a snapshot from the previous scenario.
    await page.waitForFunction(id=>JSON.parse(localStorage.getItem('finly-sync-queue:v1:'+id) || '[]').length===0,userId);
    await page.goto('about:blank');await page.waitForTimeout(500);
    const snap=await snapshot(),last=add(today,-1-missed),first=add(last,1-n),created=add(first,-1)+'T12:00:00Z';
    let monday=new Date(last+'T12:00:00Z');monday.setUTCDate(monday.getUTCDate()-((monday.getUTCDay()+6)%7));
    await db.query('delete from public.streak_moments where user_id=$1',[userId]);
    // Reset only this disposable local fixture's current-day evidence so the
    // simulated absence is internally consistent. Never touches remote users.
    await db.query('delete from public.daily_challenge_answers where user_id=$1',[userId]);
    await db.query('delete from public.xp_events where user_id=$1',[userId]);
    await db.query('delete from public.lesson_progress where user_id=$1',[userId]);
    await db.query('delete from public.activity_days where user_id=$1',[userId]);await db.query('delete from public.streak_freeze_days where user_id=$1',[userId]);
    for(let i=0;i<n;i++)await db.query('insert into public.activity_days(user_id,day) values($1,$2)',[userId,add(first,i)]);
    const meta={...snap.progress,createdAt:created,freezeInitialBalance:2,maxSeenDateKey:last,maxSeenAt:last+'T12:00:00Z',lastFreezeGrantDateKey:monday.toISOString().slice(0,10),pendingLevelUp:null,seenAchievementToastIds:Object.keys(snap.progress.achievementUnlocks)};
    await db.query('update public.user_stats set revision=revision+1,streak_current=$2,streak_longest=greatest(streak_longest,$2),streak_freezes=2,state_meta=$3::jsonb where user_id=$1',[userId,n,JSON.stringify(meta)]);
  };
  const acked=async()=>{for(let i=0;i<100;i++){const rows=(await db.query('select id from public.streak_moments where user_id=$1 and acknowledged_at is null',[userId])).rows;if(!rows.length)return;await page.waitForTimeout(100);}throw Error('Presentation not acknowledged');};
  await seed();await page.goto(origin+'/');await page.locator('.status-row').waitFor();
  await page.goto(origin+'/lectie/ce-sunt-banii');await page.locator('.lesson-question').waitFor();
  assert(!(await snapshot()).progress.activityDates.includes(today),'Starting a lesson must not activate today');
  for(let screen=0;screen<30;screen++){
    if(await page.locator('.lesson-finish').count())break;
    const options=page.locator('button.lesson-answer');if(await options.count())await options.first().click();
    const title=await page.locator('.lesson-count').innerText();
    await page.locator('button.lesson-continue').click();
    await page.waitForFunction(old=>document.querySelector('.lesson-finish') || document.querySelector('.lesson-count')?.textContent!==old,title);
  }
  await page.locator('.lesson-finish').waitFor();
  for(let i=0;i<100;i++){
    if(await page.locator('.finly-level-dialog[open]').count())await page.locator('.finly-level-dialog button').click();
    if(await page.evaluate(()=>window.finlyMoments.some(e=>e.type==='streak_incremented')))break;
    await page.waitForTimeout(250);
  }
  assert(await page.evaluate(()=>window.finlyMoments.some(e=>e.type==='streak_incremented')),'No fire celebration');
  let snap=await snapshot();assert(snap.statsSummary.currentStreak===9,'First lesson should increase 8 -> 9');
  const increment=(await db.query("select payload from public.streak_moments where user_id=$1 and type='streak_incremented'",[userId])).rows;
  assert(increment.length===1 && increment[0].payload.streakBefore===8 && increment[0].payload.streakAfter===9,'Fire number snapshot');
  await acked();await page.reload();await page.waitForTimeout(1700);assert(!(await page.locator('.streak-moment').count()),'Refresh replays acknowledged fire');
  report.checks.push('Real lesson completion saves 8 -> 9; fire transition; cloud ack; refresh no replay');
  if(await page.getByRole('button',{name:'Refă lecția'}).count())await page.getByRole('button',{name:'Refă lecția'}).click();
  for(let screen=0;screen<30;screen++){
    if(await page.locator('.lesson-finish').count())break;
    const options=page.locator('button.lesson-answer');if(await options.count())await options.first().click();
    const title=await page.locator('.lesson-count').innerText();
    await page.locator('button.lesson-continue').click();
    await page.waitForFunction(old=>document.querySelector('.lesson-finish') || document.querySelector('.lesson-count')?.textContent!==old,title);
  }
  await page.locator('.lesson-finish').waitFor();assert((await snapshot()).statsSummary.currentStreak===9,'Replay increments streak');
  assert((await db.query("select id from public.streak_moments where user_id=$1 and type='streak_incremented'",[userId])).rows.length===1,'Replay duplicates event');
  report.checks.push('Second completed lesson/replay same day has no second increment or event');
  await page.goto(origin+'/');await page.locator('.challenge-answers').waitFor();await page.waitForTimeout(300);
  if(await page.locator('.finly-level-dialog[open]').count())await page.locator('.finly-level-dialog button').click();
  await page.locator('.challenge-answers button').first().click();await page.locator('.challenge-note').filter({hasText:'Gata pentru azi'}).waitFor();
  assert((await snapshot()).statsSummary.currentStreak===9,'Daily after lesson increments');
  const wrongDailyLabel=await page.locator('.challenge-answers button:not(.answer-correct)').first().innerText();
  report.checks.push('Daily Challenge submission after lesson preserves same-day streak');
  const weekday=new Date(today+'T12:00:00Z').getUTCDay();
  // Explicit civil-week expectations: a Monday earned between misses can
  // legitimately protect a third day, while inventory never exceeds two.
  const balances=[[1,2,1,1,1,1,1],[0,1,1,0,0,0,0],[0,1,0,0,0,0,0]];
  for(const missed of [1,2,3]){
    const protectedCount=missed===3 && ![2,3].includes(weekday)?2:missed;
    const streak=protectedCount===missed?8:0,expectedType=streak?'freeze_consumed':'streak_broken',freezes=balances[missed-1][weekday];
    await seed(missed);await page.goto(origin+'/profil');await page.locator('.activity-week').waitFor();
    await page.waitForFunction(type=>window.finlyMoments.some(e=>e.type===type),expectedType);
    snap=await snapshot();assert(snap.statsSummary.currentStreak===streak && snap.statsSummary.freezeBalance===freezes,'Catch-up result '+missed);
    assert(snap.progress.freezeDates.length===protectedCount,'Durable frozen history '+missed);
    assert((await page.locator('.activity-day.freeze').count())===protectedCount,'Calendar frozen markers '+missed);
    await page.locator('.activity-day.freeze').first().click();assert((await page.locator('.calendar-detail').innerText()).includes('un Freeze'),'Accessible frozen detail');
    await acked();const presented=await page.evaluate(()=>window.finlyMoments.filter(e=>e.type==='freeze_consumed'||e.type==='streak_broken'));
    assert(presented.length===1,'Catch-up should be one full summary '+JSON.stringify(presented));
    await page.reload();await page.waitForTimeout(1600);assert(await page.locator('.streak-moment').count()===0,'Freeze/break replays after ack');
    report.checks.push(missed+' missed days: canonical inventory/history; one summary; calendar accessible; refresh no replay');
  }
  const pc=await browser.newContext({storageState:await context.storageState()}),pcPage=await pc.newPage();
  await pcPage.goto(origin+'/profil');await pcPage.locator('.activity-week').waitFor();await pcPage.waitForTimeout(1500);assert(await pcPage.locator('.streak-moment').count()===0,'Independent device replays acknowledged event');await pc.close();await page.bringToFront();
  report.checks.push('Independent browser/device sees account ack and does not replay');
  const insertVisual=async(type,streak=9)=>{
    // Simulate a background tab while preparing the next fixture, so the old
    // page cannot reserve it before the new document mounts its host.
    await page.evaluate(()=>Object.defineProperty(document,'hidden',{get:()=>true,configurable:true}));
    await page.waitForTimeout(500);
    await db.query('delete from public.streak_moments where user_id=$1',[userId]);
    await db.query('insert into public.streak_moments(user_id,type,semantic_key,effective_day,payload) values($1,$2,$3,$4,$5::jsonb)',[userId,type,type+':'+today,today,JSON.stringify({schemaVersion:1,streakBefore:8,streakAfter:streak,freezeBefore:2,freezeAfter:1,freezeDays:type==='freeze_consumed'?[add(today,-1)]:[]})]);
  };
  await insertVisual('streak_incremented');let failedAck=0;
  await page.route('**/api/progress/moments',async route=>{if(route.request().postDataJSON()?.action==='ack' && failedAck===0){failedAck++;await route.abort('failed');}else await route.continue();});
  await page.goto(origin+'/profil');await page.waitForFunction(()=>window.finlyMoments.some(e=>e.type==='streak_incremented'));await acked();
  assert(failedAck===1,'Ack failure fixture did not run');await page.unroute('**/api/progress/moments');
  report.checks.push('Failed first acknowledgment is retried client-side; event becomes durably seen');
  await seed(0,4);await page.goto(origin+'/');await page.locator('.challenge-answers button').first().waitFor();
  await page.evaluate(()=>Object.defineProperty(document,'hidden',{get:()=>true,configurable:true}));await page.waitForTimeout(500);
  let responseDropped=false;
  await page.route('**/api/progress',async route=>{
    if(route.request().method()==='POST' && route.request().postDataJSON()?.type==='answerDailyChallenge'){
      const committed=await route.fetch();assert(committed.ok(),'Server did not commit dropped operation');responseDropped=true;await route.abort('failed');
    }else await route.continue();
  });
  await page.getByRole('button',{name:wrongDailyLabel,exact:true}).click();
  for(let i=0;i<100 && !responseDropped;i++)await page.waitForTimeout(100);
  assert(responseDropped,'Mutation response was not dropped');
  assert((await db.query("select id from public.streak_moments where user_id=$1 and type='streak_incremented' and acknowledged_at is null",[userId])).rows.length===1,'Lost response lost the durable event');
  assert((await page.locator('.status-row .streak-chip').innerText()).includes('4'),'Unconfirmed mutation locally changed the streak');
  await page.unroute('**/api/progress');await page.reload();await page.waitForFunction(()=>window.finlyMoments.some(e=>e.type==='streak_incremented'));await acked();
  snap=await snapshot();assert(snap.statsSummary.currentStreak===5 && snap.progress.dailyChallenges[today].correct===false,'Wrong first daily should activate 4 -> 5');
  assert((await db.query("select id from public.streak_moments where user_id=$1 and type='streak_incremented'",[userId])).rows.length===1,'UUID retry duplicates transition');
  report.checks.push('Wrong first Daily Challenge commits 4 -> 5; lost response preserves event; reload recovers it once; no local increment');
  await seed(2,8);await page.goto(origin+'/profil');await page.waitForFunction(()=>window.finlyMoments.some(e=>e.type==='freeze_consumed'));await acked();
  for(const width of [320,390,430,1440]){
    await page.setViewportSize({width,height:900});
    for(const type of ['streak_incremented','freeze_consumed','streak_broken','freeze_refilled']){
      await insertVisual(type,type==='streak_broken'?0:9);await page.goto(origin+'/profil');
      const visual=page.locator(type==='freeze_refilled'?'.streak-refill':'.streak-moment');await visual.waitFor();
      await page.waitForTimeout(450);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow '+width+' '+type);
      await page.screenshot({path:'artifacts/streak-freeze/'+type+'-'+width+'.png'});await acked();
    }
    assert(await page.locator('.activity-day.freeze').count()===2,'Frozen calendar history lost at '+width);
    await page.goto(origin+'/');await page.locator('.daily-card').waitFor();
    if(await page.locator('.challenge-answers button:enabled').count())await page.getByRole('button',{name:wrongDailyLabel,exact:true}).click();
    await page.locator('.challenge-note').filter({hasText:'Gata pentru azi'}).waitFor();await acked();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Home/Daily overflow '+width);
    await page.screenshot({path:'artifacts/streak-freeze/home-daily-'+width+'.png',fullPage:true});
    await page.goto(origin+'/lectie/ce-sunt-banii');
    await page.waitForFunction(()=>document.querySelector('.lesson-question') || document.querySelector('.lesson-finish'));
    if(await page.locator('.lesson-finish').count())await page.getByRole('button',{name:'Refă lecția'}).click();
    await page.locator('.lesson-question').waitFor();
    for(let screen=0;screen<30;screen++){
      if(await page.locator('.lesson-finish').count())break;
      const options=page.locator('button.lesson-answer');if(await options.count())await options.first().click();
      const count=await page.locator('.lesson-count').innerText();await page.locator('button.lesson-continue').click();
      await page.waitForFunction(old=>document.querySelector('.lesson-finish') || document.querySelector('.lesson-count')?.textContent!==old,count);
    }
    await page.locator('.lesson-finish').waitFor();await page.waitForTimeout(300);
    if(await page.locator('.finly-level-dialog[open]').count())await page.locator('.finly-level-dialog button').click();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Lesson final overflow '+width);
    await page.screenshot({path:'artifacts/streak-freeze/lesson-final-'+width+'.png',fullPage:true});
    report.checks.push('Home, Daily Challenge, Profile/frozen calendar, lesson final and all four moments fit '+width+'px');
  }
  await page.emulateMedia({reducedMotion:'reduce'});await insertVisual('streak_incremented');await page.goto(origin+'/profil');await page.locator('.streak-moment').waitFor();
  assert(await page.locator('.moment-flame').evaluate(el=>getComputedStyle(el).animationName==='none'),'Reduced motion flame moves');
  assert(await page.locator('.moment-particle').first().evaluate(el=>getComputedStyle(el).display==='none'),'Reduced motion particles move');
  assert((await page.locator('.moment-title').innerText())==='9 zile la rând','Reduced motion lost text');await acked();
  report.checks.push('Reduced motion retains text/ack with no flame/particle motion');
  await insertVisual('streak_incremented');
  await page.getByRole('button',{name:'Deconectează-te',exact:true}).click();await page.waitForURL('**/bun-venit');
  await page.goto(origin+'/autentificare');await page.getByLabel('Email',{exact:true}).fill('simulator_b@finly.test');await page.getByLabel('Parolă',{exact:true}).fill('localtestpass');
  await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();await page.waitForTimeout(1600);
  assert(await page.locator('.streak-moment').count()===0,'Account B inherited A presentation');
  assert((await db.query('select id from public.streak_moments where user_id=$1 and acknowledged_at is null',[userId])).rows.length===1,'Logout deleted A pending server history');
  report.checks.push('Logout/account switch aborts A host; B receives no A moment; A server history retained');
  assert(report.errors.length===0 && report.providerErrors.length===0,JSON.stringify(report));
  fs.writeFileSync('artifacts/streak-freeze/report.json',JSON.stringify(report,null,2));console.log('PASS: '+report.checks.length+' streak browser flows; Next + SDK + PGlite; simulated Auth, no remote writes');
`+tail;
source=source.replaceAll('3125','3145').replaceAll('3126','3146').replaceAll('artifacts/simulator-qa','artifacts/streak-freeze');
fs.mkdirSync('artifacts/streak-freeze',{recursive:true});fs.writeFileSync('artifacts/streak-freeze/runner.mjs',source);
await import('../artifacts/streak-freeze/runner.mjs');
