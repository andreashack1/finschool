import { getServerClock, resetDevClock } from '../../../../../src/lib/simulator/server/clock';
import { emptyBody, simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { resetDevRun, simulatorState } from '../../../../../src/lib/simulator/server/service';

export async function POST(request: Request) {
  return simulatorApi(request, async user => {
    await emptyBody(request);
    await resetDevRun(user.id);
    await resetDevClock();
    return simulatorState(user.id, await getServerClock());
  }, true);
}
