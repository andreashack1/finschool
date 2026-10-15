import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cum-incepi-cu-sume-mici",
  "title": "Cum începi cu sume mici",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "atentie-la-capcane",
  "slug": "cum-incepi-cu-sume-mici",
  "description": "Irina vrea să înțeleagă investițiile și compară tarife fictive pentru 100 și 500 lei.",
  "objective": "Să poți explica cum începi cu sume mici și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "ASF · Ghidul investitorului",
    "url": "https://asfromania.ro/files/ghidul_investitorului.pdf"
  },
  {
    "label": "ASF · Registrul public",
    "url": "https://data.asfromania.ro/registru/registru.php"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Cum începi cu sume mici",
      "body": "Irina vrea să înțeleagă investițiile și compară tarife fictive pentru 100 și 500 lei."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Începerea cu o sumă mică poate ajuta la învățare, dar nu elimină riscul și costurile. Înainte de bani reali, explică instrumentul, verifică intermediarul și citește tarifele. Separă resursele necesare obligațiilor de suma pe care o poți expune unei pierderi. O simulare poate arăta mecanismul fără să creeze o investiție reală.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici înainte de început?",
      "explanation": "Instrumentul, intermediarul, costurile și resursele disponibile.",
      "correctFeedback": "Corect. Instrumentul, intermediarul, costurile și resursele disponibile.",
      "incorrectFeedback": "Nu chiar. Instrumentul, intermediarul, costurile și resursele disponibile.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Instrumentul, intermediarul, costurile și resursele disponibile."
        },
        {
          "id": "1",
          "label": "Doar suma minimă."
        },
        {
          "id": "2",
          "label": "Numai un influencer."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un comision fix poate conta mai mult ca procent într-o tranzacție mică, chiar dacă suma comisionului rămâne aceeași.",
      "explanation": "Un cost de 5 lei reprezintă 5% din 100 lei și 1% din 500 lei. Procentul mai mic nu justifică automat expunerea unei sume mai mari.",
      "correctFeedback": "Corect. Un cost de 5 lei reprezintă 5% din 100 lei și 1% din 500 lei. Procentul mai mic nu justifică automat expunerea unei sume mai mari.",
      "incorrectFeedback": "Nu chiar. Un cost de 5 lei reprezintă 5% din 100 lei și 1% din 500 lei. Procentul mai mic nu justifică automat expunerea unei sume mai mari.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exercițiu, un comision fix de 5 lei la o tranzacție de 100 reprezintă 5% din sumă, iar la 500 reprezintă 1%. Aceasta nu recomandă o tranzacție mai mare: arată că un cost fix poate conta mult pentru sume mici. Irina compară tarifele și frecvența, fără să mărească suma dincolo de capacitatea ei.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Din cei 100 lei disponibili pentru o tranzacție, costul fix este 5 lei. Ce parte din sumă consumă comisionul înainte de orice evoluție a investiției?",
      "explanation": "Comisionul consumă 5% din sumă. Acest cost trebuie separat de evoluția prețului, care rămâne incertă.",
      "correctFeedback": "Corect. Comisionul consumă 5% din sumă. Acest cost trebuie separat de evoluția prețului, care rămâne incertă.",
      "incorrectFeedback": "Nu chiar. Comisionul consumă 5% din sumă. Acest cost trebuie separat de evoluția prețului, care rămâne incertă.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "1%."
        },
        {
          "id": "1",
          "label": "5%."
        },
        {
          "id": "2",
          "label": "0,5%."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Comision 5 la suma 500. Ce procent reprezintă?",
      "explanation": "1%.",
      "correctFeedback": "Corect. 1%.",
      "incorrectFeedback": "Nu chiar. 1%.",
      "type": "scenariu",
      "context": "Într-un exercițiu, un comision fix de 5 lei la o tranzacție de 100 reprezintă 5% din sumă, iar la 500 reprezintă 1%. Aceasta nu recomandă o tranzacție mai mare: arată că un cost fix poate conta mult pentru sume mici. Irina compară tarifele și frecvența, fără să mărească suma dincolo de capacitatea ei.",
      "options": [
        {
          "id": "0",
          "label": "5%."
        },
        {
          "id": "1",
          "label": "10%."
        },
        {
          "id": "2",
          "label": "1%."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cum-incepi-cu-sume-mici",
      "paragraphs": [
        "Irina vrea să înțeleagă investițiile și compară tarife fictive pentru 100 și 500 lei. Un cost fix de 5 înseamnă 5% și, respectiv, 1%. Nu mărește automat suma pentru procentul mai mic. Verifică instrumentul, intermediarul și obligațiile proprii, apoi folosește o simulare. Nu cere un împrumut și nu intră în contul unei alte persoane pentru a ocoli regulile.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Într-un exercițiu, un comision fix de 5 lei la o tranzacție de 100 reprezintă 5% din sumă, iar la 500 reprezintă 1%. Aceasta nu recomandă o tranzacție mai mare: arată că un cost fix poate conta mult pentru sume mici. Irina compară tarifele și frecvența, fără să mărească suma dincolo de capacitatea ei. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "De ce Irina nu mărește automat suma?",
      "explanation": "Capacitatea de pierdere contează, nu doar procentul costului.",
      "correctFeedback": "Corect. Capacitatea de pierdere contează, nu doar procentul costului.",
      "incorrectFeedback": "Nu chiar. Capacitatea de pierdere contează, nu doar procentul costului.",
      "caseId": "caz-cum-incepi-cu-sume-mici",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Capacitatea de pierdere contează, nu doar procentul costului."
        },
        {
          "id": "1",
          "label": "Costul devine garantat zero."
        },
        {
          "id": "2",
          "label": "Sumele mari nu pot pierde."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce folosește înainte de bani reali?",
      "explanation": "O simulare pentru înțelegerea mecanismului.",
      "correctFeedback": "Corect. O simulare pentru înțelegerea mecanismului.",
      "incorrectFeedback": "Nu chiar. O simulare pentru înțelegerea mecanismului.",
      "caseId": "caz-cum-incepi-cu-sume-mici",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Contul altcuiva."
        },
        {
          "id": "1",
          "label": "O simulare pentru înțelegerea mecanismului."
        },
        {
          "id": "2",
          "label": "Un împrumut automat."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce date verifică despre intermediar?",
      "explanation": "Autorizarea și tarifele relevante.",
      "correctFeedback": "Corect. Autorizarea și tarifele relevante.",
      "incorrectFeedback": "Nu chiar. Autorizarea și tarifele relevante.",
      "caseId": "caz-cum-incepi-cu-sume-mici",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar suma minimă acceptată, fără registrul oficial."
        },
        {
          "id": "1",
          "label": "Doar frecvența tranzacțiilor, fără tarifele aplicabile."
        },
        {
          "id": "2",
          "label": "Autorizarea și tarifele relevante."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu împrumuta bani doar ca să începi și nu cumpăra un produs pe care nu îl poți explica. Verifică și regulile de acces, mai ales pentru minori, fără să folosești contul altcuiva ca scurtătură. Creșterea sumei pentru a reduce procentul comisionului poate crește pierderea posibilă. Poți continua studiul înainte de o decizie reală.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ești minor și serviciul are condiții de acces. Ce faci?",
      "explanation": "Verifici regulile fără a folosi contul altcuiva.",
      "correctFeedback": "Corect. Verifici regulile fără a folosi contul altcuiva.",
      "incorrectFeedback": "Nu chiar. Verifici regulile fără a folosi contul altcuiva.",
      "type": "scenariu",
      "context": "Într-un exercițiu, un comision fix de 5 lei la o tranzacție de 100 reprezintă 5% din sumă, iar la 500 reprezintă 1%. Aceasta nu recomandă o tranzacție mai mare: arată că un cost fix poate conta mult pentru sume mici. Irina compară tarifele și frecvența, fără să mărească suma dincolo de capacitatea ei.",
      "options": [
        {
          "id": "0",
          "label": "Verifici regulile fără a folosi contul altcuiva."
        },
        {
          "id": "1",
          "label": "Ocolești condițiile prin alt cont."
        },
        {
          "id": "2",
          "label": "Trimiți documente false."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Nu poți explica produsul. Ce pas este potrivit?",
      "explanation": "Continui studiul și amâni decizia.",
      "correctFeedback": "Corect. Continui studiul și amâni decizia.",
      "incorrectFeedback": "Nu chiar. Continui studiul și amâni decizia.",
      "type": "scenariu",
      "context": "Într-un exercițiu, un comision fix de 5 lei la o tranzacție de 100 reprezintă 5% din sumă, iar la 500 reprezintă 1%. Aceasta nu recomandă o tranzacție mai mare: arată că un cost fix poate conta mult pentru sume mici. Irina compară tarifele și frecvența, fără să mărească suma dincolo de capacitatea ei.",
      "options": [
        {
          "id": "0",
          "label": "Investești ca să afli."
        },
        {
          "id": "1",
          "label": "Continui studiul și amâni decizia."
        },
        {
          "id": "2",
          "label": "Împrumuți mai mult."
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
          "body": "Începerea cu o sumă mică poate ajuta la învățare, dar nu elimină riscul și costurile.",
          "detail": "Comisionul fix de 5 lei consumă 5% din 100, dar 1% din 500 în exercițiu. Procentul mai mic nu justifică automat expunerea unei sume mai mari decât poți suporta.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Într-un exercițiu, un comision fix de 5 lei la o tranzacție de 100 reprezintă 5% din sumă, iar la 500 reprezintă 1%. Aceasta nu recomandă o tranzacție mai mare: arată că un cost fix poate conta mult pentru sume mici.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Nu împrumuta bani doar ca să începi și nu cumpăra un produs pe care nu îl poți explica.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Calculează ponderea unui cost fix pentru două sume fictive și verifică ce ai mai avea de învățat.",
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
