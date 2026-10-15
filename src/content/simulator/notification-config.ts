/** Explicit editorial allowlist. Routine moments remain in-app only.
 * Versioned catalog identities, never rarity or a random choice. */
export const eventNotificationPolicies: Readonly<Record<string, { body: string; remindBeforeExpiryMinutes?: number }>> = {
  school_study_cafe: { body: 'Colegii au propus ceva după ore.', remindBeforeExpiryMinutes: 5 },
  school_project_cardboard: { body: 'Grupul tău pregătește materialele pentru proiect.' },
  unexpected_bag_followup: { body: 'Problema genții cere o decizie.' },
  social_group_bowling: { body: 'Prietenii au propus o activitate împreună.', remindBeforeExpiryMinutes: 5 },
};
/** Existing Chapter 4 development fixture; production never applies this policy. */
export const developmentEventNotificationPolicies: typeof eventNotificationPolicies = {
  dev_phone_problem: { body: 'Telefonul are nevoie de o decizie.', remindBeforeExpiryMinutes: 5 },
};
