// Extends the established real Next/API/PGlite inbox suite. Run in an isolated copy.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
if(fs.existsSync('.git'))throw new Error('Run in an isolated source copy.');
// Reuse its source builders, then adapt only the final local runner.
const centerBuilder=fs.readFileSync('tests/notification-center-browser.mjs','utf8')
  .replace(/^import .*;\r?$/gm,'').replace('await import(pathToFileURL(entry).href);','return driver;');
const notificationBuilder=new Function('fs','path','pathToFileURL',centerBuilder)(fs,path,pathToFileURL);
const build=notificationBuilder.slice(0,notificationBuilder.indexOf('const runner = path.resolve(')).replace(/^import .*;\r?$/gm,'');
let driver=new Function('fs','path',build+'\nreturn source;')(fs,path);
driver=driver.replaceAll('Marchează toate ca citite','Marchează citite')
  .replaceAll('[320,390,430,1280]','[390,375,360,350,1280]')
  .replaceAll('320,390,430,1280','390,375,360,350,1280')
  .replaceAll('notification-center','daily-polish')
  .replaceAll('3185','3195').replaceAll('3186','3196');
driver=driver.replace("'0011_streak_freeze_moments.sql']","'0011_streak_freeze_moments.sql','0012_simulator_savings_goal.sql','0013_simulator_daily_floor.sql']");
driver=driver.replace('        upgrade_simulator_decisions:',"        upgrade_simulator_daily_floor: ['select public.upgrade_simulator_daily_floor($1,$2,$3,$4,$5,$6,$7::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,body.p_now,body.p_development,JSON.stringify(body.p_policy)]],\n        upgrade_simulator_decisions:");
const setupStart=driver.indexOf("  await page.getByRole('heading', { name: 'Începe viața pe cont propriu' })"),setupEnd=driver.indexOf("  await page.getByRole('heading', { name: 'Evenimentele de azi' })",setupStart);
if(setupStart<0||setupEnd<0)throw new Error('Existing setup fixture changed');
driver=driver.slice(0,setupStart)+String.raw`
  await page.getByRole('heading',{name:'Cum începi?',exact:true}).waitFor();
  for(const answer of ['Sunt la liceu','Cu părinții / familia','Transport public']){
    await page.getByRole('button',{name:answer,exact:true}).click();await page.getByRole('button',{name:'Continuă',exact:true}).click();
  }
  await page.getByRole('button',{name:'Începe simularea',exact:true}).click();
`+driver.slice(setupEnd);
const beforeRead=String.raw`
  await bell.click();
  const readButton=page.getByRole('button',{name:'Marchează citite',exact:true});
  await readButton.waitFor();
  const historyBefore=(await notification()).items.map(i=>i.id).sort();
  let posts=0,release;
  await page.route('**/api/notifications',async route=>{
    if(route.request().method()!=='POST')return route.continue();
    posts++;await new Promise(resolve=>{release=resolve;});await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{message:'Local injected failure'}})});
  });
  await readButton.click();await page.waitForFunction(()=>document.querySelector('.notification-read-all')?.disabled);
  assert(await readButton.count()===1,'Busy action disappeared before success');
  await page.waitForTimeout(100);assert(posts===1,'Duplicate read request');release();
  await page.getByText('Nu putem salva acum. Reîncearcă.',{exact:true}).waitFor();
  assert(await readButton.isEnabled(),'Retry not enabled');assert((await notification()).unread===2,'Failed mark read changed server unread');
  await page.unroute('**/api/notifications');
  await page.keyboard.press('Escape');
  report.checks.push('Read failure preserves unread/history; busy control remains, disables and prevents duplicates; retry enabled');
`;
const needle="  await bell.click();await page.getByRole('button',{name:'Marchează citite',exact:true}).click();";
driver=driver.replace(needle,beforeRead+'\n'+needle);
const afterRead=String.raw`
  assert(JSON.stringify((await notification()).items.map(i=>i.id).sort())===JSON.stringify(historyBefore),'Mark read removed history');
  await bell.click();
  assert(await page.getByRole('button',{name:'Marchează citite',exact:true}).count()===0,'Zero-unread action visible');
  assert(await page.locator('.notification-unread-dot').count()===0,'Read dots remain');
  assert(await page.locator('.notification-inbox li').count()>=3,'Read history invisible');
  assert(await page.locator('.notification-inbox footer').count()===0,'Footer remains');
  assert(await page.locator('.notification-inbox a').filter({hasText:'Setările notificărilor'}).count()===0,'Settings footer link remains');
  await page.getByRole('button',{name:'Setările notificărilor',exact:true}).click();
  await page.waitForURL('**/?tab=profile#notification-settings');
  await page.locator('#notification-settings').waitFor();
  assert(await page.locator('dialog[open]').count()===0,'Settings navigation left open dialog');
  await page.waitForFunction(()=>{const r=document.getElementById('notification-settings')?.getBoundingClientRect();return r&&r.top>=0&&r.top<innerHeight;});
  assert(await page.evaluate(()=>!document.activeElement?.closest('dialog')),'Focus trapped after settings');
  await page.screenshot({path:artifactDirectory+'/profile-anchor-390.png',fullPage:true});
  await page.goto(origin+'/');await page.locator('.fini-tip').waitFor();
  const dailyText=await page.locator('.fini-tip p').textContent();
  assert(await page.locator('.fini-tip .card-kicker').textContent()==='ȘTIAI CĂ...?','Daily label');
  assert(await page.locator('.fini-tip img').count()>0,'Mascot absent');
  await page.reload();await page.locator('.fini-tip').waitFor();assert(await page.locator('.fini-tip p').textContent()===dailyText,'Refresh changed fact');
  assert(await tab.locator('.fini-tip p').textContent()===dailyText,'Second device daily fact differs');
  report.checks.push('Zero unread hides action and dots; mark-read preserves all history; gear closes dialog and scrolls to profile anchor; daily fact stable on refresh and second device, mascot retained');
`;
driver=driver.replace("  await other.close();",afterRead+"\n  await other.close();");
driver=driver.replace("    await page.screenshot({path:artifactDirectory+'/inbox-'",String.raw`
    const action=await page.locator('.notification-read-all').boundingBox(),gear=await page.getByRole('button',{name:'Setările notificărilor',exact:true}).boundingBox();
    assert(action&&action.width>150&&action.height>=44&&action.height<50&&action.x+action.width<=width,'Read action size/wrapping '+width);
    assert(gear&&gear.width>=44&&gear.height>=44,'Settings touch target '+width);
    await page.screenshot({path:artifactDirectory+'/inbox-'`);
const runner=path.resolve('artifacts/daily-polish/driver.mjs');
fs.mkdirSync(path.dirname(runner),{recursive:true});fs.writeFileSync(runner,driver);
const config=fs.readFileSync('next.config.ts','utf8');
fs.writeFileSync('next.config.ts',config.replace('export default nextConfig;',"nextConfig.distDir = '.next-daily-polish';\nexport default nextConfig;"));
try{await import(pathToFileURL(runner).href);}finally{fs.writeFileSync('next.config.ts',config);}
