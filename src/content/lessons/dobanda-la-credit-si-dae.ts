import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "dobanda-la-credit-si-dae",
  "title": "Dobânda la credit și DAE",
  "categoryId": "credite-si-datorii",
  "chapterId": "bazele-creditului",
  "slug": "dobanda-la-credit-si-dae",
  "description": "Luca vede două reclame cu aceeași dobândă și crede că împrumuturile costă la fel.",
  "objective": "Să poți explica dobânda la credit și dae și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Dobânda la credit și DAE",
      "body": "Luca vede două reclame cu aceeași dobândă și crede că împrumuturile costă la fel."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Dobânda este un cost al folosirii banilor împrumutați. DAE exprimă anual costul total al creditului conform metodei legale, incluzând dobânda și costurile relevante. Nu este același lucru cu suma totală în lei. Pentru comparație, verifică DAE, totalul de plată și calendarul, deoarece un procent singur nu explică toate efectele duratei.",
        "Înainte de o decizie, pune informațiile esențiale pe aceeași pagină: suma primită, calendarul plăților și costurile cerute. Citește documentele oferite înainte de semnare. O reclamă poate scoate în față numai un avantaj, în timp ce obligațiile tale sunt descrise în contract și în informațiile precontractuale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce aduce DAE față de dobânda afișată?",
      "explanation": "Un indicator anual al costului total conform metodei legale.",
      "correctFeedback": "Corect. Un indicator anual al costului total conform metodei legale.",
      "incorrectFeedback": "Nu chiar. Un indicator anual al costului total conform metodei legale.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Un indicator anual al costului total conform metodei legale."
        },
        {
          "id": "1",
          "label": "Soldul exact al contului."
        },
        {
          "id": "2",
          "label": "Doar penalitatea maximă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Dobânda este un cost al folosirii banilor împrumutați.",
      "explanation": "Dobânda este un cost al folosirii banilor împrumutați. DAE exprimă anual costul total al creditului conform metodei legale, incluzând dobânda și costurile relevante. Nu este același lucru cu suma totală în lei. Pentru comparație, verifică DAE, totalul de plată și calendarul, deoarece un procent singur nu explică toate efectele duratei.",
      "correctFeedback": "Corect. Dobânda este un cost al folosirii banilor împrumutați. DAE exprimă anual costul total al creditului conform metodei legale, incluzând dobânda și costurile relevante. Nu este același lucru cu suma totală în lei. Pentru comparație, verifică DAE, totalul de plată și calendarul, deoarece un procent singur nu explică toate efectele duratei.",
      "incorrectFeedback": "Nu chiar. Dobânda este un cost al folosirii banilor împrumutați. DAE exprimă anual costul total al creditului conform metodei legale, incluzând dobânda și costurile relevante. Nu este același lucru cu suma totală în lei. Pentru comparație, verifică DAE, totalul de plată și calendarul, deoarece un procent singur nu explică toate efectele duratei.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Două oferte fictive pentru aceeași sumă și durată au dobândă afișată similară. Prima are și un comision obligatoriu, a doua nu. Luca cere DAE și suma totală de plată pentru fiecare. Nu decide doar din rata dobânzii și nu calculează costul în lei înmulțind mecanic principalul cu DAE, fără să țină cont de calendar.",
        "Cifrele sunt ipotetice și servesc comparației din exercițiu. Nu descriu oferta unei instituții. Un buget trebuie să includă și celelalte plăți necesare, nu numai creditul analizat. Compară aceeași sumă și aceeași durată acolo unde este posibil, apoi notează diferențele care împiedică o comparație directă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ce diferență poate modifica comparația ofertelor?",
      "explanation": "Un comision obligatoriu.",
      "correctFeedback": "Corect. Un comision obligatoriu.",
      "incorrectFeedback": "Nu chiar. Un comision obligatoriu.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Culoarea reclamei."
        },
        {
          "id": "1",
          "label": "Un comision obligatoriu."
        },
        {
          "id": "2",
          "label": "Numele produsului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ce informații ceri pentru aceeași sumă și durată?",
      "explanation": "DAE, totalul de plată și calendarul.",
      "correctFeedback": "Corect. DAE, totalul de plată și calendarul.",
      "incorrectFeedback": "Nu chiar. DAE, totalul de plată și calendarul.",
      "type": "scenariu",
      "context": "Două oferte fictive pentru aceeași sumă și durată au dobândă afișată similară. Prima are și un comision obligatoriu, a doua nu. Luca cere DAE și suma totală de plată pentru fiecare. Nu decide doar din rata dobânzii și nu calculează costul în lei înmulțind mecanic principalul cu DAE, fără să țină cont de calendar.",
      "options": [
        {
          "id": "0",
          "label": "Numai dobânda mare din reclamă."
        },
        {
          "id": "1",
          "label": "Doar numărul de clienți."
        },
        {
          "id": "2",
          "label": "DAE, totalul de plată și calendarul."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-dobanda-la-credit-si-dae",
      "paragraphs": [
        "Luca vede două reclame cu aceeași dobândă și crede că împrumuturile costă la fel. Pentru aceeași sumă și perioadă, una cere un comision obligatoriu. El solicită documentele precontractuale și compară DAE cu totalul în lei. Mai verifică plățile și condițiile de întârziere, ca să nu trateze procentul anual drept singura informație necesară.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Două oferte fictive pentru aceeași sumă și durată au dobândă afișată similară. Prima are și un comision obligatoriu, a doua nu. Luca cere DAE și suma totală de plată pentru fiecare. Nu decide doar din rata dobânzii și nu calculează costul în lei înmulțind mecanic principalul cu DAE, fără să țină cont de calendar. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce presupunere inițială corectează Luca?",
      "explanation": "Că aceeași dobândă înseamnă același cost.",
      "correctFeedback": "Corect. Că aceeași dobândă înseamnă același cost.",
      "incorrectFeedback": "Nu chiar. Că aceeași dobândă înseamnă același cost.",
      "caseId": "caz-dobanda-la-credit-si-dae",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Că aceeași dobândă înseamnă același cost."
        },
        {
          "id": "1",
          "label": "Că există documente."
        },
        {
          "id": "2",
          "label": "Că trebuie să restituie banii."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Unde caută costurile pentru comparație?",
      "explanation": "În informațiile precontractuale și contract.",
      "correctFeedback": "Corect. În informațiile precontractuale și contract.",
      "incorrectFeedback": "Nu chiar. În informațiile precontractuale și contract.",
      "caseId": "caz-dobanda-la-credit-si-dae",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Numai în slogan."
        },
        {
          "id": "1",
          "label": "În informațiile precontractuale și contract."
        },
        {
          "id": "2",
          "label": "În extrasul altui client."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "De ce verifică separat întârzierea?",
      "explanation": "Are costuri și consecințe distincte de plata la timp.",
      "correctFeedback": "Corect. Are costuri și consecințe distincte de plata la timp.",
      "incorrectFeedback": "Nu chiar. Are costuri și consecințe distincte de plata la timp.",
      "caseId": "caz-dobanda-la-credit-si-dae",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Nu există penalități în niciun credit."
        },
        {
          "id": "1",
          "label": "DAE garantează că nu va întârzia."
        },
        {
          "id": "2",
          "label": "Are costuri și consecințe distincte de plata la timp."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un cost pentru întârziere nu descrie scenariul obișnuit de rambursare la timp. Verifică separat aceste condiții și ce costuri sunt incluse în indicatorul prezentat. O DAE mai mică la altă durată nu garantează un total în lei mai mic. Informația standardizată și contractul trebuie citite împreună, cu atenție la produsele obligatorii.",
        "Dacă nu înțelegi o condiție, cere explicații înainte să te obligi. Păstrează contractul și comunicările relevante. Pentru dificultăți de plată, discută din timp cu creditorul și verifică opțiunile documentate. Nu trimite bani unei persoane care promite ștergerea sigură a datoriei fără să explice baza și procedura."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O ofertă are DAE mai mică, dar durată mult mai lungă. Ce verifici?",
      "explanation": "Și totalul în lei, nu doar procentul.",
      "correctFeedback": "Corect. Și totalul în lei, nu doar procentul.",
      "incorrectFeedback": "Nu chiar. Și totalul în lei, nu doar procentul.",
      "type": "scenariu",
      "context": "Două oferte fictive pentru aceeași sumă și durată au dobândă afișată similară. Prima are și un comision obligatoriu, a doua nu. Luca cere DAE și suma totală de plată pentru fiecare. Nu decide doar din rata dobânzii și nu calculează costul în lei înmulțind mecanic principalul cu DAE, fără să țină cont de calendar.",
      "options": [
        {
          "id": "0",
          "label": "Și totalul în lei, nu doar procentul."
        },
        {
          "id": "1",
          "label": "Declari automat costul mai mic."
        },
        {
          "id": "2",
          "label": "Ignori numărul plăților."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Poți obține mereu costul în lei doar din principal × DAE?",
      "explanation": "Nu; contează durata și calendarul fluxurilor.",
      "correctFeedback": "Corect. Nu; contează durata și calendarul fluxurilor.",
      "incorrectFeedback": "Nu chiar. Nu; contează durata și calendarul fluxurilor.",
      "type": "scenariu",
      "context": "Două oferte fictive pentru aceeași sumă și durată au dobândă afișată similară. Prima are și un comision obligatoriu, a doua nu. Luca cere DAE și suma totală de plată pentru fiecare. Nu decide doar din rata dobânzii și nu calculează costul în lei înmulțind mecanic principalul cu DAE, fără să țină cont de calendar.",
      "options": [
        {
          "id": "0",
          "label": "Da, pentru orice credit."
        },
        {
          "id": "1",
          "label": "Nu; contează durata și calendarul fluxurilor."
        },
        {
          "id": "2",
          "label": "Da, fără alte date."
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
          "body": "Dobânda este un cost al folosirii banilor împrumutați.",
          "detail": "Dobânda este un cost al folosirii banilor împrumutați.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Două oferte fictive pentru aceeași sumă și durată au dobândă afișată similară. Prima are și un comision obligatoriu, a doua nu.",
          "detail": "Două oferte fictive pentru aceeași sumă și durată au dobândă afișată similară. Prima are și un comision obligatoriu, a doua nu.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Un cost pentru întârziere nu descrie scenariul obișnuit de rambursare la timp.",
          "detail": "Un cost pentru întârziere nu descrie scenariul obișnuit de rambursare la timp.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Construiește un tabel cu suma, durata, DAE și totalul de plată pentru două oferte fictive.",
          "detail": "Construiește un tabel cu suma, durata, DAE și totalul de plată pentru două oferte fictive.",
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
