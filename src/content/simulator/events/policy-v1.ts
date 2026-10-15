import { policySchema } from '../../../lib/simulator/events/types';

/** Immutable policy v1. Scenario schedules, not claims about real users.
 * Routine window probabilities + independent additional chances target ~1–2
 * decisions on an eligible full day. They are probabilities, never daily quotas. */
export const eventPolicyV1 = policySchema.parse({
  version: 1, minGapMinutes: 60, batchDays: 31,
  routineChances: { morning: 0.55, lunch: 0.50, after_program: 0.30, evening: 0, weekend_day: 0.30 },
  additionalChance: 0.12,
  profiles: { liceu: { start: 480, end: 840 }, lucrez: { start: 540, end: 1020 } },
  windows: { morning: { start: 390, end: 480 }, lunch: { start: 720, end: 780 }, after_program: { start: 900, end: 1080 }, evening: { start: 1080, end: 1260 }, weekend_day: { start: 600, end: 960 } },
  groups: { social_invites: { days: 7, max: 3 } }, exceptions: [],
});
