import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "contul-pentru-minori",
  "title": "Contul pentru minori",
  "categoryId": "carduri-si-banca",
  "chapterId": "siguranta-banilor",
  "slug": "contul-pentru-minori",
  "description": "Daria vrea un cont pentru bursă și cumpărături. Trebuie să afle cine are acces, ce limite există și ce condiții se aplică.",
  "objective": "Să poți înțelege cum diferă un cont pentru minor de unul obișnuit și ce trebuie verificat înainte de utilizare.",
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
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Contul pentru minori",
      "body": "Daria vrea un cont pentru bursă și cumpărături. Trebuie să afle cine are acces, ce limite există și ce condiții se aplică."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un cont destinat unui minor poate avea condiții privind deschiderea, accesul și rolul reprezentantului legal. Acestea se verifică pentru produs și situația persoanei, fără să presupui că toate instituțiile oferă același aranjament. Lecția nu inventează o vârstă universală sau o regulă juridică actuală.",
        "Întrebările utile sunt cine poate deschide contul, ce documente sunt necesare, cine poate vedea sau autoriza operațiuni și ce limite se aplică. Înainte de folosire, caută răspunsurile în informațiile oficiale ale instituției. Un nume de produs precum junior nu descrie singur toate drepturile și condițiile."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici înainte de un cont pentru minor?",
      "explanation": "Produsul și situația concretă determină condițiile.",
      "correctFeedback": "Corect. Produsul și situația concretă determină condițiile.",
      "incorrectFeedback": "Nu chiar. Produsul și situația concretă determină condițiile.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Condițiile de deschidere, accesul și limitele."
        },
        {
          "id": "1",
          "label": "Doar desenul cardului."
        },
        {
          "id": "2",
          "label": "Doar numele junior."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Toate conturile pentru minori au obligatoriu funcții identice.",
      "explanation": "Serviciile și condițiile trebuie comparate.",
      "correctFeedback": "Corect. Serviciile și condițiile trebuie comparate.",
      "incorrectFeedback": "Nu chiar. Serviciile și condițiile trebuie comparate.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Compară operațiunile pe care vrei să le faci cu serviciile disponibile: încasarea unei burse, plăți, transferuri și numerar. Un card asociat nu înseamnă automat acces la toate funcțiile unui cont obișnuit. Verifică tarifele și ce se întâmplă când se schimbă categoria de vârstă sau condițiile produsului.",
        "Discută și cum veți comunica despre folosirea contului. Un acord clar cu persoana implicată poate preveni surprize privind limitele și vizibilitatea tranzacțiilor. Nu trimite documentele personale printr-un link necunoscut doar pentru că promite deschiderea rapidă. Identificarea se face prin procedura legitimă a instituției."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Reclama arată un transfer. Ce verifici?",
      "explanation": "Demonstrația nu înlocuiește eligibilitatea și regulile.",
      "correctFeedback": "Corect. Demonstrația nu înlocuiește eligibilitatea și regulile.",
      "incorrectFeedback": "Nu chiar. Demonstrația nu înlocuiește eligibilitatea și regulile.",
      "type": "scenariu",
      "context": "Vrei să primești și să trimiți bani.",
      "options": [
        {
          "id": "0",
          "label": "Presupui că orice funcție este inclusă."
        },
        {
          "id": "1",
          "label": "Dacă funcția este disponibilă în condițiile tale."
        },
        {
          "id": "2",
          "label": "Trimiți documente unui cont anonim."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ce merită discutat cu persoana implicată în cont?",
      "explanation": "Acordul clar reduce surprizele privind folosirea.",
      "correctFeedback": "Corect. Acordul clar reduce surprizele privind folosirea.",
      "incorrectFeedback": "Nu chiar. Acordul clar reduce surprizele privind folosirea.",
      "type": "scenariu",
      "context": "Contul are mai multe roluri de acces.",
      "options": [
        {
          "id": "0",
          "label": "Doar culoarea aplicației."
        },
        {
          "id": "1",
          "label": "Doar numărul de reclame."
        },
        {
          "id": "2",
          "label": "Limitele, accesul și modul de comunicare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-contul-pentru-minori",
      "paragraphs": [
        "Daria vrea un cont pentru a primi bursă și pentru plăți la librărie. Este minoră și găsește două produse cu denumiri atractive. O reclamă arată un card și o aplicație, dar nu explică cine poate deschide contul și ce operațiuni sunt disponibile. Daria notează ce informație lipsește, în loc să presupună că orice funcție din clip se aplică automat.",
        "Împreună cu persoana care o sprijină, verifică documentele cerute, accesul, limitele și tarifele prin instituția cunoscută. Clarifică și ce se schimbă ulterior când condițiile de vârstă ale produsului nu mai sunt aceleași. Un coleg îi propune să folosească acel cont pentru tranzacțiile lui. Daria nu acceptă doar fiindcă poate avea card. Contul pe numele ei cere control și verificare, nu folosirea de către altcineva. Ea protejează datele și cere explicații înainte să confirme operațiuni necunoscute."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce informație lipsește Dariei din reclamă?",
      "explanation": "Deschiderea și controlul trebuie clarificate.",
      "correctFeedback": "Corect. Deschiderea și controlul trebuie clarificate.",
      "incorrectFeedback": "Nu chiar. Deschiderea și controlul trebuie clarificate.",
      "caseId": "caz-contul-pentru-minori",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Cine poate deschide contul și autoriza operațiuni."
        },
        {
          "id": "1",
          "label": "Ce font are clipul."
        },
        {
          "id": "2",
          "label": "Câte librării există."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce verifică pentru schimbarea categoriei de vârstă?",
      "explanation": "Schimbarea produsului trebuie explicată de instituție.",
      "correctFeedback": "Corect. Schimbarea produsului trebuie explicată de instituție.",
      "incorrectFeedback": "Nu chiar. Schimbarea produsului trebuie explicată de instituție.",
      "caseId": "caz-contul-pentru-minori",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Presupune gratuitate permanentă."
        },
        {
          "id": "1",
          "label": "Noile condiții, funcții și tarife aplicabile."
        },
        {
          "id": "2",
          "label": "Presupune că toți banii dispar."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "De ce nu oferă contul colegului?",
      "explanation": "Riscul privește controlul și identificarea operațiunilor.",
      "correctFeedback": "Corect. Riscul privește controlul și identificarea operațiunilor.",
      "incorrectFeedback": "Nu chiar. Riscul privește controlul și identificarea operațiunilor.",
      "caseId": "caz-contul-pentru-minori",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Orice coleg este automat infractor."
        },
        {
          "id": "1",
          "label": "Cardul nu poate face plăți."
        },
        {
          "id": "2",
          "label": "Ar pierde controlul asupra tranzacțiilor pe numele ei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Protecția accesului rămâne importantă indiferent de vârstă. Nu oferi unui prieten contul pentru a primi și trimite bani în numele lui. Nu comunica parole sau coduri unui apelant. Dacă nu înțelegi o solicitare, verifică printr-un canal cunoscut și cere ajutor unei persoane de încredere.",
        "Când citești oferta, separă regulile produsului de exemplele dintr-o reclamă. O funcție demonstrată pe un telefon nu garantează că ai acces la ea în situația ta. Scopul este să poți pune întrebările potrivite și să înțelegi cine controlează fiecare operațiune, înainte de a folosi banii."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un link cere acte pentru deschidere. Ce verifici?",
      "explanation": "Datele de identificare se oferă într-un context legitim.",
      "correctFeedback": "Corect. Datele de identificare se oferă într-un context legitim.",
      "incorrectFeedback": "Nu chiar. Datele de identificare se oferă într-un context legitim.",
      "type": "scenariu",
      "context": "Nu ai inițiat contactul pe acel site.",
      "options": [
        {
          "id": "0",
          "label": "Procedura și autenticitatea canalului instituției."
        },
        {
          "id": "1",
          "label": "Doar promisiunea de viteză."
        },
        {
          "id": "2",
          "label": "Trimiți toate datele înainte de verificare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Nu înțelegi o confirmare. Ce faci?",
      "explanation": "O pauză și ajutorul verificat păstrează controlul.",
      "correctFeedback": "Corect. O pauză și ajutorul verificat păstrează controlul.",
      "incorrectFeedback": "Nu chiar. O pauză și ajutorul verificat păstrează controlul.",
      "type": "scenariu",
      "context": "Operațiunea privește contul tău.",
      "options": [
        {
          "id": "0",
          "label": "Aprobi pentru a nu părea nepriceput."
        },
        {
          "id": "1",
          "label": "Oprești și ceri clarificare printr-un canal cunoscut."
        },
        {
          "id": "2",
          "label": "Trimiți codul unui necunoscut."
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
          "title": "Condiții",
          "body": "Nu deduce regulile din numele produsului.",
          "detail": "Nu deduce regulile din numele produsului.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Acces",
          "body": "Clarifică cine vede și autorizează operațiuni.",
          "detail": "Clarifică cine vede și autorizează operațiuni.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Control",
          "body": "Nu lăsa altă persoană să folosească contul în numele tău.",
          "detail": "Nu lăsa altă persoană să folosească contul în numele tău.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Notează trei întrebări despre acces, limite și tarife pe care le-ai verifica la un cont pentru minor.",
          "detail": "Notează trei întrebări despre acces, limite și tarife pe care le-ai verifica la un cont pentru minor.",
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
