import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "iesiri-cu-prietenii-fara-sa-te-golesti",
  "title": "Ieșiri cu prietenii fără să te golești",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "cumperi-inteligent",
  "slug": "iesiri-cu-prietenii-fara-sa-te-golesti",
  "description": "Ioana vrea să iasă cu prietenii, dar planul include masă, film și transport. Cum face loc socializării fără surprize?",
  "objective": "Să poți planifica o ieșire într-un buget fără să transformi socializarea într-o alegere „bună” sau „rea”.",
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
      "title": "Ieșiri cu prietenii fără să te golești",
      "body": "Ioana vrea să iasă cu prietenii, dar planul include masă, film și transport. Cum face loc socializării fără surprize?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O ieșire are adesea mai multe componente decât activitatea principală. Biletul, mâncarea, transportul și o contribuție comună pot forma totalul. Înainte de a spune că planul încape, adună costurile relevante. Nu trebuie să elimini socializarea; trebuie să vezi cât cere varianta concretă.",
        "Într-un exemplu, filmul costă 35 lei, masa 45 lei și transportul 20 lei. Totalul este 100 lei. Dacă ai 80 lei pentru ieșire, poți compara alternative: doar filmul, altă masă sau alt transport sigur. Alegerea depinde de preferințe și context, fără un stil de viață obligatoriu."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Care este primul calcul pentru o ieșire?",
      "explanation": "Componentele mici pot schimba totalul.",
      "correctFeedback": "Corect. Componentele mici pot schimba totalul.",
      "incorrectFeedback": "Nu chiar. Componentele mici pot schimba totalul.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Totalul activităților și al transportului."
        },
        {
          "id": "1",
          "label": "Doar prețul biletului."
        },
        {
          "id": "2",
          "label": "Bugetul celui mai cheltuitor prieten."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Cheltuielile comune trebuie împărțite întotdeauna identic.",
      "explanation": "Metoda se clarifică prin acord în context.",
      "correctFeedback": "Corect. Metoda se clarifică prin acord în context.",
      "incorrectFeedback": "Nu chiar. Metoda se clarifică prin acord în context.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Clarificarea din timp poate evita presiunea de la final. Spune ce buget sau ce activitate poți susține și întreabă cum vor fi împărțite cheltuielile comune. Nu există o regulă universală că orice masă trebuie împărțită egal. Grupul poate conveni o metodă potrivită situației, înainte de comandă.",
        "Mai lasă loc pentru costuri neprevăzute rezonabile, fără să inventezi un procent obligatoriu. Dacă planul depinde de transportul înapoi, verifică programul și suma. O variantă aparent ieftină poate crea un cost mare sau un risc dacă nu ai o cale sigură de întoarcere acasă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "35 + 45 + 20 lei totalizează cât?",
      "explanation": "Toate cele trei componente sunt relevante.",
      "correctFeedback": "Corect. Toate cele trei componente sunt relevante.",
      "incorrectFeedback": "Nu chiar. Toate cele trei componente sunt relevante.",
      "type": "scenariu",
      "context": "Planul include film, masă și transport.",
      "options": [
        {
          "id": "0",
          "label": "80 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "60 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ai 80 lei pentru un plan de 100. Ce opțiune gestionează mai clar diferența?",
      "explanation": "Un plan modificat poate păstra participarea fără surprize.",
      "correctFeedback": "Corect. Un plan modificat poate păstra participarea fără surprize.",
      "incorrectFeedback": "Nu chiar. Un plan modificat poate păstra participarea fără surprize.",
      "type": "scenariu",
      "context": "Nu există alte venituri în acea seară.",
      "options": [
        {
          "id": "0",
          "label": "Presupui că cineva va plăti."
        },
        {
          "id": "1",
          "label": "Ascunzi bugetul și accepți orice."
        },
        {
          "id": "2",
          "label": "Adaptezi activitățile și clarifici costurile înainte."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-iesiri-cu-prietenii-fara-sa-te-golesti",
      "paragraphs": [
        "Ioana are 80 lei pentru o seară cu colegii, după ce și-a separat banii pentru alte obligații. Planul propus include film de 35 lei, masă de 45 lei și transport de 20 lei. Totalul de 100 lei depășește suma disponibilă. Ioana vrea să participe, dar nu vrea să presupună că diferența se va rezolva singură.",
        "Ea propune să meargă la film și să aleagă o masă mai simplă sau să participe numai la o parte a serii. Întreabă și cum vor împărți comenzile, deoarece nu toți vor consuma la fel. Grupul discută înainte, fără să impună aceeași sumă tuturor. Pentru întoarcere, Ioana verifică un transport sigur și programul. Dacă apare o nouă activitate, compară costul înainte să spună da. Astfel păstrează și socializarea, și claritatea banilor, fără să moralizeze preferințele colegilor."
      ]
    },
    {
      "id": "q5",
      "question": "Cu cât depășește planul bugetul Ioanei?",
      "explanation": "100 − 80 = 20 lei diferență.",
      "correctFeedback": "Corect. 100 − 80 = 20 lei diferență.",
      "incorrectFeedback": "Nu chiar. 100 − 80 = 20 lei diferență.",
      "caseId": "caz-iesiri-cu-prietenii-fara-sa-te-golesti",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "20 lei."
        },
        {
          "id": "1",
          "label": "80 lei."
        },
        {
          "id": "2",
          "label": "100 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "De ce discută împărțirea înainte?",
      "explanation": "Claritatea reduce neînțelegerile.",
      "correctFeedback": "Corect. Claritatea reduce neînțelegerile.",
      "incorrectFeedback": "Nu chiar. Claritatea reduce neînțelegerile.",
      "caseId": "caz-iesiri-cu-prietenii-fara-sa-te-golesti",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ca să impună o regulă universală."
        },
        {
          "id": "1",
          "label": "Ca să existe un acord și să evite presupuneri."
        },
        {
          "id": "2",
          "label": "Ca să compare valoarea prietenilor."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce trebuie păstrat în alegerea transportului?",
      "explanation": "Costul și siguranța trebuie considerate împreună.",
      "correctFeedback": "Corect. Costul și siguranța trebuie considerate împreună.",
      "incorrectFeedback": "Nu chiar. Costul și siguranța trebuie considerate împreună.",
      "caseId": "caz-iesiri-cu-prietenii-fara-sa-te-golesti",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar cel mai mic preț indiferent de condiții."
        },
        {
          "id": "1",
          "label": "Presupunerea că programul nu contează."
        },
        {
          "id": "2",
          "label": "O variantă sigură și verificată pentru întoarcere."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu folosi comparația bugetelor ca verdict despre prieteni. O persoană poate prefera o activitate mai scumpă, iar alta poate avea alte obligații. Comunicarea clară permite adaptarea planului sau participarea parțială. Refuzul unei componente nu înseamnă automat refuzul relației.",
        "Dacă o cheltuială crește pe parcurs, reevaluează înainte să accepți automat. Poți întreba totalul și propune o alternativă. Scopul este ca alegerea să rămână a ta, cu informații și consecințe cunoscute. O ieșire reușită nu se măsoară numai prin suma plătită, iar un plan financiar nu stabilește cât valorează prietenia."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un prieten preferă o variantă mai scumpă. Ce poți spune?",
      "explanation": "Limitele și preferințele se comunică fără verdict moral.",
      "correctFeedback": "Corect. Limitele și preferințele se comunică fără verdict moral.",
      "incorrectFeedback": "Nu chiar. Limitele și preferințele se comunică fără verdict moral.",
      "type": "scenariu",
      "context": "Bugetele voastre sunt diferite.",
      "options": [
        {
          "id": "0",
          "label": "Ce poți susține și la ce parte poți participa."
        },
        {
          "id": "1",
          "label": "Că preferința lui îl face automat iresponsabil."
        },
        {
          "id": "2",
          "label": "Că trebuie să accepți pentru a păstra relația."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Apare o activitate suplimentară. Ce faci înainte să accepți?",
      "explanation": "Planul poate fi adaptat și pe parcurs.",
      "correctFeedback": "Corect. Planul poate fi adaptat și pe parcurs.",
      "incorrectFeedback": "Nu chiar. Planul poate fi adaptat și pe parcurs.",
      "type": "scenariu",
      "context": "Nu era inclusă în estimarea inițială.",
      "options": [
        {
          "id": "0",
          "label": "Presupui că orice supliment este gratuit."
        },
        {
          "id": "1",
          "label": "Verifici costul și efectul asupra planului."
        },
        {
          "id": "2",
          "label": "Folosești banii altor obligații fără calcul."
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
          "title": "Total complet",
          "body": "Adună activitățile și transportul.",
          "detail": "Filmul, masa și transportul din exemplu cer împreună 100 lei. Cu 80 lei disponibili, compară participarea parțială sau o variantă mai ieftină și păstrează o întoarcere sigură.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Acord clar",
          "body": "Stabiliți cum se împart cheltuielile.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Participare flexibilă",
          "body": "Poți adapta planul fără să judeci preferințele.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Înaintea următoarei ieșiri, estimează totalul și clarifică o cheltuială comună cu grupul.",
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
