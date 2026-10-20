import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "primul-contract-de-munca",
  "title": "Primul contract de muncă",
  "categoryId": "primul-job",
  "chapterId": "primul-job",
  "slug": "primul-contract-de-munca",
  "description": "Alex urmează să lucreze într-un magazin și i se spune să înceapă luni, urmând să primească actele mai târziu.",
  "objective": "Să poți explica primul contract de muncă și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Primul contract de muncă",
      "body": "Alex urmează să lucreze într-un magazin și i se spune să înceapă luni, urmând să primească actele mai târziu."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Contractul individual de muncă stabilește relația dintre salariat și angajator: funcția, salariul, programul și alte condiții. În România se încheie în scris înainte de începerea activității. Angajatorul trebuie să îți dea un exemplar. O probă de lucru prestată ca salariat nu devine lipsită de reguli doar pentru că este numită probă.",
        "La primul job, separă promisiunea verbală de informația scrisă. Păstrează documentele primite și cere explicații despre termenii pe care nu îi înțelegi. O discuție clară înainte de începere ajută atât planul de bani, cât și organizarea timpului. Nu transmite public documente care conțin date personale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce stabilește contractul de muncă?",
      "explanation": "Condițiile relației dintre salariat și angajator.",
      "correctFeedback": "Corect. Condițiile relației dintre salariat și angajator.",
      "incorrectFeedback": "Nu chiar. Condițiile relației dintre salariat și angajator.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Condițiile relației dintre salariat și angajator."
        },
        {
          "id": "1",
          "label": "Numai suma netă primită, fără funcție și program."
        },
        {
          "id": "2",
          "label": "Numai condițiile discutate verbal, fără cele scrise."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Perioada de probă permite automat muncă fără contract.",
      "explanation": "Perioada de probă se desfășoară în cadrul contractului; nu este permisiunea de a munci fără documente. Nu accepta plata parțială ascunsă drept un avantaj sigur. Aceasta poate afecta dovada veniturilor și a contribuțiilor. Pentru un minor există condiții speciale privind vârsta, acordul și programul, care se verifică separat.",
      "correctFeedback": "Corect. Perioada de probă se desfășoară în cadrul contractului; nu este permisiunea de a munci fără documente. Nu accepta plata parțială ascunsă drept un avantaj sigur. Aceasta poate afecta dovada veniturilor și a contribuțiilor. Pentru un minor există condiții speciale privind vârsta, acordul și programul, care se verifică separat.",
      "incorrectFeedback": "Nu chiar. Perioada de probă se desfășoară în cadrul contractului; nu este permisiunea de a munci fără documente. Nu accepta plata parțială ascunsă drept un avantaj sigur. Aceasta poate afecta dovada veniturilor și a contribuțiilor. Pentru un minor există condiții speciale privind vârsta, acordul și programul, care se verifică separat.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Alex primește o ofertă verbală pentru un magazin. Înainte de prima tură cere contractul și verifică identitatea angajatorului, funcția, data începerii și salariul brut. Păstrează exemplarul său și nu confundă discuția de recrutare cu documentul semnat. Dacă suma promisă lipsește, cere clarificarea înainte să accepte condițiile.",
        "Într-o comparație de oferte, folosește aceeași perioadă și aceeași normă de lucru. Notează ce este confirmat și ce este doar estimare. Cifrele din lecție sunt exerciții, nu salarii impuse de lege. Pentru situația reală, verifică documentele angajatorului și regulile aplicabile la data respectivă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Când verifici contractul pentru prima tură?",
      "explanation": "Înainte de începerea activității.",
      "correctFeedback": "Corect. Înainte de începerea activității.",
      "incorrectFeedback": "Nu chiar. Înainte de începerea activității.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "După primul salariu."
        },
        {
          "id": "1",
          "label": "Înainte de începerea activității."
        },
        {
          "id": "2",
          "label": "Numai când apare un conflict."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Oferta verbală și contractul au sume diferite. Ce faci?",
      "explanation": "Ceri clarificarea diferenței înainte de acceptare.",
      "correctFeedback": "Corect. Ceri clarificarea diferenței înainte de acceptare.",
      "incorrectFeedback": "Nu chiar. Ceri clarificarea diferenței înainte de acceptare.",
      "type": "scenariu",
      "context": "Alex primește o ofertă verbală pentru un magazin. Înainte de prima tură cere contractul și verifică identitatea angajatorului, funcția, data începerii și salariul brut. Păstrează exemplarul său și nu confundă discuția de recrutare cu documentul semnat. Dacă suma promisă lipsește, cere clarificarea înainte să accepte condițiile.",
      "options": [
        {
          "id": "0",
          "label": "Presupui că suma mai mare este garantată."
        },
        {
          "id": "1",
          "label": "Ignori suma scrisă."
        },
        {
          "id": "2",
          "label": "Ceri clarificarea diferenței înainte de acceptare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-primul-contract-de-munca",
      "paragraphs": [
        "Alex urmează să lucreze într-un magazin și i se spune să înceapă luni, urmând să primească actele mai târziu. Nu a văzut salariul brut scris și nu știe ce firmă îl angajează. Cere documentul înainte de tură. Managerul îi propune o perioadă de probă, iar Alex întreabă unde este menționată în contract și solicită exemplarul său.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Alex primește o ofertă verbală pentru un magazin. Înainte de prima tură cere contractul și verifică identitatea angajatorului, funcția, data începerii și salariul brut. Păstrează exemplarul său și nu confundă discuția de recrutare cu documentul semnat. Dacă suma promisă lipsește, cere clarificarea înainte să accepte condițiile. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce problemă identifică Alex în propunerea inițială?",
      "explanation": "I se cere să înceapă înainte să primească actele.",
      "correctFeedback": "Corect. I se cere să înceapă înainte să primească actele.",
      "incorrectFeedback": "Nu chiar. I se cere să înceapă înainte să primească actele.",
      "caseId": "caz-primul-contract-de-munca",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "I se cere să înceapă înainte să primească actele."
        },
        {
          "id": "1",
          "label": "Salariul verbal ar trebui folosit ca sumă confirmată înainte de acte."
        },
        {
          "id": "2",
          "label": "O perioadă numită probă ar înlocui verificarea contractului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce document trebuie să păstreze Alex?",
      "explanation": "Exemplarul contractului său.",
      "correctFeedback": "Corect. Exemplarul contractului său.",
      "incorrectFeedback": "Nu chiar. Exemplarul contractului său.",
      "caseId": "caz-primul-contract-de-munca",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar reclama de recrutare."
        },
        {
          "id": "1",
          "label": "Exemplarul contractului său."
        },
        {
          "id": "2",
          "label": "Doar programul de pe ușă."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Cum verifică Alex perioada de probă?",
      "explanation": "Caută condiția în contractul de muncă.",
      "correctFeedback": "Corect. Caută condiția în contractul de muncă.",
      "incorrectFeedback": "Nu chiar. Caută condiția în contractul de muncă.",
      "caseId": "caz-primul-contract-de-munca",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Consideră că exclude salariul."
        },
        {
          "id": "1",
          "label": "Consideră că înlocuiește contractul."
        },
        {
          "id": "2",
          "label": "Caută condiția în contractul de muncă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Perioada de probă se desfășoară în cadrul contractului; nu este permisiunea de a munci fără documente. Nu accepta plata parțială ascunsă drept un avantaj sigur. Aceasta poate afecta dovada veniturilor și a contribuțiilor. Pentru un minor există condiții speciale privind vârsta, acordul și programul, care se verifică separat.",
        "Dacă observi o diferență, formulează o întrebare concretă și păstrează răspunsul. Nu completa singur informația lipsă cu o presupunere favorabilă. Pentru o problemă contractuală sau fiscală, folosește sursa oficială relevantă și ajutor calificat. Un exemplu de învățare nu poate acoperi toate situațiile de muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un angajator propune o parte a plății ascunsă. Ce verifici?",
      "explanation": "Riscurile pentru dovada venitului și contribuții.",
      "correctFeedback": "Corect. Riscurile pentru dovada venitului și contribuții.",
      "incorrectFeedback": "Nu chiar. Riscurile pentru dovada venitului și contribuții.",
      "type": "scenariu",
      "context": "Alex primește o ofertă verbală pentru un magazin. Înainte de prima tură cere contractul și verifică identitatea angajatorului, funcția, data începerii și salariul brut. Păstrează exemplarul său și nu confundă discuția de recrutare cu documentul semnat. Dacă suma promisă lipsește, cere clarificarea înainte să accepte condițiile.",
      "options": [
        {
          "id": "0",
          "label": "Riscurile pentru dovada venitului și contribuții."
        },
        {
          "id": "1",
          "label": "Doar totalul promis, presupunând că și partea ascunsă este documentată."
        },
        {
          "id": "2",
          "label": "Doar momentul plății, fără baza contribuțiilor și dovada venitului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ai 16 ani și primești o ofertă. Ce trebuie verificat suplimentar?",
      "explanation": "Condițiile speciale pentru minori.",
      "correctFeedback": "Corect. Condițiile speciale pentru minori.",
      "incorrectFeedback": "Nu chiar. Condițiile speciale pentru minori.",
      "type": "scenariu",
      "context": "Alex primește o ofertă verbală pentru un magazin. Înainte de prima tură cere contractul și verifică identitatea angajatorului, funcția, data începerii și salariul brut. Păstrează exemplarul său și nu confundă discuția de recrutare cu documentul semnat. Dacă suma promisă lipsește, cere clarificarea înainte să accepte condițiile.",
      "options": [
        {
          "id": "0",
          "label": "Numai marca firmei."
        },
        {
          "id": "1",
          "label": "Condițiile speciale pentru minori."
        },
        {
          "id": "2",
          "label": "Doar salariul unui adult."
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
          "body": "Verifică în scris salariul, programul și ce ai de făcut.",
          "detail": "Alex verifică angajatorul, salariul și data începerii înainte de prima tură. Oferta verbală și denumirea de probă nu înlocuiesc documentele și exemplarul pe care trebuie să îl păstreze.",
          "type": "normal",
          "detailHighlights": [
            "documentele",
            "denumirea"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Compară ofertele după bani și timp, nu doar după suma afișată.",
          "type": "normal",
          "detail": "Un salariu atractiv poate veni cu alt program sau alte responsabilități. Citește oferta împreună cu documentul complet.",
          "detailHighlights": [
            "salariu"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Cere clarificări pentru promisiunile care lipsesc din contract.",
          "type": "normal",
          "detail": "O promisiune verbală despre bonus nu are aceeași claritate ca o condiție scrisă și verificabilă.",
          "detailHighlights": [
            "bonus"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Notează trei întrebări despre funcție, program și salariul brut pe care le-ai pune înainte de primul job.",
          "type": "action",
          "detail": "Notează întrebările despre sumă, program și atribuții înainte să semnezi. Cere explicații pentru formulările neclare.",
          "detailHighlights": [
            "sumă"
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
