// Real Next + Supabase SDK + PostgreSQL; reusable local auth transport, no remote DB.
// Run in an isolated project copy: node tests/notification-center-browser.mjs
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
let driver=fs.readFileSync('tests/simulator-notifications-browser.mjs','utf8');
const start=driver.indexOf('source += String.raw`'),end=driver.indexOf('\n`;\nconst runner',start);
const qa=String.raw`
  const first=await api('dashboard'),userId=[...users.values()][0].user.id,runId=first.dashboard.runId;
  const notification=async(body)=>{
    const response=body===undefined?await page.request.get(origin+'/api/notifications'):await page.request.post(origin+'/api/notifications',{headers:{origin},data:body});
    assert(response.ok(),'Notification API '+response.status()+' '+await response.text());return response.json();
  };
  const fixture=async(title,delay=0)=>{
    const state=await api('dashboard'),scheduled=new Date(Date.parse(state.events.serverNow)+delay*60000).toISOString(),expiry=new Date(Date.parse(scheduled)+30*60000).toISOString(),id=crypto.randomUUID();
    const snapshot={version:1,title,description:'Prietenii propun o scurtă ieșire.',variationId:'inbox_situation',category:'iesiri',options:[{id:'inbox_paid',label:'Mergi',costBani:1659,feedback:'Ai ieșit cu prietenii.',durationMinutes:0,fallbackWhenUnaffordable:false},{id:'inbox_free',label:'Rămâi acasă',costBani:0,feedback:'Ai rămas acasă.',durationMinutes:0,fallbackWhenUnaffordable:true}]};
    await db.query("insert into sim_event_instances(id,run_id,user_id,day,definition_id,definition_version,family_id,variation_id,scheduled_at,expires_at,snapshot_version,snapshot,generation_key,created_at,status) values($1,$2,$3,$4,'dev_inbox',1,'dev_inbox','inbox_situation',$5,$6,1,$7::jsonb,$8,$5,'pending')",[id,runId,userId,state.dashboard.currentDay,scheduled,expiry,JSON.stringify(snapshot),'inbox:'+id]);
    await db.query('update sim_event_days set event_count=event_count+1 where run_id=$1 and day=$2',[runId,state.dashboard.currentDay]);return {id,title,expiry};
  };
  await notification({});
  const events=[];for(const title of ['Cafea după ore','Ieșire cu prietenii','Pauză la magazin'])events.push(await fixture(title));
  const future=await fixture('Comandă de mâncare',120);
  let state=await notification();assert(state.unread===3,'Expected three unread real events');assert(!state.items.some(i=>i.eventId===future.id),'Future event leaked');
  await page.goto(origin+'/');
  const bell=page.locator('.notification-bell');await page.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări, 3 necitite');
  assert(await bell.locator('span').textContent()==='3','Badge not 3');
  const red=await bell.locator('span').evaluate(e=>getComputedStyle(e).backgroundColor);assert(red==='rgb(220, 38, 38)','Badge not red: '+red);
  const other=await browser.newContext();await other.addCookies(await context.cookies());const tab=await other.newPage();await tab.goto(origin+'/');await tab.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări, 3 necitite');
  for(const width of [320,390,430,1280]){
    await page.setViewportSize({width,height:850});await bell.click();await page.locator('.notification-inbox').waitFor({state:'visible'});await page.waitForLoadState('networkidle');
    assert((await notification()).unread===3,'Opening bell read notifications');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.querySelector('.notification-inbox').scrollWidth<=document.querySelector('.notification-inbox').clientWidth),'Panel overflow '+width);
    const box=await page.locator('.notification-inbox').boundingBox();assert(width<600?box.height>600:box.width<=440,'Panel dimensions '+width);
    assert(await bell.evaluate(e=>e.getBoundingClientRect().width>=44),'Small bell target');
    await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('.notification-inbox').contains(document.activeElement)),'Dialog focus escaped');
    await page.screenshot({path:artifactDirectory+'/inbox-'+width+'.png'});await page.keyboard.press('Escape');await page.locator('.notification-inbox').waitFor({state:'hidden'});assert(await bell.evaluate(e=>e===document.activeElement),'Focus not restored');
  }
  await page.setViewportSize({width:390,height:850});await bell.click();await page.getByRole('button',{name:/Cafea după ore.*Vezi opțiunile/}).click();
  await page.waitForURL('**/simulator/eveniment/'+events[0].id);await page.locator('.sim-choice-card').first().waitFor();assert((await notification()).unread===2,'Click did not decrement 3 to 2');
  await page.goto(origin+'/');await bell.waitFor();await page.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări, 2 necitite');
  await bell.click();await page.getByRole('button',{name:'Marchează toate ca citite',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('.notification-bell>span'));
  assert(await page.getByRole('button',{name:'Marchează toate ca citite',exact:true}).count()===0,'Read-all still visible');await page.keyboard.press('Escape');await page.reload();await bell.waitFor();assert((await notification()).unread===0,'Read lost on refresh');
  await tab.evaluate(()=>window.dispatchEvent(new Event('focus')));await tab.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări');assert((await tab.request.get(origin+'/api/notifications').then(r=>r.json())).unread===0,'Cross-device read state stale');
  report.checks.push('Red 3 / open stays 3 / click becomes 2 / mark-all hides badge / refresh / separate device focus / future excluded / keyboard / 320,390,430,1280');
  await other.close(); // Dev time controls are per-device cookies; finish cross-device QA before advancing them.
  await api('dev/events',{minutes:60});state=await notification();
  for(const e of events){const n=state.items.find(i=>i.eventId===e.id);assert(n?.status==='missed'&&!n.readAt&&n.body.startsWith('Simulatorul a ales:')&&n.amount!==null&&!n.expiresAt,'Missing automatic result '+e.title);}
  const missed=state.items.find(i=>i.eventId===events[0].id);await page.reload();await page.waitForLoadState('networkidle');await bell.click();await page.waitForLoadState('networkidle');await page.getByRole('button',{name:/Cafea după ore.*Ratată.*Vezi ce s-a întâmplat/}).click();await page.waitForURL('**/simulator/eveniment/'+events[0].id);await page.getByRole('heading',{name:'Simulatorul a ales',exact:true}).waitFor();assert(await page.locator('.sim-choice-card').count()===0,'Missed route still allows decisions');await page.screenshot({path:artifactDirectory+'/missed-result-390.png'});
  state=await notification();await notification({id:missed.id,version:missed.availableAt});state=await notification();assert(state.items.find(i=>i.id===missed.id).readAt,'Repeated catch-up reset read result');
  const count=(await db.query('select target_id,count(*) from sim_notifications where user_id=$1 and target_kind=\'event\' and obsolete_at is null group by target_id having count(*)>1',[userId])).rows;assert(count.length===0,'Duplicate logical event records');
  report.checks.push('Read active then automatic becomes unread again / missed option and cost / read-only deep link / repeated sync dedup');
  await notification({});const manual=await fixture('Plimbare după cursuri');await notification();await page.goto(origin+'/');await page.waitForLoadState('networkidle');await bell.click();await page.waitForLoadState('networkidle');await page.getByRole('button',{name:/Plimbare după cursuri.*Vezi opțiunile/}).click();await page.getByRole('button',{name:'Rămâi acasă 0 lei',exact:true}).click();await page.getByRole('heading',{name:'Ai ales',exact:true}).waitFor();state=await notification();const resolved=state.items.find(i=>i.eventId===manual.id);assert(resolved.status==='resolved'&&resolved.readAt&&resolved.body==='Ai ales: Rămâi acasă','Manual choice not read history');
  await notification({});for(let i=0;i<14;i++)await fixture('O ieșire prin oraș '+(i+1));state=await notification();assert(state.unread===14,'Expected 14 unread');await page.goto(origin+'/');await page.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări, 14 necitite');assert(await bell.locator('span').textContent()==='9+','Badge overflow wrong');
  await page.emulateMedia({reducedMotion:'reduce'});await bell.click();assert(await page.locator('.notification-inbox li>button').first().evaluate(e=>getComputedStyle(e).transitionDuration)==='0s','Reduced motion ignored');await page.screenshot({path:artifactDirectory+'/over-nine-390.png'});
  await page.keyboard.press('Escape');const switched=await page.request.post(origin+'/api/account/auth',{headers:{origin},data:{action:'login',data:{email:'simulator_b@finly.test',password:'localtestpass'}}});assert(switched.ok(),'Account switch failed');await page.goto(origin+'/');await bell.waitFor();await page.waitForLoadState('networkidle');assert((await notification()).unread===0,'Account A count leaked to B');assert(await bell.locator('span').count()===0,'A badge leaked to B');
  await bell.click();await page.getByText('Ești la zi.',{exact:true}).waitFor();await page.screenshot({path:artifactDirectory+'/empty-390.png'});
  report.checks.push('Manual choice read history / 14→9+ exact aria / scrollable long list / reduced motion / account switch / empty state');
  assert(report.errors.length===0,'Browser errors: '+report.errors.join('; '));assert(report.providerErrors.length===0,'Provider errors: '+report.providerErrors.join('; '));fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){report.failure=error.message;fs.mkdirSync(artifactDirectory,{recursive:true});fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));if(page)await page.screenshot({path:artifactDirectory+'/failure.png'}).catch(()=>{});throw error;}
finally{if(browser)await browser.close();if(next){const p=spawn('taskkill',['/PID',String(next.pid),'/T','/F'],{stdio:'ignore',windowsHide:true});await new Promise(r=>p.on('close',r));}await new Promise(r=>server.close(r));await db.close();}
`;
driver=driver.slice(0,start)+'source += String.raw`'+qa+driver.slice(end);
driver=driver.replaceAll('simulator-chapter-eight','notification-center').replaceAll('.next-ch8-','.next-inbox-').replaceAll('3155','3185').replaceAll('3156','3186');
driver=driver.replace("'0009_simulator_notifications.sql']", "'0009_simulator_notifications.sql','0010_simulator_decision_policy.sql','0011_streak_freeze_moments.sql']");
const accountRpcs="        apply_streak_progress_mutation: ['select public.apply_streak_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8,$9::jsonb) as result',[body.p_user,body.p_operation,body.p_type,body.p_revision,JSON.stringify(body.p_state),JSON.stringify(body.p_result),body.p_streak,body.p_longest,JSON.stringify(body.p_moments)]],\n        claim_streak_moments: ['select public.claim_streak_moments($1,$2) as result',[body.p_user,body.p_claim]],\n        acknowledge_streak_moments: ['select public.acknowledge_streak_moments($1,$2,$3) as result',[body.p_user,body.p_claim,body.p_ids]],\n        read_account_progress:";
driver=driver.replace('source += String.raw`',`source = source.replace("        read_account_progress:", ${JSON.stringify(accountRpcs)});\n// Turbopack avoids Windows webpack dev-manifest writes racing full navigations.\nsource = source.replace("...(lifeMode?[]:['--webpack']),", "");\nsource += String.raw\``);
driver=driver.replace('        finalize_simulator_month:',"        upgrade_simulator_decisions: ['select public.upgrade_simulator_decisions($1,$2,$3,$4,$5,$6,$7::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,body.p_now,body.p_development,JSON.stringify(body.p_policy)]],\n        finalize_simulator_month:");
const entry=path.resolve('artifacts/notification-center/browser-driver.mjs');fs.mkdirSync(path.dirname(entry),{recursive:true});fs.writeFileSync(entry,driver);await import(pathToFileURL(entry).href);
