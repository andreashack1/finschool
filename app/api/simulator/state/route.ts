import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { simulatorState } from '../../../../src/lib/simulator/server/service';

export async function GET(request: Request) {
  return simulatorApi(request, async user => simulatorState(user.id, await getServerClock()));
}
