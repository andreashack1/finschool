// Real local Next/API/PostgreSQL; account Auth transport is simulated. Never run in the working repo.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
if(fs.existsSync('.git'))throw new Error('Run in an isolated source copy.');
const base=fs.readFileSync('tests/daily-polish-browser.mjs','utf8');
const builder=base.slice(0,base.indexOf("const runner=path.resolve(")).replace(/^import .*;\r?$/gm,'');
let source=new Function('fs','path','pathToFileURL',builder+'\nreturn driver;')(fs,path,pathToFileURL);
const cut=source.indexOf("  await page.goto(origin + '/simulator/dev'); await");
if(cut<0)throw new Error('Local harness login boundary changed');
source=source.slice(0,cut).replaceAll('daily-polish','profile-polish').replaceAll('3195','3205').replaceAll('3196','3206');
source=source.replace('      const calls = {',`      const calls = {
        username_available: ['select public.username_available($1) as result',[body.candidate]],
        update_account_profile: ['select public.update_account_profile($1,$2,$3) as result',[body.p_user,body.p_username,body.p_display_name]],`);
source=source.replace("    if (url.pathname === '/rest/v1/sim_runs'",String.raw`
    if(url.pathname==='/rest/v1/profiles'){
      const id=url.searchParams.get('id')?.slice(3),result=await db.query('select username from profiles where id=$1',[id]);
      return json(res,result.rows[0]);
    }
    if(url.pathname.startsWith('/auth/v1/admin/users/')&&req.method==='DELETE'){
      const id=url.pathname.split('/').at(-1),entry=users.get(id);await db.query('delete from auth.users where id=$1',[id]);users.delete(id);return json(res,{user:entry?.user});
    }
    if (url.pathname === '/rest/v1/sim_runs'`);
source+=String.raw`
  const userId=[...users.values()][0].user.id;
  const snapshot=async()=>{const response=await page.request.get(origin+'/api/progress');assert(response.ok(),'Progress API');return response.json();};
  const lessons=JSON.parse(fs.readFileSync('artifacts/final-quality/lessons-before.json','utf8'));
  const achievementIds=[...fs.readFileSync('src/content/achievements.ts','utf8').matchAll(/^\s*\["([^"]+)",/gm)].map(m=>m[1]);
  assert(achievementIds.length===21,'Fixture catalog');
  const pencil=()=>page.getByRole('button',{name:'Editează profilul',exact:true});
  const panel=()=>page.getByRole('dialog',{name:'Editează profilul',exact:true});
  async function profile(){await page.goto(origin+'/?tab=profile');await pencil().waitFor();}
  await page.setViewportSize({width:390,height:850});await profile();
  assert(await page.getByRole('heading',{name:'Contul tău',exact:true}).count()===0,'Permanent account card');
  assert(await page.getByRole('heading',{name:'Jurnalul XP',exact:true}).count()===0,'XP journal remains');
  assert(!(await page.locator('body').innerText()).includes('simulator_a@finly.test'),'Permanent email');
  assert(!(await page.locator('body').innerText()).includes('Interval de vârstă'),'Permanent age');
  assert(await page.locator('[data-achievement]').count()<=5,'Achievement wall');
  assert(await page.getByRole('heading',{name:'Ultimele 7 zile'}).count()===1,'Activity missing');
  const initial=await snapshot();assert(initial.progress.xp_events.length===0,'Fixture not empty');
  for(const width of [390,375,360,350]){
    await page.setViewportSize({width,height:850});await pencil().click();await panel().waitFor({state:'visible'});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.querySelector('.profile-settings-dialog').scrollWidth<=document.querySelector('.profile-settings-dialog').clientWidth),'Profile dialog overflow '+width);
    const close=page.getByRole('button',{name:'Închide setările profilului',exact:true}),box=await close.boundingBox();
    assert(box&&box.height>=40&&box.width>=40&&box.y>=0&&box.y+box.height<850,'Close target '+width);
    await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.querySelector('dialog[open]').contains(document.activeElement)),'Modal focus escaped');
    await page.screenshot({path:artifactDirectory+'/settings-'+width+'.png'});
    await page.keyboard.press('Escape');await panel().waitFor({state:'hidden'});assert(await pencil().evaluate(e=>e===document.activeElement),'Pencil focus not restored');
  }
  await pencil().click();await page.getByLabel('Nume afișat',{exact:true}).fill('Nesalvat');await panel().getByRole('button',{name:'Renunță',exact:true}).click();
  assert((await snapshot()).profile.display_name===initial.profile.display_name,'Cancel saved profile');
  await pencil().click();await page.getByLabel('Nume afișat',{exact:true}).fill('Alex QA');
  await page.route('**/api/account/profile',route=>route.request().method()==='POST'?route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:{code:'SERVER_ERROR'}})}):route.continue());
  await page.getByRole('button',{name:'Salvează profilul',exact:true}).click();await panel().getByRole('alert').waitFor();
  assert(await panel().isVisible(),'Save failure closed panel');assert((await snapshot()).profile.display_name!== 'Alex QA','Save failure modified profile');
  await page.unroute('**/api/account/profile');
  await page.getByLabel('Username',{exact:true}).fill('profile_qa_a');
  await page.getByRole('button',{name:'Salvează profilul',exact:true}).click();await panel().waitFor({state:'hidden'});
  await page.getByRole('heading',{name:'Alex QA',exact:true}).waitFor();
  const saved=await snapshot();assert(saved.profile.username==='profile_qa_a','Username edit not saved');assert(saved.profile.age_range===initial.profile.age_range&&saved.email===initial.email,'Hidden account data changed');
  await pencil().click();await page.getByRole('link',{name:'Schimbă parola',exact:true}).click();await page.waitForURL('**/resetare-parola');await profile();
  report.checks.push('Profile is compact; identity/stats/activity preserved; pencil dialog 390/375/360/350; keyboard/focus; cancel, save error/retry, real username/display-name update, hidden email/age retained, password route');

  const events=page.getByRole('checkbox',{name:'Evenimente importante',exact:true});await events.waitFor();await page.waitForFunction(()=>!document.querySelector('.notification-settings input[type=checkbox]:nth-child(1)')?.disabled);
  assert(await page.getByRole('checkbox').count()===5,'Preference semantics changed');
  await events.focus();const was=await events.isChecked();await page.keyboard.press('Space');
  await page.waitForFunction(()=>![...document.querySelectorAll('.notification-settings label')].find(e=>e.textContent.trim()==='Evenimente importante').querySelector('input').disabled);
  assert(await events.isChecked()!==was,'Space did not toggle');
  const color=await events.evaluate(e=>({appearance:getComputedStyle(e).appearance,radius:getComputedStyle(e).borderRadius,background:getComputedStyle(e).backgroundColor}));
  assert(color.appearance==='none'&&color.radius==='50%'&&color.background==='rgb(255, 255, 255)','Unchecked circle visual '+JSON.stringify(color));
  await events.focus();await page.keyboard.press('Space');await page.waitForTimeout(400);
  assert(await events.isChecked(),'Checked not restored');assert(await events.evaluate(e=>getComputedStyle(e).backgroundColor)==='rgb(22, 139, 204)','Checked circle not Finly blue');
  let release;
  await page.route('**/api/notifications/preferences',async route=>{if(route.request().method()!=='POST')return route.continue();await new Promise(resolve=>{release=resolve;});return route.continue();});
  const preferencesSaved=page.waitForResponse(r=>r.url().endsWith('/api/notifications/preferences')&&r.request().method()==='POST');
  const payments=page.getByRole('checkbox',{name:'Plăți și abonamente',exact:true});await payments.click();
  await page.waitForFunction(()=>[...document.querySelectorAll('.notification-settings input')].every(e=>e.disabled));assert(await events.isDisabled(),'Saving did not disable preferences');release();assert((await preferencesSaved).ok(),'Preference save failed');await page.unroute('**/api/notifications/preferences');
  await page.waitForFunction(()=>![...document.querySelectorAll('.notification-settings label')].find(e=>e.textContent.trim()==='Evenimente importante').querySelector('input').disabled);
  await page.screenshot({path:artifactDirectory+'/notification-circles-350.png',fullPage:true});
  report.checks.push('Five independent native checkboxes, Space toggle, white empty circles, blue filled circles without checkmarks, clickable labels and disabled save state');

  async function seed(count,unlockCount,streakDays=0){
    const current=await snapshot(),p=structuredClone(current.progress),stamp=current.serverTime;
    for(const lesson of lessons.slice(0,count))p.lessonStats[lesson.id]={completed:true,firstCompletedAt:stamp,lastCompletedAt:stamp,bestFirstTryCorrect:6,questionCount:10,perfectEver:false,completionCount:1,sessionIds:[]};
    for(const id of achievementIds.slice(0,unlockCount))p.achievementUnlocks[id]={unlockedAt:stamp};
    if(streakDays){const today=p.maxSeenDateKey;for(let i=0;i<streakDays;i++){const d=new Date(today+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-i);p.activityDates.push(d.toISOString().slice(0,10));}p.activityDates=[...new Set(p.activityDates)].sort();}
    p.seenAchievementToastIds=achievementIds;p.pendingLevelUp=null;
    const applied=await db.query('select public.apply_progress_mutation($1,$2,$3,$4,$5::jsonb,$6::jsonb,$7,$8) as result',[userId,crypto.randomUUID(),'qa_fixture',current.revision,JSON.stringify(p),'{}',streakDays,streakDays]);
    assert(applied.rows[0].result.status==='applied','Seed conflict');await profile();
  }
  for(const scenario of [{name:'new',count:0,unlocks:0},{name:'learning',count:3,unlocks:1},{name:'experienced',count:25,unlocks:15,streak:60},{name:'complete',count:lessons.length,unlocks:21}]){
    await seed(scenario.count,scenario.unlocks,scenario.streak??0);
    assert(await page.locator('[data-achievement]').count()<=5,'Goal wall '+scenario.name);assert(await page.locator('.profile-category-progress').count()<=3,'Category wall '+scenario.name);
    if(scenario.name==='experienced')assert(await page.locator('[data-achievement="first-month"]').count()===1,'Advanced goal mix hides SimLife');
    assert(await page.getByRole('heading',{name:'Jurnalul XP'}).count()===0,'XP UI '+scenario.name);assert(await page.getByRole('heading',{name:'Contul tău'}).count()===0,'Account wall '+scenario.name);
    if(scenario.name==='complete'){assert(await page.locator('[data-achievement]').count()===0,'Completed goals remain');assert((await page.locator('.profile-learning').innerText()).includes('100%'),'Complete learning state');}
    for(const width of [390,375,360,350]){await page.setViewportSize({width,height:850});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Profile overflow '+scenario.name+' '+width);await page.screenshot({path:artifactDirectory+'/profile-'+scenario.name+'-'+width+'.png',fullPage:true});}
  }
  report.checks.push('New, 3-lesson, 25-lesson/15-unlock/60-day-streak, and all-lessons/all-21-unlock profiles at all four widths; max five active goals/max three category rows; completed state');

  await page.goto(origin+'/');await page.locator('.fini-tip').waitFor();assert(await page.getByRole('link',{name:/Încearcă SimLife/}).count()===1,'Home branding');
  assert(await page.locator('.bottom-nav').getByRole('link',{name:'SimLife',exact:true}).count()===1,'Home nav branding');
  await page.locator('.bottom-nav').getByRole('link',{name:'SimLife',exact:true}).click();await page.getByRole('heading',{name:'Cum începi?',exact:true}).waitFor();
  for(const answer of ['Sunt la liceu','Cu părinții / familia','Transport public']){await page.getByRole('button',{name:answer,exact:true}).click();await page.getByRole('button',{name:'Continuă',exact:true}).click();}
  await page.getByRole('button',{name:'Începe simularea',exact:true}).click();await page.getByRole('heading',{name:'SimLife',exact:true}).waitFor();
  assert((await page.title()).includes('SimLife'),'Page metadata');
  await page.getByRole('button',{name:/^Notificări/}).click();await page.getByText('Noile situații din SimLife vor apărea aici.',{exact:true}).waitFor();await page.keyboard.press('Escape');
  await page.goto(origin+'/despre');assert(!/\bsimulator(?:ul|ului)?\b/iu.test(await page.locator('body').innerText()),'About legacy copy');
  report.checks.push('Home teaser, bottom navigation, /simulator heading and metadata, settings/inbox and About all use SimLife; technical /simulator route preserved');

  await profile();await pencil().click();await page.getByRole('button',{name:'Deconectează-te',exact:true}).click();await page.waitForURL('**/bun-venit');
  assert((await page.request.get(origin+'/api/progress')).status()===401,'Logout did not clear session');
  await page.goto(origin+'/autentificare');await page.getByLabel('Email',{exact:true}).fill('simulator_b@finly.test');await page.getByLabel('Parolă',{exact:true}).fill('localtestpass');await page.getByRole('button',{name:'Conectează-te',exact:true}).click();await page.getByRole('heading',{name:'Ce învățăm azi?'}).waitFor();await profile();
  const second=await snapshot();await pencil().click();
  await page.getByRole('button',{name:'Șterge contul',exact:true}).click();await page.getByRole('button',{name:'Continuă',exact:true}).click();
  const confirmation=page.getByLabel('Scrie username-ul exact: '+second.profile.username,{exact:true}),destroy=page.getByRole('button',{name:'Șterge definitiv contul',exact:true});
  assert(await destroy.isDisabled(),'Delete initially enabled');await confirmation.fill('wrong_username');assert(await destroy.isDisabled(),'Wrong username enabled deletion');
  const wrong=await page.request.delete(origin+'/api/account/profile',{headers:{origin,'X-Finly-Account':second.userId},data:{confirmation:'wrong_username'}});assert(wrong.status()===400&&users.has(second.userId),'Server deletion confirmation bypassed');
  await page.screenshot({path:artifactDirectory+'/delete-confirmation-350.png'});
  await confirmation.fill(second.profile.username);await destroy.click();await page.waitForURL('**/bun-venit');assert(!users.has(second.userId),'Local Auth user not deleted');assert((await db.query('select id from profiles where id=$1',[second.userId])).rows.length===0,'Profile deletion did not cascade');
  report.checks.push('Real logout clears protected session; deletion remains two-step plus exact username; wrong server confirmation rejected; correct local deletion/cleanup/cascade succeeds');
  assert(report.errors.length===0,'Browser errors: '+report.errors.join('; '));assert(report.providerErrors.length===0,'Local provider errors: '+report.providerErrors.join('; '));
  fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){report.failure=error.message;fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));await page?.screenshot({path:artifactDirectory+'/failure.png',fullPage:true}).catch(()=>{});throw error;}
finally{await browser?.close();if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});server.closeAllConnections();if(server.listening)await new Promise(resolve=>server.close(resolve));await db.close();}
`;
const runner=path.resolve('artifacts/profile-polish/browser-runner.mjs');fs.mkdirSync(path.dirname(runner),{recursive:true});fs.writeFileSync(runner,source);
const config=fs.readFileSync('next.config.ts','utf8');fs.writeFileSync('next.config.ts',config.replace('export default nextConfig;',`nextConfig.distDir = '.next-profile-polish-${Date.now()}';\nexport default nextConfig;`));
try{await import(pathToFileURL(runner).href);}finally{fs.writeFileSync('next.config.ts',config);}
