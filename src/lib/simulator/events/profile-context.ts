import type { LifeProfile } from '../life-profile';
import type { EventDefinitionV1 } from './types';
import type { LifeMetadata } from './life-taxonomy';

/** Catalog semantics, independent of titles, money and RNG. */
export function profileContext(definition: EventDefinitionV1) {
  const life = definition.life;
  if (!life) return { contexts: ['general'] as LifeMetadata['contexts'] };
  const contexts: NonNullable<LifeMetadata['contexts']> = [];
  if (life.domain === 'school') contexts.push('school');
  if (life.domain === 'work') contexts.push('work');
  if (life.opportunities.some(o => o === 'morning_break' || o === 'midday_break')) contexts.push('break');
  if (life.opportunities.some(o => ['after_program', 'early_evening', 'evening', 'weekend_morning', 'weekend_daytime'].includes(o))) contexts.push('free_time');
  if (life.semanticTags.includes('home')) contexts.push('home');
  if (life.semanticTags.includes('transport')) contexts.push('transport');
  return {
    contexts: contexts.length ? contexts : ['general'] as NonNullable<LifeMetadata['contexts']>,
    ...(['home_supply', 'home_shared'].includes(definition.familyId) ? { requiredHousing: 'chirie' as const } : {}),
    ...(life.semanticTags.includes('transport') && life.semanticTags.includes('waiting') ? { requiredTransport: 'public' as const } : {}),
  };
}
export function lifeProfileEventReason(definition: EventDefinitionV1, profile: LifeProfile | undefined, occupied: { start: number; end: number } | null, minute?: number) {
  if (!profile) return null; // Existing simulations retain their eligibility.
  const life = definition.life;
  if (!life) return 'missing_context';
  if (life.requiredHousing && life.requiredHousing !== profile.housingStatus) return 'housing_profile';
  if (life.requiredTransport && life.requiredTransport !== profile.transportMode) return 'transport_profile';
  if (!life.profiles.includes(profile.activityStatus)) return 'activity_profile';
  if (minute !== undefined && occupied && minute >= occupied.start && minute < occupied.end) {
    const contexts = life.contexts ?? [];
    if (!contexts.includes('break') || life.semanticTags.some(t => ['cinema', 'games', 'shopping', 'sport'].includes(t))) return 'scheduled_hours';
    if (life.domain === 'school' && profile.activityStatus !== 'liceu') return 'school_context';
    if (life.domain === 'work' && profile.activityStatus !== 'lucrez') return 'work_context';
  }
  return null;
}
