import { z } from 'zod';
import { simulatorApi } from '../../../src/lib/simulator/server/http';
import { getServerClock } from '../../../src/lib/simulator/server/clock';
import { loadRun, simulatorState } from '../../../src/lib/simulator/server/service';
import { effectiveNow } from '../../../src/lib/simulator/server/events';
import { observeSafely } from '../../../src/lib/simulator/notifications/observe';
import { inbox, markRead } from '../../../src/lib/simulator/notifications/service';
import { readBody } from '../../../src/lib/account/http';
export async function GET(request: Request) { return simulatorApi(request, async user => {
  const clock = await getServerClock();
  await simulatorState(user.id, clock);
  await observeSafely(await loadRun(user.id), effectiveNow(clock));
  return inbox(user.id, effectiveNow(clock));
}); }
export async function POST(request: Request) { return simulatorApi(request, async user => {
  let stage = 'ack-parse';
  try {
    const input = z.strictObject({ id: z.uuid().optional(), version: z.iso.datetime({ offset: true }).optional() }).parse(await readBody(request));
    stage = 'mark-read';
    return await markRead(user.id, input.id, effectiveNow(await getServerClock()), input.version);
  } catch (error) {
    console.error('[notifications]', { stage, code: error instanceof z.ZodError ? 'INVALID_INPUT' : 'ACK_FAILED' });
    throw error;
  }
}); }
