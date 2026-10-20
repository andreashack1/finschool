// Optional browser regression: real Next + Supabase SDK + PostgreSQL migration.
// Auth HTTP is simulated locally; no real email, credentials or remote DB is used.
// Run in an isolated project copy: node tests/simulator-browser.mjs
import fs from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { PGlite } from '@electric-sql/pglite';
const playwrightPath = process.argv[2] || 'file:///C:/Users/Fabian/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs';
const { chromium } = await import(playwrightPath);
const origin = 'http://127.0.0.1:3135', provider = 'http://127.0.0.1:3136';
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
        activate_simulator_events: ['select public.activate_simulator_events($1,$2,$3,$4::jsonb) as result', [body.p_user,body.p_run,body.p_expected,JSON.stringify(body.p_engine)]],
        commit_simulator_events: ['select public.commit_simulator_events($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8::jsonb,$9::jsonb,$10,$11,$12::jsonb) as result', [body.p_user,body.p_run,body.p_expected,body.p_settled,body.p_through,JSON.stringify(body.p_engine),JSON.stringify(body.p_days),JSON.stringify(body.p_instances),JSON.stringify(body.p_entries),body.p_now,body.p_development,JSON.stringify(body.p_operations ?? [])]],
        read_simulator_state: ['select public.read_simulator_state($1) as result', [body.p_user]],
        start_simulator_run: ['select public.start_simulator_run($1,$2::jsonb,$3::jsonb) as result', [body.p_user, JSON.stringify(body.p_run), JSON.stringify(body.p_entries)]],
        apply_simulator_settlement: ['select public.apply_simulator_settlement($1,$2,$3,$4,$5::jsonb) as result', [body.p_user, body.p_run, body.p_expected, body.p_through, JSON.stringify(body.p_entries)]],
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
    await page.screenshot({ path: `artifacts/simulator-events-qa/${label}-${width}.png`, fullPage: true, animations: 'disabled' });
  }
  report.checks.push(`${label}: one Events section in former monthly slot at 320/390/430/1280`);
}
async function api(path = 'state', body) {
  const response = body === undefined ? await page.request.get(`${origin}/api/simulator/${path}`) : await page.request.post(`${origin}/api/simulator/${path}`, { data: body, headers: { origin } });
  assert(response.ok(), `API ${path}: ${response.status()} ${await response.text()}`);
  return response.json();
}

try {
  fs.mkdirSync('artifacts/simulator-events-qa', { recursive: true });
  await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;");
  for (const migration of ['0001_accounts_and_progress.sql', '0002_username_check.sql', '0003_simulator_foundation.sql','0004_simulator_events.sql','0005_simulator_consequences.sql']) await db.exec(fs.readFileSync(`supabase/migrations/${migration}`, 'utf8'));
  for (const name of ['a', 'b']) {
    const metadata = { username: `simulator_test_${name}`, age_range: '18-19', terms: true, privacy: true, terms_version: '2026-10-draft', privacy_version: '2026-10-draft' };
    const user = { id: crypto.randomUUID(), email: `simulator_${name}@finly.test`, aud: 'authenticated', role: 'authenticated', created_at: new Date().toISOString(), app_metadata: { provider: 'email' }, user_metadata: metadata };
    await db.query('insert into auth.users values($1,$2::jsonb)', [user.id, JSON.stringify(metadata)]); users.set(user.id, { user, password: 'localtestpass' });
  }
  await new Promise(resolve => server.listen(3136, '127.0.0.1', resolve));
  next = spawn(process.execPath, ['--use-system-ca', 'node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3135'], { env: { ...process.env, NEXT_PUBLIC_SUPABASE_URL: provider, NEXT_PUBLIC_SUPABASE_ANON_KEY: 'local-qa-anon', SUPABASE_SERVICE_ROLE_KEY: 'local-qa-service', NEXT_PUBLIC_APP_URL: origin }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  const log = fs.createWriteStream('artifacts/simulator-events-qa/next.log'); next.stdout.pipe(log); next.stderr.pipe(log);
  let ready = false;
  for (let i = 0; i < 100; i++) { if (next.exitCode !== null) throw new Error('Next stopped'); try { if ((await fetch(origin + '/bun-venit')).ok) { ready = true; break; } } catch {} await new Promise(resolve => setTimeout(resolve, 500)); }
  assert(ready, 'Next did not start');
  browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--disable-gpu'] });
  const context = await browser.newContext(); page = await context.newPage(); page.setDefaultNavigationTimeout(120000); page.setDefaultTimeout(120000); page.on('pageerror', e => report.errors.push(e.message));
  await page.goto(origin + '/simulator/dev'); assert(new URL(page.url()).pathname === '/bun-venit', 'Anonymous dev page not guarded');
  assert((await page.request.get(origin + '/api/simulator/state')).status() === 401, 'Anonymous simulator API not 401');
  await page.goto(origin + '/autentificare'); await page.waitForFunction(() => { const form = document.querySelector('form'); return form && Object.keys(form).some(key => key.startsWith('__reactProps')); }); await page.getByLabel('Email', { exact: true }).fill('simulator_a@finly.test'); await page.getByLabel('Parolă', { exact: true }).fill('localtestpass'); await page.getByRole('button', { name: 'Conectează-te', exact: true }).click(); await page.getByRole('heading', { name: 'Ce învățăm azi?' }).waitFor();
  await page.goto(origin + '/simulator/dev'); await page.getByRole('heading', { name: 'SimLife — development' }).waitFor();
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
  const config = (await db.query('select event_policy_snapshot as policy from public.sim_runs where id=$1',[first.dashboard.runId])).rows[0].policy;
  config.routineChances.morning=1; config.routineChances.lunch=1; config.routineChances.after_program=1;
  await db.query('update public.sim_runs set event_policy_snapshot=$1::jsonb where id=$2',[JSON.stringify(config),first.dashboard.runId]);
  await api('dev/events',{minutes:1440});
  let today=await api('dashboard');
  await page.reload(); await page.getByRole('heading',{name:'Evenimentele de azi'}).waitFor();
  assert(today.events.pending.length>=2,'Expected full-day fixture events');
  const freeEvent=today.events.pending[0], free=freeEvent.options.find(o=>o.costBani===0);
  await page.getByRole('link',{name:'Vezi situația',exact:true}).first().click();
  await page.getByRole('heading',{name:freeEvent.title,exact:true}).waitFor();
  await page.getByRole('button',{name:new RegExp(free.label)}).click();
  await page.getByRole('heading',{name:'Alegerea ta',exact:true}).waitFor();
  assert((await db.query('select * from public.sim_ledger where ref_key=$1',[`${first.dashboard.runId}:event:${freeEvent.id}:cost`])).rows.length===0,'Free choice wrote ledger');
  report.checks.push('Visible event detail, free choice saves feedback without ledger');
  await page.getByRole('link',{name:'← Înapoi la simulator',exact:true}).click();
  await page.getByRole('heading',{name:'Evenimentele de azi'}).waitFor();
  today=await api('dashboard'); const paidEvent=today.events.pending[0], paid=paidEvent.options.find(o=>o.costBani>0);
  await page.goto(origin+`/simulator/eveniment/${paidEvent.id}`); await page.getByRole('heading',{name:paidEvent.title,exact:true}).waitFor();
  await page.getByRole('button',{name:new RegExp(paid.label)}).click(); await page.getByRole('button',{name:'Confirmă',exact:true}).waitFor();
  for(const width of [320,390,430]){
    await page.setViewportSize({width,height:900});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Detail overflow ${width}`);
    await page.screenshot({path:`artifacts/simulator-events-qa/confirm-${width}.png`,fullPage:true,animations:'disabled'});
  }
  await page.getByRole('button',{name:'Confirmă',exact:true}).click(); await page.getByRole('heading',{name:'Alegerea ta',exact:true}).waitFor();
  const after=await api('dashboard'); assert(after.dashboard.balanceBani===today.dashboard.balanceBani-paid.costBani,'Paid balance incorrect');
  assert((await db.query('select * from public.sim_ledger where ref_key=$1',[`${first.dashboard.runId}:event:${paidEvent.id}:cost`])).rows.length===1,'Paid ledger missing/duplicate');
  report.checks.push('Paid confirmation, exact debit, one ledger row, detail at 320/390/430');
  await api('dev/events',{minutes:1440}); const auto=await api('dashboard');
  for(const previous of after.events.pending){const row=(await db.query('select status,resolution_mode from public.sim_event_instances where id=$1',[previous.id])).rows[0]; assert(row.status==='resolved' && row.resolution_mode==='automatic','Expiry not saved');}
  report.checks.push('Midnight auto-resolves old-day events');
  today=auto; const negativeEvent=today.events.pending[0]; assert(negativeEvent,'Need insufficient-funds fixture');
  await db.query("insert into public.sim_ledger(run_id,user_id,day,sequence,kind,category,amount_bani,label,auto_resolved,ref_key) values($1,$2,$3,9999,'ajustare','mancare',$4,'QA sold',false,'qa-balance')",[first.dashboard.runId,[...users.values()][0].user.id,today.dashboard.currentDay,-today.dashboard.balanceBani-100]);
  await page.goto(origin+`/simulator/eveniment/${negativeEvent.id}`); await page.getByRole('heading',{name:negativeEvent.title,exact:true}).waitFor();
  assert(await page.getByText('Sold insuficient',{exact:true}).count()===2,'Paid options lack reasons');
  const zero=negativeEvent.options.find(o=>o.costBani===0); assert(await page.getByRole('button',{name:new RegExp(zero.label)}).isEnabled(),'Free fallback disabled');
  await page.getByRole('button',{name:new RegExp(zero.label)}).click(); await page.getByRole('heading',{name:'Alegerea ta',exact:true}).waitFor();
  report.checks.push('Negative balance disables paid choices, free remains available');
  await api('dev/events',{minutes:10080}); today=await api('dashboard');
  const sums=(await db.query('select sum(amount_bani)::integer as balance,count(*)::integer as n,count(distinct ref_key)::integer as u from public.sim_ledger where run_id=$1',[first.dashboard.runId])).rows[0];
  assert(sums.balance===today.dashboard.balanceBani && sums.n===sums.u,'Absence ledger mismatch');
  await page.goto(origin+'/simulator'); await page.getByRole('heading',{name:'SimLife',exact:true}).waitFor();
  for(const width of [320,390,430]){await page.setViewportSize({width,height:900}); assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Dashboard overflow ${width}`); await page.screenshot({path:`artifacts/simulator-events-qa/dashboard-${width}.png`,fullPage:true,animations:'disabled'});}
  for(const name of ['Salariul tău','Cheltuieli fixe','Jurnal financiar'])assert(await page.getByRole('heading',{name,exact:true}).count()===1,`${name} regression`);
  report.checks.push('Seven-day absence matches ledger; Chapter 2 UI and mobile retained');
  const salaryPending=today.events.pending;
  const nextDate=new Date(`${today.dashboard.currentDay}T12:00:00Z`); nextDate.setUTCDate(nextDate.getUTCDate()+1);
  await db.query("update public.sim_runs set config_snapshot=jsonb_set(config_snapshot,'{payday}',to_jsonb($1::integer)) where id=$2",[nextDate.getUTCDate(),first.dashboard.runId]);
  const balanceBeforeSalary=today.dashboard.balanceBani;
  await api('dev/events',{minutes:1440}); const salaryState=await api('dashboard');
  for(const previous of salaryPending){const saved=(await db.query('select selected_cost_bani from public.sim_event_instances where id=$1',[previous.id])).rows[0]; if(balanceBeforeSalary<=0)assert(saved.selected_cost_bani===0,'Future salary funded expired choice');}
  assert((await db.query("select * from public.sim_ledger where run_id=$1 and day=$2 and kind='salariu'",[first.dashboard.runId,salaryState.dashboard.currentDay])).rows.length===1,'Salary boundary missing');
  report.checks.push('Salary boundary through real API: previous-day negative balance forces free auto-choice before new salary');
  await page.goto(origin+'/simulator/dev'); await page.getByRole('heading',{name:'Motorul de evenimente',exact:true}).waitFor();
  await page.getByRole('button',{name:'Inspectează planul / continuă sincronizarea',exact:true}).click(); await page.waitForFunction(()=>document.querySelector('pre')?.textContent.includes('rngNamespaces'));
  await context.clearCookies();
  await page.goto(origin + '/autentificare'); await page.waitForFunction(() => { const form = document.querySelector('form'); return form && Object.keys(form).some(key => key.startsWith('__reactProps')); });
  await page.getByLabel('Email', { exact: true }).fill('simulator_b@finly.test');
  await page.getByLabel('Parolă', { exact: true }).fill('localtestpass');
  await page.getByRole('button', { name: 'Conectează-te', exact: true }).click();
  await page.getByRole('heading', { name: 'Ce învățăm azi?' }).waitFor();
  const legacy = await api('start', { housing: 'parinti' });
  assert(legacy.events.engineStatus === 'needs_profile', 'Legacy fixture already active');
  await page.goto(origin + '/simulator');
  await page.getByText('Înainte să pornim evenimentele', { exact: true }).waitFor();
  assert(await page.locator('.sim-events').getByRole('group', { name: 'Cum arată ziua ta de obicei?' }).count() === 1, 'Picker outside Events slot');
  for (const name of ['Salariul tău', 'Cheltuieli fixe', 'Jurnal financiar']) assert(await page.getByRole('heading', { name, exact: true }).count() === 1, 'Legacy dashboard blocked');
  await checkEventsSlot('existing-picker');
  await page.getByRole('button', { name: /^Lucrez/ }).click();
  await page.getByText('Situațiile care apar pe parcursul zilei.', { exact: true }).waitFor();
  assert(await page.getByRole('group', { name: 'Cum arată ziua ta de obicei?' }).count() === 0, 'Picker remains after activation');
  const activated = await api('dashboard');
  assert(activated.events.profile === 'lucrez' && activated.dashboard.runId === legacy.dashboard.runId && activated.dashboard.balanceBani === legacy.dashboard.balanceBani, 'Activation changed run/economy');
  const savedBefore = (await db.query('select event_engine_started_at from public.sim_runs where id=$1', [legacy.dashboard.runId])).rows[0];
  await page.reload();
  await page.getByText('Situațiile care apar pe parcursul zilei.', { exact: true }).waitFor();
  assert(await page.getByRole('group', { name: 'Cum arată ziua ta de obicei?' }).count() === 0, 'Configured run shows picker');
  const savedAfter = (await db.query('select event_engine_started_at from public.sim_runs where id=$1', [legacy.dashboard.runId])).rows[0];
  assert(String(savedBefore.event_engine_started_at) === String(savedAfter.event_engine_started_at), 'Engine start reset');
  await checkEventsSlot('existing-active');
  report.checks.push('Existing run: contextual picker, activation in same slot, profile persists, engine start/run/balance preserved');
  assert(await page.getByRole('heading', { name: 'Acum', exact: true }).count() === 0, 'Empty Acum rendered');
  report.checks.push('No visible state: Acum absent');
  async function createAndChoose(scenario) {
    const planned = await api('dev/consequences', { scenario });
    assert(planned.created === 1, `Dev fixture ${scenario} not created: ${JSON.stringify(planned)}`);
    await api('dev/events', { minutes: 15 });
    const fresh = await api('dashboard');
    const row = (await db.query('select id from public.sim_event_instances where run_id=$1 and definition_id=$2 order by scheduled_at desc limit 1', [legacy.dashboard.runId, `dev_${scenario}`])).rows[0];
    const visible = fresh.events.pending.find(e => e.id === row.id);
    assert(visible, `${scenario} not visible after scheduledAt`);
    await page.goto(origin + `/simulator/eveniment/${visible.id}`);
    await page.getByRole('heading', { name: visible.title, exact: true }).waitFor();
    await page.getByRole('button', { name: /Alegi varianta gratuită/ }).click();
    await page.getByRole('heading', { name: 'Alegerea ta', exact: true }).waitFor();
    await page.getByRole('link', { name: '← Înapoi la simulator', exact: true }).click();
    await page.getByRole('heading', { name: 'Acum', exact: true }).waitFor();
    return visible;
  }
  await createAndChoose('phone_problem');
  await createAndChoose('coverage');
  const stateBeforeExtend = await api('dashboard');
  assert(stateBeforeExtend.dashboard.currentStates.length === 2, 'Flag/effect not in existing dashboard response');
  const probe = await api('dev/consequences', { scenario: 'coverage_probe' });
  assert(probe.created === 0 && probe.rejected.some(r => r.reason === 'excluded_effect'), 'Coverage did not exclude probe');
  await createAndChoose('extend');
  const stateAfterExtend = await api('dashboard');
  assert(stateAfterExtend.dashboard.currentStates.length === 2, 'Extended effect duplicated Acum item');
  assert(stateAfterExtend.dashboard.currentStates.find(s => s.kind === 'effect').expiresAt > stateBeforeExtend.dashboard.currentStates.find(s => s.kind === 'effect').expiresAt, 'Extension missing');
  for (const width of [320, 390, 430, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const position = await page.evaluate(() => {
      const current = document.querySelector('.sim-current'), upcoming = document.querySelector('.sim-upcoming'), events = document.querySelector('.sim-events');
      return { count: document.querySelectorAll('.sim-current').length, direct: current.previousElementSibling === upcoming,
        below: current.getBoundingClientRect().top >= upcoming.getBoundingClientRect().bottom, sameColumn: current.getBoundingClientRect().left === upcoming.getBoundingClientRect().left,
        column: getComputedStyle(events).gridColumnStart, row: getComputedStyle(events).gridRowStart,
        overflow: document.documentElement.scrollWidth > innerWidth, text: current.innerText };
    });
    assert(position.count === 1 && position.direct && position.below && position.sameColumn && !position.overflow, `Acum layout ${width}: ${JSON.stringify(position)}`);
    if (width >= 900) assert(position.column === '1' && position.row === '2', 'Events moved from monthly slot');
    assert(!/phone_problematic|food_coverage|UUID|sourceInstanceId|true|false/.test(position.text), 'Technical state leaked in Acum');
    await page.screenshot({ path: `artifacts/simulator-events-qa/current-active-${width}.png`, fullPage: true, animations: 'disabled' });
  }
  await checkEventsSlot('chapter-four-active');
  report.checks.push('Real dev fixtures -> choices -> flags/effects; Acum directly below Ce urmează at 320/390/430/1280; Events retained');
  await page.reload(); await page.getByRole('heading', { name: 'Acum', exact: true }).waitFor();
  assert(JSON.stringify((await api('dashboard')).dashboard.currentStates) === JSON.stringify(stateAfterExtend.dashboard.currentStates), 'Refresh changed state');
  const device = await browser.newContext(); await device.addCookies(await context.cookies()); const devicePage = await device.newPage();
  await devicePage.goto(origin + '/simulator'); await devicePage.getByRole('heading', { name: 'Acum', exact: true }).waitFor();
  const deviceState = await devicePage.request.get(origin + '/api/simulator/dashboard');
  assert(JSON.stringify((await deviceState.json()).dashboard.currentStates) === JSON.stringify(stateAfterExtend.dashboard.currentStates), 'Second device state differs');
  await device.close();
  const devClockCookies = (await context.cookies()).filter(c => c.name.startsWith('finly_sim_dev_'));
  await context.clearCookies(); await page.goto(origin + '/autentificare'); await page.waitForFunction(() => { const form = document.querySelector('form'); return form && Object.keys(form).some(key => key.startsWith('__reactProps')); });
  await page.getByLabel('Email', { exact: true }).fill('simulator_b@finly.test'); await page.getByLabel('Parolă', { exact: true }).fill('localtestpass');
  await page.getByRole('button', { name: 'Conectează-te', exact: true }).click(); await page.getByRole('heading', { name: 'Ce învățăm azi?' }).waitFor();
  await context.addCookies(devClockCookies);
  await page.goto(origin + '/simulator'); await page.getByRole('heading', { name: 'Acum', exact: true }).waitFor();
  assert((await api('dashboard')).dashboard.currentStates.some(s => s.kind === 'flag'), 'Flag lost after logout/login');
  report.checks.push('State survives refresh, session re-login, independent browser context');
  await api('dev/consequences', { scenario: 'phone_resolution' }); await api('dev/events', { minutes: 15 });
  await api('dev/consequences', { scenario: 'phone_followup' }); await api('dev/events', { minutes: 15 });
  const repairState = await api('dashboard'), repair = repairState.events.pending.find(e => e.title === 'Verifici telefonul'), followup = repairState.events.pending.find(e => e.title === 'O a doua verificare a telefonului');
  assert(repair && followup, 'Repair fixtures absent');
  await page.goto(origin + `/simulator/eveniment/${repair.id}`); await page.getByRole('button', { name: /Alegi varianta gratuită/ }).click(); await page.getByRole('heading', { name: 'Alegerea ta', exact: true }).waitFor();
  await page.goto(origin + `/simulator/eveniment/${followup.id}`); await page.getByText('Situația nu mai necesită o decizie.', { exact: true }).waitFor();
  assert(await page.getByRole('button').count() === 0, 'Cancelled event still actionable');
  await page.getByRole('link', { name: '← Înapoi la simulator', exact: true }).click();
  assert((await api('dashboard')).dashboard.currentStates.every(s => s.kind !== 'flag'), 'Cleared flag still visible');
  await api('dev/events', { minutes: 10080 });
  await page.reload(); await page.getByRole('heading', { name: 'SimLife', exact: true }).waitFor();
  assert((await api('dashboard')).dashboard.currentStates.length === 0, 'Expired state still active');
  assert(await page.getByRole('heading', { name: 'Acum', exact: true }).count() === 0, 'Empty Acum after expiry');
  await checkEventsSlot('chapter-four-expired');
  await page.goto(origin + '/simulator/dev');
  await page.getByRole('button', { name: 'A. Provizii 2 zile', exact: true }).click();
  await page.getByRole('button', { name: 'Inspectează planul / continuă sincronizarea', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('pre')?.textContent.includes('flagHistory'));
  report.checks.push('Repair clears flag, irrelevant detail cancelled without action; catch-up expires coverage; dev controls/diagnostics visible');
  assert(report.errors.length===0 && report.providerErrors.length===0,JSON.stringify(report));
  fs.writeFileSync('artifacts/simulator-events-qa/report.json',JSON.stringify(report,null,2));
  console.log(`PASS: ${report.checks.length} event browser flows; Next + SDK + PGlite, simulated Auth. No remote mutation.`);
} catch(error){fs.writeFileSync('artifacts/simulator-events-qa/report.json',JSON.stringify({...report,failure:error.message},null,2));throw error;}
finally{
 await browser?.close();
 if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});
 server.closeAllConnections();
 if(server.listening)await new Promise(resolve=>server.close(resolve));await db.close();
}
