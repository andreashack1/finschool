/* eslint-disable @typescript-eslint/no-require-imports -- Offline curated content edits. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const before = require('../artifacts/lesson-quality/before.json');
const edits = require('./lesson-quality-edits.cjs');
for (const [id,detail] of Object.entries(require('./lesson-quality-details.cjs'))) {
  edits[id] ??= {};
  edits[id].details = { 'idee-0': detail, ...edits[id].details };
}
const normalize = value => value.toLocaleLowerCase('ro-RO').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const copied = (a,b) => normalize(a) === normalize(b) || (normalize(b).includes(normalize(a)) && normalize(b).split(' ').length - normalize(a).split(' ').length <= 5);
const report = [];
for (const old of before) {
  const lesson = structuredClone(old), changes = edits[old.id] ?? {};
  let removedDetails = 0, rewrittenDetails = 0, promptsRemoved = 0;
  for (const screen of lesson.screens) {
    if (screen.title === 'Tu ce ai verifica?') { delete screen.title; promptsRemoved++; }
    for (const item of screen.items ?? []) {
      const detail = changes.details?.[item.id];
      if (detail) { item.detail = detail; rewrittenDetails++; }
      else if (item.detail && copied(item.body,item.detail)) { delete item.detail; removedDetails++; }
    }
    const edit = changes.questions?.[screen.id];
    if (edit) {
      if (edit.labels) for (const [id,label] of Object.entries(edit.labels)) screen.options.find(o => o.id === id).label = label;
      const { labels, ...fields } = edit;
      void labels;
      Object.assign(screen, fields);
      if (fields.explanation) { screen.correctFeedback = 'Corect. ' + fields.explanation; screen.incorrectFeedback = 'Nu chiar. ' + fields.explanation; }
    }
  }
  if (JSON.stringify(lesson) === JSON.stringify(old)) continue;
  lesson.contentVersion = (old.contentVersion ?? 1) + 1;
  const file = fs.readdirSync('src/content/lessons').map(name => path.join('src/content/lessons',name)).find(file => fs.statSync(file).isFile() && fs.readFileSync(file,'utf8').includes('"id": "'+old.id+'"'));
  if (!file) throw new Error('Missing file '+old.id);
  let source = fs.readFileSync(file,'utf8');
  const newline = source.includes('\r\n') ? '\r\n' : '\n';
  const block = value => JSON.stringify(value,null,2).split('\n').map((line,i) => i ? '    '+line : line).join(newline);
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
  const replacements = [];
  const visit = node => {
    if (ts.isObjectLiteralExpression(node)) {
      let raw;
      try { raw = JSON.parse(node.getText(ast)); } catch { /* enclosing TS declarations are not JSON */ }
      if (raw?.id && raw.type) {
        const previous = old.screens.find(s => s.id === raw.id), edited = lesson.screens.find(s => s.id === raw.id);
        if (previous && JSON.stringify(previous) !== JSON.stringify(edited)) {
          const ordered = {};
          for (const key of Object.keys(raw)) if (key in edited) ordered[key] = edited[key];
          for (const key of Object.keys(edited)) if (!(key in ordered)) ordered[key] = edited[key];
          replacements.push({start:node.getStart(ast),end:node.end,text:block(ordered)});
          return;
        }
      }
    }
    ts.forEachChild(node,visit);
  };
  visit(ast);
  for (const change of replacements.sort((a,b)=>b.start-a.start)) source = source.slice(0,change.start)+change.text+source.slice(change.end);
  source = source.replace('"contentVersion": '+old.contentVersion, '"contentVersion": '+lesson.contentVersion);
  fs.writeFileSync(file,source);
  const rewritten = Object.keys(changes.questions ?? {});
  report.push({id:old.id,file,oldQuestions:old.screens.filter(s=>s.question).length,newQuestions:lesson.screens.filter(s=>s.question).length,rewritten,kept:old.screens.filter(s=>s.question&&!rewritten.includes(s.id)).map(s=>s.id),removedDetails,rewrittenDetails,promptsRemoved});
}
fs.writeFileSync('artifacts/lesson-quality/changes.json',JSON.stringify(report,null,2));
console.log('Applied curated edits to '+report.length+' lessons.');
