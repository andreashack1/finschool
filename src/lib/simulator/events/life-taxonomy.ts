import { z } from 'zod';
export const domains = ['routine','food','school','work','transport','social','shopping','home','digital','leisure','obligation','unexpected','opportunity','weekend','seasonal'] as const;
export const semanticTags = ['coffee','quick_food','delivery','social_outing','shopping','transport','project','gift','repair','digital','home','free_activity','impulse','school_break','work_lunch','personal_care','clothing','preparation','phone','cable','headphones','cinema','games','printing','learning','sport','family','culture','seasonal','supplies','waiting','reuse','online_order'] as const;
export const opportunities = ['before_program','morning_break','midday_break','after_program','early_evening','evening','weekend_morning','weekend_daytime'] as const;
export const lifeFamilies = ['breakfast','morning_coffee','lunch_break','after_snack','city_drink','friends_coffee','cinema','games','colleagues_lunch','weekend_terrace','delivery','picnic',
  'morning_errand','school_shop','school_supplies','school_project','school_print','school_team','school_activity','school_forgotten','work_supplies','work_lunch','work_team','work_break','work_errand','commute','route_choice','transport_problem','unexpected_trip',
  'friend_invitation','group_plan','birthday','family_visit','small_gift','shopping_need','shopping_impulse','shopping_comparison','clothing_need','personal_care','home_supply','home_maintenance','home_shared','home_preparation','online_order','device_accessory','digital_service','phone_problem','phone_followup','phone_resolution','cable_problem','cable_resolution','headphones_problem','headphones_resolution','printing_problem','printing_resolution','bag_problem','bag_resolution','clothing_problem','clothing_resolution','meal_preparation','meal_coverage','packed_meal','meal_out','food_group','leisure_culture','leisure_sport','leisure_learning','leisure_walk','leisure_home','free_invitation','borrowing','repair_opportunity','discount_opportunity','weekend_market','weekend_trip','weekend_family','warm_activity','cold_activity','season_supply'] as const;
export const knownStateFlags = ['phone_problematic','cable_problematic','headphones_problematic','printing_needed','bag_problematic','clothing_problematic'] as const;
export const knownEffectFamilies = ['food_coverage','packed_lunch','transport_prepared','project_ready','home_supplies_covered'] as const;
export const lifeMetadataSchema = z.strictObject({
  contexts: z.array(z.enum(['school','work','break','free_time','home','transport','general'])).optional(),
  requiredHousing: z.enum(['parinti','chirie']).optional(),
  requiredTransport: z.enum(['public','walk']).optional(),
  domain: z.enum(domains), semanticTags: z.array(z.enum(semanticTags)).min(1).max(4).refine(a => new Set(a).size === a.length),
  rarity: z.enum(['common','occasional','rare']), profiles: z.array(z.enum(['liceu','lucrez'])).min(1).refine(a => new Set(a).size === a.length),
  opportunities: z.array(z.enum(opportunities)).min(1).refine(a => new Set(a).size === a.length),
  months: z.array(z.number().int().min(1).max(12)).min(1).refine(a=>new Set(a).size===a.length).optional(),
  weekdaysOnly: z.boolean().default(false), familyCooldownDays: z.number().int().min(0).max(90),
});
export type LifeMetadata = z.infer<typeof lifeMetadataSchema>;
export type OpportunityId = typeof opportunities[number];
export type SemanticTag = typeof semanticTags[number];
