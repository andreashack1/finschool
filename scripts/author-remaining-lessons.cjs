/* eslint-disable @typescript-eslint/no-require-imports -- Offline editorial source; emits static TypeScript. */
const { write } = require('./write-curriculum-lessons.cjs');
const groups = ['job', 'credit', 'independent', 'behavior', 'investing'];
for (const group of groups) {
  const { categoryId, notes, records, sources = [] } = require('./curriculum-' + group + '.cjs');
  const authored = records.map((r, index) => {
    const [title, concept, example, caveat, story, statement, questions, action] = r;
    const q = questions.map((line, i) => {
      const [prompt, correct, wrong1, wrong2] = line.split('|');
      if (!wrong2) throw new Error(title + ': incomplete question ' + i);
      return [prompt, correct, wrong1, wrong2, correct, i === 2 || i >= 6 ? example : undefined];
    });
    const isTrue = index % 2 === 1;
    q.splice(1, 0, [isTrue ? concept.split('. ')[0] + '.' : statement, isTrue, null, null, isTrue ? concept : caveat]);
    return [title, 'Să poți explica ' + title.toLowerCase() + ' și să alegi o acțiune justificată în situația prezentată.', story.split('. ')[0] + '.', [concept + '\n\n' + notes[0], example + '\n\n' + notes[1], caveat + '\n\n' + notes[2]], [story, 'Pentru a decide, persoana din exemplu folosește următoarea verificare: ' + example + ' Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate.'], q, [['Ideea de bază', concept.split('. ')[0] + '.'], ['În exemplu', example.split('. ').slice(0, 2).join('. ').replace(/\.$/, '') + '.'], ['Capcana', caveat.split('. ')[0] + '.']], action];
  });
  write(categoryId, authored);
  // Sources are reviewable inside each published lesson, rather than hidden in tooling.
  const fs = require('node:fs');
  const entries = require('../artifacts/canonical-curriculum.json');
  for (const r of records) {
    const entry = entries.find(e => e.title === r[0]);
    const file = 'src/content/lessons/' + entry.id + '.ts';
    const text = fs.readFileSync(file, 'utf8');
    const lessonSources = entry.id === 'crypto-ce-trebuie-sa-stii' ? [{label:'ESMA · Riscuri și protecție pentru cryptoactive',url:'https://www.esma.europa.eu/press-news/esma-news/eu-supervisory-authorities-warn-consumers-risks-and-limited-protection-certain'}] : sources;
    fs.writeFileSync(file, text.replace('  "screens": [', '  "sourceUrls": ' + JSON.stringify(lessonSources, null, 2) + ',\n  "screens": ['));
  }
}
