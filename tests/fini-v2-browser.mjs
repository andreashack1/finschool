// Run in an isolated source copy. Reuses existing local-only account transport.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
if(fs.existsSync('.git'))throw Error('Run in an isolated source copy.');
// Test-only route exists exclusively in the isolated QA copy, never in production.
fs.mkdirSync('app/fini-qa',{recursive:true});
fs.writeFileSync('app/fini-qa/page.tsx',`import {FinlyMascot} from '../components/finly-brand';
export default function Page(){return <main style={{padding:24,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:20}}>{(['head','bust','full'] as const).flatMap(framing=>(['normal','thinking','correct','wrong','excited','serious'] as const).map(mood=><figure key={framing+mood} style={{margin:0,background:'#E7F3FF'}}><FinlyMascot framing={framing} mood={mood} className="qa-fini"/><figcaption>{framing}/{mood}</figcaption></figure>))}<style>{'.qa-fini{width:100%;height:160px}'}</style></main>}`);
const profile=fs.readFileSync('tests/profile-polish-browser.mjs','utf8');
const builder=profile.slice(0,profile.indexOf('source+=String.raw`')).replace(/^import .*;\r?$/gm,'');
let source=new Function('fs','path','pathToFileURL',builder+'\nreturn source;')(fs,path,pathToFileURL);
source=source.replace("args: ['--disable-gpu']", "args: []");
source=source.replaceAll('profile-polish','fini-v2').replaceAll('3205','3215').replaceAll('3206','3216');
source+=String.raw`
  report.viewports=[];
  const imageFailures=[];
  // Home may position its transparent canvas beside the text. Check the
  // painted character, rather than treating transparent pixels as a collision.
  const {default:sharp}=await import('sharp');
  const alpha=await sharp('public/brand/fini-v2/home.webp').ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const paintedBounds={left:alpha.info.width,bottom:0};
  for(let y=0;y<alpha.info.height;y++)for(let x=0;x<alpha.info.width;x++)if(alpha.data[(y*alpha.info.width+x)*4+3]>128){paintedBounds.left=Math.min(paintedBounds.left,x);paintedBounds.bottom=Math.max(paintedBounds.bottom,y+1);}
  page.on('response',r=>{if(r.url().includes('/_next/image')&&r.status()>=400)imageFailures.push(r.status()+' '+r.url());});
  async function check(name,width){
    await page.locator('img.fini-v2').first().waitFor();
    await page.waitForFunction(()=>[...document.querySelectorAll('img.fini-v2')].every(i=>i.complete&&i.naturalWidth>0));
    const images=await page.locator('img.fini-v2').evaluateAll(items=>items.map(i=>({src:i.currentSrc,alt:i.alt,fit:getComputedStyle(i).objectFit,box:i.getBoundingClientRect().toJSON()})));
    assert(images.every(i=>decodeURIComponent(i.src).includes('/brand/fini-v2/')&&i.alt.startsWith('Fini, leul Finly')&&i.fit==='contain'),'Wrong mascot '+name);
    assert(await page.locator('img.fini-v2').evaluateAll(items=>items.every(i=>getComputedStyle(i).backgroundColor==='rgba(0, 0, 0, 0)')),'Opaque mascot styling '+name);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Page overflow '+name+' '+width);
    assert(images.every(i=>i.box.x>=0&&i.box.x+i.box.width<=width+1),'Mascot outside viewport '+name+' '+width);
    if(name==='home'){
      const copy=await page.locator('.continue-copy').boundingBox(),mascot=await page.locator('.continue-fini').boundingBox(),bottom=await page.locator('.continue-bottom').boundingBox();
      const scale=Math.min(mascot.width/alpha.info.width,mascot.height/alpha.info.height);
      const paintedLeft=mascot.x+(mascot.width-alpha.info.width*scale)/2+paintedBounds.left*scale;
      const paintedBottom=mascot.y+(mascot.height-alpha.info.height*scale)/2+paintedBounds.bottom*scale;
      assert(copy.x+copy.width<=paintedLeft+1,'Home text overlaps mascot '+width);
      assert(paintedBottom<=bottom.y+1,'Home mascot overlaps controls '+width);
      assert(decodeURIComponent(await page.locator('.continue-fini').getAttribute('src')).includes('/home.webp'),'Home pose');
      assert(decodeURIComponent(await page.locator('.fini-tip img').getAttribute('src')).includes('/thinking.webp'),'Thinking pose');
    }
    await page.screenshot({path:artifactDirectory+'/'+name+'-'+width+'.png',animations:'disabled',timeout:60000});
    report.viewports.push({name,width,images:images.length});
    if(name==='home'){
      await page.locator('.fini-tip').scrollIntoViewIfNeeded();
      await page.screenshot({path:artifactDirectory+'/fact-'+width+'.png',animations:'disabled',timeout:60000});
    }
  }
  for(const width of [350,360,375,390,430,1280]){
    await page.setViewportSize({width,height:900});
    for(const [name,url] of [['home','/'],['profile','/?tab=profile'],['about','/despre']]){await page.goto(origin+url);await check(name,width);}
  }
  await page.goto(origin+'/simulator');await page.getByRole('heading',{name:'Cum începi?',exact:true}).waitFor();
  for(const answer of ['Sunt la liceu','Cu părinții / familia','Transport public']){await page.getByRole('button',{name:answer,exact:true}).click();await page.getByRole('button',{name:'Continuă',exact:true}).click();}
  await page.getByRole('button',{name:'Începe simularea',exact:true}).click();await page.locator('.sim-fini').waitFor();
  for(const width of [350,360,375,390,430,1280]){await page.setViewportSize({width,height:900});await check('simlife',width);}
  await context.clearCookies();
  for(const width of [350,360,375,390,430,1280]){
    await page.setViewportSize({width,height:900});await page.goto(origin+'/bun-venit');await check('welcome',width);
  }
  await page.goto(origin+'/incepe');await page.locator('.lesson-question').waitFor();
  await page.locator('button.lesson-continue').click();
  for(const width of [350,360,375,390,430,1280]){await page.setViewportSize({width,height:900});await check('lesson-guide',width);}
  for(let step=0;step<30;step++){
    if(await page.locator('.lesson-finish').count())break;
    const answers=page.locator('button.lesson-answer');if(await answers.count())await answers.first().click();
    await page.locator('button.lesson-continue').click();await page.waitForTimeout(100);
  }
  await page.locator('.lesson-finish-mascot').waitFor();
  assert(decodeURIComponent(await page.locator('.lesson-finish-mascot').getAttribute('src')).includes('/excited.webp'),'Completion pose');
  for(const width of [350,360,375,390,430,1280]){await page.setViewportSize({width,height:900});await check('lesson-complete',width);}
  for(const width of [350,360,375,390,430,1280]){await page.setViewportSize({width,height:900});await page.goto(origin+'/fini-qa');await check('all-moods',width);assert(await page.locator('img.fini-v2').count()===18,'Missing mood/framing');}
  for(const filename of ['home','thinking','excited','excited-head','profile','correct','neutral-full']){
    const response=await page.request.get(origin+'/_next/image?url='+encodeURIComponent('/brand/fini-v2/'+filename+'.webp')+'&w=384&q=75');
    assert(response.ok(),'Next Image optimization '+filename);report.checks.push('Optimized '+filename+': '+(await response.body()).length+' bytes');
  }
  assert(imageFailures.length===0,'Next Image responses failed: '+imageFailures.join('; '));
  assert(report.errors.length===0,'Browser errors: '+report.errors.join('; '));
  report.checks.push('48 route/viewport checks plus fact captures: transparent V2 only, distinct poses, 18 API combinations, real trial completion, no overflow, Home text/CTA separation, no runtime or image errors');
  fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){report.failure=error.message;fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));await page?.screenshot({path:artifactDirectory+'/failure.png',fullPage:true}).catch(()=>{});throw error;}
finally{await browser?.close();if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});server.closeAllConnections();if(server.listening)await new Promise(resolve=>server.close(resolve));await db.close();}
`;
const runner=path.resolve('artifacts/fini-v2/browser-runner.mjs');fs.mkdirSync(path.dirname(runner),{recursive:true});fs.writeFileSync(runner,source);
const config=fs.readFileSync('next.config.ts','utf8');
fs.writeFileSync('next.config.ts',config.replace('export default nextConfig;',`nextConfig.distDir = '.next-fini-v2';\nnextConfig.turbopack = {root: ${JSON.stringify(path.dirname(process.cwd()))}};\nexport default nextConfig;`));
try{await import(pathToFileURL(runner).href);}finally{fs.writeFileSync('next.config.ts',config);}
