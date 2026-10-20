import type { EventDefinitionV1 } from './types';

export type EventInterest = 'routine' | 'engaging';
/** Editorial distinction: everyday supplies vs. a social plan, preparation or tradeoff.
 * Never consult prices, balances or RNG. Existing semantic metadata is canonical. */
export function eventInterest(definition: Pick<EventDefinitionV1, 'life' | 'rules'>): EventInterest {
  const life = definition.life;
  if (!life) return 'routine';
  if (definition.rules.state?.requiredFlags?.length) return 'engaging';
  return life.semanticTags.some(tag => ['social_outing', 'project', 'repair', 'learning', 'sport', 'culture', 'family', 'preparation', 'reuse'].includes(tag))
    || ['transport', 'digital', 'unexpected', 'weekend'].includes(life.domain) ? 'engaging' : 'routine';
}
