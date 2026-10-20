import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cheltuieli-mici-care-se-aduna",
  "title": "Cheltuieli mici care se adună",
  "categoryId": "de-ce-cheltuim-cum-cheltuim",
  "chapterId": "obiceiuri",
  "slug": "cheltuieli-mici-care-se-aduna",
  "description": "Dan cumpără de 12 lei în 20 de zile dintr-un interval și vede totalul de 240.",
  "objective": "Să poți explica cheltuieli mici care se adună și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Cheltuieli mici care se adună",
      "body": "Dan cumpără de 12 lei în 20 de zile dintr-un interval și vede totalul de 240."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O sumă mică repetată poate avea un total important. Pentru a o evalua, înmulțește costul cu frecvența reală și compară cu utilitatea primită. Nu orice cheltuială mică trebuie eliminată. Un cost repetat pe care îl folosești poate fi potrivit; unul uitat ori duplicat poate consuma bani fără beneficiul urmărit.",
        "Un obicei de cheltuire nu definește valoarea unei persoane. Observă contextul, informația disponibilă și alternativa pe care o ai. O pauză scurtă și o întrebare concretă pot face alegerea mai ușor de evaluat. Nu trebuie să elimini orice plăcere pentru a construi un plan de bani util."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Cum evaluezi un cost mic repetat?",
      "explanation": "Cost × frecvența reală și utilitate.",
      "correctFeedback": "Corect. Cost × frecvența reală și utilitate.",
      "incorrectFeedback": "Nu chiar. Cost × frecvența reală și utilitate.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Cost × frecvența reală și utilitate."
        },
        {
          "id": "1",
          "label": "Numai costul unei zile."
        },
        {
          "id": "2",
          "label": "Numai numărul de bonuri."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un cost mic pe tranzacție este întotdeauna neimportant în buget.",
      "explanation": "Nu extrapola un cost zilnic la toate zilele anului dacă frecvența reală este alta. Evită și promisiunea că o singură renunțare va rezolva orice problemă de venit. Uită-te la cheltuielile mari și mici împreună. Poți reduce frecvența ori alege o alternativă, fără să transformi evidența într-un verdict moral.",
      "correctFeedback": "Corect. Nu extrapola un cost zilnic la toate zilele anului dacă frecvența reală este alta. Evită și promisiunea că o singură renunțare va rezolva orice problemă de venit. Uită-te la cheltuielile mari și mici împreună. Poți reduce frecvența ori alege o alternativă, fără să transformi evidența într-un verdict moral.",
      "incorrectFeedback": "Nu chiar. Nu extrapola un cost zilnic la toate zilele anului dacă frecvența reală este alta. Evită și promisiunea că o singură renunțare va rezolva orice problemă de venit. Uită-te la cheltuielile mari și mici împreună. Poți reduce frecvența ori alege o alternativă, fără să transformi evidența într-un verdict moral.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "O cumpărătură de 12 lei făcută în 20 de zile costă 240 lei. Dacă o faci în numai 10 zile, costă 120. Diferența este 120 în acest interval, fără să presupunem că există exact același număr de zile în fiecare lună. Dan folosește frecvența din evidență și compară totalul cu alte priorități.",
        "Exemplul arată o situație posibilă, nu o reacție obligatorie pentru fiecare om. Folosește cifrele pentru verificarea alegerii și separă ce este confirmat de ce presupui. Poți modifica suma, termenul ori alternativa. Un plan realist arată ce mai rămâne disponibil după decizie, nu doar ce ai cumpărat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "12 lei în 20 de zile înseamnă cât?",
      "explanation": "240 lei.",
      "correctFeedback": "Corect. 240 lei.",
      "incorrectFeedback": "Nu chiar. 240 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "120 lei."
        },
        {
          "id": "1",
          "label": "240 lei."
        },
        {
          "id": "2",
          "label": "20 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Reducerea la 10 zile economisește cât în exemplu?",
      "explanation": "120 lei.",
      "correctFeedback": "Corect. 120 lei.",
      "incorrectFeedback": "Nu chiar. 120 lei.",
      "type": "scenariu",
      "context": "O cumpărătură de 12 lei făcută în 20 de zile costă 240 lei. Dacă o faci în numai 10 zile, costă 120. Diferența este 120 în acest interval, fără să presupunem că există exact același număr de zile în fiecare lună. Dan folosește frecvența din evidență și compară totalul cu alte priorități.",
      "options": [
        {
          "id": "0",
          "label": "12 lei."
        },
        {
          "id": "1",
          "label": "240 lei."
        },
        {
          "id": "2",
          "label": "120 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cheltuieli-mici-care-se-aduna",
      "paragraphs": [
        "Dan cumpără de 12 lei în 20 de zile dintr-un interval și vede totalul de 240. Vrea să păstreze unele cumpărături, dar testează zece zile, ceea ce ar costa 120. Notează diferența și o compară cu obiectivul său. Nu presupune că fiecare lună sau an are același tipar și verifică și cheltuielile mai mari.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: O cumpărătură de 12 lei făcută în 20 de zile costă 240 lei. Dacă o faci în numai 10 zile, costă 120. Diferența este 120 în acest interval, fără să presupunem că există exact același număr de zile în fiecare lună. Dan folosește frecvența din evidență și compară totalul cu alte priorități. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Dan vrea să păstreze unele cumpărături și să reducă totalul. Ce test compară beneficiul păstrat cu o cheltuială mai mică?",
      "explanation": "Reducerea frecvenței de la 20 la 10 zile reduce totalul la 120 lei în exemplu. Dan păstrează unele cumpărături și poate verifica efectul asupra scopului său.",
      "correctFeedback": "Corect. Reducerea frecvenței de la 20 la 10 zile reduce totalul la 120 lei în exemplu. Dan păstrează unele cumpărături și poate verifica efectul asupra scopului său.",
      "incorrectFeedback": "Nu chiar. Reducerea frecvenței de la 20 la 10 zile reduce totalul la 120 lei în exemplu. Dan păstrează unele cumpărături și poate verifica efectul asupra scopului său.",
      "caseId": "caz-cheltuieli-mici-care-se-aduna",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Reduce frecvența de la 20 la 10 zile."
        },
        {
          "id": "1",
          "label": "Elimină numai evidența, păstrând toate cumpărăturile."
        },
        {
          "id": "2",
          "label": "Reduce prețul presupus în tabel, fără schimbarea plăților."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce frecvență folosește inițial?",
      "explanation": "Cea observată în evidență.",
      "correctFeedback": "Corect. Cea observată în evidență.",
      "incorrectFeedback": "Nu chiar. Cea observată în evidență.",
      "caseId": "caz-cheltuieli-mici-care-se-aduna",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "365 de zile automat."
        },
        {
          "id": "1",
          "label": "Cea observată în evidență."
        },
        {
          "id": "2",
          "label": "Orice număr favorabil."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce mai verifică dincolo de costul mic?",
      "explanation": "Cheltuielile mari și celelalte priorități.",
      "correctFeedback": "Corect. Cheltuielile mari și celelalte priorități.",
      "incorrectFeedback": "Nu chiar. Cheltuielile mari și celelalte priorități.",
      "caseId": "caz-cheltuieli-mici-care-se-aduna",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar o singură zi."
        },
        {
          "id": "1",
          "label": "Doar economisirea unei singure categorii, fără restul bugetului."
        },
        {
          "id": "2",
          "label": "Cheltuielile mari și celelalte priorități."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu extrapola un cost zilnic la toate zilele anului dacă frecvența reală este alta. Evită și promisiunea că o singură renunțare va rezolva orice problemă de venit. Uită-te la cheltuielile mari și mici împreună. Poți reduce frecvența ori alege o alternativă, fără să transformi evidența într-un verdict moral.",
        "Dacă ai făcut deja o alegere pe care o regreți, notează ce a declanșat-o și adaptează pasul următor. Rușinea nu completează bugetul. Caută un proces simplu pe care îl poți repeta și verifică efectul în timp. Dacă o problemă persistă și îți afectează viața, cere sprijin potrivit situației."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Costul apare doar în zilele de lucru. Cum estimezi?",
      "explanation": "Cu numărul real sau estimat explicit al acelor zile.",
      "correctFeedback": "Corect. Cu numărul real sau estimat explicit al acelor zile.",
      "incorrectFeedback": "Nu chiar. Cu numărul real sau estimat explicit al acelor zile.",
      "type": "scenariu",
      "context": "O cumpărătură de 12 lei făcută în 20 de zile costă 240 lei. Dacă o faci în numai 10 zile, costă 120. Diferența este 120 în acest interval, fără să presupunem că există exact același număr de zile în fiecare lună. Dan folosește frecvența din evidență și compară totalul cu alte priorități.",
      "options": [
        {
          "id": "0",
          "label": "Cu numărul real sau estimat explicit al acelor zile."
        },
        {
          "id": "1",
          "label": "Cu toate zilele obligatoriu."
        },
        {
          "id": "2",
          "label": "Cu zero pentru weekend."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Vrei să păstrezi beneficiul. Ce alternativă poți compara?",
      "explanation": "O frecvență redusă ori o variantă potrivită.",
      "correctFeedback": "Corect. O frecvență redusă ori o variantă potrivită.",
      "incorrectFeedback": "Nu chiar. O frecvență redusă ori o variantă potrivită.",
      "type": "scenariu",
      "context": "O cumpărătură de 12 lei făcută în 20 de zile costă 240 lei. Dacă o faci în numai 10 zile, costă 120. Diferența este 120 în acest interval, fără să presupunem că există exact același număr de zile în fiecare lună. Dan folosește frecvența din evidență și compară totalul cu alte priorități.",
      "options": [
        {
          "id": "0",
          "label": "Eliminarea oricărei plăceri."
        },
        {
          "id": "1",
          "label": "O frecvență redusă ori o variantă potrivită."
        },
        {
          "id": "2",
          "label": "Ignorarea totalului."
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
          "body": "Un cost mic repetat poate ocupa mult din buget.",
          "detail": "La 12 lei în 20 de zile, Dan cheltuiește 240 lei; în zece zile, 120. Folosește frecvența reală și verifică și celelalte categorii, fără să promită că o singură reducere rezolvă orice buget.",
          "type": "normal",
          "detailHighlights": [
            "frecvența",
            "buget"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Calculează totalul după frecvența reală.",
          "type": "normal",
          "detail": "Totalul depinde de cât de des cumperi, nu doar de prețul unei porții.",
          "detailHighlights": [
            "totalul",
            "prețul"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Nu extinde automat obiceiul unei zile la tot anul.",
          "type": "normal",
          "detail": "Nu presupune că o cheltuială de luni se repetă în toate zilele anului. Folosește frecvența observată.",
          "detailHighlights": [
            "frecvența"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Calculează totalul unui cost mic folosind frecvența reală dintr-un interval fictiv.",
          "type": "action",
          "detail": "Alege un interval complet și compară două frecvențe realiste, fără să promiți că o singură reducere rezolvă tot bugetul.",
          "detailHighlights": [
            "frecvențe",
            "bugetul"
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
