import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "oferte-prea-bune-ca-sa-fie-reale",
  "title": "Oferte prea bune ca să fie reale",
  "categoryId": "siguranta-financiara",
  "chapterId": "magazine-si-oferte-false",
  "slug": "oferte-prea-bune-ca-sa-fie-reale",
  "description": "Teo primește o ofertă de telefon ieftin, dar trebuie să plătească imediat un avans fără documente.",
  "objective": "Să poți evalua o ofertă foarte atractivă și să identifici ce informații trebuie verificate înainte să plătești.",
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
      "title": "Oferte prea bune ca să fie reale",
      "body": "Teo primește o ofertă de telefon ieftin, dar trebuie să plătească imediat un avans fără documente."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O ofertă foarte atractivă poate fi legitimă, dar diferența mare față de alternative cere o explicație. Poate exista un produs folosit, un defect, o condiție sau un cost suplimentar. Nu concluziona nici că este sigură, nici că este falsă doar din preț. Caută informațiile care explică avantajul.",
        "Verifică produsul exact, starea lui, identitatea vânzătorului și condițiile plății. O promisiune verbală nu substituie datele. Când oferta cere bani înainte să ofere informații esențiale, separă oportunitatea de presiune. Poți cere clarificări și poți refuza continuarea dacă nu le primești."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce cere un preț mult mai mic?",
      "explanation": "Avantajul trebuie explicat, nu presupus.",
      "correctFeedback": "Corect. Avantajul trebuie explicat, nu presupus.",
      "incorrectFeedback": "Nu chiar. Avantajul trebuie explicat, nu presupus.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "O explicație verificabilă și compararea condițiilor."
        },
        {
          "id": "1",
          "label": "Plată automată."
        },
        {
          "id": "2",
          "label": "Verdict sigur numai din preț."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un avans mic nu poate produce nicio pierdere.",
      "explanation": "Avansul este o plată reală și poate fi urmat de alte cereri.",
      "correctFeedback": "Corect. Avansul este o plată reală și poate fi urmat de alte cereri.",
      "incorrectFeedback": "Nu chiar. Avansul este o plată reală și poate fi urmat de alte cereri.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un avans este tot o plată și merită aceeași verificare ca restul sumei. Nu îl considera fără risc doar fiindcă este mic față de prețul total. Într-un exemplu, un produs de 600 lei cere 150 lei înainte. Dacă informația este falsă, pierderea inițială poate fi 150 lei, iar alte solicitări pot urma.",
        "Atenție și la recompense condiționate: ai câștigat ceva, dar trebuie să plătești o taxă ori să oferi date. Întreabă dacă ai participat, cine organizează și ce operațiune se cere. Verificarea se face independent, nu prin contactul unic oferit în mesaj."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Un produs de 600 lei cere 150 avans. Ce sumă expui inițial?",
      "explanation": "Mărimea față de total nu anulează riscul avansului.",
      "correctFeedback": "Corect. Mărimea față de total nu anulează riscul avansului.",
      "incorrectFeedback": "Nu chiar. Mărimea față de total nu anulează riscul avansului.",
      "type": "scenariu",
      "context": "Nu ai verificat destinatarul.",
      "options": [
        {
          "id": "0",
          "label": "0 lei."
        },
        {
          "id": "1",
          "label": "150 lei."
        },
        {
          "id": "2",
          "label": "Doar 1 leu."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Mesajul spune că ai câștigat, dar cere o taxă. Ce faci?",
      "explanation": "Povestea recompensei poate ascunde plata sau colectarea datelor.",
      "correctFeedback": "Corect. Povestea recompensei poate ascunde plata sau colectarea datelor.",
      "incorrectFeedback": "Nu chiar. Povestea recompensei poate ascunde plata sau colectarea datelor.",
      "type": "scenariu",
      "context": "Nu îți amintești participarea.",
      "options": [
        {
          "id": "0",
          "label": "Plătești pentru orice premiu pretins."
        },
        {
          "id": "1",
          "label": "Dai parola ca dovadă de interes."
        },
        {
          "id": "2",
          "label": "Verifici organizatorul și participarea prin canal independent."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-oferte-prea-bune-ca-sa-fie-reale",
      "paragraphs": [
        "Teo caută un telefon folosit pentru proiectele sale. Un vânzător necunoscut propune un model la 600 lei, mult sub alte oferte comparabile. Spune că are nevoie de 150 lei avans în următoarele minute și nu poate trimite acum informații despre starea aparatului. Fotografiile arată bine, dar nu identifică sigur produsul oferit.",
        "Teo întreabă despre defecte, accesoriile incluse, identitatea vânzătorului și condițiile predării. Primește doar un mesaj care îi spune că alt cumpărător este pregătit. Nu confundă competiția pretinsă cu o dovadă de autenticitate. Compară ofertele și nu trimite avansul fără clarificare. Mai observă o cerere de fotografie a actului, care nu este explicată de tranzacție. O ofertă ieftină poate avea o explicație reală, dar Teo trebuie să o afle înainte să ofere bani sau date, nu după promisiune."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce informație importantă îi lipsește lui Teo?",
      "explanation": "Produsul exact trebuie verificat.",
      "correctFeedback": "Corect. Produsul exact trebuie verificat.",
      "incorrectFeedback": "Nu chiar. Produsul exact trebuie verificat.",
      "caseId": "caz-oferte-prea-bune-ca-sa-fie-reale",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Starea produsului și condițiile vânzării."
        },
        {
          "id": "1",
          "label": "Numărul tuturor telefoanelor din oraș."
        },
        {
          "id": "2",
          "label": "Preferința prietenilor pentru culori."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Alt cumpărător pretins confirmă oferta?",
      "explanation": "Popularitatea pretinsă nu confirmă identitatea.",
      "correctFeedback": "Corect. Popularitatea pretinsă nu confirmă identitatea.",
      "incorrectFeedback": "Nu chiar. Popularitatea pretinsă nu confirmă identitatea.",
      "caseId": "caz-oferte-prea-bune-ca-sa-fie-reale",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Da, orice competiție este dovadă."
        },
        {
          "id": "1",
          "label": "Nu; creează presiune, fără a verifica produsul."
        },
        {
          "id": "2",
          "label": "Da, dacă mesajul este rapid."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce trebuie să afle despre actul cerut?",
      "explanation": "Datele personale cer un scop clar și verificat.",
      "correctFeedback": "Corect. Datele personale cer un scop clar și verificat.",
      "incorrectFeedback": "Nu chiar. Datele personale cer un scop clar și verificat.",
      "caseId": "caz-oferte-prea-bune-ca-sa-fie-reale",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Cât de repede poate trimite toate datele."
        },
        {
          "id": "1",
          "label": "Cum să includă și parola."
        },
        {
          "id": "2",
          "label": "De ce este necesar și dacă solicitarea este legitimă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Urgența reduce timpul pentru comparație și poate împiedica discuția cu altcineva. O ofertă care nu suportă întrebări clare despre produs, destinatar și condiții nu devine mai sigură prin grabă. Nu trebuie să plătești pentru a demonstra că ești interesat sau că ai încredere.",
        "Mai compară valoarea totală și consecințele. Dacă sunt cerute documente personale sau acces la cont, riscul depășește avansul. Nu trimite informații inutile pentru o simplă ofertă. O verificare bună poate confirma oportunitatea sau poate opri tranzacția; scopul este procesul clar, nu un verdict automat asupra tuturor prețurilor mici."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O ofertă nu răspunde la întrebări esențiale. Ce poți face?",
      "explanation": "Interesul nu creează obligație de plată.",
      "correctFeedback": "Corect. Interesul nu creează obligație de plată.",
      "incorrectFeedback": "Nu chiar. Interesul nu creează obligație de plată.",
      "type": "scenariu",
      "context": "Destinatarul și condițiile rămân neclare.",
      "options": [
        {
          "id": "0",
          "label": "Oprești tranzacția înainte de bani și date."
        },
        {
          "id": "1",
          "label": "Plătești ca să afli ulterior."
        },
        {
          "id": "2",
          "label": "Presupui că graba elimină riscul."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce poate confirma o ofertă ieftină legitimă?",
      "explanation": "Verificarea poate susține sau respinge oportunitatea.",
      "correctFeedback": "Corect. Verificarea poate susține sau respinge oportunitatea.",
      "incorrectFeedback": "Nu chiar. Verificarea poate susține sau respinge oportunitatea.",
      "type": "scenariu",
      "context": "Vrei să evaluezi fără prejudecăți.",
      "options": [
        {
          "id": "0",
          "label": "Doar promisiunea unui profit."
        },
        {
          "id": "1",
          "label": "Date coerente despre produs, vânzător și condiții."
        },
        {
          "id": "2",
          "label": "Doar un cronometru."
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
          "title": "Explicație",
          "body": "Caută motivul diferenței de preț.",
          "detail": "Caută motivul diferenței de preț.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Avans",
          "body": "Este o plată, nu o verificare a încrederii.",
          "detail": "Este o plată, nu o verificare a încrederii.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Date",
          "body": "Nu oferi informații personale fără scop legitim.",
          "detail": "Nu oferi informații personale fără scop legitim.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "La o ofertă foarte ieftină, notează trei informații fără de care nu ai plăti.",
          "detail": "La o ofertă foarte ieftină, notează trei informații fără de care nu ai plăti.",
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
