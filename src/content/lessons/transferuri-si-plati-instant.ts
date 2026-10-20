import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "transferuri-si-plati-instant",
  "title": "Transferuri și plăți instant",
  "categoryId": "carduri-si-banca",
  "chapterId": "cardul",
  "slug": "transferuri-si-plati-instant",
  "description": "Radu vrea să trimită repede partea lui pentru chirie. Un mesaj schimbă IBAN-ul chiar înainte de plată.",
  "objective": "Să poți identifica ce informații trebuie verificate înainte de a trimite bani și de ce confirmarea destinatarului contează.",
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
      "title": "Transferuri și plăți instant",
      "body": "Radu vrea să trimită repede partea lui pentru chirie. Un mesaj schimbă IBAN-ul chiar înainte de plată."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un transfer mută bani către un cont indicat. Viteza nu înlocuiește verificarea destinatarului, a sumei și a monedei. Înainte de confirmare, folosește informații primite printr-un canal autentic. Dacă mesajul este neașteptat sau schimbă date cunoscute, confirmă separat cu persoana ori instituția respectivă.",
        "O plată instant poate ajunge rapid, conform serviciului și condițiilor implicate. Tocmai de aceea, verificarea înainte de trimitere contează. Nu presupune că o eroare se poate corecta automat după confirmare. Recuperarea unei plăți greșite trebuie discutată cu banca și nu este garantată din această lecție."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici înainte de transfer?",
      "explanation": "Corectitudinea datelor precede confirmarea.",
      "correctFeedback": "Corect. Corectitudinea datelor precede confirmarea.",
      "incorrectFeedback": "Nu chiar. Corectitudinea datelor precede confirmarea.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Destinatarul, suma, moneda și contextul."
        },
        {
          "id": "1",
          "label": "Doar viteza."
        },
        {
          "id": "2",
          "label": "Doar fotografia unui card."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un IBAN valid confirmă singur identitatea destinatarului dorit.",
      "explanation": "Formatul și identitatea sunt verificări diferite.",
      "correctFeedback": "Corect. Formatul și identitatea sunt verificări diferite.",
      "incorrectFeedback": "Nu chiar. Formatul și identitatea sunt verificări diferite.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pentru un transfer obișnuit verifici contul destinatarului și informațiile cerute de serviciu. Forma validă a unui IBAN nu dovedește că el aparține persoanei intenționate. Compară datele cu sursa cunoscută și folosește eventualele informații de confirmare afișate de aplicație fără să renunți la verificarea contextului.",
        "Într-un exemplu, partea ta este 450 lei, dar ai introdus 4.500. Diferența nu este reparată de viteza transferului. Un ecran de revizuire este o oportunitate să citești numărul, moneda și beneficiarul. O descriere clară poate ajuta evidența, dar nu corectează un destinatar greșit."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "IBAN-ul se schimbă printr-un mesaj neașteptat. Ce faci?",
      "explanation": "Canalul separat reduce riscul unei cereri falsificate.",
      "correctFeedback": "Corect. Canalul separat reduce riscul unei cereri falsificate.",
      "incorrectFeedback": "Nu chiar. Canalul separat reduce riscul unei cereri falsificate.",
      "type": "scenariu",
      "context": "Ai folosit anterior alt cont.",
      "options": [
        {
          "id": "0",
          "label": "Plătești imediat pentru a respecta graba."
        },
        {
          "id": "1",
          "label": "Confirmi separat prin contactul cunoscut."
        },
        {
          "id": "2",
          "label": "Trimiți codul de autentificare."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ai tastat 4.500 în loc de 450. Când corectezi?",
      "explanation": "Ecranul de revizuire verifică intenția și suma.",
      "correctFeedback": "Corect. Ecranul de revizuire verifică intenția și suma.",
      "incorrectFeedback": "Nu chiar. Ecranul de revizuire verifică intenția și suma.",
      "type": "scenariu",
      "context": "Transferul nu este încă autorizat.",
      "options": [
        {
          "id": "0",
          "label": "După, presupunând anulare automată."
        },
        {
          "id": "1",
          "label": "Nu corectezi dacă este instant."
        },
        {
          "id": "2",
          "label": "Înainte de confirmarea operațiunii."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-transferuri-si-plati-instant",
      "paragraphs": [
        "Radu locuiește cu un coleg și trebuie să trimită 450 lei pentru o cheltuială comună. Are IBAN-ul folosit anterior, dar primește un mesaj care spune că acel cont a fost schimbat. Mesajul cere plată instant și insistă să nu sune, fiindcă destinatarul ar fi ocupat. Radu observă schimbarea și presiunea.",
        "El contactează colegul prin numărul cunoscut, separat de mesajul nou. În aplicație verifică suma, moneda și contul înainte să confirme. Observă că tastase 4.500 lei și corectează valoarea. După operațiunea autentică, păstrează confirmarea. Când colegul primește o captură de la altcineva, verifică intrarea în propriul cont în loc să considere imaginea suficientă. Cei doi folosesc viteza transferului numai după verificarea datelor, fără să creadă că o plată greșită poate fi anulată automat."
      ]
    },
    {
      "id": "q5",
      "question": "Ce semnale cereau verificarea mesajului lui Radu?",
      "explanation": "Schimbarea neașteptată și graba sunt informații relevante.",
      "correctFeedback": "Corect. Schimbarea neașteptată și graba sunt informații relevante.",
      "incorrectFeedback": "Nu chiar. Schimbarea neașteptată și graba sunt informații relevante.",
      "caseId": "caz-transferuri-si-plati-instant",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Schimbarea contului și presiunea de a nu suna."
        },
        {
          "id": "1",
          "label": "Faptul că există o cheltuială comună."
        },
        {
          "id": "2",
          "label": "Faptul că suma este în lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Cum a verificat cererea autentică?",
      "explanation": "Contactul cunoscut clarifică identitatea și datele.",
      "correctFeedback": "Corect. Contactul cunoscut clarifică identitatea și datele.",
      "incorrectFeedback": "Nu chiar. Contactul cunoscut clarifică identitatea și datele.",
      "caseId": "caz-transferuri-si-plati-instant",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Prin răspuns cu parola la mesaj."
        },
        {
          "id": "1",
          "label": "Prin colegul contactat separat."
        },
        {
          "id": "2",
          "label": "Doar prin lungimea IBAN-ului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Cum confirmă colegul primirea banilor?",
      "explanation": "Imaginea unei confirmări nu substituie contul destinatarului.",
      "correctFeedback": "Corect. Imaginea unei confirmări nu substituie contul destinatarului.",
      "incorrectFeedback": "Nu chiar. Imaginea unei confirmări nu substituie contul destinatarului.",
      "caseId": "caz-transferuri-si-plati-instant",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Se bazează numai pe o captură."
        },
        {
          "id": "1",
          "label": "Presupune că orice mesaj înseamnă plată."
        },
        {
          "id": "2",
          "label": "Verifică intrarea în propriul cont."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "După transfer, păstrează confirmarea și verifică starea operațiunii. O fotografie trimisă de cineva nu dovedește automat că banii au ajuns în contul tău. Dacă ești destinatar, verifică în propriul serviciu bancar. Nu livra un obiect doar pe baza unei capturi care poate fi greșită sau falsificată.",
        "Dacă ai trimis greșit, contactează banca rapid prin canalul oficial și oferă datele operațiunii. Nu încerca să rezolvi problema dând parole unei persoane care promite recuperarea. Viteza poate fi utilă când informațiile sunt corecte; controlul înainte de confirmare rămâne partea pe care o poți gestiona direct."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ai trimis greșit. Care este un prim pas util?",
      "explanation": "Recuperarea se verifică prin instituția implicată.",
      "correctFeedback": "Corect. Recuperarea se verifică prin instituția implicată.",
      "incorrectFeedback": "Nu chiar. Recuperarea se verifică prin instituția implicată.",
      "type": "scenariu",
      "context": "Observi eroarea după confirmare.",
      "options": [
        {
          "id": "0",
          "label": "Contactezi banca oficial cu datele operațiunii."
        },
        {
          "id": "1",
          "label": "Dai parola unei firme necunoscute de recuperare."
        },
        {
          "id": "2",
          "label": "Presupui că banii revin automat."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce nu poate corecta descrierea transferului?",
      "explanation": "Descrierea ajută evidența, dar nu schimbă beneficiarul.",
      "correctFeedback": "Corect. Descrierea ajută evidența, dar nu schimbă beneficiarul.",
      "incorrectFeedback": "Nu chiar. Descrierea ajută evidența, dar nu schimbă beneficiarul.",
      "type": "scenariu",
      "context": "Ai scris corect motivul plății.",
      "options": [
        {
          "id": "0",
          "label": "Claritatea evidenței personale."
        },
        {
          "id": "1",
          "label": "Un cont de destinație greșit."
        },
        {
          "id": "2",
          "label": "Scopul notat al plății."
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
          "title": "Înainte",
          "body": "Verifică datele înainte de autorizare.",
          "detail": "Radu corectează 4.500 lei la 450 lei înainte de confirmare și verifică separat contul schimbat. Viteza transferului nu înlocuiește controlul datelor și nu garantează anularea unei plăți greșite.",
          "type": "normal",
          "detailHighlights": [
            "confirmare",
            "contul"
          ]
        },
        {
          "id": "idee-1",
          "title": "Separat",
          "body": "Confirmă schimbările prin contactul cunoscut.",
          "type": "normal",
          "detail": "Dacă cineva anunță un cont nou, sună la numărul pe care îl aveai deja, separat de mesajul cu modificarea.",
          "detailHighlights": [
            "cont nou"
          ]
        },
        {
          "id": "idee-2",
          "title": "După",
          "body": "Urmărește starea și intrarea reală în cont.",
          "type": "normal",
          "detail": "O captură de ecran nu confirmă singură încasarea. Urmărește tranzacția în propriul cont și starea ei.",
          "detailHighlights": [
            "tranzacția",
            "încasarea"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "La un transfer viitor, folosește ecranul de revizuire pentru destinatar, sumă și monedă.",
          "type": "action",
          "detail": "Verifică din nou cifra introdusă înainte de confirmare. Viteza transferului lasă mai puțin timp să observi o greșeală după trimitere.",
          "detailHighlights": [
            "confirmare"
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
