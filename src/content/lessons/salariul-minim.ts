import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "salariul-minim",
  "title": "Salariul minim",
  "categoryId": "primul-job",
  "chapterId": "salariul",
  "slug": "salariul-minim",
  "description": "Mihai primește o ofertă care prezintă un total cu tichete și o primă posibilă.",
  "objective": "Să poți explica salariul minim și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Salariul minim",
      "body": "Mihai primește o ofertă care prezintă un total cu tichete și o primă posibilă."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Salariul minim este un prag legal al salariului de bază brut, în condițiile aplicabile. Nu reprezintă suma netă garantată în cont și nu se confundă cu totalul beneficiilor. Valoarea și regulile se pot modifica. Verifică sursa oficială, data intrării în vigoare și norma de lucru înainte să compari o ofertă cu pragul relevant.",
        "La primul job, separă promisiunea verbală de informația scrisă. Păstrează documentele primite și cere explicații despre termenii pe care nu îi înțelegi. O discuție clară înainte de începere ajută atât planul de bani, cât și organizarea timpului. Nu transmite public documente care conțin date personale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce fel de sumă este pragul salariului minim?",
      "explanation": "Un prag al salariului de bază brut, conform regulii aplicabile.",
      "correctFeedback": "Corect. Un prag al salariului de bază brut, conform regulii aplicabile.",
      "incorrectFeedback": "Nu chiar. Un prag al salariului de bază brut, conform regulii aplicabile.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Un prag al salariului de bază brut, conform regulii aplicabile."
        },
        {
          "id": "1",
          "label": "Un sold minim al contului."
        },
        {
          "id": "2",
          "label": "O primă lunară obligatorie."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Salariul minim brut este suma netă care intră obligatoriu în cont.",
      "explanation": "Un salariu de bază și o primă ocazională sunt componente diferite. Nu presupune că orice bonus repară o bază care nu respectă pragul aplicabil. Nici un exemplu de calcul fără deduceri nu descrie obligatoriu netul la salariul minim. Pentru situații particulare, inclusiv norme sau sectoare diferite, verifică regula relevantă și cere explicații documentate.",
      "correctFeedback": "Corect. Un salariu de bază și o primă ocazională sunt componente diferite. Nu presupune că orice bonus repară o bază care nu respectă pragul aplicabil. Nici un exemplu de calcul fără deduceri nu descrie obligatoriu netul la salariul minim. Pentru situații particulare, inclusiv norme sau sectoare diferite, verifică regula relevantă și cere explicații documentate.",
      "incorrectFeedback": "Nu chiar. Un salariu de bază și o primă ocazională sunt componente diferite. Nu presupune că orice bonus repară o bază care nu respectă pragul aplicabil. Nici un exemplu de calcul fără deduceri nu descrie obligatoriu netul la salariul minim. Pentru situații particulare, inclusiv norme sau sectoare diferite, verifică regula relevantă și cere explicații documentate.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Mihai găsește două articole cu praguri diferite și observă că unul este vechi. Caută actul aplicabil la data începerii jobului și verifică dacă oferta este pentru normă întreagă. În buget folosește netul estimat pentru situația sa, nu pragul brut ca bani disponibili. Nu include tichetele drept înlocuitor automat al salariului de bază.",
        "Într-o comparație de oferte, folosește aceeași perioadă și aceeași normă de lucru. Notează ce este confirmat și ce este doar estimare. Cifrele din lecție sunt exerciții, nu salarii impuse de lege. Pentru situația reală, verifică documentele angajatorului și regulile aplicabile la data respectivă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Două articole arată praguri diferite. Ce verifici?",
      "explanation": "Data și actul oficial aplicabil.",
      "correctFeedback": "Corect. Data și actul oficial aplicabil.",
      "incorrectFeedback": "Nu chiar. Data și actul oficial aplicabil.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Care sumă este mai mare, fără data intrării în vigoare."
        },
        {
          "id": "1",
          "label": "Data și actul oficial aplicabil."
        },
        {
          "id": "2",
          "label": "Care articol se referă la aceeași profesie, fără norma de lucru."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Oferta este part-time. Ce trebuie clarificat?",
      "explanation": "Norma și regula relevantă pentru compararea salariului.",
      "correctFeedback": "Corect. Norma și regula relevantă pentru compararea salariului.",
      "incorrectFeedback": "Nu chiar. Norma și regula relevantă pentru compararea salariului.",
      "type": "scenariu",
      "context": "Mihai găsește două articole cu praguri diferite și observă că unul este vechi. Caută actul aplicabil la data începerii jobului și verifică dacă oferta este pentru normă întreagă. În buget folosește netul estimat pentru situația sa, nu pragul brut ca bani disponibili. Nu include tichetele drept înlocuitor automat al salariului de bază.",
      "options": [
        {
          "id": "0",
          "label": "Numai salariul unui full-time."
        },
        {
          "id": "1",
          "label": "Doar valoarea tichetelor."
        },
        {
          "id": "2",
          "label": "Norma și regula relevantă pentru compararea salariului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-salariul-minim",
      "paragraphs": [
        "Mihai primește o ofertă care prezintă un total cu tichete și o primă posibilă. Salariul de bază brut este scris separat. Un articol mai vechi îl face să creadă că oferta respectă orice prag. Înainte să accepte, verifică data regulii, norma și baza din contract. Nu planifică cheltuieli pe presupunerea că totalul din reclamă va fi netul lunar.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Mihai găsește două articole cu praguri diferite și observă că unul este vechi. Caută actul aplicabil la data începerii jobului și verifică dacă oferta este pentru normă întreagă. În buget folosește netul estimat pentru situația sa, nu pragul brut ca bani disponibili. Nu include tichetele drept înlocuitor automat al salariului de bază. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce separă Mihai în oferta sa?",
      "explanation": "Salariul de bază de tichete și prima posibilă.",
      "correctFeedback": "Corect. Salariul de bază de tichete și prima posibilă.",
      "incorrectFeedback": "Nu chiar. Salariul de bază de tichete și prima posibilă.",
      "caseId": "caz-salariul-minim",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Salariul de bază de tichete și prima posibilă."
        },
        {
          "id": "1",
          "label": "Totalul cu tichete, presupunând că acesta este salariul de bază."
        },
        {
          "id": "2",
          "label": "Totalul cu prima posibilă, presupunând că se plătește lunar."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "De ce articolul vechi nu este suficient?",
      "explanation": "Pragul aplicabil poate fi modificat.",
      "correctFeedback": "Corect. Pragul aplicabil poate fi modificat.",
      "incorrectFeedback": "Nu chiar. Pragul aplicabil poate fi modificat.",
      "caseId": "caz-salariul-minim",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Articolul cu suma mai mare este întotdeauna cel aplicabil."
        },
        {
          "id": "1",
          "label": "Pragul aplicabil poate fi modificat."
        },
        {
          "id": "2",
          "label": "Pragul din articol se aplică automat oricărei norme de lucru."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce sumă folosește prudent în buget?",
      "explanation": "Netul estimat cu ipotezele situației sale.",
      "correctFeedback": "Corect. Netul estimat cu ipotezele situației sale.",
      "incorrectFeedback": "Nu chiar. Netul estimat cu ipotezele situației sale.",
      "caseId": "caz-salariul-minim",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Tot brutul ca disponibil."
        },
        {
          "id": "1",
          "label": "Prima posibilă ca venit garantat."
        },
        {
          "id": "2",
          "label": "Netul estimat cu ipotezele situației sale."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un salariu de bază și o primă ocazională sunt componente diferite. Nu presupune că orice bonus repară o bază care nu respectă pragul aplicabil. Nici un exemplu de calcul fără deduceri nu descrie obligatoriu netul la salariul minim. Pentru situații particulare, inclusiv norme sau sectoare diferite, verifică regula relevantă și cere explicații documentate.",
        "Dacă observi o diferență, formulează o întrebare concretă și păstrează răspunsul. Nu completa singur informația lipsă cu o presupunere favorabilă. Pentru o problemă contractuală sau fiscală, folosește sursa oficială relevantă și ajutor calificat. Un exemplu de învățare nu poate acoperi toate situațiile de muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un bonus este ocazional. Ce concluzie este corectă?",
      "explanation": "Nu îl tratezi drept salariu de bază permanent.",
      "correctFeedback": "Corect. Nu îl tratezi drept salariu de bază permanent.",
      "incorrectFeedback": "Nu chiar. Nu îl tratezi drept salariu de bază permanent.",
      "type": "scenariu",
      "context": "Mihai găsește două articole cu praguri diferite și observă că unul este vechi. Caută actul aplicabil la data începerii jobului și verifică dacă oferta este pentru normă întreagă. În buget folosește netul estimat pentru situația sa, nu pragul brut ca bani disponibili. Nu include tichetele drept înlocuitor automat al salariului de bază.",
      "options": [
        {
          "id": "0",
          "label": "Nu îl tratezi drept salariu de bază permanent."
        },
        {
          "id": "1",
          "label": "Înlocuiește automat pragul legal."
        },
        {
          "id": "2",
          "label": "Se plătește obligatoriu în fiecare lună."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un calculator simplificat nu include deduceri. Cum folosești rezultatul?",
      "explanation": "Ca exemplu cu limite, apoi verifici cazul real.",
      "correctFeedback": "Corect. Ca exemplu cu limite, apoi verifici cazul real.",
      "incorrectFeedback": "Nu chiar. Ca exemplu cu limite, apoi verifici cazul real.",
      "type": "scenariu",
      "context": "Mihai găsește două articole cu praguri diferite și observă că unul este vechi. Caută actul aplicabil la data începerii jobului și verifică dacă oferta este pentru normă întreagă. În buget folosește netul estimat pentru situația sa, nu pragul brut ca bani disponibili. Nu include tichetele drept înlocuitor automat al salariului de bază.",
      "options": [
        {
          "id": "0",
          "label": "Ca net universal la minim."
        },
        {
          "id": "1",
          "label": "Ca exemplu cu limite, apoi verifici cazul real."
        },
        {
          "id": "2",
          "label": "Ca act normativ."
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
          "body": "Salariul minim este un prag legal care trebuie verificat pentru perioada relevantă.",
          "detail": "Oferta lui Mihai separă baza, tichetele și o primă posibilă. Pentru comparația cu pragul relevant, verifică data, norma și baza din contract, fără să confunzi totalul pachetului cu netul.",
          "type": "normal",
          "detailHighlights": [
            "contract",
            "totalul"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Caută suma împreună cu data și condițiile aplicării.",
          "type": "normal",
          "detail": "Verifică data aplicării, programul și categoria pentru care este anunțată suma. Un titlu de știre poate omite aceste condiții.",
          "detailHighlights": [
            "programul",
            "condiții"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Un prag brut nu este netul identic pentru toată lumea.",
          "type": "normal",
          "detail": "Pragul brut nu este suma netă garantată în orice situație personală.",
          "detailHighlights": [
            "suma netă",
            "brut"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Verifică într-o sursă oficială data unei reguli salariale, fără să memorezi un prag dintr-un articol vechi.",
          "type": "action",
          "detail": "Notează sursa oficială și data consultării. O cifră salvată fără context poate deveni depășită.",
          "detailHighlights": [
            "sursa",
            "data"
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
