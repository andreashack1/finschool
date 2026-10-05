import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "ce-este-creditul",
  "title": "Ce este creditul",
  "categoryId": "credite-si-datorii",
  "chapterId": "bazele-creditului",
  "slug": "ce-este-creditul",
  "description": "Mara vrea un produs de 1.000 lei și primește un împrumut care cere 1.100 lei înapoi.",
  "objective": "Să poți explica ce este creditul și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Ce este creditul",
      "body": "Mara vrea un produs de 1.000 lei și primește un împrumut care cere 1.100 lei înapoi."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Creditul îți permite să folosești acum o sumă pe care te obligi să o restitui conform unui contract. Banii primiți nu sunt venit câștigat: există o datorie. În funcție de produs, plătești și dobândă ori alte costuri. Limita aprobată descrie accesul la împrumut, nu suma pe care bugetul tău o poate suporta fără dificultăți.",
        "Înainte de o decizie, pune informațiile esențiale pe aceeași pagină: suma primită, calendarul plăților și costurile cerute. Citește documentele oferite înainte de semnare. O reclamă poate scoate în față numai un avantaj, în timp ce obligațiile tale sunt descrise în contract și în informațiile precontractuale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce apare când folosești un credit?",
      "explanation": "O obligație de rambursare.",
      "correctFeedback": "Corect. O obligație de rambursare.",
      "incorrectFeedback": "Nu chiar. O obligație de rambursare.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "O obligație de rambursare."
        },
        {
          "id": "1",
          "label": "Un venit câștigat fără datorie."
        },
        {
          "id": "2",
          "label": "O donație automată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Banii primiți prin credit sunt venit fără obligație de restituire.",
      "explanation": "Aprobarea unui împrumut nu garantează că toate lunile viitoare vor fi ușoare. Un venit incert și mai multe datorii pot schimba capacitatea de plată. Nu împrumuta automat limita maximă oferită. Dacă plata unui produs poate fi amânată, compară și economisirea până la achiziție cu obligația de rambursare imediată.",
      "correctFeedback": "Corect. Aprobarea unui împrumut nu garantează că toate lunile viitoare vor fi ușoare. Un venit incert și mai multe datorii pot schimba capacitatea de plată. Nu împrumuta automat limita maximă oferită. Dacă plata unui produs poate fi amânată, compară și economisirea până la achiziție cu obligația de rambursare imediată.",
      "incorrectFeedback": "Nu chiar. Aprobarea unui împrumut nu garantează că toate lunile viitoare vor fi ușoare. Un venit incert și mai multe datorii pot schimba capacitatea de plată. Nu împrumuta automat limita maximă oferită. Dacă plata unui produs poate fi amânată, compară și economisirea până la achiziție cu obligația de rambursare imediată.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Mara împrumută ipotetic 1.000 lei și trebuie să returneze în total 1.100 lei în perioada stabilită. Costul este 100 lei, iar intrarea inițială nu îi crește averea cu 1.000: are și obligația de plată. Înainte de acceptare verifică sursa rambursării și termenele, fără să considere aprobarea drept confirmare că își permite creditul.",
        "Cifrele sunt ipotetice și servesc comparației din exercițiu. Nu descriu oferta unei instituții. Un buget trebuie să includă și celelalte plăți necesare, nu numai creditul analizat. Compară aceeași sumă și aceeași durată acolo unde este posibil, apoi notează diferențele care împiedică o comparație directă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Primești 1.000 și restitui 1.100. Care este costul?",
      "explanation": "100 lei.",
      "correctFeedback": "Corect. 100 lei.",
      "incorrectFeedback": "Nu chiar. 100 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "1.000 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "2.100 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Limita aprobată este mare. Ce verifici înainte s-o folosești?",
      "explanation": "Suma necesară și capacitatea de rambursare.",
      "correctFeedback": "Corect. Suma necesară și capacitatea de rambursare.",
      "incorrectFeedback": "Nu chiar. Suma necesară și capacitatea de rambursare.",
      "type": "scenariu",
      "context": "Mara împrumută ipotetic 1.000 lei și trebuie să returneze în total 1.100 lei în perioada stabilită. Costul este 100 lei, iar intrarea inițială nu îi crește averea cu 1.000: are și obligația de plată. Înainte de acceptare verifică sursa rambursării și termenele, fără să considere aprobarea drept confirmare că își permite creditul.",
      "options": [
        {
          "id": "0",
          "label": "Doar limita maximă."
        },
        {
          "id": "1",
          "label": "Doar cât de repede o poți cheltui."
        },
        {
          "id": "2",
          "label": "Suma necesară și capacitatea de rambursare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-ce-este-creditul",
      "paragraphs": [
        "Mara vrea un produs de 1.000 lei și primește un împrumut care cere 1.100 lei înapoi. Venitul ei viitor nu este încă confirmat. Aplicația îi arată o limită mai mare și o încurajează să o folosească integral. Mara separă suma necesară de suma aprobată și întreabă din ce bani va face plățile la fiecare termen.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Mara împrumută ipotetic 1.000 lei și trebuie să returneze în total 1.100 lei în perioada stabilită. Costul este 100 lei, iar intrarea inițială nu îi crește averea cu 1.000: are și obligația de plată. Înainte de acceptare verifică sursa rambursării și termenele, fără să considere aprobarea drept confirmare că își permite creditul. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce incertitudine are Mara?",
      "explanation": "Venitul viitor pentru rambursare.",
      "correctFeedback": "Corect. Venitul viitor pentru rambursare.",
      "incorrectFeedback": "Nu chiar. Venitul viitor pentru rambursare.",
      "caseId": "caz-ce-este-creditul",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Venitul viitor pentru rambursare."
        },
        {
          "id": "1",
          "label": "Prețul produsului indicat."
        },
        {
          "id": "2",
          "label": "Existența obligației de plată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce sumă totală trebuie returnată în cazul ei?",
      "explanation": "1.100 lei.",
      "correctFeedback": "Corect. 1.100 lei.",
      "incorrectFeedback": "Nu chiar. 1.100 lei.",
      "caseId": "caz-ce-este-creditul",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "100 lei."
        },
        {
          "id": "1",
          "label": "1.100 lei."
        },
        {
          "id": "2",
          "label": "1.000 lei fără alte plăți."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce alternativă poate compara dacă achiziția poate aștepta?",
      "explanation": "Economisirea până la cumpărare.",
      "correctFeedback": "Corect. Economisirea până la cumpărare.",
      "incorrectFeedback": "Nu chiar. Economisirea până la cumpărare.",
      "caseId": "caz-ce-este-creditul",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ignorarea datoriei."
        },
        {
          "id": "1",
          "label": "Folosirea întregii limite."
        },
        {
          "id": "2",
          "label": "Economisirea până la cumpărare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Aprobarea unui împrumut nu garantează că toate lunile viitoare vor fi ușoare. Un venit incert și mai multe datorii pot schimba capacitatea de plată. Nu împrumuta automat limita maximă oferită. Dacă plata unui produs poate fi amânată, compară și economisirea până la achiziție cu obligația de rambursare imediată.",
        "Dacă nu înțelegi o condiție, cere explicații înainte să te obligi. Păstrează contractul și comunicările relevante. Pentru dificultăți de plată, discută din timp cu creditorul și verifică opțiunile documentate. Nu trimite bani unei persoane care promite ștergerea sigură a datoriei fără să explice baza și procedura."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Aprobarea confirmă automat că îți permiți împrumutul?",
      "explanation": "Nu; trebuie verificat bugetul propriu.",
      "correctFeedback": "Corect. Nu; trebuie verificat bugetul propriu.",
      "incorrectFeedback": "Nu chiar. Nu; trebuie verificat bugetul propriu.",
      "type": "scenariu",
      "context": "Mara împrumută ipotetic 1.000 lei și trebuie să returneze în total 1.100 lei în perioada stabilită. Costul este 100 lei, iar intrarea inițială nu îi crește averea cu 1.000: are și obligația de plată. Înainte de acceptare verifică sursa rambursării și termenele, fără să considere aprobarea drept confirmare că își permite creditul.",
      "options": [
        {
          "id": "0",
          "label": "Nu; trebuie verificat bugetul propriu."
        },
        {
          "id": "1",
          "label": "Da, pentru orice venit viitor."
        },
        {
          "id": "2",
          "label": "Da, chiar fără sursă de plată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ai deja alte rate. Cum verifici noua datorie?",
      "explanation": "Împreună cu toate obligațiile din buget.",
      "correctFeedback": "Corect. Împreună cu toate obligațiile din buget.",
      "incorrectFeedback": "Nu chiar. Împreună cu toate obligațiile din buget.",
      "type": "scenariu",
      "context": "Mara împrumută ipotetic 1.000 lei și trebuie să returneze în total 1.100 lei în perioada stabilită. Costul este 100 lei, iar intrarea inițială nu îi crește averea cu 1.000: are și obligația de plată. Înainte de acceptare verifică sursa rambursării și termenele, fără să considere aprobarea drept confirmare că își permite creditul.",
      "options": [
        {
          "id": "0",
          "label": "Izolat de celelalte rate."
        },
        {
          "id": "1",
          "label": "Împreună cu toate obligațiile din buget."
        },
        {
          "id": "2",
          "label": "Doar prin prețul produsului."
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
          "body": "Creditul îți permite să folosești acum o sumă pe care te obligi să o restitui conform unui contract.",
          "detail": "Creditul îți permite să folosești acum o sumă pe care te obligi să o restitui conform unui contract.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Mara împrumută ipotetic 1.000 lei și trebuie să returneze în total 1.100 lei în perioada stabilită. Costul este 100 lei, iar intrarea inițială nu îi crește averea cu 1.000: are și obligația de plată.",
          "detail": "Mara împrumută ipotetic 1.000 lei și trebuie să returneze în total 1.100 lei în perioada stabilită. Costul este 100 lei, iar intrarea inițială nu îi crește averea cu 1.000: are și obligația de plată.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Aprobarea unui împrumut nu garantează că toate lunile viitoare vor fi ușoare.",
          "detail": "Aprobarea unui împrumut nu garantează că toate lunile viitoare vor fi ușoare.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pe hârtie, separă o sumă împrumutată de venitul câștigat și notează obligația de rambursare.",
          "detail": "Pe hârtie, separă o sumă împrumutată de venitul câștigat și notează obligația de rambursare.",
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
