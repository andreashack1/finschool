import 'server-only';
import { z } from 'zod';
import { validateCatalog } from '../../../lib/simulator/events/validate';
import type { ConsequenceDescriptor, StateRules } from '../../../lib/simulator/consequences/types';

export const demoScenarioSchema = z.enum(['coverage', 'coverage_probe', 'phone_problem', 'phone_resolution', 'phone_followup', 'extend']);
export type DemoScenario = z.infer<typeof demoScenarioSchema>;
const foodPresentation = { title: 'Ai provizii pentru mesele următoare.', description: 'Ai o alternativă la cumpărarea unei mese în acest scenariu.', visibility: 'user' as const, priority: 30 };
/** Never added to the production catalog. Dev and tests materialize these
 * through the actual planner and commit/resolution pipeline. */
export function consequenceDemoCatalog(scenario: DemoScenario) {
  let consequences: ConsequenceDescriptor[] = [], state: StateRules | undefined;
  const titles: Record<DemoScenario, string> = {
    coverage: 'Pregătești mesele pentru două zile', coverage_probe: 'O masă cumpărată pe drum',
    phone_problem: 'Telefonul are o problemă', phone_resolution: 'Verifici telefonul', phone_followup: 'O a doua verificare a telefonului', extend: 'Pregătești încă două zile de mese',
  };
  if (scenario === 'coverage' || scenario === 'extend') consequences = [{ id: 'food-coverage', type: 'add_effect', effectType: 'food_coverage', familyKey: 'food_coverage', durationDays: 2, startOffsetDays: 0, overlapPolicy: 'extend', value: { coverage: true }, presentation: foodPresentation }];
  if (scenario === 'coverage_probe') state = { excludedEffects: ['food_coverage'] };
  if (scenario === 'phone_problem') consequences = [{ id: 'phone-problem', type: 'set_flag', key: 'phone_problematic', value: true, presentation: { title: 'Telefonul are o problemă.', description: 'O verificare poate clarifica ce ai de făcut.', priority: 50, visibility: 'user' } }];
  if (scenario === 'phone_resolution' || scenario === 'phone_followup') { state = { requiredFlags: ['phone_problematic'] }; consequences = [{ id: 'phone-fixed', type: 'clear_flag', key: 'phone_problematic' }]; }
  const name = `dev_${scenario}`;
  return validateCatalog([{
    id: name, familyId: name, version: 1, category: scenario.startsWith('phone') ? 'tehnologie' : 'mancare', cadenceClass: 'additional',
    allowedWindows: ['evening'], expirationPolicy: 'local_midnight', weight: 1,
    rules: { cooldownDays: 0, groups: [], ...(state ? { state } : {}) },
    variations: ['a', 'b'].map(variation => ({ id: `${name}_${variation}`, title: titles[scenario], description: 'Scenariu de verificare Chapter 4. Alegerea se salvează în run-ul tău de development.', weight: 1,
      presentation:{title:titles[scenario],context:scenario.startsWith('phone')?'Telefonul are nevoie de atenție înainte să îl folosești din nou.':'Pregătești mesele pentru zilele următoare.',bullets:[{text:scenario.startsWith('phone')?'O verificare poate clarifica problema':'Proviziile rămân disponibile după pregătire'},{text:'Alegerea se salvează în SimLife de development'}]},
      options: [
        { id: `${name}_${variation}_paid`, label: 'Alegi varianta cu o cumpărătură', priceModel: { type: 'fixed', amountBani: 100 }, feedback: 'Ai ales varianta cu o cheltuială și ai actualizat situația.', durationMinutes: 0, fallbackWhenUnaffordable: false, consequences },
        { id: `${name}_${variation}_alternative`, label: 'Alegi alternativa din scenariu', priceModel: { type: 'fixed', amountBani: 0 }, feedback: 'Ai ales alternativa și ai actualizat situația.', durationMinutes: 0, fallbackWhenUnaffordable: false, consequences },
        { id: `${name}_${variation}_free`, label: 'Alegi varianta gratuită', priceModel: { type: 'fixed', amountBani: 0 }, feedback: 'Ai ales varianta gratuită. Starea s-a actualizat fără o plată.', durationMinutes: 0, fallbackWhenUnaffordable: true, consequences },
      ],
    })),
  }]);
}
