import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "sunt-banii-mei-in-siguranta-la-banca",
  "title": "Sunt banii mei în siguranță la bancă?",
  "categoryId": "carduri-si-banca",
  "chapterId": "siguranta-banilor",
  "slug": "sunt-banii-mei-in-siguranta-la-banca",
  "description": "Ioana citește despre garantarea depozitelor și crede că asta acoperă orice pierdere. Sunt riscuri diferite.",
  "objective": "Să poți diferenția protecția oferită de sistemul bancar de responsabilitatea ta de a proteja accesul la cont.",
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
      "title": "Sunt banii mei în siguranță la bancă?",
      "body": "Ioana citește despre garantarea depozitelor și crede că asta acoperă orice pierdere. Sunt riscuri diferite."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Siguranța banilor are mai multe straturi. Situația financiară a instituției, protecția depozitelor și accesul la cont sunt întrebări distincte. O schemă de garantare a depozitelor funcționează în condițiile sale, pentru situații și produse eligibile. Nu presupune că orice produs financiar vândut printr-o instituție are aceeași protecție.",
        "Pentru un cont sau un depozit, verifică instituția și schema aplicabilă în documentele oficiale. Lecția nu inventează un plafon sau un termen actual. Ideea practică este să identifici ce risc tratează mecanismul și să nu îl extinzi automat la investiții, fraude sau orice operațiune personală."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "De ce siguranța cere mai multe întrebări?",
      "explanation": "Un mecanism de protecție tratează un risc specific.",
      "correctFeedback": "Corect. Un mecanism de protecție tratează un risc specific.",
      "incorrectFeedback": "Nu chiar. Un mecanism de protecție tratează un risc specific.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Produsele, instituția și accesul au riscuri distincte."
        },
        {
          "id": "1",
          "label": "Orice aplicație elimină riscul."
        },
        {
          "id": "2",
          "label": "Orice sumă este aceeași investiție."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Același ecran înseamnă aceeași protecție pentru cont și investiție.",
      "explanation": "Natura produsului și documentele determină protecția.",
      "correctFeedback": "Corect. Natura produsului și documentele determină protecția.",
      "incorrectFeedback": "Nu chiar. Natura produsului și documentele determină protecția.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Protecția accesului privește parolele, dispozitivul, codurile și autorizările tale. O solicitare falsă de transfer nu devine sigură fiindcă ai citit despre depozite garantate. Dacă trimiți bani unui destinatar fals, problema este operațiunea și frauda, nu aceeași situație ca indisponibilitatea depozitului unei instituții.",
        "La o tranzacție necunoscută, contactează banca oficial, verifică operațiunea și protejează accesul conform situației. Nu oferi codurile unui apelant care invocă garantarea banilor. Separarea riscurilor îți permite să alegi canalul potrivit: documentele produsului pentru protecția lui și serviciul bancar pentru o operațiune sau un acces suspect."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cum verifici protecția unui depozit?",
      "explanation": "Eligibilitatea și condițiile se verifică oficial.",
      "correctFeedback": "Corect. Eligibilitatea și condițiile se verifică oficial.",
      "incorrectFeedback": "Nu chiar. Eligibilitatea și condițiile se verifică oficial.",
      "type": "scenariu",
      "context": "Vrei să înțelegi mecanismul aplicabil contului.",
      "options": [
        {
          "id": "0",
          "label": "Prin numele instituției, presupunând că toate produsele sunt garantate."
        },
        {
          "id": "1",
          "label": "Prin documentele oficiale ale produsului și schemei aplicabile."
        },
        {
          "id": "2",
          "label": "Prin mesajul unui apelant."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un apel cere mutarea banilor într-un cont sigur. Ce faci?",
      "explanation": "Accesul și cererea trebuie verificate separat.",
      "correctFeedback": "Corect. Accesul și cererea trebuie verificate separat.",
      "incorrectFeedback": "Nu chiar. Accesul și cererea trebuie verificate separat.",
      "type": "scenariu",
      "context": "Nu ai inițiat acel contact.",
      "options": [
        {
          "id": "0",
          "label": "Trimiți codul pentru garantare."
        },
        {
          "id": "1",
          "label": "Dai parola fiindcă apelantul invocă protecția."
        },
        {
          "id": "2",
          "label": "Nu autorizezi și verifici prin banca contactată separat."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-sunt-banii-mei-in-siguranta-la-banca",
      "paragraphs": [
        "Ioana păstrează bani pentru facultate într-un cont și vede în aceeași aplicație o ofertă de investiții. Citește și o explicație despre garantarea depozitelor. Inițial crede că orice sumă din aplicație este protejată identic. Înainte să folosească alt produs, caută documentele care explică natura lui și riscurile. Nu presupune că investiția este un depozit.",
        "Apoi primește un apel care spune că trebuie să mute banii într-un cont sigur și să comunice un cod. Apelantul invocă protecția depozitelor ca să pară credibil. Ioana separă mecanismele: protecția unui produs nu autorizează o persoană necunoscută să îi controleze contul. Închide apelul și contactează banca prin canalul cunoscut. Verifică produsul, schema aplicabilă și tranzacțiile, fără să creadă că un singur mecanism acoperă automat fluctuația investițiilor, frauda și situația financiară a instituției."
      ]
    },
    {
      "id": "q5",
      "question": "Ce trebuie să afle Ioana despre ofertă?",
      "explanation": "Clasificarea produsului precede presupunerea protecției.",
      "correctFeedback": "Corect. Clasificarea produsului precede presupunerea protecției.",
      "incorrectFeedback": "Nu chiar. Clasificarea produsului precede presupunerea protecției.",
      "caseId": "caz-sunt-banii-mei-in-siguranta-la-banca",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Dacă este depozit sau investiție și ce riscuri are."
        },
        {
          "id": "1",
          "label": "Dacă apare în aplicația contului, presupunând aceeași protecție."
        },
        {
          "id": "2",
          "label": "Dacă randamentul promis depășește dobânda contului, fără riscuri."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce risc descrie solicitarea apelantului?",
      "explanation": "Transferul către un destinatar fals este o situație distinctă.",
      "correctFeedback": "Corect. Transferul către un destinatar fals este o situație distinctă.",
      "incorrectFeedback": "Nu chiar. Transferul către un destinatar fals este o situație distinctă.",
      "caseId": "caz-sunt-banii-mei-in-siguranta-la-banca",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar fluctuația unui ETF."
        },
        {
          "id": "1",
          "label": "Posibilă fraudă și acces neautorizat."
        },
        {
          "id": "2",
          "label": "Doar durata unui depozit."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Cum verifică apelul?",
      "explanation": "Canalul separat ajută verificarea identității.",
      "correctFeedback": "Corect. Canalul separat ajută verificarea identității.",
      "incorrectFeedback": "Nu chiar. Canalul separat ajută verificarea identității.",
      "caseId": "caz-sunt-banii-mei-in-siguranta-la-banca",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Prin numărul dictat de apelant."
        },
        {
          "id": "1",
          "label": "Prin oferirea codului."
        },
        {
          "id": "2",
          "label": "Prin canalul oficial cunoscut al băncii."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un produs de investiții poate fluctua chiar dacă îl vezi în aceeași aplicație în care ai contul. Aspectul comun al ecranului nu înseamnă aceeași garanție. Citește categoria produsului, riscurile și documentele. Nu transforma numele unei instituții într-o promisiune de profit sau într-o protecție pentru toate sumele afișate.",
        "Poți reduce anumite riscuri printr-o verificare clară, dar nu printr-un simplu răspuns da sau nu. Întreabă ce produs deții, cine îl oferă, ce protecție se aplică și cum controlezi accesul. Aceste informații sunt mai utile decât presupunerea că toate riscurile dispar sau că toate instituțiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un produs de investiții scade. Ce nu presupui automat?",
      "explanation": "Riscul de piață nu este identic cu protecția unui depozit.",
      "correctFeedback": "Corect. Riscul de piață nu este identic cu protecția unui depozit.",
      "incorrectFeedback": "Nu chiar. Riscul de piață nu este identic cu protecția unui depozit.",
      "type": "scenariu",
      "context": "Produsul are expunere la piață.",
      "options": [
        {
          "id": "0",
          "label": "Că schema depozitelor acoperă orice fluctuație."
        },
        {
          "id": "1",
          "label": "Că trebuie citite riscurile."
        },
        {
          "id": "2",
          "label": "Că produsele sunt diferite."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce set de întrebări este util?",
      "explanation": "Separarea mecanismelor produce o verificare mai clară.",
      "correctFeedback": "Corect. Separarea mecanismelor produce o verificare mai clară.",
      "incorrectFeedback": "Nu chiar. Separarea mecanismelor produce o verificare mai clară.",
      "type": "scenariu",
      "context": "Vrei să evaluezi siguranța unei sume.",
      "options": [
        {
          "id": "0",
          "label": "Doar aplicația este populară?"
        },
        {
          "id": "1",
          "label": "Ce produs, ce instituție, ce protecție și ce acces?"
        },
        {
          "id": "2",
          "label": "Doar promite profit?"
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
          "title": "Straturi",
          "body": "Produsul, instituția și accesul sunt distincte.",
          "detail": "O investiție afișată lângă cont nu dobândește automat protecția unui depozit. Separă documentele produsului de verificarea accesului și a solicitărilor suspecte de transfer.",
          "type": "normal",
          "detailHighlights": [
            "verificarea",
            "documentele"
          ]
        },
        {
          "id": "idee-1",
          "title": "Documente",
          "body": "Verifică protecția aplicabilă, nu aspectul aplicației.",
          "type": "normal",
          "detail": "Un produs de investiții nu devine depozit garantat doar pentru că apare lângă cont în aceeași aplicație.",
          "detailHighlights": [
            "depozit",
            "cont"
          ]
        },
        {
          "id": "idee-2",
          "title": "Fraudă",
          "body": "Nu autoriza transferuri cerute de apelanți neverificați.",
          "type": "normal",
          "detail": "Povestea despre un «cont sigur» poate ascunde o fraudă. Nu transfera bani ca să verifici identitatea unui apelant.",
          "detailHighlights": [
            "identitatea",
            "fraudă"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Găsește în documentele contului unde este explicată protecția depozitului, fără să publici date personale.",
          "type": "action",
          "detail": "Caută denumirea produsului și instituția care îl oferă; protecția aplicabilă se verifică pentru acestea, nu pentru aspectul aplicației.",
          "detailHighlights": [
            "produsului",
            "instituția"
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
