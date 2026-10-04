import { z } from "zod";
export const DailyChallengeSchema = z.object({ id: z.string().min(1), question: z.string().min(1), options: z.array(z.object({ id: z.string().min(1), label: z.string().min(1) })).min(2), correctOptionId: z.string().min(1), explanation: z.string().min(1) });
export function validateDailyChallenges(value: unknown) {
  const parsed = DailyChallengeSchema.array().length(10).parse(value);
  if (new Set(parsed.map(c => c.id)).size !== parsed.length) throw new Error("Duplicate daily challenge ID");
  for (const challenge of parsed) {
    if (new Set(challenge.options.map(o => o.id)).size !== challenge.options.length) throw new Error(`Challenge "${challenge.id}" has duplicate options`);
    if (!challenge.options.some(o => o.id === challenge.correctOptionId)) throw new Error(`Challenge "${challenge.id}" references missing correct option`);
  }
  return parsed;
}
export const dailyChallenges = validateDailyChallenges([
  {
    "id": "daily-delivery",
    "question": "Ai 200 lei. Un produs costă 160 lei, iar livrarea încă 25 lei. Cât îți rămâne?",
    "options": [
      {
        "id": "value-10",
        "label": "10 lei"
      },
      {
        "id": "value-15",
        "label": "15 lei"
      },
      {
        "id": "value-25",
        "label": "25 lei"
      },
      {
        "id": "value-40",
        "label": "40 lei"
      }
    ],
    "correctOptionId": "value-15",
    "explanation": "200 - 160 - 25 = 15 lei."
  },
  {
    "id": "daily-week",
    "question": "Ai 300 lei pentru săptămâna asta. Cheltui 90 lei pe transport, 80 lei pe mâncare și 40 lei pe un abonament. Cât îți rămâne?",
    "options": [
      {
        "id": "value-70",
        "label": "70 lei"
      },
      {
        "id": "value-80",
        "label": "80 lei"
      },
      {
        "id": "value-90",
        "label": "90 lei"
      },
      {
        "id": "value-100",
        "label": "100 lei"
      }
    ],
    "correctOptionId": "value-90",
    "explanation": "300 - 90 - 80 - 40 = 90 lei."
  },
  {
    "id": "daily-subscription",
    "question": "Un abonament costă 35 lei pe lună. Cât plătești într-un an dacă prețul rămâne la fel?",
    "options": [
      {
        "id": "value-350",
        "label": "350 lei"
      },
      {
        "id": "value-385",
        "label": "385 lei"
      },
      {
        "id": "value-420",
        "label": "420 lei"
      },
      {
        "id": "value-450",
        "label": "450 lei"
      }
    ],
    "correctOptionId": "value-420",
    "explanation": "35 × 12 = 420 lei într-un an."
  },
  {
    "id": "daily-discount",
    "question": "Un produs costă 120 lei și are reducere de 25%. Cât plătești?",
    "options": [
      {
        "id": "value-90",
        "label": "90 lei"
      },
      {
        "id": "value-95",
        "label": "95 lei"
      },
      {
        "id": "value-100",
        "label": "100 lei"
      },
      {
        "id": "value-105",
        "label": "105 lei"
      }
    ],
    "correctOptionId": "value-90",
    "explanation": "Reducerea este 30 lei. 120 - 30 = 90 lei."
  },
  {
    "id": "daily-saving",
    "question": "Pui deoparte 50 lei pe săptămână timp de 4 săptămâni. Cât ai economisit?",
    "options": [
      {
        "id": "value-150",
        "label": "150 lei"
      },
      {
        "id": "value-180",
        "label": "180 lei"
      },
      {
        "id": "value-200",
        "label": "200 lei"
      },
      {
        "id": "value-250",
        "label": "250 lei"
      }
    ],
    "correctOptionId": "value-200",
    "explanation": "50 × 4 = 200 lei economisiți."
  },
  {
    "id": "daily-income",
    "question": "Primești 450 lei și vrei să economisești 20%. Cât pui deoparte?",
    "options": [
      {
        "id": "value-45",
        "label": "45 lei"
      },
      {
        "id": "value-75",
        "label": "75 lei"
      },
      {
        "id": "value-90",
        "label": "90 lei"
      },
      {
        "id": "value-100",
        "label": "100 lei"
      }
    ],
    "correctOptionId": "value-90",
    "explanation": "20% din 450 lei înseamnă 90 lei."
  },
  {
    "id": "daily-bill",
    "question": "O notă de plată de 90 lei se împarte egal între 3 persoane. Cât plătește fiecare?",
    "options": [
      {
        "id": "value-20",
        "label": "20 lei"
      },
      {
        "id": "value-25",
        "label": "25 lei"
      },
      {
        "id": "value-30",
        "label": "30 lei"
      },
      {
        "id": "value-35",
        "label": "35 lei"
      }
    ],
    "correctOptionId": "value-30",
    "explanation": "90 ÷ 3 = 30 lei de persoană."
  },
  {
    "id": "daily-budget",
    "question": "Ai 1.000 lei. Pui 150 lei deoparte și plătești 600 lei cheltuieli. Cât îți rămâne?",
    "options": [
      {
        "id": "value-200",
        "label": "200 lei"
      },
      {
        "id": "value-250",
        "label": "250 lei"
      },
      {
        "id": "value-300",
        "label": "300 lei"
      },
      {
        "id": "value-350",
        "label": "350 lei"
      }
    ],
    "correctOptionId": "value-250",
    "explanation": "1.000 - 150 - 600 = 250 lei."
  },
  {
    "id": "daily-percent",
    "question": "Vrei să economisești 40% din 250 lei. Cât înseamnă?",
    "options": [
      {
        "id": "value-75",
        "label": "75 lei"
      },
      {
        "id": "value-90",
        "label": "90 lei"
      },
      {
        "id": "value-100",
        "label": "100 lei"
      },
      {
        "id": "value-125",
        "label": "125 lei"
      }
    ],
    "correctOptionId": "value-100",
    "explanation": "40% din 250 lei înseamnă 100 lei."
  },
  {
    "id": "daily-compare",
    "question": "Produsul A costă 80 lei + 20 lei livrare. Produsul B costă 95 lei cu livrare gratuită. Care este mai ieftin?",
    "options": [
      {
        "id": "option-0",
        "label": "A cu 5 lei"
      },
      {
        "id": "option-1",
        "label": "A cu 15 lei"
      },
      {
        "id": "option-2",
        "label": "B cu 5 lei"
      },
      {
        "id": "option-3",
        "label": "Costă la fel"
      }
    ],
    "correctOptionId": "option-2",
    "explanation": "A costă 100 lei cu livrare. B costă 95 lei, deci este mai ieftin cu 5 lei."
  }
]);
export type DailyChallenge = z.infer<typeof DailyChallengeSchema>;
