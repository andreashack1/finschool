export const accountConfig = {
  usernameMin: 3, usernameMax: 20, displayNameMax: 40, passwordMin: 8,
  ageOptions: ['Sub 14', '14-15', '16-17', '18-19', '20+'],
  termsVersion: '2026-10-draft', privacyVersion: '2026-10-draft',
  usernameDebounceMs: 400, emailCooldownSeconds: 60,
  // Product acknowledgement only; this is not parental identity verification.
  reservedUsernames: ['admin','administrator','finly','support','help','official','moderator','mod','security','system','root','api','staff','team'],
} as const;
