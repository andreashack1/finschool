import { afterEach, describe, expect, it, vi } from 'vitest';
import { authEmailOrigin, productionAppOrigin } from '../src/lib/supabase/env';
afterEach(()=>vi.unstubAllEnvs());
describe('Auth email origin is independent of runtime',()=>{
 it('development defaults to the public app even when runtime is localhost',()=>{
  vi.stubEnv('NODE_ENV','development');vi.stubEnv('NEXT_PUBLIC_APP_URL','http://localhost:3115');vi.stubEnv('FINLY_DEV_AUTH_EMAIL_ORIGIN','');
  expect(authEmailOrigin()).toBe(productionAppOrigin);
 });
 it('explicit development local callback is supported',()=>{
  vi.stubEnv('NODE_ENV','development');vi.stubEnv('FINLY_DEV_AUTH_EMAIL_ORIGIN','http://localhost:3133');expect(authEmailOrigin()).toBe('http://localhost:3133');
 });
 it.each(['https://evil.test','http://localhost/callback','http://localhost?next=x','not-a-url'])('rejects invalid explicit development override %s',value=>{
  vi.stubEnv('NODE_ENV','development');vi.stubEnv('FINLY_DEV_AUTH_EMAIL_ORIGIN',value);expect(()=>authEmailOrigin()).toThrow();
 });
 it.each(['','invalid','http://localhost:3115','http://127.0.0.1','http://192.168.1.2'])('production fails closed for %s despite development opt-in',value=>{
  vi.stubEnv('NODE_ENV','production');vi.stubEnv('NEXT_PUBLIC_APP_URL',value);vi.stubEnv('FINLY_DEV_AUTH_EMAIL_ORIGIN','http://localhost:3133');expect(()=>authEmailOrigin()).toThrow();
 });
 it('production uses its configured canonical public URL',()=>{
  vi.stubEnv('NODE_ENV','production');vi.stubEnv('NEXT_PUBLIC_APP_URL',productionAppOrigin);expect(authEmailOrigin()).toBe(productionAppOrigin);
 });
});
