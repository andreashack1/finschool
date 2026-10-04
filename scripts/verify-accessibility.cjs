/* eslint-disable @typescript-eslint/no-require-imports -- Browser accessibility and adjacent-flow regression checks. */
const { chromium } = require(process.env.FINLY_PLAYWRIGHT_PATH || 'playwright');
const AxeBuilder = require(process.env.FINLY_AXE_PATH || '@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { displayedCorrectIndex } = require('./browser-lesson-options.cjs');
const base = process.env.FINLY_BASE_URL || 'http://127.0.0.1:3100';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const width of [375, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const scan = async label => {
        const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        results.push({ width, label, violations: result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      };
      for (const route of ['/', '/lectii', '/lectii/economii', '/lectii/primul-job', '/lectii/economia-pe-scurt', '/lectii/investitii-de-la-zero', '/?tab=profile', '/?tab=simulator']) {
        await page.goto(base + route, { waitUntil: 'networkidle' });
        await scan(route);
      }
      const {load}=require('./learning-test-content.cjs');
      const {getReadyLessons}=load('src/content/lessons/index.ts');
      const engine=load('src/lib/progress.ts');
      await page.evaluate(()=>localStorage.setItem('finly-progress-v2',JSON.stringify({version:1,completedLessonIds:['primul-buget']})));
      await page.addLocatorHandler(page.locator('.finly-level-dialog'),async()=>{await page.locator('.finly-level-dialog .app-button').click();});
      for(const lesson of getReadyLessons()){
        await page.goto(base+'/lectie/'+lesson.id,{waitUntil:'networkidle'});
        for(const screen of lesson.screens){
          await page.getByRole('heading',{name:screen.title,exact:true}).waitFor();
          if(['situatie','explicatie','caz_real','tine_minte','final'].includes(screen.type))await scan(lesson.id+'/'+screen.id);
          if(screen.type==='final')break;
          if(engine.isAnswerScreen(screen)){
            await scan(lesson.id+'/'+screen.id+'/question');
            if(screen.caseId){await page.getByRole('button',{name:'Recitește cazul'}).click();await page.locator('dialog').waitFor();await scan(lesson.id+'/'+screen.id+'/case-reader');await page.keyboard.press('Escape');}
            const i=await displayedCorrectIndex(page,screen);
            await page.locator('.lesson-answer').nth(i).click();
            await page.locator('.lesson-feedback').waitFor();
            if(screen.id===lesson.screens[2].id)await scan(lesson.id+'/feedback');
          }
          await page.locator('.lesson-continue').click();
        }
      }
      await context.close();
    }
    fs.writeFileSync('artifacts/learning-accessibility.json', JSON.stringify(results, null, 2));
    const failures = results.filter(r => r.violations.length);
    console.log(JSON.stringify({ scans: results.length, failures }, null, 2));
    assert.equal(failures.length, 0);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
