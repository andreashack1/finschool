// Run after npm run build. No login, database writes or real user data.
import fs from 'node:fs';
import { spawn } from 'node:child_process';
const origin = 'http://127.0.0.1:3127';
const app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3127'], { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const checks = [];
fs.mkdirSync('artifacts/simulator-qa', { recursive: true });
const log = fs.createWriteStream('artifacts/simulator-qa/production.log'); app.stdout.pipe(log); app.stderr.pipe(log);
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    assert(app.exitCode === null, 'Production server stopped');
    try { if ((await fetch(origin + '/simulator/dev', { redirect: 'manual' })).status === 404) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  assert(ready, 'Production server did not start');
  for (const path of ['/simulator/dev', '/simulator/dev/nested', '/api/simulator/dev/clock', '/api/simulator/dev/reset', '/api/simulator/dev/events', '/api/simulator/dev/consequences','/api/simulator/dev/subscriptions','/api/simulator/dev/life']) {
    const response = await fetch(origin + path, { method: path.includes('/api/') ? 'POST' : 'GET', redirect: 'manual', headers: { cookie: 'finly_sim_dev_day_offset=999', origin, 'Content-Type': 'application/json' }, ...(path.includes('/api/') ? { body: JSON.stringify({ increment: 30 }) } : {}) });
    assert(response.status === 404, `${path} leaked in production: ${response.status}`); checks.push(`${path}: 404 with forged dev offset`);
  }
  for (const [path, body] of [['calendar'], ['subscriptions', { action:'create',input:{} }], ['dashboard'], ['journal?month=2026-10'], ['state'], ['start', { housing: 'parinti' }], ['preview', { housing: 'chirie' }], ['run', { housing: 'parinti' }], ['settle', {}]]) {
    const response = await fetch(`${origin}/api/simulator/${path}`, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', origin, cookie: 'finly_sim_dev_day_offset=999' }, ...(body ? { body: JSON.stringify(body) } : {}) });
    assert(response.status === 401, `${path} unauthenticated: ${response.status}`); assert(response.headers.get('cache-control') === 'no-store', `${path} cache header missing`); checks.push(`${path}: 401, no-store`);
  }
  const response = await fetch(origin + '/simulator', { redirect: 'manual' });
  assert([307, 308].includes(response.status) && response.headers.get('location')?.endsWith('/bun-venit'), 'Account-only page redirect missing'); checks.push('/simulator: existing unauthenticated redirect');
  const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]);
  const chunks = walk('.next/static').filter(path => path.endsWith('.js'));
  assert(chunks.every(path => !fs.readFileSync(path, 'utf8').includes('SUPABASE_SERVICE_ROLE_KEY')), 'Service role reference in public JS'); checks.push('Public JS: no service-role environment reference');
  for (const privateText of ['Mic dejun înainte de autobuz','Un film revine pe ecran','Mâncare comandată într-o seară liniștită','Telefonul răspunde greu','Material pentru machetă','digital_phone_resolution','school_corner_shop','unexpected_bag_zip','groceries_two_meals']) assert(chunks.every(path => !fs.readFileSync(path,'utf8').includes(privateText)), `Full catalog leaked into browser JS: ${privateText}`);
  checks.push('Public JS: catalog v1/v2 titles, IDs and taxonomy absent');
  fs.writeFileSync('artifacts/simulator-qa/production-report.json', JSON.stringify({ checks }, null, 2));
  console.log(`PASS: ${checks.length} production checks; no authenticated mutations.`);
} finally {
  if (app.pid && app.exitCode === null) await new Promise(resolve => { const kill = spawn('taskkill', ['/pid', String(app.pid), '/t', '/f'], { stdio: 'ignore', windowsHide: true }); kill.on('exit', resolve); });
  log.end();
}
