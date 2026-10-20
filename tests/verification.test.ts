import { beforeEach,afterEach,describe,it,expect,vi } from 'vitest';
import { pendingVerificationEmail,rememberVerificationEmail,verificationCooldown,startVerificationCooldown,clearVerificationState } from '../src/lib/account/verification';
import { appUrl } from '../src/lib/supabase/env';
describe('Temporary verification UX state',()=>{
  beforeEach(()=>{const values=new Map<string,string>();vi.stubGlobal('window',{sessionStorage:{getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v),removeItem:(k:string)=>values.delete(k)}});});
  afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();});
  it('normalizes pending email and clears all hints after authentication',()=>{
    rememberVerificationEmail(' NEW@Example.com ');startVerificationCooldown(1000);
    expect(pendingVerificationEmail()).toBe('new@example.com');clearVerificationState();
    expect(pendingVerificationEmail()).toBe('');expect(verificationCooldown(1000)).toBe(0);
  });
  it('reload reads the same deadline and repeated cooldowns have no lifetime limit',async()=>{
    for(const now of [1000,62000,123000,86400000]){
      startVerificationCooldown(now);expect(verificationCooldown(now)).toBe(60);
      const reloaded=await import('../src/lib/account/verification');
      expect(reloaded.verificationCooldown(now+1000)).toBe(59);
      expect(reloaded.verificationCooldown(now+60000)).toBe(0);
    }
  });
  it('blocked storage never prevents authentication or resend',()=>{
    vi.stubGlobal('window',{get sessionStorage(){throw Error('blocked');}});
    expect(()=>{rememberVerificationEmail('new@example.com');startVerificationCooldown();clearVerificationState();}).not.toThrow();
    expect(pendingVerificationEmail()).toBe('');expect(verificationCooldown()).toBe(0);
  });
  it('production never falls back to localhost',()=>{
    vi.stubEnv('NODE_ENV','production');
    for(const value of ['', 'http://localhost:3000','invalid']){vi.stubEnv('NEXT_PUBLIC_APP_URL',value);expect(()=>appUrl()).toThrow('Conturile nu sunt configurate în acest mediu.');}
  });
  it('development accepts explicit local origins and defaults to localhost',()=>{
    vi.stubEnv('NODE_ENV','development');
    for(const origin of ['http://localhost:3115','http://127.0.0.1:3133']){vi.stubEnv('NEXT_PUBLIC_APP_URL',origin);expect(appUrl()).toBe(origin);}
    vi.stubEnv('NEXT_PUBLIC_APP_URL','');expect(appUrl()).toBe('http://localhost:3000');
  });
});
