import { simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { loadRun, simulatorState } from '../../../../../src/lib/simulator/server/service';
import { getServerClock } from '../../../../../src/lib/simulator/server/clock';
import { buildMonthlyReview } from '../../../../../src/lib/simulator/monthly-review';
import type { reviewInsightSchema } from '../../../../../src/lib/simulator/monthly-review';
import type { z } from 'zod';
export async function GET(request:Request) {
  return simulatorApi(request,async user=>{
    const clock=await getServerClock(); await simulatorState(user.id,clock);
    const loaded=await loadRun(user.id);if(!loaded)return {reviews:[]};
    return {closedThrough:loaded.engine?.lastClosedDay??loaded.run.lastSettledOn,reviews:loaded.monthlyReviews.map((r,index)=>{
      const diagnostics:{candidates?:z.infer<typeof reviewInsightSchema>[]}={};
      const sourceRebuild=buildMonthlyReview(loaded.run,loaded.ledger,r.snapshot.periodStart,r.snapshot.periodEnd,loaded.monthlyReviews[index-1]?.snapshot,loaded.instances,diagnostics);
      return {storedSnapshot:r,sourceRebuild,candidateInsights:diagnostics.candidates,selectedInsights:sourceRebuild.insights};
    })};
  },true);
}
