// Optional browser regression: real Next + Supabase SDK + PostgreSQL migration.
// Auth HTTP is simulated locally; no real email, credentials or remote DB is used.
// Run in an isolated project copy: node tests/simulator-browser.mjs
import fs from 'node:fs';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { PGlite } from '@electric-sql/pglite';
const playwrightPath = process.argv[2] || 'file:///C:/Users/Fabian/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs';
const { chromium } = await import(playwrightPath);
const origin = 'http://127.0.0.1:3125', provider = 'http://127.0.0.1:3126';
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
async function api(path = 'state', body) {
  const response = body === undefined ? await page.request.get(`${origin}/api/simulator/${path}`) : await page.request.post(`${origin}/api/simulator/${path}`, { data: body, headers: { origin } });
  assert(response.ok(), `API ${path}: ${response.status()} ${await response.text()}`);
  return response.json();
}
async function click(name, path) {
  const done = page.waitForResponse(r => r.url() === `${origin}/api/simulator/${path}` && r.request().method() === 'POST');
  await page.getByRole('button', { name, exact: true }).click();
  const response = await done; assert(response.ok(), `${name}: ${await response.text()}`);
  await page.getByRole('button', { name: 'Resetează', exact: true }).waitFor();
  await page.waitForFunction(() => ![...document.querySelectorAll('button')].find(b => b.textContent === 'Resetează')?.disabled);
  return response.json();
}
try {
  fs.mkdirSync('artifacts/simulator-qa', { recursive: true });
  await db.exec("create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create table auth.users(id uuid primary key,raw_user_meta_data jsonb);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;");
  for (const migration of ['0001_accounts_and_progress.sql', '0002_username_check.sql', '0003_simulator_foundation.sql']) await db.exec(fs.readFileSync(`supabase/migrations/${migration}`, 'utf8'));
  for (const name of ['a', 'b']) {
    const metadata = { username: `simulator_test_${name}`, age_range: '18-19', terms: true, privacy: true, terms_version: '2026-10-draft', privacy_version: '2026-10-draft' };
    const user = { id: crypto.randomUUID(), email: `simulator_${name}@finly.test`, aud: 'authenticated', role: 'authenticated', created_at: new Date().toISOString(), app_metadata: { provider: 'email' }, user_metadata: metadata };
    await db.query('insert into auth.users values($1,$2::jsonb)', [user.id, JSON.stringify(metadata)]); users.set(user.id, { user, password: 'localtestpass' });
  }
  await new Promise(resolve => server.listen(3126, '127.0.0.1', resolve));
  next = spawn(process.execPath, ['--use-system-ca', 'node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3125'], { env: { ...process.env, NEXT_PUBLIC_SUPABASE_URL: provider, NEXT_PUBLIC_SUPABASE_ANON_KEY: 'local-qa-anon', SUPABASE_SERVICE_ROLE_KEY: 'local-qa-service', NEXT_PUBLIC_APP_URL: origin }, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  const log = fs.createWriteStream('artifacts/simulator-qa/next.log'); next.stdout.pipe(log); next.stderr.pipe(log);
  let ready = false;
  for (let i = 0; i < 100; i++) { if (next.exitCode !== null) throw new Error('Next stopped'); try { if ((await fetch(origin + '/bun-venit')).ok) { ready = true; break; } } catch {} await new Promise(resolve => setTimeout(resolve, 500)); }
  assert(ready, 'Next did not start');
  browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--disable-gpu'] });
  const context = await browser.newContext(); page = await context.newPage(); page.setDefaultNavigationTimeout(60000); page.on('pageerror', e => report.errors.push(e.message));
  await page.goto(origin + '/simulator/dev'); assert(new URL(page.url()).pathname === '/bun-venit', 'Anonymous dev page not guarded');
  assert((await page.request.get(origin + '/api/simulator/state')).status() === 401, 'Anonymous simulator API not 401');
  await page.goto(origin + '/autentificare'); await page.getByLabel('Email', { exact: true }).fill('simulator_a@finly.test'); await page.getByLabel('Parolă', { exact: true }).fill('localtestpass'); await page.getByRole('button', { name: 'Conectează-te', exact: true }).click(); await page.getByRole('heading', { name: 'Ce învățăm azi?' }).waitFor();
  await page.goto(origin + '/simulator/dev'); await page.getByRole('heading', { name: 'Simulator — development' }).waitFor();
  const empty = await api(); assert(empty.run === null, 'Fresh user has run');
  await page.waitForFunction(() => ![...document.querySelectorAll('button')].find(b => b.textContent === 'Pornește run')?.disabled);
  await page.getByLabel('Locuință').selectOption('parinti');
  const initial = await click('Pornește run', 'run'); assert(initial.created === true && initial.run.lastSettledOn === initial.effectiveDay, 'Initial settlement incomplete');
  const initialLedger = initial.state.ledgerThisMonth;
  assert(initial.run.startedOn.endsWith('-01') ? initialLedger.some(e => e.kind === 'salariu') && !initialLedger.some(e => e.kind === 'ajustare') : initialLedger.some(e => e.kind === 'ajustare') && !initialLedger.some(e => e.kind === 'salariu'), 'Start/payday rule');
  report.checks.push('Auth-required dev page/API; real login; start plus starting-day settlement');
  await page.reload(); const reloaded = await api(); assert(reloaded.run.id === initial.run.id && reloaded.state.balanceBani === initial.state.balanceBani, 'Refresh changed run/balance');
  report.checks.push('Refresh preserves run, ledger and balance');
  for (const [name, increment] of [['Mută data +1 zi', 1], ['+7 zile', 7], ['+30 zile', 30]]) {
    const before = await api(); const after = await click(name, 'dev/clock');
    assert(after.offsetDays === before.offsetDays + increment, 'Clock increment mismatch'); assert(after.run.lastSettledOn === after.effectiveDay, 'Empty days cursor not settled');
    const sum = await db.query('select coalesce(sum(amount_bani),0)::integer as balance,count(*)::integer as count,count(distinct ref_key)::integer as unique_count from public.sim_ledger where run_id=$1', [after.run.id]);
    assert(sum.rows[0].balance === after.state.balanceBani && sum.rows[0].count === sum.rows[0].unique_count, 'Ledger authority/idempotency mismatch');
  }
  const progressed = await api();
  assert((await db.query("select count(*)::integer as count from public.sim_ledger where run_id=$1 and kind='salariu'", [progressed.run.id])).rows[0].count >= 1, 'Cross-month salary missing');
  report.checks.push('+1/+7/+30 civil days, empty-day cursor, next payday, exact lifetime ledger balance');
  const repeat = await api('settle', {}); assert(repeat.state.balanceBani === progressed.state.balanceBani, 'Repeated settle changed balance');
  const calls = await Promise.all([api('settle', {}), api('settle', {})]); assert(calls.every(r => r.state.balanceBani === progressed.state.balanceBani), 'Concurrent API result mismatch');
  report.checks.push('Repeated and simultaneous HTTP settlement is idempotent (local PGlite queues DB calls; not a multi-connection DB race test)');
  const winner = await Promise.all([api('run', { housing: 'parinti' }), api('run', { housing: 'chirie' })]); assert(winner.every(r => r.created === false && r.run.id === progressed.run.id), 'Second active run');
  const userB = [...users.values()][1].user;
  await db.query("insert into public.sim_runs(user_id,started_on,start_age,monthly_income_bani,housing,rules_version,rng_version,config_snapshot) select $1,started_on,start_age,monthly_income_bani,housing,rules_version,rng_version,config_snapshot from public.sim_runs where id=$2", [userB.id, progressed.run.id]);
  const reset = await click('Resetează', 'dev/reset'); assert(reset.offsetDays === 0 && reset.run === null, 'Reset state mismatch');
  assert((await db.query('select id from public.sim_runs where user_id=$1', [userB.id])).rows.length === 1, 'Reset deleted B');
  assert((await db.query('select id from public.sim_ledger where run_id=$1', [progressed.run.id])).rows.length === 0, 'Reset ledger cascade');
  report.checks.push('Existing run wins start requests; reset cascades current-user data only, preserves B and resets offset');
  await page.getByLabel('Locuință').selectOption('chirie'); const restarted = await click('Pornește run', 'run'); assert(restarted.created && restarted.run.id !== progressed.run.id, 'Restart failed');
  await page.screenshot({ path: 'artifacts/simulator-qa/dev.png', fullPage: false, animations: 'disabled', timeout: 15000 });
  await page.goto(origin + '/simulator'); await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor();
  report.checks.push('Reset then fresh rental run; /simulator renders the canonical dashboard');
  await api('dev/reset', {});
  await page.goto(origin + '/simulator'); await page.getByRole('heading', { name: 'Începe viața pe cont propriu' }).waitFor();
  const beforeProgress = await db.query('select public.read_account_progress($1) as state', [[...users.values()][0].user.id]);
  const radios = page.getByRole('radio'); assert(await radios.count() === 2, 'Housing group lacks two semantic radios');
  await radios.first().focus(); await page.keyboard.press('ArrowRight'); assert(await radios.nth(1).isChecked(), 'Keyboard housing selection failed');
  const previewResponse = await page.request.post(origin + '/api/simulator/preview', { data: { housing: 'chirie' }, headers: { origin } });
  const preview = await previewResponse.json(); assert(preview.housing === 'chirie', 'Server preview missing');
  assert((await page.locator('.sim-start-balance').innerText()).includes((preview.balanceAfterTodayBani / 100).toLocaleString('ro-RO')), 'Housing preview mismatch');
  for (const width of [320, 390, 430, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Setup overflow ${width}`);
    await page.screenshot({ path: `artifacts/simulator-qa/setup-${width}.png`, fullPage: true, animations: 'disabled' });
  }
  const otherTab = await context.newPage(); await otherTab.goto(origin + '/simulator'); await otherTab.getByRole('heading', { name: 'Începe viața pe cont propriu' }).waitFor();
  await otherTab.getByRole('radio').nth(1).check();
  const startResponses = [page.waitForResponse(r => r.url().endsWith('/api/simulator/start') && r.request().method() === 'POST'), otherTab.waitForResponse(r => r.url().endsWith('/api/simulator/start') && r.request().method() === 'POST')];
  await Promise.all([page.getByRole('button', { name: 'Începe simularea', exact: true }).click(), otherTab.getByRole('button', { name: 'Începe simularea', exact: true }).click()]);
  const startValues = await Promise.all(startResponses.map(async r => { const response = await r; assert(response.ok(), 'Concurrent UI start failed'); return response.json(); }));
  assert(startValues[0].dashboard.runId === startValues[1].dashboard.runId, 'Two tabs created two runs');
  await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor(); await otherTab.close();
  const authoritative = (await (await page.request.get(origin + '/api/simulator/dashboard')).json()).dashboard;
  assert(authoritative.balanceBani === (await api()).state.balanceBani, 'Canonical balance mismatch');
  const hero = await page.locator('.sim-balance-amount').innerText();
  await page.reload(); await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor(); assert(await page.locator('.sim-balance-amount').innerText() === hero, 'UI refresh changed balance');
  for (const width of [320, 390, 430, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Dashboard overflow ${width}`);
    await page.screenshot({ path: `artifacts/simulator-qa/dashboard-${width}.png`, fullPage: true, animations: 'disabled' });
  }
  assert(await page.locator('.sim-fini img').count() === 1, 'Fini must appear once');
  assert(await page.getByRole('button', { name: '+30 zile', exact: true }).count() === 0, 'Dev controls leaked into main UI');
  report.checks.push('Accessible housing keyboard; real preview; concurrent two-tab UI start; dashboard and refresh at 320/390/430/1440');
  // Background errors preserve existing money. A burst of visibility events has one flight.
  let failedRequests = 0;
  await page.route('**/api/simulator/dashboard', async route => { failedRequests++; await new Promise(resolve => setTimeout(resolve, 250)); await route.abort(); });
  await page.evaluate(() => { for (let i = 0; i < 10; i++) document.dispatchEvent(new Event('visibilitychange')); });
  await page.getByRole('alert').filter({ hasText: 'Datele afișate pot fi neactualizate.' }).waitFor();
  assert(await page.locator('.sim-balance-amount').innerText() === hero, 'Sync error lost visible money'); assert(failedRequests === 1, 'Visibility runaway requests');
  await page.unroute('**/api/simulator/dashboard'); await page.getByRole('button', { name: 'Încearcă din nou', exact: true }).click();
  await page.waitForFunction(() => !document.querySelector('.sim-error')); report.checks.push('Visibility single-flight; stale-data network error; retry keeps authoritative balance');
  // Lost start response: replay finds the already persisted run.
  const retryStart = await page.request.post(origin + '/api/simulator/start', { data: { housing: 'parinti' }, headers: { origin } });
  assert((await retryStart.json()).dashboard.runId === authoritative.runId, 'Retry created a new run');
  const device = await browser.newContext(); await device.addCookies(await context.cookies()); const devicePage = await device.newPage();
  await devicePage.goto(origin + '/simulator'); await devicePage.getByRole('heading', { name: 'Simulator', exact: true }).waitFor(); assert(await devicePage.locator('.sim-balance-amount').innerText() === hero, 'Other device differs'); await device.close();
  await page.goto(origin + '/?tab=profile'); await page.getByRole('button', { name: 'Deconectează-te', exact: true }).click(); await page.waitForURL('**/bun-venit');
  await page.goto(origin + '/autentificare'); await page.getByLabel('Email', { exact: true }).fill('simulator_a@finly.test'); await page.getByLabel('Parolă', { exact: true }).fill('localtestpass'); await page.getByRole('button', { name: 'Conectează-te', exact: true }).click(); await page.getByRole('heading', { name: 'Ce învățăm azi?' }).waitFor();
  await page.goto(origin + '/simulator'); await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor(); assert(await page.locator('.sim-balance-amount').innerText() === hero, 'Logout/login lost state');
  report.checks.push('Lost response retry; separate browser context; real logout/login retains run');
  // Advance only through existing dev API, then view month history in main UI.
  await api('dev/clock', { increment: 30 }); await page.reload(); await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor();
  const currentHero = await page.locator('.sim-balance-amount').innerText();
  await page.getByRole('button', { name: 'Luna precedentă' }).click(); await page.waitForFunction(() => !document.querySelector('.sim-journal-status')?.textContent.includes('Încărcăm'));
  assert(await page.locator('.sim-balance-amount').innerText() === currentHero, 'History changed current dashboard');
  assert(await page.getByRole('button', { name: 'Luna precedentă' }).isDisabled(), 'Journal allows before run');
  await page.getByRole('button', { name: 'Luna următoare' }).click(); await page.waitForFunction(() => !document.querySelector('.sim-journal-status')?.textContent.includes('Încărcăm'));
  assert(await page.getByRole('button', { name: 'Luna următoare' }).isDisabled(), 'Journal allows future');
  report.checks.push('Historical journal stays within run and current month; hero unaffected');
  // Commit start, lose its HTTP response, then recover by authoritative reload.
  await api('dev/reset', {}); await page.reload(); await page.getByRole('heading', { name: 'Începe viața pe cont propriu' }).waitFor();
  let finishLostStart, lostStartError;
  const lostStartHandled = new Promise(resolve => { finishLostStart = resolve; });
  await page.route('**/api/simulator/start', async route => {
    try {
      const committed = await page.request.post(origin + '/api/simulator/start', { data: route.request().postDataJSON(), headers: { origin } });
      assert(committed.ok(), 'Lost-response start did not commit');
      await route.fulfill({ status: 503, json: { error: { message: 'Răspunsul de pornire nu a ajuns.' } } });
    } catch (error) { lostStartError = error; } finally { finishLostStart(); }
  });
  await page.getByRole('button', { name: 'Începe simularea', exact: true }).click(); await lostStartHandled; assert(!lostStartError, `Lost-response interception: ${lostStartError?.message}`); await page.locator('.sim-error[role="alert"]').waitFor();
  assert(await page.locator('.sim-balance-amount').count() === 0, 'Optimistic money rendered after lost response');
  await page.unroute('**/api/simulator/start'); await page.getByRole('button', { name: 'Încearcă din nou', exact: true }).click(); await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor();
  const recovered = await api(); assert((await db.query('select id from public.sim_runs where user_id=$1 and status=\'activ\'', [recovered.run.userId])).rows.length === 1, 'Lost response created duplicate');
  report.checks.push('Discarded committed start response and delivered 503; no optimistic dashboard; retry recovers one persisted run');
  // A delayed initial snapshot renders a skeleton, never setup or invented zero.
  let releaseInitial;
  const initialGate = new Promise(resolve => { releaseInitial = resolve; });
  await page.route('**/api/simulator/dashboard', async route => { await initialGate; await route.continue(); });
  await page.reload({ waitUntil: 'domcontentloaded' }); await page.locator('.sim-skeleton').waitFor();
  assert(await page.locator('.sim-balance-amount').count() === 0 && await page.getByRole('radio').count() === 0, 'Initial loading fabricated money/setup');
  releaseInitial(); await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor(); await page.unroute('**/api/simulator/dashboard');
  report.checks.push('Initial delayed response shows stable skeleton, never fake zero or setup');
  await page.route('**/api/simulator/dashboard', route => route.abort());
  await page.reload({ waitUntil: 'domcontentloaded' }); await page.locator('.sim-error').filter({ hasText: 'Nu am putut încărca simulatorul.' }).waitFor();
  assert(await page.locator('.sim-balance-amount').count() === 0 && await page.getByRole('radio').count() === 0, 'Initial error fabricated financial state');
  await page.unroute('**/api/simulator/dashboard'); await page.getByRole('button', { name: 'Încearcă din nou', exact: true }).click(); await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor();
  report.checks.push('Initial network error has no financial data; retry restores persisted dashboard');
  // Time-only fixture: a server deadline triggers one revalidation. Money stays SQL-derived.
  let deadlineRequests = 0;
  await page.route('**/api/simulator/dashboard', async route => {
    deadlineRequests++;
    const response = await page.request.get(origin + '/api/simulator/dashboard'); assert(response.ok(), 'Deadline authoritative state failed');
    const snapshot = await response.json(); if (deadlineRequests === 1) snapshot.timing.refreshAfterMs = 1000;
    await route.fulfill({ json: snapshot });
  });
  const deadlineRefresh = page.waitForResponse(r => r.url().endsWith('/api/simulator/dashboard') && deadlineRequests === 2);
  await page.reload({ waitUntil: 'domcontentloaded' }); await deadlineRefresh; await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor();
  assert(deadlineRequests === 2, 'Server deadline did not produce exactly one refresh'); await page.unroute('**/api/simulator/dashboard');
  report.checks.push('Server timing deadline revalidates open tab once; subsequent deadline follows real server time');
  // Presentation fixtures only: all real finance checks above use persisted SQL.
  const presentation = await (await page.request.get(origin + '/api/simulator/dashboard')).json();
  for (const [value, label] of [[0, 'zero'], [-135050, 'negative'], [12500000, 'large']]) {
    const fixture = structuredClone(presentation); fixture.dashboard.balanceBani = value;
    fixture.dashboard.fixedExpenses[0].label = 'Contribuție la locuință cu o denumire foarte lungă pentru verificarea afișării corecte';
    fixture.dashboard.monthlyJournal.entries = label === 'zero' ? [] : Array.from({ length: 80 }, (_, i) => ({ ...fixture.dashboard.monthlyJournal.entries[0], label: 'Tranzacție cu o denumire foarte lungă pentru testarea jurnalului financiar', sequence: i }));
    await page.route('**/api/simulator/dashboard', route => route.fulfill({ json: fixture }));
    for (const width of [320, 390, 430, 1440]) {
      await page.setViewportSize({ width, height: 960 }); await page.reload({ waitUntil: 'domcontentloaded' }); await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Presentation ${label} overflow ${width}`);
      if (label === 'zero') assert(await page.getByText('Nu există tranzacții în această lună.').count() === 1, 'Empty journal missing');
      if (label === 'negative') assert((await page.locator('.sim-balance-amount').innerText()).includes('-'), 'Negative sign hidden');
      if (width === 320) await page.screenshot({ path: `artifacts/simulator-qa/${label}-320.png`, fullPage: false });
    }
    await page.unroute('**/api/simulator/dashboard');
  }
  report.checks.push('Presentation fixtures: 0, −1350.50, 125000 lei, long labels, 80 entries and empty journal at all four widths');
  await page.goto(origin + '/?tab=simulator'); await page.getByRole('heading', { name: 'Simulator', exact: true }).waitFor(); assert(new URL(page.url()).pathname === '/simulator', 'Legacy link not redirected');
  await page.goto(origin + '/lectii'); await page.getByRole('link', { name: 'Simulator', exact: true }).waitFor();
  await page.goto(origin + '/lectie/salariu-brut-vs-net'); await page.locator('.salary-lesson').waitFor();
  const afterProgress = await db.query('select public.read_account_progress($1) as state', [[...users.values()][0].user.id]);
  const before = beforeProgress.rows[0].state, after = afterProgress.rows[0].state;
  for (const field of ['events', 'activity', 'achievements', 'daily', 'lessons']) { assert(Array.isArray(before[field]) && Array.isArray(after[field]), `Missing account field ${field}`); assert(JSON.stringify(before[field]) === JSON.stringify(after[field]), `Simulator changed gamification ${field}`); }
  for (const field of ['streak_current', 'streak_longest']) assert(before.stats[field] === after.stats[field], `Simulator changed ${field}`);
  report.checks.push('Home/Profile/logout/Lessons/lesson navigation; simulator never changes XP, streak, achievements, challenges or completed lessons');
  assert(report.errors.length === 0 && report.providerErrors.length === 0, 'Browser/provider errors');
  fs.writeFileSync('artifacts/simulator-qa/report.json', JSON.stringify(report, null, 2)); console.log(`PASS: ${report.checks.length} simulator browser checks; real SDK and local SQL. Remote NOT tested.`);
} catch (error) {
  fs.writeFileSync('artifacts/simulator-qa/report.json', JSON.stringify({ ...report, failure: error.message }, null, 2)); throw error;
} finally {
  await browser?.close();
  if (next?.pid) await new Promise(resolve => { const kill = spawn('taskkill', ['/pid', String(next.pid), '/t', '/f'], { windowsHide: true, stdio: 'ignore' }); kill.on('exit', resolve); });
  if (server.listening) await new Promise(resolve => server.close(resolve)); await db.close();
}
