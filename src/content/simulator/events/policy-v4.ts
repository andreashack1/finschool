import { policyV4Schema } from '../../../lib/simulator/events/types';
import { eventPolicyV3 } from './policy-v3';

/** Contextual opportunities first; safe deterministic completion below two. */
export const eventPolicyV4 = policyV4Schema.parse({ ...eventPolicyV3, version: 4, minDailyEvents: 2, minGapMinutes: 45,
  // Only at-home digital decisions, never shops, school, sport or night outings.
  lateFloorWindow: { start: 1260, end: 1410 },
  evergreenDefinitionIds: ['digital_game_addon','digital_cloud_export','digital_online_course','leisure_book_evening','leisure_music_download'],
});
