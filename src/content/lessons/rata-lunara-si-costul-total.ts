import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "rata-lunara-si-costul-total",
  "title": "Rata lunară și costul total",
  "categoryId": "credite-si-datorii",
  "chapterId": "bazele-creditului",
  "slug": "rata-lunara-si-costul-total",
  "description": "Teo poate alege între două calendare pentru aceeași sumă împrumutată: 12 rate de 100 lei sau 24 de 60 lei.",
  "objective": "Să poți explica rata lunară și costul total și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Rata lunară și costul total",
      "body": "Teo poate alege între două calendare pentru aceeași sumă împrumutată: 12 rate de 100 lei sau 24 de 60 lei."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Rata lunară este plata periodică, iar totalul de plată privește toate sumele datorate în scenariul stabilit. O rată mică poate rezulta dintr-o perioadă mai lungă, fără să însemne un credit mai ieftin. Verifică numărul ratelor și costurile separate. Pentru buget contează plata lunară; pentru comparație contează și suma cumulată.",
        "Înainte de o decizie, pune informațiile esențiale pe aceeași pagină: suma primită, calendarul plăților și costurile cerute. Citește documentele oferite înainte de semnare. O reclamă poate scoate în față numai un avantaj, în timp ce obligațiile tale sunt descrise în contract și în informațiile precontractuale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce măsoară rata lunară?",
      "explanation": "Plata periodică, nu întregul cost.",
      "correctFeedback": "Corect. Plata periodică, nu întregul cost.",
      "incorrectFeedback": "Nu chiar. Plata periodică, nu întregul cost.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Plata periodică, nu întregul cost."
        },
        {
          "id": "1",
          "label": "Toate plățile cumulate automat."
        },
        {
          "id": "2",
          "label": "Doar suma primită inițial."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Cea mai mică rată lunară garantează cel mai mic total de plată.",
      "explanation": "Nu compara numai rata atunci când există o plată finală mare sau comisioane separate. Un calendar incomplet poate ascunde o obligație importantă. Verifică dacă totalul prezentat presupune dobândă variabilă și ce ipoteze folosește. Faptul că rata încape într-o lună bună nu garantează că va încăpea în fiecare lună a contractului.",
      "correctFeedback": "Corect. Nu compara numai rata atunci când există o plată finală mare sau comisioane separate. Un calendar incomplet poate ascunde o obligație importantă. Verifică dacă totalul prezentat presupune dobândă variabilă și ce ipoteze folosește. Faptul că rata încape într-o lună bună nu garantează că va încăpea în fiecare lună a contractului.",
      "incorrectFeedback": "Nu chiar. Nu compara numai rata atunci când există o plată finală mare sau comisioane separate. Un calendar incomplet poate ascunde o obligație importantă. Verifică dacă totalul prezentat presupune dobândă variabilă și ce ipoteze folosește. Faptul că rata încape într-o lună bună nu garantează că va încăpea în fiecare lună a contractului.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pentru același împrumut fictiv, oferta A cere 12 plăți de 100 lei, iar B cere 24 de 60 lei, fără alte costuri în exercițiu. Totalurile sunt 1.200 și 1.440 lei. B reduce presiunea lunară cu 40 lei, dar cere cu 240 lei mai mult în total. Cele două criterii răspund unor întrebări diferite.",
        "Cifrele sunt ipotetice și servesc comparației din exercițiu. Nu descriu oferta unei instituții. Un buget trebuie să includă și celelalte plăți necesare, nu numai creditul analizat. Compară aceeași sumă și aceeași durată acolo unde este posibil, apoi notează diferențele care împiedică o comparație directă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cât înseamnă 24 de rate de 60 lei?",
      "explanation": "1.440 lei.",
      "correctFeedback": "Corect. 1.440 lei.",
      "incorrectFeedback": "Nu chiar. 1.440 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "1.200 lei."
        },
        {
          "id": "1",
          "label": "1.440 lei."
        },
        {
          "id": "2",
          "label": "840 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Care este diferența dintre totalurile A și B?",
      "explanation": "240 lei.",
      "correctFeedback": "Corect. 240 lei.",
      "incorrectFeedback": "Nu chiar. 240 lei.",
      "type": "scenariu",
      "context": "Pentru același împrumut fictiv, oferta A cere 12 plăți de 100 lei, iar B cere 24 de 60 lei, fără alte costuri în exercițiu. Totalurile sunt 1.200 și 1.440 lei. B reduce presiunea lunară cu 40 lei, dar cere cu 240 lei mai mult în total. Cele două criterii răspund unor întrebări diferite.",
      "options": [
        {
          "id": "0",
          "label": "40 lei."
        },
        {
          "id": "1",
          "label": "600 lei."
        },
        {
          "id": "2",
          "label": "240 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-rata-lunara-si-costul-total",
      "paragraphs": [
        "Teo poate alege între două calendare pentru aceeași sumă împrumutată: 12 rate de 100 lei sau 24 de 60 lei. Nu există alte costuri în acest exercițiu. Prietenul lui recomandă imediat rata mai mică. Teo calculează totalurile și le compară cu bugetul lunar, apoi caută în documente dacă există vreo plată finală nemenționată în reclamă.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Pentru același împrumut fictiv, oferta A cere 12 plăți de 100 lei, iar B cere 24 de 60 lei, fără alte costuri în exercițiu. Totalurile sunt 1.200 și 1.440 lei. B reduce presiunea lunară cu 40 lei, dar cere cu 240 lei mai mult în total. Cele două criterii răspund unor întrebări diferite. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Care ofertă are rata lunară mai mică?",
      "explanation": "B, cu 60 lei.",
      "correctFeedback": "Corect. B, cu 60 lei.",
      "incorrectFeedback": "Nu chiar. B, cu 60 lei.",
      "caseId": "caz-rata-lunara-si-costul-total",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "B, cu 60 lei."
        },
        {
          "id": "1",
          "label": "A, cu 100 lei."
        },
        {
          "id": "2",
          "label": "Au rate identice."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Care ofertă are totalul mai mic în exercițiu?",
      "explanation": "A, cu 1.200 lei.",
      "correctFeedback": "Corect. A, cu 1.200 lei.",
      "incorrectFeedback": "Nu chiar. A, cu 1.200 lei.",
      "caseId": "caz-rata-lunara-si-costul-total",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "B, cu 1.440 lei."
        },
        {
          "id": "1",
          "label": "A, cu 1.200 lei."
        },
        {
          "id": "2",
          "label": "Nu există date pentru total."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce verificare face Teo dincolo de reclamă?",
      "explanation": "Existența unor plăți finale sau costuri separate.",
      "correctFeedback": "Corect. Existența unor plăți finale sau costuri separate.",
      "incorrectFeedback": "Nu chiar. Existența unor plăți finale sau costuri separate.",
      "caseId": "caz-rata-lunara-si-costul-total",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar fontul ratei."
        },
        {
          "id": "1",
          "label": "Doar numărul de reclame."
        },
        {
          "id": "2",
          "label": "Existența unor plăți finale sau costuri separate."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu compara numai rata atunci când există o plată finală mare sau comisioane separate. Un calendar incomplet poate ascunde o obligație importantă. Verifică dacă totalul prezentat presupune dobândă variabilă și ce ipoteze folosește. Faptul că rata încape într-o lună bună nu garantează că va încăpea în fiecare lună a contractului.",
        "Dacă nu înțelegi o condiție, cere explicații înainte să te obligi. Păstrează contractul și comunicările relevante. Pentru dificultăți de plată, discută din timp cu creditorul și verifică opțiunile documentate. Nu trimite bani unei persoane care promite ștergerea sigură a datoriei fără să explice baza și procedura."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Bugetul suportă rata doar într-o lună cu bonus. Ce verifici?",
      "explanation": "Lunile fără bonus și celelalte obligații.",
      "correctFeedback": "Corect. Lunile fără bonus și celelalte obligații.",
      "incorrectFeedback": "Nu chiar. Lunile fără bonus și celelalte obligații.",
      "type": "scenariu",
      "context": "Pentru același împrumut fictiv, oferta A cere 12 plăți de 100 lei, iar B cere 24 de 60 lei, fără alte costuri în exercițiu. Totalurile sunt 1.200 și 1.440 lei. B reduce presiunea lunară cu 40 lei, dar cere cu 240 lei mai mult în total. Cele două criterii răspund unor întrebări diferite.",
      "options": [
        {
          "id": "0",
          "label": "Lunile fără bonus și celelalte obligații."
        },
        {
          "id": "1",
          "label": "Presupui bonusul permanent."
        },
        {
          "id": "2",
          "label": "Ignori durata."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un calendar are o plată finală mare. Cum o tratezi?",
      "explanation": "O incluzi în total și în planul de plată.",
      "correctFeedback": "Corect. O incluzi în total și în planul de plată.",
      "incorrectFeedback": "Nu chiar. O incluzi în total și în planul de plată.",
      "type": "scenariu",
      "context": "Pentru același împrumut fictiv, oferta A cere 12 plăți de 100 lei, iar B cere 24 de 60 lei, fără alte costuri în exercițiu. Totalurile sunt 1.200 și 1.440 lei. B reduce presiunea lunară cu 40 lei, dar cere cu 240 lei mai mult în total. Cele două criterii răspund unor întrebări diferite.",
      "options": [
        {
          "id": "0",
          "label": "O ștergi pentru că nu este lunară."
        },
        {
          "id": "1",
          "label": "O incluzi în total și în planul de plată."
        },
        {
          "id": "2",
          "label": "O consideri venit viitor."
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
          "body": "Rata lunară este plata periodică, iar totalul de plată privește toate sumele datorate în scenariul stabilit.",
          "detail": "Rata lunară este plata periodică, iar totalul de plată privește toate sumele datorate în scenariul stabilit.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Pentru același împrumut fictiv, oferta A cere 12 plăți de 100 lei, iar B cere 24 de 60 lei, fără alte costuri în exercițiu. Totalurile sunt 1.200 și 1.440 lei.",
          "detail": "Pentru același împrumut fictiv, oferta A cere 12 plăți de 100 lei, iar B cere 24 de 60 lei, fără alte costuri în exercițiu. Totalurile sunt 1.200 și 1.440 lei.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Nu compara numai rata atunci când există o plată finală mare sau comisioane separate.",
          "detail": "Nu compara numai rata atunci când există o plată finală mare sau comisioane separate.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Calculează totalul ratelor din exemplu și explică diferența față de rata lunară.",
          "detail": "Calculează totalul ratelor din exemplu și explică diferența față de rata lunară.",
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
