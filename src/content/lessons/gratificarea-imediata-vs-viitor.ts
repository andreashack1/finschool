import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "gratificarea-imediata-vs-viitor",
  "title": "Gratificarea imediată vs. viitor",
  "categoryId": "de-ce-cheltuim-cum-cheltuim",
  "chapterId": "obiceiuri",
  "slug": "gratificarea-imediata-vs-viitor",
  "description": "Mara strânge pentru un curs de 600 lei.",
  "objective": "Să poți explica gratificarea imediată vs. viitor și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Gratificarea imediată vs. viitor",
      "body": "Mara strânge pentru un curs de 600 lei."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Gratificarea imediată înseamnă un beneficiu primit acum, în timp ce alte alegeri cer așteptare. Banii folosiți azi nu mai sunt disponibili pentru același scop viitor. Compară costul de oportunitate, fără să consideri orice plăcere actuală greșită. Un plan poate include și prezentul și viitorul, dacă sumele nu sunt numărate de două ori.",
        "Un obicei de cheltuire nu definește valoarea unei persoane. Observă contextul, informația disponibilă și alternativa pe care o ai. O pauză scurtă și o întrebare concretă pot face alegerea mai ușor de evaluat. Nu trebuie să elimini orice plăcere pentru a construi un plan de bani util."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce compari între o plăcere acum și un scop viitor?",
      "explanation": "Costul de oportunitate.",
      "correctFeedback": "Corect. Costul de oportunitate.",
      "incorrectFeedback": "Nu chiar. Costul de oportunitate.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Costul de oportunitate."
        },
        {
          "id": "1",
          "label": "Doar plăcerea de acum, fără ce amâni."
        },
        {
          "id": "2",
          "label": "Doar suma economisită deja, fără efectul retragerii."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Poți alege o plăcere acum și păstra un obiectiv viitor, dacă arăți explicit ce bani folosești și ce termen se schimbă.",
      "explanation": "Alegerea implică un cost de oportunitate. Planul poate fi revizuit, dar aceeași sumă nu poate fi integral cheltuită și economisită simultan.",
      "correctFeedback": "Corect. Alegerea implică un cost de oportunitate. Planul poate fi revizuit, dar aceeași sumă nu poate fi integral cheltuită și economisită simultan.",
      "incorrectFeedback": "Nu chiar. Alegerea implică un cost de oportunitate. Planul poate fi revizuit, dar aceeași sumă nu poate fi integral cheltuită și economisită simultan.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Mara are 200 lei separați pentru un curs de 600 și poate adăuga 100 lunar. Fără alte retrageri, ar mai avea nevoie de patru luni. Dacă folosește 100 acum pentru o ieșire, rămâne cu 100 și ar avea nevoie de cinci luni la același ritm. Alegerea schimbă termenul, nu caracterul persoanei.",
        "Exemplul arată o situație posibilă, nu o reacție obligatorie pentru fiecare om. Folosește cifrele pentru verificarea alegerii și separă ce este confirmat de ce presupui. Poți modifica suma, termenul ori alternativa. Un plan realist arată ce mai rămâne disponibil după decizie, nu doar ce ai cumpărat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Țintă 600, ai 200, adaugi 100 lunar. Câte luni lipsesc?",
      "explanation": "Patru luni.",
      "correctFeedback": "Corect. Patru luni.",
      "incorrectFeedback": "Nu chiar. Patru luni.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Două luni."
        },
        {
          "id": "1",
          "label": "Patru luni."
        },
        {
          "id": "2",
          "label": "Șase luni."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "După retragerea de 100 rămâi cu 100. Câte luni mai trebuie la ritmul de 100?",
      "explanation": "Cinci luni.",
      "correctFeedback": "Corect. Cinci luni.",
      "incorrectFeedback": "Nu chiar. Cinci luni.",
      "type": "scenariu",
      "context": "Mara are 200 lei separați pentru un curs de 600 și poate adăuga 100 lunar. Fără alte retrageri, ar mai avea nevoie de patru luni. Dacă folosește 100 acum pentru o ieșire, rămâne cu 100 și ar avea nevoie de cinci luni la același ritm. Alegerea schimbă termenul, nu caracterul persoanei.",
      "options": [
        {
          "id": "0",
          "label": "Patru luni."
        },
        {
          "id": "1",
          "label": "O lună."
        },
        {
          "id": "2",
          "label": "Cinci luni."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-gratificarea-imediata-vs-viitor",
      "paragraphs": [
        "Mara strânge pentru un curs de 600 lei. Are deja 200 și adaugă 100 pe lună. Primește o invitație de 100 lei și compară cele două variante: patru luni până la curs fără retragere, cinci dacă folosește o sută acum. Decide după ce vede efectul și verifică dacă poate acoperi ieșirea din alt disponibil, fără să dubleze aceiași bani.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Mara are 200 lei separați pentru un curs de 600 și poate adăuga 100 lunar. Fără alte retrageri, ar mai avea nevoie de patru luni. Dacă folosește 100 acum pentru o ieșire, rămâne cu 100 și ar avea nevoie de cinci luni la același ritm. Alegerea schimbă termenul, nu caracterul persoanei. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce efect are ieșirea asupra termenului Marei?",
      "explanation": "Îl prelungește cu o lună în exemplu.",
      "correctFeedback": "Corect. Îl prelungește cu o lună în exemplu.",
      "incorrectFeedback": "Nu chiar. Îl prelungește cu o lună în exemplu.",
      "caseId": "caz-gratificarea-imediata-vs-viitor",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Îl prelungește cu o lună în exemplu."
        },
        {
          "id": "1",
          "label": "Îl scurtează cu o lună."
        },
        {
          "id": "2",
          "label": "Nu îl schimbă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Mara are inițial 200 lei pentru curs. De ce nu îi poate considera și buget liber pentru ieșire fără să schimbe planul?",
      "explanation": "Cei 200 lei fac parte din planul cursului. Dacă folosește o parte acum, suma lipsă și termenul trebuie recalculate.",
      "correctFeedback": "Corect. Cei 200 lei fac parte din planul cursului. Dacă folosește o parte acum, suma lipsă și termenul trebuie recalculate.",
      "incorrectFeedback": "Nu chiar. Cei 200 lei fac parte din planul cursului. Dacă folosește o parte acum, suma lipsă și termenul trebuie recalculate.",
      "caseId": "caz-gratificarea-imediata-vs-viitor",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Economisirea îi transformă în bani suplimentari."
        },
        {
          "id": "1",
          "label": "Suma are deja o destinație; folosirea ei schimbă disponibilul pentru curs."
        },
        {
          "id": "2",
          "label": "Un obiectiv viitor nu este afectat de cheltuielile de azi."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce verifică înainte să folosească alt disponibil?",
      "explanation": "Să nu numere aceeași sumă de două ori.",
      "correctFeedback": "Corect. Să nu numere aceeași sumă de două ori.",
      "incorrectFeedback": "Nu chiar. Să nu numere aceeași sumă de două ori.",
      "caseId": "caz-gratificarea-imediata-vs-viitor",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Să aleagă cea mai mare cheltuială."
        },
        {
          "id": "1",
          "label": "Să ignore termenul cursului."
        },
        {
          "id": "2",
          "label": "Să nu numere aceeași sumă de două ori."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un scop viitor poate deveni neutil, iar planul poate fi revizuit. Nu continua automat doar pentru că ai început. Dacă vrei o plăcere acum, fă vizibil efectul asupra termenului ori a contribuției. O separare simplă a banilor poate ajuta, dar nu creează resurse. Nu promite o contribuție mai mare fără să verifici bugetul.",
        "Dacă ai făcut deja o alegere pe care o regreți, notează ce a declanșat-o și adaptează pasul următor. Rușinea nu completează bugetul. Caută un proces simplu pe care îl poți repeta și verifică efectul în timp. Dacă o problemă persistă și îți afectează viața, cere sprijin potrivit situației."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Obiectivul nu mai este util. Ce poți face?",
      "explanation": "Reevalua planul și destinația banilor.",
      "correctFeedback": "Corect. Reevalua planul și destinația banilor.",
      "incorrectFeedback": "Nu chiar. Reevalua planul și destinația banilor.",
      "type": "scenariu",
      "context": "Mara are 200 lei separați pentru un curs de 600 și poate adăuga 100 lunar. Fără alte retrageri, ar mai avea nevoie de patru luni. Dacă folosește 100 acum pentru o ieșire, rămâne cu 100 și ar avea nevoie de cinci luni la același ritm. Alegerea schimbă termenul, nu caracterul persoanei.",
      "options": [
        {
          "id": "0",
          "label": "Reevalua planul și destinația banilor."
        },
        {
          "id": "1",
          "label": "Cumpăra obligatoriu."
        },
        {
          "id": "2",
          "label": "Șterge economiile."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Vrei să accelerezi termenul. Ce verifici înainte de contribuție mai mare?",
      "explanation": "Dacă bugetul poate susține suma.",
      "correctFeedback": "Corect. Dacă bugetul poate susține suma.",
      "incorrectFeedback": "Nu chiar. Dacă bugetul poate susține suma.",
      "type": "scenariu",
      "context": "Mara are 200 lei separați pentru un curs de 600 și poate adăuga 100 lunar. Fără alte retrageri, ar mai avea nevoie de patru luni. Dacă folosește 100 acum pentru o ieșire, rămâne cu 100 și ar avea nevoie de cinci luni la același ritm. Alegerea schimbă termenul, nu caracterul persoanei.",
      "options": [
        {
          "id": "0",
          "label": "Doar entuziasmul."
        },
        {
          "id": "1",
          "label": "Dacă bugetul poate susține suma."
        },
        {
          "id": "2",
          "label": "Doar ritmul unui prieten."
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
          "body": "O alegere de azi poate muta termenul unui scop viitor.",
          "detail": "O sută de lei folosită acum poate muta termenul cursului Marei de la patru la cinci luni. Alegerea poate fi deliberată, dar efectul asupra economiilor trebuie să rămână vizibil.",
          "type": "normal",
          "detailHighlights": [
            "termenul",
            "lei"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Recalculează obiectivul dacă retragi din economii.",
          "type": "normal",
          "detail": "O retragere din economii poate muta data obiectivului, chiar dacă suma pare mică azi.",
          "detailHighlights": [
            "retragere",
            "economii"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Poți schimba un scop care nu îți mai este util.",
          "type": "normal",
          "detail": "Un obiectiv poate fi revizuit dacă nu mai este util. Revizuirea deliberată diferă de o retragere uitată.",
          "detailHighlights": [
            "retragere",
            "obiectiv"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Calculează cum o cheltuială fictivă de azi ar schimba termenul unui obiectiv.",
          "type": "action",
          "detail": "Notează noul termen după cheltuiala fictivă și verifică dacă accepți schimbarea înainte să decizi.",
          "detailHighlights": [
            "termen"
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
