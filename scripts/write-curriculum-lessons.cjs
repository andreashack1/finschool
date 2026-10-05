/* eslint-disable @typescript-eslint/no-require-imports -- Offline authoring; emits static lesson files. */
const fs = require('node:fs');
const path = require('node:path');
const entries = require('../artifacts/canonical-curriculum.json');
const wordCount = s => s.trim().split(/\s+/u).length;
function write(categoryId, records) {
 for (const record of records) {
  const [title, objective, hook, explanations, caseParagraphs, questions, reminders, action] = record;
  const entry = entries.find(e=>e.title===title && e.categoryId===categoryId);
  if (!entry || entry.existing) throw new Error('Invalid new lesson: '+title);
  if (questions.length!==9 || explanations.length!==3)throw new Error('Invalid authoring structure: '+title);
  for (const prose of explanations) if(wordCount(prose)<80||wordCount(prose)>150)throw new Error(title+': explanation words '+wordCount(prose));
  if(wordCount(caseParagraphs.join(' '))<120||wordCount(caseParagraphs.join(' '))>200)throw new Error(title+': case words '+wordCount(caseParagraphs.join(' ')));
  let slot=0;
  const qs = questions.map((q,i)=>{
   const [question, correct, wrong1, wrong2, feedback, context] = q;
   const common={id:'q'+(i+1),title:i>=4&&i<=6?'Tu ce ai verifica?':'Uite unde e diferența.',question,explanation:feedback,correctFeedback:'Corect. '+feedback,incorrectFeedback:'Nu chiar. '+feedback,...(i>=4&&i<=6?{caseId:'caz-'+entry.id}:{})};
   if(typeof correct==='boolean')return {...common,type:'adevarat_fals',correctAnswer:correct};
   const position=slot++%3;
   const labels=[wrong1,wrong2];labels.splice(position,0,correct);
   return {...common,type:context || i>=4&&i<=6?'scenariu':'variante',...(context || i>=4&&i<=6?{context:context??'Aplică ideea în cazul de mai sus.'}:{}),options:labels.map((label,j)=>({id:String(j),label})),correctOption:String(position)};
  });
  const ex=(n)=>({id:'explicatie-'+(n+1),type:'explicatie',title:['Cum funcționează','Aplică ideea','Aici e capcana'][n],paragraphs:explanations[n].split('\n\n'),finiMood:'thinking'});
  const lesson={...entry,slug:entry.id,description:hook,objective,quizFocus:['recognition','comparison','decision','scenario'],minutes:5,xp:30,status:'ready',contentVersion:2,formatVersion:2,screens:[{id:'situatie',type:'situatie',title,body:hook},ex(0),qs[0],qs[1],ex(1),qs[2],qs[3],{id:'caz-real',type:'caz_real',title:'O alegere din viața reală',caseId:'caz-'+entry.id,paragraphs:caseParagraphs},qs[4],qs[5],qs[6],ex(2),qs[7],qs[8],{id:'tine-minte',type:'tine_minte',title:'Ține minte',items:[...reminders.map(([title,body],i)=>({id:'idee-'+i,title,body,detail:body,type:'normal'})),{id:'azi',title:'Ce poți face azi',body:action,detail:action,type:'action'}]},{id:'final',type:'final',title:'Ai prins ideea.'}]};
  delete lesson.existing;
  fs.writeFileSync(path.join('src/content/lessons',entry.id+'.ts'),'import type { ReadyLesson } from "../../types/learning";\n\nexport const lesson: ReadyLesson = '+JSON.stringify(lesson,null,2)+';\n');
 }
 console.log(categoryId+': '+records.length+' complete static lessons written.');
}
module.exports={write};
