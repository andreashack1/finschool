import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { FinlyMascot, getFiniAsset, type FiniFraming, type FiniMood } from '../app/components/finly-brand';
const framings: FiniFraming[] = ['head','bust','full'];
const moods: FiniMood[] = ['normal','thinking','correct','wrong','excited','serious'];
describe('canonical Fini V2 expressions',()=>{
  for(const framing of framings) for(const mood of moods) it(`${framing}/${mood} renders a transparent, correctly sized V2 asset`,async()=>{
    const asset=getFiniAsset(framing,mood), file=`public${asset.src}`;
    expect(asset.src).toMatch(/^\/brand\/fini-v2\/[a-z-]+\.webp$/);
    expect(existsSync(file)).toBe(true);
    const metadata=await sharp(file).metadata(),stats=await sharp(file).stats();
    expect(metadata.hasAlpha).toBe(true);
    expect([metadata.width,metadata.height]).toEqual([asset.width,asset.height]);
    expect(stats.channels[3].min).toBe(0);expect(stats.channels[3].max).toBe(255);
    const image=FinlyMascot({framing,mood});
    expect(image.props.src).toBe(asset.src);expect(image.props.alt).toBe(asset.alt);
    expect(image.props.style).toEqual({objectFit:'contain'});
    const html=renderToStaticMarkup(image);
    expect(html).toContain('<img');expect(decodeURIComponent(html)).toContain(asset.src);
  });
  it('maps the actual supplied expressions to their intended UI',()=>{
    expect(getFiniAsset('bust','normal').src).toContain('/home.webp');
    expect(getFiniAsset('head','normal').src).toContain('/profile.webp');
    expect(getFiniAsset('head','thinking').src).toContain('/thinking.webp');
    expect(getFiniAsset('bust','excited').src).toContain('/excited.webp');
    expect(getFiniAsset('head','correct').src).toContain('/correct.webp');
    for(const framing of framings){
      expect(getFiniAsset(framing,'wrong')).toEqual(getFiniAsset(framing,'normal'));
      expect(getFiniAsset(framing,'serious')).toEqual(getFiniAsset(framing,'normal'));
      expect(getFiniAsset(framing,'unavailable' as FiniMood)).toEqual(getFiniAsset(framing,'normal'));
    }
  });
  it('preserves defaults, preload, classes and the calm Home pose',()=>{
    const image=FinlyMascot({priority:true,className:'example'});
    expect(image.props.src).toContain('neutral-full');expect(image.props.preload).toBe(true);expect(image.props.className).toContain('example');
    expect(readFileSync('app/finly-client.tsx','utf8')).toMatch(/className="continue-fini" framing="bust" mood="normal"/);
  });
  it('has no active V1 or opaque phase-1 paths',()=>{
    function scan(dir:string){for(const entry of readdirSync(dir,{withFileTypes:true})){
      const file=path.join(dir,entry.name);if(entry.isDirectory())scan(file);
      else if(/\.(tsx?|css)$/.test(file))expect(readFileSync(file,'utf8'),file).not.toMatch(/\/brand\/fini(?:\.svg|-(?:head|bust|full)-|-v2-(?:head|bust|full)\.webp)/);
    }}scan('app');scan('src');
    expect(readdirSync('public/brand').some(name=>name.endsWith('.svg')||name.endsWith('.webp'))).toBe(false);
  });
});
