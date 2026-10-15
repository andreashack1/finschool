import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "dobanda-fixa-vs-variabila",
  "title": "Dobândă fixă vs. variabilă",
  "categoryId": "credite-si-datorii",
  "chapterId": "bazele-creditului",
  "slug": "dobanda-fixa-vs-variabila",
  "description": "Irina compară o ofertă fixă pentru doi ani cu una variabilă.",
  "objective": "Să poți explica dobândă fixă vs. variabilă și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Dobândă fixă vs. variabilă",
      "body": "Irina compară o ofertă fixă pentru doi ani cu una variabilă."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Dobânda fixă rămâne la nivelul stabilit pentru perioada fixă din contract. Dobânda variabilă se modifică potrivit formulei convenite, de obicei cu un indice și o marjă. Nu orice credit este fix pe toată durata. Verifică perioada, formula și calendarul actualizării înainte să folosești rata de azi ca estimare permanentă.",
        "Înainte de o decizie, pune informațiile esențiale pe aceeași pagină: suma primită, calendarul plăților și costurile cerute. Citește documentele oferite înainte de semnare. O reclamă poate scoate în față numai un avantaj, în timp ce obligațiile tale sunt descrise în contract și în informațiile precontractuale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce determină dobânda variabilă?",
      "explanation": "Formula prevăzută în contract.",
      "correctFeedback": "Corect. Formula prevăzută în contract.",
      "incorrectFeedback": "Nu chiar. Formula prevăzută în contract.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Formula prevăzută în contract."
        },
        {
          "id": "1",
          "label": "Nivelul inițial, care ar trebui păstrat indiferent de indice."
        },
        {
          "id": "2",
          "label": "Doar marja, fără indicele inclus în formulă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un credit poate avea doi ani cu dobândă fixă și apoi dobândă variabilă, deci rata de azi nu descrie automat toată durata.",
      "explanation": "Verifică perioada pentru care nivelul este fix. Formula și actualizarea după această perioadă pot schimba estimarea plăților.",
      "correctFeedback": "Corect. Verifică perioada pentru care nivelul este fix. Formula și actualizarea după această perioadă pot schimba estimarea plăților.",
      "incorrectFeedback": "Nu chiar. Verifică perioada pentru care nivelul este fix. Formula și actualizarea după această perioadă pot schimba estimarea plăților.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "O ofertă fictivă are dobândă fixă doi ani, apoi variabilă. Alta folosește de la început formula indice plus marjă de 3 puncte procentuale. Dacă indicele din exercițiu urcă de la 4% la 5%, suma lor urcă de la 7% la 8%. Nu calculăm aici rata nouă, pentru care trebuie și soldul, durata și metoda de rambursare.",
        "Cifrele sunt ipotetice și servesc comparației din exercițiu. Nu descriu oferta unei instituții. Un buget trebuie să includă și celelalte plăți necesare, nu numai creditul analizat. Compară aceeași sumă și aceeași durată acolo unde este posibil, apoi notează diferențele care împiedică o comparație directă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Indice 5% și marjă 3 puncte procentuale. Care este suma?",
      "explanation": "8%.",
      "correctFeedback": "Corect. 8%.",
      "incorrectFeedback": "Nu chiar. 8%.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "15%."
        },
        {
          "id": "1",
          "label": "8%."
        },
        {
          "id": "2",
          "label": "2%."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Oferta spune fix doi ani. Ce ceri?",
      "explanation": "Condițiile și formula după acea perioadă.",
      "correctFeedback": "Corect. Condițiile și formula după acea perioadă.",
      "incorrectFeedback": "Nu chiar. Condițiile și formula după acea perioadă.",
      "type": "scenariu",
      "context": "O ofertă fictivă are dobândă fixă doi ani, apoi variabilă. Alta folosește de la început formula indice plus marjă de 3 puncte procentuale. Dacă indicele din exercițiu urcă de la 4% la 5%, suma lor urcă de la 7% la 8%. Nu calculăm aici rata nouă, pentru care trebuie și soldul, durata și metoda de rambursare.",
      "options": [
        {
          "id": "0",
          "label": "Doar rata primei luni."
        },
        {
          "id": "1",
          "label": "Confirmarea că orice comision dispare."
        },
        {
          "id": "2",
          "label": "Condițiile și formula după acea perioadă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-dobanda-fixa-vs-variabila",
      "paragraphs": [
        "Irina compară o ofertă fixă pentru doi ani cu una variabilă. Reclama primei nu explică vizibil perioada de după cei doi ani. Irina cere formula ulterioară și calendarul actualizării. Pentru cealaltă ofertă vede în exercițiu un indice de 4% și o marjă de 3 puncte procentuale. Simulează o creștere a indicelui, fără să o trateze drept predicție.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: O ofertă fictivă are dobândă fixă doi ani, apoi variabilă. Alta folosește de la început formula indice plus marjă de 3 puncte procentuale. Dacă indicele din exercițiu urcă de la 4% la 5%, suma lor urcă de la 7% la 8%. Nu calculăm aici rata nouă, pentru care trebuie și soldul, durata și metoda de rambursare. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce informație lipsește vizibil din reclama Irinei?",
      "explanation": "Condițiile după perioada fixă.",
      "correctFeedback": "Corect. Condițiile după perioada fixă.",
      "incorrectFeedback": "Nu chiar. Condițiile după perioada fixă.",
      "caseId": "caz-dobanda-fixa-vs-variabila",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Condițiile după perioada fixă."
        },
        {
          "id": "1",
          "label": "Doar rata inițială, considerată valabilă pe toată durata."
        },
        {
          "id": "2",
          "label": "Doar marja ulterioară, fără indice și actualizare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Cu indice 4% și marjă 3 puncte, care este nivelul din exemplu?",
      "explanation": "7%.",
      "correctFeedback": "Corect. 7%.",
      "incorrectFeedback": "Nu chiar. 7%.",
      "caseId": "caz-dobanda-fixa-vs-variabila",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "1%."
        },
        {
          "id": "1",
          "label": "7%."
        },
        {
          "id": "2",
          "label": "12%."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce rol are simularea creșterii?",
      "explanation": "Testează bugetul fără să prezică indicele.",
      "correctFeedback": "Corect. Testează bugetul fără să prezică indicele.",
      "incorrectFeedback": "Nu chiar. Testează bugetul fără să prezică indicele.",
      "caseId": "caz-dobanda-fixa-vs-variabila",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Arată nivelul sigur al indicelui viitor."
        },
        {
          "id": "1",
          "label": "Înlocuiește datele creditului necesare pentru calculul ratei."
        },
        {
          "id": "2",
          "label": "Testează bugetul fără să prezică indicele."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Dobânda variabilă poate urca sau coborî; niciuna dintre direcții nu este garantată. O perioadă fixă nu elimină comisioanele ori riscul de neplată. Testează bugetul într-un scenariu mai dificil și verifică ce se întâmplă la sfârșitul perioadei fixe. Nu considera un indice prezentat într-un exemplu drept valoarea oficială actuală.",
        "Dacă nu înțelegi o condiție, cere explicații înainte să te obligi. Păstrează contractul și comunicările relevante. Pentru dificultăți de plată, discută din timp cu creditorul și verifică opțiunile documentate. Nu trimite bani unei persoane care promite ștergerea sigură a datoriei fără să explice baza și procedura."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Dobânda este fixă. Ce risc rămâne?",
      "explanation": "Dificultatea de a plăti dacă venitul scade.",
      "correctFeedback": "Corect. Dificultatea de a plăti dacă venitul scade.",
      "incorrectFeedback": "Nu chiar. Dificultatea de a plăti dacă venitul scade.",
      "type": "scenariu",
      "context": "O ofertă fictivă are dobândă fixă doi ani, apoi variabilă. Alta folosește de la început formula indice plus marjă de 3 puncte procentuale. Dacă indicele din exercițiu urcă de la 4% la 5%, suma lor urcă de la 7% la 8%. Nu calculăm aici rata nouă, pentru care trebuie și soldul, durata și metoda de rambursare.",
      "options": [
        {
          "id": "0",
          "label": "Dificultatea de a plăti dacă venitul scade."
        },
        {
          "id": "1",
          "label": "Schimbarea automată zilnică a nivelului fix."
        },
        {
          "id": "2",
          "label": "Dispariția tuturor costurilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Poți calcula rata nouă numai din indice plus marjă?",
      "explanation": "Nu; sunt necesare și datele creditului.",
      "correctFeedback": "Corect. Nu; sunt necesare și datele creditului.",
      "incorrectFeedback": "Nu chiar. Nu; sunt necesare și datele creditului.",
      "type": "scenariu",
      "context": "O ofertă fictivă are dobândă fixă doi ani, apoi variabilă. Alta folosește de la început formula indice plus marjă de 3 puncte procentuale. Dacă indicele din exercițiu urcă de la 4% la 5%, suma lor urcă de la 7% la 8%. Nu calculăm aici rata nouă, pentru care trebuie și soldul, durata și metoda de rambursare.",
      "options": [
        {
          "id": "0",
          "label": "Da, indiferent de sold."
        },
        {
          "id": "1",
          "label": "Nu; sunt necesare și datele creditului."
        },
        {
          "id": "2",
          "label": "Da, fără durată."
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
          "body": "Dobânda fixă rămâne la nivelul stabilit pentru perioada fixă din contract.",
          "detail": "O ofertă fixă doi ani poate deveni variabilă după aceea. Cere formula și calendarul ulterior înainte să folosești rata inițială pentru întregul plan de rambursare.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "O ofertă fictivă are dobândă fixă doi ani, apoi variabilă. Alta folosește de la început formula indice plus marjă de 3 puncte procentuale.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Dobânda variabilă poate urca sau coborî; niciuna dintre direcții nu este garantată.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Scrie ce ai verifica la sfârșitul unei perioade de dobândă fixă și testează un buget cu plăți mai mari.",
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
