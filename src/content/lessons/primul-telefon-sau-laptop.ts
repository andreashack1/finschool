import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "primul-telefon-sau-laptop",
  "title": "Primul telefon sau laptop",
  "categoryId": "pe-cont-propriu",
  "chapterId": "cumparaturi-mari",
  "slug": "primul-telefon-sau-laptop",
  "description": "Luca are nevoie de un laptop pentru proiecte și stabilește cerințe concrete.",
  "objective": "Să poți explica primul telefon sau laptop și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Primul telefon sau laptop",
      "body": "Luca are nevoie de un laptop pentru proiecte și stabilește cerințe concrete."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O achiziție mare începe cu nevoia: ce trebuie să facă dispozitivul și cât timp vrei să îl folosești. Compară costul complet, nu doar prețul de pe etichetă. Accesoriile necesare, garanția comercială oferită și reparațiile pot conta. Un model mai scump poate avea funcții pe care nu le folosești; marca singură nu justifică diferența.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "De unde începi alegerea dispozitivului?",
      "explanation": "Nevoile și cerințele de utilizare.",
      "correctFeedback": "Corect. Nevoile și cerințele de utilizare.",
      "incorrectFeedback": "Nu chiar. Nevoile și cerințele de utilizare.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Nevoile și cerințele de utilizare."
        },
        {
          "id": "1",
          "label": "Doar popularitatea mărcii."
        },
        {
          "id": "2",
          "label": "Doar prețul cel mai mare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Prețul de pe etichetă include întotdeauna toate costurile necesare folosirii.",
      "explanation": "O tranșă mică poate ascunde un total mare. Verifică separat finanțarea dacă nu plătești integral. La un produs folosit ori recondiționat, citește starea, condițiile vânzării și garanțiile aplicabile; nu presupune că sunt identice cu cele ale unui produs nou. Nu cumpăra în grabă numai pentru a nu rata un cronometru promoțional.",
      "correctFeedback": "Corect. O tranșă mică poate ascunde un total mare. Verifică separat finanțarea dacă nu plătești integral. La un produs folosit ori recondiționat, citește starea, condițiile vânzării și garanțiile aplicabile; nu presupune că sunt identice cu cele ale unui produs nou. Nu cumpăra în grabă numai pentru a nu rata un cronometru promoțional.",
      "incorrectFeedback": "Nu chiar. O tranșă mică poate ascunde un total mare. Verifică separat finanțarea dacă nu plătești integral. La un produs folosit ori recondiționat, citește starea, condițiile vânzării și garanțiile aplicabile; nu presupune că sunt identice cu cele ale unui produs nou. Nu cumpăra în grabă numai pentru a nu rata un cronometru promoțional.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Luca are un buget de 2.000 lei. Modelul A costă 1.800 și necesită un accesoriu de 200, deci ajunge la 2.000. Modelul B costă 2.100 și include acel accesoriu. Pentru cerințe identice, B depășește bugetul cu 100. Luca verifică și starea, vânzătorul și suportul înainte să aleagă între variante.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "1.800 plus accesoriu de 200. Care este costul?",
      "explanation": "2.000 lei.",
      "correctFeedback": "Corect. 2.000 lei.",
      "incorrectFeedback": "Nu chiar. 2.000 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "1.800 lei."
        },
        {
          "id": "1",
          "label": "2.000 lei."
        },
        {
          "id": "2",
          "label": "2.200 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Modelul de 2.100 depășește bugetul de 2.000 cu cât?",
      "explanation": "100 lei.",
      "correctFeedback": "Corect. 100 lei.",
      "incorrectFeedback": "Nu chiar. 100 lei.",
      "type": "scenariu",
      "context": "Luca are un buget de 2.000 lei. Modelul A costă 1.800 și necesită un accesoriu de 200, deci ajunge la 2.000. Modelul B costă 2.100 și include acel accesoriu. Pentru cerințe identice, B depășește bugetul cu 100. Luca verifică și starea, vânzătorul și suportul înainte să aleagă între variante.",
      "options": [
        {
          "id": "0",
          "label": "200 lei."
        },
        {
          "id": "1",
          "label": "1.000 lei."
        },
        {
          "id": "2",
          "label": "100 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-primul-telefon-sau-laptop",
      "paragraphs": [
        "Luca are nevoie de un laptop pentru proiecte și stabilește cerințe concrete. Are 2.000 lei. Un model costă 1.800, dar accesoriul necesar mai cere 200. Altul costă 2.100 cu accesoriul inclus. Luca compară totalurile și verifică suportul și vânzătorul. Nu schimbă bugetul doar pentru un model popular care promite funcții inutile proiectelor sale.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Luca are un buget de 2.000 lei. Modelul A costă 1.800 și necesită un accesoriu de 200, deci ajunge la 2.000. Modelul B costă 2.100 și include acel accesoriu. Pentru cerințe identice, B depășește bugetul cu 100. Luca verifică și starea, vânzătorul și suportul înainte să aleagă între variante. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce utilizare urmărește Luca?",
      "explanation": "Proiectele pentru care a stabilit cerințe.",
      "correctFeedback": "Corect. Proiectele pentru care a stabilit cerințe.",
      "incorrectFeedback": "Nu chiar. Proiectele pentru care a stabilit cerințe.",
      "caseId": "caz-primul-telefon-sau-laptop",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Proiectele pentru care a stabilit cerințe."
        },
        {
          "id": "1",
          "label": "Orice funcție din reclamă."
        },
        {
          "id": "2",
          "label": "Doar fotografia dispozitivului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "De ce modelul A nu costă doar 1.800 pentru Luca?",
      "explanation": "Are nevoie și de accesoriul de 200.",
      "correctFeedback": "Corect. Are nevoie și de accesoriul de 200.",
      "incorrectFeedback": "Nu chiar. Are nevoie și de accesoriul de 200.",
      "caseId": "caz-primul-telefon-sau-laptop",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Include un credit de 200."
        },
        {
          "id": "1",
          "label": "Are nevoie și de accesoriul de 200."
        },
        {
          "id": "2",
          "label": "Bugetul schimbă prețul."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce verifică dincolo de total?",
      "explanation": "Vânzătorul, starea și suportul.",
      "correctFeedback": "Corect. Vânzătorul, starea și suportul.",
      "incorrectFeedback": "Nu chiar. Vânzătorul, starea și suportul.",
      "caseId": "caz-primul-telefon-sau-laptop",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar cronometru promoțional."
        },
        {
          "id": "1",
          "label": "Doar numărul like-urilor."
        },
        {
          "id": "2",
          "label": "Vânzătorul, starea și suportul."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O tranșă mică poate ascunde un total mare. Verifică separat finanțarea dacă nu plătești integral. La un produs folosit ori recondiționat, citește starea, condițiile vânzării și garanțiile aplicabile; nu presupune că sunt identice cu cele ale unui produs nou. Nu cumpăra în grabă numai pentru a nu rata un cronometru promoțional.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Produsul este recondiționat. Ce citești?",
      "explanation": "Starea și condițiile de vânzare și garanție aplicabile.",
      "correctFeedback": "Corect. Starea și condițiile de vânzare și garanție aplicabile.",
      "incorrectFeedback": "Nu chiar. Starea și condițiile de vânzare și garanție aplicabile.",
      "type": "scenariu",
      "context": "Luca are un buget de 2.000 lei. Modelul A costă 1.800 și necesită un accesoriu de 200, deci ajunge la 2.000. Modelul B costă 2.100 și include acel accesoriu. Pentru cerințe identice, B depășește bugetul cu 100. Luca verifică și starea, vânzătorul și suportul înainte să aleagă între variante.",
      "options": [
        {
          "id": "0",
          "label": "Starea și condițiile de vânzare și garanție aplicabile."
        },
        {
          "id": "1",
          "label": "Presupui că este nou."
        },
        {
          "id": "2",
          "label": "Ignori orice defect."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Plata se face în rate. Ce compari suplimentar?",
      "explanation": "Costul și obligațiile finanțării.",
      "correctFeedback": "Corect. Costul și obligațiile finanțării.",
      "incorrectFeedback": "Nu chiar. Costul și obligațiile finanțării.",
      "type": "scenariu",
      "context": "Luca are un buget de 2.000 lei. Modelul A costă 1.800 și necesită un accesoriu de 200, deci ajunge la 2.000. Modelul B costă 2.100 și include acel accesoriu. Pentru cerințe identice, B depășește bugetul cu 100. Luca verifică și starea, vânzătorul și suportul înainte să aleagă între variante.",
      "options": [
        {
          "id": "0",
          "label": "Doar prima tranșă."
        },
        {
          "id": "1",
          "label": "Costul și obligațiile finanțării."
        },
        {
          "id": "2",
          "label": "Doar culoarea cardului."
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
          "body": "O achiziție mare începe cu nevoia: ce trebuie să facă dispozitivul și cât timp vrei să îl folosești.",
          "detail": "O achiziție mare începe cu nevoia: ce trebuie să facă dispozitivul și cât timp vrei să îl folosești.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Luca are un buget de 2.000 lei. Modelul A costă 1.800 și necesită un accesoriu de 200, deci ajunge la 2.000.",
          "detail": "Luca are un buget de 2.000 lei. Modelul A costă 1.800 și necesită un accesoriu de 200, deci ajunge la 2.000.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "O tranșă mică poate ascunde un total mare.",
          "detail": "O tranșă mică poate ascunde un total mare.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Definește trei cerințe reale pentru un dispozitiv și calculează un cost complet fictiv.",
          "detail": "Definește trei cerințe reale pentru un dispozitiv și calculează un cost complet fictiv.",
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
