import fs from 'node:fs';
const {chromium}=await import(process.env.FINLY_PLAYWRIGHT_PATH || 'file:///C:/Users/Fabian/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs');
const origin=process.env.FINLY_QA_URL || 'http://127.0.0.1:3128';
const browser=await chromium.launch({headless:true,channel:"chrome"});
const page=await browser.newPage({viewport:{width:390,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const assert=(v,m)=>{if(!v)throw Error(m);};let resends=0,limited=false;
try{
 await page.route('**/api/account/username*',r=>r.fulfill({json:{available:true}}));
 await page.route('**/api/account/auth',async r=>{
  const body=r.request().postDataJSON();
  if(body.action==='resend'){resends++;await r.fulfill({status:limited?429:200,json:limited?{error:{code:'RATE_LIMITED'}}:{ok:true}});}
  else await r.fulfill({json:{state:'check_email_or_login'}});
 });
 await page.goto(origin+'/creeaza-cont');
 await page.getByLabel('Email',{exact:true}).fill(' NEW@example.com ');
 await page.getByLabel('Username',{exact:true}).fill('verification_user');
 await page.getByLabel('Interval de vârstă').selectOption('20+');
 await page.getByLabel('Parolă',{exact:true}).fill('abcdefgh');await page.getByLabel('Repetă parola',{exact:true}).fill('abcdefgh');
 await page.locator('[name=terms]').check();await page.locator('[name=privacy]').check();
 await page.getByRole('button',{name:'Creează-mi cont',exact:true}).click();await page.waitForURL('**/verifica-email');
 await page.getByRole('heading',{name:'Verifică-ți emailul'}).waitFor();
 assert(await page.getByLabel('Email',{exact:true}).inputValue()==='new@example.com','Pending email missing');
 assert(!page.url().includes('example'),'Email leaked into URL');
 await page.getByRole('button',{name:/Retrimite peste/}).waitFor();
 await page.reload();await page.getByRole('button',{name:/Retrimite peste/}).waitFor();
 assert(await page.getByRole('button',{name:/Retrimite peste/}).isDisabled(),'Reload reset cooldown');
 await page.clock.install();
 for(let i=0;i<3;i++){
  await page.clock.fastForward(61000);await page.getByRole('button',{name:'Retrimite emailul',exact:true}).click();
  await page.getByText('Dacă emailul necesită confirmare, vei primi un link nou.',{exact:true}).waitFor();
  assert(await page.getByRole('button',{name:/Retrimite peste/}).isDisabled(),'Resend cooldown missing');
 }
 assert(resends===3,'Repeated resend failed');limited=true;
 await page.clock.fastForward(61000);await page.getByRole('button',{name:'Retrimite emailul',exact:true}).click();
 await page.getByRole('alert').filter({hasText:'Mai așteaptă puțin înainte să ceri un email nou.'}).waitFor();
 assert(await page.getByRole('link',{name:'Conectează-te',exact:true}).getAttribute('href')==='/autentificare','Login recovery missing');
 assert(await page.getByRole('link',{name:'Ai uitat parola?'}).getAttribute('href')==='/resetare-parola','Reset missing');
 assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'Mobile overflow');
 fs.mkdirSync('artifacts/auth-verification',{recursive:true});await page.screenshot({path:'artifacts/auth-verification/verification-390.png',fullPage:true});
 assert(errors.length===0,errors.join(';'));
 console.log('PASS: signup pending email; refresh cooldown; three repeated resends; 429 copy; login/reset recovery; mobile overflow; no browser errors. Auth API responses simulated; real provider contract tested separately.');
}finally{await browser.close();}

