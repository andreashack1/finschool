import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "plata-in-rate-si-cumpara-acum-plateste-mai-tarziu",
  "title": "Plata în rate și „cumpără acum, plătește mai târziu”",
  "categoryId": "credite-si-datorii",
  "chapterId": "credite-de-zi-cu-zi",
  "slug": "plata-in-rate-si-cumpara-acum-plateste-mai-tarziu",
  "description": "Eva vede o tranșă de 90 lei pentru o pereche de căști și o consideră mică.",
  "objective": "Să poți explica plata în rate și „cumpără acum, plătește mai târziu” și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Plata în rate și „cumpără acum, plătește mai târziu”",
      "body": "Eva vede o tranșă de 90 lei pentru o pereche de căști și o consideră mică."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Împărțirea unui preț în plăți viitoare schimbă calendarul, nu elimină obligația. Verifică cine oferă finanțarea, costurile și consecințele întârzierii. Chiar când oferta are dobândă zero în anumite condiții, mai multe cumpărături pot crea plăți simultane. Prețul mic al unei tranșe poate face mai greu de văzut totalul angajat.",
        "Înainte de o decizie, pune informațiile esențiale pe aceeași pagină: suma primită, calendarul plăților și costurile cerute. Citește documentele oferite înainte de semnare. O reclamă poate scoate în față numai un avantaj, în timp ce obligațiile tale sunt descrise în contract și în informațiile precontractuale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce schimbă plata în tranșe?",
      "explanation": "Calendarul plăților.",
      "correctFeedback": "Corect. Calendarul plăților.",
      "incorrectFeedback": "Nu chiar. Calendarul plăților.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Calendarul plăților."
        },
        {
          "id": "1",
          "label": "Existența prețului."
        },
        {
          "id": "2",
          "label": "Transformă produsul într-un cadou."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O ofertă cu dobândă zero poate cere totuși verificarea scadențelor și a costurilor întârzierii.",
      "explanation": "Condiția de dobândă zero privește scenariul descris în ofertă. Nu elimină obligația de plată sau urmările unei întârzieri.",
      "correctFeedback": "Corect. Condiția de dobândă zero privește scenariul descris în ofertă. Nu elimină obligația de plată sau urmările unei întârzieri.",
      "incorrectFeedback": "Nu chiar. Condiția de dobândă zero privește scenariul descris în ofertă. Nu elimină obligația de plată sau urmările unei întârzieri.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Eva are trei achiziții cu plăți lunare de 100, 80 și 70 lei. Împreună cer 250 lei pe lună în perioada de suprapunere. O achiziție nouă de 90 lei ar ridica suma la 340. Ea notează și datele fiecărei scadențe, pentru că venitul intră într-o altă zi decât unele plăți.",
        "Cifrele sunt ipotetice și servesc comparației din exercițiu. Nu descriu oferta unei instituții. Un buget trebuie să includă și celelalte plăți necesare, nu numai creditul analizat. Compară aceeași sumă și aceeași durată acolo unde este posibil, apoi notează diferențele care împiedică o comparație directă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Eva are plăți lunare de 100, 80 și 70 lei. O nouă tranșă de 90 lei se suprapune cu ele. Ce sumă trebuie să acopere bugetul în lunile comune?",
      "explanation": "În lunile de suprapunere, obligațiile însumează 340 lei. Evaluarea noii tranșe separat de cele vechi ar subestima presiunea asupra bugetului.",
      "correctFeedback": "Corect. În lunile de suprapunere, obligațiile însumează 340 lei. Evaluarea noii tranșe separat de cele vechi ar subestima presiunea asupra bugetului.",
      "incorrectFeedback": "Nu chiar. În lunile de suprapunere, obligațiile însumează 340 lei. Evaluarea noii tranșe separat de cele vechi ar subestima presiunea asupra bugetului.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "250 lei."
        },
        {
          "id": "1",
          "label": "340 lei."
        },
        {
          "id": "2",
          "label": "190 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ai mai multe cumpărături în rate. Ce construiești?",
      "explanation": "Un calendar comun al sumelor și scadențelor.",
      "correctFeedback": "Corect. Un calendar comun al sumelor și scadențelor.",
      "incorrectFeedback": "Nu chiar. Un calendar comun al sumelor și scadențelor.",
      "type": "scenariu",
      "context": "Eva are trei achiziții cu plăți lunare de 100, 80 și 70 lei. Împreună cer 250 lei pe lună în perioada de suprapunere. O achiziție nouă de 90 lei ar ridica suma la 340. Ea notează și datele fiecărei scadențe, pentru că venitul intră într-o altă zi decât unele plăți.",
      "options": [
        {
          "id": "0",
          "label": "Doar o listă cu prima tranșă."
        },
        {
          "id": "1",
          "label": "Doar totalul limitelor aprobate."
        },
        {
          "id": "2",
          "label": "Un calendar comun al sumelor și scadențelor."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-plata-in-rate-si-cumpara-acum-plateste-mai-tarziu",
      "paragraphs": [
        "Eva vede o tranșă de 90 lei pentru o pereche de căști și o consideră mică. Are deja trei cumpărături cu plăți de 100, 80 și 70 lei în aceleași luni. Face un calendar comun și observă că noua obligație ar duce plățile la 340 lei. Verifică regulile de întârziere și ce se întâmplă dacă returnează produsul.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Eva are trei achiziții cu plăți lunare de 100, 80 și 70 lei. Împreună cer 250 lei pe lună în perioada de suprapunere. O achiziție nouă de 90 lei ar ridica suma la 340. Ea notează și datele fiecărei scadențe, pentru că venitul intră într-o altă zi decât unele plăți. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce nu vede Eva dacă privește doar cei 90 lei?",
      "explanation": "Suprapunerea cu celelalte plăți.",
      "correctFeedback": "Corect. Suprapunerea cu celelalte plăți.",
      "incorrectFeedback": "Nu chiar. Suprapunerea cu celelalte plăți.",
      "caseId": "caz-plata-in-rate-si-cumpara-acum-plateste-mai-tarziu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Suprapunerea cu celelalte plăți."
        },
        {
          "id": "1",
          "label": "Prețul unei singure tranșe."
        },
        {
          "id": "2",
          "label": "Doar costul primei luni, presupunând că celelalte rate se termină imediat."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Cât plătește înainte de noua cumpărătură în lunile comune?",
      "explanation": "250 lei.",
      "correctFeedback": "Corect. 250 lei.",
      "incorrectFeedback": "Nu chiar. 250 lei.",
      "caseId": "caz-plata-in-rate-si-cumpara-acum-plateste-mai-tarziu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "340 lei."
        },
        {
          "id": "1",
          "label": "250 lei."
        },
        {
          "id": "2",
          "label": "70 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce verifică pentru o eventuală returnare?",
      "explanation": "Procedura și confirmarea ajustării finanțării.",
      "correctFeedback": "Corect. Procedura și confirmarea ajustării finanțării.",
      "incorrectFeedback": "Nu chiar. Procedura și confirmarea ajustării finanțării.",
      "caseId": "caz-plata-in-rate-si-cumpara-acum-plateste-mai-tarziu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Presupune anularea instant."
        },
        {
          "id": "1",
          "label": "Șterge doar mesajul scadenței."
        },
        {
          "id": "2",
          "label": "Procedura și confirmarea ajustării finanțării."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O returnare a produsului nu trebuie presupusă ca anulare imediată a fiecărei plăți. Verifică procedura comerciantului și a finanțatorului, păstrând confirmările. Dobânda zero nu înseamnă că poți întârzia fără urmări. Citește comisioanele și termenele înainte să accepți, mai ales când butonul de plată prezintă doar prima tranșă.",
        "Dacă nu înțelegi o condiție, cere explicații înainte să te obligi. Păstrează contractul și comunicările relevante. Pentru dificultăți de plată, discută din timp cu creditorul și verifică opțiunile documentate. Nu trimite bani unei persoane care promite ștergerea sigură a datoriei fără să explice baza și procedura."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Oferta are dobândă zero la plata la timp. Ce citești suplimentar?",
      "explanation": "Costurile și consecințele întârzierii.",
      "correctFeedback": "Corect. Costurile și consecințele întârzierii.",
      "incorrectFeedback": "Nu chiar. Costurile și consecințele întârzierii.",
      "type": "scenariu",
      "context": "Eva are trei achiziții cu plăți lunare de 100, 80 și 70 lei. Împreună cer 250 lei pe lună în perioada de suprapunere. O achiziție nouă de 90 lei ar ridica suma la 340. Ea notează și datele fiecărei scadențe, pentru că venitul intră într-o altă zi decât unele plăți.",
      "options": [
        {
          "id": "0",
          "label": "Costurile și consecințele întârzierii."
        },
        {
          "id": "1",
          "label": "Numai fotografia produsului."
        },
        {
          "id": "2",
          "label": "Doar opinia unui influencer."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Venitul intră după o scadență. Ce problemă verifici?",
      "explanation": "Disponibilitatea banilor la data plății.",
      "correctFeedback": "Corect. Disponibilitatea banilor la data plății.",
      "incorrectFeedback": "Nu chiar. Disponibilitatea banilor la data plății.",
      "type": "scenariu",
      "context": "Eva are trei achiziții cu plăți lunare de 100, 80 și 70 lei. Împreună cer 250 lei pe lună în perioada de suprapunere. O achiziție nouă de 90 lei ar ridica suma la 340. Ea notează și datele fiecărei scadențe, pentru că venitul intră într-o altă zi decât unele plăți.",
      "options": [
        {
          "id": "0",
          "label": "Doar totalul anual."
        },
        {
          "id": "1",
          "label": "Disponibilitatea banilor la data plății."
        },
        {
          "id": "2",
          "label": "Doar numărul de rate."
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
          "body": "Ratele împart plata, fără să elimine costul cumpărăturii.",
          "detail": "Noua tranșă de 90 lei se suprapune cu plăți de 100, 80 și 70 lei. Eva trebuie să acopere 340 lei în lunile comune și să verifice dacă are banii la fiecare scadență.",
          "type": "normal",
          "detailHighlights": [
            "scadență",
            "banii"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Adună tranșele tuturor cumpărăturilor din aceeași lună.",
          "type": "normal",
          "detail": "Mai multe rate mici se pot suprapune în aceeași lună. Verifică totalul lor cu obligațiile existente.",
          "detailHighlights": [
            "obligațiile",
            "totalul"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Verifică taxele și ce se întâmplă la întârziere.",
          "type": "normal",
          "detail": "«Fără dobândă» nu spune singur ce se întâmplă la întârziere sau ce alte costuri există.",
          "detailHighlights": [
            "dobândă",
            "costuri"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pune trei obligații fictive într-un calendar și calculează plățile lunilor în care se suprapun.",
          "type": "action",
          "detail": "Așază toate tranșele pe calendar și compară totalul cu plata integrală, fără să ignori taxele sau condițiile.",
          "detailHighlights": [
            "condițiile",
            "totalul"
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
