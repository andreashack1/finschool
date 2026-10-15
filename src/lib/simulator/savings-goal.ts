import { z } from 'zod';
import { bani, costBaniSchema } from './money';
import { amountInputSchema } from './subscriptions';
import type { LedgerEntry } from './types';

export const goalNameSchema = z.string().trim().min(1).max(60);
export const goalSchema = z.object({ id: z.uuid(), name: goalNameSchema, targetAmountBani: costBaniSchema.refine(n => n > 0), savedAmountBani: costBaniSchema, remainingAmountBani: costBaniSchema, progressPercent: z.number().int().min(0).max(100), status: z.enum(['active', 'reached']) });
export type SavingsGoal = z.infer<typeof goalSchema>;
export const goalInputSchema = z.discriminatedUnion('action', [
  z.strictObject({ action: z.literal('create'), name: goalNameSchema, amount: amountInputSchema, operationId: z.uuid() }),
  z.strictObject({ action: z.literal('edit'), id: z.uuid(), name: goalNameSchema, amount: amountInputSchema, operationId: z.uuid() }),
  z.strictObject({ action: z.enum(['contribution', 'withdrawal']), id: z.uuid(), amount: amountInputSchema, operationId: z.uuid() }),
  z.strictObject({ action: z.literal('archive'), id: z.uuid(), operationId: z.uuid() }),
]);
export function goalView(row: { id: string; name: string; target_amount_bani: number; status: string }, ledger: readonly LedgerEntry[]): SavingsGoal {
  const saved = bani(-ledger.filter(e => e.kind === 'transfer_obiectiv' && e.refKey.startsWith(`goal:${row.id}:`)).reduce((sum, e) => sum + e.amountBani, 0));
  return goalSchema.parse({ id: row.id, name: row.name, targetAmountBani: row.target_amount_bani, savedAmountBani: saved, remainingAmountBani: row.target_amount_bani - saved, progressPercent: Math.min(100, Math.round(saved / row.target_amount_bani * 100)), status: row.status });
}
