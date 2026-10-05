export const errorCopy = {
  CONFIGURATION_ERROR: 'Conturile nu sunt configurate în acest mediu.',
  AUTH_REQUIRED: 'Conectează-te pentru a continua. Activitățile nesincronizate rămân pregătite pentru acest cont.',
  INVALID_OPERATION: 'Activitatea nu poate fi salvată. Verifică datele și încearcă din nou.',
  VALIDATION_ERROR: 'Verifică datele introduse și încearcă din nou.',
  USERNAME_TAKEN: 'Username-ul tocmai a fost ales. Încearcă altul.',
  INVALID_CREDENTIALS: 'Email sau parolă incorectă.',
  RECOVERY_REQUIRED: 'Linkul nu mai este valid sau a expirat.',
  RATE_LIMITED: 'Mai așteaptă puțin înainte de o nouă încercare.',
  SERVER_ERROR: 'Nu am putut salva acum. Mai încearcă puțin mai târziu.',
  ORIGIN_REJECTED: 'Cererea nu poate fi acceptată.',
} as const;
export type AccountErrorCode = keyof typeof errorCopy;
export class AccountError extends Error {
  constructor(public code: AccountErrorCode, public status = 400) { super(errorCopy[code]); }
}
