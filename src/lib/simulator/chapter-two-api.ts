import { z } from 'zod';
import { dashboardSchema, previewSchema } from './dashboard';
import { eventAreaSchema } from './events/types';
import { monthlyReviewSchema } from './monthly-review';
export const simulatorPageSchema = z.object({
  dashboard: dashboardSchema.nullable(), previews: z.array(previewSchema),
  timing: z.object({ serverNow: z.string(), refreshAfterMs: z.number().positive() }),
  events: eventAreaSchema.optional(),
  pendingMonthlyReview: monthlyReviewSchema.nullable().default(null),
  pendingMonthlyReviewCount: z.number().int().nonnegative().default(0),
});
export type SimulatorPageState = z.infer<typeof simulatorPageSchema>;
