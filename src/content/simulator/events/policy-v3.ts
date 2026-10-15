import { policyV3Schema } from '../../../lib/simulator/events/types';
import { defaultDecisionWindowMinutes } from '../../../lib/simulator/events/decision-policy';
import { eventPolicyV2 } from './policy-v2';
export const eventPolicyV3 = policyV3Schema.parse({ ...eventPolicyV2, version:3, decisionWindowMinutes:defaultDecisionWindowMinutes });
