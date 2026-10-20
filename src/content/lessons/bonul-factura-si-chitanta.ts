import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "bonul-factura-si-chitanta",
  "title": "Bonul, factura și chitanța",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "nevoi-si-dorinte",
  "slug": "bonul-factura-si-chitanta",
  "description": "Ioana cumpără ceva, primește documente și vrea să înțeleagă care descrie achiziția și care arată plata.",
  "objective": "Să poți recunoaște rolul fiecărui document și ce informație practică îți oferă.",
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
      "title": "Bonul, factura și chitanța",
      "body": "Ioana cumpără ceva, primește documente și vrea să înțeleagă care descrie achiziția și care arată plata."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Documentele unei cumpărături te ajută să reconstruiești ce ai luat, de la cine, când și la ce valoare. Un bon fiscal poate descrie cumpărarea într-o vânzare obișnuită. O factură prezintă operațiunea și părțile implicate. O chitanță poate consemna încasarea unei sume în numerar. Rolurile lor nu sunt identice.",
        "Aceasta este o explicație practică, fără o listă universală de obligații pentru fiecare tip de comerciant. Înainte să concluzionezi că plata s-a făcut, caută informația care dovedește încasarea. O factură emisă nu înseamnă întotdeauna că suma a fost deja achitată."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce întrebare este utilă pentru fiecare document?",
      "explanation": "Documentele au roluri diferite în evidența achiziției.",
      "correctFeedback": "Corect. Documentele au roluri diferite în evidența achiziției.",
      "incorrectFeedback": "Nu chiar. Documentele au roluri diferite în evidența achiziției.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Ce operațiune și ce informație dovedește?"
        },
        {
          "id": "1",
          "label": "Dacă suma este egală cu alta, fără referința operațiunii."
        },
        {
          "id": "2",
          "label": "Dacă documentul se numește factură, presupunând că plata e confirmată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Emiterea unei facturi înseamnă întotdeauna că plata este deja făcută.",
      "explanation": "Factura și încasarea trebuie diferențiate.",
      "correctFeedback": "Corect. Factura și încasarea trebuie diferențiate.",
      "incorrectFeedback": "Nu chiar. Factura și încasarea trebuie diferențiate.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pentru a lega documentele, compară comerciantul, data, suma și referința operațiunii. O plată cu cardul poate apărea și în extrasul de cont. Dacă ai o factură de 180 lei și o tranzacție de aceeași valoare, caută totuși legătura dintre ele; egalitatea sumelor singură nu dovedește că privesc exact aceeași achiziție.",
        "Când cumperi pentru un proiect comun, documentele ajută și la împărțirea cheltuielii. Nu cere grupului să se bazeze numai pe memorie. Păstrează o copie lizibilă cu produsul, totalul și data, apoi protejează informațiile personale care nu sunt necesare discuției."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cum legi factura de tranzacția din cont?",
      "explanation": "Datele operațiunii confirmă legătura.",
      "correctFeedback": "Corect. Datele operațiunii confirmă legătura.",
      "incorrectFeedback": "Nu chiar. Datele operațiunii confirmă legătura.",
      "type": "scenariu",
      "context": "Ai două înregistrări aparent corespunzătoare.",
      "options": [
        {
          "id": "0",
          "label": "Numai suma egală, fără comerciant sau referință."
        },
        {
          "id": "1",
          "label": "Verifici comerciantul, suma și referința."
        },
        {
          "id": "2",
          "label": "Numai luna emiterii, fără identificarea cumpărării."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ce rol poate avea o chitanță?",
      "explanation": "Rolul ei privește o încasare, nu orice obligație viitoare.",
      "correctFeedback": "Corect. Rolul ei privește o încasare, nu orice obligație viitoare.",
      "incorrectFeedback": "Nu chiar. Rolul ei privește o încasare, nu orice obligație viitoare.",
      "type": "scenariu",
      "context": "Analizezi documentele unei plăți în numerar.",
      "options": [
        {
          "id": "0",
          "label": "Predicția prețului de mâine."
        },
        {
          "id": "1",
          "label": "Dovedirea oricărui transfer viitor."
        },
        {
          "id": "2",
          "label": "Consemnarea unei încasări în numerar."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-bonul-factura-si-chitanta",
      "paragraphs": [
        "Ioana cumpără materiale de 180 lei pentru un atelier studențesc. Primește o factură și plătește cu cardul. Mai târziu, în extras vede tranzacția, dar un coleg spune că factura dovedește singură plata. Ioana compară comerciantul, suma și referința pentru a lega documentul de operațiunea din cont. Nu numără cele două înregistrări ca două cheltuieli.",
        "Pentru o altă achiziție făcută în numerar, organizatorul primește o chitanță care consemnează suma încasată. Grupul păstrează documentele în mod lizibil ca să știe ce bani trebuie decontați. Când un produs din prima comandă nu funcționează, Ioana pregătește descrierea problemei și dovada cumpărării pentru discuția cu comerciantul. În fotografia trimisă grupului ascunde datele personale care nu sunt necesare. Ea folosește documentele ca informații verificabile, nu ca promisiune automată a unei soluții."
      ]
    },
    {
      "id": "q5",
      "question": "Câte cheltuieli reprezintă factura și plata aceleiași comenzi?",
      "explanation": "Documentele nu dublează suma folosită.",
      "correctFeedback": "Corect. Documentele nu dublează suma folosită.",
      "incorrectFeedback": "Nu chiar. Documentele nu dublează suma folosită.",
      "caseId": "caz-bonul-factura-si-chitanta",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "O singură cheltuială legată de două înregistrări."
        },
        {
          "id": "1",
          "label": "Două cheltuieli identice."
        },
        {
          "id": "2",
          "label": "Nicio cheltuială."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce pregătește Ioana pentru problema produsului?",
      "explanation": "Informațiile clare ajută verificarea cu comerciantul.",
      "correctFeedback": "Corect. Informațiile clare ajută verificarea cu comerciantul.",
      "incorrectFeedback": "Nu chiar. Informațiile clare ajută verificarea cu comerciantul.",
      "caseId": "caz-bonul-factura-si-chitanta",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar factura, fără detalii despre defect."
        },
        {
          "id": "1",
          "label": "Datele achiziției, dovada și descrierea problemei."
        },
        {
          "id": "2",
          "label": "Doar extrasul cu suma, fără identificarea produsului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce face înainte să trimită documentul grupului?",
      "explanation": "Distribui numai informațiile relevante.",
      "correctFeedback": "Corect. Distribui numai informațiile relevante.",
      "incorrectFeedback": "Nu chiar. Distribui numai informațiile relevante.",
      "caseId": "caz-bonul-factura-si-chitanta",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Publică toate datele cardului."
        },
        {
          "id": "1",
          "label": "Șterge totalul necesar decontării."
        },
        {
          "id": "2",
          "label": "Ascunde datele personale inutile discuției."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Documentele sunt utile când apare o problemă, dar nu trebuie să inventezi automat o soluție legală doar din existența unui bon. Condițiile și regulile aplicabile se verifică pentru situația concretă. Prima utilitate este să arăți clar ce s-a cumpărat și să poți discuta cu comerciantul pe baza unor date.",
        "Mai există riscul duplicării: o factură și dovada plății aceleiași cumpărături nu sunt două cheltuieli separate. Le conectezi într-o singură operațiune. La o diferență de sumă, verifică livrarea, reducerea sau plata parțială înainte să tragi concluzii. Scopul este o evidență clară, nu o colecție de hârtii neinterpretate."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Două sume coincid. Este suficient pentru a lega operațiunile?",
      "explanation": "Coincidența sumelor nu identifică singură tranzacția.",
      "correctFeedback": "Corect. Coincidența sumelor nu identifică singură tranzacția.",
      "incorrectFeedback": "Nu chiar. Coincidența sumelor nu identifică singură tranzacția.",
      "type": "scenariu",
      "context": "Ai mai multe cumpărături de aceeași valoare.",
      "options": [
        {
          "id": "0",
          "label": "Nu; verifici și comerciantul sau referința."
        },
        {
          "id": "1",
          "label": "Da, orice sumă egală este aceeași cumpărătură."
        },
        {
          "id": "2",
          "label": "Da, dacă documentele sunt în aceeași lună."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Factura și plata diferă. Care este primul pas?",
      "explanation": "Întâi reconstruiești operațiunea.",
      "correctFeedback": "Corect. Întâi reconstruiești operațiunea.",
      "incorrectFeedback": "Nu chiar. Întâi reconstruiești operațiunea.",
      "type": "scenariu",
      "context": "Apare o diferență de 20 lei.",
      "options": [
        {
          "id": "0",
          "label": "Număr automat ambele ca plăți integrale."
        },
        {
          "id": "1",
          "label": "Cauți livrare, reducere sau plată parțială și ceri clarificare."
        },
        {
          "id": "2",
          "label": "Declar fără verificare că toate documentele sunt false."
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
          "title": "Roluri",
          "body": "Achiziția, obligația și încasarea se disting.",
          "detail": "Factura poate descrie suma datorată fără să confirme singură plata. Leagă documentul de încasare sau tranzacție prin comerciant, sumă și referință, fără să numeri aceeași cumpărătură de două ori.",
          "type": "normal",
          "detailHighlights": [
            "cumpărătură",
            "încasare"
          ]
        },
        {
          "id": "idee-1",
          "title": "Legătură",
          "body": "Compară datele și referințele documentelor.",
          "type": "normal",
          "detail": "Data, suma și referința te ajută să legi factura de plata din cont, chiar dacă documentele au nume diferite.",
          "detailHighlights": [
            "documentele",
            "plata"
          ]
        },
        {
          "id": "idee-2",
          "title": "Evidență",
          "body": "Două documente nu înseamnă două cheltuieli.",
          "type": "normal",
          "detail": "Un bon și confirmarea din aplicație pot descrie aceeași cumpărătură. În buget o treci o singură dată.",
          "detailHighlights": [
            "cumpărătură",
            "confirmarea"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Alege un document de cumpărare și găsește comerciantul, data, totalul și informația despre plată.",
          "type": "action",
          "detail": "Caută și dacă documentul spune «achitat» sau doar «de plată». Păstrează dovada fără să distribui date personale.",
          "detailHighlights": [
            "plată"
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
