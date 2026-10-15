import { simulatorConfig } from './config';
import { simulatorConfigSchema, type SimulatorRun } from '../../lib/simulator/types';
import { lifeProfileSchema, type LifeProfile } from '../../lib/simulator/life-profile';
import { lei } from '../../lib/simulator/money';

/** Simulation presets, never verified personal information. Persisted once per run. */
export const lifeProfilePresets = {
  schedules: { liceu: { start: 480, end: 870 }, lucrez: { start: 540, end: 1020 } },
  income: { liceu: { parinti: lei(1000), chirie: lei(1600) }, lucrez: { parinti: lei(2000), chirie: lei(2000) } },
  rentBani: lei(1200), rentSupportBani: lei(600), transportBani: lei(120),
  incomeDay: 1, rentDay: 5,
} as const;
export function lifeProfileConfig(input: LifeProfile) {
  const lifeProfile = lifeProfileSchema.parse(input), p = lifeProfilePresets;
  return simulatorConfigSchema.parse({ ...simulatorConfig, lifeProfile,
    payday: p.incomeDay, monthlyIncomeBani: p.income[lifeProfile.activityStatus][lifeProfile.housingStatus],
    housing: {
      parinti: { ...simulatorConfig.housing.parinti, label: 'Locuință', amountBani: lei(0) },
      chirie: { ...simulatorConfig.housing.chirie, amountBani: p.rentBani, dueDay: p.rentDay },
    },
    // Subscriptions are explicitly created by the user, never supplied by a preset.
    fixedExpenses: lifeProfile.transportMode === 'public' ? [{ ...simulatorConfig.fixedExpenses[0], amountBani: p.transportBani }] : [],
    recurringInflows: lifeProfile.housingStatus === 'chirie' ? [{ id: 'rent_support', label: 'Ajutor chirie', amountBani: p.rentSupportBani, dueDay: p.incomeDay, order: 201 }] : [],
  });
}
export const incomeLabel = (run: SimulatorRun) => run.configSnapshot.lifeProfile?.activityStatus === 'liceu' ? 'Buget lunar' : 'Salariu';
export const isSupportEntry = (entry: { refKey: string }) => /:inflow:/.test(entry.refKey);
