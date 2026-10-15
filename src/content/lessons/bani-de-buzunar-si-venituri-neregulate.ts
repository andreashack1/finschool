import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "bani-de-buzunar-si-venituri-neregulate",
  "title": "Bani de buzunar și venituri neregulate",
  "categoryId": "economii",
  "chapterId": "bugetul",
  "slug": "bani-de-buzunar-si-venituri-neregulate",
  "description": "Teo primește bani în momente diferite. Media arată bine, dar o factură nu poate fi plătită cu un venit care încă nu a intrat.",
  "objective": "Să poți face un plan simplu când suma primită diferă de la o lună la alta.",
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
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Bani de buzunar și venituri neregulate",
      "body": "Teo primește bani în momente diferite. Media arată bine, dar o factură nu poate fi plătită cu un venit care încă nu a intrat."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Venitul neregulat cere atenție atât la sumă, cât și la moment. O medie poate descrie mai multe luni, dar nu garantează ce intră luna următoare. Începe cu banii disponibili și cu intrările suficient de clare, apoi separă obligațiile apropiate. Nu construi întregul plan pe o promisiune nesigură.",
        "Banii de buzunar, proiectele și bursele pot avea ritmuri diferite. Notează ce este confirmat și ce este estimat. Un scenariu prudent te ajută să vezi cheltuielile de bază și ce trebuie amânat dacă suma este mai mică, fără să transforme fiecare lună într-o surpriză."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici alături de suma venitului?",
      "explanation": "Calendarul intrărilor contează pentru obligații.",
      "correctFeedback": "Corect. Calendarul intrărilor contează pentru obligații.",
      "incorrectFeedback": "Nu chiar. Calendarul intrărilor contează pentru obligații.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Momentul și gradul de confirmare."
        },
        {
          "id": "1",
          "label": "Doar cea mai bună lună."
        },
        {
          "id": "2",
          "label": "Doar media ca plată garantată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Media a trei luni garantează suma următoarei luni.",
      "explanation": "Media descrie trecutul, nu confirmă încasarea viitoare.",
      "correctFeedback": "Corect. Media descrie trecutul, nu confirmă încasarea viitoare.",
      "incorrectFeedback": "Nu chiar. Media descrie trecutul, nu confirmă încasarea viitoare.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu, trei luni aduc 300, 700 și 500 lei. Media este 500 lei, dar luna de 300 nu oferă automat încă 200. Dacă obligațiile apropiate sunt 250 lei, în acea lună rămân 50 înainte de alte alegeri. Calculul folosește suma efectivă, nu media drept încasare.",
        "O lună mai bună poate permite separarea unei rezerve pentru intervale mai slabe. Nu există o sumă obligatorie potrivită tuturor. Compară ce intră, ce este esențial și când apar plățile. O rezervă disponibilă are alt rol decât o promisiune de proiect viitor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Intrările sunt 300, 700 și 500 lei în trei luni. Ce medie folosești pentru context, fără să o tratezi ca venit garantat luna următoare?",
      "explanation": "Media este 500 lei, dar nu completează automat luna de 300. Pentru plăți folosești suma și momentul intrărilor efective.",
      "correctFeedback": "Corect. Media este 500 lei, dar nu completează automat luna de 300. Pentru plăți folosești suma și momentul intrărilor efective.",
      "incorrectFeedback": "Nu chiar. Media este 500 lei, dar nu completează automat luna de 300. Pentru plăți folosești suma și momentul intrărilor efective.",
      "type": "scenariu",
      "context": "Analizezi trei perioade.",
      "options": [
        {
          "id": "0",
          "label": "700 lei."
        },
        {
          "id": "1",
          "label": "500 lei."
        },
        {
          "id": "2",
          "label": "300 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ai 300 lei și obligații 250. Cât rămâne?",
      "explanation": "300 − 250 = 50 lei efectivi.",
      "correctFeedback": "Corect. 300 − 250 = 50 lei efectivi.",
      "incorrectFeedback": "Nu chiar. 300 − 250 = 50 lei efectivi.",
      "type": "scenariu",
      "context": "Nu ai alte intrări confirmate.",
      "options": [
        {
          "id": "0",
          "label": "250 lei."
        },
        {
          "id": "1",
          "label": "200 lei."
        },
        {
          "id": "2",
          "label": "50 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-bani-de-buzunar-si-venituri-neregulate",
      "paragraphs": [
        "Teo primește bani de buzunar și plăți pentru proiecte mici. În trei luni are intrări de 300, 700 și 500 lei. Media este 500 lei, dar în prima lună trebuie să plătească 250 lei pentru costuri deja stabilite. El vede că rămân numai 50 lei în acea perioadă, nu suma sugerată de media generală.",
        "În luna de 700 lei, Teo verifică obligațiile următoare și separă o parte pentru un interval cu venit mai mic. Nu activează un abonament doar fiindcă luna este bună. Un proiect viitor este încă neconfirmat, așa că nu îl tratează ca bani disponibili. Pentru o ieșire își alege un plan flexibil, fără să promită o sumă pe care nu o are. Folosește media pentru context și calendarul pentru plățile concrete. Astfel planul rămâne adaptabil, fără o recomandare personalizată de sumă sau proporție."
      ]
    },
    {
      "id": "q5",
      "question": "De ce Teo nu cheltuiește după media de 500 în prima lună?",
      "explanation": "Contextul statistic nu înlocuiește banii disponibili.",
      "correctFeedback": "Corect. Contextul statistic nu înlocuiește banii disponibili.",
      "incorrectFeedback": "Nu chiar. Contextul statistic nu înlocuiește banii disponibili.",
      "caseId": "caz-bani-de-buzunar-si-venituri-neregulate",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "A primit efectiv 300 lei."
        },
        {
          "id": "1",
          "label": "Media este întotdeauna inutilă."
        },
        {
          "id": "2",
          "label": "Obligațiile dispar la calculul mediei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce poate verifica într-o lună mai bună?",
      "explanation": "Separarea resurselor poate crește flexibilitatea.",
      "correctFeedback": "Corect. Separarea resurselor poate crește flexibilitatea.",
      "incorrectFeedback": "Nu chiar. Separarea resurselor poate crește flexibilitatea.",
      "caseId": "caz-bani-de-buzunar-si-venituri-neregulate",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Cheltuieli fixe presupuse permanente."
        },
        {
          "id": "1",
          "label": "O rezervă pentru obligații din intervale mai slabe."
        },
        {
          "id": "2",
          "label": "Orice proiect neconfirmat ca venit sigur."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce analizează abonamentul cu atenție?",
      "explanation": "Un cost recurent cere un scenariu sustenabil.",
      "correctFeedback": "Corect. Un cost recurent cere un scenariu sustenabil.",
      "incorrectFeedback": "Nu chiar. Un cost recurent cere un scenariu sustenabil.",
      "caseId": "caz-bani-de-buzunar-si-venituri-neregulate",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Orice abonament este o fraudă."
        },
        {
          "id": "1",
          "label": "Luna bună durează automat tot anul."
        },
        {
          "id": "2",
          "label": "Costul se repetă și în lunile cu intrări mici."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Evită transformarea unei luni excepționale într-un nivel permanent de cheltuieli. Un abonament nou se repetă și în lunile fără proiect. Înainte de un cost fix, verifică dacă poate fi susținut într-un scenariu mai modest. Flexibilitatea cheltuielilor poate fi utilă când intrările variază.",
        "Dacă planul nu ajunge, identifică din timp diferența și discută obligațiile ori adaptează alegerile disponibile. Nu presupune că orice venit viitor se va întâmpla exact la termen. Planificarea neregulată înseamnă să ai scenarii și priorități, nu să ghicești perfect fiecare lună sau să renunți automat la toate dorințele."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un proiect este promis, dar neconfirmat. Cum îl tratezi?",
      "explanation": "Gradul de certitudine trebuie păstrat în plan.",
      "correctFeedback": "Corect. Gradul de certitudine trebuie păstrat în plan.",
      "incorrectFeedback": "Nu chiar. Gradul de certitudine trebuie păstrat în plan.",
      "type": "scenariu",
      "context": "Factura apropiată are termen clar.",
      "options": [
        {
          "id": "0",
          "label": "Ca estimare, separat de banii disponibili."
        },
        {
          "id": "1",
          "label": "Ca sold deja primit."
        },
        {
          "id": "2",
          "label": "Ca venit dublu."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Planul unei ieșiri depinde de un venit incert. Ce alegere ajută?",
      "explanation": "Flexibilitatea gestionează variația.",
      "correctFeedback": "Corect. Flexibilitatea gestionează variația.",
      "incorrectFeedback": "Nu chiar. Flexibilitatea gestionează variația.",
      "type": "scenariu",
      "context": "Nu știi încă suma primită.",
      "options": [
        {
          "id": "0",
          "label": "O obligație mare fără verificare."
        },
        {
          "id": "1",
          "label": "O variantă flexibilă care poate fi adaptată."
        },
        {
          "id": "2",
          "label": "Promisiunea că media rezolvă orice."
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
          "title": "Moment",
          "body": "Suma și calendarul se verifică împreună.",
          "detail": "Media de 500 lei nu adaugă automat 200 lei în luna cu intrări de 300 lei. Pentru fiecare scadență, verifică banii efectiv disponibili și ce venit este confirmat înainte de termen.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Medie",
          "body": "Nu este o încasare garantată.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Flexibilitate",
          "body": "Compară costurile fixe cu luni mai slabe.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Scrie două scenarii de venit pentru luna următoare și ce obligații rămân în ambele.",
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
