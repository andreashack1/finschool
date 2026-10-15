import { decisionExpiry } from './decision-policy';
import type { LifeProfile } from '../life-profile';
import { lifeProfileEventReason } from './profile-context';
import { dayKey, daysBetween, monthKey, type DayKey } from '../calendar';
import { bani } from '../money';
import { createRng, seedFromParts, uniformInt } from '../rng';
import { availabilityWindows, lifeOpportunities, localInstant, nextLocalMidnight, occupiedSchedule, weekday } from './time';
import { snapshotSchema, type EventDefinitionV1, type EventEngine, type EventInstance, type EventVariation, type WindowId } from './types';
import { buildSimulatorStateAt, emptyConsequenceState, stateRuleReason } from '../consequences/state';
import type { ConsequenceState } from '../consequences/types';

export const rngNamespaces = ['candidate_eligibility', 'candidate_score', 'variation', 'scheduled_time', 'price', 'price_addon', 'auto_resolve', 'instance_id','life_opportunity'] as const;
type Purpose = typeof rngNamespaces[number];
export function eventRng(runId: string, rngVersion: 1, day: DayKey, purpose: Purpose, ...keys: string[]) {
  return createRng(seedFromParts(rngVersion, runId, day, purpose, ...keys));
}
/** Exponential race: -log(U)/weight. Independent stable-ID samples make this
 * a weighted ranking invariant to input iteration order (smallest wins). */
function weightedScore(runId: string, rngVersion: 1, day: DayKey, purpose: 'candidate_score' | 'variation', key: string, weight: number) {
  return -Math.log(1 - eventRng(runId, rngVersion, day, purpose, key)()) / weight;
}
export function materializeSnapshot(runId: string, rngVersion: 1, day: DayKey, definition: EventDefinitionV1, variation: EventVariation) {
  const prices = new Map<string, number>();
  const priceFor = (id: string): number => {
    const known = prices.get(id); if (known !== undefined) return known;
    const option = variation.options.find(o => o.id === id);
    if (!option) throw new Error('Invalid price relationship');
    const model = option.priceModel;
    const cost = model.type === 'fixed' ? model.amountBani : model.type === 'range'
      ? uniformInt(eventRng(runId, rngVersion, day, 'price', definition.id, variation.id, id), model.minBani, model.maxBani)
      : priceFor(model.baseOptionId) + uniformInt(eventRng(runId, rngVersion, day, 'price_addon', definition.id, variation.id, id), model.minAddonBani, model.maxAddonBani);
    prices.set(id, cost); return cost;
  };
  return snapshotSchema.parse({ version: 1, title: variation.presentation?.title??variation.title, description: variation.presentation?.context??variation.description, variationId: variation.id, category: definition.category,
    ...(definition.life ? { life:definition.life } : {}),
    ...(variation.presentation ? { presentation: { title: variation.presentation.title, context: variation.presentation.context,
      bullets: variation.presentation.bullets.map(b => ({ text:b.text, ...(b.costOptionId ? {amountBani:bani(priceFor(b.costOptionId)),amountKind:'exact'} : {}) })) } } : {}),
    options: variation.options.map(o => ({ id: o.id, label: o.label, costBani: bani(priceFor(o.id)), feedback: o.feedback, durationMinutes: o.durationMinutes, fallbackWhenUnaffordable: o.fallbackWhenUnaffordable,
      ...(o.consequences ? { consequences: o.consequences } : {}), ...(o.state ? { state: o.state } : {}) })),
    ...([definition.rules.state, variation.additionalRules?.state].some(Boolean) ? { relevance: [definition.rules.state, variation.additionalRules?.state].filter(s => s !== undefined) } : {}) });
}
export interface PlannerInput {
  lifeProfile?: LifeProfile;
  runId: string; userId: string; rngVersion: 1; day: DayKey; engine: EventEngine;
  catalog: readonly EventDefinitionV1[]; history: readonly EventInstance[]; plannedAt: string; diagnostics?: boolean;
  consequenceState?: ConsequenceState;
  evaluationAt?: string;
}
export type Rejection = { definitionId: string; window: string; reason: string };
export function frequencyReason(definition: EventDefinitionV1, day: DayKey, history: readonly EventInstance[], engine: EventEngine, catalog: readonly EventDefinitionV1[]): string | null {
  const family = history.filter(e => e.familyId === definition.familyId && e.day <= day);
  if (family.some(e => e.day === day)) return 'family_same_day';
  if (family.some(e => daysBetween(e.day, day) < definition.rules.cooldownDays)) return 'cooldown';
  if (definition.rules.maxPerMonth && family.filter(e => monthKey(e.day) === monthKey(day)).length >= definition.rules.maxPerMonth) return 'monthly_limit';
  for (const group of definition.rules.groups) {
    const policy = engine.policySnapshot.groups[group];
    if (!policy) throw new Error('Unknown policy group');
    const count = history.filter(e => e.day <= day && daysBetween(e.day, day) < policy.days && catalog.find(d => d.id === e.definitionId)?.rules.groups.includes(group)).length;
    if (count >= policy.max) return 'group_limit';
  }
  if (definition.rules.exclusionGroup && history.some(e => e.day === day && catalog.find(d => d.id === e.definitionId)?.rules.exclusionGroup === definition.rules.exclusionGroup)) return 'exclusion_group';
  return null;
}
function deterministicId(input: PlannerInput, generationKey: string): string {
  const rng = eventRng(input.runId, input.rngVersion, input.day, 'instance_id', generationKey);
  const bytes = Array.from({ length: 16 }, () => uniformInt(rng, 0, 255));
  bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
  const hex = bytes.map(b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
export function planEventDay(input: PlannerInput) {
  if (input.engine.policySnapshot.version !== 1) return planLifeDay(input);
  const { engine, day, catalog, runId, rngVersion } = input, policy = engine.policySnapshot;
  const rejected: Rejection[] = [];
  const reject = (definitionId: string, window: string, reason: string) => { if (input.diagnostics) rejected.push({ definitionId, window, reason }); };
  if (day < dayKey(new Date(engine.startedAt))) return { instances: [] as EventInstance[], rejected };
  const firstDay = day === dayKey(new Date(engine.startedAt));
  const evaluationAt = input.evaluationAt ?? (firstDay ? engine.startedAt : localInstant(day, 0).toISOString());
  if (dayKey(new Date(evaluationAt)) !== day) throw new Error('Planner state time outside planned day');
  const stateAt = buildSimulatorStateAt(input.consequenceState ?? emptyConsequenceState(), evaluationAt);
  const windows = availabilityWindows(day, engine.scheduleProfile, policy);
  const candidates: { definition: EventDefinitionV1; window: WindowId; scheduledAt: string; score: number; variation: EventVariation }[] = [];
  for (const definition of [...catalog].sort((a, b) => a.id.localeCompare(b.id))) {
    const basic = stateRuleReason(definition.rules.state, stateAt) ?? (definition.rules.requiresFutureFeature ? 'future_feature_required' : definition.rules.weekendOnly && ![0, 6].includes(weekday(day)) ? 'wrong_window' : frequencyReason(definition, day, input.history, engine, catalog));
    if (basic) { reject(definition.id, '*', basic); continue; }
    for (const window of windows) {
      if (!definition.allowedWindows.includes(window.id)) { reject(definition.id, window.id, 'wrong_window'); continue; }
      const slot = `${window.id}:${definition.id}`;
      if (definition.cadenceClass === 'additional' && eventRng(runId, rngVersion, day, 'candidate_eligibility', slot)() >= policy.additionalChance) { reject(definition.id, window.id, 'weight_not_selected'); continue; }
      const variations = definition.variations.filter(v => !v.additionalRules || (!stateRuleReason(v.additionalRules.state, stateAt) && !v.additionalRules.requiresFutureFeature && (!v.additionalRules.weekendOnly || [0, 6].includes(weekday(day))) && !frequencyReason({ ...definition, rules: v.additionalRules }, day, input.history, engine, catalog)));
      const variation = [...variations].sort((a, b) => weightedScore(runId, rngVersion, day, 'variation', `${slot}:${a.id}`, a.weight) - weightedScore(runId, rngVersion, day, 'variation', `${slot}:${b.id}`, b.weight) || a.id.localeCompare(b.id))[0];
      if (!variation) { reject(definition.id, window.id, 'future_feature_required'); continue; }
      const minutes = [];
      const maxDuration = Math.max(...variation.options.map(o => o.durationMinutes));
      const occupied = occupiedSchedule(day, engine.scheduleProfile, policy);
      const startInstant = localInstant(day, window.start).getTime();
      for (let minute = window.start; minute < window.end; minute++) {
        const instant = startInstant + (minute - window.start) * 60000;
        if (firstDay && instant < new Date(engine.startedAt).getTime()) continue;
        if (minute + maxDuration > 1440 || (maxDuration && occupied && minute < occupied.end && minute + maxDuration > occupied.start)) continue;
        minutes.push(minute);
      }
      if (!minutes.length) { reject(definition.id, window.id, firstDay && localInstant(day, window.end - 1).toISOString() < engine.startedAt ? 'first_day_cutoff' : 'schedule_conflict'); continue; }
      const minute = minutes[uniformInt(eventRng(runId, rngVersion, day, 'scheduled_time', slot, variation.id), 0, minutes.length - 1)];
      candidates.push({ definition, window: window.id, scheduledAt: localInstant(day, minute).toISOString(), variation, score: weightedScore(runId, rngVersion, day, 'candidate_score', slot, definition.weight) });
    }
  }
  const selected: typeof candidates = [];
  for (const window of windows) {
    const routine = candidates.filter(c => c.window === window.id && c.definition.cadenceClass === 'routine').sort((a, b) => a.score - b.score || a.definition.id.localeCompare(b.definition.id));
    if (routine.length && eventRng(runId, rngVersion, day, 'candidate_eligibility', `routine:${window.id}`)() < policy.routineChances[window.id]) selected.push(routine[0]);
    for (const c of routine.filter(c => !selected.includes(c))) reject(c.definition.id, window.id, 'weight_not_selected');
  }
  selected.push(...candidates.filter(c => c.definition.cadenceClass === 'additional'));
  const instances: EventInstance[] = [];
  for (const candidate of selected.sort((a, b) => a.score - b.score || a.definition.id.localeCompare(b.definition.id) || a.window.localeCompare(b.window))) {
    const frequency = frequencyReason(candidate.definition, day, [...input.history, ...instances], engine, catalog);
    if (frequency) { reject(candidate.definition.id, candidate.window, frequency); continue; }
    if (instances.some(e => Math.abs(new Date(e.scheduledAt).getTime() - new Date(candidate.scheduledAt).getTime()) < policy.minGapMinutes * 60000)) { reject(candidate.definition.id, candidate.window, 'spacing_conflict'); continue; }
    const activityMinutes = Math.max(...candidate.variation.options.map(o => o.durationMinutes));
    const activityStart = Date.parse(candidate.scheduledAt), activityEnd = activityStart + activityMinutes * 60000;
    if (activityMinutes && [...input.history, ...instances].some(e => {
      if (e.day !== day) return false;
      const duration = e.status === 'resolved' ? e.activityStartAt && e.activityEndAt ? (Date.parse(e.activityEndAt) - Date.parse(e.activityStartAt)) / 60000 : 0 : Math.max(...e.snapshot.options.map(o => o.durationMinutes));
      const start = Date.parse(e.activityStartAt ?? e.scheduledAt);
      return duration > 0 && activityStart < start + duration * 60000 && activityEnd > start;
    })) { reject(candidate.definition.id, candidate.window, 'activity_overlap'); continue; }
    const generationKey = `v${engine.catalogVersion}:p${engine.policyVersion}:${day}:${candidate.window}:${candidate.definition.id}`;
    instances.push({ id: deterministicId(input, generationKey), runId: input.runId, userId: input.userId, day,
      definitionId: candidate.definition.id, definitionVersion: candidate.definition.version, familyId: candidate.definition.familyId, variationId: candidate.variation.id,
      scheduledAt: candidate.scheduledAt, expiresAt: nextLocalMidnight(day).toISOString(), snapshotVersion: 1,
      snapshot: materializeSnapshot(runId, rngVersion, day, candidate.definition, candidate.variation), status: 'pending', resolutionMode: null,
      selectedOptionId: null, selectedCostBani: null, feedbackSnapshot: null, resolvedAt: null, activityStartAt: null, activityEndAt: null,
      generationKey, cancelReason: null, createdAt: input.plannedAt });
  }
  return { instances: instances.sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt) || a.generationKey.localeCompare(b.generationKey)), rejected };
}

function planLifeDay(input:PlannerInput):{instances:EventInstance[];rejected:Rejection[]} {
  const {engine,day,runId,rngVersion,catalog}=input,policy=engine.policySnapshot;
  if(policy.version===1)throw new Error('Life policy required');
  const instances:EventInstance[]=[],rejected:Rejection[]=[];
  const reject=(id:string,window:string,reason:string)=>{if(input.diagnostics)rejected.push({definitionId:id,window,reason});};
  if(day<dayKey(new Date(engine.startedAt)))return {instances,rejected};
  // Bounded history serves exact/family cooldowns, monthly rules, and semantic windows.
  const recent=input.history.filter(e=>e.day<=day && daysBetween(e.day,day)<=90 && e.status!=='cancelled');
  const metadata=(e:EventInstance)=>e.snapshot.life??catalog.find(d=>d.id===e.definitionId)?.life;
  const reason=(d:EventDefinitionV1,history:readonly EventInstance[]):string|null=>{
    const profileReason = lifeProfileEventReason(d, input.lifeProfile, null);
    if (profileReason) return profileReason;
    const life=d.life;if(!life)return 'missing_life_metadata';
    if(!life.profiles.includes(engine.scheduleProfile))return 'profile';
    if(life.weekdaysOnly && !occupiedSchedule(day,engine.scheduleProfile,policy))return 'program_absent';
    if(d.rules.weekendOnly && ![0,6].includes(weekday(day)))return 'weekday';
    if(life.months && !life.months.includes(Number(day.slice(5,7))))return 'season';
    if(d.rules.requiresFutureFeature)return 'future_feature_required';
    const story=d.rules.state?.requiredFlags;
    if(story?.length && history.some(e=>{
      const requirements=e.snapshot.relevance?.flatMap(r=>r.requiredFlags??[])??catalog.find(d=>d.id===e.definitionId)?.rules.state?.requiredFlags??[];
      return requirements.some(f=>story.includes(f)) && (e.day===day || e.status==='pending');
    }))return 'story_already_pending';
    if(history.some(e=>e.definitionId===d.id && daysBetween(e.day,day)<d.rules.cooldownDays))return 'event_cooldown';
    if(history.some(e=>e.familyId===d.familyId && (e.day===day || daysBetween(e.day,day)<life.familyCooldownDays)))return 'family_cooldown';
    // A real unresolved problem may return; its own semantic tag must not block the follow-up.
    if(!d.rules.state?.requiredFlags?.length)for(const tag of life.semanticTags){
      const hard=policy.semanticHardDays[tag];
      if(hard && history.some(e=>daysBetween(e.day,day)<hard && metadata(e)?.semanticTags.includes(tag)))return `semantic_cooldown:${tag}`;
    }
    const global=frequencyReason({...d,rules:{...d.rules,cooldownDays:0}},day,history,engine,catalog);
    return global;
  };
  for(const window of lifeOpportunities(day,engine.scheduleProfile,policy)){
    const instants=new Map<number,string>();
    const states=new Map<number,ReturnType<typeof buildSimulatorStateAt>>();
    const instant=(minute:number)=>{let value=instants.get(minute);if(!value){value=localInstant(day,minute).toISOString();instants.set(minute,value);}return value;};
    if(eventRng(runId,rngVersion,day,'life_opportunity',window.id)()>=policy.opportunityChances[window.id]){
      for(const d of catalog.filter(d=>d.life?.opportunities.includes(window.id)))reject(d.id,window.id,'quiet_opportunity');
      continue;
    }
    const candidates: {definition:EventDefinitionV1;variation:EventVariation;scheduledAt:string;score:number}[]=[];
    for(const d of [...catalog].sort((a,b)=>a.id.localeCompare(b.id))){
      if(!d.life?.opportunities.includes(window.id))continue;
      const blocked=reason(d,[...recent,...instances]);if(blocked){reject(d.id,window.id,blocked);continue;}
      const slot=`life:${window.id}:${d.id}`;
      const variation=[...d.variations].sort((a,b)=>weightedScore(runId,rngVersion,day,'variation',`${slot}:${a.id}`,a.weight)-weightedScore(runId,rngVersion,day,'variation',`${slot}:${b.id}`,b.weight)||a.id.localeCompare(b.id))[0];
      const duration=Math.max(...variation.options.map(o=>o.durationMinutes)),occupied=occupiedSchedule(day,engine.scheduleProfile,policy);
      const minutes:number[]=[];
      for(let m=window.start;m<window.end;m++){
        if (lifeProfileEventReason(d, input.lifeProfile, occupied, m)) continue;
        const at=instant(m);
        if(at<engine.startedAt || m+duration>=1440 || (duration && occupied && m<occupied.end && m+duration>occupied.start))continue;
        if(instances.some(e=>Math.abs(Date.parse(e.scheduledAt)-Date.parse(at))<policy.minGapMinutes*60000))continue;
        if([...input.history,...instances].some(e=>e.day===day && e.status!=='cancelled' && (()=>{
          const start=Date.parse(e.activityStartAt??e.scheduledAt),end=e.status==='resolved'?e.activityEndAt?Date.parse(e.activityEndAt):start:start+Math.max(...e.snapshot.options.map(o=>o.durationMinutes))*60000;
          const next=Date.parse(at);return next<end && next+Math.max(duration,1)*60000>start;
        })()))continue;
        let state=states.get(m);if(!state){state=buildSimulatorStateAt(input.consequenceState??emptyConsequenceState(),at);states.set(m,state);}
        if(stateRuleReason(d.rules.state,state)||stateRuleReason(variation.additionalRules?.state,state))continue;
        minutes.push(m);
      }
      if(!minutes.length){reject(d.id,window.id,'state_or_schedule_conflict');continue;}
      const count=recent.filter(e=>daysBetween(e.day,day)<policy.semanticHistoryDays && metadata(e)?.semanticTags.some(t=>d.life!.semanticTags.includes(t))).length;
      const weight=d.weight*policy.rarityWeights[d.life.rarity]*Math.pow(policy.repeatWeightFactor,Math.min(count,4));
      candidates.push({definition:d,variation,scheduledAt:instant(minutes[uniformInt(eventRng(runId,rngVersion,day,'scheduled_time',slot,variation.id),0,minutes.length-1)]),score:weightedScore(runId,rngVersion,day,'candidate_score',slot,weight)});
    }
    const chosen=candidates.sort((a,b)=>a.score-b.score||a.definition.id.localeCompare(b.definition.id))[0];
    if(!chosen)continue;
    for(const other of candidates.slice(1))reject(other.definition.id,window.id,'lower_rank');
    const d=chosen.definition,v=chosen.variation,generationKey=`v2:p${engine.policyVersion}:${day}:${window.id}:${d.id}`;
    instances.push({id:deterministicId(input,generationKey),runId,userId:input.userId,day,definitionId:d.id,definitionVersion:d.version,familyId:d.familyId,variationId:v.id,scheduledAt:chosen.scheduledAt,expiresAt:policy.version===3?decisionExpiry(chosen.scheduledAt):nextLocalMidnight(day).toISOString(),snapshotVersion:1,snapshot:materializeSnapshot(runId,rngVersion,day,d,v),status:'pending',resolutionMode:null,selectedOptionId:null,selectedCostBani:null,feedbackSnapshot:null,resolvedAt:null,activityStartAt:null,activityEndAt:null,generationKey,cancelReason:null,createdAt:input.plannedAt});
  }
  return {instances:instances.sort((a,b)=>a.scheduledAt.localeCompare(b.scheduledAt)||a.generationKey.localeCompare(b.generationKey)),rejected};
}
