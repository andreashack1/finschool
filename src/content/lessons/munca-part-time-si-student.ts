import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "munca-part-time-si-student",
  "title": "Muncă part-time și student",
  "categoryId": "primul-job",
  "chapterId": "primul-job",
  "slug": "munca-part-time-si-student",
  "description": "Daria este studentă și are cursuri până la prânz.",
  "objective": "Să poți explica muncă part-time și student și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [
  {
    "label": "Inspecția Muncii · Codul muncii",
    "url": "https://inprobe.inspectiamuncii.ro/informatii-utile/codul-muncii/"
  },
  {
    "label": "ANAF · Codul fiscal",
    "url": "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Muncă part-time și student",
      "body": "Daria este studentă și are cursuri până la prânz."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un job part-time are un timp de muncă mai mic decât norma întreagă comparabilă. Contractul trebuie să precizeze durata și repartizarea programului, precum și condițiile modificării sale. Statutul de student nu înseamnă automat că venitul este net sau scutit de orice taxă. Pentru minori se aplică reguli distincte privind programul și activitățile permise.",
        "La primul job, separă promisiunea verbală de informația scrisă. Păstrează documentele primite și cere explicații despre termenii pe care nu îi înțelegi. O discuție clară înainte de începere ajută atât planul de bani, cât și organizarea timpului. Nu transmite public documente care conțin date personale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce definește part-time?",
      "explanation": "Un timp de muncă mai mic decât norma întreagă comparabilă.",
      "correctFeedback": "Corect. Un timp de muncă mai mic decât norma întreagă comparabilă.",
      "incorrectFeedback": "Nu chiar. Un timp de muncă mai mic decât norma întreagă comparabilă.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Un timp de muncă mai mic decât norma întreagă comparabilă."
        },
        {
          "id": "1",
          "label": "Orice muncă făcută de un student."
        },
        {
          "id": "2",
          "label": "Orice salariu plătit săptămânal."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un contract part-time permite automat angajatorului să ceară oricâte ore suplimentare.",
      "explanation": "Mai puține ore în contract nu înseamnă disponibilitate nelimitată în restul zilei. În cazul contractului cu timp parțial, orele suplimentare sunt interzise, cu excepțiile prevăzute de lege. Nu considera regulile pentru adulți identice cu cele pentru minori. Facultatea și angajatorul pot avea calendare care trebuie coordonate înainte de acceptarea programului.",
      "correctFeedback": "Corect. Mai puține ore în contract nu înseamnă disponibilitate nelimitată în restul zilei. În cazul contractului cu timp parțial, orele suplimentare sunt interzise, cu excepțiile prevăzute de lege. Nu considera regulile pentru adulți identice cu cele pentru minori. Facultatea și angajatorul pot avea calendare care trebuie coordonate înainte de acceptarea programului.",
      "incorrectFeedback": "Nu chiar. Mai puține ore în contract nu înseamnă disponibilitate nelimitată în restul zilei. În cazul contractului cu timp parțial, orele suplimentare sunt interzise, cu excepțiile prevăzute de lege. Nu considera regulile pentru adulți identice cu cele pentru minori. Facultatea și angajatorul pot avea calendare care trebuie coordonate înainte de acceptarea programului.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Daria are cursuri dimineața și compară două oferte: patru ore după-amiaza sau un program variabil. Prima pare compatibilă, dar verifică zilele și naveta. A doua cere clarificarea intervalelor înainte să promită disponibilitate. Compară plata pentru aceeași normă, nu salariul lunar part-time cu un salariu full-time fără să țină cont de ore.",
        "Într-o comparație de oferte, folosește aceeași perioadă și aceeași normă de lucru. Notează ce este confirmat și ce este doar estimare. Cifrele din lecție sunt exerciții, nu salarii impuse de lege. Pentru situația reală, verifică documentele angajatorului și regulile aplicabile la data respectivă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ce compară Daria pentru compatibilitatea cu facultatea?",
      "explanation": "Intervalele, zilele și naveta.",
      "correctFeedback": "Corect. Intervalele, zilele și naveta.",
      "incorrectFeedback": "Nu chiar. Intervalele, zilele și naveta.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Doar numărul orelor zilnice, fără repartizarea lor."
        },
        {
          "id": "1",
          "label": "Intervalele, zilele și naveta."
        },
        {
          "id": "2",
          "label": "Doar venitul lunar, fără timpul ocupat de navetă."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Programul este variabil. Ce ceri înainte să accepți?",
      "explanation": "Clarificarea repartizării și schimbărilor programului.",
      "correctFeedback": "Corect. Clarificarea repartizării și schimbărilor programului.",
      "incorrectFeedback": "Nu chiar. Clarificarea repartizării și schimbărilor programului.",
      "type": "scenariu",
      "context": "Daria are cursuri dimineața și compară două oferte: patru ore după-amiaza sau un program variabil. Prima pare compatibilă, dar verifică zilele și naveta. A doua cere clarificarea intervalelor înainte să promită disponibilitate. Compară plata pentru aceeași normă, nu salariul lunar part-time cu un salariu full-time fără să țină cont de ore.",
      "options": [
        {
          "id": "0",
          "label": "O promisiune că totul va fi simplu."
        },
        {
          "id": "1",
          "label": "Eliminarea contractului."
        },
        {
          "id": "2",
          "label": "Clarificarea repartizării și schimbărilor programului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-munca-part-time-si-student",
      "paragraphs": [
        "Daria este studentă și are cursuri până la prânz. O cafenea îi oferă patru ore după-amiaza, dar spune că uneori va rămâne cât este nevoie. Daria cere repartizarea programului și clarificarea acestei afirmații. Include naveta în timpul ocupat și compară oferta cu una care anunță dinainte zilele de lucru. Nu presupune că statutul de student elimină reținerile salariale.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Daria are cursuri dimineața și compară două oferte: patru ore după-amiaza sau un program variabil. Prima pare compatibilă, dar verifică zilele și naveta. A doua cere clarificarea intervalelor înainte să promită disponibilitate. Compară plata pentru aceeași normă, nu salariul lunar part-time cu un salariu full-time fără să țină cont de ore. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce formulare trebuie clarificată în oferta Dariei?",
      "explanation": "Uneori rămâi cât este nevoie.",
      "correctFeedback": "Corect. Uneori rămâi cât este nevoie.",
      "incorrectFeedback": "Nu chiar. Uneori rămâi cât este nevoie.",
      "caseId": "caz-munca-part-time-si-student",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Uneori rămâi cât este nevoie."
        },
        {
          "id": "1",
          "label": "Doar salariul lunar, considerând programul deja confirmat."
        },
        {
          "id": "2",
          "label": "Doar cele patru ore din ofertă, fără condiția rămânerii suplimentare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "De ce include naveta în plan?",
      "explanation": "Ocupă timp în afara orelor plătite.",
      "correctFeedback": "Corect. Ocupă timp în afara orelor plătite.",
      "incorrectFeedback": "Nu chiar. Ocupă timp în afara orelor plătite.",
      "caseId": "caz-munca-part-time-si-student",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Trebuie considerată automat parte din orele plătite."
        },
        {
          "id": "1",
          "label": "Ocupă timp în afara orelor plătite."
        },
        {
          "id": "2",
          "label": "Poate fi ignorată dacă salariul lunar este suficient."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce presupunere evită Daria despre student?",
      "explanation": "Că orice venit ar fi scutit de rețineri.",
      "correctFeedback": "Corect. Că orice venit ar fi scutit de rețineri.",
      "incorrectFeedback": "Nu chiar. Că orice venit ar fi scutit de rețineri.",
      "caseId": "caz-munca-part-time-si-student",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Că poate avea cursuri."
        },
        {
          "id": "1",
          "label": "Că poate cere explicații."
        },
        {
          "id": "2",
          "label": "Că orice venit ar fi scutit de rețineri."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Mai puține ore în contract nu înseamnă disponibilitate nelimitată în restul zilei. În cazul contractului cu timp parțial, orele suplimentare sunt interzise, cu excepțiile prevăzute de lege. Nu considera regulile pentru adulți identice cu cele pentru minori. Facultatea și angajatorul pot avea calendare care trebuie coordonate înainte de acceptarea programului.",
        "Dacă observi o diferență, formulează o întrebare concretă și păstrează răspunsul. Nu completa singur informația lipsă cu o presupunere favorabilă. Pentru o problemă contractuală sau fiscală, folosește sursa oficială relevantă și ajutor calificat. Un exemplu de învățare nu poate acoperi toate situațiile de muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O ofertă are salariu lunar mai mic și jumătate de normă. Cum compari?",
      "explanation": "Raportezi plata și la ore, nu doar la total.",
      "correctFeedback": "Corect. Raportezi plata și la ore, nu doar la total.",
      "incorrectFeedback": "Nu chiar. Raportezi plata și la ore, nu doar la total.",
      "type": "scenariu",
      "context": "Daria are cursuri dimineața și compară două oferte: patru ore după-amiaza sau un program variabil. Prima pare compatibilă, dar verifică zilele și naveta. A doua cere clarificarea intervalelor înainte să promită disponibilitate. Compară plata pentru aceeași normă, nu salariul lunar part-time cu un salariu full-time fără să țină cont de ore.",
      "options": [
        {
          "id": "0",
          "label": "Raportezi plata și la ore, nu doar la total."
        },
        {
          "id": "1",
          "label": "Declari imediat oferta mai slabă."
        },
        {
          "id": "2",
          "label": "Ignori norma ambelor oferte."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un candidat este minor. Ce verifici?",
      "explanation": "Regulile speciale de vârstă, program și activitate.",
      "correctFeedback": "Corect. Regulile speciale de vârstă, program și activitate.",
      "incorrectFeedback": "Nu chiar. Regulile speciale de vârstă, program și activitate.",
      "type": "scenariu",
      "context": "Daria are cursuri dimineața și compară două oferte: patru ore după-amiaza sau un program variabil. Prima pare compatibilă, dar verifică zilele și naveta. A doua cere clarificarea intervalelor înainte să promită disponibilitate. Compară plata pentru aceeași normă, nu salariul lunar part-time cu un salariu full-time fără să țină cont de ore.",
      "options": [
        {
          "id": "0",
          "label": "Numai orarul unui adult."
        },
        {
          "id": "1",
          "label": "Regulile speciale de vârstă, program și activitate."
        },
        {
          "id": "2",
          "label": "Doar prețul abonamentului de transport."
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
          "body": "Un job part-time are un timp de muncă mai mic decât norma întreagă comparabilă.",
          "detail": "Patru ore de lucru pot ocupa alte intervale și pot cere navetă. Daria verifică zilele și schimbările programului, nu doar totalul de ore, înainte să confirme compatibilitatea cu facultatea.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Daria are cursuri dimineața și compară două oferte: patru ore după-amiaza sau un program variabil. Prima pare compatibilă, dar verifică zilele și naveta.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Mai puține ore în contract nu înseamnă disponibilitate nelimitată în restul zilei.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Desenează o săptămână cu ore de curs, navetă și un program part-time posibil.",
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
