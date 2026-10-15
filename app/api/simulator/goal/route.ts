import { readBody } from '../../../../src/lib/account/http';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { mutateGoal } from '../../../../src/lib/simulator/server/savings-goal';
import { simulatorPageState } from '../../../../src/lib/simulator/server/chapter-two';
export async function POST(request: Request) {
  return simulatorApi(request, async user => {
    const clock = await getServerClock();
    await mutateGoal(user.id, clock, await readBody(request));
    return simulatorPageState(user.id, clock);
  });
}
