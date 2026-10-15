import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { emptyBody, simulatorApi } from '../../../../src/lib/simulator/server/http';
import { simulatorState } from '../../../../src/lib/simulator/server/service';

export async function POST(request: Request) {
  return simulatorApi(request, async user => {
    await emptyBody(request);
    return simulatorState(user.id, await getServerClock());
  });
}
