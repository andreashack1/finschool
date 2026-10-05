import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "plateste-te-pe-tine-primul",
  "title": "Plătește-te pe tine primul",
  "categoryId": "economii",
  "chapterId": "economisirea",
  "slug": "plateste-te-pe-tine-primul",
  "description": "Mara vrea să economisească ce rămâne, dar suma este diferită în fiecare lună. O separare planificată schimbă ordinea.",
  "objective": "Să poți explica de ce separarea economiilor înainte de cheltuieli poate face economisirea mai predictibilă.",
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
      "title": "Plătește-te pe tine primul",
      "body": "Mara vrea să economisească ce rămâne, dar suma este diferită în fiecare lună. O separare planificată schimbă ordinea."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Ideea de a te plăti pe tine primul înseamnă să separi o sumă planificată pentru obiective când intră venitul, în loc să aștepți numai restul de la final. Ordinea poate face contribuția mai vizibilă și mai predictibilă. Nu înseamnă să ignori chiria, hrana sau alte obligații importante.",
        "Suma se stabilește după verificarea bugetului. Un transfer între conturi proprii nu creează bani și nu este un consum. Schimbă destinația și accesul perceput. Poți folosi un spațiu separat sau o evidență simplă, în funcție de instrumentele și condițiile disponibile."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce schimbă metoda în principal?",
      "explanation": "Economisirea devine vizibilă înainte de restul alegerilor.",
      "correctFeedback": "Corect. Economisirea devine vizibilă înainte de restul alegerilor.",
      "incorrectFeedback": "Nu chiar. Economisirea devine vizibilă înainte de restul alegerilor.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Ordinea separării unei contribuții planificate."
        },
        {
          "id": "1",
          "label": "Creează automat venit nou."
        },
        {
          "id": "2",
          "label": "Elimină obligațiile."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Metoda cere ignorarea costurilor esențiale.",
      "explanation": "Contribuția trebuie verificată în buget.",
      "correctFeedback": "Corect. Contribuția trebuie verificată în buget.",
      "incorrectFeedback": "Nu chiar. Contribuția trebuie verificată în buget.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu, intră 1.000 lei, ai costuri relevante de 700 și alegi să separi 100 pentru un obiectiv. Rămân 200 lei pentru alte alegeri. Dacă separi 400 fără verificare, planul nu mai acoperă costurile de 700. Ordinea nu repară o sumă nerealistă.",
        "Un transfer automat poate ajuta când venitul are un calendar potrivit, dar trebuie verificat în lunile cu intrări diferite. Nu lăsa o automatizare să genereze o problemă pe care planul nu o anticipase. Confirmă costurile serviciului și accesul la banii separați înainte de a folosi instrumentul."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Din 1.000, după 700 costuri și 100 economii, cât rămâne?",
      "explanation": "1.000 − 700 − 100 = 200 lei.",
      "correctFeedback": "Corect. 1.000 − 700 − 100 = 200 lei.",
      "incorrectFeedback": "Nu chiar. 1.000 − 700 − 100 = 200 lei.",
      "type": "scenariu",
      "context": "Nu există alte sume în exemplu.",
      "options": [
        {
          "id": "0",
          "label": "300 lei."
        },
        {
          "id": "1",
          "label": "200 lei."
        },
        {
          "id": "2",
          "label": "900 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Venitul întârzie și transferul este automat. Ce verifici?",
      "explanation": "Instrumentul nu înlocuiește verificarea contextului.",
      "correctFeedback": "Corect. Instrumentul nu înlocuiește verificarea contextului.",
      "incorrectFeedback": "Nu chiar. Instrumentul nu înlocuiește verificarea contextului.",
      "type": "scenariu",
      "context": "Intrările nu sunt identice lunar.",
      "options": [
        {
          "id": "0",
          "label": "Presupui că automatizarea creează bani."
        },
        {
          "id": "1",
          "label": "Ignori orice cost apropiat."
        },
        {
          "id": "2",
          "label": "Calendarul, disponibilul și adaptarea transferului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-plateste-te-pe-tine-primul",
      "paragraphs": [
        "Mara primește în exemplu 1.000 lei lunar și are costuri relevante de 700 lei. Până acum a încercat să pună deoparte doar ce rămânea la sfârșit, iar suma varia mult. Vrea un obiectiv de curs și stabilește o contribuție de 100 lei după verificarea bugetului. La intrare o separă în evidență, păstrând 200 lei pentru alte alegeri.",
        "Într-o lună venitul ajunge mai târziu. Mara nu presupune că automatizarea știe acest lucru și verifică planul înainte de transfer. Nu separă 400 lei doar pentru a accelera obiectivul, fiindcă ar lipsi bani pentru costurile relevante. Mai clarifică accesul la suma pusă deoparte și condițiile serviciului. Dacă apare o nevoie importantă, revizuiește contribuția și notează schimbarea. Ordinea ajută sistemul, dar suma și instrumentul trebuie să rămână potrivite contextului."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "De ce Mara nu separă 400 lei?",
      "explanation": "Suma propusă depășește spațiul planului.",
      "correctFeedback": "Corect. Suma propusă depășește spațiul planului.",
      "incorrectFeedback": "Nu chiar. Suma propusă depășește spațiul planului.",
      "caseId": "caz-plateste-te-pe-tine-primul",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Nu ar mai acoperi costurile relevante de 700."
        },
        {
          "id": "1",
          "label": "Economiile sunt mereu inutile."
        },
        {
          "id": "2",
          "label": "Transferul creează o datorie obligatorie."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce rol are mutarea celor 100 lei?",
      "explanation": "Transferul propriu schimbă locul sau evidența.",
      "correctFeedback": "Corect. Transferul propriu schimbă locul sau evidența.",
      "incorrectFeedback": "Nu chiar. Transferul propriu schimbă locul sau evidența.",
      "caseId": "caz-plateste-te-pe-tine-primul",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Dublez banii."
        },
        {
          "id": "1",
          "label": "Separă destinația, fără a crea venit sau consum."
        },
        {
          "id": "2",
          "label": "Șterge proprietatea sumei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce face când apare o nevoie importantă?",
      "explanation": "Planul poate fi adaptat fără verdict moral.",
      "correctFeedback": "Corect. Planul poate fi adaptat fără verdict moral.",
      "incorrectFeedback": "Nu chiar. Planul poate fi adaptat fără verdict moral.",
      "caseId": "caz-plateste-te-pe-tine-primul",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ascunde retragerea din evidență."
        },
        {
          "id": "1",
          "label": "Se declară incapabilă de economisire."
        },
        {
          "id": "2",
          "label": "Revizuiește și documentează contribuția."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Separarea nu trebuie confundată cu blocarea permanentă a banilor. Un obiectiv și o rezervă pentru situații neașteptate pot avea nevoi diferite de acces. Verifică unde pui suma și cum o poți folosi conform scopului. Nu căuta doar o barieră care pare disciplină, dar te lasă fără resurse necesare.",
        "Poți revizui contribuția atunci când realitatea se schimbă. Dacă ai retras pentru o nevoie justificată, notează ce s-a întâmplat și adaptează planul. Sistemul urmărește repetabilitatea, nu perfecțiunea morală. Un proces simplu și clar poate susține economisirea mai bine decât o promisiune mare care este abandonată."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici la locul economiilor?",
      "explanation": "O barieră nu este utilă dacă ignoră nevoia de acces.",
      "correctFeedback": "Corect. O barieră nu este utilă dacă ignoră nevoia de acces.",
      "incorrectFeedback": "Nu chiar. O barieră nu este utilă dacă ignoră nevoia de acces.",
      "type": "scenariu",
      "context": "Alegi un instrument de separare.",
      "options": [
        {
          "id": "0",
          "label": "Accesul, costurile și potrivirea cu scopul."
        },
        {
          "id": "1",
          "label": "Doar cât de dificil este să retragi."
        },
        {
          "id": "2",
          "label": "Doar numele aplicației."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Care sistem este mai repetabil?",
      "explanation": "Repetabilitatea depinde de realism și claritate.",
      "correctFeedback": "Corect. Repetabilitatea depinde de realism și claritate.",
      "incorrectFeedback": "Nu chiar. Repetabilitatea depinde de realism și claritate.",
      "type": "scenariu",
      "context": "Vrei economisire predictibilă.",
      "options": [
        {
          "id": "0",
          "label": "O sumă imposibilă aleasă din entuziasm."
        },
        {
          "id": "1",
          "label": "O contribuție realistă revizuită la schimbări."
        },
        {
          "id": "2",
          "label": "Așteptarea fără evidență a unui rest perfect."
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
          "title": "Ordine",
          "body": "Separă o contribuție planificată la intrarea venitului.",
          "detail": "Separă o contribuție planificată la intrarea venitului.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Buget",
          "body": "Nu ignora obligațiile relevante.",
          "detail": "Nu ignora obligațiile relevante.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Revizuire",
          "body": "Automatizarea și suma se adaptează.",
          "detail": "Automatizarea și suma se adaptează.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Simulează pe hârtie o contribuție mică la intrarea venitului și verifică ce rămâne după obligații.",
          "detail": "Simulează pe hârtie o contribuție mică la intrarea venitului și verifică ce rămâne după obligații.",
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
