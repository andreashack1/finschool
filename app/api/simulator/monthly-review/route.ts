import { readBody } from '../../../../src/lib/account/http';
import { getServerClock } from '../../../../src/lib/simulator/server/clock';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { acknowledgeMonthlyReview } from '../../../../src/lib/simulator/server/monthly-review';
export async function POST(request:Request) {
  return simulatorApi(request,async user=>acknowledgeMonthlyReview(user.id,await getServerClock(),await readBody(request)));
}
