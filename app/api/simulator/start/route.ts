import { readBody } from '../../../../src/lib/account/http';
import { startRunInputSchema } from '../../../../src/lib/simulator/api-types';
import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { startSimulatorPage } from '../../../../src/lib/simulator/server/chapter-two';
import { lifeProfileSchema } from '../../../../src/lib/simulator/life-profile';
export async function POST(request: Request) {
  return simulatorApi(request, async user => {
    const input = startRunInputSchema.parse(await readBody(request));
    const lifeProfile = lifeProfileSchema.parse(input.lifeProfile);
    const clock = await getServerClock();
    return startSimulatorPage(user.id, lifeProfile.housingStatus, clock, lifeProfile.activityStatus, lifeProfile);
  });
}
