// Focused browser QA using the existing local account provider and PostgreSQL fixture.
import fs from 'node:fs';
import path from 'node:path';
const checkout = path.resolve('artifacts/about-qa/checkout');
fs.mkdirSync(checkout, { recursive: true });
for (const item of ['app', 'src', 'public', 'package.json', 'tsconfig.json', 'next-env.d.ts', 'next.config.ts', 'postcss.config.mjs', 'proxy.ts']) {
  fs.cpSync(item, path.join(checkout, item), { recursive: true });
}
if (!fs.existsSync(path.join(checkout, 'node_modules'))) fs.symlinkSync(path.resolve('node_modules'), path.join(checkout, 'node_modules'), 'junction');
const source = fs.readFileSync('scripts/verify-account-local.mjs', 'utf8');
const focusedSource = source.slice(0, source.indexOf('async function screenshot')) + source.slice(source.indexOf('\ntry{'));
const prefix = focusedSource.slice(0, focusedSource.indexOf('  if(!process.env.FINLY_QA_REUSE_PUBLIC)'))
  .replace('next,browser,activePage,slowRead=false', 'next,browser,slowRead=false')
  .replaceAll('artifacts/account-qa', 'artifacts/about-qa')
  .replaceAll('3115', '3135').replaceAll('3116', '3136')
  .replace("{env:{...process.env,NEXT_PUBLIC_SUPABASE_URL", "{cwd:" + JSON.stringify(checkout) + ",env:{...process.env,NEXT_PUBLIC_SUPABASE_URL")
  .replace('next.stdout.resume();next.stderr.resume();', "next.stdout.on('data',d=>fs.appendFileSync('artifacts/about-qa/server.log',d));next.stderr.on('data',d=>fs.appendFileSync('artifacts/about-qa/server.log',d));");
const checks = `
  browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844}}),page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(origin+'/despre');assert(new URL(page.url()).pathname==='/bun-venit','Guest guard');report.checks.push('Guest redirects to /bun-venit');
  const user={id:crypto.randomUUID(),email:'about@example.test',aud:'authenticated',role:'authenticated',created_at:new Date().toISOString(),app_metadata:{provider:'email'},user_metadata:{username:'about_user',display_name:'QA',age_range:'20+',terms:true,privacy:true,terms_version:'2026-10-draft',privacy_version:'2026-10-draft'}};
  await db.query('insert into auth.users values($1,$2::jsonb)',[user.id,JSON.stringify(user.user_metadata)]);users.set(user.id,{user,password:'abcdefgh'});
  await page.goto(origin+'/autentificare');await page.getByLabel('Email',{exact:true}).fill(user.email);await page.getByLabel('Parolă',{exact:true}).fill('abcdefgh');await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();
  await page.goto(origin+'/?tab=profile');await page.getByRole('link',{name:'Despre Finly',exact:true}).click();await page.getByRole('heading',{name:'Despre Finly',exact:true}).waitFor();
  report.checks.push('Authenticated profile → About');
  for(const width of [320,390,430,1366,1440,1920]){
    await page.setViewportSize({width,height:width<900?844:900});await page.goto(origin+'/despre');await page.getByRole('heading',{name:'Despre Finly',exact:true}).waitFor();await page.waitForTimeout(200);
    const body=await page.locator('body').innerText();assert(!/demo|prototip|Lecția 1 din 5|3 zile la rând|\\+20 XP|Începe gratuit|Hai să începem/i.test(body),'Outdated page content');
    assert(await page.locator('.desktop-nav,.hero-lesson,.hero-streak,.product-window').count()===0,'Old marketing UI');
    assert(body.includes('100 de lecții · 10 categorii'),'Canonical counts');
    assert(await page.locator('h1').count()===1,'Heading hierarchy');
    assert(decodeURIComponent(await page.locator('.about-fini').getAttribute('src')).includes('/brand/fini-v2/home.webp'),'Current mascot');
    assert(await page.locator('.about-fini').evaluate(e=>e.complete&&e.naturalWidth>0),'Mascot loaded');
    const dims=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,height:document.documentElement.scrollHeight,hero:document.querySelector('.about-hero').getBoundingClientRect().height}));assert(!dims.overflow,'Overflow '+width);assert(dims.hero<450,'Huge hero');
    await page.screenshot({path:'artifacts/about-qa/'+width+'-about.png',fullPage:true});report.viewports.push({width,...dims});
  }
  await page.getByRole('link',{name:'Înapoi la profil',exact:true}).click();await page.getByRole('link',{name:'Despre Finly',exact:true}).waitFor();report.checks.push('Back returns to profile');
  await page.goto(origin+'/despre');await page.getByRole('link',{name:'Vezi lecțiile',exact:true}).click();await page.getByRole('heading',{name:'Lecții',exact:true}).waitFor();report.checks.push('CTA opens real lesson route');
  await page.goto(origin+'/despre');await page.getByRole('heading',{name:'Despre Finly',exact:true}).waitFor();await page.locator('.skip-link').focus();await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.activeElement?.matches('a')),'Keyboard links');
  report.checks.push('Six viewport screenshots, no overflow, current Fini, headings, keyboard, real counts, no obsolete content');assert(report.errors.length===0,'Browser errors');
  fs.writeFileSync('artifacts/about-qa/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
}finally{await browser?.close();if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});await new Promise(resolve=>server.close(resolve));await db.close();}
`;
fs.mkdirSync('artifacts/about-qa', { recursive: true });
const runner = 'artifacts/about-qa/runner.mjs';
fs.writeFileSync(runner, prefix + checks);
await import('../' + runner);


