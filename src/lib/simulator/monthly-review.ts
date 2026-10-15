import { isSupportEntry } from '../../content/simulator/life-profile-config';
import { z } from 'zod';
import { monthlyReviewPolicy as policy } from '../../content/simulator/monthly-review-config';
import { addDays, daysBetween, endOfMonth, monthKey, nextMonth, startOfMonth, dayKeySchema, type DayKey } from './calendar';
import { bani, formatLei, moneyBaniSchema } from './money';
import { calculateBalance } from './settle';
import type { LedgerEntry, SimulatorRun } from './types';
import type { EventInstance } from './events/types';

const categoryRow = z.object({ id: z.string(), label: z.string(), amountBani: moneyBaniSchema });
export const reviewInsightSchema = z.object({ id: z.string(), family: z.string(), priority: z.number(), title: z.string(), body: z.string(), evidence: z.array(z.string()), amountBani: moneyBaniSchema.optional() });
export const monthlySnapshotSchema = z.object({
  monthKey: z.string().regex(/^\d{4}-\d{2}$/), periodStart: dayKeySchema, periodEnd: dayKeySchema,
  daysInPeriod: z.number().int().positive(), isPartial: z.boolean(),
  openingBalanceBani: moneyBaniSchema, incomeBani: moneyBaniSchema, spentBani: moneyBaniSchema, closingBalanceBani: moneyBaniSchema,
  categoryBreakdown: z.array(categoryRow), topCategories: z.array(categoryRow).max(5),
  insights: z.array(reviewInsightSchema).max(3), finiMessage: z.string(), schemaVersion: z.number().int(), policyVersion: z.number().int(),
});
export const monthlyReviewSchema = z.object({ id: z.uuid(), snapshot: monthlySnapshotSchema, finalizedAt: z.string(), reviewedAt: z.string().nullable() });
export type MonthlySnapshot = z.infer<typeof monthlySnapshotSchema>;
export type MonthlyReview = z.infer<typeof monthlyReviewSchema>;
export const reviewAckSchema = z.strictObject({ reviewId: z.uuid(), operationId: z.uuid() });
const labels: Record<string,string> = { mancare:'Mâncare & băuturi',iesiri:'Ieșiri & social',cumparaturi:'Cumpărături',abonamente:'Abonamente',transport:'Transport',locuinta:'Locuință',sanatate:'Sănătate',tehnologie:'Telefon & tehnologie',scoala:'Școală',neprevazute:'Cheltuieli neașteptate',economii:'Economii',venit:'Altele' };
export function closedReviewPeriods(run: SimulatorRun, currentDay: DayKey, closedThrough: DayKey | null) {
  const periods: { start: DayKey; end: DayKey }[] = [];
  for (let first = startOfMonth(run.startedOn); first < startOfMonth(currentDay); first = nextMonth(first)) {
    const end = endOfMonth(first);
    if (!closedThrough || end > closedThrough) break;
    periods.push({ start: first < run.startedOn ? run.startedOn : first, end });
  }
  return periods;
}
export function rankReviewInsights(candidates: z.infer<typeof reviewInsightSchema>[]) {
  const families = new Set<string>();
  return [...candidates].sort((a,b)=>b.priority-a.priority || a.id.localeCompare(b.id)).filter(c=>{
    if(families.has(c.family)) return false;
    families.add(c.family); return true;
  }).slice(0,policy.maxInsights);
}
export function buildMonthlyReview(run: SimulatorRun, ledger: readonly LedgerEntry[], start: DayKey, end: DayKey, previous?: MonthlySnapshot, instances:readonly EventInstance[]=[], diagnostics?:{candidates?:z.infer<typeof reviewInsightSchema>[]}): MonthlySnapshot {
  if(end !== endOfMonth(end) || monthKey(start)!==monthKey(end) || start<run.startedOn) throw new RangeError('Perioadă invalidă');
  const entries = ledger.filter(e=>e.day>=start && e.day<=end).sort((a,b)=>a.day.localeCompare(b.day)||a.sequence-b.sequence||a.refKey.localeCompare(b.refKey));
  const expenses = entries.filter(e=>e.amountBani<0 && e.kind!=='transfer_obiectiv');
  // Positive income has explicit semantics; carry-over/adjustments are never income.
  const income = entries.filter(e=>e.amountBani>0 && (e.kind==='salariu' || isSupportEntry(e) || e.refKey.endsWith(':salary:monthly') || (e.category==='venit' && ['eveniment','decizie_automata'].includes(e.kind))));
  const totals = new Map<string,number>();
  for(const e of expenses) totals.set(e.category,(totals.get(e.category)??0)-e.amountBani);
  const categories = [...totals].map(([id,amount])=>({id,label:labels[id]??'Altele',amountBani:bani(amount)})).sort((a,b)=>b.amountBani-a.amountBani || a.id.localeCompare(b.id));
  const top = categories.length<=policy.maxCategories ? categories : [...categories.slice(0,policy.maxCategories-1),{id:'other',label:'Altele',amountBani:bani(categories.slice(policy.maxCategories-1).reduce((s,e)=>s+e.amountBani,0))}];
  const received = bani(income.reduce((s,e)=>s+e.amountBani,0)), spent = bani(expenses.reduce((s,e)=>s-e.amountBani,0));
  // Monthly cash/behavior metrics include reserved funds: moving money aside
  // must not look like a loss or create a negative-total-cash insight.
  // The engine and dashboard still use the full ledger as spendable balance.
  const cashLedger = ledger.filter(e=>e.kind!=='transfer_obiectiv');
  const opening = calculateBalance(cashLedger.filter(e=>e.day<start || (e.day===start && e.refKey.endsWith(':start:balance'))));
  const closing = calculateBalance(cashLedger.filter(e=>e.day<=end));
  const partial = start!==startOfMonth(start), candidates: z.infer<typeof reviewInsightSchema>[]=[];
  const historyByRef=new Map(instances.map(e=>[`${e.runId}:event:${e.id}:cost`,e]));
  const discretionary=(instance:EventInstance|undefined)=>{
    if(!instance)return true;
    const selected=instance.snapshot.options.find(o=>o.id===instance.selectedOptionId);
    if(selected?.consequences?.some(c=>c.type==='set_flag' || c.type==='clear_flag'))return false;
    const life=instance.snapshot.life;
    return !life || (!policy.excludedFlexibleDomains.includes(life.domain) && !life.semanticTags.some(t=>policy.excludedFlexibleTags.includes(t)));
  };
  const emit=(id:string,family:string,priority:number,title:string,body:string,evidence:string[],amountBani?:ReturnType<typeof bani>)=>candidates.push({id,family,priority:priority+Math.min(policy.ranking.maxMagnitudePoints,Math.floor(Math.abs(amountBani??0)/policy.ranking.magnitudeStepBani)),title,body,evidence,amountBani});
  const small=expenses.filter(e=>e.kind==='eveniment' && policy.flexibleCategories.includes(e.category) && discretionary(historyByRef.get(e.refKey)) && -e.amountBani<policy.smallSpendThresholdBani).sort((a,b)=>a.day.localeCompare(b.day)||a.sequence-b.sequence||a.refKey.localeCompare(b.refKey));
  if(small.length>=policy.minSmallSpends){
    const total=bani(small.reduce((s,e)=>s-e.amountBani,0)), selected=small.slice(0,policy.whatIfCount), saving=bani(selected.reduce((s,e)=>s-e.amountBani,0));
    emit('small_spends','flexible',100+Math.min(20,small.length),'Cheltuielile mici s-au adunat.',`${small.length} cumpărături sub ${formatLei(bani(policy.smallSpendThresholdBani))} au ajuns la ${formatLei(total)}. Dacă eliminai ${selected.length} dintre ele, păstrai ${formatLei(saving)}.`,small.map(e=>e.refKey),total);
  }
  const subscriptions=expenses.filter(e=>e.kind==='abonament' || (e.kind==='cheltuiala_fixa' && e.category==='abonamente'));
  if(subscriptions.length){const total=bani(subscriptions.reduce((s,e)=>s-e.amountBani,0));emit('subscriptions','subscriptions',80,'Abonamentele au un cost lunar.',`Te-au costat ${formatLei(total)}. Merită să verifici dacă toate îți sunt utile.`,subscriptions.map(e=>e.refKey),total);}
  const unexpected=expenses.filter(e=>e.category==='neprevazute');
  if(unexpected.length){const total=bani(unexpected.reduce((s,e)=>s-e.amountBani,0));emit('unexpected','unexpected',90,'Au apărut costuri neașteptate.',`Au fost ${formatLei(total)}. O rezervă de aceeași valoare le-ar fi acoperit exact luna asta.`,unexpected.map(e=>e.refKey),total);}
  const flexibleTotals=new Map<string,number>();
  for(const e of expenses.filter(e=>e.kind==='eveniment' && policy.flexibleCategories.includes(e.category) && discretionary(historyByRef.get(e.refKey))))flexibleTotals.set(e.category,(flexibleTotals.get(e.category)??0)-e.amountBani);
  const flexible=[...flexibleTotals].map(([id,value])=>({id,label:labels[id],amountBani:bani(value)})).sort((a,b)=>b.amountBani-a.amountBani||a.id.localeCompare(b.id))[0];
  if(flexible)emit('largest_flexible','flexible',65,'Aici s-au dus cei mai mulți bani flexibili.',`${flexible.label}: ${formatLei(flexible.amountBani)}. Luna următoare poți încerca o variantă cu cost mai mic în câteva situații.`,expenses.filter(e=>e.category===flexible.id && e.kind==='eveniment' && discretionary(historyByRef.get(e.refKey))).map(e=>e.refKey),flexible.amountBani);
  if(previous && !partial && !previous.isPartial && nextMonth(previous.periodEnd)===start){
    const comparable=[...new Set([...categories,...previous.categoryBreakdown].map(c=>c.id))].filter(id=>policy.flexibleCategories.includes(id));
    const changes=comparable.map(id=>{const amount=categories.find(c=>c.id===id)?.amountBani??bani(0),old=previous.categoryBreakdown.find(c=>c.id===id)?.amountBani??bani(0);return {c:{id,label:labels[id],amountBani:amount},delta:amount-old};}).filter(c=>Math.abs(c.delta)>=policy.minComparisonChangeBani).sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta)||a.c.id.localeCompare(b.c.id));
    const change=changes[0];if(change)emit('month_change','comparison',95,change.delta<0?'Aici ai păstrat mai mulți bani.':'Aici costul a crescut.',`${change.c.label}: cu ${formatLei(bani(Math.abs(change.delta)))} ${change.delta<0?'mai puțin':'mai mult'} decât luna trecută.`,[previous.monthKey,monthKey(start),change.c.id],bani(Math.abs(change.delta)));
  }
  if(closing<0)emit('negative_balance','balance',85,'Ai încheiat luna cu sold negativ.',`Sold la final: ${formatLei(closing)}. Uită-te la costurile de mai sus înainte de următoarele alegeri.`,expenses.map(e=>e.refKey),closing);
  const free=instances.filter(e=>e.day>=start && e.day<=end && e.status==='resolved' && e.resolutionMode==='manual' && e.selectedCostBani===0 && discretionary(e) && !e.snapshot.options.find(o=>o.id===e.selectedOptionId)?.consequences?.some(c=>c.type==='set_flag') && e.snapshot.options.some(o=>o.costBani>0)).sort((a,b)=>a.id.localeCompare(b.id));
  if(free.length>=policy.minFreeChoices)emit('free_choices','positive',92,'Ai găsit și variante fără cost.',`Ai ales variante fără cost în ${free.length} situații care aveau și opțiuni plătite. Poți păstra ideea și luna următoare.`,free.map(e=>e.id));
  if(diagnostics)diagnostics.candidates=candidates;
  const insights=rankReviewInsights(candidates);
  return monthlySnapshotSchema.parse({monthKey:monthKey(start),periodStart:start,periodEnd:end,daysInPeriod:daysBetween(start,end)+1,isPartial:partial,openingBalanceBani:opening,incomeBani:received,spentBani:spent,closingBalanceBani:closing,categoryBreakdown:categories,topCategories:top,insights,finiMessage:insights[0]?.title??'Asta a fost luna ta. Continuăm.',schemaVersion:policy.schemaVersion,policyVersion:policy.version});
}
export function financialClosedThrough(run: SimulatorRun, currentDay: DayKey) {
  return run.lastSettledOn && run.lastSettledOn>=currentDay ? addDays(currentDay,-1) : run.lastSettledOn;
}
