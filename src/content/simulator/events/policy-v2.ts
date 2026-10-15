import { policySchema } from '../../../lib/simulator/events/types';
import { eventPolicyV1 } from './policy-v1';
/** Independent contextual opportunities, never a daily quota. */
export const eventPolicyV2 = policySchema.parse({
  ...eventPolicyV1, version: 2, minGapMinutes: 20,
  opportunityChances: { before_program:.22, morning_break:.20, midday_break:.22, after_program:.30, early_evening:.16, evening:.18, weekend_morning:.22, weekend_daytime:.30 },
  rarityWeights: { common:1, occasional:.45, rare:.10 }, semanticHistoryDays:7,
  semanticHardDays: { coffee:2, delivery:3, cinema:7, phone:21, cable:14, headphones:14, gift:3, quick_food:1, shopping:1 },
  repeatWeightFactor:.35,
});
