import { readBody } from '../../../../../src/lib/account/http';
import { devClockInputSchema } from '../../../../../src/lib/simulator/api-types';
import { advanceDevClock } from '../../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { simulatorState } from '../../../../../src/lib/simulator/server/service';

export async function POST(request: Request) {
  return simulatorApi(request, async user => {
    const { increment } = devClockInputSchema.parse(await readBody(request));
    return simulatorState(user.id, await advanceDevClock(increment));
  }, true);
}
