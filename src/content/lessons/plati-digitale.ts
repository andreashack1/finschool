import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "plati-digitale",
  "title": "Plăți digitale",
  "categoryId": "carduri-si-banca",
  "chapterId": "cardul",
  "slug": "plati-digitale",
  "description": "Ana plătește contactless la magazin și vede apoi o solicitare online. Ambele sunt digitale, dar cer verificări diferite.",
  "objective": "Să poți recunoaște principalele forme de plată digitală și să alegi comportamente sigure în situații simple.",
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
      "title": "Plăți digitale",
      "body": "Ana plătește contactless la magazin și vede apoi o solicitare online. Ambele sunt digitale, dar cer verificări diferite."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Plățile digitale pot folosi un card, un portofel pe telefon sau un transfer din aplicația bancară. Instrumentele diferă, dar toate implică o operațiune financiară care trebuie înțeleasă înainte de confirmare. Verifică suma, moneda și destinatarul. Un ecran frumos sau un logo cunoscut nu confirmă singur că cererea este autentică.",
        "La un magazin fizic poți compara suma terminalului cu totalul cumpărăturii. Online trebuie să verifici și site-ul ori aplicația. Autentificarea protejează o operațiune, dar nu transformă automat un comerciant necunoscut într-unul de încredere. Confirmarea ta are un scop concret."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce au în comun instrumentele de plată digitală?",
      "explanation": "Instrumentul nu înlocuiește atenția la sumă și destinatar.",
      "correctFeedback": "Corect. Instrumentul nu înlocuiește atenția la sumă și destinatar.",
      "incorrectFeedback": "Nu chiar. Instrumentul nu înlocuiește atenția la sumă și destinatar.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Necesită verificarea operațiunii înainte de confirmare."
        },
        {
          "id": "1",
          "label": "Transformă toate cumpărăturile în venit."
        },
        {
          "id": "2",
          "label": "Elimină orice nevoie de protecție a accesului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Autentificarea garantează că orice comerciant este de încredere.",
      "explanation": "Poți autoriza o operațiune către un destinatar riscant.",
      "correctFeedback": "Corect. Poți autoriza o operațiune către un destinatar riscant.",
      "incorrectFeedback": "Nu chiar. Poți autoriza o operațiune către un destinatar riscant.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un portofel digital poate oferi un mod diferit de folosire a cardului și mecanisme de protecție, conform serviciului. Nu înseamnă însă că plățile devin fără cost sau că poți ignora telefonul pierdut. Protejează dispozitivul, accesul și informațiile contului. Folosește aplicații din surse verificate și actualizează-le prin canalele potrivite.",
        "O notificare de plată merită citită, nu doar aprobată. Dacă ai vrut să plătești 45 lei și cererea arată 450, oprește-te. Verifică și moneda: același număr în lei și într-o altă monedă nu reprezintă aceeași sumă. Exemplele sunt ipotetice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ai ales 45 lei, dar cererea arată 450. Ce faci?",
      "explanation": "Suma cerută trebuie să corespundă intenției tale.",
      "correctFeedback": "Corect. Suma cerută trebuie să corespundă intenției tale.",
      "incorrectFeedback": "Nu chiar. Suma cerută trebuie să corespundă intenției tale.",
      "type": "scenariu",
      "context": "Nu ai acceptat alte costuri.",
      "options": [
        {
          "id": "0",
          "label": "Aprobi ca să nu pierzi oferta."
        },
        {
          "id": "1",
          "label": "Oprești confirmarea și verifici diferența."
        },
        {
          "id": "2",
          "label": "Trimiți parola comerciantului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Cum protejezi plata prin telefon?",
      "explanation": "Accesul la dispozitiv și la serviciu contează.",
      "correctFeedback": "Corect. Accesul la dispozitiv și la serviciu contează.",
      "incorrectFeedback": "Nu chiar. Accesul la dispozitiv și la serviciu contează.",
      "type": "scenariu",
      "context": "Folosești un portofel digital.",
      "options": [
        {
          "id": "0",
          "label": "Elimini orice blocare a ecranului."
        },
        {
          "id": "1",
          "label": "Instalezi orice link primit."
        },
        {
          "id": "2",
          "label": "Protejezi dispozitivul și folosești aplicații verificate."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-plati-digitale",
      "paragraphs": [
        "Ana cumpără materiale pentru un atelier de fotografie. La terminal vede totalul de 45 lei și îl compară cu cumpărătura înainte să plătească prin telefon. Mai târziu primește o solicitare online care pare legată de aceeași comandă, dar suma afișată este 450 lei. Mesajul spune că trebuie confirmată rapid pentru a evita anularea.",
        "Ana nu aprobă doar fiindcă plata folosește aceeași aplicație. Verifică suma și comerciantul prin canalul cunoscut. Un apelant îi cere apoi codul de confirmare, susținând că va corecta diferența. Ea nu comunică codul și nu instalează o aplicație trimisă prin mesaj. Urmărește tranzacția făcută în magazin și contactează banca dacă vede ceva necunoscut. Instrumentul digital îi oferă comoditate, dar nu o scutește de verificarea scopului, sumei și destinatarului."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce a verificat Ana la terminal?",
      "explanation": "Confirmarea privește totalul efectiv.",
      "correctFeedback": "Corect. Confirmarea privește totalul efectiv.",
      "incorrectFeedback": "Nu chiar. Confirmarea privește totalul efectiv.",
      "caseId": "caz-plati-digitale",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Suma în raport cu cumpărătura."
        },
        {
          "id": "1",
          "label": "Doar logo-ul aplicației."
        },
        {
          "id": "2",
          "label": "Numărul colegilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "De ce nu aprobă solicitarea online?",
      "explanation": "Diferența cere verificare înainte de autorizare.",
      "correctFeedback": "Corect. Diferența cere verificare înainte de autorizare.",
      "incorrectFeedback": "Nu chiar. Diferența cere verificare înainte de autorizare.",
      "caseId": "caz-plati-digitale",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Toate plățile online sunt greșite."
        },
        {
          "id": "1",
          "label": "Suma și contextul nu corespund plății intenționate."
        },
        {
          "id": "2",
          "label": "Telefonul nu poate face plăți."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce face cu cererea de cod?",
      "explanation": "Codul poate autoriza operațiuni, nu este pentru apelant.",
      "correctFeedback": "Corect. Codul poate autoriza operațiuni, nu este pentru apelant.",
      "incorrectFeedback": "Nu chiar. Codul poate autoriza operațiuni, nu este pentru apelant.",
      "caseId": "caz-plati-digitale",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Îl dictează pentru corectarea promisă."
        },
        {
          "id": "1",
          "label": "Trimite și parola."
        },
        {
          "id": "2",
          "label": "Nu îl comunică și verifică separat."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu comunica unui apelant codul care autorizează o operațiune. Poate pretinde că verifică o rambursare sau că repară aplicația, dar codul nu este o dovadă de identitate pe care trebuie să i-o oferi. Confirmă cererea printr-un canal separat, cunoscut, înainte de orice acces sau plată.",
        "După o operațiune neclară, verifică istoricul și starea înainte să o repeți. La o tranzacție necunoscută, contactează banca prin canalul oficial și urmează pașii potriviți situației. Plata digitală poate fi comodă și utilă; siguranța depinde și de atenția acordată operațiunii concrete."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O plată nu are rezultat clar. Ce verifici întâi?",
      "explanation": "Verificarea reduce riscul duplicării.",
      "correctFeedback": "Corect. Verificarea reduce riscul duplicării.",
      "incorrectFeedback": "Nu chiar. Verificarea reduce riscul duplicării.",
      "type": "scenariu",
      "context": "Ecranul de confirmare s-a închis.",
      "options": [
        {
          "id": "0",
          "label": "Istoricul și starea, înainte să repeți operațiunea."
        },
        {
          "id": "1",
          "label": "Aprobi încă trei plăți."
        },
        {
          "id": "2",
          "label": "Presupui că toate au fost anulate."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Același număr apare în altă monedă. Ce concluzie este corectă?",
      "explanation": "Numărul singur nu descrie costul.",
      "correctFeedback": "Corect. Numărul singur nu descrie costul.",
      "incorrectFeedback": "Nu chiar. Numărul singur nu descrie costul.",
      "type": "scenariu",
      "context": "Cumperi de pe un site internațional.",
      "options": [
        {
          "id": "0",
          "label": "Suma este identică automat."
        },
        {
          "id": "1",
          "label": "Valoarea poate fi diferită; verifici moneda și conversia."
        },
        {
          "id": "2",
          "label": "Moneda nu contează digital."
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
          "title": "Operațiune",
          "body": "Verifică suma, moneda și destinatarul.",
          "detail": "Verifică suma, moneda și destinatarul.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Acces",
          "body": "Protejează dispozitivul și aplicațiile.",
          "detail": "Protejează dispozitivul și aplicațiile.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Coduri",
          "body": "Nu comunica autorizări unui apelant.",
          "detail": "Nu comunica autorizări unui apelant.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "La următoarea plată, citește suma și moneda înainte să confirmi.",
          "detail": "La următoarea plată, citește suma și moneda înainte să confirmi.",
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
