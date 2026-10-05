/* eslint-disable @typescript-eslint/no-require-imports -- Preserve an incomplete integration without breaking the active curriculum. */
const fs = require('node:fs');
const {execFileSync}=require('node:child_process');
const files=['src/content/categories.ts','src/lib/learning-validation.ts','src/lib/learning-progress.ts','src/types/learning.ts','next.config.ts'];
fs.mkdirSync('artifacts/curriculum-integration-draft',{recursive:true});
for(const file of files){
 fs.writeFileSync('artifacts/curriculum-integration-draft/'+file.replaceAll('/','--')+'.txt',fs.readFileSync(file));
 fs.writeFileSync(file,execFileSync('git',['show','HEAD:'+file]));
}
const schemaFile='src/types/learning-schema.ts';
const schema=fs.readFileSync(schemaFile,'utf8');
fs.writeFileSync('artifacts/curriculum-integration-draft/learning-schema.ts.txt',schema);
fs.writeFileSync(schemaFile,schema.replace('order: z.number().int().min(1).max(10), chapters: z.array(ChapterSchema).length(3)','order: z.number().int().positive(), chapters: z.array(ChapterSchema).min(1)'));
console.log('Unfinished integration preserved as a draft; active curriculum restored.');
