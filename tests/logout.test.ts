import { afterEach,beforeEach,describe,expect,it,vi } from 'vitest';
const auth=vi.hoisted(()=>({getSession:vi.fn(),signOut:vi.fn(),stopAutoRefresh:vi.fn()}));
vi.mock('../src/lib/supabase/browser',()=>({browserSupabase:()=>({auth})}));
import { logoutAccount } from '../src/lib/account/logout';
beforeEach(()=>{vi.resetAllMocks();auth.getSession.mockResolvedValue({data:{session:null},error:null});auth.signOut.mockResolvedValue({error:null});vi.stubGlobal('fetch',vi.fn().mockResolvedValue(Response.json({ok:true})));});
afterEach(()=>vi.unstubAllGlobals());
describe('Logout confirmation and fallback',()=>{
  it('clears the SSR path and calls browser signOut, stopping refresh',async()=>{
    expect(await logoutAccount('user-a')).toBe(true);expect(auth.signOut).toHaveBeenCalledWith();expect(auth.stopAutoRefresh).toHaveBeenCalledOnce();
    const init=vi.mocked(fetch).mock.calls[0][1];expect(new Headers(init?.headers).get('X-Finly-Account')).toBe('user-a');expect(JSON.parse(String(init?.body))).toEqual({action:'logout'});
    expect(auth.getSession.mock.invocationCallOrder[0]).toBeLessThan(vi.mocked(fetch).mock.invocationCallOrder[0]);
  });
  it('tries the installed local signout API after normal browser failure',async()=>{
    auth.signOut.mockResolvedValueOnce({error:new Error('network')});expect(await logoutAccount('user-a')).toBe(false);
    expect(auth.signOut).toHaveBeenLastCalledWith({scope:'local'});
  });
  it('does not claim SSR logout when the route never receives the request',async()=>{
    vi.mocked(fetch).mockRejectedValue(new TypeError('offline'));expect(await logoutAccount('user-a')).toBe(false);expect(auth.signOut).toHaveBeenCalled();
  });
  it('still tries local fallback when both remote transports throw',async()=>{
    vi.mocked(fetch).mockRejectedValue(new TypeError('offline'));auth.signOut.mockRejectedValue(new TypeError('offline'));
    expect(await logoutAccount('user-a')).toBe(false);expect(auth.signOut).toHaveBeenCalledTimes(2);expect(auth.signOut).toHaveBeenLastCalledWith({scope:'local'});
  });
});
