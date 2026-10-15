import { readBody } from '../../../../src/lib/account/http';
import { z } from 'zod';
import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { mutateSubscription } from '../../../../src/lib/simulator/server/subscriptions';
export async function POST(request: Request) {
 return simulatorApi(request, async user => {
  const { action, input } = z.strictObject({ action: z.enum(['create','edit','cancel']), input: z.unknown() }).parse(await readBody(request));
  return mutateSubscription(user.id, await getServerClock(), action, input);
 });
}
