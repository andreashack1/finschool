import { readBody } from '../../../../src/lib/account/http';
import { startRunInputSchema } from '../../../../src/lib/simulator/api-types';
import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { simulatorConfig } from '../../../../src/content/simulator/config';
import { buildStartPlan } from '../../../../src/lib/simulator/dashboard';
import { lifeProfileConfig } from '../../../../src/content/simulator/life-profile-config';
export async function POST(request: Request) {
  return simulatorApi(request, async user => {
    const { housing, lifeProfile } = startRunInputSchema.parse(await readBody(request));
    const clock = await getServerClock();
    return buildStartPlan(crypto.randomUUID(), user.id, lifeProfile?.housingStatus ?? housing, clock.effectiveDay, lifeProfile ? lifeProfileConfig(lifeProfile) : simulatorConfig).preview;
  });
}
