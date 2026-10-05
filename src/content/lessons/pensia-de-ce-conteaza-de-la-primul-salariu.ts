import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "pensia-de-ce-conteaza-de-la-primul-salariu",
  "title": "Pensia: de ce contează de la primul salariu",
  "categoryId": "primul-job",
  "chapterId": "taxele",
  "slug": "pensia-de-ce-conteaza-de-la-primul-salariu",
  "description": "Andrei începe primul job și vede contribuția pe fluturaș.",
  "objective": "Să poți explica pensia: de ce contează de la primul salariu și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [
  {
    "label": "Inspecția Muncii · Codul muncii",
    "url": "https://inprobe.inspectiamuncii.ro/informatii-utile/codul-muncii/"
  },
  {
    "label": "ANAF · Codul fiscal",
    "url": "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Pensia: de ce contează de la primul salariu",
      "body": "Andrei începe primul job și vede contribuția pe fluturaș."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Pensia privește venitul la o etapă viitoare, iar contribuțiile și istoricul muncii pot influența drepturile. În România există sistemul public și forme de pensii private cu reguli proprii. Nu confunda o contribuție cu un sold bancar pe care îl poți retrage oricând. Documentele oficiale și administratorul explică evidența, condițiile și accesul aplicabil.",
        "La primul job, separă promisiunea verbală de informația scrisă. Păstrează documentele primite și cere explicații despre termenii pe care nu îi înțelegi. O discuție clară înainte de începere ajută atât planul de bani, cât și organizarea timpului. Nu transmite public documente care conțin date personale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "De ce contează istoricul muncii?",
      "explanation": "Poate influența drepturile de pensie.",
      "correctFeedback": "Corect. Poate influența drepturile de pensie.",
      "incorrectFeedback": "Nu chiar. Poate influența drepturile de pensie.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Poate influența drepturile de pensie."
        },
        {
          "id": "1",
          "label": "Înlocuiește orice contract."
        },
        {
          "id": "2",
          "label": "Garantează aceeași pensie tuturor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Pensia privește venitul la o etapă viitoare, iar contribuțiile și istoricul muncii pot influența drepturile.",
      "explanation": "Pensia privește venitul la o etapă viitoare, iar contribuțiile și istoricul muncii pot influența drepturile. În România există sistemul public și forme de pensii private cu reguli proprii. Nu confunda o contribuție cu un sold bancar pe care îl poți retrage oricând. Documentele oficiale și administratorul explică evidența, condițiile și accesul aplicabil.",
      "correctFeedback": "Corect. Pensia privește venitul la o etapă viitoare, iar contribuțiile și istoricul muncii pot influența drepturile. În România există sistemul public și forme de pensii private cu reguli proprii. Nu confunda o contribuție cu un sold bancar pe care îl poți retrage oricând. Documentele oficiale și administratorul explică evidența, condițiile și accesul aplicabil.",
      "incorrectFeedback": "Nu chiar. Pensia privește venitul la o etapă viitoare, iar contribuțiile și istoricul muncii pot influența drepturile. În România există sistemul public și forme de pensii private cu reguli proprii. Nu confunda o contribuție cu un sold bancar pe care îl poți retrage oricând. Documentele oficiale și administratorul explică evidența, condițiile și accesul aplicabil.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Andrei păstrează primul contract și verifică în evidențele oficiale că perioadele de muncă sunt înregistrate. Dacă participă la un fond de pensii private, identifică administratorul și citește informarea de cont. Nu își estimează pensia viitoare doar înmulțind prima contribuție cu numărul de luni, deoarece regulile și evoluția veniturilor contează.",
        "Într-o comparație de oferte, folosește aceeași perioadă și aceeași normă de lucru. Notează ce este confirmat și ce este doar estimare. Cifrele din lecție sunt exerciții, nu salarii impuse de lege. Pentru situația reală, verifică documentele angajatorului și regulile aplicabile la data respectivă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ce verifică Andrei în evidențe?",
      "explanation": "Perioadele și contribuțiile înregistrate.",
      "correctFeedback": "Corect. Perioadele și contribuțiile înregistrate.",
      "incorrectFeedback": "Nu chiar. Perioadele și contribuțiile înregistrate.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Doar numărul de reclame."
        },
        {
          "id": "1",
          "label": "Perioadele și contribuțiile înregistrate."
        },
        {
          "id": "2",
          "label": "Soldul bancar al colegului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un mesaj promite retragere instant contra unei taxe. Ce faci?",
      "explanation": "Verifici instituția prin canale oficiale înainte de date sau plată.",
      "correctFeedback": "Corect. Verifici instituția prin canale oficiale înainte de date sau plată.",
      "incorrectFeedback": "Nu chiar. Verifici instituția prin canale oficiale înainte de date sau plată.",
      "type": "scenariu",
      "context": "Andrei păstrează primul contract și verifică în evidențele oficiale că perioadele de muncă sunt înregistrate. Dacă participă la un fond de pensii private, identifică administratorul și citește informarea de cont. Nu își estimează pensia viitoare doar înmulțind prima contribuție cu numărul de luni, deoarece regulile și evoluția veniturilor contează.",
      "options": [
        {
          "id": "0",
          "label": "Plătești ca să rezervi oferta."
        },
        {
          "id": "1",
          "label": "Trimiți fotografia actului în mesaj."
        },
        {
          "id": "2",
          "label": "Verifici instituția prin canale oficiale înainte de date sau plată."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-pensia-de-ce-conteaza-de-la-primul-salariu",
      "paragraphs": [
        "Andrei începe primul job și vede contribuția pe fluturaș. Un mesaj îi promite retragerea imediată a tuturor banilor de pensie contra unei taxe. Nu trimite date. Verifică prin canalele oficiale ce contribuții și perioade sunt înregistrate și, dacă are un cont de pensie privată, cine este administratorul. Păstrează documentele fără să considere contribuția o sumă liberă în contul curent.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Andrei păstrează primul contract și verifică în evidențele oficiale că perioadele de muncă sunt înregistrate. Dacă participă la un fond de pensii private, identifică administratorul și citește informarea de cont. Nu își estimează pensia viitoare doar înmulțind prima contribuție cu numărul de luni, deoarece regulile și evoluția veniturilor contează. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce semnal ridică mesajul primit de Andrei?",
      "explanation": "Promisiunea de acces imediat contra taxei.",
      "correctFeedback": "Corect. Promisiunea de acces imediat contra taxei.",
      "incorrectFeedback": "Nu chiar. Promisiunea de acces imediat contra taxei.",
      "caseId": "caz-pensia-de-ce-conteaza-de-la-primul-salariu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Promisiunea de acces imediat contra taxei."
        },
        {
          "id": "1",
          "label": "Existența unei contribuții."
        },
        {
          "id": "2",
          "label": "Faptul că are primul job."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce identifică pentru un cont de pensie privată?",
      "explanation": "Administratorul și informarea oficială.",
      "correctFeedback": "Corect. Administratorul și informarea oficială.",
      "incorrectFeedback": "Nu chiar. Administratorul și informarea oficială.",
      "caseId": "caz-pensia-de-ce-conteaza-de-la-primul-salariu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Codul PIN al cardului."
        },
        {
          "id": "1",
          "label": "Administratorul și informarea oficială."
        },
        {
          "id": "2",
          "label": "Parola unui coleg."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "De ce păstrează documentele?",
      "explanation": "Pentru verificarea eventualelor neconcordanțe.",
      "correctFeedback": "Corect. Pentru verificarea eventualelor neconcordanțe.",
      "incorrectFeedback": "Nu chiar. Pentru verificarea eventualelor neconcordanțe.",
      "caseId": "caz-pensia-de-ce-conteaza-de-la-primul-salariu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Pentru a garanta un randament."
        },
        {
          "id": "1",
          "label": "Pentru a opri timpul."
        },
        {
          "id": "2",
          "label": "Pentru verificarea eventualelor neconcordanțe."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu există în lecție o promisiune de pensie sau randament. Sumele, condițiile de eligibilitate și accesul depind de sistem și de regulile aplicabile. Evită să transmiți datele personale unei persoane care promite recuperarea instant a contribuțiilor. Verifică instituția prin canale oficiale și cere corectarea eventualelor neconcordanțe din istoricul tău.",
        "Dacă observi o diferență, formulează o întrebare concretă și păstrează răspunsul. Nu completa singur informația lipsă cu o presupunere favorabilă. Pentru o problemă contractuală sau fiscală, folosește sursa oficială relevantă și ajutor calificat. Un exemplu de învățare nu poate acoperi toate situațiile de muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Poți calcula pensia doar din prima contribuție?",
      "explanation": "Nu; contează istoricul și regulile sistemului.",
      "correctFeedback": "Corect. Nu; contează istoricul și regulile sistemului.",
      "incorrectFeedback": "Nu chiar. Nu; contează istoricul și regulile sistemului.",
      "type": "scenariu",
      "context": "Andrei păstrează primul contract și verifică în evidențele oficiale că perioadele de muncă sunt înregistrate. Dacă participă la un fond de pensii private, identifică administratorul și citește informarea de cont. Nu își estimează pensia viitoare doar înmulțind prima contribuție cu numărul de luni, deoarece regulile și evoluția veniturilor contează.",
      "options": [
        {
          "id": "0",
          "label": "Nu; contează istoricul și regulile sistemului."
        },
        {
          "id": "1",
          "label": "Da, rezultatul este fix pentru totdeauna."
        },
        {
          "id": "2",
          "label": "Da, fără să conteze veniturile viitoare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Datele din istoric nu corespund documentelor. Ce faci?",
      "explanation": "Ceri verificarea și corectarea prin instituția relevantă.",
      "correctFeedback": "Corect. Ceri verificarea și corectarea prin instituția relevantă.",
      "incorrectFeedback": "Nu chiar. Ceri verificarea și corectarea prin instituția relevantă.",
      "type": "scenariu",
      "context": "Andrei păstrează primul contract și verifică în evidențele oficiale că perioadele de muncă sunt înregistrate. Dacă participă la un fond de pensii private, identifică administratorul și citește informarea de cont. Nu își estimează pensia viitoare doar înmulțind prima contribuție cu numărul de luni, deoarece regulile și evoluția veniturilor contează.",
      "options": [
        {
          "id": "0",
          "label": "Ignori diferența definitiv."
        },
        {
          "id": "1",
          "label": "Ceri verificarea și corectarea prin instituția relevantă."
        },
        {
          "id": "2",
          "label": "Publici toate actele pe rețele sociale."
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
          "body": "Pensia privește venitul la o etapă viitoare, iar contribuțiile și istoricul muncii pot influența drepturile.",
          "detail": "Pensia privește venitul la o etapă viitoare, iar contribuțiile și istoricul muncii pot influența drepturile.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Andrei păstrează primul contract și verifică în evidențele oficiale că perioadele de muncă sunt înregistrate. Dacă participă la un fond de pensii private, identifică administratorul și citește informarea de cont.",
          "detail": "Andrei păstrează primul contract și verifică în evidențele oficiale că perioadele de muncă sunt înregistrate. Dacă participă la un fond de pensii private, identifică administratorul și citește informarea de cont.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Nu există în lecție o promisiune de pensie sau randament.",
          "detail": "Nu există în lecție o promisiune de pensie sau randament.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Identifică instituția sau administratorul unde se poate verifica oficial istoricul contribuțiilor.",
          "detail": "Identifică instituția sau administratorul unde se poate verifica oficial istoricul contribuțiilor.",
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
