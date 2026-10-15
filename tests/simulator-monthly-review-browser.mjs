// Reuse the established local Next / Supabase SDK / PostgreSQL browser harness.
// Run in an isolated copy; fake local Auth, no production data or credentials.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const base=fs.readFileSync('tests/simulator-subscriptions-browser.mjs','utf8');
let source=base.slice(0,base.indexOf("  await checkEventsSlot('new-run');"));
source=source.replace("const artifactDirectory=lifeMode?'artifacts/simulator-chapter-six/browser':'artifacts/simulator-chapter-five-qa';","const artifactDirectory='artifacts/simulator-chapter-seven/browser';");
source=source.replace("const lifeMode=process.argv.includes('--life');","const lifeMode=process.argv.includes('--turbopack');");
source=source.replace('page.setDefaultTimeout(30000)','page.setDefaultTimeout(60000)');
source=source.replace("'0007_simulator_life_catalog.sql']","'0007_simulator_life_catalog.sql','0008_simulator_monthly_reviews.sql']");
source=source.replace("        read_simulator_state:",`        finalize_simulator_month: ['select public.finalize_simulator_month($1,$2,$3,$4,$5::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,JSON.stringify(body.p_snapshot)]],
        acknowledge_simulator_month: ['select public.acknowledge_simulator_month($1,$2,$3,$4) as result',[body.p_user,body.p_run,body.p_review,body.p_operation]],
        read_simulator_state:`);
source+=String.raw`
  const first=await api('dashboard'),runId=first.dashboard.runId,userId=[...users.values()][0].user.id;
  assert(first.pendingMonthlyReview===null,'Open month showed a review');
  await api('subscriptions',{action:'create',input:{name:'Music',amount:'30',intervalMonths:1,nextDueOn:first.dashboard.currentDay,operationId:crypto.randomUUID()}});
  for(const [i,amount] of [1800,2200,2000,2200,2100,1900].entries())await db.query("insert into public.sim_ledger(run_id,user_id,day,sequence,kind,category,amount_bani,label,ref_key,auto_resolved) values($1,$2,$3,$4,'eveniment','mancare',$5,'QA small purchase',$6,false)",[runId,userId,first.dashboard.currentDay,6000+i,-amount,'qa:small:'+i]);
  report.checks.push('A: open month, existing run and actual subscription/small-spend fixtures');
  async function advanceToNextMonth(){let d=(await api('dashboard')).dashboard.currentDay;const month=d.slice(0,7);while(d.slice(0,7)===month){await api('dev/clock',{increment:1});d=(await api('dashboard')).dashboard.currentDay;}}
  await advanceToNextMonth();await page.reload();const dialog=page.locator('.sim-monthly-dialog');await dialog.waitFor({state:'visible'});
  const snapshot=(await api('dashboard')).pendingMonthlyReview;
  assert(snapshot.snapshot.insights.find(i=>i.id==='small_spends')?.body.includes('păstrai 82 lei'),'Exact small-spend what-if missing');
  const settledSubscriptionSpend=Number((await db.query("select -sum(amount_bani) as total from public.sim_ledger where run_id=$1 and category='abonamente' and day between $2 and $3",[runId,snapshot.snapshot.periodStart,snapshot.snapshot.periodEnd])).rows[0].total);
  assert(snapshot.snapshot.categoryBreakdown.find(c=>c.id==='abonamente')?.amountBani===settledSubscriptionSpend,'Subscription spend incorrect');
  assert(snapshot.snapshot.isPartial && snapshot.snapshot.daysInPeriod<31,'Partial first month not marked');
  for(const width of [320,390,430,1280]){await page.setViewportSize({width,height:width===320?568:850});assert(await page.evaluate(()=>{const d=document.querySelector('.sim-monthly-dialog');return d.scrollWidth<=d.clientWidth && document.documentElement.scrollWidth<=innerWidth;}),'Monthly panel overflow '+width);await dialog.locator('button').scrollIntoViewIfNeeded();assert(await dialog.locator('button').isVisible(),'CTA unreachable '+width);await page.screenshot({path:artifactDirectory+'/monthly-'+width+'.png',fullPage:true});}
  assert(await dialog.getByRole('img',{name:/Fini/}).count()===1,'Existing Fini missing');
  await page.keyboard.press('Escape');await page.mouse.click(1,1);assert(await dialog.isVisible(),'Escape/backdrop dismissed mandatory review');
  await dialog.locator('button').focus();await page.keyboard.press('Tab');assert(await dialog.locator('button').evaluate(e=>e===document.activeElement),'Focus escaped review');await page.keyboard.press('Shift+Tab');assert(await dialog.locator('button').evaluate(e=>e===document.activeElement),'Reverse focus escaped');
  await page.evaluate(()=>localStorage.clear());await page.reload();await dialog.waitFor({state:'visible'});assert(JSON.stringify((await api('dashboard')).pendingMonthlyReview)===JSON.stringify(snapshot),'Refresh changed snapshot');
  report.checks.push('B/C/D/H/I/J/M: close panel, stable snapshot/localStorage, mandatory focus, exact evidence, partial month, responsive 320/390/430');
  const historicalEvent=(await db.query('select id from public.sim_event_instances where run_id=$1 order by day,id limit 1',[runId])).rows[0];assert(historicalEvent,'Historical event fixture missing');
  await page.goto(origin+'/simulator/eveniment/'+historicalEvent.id);await page.waitForURL(origin+'/simulator');await dialog.waitFor({state:'visible'});assert((await api('dashboard')).pendingMonthlyReview.id===snapshot.id,'Deep link bypassed review');await page.goBack();await dialog.waitFor({state:'visible'});report.checks.push('Back and event deep-link return to the same mandatory review');
  const second=await context.newPage();await second.goto(origin+'/simulator');await second.locator('.sim-monthly-dialog').waitFor({state:'visible'});
  const laterChoice=await page.request.post(origin+'/api/simulator/subscriptions',{headers:{origin},data:{action:'create',input:{name:'Blocked',amount:'10',intervalMonths:1,nextDueOn:(await api('dashboard')).dashboard.currentDay,operationId:crypto.randomUUID()}}});assert(laterChoice.status()===409 && (await laterChoice.json()).error.code==='MONTHLY_REVIEW_REQUIRED','Server gate bypassed');
  await page.route('**/api/simulator/monthly-review',route=>route.fulfill({status:503,contentType:'application/json',body:'{}'}));await dialog.locator('button').click();await dialog.getByRole('alert').waitFor();assert(await dialog.isVisible(),'Network failure dismissed review');await page.unroute('**/api/simulator/monthly-review');
  await dialog.locator('button').click();await dialog.waitFor({state:'hidden'});await page.reload();assert(await dialog.count()===0,'Acknowledged review reappeared');await second.reload();assert(await second.locator('.sim-monthly-dialog').count()===0,'Other device did not see acknowledgment');await second.close();
  report.checks.push('E/F: acknowledgment persists, cross-device sync, retry retains review, mutation blocked');
  for(let i=0;i<4;i++){
    if(i<2){const currentDay=(await api('dashboard')).dashboard.currentDay;await db.query("insert into public.sim_ledger(run_id,user_id,day,sequence,kind,category,amount_bani,label,ref_key,auto_resolved) values($1,$2,$3,6100,'eveniment','iesiri',$4,'QA social choice',$5,false)",[runId,userId,currentDay,i===0?-10000:-1000,'qa:comparison:'+i]);}
    await api('dev/clock',{increment:30});
  }
  for(let i=0;i<20;i++){const d=await api('dashboard');if(d.events.caughtUp)break;}
  const stored=(await db.query('select snapshot from public.sim_monthly_reviews where run_id=$1 order by month_key',[runId])).rows.map(r=>r.snapshot);
  assert(stored.some(r=>!r.isPartial && r.insights.some(i=>i.id==='month_change')),'Full-month comparison missing');report.checks.push('L: discrete actual category comparison between full months');
  let pending=(await api('dashboard')).pendingMonthlyReviewCount;assert(pending>=3,'Missed months lost');await page.reload();
  let previousMonth='';while(pending>0){await dialog.waitFor({state:'visible'});const d=await api('dashboard');assert(d.pendingMonthlyReview.snapshot.monthKey>previousMonth,'Review order not chronological');previousMonth=d.pendingMonthlyReview.snapshot.monthKey;const oldHeading=await dialog.locator('h1').textContent();await dialog.locator('button').click();await page.waitForFunction(id=>document.querySelector('.sim-monthly-dialog h1')?.textContent!==id,oldHeading);pending=(await api('dashboard')).pendingMonthlyReviewCount;}
  assert(await dialog.count()===0,'Panel left over after final review');await page.getByRole('heading',{name:'Evenimentele de azi'}).waitFor();assert(await page.locator('.sim-upcoming').getByRole('button',{name:'Calendar',exact:true}).isEnabled(),'Chapter 5 dashboard unusable after ack');
  report.checks.push('G: multi-month catch-up behind gate, chronological single panels, normal events/calendar restored');
  await page.goto(origin+'/simulator/dev');await page.getByRole('button',{name:'Inspectează lunile încheiate / snapshot / insights',exact:true}).click();await page.waitForFunction(()=>document.querySelector('pre')?.textContent.includes('storedSnapshot'));report.checks.push('Dev diagnostics stored snapshot and source rebuild');
  const current=await api('state'),b=[...users.values()][1].user,previousDate=new Date(current.effectiveDay+'T12:00:00Z');previousDate.setUTCDate(0);const start=previousDate.toISOString().slice(0,10),emptyRun={...current.run,id:crypto.randomUUID(),userId:b.id,startedOn:start,lastSettledOn:null};
  const initialEntry={runId:emptyRun.id,userId:b.id,day:start,sequence:100,kind:'ajustare',category:'venit',amountBani:emptyRun.configSnapshot.startingBalanceBani,label:'Sold inițial (exemplu)',refKey:emptyRun.id+':'+start+':start:balance',autoResolved:false};
  await db.query('select public.start_simulator_run($1,$2::jsonb,$3::jsonb)',[b.id,JSON.stringify(emptyRun),JSON.stringify([initialEntry])]);
  const fallbackContext=await browser.newContext();await fallbackContext.addCookies((await context.cookies()).filter(c=>c.name.startsWith('finly_sim_dev')));page=await fallbackContext.newPage();page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(origin+'/autentificare');await page.waitForFunction(()=>{const f=document.querySelector('form');return f&&Object.keys(f).some(k=>k.startsWith('__reactProps'));});await page.getByLabel('Email',{exact:true}).fill('simulator_b@finly.test');await page.getByLabel('Parolă',{exact:true}).fill('localtestpass');await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
  await page.goto(origin+'/simulator');const fallbackDialog=page.locator('.sim-monthly-dialog');await fallbackDialog.waitFor({state:'visible'});await fallbackDialog.getByText('Asta a fost luna ta. Continuăm.',{exact:true}).waitFor();assert((await api('dashboard')).pendingMonthlyReview.snapshot.insights.length===0,'Empty month produced fake insights');await fallbackDialog.locator('button').click();await fallbackDialog.waitFor({state:'hidden'});report.checks.push('K: genuine low-data historical month falls back and acknowledgment works');
  assert(report.errors.length===0 && report.providerErrors.length===0,JSON.stringify(report));fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));console.log('PASS: '+report.checks.length+' Chapter 7 browser flows.');
`;
source+=base.slice(base.lastIndexOf('} catch(error)')).replace("} catch(error){", "} catch(error){ if(page){report.failureUrl=page.url();report.failureText=(await page.locator('body').innerText()).slice(0,2500);await page.screenshot({path:artifactDirectory+'/failure.png',fullPage:true}).catch(()=>{});}");
fs.mkdirSync('artifacts/simulator-chapter-seven',{recursive:true});
const runner=path.resolve('artifacts/simulator-chapter-seven/browser-runner.mjs');
fs.writeFileSync(runner,source);
await import(pathToFileURL(runner).href);
