import { z } from "zod";
import { gamificationConfig } from "./gamification-config";
export const DailyChallengeSchema = z.object({ id: z.string().min(1), question: z.string().min(1), options: z.array(z.object({ id: z.string().min(1), label: z.string().min(1) })).min(2), correctOptionId: z.string().min(1), explanation: z.string().min(1) });
export function validateDailyChallenges(value: unknown) {
  const parsed = DailyChallengeSchema.array().length(gamificationConfig.dailyChallengeCount).parse(value);
  if (new Set(parsed.map(c => c.id)).size !== parsed.length) throw new Error("Duplicate daily challenge ID");
  for (const challenge of parsed) {
    if (new Set(challenge.options.map(o => o.id)).size !== challenge.options.length) throw new Error(`Challenge "${challenge.id}" has duplicate options`);
    if (!challenge.options.some(o => o.id === challenge.correctOptionId)) throw new Error(`Challenge "${challenge.id}" references missing correct option`);
  }
  return parsed;
}
const originalChallenges = [
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
]; export type DailyChallenge = z.infer<typeof DailyChallengeSchema>;

// Short everyday decisions; numeric examples are hypothetical, not fiscal rates.
const extra: [string, string[], number, string][] = [
 ["Un abonament costă 25 lei lunar. Cât costă într-un an?", ["250 lei", "300 lei", "325 lei"], 1, "25 × 12 = 300 lei. Prețul lunar mic poate ascunde un cost anual relevant."],
 ["Ai 500 lei și economisești 100 lei. Cât rămâne pentru cheltuieli?", ["400 lei", "500 lei", "600 lei"], 0, "500 − 100 = 400 lei. Economisirea planificată are loc înainte să cheltuiești restul."],
 ["Un produs de 200 lei are reducere de 10%. Care este prețul nou?", ["180 lei", "190 lei", "210 lei"], 0, "10% din 200 înseamnă 20 lei; prețul devine 180 lei."],
 ["O ofertă spune «3.000 lei salariu». Ce merită clarificat?", ["Dacă suma este brută sau netă", "Dacă este rotunjită", "Dacă anunțul are multe vizualizări"], 0, "Brutul și netul nu sunt aceeași sumă. Clarificarea permite o comparație corectă."],
 ["Primești un link care cere codul de autentificare al băncii. Ce faci?", ["Îl trimiți dacă mesajul are logo", "Verifici separat prin canalul oficial", "Răspunzi cu jumătate din cod"], 1, "Codul este sensibil. Verificarea se face independent de linkul primit."],
 ["Ai cheltuit 12 lei pe zi timp de 5 zile. Totalul?", ["50 lei", "60 lei", "72 lei"], 1, "12 × 5 = 60 lei. Cheltuielile mici se adună."],
 ["Când folosești un fond de urgență?", ["Pentru orice reducere", "Pentru o reparație necesară și neașteptată", "Pentru toate ieșirile din weekend"], 1, "Fondul ajută la cheltuieli importante neprevăzute, nu la fiecare ocazie tentantă."],
 ["Ce arată soldul disponibil din cont?", ["Banii disponibili acum", "Salariul viitor", "Toate veniturile din an"], 0, "Soldul disponibil arată ce poate fi folosit acum, nu veniturile viitoare."],
 ["Ai 1.000 lei. Un exemplu ipotetic adaugă 10%. Totalul?", ["1.010 lei", "1.100 lei", "1.200 lei"], 1, "10% din 1.000 este 100. Acesta este un exemplu matematic, nu un randament garantat."],
 ["Prețul unui singur suc crește. Ce poți afirma sigur?", ["Toate prețurile au crescut la fel", "Sucul respectiv s-a scumpit", "Veniturile cresc automat"], 1, "Un singur preț nu descrie evoluția generală a prețurilor."],
 ["O rată nouă este 150 lei lunar. Ce verifici înainte?", ["Doar culoarea produsului", "Bugetul rămas după obligațiile existente", "Doar aprobarea cererii"], 1, "Aprobarea nu garantează că plata se potrivește confortabil în buget."],
 ["Vrei să compari două abonamente. Care cost contează?", ["Doar prima lună promoțională", "Costul total pe perioada comparată", "Doar prețul scris cel mai mare"], 1, "Promoțiile și taxele pot schimba costul total. Compară aceeași perioadă."],
 ["Ai 80 lei, iar cumpărăturile costă 35 și 20 lei. Restul?", ["25 lei", "35 lei", "45 lei"], 0, "80 − 35 − 20 = 25 lei."],
 ["Un prieten cere bani urgent dintr-un cont cunoscut. Ce reflex ajută?", ["Verifici printr-un apel separat", "Trimiți fără să întrebi", "Te bazezi doar pe fotografia de profil"], 0, "Un cont cunoscut poate fi compromis. Confirmarea independentă verifică identitatea."],
 ["Ai ratat o plată. Care pas ajută mai întâi?", ["Ignori notificările", "Verifici obligația și contactezi furnizorul", "Iei imediat alt credit"], 1, "Clarificarea sumei și a termenelor ajută la gestionarea situației fără presupuneri."],
 ["De ce notezi cheltuielile mici?", ["Ca să observi totalul și obiceiurile", "Ca să nu mai cheltuiești niciodată", "Ca să crească automat venitul"], 0, "Notarea oferă informație pentru ajustarea bugetului, fără să transforme fiecare cumpărătură într-o vină."],
 ["Două produse identice costă 8 lei/500 g și 15 lei/kg. Care costă mai puțin pe kg?", ["Pachetul de 500 g", "Pachetul de 1 kg", "Au același preț pe kg"], 1, "8 lei pentru 500 g înseamnă 16 lei/kg, față de 15 lei/kg."],
 ["Ce înseamnă economisirea automată?", ["Un transfer planificat spre economii", "Dobândă garantată", "Cheltuieli nelimitate"], 0, "Transferul automat pune în practică un plan; nu promite un câștig financiar."],
 ["Când dobânda este compusă, la ce se aplică în perioada următoare?", ["Doar la suma inițială", "La suma inițială plus dobânda păstrată", "Doar la ultima dobândă"], 1, "Dobânda păstrată intră în baza de calcul, dacă mecanismul și condițiile permit acest lucru."],
 ["Ai 300 lei pentru 3 săptămâni. O împărțire egală înseamnă?", ["90 lei/săptămână", "100 lei/săptămână", "150 lei/săptămână"], 1, "300 ÷ 3 = 100 lei. Este un reper de planificare, nu o obligație de cheltuire."],
 ["Ce informație nu se comunică într-un apel neașteptat?", ["Codul PIN", "Numele magazinului preferat", "Ora la care se închide agenția"], 0, "PIN-ul protejează accesul la bani și nu trebuie dat unui apelant."],
 ["Un trial gratuit cere cardul. Ce verifici?", ["Data și prețul reînnoirii", "Doar culoarea aplicației", "Numărul reclamelor"], 0, "Un trial poate deveni abonament plătit. Verifică termenii și cum poți anula."],
 ["Venitul rămâne la fel, iar multe prețuri cresc. Ce se poate întâmpla?", ["Banii cumpără mai puține lucruri", "Banii cumpără automat mai mult", "Bugetul nu poate fi afectat"], 0, "Creșterea generală a prețurilor reduce puterea de cumpărare a aceleiași sume."],
 ["Ai un obiectiv de 600 lei și pui 100 lei lunar. Câte luni, fără dobândă?", ["4", "6", "8"], 1, "600 ÷ 100 = 6 luni, în exemplul fără dobândă sau costuri."],
 ["Care este un cost variabil într-un buget obișnuit?", ["Ieșirile cu prietenii", "O chirie fixă contractuală", "O rată fixă contractuală"], 0, "Ieșirile pot varia ca frecvență și sumă; obligațiile fixe se planifică separat."],
 ["O reducere te face să cumperi ceva inutil. Ai economisit sigur?", ["Da, orice reducere este economie", "Nu, ai făcut o cheltuială neplanificată", "Da, dacă oferta expiră azi"], 1, "Un preț mai mic nu transformă o cumpărătură inutilă în economie pentru buget."],
 ["Ce compari între două oferte de credit?", ["Costul total și condițiile", "Doar rata din prima lună", "Doar rapiditatea aprobării"], 0, "Rata lunară singură nu descrie toate costurile și obligațiile."],
 ["După folosirea fondului de urgență, ce poate ajuta?", ["Un plan gradual de refacere", "Să consideri restul bani în plus", "Să ignori fondul de acum înainte"], 0, "Fondul își recapătă rolul de protecție dacă este refăcut treptat, în limitele bugetului."],
 ["Un venit de 2.000 lei și cheltuieli de 1.700 lei lasă?", ["200 lei", "300 lei", "400 lei"], 1, "2.000 − 1.700 = 300 lei, înainte de alte cheltuieli neincluse."],
 ["O aplicație promite câștiguri sigure mari. Ce abordare ajută?", ["Verifici riscurile, costurile și sursa", "Crezi promisiunea dacă are logo", "Presupui că popularitatea elimină riscul"], 0, "Promisiunile nu înlocuiesc verificarea. Randamentele investițiilor nu sunt garantate de un mesaj publicitar."],
];
export const dailyChallenges = validateDailyChallenges([...originalChallenges, ...extra.map(([question, labels, correct, explanation], i) => ({ id: `daily-${String(i + 11).padStart(3, "0")}`, question, options: labels.map((label, j) => ({ id: `option-${j + 1}`, label })), correctOptionId: `option-${correct + 1}`, explanation }))]);
