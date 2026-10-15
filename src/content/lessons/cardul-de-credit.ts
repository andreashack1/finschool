import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cardul-de-credit",
  "title": "Cardul de credit",
  "categoryId": "credite-si-datorii",
  "chapterId": "credite-de-zi-cu-zi",
  "slug": "cardul-de-credit",
  "description": "Vlad cumpără de 600 lei cu cardul de credit și primește un extras cu o plată minimă de 60 lei.",
  "objective": "Să poți explica cardul de credit și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Cardul de credit",
      "body": "Vlad cumpără de 600 lei cu cardul de credit și primește un extras cu o plată minimă de 60 lei."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Cardul de credit permite folosirea unei linii de împrumut, spre deosebire de cardul de debit care folosește banii disponibili în cont. Extrasul arată suma utilizată, scadența și plata cerută. Plata minimă nu este neapărat rambursarea integrală. Perioada de grație și dobânda depind de condițiile produsului și de operațiunile făcute.",
        "Înainte de o decizie, pune informațiile esențiale pe aceeași pagină: suma primită, calendarul plăților și costurile cerute. Citește documentele oferite înainte de semnare. O reclamă poate scoate în față numai un avantaj, în timp ce obligațiile tale sunt descrise în contract și în informațiile precontractuale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce folosești cu un card de credit?",
      "explanation": "O linie de împrumut.",
      "correctFeedback": "Corect. O linie de împrumut.",
      "incorrectFeedback": "Nu chiar. O linie de împrumut.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "O linie de împrumut."
        },
        {
          "id": "1",
          "label": "Numai economiile proprii."
        },
        {
          "id": "2",
          "label": "Un venit gratuit."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Plata minimă închide întotdeauna întreaga datorie a cardului.",
      "explanation": "Limita disponibilă nu este venit propriu. Folosirea repetată după plata minimă poate menține datoria și costurile. Unele operațiuni pot avea comisioane ori dobândă diferite. Verifică scadența și definiția rambursării integrale din contract, nu doar mesajul care arată suma minimă. Nu folosi un alt împrumut automat pentru a acoperi plata.",
      "correctFeedback": "Corect. Limita disponibilă nu este venit propriu. Folosirea repetată după plata minimă poate menține datoria și costurile. Unele operațiuni pot avea comisioane ori dobândă diferite. Verifică scadența și definiția rambursării integrale din contract, nu doar mesajul care arată suma minimă. Nu folosi un alt împrumut automat pentru a acoperi plata.",
      "incorrectFeedback": "Nu chiar. Limita disponibilă nu este venit propriu. Folosirea repetată după plata minimă poate menține datoria și costurile. Unele operațiuni pot avea comisioane ori dobândă diferite. Verifică scadența și definiția rambursării integrale din contract, nu doar mesajul care arată suma minimă. Nu folosi un alt împrumut automat pentru a acoperi plata.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Vlad folosește 600 lei din limita cardului și vede pe extras o plată minimă ipotetică de 60 lei. Dacă plătește numai 60, rămâne cel puțin principalul de 540 lei, înainte de eventuale costuri. Verifică suma necesară pentru rambursarea integrală și condițiile grației. Nu presupune că o retragere de numerar are aceleași reguli ca o cumpărătură.",
        "Cifrele sunt ipotetice și servesc comparației din exercițiu. Nu descriu oferta unei instituții. Un buget trebuie să includă și celelalte plăți necesare, nu numai creditul analizat. Compară aceeași sumă și aceeași durată acolo unde este posibil, apoi notează diferențele care împiedică o comparație directă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Din 600 rambursezi 60. Ce principal rămâne înainte de costuri?",
      "explanation": "540 lei.",
      "correctFeedback": "Corect. 540 lei.",
      "incorrectFeedback": "Nu chiar. 540 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "60 lei."
        },
        {
          "id": "1",
          "label": "540 lei."
        },
        {
          "id": "2",
          "label": "Zero lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Vrei să beneficiezi de grație. Ce verifici?",
      "explanation": "Condițiile, operațiunile și suma de rambursat la termen.",
      "correctFeedback": "Corect. Condițiile, operațiunile și suma de rambursat la termen.",
      "incorrectFeedback": "Nu chiar. Condițiile, operațiunile și suma de rambursat la termen.",
      "type": "scenariu",
      "context": "Vlad folosește 600 lei din limita cardului și vede pe extras o plată minimă ipotetică de 60 lei. Dacă plătește numai 60, rămâne cel puțin principalul de 540 lei, înainte de eventuale costuri. Verifică suma necesară pentru rambursarea integrală și condițiile grației. Nu presupune că o retragere de numerar are aceleași reguli ca o cumpărătură.",
      "options": [
        {
          "id": "0",
          "label": "Doar plata minimă."
        },
        {
          "id": "1",
          "label": "Doar limita disponibilă."
        },
        {
          "id": "2",
          "label": "Condițiile, operațiunile și suma de rambursat la termen."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cardul-de-credit",
      "paragraphs": [
        "Vlad cumpără de 600 lei cu cardul de credit și primește un extras cu o plată minimă de 60 lei. Crede inițial că această plată închide datoria. Citește totalul utilizat și data scadentă. Întreabă ce sumă trebuie restituită pentru condițiile grației și verifică separat costurile retragerilor de numerar, înainte să folosească din nou limita.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Vlad folosește 600 lei din limita cardului și vede pe extras o plată minimă ipotetică de 60 lei. Dacă plătește numai 60, rămâne cel puțin principalul de 540 lei, înainte de eventuale costuri. Verifică suma necesară pentru rambursarea integrală și condițiile grației. Nu presupune că o retragere de numerar are aceleași reguli ca o cumpărătură. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce credea greșit Vlad despre cei 60 lei?",
      "explanation": "Că închid întreaga datorie.",
      "correctFeedback": "Corect. Că închid întreaga datorie.",
      "incorrectFeedback": "Nu chiar. Că închid întreaga datorie.",
      "caseId": "caz-cardul-de-credit",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Că închid întreaga datorie."
        },
        {
          "id": "1",
          "label": "Că minimumul elimină necesitatea de a citi suma integrală."
        },
        {
          "id": "2",
          "label": "Că limita rămasă descrie venitul propriu disponibil."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce date caută pentru plata la timp?",
      "explanation": "Scadența și suma relevantă din extras.",
      "correctFeedback": "Corect. Scadența și suma relevantă din extras.",
      "incorrectFeedback": "Nu chiar. Scadența și suma relevantă din extras.",
      "caseId": "caz-cardul-de-credit",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar plata minimă, fără suma necesară pentru condițiile grației."
        },
        {
          "id": "1",
          "label": "Scadența și suma relevantă din extras."
        },
        {
          "id": "2",
          "label": "Doar limita disponibilă, fără datoria din extras."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce verifică separat numerarul?",
      "explanation": "Poate avea alte costuri și reguli de grație.",
      "correctFeedback": "Corect. Poate avea alte costuri și reguli de grație.",
      "incorrectFeedback": "Nu chiar. Poate avea alte costuri și reguli de grație.",
      "caseId": "caz-cardul-de-credit",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Numerarul este întotdeauna gratuit."
        },
        {
          "id": "1",
          "label": "Retragerea șterge datoria."
        },
        {
          "id": "2",
          "label": "Poate avea alte costuri și reguli de grație."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Limita disponibilă nu este venit propriu. Folosirea repetată după plata minimă poate menține datoria și costurile. Unele operațiuni pot avea comisioane ori dobândă diferite. Verifică scadența și definiția rambursării integrale din contract, nu doar mesajul care arată suma minimă. Nu folosi un alt împrumut automat pentru a acoperi plata.",
        "Dacă nu înțelegi o condiție, cere explicații înainte să te obligi. Păstrează contractul și comunicările relevante. Pentru dificultăți de plată, discută din timp cu creditorul și verifică opțiunile documentate. Nu trimite bani unei persoane care promite ștergerea sigură a datoriei fără să explice baza și procedura."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Limita se reface după o plată. Ce înseamnă?",
      "explanation": "Ai din nou acces la împrumut, nu venit nou.",
      "correctFeedback": "Corect. Ai din nou acces la împrumut, nu venit nou.",
      "incorrectFeedback": "Nu chiar. Ai din nou acces la împrumut, nu venit nou.",
      "type": "scenariu",
      "context": "Vlad folosește 600 lei din limita cardului și vede pe extras o plată minimă ipotetică de 60 lei. Dacă plătește numai 60, rămâne cel puțin principalul de 540 lei, înainte de eventuale costuri. Verifică suma necesară pentru rambursarea integrală și condițiile grației. Nu presupune că o retragere de numerar are aceleași reguli ca o cumpărătură.",
      "options": [
        {
          "id": "0",
          "label": "Ai din nou acces la împrumut, nu venit nou."
        },
        {
          "id": "1",
          "label": "Ai câștigat acea sumă."
        },
        {
          "id": "2",
          "label": "Nu mai trebuie urmărit extrasul."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Folosești cardul din nou după plata minimă. Ce urmărești?",
      "explanation": "Soldul datoriei și costurile cumulative.",
      "correctFeedback": "Corect. Soldul datoriei și costurile cumulative.",
      "incorrectFeedback": "Nu chiar. Soldul datoriei și costurile cumulative.",
      "type": "scenariu",
      "context": "Vlad folosește 600 lei din limita cardului și vede pe extras o plată minimă ipotetică de 60 lei. Dacă plătește numai 60, rămâne cel puțin principalul de 540 lei, înainte de eventuale costuri. Verifică suma necesară pentru rambursarea integrală și condițiile grației. Nu presupune că o retragere de numerar are aceleași reguli ca o cumpărătură.",
      "options": [
        {
          "id": "0",
          "label": "Numai numărul de cumpărături."
        },
        {
          "id": "1",
          "label": "Soldul datoriei și costurile cumulative."
        },
        {
          "id": "2",
          "label": "Doar suma maximă aprobată."
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
          "body": "Cardul de credit permite folosirea unei linii de împrumut, spre deosebire de cardul de debit care folosește banii disponibili în cont.",
          "detail": "Vlad utilizează 600 lei și plătește minimumul de 60, dar mai rămân 540 lei principal înainte de costuri. Verifică rambursarea integrală și grația în extras și contract, nu numai minimumul cerut.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Vlad folosește 600 lei din limita cardului și vede pe extras o plată minimă ipotetică de 60 lei. Dacă plătește numai 60, rămâne cel puțin principalul de 540 lei, înainte de eventuale costuri.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Limita disponibilă nu este venit propriu.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pe un extras fictiv, marchează datoria totală, plata minimă și scadența.",
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
