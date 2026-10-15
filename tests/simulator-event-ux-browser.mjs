// Reuse the real Next/Auth SDK/PostgreSQL harness with isolated local fixtures.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
let driver=fs.readFileSync('tests/simulator-notifications-browser.mjs','utf8');
const start=driver.indexOf('source += String.raw`'),end=driver.indexOf('\n`;\nconst runner',start);
const qa=String.raw`
  const first=await api('dashboard'),userId=[...users.values()][0].user.id,runId=first.dashboard.runId;
  const at=first.events.serverNow,current=first.dashboard.currentDay;
  const fixture=async(kind='manual',legacy=false)=>{
    const id=crypto.randomUUID(),snapshot={version:1,title:'Ieșire cu prietenii',description:'Prietenii propun să ieșiți puțin prin oraș.',variationId:'ux_situation',category:'iesiri',
      options:[{id:'ux_paid',label:'Mergi',costBani:4300,feedback:'Ai petrecut timp cu prietenii.',durationMinutes:0,fallbackWhenUnaffordable:false},{id:'ux_free',label:'Mergi doar la plimbare',costBani:0,feedback:'Ai ieșit fără cumpărături.',durationMinutes:0,fallbackWhenUnaffordable:true}]};
    if(!legacy)snapshot.presentation={title:snapshot.title,context:snapshot.description,bullets:[{text:'Vă plimbați prin parc'},{text:'Transportul și mâncarea sunt opționale',amountBani:4300,amountKind:'exact'}]};
    const scheduled=(await api('dashboard')).events.serverNow,expiry=new Date(Date.parse(scheduled)+(legacy?4*3600000:30*60000)).toISOString();
    await db.query("insert into public.sim_event_instances(id,run_id,user_id,day,definition_id,definition_version,family_id,variation_id,scheduled_at,expires_at,snapshot_version,snapshot,generation_key,created_at,status) values($1,$2,$3,$4,'dev_ux',1,'dev_ux','ux_situation',$5,$6,1,$7::jsonb,$8,$5,'pending')",[id,runId,userId,current,scheduled,expiry,JSON.stringify(snapshot),'ux-'+kind]);
    await db.query('update sim_event_days set event_count=event_count+1 where run_id=$1 and day=$2',[runId,current]);return {id,snapshot,expiry};
  };
  const pending=await fixture();await page.reload();await page.getByRole('heading',{name:'Evenimentele de azi'}).waitFor();
  assert(await page.getByRole('link',{name:'Vezi opțiunile'}).count()>0,'Pending CTA absent');
  assert(await page.locator('.sim-events .sim-situation-details').count()===0,'Dashboard contains full details');
  const expiryBefore=(await api('events/'+pending.id)).event.expiresAt;
  await page.goto(origin+'/simulator/eveniment/'+pending.id);await page.getByRole('heading',{name:'Ieșire cu prietenii',exact:true}).waitFor();
  for(const width of [320,390,430,1280]){
    await page.setViewportSize({width,height:900});await page.locator('.sim-decision-timer').waitFor();
    assert(await page.locator('.sim-situation-details li').count()===2,'Structured bullets absent');assert(await page.locator('.sim-choice-card').count()===2,'Choice cards absent');
    assert(!(await page.locator('main').textContent()).includes('Ora situației'),'Technical timestamp remains');
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Event overflow '+width);
    assert(await page.locator('.sim-choice-card').first().evaluate(e=>e.getBoundingClientRect().height>=44),'Small touch target');
    await page.screenshot({path:artifactDirectory+'/pending-'+width+'.png'});
  }
  await page.reload();await page.locator('.sim-choice-card').first().waitFor();assert((await api('events/'+pending.id)).event.expiresAt===expiryBefore,'Refresh changed expiry');
  const second=await context.newPage();await second.goto(origin+'/simulator/eveniment/'+pending.id);await second.locator('.sim-choice-card').first().waitFor();
  const phone=await second.request.get(origin+'/api/simulator/events/'+pending.id);assert((await phone.json()).event.expiresAt===expiryBefore,'Cross-device expiry differs');
  await page.getByRole('button',{name:'Mergi −43 lei',exact:true}).click();await page.getByRole('button',{name:'Confirmă',exact:true}).click();await page.getByRole('heading',{name:'Ai ales',exact:true}).waitFor();
  assert(await page.locator('.sim-result-stats dt').allTextContents().then(a=>a.join('|')==='Cost|Sold după alegere'),'Result stats incorrect');assert(await page.locator('.sim-choice-card').count()===0,'Resolved options remain');
  const balanceAfter=(await api('events/'+pending.id)).event.balanceAfterChoiceBani;await second.evaluate(()=>window.dispatchEvent(new Event('pageshow')));await second.getByRole('heading',{name:'Ai ales',exact:true}).waitFor();await second.close();
  await page.screenshot({path:artifactDirectory+'/manual-result.png'});report.checks.push('Pending hierarchy / 320,390,430,1280 / touch targets / refresh snapshot / cross-device manual result');
  const automatic=await fixture('automatic');await api('dev/events',{minutes:29});assert((await api('events/'+automatic.id)).event.status==='pending','Expired before 30 minutes');
  await api('dev/events',{minutes:1});const auto=(await api('events/'+automatic.id)).event;assert(auto.resolutionMode==='automatic','Not automatic after 30 minutes');
  await page.goto(origin+'/simulator/eveniment/'+automatic.id);await page.getByRole('heading',{name:'Simulatorul a ales',exact:true}).waitFor();assert(await page.locator('.sim-decision-timer').count()===0,'Resolved countdown remains');await page.screenshot({path:artifactDirectory+'/auto-result.png'});
  assert((await api('events/'+pending.id)).event.balanceAfterChoiceBani===balanceAfter,'Result balance drifted');report.checks.push('+29 pending / +30 deterministic auto / immutable result balance / closed-page catch-up');
  const legacy=await fixture('legacy',true);await page.goto(origin+'/simulator/eveniment/'+legacy.id);await page.getByRole('heading',{name:'Ieșire cu prietenii',exact:true}).waitFor();assert(await page.locator('.sim-choice-card').count()===2,'Legacy snapshot failed');report.checks.push('Legacy snapshot without presentation renders safely');
  await page.goto(origin+'/simulator');await page.getByRole('heading',{name:'Simulator',exact:true}).waitFor();
  const dates=await api('calendar'),chosen=dates.days.find(d=>d.items.length===0&&d.day>=current)?.day;assert(chosen,'Missing empty calendar day fixture');
  for(const name of ['Sala A','Sala B'])await api('subscriptions',{action:'create',input:{operationId:crypto.randomUUID(),name,amount:'30',intervalMonths:1,nextDueOn:chosen}});
  await page.reload();await page.getByRole('heading',{name:'Simulator',exact:true}).waitFor();await page.locator('.sim-upcoming').getByRole('button',{name:'Calendar',exact:true}).click();await page.locator('.sim-calendar-grid').waitFor();
  for(const width of [320,390,430,1280]){await page.setViewportSize({width,height:900});const markers=page.locator('.sim-day-marker');assert(await markers.count()>0,'No calendar marker');for(const marker of await markers.all()){assert(await marker.textContent()==='$','Marker is not one dollar');assert(await marker.evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=15),'Dollar too small');}assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Calendar overflow '+width);await page.screenshot({path:artifactDirectory+'/calendar-'+width+'.png'});}
  const calendar=await api('calendar');assert(calendar.days.find(d=>d.day===chosen).items.length===2,'Multiple payments fixture mismatch');
  assert(await page.locator('.sim-calendar-grid button').evaluateAll(nodes=>nodes.every(e=>{const count=Number(e.getAttribute('aria-label')?.match(/(\d+) mișcări/)?.[1]??0);return e.querySelectorAll('.sim-day-marker').length===(count?1:0);})), 'Zero / multiple item markers mismatch');report.checks.push('Canonical calendar condition / one $ per day / multiple subscriptions / selected day / responsive marker');
  assert(report.errors.length===0,'Browser errors: '+report.errors.join('; '));assert(report.providerErrors.length===0,'Provider errors: '+report.providerErrors.join('; '));fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){report.failure=error.message;fs.mkdirSync(artifactDirectory,{recursive:true});fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));if(page)await page.screenshot({path:artifactDirectory+'/failure.png'}).catch(()=>{});throw error;}
finally{if(browser)await browser.close();if(next){const p=spawn('taskkill',['/PID',String(next.pid),'/T','/F'],{stdio:'ignore',windowsHide:true});await new Promise(r=>p.on('close',r));}await new Promise(r=>server.close(r));await db.close();}
`;
driver=driver.slice(0,start)+'source += String.raw`'+qa+driver.slice(end);
driver=driver.replaceAll('simulator-chapter-eight','simulator-event-ux').replaceAll('.next-ch8-','.next-ux-').replaceAll('3155','3175').replaceAll('3156','3176');
driver=driver.replace("'0009_simulator_notifications.sql']", "'0009_simulator_notifications.sql','0010_simulator_decision_policy.sql']");
driver=driver.replace('        finalize_simulator_month:',"        upgrade_simulator_decisions: ['select public.upgrade_simulator_decisions($1,$2,$3,$4,$5,$6,$7::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,body.p_now,body.p_development,JSON.stringify(body.p_policy)]],\n        finalize_simulator_month:");
const entry=path.resolve('artifacts/simulator-event-ux/browser-driver.mjs');fs.mkdirSync(path.dirname(entry),{recursive:true});fs.writeFileSync(entry,driver);await import(pathToFileURL(entry).href);
