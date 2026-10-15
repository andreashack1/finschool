export const monthlyReviewPolicy = {
  version: 1, schemaVersion: 1, smallSpendThresholdBani: 3000,
  minSmallSpends: 5, whatIfCount: 4, maxCategories: 5, maxInsights: 3,
  minComparisonChangeBani: 1000,
  minFreeChoices: 3,
  ranking: { magnitudeStepBani: 10000, maxMagnitudePoints: 25 },
  excludedFlexibleDomains: ['obligation', 'unexpected'] as readonly string[],
  excludedFlexibleTags: ['repair'] as readonly string[],
  flexibleCategories: ['mancare', 'iesiri', 'cumparaturi'] as readonly string[],
} as const;
