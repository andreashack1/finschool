import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "protejeaza-datele-cardului",
  "title": "Protejează datele cardului",
  "categoryId": "siguranta-financiara",
  "chapterId": "datele-tale",
  "slug": "protejeaza-datele-cardului",
  "description": "Mara vede câmpuri într-o plată și o cerere de cod prin chat. Folosirea datelor într-un serviciu verificat diferă de trimiterea lor unui interlocutor.",
  "objective": "Să poți diferenția informațiile pe care le poți folosi în mod normal de cele pe care nu trebuie să le comunici altcuiva.",
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
      "title": "Protejează datele cardului",
      "body": "Mara vede câmpuri într-o plată și o cerere de cod prin chat. Folosirea datelor într-un serviciu verificat diferă de trimiterea lor unui interlocutor."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Datele cardului și credențialele de acces au roluri diferite. Unele informații sunt folosite într-o plată legitimă, printr-un comerciant și un serviciu verificați. PIN-ul, parolele și codurile de autorizare nu se dictează unei persoane care promite să te ajute. Contextul în care introduci informația este esențial.",
        "Nu publica fotografii ale cardului și nu trimite datele complete într-un chat. Pentru o încasare prin transfer, identificatorul contului nu este același lucru cu datele de autorizare ale unei plăți. Întreabă ce operațiune este necesară și de ce sunt cerute informațiile respective."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce face diferența între folosire și expunere?",
      "explanation": "Contextul legitim este esențial.",
      "correctFeedback": "Corect. Contextul legitim este esențial.",
      "incorrectFeedback": "Nu chiar. Contextul legitim este esențial.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Operațiunea și canalul verificat în care oferi informația."
        },
        {
          "id": "1",
          "label": "Doar faptul că există un telefon."
        },
        {
          "id": "2",
          "label": "Doar numărul de câmpuri."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Codul de autorizare se dictează unui interlocutor pentru orice rambursare.",
      "explanation": "Codul poate autoriza accesul sau operațiuni.",
      "correctFeedback": "Corect. Codul poate autoriza accesul sau operațiuni.",
      "incorrectFeedback": "Nu chiar. Codul poate autoriza accesul sau operațiuni.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un cod primit poate confirma accesul sau o tranzacție. Citește mesajul și suma, nu doar cifrele. Dacă nu ai inițiat operațiunea, oprește-te și verifică prin instituția contactată separat. O persoană care cunoaște câteva date ale cardului nu devine prin asta autorizată să primească restul.",
        "La o plată online, verifică site-ul, comerciantul și totalul înainte de date. Protecția conexiunii nu dovedește singură că operatorul este autentic. Pe un dispozitiv comun, evită salvarea necontrolată a datelor și protejează contul. Comoditatea unei plăți rapide nu trebuie să ascundă o cerere necunoscută."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Primești un cod pentru o operațiune neinițiată. Ce faci?",
      "explanation": "Mesajul trebuie citit și asociat intenției tale.",
      "correctFeedback": "Corect. Mesajul trebuie citit și asociat intenției tale.",
      "incorrectFeedback": "Nu chiar. Mesajul trebuie citit și asociat intenției tale.",
      "type": "scenariu",
      "context": "Nu ai făcut o plată.",
      "options": [
        {
          "id": "0",
          "label": "Îl trimiți oricui îl cere."
        },
        {
          "id": "1",
          "label": "Oprești și verifici separat, fără să comunici codul."
        },
        {
          "id": "2",
          "label": "Publici mesajul cu toate datele."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un comerciant este necunoscut. Ce verifici înainte de date?",
      "explanation": "Protecția tehnică nu confirmă operatorul.",
      "correctFeedback": "Corect. Protecția tehnică nu confirmă operatorul.",
      "incorrectFeedback": "Nu chiar. Protecția tehnică nu confirmă operatorul.",
      "type": "scenariu",
      "context": "Vrei să cumperi online.",
      "options": [
        {
          "id": "0",
          "label": "Doar simbolul conexiunii."
        },
        {
          "id": "1",
          "label": "Doar promisiunea de reducere."
        },
        {
          "id": "2",
          "label": "Identitatea, site-ul și totalul."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-protejeaza-datele-cardului",
      "paragraphs": [
        "Mara cumpără un bilet de la un organizator verificat și vede câmpurile serviciului de plată. Verifică totalul și comerciantul înainte să continue. Mai târziu, o persoană dintr-un chat spune că are nevoie de o fotografie a cardului și de un cod pentru a-i trimite o rambursare. Mara nu confundă pagina legitimă de plată cu solicitarea unui interlocutor.",
        "Ea citește mesajul de autorizare și observă că descrie o operațiune pe care nu a inițiat-o. Nu comunică cifrele și contactează separat serviciul cunoscut. Pentru o încasare legitimă ar verifica informația de cont necesară, fără parole sau fotografie completă. Dacă ar fi trimis deja date, ar explica băncii exact ce a expus și ar verifica protecția disponibilă. Nu ar plăti unui necunoscut pentru ștergerea datelor și nu ar aștepta o pierdere ca să ia în serios expunerea."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "De ce Mara nu trimite fotografia cardului?",
      "explanation": "Cererea trebuie justificată prin operațiunea legitimă.",
      "correctFeedback": "Corect. Cererea trebuie justificată prin operațiunea legitimă.",
      "incorrectFeedback": "Nu chiar. Cererea trebuie justificată prin operațiunea legitimă.",
      "caseId": "caz-protejeaza-datele-cardului",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ar expune date inutile unei cereri neconfirmate."
        },
        {
          "id": "1",
          "label": "Cardul nu are nicio informație."
        },
        {
          "id": "2",
          "label": "Orice rambursare cere fotografia."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce observă în mesajul de autorizare?",
      "explanation": "Conținutul codului arată scopul cererii.",
      "correctFeedback": "Corect. Conținutul codului arată scopul cererii.",
      "incorrectFeedback": "Nu chiar. Conținutul codului arată scopul cererii.",
      "caseId": "caz-protejeaza-datele-cardului",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "O dovadă că interlocutorul este banca."
        },
        {
          "id": "1",
          "label": "O operațiune pe care nu a inițiat-o."
        },
        {
          "id": "2",
          "label": "O obligație de a răspunde rapid."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce explică băncii dacă a expus date?",
      "explanation": "Datele precise ajută protecția și verificarea.",
      "correctFeedback": "Corect. Datele precise ajută protecția și verificarea.",
      "incorrectFeedback": "Nu chiar. Datele precise ajută protecția și verificarea.",
      "caseId": "caz-protejeaza-datele-cardului",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar că se simte rușinată."
        },
        {
          "id": "1",
          "label": "Nimic până apare o pierdere."
        },
        {
          "id": "2",
          "label": "Ce informații a trimis și ce operațiuni a observat."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Dacă observi că ai expus date, reacționează prin banca ta: verifică operațiunile și opțiunile de protecție aplicabile. Nu presupune că lipsa unei plăți imediate înseamnă că informația este sigură. Păstrează mesajele și explică exact ce ai comunicat, fără panică sau rușinare.",
        "Nu oferi altă parolă unui serviciu care promite ștergerea datelor expuse. O nouă cerere poate adăuga risc. Regula practică este să separi identificarea, datele folosite într-o plată legitimă și autorizările personale. Distribuirea minimă și verificarea canalului sunt mai utile decât ideea că orice câmp de plată este bun sau rău în orice context."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Nu vezi încă o plată după expunere. Ce nu presupui?",
      "explanation": "Absența unei pierderi imediate nu anulează expunerea.",
      "correctFeedback": "Corect. Absența unei pierderi imediate nu anulează expunerea.",
      "incorrectFeedback": "Nu chiar. Absența unei pierderi imediate nu anulează expunerea.",
      "type": "scenariu",
      "context": "Ai trimis date pe un site suspect.",
      "options": [
        {
          "id": "0",
          "label": "Că informația este automat sigură."
        },
        {
          "id": "1",
          "label": "Că poți cere ajutor oficial."
        },
        {
          "id": "2",
          "label": "Că merită urmărit contul."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un necunoscut promite ștergerea datelor dacă îi dai parola. Ce faci?",
      "explanation": "O cerere nouă poate extinde riscul.",
      "correctFeedback": "Corect. O cerere nouă poate extinde riscul.",
      "incorrectFeedback": "Nu chiar. O cerere nouă poate extinde riscul.",
      "type": "scenariu",
      "context": "Vrei să limitezi consecințele expunerii.",
      "options": [
        {
          "id": "0",
          "label": "Oferi parola pentru recuperare."
        },
        {
          "id": "1",
          "label": "Refuzi și folosești canalele oficiale relevante."
        },
        {
          "id": "2",
          "label": "Trimiți și datele altui card."
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
          "body": "Identificarea și autorizarea sunt diferite.",
          "detail": "Identificarea și autorizarea sunt diferite.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Canal",
          "body": "Folosește date numai într-o operațiune legitimă verificată.",
          "detail": "Folosește date numai într-o operațiune legitimă verificată.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Reacție",
          "body": "Expunerea merită verificată înainte de o pierdere.",
          "detail": "Expunerea merită verificată înainte de o pierdere.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Verifică unde ai salvat date de plată pe dispozitive comune și elimină salvările inutile prin setările legitime.",
          "detail": "Verifică unde ai salvat date de plată pe dispozitive comune și elimină salvările inutile prin setările legitime.",
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
