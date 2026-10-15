import { simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { loadRun } from '../../../../../src/lib/simulator/server/service';
import { subscriptionDates } from '../../../../../src/lib/simulator/subscriptions';
import { formatDayKey, parseDayKey } from '../../../../../src/lib/simulator/calendar';
export async function GET(request: Request) {
 return simulatorApi(request, async user => {
  const loaded = await loadRun(user.id); if (!loaded) return { subscriptions: [] };
  return { subscriptions: loaded.subscriptions.map(s => { const p=parseDayKey(s.nextDueOn); return { ...s, projected: subscriptionDates(s,s.nextDueOn,formatDayKey(Math.min(9999,p.year+2),p.month,1)).slice(0,8), payments: loaded.ledger.filter(e=>e.refKey.endsWith(':subscription:'+s.id)) }; }) };
 }, true);
}
