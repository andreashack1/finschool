import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "fomo-si-cheltuieli",
  "title": "FOMO și cheltuieli",
  "categoryId": "de-ce-cheltuim-cum-cheltuim",
  "chapterId": "presiunea-din-jur",
  "slug": "fomo-si-cheltuieli",
  "description": "Mara vede că prietenii postează despre un eveniment și apare un bilet de 150 lei cu un cronometru.",
  "objective": "Să poți explica fomo și cheltuieli și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "FOMO și cheltuieli",
      "body": "Mara vede că prietenii postează despre un eveniment și apare un bilet de 150 lei cu un cronometru."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "FOMO este teama că pierzi o experiență sau o oportunitate pe care ceilalți o au. La cumpărături poate apărea când vezi stoc limitat, cronometre ori postările prietenilor. Urgența percepută nu dovedește utilitatea produsului. Întreabă dacă ai fi vrut aceeași achiziție și fără mesajul că trebuie să decizi imediat.",
        "Un obicei de cheltuire nu definește valoarea unei persoane. Observă contextul, informația disponibilă și alternativa pe care o ai. O pauză scurtă și o întrebare concretă pot face alegerea mai ușor de evaluat. Nu trebuie să elimini orice plăcere pentru a construi un plan de bani util."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce descrie FOMO?",
      "explanation": "Teama de a pierde o experiență sau oportunitate.",
      "correctFeedback": "Corect. Teama de a pierde o experiență sau oportunitate.",
      "incorrectFeedback": "Nu chiar. Teama de a pierde o experiență sau oportunitate.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Teama de a pierde o experiență sau oportunitate."
        },
        {
          "id": "1",
          "label": "O garanție de reducere."
        },
        {
          "id": "2",
          "label": "Un venit nou."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un cronometru promoțional dovedește că achiziția este potrivită bugetului tău.",
      "explanation": "O ofertă poate fi limitată și totuși nepotrivită bugetului tău. Nu trebuie să dovedești că mesajul este fals ca să refuzi. Stabilește criteriul înainte să citești reclama și verifică totalul, inclusiv costurile participării. A rata o cumpărătură nu înseamnă automat a rata o relație sau o experiență echivalentă.",
      "correctFeedback": "Corect. O ofertă poate fi limitată și totuși nepotrivită bugetului tău. Nu trebuie să dovedești că mesajul este fals ca să refuzi. Stabilește criteriul înainte să citești reclama și verifică totalul, inclusiv costurile participării. A rata o cumpărătură nu înseamnă automat a rata o relație sau o experiență echivalentă.",
      "incorrectFeedback": "Nu chiar. O ofertă poate fi limitată și totuși nepotrivită bugetului tău. Nu trebuie să dovedești că mesajul este fals ca să refuzi. Stabilește criteriul înainte să citești reclama și verifică totalul, inclusiv costurile participării. A rata o cumpărătură nu înseamnă automat a rata o relație sau o experiență echivalentă.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Mara vede un bilet de 150 lei cu mesajul ultima șansă. Are 200 disponibili până la următoarea intrare și un transport necesar de 80. După transport rămân 120, cu 30 sub prețul biletului. Poate căuta altă activitate ori alt termen, în loc să trateze presiunea de grup drept venit suplimentar.",
        "Exemplul arată o situație posibilă, nu o reacție obligatorie pentru fiecare om. Folosește cifrele pentru verificarea alegerii și separă ce este confirmat de ce presupui. Poți modifica suma, termenul ori alternativa. Un plan realist arată ce mai rămâne disponibil după decizie, nu doar ce ai cumpărat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Din 200 după transport de 80, cât rămâne?",
      "explanation": "120 lei.",
      "correctFeedback": "Corect. 120 lei.",
      "incorrectFeedback": "Nu chiar. 120 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "280 lei."
        },
        {
          "id": "1",
          "label": "120 lei."
        },
        {
          "id": "2",
          "label": "80 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Biletul este 150 și disponibilul 120. Ce diferență ai?",
      "explanation": "30 lei.",
      "correctFeedback": "Corect. 30 lei.",
      "incorrectFeedback": "Nu chiar. 30 lei.",
      "type": "scenariu",
      "context": "Mara vede un bilet de 150 lei cu mesajul ultima șansă. Are 200 disponibili până la următoarea intrare și un transport necesar de 80. După transport rămân 120, cu 30 sub prețul biletului. Poate căuta altă activitate ori alt termen, în loc să trateze presiunea de grup drept venit suplimentar.",
      "options": [
        {
          "id": "0",
          "label": "50 lei."
        },
        {
          "id": "1",
          "label": "150 lei."
        },
        {
          "id": "2",
          "label": "30 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-fomo-si-cheltuieli",
      "paragraphs": [
        "Mara vede că prietenii postează despre un eveniment și apare un bilet de 150 lei cu un cronometru. Are 200, dar transportul necesar cere 80. Calculează disponibilul de 120 și explică faptul că oferta nu încape acum. Propune o altă întâlnire, fără să transforme mesajul ultima șansă într-un motiv de a ignora plata necesară.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Mara vede un bilet de 150 lei cu mesajul ultima șansă. Are 200 disponibili până la următoarea intrare și un transport necesar de 80. După transport rămân 120, cu 30 sub prețul biletului. Poate căuta altă activitate ori alt termen, în loc să trateze presiunea de grup drept venit suplimentar. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce declanșează presiunea Marei?",
      "explanation": "Postările prietenilor și cronometrul.",
      "correctFeedback": "Corect. Postările prietenilor și cronometrul.",
      "incorrectFeedback": "Nu chiar. Postările prietenilor și cronometrul.",
      "caseId": "caz-fomo-si-cheltuieli",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Postările prietenilor și cronometrul."
        },
        {
          "id": "1",
          "label": "O factură deja plătită."
        },
        {
          "id": "2",
          "label": "Un venit confirmat."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce cost păstrează în plan?",
      "explanation": "Transportul necesar de 80 lei.",
      "correctFeedback": "Corect. Transportul necesar de 80 lei.",
      "incorrectFeedback": "Nu chiar. Transportul necesar de 80 lei.",
      "caseId": "caz-fomo-si-cheltuieli",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar biletul."
        },
        {
          "id": "1",
          "label": "Transportul necesar de 80 lei."
        },
        {
          "id": "2",
          "label": "O donație inventată."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce alternativă propune?",
      "explanation": "O altă întâlnire potrivită resurselor.",
      "correctFeedback": "Corect. O altă întâlnire potrivită resurselor.",
      "incorrectFeedback": "Nu chiar. O altă întâlnire potrivită resurselor.",
      "caseId": "caz-fomo-si-cheltuieli",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ignorarea transportului."
        },
        {
          "id": "1",
          "label": "Un credit automat."
        },
        {
          "id": "2",
          "label": "O altă întâlnire potrivită resurselor."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O ofertă poate fi limitată și totuși nepotrivită bugetului tău. Nu trebuie să dovedești că mesajul este fals ca să refuzi. Stabilește criteriul înainte să citești reclama și verifică totalul, inclusiv costurile participării. A rata o cumpărătură nu înseamnă automat a rata o relație sau o experiență echivalentă.",
        "Dacă ai făcut deja o alegere pe care o regreți, notează ce a declanșat-o și adaptează pasul următor. Rușinea nu completează bugetul. Caută un proces simplu pe care îl poți repeta și verifică efectul în timp. Dacă o problemă persistă și îți afectează viața, cere sprijin potrivit situației."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Oferta chiar expiră. Ce mai contează?",
      "explanation": "Utilitatea și bugetul propriu.",
      "correctFeedback": "Corect. Utilitatea și bugetul propriu.",
      "incorrectFeedback": "Nu chiar. Utilitatea și bugetul propriu.",
      "type": "scenariu",
      "context": "Mara vede un bilet de 150 lei cu mesajul ultima șansă. Are 200 disponibili până la următoarea intrare și un transport necesar de 80. După transport rămân 120, cu 30 sub prețul biletului. Poate căuta altă activitate ori alt termen, în loc să trateze presiunea de grup drept venit suplimentar.",
      "options": [
        {
          "id": "0",
          "label": "Utilitatea și bugetul propriu."
        },
        {
          "id": "1",
          "label": "Numai timpul rămas."
        },
        {
          "id": "2",
          "label": "Doar numărul cumpărătorilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce întrebare poate reduce presiunea?",
      "explanation": "Aș dori asta și fără mesajul de urgență?",
      "correctFeedback": "Corect. Aș dori asta și fără mesajul de urgență?",
      "incorrectFeedback": "Nu chiar. Aș dori asta și fără mesajul de urgență?",
      "type": "scenariu",
      "context": "Mara vede un bilet de 150 lei cu mesajul ultima șansă. Are 200 disponibili până la următoarea intrare și un transport necesar de 80. După transport rămân 120, cu 30 sub prețul biletului. Poate căuta altă activitate ori alt termen, în loc să trateze presiunea de grup drept venit suplimentar.",
      "options": [
        {
          "id": "0",
          "label": "Câți oameni pot copia?"
        },
        {
          "id": "1",
          "label": "Aș dori asta și fără mesajul de urgență?"
        },
        {
          "id": "2",
          "label": "Cum cheltuiesc întreaga limită?"
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
          "body": "FOMO este teama că pierzi o experiență sau o oportunitate pe care ceilalți o au.",
          "detail": "FOMO este teama că pierzi o experiență sau o oportunitate pe care ceilalți o au.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Mara vede un bilet de 150 lei cu mesajul ultima șansă. Are 200 disponibili până la următoarea intrare și un transport necesar de 80.",
          "detail": "Mara vede un bilet de 150 lei cu mesajul ultima șansă. Are 200 disponibili până la următoarea intrare și un transport necesar de 80.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "O ofertă poate fi limitată și totuși nepotrivită bugetului tău.",
          "detail": "O ofertă poate fi limitată și totuși nepotrivită bugetului tău.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Notează o achiziție atrasă de urgență și compar-o cu nevoia și disponibilul real.",
          "detail": "Notează o achiziție atrasă de urgență și compar-o cu nevoia și disponibilul real.",
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
