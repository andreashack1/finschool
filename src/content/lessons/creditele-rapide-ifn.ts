import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "creditele-rapide-ifn",
  "title": "Creditele rapide (IFN)",
  "categoryId": "credite-si-datorii",
  "chapterId": "credite-de-zi-cu-zi",
  "slug": "creditele-rapide-ifn",
  "description": "Dan are o cheltuială de 1.000 lei și primește o ofertă rapidă care cere 1.150 la termen.",
  "objective": "Să poți explica creditele rapide (ifn) și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Creditele rapide (IFN)",
      "body": "Dan are o cheltuială de 1.000 lei și primește o ofertă rapidă care cere 1.150 la termen."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un IFN este o instituție financiară nebancară; viteza acordării nu descrie costul creditului. Verifică identitatea instituției, suma primită, totalul de plată, DAE și scadența. Există reguli legale de protecție privind costurile, dar aplicarea lor depinde de produs și de condițiile relevante. Nu considera reclama drept verificare a respectării tuturor regulilor.",
        "Înainte de o decizie, pune informațiile esențiale pe aceeași pagină: suma primită, calendarul plăților și costurile cerute. Citește documentele oferite înainte de semnare. O reclamă poate scoate în față numai un avantaj, în timp ce obligațiile tale sunt descrise în contract și în informațiile precontractuale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce descrie viteza aprobării?",
      "explanation": "Timpul procesului, nu costul complet.",
      "correctFeedback": "Corect. Timpul procesului, nu costul complet.",
      "incorrectFeedback": "Nu chiar. Timpul procesului, nu costul complet.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Timpul procesului, nu costul complet."
        },
        {
          "id": "1",
          "label": "Totalul de rambursat."
        },
        {
          "id": "2",
          "label": "Capacitatea sigură de plată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un credit aprobat rapid este automat ieftin și ușor de rambursat.",
      "explanation": "Un nou împrumut luat pentru a acoperi vechiul credit poate amplifica problema dacă venitul nu susține plățile. Nu trata refinanțarea ca soluție automată. Dacă vezi costuri neclare, cere defalcarea și verifică regulile prin ANPC ori ajutor calificat. Nu inventa un plafon unic pentru toate produsele și toate contractele.",
      "correctFeedback": "Corect. Un nou împrumut luat pentru a acoperi vechiul credit poate amplifica problema dacă venitul nu susține plățile. Nu trata refinanțarea ca soluție automată. Dacă vezi costuri neclare, cere defalcarea și verifică regulile prin ANPC ori ajutor calificat. Nu inventa un plafon unic pentru toate produsele și toate contractele.",
      "incorrectFeedback": "Nu chiar. Un nou împrumut luat pentru a acoperi vechiul credit poate amplifica problema dacă venitul nu susține plățile. Nu trata refinanțarea ca soluție automată. Dacă vezi costuri neclare, cere defalcarea și verifică regulile prin ANPC ori ajutor calificat. Nu inventa un plafon unic pentru toate produsele și toate contractele.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu, un împrumut de 1.000 lei cere 1.150 la termen. Diferența este 150 lei. Prelungirea poate implica alte condiții și costuri, care trebuie verificate înainte de acceptare. Dan nu decide doar din timpul de aprobare; compară și o amânare convenită a cheltuielii cu obligația de a restitui suma într-un termen scurt.",
        "Cifrele sunt ipotetice și servesc comparației din exercițiu. Nu descriu oferta unei instituții. Un buget trebuie să includă și celelalte plăți necesare, nu numai creditul analizat. Compară aceeași sumă și aceeași durată acolo unde este posibil, apoi notează diferențele care împiedică o comparație directă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Primești 1.000 și datorezi 1.150. Care este diferența?",
      "explanation": "150 lei.",
      "correctFeedback": "Corect. 150 lei.",
      "incorrectFeedback": "Nu chiar. 150 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "1.000 lei."
        },
        {
          "id": "1",
          "label": "150 lei."
        },
        {
          "id": "2",
          "label": "2.150 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Oferta propune prelungire. Ce verifici?",
      "explanation": "Noile costuri, termene și totalul obligațiilor.",
      "correctFeedback": "Corect. Noile costuri, termene și totalul obligațiilor.",
      "incorrectFeedback": "Nu chiar. Noile costuri, termene și totalul obligațiilor.",
      "type": "scenariu",
      "context": "Într-un exemplu, un împrumut de 1.000 lei cere 1.150 la termen. Diferența este 150 lei. Prelungirea poate implica alte condiții și costuri, care trebuie verificate înainte de acceptare. Dan nu decide doar din timpul de aprobare; compară și o amânare convenită a cheltuielii cu obligația de a restitui suma într-un termen scurt.",
      "options": [
        {
          "id": "0",
          "label": "Doar scadența nouă, fără costul prelungirii."
        },
        {
          "id": "1",
          "label": "Presupui gratuitatea."
        },
        {
          "id": "2",
          "label": "Noile costuri, termene și totalul obligațiilor."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-creditele-rapide-ifn",
      "paragraphs": [
        "Dan are o cheltuială de 1.000 lei și primește o ofertă rapidă care cere 1.150 la termen. Nu are încă o intrare confirmată înainte de scadență. Reclama pune accent pe aprobare în câteva minute. Dan caută totalul, condițiile prelungirii și instituția care oferă creditul. Nu presupune că un al doilea împrumut va rezolva lipsa veniturilor.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Într-un exemplu, un împrumut de 1.000 lei cere 1.150 la termen. Diferența este 150 lei. Prelungirea poate implica alte condiții și costuri, care trebuie verificate înainte de acceptare. Dan nu decide doar din timpul de aprobare; compară și o amânare convenită a cheltuielii cu obligația de a restitui suma într-un termen scurt. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce lipsă importantă are planul lui Dan?",
      "explanation": "Venit confirmat înainte de scadență.",
      "correctFeedback": "Corect. Venit confirmat înainte de scadență.",
      "incorrectFeedback": "Nu chiar. Venit confirmat înainte de scadență.",
      "caseId": "caz-creditele-rapide-ifn",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Venit confirmat înainte de scadență."
        },
        {
          "id": "1",
          "label": "Numele cheltuielii."
        },
        {
          "id": "2",
          "label": "O aprobare și mai rapidă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce verifică dincolo de reclamă?",
      "explanation": "Instituția și documentele costurilor.",
      "correctFeedback": "Corect. Instituția și documentele costurilor.",
      "incorrectFeedback": "Nu chiar. Instituția și documentele costurilor.",
      "caseId": "caz-creditele-rapide-ifn",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar testimonialele."
        },
        {
          "id": "1",
          "label": "Instituția și documentele costurilor."
        },
        {
          "id": "2",
          "label": "Numai viteza aprobării, presupunând că aceasta verifică și costul."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce un al doilea împrumut nu este soluție automată?",
      "explanation": "Poate amplifica datoria fără sursă de rambursare.",
      "correctFeedback": "Corect. Poate amplifica datoria fără sursă de rambursare.",
      "incorrectFeedback": "Nu chiar. Poate amplifica datoria fără sursă de rambursare.",
      "caseId": "caz-creditele-rapide-ifn",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Șterge sigur primul contract."
        },
        {
          "id": "1",
          "label": "Transformă costul în venit."
        },
        {
          "id": "2",
          "label": "Poate amplifica datoria fără sursă de rambursare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un nou împrumut luat pentru a acoperi vechiul credit poate amplifica problema dacă venitul nu susține plățile. Nu trata refinanțarea ca soluție automată. Dacă vezi costuri neclare, cere defalcarea și verifică regulile prin ANPC ori ajutor calificat. Nu inventa un plafon unic pentru toate produsele și toate contractele.",
        "Dacă nu înțelegi o condiție, cere explicații înainte să te obligi. Păstrează contractul și comunicările relevante. Pentru dificultăți de plată, discută din timp cu creditorul și verifică opțiunile documentate. Nu trimite bani unei persoane care promite ștergerea sigură a datoriei fără să explice baza și procedura."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Există reguli legale de plafonare. Ce trebuie verificat?",
      "explanation": "Aplicabilitatea la produs și contract.",
      "correctFeedback": "Corect. Aplicabilitatea la produs și contract.",
      "incorrectFeedback": "Nu chiar. Aplicabilitatea la produs și contract.",
      "type": "scenariu",
      "context": "Într-un exemplu, un împrumut de 1.000 lei cere 1.150 la termen. Diferența este 150 lei. Prelungirea poate implica alte condiții și costuri, care trebuie verificate înainte de acceptare. Dan nu decide doar din timpul de aprobare; compară și o amânare convenită a cheltuielii cu obligația de a restitui suma într-un termen scurt.",
      "options": [
        {
          "id": "0",
          "label": "Aplicabilitatea la produs și contract."
        },
        {
          "id": "1",
          "label": "Un singur plafon presupus pentru orice caz."
        },
        {
          "id": "2",
          "label": "Doar data reclamei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un cost nu este explicat. Care este pasul util?",
      "explanation": "Ceri defalcarea și verifici prin surse oficiale.",
      "correctFeedback": "Corect. Ceri defalcarea și verifici prin surse oficiale.",
      "incorrectFeedback": "Nu chiar. Ceri defalcarea și verifici prin surse oficiale.",
      "type": "scenariu",
      "context": "Într-un exemplu, un împrumut de 1.000 lei cere 1.150 la termen. Diferența este 150 lei. Prelungirea poate implica alte condiții și costuri, care trebuie verificate înainte de acceptare. Dan nu decide doar din timpul de aprobare; compară și o amânare convenită a cheltuielii cu obligația de a restitui suma într-un termen scurt.",
      "options": [
        {
          "id": "0",
          "label": "Îl accepți pentru că aprobarea e rapidă."
        },
        {
          "id": "1",
          "label": "Ceri defalcarea și verifici prin surse oficiale."
        },
        {
          "id": "2",
          "label": "Trimiți o taxă unui necunoscut."
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
          "body": "Un IFN este o instituție financiară nebancară; viteza acordării nu descrie costul creditului.",
          "detail": "Dan vede aprobarea în câteva minute, dar nu are un venit confirmat înainte de scadență. Prelungirea poate schimba costurile, deci timpul aprobării nu înlocuiește planul de rambursare.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Într-un exemplu, un împrumut de 1.000 lei cere 1.150 la termen. Diferența este 150 lei.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Un nou împrumut luat pentru a acoperi vechiul credit poate amplifica problema dacă venitul nu susține plățile.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Compară într-un scenariu suma primită, totalul de plată și data sursei de rambursare.",
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
