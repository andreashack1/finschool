import { describe,it,expect,vi,beforeEach,afterEach } from 'vitest';
const jar=vi.hoisted(()=>new Map<string,string>());
vi.mock('server-only',()=>({}));
vi.mock('next/headers',()=>({cookies:async()=>({getAll:()=>[...jar].map(([name,value])=>({name,value})),get:(name:string)=>jar.has(name)?{name,value:jar.get(name)}:undefined,set:(name:string,value:string)=>{if(value)jar.set(name,value);else jar.delete(name);},delete:(name:string)=>jar.delete(name)})}));
import { POST } from '../app/api/account/auth/route';
import { serverSupabase } from '../src/lib/supabase/server';
import { recoveryProof,validRecoveryProof } from '../src/lib/account/recovery';
import { GET as callback } from '../app/auth/callback/route';
import { DELETE as deleteAccount } from '../app/api/account/profile/route';
import { sameOrigin } from '../src/lib/account/http';
const id='11111111-1111-4111-8111-111111111111';
const user={id,email:'unit@example.test',aud:'authenticated',role:'authenticated',created_at:'2026-01-01T00:00:00Z',app_metadata:{provider:'email'},user_metadata:{}};
const jwt=()=>`${Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url')}.${Buffer.from(JSON.stringify({sub:id,aud:'authenticated',role:'authenticated',exp:Math.floor(Date.now()/1000)+3600,iat:Math.floor(Date.now()/1000)})).toString('base64url')}.test-signature`;
const session=()=>({access_token:jwt(),refresh_token:'test-refresh',expires_in:3600,token_type:'bearer',user});
let requests:{url:string;body:unknown}[]=[];
beforeEach(()=>{jar.clear();requests=[];vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL','https://unit.supabase.test');vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY','unit-test-anon');vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY','unit-test-secret');vi.stubEnv('NEXT_PUBLIC_APP_URL','https://finly.test');vi.stubGlobal('fetch',vi.fn(async(input:RequestInfo|URL,init?:RequestInit)=>{const url=String(input);requests.push({url,body:init?.body?JSON.parse(String(init.body)):null});if(url.includes('/token?'))return Response.json(session());if(url.endsWith('/verify'))return Response.json(session());if(url.endsWith('/user'))return Response.json(user);if(url.split('?')[0].endsWith('/signup'))return Response.json({...session()});if(url.endsWith('/logout'))return new Response(null,{status:204});if(url.includes('/rpc/username_available'))return Response.json(true);return Response.json({});}));});
afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();});
const request=(action:string,data?:unknown,origin='https://finly.test')=>POST(new Request('https://finly.test/api/account/auth',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',...(action==='update'?{'X-Finly-Account':id}:{})},body:JSON.stringify({action,data})}));
describe('Auth route contract with real SSR SDK and mocked provider transport',()=>{
  it('development accepts only the actual loopback request port, without weakening production',()=>{
    vi.stubEnv('NEXT_PUBLIC_APP_URL','http://localhost:3115');vi.stubEnv('NODE_ENV','development');
    expect(()=>sameOrigin(new Request('http://localhost:3000/api/account/auth',{headers:{Origin:'http://127.0.0.1:3000'}}))).not.toThrow();
    for(const origin of ['http://localhost:3002','https://localhost:3000','https://evil.test'])expect(()=>sameOrigin(new Request('http://localhost:3000/api/account/auth',{headers:{Origin:origin}}))).toThrow();
    expect(()=>sameOrigin(new Request('http://internal:3000/api/account/auth',{headers:{Origin:'http://localhost:3000'}}))).toThrow();
    vi.stubEnv('NODE_ENV','production');expect(()=>sameOrigin(new Request('http://localhost:3000/api/account/auth',{headers:{Origin:'http://127.0.0.1:3000'}}))).toThrow();
  });
  it('login writes SSR session cookies; a fresh request reads persistent session',async()=>{const response=await request('login',{email:'UNIT@example.test',password:'abcdefgh'});expect(response.status).toBe(200);expect([...jar.keys()].some(key=>key.startsWith('sb-'))).toBe(true);const client=await serverSupabase();const result=await client.auth.getUser();expect(result.data.user?.id).toBe(id);expect(requests.some(r=>r.url.endsWith('/user'))).toBe(true);expect([...jar.keys()].some(key=>key==='finly-access-token' || key==='finly-refresh-token')).toBe(false);});
  it('logout removes Supabase session cookies and a fresh server request has no user',async()=>{await request('login',{email:user.email,password:'abcdefgh'});expect((await request('logout')).status).toBe(200);expect([...jar.keys()].filter(key=>key.includes('auth-token'))).toEqual([]);expect((await (await serverSupabase()).auth.getUser()).data.user).toBeNull();});
  it.each(['terms','privacy','parentalConsent'])('server requires %s before contacting Auth',async field=>{
    const response=await request('signup',{email:user.email,username:'new_user',displayName:'',ageRange:'14-15',parentalConsent:true,password:'abcdefgh',repeatPassword:'abcdefgh',terms:true,privacy:true,[field]:false});
    expect(response.status).toBe(400);expect((await response.json()).error.code).toBe(field==='parentalConsent'?'PARENT_ACKNOWLEDGEMENT_REQUIRED':'LEGAL_CONSENT_REQUIRED');expect(requests).toHaveLength(0);
  });
  it('RPC outage does not prevent valid signup; DB trigger remains authoritative',async()=>{
    const transport=vi.mocked(fetch).getMockImplementation()!;
    vi.mocked(fetch).mockImplementation((input,init)=>String(input).includes('/rpc/username_available')?Promise.resolve(Response.json({code:'PGRST202',message:'Missing function'},{status:404})):transport(input,init));
    const response=await request('signup',{email:user.email,username:'new_user',displayName:'',ageRange:'20+',parentalConsent:false,password:'abcdefgh',repeatPassword:'abcdefgh',terms:true,privacy:true});
    expect(response.status).toBe(200);expect(requests.some(value=>value.url.includes('/signup'))).toBe(true);
  });
  it('a direct unique conflict maps to a friendly username error even if RPC is unavailable',async()=>{
    vi.mocked(fetch).mockImplementation(async input=>String(input).includes('/rpc/')?Response.json({code:'PGRST202'},{status:404}):Response.json({msg:'duplicate username',error_code:'23505'},{status:422}));
    const response=await request('signup',{email:user.email,username:'new_user',displayName:'',ageRange:'20+',parentalConsent:false,password:'abcdefgh',repeatPassword:'abcdefgh',terms:true,privacy:true});
    expect(response.status).toBe(409);expect((await response.json()).error.message).toBe('Username-ul e deja folosit. Alege altul.');
  });
  it('signup sends only credentials to Auth and validated profile/consent metadata',async()=>{const response=await request('signup',{email:user.email,username:'new_user',displayName:'Ștefania',ageRange:'14-15',parentalConsent:true,password:'abcdefgh',repeatPassword:'abcdefgh',terms:true,privacy:true});expect(response.status).toBe(200);const body=requests.find(r=>r.url.includes('/signup'))?.body as Record<string,unknown>;const data=body.data as Record<string,unknown>;expect(data.username).toBe('new_user');expect(data.parental_consent).toBe(true);expect(data).not.toHaveProperty('password');expect(data).not.toHaveProperty('xp');expect(data).not.toHaveProperty('repeatPassword');});
  it('under 14 never reaches Supabase Auth',async()=>{const response=await request('signup',{email:user.email,username:'new_user',displayName:'',ageRange:'Sub 14',parentalConsent:false,password:'abcdefgh',repeatPassword:'abcdefgh',terms:true,privacy:true});expect(response.status).toBe(400);expect(requests).toHaveLength(0);});
  it('reset known/unknown email returns exactly the same response',async()=>{const known=await request('reset',{email:user.email});const unknown=await request('reset',{email:'unknown@example.test'});expect(await known.json()).toEqual(await unknown.json());expect(requests.every(r=>!r.url.includes('/admin'))).toBe(true);});
  it('cross-origin privileged requests fail before Auth',async()=>{const response=await request('login',{email:user.email,password:'abcdefgh'},'https://evil.test');expect(response.status).toBe(403);expect(requests).toHaveLength(0);});
  it('same-origin writes work behind an internal proxy hostname without trusting forwarded headers',()=>{
    expect(()=>sameOrigin(new Request('http://localhost:3115/api/account/auth',{headers:{Origin:'https://finly.test'}}))).not.toThrow();
    expect(()=>sameOrigin(new Request('http://localhost:3115/api/account/auth',{headers:{Origin:'https://evil.test','X-Forwarded-Host':'evil.test'}}))).toThrow();
    expect(()=>sameOrigin(new Request('http://localhost:3115/api/account/auth',{headers:{Origin:'http://localhost:3115'}}))).toThrow();
  });
  it('stale account context cannot delete the current cookie account',async()=>{
    await request('login',{email:user.email,password:'abcdefgh'});const start=requests.length;
    const response=await deleteAccount(new Request('https://finly.test/api/account/profile',{method:'DELETE',headers:{Origin:'https://finly.test','Content-Type':'application/json','X-Finly-Account':'22222222-2222-4222-8222-222222222222'},body:JSON.stringify({confirmation:'unit_user'})}));
    expect(response.status).toBe(401);expect(requests.slice(start).every(r=>!r.url.includes('/rest/') && !r.url.includes('/admin/'))).toBe(true);
  });
  it('normal login cannot update a password through the recovery route',async()=>{await request('login',{email:user.email,password:'abcdefgh'});const response=await request('update',{password:'newpassword',repeatPassword:'newpassword'});expect(response.status).toBe(403);expect((await response.json()).error.code).toBe('RECOVERY_REQUIRED');});
  it('valid recovery proof permits update and is consumed',async()=>{await request('login',{email:user.email,password:'abcdefgh'});jar.set('finly-recovery',recoveryProof(id));const response=await request('update',{password:'newpassword',repeatPassword:'newpassword'});expect(response.status).toBe(200);expect(jar.has('finly-recovery')).toBe(false);});
  it('recovery proof rejects tampering, expiry and different account',()=>{const proof=recoveryProof(id);expect(validRecoveryProof(proof,id)).toBe(true);expect(validRecoveryProof(proof,'22222222-2222-4222-8222-222222222222')).toBe(false);expect(validRecoveryProof(proof.slice(0,-1)+'z',id)).toBe(false);expect(validRecoveryProof(recoveryProof(id,Date.now()-1000000),id)).toBe(false);});
  it('invalid callback and malicious next cannot open redirect',async()=>{const response=await callback(new Request('https://finly.test/auth/callback?next=https://evil.test'));expect(new URL(response.headers.get('location')!).origin).toBe('https://finly.test');});
  it('callback always redirects to configured app origin even behind an internal host',async()=>{const response=await callback(new Request('http://localhost:3115/auth/callback?next=//evil.test'));expect(new URL(response.headers.get('location')!).origin).toBe('https://finly.test');expect(response.headers.get('cache-control')).toBe('no-store');});
  it('password-recovery PKCE callback sets a signed server-only proof',async()=>{await request('reset',{email:user.email});const response=await callback(new Request('https://finly.test/auth/callback?code=unit-recovery&next=/actualizeaza-parola'));expect(new URL(response.headers.get('location')!).pathname).toBe('/actualizeaza-parola');expect(validRecoveryProof(jar.get('finly-recovery'),id)).toBe(true);});
  it('verification token callback validates OTP and rejects external next',async()=>{const response=await callback(new Request('https://finly.test/auth/callback?token_hash=unit-token&type=email&next=//evil.test'));expect(new URL(response.headers.get('location')!).pathname).toBe('/salveaza-progresul');expect(jar.has('finly-recovery')).toBe(false);});
  it('missing configuration has a controlled response',async()=>{vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL','');const response=await request('login',{email:user.email,password:'abcdefgh'});expect(response.status).toBe(503);expect((await response.json()).error.code).toBe('CONFIGURATION_ERROR');});
  it('signup without immediate session directs the UI to email confirmation',async()=>{
    vi.mocked(fetch).mockImplementation(async input=>String(input).includes('/rpc/')?Response.json(true):Response.json({user}));
    const response=await request('signup',{email:user.email,username:'new_user',displayName:'',ageRange:'20+',parentalConsent:false,password:'abcdefgh',repeatPassword:'abcdefgh',terms:true,privacy:true});
    expect(await response.json()).toEqual({session:false});
  });
  it('invalid login returns safe error and never persists credentials',async()=>{
    vi.mocked(fetch).mockResolvedValue(Response.json({msg:'Invalid login credentials'},{status:400}));
    const response=await request('login',{email:user.email,password:'wrongpassword'});
    expect(response.status).toBe(401);expect((await response.json()).error.code).toBe('INVALID_CREDENTIALS');expect(jar.size).toBe(0);
  });
  it.each([429,503])('password reset surfaces provider failure %s without disclosing account existence',async status=>{
    vi.mocked(fetch).mockImplementation(async()=>Response.json({msg:'Provider unavailable'},{status}));
    const known=await request('reset',{email:user.email});const unknown=await request('reset',{email:'unknown@example.test'});
    expect(known.status).toBe(status);expect(await known.json()).toEqual(await unknown.json());
  });
  it.each(['signup','login','resend'])('%s distinguishes provider outages and rate limits from invalid input',async action=>{
    const data=action==='signup'?{email:user.email,username:'new_user',displayName:'',ageRange:'20+',parentalConsent:false,password:'abcdefgh',repeatPassword:'abcdefgh',terms:true,privacy:true}:action==='login'?{email:user.email,password:'abcdefgh'}:{email:user.email};
    for(const status of [429,503]){
      vi.mocked(fetch).mockImplementation(async input=>String(input).includes('/rpc/')?Response.json(true):Response.json({msg:'Provider failure'},{status}));
      const response=await request(action,data);
      expect(response.status).toBe(status);expect((await response.json()).error.code).toBe(status===429?'RATE_LIMITED':'SERVER_ERROR');
    }
  });
  it.each(['over_email_send_rate_limit','over_request_rate_limit'])('recognizes provider rate-limit code %s',async code=>{
    vi.mocked(fetch).mockResolvedValue(Response.json({msg:'Too many requests',error_code:code},{status:422}));
    const response=await request('login',{email:user.email,password:'abcdefgh'});
    expect(response.status).toBe(429);expect((await response.json()).error.code).toBe('RATE_LIMITED');
  });
  it('resend provider outage remains identical for known and unknown emails',async()=>{
    vi.mocked(fetch).mockResolvedValue(Response.json({msg:'Provider unavailable'},{status:503}));
    const known=await request('resend',{email:user.email});const unknown=await request('resend',{email:'unknown@example.test'});
    expect(known.status).toBe(503);expect(await known.json()).toEqual(await unknown.json());
  });
  it.each([400,500])('signup still recognizes a username race after provider failure %s',async status=>{
    let checks=0;vi.mocked(fetch).mockImplementation(async input=>String(input).includes('/rpc/')?Response.json(++checks===1):Response.json({msg:'Database error saving new user'},{status}));
    const response=await request('signup',{email:user.email,username:'new_user',displayName:'',ageRange:'20+',parentalConsent:false,password:'abcdefgh',repeatPassword:'abcdefgh',terms:true,privacy:true});
    expect(response.status).toBe(409);expect((await response.json()).error.code).toBe('USERNAME_TAKEN');
  });
  it.each(['login','resend'])('%s reports transport failure without blaming credentials or claiming delivery',async action=>{
    const log=vi.spyOn(console,'error').mockImplementation(()=>{});
    try{
      vi.mocked(fetch).mockRejectedValue(new TypeError('fetch failed'));
      const response=await request(action,{email:user.email,...(action==='login'?{password:'abcdefgh'}:{})});
      expect(response.status).toBe(503);expect((await response.json()).error.code).toBe('SERVER_ERROR');
    }finally{log.mockRestore();}
  });
  it('expired access cookie refreshes via the SSR SDK',async()=>{
    const token=`${Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url')}.${Buffer.from(JSON.stringify({sub:id,exp:Math.floor(Date.now()/1000)-30})).toString('base64url')}.test-signature`;
    jar.set('sb-unit-auth-token','base64-'+Buffer.from(JSON.stringify({...session(),access_token:token,expires_at:Math.floor(Date.now()/1000)-30})).toString('base64url'));
    const result=await (await serverSupabase()).auth.getUser();expect(result.data.user?.id).toBe(id);
    expect(requests.some(r=>r.url.includes('grant_type=refresh_token'))).toBe(true);
  });
});
