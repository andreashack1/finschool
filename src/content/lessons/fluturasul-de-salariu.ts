import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "fluturasul-de-salariu",
  "title": "Fluturașul de salariu",
  "categoryId": "primul-job",
  "chapterId": "salariul",
  "slug": "fluturasul-de-salariu",
  "description": "Ana vede în cont 2.500 lei și crede că i-au lipsit 500 din salariul net de 3.000.",
  "objective": "Să poți explica fluturașul de salariu și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Fluturașul de salariu",
      "body": "Ana vede în cont 2.500 lei și crede că i-au lipsit 500 din salariul net de 3.000."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Fluturașul arată cum se ajunge de la veniturile salariale brute la suma netă și, după caz, la suma de plată. Caută perioada, salariul de bază, sporurile, contribuțiile, impozitul și alte rețineri. Nu toate liniile sunt bani suplimentari primiți în cont. Avansul plătit anterior poate reduce suma virată la lichidare fără să reducă salariul net al lunii.",
        "La primul job, separă promisiunea verbală de informația scrisă. Păstrează documentele primite și cere explicații despre termenii pe care nu îi înțelegi. O discuție clară înainte de începere ajută atât planul de bani, cât și organizarea timpului. Nu transmite public documente care conțin date personale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce explică fluturașul?",
      "explanation": "Trecerea de la brut la net și suma de plată.",
      "correctFeedback": "Corect. Trecerea de la brut la net și suma de plată.",
      "incorrectFeedback": "Nu chiar. Trecerea de la brut la net și suma de plată.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Trecerea de la brut la net și suma de plată."
        },
        {
          "id": "1",
          "label": "Doar suma ultimului virament, indiferent de avans."
        },
        {
          "id": "2",
          "label": "Doar salariul de bază, fără componentele lunii."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un virament mai mic decât netul lunii poate fi explicat de un avans deja încasat, fără ca salariul net să fi scăzut.",
      "explanation": "Avansul și lichidarea pot fi două părți ale aceluiași net. Verifică ambele intrări și liniile fluturașului înainte să concluzionezi că lipsesc bani.",
      "correctFeedback": "Corect. Avansul și lichidarea pot fi două părți ale aceluiași net. Verifică ambele intrări și liniile fluturașului înainte să concluzionezi că lipsesc bani.",
      "incorrectFeedback": "Nu chiar. Avansul și lichidarea pot fi două părți ale aceluiași net. Verifică ambele intrări și liniile fluturașului înainte să concluzionezi că lipsesc bani.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un fluturaș fictiv, netul lunii este 3.000 lei, iar un avans de 500 lei a fost deja plătit. Suma rămasă de virat este 2.500 lei. Ana verifică ambele intrări în extras. Nu adună netul de 3.000 cu viramentul de 2.500 ca două venituri distincte: viramentul este o parte din același net.",
        "Într-o comparație de oferte, folosește aceeași perioadă și aceeași normă de lucru. Notează ce este confirmat și ce este doar estimare. Cifrele din lecție sunt exerciții, nu salarii impuse de lege. Pentru situația reală, verifică documentele angajatorului și regulile aplicabile la data respectivă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Net 3.000 și avans 500 deja plătit. Cât rămâne de virat?",
      "explanation": "2.500 lei.",
      "correctFeedback": "Corect. 2.500 lei.",
      "incorrectFeedback": "Nu chiar. 2.500 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "3.500 lei."
        },
        {
          "id": "1",
          "label": "2.500 lei."
        },
        {
          "id": "2",
          "label": "3.000 lei suplimentar."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Două fluturașe au sume diferite. Ce verifici mai întâi?",
      "explanation": "Perioada, zilele și liniile componente.",
      "correctFeedback": "Corect. Perioada, zilele și liniile componente.",
      "incorrectFeedback": "Nu chiar. Perioada, zilele și liniile componente.",
      "type": "scenariu",
      "context": "Într-un fluturaș fictiv, netul lunii este 3.000 lei, iar un avans de 500 lei a fost deja plătit. Suma rămasă de virat este 2.500 lei. Ana verifică ambele intrări în extras. Nu adună netul de 3.000 cu viramentul de 2.500 ca două venituri distincte: viramentul este o parte din același net.",
      "options": [
        {
          "id": "0",
          "label": "Doar ultimul virament, fără avansurile din lună."
        },
        {
          "id": "1",
          "label": "Doar netul unui coleg, fără perioadă și componente."
        },
        {
          "id": "2",
          "label": "Perioada, zilele și liniile componente."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-fluturasul-de-salariu",
      "paragraphs": [
        "Ana vede în cont 2.500 lei și crede că i-au lipsit 500 din salariul net de 3.000. Caută fluturașul și găsește linia avans. În extras apare deja transferul anterior de 500 lei. Reunește cele două plăți pentru aceeași lună și verifică dacă există alte rețineri, înainte să formuleze o întrebare către persoana care gestionează salariile.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Într-un fluturaș fictiv, netul lunii este 3.000 lei, iar un avans de 500 lei a fost deja plătit. Suma rămasă de virat este 2.500 lei. Ana verifică ambele intrări în extras. Nu adună netul de 3.000 cu viramentul de 2.500 ca două venituri distincte: viramentul este o parte din același net. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Unde găsește Ana explicația celor 500 lei?",
      "explanation": "În avans și transferul anterior.",
      "correctFeedback": "Corect. În avans și transferul anterior.",
      "incorrectFeedback": "Nu chiar. În avans și transferul anterior.",
      "caseId": "caz-fluturasul-de-salariu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "În avans și transferul anterior."
        },
        {
          "id": "1",
          "label": "Într-o reducere automată a netului, fără să verifice avansul."
        },
        {
          "id": "2",
          "label": "În taxarea încă o dată a viramentului, fără o linie corespunzătoare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Care este venitul net total din exemplu?",
      "explanation": "3.000 lei.",
      "correctFeedback": "Corect. 3.000 lei.",
      "incorrectFeedback": "Nu chiar. 3.000 lei.",
      "caseId": "caz-fluturasul-de-salariu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "5.500 lei."
        },
        {
          "id": "1",
          "label": "3.000 lei."
        },
        {
          "id": "2",
          "label": "2.000 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce eroare ar face adunând 3.000 cu 2.500?",
      "explanation": "Ar număra de două ori o parte din salariu.",
      "correctFeedback": "Corect. Ar număra de două ori o parte din salariu.",
      "incorrectFeedback": "Nu chiar. Ar număra de două ori o parte din salariu.",
      "caseId": "caz-fluturasul-de-salariu",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ar calcula corect netul."
        },
        {
          "id": "1",
          "label": "Ar elimina doar impozitul."
        },
        {
          "id": "2",
          "label": "Ar număra de două ori o parte din salariu."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O diferență față de luna trecută poate proveni din zile lucrate, concedii, sporuri sau rețineri. Cere defalcarea; nu presupune imediat o eroare și nici că diferența este justificată. Verifică perioada înainte să compari două documente. Nu publica fluturașul întreg pentru ajutor, deoarece poate conține date personale care nu sunt necesare discuției.",
        "Dacă observi o diferență, formulează o întrebare concretă și păstrează răspunsul. Nu completa singur informația lipsă cu o presupunere favorabilă. Pentru o problemă contractuală sau fiscală, folosește sursa oficială relevantă și ajutor calificat. Un exemplu de învățare nu poate acoperi toate situațiile de muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Vrei ajutor pentru o linie neclară. Cum trimiți documentul?",
      "explanation": "Protejezi datele personale inutile discuției.",
      "correctFeedback": "Corect. Protejezi datele personale inutile discuției.",
      "incorrectFeedback": "Nu chiar. Protejezi datele personale inutile discuției.",
      "type": "scenariu",
      "context": "Într-un fluturaș fictiv, netul lunii este 3.000 lei, iar un avans de 500 lei a fost deja plătit. Suma rămasă de virat este 2.500 lei. Ana verifică ambele intrări în extras. Nu adună netul de 3.000 cu viramentul de 2.500 ca două venituri distincte: viramentul este o parte din același net.",
      "options": [
        {
          "id": "0",
          "label": "Protejezi datele personale inutile discuției."
        },
        {
          "id": "1",
          "label": "Îl publici integral."
        },
        {
          "id": "2",
          "label": "Trimiți și PIN-ul cardului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Nu recunoști o reținere. Ce faci?",
      "explanation": "Ceri denumirea și justificarea ei.",
      "correctFeedback": "Corect. Ceri denumirea și justificarea ei.",
      "incorrectFeedback": "Nu chiar. Ceri denumirea și justificarea ei.",
      "type": "scenariu",
      "context": "Într-un fluturaș fictiv, netul lunii este 3.000 lei, iar un avans de 500 lei a fost deja plătit. Suma rămasă de virat este 2.500 lei. Ana verifică ambele intrări în extras. Nu adună netul de 3.000 cu viramentul de 2.500 ca două venituri distincte: viramentul este o parte din același net.",
      "options": [
        {
          "id": "0",
          "label": "O consideri automat corectă."
        },
        {
          "id": "1",
          "label": "Ceri denumirea și justificarea ei."
        },
        {
          "id": "2",
          "label": "O înlocuiești singur cu zero."
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
          "body": "Fluturașul arată cum se ajunge de la veniturile salariale brute la suma netă și, după caz, la suma de plată.",
          "detail": "Un net de 3.000 lei poate fi achitat prin avans de 500 și virament final de 2.500. Cele două plăți aparțin aceluiași salariu; nu adăuga netul încă o dată peste virament.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Într-un fluturaș fictiv, netul lunii este 3.000 lei, iar un avans de 500 lei a fost deja plătit. Suma rămasă de virat este 2.500 lei.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "O diferență față de luna trecută poate proveni din zile lucrate, concedii, sporuri sau rețineri.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pe un fluturaș fictiv, marchează brutul, reținerile, netul și eventualul avans.",
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
