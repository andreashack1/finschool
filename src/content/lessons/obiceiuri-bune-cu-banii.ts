import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "obiceiuri-bune-cu-banii",
  "title": "Obiceiuri bune cu banii",
  "categoryId": "de-ce-cheltuim-cum-cheltuim",
  "chapterId": "obiceiuri",
  "slug": "obiceiuri-bune-cu-banii",
  "description": "Lia încearcă o verificare de zece minute în fiecare duminică.",
  "objective": "Să poți explica obiceiuri bune cu banii și să alegi o acțiune justificată în situația prezentată.",
  "quizFocus": [
    "recognition",
    "comparison",
    "decision",
    "scenario"
  ],
  "minutes": 5,
  "xp": 30,
  "status": "ready",
  "contentVersion": 2,
  "formatVersion": 2,
  "sourceUrls": [],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Obiceiuri bune cu banii",
      "body": "Lia încearcă o verificare de zece minute în fiecare duminică."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un obicei este mai ușor de repetat când are un declanșator clar, un pas mic și o verificare. Poate însemna notarea unei plăți după cumpărare sau revizuirea bugetului săptămânal. Alege o acțiune care încape în program. Un sistem util trebuie să îți arate realitatea, nu doar să producă un tabel frumos.",
        "Un obicei de cheltuire nu definește valoarea unei persoane. Observă contextul, informația disponibilă și alternativa pe care o ai. O pauză scurtă și o întrebare concretă pot face alegerea mai ușor de evaluat. Nu trebuie să elimini orice plăcere pentru a construi un plan de bani util."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce ajută un obicei repetabil?",
      "explanation": "Un declanșator clar și un pas mic.",
      "correctFeedback": "Corect. Un declanșator clar și un pas mic.",
      "incorrectFeedback": "Nu chiar. Un declanșator clar și un pas mic.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Un declanșator clar și un pas mic."
        },
        {
          "id": "1",
          "label": "O promisiune imposibilă."
        },
        {
          "id": "2",
          "label": "Numai un tabel complicat."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un obicei este mai ușor de repetat când are un declanșator clar, un pas mic și o verificare.",
      "explanation": "Un obicei este mai ușor de repetat când are un declanșator clar, un pas mic și o verificare. Poate însemna notarea unei plăți după cumpărare sau revizuirea bugetului săptămânal. Alege o acțiune care încape în program. Un sistem util trebuie să îți arate realitatea, nu doar să producă un tabel frumos.",
      "correctFeedback": "Corect. Un obicei este mai ușor de repetat când are un declanșator clar, un pas mic și o verificare. Poate însemna notarea unei plăți după cumpărare sau revizuirea bugetului săptămânal. Alege o acțiune care încape în program. Un sistem util trebuie să îți arate realitatea, nu doar să producă un tabel frumos.",
      "incorrectFeedback": "Nu chiar. Un obicei este mai ușor de repetat când are un declanșator clar, un pas mic și o verificare. Poate însemna notarea unei plăți după cumpărare sau revizuirea bugetului săptămânal. Alege o acțiune care încape în program. Un sistem util trebuie să îți arate realitatea, nu doar să producă un tabel frumos.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Lia stabilește ca duminică să verifice zece minute plățile săptămânii. Notează ce lipsește și actualizează disponibilul. După două săptămâni observă că ora aleasă nu funcționează, așa că schimbă momentul. Nu abandonează complet sistemul pentru o sesiune ratată și nu inventează cheltuieli ca să pară că evidența este perfectă.",
        "Exemplul arată o situație posibilă, nu o reacție obligatorie pentru fiecare om. Folosește cifrele pentru verificarea alegerii și separă ce este confirmat de ce presupui. Poți modifica suma, termenul ori alternativa. Un plan realist arată ce mai rămâne disponibil după decizie, nu doar ce ai cumpărat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ce verifică Lia în cele zece minute?",
      "explanation": "Plățile și disponibilul actualizat.",
      "correctFeedback": "Corect. Plățile și disponibilul actualizat.",
      "incorrectFeedback": "Nu chiar. Plățile și disponibilul actualizat.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Doar culoarea aplicației."
        },
        {
          "id": "1",
          "label": "Plățile și disponibilul actualizat."
        },
        {
          "id": "2",
          "label": "Soldul tuturor prietenilor."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Momentul ales nu funcționează. Ce adaptezi?",
      "explanation": "Ora sau procesul pentru a-l putea repeta.",
      "correctFeedback": "Corect. Ora sau procesul pentru a-l putea repeta.",
      "incorrectFeedback": "Nu chiar. Ora sau procesul pentru a-l putea repeta.",
      "type": "scenariu",
      "context": "Lia stabilește ca duminică să verifice zece minute plățile săptămânii. Notează ce lipsește și actualizează disponibilul. După două săptămâni observă că ora aleasă nu funcționează, așa că schimbă momentul. Nu abandonează complet sistemul pentru o sesiune ratată și nu inventează cheltuieli ca să pară că evidența este perfectă.",
      "options": [
        {
          "id": "0",
          "label": "Ștergi toate datele."
        },
        {
          "id": "1",
          "label": "Declari că planul e inutil."
        },
        {
          "id": "2",
          "label": "Ora sau procesul pentru a-l putea repeta."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-obiceiuri-bune-cu-banii",
      "paragraphs": [
        "Lia încearcă o verificare de zece minute în fiecare duminică. Prima dată găsește două plăți mici omise. A doua săptămână nu ajunge la ora stabilită și mută revizuirea într-un moment potrivit. Păstrează pasul simplu și actualizează bugetul după datele reale. Înainte de a automatiza economisirea, verifică și ce bani trebuie să rămână pentru scadențe.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Lia stabilește ca duminică să verifice zece minute plățile săptămânii. Notează ce lipsește și actualizează disponibilul. După două săptămâni observă că ora aleasă nu funcționează, așa că schimbă momentul. Nu abandonează complet sistemul pentru o sesiune ratată și nu inventează cheltuieli ca să pară că evidența este perfectă. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce omisiuni găsește Lia prima dată?",
      "explanation": "Două plăți mici.",
      "correctFeedback": "Corect. Două plăți mici.",
      "incorrectFeedback": "Nu chiar. Două plăți mici.",
      "caseId": "caz-obiceiuri-bune-cu-banii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Două plăți mici."
        },
        {
          "id": "1",
          "label": "Două salarii noi."
        },
        {
          "id": "2",
          "label": "O datorie deja ștearsă automat."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce face după sesiunea ratată?",
      "explanation": "Mută verificarea la un moment potrivit.",
      "correctFeedback": "Corect. Mută verificarea la un moment potrivit.",
      "incorrectFeedback": "Nu chiar. Mută verificarea la un moment potrivit.",
      "caseId": "caz-obiceiuri-bune-cu-banii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Abandonează orice evidență."
        },
        {
          "id": "1",
          "label": "Mută verificarea la un moment potrivit."
        },
        {
          "id": "2",
          "label": "Completează cu cifre inventate."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce verifică înainte de automatizarea economisirii?",
      "explanation": "Banii necesari scadențelor.",
      "correctFeedback": "Corect. Banii necesari scadențelor.",
      "incorrectFeedback": "Nu chiar. Banii necesari scadențelor.",
      "caseId": "caz-obiceiuri-bune-cu-banii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar suma maximă imaginată."
        },
        {
          "id": "1",
          "label": "Doar un procent de pe internet."
        },
        {
          "id": "2",
          "label": "Banii necesari scadențelor."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Automatizarea poate ajuta, dar trebuie adaptată la venitul și scadențele reale. Un transfer de economisire prea mare poate lăsa obligații neacoperite. Verifică rezultatul și simplifică ce nu funcționează. Nu măsura progresul numai prin faptul că ai bifat o acțiune: contează dacă informația te ajută să alegi și să corectezi planul.",
        "Dacă ai făcut deja o alegere pe care o regreți, notează ce a declanșat-o și adaptează pasul următor. Rușinea nu completează bugetul. Caută un proces simplu pe care îl poți repeta și verifică efectul în timp. Dacă o problemă persistă și îți afectează viața, cere sprijin potrivit situației."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ai bifat revizuirea, dar datele sunt incomplete. Ce contează?",
      "explanation": "Corectarea informației care susține decizia.",
      "correctFeedback": "Corect. Corectarea informației care susține decizia.",
      "incorrectFeedback": "Nu chiar. Corectarea informației care susține decizia.",
      "type": "scenariu",
      "context": "Lia stabilește ca duminică să verifice zece minute plățile săptămânii. Notează ce lipsește și actualizează disponibilul. După două săptămâni observă că ora aleasă nu funcționează, așa că schimbă momentul. Nu abandonează complet sistemul pentru o sesiune ratată și nu inventează cheltuieli ca să pară că evidența este perfectă.",
      "options": [
        {
          "id": "0",
          "label": "Corectarea informației care susține decizia."
        },
        {
          "id": "1",
          "label": "Doar bifa."
        },
        {
          "id": "2",
          "label": "Numărul de culori din tabel."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Sistemul este prea complicat. Ce pas ajută?",
      "explanation": "Îl simplifici și urmărești rezultatul.",
      "correctFeedback": "Corect. Îl simplifici și urmărești rezultatul.",
      "incorrectFeedback": "Nu chiar. Îl simplifici și urmărești rezultatul.",
      "type": "scenariu",
      "context": "Lia stabilește ca duminică să verifice zece minute plățile săptămânii. Notează ce lipsește și actualizează disponibilul. După două săptămâni observă că ora aleasă nu funcționează, așa că schimbă momentul. Nu abandonează complet sistemul pentru o sesiune ratată și nu inventează cheltuieli ca să pară că evidența este perfectă.",
      "options": [
        {
          "id": "0",
          "label": "Adaugi reguli fără rost."
        },
        {
          "id": "1",
          "label": "Îl simplifici și urmărești rezultatul."
        },
        {
          "id": "2",
          "label": "Renunți la orice verificare."
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
          "title": "Ideea de bază",
          "body": "Un obicei este mai ușor de repetat când are un declanșator clar, un pas mic și o verificare.",
          "detail": "Un obicei este mai ușor de repetat când are un declanșator clar, un pas mic și o verificare.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Lia stabilește ca duminică să verifice zece minute plățile săptămânii. Notează ce lipsește și actualizează disponibilul.",
          "detail": "Lia stabilește ca duminică să verifice zece minute plățile săptămânii. Notează ce lipsește și actualizează disponibilul.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Automatizarea poate ajuta, dar trebuie adaptată la venitul și scadențele reale.",
          "detail": "Automatizarea poate ajuta, dar trebuie adaptată la venitul și scadențele reale.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Alege un pas de cinci minute și un moment concret pentru o verificare săptămânală.",
          "detail": "Alege un pas de cinci minute și un moment concret pentru o verificare săptămânală.",
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
