// Focused visual QA. Run only from the isolated source copy.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
if(fs.existsSync('.git'))throw Error('Run in an isolated source copy.');
const profile=fs.readFileSync('tests/profile-polish-browser.mjs','utf8');
const builder=profile.slice(0,profile.indexOf('source+=String.raw`')).replace(/^import .*;\r?$/gm,'');
let source=new Function('fs','path','pathToFileURL',builder+'\nreturn source;')(fs,path,pathToFileURL);
source=source.replace("args: ['--disable-gpu']",'args: []').replaceAll('profile-polish','fini-home-scale').replaceAll('3205','3225').replaceAll('3206','3226');
source=source.replace("import fs from 'node:fs';","import fs from 'node:fs';\nimport sharp from 'sharp';");
source+=String.raw`
  report.viewports=[];
  const alpha=await sharp('public/brand/fini-v2/home.webp').ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const bounds={left:alpha.info.width,right:0,top:alpha.info.height,bottom:0};
  for(let y=0;y<alpha.info.height;y++)for(let x=0;x<alpha.info.width;x++)if(alpha.data[(y*alpha.info.width+x)*4+3]>128){bounds.left=Math.min(bounds.left,x);bounds.right=Math.max(bounds.right,x+1);bounds.top=Math.min(bounds.top,y);bounds.bottom=Math.max(bounds.bottom,y+1);}
  for(const width of [350,360,375,390,430,1280]){
    await page.setViewportSize({width,height:1000});await page.goto(origin+'/');await page.locator('.continue-fini').waitFor();
    await page.waitForFunction(()=>[...document.querySelectorAll('img.fini-v2')].every(i=>i.complete&&i.naturalWidth>0));
    const baseline=await page.addStyleTag({content:fs.readFileSync('artifacts/fini-home-scale/before.css','utf8')});
    await page.screenshot({path:artifactDirectory+'/before-'+width+'.png',animations:'disabled'});await baseline.evaluate(e=>e.remove());
    const mascot=await page.locator('.continue-fini').boundingBox(),copy=await page.locator('.continue-copy').boundingBox(),card=await page.locator('.continue-card').boundingBox(),controls=await page.locator('.continue-bottom').boundingBox();
    const painted={left:mascot.x+mascot.width*bounds.left/alpha.info.width,right:mascot.x+mascot.width*bounds.right/alpha.info.width,top:mascot.y+mascot.height*bounds.top/alpha.info.height,bottom:mascot.y+mascot.height*bounds.bottom/alpha.info.height};
    assert(copy.x+copy.width<=painted.left,'Text/visible mascot collision '+width);
    assert(painted.left>=card.x&&painted.right<=card.x+card.width&&painted.top>=card.y&&painted.bottom<=card.y+card.height,'Character cropped '+width);
    assert(painted.bottom<=controls.y,'Mascot/control collision '+width);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow '+width);
    assert(decodeURIComponent(await page.locator('.continue-fini').getAttribute('src')).includes('/brand/fini-v2/home.webp'),'Changed V2 source');
    await page.screenshot({path:artifactDirectory+'/after-'+width+'.png',animations:'disabled'});
    await page.locator('.continue-card').screenshot({path:artifactDirectory+'/card-'+width+'.png',animations:'disabled'});
    await page.locator('.continue-copy h2').evaluate(e=>e.textContent='Cheltuielile neprevăzute');
    const titleRight=await page.locator('.continue-copy h2').evaluate(e=>{const range=document.createRange();range.selectNodeContents(e);return Math.max(...[...range.getClientRects()].map(r=>r.right));});
    assert(titleRight<=painted.left,'Long lesson title overlaps mascot '+width);
    await page.screenshot({path:artifactDirectory+'/long-title-'+width+'.png',animations:'disabled'});
    await page.goto(origin+'/?tab=profile');await page.locator('.profile-badge img').waitFor();
    await page.screenshot({path:artifactDirectory+'/profile-'+width+'.png',animations:'disabled'});
    report.viewports.push({width,canvasWidth:mascot.width,visibleWidth:painted.right-painted.left,visibleHeight:painted.bottom-painted.top,textGap:painted.left-copy.x-copy.width,controlsGap:controls.y-painted.bottom});
  }
  assert(report.errors.length===0,'Runtime errors: '+report.errors.join('; '));
  report.checks.push('Home source unchanged; alpha-aware footprint, face/hands inside card, text/controls separated, no viewport overflow, Profile captures at all widths');
  fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){report.failure=error.message;fs.writeFileSync(artifactDirectory+'/report.json',JSON.stringify(report,null,2));await page?.screenshot({path:artifactDirectory+'/failure.png'}).catch(()=>{});throw error;}
finally{await browser?.close();if(next?.pid)await new Promise(resolve=>{const kill=spawn('taskkill',['/pid',String(next.pid),'/t','/f'],{windowsHide:true,stdio:'ignore'});kill.on('exit',resolve);});server.closeAllConnections();if(server.listening)await new Promise(resolve=>server.close(resolve));await db.close();}
`;
const runner=path.resolve('artifacts/fini-home-scale/browser-runner.mjs');fs.writeFileSync(runner,source);
const config=fs.readFileSync('next.config.ts','utf8');fs.writeFileSync('next.config.ts',config.replace('export default nextConfig;',`nextConfig.distDir='.next-home-scale';\nnextConfig.turbopack={root:${JSON.stringify(path.dirname(process.cwd()))}};\nexport default nextConfig;`));
try{await import(pathToFileURL(runner).href);}finally{fs.writeFileSync('next.config.ts',config);}
