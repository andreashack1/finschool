import { type DayKey } from './calendar';
import { SimulatorError } from './errors';
import { bani, type MoneyBani } from './money';
import { arrayChoice, createRng, dailySeed } from './rng';
import { eventDefinitionSchema, ledgerEntrySchema, ledgerSequence, type EventDefinition } from './types';

export function resolveMissedEvent(eventInput: EventDefinition, balance: MoneyBani, context: { runId: string; day: DayKey; rngVersion: 1; sequence?: number }) {
  balance = bani(balance);
  const parsed = eventDefinitionSchema.safeParse(eventInput);
  if (!parsed.success) throw new SimulatorError('INVALID_SIMULATOR_CONFIG', 503);
  const event = parsed.data;
  // An affordable paid choice takes priority; zero-cost is only a safe fallback.
  const paid = event.optiuni.filter(o => o.costBani > 0 && o.costBani <= Math.max(balance, 0));
  const pool = paid.length ? paid : event.optiuni.filter(o => o.fallbackWhenUnaffordable && o.costBani === 0);
  if (!pool.length) throw new SimulatorError('INVALID_SIMULATOR_CONFIG', 503);
  const option = arrayChoice(createRng(dailySeed(context.runId, context.day, 'missed', context.rngVersion, event.id)), pool);
  const entry = ledgerEntrySchema.parse({ day: context.day, sequence: context.sequence ?? ledgerSequence.missed, kind: 'decizie_automata', category: event.categorie, amountBani: bani(-option.costBani), label: `Ai ratat. S-a ales automat: ${option.label}`, refKey: `${context.runId}:${context.day}:missed:${event.id}`, autoResolved: true });
  return { option, entry };
}
