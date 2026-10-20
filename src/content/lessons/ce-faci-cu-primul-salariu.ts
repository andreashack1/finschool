import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "ce-faci-cu-primul-salariu",
  "title": "Ce faci cu primul salariu",
  "categoryId": "primul-job",
  "chapterId": "taxele",
  "slug": "ce-faci-cu-primul-salariu",
  "description": "Radu primește 3.000 lei net și vrea să își cumpere un telefon de 1.500 lei pentru a sărbători.",
  "objective": "Să poți explica ce faci cu primul salariu și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "Inspecția Muncii · Codul muncii",
    "url": "https://inprobe.inspectiamuncii.ro/informatii-utile/codul-muncii/"
  },
  {
    "label": "ANAF · Codul fiscal",
    "url": "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Ce faci cu primul salariu",
      "body": "Radu primește 3.000 lei net și vrea să își cumpere un telefon de 1.500 lei pentru a sărbători."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Primul salariu poate susține obligații, o rezervă și alegeri care îți fac plăcere. Începe cu suma netă efectiv primită și cu perioada până la următoarea plată. Separă costurile necesare de cumpărăturile dorite. Un plan bun nu cere aceeași împărțire pentru toată lumea; contează resursele și obligațiile tale.",
        "La primul job, separă promisiunea verbală de informația scrisă. Păstrează documentele primite și cere explicații despre termenii pe care nu îi înțelegi. O discuție clară înainte de începere ajută atât planul de bani, cât și organizarea timpului. Nu transmite public documente care conțin date personale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Cu ce începi planul primului salariu?",
      "explanation": "Netul primit și perioada până la plata următoare.",
      "correctFeedback": "Corect. Netul primit și perioada până la plata următoare.",
      "incorrectFeedback": "Nu chiar. Netul primit și perioada până la plata următoare.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Netul primit și perioada până la plata următoare."
        },
        {
          "id": "1",
          "label": "Brutul ca bani disponibili."
        },
        {
          "id": "2",
          "label": "Bonusul maxim posibil."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Primul salariu trebuie cheltuit integral pentru a sărbători.",
      "explanation": "O primă plată poate acoperi doar o parte din lună dacă ai început jobul mai târziu. Verifică perioada înainte să o consideri venitul standard. Nu transforma sărbătorirea primului salariu într-o obligație față de ceilalți. Dacă ajuți familia, include suma explicit în plan, ca să nu numeri aceiași bani și pentru o altă destinație.",
      "correctFeedback": "Corect. O primă plată poate acoperi doar o parte din lună dacă ai început jobul mai târziu. Verifică perioada înainte să o consideri venitul standard. Nu transforma sărbătorirea primului salariu într-o obligație față de ceilalți. Dacă ajuți familia, include suma explicit în plan, ca să nu numeri aceiași bani și pentru o altă destinație.",
      "incorrectFeedback": "Nu chiar. O primă plată poate acoperi doar o parte din lună dacă ai început jobul mai târziu. Verifică perioada înainte să o consideri venitul standard. Nu transforma sărbătorirea primului salariu într-o obligație față de ceilalți. Dacă ajuți familia, include suma explicit în plan, ca să nu numeri aceiași bani și pentru o altă destinație.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu, din 3.000 lei net, Radu are 1.800 lei costuri necesare și separă 300 pentru o rezervă. Rămân 900 lei pentru alte alegeri. Dacă ar cumpăra imediat un telefon de 1.500 lei, ar depăși această sumă cu 600. Poate amâna achiziția sau schimba planul, fără să presupună un bonus neconfirmat.",
        "Într-o comparație de oferte, folosește aceeași perioadă și aceeași normă de lucru. Notează ce este confirmat și ce este doar estimare. Cifrele din lecție sunt exerciții, nu salarii impuse de lege. Pentru situația reală, verifică documentele angajatorului și regulile aplicabile la data respectivă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cât rămâne după 1.800 costuri și 300 rezervă din 3.000?",
      "explanation": "900 lei.",
      "correctFeedback": "Corect. 900 lei.",
      "incorrectFeedback": "Nu chiar. 900 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "1.200 lei."
        },
        {
          "id": "1",
          "label": "900 lei."
        },
        {
          "id": "2",
          "label": "2.700 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Telefonul costă 1.500 și ai 900 disponibili. Ce diferență există?",
      "explanation": "600 lei.",
      "correctFeedback": "Corect. 600 lei.",
      "incorrectFeedback": "Nu chiar. 600 lei.",
      "type": "scenariu",
      "context": "Într-un exemplu, din 3.000 lei net, Radu are 1.800 lei costuri necesare și separă 300 pentru o rezervă. Rămân 900 lei pentru alte alegeri. Dacă ar cumpăra imediat un telefon de 1.500 lei, ar depăși această sumă cu 600. Poate amâna achiziția sau schimba planul, fără să presupună un bonus neconfirmat.",
      "options": [
        {
          "id": "0",
          "label": "300 lei."
        },
        {
          "id": "1",
          "label": "Nu există diferență."
        },
        {
          "id": "2",
          "label": "600 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-ce-faci-cu-primul-salariu",
      "paragraphs": [
        "Radu primește 3.000 lei net și vrea să își cumpere un telefon de 1.500 lei pentru a sărbători. Are costuri necesare de 1.800 și vrea să păstreze 300 pentru o rezervă. Prietenii îi spun să cumpere acum și să se descurce ulterior. Radu compară totalul cu venitul și caută un termen mai lung pentru telefon, fără să renunțe la evidența costurilor.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Într-un exemplu, din 3.000 lei net, Radu are 1.800 lei costuri necesare și separă 300 pentru o rezervă. Rămân 900 lei pentru alte alegeri. Dacă ar cumpăra imediat un telefon de 1.500 lei, ar depăși această sumă cu 600. Poate amâna achiziția sau schimba planul, fără să presupună un bonus neconfirmat. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce presiune apare pentru Radu?",
      "explanation": "Să cumpere înainte să verifice restul bugetului.",
      "correctFeedback": "Corect. Să cumpere înainte să verifice restul bugetului.",
      "incorrectFeedback": "Nu chiar. Să cumpere înainte să verifice restul bugetului.",
      "caseId": "caz-ce-faci-cu-primul-salariu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Să cumpere înainte să verifice restul bugetului."
        },
        {
          "id": "1",
          "label": "Să citească un contract."
        },
        {
          "id": "2",
          "label": "Să depună numerar."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Radu a separat 300 lei pentru rezervă. Ce sumă are această destinație și nu poate fi numărată simultan pentru telefon?",
      "explanation": "Cei 300 lei au fost separați pentru rezervă. Dacă schimbă destinația, trebuie să arate explicit efectul asupra planului, nu să îi numere de două ori.",
      "correctFeedback": "Corect. Cei 300 lei au fost separați pentru rezervă. Dacă schimbă destinația, trebuie să arate explicit efectul asupra planului, nu să îi numere de două ori.",
      "incorrectFeedback": "Nu chiar. Cei 300 lei au fost separați pentru rezervă. Dacă schimbă destinația, trebuie să arate explicit efectul asupra planului, nu să îi numere de două ori.",
      "caseId": "caz-ce-faci-cu-primul-salariu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "1.800 lei."
        },
        {
          "id": "1",
          "label": "300 lei."
        },
        {
          "id": "2",
          "label": "1.500 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce alternativă păstrează planul realist?",
      "explanation": "Amânarea sau ajustarea achiziției.",
      "correctFeedback": "Corect. Amânarea sau ajustarea achiziției.",
      "incorrectFeedback": "Nu chiar. Amânarea sau ajustarea achiziției.",
      "caseId": "caz-ce-faci-cu-primul-salariu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Un bonus neconfirmat tratat ca primit."
        },
        {
          "id": "1",
          "label": "Ignorarea costurilor necesare."
        },
        {
          "id": "2",
          "label": "Amânarea sau ajustarea achiziției."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O primă plată poate acoperi doar o parte din lună dacă ai început jobul mai târziu. Verifică perioada înainte să o consideri venitul standard. Nu transforma sărbătorirea primului salariu într-o obligație față de ceilalți. Dacă ajuți familia, include suma explicit în plan, ca să nu numeri aceiași bani și pentru o altă destinație.",
        "Dacă observi o diferență, formulează o întrebare concretă și păstrează răspunsul. Nu completa singur informația lipsă cu o presupunere favorabilă. Pentru o problemă contractuală sau fiscală, folosește sursa oficială relevantă și ajutor calificat. Un exemplu de învățare nu poate acoperi toate situațiile de muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Prima plată este pentru jumătate de lună. Ce verifici?",
      "explanation": "Perioada înainte să o folosești ca venit standard.",
      "correctFeedback": "Corect. Perioada înainte să o folosești ca venit standard.",
      "incorrectFeedback": "Nu chiar. Perioada înainte să o folosești ca venit standard.",
      "type": "scenariu",
      "context": "Într-un exemplu, din 3.000 lei net, Radu are 1.800 lei costuri necesare și separă 300 pentru o rezervă. Rămân 900 lei pentru alte alegeri. Dacă ar cumpăra imediat un telefon de 1.500 lei, ar depăși această sumă cu 600. Poate amâna achiziția sau schimba planul, fără să presupună un bonus neconfirmat.",
      "options": [
        {
          "id": "0",
          "label": "Perioada înainte să o folosești ca venit standard."
        },
        {
          "id": "1",
          "label": "Doar suma primită, presupunând că reprezintă o lună întreagă."
        },
        {
          "id": "2",
          "label": "Presupui că fiecare lună va fi identică."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Vrei să ajuți familia. Cum incluzi suma?",
      "explanation": "Ca destinație explicită în buget.",
      "correctFeedback": "Corect. Ca destinație explicită în buget.",
      "incorrectFeedback": "Nu chiar. Ca destinație explicită în buget.",
      "type": "scenariu",
      "context": "Într-un exemplu, din 3.000 lei net, Radu are 1.800 lei costuri necesare și separă 300 pentru o rezervă. Rămân 900 lei pentru alte alegeri. Dacă ar cumpăra imediat un telefon de 1.500 lei, ar depăși această sumă cu 600. Poate amâna achiziția sau schimba planul, fără să presupună un bonus neconfirmat.",
      "options": [
        {
          "id": "0",
          "label": "O numeri și pentru telefon simultan."
        },
        {
          "id": "1",
          "label": "Ca destinație explicită în buget."
        },
        {
          "id": "2",
          "label": "O ascunzi din evidență."
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
          "body": "Împarte primul salariu după obligații, economii și lucruri dorite.",
          "detail": "După costurile necesare de 1.800 și rezerva de 300, Radu are 900 lei din netul de 3.000. Telefonul de 1.500 lei cere schimbarea planului sau amânare, nu un bonus presupus.",
          "type": "normal",
          "detailHighlights": [
            "costurile",
            "rezerva"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Verifică ce perioadă acoperă prima încasare.",
          "type": "normal",
          "detail": "Un salariu încasat după o parte de lună poate fi diferit de cel pentru o lună completă.",
          "detailHighlights": [
            "salariu"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Planifică până la următorul venit, nu doar pentru ziua salariului.",
          "type": "normal",
          "detail": "Dacă îl consumi imediat, cheltuielile până la următoarea încasare rămân. Verifică intervalul acoperit.",
          "detailHighlights": [
            "cheltuielile",
            "încasare"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Simulează un plan pentru primul salariu cu costuri necesare, o rezervă și o alegere plăcută.",
          "type": "action",
          "detail": "Separă întâi obligațiile până la următorul salariu, apoi decide o sumă pentru economii și una pentru ceva dorit.",
          "detailHighlights": [
            "obligațiile",
            "economii"
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
