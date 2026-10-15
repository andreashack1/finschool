import { monthKey, type DayKey } from './calendar';
import { bani } from './money';
import { calculateBalance } from './settle';
import { persistedEffectSchema, persistedFlagSchema, type LedgerEntry, type PersistedEffect, type PersistedFlag, type RunState, type SimulatorRun } from './types';

export function deriveRunState(run: SimulatorRun, ledger: readonly LedgerEntry[], effects: readonly PersistedEffect[], flags: readonly PersistedFlag[], currentDay: DayKey): RunState {
  if (currentDay < run.startedOn || ledger.some(e => e.day > currentDay)) throw new RangeError('State cannot include future ledger');
  const monthly = ledger.filter(e => monthKey(e.day) === monthKey(currentDay));
  const spent: RunState['spentByCategoryThisMonth'] = {};
  for (const entry of monthly) if (entry.amountBani < 0 && entry.kind !== 'transfer_obiectiv') spent[entry.category] = bani((spent[entry.category] ?? 0) - entry.amountBani);
  return {
    balanceBani: calculateBalance(ledger), currentDay, spentByCategoryThisMonth: spent,
    activeEffects: effects.map(e => persistedEffectSchema.parse(e)).filter(e => e.startsOn <= currentDay && currentDay <= e.endsOn),
    flags: Object.fromEntries(flags.map(f => persistedFlagSchema.parse(f)).filter(f => f.setOn <= currentDay).map(f => [f.key, f.value])),
    autoResolvedDecisionsThisMonth: monthly.filter(e => e.kind === 'decizie_automata' && e.autoResolved).length,
  };
}
