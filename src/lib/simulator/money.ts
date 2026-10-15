import { z } from 'zod';

/** Integer bani avoid floating point ledger errors and support 14,50 / 29,99 lei. */
export const moneyBaniSchema = z.number().int().min(Number.MIN_SAFE_INTEGER).max(Number.MAX_SAFE_INTEGER).transform(n => n === 0 ? 0 : n).brand<'MoneyBani'>();
export type MoneyBani = z.infer<typeof moneyBaniSchema>;
// Each stored transaction fits PostgreSQL integer; lifetime sums use JS safe integers.
export const storedMoneySchema = moneyBaniSchema.refine(n => n >= -2_147_483_648 && n <= 2_147_483_647, 'Suma depășește limita unei tranzacții');
export const costBaniSchema = storedMoneySchema.refine(n => n >= 0, 'Cost negativ');
export const bani = (value: number): MoneyBani => moneyBaniSchema.parse(value);
export function lei(value: number): MoneyBani {
  if (!Number.isFinite(value)) throw new RangeError('Invalid money');
  const result = Math.round(value * 100);
  if (Math.abs(value * 100 - result) > 0.000001) throw new RangeError('Use at most two decimal places');
  return bani(result);
}
const formatter = new Intl.NumberFormat('ro-RO', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
export function formatLei(value: MoneyBani): string { return `${formatter.format(moneyBaniSchema.parse(value) / 100)} lei`; }
