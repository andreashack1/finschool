import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cardul-de-debit",
  "title": "Cardul de debit",
  "categoryId": "carduri-si-banca",
  "chapterId": "cardul",
  "slug": "cardul-de-debit",
  "description": "Teo are 300 lei în cont, retrage 100 lei și apoi plătește 80 lei cu cardul. Cât a cheltuit și unde sunt restul banilor?",
  "objective": "Să poți explica legătura dintre cardul de debit și banii din cont și să diferențiezi plata de retragere.",
  "quizFocus": [
    "recognition",
    "comparison",
    "decision",
    "scenario"
  ],
  "minutes": 5,
  "xp": 30,
  "status": "ready",
  "contentVersion": 3,
  "formatVersion": 2,
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Cardul de debit",
      "body": "Teo are 300 lei în cont, retrage 100 lei și apoi plătește 80 lei cu cardul. Cât a cheltuit și unde sunt restul banilor?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Cardul de debit îți permite, în mod obișnuit, să folosești banii disponibili în contul legat de el. O facilitate de descoperit de cont, dacă există, este un împrumut separat cu propriile condiții. Nu presupune că un card de debit oferă automat un credit pentru orice cumpărătură.",
        "O plată trimite bani pentru un produs sau serviciu. O retragere mută bani din cont în numerar. Dacă retragi 100 lei și încă îi ai în portofel, nu ai consumat acea sumă doar prin mutare. Pot exista comisioane, care sunt costuri separate de numerarul primit."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce folosești de regulă cu un card de debit?",
      "explanation": "Descoperitul de cont este o facilitate separată.",
      "correctFeedback": "Corect. Descoperitul de cont este o facilitate separată.",
      "incorrectFeedback": "Nu chiar. Descoperitul de cont este o facilitate separată.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Banii disponibili în contul legat de card."
        },
        {
          "id": "1",
          "label": "Un salariu viitor automat."
        },
        {
          "id": "2",
          "label": "Un credit gratuit nelimitat."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Retragerea banilor și păstrarea lor în portofel este automat o cheltuială de consum.",
      "explanation": "Retragerea mută banii; costul eventual este separat.",
      "correctFeedback": "Corect. Retragerea mută banii; costul eventual este separat.",
      "incorrectFeedback": "Nu chiar. Retragerea mută banii; costul eventual este separat.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu fără alte tranzacții și fără comisioane, începi cu 300 lei în cont, retragi 100 și plătești 80 cu cardul. Rămân 120 lei în cont și 100 lei în numerar. Resursele totale rămase sunt 220 lei, iar cumpărătura a costat 80 lei.",
        "Nu număra o retragere și cumpărăturile făcute ulterior cu acel numerar ca două cheltuieli identice. Marchează transferul către portofel, apoi cheltuiala reală. Soldul din aplicație descrie contul, nu neapărat toți banii pe care îi deții. Evidența numerarului completează imaginea."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Din 300 retragi 100 și plătești 80. Ce sold rămâne în cont?",
      "explanation": "300 − 100 − 80 = 120 în cont.",
      "correctFeedback": "Corect. 300 − 100 − 80 = 120 în cont.",
      "incorrectFeedback": "Nu chiar. 300 − 100 − 80 = 120 în cont.",
      "type": "scenariu",
      "context": "Nu există alte tranzacții sau comisioane.",
      "options": [
        {
          "id": "0",
          "label": "220 lei."
        },
        {
          "id": "1",
          "label": "120 lei."
        },
        {
          "id": "2",
          "label": "300 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Cum înregistrezi cumpărătura din numerarul retras?",
      "explanation": "Transferul și consumul au roluri diferite.",
      "correctFeedback": "Corect. Transferul și consumul au roluri diferite.",
      "incorrectFeedback": "Nu chiar. Transferul și consumul au roluri diferite.",
      "type": "scenariu",
      "context": "Ai plătit 30 lei din portofel.",
      "options": [
        {
          "id": "0",
          "label": "Ca a doua retragere din cont."
        },
        {
          "id": "1",
          "label": "Ca venit nou."
        },
        {
          "id": "2",
          "label": "Ca cheltuială, fără să dublezi retragerea."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cardul-de-debit",
      "paragraphs": [
        "Teo primește 300 lei pentru o săptămână. În acest exemplu nu are descoperit de cont și nu există comisioane. Retrage 100 lei pentru un târg unde se plătește în numerar, apoi cumpără un accesoriu de 80 lei cu cardul. Aplicația îi arată 120 lei, iar cei 100 lei retrași sunt încă în portofel.",
        "Un coleg spune că Teo a cheltuit deja 180 lei fiindcă retragerea apare în extras. Teo separă mutarea banilor de cumpărare: are 220 lei în total, dintre care 120 în cont și 100 în numerar. Dacă folosește ulterior 30 lei la târg, înregistrează acea cheltuială și scade numerarul. Înainte de o nouă plată, verifică suma disponibilă în cont, nu totalul din ambele locuri. Cardul nu poate folosi automat bancnotele din portofel și nu oferă un împrumut implicit."
      ]
    },
    {
      "id": "q5",
      "question": "Câți bani are Teo în total înainte de târg?",
      "explanation": "120 în cont plus 100 în portofel.",
      "correctFeedback": "Corect. 120 în cont plus 100 în portofel.",
      "incorrectFeedback": "Nu chiar. 120 în cont plus 100 în portofel.",
      "caseId": "caz-cardul-de-debit",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "220 lei."
        },
        {
          "id": "1",
          "label": "120 lei."
        },
        {
          "id": "2",
          "label": "180 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce a confundat colegul?",
      "explanation": "Extrasul include și operațiuni care mută bani.",
      "correctFeedback": "Corect. Extrasul include și operațiuni care mută bani.",
      "incorrectFeedback": "Nu chiar. Extrasul include și operațiuni care mută bani.",
      "caseId": "caz-cardul-de-debit",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Soldul contului cu suma cheltuită efectiv."
        },
        {
          "id": "1",
          "label": "Mutarea banilor cu consumarea lor."
        },
        {
          "id": "2",
          "label": "Suma numerarului disponibil cu soldul disponibil pe card."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Teo are 120 lei în cont și 100 lei în numerar. Poate plăti cu cardul de debit o cumpărătură de 150 lei, fără descoperit de cont?",
      "explanation": "Bancnotele din portofel nu sunt disponibile automat pe card. Cei 120 lei din cont nu acoperă plata de 150 lei.",
      "correctFeedback": "Corect. Bancnotele din portofel nu sunt disponibile automat pe card. Cei 120 lei din cont nu acoperă plata de 150 lei.",
      "incorrectFeedback": "Nu chiar. Bancnotele din portofel nu sunt disponibile automat pe card. Cei 120 lei din cont nu acoperă plata de 150 lei.",
      "caseId": "caz-cardul-de-debit",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Da, fiindcă resursele sale totale sunt 220 lei."
        },
        {
          "id": "1",
          "label": "Da, retragerea anterioară îi mărește automat disponibilul pe card."
        },
        {
          "id": "2",
          "label": "Nu; plata depinde de disponibilul contului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O autorizare sau o sumă rezervată poate apărea diferit de o tranzacție finalizată. Verifică starea afișată și explicațiile băncii înainte să deduci că orice rând este o plată definitivă. Nu încerca plăți repetate fără să verifici rezultatul unei operațiuni neclare.",
        "Protejează accesul la cont și card. La o pierdere sau tranzacție necunoscută, folosește canalul oficial pentru verificare și blocare, potrivit situației. Cardul este un instrument de acces la bani, nu o dovadă că banii sunt nelimitați. Compară suma disponibilă și obligațiile apropiate înainte de confirmarea unei cumpărături."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O operațiune apare ca rezervată. Ce verifici?",
      "explanation": "Autorizarea și finalizarea pot avea stări diferite.",
      "correctFeedback": "Corect. Autorizarea și finalizarea pot avea stări diferite.",
      "incorrectFeedback": "Nu chiar. Autorizarea și finalizarea pot avea stări diferite.",
      "type": "scenariu",
      "context": "Plata nu are un rezultat clar.",
      "options": [
        {
          "id": "0",
          "label": "Starea și explicația băncii înainte să repeți plata."
        },
        {
          "id": "1",
          "label": "Presupui că banii sunt sigur pierduți."
        },
        {
          "id": "2",
          "label": "Confirmi aceeași cumpărătură de multe ori."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ai pierdut cardul. Care este un pas util?",
      "explanation": "Protejarea accesului limitează riscul.",
      "correctFeedback": "Corect. Protejarea accesului limitează riscul.",
      "incorrectFeedback": "Nu chiar. Protejarea accesului limitează riscul.",
      "type": "scenariu",
      "context": "Cardul nu mai este la tine.",
      "options": [
        {
          "id": "0",
          "label": "Trimiți PIN-ul unei persoane necunoscute."
        },
        {
          "id": "1",
          "label": "Folosești canalul oficial pentru blocare și verificare."
        },
        {
          "id": "2",
          "label": "Aștepți fără să urmărești tranzacțiile."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "tine-minte",
      "type": "tine_minte",
      "title": "Ține minte",
      "items": [
        {
          "id": "idee-0",
          "title": "Debit",
          "body": "Folosești disponibilul contului, cu facilități distincte.",
          "detail": "Teo are 120 lei în cont și 100 lei în portofel, dar cardul nu folosește automat bancnotele. Retragerea schimbă locul banilor; cumpărăturile și eventualele comisioane sunt costuri distincte.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Retragere",
          "body": "Numerarul primit nu este automat consumat.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Evidență",
          "body": "Separă banii din cont de cei din portofel.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "La o retragere din istoricul tău, distinge suma mutată de eventualul comision și de cumpărăturile ulterioare.",
          "type": "action"
        }
      ]
    },
    {
      "id": "final",
      "type": "final",
      "title": "Ai prins ideea."
    }
  ]
};
