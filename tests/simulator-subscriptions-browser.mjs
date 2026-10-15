// Optional browser regression: real Next + Supabase SDK + PostgreSQL migration.
// Auth HTTP is simulated locally; no real email, credentials or remote DB is used.
// Run in an isolated project copy: node tests/simulator-browser.mjs
import fs from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { PGlite } from '@electric-sql/pglite';
const playwrightPath = process.argv.slice(2).find(arg=>!arg.startsWith('--')) || 'file:///C:/Users/Fabian/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs';
const { chromium } = await import(playwrightPath);
const lifeMode=process.argv.includes('--life');
const artifactDirectory=lifeMode?'artifacts/simulator-chapter-six/browser':'artifacts/simulator-chapter-five-qa';
const origin = 'http://127.0.0.1:3145', provider = 'http://127.0.0.1:3146';
const db = new PGlite(), users = new Map();
let next, browser, page;
const report = { mode: 'real Next/SDK/PostgreSQL; simulated local Auth; no remote migration', checks: [], errors: [], providerErrors: [] };
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const json = (res, value, status = 200) => { res.writeHead(status, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); };
const token = user => `${Buffer.from('{"alg":"HS256","typ":"JWT"}').toString('base64url')}.${Buffer.from(JSON.stringify({ sub: user.id, exp: Math.floor(Date.now() / 1000) + 3600, iat: Math.floor(Date.now() / 1000), role: 'authenticated', aud: 'authenticated' })).toString('base64url')}.local-test-signature`;
const session = user => ({ access_token: token(user), refresh_token: user.id, expires_in: 3600, token_type: 'bearer', user });
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, provider); let text = ''; for await (const chunk of req) text += chunk;
    const body = text ? JSON.parse(text) : {};
    if (url.pathname.startsWith('/rest/v1/rpc/')) {
      const rpc = url.pathname.split('/').at(-1);
      const calls = {
        read_account_progress: ['select public.read_account_progress($1) as result', [body.p_user]],
        apply_progress_mutation: ['select public.apply_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8) as result', [body.p_user, body.p_operation, body.p_type, body.p_revision, JSON.stringify(body.p_state), JSON.stringify(body.p_result), body.p_streak, body.p_longest]],
        upgrade_simulator_life: ['select public.upgrade_simulator_life($1,$2,$3,$4,$5,$6,$7::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,body.p_now,body.p_development,JSON.stringify(body.p_policy)]],
        activate_simulator_events: ['select public.activate_simulator_events($1,$2,$3,$4::jsonb) as result', [body.p_user,body.p_run,body.p_expected,JSON.stringify(body.p_engine)]],
        commit_simulator_events: ['select public.commit_simulator_events($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8::jsonb,$9::jsonb,$10,$11,$12::jsonb,$13::jsonb) as result', [body.p_user,body.p_run,body.p_expected,body.p_settled,body.p_through,JSON.stringify(body.p_engine),JSON.stringify(body.p_days),JSON.stringify(body.p_instances),JSON.stringify(body.p_entries),body.p_now,body.p_development,JSON.stringify(body.p_operations ?? []),JSON.stringify(body.p_subscriptions ?? [])]],
        mutate_simulator_subscription: ['select public.mutate_simulator_subscription($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,body.p_now,body.p_development,body.p_action,body.p_operation,JSON.stringify(body.p_subscription),JSON.stringify(body.p_entries)]],
        read_simulator_state: ['select public.read_simulator_state($1) as result', [body.p_user]],
        start_simulator_run: ['select public.start_simulator_run($1,$2::jsonb,$3::jsonb) as result', [body.p_user, JSON.stringify(body.p_run), JSON.stringify(body.p_entries)]],
        apply_simulator_settlement: ['select public.apply_simulator_settlement($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7) as result', [body.p_user, body.p_run, body.p_expected, body.p_through, JSON.stringify(body.p_entries),JSON.stringify(body.p_subscriptions ?? []),body.p_revision ?? null]],
      };
      assert(calls[rpc], `Unexpected RPC ${rpc}`);
      const result = await db.query(...calls[rpc]);
      return json(res, result.rows[0]?.result ?? null);
    }
    if (url.pathname === '/rest/v1/sim_runs' && req.method === 'DELETE') {
      const filter = url.searchParams.get('user_id'); assert(filter?.startsWith('eq.'), 'Reset without owner filter');
      await db.query('delete from public.sim_runs where user_id=$1', [filter.slice(3)]);
      res.writeHead(204); return res.end();
    }
    if (url.pathname.endsWith('/token')) {
      const entry = url.searchParams.get('grant_type') === 'refresh_token' ? users.get(body.refresh_token) : [...users.values()].find(e => e.user.email === body.email && e.password === body.password);
      return entry ? json(res, session(entry.user)) : json(res, { msg: 'Invalid login credentials' }, 400);
    }
    if (url.pathname.endsWith('/user')) {
      const jwt = req.headers.authorization?.replace('Bearer ', '');
      const id = jwt ? JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString()).sub : null;
      return users.has(id) ? json(res, users.get(id).user) : json(res, { msg: 'Invalid session' }, 401);
    }
    if (url.pathname.endsWith('/logout')) { res.writeHead(204); return res.end(); }
    return json(res, {});
  } catch (error) { report.providerErrors.push(error.message); return json(res, { code: 'LOCAL_QA_ERROR', message: 'Local QA provider failure' }, 400); }
});
async function checkEventsSlot(label) {
  for (const width of [320, 390, 430, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const layout = await page.evaluate(() => {
      const rect = (selector) => { const r = document.querySelector(selector).getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, width: r.width }; };
      const style = getComputedStyle(document.querySelector('.sim-events'));
      return { events: rect('.sim-events'), balance: rect('.sim-balance'), upcoming: rect('.sim-upcoming'), journal: rect('.sim-journal'), count: document.querySelectorAll('.sim-events').length, column: style.gridColumnStart, row: style.gridRowStart, overflow: document.documentElement.scrollWidth > innerWidth };
    });
    assert(layout.count === 1 && !layout.overflow, `${label}: duplicate/overflow at ${width}`);
    assert(layout.events.top >= layout.balance.bottom && layout.events.bottom <= layout.journal.top, `${label}: events outside former monthly slot at ${width}`);
    if (width >= 900) assert(layout.column === '1' && layout.row === '2' && layout.events.left === layout.balance.left && Math.abs(layout.events.width - layout.balance.width) < 1, `${label}: desktop monthly slot mismatch`);
    else assert(layout.events.top >= layout.upcoming.bottom, `${label}: mobile semantic order changed`);
    await page.screenshot({ path: `${artifactDirectory}/${label}-${width}.png`, fullPage: true, animations: 'disabled' });
  }
  report.checks.push(`${label}: one Events section in former monthly slot at 320/390/430/1280`);
}
async function api(path = 'state', body) {
  const response = body === undefined ? await page.request.get(`${origin}/api/simulator/${path}`) : await page.request.post(`${origin}/api/simulator/${path}`, { data: body, headers: { origin } });
  assert(response.ok(), `API ${path}: ${response.status()} ${await response.text()}`);
  return response.json();
}

try {
  fs.mkdirSync(artifactDirectory, { recursive: true });
  await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;");
  for (const migration of ['0001_accounts_and_progress.sql', '0002_username_check.sql', '0003_simulator_foundation.sql','0004_simulator_events.sql','0005_simulator_consequences.sql','0006_simulator_subscriptions.sql','0007_simulator_life_catalog.sql']) await db.exec(fs.readFileSync(`supabase/migrations/${migration}`, 'utf8'));
  for (const name of ['a', 'b']) {
    const metadata = { username: `simulator_test_${name}`, age_range: '18-19', terms: true, privacy: true, terms_version: '2026-10-draft', privacy_version: '2026-10-draft' };
    const user = { id: crypto.randomUUID(), email: `simulator_${name}@finly.test`, aud: 'authenticated', role: 'authenticated', created_at: new Date().toISOString(), app_metadata: { provider: 'email' }, user_metadata: metadata };
    await db.query('insert into auth.users values($1,$2::jsonb)', [user.id, JSON.stringify(metadata)]); users.set(user.id, { user, password: 'localtestpass' });
  }
  await new Promise(resolve => server.listen(3146, '127.0.0.1', resolve));
  next = spawn(process.execPath, ['--use-system-ca', 'node_modules/next/dist/bin/next', 'dev', ...(lifeMode?[]:['--webpack']), '--hostname', '127.0.0.1', '--port', '3145'], { env: { ...process.env, NEXT_PUBLIC_SUPABASE_URL: provider, NEXT_PUBLIC_SUPABASE_ANON_KEY: 'local-qa-anon', SUPABASE_SERVICE_ROLE_KEY: 'local-qa-service', NEXT_PUBLIC_APP_URL: origin }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  const log = fs.createWriteStream(`${artifactDirectory}/next.log`); next.stdout.pipe(log); next.stderr.pipe(log);
  let ready = false;
  for (let i = 0; i < 100; i++) { if (next.exitCode !== null) throw new Error('Next stopped'); try { if ((await fetch(origin + '/bun-venit')).ok) { ready = true; break; } } catch {} await new Promise(resolve => setTimeout(resolve, 500)); }
  assert(ready, 'Next did not start');
  browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--disable-gpu'] });
  const context = await browser.newContext(); await context.addInitScript(() => { Object.defineProperty(globalThis.crypto, 'randomUUID', { value: undefined, configurable: true }); }); page = await context.newPage(); page.setDefaultNavigationTimeout(120000); page.setDefaultTimeout(30000); page.on('pageerror', e => report.errors.push(e.message));
  await page.goto(origin + '/simulator/dev'); assert(new URL(page.url()).pathname === '/bun-venit', 'Anonymous dev page not guarded');
  assert((await page.request.get(origin + '/api/simulator/state')).status() === 401, 'Anonymous simulator API not 401');
  await page.goto(origin + '/autentificare'); await page.waitForFunction(() => { const form = document.querySelector('form'); return form && Object.keys(form).some(key => key.startsWith('__reactProps')); }); await page.getByLabel('Email', { exact: true }).fill('simulator_a@finly.test'); await page.getByLabel('Parolă', { exact: true }).fill('localtestpass'); await page.getByRole('button', { name: 'Conectează-te', exact: true }).click(); await page.getByRole('heading', { name: 'Ce învățăm azi?' }).waitFor();
  await page.goto(origin + '/simulator/dev'); await page.getByRole('heading', { name: 'Simulator — development' }).waitFor();
  await page.goto(origin + '/simulator');
  await page.getByRole('heading', { name: 'Începe viața pe cont propriu' }).waitFor();
  assert(await page.getByRole('group', { name: 'Cum locuiești?' }).count() === 1, 'Housing absent in setup');
  assert(await page.getByRole('group', { name: 'Cum arată ziua ta de obicei?' }).count() === 1, 'Schedule absent in setup');
  await page.getByRole('radio', { name: /^Sunt la liceu/ }).check();
  await page.getByRole('button', { name: 'Începe simularea', exact: true }).click();
  await page.getByRole('heading', { name: 'Evenimentele de azi' }).waitFor();
  assert(await page.getByText('Luna aceasta',{exact:true}).count()===0,'Monthly summary still visible');
  report.checks.push('Login, schedule setup, Chapter 2 dashboard retained, monthly card replaced');
  await checkEventsSlot('new-run');
  assert(await page.getByText('Cum arată ziua ta de obicei?', {exact:true}).count() === 0, 'Picker persists after setup');
  const first = await api('dashboard');
  assert(first.events.profile==='liceu','Profile not saved');
  await api('dev/consequences',{scenario:'phone_problem'});await api('dev/events',{minutes:15});
  const fixtureRow=(await db.query("select id from public.sim_event_instances where run_id=$1 and definition_id='dev_phone_problem'",[first.dashboard.runId])).rows[0];
  const detail=await api('events/'+fixtureRow.id);await api('events/'+fixtureRow.id,{optionId:detail.event.options.find(o=>o.costBani===0).id});
  await page.reload();await page.getByRole('heading',{name:'Acum',exact:true}).waitFor();assert(await page.evaluate(()=>document.querySelector('.sim-upcoming').nextElementSibling.classList.contains('sim-current')),'Acum moved away from Ce urmează');
  report.checks.push('Persistent Acum remains directly below Ce urmează; events keep existing layout');
  const current=first.dashboard.currentDay, selectedDate=new Date(current+'T12:00:00Z');selectedDate.setUTCDate(selectedDate.getUTCDate()+2);const due=selectedDate.toISOString().slice(0,10);
  const add=page.locator('.sim-upcoming').getByRole('button',{name:'Adaugă abonament',exact:true});
  assert(await add.count()===1,'Add outside Ce urmează');assert(await page.locator('.sim-upcoming').getByRole('button',{name:'Calendar',exact:true}).count()===1,'Calendar outside Ce urmează');
  await add.click();await page.getByRole('dialog').getByRole('heading',{name:'Adaugă abonament',exact:true}).waitFor();
  assert(await page.getByLabel('Se repetă',{exact:true}).inputValue()==='1','Default monthly missing');
  await page.getByLabel('Nume abonament',{exact:true}).fill('Abonament sală');await page.getByLabel('Cost',{exact:true}).fill('300');await page.getByLabel('Data plății',{exact:true}).fill(due);
  for(const width of [320,390,430,1280]) {await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth && document.querySelector('dialog').scrollWidth<=document.querySelector('dialog').clientWidth),`Form overflow ${width}`);await page.screenshot({path:`${artifactDirectory}/form-${width}.png`});}
  const navigationCount=await page.evaluate(()=>performance.getEntriesByType('navigation').length);
  await page.getByRole('button',{name:'Salvează abonamentul',exact:true}).click();await page.getByRole('dialog').waitFor({state:'hidden'});
  assert(await page.evaluate(()=>performance.getEntriesByType('navigation').length)===navigationCount,'Save reloaded page');assert(await page.locator('.sim-upcoming').getByText('Abonament sală',{exact:true}).count()===1,'Upcoming not immediately updated');
  let subs=(await db.query('select * from public.sim_subscriptions where run_id=$1',[first.dashboard.runId])).rows;assert(subs.length===1 && subs[0].amount_bani===30000,'Server save wrong');
  assert((await db.query("select * from public.sim_ledger where run_id=$1 and kind='abonament'",[first.dashboard.runId])).rows.length===0,'Future save wrote ledger');
  report.checks.push('Header text controls, primary form fields/default monthly, save without full refresh, immediate upcoming, no future ledger; crypto.randomUUID unavailable in browser');
  async function openCalendar(){await page.locator('.sim-upcoming').getByRole('button',{name:'Calendar',exact:true}).click();await page.locator('.sim-calendar-grid').waitFor();}
  async function selectDate(date){await page.locator('.sim-calendar-grid button').filter({has:page.locator(`span`,{hasText:new RegExp('^'+Number(date.slice(-2))+'$')})}).click();}
  await openCalendar();await selectDate(due);assert(await page.locator('.sim-selected-day').getByText('De plată',{exact:true}).count()===1,'Due status missing');assert(await page.locator('.sim-selected-day').getByText('−300 lei',{exact:true}).count()===1,'Due amount missing');
  for(const width of [320,390,430,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth && document.querySelector('dialog').scrollWidth<=document.querySelector('dialog').clientWidth),`Calendar overflow ${width}`);await page.screenshot({path:`${artifactDirectory}/calendar-${width}.png`});}
  const rowsBefore=(await db.query('select count(*) as n from public.sim_ledger')).rows[0].n;const monthResponse=page.waitForResponse(r=>r.url().includes('/api/simulator/calendar?month=2026-11'));await page.getByRole('dialog').getByRole('button',{name:'Luna următoare',exact:true}).click();assert((await monthResponse).ok(),'Next month read failed');assert((await db.query('select count(*) as n from public.sim_ledger')).rows[0].n===rowsBefore,'Future calendar writes ledger');
  await page.getByRole('button',{name:'Închide',exact:true}).click();report.checks.push('Calendar marker/selected-day detail/status, salary/fixed/subscriptions, read-only future month, 320/390/430/1280');
  await api('dashboard');await api('dev/events',{minutes:1440});await api('dev/events',{minutes:1440});await api('dashboard');await page.reload();await page.getByRole('heading',{name:'Evenimentele de azi',exact:true}).waitFor();await openCalendar();await selectDate(due);assert(await page.locator('.sim-selected-day').getByText('Plătit',{exact:true}).count()===1,'Paid status missing');await page.getByRole('button',{name:'Închide',exact:true}).click();
  assert(await page.locator('.sim-journal').getByText('Abonament · Abonament sală',{exact:true}).count()===1,'Journal missing payment');await Promise.all([api('dashboard'),api('dashboard')]);assert((await db.query("select * from public.sim_ledger where run_id=$1 and kind='abonament'",[first.dashboard.runId])).rows.length===1,'Duplicate settlement');
  report.checks.push('Dev date advance changes De plată to Plătit; one real journal/ledger transaction on concurrent refresh');
  await openCalendar();await page.getByRole('button',{name:'Editează',exact:true}).click();await page.getByLabel('Nume abonament',{exact:true}).fill('Telefon');await page.getByLabel('Cost',{exact:true}).fill('350,50');await page.getByRole('button',{name:'Salvează modificările',exact:true}).click();await page.getByRole('dialog').waitFor({state:'hidden'});assert((await db.query("select label,amount_bani from public.sim_ledger where run_id=$1 and kind='abonament'",[first.dashboard.runId])).rows[0].amount_bani===-30000,'Edit rewrote history');
  await openCalendar();assert(await page.locator('.sim-subscription-management').getByText('Telefon',{exact:true}).count()===1,'Edited management missing');page.once('dialog',d=>d.accept());await page.getByRole('button',{name:'Anulează abonamentul',exact:true}).click();await page.getByRole('dialog').waitFor({state:'hidden'});assert((await db.query('select status from public.sim_subscriptions where run_id=$1',[first.dashboard.runId])).rows[0].status==='cancelled','Cancel not persisted');report.checks.push('Edit name/decimal price, preserve history, cancel through management');
  await add.click();await page.getByLabel('Nume abonament',{exact:true}).fill('A'.repeat(60));await page.getByLabel('Cost',{exact:true}).fill('20000000');await page.getByLabel('Data plății',{exact:true}).fill((await api('dashboard')).dashboard.currentDay);assert(await page.getByText('Prima plată este astăzi și va fi înregistrată imediat după salvare.',{exact:false}).count()===1,'Today warning missing');assert(await page.getByText('Plata de astăzi poate duce soldul sub 0 lei.',{exact:false}).count()===1,'Negative warning missing');
  await page.getByRole('button',{name:'Salvează abonamentul',exact:true}).click();await page.getByRole('dialog').waitFor({state:'hidden'});await openCalendar();for(const width of [320,390,430]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth && document.querySelector('dialog').scrollWidth<=document.querySelector('dialog').clientWidth),`Long name/large amount overflow ${width}`);}await page.getByRole('button',{name:'Închide',exact:true}).click();report.checks.push('Today/negative warnings, automatic negative payment, long 60-character name and large amount responsive');
  const second=await context.newPage();await second.setViewportSize({width:390,height:900});await second.goto(origin+'/simulator');await second.getByRole('heading',{name:'Simulator',exact:true}).waitFor();await second.locator('.sim-upcoming').getByRole('button',{name:'Calendar',exact:true}).click();await second.locator('.sim-calendar-grid').waitFor();assert(await second.locator('.sim-subscription-management').getByText('A'.repeat(60),{exact:true}).count()===1,'Second device missing subscription');await second.close();report.checks.push('New browser page/device reads identical persisted subscription');
  await context.clearCookies();await page.goto(origin+'/simulator');assert(new URL(page.url()).pathname==='/bun-venit','Logout redirect absent');await page.goto(origin+'/autentificare');await page.waitForFunction(()=>{const form=document.querySelector('form');return form&&Object.keys(form).some(k=>k.startsWith('__reactProps'));});await page.getByLabel('Email',{exact:true}).fill('simulator_a@finly.test');await page.getByLabel('Parolă',{exact:true}).fill('localtestpass');await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();assert((await api('calendar')).subscriptions.length===2,'Login persistence missing');report.checks.push('Logout/login preserves subscriptions');
  await page.goto(origin+'/simulator/dev');await page.getByRole('button',{name:'Inspectează abonamentele și plățile',exact:true}).click();await page.waitForFunction(()=>document.querySelector('pre')?.textContent.includes('projected'));report.checks.push('Dev inspection shows identity/anchor/revision/projections/actual payments');
  const anonymous=await browser.newContext();const anonPage=await anonymous.newPage();for(const [path,body] of [['calendar'],['subscriptions',{action:'create',input:{}}]]){const response=body?await anonPage.request.post(origin+'/api/simulator/'+path,{data:body,headers:{origin}}):await anonPage.request.get(origin+'/api/simulator/'+path);assert(response.status()===401,'Private subscription API anonymous access');}await anonymous.close();report.checks.push('Calendar/create unauthenticated 401');
  if(lifeMode){
    const saved=(await db.query('select event_catalog_version,event_policy_version,event_policy_snapshot from public.sim_runs where id=$1',[first.dashboard.runId])).rows[0];
    assert(saved.event_catalog_version===2 && saved.event_policy_version===2,'Dashboard did not activate v2');
    for(const profile of ['liceu','lucrez']){
      const result=await api(`dev/life?day=2026-10-01&profile=${profile}&seed=finly-life-${profile}&days=90`);
      assert(result.catalog.definitions===200 && result.simulation.quietDays>0 && result.simulation.busyDays>0,'Life diagnostics missing');
      assert(result.selectedDay.rejected.length>0 && result.catalog.stateful>=30,'Diagnostics incomplete');
      await page.getByRole('button',{name:`Raport 90 zile — ${profile==='liceu'?'Liceu':'Lucrez'}`,exact:true}).click();
      await page.waitForFunction(profile=>document.querySelector('pre')?.textContent.includes(`"profile": "${profile}"`),profile);
    }
    report.checks.push('V2 activation, 200-definition dev catalog, Liceu/Lucrez 90-day reports and candidate rejection diagnostics');
    await api('dev/events',{minutes:10080});
    const snapshotBefore=(await db.query('select id,snapshot from public.sim_event_instances where run_id=$1 order by id',[first.dashboard.runId])).rows;
    await Promise.all([api('dashboard'),api('dashboard')]);
    const snapshotAfter=(await db.query('select id,snapshot from public.sim_event_instances where run_id=$1 order by id',[first.dashboard.runId])).rows;
    assert(JSON.stringify(snapshotBefore)===JSON.stringify(snapshotAfter),'Refresh rerolled snapshots');
    const financial=await api('calendar');assert(financial.days.every(d=>d.items.every(i=>['salary','fixed_expense','subscription'].includes(i.sourceType))),'Calendar leaked life events');
    report.checks.push('Seven-day catch-up, cross-tab stable plans/prices, no random events in financial calendar');
    // Local UI fixtures exercise the same generic renderer at all supported sizes.
    const source=(await db.query('select * from public.sim_event_instances where run_id=$1 order by day desc,scheduled_at desc limit 1',[first.dashboard.runId])).rows[0];
    assert(source,'Missing event fixture source');
    const clockData=await api('dev/events'),at=clockData.effectiveTime,currentDay=(await api('dashboard')).dashboard.currentDay;
    for(const count of [2,3,4]){
      const id=crypto.randomUUID(),snapshot=structuredClone(source.snapshot);
      snapshot.title='O situație cotidiană cu un titlu mai lung pentru verificarea afișării';
      snapshot.description='Grupul propune o activitate. Poți participa sau poți alege o variantă fără o plată nouă.';
      const fallback=snapshot.options.find(o=>o.fallbackWhenUnaffordable),paid={...snapshot.options[0],id:'ui_paid',label:'Varianta plătită',costBani:1000,durationMinutes:0,state:undefined,consequences:undefined};
      snapshot.options=[paid,...Array.from({length:count-2},(_,i)=>({...paid,id:`ui_extra_${i}`,label:`Alternativa ${i+1}`,costBani:0,state:i===0?{requiredFlags:['unknown_ui_flag']}:undefined})),{...fallback,id:'ui_free',state:undefined,consequences:undefined}];delete snapshot.relevance;
      await db.query("insert into public.sim_event_instances(id,run_id,user_id,day,definition_id,definition_version,family_id,variation_id,scheduled_at,expires_at,snapshot_version,snapshot,generation_key,created_at,status) values($1,$2,$3,$4,'dev_life_ui',1,'dev_life_ui',$5,$6,$7,1,$8::jsonb,$9,$6,'pending')",[id,first.dashboard.runId,[...users.values()][0].user.id,currentDay,snapshot.variationId,at,new Date(Date.parse(at)+86400000).toISOString(),JSON.stringify(snapshot),`dev-life-ui-${count}`]);
      await page.goto(`${origin}/simulator/eveniment/${id}`);await page.getByRole('heading',{name:snapshot.title,exact:true}).waitFor();
      for(const width of [320,390,430]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Event ${count}-option overflow ${width}`);await page.screenshot({path:`${artifactDirectory}/event-${count}-${width}.png`,fullPage:true});}
      const detail=await api('events/'+id);assert(detail.event.options.length===count,'Generic option count mismatch');assert(detail.event.options.find(o=>o.id==='ui_paid').unavailableReason==='insufficient_funds','Latest negative balance not checked');if(count>2)assert(detail.event.options.find(o=>o.id==='ui_extra_0').unavailableReason==='state_changed','State-gated option available incorrectly');
    }
    report.checks.push('Generic event detail handles 2/3/4 options, long title, free and unavailable choices at 320/390/430');
    await page.goto(origin+'/simulator');await page.getByRole('heading',{name:'Evenimentele de azi'}).waitFor();await checkEventsSlot('life-v2');
    const response=await page.request.get(origin+'/api/simulator/dev/life?day=bad');assert(response.status()===400,'Malformed diagnostic day accepted');
    report.checks.push('Dashboard layout after life catch-up and strict dev query validation');
  }
  assert(report.errors.length===0 && report.providerErrors.length===0,JSON.stringify(report));fs.writeFileSync(`${artifactDirectory}/report.json`,JSON.stringify(report,null,2));console.log(`PASS: ${report.checks.length} browser flows; real Next/SDK/Postgres, local simulated Auth.`);
} catch(error){fs.writeFileSync(`${artifactDirectory}/report.json`,JSON.stringify({...report,failure:error.message},null,2));throw error;}
finally{
 await browser?.close();if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});server.closeAllConnections();if(server.listening)await new Promise(resolve=>server.close(resolve));await db.close();
}
