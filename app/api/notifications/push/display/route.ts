import { z } from 'zod';
import { simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { display } from '../../../../../src/lib/simulator/notifications/service';
import { getServerClock } from '../../../../../src/lib/simulator/server/clock';
import { effectiveNow } from '../../../../../src/lib/simulator/server/events';
export async function GET(request: Request) { return simulatorApi(request, async user => {
  const id = z.uuid().parse(new URL(request.url).searchParams.get('id'));
  return display(user.id, id, effectiveNow(await getServerClock()));
}); }
