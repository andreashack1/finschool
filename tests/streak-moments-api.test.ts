import { describe,it,expect,vi,beforeEach } from 'vitest';
const dependencies=vi.hoisted(()=>({user:vi.fn(),rpc:vi.fn()}));
vi.mock('server-only',()=>({}));
vi.mock('../src/lib/supabase/server',()=>({requireUser:dependencies.user}));
vi.mock('../src/lib/supabase/admin',()=>({adminSupabase:()=>({rpc:dependencies.rpc})}));
import { POST } from '../app/api/progress/moments/route';
const user='11111111-1111-4111-8111-111111111111',other='22222222-2222-4222-8222-222222222222',claim=crypto.randomUUID();
const request=(body:unknown,owner=user,origin='http://localhost:3000')=>new Request('http://localhost:3000/api/progress/moments',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json','X-Finly-Account':owner},body:JSON.stringify(body)});
beforeEach(()=>{dependencies.user.mockReset().mockResolvedValue({id:user});dependencies.rpc.mockReset().mockResolvedValue({data:[],error:null});});
describe('Presentation API ownership and controlled writes',()=>{
  it('missing presentation migration returns an empty batch without blocking progress',async()=>{
    dependencies.rpc.mockResolvedValue({data:null,error:{code:'PGRST202',message:'Could not find the function public.claim_streak_moments(p_claim, p_user) in the schema cache'}});
    const response=await POST(request({action:'claim',claim}));expect(response.status).toBe(200);expect(await response.json()).toEqual({events:[]});
  });
  it('permission and connection failures are not reported as an empty batch',async()=>{
    dependencies.rpc.mockResolvedValue({data:null,error:{code:'42501',message:'permission denied'}});
    expect((await POST(request({action:'claim',claim}))).status).toBe(503);
  });
  it('authenticated claim uses server identity only',async()=>{
    const response=await POST(request({action:'claim',claim}));expect(response.status).toBe(200);expect(response.headers.get('cache-control')).toBe('no-store');expect(dependencies.rpc).toHaveBeenCalledWith('claim_streak_moments',{p_user:user,p_claim:claim});
  });
  it('stale account header cannot claim another account',async()=>{
    const response=await POST(request({action:'claim',claim},other));expect(response.ok).toBe(false);expect(dependencies.rpc).not.toHaveBeenCalled();
  });
  it('cross-origin request cannot claim',async()=>{
    const response=await POST(request({action:'claim',claim},user,'https://attacker.test'));expect(response.ok).toBe(false);expect(dependencies.rpc).not.toHaveBeenCalled();
  });
  it('browser cannot provide arbitrary payload/user/streak values',async()=>{
    for(const extra of [{userId:other},{payload:{streakAfter:999}},{freezeBalance:999}]){
      expect((await POST(request({action:'claim',claim,...extra}))).status).toBe(400);
    }
    expect(dependencies.rpc).not.toHaveBeenCalled();
  });
  it('ack retries safely and rejects non-owned reservation',async()=>{
    const ids=[crypto.randomUUID()];dependencies.rpc.mockResolvedValueOnce({data:true,error:null}).mockResolvedValueOnce({data:false,error:null});
    expect((await POST(request({action:'ack',claim,ids}))).status).toBe(200);
    expect(dependencies.rpc).toHaveBeenCalledWith('acknowledge_streak_moments',{p_user:user,p_claim:claim,p_ids:ids});
    expect((await POST(request({action:'ack',claim,ids}))).status).toBe(409);
  });
});
