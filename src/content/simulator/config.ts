import { simulatorConfigSchema } from '../../lib/simulator/types';
import { lei } from '../../lib/simulator/money';

// EXEMPLE EDUCAȚIONALE. Valorile monetare nu descriu situația reală a utilizatorului.
export const simulatorConfig = simulatorConfigSchema.parse({
  timezone: 'Europe/Bucharest', rulesVersion: 1, rngVersion: 1, startAge: 18,
  payday: 1, minEventsPerDay: 0, maxEventsPerDay: 4,
  // EXEMPLU DE SIMULATOR — NU ESTE O AFIRMAȚIE DESPRE SALARIUL REAL AL UTILIZATORULUI.
  monthlyIncomeBani: lei(2000), startingBalanceBani: lei(400), // EXEMPLU.
  housing: {
    parinti: { id: 'housing', label: 'Contribuție la locuință', category: 'locuinta', dueDay: 5, amountBani: lei(300), order: 0 },
    chirie: { id: 'housing', label: 'Chirie', category: 'locuinta', dueDay: 5, amountBani: lei(800), order: 0 },
  },
  fixedExpenses: [
    { id: 'transport', label: 'Transport', category: 'transport', dueDay: 1, amountBani: lei(120), order: 1 },
    { id: 'subscriptions', label: 'Abonamente', category: 'abonamente', dueDay: 10, amountBani: lei(50), order: 2 },
    { id: 'phone', label: 'Telefon', category: 'tehnologie', dueDay: 15, amountBani: lei(40), order: 3 },
  ],
});
