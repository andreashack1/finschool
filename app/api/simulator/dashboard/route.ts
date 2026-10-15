import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { simulatorPageState } from '../../../../src/lib/simulator/server/chapter-two';
export async function GET(request: Request) {
  return simulatorApi(request, async user => simulatorPageState(user.id, await getServerClock()));
}
