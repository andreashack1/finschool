import { afterEach,beforeEach,describe,expect,it,vi } from 'vitest';
import { startUsernameCheck,usernameValidationMessage,type UsernameStatus } from '../src/lib/account/username-availability';
let disposers:(()=>void)[];
beforeEach(()=>{vi.useFakeTimers();disposers=[];vi.stubGlobal('fetch',vi.fn());});
afterEach(()=>{disposers.forEach(dispose=>dispose());vi.useRealTimers();vi.unstubAllGlobals();});
const check=(candidate:string,update:(status:UsernameStatus)=>void)=>{const dispose=startUsernameCheck(candidate,update);disposers.push(dispose);return dispose;};
describe('Username availability behavior',()=>{
  it.each(['ab','abcdefghijklmnopqrstu','Fabian!','fab ian','admin','finly','support'])('rejects %s locally without a request',async value=>{
    expect(usernameValidationMessage(value)).not.toBe('');check(value,vi.fn());await vi.advanceTimersByTimeAsync(6000);expect(fetch).not.toHaveBeenCalled();
  });
  it.each([true,false])('debounces, normalizes and displays availability %s',async available=>{
    vi.mocked(fetch).mockResolvedValue(Response.json({available}));const update=vi.fn();check(' Fabian123 ',update);
    await vi.advanceTimersByTimeAsync(449);expect(fetch).not.toHaveBeenCalled();await vi.advanceTimersByTimeAsync(1);
    expect(String(vi.mocked(fetch).mock.calls[0][0])).toContain('username=fabian123');expect(update.mock.calls.map(call=>call[0])).toEqual(['checking',available?'available':'taken']);
  });
  it('an aborted slow response cannot overwrite the final username',async()=>{
    let resolveOld:(value:Response)=>void=()=>{};
    vi.mocked(fetch).mockImplementationOnce(()=>new Promise(resolve=>{resolveOld=resolve;})).mockResolvedValueOnce(Response.json({available:true}));
    const update=vi.fn();const dispose=check('fab',update);await vi.advanceTimersByTimeAsync(450);const signal=vi.mocked(fetch).mock.calls[0][1]?.signal;
    dispose();check('fabian123',update);await vi.advanceTimersByTimeAsync(450);resolveOld(Response.json({available:false}));await vi.advanceTimersByTimeAsync(0);
    expect(signal?.aborted).toBe(true);expect(update.mock.calls.map(call=>call[0])).toEqual(['checking','checking','available']);
  });
  it('leaves checking after five seconds even if the transport ignores abort',async()=>{
    vi.mocked(fetch).mockImplementation(()=>new Promise(()=>{}));const update=vi.fn();check('free_user',update);
    await vi.advanceTimersByTimeAsync(450);await vi.advanceTimersByTimeAsync(4999);expect(update).toHaveBeenLastCalledWith('checking');
    await vi.advanceTimersByTimeAsync(1);expect(update).toHaveBeenLastCalledWith('error');expect(vi.mocked(fetch).mock.calls[0][1]?.signal?.aborted).toBe(true);
  });
  it.each([503,404])('HTTP %s is unknown rather than taken',async status=>{
    vi.mocked(fetch).mockResolvedValue(Response.json({error:{code:'SERVER_ERROR'}},{status}));const update=vi.fn();check('free_user',update);await vi.advanceTimersByTimeAsync(450);expect(update).toHaveBeenLastCalledWith('error');
  });
  it('cleans up all timers on unmount',async()=>{
    const update=vi.fn();const dispose=check('free_user',update);dispose();await vi.advanceTimersByTimeAsync(6000);expect(update).not.toHaveBeenCalled();expect(fetch).not.toHaveBeenCalled();
  });
});
