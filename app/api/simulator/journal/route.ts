import { z } from 'zod';
import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { simulatorJournal } from '../../../../src/lib/simulator/server/chapter-two';
export async function GET(request: Request) {
  return simulatorApi(request, async user => {
    const query = z.strictObject({ month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/) }).parse(Object.fromEntries(new URL(request.url).searchParams));
    return simulatorJournal(user.id, await getServerClock(), query.month);
  });
}
