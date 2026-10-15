import { z } from 'zod';
import { readBody } from '../../../../../src/lib/account/http';
import { simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { getServerClock } from '../../../../../src/lib/simulator/server/clock';
import { eventDetail, chooseEvent } from '../../../../../src/lib/simulator/server/events';
import { markTargetHandled } from '../../../../../src/lib/simulator/notifications/service';
import { observeUserSafely } from '../../../../../src/lib/simulator/notifications/observe';
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  return simulatorApi(request, async user => {
    const id = z.uuid().parse((await context.params).id);
    const clock = await getServerClock();
    const result = await eventDetail(user.id, id, clock);
    await observeUserSafely(user.id, clock);
    await markTargetHandled(user.id, 'event', id);
    return result;
  });
}
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const response = await simulatorApi(request, async user => {
    const { optionId } = z.strictObject({ optionId: z.string().min(1).max(100) }).parse(await readBody(request));
    const id = z.uuid().parse((await context.params).id);
    const clock = await getServerClock();
    const result = await chooseEvent(user.id, id, optionId, clock);
    await observeUserSafely(user.id, clock);
    await markTargetHandled(user.id, 'event', id);
    return result;
  });
  if (response.ok) {
    const body: unknown = await response.clone().json();
    if (z.object({ conflict: z.literal(true) }).safeParse(body).success) return new Response(response.body, { status: 409, headers: response.headers });
  }
  return response;
}
