// Local Next + SDK + PostgreSQL; Auth transport uses synthetic accounts.
// Run in an isolated source copy, never against production accounts.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
if (fs.existsSync('.git')) throw new Error('Use an isolated project copy.');
const driver=fs.readFileSync('tests/simulator-notifications-browser.mjs','utf8');
const header=driver.slice(0,driver.indexOf('source += String.raw`')).replace(/^import .*;\r?\n/gm,'');
let source=new Function('fs','path','pathToFileURL',header+'\nreturn source;')(fs,path,pathToFileURL);
source=source.slice(0,source.indexOf("  await page.goto(origin + '/simulator/dev'); assert"));
source=source.replaceAll('3155','3175').replaceAll('3156','3176');
source=source.replace("const artifactDirectory='artifacts/simulator-chapter-eight/browser';","const artifactDirectory='artifacts/life-profile/browser';");
source=source.replace("['a', 'b']","['a', 'b', 'c', 'd', 'legacy']");
source=source.replaceAll('simulator_test_', 'lp_');
source=source.replace('        read_account_progress:', `        apply_streak_progress_mutation: ['select public.apply_streak_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8,$9::jsonb) as result',[body.p_user,body.p_operation,body.p_type,body.p_revision,JSON.stringify(body.p_state),JSON.stringify(body.p_result),body.p_streak,body.p_longest,JSON.stringify(body.p_moments)]],
        claim_streak_moments: ['select public.claim_streak_moments($1,$2) as result',[body.p_user,body.p_claim]],
        acknowledge_streak_moments: ['select public.acknowledge_streak_moments($1,$2,$3) as result',[body.p_user,body.p_claim,body.p_ids]],
        read_account_progress:`);
source=source.replace("'0009_simulator_notifications.sql']","'0009_simulator_notifications.sql','0010_simulator_decision_policy.sql','0011_streak_freeze_moments.sql','0012_simulator_savings_goal.sql']");
source=source.replace('        read_simulator_state:', `        upgrade_simulator_decisions: ['select public.upgrade_simulator_decisions($1,$2,$3,$4,$5,$6,$7::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,body.p_now,body.p_development,JSON.stringify(body.p_policy)]],
        read_simulator_state:`);
source+=String.raw`
  const scenarios=[
    {name:'a',activity:'Sunt la liceu',activityStatus:'liceu',housing:'Cu părinții / familia',housingStatus:'parinti',transport:'Transport public',transportMode:'public',income:100000},
    {name:'b',activity:'Muncesc',activityStatus:'lucrez',housing:'Cu părinții / familia',housingStatus:'parinti',transport:'Transport public',transportMode:'public',income:200000},
    {name:'c',activity:'Muncesc',activityStatus:'lucrez',housing:'Pe cont propriu',housingStatus:'chirie',transport:'Transport public',transportMode:'public',income:200000},
    {name:'d',activity:'Sunt la liceu',activityStatus:'liceu',housing:'Pe cont propriu',housingStatus:'chirie',transport:'Mai mult pe jos',transportMode:'walk',income:160000},
  ];
  async function login(target,name) {
    await target.goto(origin+'/autentificare');
    await target.waitForFunction(()=>{const f=document.querySelector('form');return f&&Object.keys(f).some(k=>k.startsWith('__reactProps'));});
    await target.getByLabel('Email',{exact:true}).fill('simulator_'+name+'@finly.test');
    await target.getByLabel('Parolă',{exact:true}).fill('localtestpass');
    await target.getByRole('button',{name:'Conectează-te',exact:true}).click();
    await target.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
    await target.goto(origin+'/simulator');
  }
  async function capture(label) {
    for(const width of [320,390,430]) {
      await page.setViewportSize({width,height:width===320?568:850});
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow '+label+' '+width);
      const box=await page.getByRole('button',{name:/Continuă|Începe simularea/,exact:true}).boundingBox();
      assert(box&&box.height>=44,'Small tap target '+label);
      await page.screenshot({path:artifactDirectory+'/'+label+'-'+width+'.png',fullPage:true});
    }
  }
  for(const scenario of scenarios) {
    await context.clearCookies();await login(page,scenario.name);
    await page.getByRole('heading',{name:'Cum începi?',exact:true}).waitFor();
    const user=[...users.values()].find(v=>v.user.email==='simulator_'+scenario.name+'@finly.test').user;
    assert((await db.query('select id from sim_runs where user_id=$1',[user.id])).rows.length===0,'Initialized before setup');
    if(scenario.name==='a')await capture('question-1');
    await page.getByRole('button',{name:scenario.activity,exact:true}).click();
    await page.getByRole('button',{name:'Continuă',exact:true}).click();
    if(scenario.name==='a')await capture('question-2');
    await page.getByRole('button',{name:scenario.housing,exact:true}).click();await page.getByRole('button',{name:'Continuă',exact:true}).click();
    if(scenario.name==='a')await capture('question-3');
    await page.getByRole('button',{name:scenario.transport,exact:true}).click();await page.getByRole('button',{name:'Continuă',exact:true}).click();
    await page.getByRole('heading',{name:'Așa începi',exact:true}).waitFor();
    if(scenario.name==='a') {
      await page.getByRole('button',{name:'Înapoi',exact:true}).click();
      assert(await page.getByRole('button',{name:scenario.transport,exact:true}).getAttribute('aria-pressed')==='true','Back lost answer');
      await page.getByRole('button',{name:'Continuă',exact:true}).click();
      await page.reload();await page.getByRole('heading',{name:'Cum începi?',exact:true}).waitFor();
      assert((await db.query('select id from sim_runs where user_id=$1',[user.id])).rows.length===0,'Refresh created run');
      for(const answer of [scenario.activity,scenario.housing,scenario.transport]) {
        await page.getByRole('button',{name:answer,exact:true}).click();await page.getByRole('button',{name:'Continuă',exact:true}).click();
      }
    }
    await capture('summary-'+scenario.name);
    const completed=page.waitForResponse(r=>r.url().endsWith('/api/simulator/start')&&r.request().method()==='POST');
    await page.getByRole('button',{name:'Începe simularea',exact:true}).click();assert((await completed).ok(),'Setup failed '+scenario.name);
    await page.getByRole('heading',{name:'Ce urmează',exact:true}).waitFor();
    assert(await page.getByText('PRIVIRE ÎNAINTE',{exact:true}).count()===0,'Eyebrow retained');
    const first=await api('dashboard'),saved=(await db.query('select config_snapshot from sim_runs where user_id=$1',[user.id])).rows[0].config_snapshot;
    assert(saved.lifeProfile.activityStatus===scenario.activityStatus&&saved.lifeProfile.housingStatus===scenario.housingStatus&&saved.lifeProfile.transportMode===scenario.transportMode,'Profile mismatch');
    assert(saved.monthlyIncomeBani===scenario.income,'Income mismatch');
    assert(saved.housing[scenario.housingStatus].amountBani===(scenario.housingStatus==='chirie'?120000:0),'Rent mismatch');
    assert(saved.fixedExpenses.filter(e=>e.id==='transport').length===(scenario.transportMode==='public'?1:0),'Transport mismatch');
    assert(first.dashboard.fixedExpenses.every(e=>e.label!=='Contribuție la locuință'),'Universal housing fee');
    assert(first.events.profile===scenario.activityStatus,'Schedule mismatch');
    const payload={housing:scenario.housingStatus,lifeProfile:saved.lifeProfile};
    await Promise.all([api('start',payload),api('start',payload)]);
    const ledger=(await db.query('select * from sim_ledger where user_id=$1 order by ref_key',[user.id])).rows;
    assert(new Set(ledger.map(e=>e.ref_key)).size===ledger.length,'Duplicate initialization');
    await page.reload();await page.getByRole('heading',{name:'Ce urmează',exact:true}).waitFor();
    const device=await browser.newContext(),pc=await device.newPage();await login(pc,scenario.name);
    await pc.getByRole('heading',{name:'Ce urmează',exact:true}).waitFor();
    const response=await device.request.get(origin+'/api/simulator/dashboard');
    assert((await response.json()).dashboard.runId===first.dashboard.runId,'Cross-device recreated run');await device.close();
    if(scenario.name==='a'||scenario.name==='b') {
      const initial=await api('dev/events'),parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(initial.effectiveTime));
      const value=type=>Number(parts.find(p=>p.type===type).value),civil=new Date(Date.UTC(value('year'),value('month')-1,value('day'))),baseMinute=value('hour')*60+value('minute');
      const daysToTuesday=((2-civil.getUTCDay()+7)%7)||7;
      for(const [offset,minute] of [[daysToTuesday,scenario.activityStatus==='liceu'?660:780],[daysToTuesday,scenario.activityStatus==='liceu'?1020:1140],[daysToTuesday+4,660]]) {
        await context.addCookies([{name:'finly_sim_dev_minute_offset',value:String(offset*1440+minute-baseMinute),domain:'127.0.0.1',path:'/'}]);
        const inspected=await api('dev/events'),program=inspected.engine.policySnapshot.profiles[scenario.activityStatus];
        assert(program.start===(scenario.activityStatus==='liceu'?480:540)&&program.end===(scenario.activityStatus==='liceu'?870:1020),'Wrong canonical program');
        for(const instance of inspected.instances) {
          const local=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bucharest',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(instance.scheduledAt)),hour=Number(local.find(p=>p.type==='hour').value)*60+Number(local.find(p=>p.type==='minute').value),weekday=local.find(p=>p.type==='weekday').value;
          if(!['Sat','Sun'].includes(weekday)&&hour>=program.start&&hour<program.end)assert(instance.snapshot.life.contexts.includes('break')&&!instance.snapshot.life.semanticTags.some(t=>['cinema','games','shopping','sport'].includes(t)),'Invalid event during program');
          assert(Date.parse(instance.expiresAt)-Date.parse(instance.scheduledAt)===30*60000,'Changed response window');
        }
      }
      report.checks.push(scenario.activityStatus+': dev clock Tuesday '+(scenario.activityStatus==='liceu'?'11:00/17:00':'13:00/19:00')+' and weekend; contextual plans and unchanged response windows');
    }
    report.checks.push(scenario.name+': setup, canonical server profile, finances, repeat submission, refresh and second-device login');
  }
  // Existing fixture uses the untouched legacy configuration and carries a real ledger.
  const legacy=[...users.values()].find(v=>v.user.email==='simulator_legacy@finly.test').user;
  const config=(await db.query('select config_snapshot from sim_runs limit 1')).rows[0].config_snapshot;
  const legacyConfig={...config};delete legacyConfig.lifeProfile;delete legacyConfig.recurringInflows;
  legacyConfig.monthlyIncomeBani=200000;legacyConfig.housing.parinti.amountBani=30000;legacyConfig.housing.parinti.label='Contribuție la locuință';
  const today=(await api('dashboard')).dashboard.currentDay,legacyRun={id:crypto.randomUUID(),userId:legacy.id,startedOn:today,startAge:legacyConfig.startAge,monthlyIncomeBani:200000,housing:'parinti',status:'activ',rulesVersion:1,rngVersion:1,configSnapshot:legacyConfig,lastSettledOn:null};
  await db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)',[legacy.id,JSON.stringify(legacyRun),JSON.stringify([{runId:legacyRun.id,userId:legacy.id,day:today,sequence:100,kind:'ajustare',category:'venit',amountBani:77700,label:'Existing funds',refKey:legacyRun.id+':'+today+':start:balance',autoResolved:false}])]);
  const before=(await db.query('select * from sim_ledger where user_id=$1',[legacy.id])).rows;
  await context.clearCookies();await login(page,'legacy');await page.getByRole('heading',{name:'Ce urmează',exact:true}).waitFor();
  assert((await api('dashboard')).dashboard.balanceBani===77700,'Legacy balance changed');
  assert(JSON.stringify((await db.query('select * from sim_ledger where user_id=$1',[legacy.id])).rows)===JSON.stringify(before),'Legacy ledger changed');
  report.checks.push('Legacy account opens dashboard directly; original balance and ledger preserved');
  assert(report.errors.length===0,'Browser errors '+JSON.stringify(report.errors));
  assert(report.providerErrors.length===0,'Provider errors '+JSON.stringify(report.providerErrors));
  fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
} catch(error) {
  report.failure=error.message;fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));
  await page?.screenshot({path:artifactDirectory+'/failure.png',fullPage:true}).catch(()=>{});throw error;
} finally {
  await browser?.close();
  if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});
  server.closeAllConnections();if(server.listening)await new Promise(resolve=>server.close(resolve));await db.close();
}
`;
const runner=path.resolve('artifacts/life-profile/browser-runner.mjs');
fs.mkdirSync(path.dirname(runner),{recursive:true});fs.writeFileSync(runner,source);
await import(pathToFileURL(runner).href);
