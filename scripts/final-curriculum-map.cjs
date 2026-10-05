/* eslint-disable @typescript-eslint/no-require-imports -- Static curriculum authoring. */
const fs = require('node:fs');
const before = require('../artifacts/curriculum-final-before.json');
const slug = title => title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const map = [
 ['cuvintele-banilor','Cuvintele banilor','Termenii pe care îi auzi zilnic, explicați pe îndelete: dobândă, TVA, taxe, inflație.',[
  ['bazele','Bazele',['Ce sunt banii','Venit, cheltuieli și ce rămâne','Ce deții și ce datorezi']],
  ['preturi-si-dobanzi','Prețuri și dobânzi',['Inflația','Dobânda','Banca centrală (BNR)','Cerere și ofertă']],
  ['taxe-si-valute','Taxe și valute',['TVA','Impozit, taxă și contribuție','Cursul valutar și euro']]]],
 ['bani-de-zi-cu-zi','Cheltuiești deștept',null,[
  ['nevoi-si-dorinte','Nevoi și costuri reale',['Nevoi vs. dorințe','Costul real al unui produs','Bonul, factura și chitanța']],
  ['capcanele-cumparaturilor','Capcanele cumpărăturilor',['Cumpărăturile pe impuls','Reduceri care nu sunt reduceri','Cum te conving reclamele','Cumpărături în jocuri și aplicații']],
  ['cumperi-inteligent','Cumperi inteligent',['Abonamentele','Drepturile consumatorului','Ieșiri cu prietenii fără să te golești']]]],
 ['carduri-si-banca','Banca și cardul tău',null,[
  ['contul-tau','Contul tău',['Ce face o bancă și cum alegi un cont','IBAN','Comisioane bancare']],
  ['cardul','Cardul și plățile',['Cardul de debit','Plăți digitale','Transferuri și plăți instant','Cardul în străinătate']],
  ['siguranta-banilor','Siguranța banilor',['Extrasul de cont','Sunt banii mei în siguranță la bancă?','Contul pentru minori']]]],
 ['siguranta-financiara','Nu te lăsa păcălit',null,[
  ['mesaje-si-apeluri-false','Mesaje și apeluri false',['Phishing','Apelul fals de la „bancă”','Anunțuri și livrări false']],
  ['magazine-si-oferte-false','Magazine și oferte false',['Magazine false','Oferte prea bune ca să fie reale','Piramide și scheme „bani rapizi”']],
  ['datele-tale','Datele și conturile tale',['Protejează datele cardului','Furtul de identitate','Conturi folosite de alții','Ce faci dacă ai fost înșelat']]]],
 ['economii','Buget și economii',null,[
  ['bugetul','Bugetul',['Primul tău buget','Unde dispar banii','Metoda 50/30/20','Bani de buzunar și venituri neregulate']],
  ['economisirea','Economisirea',['De ce economisim și cât','Plătește-te pe tine primul','Obiective de economisire']],
  ['unde-pui-banii','Unde pui banii',['Fondul de urgență','Unde ții banii: cont, depozit, numerar','Dobânda compusă']]]],
 ['primul-job','Primul job, primul salariu',null,[
  ['primul-job','Primul job',['Primul contract de muncă','Cum citești un contract','Muncă part-time și student']],
  ['salariul','Salariul',['Salariu brut vs. net','Fluturașul de salariu','Salariul minim','Tichete și beneficii']],
  ['taxele','Taxe și după salariu',['Taxele pe salariu: CAS, CASS, impozit','Pensia: de ce contează de la primul salariu','Ce faci cu primul salariu']]]],
 ['credite-si-datorii','Credite și datorii',null,[
  ['bazele-creditului','Bazele creditului',['Ce este creditul','Dobânda la credit și DAE','Rata lunară și costul total','Dobândă fixă vs. variabilă']],
  ['credite-de-zi-cu-zi','Credite de zi cu zi',['Cardul de credit','Plata în rate și „cumpără acum, plătește mai târziu”','Creditele rapide (IFN)']],
  ['datorii-si-scor','Datorii și scor',['Scorul de credit','Ce se întâmplă dacă nu-ți plătești datoria','Cum ieși din datorii']]]],
 ['pe-cont-propriu','Pe cont propriu',null,[
  ['casa-ta','Casa ta',['Cât costă să te muți singur','Chirie și contract de închiriere','Utilități și cum citești o factură','Cumperi casă sau închiriezi']],
  ['cumparaturi-mari','Cheltuieli mari',['Primul telefon sau laptop','Asigurări: RCA, locuință, călătorie','Burse și costul facultății']],
  ['viata-de-zi-cu-zi','Viața de zi cu zi',['Cheltuielile din supermarket','Cheltuieli neprevăzute','Banii între prieteni și într-o relație']]]],
 ['de-ce-cheltuim-cum-cheltuim','De ce cheltuim cum cheltuim',null,[
  ['presiunea-din-jur','Presiunea din jur',['FOMO și cheltuieli','Presiunea socială','Cum vorbești despre bani']],
  ['creierul-si-banii','Creierul și banii',['Cheltuieli emoționale','Efectul de ancorare','Prețurile psihologice (99,99)','De ce cheltuim mai mult cu cardul decât cu numerarul']],
  ['obiceiuri','Obiceiuri',['Gratificarea imediată vs. viitor','Cheltuieli mici care se adună','Obiceiuri bune cu banii']]]],
 ['investitii-de-la-zero','Investiții de la zero',null,[
  ['bazele','Bazele',['De ce investim','Risc și randament','Diversificarea']],
  ['instrumente','Instrumente',['Acțiuni','Obligațiuni și titluri de stat','ETF-uri și fonduri','Cum funcționează bursa']],
  ['atentie-la-capcane','Atenție și început',['Investești vs. speculezi','Crypto: ce trebuie să știi','Cum începi cu sume mici']]]],
];
const preserved = new Map(before.written.filter(l => l.formatVersion === 2).map(l => [l.title, l]));
const seen = new Set();
const categories = map.map(([id,title,subtitle,chapters], i) => {
 const old = before.categories.find(c => c.id === id);
 return {...old,id,slug:id,title,subtitle:subtitle ?? old.subtitle,icon:old?.icon ?? 'BookOpen',softColor:old?.softColor ?? '#EAF6FF',difficulty:i<5?'usor':i<9?'mediu':'greu',order:i+1,chapters:chapters.map(([chapterId,chapterTitle,titles])=>({id:chapterId,title:chapterTitle,lessons:titles.map(title=>{
  const lessonId = preserved.get(title)?.id ?? slug(title);
  if(seen.has(lessonId)) throw new Error('Conflicting lesson ID: '+lessonId);
  seen.add(lessonId);return lessonId;
 })}))};
});
if(categories.length!==10 || seen.size!==100)throw new Error('Invalid canonical counts');
fs.mkdirSync('src/content/archive',{recursive:true});
fs.writeFileSync('src/content/archive/removed-categories.ts','// Historical reference only. Never imported by the active application.\nexport const removedCategories = '+JSON.stringify(before.categories.filter(c=>!categories.some(n=>n.id===c.id)),null,2)+' as const;\n');
fs.writeFileSync('src/content/categories.ts','import { CategorySchema } from "../types/learning-schema";\n\nexport const categories = CategorySchema.array().parse('+JSON.stringify(categories,null,2)+');\n// Existing money/economy links resolve to the combined vocabulary category.\nconst categoryAliases: Record<string, string> = { "cum-functioneaza-banii": "cuvintele-banilor", "economia-pe-scurt": "cuvintele-banilor" };\nexport const getCategory = (idOrSlug: string) => categories.find(c => c.id === (categoryAliases[idOrSlug] ?? idOrSlug) || c.slug === idOrSlug);\n');
const entries = map.flatMap(([, , , chapters],i)=>chapters.flatMap(([, ,titles],j)=>titles.map((title,k)=>({id:categories[i].chapters[j].lessons[k],title,categoryId:categories[i].id,chapterId:categories[i].chapters[j].id,existing:preserved.has(title)}))));
fs.writeFileSync('artifacts/canonical-curriculum.json',JSON.stringify(entries,null,2));
console.log('Canonical map: 10 categories, 30 chapters, 100 unique lessons.');
module.exports = { map, entries };
