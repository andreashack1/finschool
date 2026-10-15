import { readBody } from '../../../../src/lib/account/http';
import { startRunInputSchema } from '../../../../src/lib/simulator/api-types';
import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { startRun } from '../../../../src/lib/simulator/server/service';
import { lifeProfileSchema } from '../../../../src/lib/simulator/life-profile';

export async function POST(request: Request) {
  return simulatorApi(request, async user => {
    const input = startRunInputSchema.parse(await readBody(request));
    if (input.lifeProfile || process.env.NODE_ENV !== 'development') {
      const profile = lifeProfileSchema.parse(input.lifeProfile);
      return startRun(user.id, profile.housingStatus, await getServerClock(), undefined, profile);
    }
    return startRun(user.id, input.housing, await getServerClock());
  });
}
