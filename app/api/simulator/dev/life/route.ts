import { z } from 'zod';
import { simulatorApi } from '../../../../../src/lib/simulator/server/http';
import { eventCatalog,eventPolicy } from '../../../../../src/content/simulator/events/registry.server';
import { catalogReport,simulateLife } from '../../../../../src/lib/simulator/events/life-report';
import { dayKeySchema } from '../../../../../src/lib/simulator/calendar';
import { planEventDay } from '../../../../../src/lib/simulator/events/planner';
import { engineSchema } from '../../../../../src/lib/simulator/events/types';
import { localInstant } from '../../../../../src/lib/simulator/events/time';
const querySchema=z.strictObject({day:dayKeySchema.default(dayKeySchema.parse('2026-10-01')),profile:z.enum(['liceu','lucrez']).default('liceu'),days:z.coerce.number().int().min(1).max(90).default(30),seed:z.string().regex(/^[a-zA-Z0-9_-]{1,60}$/).default('finly-life-liceu')});
export async function GET(request:Request){return simulatorApi(request,async user=>{
 const query=querySchema.parse(Object.fromEntries(new URL(request.url).searchParams)),catalog=eventCatalog(2),policy=eventPolicy(2);
 const simulation=simulateLife(catalog,policy,query.profile,query.seed,query.day,query.days);
 const engine=engineSchema.parse({scheduleProfile:query.profile,startedAt:localInstant(query.day,0).toISOString(),catalogVersion:2,policyVersion:2,policySnapshot:policy,lastClosedDay:null,processedAt:null});
 const diagnostics=planEventDay({runId:simulation.runId,userId:user.id,rngVersion:1,day:query.day,engine,catalog,history:[],plannedAt:engine.startedAt,diagnostics:true});
 const metrics={...simulation,instances:undefined};
 const selectedIds=new Set(diagnostics.instances.map(e=>e.definitionId));
 return {catalogVersion:2,policyVersion:2,catalog:catalogReport(catalog,policy),simulation:metrics,selectedDay:{day:query.day,profile:query.profile,profileCandidateCount:catalog.filter(d=>d.life?.profiles.includes(query.profile)).length,candidateCount:new Set([...selectedIds,...diagnostics.rejected.filter(r=>r.reason==='lower_rank').map(r=>r.definitionId)]).size,selected:diagnostics.instances.map(e=>({id:e.definitionId,title:e.snapshot.title,scheduledAt:e.scheduledAt,family:e.familyId,stateRequirements:e.snapshot.relevance,...e.snapshot.life})),candidates:catalog.map(d=>({id:d.id,family:d.familyId,...d.life,cooldownDays:d.rules.cooldownDays,stateRequirements:d.rules.state,selected:selectedIds.has(d.id),rejections:diagnostics.rejected.filter(r=>r.definitionId===d.id)})),rejected:diagnostics.rejected}};
 },true);}
