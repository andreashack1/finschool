import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "burse-si-costul-facultatii",
  "title": "Burse și costul facultății",
  "categoryId": "pe-cont-propriu",
  "chapterId": "cumparaturi-mari",
  "slug": "burse-si-costul-facultatii",
  "description": "Ana pregătește primul semestru și estimează 1.500 lei lunar timp de cinci luni.",
  "objective": "Să poți explica burse și costul facultății și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "ASF · Ghid RCA",
    "url": "https://asfromania.ro/files/Ghid_RCA.pdf"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Burse și costul facultății",
      "body": "Ana pregătește primul semestru și estimează 1.500 lei lunar timp de cinci luni."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Costul facultății poate include taxă, locuire, hrană, transport și materiale, chiar când studiile nu au taxă. O bursă are condiții de eligibilitate și calendar de plată. Separă suma confirmată de cererea încă neaprobată. Nu presupune că un venit semestrial ori neregulat acoperă automat fiecare scadență lunară.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce costuri pot exista chiar fără taxă de studiu?",
      "explanation": "Locuire, hrană, transport și materiale.",
      "correctFeedback": "Corect. Locuire, hrană, transport și materiale.",
      "incorrectFeedback": "Nu chiar. Locuire, hrană, transport și materiale.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Locuire, hrană, transport și materiale."
        },
        {
          "id": "1",
          "label": "Niciun cost."
        },
        {
          "id": "2",
          "label": "Doar materialele, presupunând că locuirea nu intră în costul studiilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O cerere de bursă depusă este același lucru cu un venit aprobat și primit.",
      "explanation": "Condițiile burselor și taxele diferă între instituții și se pot modifica. Verifică metodologia oficială, actele și termenele de depunere. O bursă nu este garantată de un mesaj distribuit într-un grup. Dacă plata vine mai târziu decât chiria, planul trebuie să arate și resursele pentru perioada de așteptare, nu doar totalul semestrului.",
      "correctFeedback": "Corect. Condițiile burselor și taxele diferă între instituții și se pot modifica. Verifică metodologia oficială, actele și termenele de depunere. O bursă nu este garantată de un mesaj distribuit într-un grup. Dacă plata vine mai târziu decât chiria, planul trebuie să arate și resursele pentru perioada de așteptare, nu doar totalul semestrului.",
      "incorrectFeedback": "Nu chiar. Condițiile burselor și taxele diferă între instituții și se pot modifica. Verifică metodologia oficială, actele și termenele de depunere. O bursă nu este garantată de un mesaj distribuit într-un grup. Dacă plata vine mai târziu decât chiria, planul trebuie să arate și resursele pentru perioada de așteptare, nu doar totalul semestrului.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Ana estimează costuri de 1.500 lei lunar pentru cinci luni, adică 7.500. Are confirmate resurse de 6.000, deci diferența este 1.500. O bursă solicitată, dar neaprobată, rămâne separat în scenariu. Ana compară locuirea și transportul și verifică termenele, fără să ștergă diferența doar fiindcă speră să primească finanțarea.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cât înseamnă cinci luni × 1.500 lei?",
      "explanation": "7.500 lei.",
      "correctFeedback": "Corect. 7.500 lei.",
      "incorrectFeedback": "Nu chiar. 7.500 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "6.000 lei."
        },
        {
          "id": "1",
          "label": "7.500 lei."
        },
        {
          "id": "2",
          "label": "1.500 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Cost 7.500 și resurse 6.000. Care este diferența?",
      "explanation": "1.500 lei.",
      "correctFeedback": "Corect. 1.500 lei.",
      "incorrectFeedback": "Nu chiar. 1.500 lei.",
      "type": "scenariu",
      "context": "Ana estimează costuri de 1.500 lei lunar pentru cinci luni, adică 7.500. Are confirmate resurse de 6.000, deci diferența este 1.500. O bursă solicitată, dar neaprobată, rămâne separat în scenariu. Ana compară locuirea și transportul și verifică termenele, fără să ștergă diferența doar fiindcă speră să primească finanțarea.",
      "options": [
        {
          "id": "0",
          "label": "500 lei."
        },
        {
          "id": "1",
          "label": "13.500 lei."
        },
        {
          "id": "2",
          "label": "1.500 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-burse-si-costul-facultatii",
      "paragraphs": [
        "Ana pregătește primul semestru și estimează 1.500 lei lunar timp de cinci luni. Familia poate confirma 6.000 pentru acest interval. Ana a depus și o cerere de bursă, dar nu are decizia. Calculează diferența de 1.500 și verifică metodologia și calendarul. Compară cazarea și naveta, fără să trateze bursa așteptată drept bani deja disponibili.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Ana estimează costuri de 1.500 lei lunar pentru cinci luni, adică 7.500. Are confirmate resurse de 6.000, deci diferența este 1.500. O bursă solicitată, dar neaprobată, rămâne separat în scenariu. Ana compară locuirea și transportul și verifică termenele, fără să ștergă diferența doar fiindcă speră să primească finanțarea. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce venit nu este încă sigur pentru Ana?",
      "explanation": "Bursa solicitată.",
      "correctFeedback": "Corect. Bursa solicitată.",
      "incorrectFeedback": "Nu chiar. Bursa solicitată.",
      "caseId": "caz-burse-si-costul-facultatii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Bursa solicitată."
        },
        {
          "id": "1",
          "label": "Resursele confirmate de 6.000."
        },
        {
          "id": "2",
          "label": "Costul estimat al unei luni."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Unde verifică Ana condițiile bursei?",
      "explanation": "În metodologia oficială a instituției.",
      "correctFeedback": "Corect. În metodologia oficială a instituției.",
      "incorrectFeedback": "Nu chiar. În metodologia oficială a instituției.",
      "caseId": "caz-burse-si-costul-facultatii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar într-un mesaj distribuit."
        },
        {
          "id": "1",
          "label": "În metodologia oficială a instituției."
        },
        {
          "id": "2",
          "label": "În regulile altei facultăți, presupunând că sunt identice."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce verifică data plății?",
      "explanation": "Banii pot veni după unele scadențe.",
      "correctFeedback": "Corect. Banii pot veni după unele scadențe.",
      "incorrectFeedback": "Nu chiar. Banii pot veni după unele scadențe.",
      "caseId": "caz-burse-si-costul-facultatii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Totalul nu mai trebuie calculat."
        },
        {
          "id": "1",
          "label": "Bursa devine astfel garantată."
        },
        {
          "id": "2",
          "label": "Banii pot veni după unele scadențe."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Condițiile burselor și taxele diferă între instituții și se pot modifica. Verifică metodologia oficială, actele și termenele de depunere. O bursă nu este garantată de un mesaj distribuit într-un grup. Dacă plata vine mai târziu decât chiria, planul trebuie să arate și resursele pentru perioada de așteptare, nu doar totalul semestrului.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O metodologie are termen de depunere. Ce faci?",
      "explanation": "Pregătești actele și respecți termenul oficial.",
      "correctFeedback": "Corect. Pregătești actele și respecți termenul oficial.",
      "incorrectFeedback": "Nu chiar. Pregătești actele și respecți termenul oficial.",
      "type": "scenariu",
      "context": "Ana estimează costuri de 1.500 lei lunar pentru cinci luni, adică 7.500. Are confirmate resurse de 6.000, deci diferența este 1.500. O bursă solicitată, dar neaprobată, rămâne separat în scenariu. Ana compară locuirea și transportul și verifică termenele, fără să ștergă diferența doar fiindcă speră să primească finanțarea.",
      "options": [
        {
          "id": "0",
          "label": "Pregătești actele și respecți termenul oficial."
        },
        {
          "id": "1",
          "label": "Te bazezi pe zvon."
        },
        {
          "id": "2",
          "label": "Trimiți documentele unui necunoscut."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Bursa vine după prima chirie. Ce arată bugetul?",
      "explanation": "Sursa pentru intervalul până la plată.",
      "correctFeedback": "Corect. Sursa pentru intervalul până la plată.",
      "incorrectFeedback": "Nu chiar. Sursa pentru intervalul până la plată.",
      "type": "scenariu",
      "context": "Ana estimează costuri de 1.500 lei lunar pentru cinci luni, adică 7.500. Are confirmate resurse de 6.000, deci diferența este 1.500. O bursă solicitată, dar neaprobată, rămâne separat în scenariu. Ana compară locuirea și transportul și verifică termenele, fără să ștergă diferența doar fiindcă speră să primească finanțarea.",
      "options": [
        {
          "id": "0",
          "label": "Doar totalul bursei."
        },
        {
          "id": "1",
          "label": "Sursa pentru intervalul până la plată."
        },
        {
          "id": "2",
          "label": "Un venit inventat."
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
          "body": "Facultatea poate costa bani chiar dacă nu plătești taxă de studiu.",
          "detail": "Ana are costuri estimate de 7.500 lei pe semestru și resurse confirmate de 6.000. Cererea de bursă neaprobată nu acoperă deja diferența, iar data încasării trebuie comparată cu scadențele.",
          "type": "normal",
          "detailHighlights": [
            "scadențele",
            "costuri"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Separă resursele confirmate de bursele doar solicitate.",
          "type": "normal",
          "detail": "O bursă solicitată nu este încă venit confirmat. Data aprobării și data plății pot fi diferite.",
          "detailHighlights": [
            "venit confirmat",
            "data"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Verifică regulile burselor și taxele instituției alese.",
          "type": "normal",
          "detail": "Un loc fără taxă de studiu poate cere tot bani pentru locuire, hrană și materiale.",
          "detailHighlights": [
            "taxă de studiu",
            "bani"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Estimează un semestru fictiv și separă resursele confirmate de cele doar solicitate.",
          "type": "action",
          "detail": "Împarte semestrul pe luni și verifică dacă resursele confirmate ajung înainte de scadențele mari.",
          "detailHighlights": [
            "scadențele"
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
