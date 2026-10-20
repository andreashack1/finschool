import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cum-iesi-din-datorii",
  "title": "Cum ieși din datorii",
  "categoryId": "credite-si-datorii",
  "chapterId": "datorii-si-scor",
  "slug": "cum-iesi-din-datorii",
  "description": "Paul notează două datorii, datele plăților și costurile lor.",
  "objective": "Să poți explica cum ieși din datorii și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [
  {
    "label": "ANPC · Informații standard pentru credit",
    "url": "https://www.anpc.ro/anpcftp/legislatie/100609/anexa2_inf_standard_credit_consumatori.pdf"
  },
  {
    "label": "ANPC · Protecția privind costul creditării IFN",
    "url": "https://anpc.ro/o-noua-lege-reglementeaza-dobanzile-creditelor-ifn-urilor/"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Cum ieși din datorii",
      "body": "Paul notează două datorii, datele plăților și costurile lor."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Începe cu o listă completă: creditor, sold, dobândă sau cost relevant, plată minimă și scadență. Separă obligațiile urgente de sumele pe care le poți plăti suplimentar. Un plan trebuie să protejeze și cheltuielile esențiale. Plata unei datorii nu justifică ignorarea altor obligații ori un buget care presupune venituri încă inexistente.",
        "Înainte de o decizie, pune informațiile esențiale pe aceeași pagină: suma primită, calendarul plăților și costurile cerute. Citește documentele oferite înainte de semnare. O reclamă poate scoate în față numai un avantaj, în timp ce obligațiile tale sunt descrise în contract și în informațiile precontractuale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce trebuie să conțină inventarul datoriilor?",
      "explanation": "Sold, cost, plată cerută și scadență.",
      "correctFeedback": "Corect. Sold, cost, plată cerută și scadență.",
      "incorrectFeedback": "Nu chiar. Sold, cost, plată cerută și scadență.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Sold, cost, plată cerută și scadență."
        },
        {
          "id": "1",
          "label": "Doar numele creditorilor."
        },
        {
          "id": "2",
          "label": "Doar numărul cardurilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O refinanțare cu rată mai mică reduce obligatoriu costul total.",
      "explanation": "Refinanțarea poate schimba rata și durata, dar nu este automat economie. Compară totalul nou cu obligațiile înlocuite și costurile operațiunii. Dacă planul nu încape în venit, cere sprijin și discută opțiunile cu creditorii. Nu plăti un intermediar neverificat pentru promisiunea unei ștergeri garantate și nu ascunde o datorie din propria evidență.",
      "correctFeedback": "Corect. Refinanțarea poate schimba rata și durata, dar nu este automat economie. Compară totalul nou cu obligațiile înlocuite și costurile operațiunii. Dacă planul nu încape în venit, cere sprijin și discută opțiunile cu creditorii. Nu plăti un intermediar neverificat pentru promisiunea unei ștergeri garantate și nu ascunde o datorie din propria evidență.",
      "incorrectFeedback": "Nu chiar. Refinanțarea poate schimba rata și durata, dar nu este automat economie. Compară totalul nou cu obligațiile înlocuite și costurile operațiunii. Dacă planul nu încape în venit, cere sprijin și discută opțiunile cu creditorii. Nu plăti un intermediar neverificat pentru promisiunea unei ștergeri garantate și nu ascunde o datorie din propria evidență.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Paul are două datorii și 200 lei disponibili suplimentar după nevoi și plățile cerute. Poate prioritiza datoria cu costul mai mare pentru a reduce costurile, ori pe cea mică pentru progres vizibil, analizând diferența. Indiferent de ordine, păstrează plățile obligatorii pentru ambele și verifică eventualele condiții ale rambursării anticipate.",
        "Cifrele sunt ipotetice și servesc comparației din exercițiu. Nu descriu oferta unei instituții. Un buget trebuie să includă și celelalte plăți necesare, nu numai creditul analizat. Compară aceeași sumă și aceeași durată acolo unde este posibil, apoi notează diferențele care împiedică o comparație directă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ai 200 lei suplimentari după obligații. Cum alegi destinația?",
      "explanation": "Compari costurile și strategia, păstrând celelalte plăți.",
      "correctFeedback": "Corect. Compari costurile și strategia, păstrând celelalte plăți.",
      "incorrectFeedback": "Nu chiar. Compari costurile și strategia, păstrând celelalte plăți.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Oprești toate celelalte rate."
        },
        {
          "id": "1",
          "label": "Compari costurile și strategia, păstrând celelalte plăți."
        },
        {
          "id": "2",
          "label": "Cheltuiești suma fără evidență."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Refinanțarea reduce rata. Ce ceri pentru comparație?",
      "explanation": "Durata, totalul și costurile operațiunii.",
      "correctFeedback": "Corect. Durata, totalul și costurile operațiunii.",
      "incorrectFeedback": "Nu chiar. Durata, totalul și costurile operațiunii.",
      "type": "scenariu",
      "context": "Paul are două datorii și 200 lei disponibili suplimentar după nevoi și plățile cerute. Poate prioritiza datoria cu costul mai mare pentru a reduce costurile, ori pe cea mică pentru progres vizibil, analizând diferența. Indiferent de ordine, păstrează plățile obligatorii pentru ambele și verifică eventualele condiții ale rambursării anticipate.",
      "options": [
        {
          "id": "0",
          "label": "Doar rata primei luni."
        },
        {
          "id": "1",
          "label": "Doar o promisiune verbală."
        },
        {
          "id": "2",
          "label": "Durata, totalul și costurile operațiunii."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cum-iesi-din-datorii",
      "paragraphs": [
        "Paul notează două datorii, datele plăților și costurile lor. După cheltuielile esențiale și obligațiile lunare are 200 lei suplimentari. Se gândește să îi folosească integral pentru cea mică, dar compară și costul celeilalte. Primește o reclamă de refinanțare cu rată redusă și cere durata și totalul nou, în loc să decidă numai din plata lunară.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Paul are două datorii și 200 lei disponibili suplimentar după nevoi și plățile cerute. Poate prioritiza datoria cu costul mai mare pentru a reduce costurile, ori pe cea mică pentru progres vizibil, analizând diferența. Indiferent de ordine, păstrează plățile obligatorii pentru ambele și verifică eventualele condiții ale rambursării anticipate. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "De unde provin cei 200 lei ai lui Paul?",
      "explanation": "Din disponibilul după nevoi și plățile cerute.",
      "correctFeedback": "Corect. Din disponibilul după nevoi și plățile cerute.",
      "incorrectFeedback": "Nu chiar. Din disponibilul după nevoi și plățile cerute.",
      "caseId": "caz-cum-iesi-din-datorii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Din disponibilul după nevoi și plățile cerute."
        },
        {
          "id": "1",
          "label": "Dintr-un venit neconfirmat."
        },
        {
          "id": "2",
          "label": "Din ștergerea uneia dintre datorii."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce avantaj poate avea prioritatea costului mai mare?",
      "explanation": "Reducerea costurilor, în condiții comparabile.",
      "correctFeedback": "Corect. Reducerea costurilor, în condiții comparabile.",
      "incorrectFeedback": "Nu chiar. Reducerea costurilor, în condiții comparabile.",
      "caseId": "caz-cum-iesi-din-datorii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Rata lunară scade automat pentru toate datoriile."
        },
        {
          "id": "1",
          "label": "Reducerea costurilor, în condiții comparabile."
        },
        {
          "id": "2",
          "label": "Costul total devine neimportant când soldul începe să scadă."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce păstrează Paul indiferent de ordinea aleasă?",
      "explanation": "Plățile obligatorii pentru ambele datorii.",
      "correctFeedback": "Corect. Plățile obligatorii pentru ambele datorii.",
      "incorrectFeedback": "Nu chiar. Plățile obligatorii pentru ambele datorii.",
      "caseId": "caz-cum-iesi-din-datorii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar rata celei mici."
        },
        {
          "id": "1",
          "label": "Doar reclama de refinanțare."
        },
        {
          "id": "2",
          "label": "Plățile obligatorii pentru ambele datorii."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Refinanțarea poate schimba rata și durata, dar nu este automat economie. Compară totalul nou cu obligațiile înlocuite și costurile operațiunii. Dacă planul nu încape în venit, cere sprijin și discută opțiunile cu creditorii. Nu plăti un intermediar neverificat pentru promisiunea unei ștergeri garantate și nu ascunde o datorie din propria evidență.",
        "Dacă nu înțelegi o condiție, cere explicații înainte să te obligi. Păstrează contractul și comunicările relevante. Pentru dificultăți de plată, discută din timp cu creditorul și verifică opțiunile documentate. Nu trimite bani unei persoane care promite ștergerea sigură a datoriei fără să explice baza și procedura."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Planul depășește venitul disponibil. Ce faci?",
      "explanation": "Ceri sprijin și discuți opțiuni documentate.",
      "correctFeedback": "Corect. Ceri sprijin și discuți opțiuni documentate.",
      "incorrectFeedback": "Nu chiar. Ceri sprijin și discuți opțiuni documentate.",
      "type": "scenariu",
      "context": "Paul are două datorii și 200 lei disponibili suplimentar după nevoi și plățile cerute. Poate prioritiza datoria cu costul mai mare pentru a reduce costurile, ori pe cea mică pentru progres vizibil, analizând diferența. Indiferent de ordine, păstrează plățile obligatorii pentru ambele și verifică eventualele condiții ale rambursării anticipate.",
      "options": [
        {
          "id": "0",
          "label": "Ceri sprijin și discuți opțiuni documentate."
        },
        {
          "id": "1",
          "label": "Ascunzi o datorie din tabel."
        },
        {
          "id": "2",
          "label": "Adaugi un venit inventat."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un intermediar promite ștergere garantată contra taxă. Ce verifici?",
      "explanation": "Identitatea, procedura și baza promisiunii.",
      "correctFeedback": "Corect. Identitatea, procedura și baza promisiunii.",
      "incorrectFeedback": "Nu chiar. Identitatea, procedura și baza promisiunii.",
      "type": "scenariu",
      "context": "Paul are două datorii și 200 lei disponibili suplimentar după nevoi și plățile cerute. Poate prioritiza datoria cu costul mai mare pentru a reduce costurile, ori pe cea mică pentru progres vizibil, analizând diferența. Indiferent de ordine, păstrează plățile obligatorii pentru ambele și verifică eventualele condiții ale rambursării anticipate.",
      "options": [
        {
          "id": "0",
          "label": "Plătești imediat."
        },
        {
          "id": "1",
          "label": "Identitatea, procedura și baza promisiunii."
        },
        {
          "id": "2",
          "label": "Trimiți toate parolele."
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
          "body": "Începe cu lista completă a datoriilor, costurilor și termenelor.",
          "detail": "Paul are 200 lei suplimentari numai după nevoi și plățile cerute. Compară destinația lor păstrând obligațiile ambelor datorii, iar la refinanțare verifică și durata și totalul nou.",
          "type": "normal",
          "detailHighlights": [
            "obligațiile",
            "totalul"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Alege prioritatea fără să ignori plățile obligatorii.",
          "type": "normal",
          "detail": "Compară soldul, costul și termenele fiecărei datorii. Ordinea plăților trebuie să lase loc cheltuielilor de bază.",
          "detailHighlights": [
            "plăților",
            "datorii"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "O rată consolidată mai mică nu garantează un total mai mic.",
          "type": "normal",
          "detail": "O consolidare poate schimba rata și durata, fără să reducă automat totalul. Compară toate costurile.",
          "detailHighlights": [
            "costurile",
            "totalul"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Construiește un inventar fictiv de două datorii și explică o ordine posibilă de plată.",
          "type": "action",
          "detail": "Construiește lista completă înainte să alegi prioritatea și actualizeaz-o după fiecare plată reală.",
          "detailHighlights": [
            "plată"
          ]
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
