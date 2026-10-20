import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "asigurari-rca-locuinta-calatorie",
  "title": "Asigurări: RCA, locuință, călătorie",
  "categoryId": "pe-cont-propriu",
  "chapterId": "cumparaturi-mari",
  "slug": "asigurari-rca-locuinta-calatorie",
  "description": "Irina compară două polițe pentru o călătorie.",
  "objective": "Să poți explica asigurări: rca, locuință, călătorie și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "ASF · Ghid RCA",
    "url": "https://asfromania.ro/files/Ghid_RCA.pdf"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Asigurări: RCA, locuință, călătorie",
      "body": "Irina compară două polițe pentru o călătorie."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Asigurarea transferă anumite riscuri în condițiile poliței, în schimbul unei prime. RCA privește răspunderea pentru daune produse altora prin vehicul, în condițiile legale; nu înlocuiește automat o protecție pentru propria mașină. Polițele de locuință și călătorie au alte riscuri. Citește acoperirile, excluderile, limitele și eventualele franșize înainte de cumpărare.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce trebuie citit dincolo de prima de asigurare?",
      "explanation": "Acoperiri, excluderi, limite și franșize.",
      "correctFeedback": "Corect. Acoperiri, excluderi, limite și franșize.",
      "incorrectFeedback": "Nu chiar. Acoperiri, excluderi, limite și franșize.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Acoperiri, excluderi, limite și franșize."
        },
        {
          "id": "1",
          "label": "Doar numele poliței."
        },
        {
          "id": "2",
          "label": "Doar suma maximă afișată, fără riscurile excluse."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Două polițe cu același titlu pot oferi protecție diferită; prețul mai mic nu înlocuiește citirea condițiilor.",
      "explanation": "Polița acoperă riscurile descrise în condițiile sale. Compară acoperiri, excluderi și limite înainte să presupui că protecția este identică.",
      "correctFeedback": "Corect. Polița acoperă riscurile descrise în condițiile sale. Compară acoperiri, excluderi și limite înainte să presupui că protecția este identică.",
      "incorrectFeedback": "Nu chiar. Polița acoperă riscurile descrise în condițiile sale. Compară acoperiri, excluderi și limite înainte să presupui că protecția este identică.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pe o poliță fictivă, un risc este acoperit până la o limită, dar are franșiză de 200 lei. Pentru o daună eligibilă de 1.000 lei, presupunând că nu există alte ajustări, partea suportată de asigurător ar fi 800. Suma reală depinde de condiții și constatare. O primă mai mică poate ascunde o protecție diferită.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Daună eligibilă 1.000, franșiză 200, fără alte ajustări. Ce parte revine asigurătorului?",
      "explanation": "800 lei.",
      "correctFeedback": "Corect. 800 lei.",
      "incorrectFeedback": "Nu chiar. 800 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "1.200 lei."
        },
        {
          "id": "1",
          "label": "800 lei."
        },
        {
          "id": "2",
          "label": "200 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "RCA înlocuiește automat protecția propriei mașini?",
      "explanation": "Nu; acoperă răspunderea față de alții în condițiile legale.",
      "correctFeedback": "Corect. Nu; acoperă răspunderea față de alții în condițiile legale.",
      "incorrectFeedback": "Nu chiar. Nu; acoperă răspunderea față de alții în condițiile legale.",
      "type": "scenariu",
      "context": "Pe o poliță fictivă, un risc este acoperit până la o limită, dar are franșiză de 200 lei. Pentru o daună eligibilă de 1.000 lei, presupunând că nu există alte ajustări, partea suportată de asigurător ar fi 800. Suma reală depinde de condiții și constatare. O primă mai mică poate ascunde o protecție diferită.",
      "options": [
        {
          "id": "0",
          "label": "Da, pentru orice daună proprie."
        },
        {
          "id": "1",
          "label": "Da, inclusiv orice furt."
        },
        {
          "id": "2",
          "label": "Nu; acoperă răspunderea față de alții în condițiile legale."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-asigurari-rca-locuinta-calatorie",
      "paragraphs": [
        "Irina compară două polițe pentru o călătorie. Cea mai ieftină nu explică vizibil activitatea sportivă pe care o planifică. Citește excluderile și procedura de contact. Într-un exemplu separat, o daună eligibilă de 1.000 lei are franșiză de 200. Irina înțelege că prețul poliței nu este singurul criteriu și verifică protecția înainte să plece.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Pe o poliță fictivă, un risc este acoperit până la o limită, dar are franșiză de 200 lei. Pentru o daună eligibilă de 1.000 lei, presupunând că nu există alte ajustări, partea suportată de asigurător ar fi 800. Suma reală depinde de condiții și constatare. O primă mai mică poate ascunde o protecție diferită. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce informație caută Irina pentru călătorie?",
      "explanation": "Dacă activitatea sportivă este acoperită.",
      "correctFeedback": "Corect. Dacă activitatea sportivă este acoperită.",
      "incorrectFeedback": "Nu chiar. Dacă activitatea sportivă este acoperită.",
      "caseId": "caz-asigurari-rca-locuinta-calatorie",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Dacă activitatea sportivă este acoperită."
        },
        {
          "id": "1",
          "label": "Doar țara călătoriei, fără activitățile excluse."
        },
        {
          "id": "2",
          "label": "Doar prima mai mică, fără acoperirea sportului planificat."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce reprezintă franșiza din exercițiu?",
      "explanation": "Partea de 200 suportată conform poliței.",
      "correctFeedback": "Corect. Partea de 200 suportată conform poliței.",
      "incorrectFeedback": "Nu chiar. Partea de 200 suportată conform poliței.",
      "caseId": "caz-asigurari-rca-locuinta-calatorie",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "O sumă adăugată peste despăgubire."
        },
        {
          "id": "1",
          "label": "Partea de 200 suportată conform poliței."
        },
        {
          "id": "2",
          "label": "Întreaga despăgubire datorată, indiferent de valoarea daunei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce nu alege numai prima cea mai mică?",
      "explanation": "Protecția și excluderile pot fi diferite.",
      "correctFeedback": "Corect. Protecția și excluderile pot fi diferite.",
      "incorrectFeedback": "Nu chiar. Protecția și excluderile pot fi diferite.",
      "caseId": "caz-asigurari-rca-locuinta-calatorie",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Prima mai mare garantează acoperirea oricărui incident."
        },
        {
          "id": "1",
          "label": "Același titlu al poliței garantează condiții identice."
        },
        {
          "id": "2",
          "label": "Protecția și excluderile pot fi diferite."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu orice incident este acoperit și nu orice poliță cu același titlu are aceleași condiții. Verifică teritoriul, perioada și procedura de notificare a daunei. La călătorie, activitățile sau afecțiunile relevante pot avea excluderi. Păstrează documentele cerute și contactează canalul indicat în poliță, fără să presupui o rambursare automată.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Apare un incident în călătorie. Ce verifici?",
      "explanation": "Procedura de notificare și documentele cerute.",
      "correctFeedback": "Corect. Procedura de notificare și documentele cerute.",
      "incorrectFeedback": "Nu chiar. Procedura de notificare și documentele cerute.",
      "type": "scenariu",
      "context": "Pe o poliță fictivă, un risc este acoperit până la o limită, dar are franșiză de 200 lei. Pentru o daună eligibilă de 1.000 lei, presupunând că nu există alte ajustări, partea suportată de asigurător ar fi 800. Suma reală depinde de condiții și constatare. O primă mai mică poate ascunde o protecție diferită.",
      "options": [
        {
          "id": "0",
          "label": "Procedura de notificare și documentele cerute."
        },
        {
          "id": "1",
          "label": "Presupui rambursare automată."
        },
        {
          "id": "2",
          "label": "Arunci toate dovezile."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Polița are o perioadă și un teritoriu. Ce verifici?",
      "explanation": "Dacă se potrivesc călătoriei.",
      "correctFeedback": "Corect. Dacă se potrivesc călătoriei.",
      "incorrectFeedback": "Nu chiar. Dacă se potrivesc călătoriei.",
      "type": "scenariu",
      "context": "Pe o poliță fictivă, un risc este acoperit până la o limită, dar are franșiză de 200 lei. Pentru o daună eligibilă de 1.000 lei, presupunând că nu există alte ajustări, partea suportată de asigurător ar fi 800. Suma reală depinde de condiții și constatare. O primă mai mică poate ascunde o protecție diferită.",
      "options": [
        {
          "id": "0",
          "label": "Doar data plății primei, fără perioada asigurată."
        },
        {
          "id": "1",
          "label": "Dacă se potrivesc călătoriei."
        },
        {
          "id": "2",
          "label": "Doar destinația principală, fără restul teritoriului călătoriei."
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
          "body": "Asigurarea acoperă anumite riscuri, în condițiile poliței.",
          "detail": "Irina verifică dacă sportul planificat este acoperit de polița de călătorie. În exemplul cu daună eligibilă de 1.000 și franșiză de 200, partea asigurătorului este 800, sub ipotezele precizate.",
          "type": "normal",
          "detailHighlights": [
            "franșiză"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Verifică franșiza separat de limita despăgubirii.",
          "type": "normal",
          "detail": "Franșiza este partea suportată de tine în condițiile poliței. Limita de despăgubire este un alt element.",
          "detailHighlights": [
            "despăgubire",
            "condițiile"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Titlul poliței nu înseamnă că orice incident este acoperit.",
          "type": "normal",
          "detail": "O activitate exclusă poate rămâne pe cheltuiala ta chiar dacă ai plătit polița.",
          "detailHighlights": [
            "plătit"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Citește un exemplu public de poliță și identifică o limită, o excludere și procedura de notificare.",
          "type": "action",
          "detail": "Caută un risc concret și urmărește-l până la excluderi, limită și pașii de notificare, nu doar titlul poliței.",
          "detailHighlights": [
            "risc"
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
