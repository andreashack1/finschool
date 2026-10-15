export const simulatorErrorCopy = {
  GOAL_UNAVAILABLE: 'Nu am putut salva obiectivul. Încearcă din nou.',
  GOAL_INSUFFICIENT: 'Nu ai suficienți bani disponibili.',
  GOAL_OVER_TARGET: 'Suma depășește banii rămași până la obiectiv.',
  GOAL_OVER_SAVED: 'Poți scoate doar banii puși deoparte în obiectiv.',
  GOAL_TARGET_BELOW_SAVED: 'Suma țintă nu poate fi mai mică decât suma pe care ai pus-o deja deoparte.',
  GOAL_EXISTS: 'Ai deja un obiectiv. Încheie-l înainte să creezi altul.',
  GOAL_MISSING: 'Obiectivul nu mai este disponibil. Reîncarcă simulatorul.',
  MONTHLY_REVIEW_REQUIRED: 'Parcurge mai întâi luna încheiată împreună cu Fini.',
  INVALID_SIMULATOR_INPUT: 'Datele cererii pentru simulator nu sunt valide.',
  INVALID_SIMULATOR_CONFIG: 'Regulile acestui run nu pot fi citite. Nu am modificat datele.',
  SIMULATOR_UNAVAILABLE: 'Simulatorul nu este disponibil acum. Verifică dacă migrarea simulatorului a fost aplicată.',
  SIMULATOR_CONFLICT: 'Starea simulatorului s-a schimbat. Reîncarcă și încearcă din nou.',
  SIMULATOR_CLOCK_REVERSED: 'Data este înaintea ultimei zile decontate. În development folosește Resetează.',
} as const;
export class SimulatorError extends Error {
  constructor(public code: keyof typeof simulatorErrorCopy, public status = 400) { super(simulatorErrorCopy[code]); }
}
