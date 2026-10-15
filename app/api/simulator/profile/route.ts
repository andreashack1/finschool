import { z } from 'zod';
import { readBody } from '../../../../src/lib/account/http';
import { profileSchema } from '../../../../src/lib/simulator/events/types';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { activateEvents } from '../../../../src/lib/simulator/server/events';
import { simulatorPageState } from '../../../../src/lib/simulator/server/chapter-two';
export async function POST(request: Request) {
  return simulatorApi(request, async user => {
    const { profile } = z.strictObject({ profile: profileSchema }).parse(await readBody(request));
    const clock = await getServerClock();
    await activateEvents(user.id, profile, clock,2);
    return simulatorPageState(user.id, clock);
  });
}
