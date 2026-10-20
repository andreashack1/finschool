/* eslint-disable @typescript-eslint/no-require-imports -- Local vector asset build. */
const fs = require('node:fs');
const original = fs.readFileSync('public/brand/fini.svg', 'utf8').replaceAll('\r\n', '\n');
const brow = 'M224 149q20-13 38-2M327 147q20-10 35 2';
const mouth = '<path d="M288 232v8m-30 4q31 30 60-4" stroke="#784A32" stroke-width="3" stroke-linecap="round"/>\n<path d="M267 251q20 13 39-2" stroke="#FFF8EA" stroke-width="6" stroke-linecap="round"/>';
const variants = {
  normal: { brow },
  thinking: { brow: 'M222 140q20-17 40-8M327 153q20-5 35 5', mouth: '<path d="M288 232v8m-20 10q20 4 37-3" stroke="#784A32" stroke-width="3" stroke-linecap="round"/>', hand: '<path d="M354 345q25-40-28-88l-25 24q40 50 22 70" fill="#69B9FF" stroke="#378FE5" stroke-width="3"/><path d="M303 282q-17-12-10-26l8-22q4-8 9-2l-4 16 22-3q14 0 12 12l-10 23q-9 12-27 2" fill="#EABD72" stroke="#C69753" stroke-width="2"/>' },
  correct: { brow: 'M224 145q20-11 38-2M327 145q20-11 35 2', hand: '<path d="M355 324q30 2 49-30l25 24q-30 62-74 40" fill="#69B9FF" stroke="#378FE5" stroke-width="3"/><path d="M401 296l-3-19q0-13 9-12l22 2q15 3 15 17l-6 24q-6 12-18 5z" fill="#EABD72" stroke="#C69753" stroke-width="2"/><path d="M409 277l26 4m-26 3 26 4" stroke="#BE8D4F" stroke-width="2" stroke-linecap="round"/>' },
  wrong: { brow: 'M224 145q20-13 38-2M327 143q20-16 35-4', mouth: '<path d="M288 232v8m-25 6q26 13 52-4" stroke="#784A32" stroke-width="3" stroke-linecap="round"/>' },
  excited: { brow: 'M224 137q20-14 38-2M327 136q20-12 35 2', mouth: '<path d="M288 232v8m-29 3q29 5 58-3-6 35-29 35-22 0-29-32" fill="#784A32"/><path d="M266 248q22 5 42-2" stroke="#FFF8EA" stroke-width="7" stroke-linecap="round"/>', hand: '<path d="M355 324q32-26 40-78l32 9q0 78-63 105" fill="#69B9FF" stroke="#378FE5" stroke-width="3"/><path d="M396 251l-5-22q-4-18 6-20l20 2q15 3 16 18l-4 27z" fill="#EABD72" stroke="#C69753" stroke-width="2"/>' },
  serious: { brow: 'M224 143l38 7M327 150l35-7', mouth: '<path d="M288 232v8m-20 12q20-3 37 0" stroke="#784A32" stroke-width="3" stroke-linecap="round"/>' },
};
for (const [mood, variant] of Object.entries(variants)) {
  let svg = original.replaceAll('#388FE0', '#8AC9FF').replaceAll('#1968B5', '#58A9F1').replaceAll('#1A609F', '#378FE5').replaceAll('#135A9B', '#378FE5').replaceAll('#286FAF', '#69B9FF').replaceAll('#195E9E', '#378FE5').replaceAll('#2C7AC2', '#69B9FF').replaceAll('#2F82CD', '#69B9FF').replace(brow, variant.brow);
  if (variant.mouth) svg = svg.replace(mouth, variant.mouth);
  if (variant.hand) {
    svg = svg.replace(/<!-- Open explanatory gesture\. -->[\s\S]*?(?=<!-- Distinct)/, mood === 'thinking' ? '' : variant.hand + '\n');
    if (mood === 'thinking') svg = svg.replace('</svg>', variant.hand + '\n</svg>');
  }
  for (const [frame, box] of Object.entries({ full: '0 0 600 700', bust: '145 0 390 490', head: '140 0 340 340' })) {
    const [,, width, height] = box.split(' ');
    fs.writeFileSync(`public/brand/fini-${frame}-${mood}.svg`, svg.replace('width="600" height="700" viewBox="0 0 600 700"', `width="${width}" height="${height}" viewBox="${box}"`));
  }
}
