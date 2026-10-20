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
  await page.locator('.continue-card .app-button').click();await page.waitForURL('**/lectie/**');
  let completionPosts=0;const completionRequests=request=>{if(request.method()==='POST'&&request.url()===origin+'/api/progress'&&request.postDataJSON()?.type==='completeLesson')completionPosts++;};
  page.on('request',completionRequests);
  for(let step=0;step<25;step++){
    if(await page.getByRole('heading',{name:'Lecție terminată.',exact:true}).count())break;
    const answers=page.locator('.lesson-answer');
    if(await answers.count()){await page.keyboard.press('1');await page.locator('.lesson-feedback').waitFor();}
    const count=(await page.locator('.lesson-count').textContent()).match(/(\d+)\s*\/\s*(\d+)/);
    const button=page.locator('.lesson-continue');await button.waitFor();
    if(Number(count[1])===Number(count[2])-1)await button.evaluate(button=>{button.click();button.click();});else await button.click();
    await page.waitForFunction(previous=>document.querySelector('.lesson-count')?.textContent!==previous, count[0]);
  }
  await page.getByRole('heading',{name:'Lecție terminată.',exact:true}).waitFor();
  assert(completionPosts===1,'Lesson completion double-click sent '+completionPosts+' mutations');page.off('request',completionRequests);
  await page.getByRole('button',{name:'Refă lecția',exact:true}).click();await page.locator('.lesson-question').waitFor();
  await page.getByRole('link',{name:'Închide lecția',exact:true}).click();await page.waitForURL('**/lectii/**');
  await page.goto(origin+'/');await page.locator('.category-tile').first().click();await page.waitForURL('**/lectii/**');
  await page.goto(origin+'/');await page.getByRole('link',{name:'Deschide profilul',exact:true}).click();
  await page.getByRole('button',{name:'Editează profilul',exact:true}).click();await page.getByRole('button',{name:'Închide setările profilului',exact:true}).click();
  const eventPreference=page.getByRole('checkbox',{name:'Evenimente importante',exact:true}),paymentPreference=page.getByRole('checkbox',{name:'Plăți și abonamente',exact:true});
  await eventPreference.waitFor();
  const paymentBefore=await paymentPreference.isChecked();
  await Promise.all([page.waitForResponse(response=>response.url()===origin+'/api/notifications/preferences'&&response.request().method()==='POST'),eventPreference.uncheck()]);
  assert(await paymentPreference.isChecked()===paymentBefore,'Independent preferences toggled together');
  await page.route(origin+'/api/notifications/preferences',route=>route.request().method()==='POST'?route.fulfill({status:503,contentType:'application/json',body:'{}'}):route.continue());
  await eventPreference.check();await page.getByText('Nu putem actualiza setările acum. Reîncearcă.',{exact:true}).waitFor();assert(!await eventPreference.isChecked(),'Failed preference mutation was not rolled back');await page.unroute(origin+'/api/notifications/preferences');
  await page.getByRole('button',{name:'Editează profilul',exact:true}).click();await page.getByRole('link',{name:'Schimbă parola',exact:true}).click();await page.waitForURL('**/resetare-parola');
  await page.goto(origin+'/simulator');await page.getByRole('heading',{name:'SimLife',exact:true}).waitFor();
  for(const width of [350,360,375,390,430,1280]){
    await page.setViewportSize({width,height:850});
    await page.getByRole('button',{name:'Calendar',exact:true}).click();await page.getByRole('heading',{name:'Calendar financiar',exact:true}).waitFor();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'SimLife overflow '+width);
    await page.getByRole('button',{name:'Închide',exact:true}).click();
    await page.getByRole('button',{name:'Adaugă abonament',exact:true}).click();await page.getByLabel('Nume abonament',{exact:true}).waitFor();await page.getByRole('button',{name:'Închide',exact:true}).click();
    await page.getByRole('button',{name:'Creează un obiectiv',exact:true}).click();await page.getByLabel('Numele obiectivului',{exact:true}).waitFor();await page.getByRole('button',{name:'Închide',exact:true}).click();
  }
  report.checks.push('Home primary/category/profile/SimLife; full lesson keyboard answers, completion double-click and replay; profile dialog/reset link; calendar/subscription/goal sheets at 350/360/375/390/430/1280');
  await page.getByRole('button',{name:'Calendar',exact:true}).click();await context.setOffline(true);await page.getByRole('button',{name:'Închide',exact:true}).click();await page.locator('.sim-financial-dialog').waitFor({state:'hidden'});await context.setOffline(false);
  report.checks.push('Independent notification preferences; failed save rolls back; offline calendar remains closable');
  await page.getByRole('button',{name:'Adaugă abonament',exact:true}).click();
  await page.getByLabel('Nume abonament',{exact:true}).fill('QA abonament');await page.getByLabel('Cost',{exact:true}).fill('1');
  let subscriptionPosts=0;const subscriptionListener=request=>{if(request.method()==='POST'&&request.url()===origin+'/api/simulator/subscriptions')subscriptionPosts++;};page.on('request',subscriptionListener);
  await page.route(origin+'/api/simulator/dashboard',route=>route.fulfill({status:503,contentType:'application/json',body:'{}'}));
  await page.getByRole('button',{name:'Salvează abonamentul',exact:true}).evaluate(button=>{button.click();button.click();});
  await page.locator('.sim-financial-dialog').waitFor({state:'hidden'});assert(subscriptionPosts===1,'Subscription double-click sent duplicate mutations');page.off('request',subscriptionListener);
  assert((await api('calendar')).subscriptions.filter(s=>s.name==='QA abonament').length===1,'Committed subscription missing or duplicated');
  await page.unroute(origin+'/api/simulator/dashboard');await page.goto(origin+'/simulator');await page.getByRole('heading',{name:'SimLife',exact:true}).waitFor();
  report.checks.push('Subscription double-click commits once; failed secondary dashboard read does not trap form or report save failure');
  await page.goto(origin+'/');
  await page.locator('.challenge-answers button').first().waitFor();
  await page.route(origin+'/api/progress',route=>route.request().method()==='POST'?route.fulfill({status:400,contentType:'application/json',body:JSON.stringify({error:{code:'INVALID_OPERATION'}})}):route.continue());
  await page.locator('.challenge-answers button').first().click();
  await page.getByText('Nu am putut trimite răspunsul. Încearcă din nou.',{exact:true}).waitFor();
  assert(await page.locator('.challenge-answers button').first().isEnabled(),'Daily challenge stayed locked after failure');
  await page.unroute(origin+'/api/progress');
  await page.locator('.challenge-answers button').first().evaluate(button=>{button.click();button.click();});
  await page.locator('.challenge-feedback').waitFor();
  report.checks.push('Daily challenge server rejection has retry feedback; double-click retry completes once');
  const bell=page.locator('.notification-bell');await page.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări, 3 necitite');
  assert(await bell.locator('span').textContent()==='3','Badge not 3');
  const red=await bell.locator('span').evaluate(e=>getComputedStyle(e).backgroundColor);assert(red==='rgb(220, 38, 38)','Badge not red: '+red);
  const other=await browser.newContext();await other.addCookies(await context.cookies());const tab=await other.newPage();await tab.goto(origin+'/');await tab.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări, 3 necitite');
  for(const width of [350,360,375,390,430,1280]){
    await page.setViewportSize({width,height:850});await bell.click();await page.locator('.notification-inbox').waitFor({state:'visible'});await page.waitForLoadState('networkidle');
    assert((await notification()).unread===3,'Opening bell read notifications');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.querySelector('.notification-inbox').scrollWidth<=document.querySelector('.notification-inbox').clientWidth),'Panel overflow '+width);
    const box=await page.locator('.notification-inbox').boundingBox();assert(width<600?box.height>600:box.width<=440,'Panel dimensions '+width);
    assert(await bell.evaluate(e=>e.getBoundingClientRect().width>=44),'Small bell target');
    await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('.notification-inbox').contains(document.activeElement)),'Dialog focus escaped');
    await page.screenshot({path:artifactDirectory+'/inbox-'+width+'.png'});await page.keyboard.press('Escape');await page.locator('.notification-inbox').waitFor({state:'hidden'});assert(await bell.evaluate(e=>e===document.activeElement),'Focus not restored');
  }
  await page.setViewportSize({width:390,height:850});await bell.click();await page.waitForLoadState('networkidle');
  const notificationEndpoint=origin+'/api/notifications';
  await page.route(notificationEndpoint,async route=>{
    if(route.request().method()==='POST')return route.fulfill({status:503,contentType:'application/json',body:'{}'});
    return route.continue();
  });
  await page.getByRole('button',{name:/Cafea după ore.*Deschide/}).click();
  await page.getByText('Nu am putut deschide acum. Încearcă din nou.',{exact:true}).waitFor();
  assert(await page.locator('.notification-inbox').isVisible(),'Primary failure closed inbox');
  assert((await notification()).unread===3,'Primary failure marked item read');
  await page.unroute(notificationEndpoint);
  let acknowledged=false,secondaryReads=0;
  await page.route(notificationEndpoint,async route=>{
    if(route.request().method()==='POST'){const response=await route.fetch();acknowledged=true;return route.fulfill({response});}
    if(acknowledged){secondaryReads++;return route.fulfill({status:503,contentType:'application/json',body:'{}'});}
    return route.continue();
  });
  await page.getByRole('button',{name:/Cafea după ore.*Deschide/}).click();
  await page.waitForURL('**/simulator/eveniment/'+events[0].id);await page.locator('.sim-choice-card').first().waitFor();assert((await notification()).unread===2,'Click did not decrement 3 to 2');
  assert(secondaryReads===0,'Navigation required a secondary GET');await page.unroute(notificationEndpoint);
  report.checks.push('Primary acknowledgement failure keeps inbox and unread; successful POST navigates with subsequent GET unavailable');
  await page.goto(origin+'/');await bell.waitFor();await page.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări, 2 necitite');
  await bell.click();await page.getByRole('button',{name:'Marchează citite',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('.notification-bell>span'));
  assert(await page.getByRole('button',{name:'Marchează citite',exact:true}).count()===0,'Read-all still visible');await page.keyboard.press('Escape');await page.reload();await bell.waitFor();assert((await notification()).unread===0,'Read lost on refresh');
  await tab.evaluate(()=>window.dispatchEvent(new Event('focus')));await tab.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări');assert((await tab.request.get(origin+'/api/notifications').then(r=>r.json())).unread===0,'Cross-device read state stale');
  report.checks.push('Red 3 / open stays 3 / click becomes 2 / mark-all hides badge / refresh / separate device focus / future excluded / keyboard / 350,360,375,390,430,1280');
  await other.close(); // Dev time controls are per-device cookies; finish cross-device QA before advancing them.
  await api('dev/events',{minutes:60});state=await notification();
  for(const e of events){const n=state.items.find(i=>i.eventId===e.id);assert(n?.status==='missed'&&n.readAt&&n.body.startsWith('SimLife a ales:')&&n.amount!==null&&!n.expiresAt,'Missing automatic result '+e.title);}
  const missed=state.items.find(i=>i.eventId===events[0].id);await page.reload();await page.waitForLoadState('networkidle');await bell.click();await page.waitForLoadState('networkidle');await page.getByRole('button',{name:/Cafea după ore.*Ratată.*Detalii/}).click();await page.waitForURL('**/simulator/eveniment/'+events[0].id);await page.getByRole('heading',{name:'SimLife a ales',exact:true}).waitFor();assert(await page.locator('.sim-choice-card').count()===0,'Missed route still allows decisions');await page.screenshot({path:artifactDirectory+'/missed-result-390.png'});
  state=await notification();await notification({id:missed.id,version:missed.availableAt});state=await notification();assert(state.items.find(i=>i.id===missed.id).readAt,'Repeated catch-up reset read result');
  const count=(await db.query('select target_id,count(*) from sim_notifications where user_id=$1 and target_kind=\'event\' and obsolete_at is null group by target_id having count(*)>1',[userId])).rows;assert(count.length===0,'Duplicate logical event records');
  report.checks.push('Read active then automatic stays read across reload / missed option and cost / read-only deep link / repeated sync dedup');
  await notification({});const manual=await fixture('Plimbare după cursuri');await notification();await page.goto(origin+'/');await page.waitForLoadState('networkidle');await bell.click();await page.waitForLoadState('networkidle');await page.getByRole('button',{name:/Plimbare după cursuri.*Deschide/}).click();await page.getByRole('button',{name:'Rămâi acasă 0 lei',exact:true}).click();await page.getByRole('heading',{name:'Ai ales',exact:true}).waitFor();state=await notification();const resolved=state.items.find(i=>i.eventId===manual.id);assert(resolved.status==='resolved'&&resolved.readAt&&resolved.body==='Ai ales: Rămâi acasă','Manual choice not read history');
  await notification({});for(let i=0;i<14;i++)await fixture('O ieșire prin oraș '+(i+1));state=await notification();assert(state.unread===14,'Expected 14 unread');await page.goto(origin+'/');await page.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări, 14 necitite');assert(await bell.locator('span').textContent()==='9+','Badge overflow wrong');
  await page.emulateMedia({reducedMotion:'reduce'});await bell.click();assert(await page.locator('.notification-inbox li>button').first().evaluate(e=>getComputedStyle(e).transitionDuration)==='0s','Reduced motion ignored');await page.screenshot({path:artifactDirectory+'/over-nine-390.png'});
  await page.keyboard.press('Escape');const switched=await page.request.post(origin+'/api/account/auth',{headers:{origin},data:{action:'login',data:{email:'simulator_b@finly.test',password:'localtestpass'}}});assert(switched.ok(),'Account switch failed');await page.goto(origin+'/');await bell.waitFor();await page.waitForLoadState('networkidle');assert((await notification()).unread===0,'Account A count leaked to B');assert(await bell.locator('span').count()===0,'A badge leaked to B');
  await bell.click();await page.getByText('Ești la zi.',{exact:true}).waitFor();await page.screenshot({path:artifactDirectory+'/empty-390.png'});
  report.checks.push('Manual choice read history / 14→9+ exact aria / scrollable long list / reduced motion / account switch / empty state');
  await page.request.post(origin+'/api/account/auth',{headers:{origin},data:{action:'login',data:{email:'simulator_a@finly.test',password:'localtestpass'}}});
  await page.goto(origin+'/simulator');await page.getByRole('heading',{name:'SimLife',exact:true}).waitFor();
  const calendarState=await api('dashboard'),calendarDay=new Date(Date.parse(calendarState.dashboard.currentDay+'T12:00:00Z')+86400000).toISOString().slice(0,10);
  const clockParts=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Bucharest',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(calendarState.events.serverNow));
  const minute=Number(clockParts.find(p=>p.type==='hour').value)*60+Number(clockParts.find(p=>p.type==='minute').value);
  if(minute<19*60)await api('dev/events',{minutes:19*60-minute});
  await api('subscriptions',{action:'create',input:{name:'Plată de verificat',amount:'1',nextDueOn:calendarDay,intervalMonths:1,endsOn:null,operationId:crypto.randomUUID()}});
  await page.goto(origin+'/');await bell.click();await page.getByRole('button',{name:/Plată de verificat.*Detalii/}).click();await page.waitForURL('**/simulator?calendar='+calendarDay);
  await page.getByRole('heading',{name:'Calendar financiar',exact:true}).waitFor();
  await page.locator('.sim-calendar-grid button[aria-pressed="true"]').waitFor();
  assert(await page.locator('.sim-calendar-grid button[aria-pressed="true"]>span').first().textContent()===String(Number(calendarDay.slice(-2))),'Calendar target did not select requested day');
  await page.getByRole('button',{name:'Închide',exact:true}).click();
  report.checks.push('Calendar notification acknowledges and opens the requested calendar day');
  const startingMonth=(await api('dashboard')).dashboard.currentDay.slice(0,7);
  for(let step=0;step<35&&(await api('dashboard')).dashboard.currentDay.slice(0,7)===startingMonth;step++)await api('dev/clock',{increment:1});
  await page.reload();const monthly=page.locator('.sim-monthly-dialog');await monthly.waitFor({state:'visible'});
  let reviewRetryOperation;
  await page.route(origin+'/api/simulator/monthly-review',route=>{reviewRetryOperation=route.request().postDataJSON().operationId;return route.fulfill({status:503,contentType:'application/json',body:'{}'});});
  await monthly.getByRole('button').click();await monthly.getByRole('alert').waitFor();assert(await monthly.getByRole('button').isEnabled(),'Monthly retry stayed locked');
  await page.unroute(origin+'/api/simulator/monthly-review');
  let monthlyPosts=0;page.on('request',request=>{if(request.method()==='POST'&&request.url()===origin+'/api/simulator/monthly-review'){monthlyPosts++;assert(request.postDataJSON().operationId===reviewRetryOperation,'Monthly retry changed operationId');}});
  await monthly.getByRole('button').evaluate(button=>{button.click();button.click();});await monthly.waitFor({state:'hidden'});assert(monthlyPosts===1,'Double monthly acknowledgement');
  report.checks.push('Month close fixture, recoverable acknowledgement failure, double-click finalizes once and modal closes');
  assert(report.errors.length===0,'Browser errors: '+report.errors.join('; '));assert(report.providerErrors.length===0,'Provider errors: '+report.providerErrors.join('; '));fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){report.failure=error.message;fs.mkdirSync(artifactDirectory,{recursive:true});fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));if(page)await page.screenshot({path:artifactDirectory+'/failure.png'}).catch(()=>{});throw error;}
finally{if(browser)await browser.close();if(next){const p=spawn('taskkill',['/PID',String(next.pid),'/T','/F'],{stdio:'ignore',windowsHide:true});await new Promise(r=>p.on('close',r));}await new Promise(r=>server.close(r));await db.close();}
`;
driver=driver.slice(0,start)+'source += String.raw`'+qa+driver.slice(end);
const onboardingStart="  await page.getByRole('heading', { name: 'Începe viața pe cont propriu' }).waitFor();";
const onboardingEnd="  await page.getByRole('heading', { name: 'Evenimentele de azi' }).waitFor();";
driver=driver.replace('source += String.raw`',`source=source.slice(0,source.indexOf(${JSON.stringify(onboardingStart)}))+${JSON.stringify("  await page.getByRole('heading',{name:'Cum începi?',exact:true}).waitFor();\n  for(const label of ['Sunt la liceu','Cu părinții / familia','Mai mult pe jos']){await page.getByRole('button',{name:label,exact:true}).click();await page.getByRole('button',{name:'Continuă',exact:true}).click();}\n  await page.getByRole('button',{name:'Începe simularea',exact:true}).click();\n")}+source.slice(source.indexOf(${JSON.stringify(onboardingEnd)}));\nsource += String.raw\``);
driver=driver.replaceAll('simulator-chapter-eight','notification-center').replaceAll('.next-ch8-','.next-inbox-').replaceAll('3155','3185').replaceAll('3156','3186');
driver=driver.replace("'0009_simulator_notifications.sql']", "'0009_simulator_notifications.sql','0010_simulator_decision_policy.sql','0011_streak_freeze_moments.sql']");
const accountRpcs="        apply_streak_progress_mutation: ['select public.apply_streak_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8,$9::jsonb) as result',[body.p_user,body.p_operation,body.p_type,body.p_revision,JSON.stringify(body.p_state),JSON.stringify(body.p_result),body.p_streak,body.p_longest,JSON.stringify(body.p_moments)]],\n        claim_streak_moments: ['select public.claim_streak_moments($1,$2) as result',[body.p_user,body.p_claim]],\n        acknowledge_streak_moments: ['select public.acknowledge_streak_moments($1,$2,$3) as result',[body.p_user,body.p_claim,body.p_ids]],\n        read_account_progress:";
driver=driver.replace('source += String.raw`',`source = source.replace("        read_account_progress:", ${JSON.stringify(accountRpcs)});\n// Turbopack avoids Windows webpack dev-manifest writes racing full navigations.\nsource = source.replace("...(lifeMode?[]:['--webpack']),", "");\nsource += String.raw\``);
driver=driver.replace('        finalize_simulator_month:',"        upgrade_simulator_decisions: ['select public.upgrade_simulator_decisions($1,$2,$3,$4,$5,$6,$7::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,body.p_now,body.p_development,JSON.stringify(body.p_policy)]],\n        finalize_simulator_month:");
driver=driver.replace('        upgrade_simulator_decisions:',"        upgrade_simulator_daily_floor: ['select public.upgrade_simulator_daily_floor($1,$2,$3,$4,$5,$6,$7::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,body.p_now,body.p_development,JSON.stringify(body.p_policy)]],\n        upgrade_simulator_decisions:");
driver=driver.replace("'0011_streak_freeze_moments.sql']","'0011_streak_freeze_moments.sql','0012_simulator_savings_goal.sql','0013_simulator_daily_floor.sql']");
const entry=path.resolve('artifacts/notification-center/browser-driver.mjs');fs.mkdirSync(path.dirname(entry),{recursive:true});fs.writeFileSync(entry,driver);await import(pathToFileURL(entry).href);
