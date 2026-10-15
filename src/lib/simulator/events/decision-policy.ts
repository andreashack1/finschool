import type { DayKey } from '../calendar';
import type { EventEngine } from './types';
/** Duration is real elapsed time, independent of civil-time DST changes. */
export const defaultDecisionWindowMinutes = 30;
export function decisionExpiry(scheduledAt: string) {
  return new Date(Date.parse(scheduledAt) + defaultDecisionWindowMinutes * 60_000).toISOString();
}
/** Resolve historical policies without reinterpreting already planned days. */
export function planningEngineForDay(engine:EventEngine,day:DayKey):EventEngine {
 const decisionUpgrade=engine.policySnapshot.version===3?engine.policySnapshot.decisionUpgrade:undefined;
 const historical=decisionUpgrade&&day<decisionUpgrade.startsOn?decisionUpgrade.previousPolicy:engine.policySnapshot;
 const upgrade=historical.version!==1?historical.upgrade:undefined;
 const policy=upgrade&&day<upgrade.startsOn?upgrade.previousPolicy:historical;
 return {...engine,catalogVersion:policy.version===1?1:engine.catalogVersion,policyVersion:policy.version,policySnapshot:policy};
}
