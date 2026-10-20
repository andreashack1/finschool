/* eslint-disable @typescript-eslint/no-require-imports -- Local raster export. */
const fs = require('node:fs');
const sharp = require('sharp');
const root = 'design-references/';
const output = 'public/brand/fini-v2/';
const sources = {
  home: 'ChatGPT Image Oct 17, 2026, 03_36_32 PM-2.png',
  thinking: 'ChatGPT Image Oct 17, 2026, 03_36_33 PM-3.png',
  excited: 'ChatGPT Image Oct 17, 2026, 03_36_30 PM-1.png',
  profile: 'ChatGPT Image Oct 17, 2026, 03_36_35 PM-4.png',
  correct: 'ChatGPT Image Oct 17, 2026, 03_36_37 PM-5.png',
  'neutral-full': 'fini-v2-full-transparent.png',
};
async function main() {
  fs.mkdirSync(output, {recursive:true});
  for (const [name, file] of Object.entries(sources)) {
    const source = sharp(root + file), metadata = await source.metadata();
    if (!metadata.hasAlpha) throw Error(`Transparent source required: ${file}`);
    // Preserve supplied alpha and artwork. Fit includes every hand, ear and shoe.
    await source.resize(900,900,{fit:'inside',withoutEnlargement:true})
      .webp({lossless:true}).toFile(`${output}${name}.webp`);
  }
  // Upper portrait includes the full raised hand and face, omitting the lower torso.
  await sharp(root + sources.excited).extract({left:0,top:20,width:1122,height:1000})
    .resize(900,900,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}})
    .webp({lossless:true}).toFile(`${output}excited-head.webp`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
