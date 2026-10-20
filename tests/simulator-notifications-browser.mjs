// Existing real Next/Auth SDK/PGlite browser harness, extended only for Chapter 8.
// Run in an isolated project copy. No remote credentials, migration or deployment.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const base = fs.readFileSync('tests/simulator-subscriptions-browser.mjs', 'utf8');
let source = base.slice(0, base.indexOf("  await checkEventsSlot('new-run');"));
source = source.replace("import { PGlite } from '@electric-sql/pglite';", "import { PGlite } from '@electric-sql/pglite';\nimport { notificationDbFixture } from '../../tests/notification-db-fixture.ts';");
source = source.replace("import fs from 'node:fs';", "import fs from 'node:fs';\nimport webPush from 'web-push';\nconst testVapid=webPush.generateVAPIDKeys();");
source = source.replace("const artifactDirectory=lifeMode?'artifacts/simulator-chapter-six/browser':'artifacts/simulator-chapter-five-qa';", "const artifactDirectory='artifacts/simulator-chapter-eight/browser';");
source = source.replaceAll('3145', '3155').replaceAll('3146', '3156');
source = source.replace("'0007_simulator_life_catalog.sql']", "'0007_simulator_life_catalog.sql','0008_simulator_monthly_reviews.sql','0009_simulator_notifications.sql']");
source = source.replace("        read_simulator_state:", `        finalize_simulator_month: ['select public.finalize_simulator_month($1,$2,$3,$4,$5::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,JSON.stringify(body.p_snapshot)]],
        acknowledge_simulator_month: ['select public.acknowledge_simulator_month($1,$2,$3,$4) as result',[body.p_user,body.p_run,body.p_review,body.p_operation]],
        claim_notification_users: ['select public.claim_notification_users($1,$2,$3) as result',[body.p_token,body.p_limit,body.p_user??null]],
        read_simulator_state:`);
source = source.replace("return json(res, result.rows[0]?.result ?? null);", "return json(res, rpc==='claim_notification_users'?result.rows.map(r=>r.result):result.rows[0]?.result ?? null);");
source = source.replace("    if (url.pathname === '/rest/v1/sim_runs'", String.raw`
    if (['sim_notifications','sim_notification_preferences','sim_push_subscriptions','sim_notification_deliveries'].includes(url.pathname.split('/').at(-1))) {
      const table=url.pathname.split('/').at(-1), adapter=notificationDbFixture(()=>db); let query=adapter.from(table);
      if(req.method==='POST')query=query.upsert(body,{onConflict:url.searchParams.get('on_conflict')??'id',ignoreDuplicates:req.headers.prefer?.includes('ignore-duplicates')});
      if(req.method==='PATCH')query=query.update(body);
      query=query.select(url.searchParams.get('select')??'*',{count:req.headers.prefer?.includes('count=exact')?'exact':undefined,head:req.method==='HEAD'});
      for(const [key,value] of url.searchParams){if(['select','order','limit','on_conflict'].includes(key))continue;const at=value.indexOf('.'),op=value.slice(0,at),arg=value.slice(at+1);if(op==='eq')query=query.eq(key,['true','false'].includes(arg)?arg==='true':arg);else if(op==='is')query=query.is(key,null);else if(op==='lte')query=query.lte(key,arg);else if(op==='gte')query=query.gte(key,arg);else if(op==='in')query=query.in(key,arg.slice(1,-1).split(','));else throw Error('Unsupported fixture filter '+op);}
      const order=url.searchParams.get('order');if(order)for(const value of order.split(',')){const [key,direction]=value.split('.');query=query.order(key,{ascending:direction!=='desc'});}
      if(url.searchParams.has('limit'))query=query.limit(Number(url.searchParams.get('limit')));
      const object=req.headers.accept?.includes('vnd.pgrst.object');if(object)query=query.maybeSingle();
      const result=await query;if(result.error)throw result.error;
      if(req.method==='HEAD'){res.writeHead(200,{'Content-Range':'0-0/'+result.count});return res.end();}
      return json(res,result.data);
    }
    if (url.pathname === '/rest/v1/sim_runs'`);
source = source.replace("NEXT_PUBLIC_APP_URL: origin", "NEXT_PUBLIC_APP_URL: origin, NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY:testVapid.publicKey, WEB_PUSH_VAPID_PRIVATE_KEY:testVapid.privateKey, WEB_PUSH_VAPID_SUBJECT:'https://finly.test', CRON_SECRET:'local-notification-cron'");
source += String.raw`
  const userId=[...users.values()][0].user.id;
  const notification=async(path='',body)=>{const response=body===undefined?await page.request.get(origin+'/api/notifications'+path):await page.request.post(origin+'/api/notifications'+path,{headers:{origin},data:body});assert(response.ok(),'Notification API '+path+': '+response.status()+' '+await response.text());return response.json();};
  await api('dev/notifications',{action:'test'});
  await page.reload();await page.getByRole('heading',{name:'SimLife',exact:true}).waitFor();
  const bell=page.getByRole('button',{name:/^Notificări/});await bell.waitFor();
  assert((await notification()).unread>0,'Unread count did not persist');
  for(const width of [320,390,430,1280]){
    await page.setViewportSize({width,height:850});await bell.click();await page.locator('.notification-inbox').waitFor({state:'visible'});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.querySelector('.notification-inbox').scrollWidth<=document.querySelector('.notification-inbox').clientWidth),'Inbox overflow '+width);
    await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('.notification-inbox').contains(document.activeElement)),'Dialog focus escaped');
    await page.screenshot({path:artifactDirectory+'/inbox-'+width+'.png'});await page.keyboard.press('Escape');await page.locator('.notification-inbox').waitFor({state:'hidden'});assert(await bell.evaluate(e=>e===document.activeElement),'Bell focus not restored');
  }
  await bell.click();
  const readResponse=page.waitForResponse(r=>r.url()===origin+'/api/notifications'&&r.request().method()==='POST');
  await page.getByRole('button',{name:'Marchează toate ca citite'}).click();assert((await readResponse).ok(),'Read mutation was not acknowledged by server');
  await page.waitForFunction(()=>document.querySelector('.notification-bell')?.getAttribute('aria-label')==='Notificări');
  await page.getByRole('button',{name:'Închide notificările'}).click();await page.reload();await bell.waitFor();assert((await notification()).unread===0,'Read state lost on refresh after confirmed server acknowledgment');
  report.checks.push('Bell / server unread / bounded inbox / mark-all idempotent / keyboard focus / 320,390,430,1280');
  let calls=0;page.on('request',r=>{if(r.url().includes('/api/simulator/dashboard'))calls++;});
  await page.evaluate(()=>{window.dispatchEvent(new Event('pageshow'));window.dispatchEvent(new Event('online'));document.dispatchEvent(new Event('visibilitychange'));});
  await page.waitForTimeout(2000);assert(calls<=1,'Lifecycle request storm '+calls);report.checks.push('pageshow + reconnect + visibility share bounded canonical sync');
  await page.route('**/api/notifications/preferences',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({preferences:{push_enabled:false,events_push_enabled:true,payments_push_enabled:true,monthly_review_push_enabled:true,quiet_hours_enabled:true},configured:false})}));
  await page.goto(origin+'/?tab=profile');await page.getByRole('heading',{name:'Notificări',exact:true}).waitFor();assert(await page.getByText('Push nu este încă configurat.',{exact:false}).count()===1,'Missing VAPID state absent');
  for(const width of [320,390,430]){await page.setViewportSize({width,height:850});await page.locator('.notification-settings').scrollIntoViewIfNeeded();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Settings overflow '+width);await page.screenshot({path:artifactDirectory+'/settings-'+width+'.png'});}
  await page.unrouteAll({behavior:'wait'});
  // Browser permission/subscription are fixtures; registration writes actual local PostgreSQL.
  await page.addInitScript(()=>{
    window.__permissionCalls=0;window.__unsubscribed=false;
    Object.defineProperty(Notification,'permission',{value:'default',configurable:true});Notification.requestPermission=()=>{window.__permissionCalls++;return Promise.resolve('granted');};
    const sub={endpoint:'https://fcm.googleapis.com/fcm/send/finly-browser-qa',toJSON:()=>({endpoint:'https://fcm.googleapis.com/fcm/send/finly-browser-qa',expirationTime:null,keys:{p256dh:'A'.repeat(87),auth:'B'.repeat(22)}}),unsubscribe:async()=>{window.__unsubscribed=true;return true;}};
    const registration={pushManager:{getSubscription:async()=>sub},getNotifications:async()=>[]};
    navigator.serviceWorker.register=async()=>registration;navigator.serviceWorker.getRegistration=async()=>registration;Object.defineProperty(navigator.serviceWorker,'ready',{value:Promise.resolve(registration),configurable:true});
  });
  await page.reload();await page.getByRole('button',{name:'Activează notificările',exact:true}).waitFor();assert(await page.evaluate(()=>window.__permissionCalls)===0,'Automatic permission prompt');
  await page.getByRole('button',{name:'Activează notificările',exact:true}).click();await page.getByText('Notificările push sunt activate pe acest dispozitiv.',{exact:true}).waitFor();assert(await page.evaluate(()=>window.__permissionCalls)===1,'Permission not requested from gesture');
  await page.reload();await page.getByRole('button',{name:'Activează notificările pe acest dispozitiv',exact:true}).click();await page.getByText('Notificările push sunt activate pe acest dispozitiv.',{exact:true}).waitFor();
  assert((await db.query('select * from sim_push_subscriptions where user_id=$1',[userId])).rows.length===1,'Endpoint duplicated on refresh');
  await page.getByRole('checkbox',{name:'Notificări push',exact:true}).uncheck();await page.waitForFunction(()=>window.__unsubscribed);assert((await db.query('select push_enabled from sim_notification_preferences where user_id=$1',[userId])).rows[0].push_enabled===false,'Master toggle not persisted');
  report.checks.push('Gesture-only granted permission / actual endpoint registration / refresh dedup / toggle-off unsubscribe; browser PushManager fixture');
  const insecure=await browser.newContext();await insecure.addCookies(await context.cookies());await insecure.addInitScript(()=>{Object.defineProperty(window,'isSecureContext',{value:false});Object.defineProperty(crypto,'randomUUID',{value:undefined});});const lan=await insecure.newPage();lan.on('pageerror',e=>report.errors.push(e.message));await lan.goto(origin+'/?tab=profile');await lan.getByText('Notificările push nu sunt disponibile în această configurație.',{exact:false}).waitFor();await lan.goto(origin+'/simulator');await lan.getByRole('button',{name:/^Notificări/}).click();await lan.locator('.notification-inbox').waitFor({state:'visible'});await insecure.close();
  report.checks.push('Missing VAPID / insecure LAN capabilities / absent randomUUID / settings / inbox still works');
  const denied=await browser.newContext();await denied.addCookies(await context.cookies());await denied.addInitScript(()=>{Object.defineProperty(Notification,'permission',{value:'denied'});Notification.requestPermission=()=>{throw Error('Repeated denied permission prompt');};});const deniedPage=await denied.newPage();deniedPage.on('pageerror',e=>report.errors.push(e.message));await deniedPage.goto(origin+'/?tab=profile');await deniedPage.getByText('Notificările push sunt dezactivate în browser.',{exact:true}).waitFor();assert(await deniedPage.getByRole('button',{name:/Activează notificările/}).count()===0,'Denied permission asked again');await denied.close();
  const cron=await page.request.get(origin+'/api/cron/simulator-notifications');assert(cron.status()===401,'Cron is public');const authorized=await page.request.get(origin+'/api/cron/simulator-notifications',{headers:{authorization:'Bearer local-notification-cron'}});assert(authorized.ok(),'Authorized cron failed');
  const anonymous=await browser.newContext();const noSession=await anonymous.request.get(origin+'/api/notifications/push/display?id=00000000-0000-4000-8000-000000000001');assert(noSession.status()===401,'Unauthenticated push display exposed content');await anonymous.close();
  report.checks.push('Denied permission calm state / anonymous display 401 / cron secret required');
  await page.goto(origin+'/simulator');await page.getByRole('heading',{name:'SimLife',exact:true}).waitFor();await page.waitForLoadState('networkidle');
  await context.setOffline(true);await page.waitForTimeout(300);assert(await page.locator('.sim-sync-status').textContent().then(t=>t.includes('offline')),'Offline state absent');await context.setOffline(false);await page.waitForTimeout(1500);
  report.checks.push('Offline retains rendered simulator and reconnects after all development chunks finished loading');
  assert(report.errors.length===0,'Browser errors: '+report.errors.join('; '));assert(report.providerErrors.length===0,'Provider errors: '+report.providerErrors.join('; '));
  fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
} catch(error){report.failure=error.message;fs.mkdirSync(artifactDirectory,{recursive:true});fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));if(page)await page.screenshot({path:artifactDirectory+'/failure.png'}).catch(()=>{});throw error;}
finally{if(browser)await browser.close();if(next){const p=spawn('taskkill',['/PID',String(next.pid),'/T','/F'],{stdio:'ignore',windowsHide:true});await new Promise(r=>p.on('close',r));}await new Promise(r=>server.close(r));await db.close();}
`;
const runner = path.resolve('artifacts/simulator-chapter-eight/browser-runner.mjs');
fs.mkdirSync(path.dirname(runner), { recursive: true }); fs.writeFileSync(runner, source);
if (fs.existsSync('.git')) throw new Error('Run browser QA in an isolated project copy, not the working repository.');
const configFile = 'next.config.ts', originalConfig = fs.readFileSync(configFile, 'utf8');
// Isolate every Next development build; a shared node_modules junction must
// remain inside Turbopack's explicitly configured filesystem root.
fs.writeFileSync(configFile, originalConfig.replace('export default nextConfig;', `nextConfig.distDir = '.next-ch8-${Date.now()}';\nnextConfig.turbopack = { ...nextConfig.turbopack, root: ${JSON.stringify(path.dirname(process.cwd()))} };\nexport default nextConfig;`));
try { await import(pathToFileURL(runner).href); }
finally { fs.writeFileSync(configFile, originalConfig); }
