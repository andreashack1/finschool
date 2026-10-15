import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cheltuielile-din-supermarket",
  "title": "Cheltuielile din supermarket",
  "categoryId": "pe-cont-propriu",
  "chapterId": "viata-de-zi-cu-zi",
  "slug": "cheltuielile-din-supermarket",
  "description": "Radu are pe listă ingrediente pentru câteva mese.",
  "objective": "Să poți explica cheltuielile din supermarket și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Cheltuielile din supermarket",
      "body": "Radu are pe listă ingrediente pentru câteva mese."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "La supermarket compară prețul pe unitate și cantitatea pe care o vei folosi, nu doar prețul ambalajului. O listă legată de mese și stocul de acasă ajută la evitarea duplicatelor. Reducerea poate fi utilă numai dacă produsul îți trebuie și poate fi consumat înainte să se strice. Cantitatea mare nu este automat economie.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce compari pentru ambalaje de mărimi diferite?",
      "explanation": "Prețul pe unitate și cantitatea utilizată.",
      "correctFeedback": "Corect. Prețul pe unitate și cantitatea utilizată.",
      "incorrectFeedback": "Nu chiar. Prețul pe unitate și cantitatea utilizată.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Prețul pe unitate și cantitatea utilizată."
        },
        {
          "id": "1",
          "label": "Doar cifra de pe etichetă."
        },
        {
          "id": "2",
          "label": "Doar dimensiunea cutiei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un pachet mai ieftin pe kilogram poate costa mai mult pentru nevoia ta dacă o parte nu poate fi păstrată și se strică.",
      "explanation": "Prețul pe unitate și cantitatea folosită trebuie privite împreună. Un avantaj pe etichetă nu compensează automat risipa.",
      "correctFeedback": "Corect. Prețul pe unitate și cantitatea folosită trebuie privite împreună. Un avantaj pe etichetă nu compensează automat risipa.",
      "incorrectFeedback": "Nu chiar. Prețul pe unitate și cantitatea folosită trebuie privite împreună. Un avantaj pe etichetă nu compensează automat risipa.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un pachet de 500 g costă 10 lei, iar unul de 1 kg costă 18. Prețurile pe kilogram sunt 20 și 18 lei. Pachetul mare e mai ieftin pe unitate, dar dacă folosești doar jumătate și restul se strică, avantajul poate dispărea. Compară și cantitatea utilizată, termenul și posibilitatea de păstrare.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "500 g costă 10 lei. Care este prețul pe kilogram?",
      "explanation": "20 lei.",
      "correctFeedback": "Corect. 20 lei.",
      "incorrectFeedback": "Nu chiar. 20 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "10 lei."
        },
        {
          "id": "1",
          "label": "20 lei."
        },
        {
          "id": "2",
          "label": "5 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "1 kg costă 18 lei. Ce verifici dacă folosești doar jumătate?",
      "explanation": "Păstrarea și riscul de risipă.",
      "correctFeedback": "Corect. Păstrarea și riscul de risipă.",
      "incorrectFeedback": "Nu chiar. Păstrarea și riscul de risipă.",
      "type": "scenariu",
      "context": "Un pachet de 500 g costă 10 lei, iar unul de 1 kg costă 18. Prețurile pe kilogram sunt 20 și 18 lei. Pachetul mare e mai ieftin pe unitate, dar dacă folosești doar jumătate și restul se strică, avantajul poate dispărea. Compară și cantitatea utilizată, termenul și posibilitatea de păstrare.",
      "options": [
        {
          "id": "0",
          "label": "Doar reducerea pe unitate."
        },
        {
          "id": "1",
          "label": "Numai greutatea ambalajului."
        },
        {
          "id": "2",
          "label": "Păstrarea și riscul de risipă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cheltuielile-din-supermarket",
      "paragraphs": [
        "Radu are pe listă ingrediente pentru câteva mese. La raft vede 500 g cu 10 lei și 1 kg cu 18. Prețul pe kilogram favorizează pachetul mare, dar Radu știe că va folosi doar jumătate în următoarele zile. Verifică păstrarea și termenul, apoi compară costul cantității folosite. Nu cumpără trei pachete doar pentru un banner de reducere.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Un pachet de 500 g costă 10 lei, iar unul de 1 kg costă 18. Prețurile pe kilogram sunt 20 și 18 lei. Pachetul mare e mai ieftin pe unitate, dar dacă folosești doar jumătate și restul se strică, avantajul poate dispărea. Compară și cantitatea utilizată, termenul și posibilitatea de păstrare. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "De ce Radu nu alege automat pachetul mare?",
      "explanation": "Poate să nu folosească întreaga cantitate.",
      "correctFeedback": "Corect. Poate să nu folosească întreaga cantitate.",
      "incorrectFeedback": "Nu chiar. Poate să nu folosească întreaga cantitate.",
      "caseId": "caz-cheltuielile-din-supermarket",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Poate să nu folosească întreaga cantitate."
        },
        {
          "id": "1",
          "label": "Ambalajul mare este automat potrivit fiindcă are preț unitar mai mic."
        },
        {
          "id": "2",
          "label": "Prețul pe kilogram este mai mare în exemplu."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Care variantă are preț unitar mai mic?",
      "explanation": "Pachetul de 1 kg la 18 lei.",
      "correctFeedback": "Corect. Pachetul de 1 kg la 18 lei.",
      "incorrectFeedback": "Nu chiar. Pachetul de 1 kg la 18 lei.",
      "caseId": "caz-cheltuielile-din-supermarket",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Pachetul de 500 g la 10 lei."
        },
        {
          "id": "1",
          "label": "Pachetul de 1 kg la 18 lei."
        },
        {
          "id": "2",
          "label": "Au preț unitar identic."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce rol are lista lui Radu?",
      "explanation": "Leagă cumpărăturile de mesele planificate.",
      "correctFeedback": "Corect. Leagă cumpărăturile de mesele planificate.",
      "incorrectFeedback": "Nu chiar. Leagă cumpărăturile de mesele planificate.",
      "caseId": "caz-cheltuielile-din-supermarket",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Garantează că orice reducere este bună."
        },
        {
          "id": "1",
          "label": "Înlocuiește verificarea etichetelor."
        },
        {
          "id": "2",
          "label": "Leagă cumpărăturile de mesele planificate."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O ofertă condiționată de mai multe bucăți poate depăși lista și bugetul. Verifică prețul final, condițiile și eticheta înainte de plată. Un produs ieftin cumpărat inutil nu este economie pentru tine. Dacă totalul depășește planul, compară înlocuiri potrivite și elimină duplicările înainte să renunți automat la elementele necesare.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Oferta cere trei bucăți, dar ai nevoie de una. Ce compari?",
      "explanation": "Costul total și folosirea reală a cantității.",
      "correctFeedback": "Corect. Costul total și folosirea reală a cantității.",
      "incorrectFeedback": "Nu chiar. Costul total și folosirea reală a cantității.",
      "type": "scenariu",
      "context": "Un pachet de 500 g costă 10 lei, iar unul de 1 kg costă 18. Prețurile pe kilogram sunt 20 și 18 lei. Pachetul mare e mai ieftin pe unitate, dar dacă folosești doar jumătate și restul se strică, avantajul poate dispărea. Compară și cantitatea utilizată, termenul și posibilitatea de păstrare.",
      "options": [
        {
          "id": "0",
          "label": "Costul total și folosirea reală a cantității."
        },
        {
          "id": "1",
          "label": "Doar procentul promoțional."
        },
        {
          "id": "2",
          "label": "Doar prețul pe bucată, fără suma plătită pentru toate trei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Totalul depășește bugetul. Ce verifici întâi?",
      "explanation": "Duplicările și alternativele potrivite.",
      "correctFeedback": "Corect. Duplicările și alternativele potrivite.",
      "incorrectFeedback": "Nu chiar. Duplicările și alternativele potrivite.",
      "type": "scenariu",
      "context": "Un pachet de 500 g costă 10 lei, iar unul de 1 kg costă 18. Prețurile pe kilogram sunt 20 și 18 lei. Pachetul mare e mai ieftin pe unitate, dar dacă folosești doar jumătate și restul se strică, avantajul poate dispărea. Compară și cantitatea utilizată, termenul și posibilitatea de păstrare.",
      "options": [
        {
          "id": "0",
          "label": "Elimini automat toate alimentele necesare."
        },
        {
          "id": "1",
          "label": "Duplicările și alternativele potrivite."
        },
        {
          "id": "2",
          "label": "Adaugi produse ca să primești puncte."
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
          "body": "La supermarket compară prețul pe unitate și cantitatea pe care o vei folosi, nu doar prețul ambalajului.",
          "detail": "Pachetul mare poate avea preț mai mic pe kilogram, dar Radu va folosi numai jumătate. Dacă restul nu poate fi păstrat, costul cantității utile poate schimba alegerea.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Un pachet de 500 g costă 10 lei, iar unul de 1 kg costă 18. Prețurile pe kilogram sunt 20 și 18 lei.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "O ofertă condiționată de mai multe bucăți poate depăși lista și bugetul.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Compară prețul pe kilogram pentru două ambalaje și notează cât ai folosi efectiv.",
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
