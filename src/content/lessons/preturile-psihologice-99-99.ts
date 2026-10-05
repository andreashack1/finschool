import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "preturile-psihologice-99-99",
  "title": "Prețurile psihologice (99,99)",
  "categoryId": "de-ce-cheltuim-cum-cheltuim",
  "chapterId": "creierul-si-banii",
  "slug": "preturile-psihologice-99-99",
  "description": "Dana pune în coș trei produse, fiecare la 99,99 lei.",
  "objective": "Să poți explica prețurile psihologice (99,99) și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Prețurile psihologice (99,99)",
      "body": "Dana pune în coș trei produse, fiecare la 99,99 lei."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un preț de 99,99 lei poate părea mai aproape de 99 decât de 100 la o privire rapidă. Diferența față de 100 este numai un ban. Rotunjirea pentru planificare poate face totalul mai vizibil, dar la plată folosești suma exactă. Nu presupune că orice preț care se termină în 99 este redus ori mai avantajos.",
        "Un obicei de cheltuire nu definește valoarea unei persoane. Observă contextul, informația disponibilă și alternativa pe care o ai. O pauză scurtă și o întrebare concretă pot face alegerea mai ușor de evaluat. Nu trebuie să elimini orice plăcere pentru a construi un plan de bani util."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Cât diferă 99,99 de 100 lei?",
      "explanation": "Un ban.",
      "correctFeedback": "Corect. Un ban.",
      "incorrectFeedback": "Nu chiar. Un ban.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Un ban."
        },
        {
          "id": "1",
          "label": "Un leu."
        },
        {
          "id": "2",
          "label": "Zece lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un preț de 99,99 lei poate părea mai aproape de 99 decât de 100 la o privire rapidă.",
      "explanation": "Un preț de 99,99 lei poate părea mai aproape de 99 decât de 100 la o privire rapidă. Diferența față de 100 este numai un ban. Rotunjirea pentru planificare poate face totalul mai vizibil, dar la plată folosești suma exactă. Nu presupune că orice preț care se termină în 99 este redus ori mai avantajos.",
      "correctFeedback": "Corect. Un preț de 99,99 lei poate părea mai aproape de 99 decât de 100 la o privire rapidă. Diferența față de 100 este numai un ban. Rotunjirea pentru planificare poate face totalul mai vizibil, dar la plată folosești suma exactă. Nu presupune că orice preț care se termină în 99 este redus ori mai avantajos.",
      "incorrectFeedback": "Nu chiar. Un preț de 99,99 lei poate părea mai aproape de 99 decât de 100 la o privire rapidă. Diferența față de 100 este numai un ban. Rotunjirea pentru planificare poate face totalul mai vizibil, dar la plată folosești suma exactă. Nu presupune că orice preț care se termină în 99 este redus ori mai avantajos.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Trei produse de 99,99 lei costă 299,97, aproape 300. Dacă bugetul este 250, depășirea este 49,97. Dana estimează întâi aproximativ 300 și apoi verifică exact totalul. Prețul unui singur produs nu pare enorm, dar suma coșului trebuie comparată cu disponibilul, incluzând transportul ori alte costuri relevante.",
        "Exemplul arată o situație posibilă, nu o reacție obligatorie pentru fiecare om. Folosește cifrele pentru verificarea alegerii și separă ce este confirmat de ce presupui. Poți modifica suma, termenul ori alternativa. Un plan realist arată ce mai rămâne disponibil după decizie, nu doar ce ai cumpărat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cât costă trei produse de 99,99?",
      "explanation": "299,97 lei.",
      "correctFeedback": "Corect. 299,97 lei.",
      "incorrectFeedback": "Nu chiar. 299,97 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "297 lei."
        },
        {
          "id": "1",
          "label": "299,97 lei."
        },
        {
          "id": "2",
          "label": "199,98 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Buget 250 și total 299,97. Care este depășirea?",
      "explanation": "49,97 lei.",
      "correctFeedback": "Corect. 49,97 lei.",
      "incorrectFeedback": "Nu chiar. 49,97 lei.",
      "type": "scenariu",
      "context": "Trei produse de 99,99 lei costă 299,97, aproape 300. Dacă bugetul este 250, depășirea este 49,97. Dana estimează întâi aproximativ 300 și apoi verifică exact totalul. Prețul unui singur produs nu pare enorm, dar suma coșului trebuie comparată cu disponibilul, incluzând transportul ori alte costuri relevante.",
      "options": [
        {
          "id": "0",
          "label": "99,99 lei."
        },
        {
          "id": "1",
          "label": "0,03 lei."
        },
        {
          "id": "2",
          "label": "49,97 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-preturile-psihologice-99-99",
      "paragraphs": [
        "Dana pune în coș trei produse, fiecare la 99,99 lei. Bugetul ei este 250 și prima impresie este că fiecare produs costă sub o sută. Rotunjește pentru plan și vede aproximativ 300, apoi calculează 299,97 exact. Reduce coșul înainte de plată, în loc să lase terminația prețului să înlocuiască verificarea totalului.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Trei produse de 99,99 lei costă 299,97, aproape 300. Dacă bugetul este 250, depășirea este 49,97. Dana estimează întâi aproximativ 300 și apoi verifică exact totalul. Prețul unui singur produs nu pare enorm, dar suma coșului trebuie comparată cu disponibilul, incluzând transportul ori alte costuri relevante. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce primă impresie are Dana?",
      "explanation": "Fiecare produs pare sub pragul de 100.",
      "correctFeedback": "Corect. Fiecare produs pare sub pragul de 100.",
      "incorrectFeedback": "Nu chiar. Fiecare produs pare sub pragul de 100.",
      "caseId": "caz-preturile-psihologice-99-99",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Fiecare produs pare sub pragul de 100."
        },
        {
          "id": "1",
          "label": "Coșul este gratuit."
        },
        {
          "id": "2",
          "label": "Bugetul s-a mărit."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce estimare rapidă îi ajută planul?",
      "explanation": "Aproximativ 300 lei.",
      "correctFeedback": "Corect. Aproximativ 300 lei.",
      "incorrectFeedback": "Nu chiar. Aproximativ 300 lei.",
      "caseId": "caz-preturile-psihologice-99-99",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Aproximativ 200 lei."
        },
        {
          "id": "1",
          "label": "Aproximativ 300 lei."
        },
        {
          "id": "2",
          "label": "Exact 250 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce face înainte de plată?",
      "explanation": "Reduce coșul după verificarea totalului.",
      "correctFeedback": "Corect. Reduce coșul după verificarea totalului.",
      "incorrectFeedback": "Nu chiar. Reduce coșul după verificarea totalului.",
      "caseId": "caz-preturile-psihologice-99-99",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ignoră depășirea."
        },
        {
          "id": "1",
          "label": "Adaugă încă un produs."
        },
        {
          "id": "2",
          "label": "Reduce coșul după verificarea totalului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Prețurile apropiate de un prag nu dovedesc intenția vânzătorului în fiecare caz. Folosește ideea pentru propria verificare, nu pentru a eticheta orice magazin drept fraudulos. Compară totalul și prețul pe unitate. O economie de câțiva bani nu justifică un produs inutil și nu schimbă semnificativ un buget depășit cu zeci de lei.",
        "Dacă ai făcut deja o alegere pe care o regreți, notează ce a declanșat-o și adaptează pasul următor. Rușinea nu completează bugetul. Caută un proces simplu pe care îl poți repeta și verifică efectul în timp. Dacă o problemă persistă și îți afectează viața, cere sprijin potrivit situației."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "La plata efectivă ce sumă folosești?",
      "explanation": "Totalul exact, inclusiv costurile relevante.",
      "correctFeedback": "Corect. Totalul exact, inclusiv costurile relevante.",
      "incorrectFeedback": "Nu chiar. Totalul exact, inclusiv costurile relevante.",
      "type": "scenariu",
      "context": "Trei produse de 99,99 lei costă 299,97, aproape 300. Dacă bugetul este 250, depășirea este 49,97. Dana estimează întâi aproximativ 300 și apoi verifică exact totalul. Prețul unui singur produs nu pare enorm, dar suma coșului trebuie comparată cu disponibilul, incluzând transportul ori alte costuri relevante.",
      "options": [
        {
          "id": "0",
          "label": "Totalul exact, inclusiv costurile relevante."
        },
        {
          "id": "1",
          "label": "Doar estimarea rotunjită ca factură."
        },
        {
          "id": "2",
          "label": "Numai primul produs."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un magazin folosește 99,99. Ce poți concluziona singur?",
      "explanation": "Că trebuie să verifici totalul, nu că este automat fraudă.",
      "correctFeedback": "Corect. Că trebuie să verifici totalul, nu că este automat fraudă.",
      "incorrectFeedback": "Nu chiar. Că trebuie să verifici totalul, nu că este automat fraudă.",
      "type": "scenariu",
      "context": "Trei produse de 99,99 lei costă 299,97, aproape 300. Dacă bugetul este 250, depășirea este 49,97. Dana estimează întâi aproximativ 300 și apoi verifică exact totalul. Prețul unui singur produs nu pare enorm, dar suma coșului trebuie comparată cu disponibilul, incluzând transportul ori alte costuri relevante.",
      "options": [
        {
          "id": "0",
          "label": "Că toate produsele sunt reduse."
        },
        {
          "id": "1",
          "label": "Că trebuie să verifici totalul, nu că este automat fraudă."
        },
        {
          "id": "2",
          "label": "Că orice plată este ilegală."
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
          "body": "Un preț de 99,99 lei poate părea mai aproape de 99 decât de 100 la o privire rapidă.",
          "detail": "Un preț de 99,99 lei poate părea mai aproape de 99 decât de 100 la o privire rapidă.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Trei produse de 99,99 lei costă 299,97, aproape 300. Dacă bugetul este 250, depășirea este 49,97.",
          "detail": "Trei produse de 99,99 lei costă 299,97, aproape 300. Dacă bugetul este 250, depășirea este 49,97.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Prețurile apropiate de un prag nu dovedesc intenția vânzătorului în fiecare caz.",
          "detail": "Prețurile apropiate de un prag nu dovedesc intenția vânzătorului în fiecare caz.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Rotunjește pentru plan trei prețuri fictive și compară estimarea cu totalul exact.",
          "detail": "Rotunjește pentru plan trei prețuri fictive și compară estimarea cu totalul exact.",
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
