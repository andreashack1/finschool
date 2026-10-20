import { beforeEach,afterEach,describe,it,expect,vi } from 'vitest';
import { NextRequest } from 'next/server';
const auth=vi.hoisted(()=>({user:null as {id:string}|null,refresh:false}));
vi.mock('@supabase/ssr',()=>({createServerClient:(_url:string,_key:string,options:{cookies:{setAll:(values:{name:string;value:string;options:object}[],headers:Record<string,string>)=>void}})=>({auth:{getUser:async()=>{
  if(auth.refresh)options.cookies.setAll([{name:'sb-test-auth-token',value:'refreshed-test-cookie',options:{path:'/'}}],{'Cache-Control':'private, no-store',Pragma:'no-cache'});
  return {data:{user:auth.user}};
}}})}));
import { proxy } from '../proxy';
beforeEach(()=>{auth.user=null;auth.refresh=false;vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL','https://unit.supabase.test');vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY','unit-anon');vi.stubEnv('NEXT_PUBLIC_APP_URL','https://finly.test');});
afterEach(()=>vi.unstubAllEnvs());
describe('Session proxy and account gates',()=>{
  it('development logout gates stay on the active loopback port; production stays canonical',async()=>{
    vi.stubEnv('NODE_ENV','development');vi.stubEnv('NEXT_PUBLIC_APP_URL','http://localhost:3115');
    // NextRequest normalizes loopback names to localhost. The dev server
    // sends a relative Location on the wire; the active port must stay 3000.
    expect((await proxy(new NextRequest('http://127.0.0.1:3000/profil'))).headers.get('location')).toBe('http://localhost:3000/bun-venit');
    vi.stubEnv('NODE_ENV','production');vi.stubEnv('NEXT_PUBLIC_APP_URL','https://finly2-ruddy.vercel.app');expect((await proxy(new NextRequest('http://127.0.0.1:3000/profil'))).headers.get('location')).toBe('https://finly2-ruddy.vercel.app/bun-venit');
  });
  it.each(['/','/profil','/lectii','/lectie/nevoi-vs-dorinte'])('unauthenticated %s redirects to canonical welcome',async path=>{
    const response=await proxy(new NextRequest('http://localhost:3115'+path));expect(response.headers.get('location')).toBe('https://finly.test/bun-venit');
  });
  it.each(['/bun-venit','/incepe','/salveaza-progresul','/creeaza-cont','/autentificare','/verifica-email','/resetare-parola','/actualizeaza-parola','/auth/callback'])('unauthenticated %s stays accessible',async path=>{
    expect((await proxy(new NextRequest('https://finly.test'+path))).headers.has('location')).toBe(false);
  });
  it.each(['/bun-venit','/incepe','/creeaza-cont','/autentificare'])('authenticated %s redirects home preserving refreshed cookies',async path=>{
    auth.user={id:'unit-user'};auth.refresh=true;
    const response=await proxy(new NextRequest('http://localhost:3115'+path));expect(response.headers.get('location')).toBe('https://finly.test/');
    expect(response.cookies.get('sb-test-auth-token')?.value).toBe('refreshed-test-cookie');expect(response.headers.get('cache-control')).toBe('private, no-store');
  });
  it('protected API remains responsible for its JSON auth error',async()=>{expect((await proxy(new NextRequest('https://finly.test/api/progress'))).headers.has('location')).toBe(false);});
});
