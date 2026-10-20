// Real local Next/Auth SDK/PostgreSQL, using the established isolated QA harness.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
if(fs.existsSync('.git'))throw new Error('Run in an isolated source copy.');
const driver=fs.readFileSync('tests/simulator-life-profile-browser.mjs','utf8');
const builder=driver.slice(driver.indexOf("if (fs.existsSync('.git'))"),driver.lastIndexOf('const runner='));
let source=new Function('fs','path','pathToFileURL',builder+'\nreturn source;')(fs,path,pathToFileURL);
// Use a physical node_modules copy: Turbopack rejects external junctions.
source=source.replaceAll('artifacts/life-profile/browser','artifacts/final-quality/browser');
source=source.replace("'0012_simulator_savings_goal.sql']","'0012_simulator_savings_goal.sql','0013_simulator_daily_floor.sql']");
source=source.replace('        upgrade_simulator_decisions:',`        upgrade_simulator_daily_floor: ['select public.upgrade_simulator_daily_floor($1,$2,$3,$4,$5,$6,$7::jsonb) as result',[body.p_user,body.p_run,body.p_expected,body.p_day,body.p_now,body.p_development,JSON.stringify(body.p_policy)]],
        upgrade_simulator_decisions:`);
source=source.replace("if(scenario.name==='a'||scenario.name==='b')",'if(scenarios.includes(scenario))');
source=source.replace("await context.clearCookies();await login(page,'legacy');","const legacyClock=(await context.cookies(origin)).filter(c=>c.name==='finly_sim_dev_minute_offset');await context.clearCookies();await context.addCookies(legacyClock);await login(page,'legacy');");
const eventQa=String.raw`
      const current=await api('dev/events');
      const nextEvent=current.instances.filter(e=>e.status==='pending'&&e.scheduledAt>=current.effectiveTime).sort((a,b)=>a.scheduledAt.localeCompare(b.scheduledAt))[0];
      if(nextEvent){
        const cookies=await context.cookies(origin),offset=Number(cookies.find(c=>c.name==='finly_sim_dev_minute_offset')?.value??0);
        const showOffset=offset+Math.ceil((Date.parse(nextEvent.scheduledAt)-Date.parse(current.effectiveTime))/60000)+1;
        await context.addCookies([{name:'finly_sim_dev_minute_offset',value:String(showOffset),domain:'127.0.0.1',path:'/'}]);
        await page.reload();await page.getByRole('heading',{name:'Evenimentele de azi',exact:true}).waitFor();
        assert(await page.getByText(nextEvent.snapshot.presentation?.title??nextEvent.snapshot.title,{exact:true}).count()>0,'Event not surfaced');
        for(const width of [390,375,360]){
          await page.setViewportSize({width,height:850});
          assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Event overflow '+scenario.name+' '+width);
          assert(await page.locator('.sim-event-time').count()>0,'Event time absent');
          await page.screenshot({path:artifactDirectory+'/events-'+scenario.name+'-'+width+'.png',fullPage:true});
        }
        await context.addCookies([{name:'finly_sim_dev_minute_offset',value:String(showOffset+31),domain:'127.0.0.1',path:'/'}]);
        const expired=await api('dev/events'),saved=expired.instances.find(e=>e.id===nextEvent.id);
        assert(saved.status==='resolved'&&saved.resolutionMode==='automatic','Automatic expiry failed');
        await api('dashboard');
        const again=await api('dev/events');assert(again.instances.length===expired.instances.length,'Refresh duplicated events');
        report.checks.push(scenario.name+': real event surfaces at scheduled time, mobile rows 390/375/360, 30-minute automatic expiry, stable refresh');
      }
`;
source=source.replace("      report.checks.push(scenario.activityStatus+",eventQa+"\n      report.checks.push(scenario.activityStatus+");
source=source.replace("assert(program.start===",`const activeDay=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(inspected.effectiveTime));
        const activeInstances=inspected.instances.filter(e=>e.day===activeDay&&e.status!=='cancelled');
        assert(activeInstances.length>=2,'Daily floor '+scenario.name+' '+activeDay);
        assert(inspected.engine.policyVersion===4,'Policy upgrade absent');
        const publicArea=await api('dashboard');
        assert([...publicArea.events.pending,...publicArea.events.resolved].every(e=>e.scheduledAt<=publicArea.events.serverNow),'Future event leaked');
        const calendar=await api('calendar?month='+activeDay.slice(0,7));
        assert(!JSON.stringify(calendar).includes('definitionId'),'Random events leaked into calendar');
        assert(program.start===`);
const lessonQa=String.raw`
  const lessonFixtures=JSON.parse(fs.readFileSync('artifacts/final-quality/lessons-before.json','utf8'));
  for(const lessonId of ['ce-sunt-banii','primul-contract-de-munca','de-ce-investim']){
    const lesson=lessonFixtures.find(l=>l.id===lessonId);
    await page.goto(origin+'/lectie/'+lesson.slug);
    await page.locator('.lesson-continue').waitFor();
    for(const screen of lesson.screens){
      if(screen.type==='tine_minte')break;
      if(screen.options){const correct=screen.options.find(o=>o.id===screen.correctOption);await page.locator('.lesson-answer').filter({hasText:correct.label}).click();}
      if(screen.type==='adevarat_fals'){await page.locator('.lesson-answer').filter({hasText:screen.correctAnswer?'Adevărat':'Fals'}).click();}
      await page.locator('.lesson-continue').click();
      await page.waitForTimeout(70);
    }
    const cards=page.locator('.lesson-remember article');await cards.first().waitFor();
    const count=await cards.count();assert(count>=4,'Missing recap cards');
    assert(await page.locator('.lesson-remember button[aria-expanded="false"]').count()===count,'Missing toggle');
    for(const width of [390,375,360]){
      await page.setViewportSize({width,height:850});
      for(let i=0;i<count;i++){
        const card=cards.nth(i),button=card.locator('button');
        if(await button.getAttribute('aria-expanded')!=='true')await button.click();
        await page.waitForTimeout(240);
        assert(await card.locator('[role="region"]').getAttribute('aria-hidden')==='false','Detail not connected');
        assert((await card.locator('.remember-keyword').count())>=1,'Missing blue concepts');
        const box=await button.boundingBox();assert(box.height>=44,'Small takeaway touch target');
        const info=await card.locator('.remember-body').innerText();assert(info.trim().length>30,'Unhelpful detail');
      }
      assert(await page.locator('.lesson-remember button[aria-expanded="true"]').count()===count,'Multi-open broken');
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Recap overflow '+lessonId+' '+width);
      const correctColor=await cards.first().locator('.remember-keyword').first().evaluate(el=>{const probe=document.createElement('span');probe.style.color='var(--blue-ink)';el.parentElement.append(probe);const expected=getComputedStyle(probe).color;probe.remove();return getComputedStyle(el).color===expected;});assert(correctColor,'Highlight does not use Finly blue');
      await page.screenshot({path:artifactDirectory+'/takeaway-'+lessonId+'-'+width+'.png',fullPage:true});
    }
    const button=cards.first().locator('button');await button.focus();await page.keyboard.press('Enter');await page.waitForTimeout(250);
    assert(await button.getAttribute('aria-expanded')==='false','Keyboard collapse failed');
    await page.keyboard.press('Space');await page.waitForTimeout(250);assert(await button.getAttribute('aria-expanded')==='true','Keyboard expansion failed');
    await page.emulateMedia({reducedMotion:'reduce'});
    assert(await cards.first().locator('.remember-body').evaluate(el=>getComputedStyle(el).transitionDuration)==='0s','Reduced motion ignored');
    await page.emulateMedia({reducedMotion:'no-preference'});
    report.checks.push(lessonId+': all cards/action expand, multiple open, blue terms, Enter/Space, reduced motion, 390/375/360 without overflow');
  }
`;
source=source.replace("  const legacy=[...users.values()]",lessonQa+"\n  const legacy=[...users.values()]");
const runner=path.resolve('artifacts/final-quality/browser-runner.mjs');
fs.mkdirSync(path.dirname(runner),{recursive:true});fs.writeFileSync(runner,source);
await import(pathToFileURL(runner).href);
