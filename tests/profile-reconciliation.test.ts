import { beforeEach, describe, expect, it, vi } from 'vitest';
vi.mock('server-only',()=>({}));
const mocks=vi.hoisted(()=>({user:vi.fn(),rpc:vi.fn(),snapshot:vi.fn()}));
vi.mock('../src/lib/supabase/server',()=>({requireUser:mocks.user,serverSupabase:vi.fn()}));
vi.mock('../src/lib/supabase/admin',()=>({adminSupabase:()=>({rpc:mocks.rpc})}));
vi.mock('../src/lib/account/repository',()=>({getAccountSnapshot:mocks.snapshot}));
import { POST } from '../app/api/account/profile/route';
const id='11111111-1111-4111-8111-111111111111';
beforeEach(()=>{vi.resetAllMocks();mocks.user.mockResolvedValue({id});mocks.rpc.mockResolvedValue({data:true,error:null});});
describe('profile primary commit and secondary reconciliation',()=>{
 it('does not report a committed profile update as failed when snapshot refresh fails',async()=>{
  mocks.snapshot.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('read unavailable'));
  const log=vi.spyOn(console,'error').mockImplementation(()=>{});
  try{
   const response=await POST(new Request('http://localhost:3000/api/account/profile',{method:'POST',headers:{Origin:'http://localhost:3000','Content-Type':'application/json','X-Finly-Account':id},body:JSON.stringify({username:'unit_user',displayName:'Unit'})}));
   expect(response.status).toBe(200);expect(await response.json()).toEqual({ok:true});
   expect(mocks.rpc).toHaveBeenCalledWith('update_account_profile',{p_user:id,p_username:'unit_user',p_display_name:'Unit'});
   expect(log).toHaveBeenCalledWith('[account/profile]',{stage:'post-save-read',code:'RECONCILIATION_FAILED'});
  }finally{log.mockRestore();}
 });
});
