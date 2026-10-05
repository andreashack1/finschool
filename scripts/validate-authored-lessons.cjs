/* eslint-disable @typescript-eslint/no-require-imports -- Content validation. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const {load}=require('./learning-test-content.cjs');
const {ReadyLessonSchema}=load('src/types/learning-schema.ts');
const {validateAnswerPositions}=load('src/lib/lesson-options.ts');
const entries=require('../artifacts/canonical-curriculum.json');
const ready=[];
for(const entry of entries.filter(e=>!e.existing)){
 const file='src/content/lessons/'+entry.id+'.ts';
 assert.ok(fs.existsSync(file), 'Missing authored lesson: ' + entry.id);
 const lesson=load(file).lesson;
 if(!lesson)throw new Error('Missing export: '+entry.id);
 ReadyLessonSchema.parse(lesson);
 validateAnswerPositions(lesson);
 const questions=lesson.screens.filter(s=>'question' in s);
 assert.ok(questions.filter(s=>s.type==='scenariu'||s.type==='calcul'||s.caseId).length>=questions.length/2,entry.id+': applied ratio');
 ready.push(lesson.id);
}
console.log('Validated '+ready.length+' new complete lessons.');
assert.equal(ready.length, 93, 'Every new canonical lesson must be authored');
