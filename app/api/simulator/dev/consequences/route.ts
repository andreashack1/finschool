import { readBody } from '../../../../../src/lib/account/http';
import { z } from 'zod';
import { demoScenarioSchema } from '../../../../../src/content/simulator/events/consequence-demos.server';
import { simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { getServerClock } from '../../../../../src/lib/simulator/server/clock';
import { planConsequenceDemo } from '../../../../../src/lib/simulator/server/consequence-demos';

export async function POST(request: Request) {
  return simulatorApi(request, async user => {
    const { scenario } = z.strictObject({ scenario: demoScenarioSchema }).parse(await readBody(request));
    return planConsequenceDemo(user.id, scenario, await getServerClock());
  }, true);
}
