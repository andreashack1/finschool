import { z } from 'zod';
export const lifeProfileSchema = z.strictObject({
  version: z.literal(1), activityStatus: z.enum(['liceu', 'lucrez']),
  housingStatus: z.enum(['parinti', 'chirie']), transportMode: z.enum(['public', 'walk']),
});
export type LifeProfile = z.infer<typeof lifeProfileSchema>;
