import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cumperi-casa-sau-inchiriezi",
  "title": "Cumperi casă sau închiriezi",
  "categoryId": "pe-cont-propriu",
  "chapterId": "casa-ta",
  "slug": "cumperi-casa-sau-inchiriezi",
  "description": "Ana nu știe dacă va rămâne în oraș după facultate.",
  "objective": "Să poți explica cumperi casă sau închiriezi și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Cumperi casă sau închiriezi",
      "body": "Ana nu știe dacă va rămâne în oraș după facultate."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Cumpărarea și închirierea au costuri, riscuri și flexibilitate diferite. La cumpărare pot exista avans, finanțare, taxe și întreținere. La închiriere contează chiria, garanția și condițiile contractului. Nu compara rata creditului cu chiria ca și cum acestea ar fi toate costurile. Contează și cât timp intenționezi să rămâi în acel loc.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce contează în comparația locuirii?",
      "explanation": "Costul complet și flexibilitatea necesară.",
      "correctFeedback": "Corect. Costul complet și flexibilitatea necesară.",
      "incorrectFeedback": "Nu chiar. Costul complet și flexibilitatea necesară.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Costul complet și flexibilitatea necesară."
        },
        {
          "id": "1",
          "label": "Doar rata creditului."
        },
        {
          "id": "2",
          "label": "Doar preferința prietenilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Chiar dacă rata creditului este mai mică decât chiria, costurile proprietății și o mutare posibilă pot schimba comparația.",
      "explanation": "Rata nu este costul complet. Avansul, întreținerea și flexibilitatea necesară trebuie evaluate alături de plata lunară.",
      "correctFeedback": "Corect. Rata nu este costul complet. Avansul, întreținerea și flexibilitatea necesară trebuie evaluate alături de plata lunară.",
      "incorrectFeedback": "Nu chiar. Rata nu este costul complet. Avansul, întreținerea și flexibilitatea necesară trebuie evaluate alături de plata lunară.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exercițiu, o locuință închiriată are chirie de 1.500 lei. Cumpărarea ar implica rată de 1.400 și o rezervă lunară de 200 pentru costuri ale proprietății, fără alte componente incluse. Totalul parțial al cumpărării este 1.600. Ana mai verifică avansul și costurile inițiale, deoarece rata singură nu descrie accesibilitatea.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Rată 1.400 și rezervă 200. Care este totalul parțial?",
      "explanation": "1.600 lei.",
      "correctFeedback": "Corect. 1.600 lei.",
      "incorrectFeedback": "Nu chiar. 1.600 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "1.400 lei."
        },
        {
          "id": "1",
          "label": "1.600 lei."
        },
        {
          "id": "2",
          "label": "1.200 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Planul de job poate cere mutare. Ce criteriu adaugi?",
      "explanation": "Mobilitatea și timpul de ședere.",
      "correctFeedback": "Corect. Mobilitatea și timpul de ședere.",
      "incorrectFeedback": "Nu chiar. Mobilitatea și timpul de ședere.",
      "type": "scenariu",
      "context": "Într-un exercițiu, o locuință închiriată are chirie de 1.500 lei. Cumpărarea ar implica rată de 1.400 și o rezervă lunară de 200 pentru costuri ale proprietății, fără alte componente incluse. Totalul parțial al cumpărării este 1.600. Ana mai verifică avansul și costurile inițiale, deoarece rata singură nu descrie accesibilitatea.",
      "options": [
        {
          "id": "0",
          "label": "Doar rata mai mică, presupunând revânzare imediată."
        },
        {
          "id": "1",
          "label": "Doar avansul disponibil, fără durata probabilă de ședere."
        },
        {
          "id": "2",
          "label": "Mobilitatea și timpul de ședere."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cumperi-casa-sau-inchiriezi",
      "paragraphs": [
        "Ana nu știe dacă va rămâne în oraș după facultate. Compară o chirie de 1.500 cu o rată de 1.400 și crede inițial că proprietatea costă mai puțin. Adaugă 200 pentru costuri estimate ale proprietății și verifică separat avansul. Mai ia în calcul mutarea posibilă, fără să presupună că ar vinde repede și cu profit.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Într-un exercițiu, o locuință închiriată are chirie de 1.500 lei. Cumpărarea ar implica rată de 1.400 și o rezervă lunară de 200 pentru costuri ale proprietății, fără alte componente incluse. Totalul parțial al cumpărării este 1.600. Ana mai verifică avansul și costurile inițiale, deoarece rata singură nu descrie accesibilitatea. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce incertitudine are Ana?",
      "explanation": "Dacă va rămâne în oraș.",
      "correctFeedback": "Corect. Dacă va rămâne în oraș.",
      "incorrectFeedback": "Nu chiar. Dacă va rămâne în oraș.",
      "caseId": "caz-cumperi-casa-sau-inchiriezi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Dacă va rămâne în oraș."
        },
        {
          "id": "1",
          "label": "Existența chiriei de 1.500."
        },
        {
          "id": "2",
          "label": "Suma rezervei din exemplu."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce cost inițial mai verifică pentru cumpărare?",
      "explanation": "Avansul.",
      "correctFeedback": "Corect. Avansul.",
      "incorrectFeedback": "Nu chiar. Avansul.",
      "caseId": "caz-cumperi-casa-sau-inchiriezi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar rezerva lunară, fără suma necesară la început."
        },
        {
          "id": "1",
          "label": "Avansul."
        },
        {
          "id": "2",
          "label": "Doar prima rată, presupunând că nu există alt cost inițial."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce ipoteză evită despre revânzare?",
      "explanation": "Că va vinde repede și sigur cu profit.",
      "correctFeedback": "Corect. Că va vinde repede și sigur cu profit.",
      "incorrectFeedback": "Nu chiar. Că va vinde repede și sigur cu profit.",
      "caseId": "caz-cumperi-casa-sau-inchiriezi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Că poate exista un cumpărător."
        },
        {
          "id": "1",
          "label": "Că trebuie citit contractul."
        },
        {
          "id": "2",
          "label": "Că va vinde repede și sigur cu profit."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Prețul locuinței și costul finanțării pot evolua; o revânzare profitabilă nu este garantată. Mobilitatea pentru studii ori job poate schimba alegerea. Nu transforma chiria în bani inutili: plătește utilizarea unei locuințe și flexibilitate contractuală. Nici proprietatea nu elimină cheltuielile recurente și riscul unor reparații.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ce primești în schimbul chiriei?",
      "explanation": "Utilizarea locuinței conform contractului.",
      "correctFeedback": "Corect. Utilizarea locuinței conform contractului.",
      "incorrectFeedback": "Nu chiar. Utilizarea locuinței conform contractului.",
      "type": "scenariu",
      "context": "Într-un exercițiu, o locuință închiriată are chirie de 1.500 lei. Cumpărarea ar implica rată de 1.400 și o rezervă lunară de 200 pentru costuri ale proprietății, fără alte componente incluse. Totalul parțial al cumpărării este 1.600. Ana mai verifică avansul și costurile inițiale, deoarece rata singură nu descrie accesibilitatea.",
      "options": [
        {
          "id": "0",
          "label": "Utilizarea locuinței conform contractului."
        },
        {
          "id": "1",
          "label": "Nimic în orice situație."
        },
        {
          "id": "2",
          "label": "Proprietatea automată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ai cumpărat locuința. Ce rămâne în buget?",
      "explanation": "Costuri recurente și posibile reparații.",
      "correctFeedback": "Corect. Costuri recurente și posibile reparații.",
      "incorrectFeedback": "Nu chiar. Costuri recurente și posibile reparații.",
      "type": "scenariu",
      "context": "Într-un exercițiu, o locuință închiriată are chirie de 1.500 lei. Cumpărarea ar implica rată de 1.400 și o rezervă lunară de 200 pentru costuri ale proprietății, fără alte componente incluse. Totalul parțial al cumpărării este 1.600. Ana mai verifică avansul și costurile inițiale, deoarece rata singură nu descrie accesibilitatea.",
      "options": [
        {
          "id": "0",
          "label": "Zero costuri pentru totdeauna."
        },
        {
          "id": "1",
          "label": "Costuri recurente și posibile reparații."
        },
        {
          "id": "2",
          "label": "Doar profit garantat."
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
          "body": "Cumpărarea și închirierea au costuri, riscuri și flexibilitate diferite.",
          "detail": "Rata de 1.400 plus costuri estimate de 200 depășește chiria de 1.500 în comparația parțială. Ana verifică separat avansul și mutarea posibilă, fără să presupună revânzare rapidă cu profit.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Într-un exercițiu, o locuință închiriată are chirie de 1.500 lei. Cumpărarea ar implica rată de 1.400 și o rezervă lunară de 200 pentru costuri ale proprietății, fără alte componente incluse.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Prețul locuinței și costul finanțării pot evolua; o revânzare profitabilă nu este garantată.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Compară într-un tabel costuri inițiale, lunare și flexibilitate pentru două variante fictive de locuire.",
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
