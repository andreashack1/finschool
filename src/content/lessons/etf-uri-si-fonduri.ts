import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "etf-uri-si-fonduri",
  "title": "ETF-uri și fonduri",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "instrumente",
  "slug": "etf-uri-si-fonduri",
  "description": "Lia găsește două fonduri cu multe dețineri.",
  "objective": "Să poți explica etf-uri și fonduri și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "ASF · Ghidul investitorului",
    "url": "https://asfromania.ro/files/ghidul_investitorului.pdf"
  },
  {
    "label": "ASF · Registrul public",
    "url": "https://data.asfromania.ro/registru/registru.php"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "ETF-uri și fonduri",
      "body": "Lia găsește două fonduri cu multe dețineri."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un fond reunește investițiile mai multor persoane într-un portofoliu administrat după o politică. Un ETF este un fond ale cărui unități se tranzacționează la bursă. Nu toate fondurile au aceleași dețineri sau același risc. Citește obiectivul, expunerile, costurile și documentul cu informații esențiale, fără să presupui diversificare largă numai din denumire.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce definește un ETF?",
      "explanation": "Un fond cu unități tranzacționate la bursă.",
      "correctFeedback": "Corect. Un fond cu unități tranzacționate la bursă.",
      "incorrectFeedback": "Nu chiar. Un fond cu unități tranzacționate la bursă.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Un fond cu unități tranzacționate la bursă."
        },
        {
          "id": "1",
          "label": "Orice cont de economii."
        },
        {
          "id": "2",
          "label": "O obligațiune obligatoriu sigură."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Două fonduri pot avea multe dețineri și totuși expuneri diferite, deci numărul pozițiilor nu arată singur diversificarea.",
      "explanation": "Contează în ce companii, sectoare și piețe este investit portofoliul. Titlul fondului și numărul deținerilor nu înlocuiesc politica sa.",
      "correctFeedback": "Corect. Contează în ce companii, sectoare și piețe este investit portofoliul. Titlul fondului și numărul deținerilor nu înlocuiesc politica sa.",
      "incorrectFeedback": "Nu chiar. Contează în ce companii, sectoare și piețe este investit portofoliul. Titlul fondului și numărul deținerilor nu înlocuiesc politica sa.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Lia compară un fond concentrat într-un sector cu unul care urmărește o piață mai largă. Ambele pot avea multe dețineri, dar expunerile diferă. Într-un exercițiu, un cost anual ipotetic de 1% din 1.000 ar fi 10 lei dacă baza rămâne aceeași. Costurile reale și metoda lor trebuie citite, nu deduse numai din exemplu.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "1% din 1.000, cu baza neschimbată, înseamnă cât?",
      "explanation": "10 lei.",
      "correctFeedback": "Corect. 10 lei.",
      "incorrectFeedback": "Nu chiar. 10 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "100 lei."
        },
        {
          "id": "1",
          "label": "10 lei."
        },
        {
          "id": "2",
          "label": "1 leu."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Două fonduri au multe dețineri. Ce compari?",
      "explanation": "Expunerile și politica, nu doar numărul.",
      "correctFeedback": "Corect. Expunerile și politica, nu doar numărul.",
      "incorrectFeedback": "Nu chiar. Expunerile și politica, nu doar numărul.",
      "type": "scenariu",
      "context": "Lia compară un fond concentrat într-un sector cu unul care urmărește o piață mai largă. Ambele pot avea multe dețineri, dar expunerile diferă. Într-un exercițiu, un cost anual ipotetic de 1% din 1.000 ar fi 10 lei dacă baza rămâne aceeași. Costurile reale și metoda lor trebuie citite, nu deduse numai din exemplu.",
      "options": [
        {
          "id": "0",
          "label": "Doar numărul pozițiilor, presupunând că riscul devine identic."
        },
        {
          "id": "1",
          "label": "Doar randamentul trecut, fără sectoarele în care investesc."
        },
        {
          "id": "2",
          "label": "Expunerile și politica, nu doar numărul."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-etf-uri-si-fonduri",
      "paragraphs": [
        "Lia găsește două fonduri cu multe dețineri. Unul este concentrat într-un singur sector, celălalt are expunere mai largă. Citește documentele și observă diferența, în loc să numere doar pozițiile. Calculează separat un cost ipotetic de 10 lei la 1% din 1.000 și verifică alte tarife și moneda. Nu consideră cuvântul ETF o garanție de câștig.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Lia compară un fond concentrat într-un sector cu unul care urmărește o piață mai largă. Ambele pot avea multe dețineri, dar expunerile diferă. Într-un exercițiu, un cost anual ipotetic de 1% din 1.000 ar fi 10 lei dacă baza rămâne aceeași. Costurile reale și metoda lor trebuie citite, nu deduse numai din exemplu. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce diferență găsește Lia?",
      "explanation": "Concentrarea sectorială față de o expunere mai largă.",
      "correctFeedback": "Corect. Concentrarea sectorială față de o expunere mai largă.",
      "incorrectFeedback": "Nu chiar. Concentrarea sectorială față de o expunere mai largă.",
      "caseId": "caz-etf-uri-si-fonduri",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Concentrarea sectorială față de o expunere mai largă."
        },
        {
          "id": "1",
          "label": "Un profit garantat la ambele."
        },
        {
          "id": "2",
          "label": "Aceeași politică obligatoriu."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Unde caută politica și riscurile?",
      "explanation": "În documentele fondului.",
      "correctFeedback": "Corect. În documentele fondului.",
      "incorrectFeedback": "Nu chiar. În documentele fondului.",
      "caseId": "caz-etf-uri-si-fonduri",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Numai într-un comentariu."
        },
        {
          "id": "1",
          "label": "În documentele fondului."
        },
        {
          "id": "2",
          "label": "În randamentul ultimului an, presupunând că descrie politica."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce costuri verifică dincolo de exemplul anual?",
      "explanation": "Tranzacția și conversia valutară relevante.",
      "correctFeedback": "Corect. Tranzacția și conversia valutară relevante.",
      "incorrectFeedback": "Nu chiar. Tranzacția și conversia valutară relevante.",
      "caseId": "caz-etf-uri-si-fonduri",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar comisionul anual, presupunând că tranzacția nu costă."
        },
        {
          "id": "1",
          "label": "Doar costurile în moneda contului, fără conversie."
        },
        {
          "id": "2",
          "label": "Tranzacția și conversia valutară relevante."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un ETF nu garantează profit și nu este automat ieftin în orice situație. Pot exista costuri ale fondului, ale tranzacției și ale conversiei valutare. Verifică suprapunerea cu ce deții deja și modul de distribuire ori reinvestire a veniturilor. O performanță trecută nu promite același rezultat, indiferent dacă fondul este activ sau urmărește un indice.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ai deja un fond similar. Ce verifici?",
      "explanation": "Suprapunerea deținerilor.",
      "correctFeedback": "Corect. Suprapunerea deținerilor.",
      "incorrectFeedback": "Nu chiar. Suprapunerea deținerilor.",
      "type": "scenariu",
      "context": "Lia compară un fond concentrat într-un sector cu unul care urmărește o piață mai largă. Ambele pot avea multe dețineri, dar expunerile diferă. Într-un exercițiu, un cost anual ipotetic de 1% din 1.000 ar fi 10 lei dacă baza rămâne aceeași. Costurile reale și metoda lor trebuie citite, nu deduse numai din exemplu.",
      "options": [
        {
          "id": "0",
          "label": "Suprapunerea deținerilor."
        },
        {
          "id": "1",
          "label": "Doar numărul total al unităților, fără ce dețin fondurile."
        },
        {
          "id": "2",
          "label": "Presupui două expuneri independente."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Fondul a crescut anul trecut. Ce concluzie e corectă?",
      "explanation": "Rezultatul nu garantează viitorul.",
      "correctFeedback": "Corect. Rezultatul nu garantează viitorul.",
      "incorrectFeedback": "Nu chiar. Rezultatul nu garantează viitorul.",
      "type": "scenariu",
      "context": "Lia compară un fond concentrat într-un sector cu unul care urmărește o piață mai largă. Ambele pot avea multe dețineri, dar expunerile diferă. Într-un exercițiu, un cost anual ipotetic de 1% din 1.000 ar fi 10 lei dacă baza rămâne aceeași. Costurile reale și metoda lor trebuie citite, nu deduse numai din exemplu.",
      "options": [
        {
          "id": "0",
          "label": "Va crește exact la fel."
        },
        {
          "id": "1",
          "label": "Rezultatul nu garantează viitorul."
        },
        {
          "id": "2",
          "label": "Nu mai poate scădea."
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
          "body": "Un fond reunește investiții după o politică declarată.",
          "detail": "Două fonduri cu multe poziții pot avea concentrare sectorială diferită. Lia citește politica și expunerile, apoi verifică tarifele fondului, tranzacției și conversiei.",
          "type": "normal",
          "detailHighlights": [
            "tranzacției",
            "expunerile"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Compară expunerile, nu doar numărul deținerilor.",
          "type": "normal",
          "detail": "Două fonduri cu multe dețineri pot avea expuneri foarte diferite. Numărul pozițiilor nu explică singur diversificarea.",
          "detailHighlights": [
            "expuneri"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Un ETF nu garantează profit și nu este automat ieftin.",
          "type": "normal",
          "detail": "Pe lângă tariful fondului pot exista costuri de tranzacție și conversie valutară.",
          "detailHighlights": [
            "conversie",
            "fondului"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Compară două fonduri fictive după obiectiv, expunere, cost și monedă, fără să alegi un produs real.",
          "type": "action",
          "detail": "Compară obiectivul, expunerile și toate costurile pentru aceeași sumă fictivă, fără să deduci siguranța din eticheta ETF.",
          "detailHighlights": [
            "expunerile",
            "costurile"
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
