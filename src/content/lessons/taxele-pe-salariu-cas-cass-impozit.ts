import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "taxele-pe-salariu-cas-cass-impozit",
  "title": "Taxele pe salariu: CAS, CASS, impozit",
  "categoryId": "primul-job",
  "chapterId": "taxele",
  "slug": "taxele-pe-salariu-cas-cass-impozit",
  "description": "Sorin încearcă să înțeleagă un document fictiv cu brut 8.000 lei și rețineri distincte de 2.000, 800 și 520 lei.",
  "objective": "Să poți explica taxele pe salariu: cas, cass, impozit și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Taxele pe salariu: CAS, CASS, impozit",
      "body": "Sorin încearcă să înțeleagă un document fictiv cu brut 8.000 lei și rețineri distincte de 2.000, 800 și 520 lei."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "CAS este contribuția de asigurări sociale, legată de sistemul de pensii, iar CASS privește asigurările sociale de sănătate. Impozitul pe venit este o reținere distinctă. Ele nu se adună mecanic ca procente din aceeași bază în orice situație. Deducerile, scutirile și componentele venitului pot schimba calculul concret, conform Codului fiscal aplicabil.",
        "La primul job, separă promisiunea verbală de informația scrisă. Păstrează documentele primite și cere explicații despre termenii pe care nu îi înțelegi. O discuție clară înainte de începere ajută atât planul de bani, cât și organizarea timpului. Nu transmite public documente care conțin date personale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Care contribuție privește sănătatea?",
      "explanation": "CASS.",
      "correctFeedback": "Corect. CASS.",
      "incorrectFeedback": "Nu chiar. CASS.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "CASS."
        },
        {
          "id": "1",
          "label": "CAS."
        },
        {
          "id": "2",
          "label": "Avansul salarial."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "CAS și CASS sunt două nume pentru aceeași contribuție.",
      "explanation": "CASS și CAS au denumiri apropiate, dar destinații diferite. Nu presupune că statutul de student, singur, elimină toate reținerile unui salariu. Nu aplica impozitul automat asupra brutului fără să verifici baza. Pentru o estimare reală folosește regulile actuale, datele contractului și eventualele deduceri, nu doar o scurtă listă de procente.",
      "correctFeedback": "Corect. CASS și CAS au denumiri apropiate, dar destinații diferite. Nu presupune că statutul de student, singur, elimină toate reținerile unui salariu. Nu aplica impozitul automat asupra brutului fără să verifici baza. Pentru o estimare reală folosește regulile actuale, datele contractului și eventualele deduceri, nu doar o scurtă listă de procente.",
      "incorrectFeedback": "Nu chiar. CASS și CAS au denumiri apropiate, dar destinații diferite. Nu presupune că statutul de student, singur, elimină toate reținerile unui salariu. Nu aplica impozitul automat asupra brutului fără să verifici baza. Pentru o estimare reală folosește regulile actuale, datele contractului și eventualele deduceri, nu doar o scurtă listă de procente.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pe un document fictiv sunt deja calculate un brut de 8.000 lei, CAS de 2.000, CASS de 800 și impozit de 520. Netul este 8.000 minus cele trei rețineri: 4.680 lei. Exercițiul folosește sumele furnizate și nu stabilește cote universale. Baza impozitului din acest exemplu diferă de brutul inițial.",
        "Într-o comparație de oferte, folosește aceeași perioadă și aceeași normă de lucru. Notează ce este confirmat și ce este doar estimare. Cifrele din lecție sunt exerciții, nu salarii impuse de lege. Pentru situația reală, verifică documentele angajatorului și regulile aplicabile la data respectivă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Brutul este 8.000 lei, iar reținerile deja calculate sunt 2.000, 800 și 520 lei. Ce sumă folosești ca net în bugetul acestui exemplu?",
      "explanation": "În buget intră suma după toate cele trei rețineri: 4.680 lei. Folosești liniile furnizate, fără să transformi exercițiul într-o cotă fiscală universală.",
      "correctFeedback": "Corect. În buget intră suma după toate cele trei rețineri: 4.680 lei. Folosești liniile furnizate, fără să transformi exercițiul într-o cotă fiscală universală.",
      "incorrectFeedback": "Nu chiar. În buget intră suma după toate cele trei rețineri: 4.680 lei. Folosești liniile furnizate, fără să transformi exercițiul într-o cotă fiscală universală.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "5.200 lei."
        },
        {
          "id": "1",
          "label": "4.680 lei."
        },
        {
          "id": "2",
          "label": "4.000 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un calcul folosește impozitul direct pe brut. Ce verifici?",
      "explanation": "Baza de calcul și deducerile aplicabile.",
      "correctFeedback": "Corect. Baza de calcul și deducerile aplicabile.",
      "incorrectFeedback": "Nu chiar. Baza de calcul și deducerile aplicabile.",
      "type": "scenariu",
      "context": "Pe un document fictiv sunt deja calculate un brut de 8.000 lei, CAS de 2.000, CASS de 800 și impozit de 520. Netul este 8.000 minus cele trei rețineri: 4.680 lei. Exercițiul folosește sumele furnizate și nu stabilește cote universale. Baza impozitului din acest exemplu diferă de brutul inițial.",
      "options": [
        {
          "id": "0",
          "label": "Doar procentul, presupunând că baza este întotdeauna salariul brut."
        },
        {
          "id": "1",
          "label": "Doar totalul reținerilor unui coleg, fără situația sa."
        },
        {
          "id": "2",
          "label": "Baza de calcul și deducerile aplicabile."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-taxele-pe-salariu-cas-cass-impozit",
      "paragraphs": [
        "Sorin încearcă să înțeleagă un document fictiv cu brut 8.000 lei și rețineri distincte de 2.000, 800 și 520 lei. Un prieten adună procentele pe care le ține minte și obține alt net. Sorin folosește întâi liniile documentului și cere explicația bazelor. Observă că cele două contribuții nu sunt același lucru și că exemplul nu descrie automat situația oricărui student.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Pe un document fictiv sunt deja calculate un brut de 8.000 lei, CAS de 2.000, CASS de 800 și impozit de 520. Netul este 8.000 minus cele trei rețineri: 4.680 lei. Exercițiul folosește sumele furnizate și nu stabilește cote universale. Baza impozitului din acest exemplu diferă de brutul inițial. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "De ce Sorin începe cu liniile documentului?",
      "explanation": "Are sumele reținerilor deja indicate.",
      "correctFeedback": "Corect. Are sumele reținerilor deja indicate.",
      "incorrectFeedback": "Nu chiar. Are sumele reținerilor deja indicate.",
      "caseId": "caz-taxele-pe-salariu-cas-cass-impozit",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Are sumele reținerilor deja indicate."
        },
        {
          "id": "1",
          "label": "Toate procentele au aceeași bază."
        },
        {
          "id": "2",
          "label": "Impozitul este un bonus."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce rol are contribuția CAS?",
      "explanation": "Asigurările sociale legate de pensii.",
      "correctFeedback": "Corect. Asigurările sociale legate de pensii.",
      "incorrectFeedback": "Nu chiar. Asigurările sociale legate de pensii.",
      "caseId": "caz-taxele-pe-salariu-cas-cass-impozit",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Asigurările sociale de sănătate."
        },
        {
          "id": "1",
          "label": "Asigurările sociale legate de pensii."
        },
        {
          "id": "2",
          "label": "Impozitarea venitului salarial."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce lipsește din metoda prietenului?",
      "explanation": "Verificarea bazelor și a condițiilor calculului.",
      "correctFeedback": "Corect. Verificarea bazelor și a condițiilor calculului.",
      "incorrectFeedback": "Nu chiar. Verificarea bazelor și a condițiilor calculului.",
      "caseId": "caz-taxele-pe-salariu-cas-cass-impozit",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar suma brută, presupunând o bază comună pentru toate procentele."
        },
        {
          "id": "1",
          "label": "Doar procentele memorate, fără deduceri și condițiile situației."
        },
        {
          "id": "2",
          "label": "Verificarea bazelor și a condițiilor calculului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "CASS și CAS au denumiri apropiate, dar destinații diferite. Nu presupune că statutul de student, singur, elimină toate reținerile unui salariu. Nu aplica impozitul automat asupra brutului fără să verifici baza. Pentru o estimare reală folosește regulile actuale, datele contractului și eventualele deduceri, nu doar o scurtă listă de procente.",
        "Dacă observi o diferență, formulează o întrebare concretă și păstrează răspunsul. Nu completa singur informația lipsă cu o presupunere favorabilă. Pentru o problemă contractuală sau fiscală, folosește sursa oficială relevantă și ajutor calificat. Un exemplu de învățare nu poate acoperi toate situațiile de muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un coleg este student. Ce presupunere e riscantă?",
      "explanation": "Că statutul elimină toate taxele salariale.",
      "correctFeedback": "Corect. Că statutul elimină toate taxele salariale.",
      "incorrectFeedback": "Nu chiar. Că statutul elimină toate taxele salariale.",
      "type": "scenariu",
      "context": "Pe un document fictiv sunt deja calculate un brut de 8.000 lei, CAS de 2.000, CASS de 800 și impozit de 520. Netul este 8.000 minus cele trei rețineri: 4.680 lei. Exercițiul folosește sumele furnizate și nu stabilește cote universale. Baza impozitului din acest exemplu diferă de brutul inițial.",
      "options": [
        {
          "id": "0",
          "label": "Că statutul elimină toate taxele salariale."
        },
        {
          "id": "1",
          "label": "Că trebuie citit fluturașul."
        },
        {
          "id": "2",
          "label": "Că poate cere o defalcare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ai nevoie de netul unei oferte reale. Ce folosești?",
      "explanation": "Datele contractului și regulile actuale, inclusiv deducerile.",
      "correctFeedback": "Corect. Datele contractului și regulile actuale, inclusiv deducerile.",
      "incorrectFeedback": "Nu chiar. Datele contractului și regulile actuale, inclusiv deducerile.",
      "type": "scenariu",
      "context": "Pe un document fictiv sunt deja calculate un brut de 8.000 lei, CAS de 2.000, CASS de 800 și impozit de 520. Netul este 8.000 minus cele trei rețineri: 4.680 lei. Exercițiul folosește sumele furnizate și nu stabilește cote universale. Baza impozitului din acest exemplu diferă de brutul inițial.",
      "options": [
        {
          "id": "0",
          "label": "Doar rezultatul acestui exercițiu."
        },
        {
          "id": "1",
          "label": "Datele contractului și regulile actuale, inclusiv deducerile."
        },
        {
          "id": "2",
          "label": "Netul unui alt angajat."
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
          "body": "CAS este contribuția de asigurări sociale, legată de sistemul de pensii, iar CASS privește asigurările sociale de sănătate.",
          "detail": "Sorin folosește liniile deja calculate ale documentului fictiv înainte să compare rezultatul cu procentele memorate. Baza impozitului poate diferi de brut, iar exemplul nu stabilește reguli universale.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Pe un document fictiv sunt deja calculate un brut de 8.000 lei, CAS de 2.000, CASS de 800 și impozit de 520. Netul este 8.000 minus cele trei rețineri: 4.680 lei.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "CASS și CAS au denumiri apropiate, dar destinații diferite.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pe cifrele fictive din lecție, calculează netul și explică separat rolul CAS și CASS.",
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
