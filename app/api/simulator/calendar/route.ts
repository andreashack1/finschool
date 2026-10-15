import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { financialCalendar } from '../../../../src/lib/simulator/server/subscriptions';
export async function GET(request: Request) {
 return simulatorApi(request, async user => financialCalendar(user.id, await getServerClock(), new URL(request.url).searchParams.get('month') ?? undefined));
}
