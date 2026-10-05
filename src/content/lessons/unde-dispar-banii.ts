import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "unde-dispar-banii",
  "title": "Unde dispar banii",
  "categoryId": "economii",
  "chapterId": "bugetul",
  "slug": "unde-dispar-banii",
  "description": "Vlad crede că transportul îi consumă cel mai mult, dar lista plăților mici arată altceva.",
  "objective": "Să poți observa cheltuielile mici/recurente care se acumulează și să identifici ce categorie consumă mai mult decât credeai.",
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
      "title": "Unde dispar banii",
      "body": "Vlad crede că transportul îi consumă cel mai mult, dar lista plăților mici arată altceva."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Banii nu dispar fără o urmă, dar plățile mici sunt ușor de uitat. O evidență scurtă te ajută să vezi diferența dintre impresie și total. Notează cheltuielile efective pentru aceeași perioadă și grupează-le în categorii utile, precum transport, mâncare sau divertisment. Nu ai nevoie de zeci de etichete pentru început.",
        "O categorie cu multe plăți mici poate depăși una cu o singură plată mare. Nu judeca fiecare cumpărătură numai după sumă. Uită-te la frecvență și total, apoi întreabă dacă folosirea banilor corespunde priorităților tale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce ajută să verifici impresia despre cheltuieli?",
      "explanation": "Frecvența și totalul completează memoria.",
      "correctFeedback": "Corect. Frecvența și totalul completează memoria.",
      "incorrectFeedback": "Nu chiar. Frecvența și totalul completează memoria.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Totalurile aceleiași perioade, grupate util."
        },
        {
          "id": "1",
          "label": "Doar ultima plată mare."
        },
        {
          "id": "2",
          "label": "Doar soldul fără operațiuni."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O plată mică nu poate avea impact mare prin repetare.",
      "explanation": "Sumele mici se adună când apar des.",
      "correctFeedback": "Corect. Sumele mici se adună când apar des.",
      "incorrectFeedback": "Nu chiar. Sumele mici se adună când apar des.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu, o gustare de 12 lei cumpărată în 15 zile costă 180 lei. Un abonament de transport de 120 lei este mai vizibil ca plată unică, dar mai mic decât totalul gustărilor. Calculul nu spune că gustările trebuie eliminate; arată care categorie consumă resursele.",
        "Folosește date reale când poți și marchează estimările. Separă transferurile proprii și retragerile de consum, ca să nu dublezi sume. Dacă ai numerar, urmărește cumpărăturile făcute cu el. Un extras al contului nu explică automat toate destinațiile banilor retrași."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "12 lei în 15 zile costă cât?",
      "explanation": "12 × 15 = 180 lei.",
      "correctFeedback": "Corect. 12 × 15 = 180 lei.",
      "incorrectFeedback": "Nu chiar. 12 × 15 = 180 lei.",
      "type": "scenariu",
      "context": "Ai cumpărat o gustare în fiecare dintre acele zile.",
      "options": [
        {
          "id": "0",
          "label": "27 lei."
        },
        {
          "id": "1",
          "label": "180 lei."
        },
        {
          "id": "2",
          "label": "120 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Retragi și apoi cumperi cu numerarul. Cum eviți dublarea?",
      "explanation": "Retragerea și cumpărarea sunt operațiuni diferite.",
      "correctFeedback": "Corect. Retragerea și cumpărarea sunt operațiuni diferite.",
      "incorrectFeedback": "Nu chiar. Retragerea și cumpărarea sunt operațiuni diferite.",
      "type": "scenariu",
      "context": "Vrei un total corect al consumului.",
      "options": [
        {
          "id": "0",
          "label": "Aduni ambele ca același consum."
        },
        {
          "id": "1",
          "label": "Ignori toate plățile cash."
        },
        {
          "id": "2",
          "label": "Separi mutarea banilor de cheltuiala reală."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-unde-dispar-banii",
      "paragraphs": [
        "Vlad își verifică banii după trei săptămâni de facultate. Este convins că transportul este categoria cea mai mare, fiindcă a plătit o dată 120 lei. Notează apoi gustări de 12 lei în 15 zile, un abonament nefolosit de 20 lei și alte cumpărături. Totalul gustărilor este 180 lei, mai mare decât transportul.",
        "Vlad nu declară că orice gustare este greșită. Compară folosirea banilor cu scopul său de a strânge pentru un curs. Încearcă o frecvență diferită și verifică din nou totalul. Separă și o retragere de numerar de plățile făcute ulterior, pentru a nu dubla costul. O ieșire specială din acea perioadă este notată ca excepție. Lista îi oferă o bază pentru schimbare, nu un verdict despre caracter sau despre fiecare activitate plăcută."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce categorie este mai mare în comparația din caz?",
      "explanation": "Totalul, nu vizibilitatea plății, decide comparația.",
      "correctFeedback": "Corect. Totalul, nu vizibilitatea plății, decide comparația.",
      "incorrectFeedback": "Nu chiar. Totalul, nu vizibilitatea plății, decide comparația.",
      "caseId": "caz-unde-dispar-banii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Gustările: 180 lei față de 120 transport."
        },
        {
          "id": "1",
          "label": "Transportul doar fiindcă plata este unică."
        },
        {
          "id": "2",
          "label": "Sunt egale."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce ajustare poate testa Vlad?",
      "explanation": "O ajustare concretă poate fi realistă și măsurabilă.",
      "correctFeedback": "Corect. O ajustare concretă poate fi realistă și măsurabilă.",
      "incorrectFeedback": "Nu chiar. O ajustare concretă poate fi realistă și măsurabilă.",
      "caseId": "caz-unde-dispar-banii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Eliminarea obligatorie a tuturor plăcerilor."
        },
        {
          "id": "1",
          "label": "O schimbare de frecvență și verificarea rezultatului."
        },
        {
          "id": "2",
          "label": "Ignorarea scopului personal."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "De ce notează ieșirea ca excepție?",
      "explanation": "Contextul explică variațiile.",
      "correctFeedback": "Corect. Contextul explică variațiile.",
      "incorrectFeedback": "Nu chiar. Contextul explică variațiile.",
      "caseId": "caz-unde-dispar-banii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ca să o ascundă din evidență."
        },
        {
          "id": "1",
          "label": "Ca să dubleze venitul."
        },
        {
          "id": "2",
          "label": "Ca să nu o transforme automat în media fiecărei perioade."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "După ce vezi totalurile, alege o ajustare concretă și realistă. Poți schimba frecvența, varianta sau o altă categorie. Nu trebuie să tai toate lucrurile plăcute pentru a avea un buget. Scopul este să alegi folosirea banilor pe baza informației, fără presupuneri sau vinovăție.",
        "O singură săptămână poate fi neobișnuită. Dacă ai avut o excursie sau o reparație, nu transforma imediat acel total în media fiecărei luni. Notează contextul și verifică alte perioade. O evidență utilă explică atât repetițiile, cât și excepțiile, apoi te ajută să adaptezi planul."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Datele lipsesc pentru câteva plăți. Ce faci?",
      "explanation": "O estimare transparentă este mai utilă decât falsa certitudine.",
      "correctFeedback": "Corect. O estimare transparentă este mai utilă decât falsa certitudine.",
      "incorrectFeedback": "Nu chiar. O estimare transparentă este mai utilă decât falsa certitudine.",
      "type": "scenariu",
      "context": "Completezi evidența săptămânii.",
      "options": [
        {
          "id": "0",
          "label": "Marchezi estimările și verifici documentele disponibile."
        },
        {
          "id": "1",
          "label": "Inventez precizie perfectă."
        },
        {
          "id": "2",
          "label": "Renunți la toate totalurile."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Care este scopul categorisirii?",
      "explanation": "Evidența este un instrument de decizie.",
      "correctFeedback": "Corect. Evidența este un instrument de decizie.",
      "incorrectFeedback": "Nu chiar. Evidența este un instrument de decizie.",
      "type": "scenariu",
      "context": "Ai aflat unde merg banii.",
      "options": [
        {
          "id": "0",
          "label": "Să judeci orice cumpărătură drept bună sau rea."
        },
        {
          "id": "1",
          "label": "Să alegi ajustări pe baza totalurilor și priorităților."
        },
        {
          "id": "2",
          "label": "Să ai cât mai multe etichete."
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
          "title": "Frecvență",
          "body": "Urmărește totalul plăților mici.",
          "detail": "Urmărește totalul plăților mici.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Evidență",
          "body": "Separă mutările de consum.",
          "detail": "Separă mutările de consum.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Context",
          "body": "Distinge repetițiile de excepții.",
          "detail": "Distinge repetițiile de excepții.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Adună o categorie de cheltuieli mici din ultima săptămână și compar-o cu estimarea ta inițială.",
          "detail": "Adună o categorie de cheltuieli mici din ultima săptămână și compar-o cu estimarea ta inițială.",
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
