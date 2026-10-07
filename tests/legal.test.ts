import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach,describe,expect,it,vi } from 'vitest';
import { accountConfig } from '../src/content/account-config';
import { legalConfig } from '../src/content/legal-config';

vi.mock('../app/components/account-screens',()=>({
  AccountShell:({title,children}:{title:string;children:React.ReactNode})=>React.createElement('main',null,React.createElement('h1',null,title),children),
}));
afterEach(()=>vi.unstubAllGlobals());
describe('Legal drafts and canonical config',()=>{
  it('reuses backend consent versions and leaves unverified identity/region explicit',()=>{
    expect(legalConfig.termsVersion).toBe(accountConfig.termsVersion);expect(legalConfig.privacyVersion).toBe(accountConfig.privacyVersion);
    expect(legalConfig.dataRegion).toBe('[DE VERIFICAT ÎNAINTE DE LANSARE]');expect(legalConfig.controllerName).toBe('[DE COMPLETAT ÎNAINTE DE LANSARE]');
  });
  it.each([['terms',16],['privacy',19]])('renders the complete %s draft, stable date and matching TOC',async(kind,count)=>{
    vi.stubGlobal('React',React);
    const Page=kind==='terms'?(await import('../app/termeni/page')).default:(await import('../app/confidentialitate/page')).default;
    const html=renderToStaticMarkup(React.createElement(Page));
    expect(html).toContain('Ciornă în lucru — de verificat de un jurist înainte de lansarea publică.');expect(html).toContain('dateTime="2026-10-07"');expect(html).toContain('07.10.2026');
    const anchors=[...html.matchAll(/href="#([^"]+)"/g)].map(match=>match[1]);expect(anchors).toHaveLength(count);expect(new Set(anchors).size).toBe(count);
    for(const anchor of anchors)expect(html).toContain(`<section id="${anchor}">`);
    expect(html).toContain(legalConfig.controllerAddress);expect(html).toContain(legalConfig.generalContactEmail);expect(html).toBe(renderToStaticMarkup(React.createElement(Page)));
  });
});
