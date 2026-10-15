import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "efectul-de-ancorare",
  "title": "Efectul de ancorare",
  "categoryId": "de-ce-cheltuim-cum-cheltuim",
  "chapterId": "creierul-si-banii",
  "slug": "efectul-de-ancorare",
  "description": "Teo vede 500 lei tăiat și 300 lei pentru un produs.",
  "objective": "Să poți explica efectul de ancorare și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Efectul de ancorare",
      "body": "Teo vede 500 lei tăiat și 300 lei pentru un produs."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Ancorarea apare când prima valoare întâlnită influențează evaluarea unei valori ulterioare. Un preț vechi mare poate face noul preț să pară atractiv, fără să arate dacă produsul merită suma. Compară cu alternative relevante și cu nevoia ta. Punctul de pornire al reclamei nu trebuie să devină singurul reper al deciziei.",
        "Un obicei de cheltuire nu definește valoarea unei persoane. Observă contextul, informația disponibilă și alternativa pe care o ai. O pauză scurtă și o întrebare concretă pot face alegerea mai ușor de evaluat. Nu trebuie să elimini orice plăcere pentru a construi un plan de bani util."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce este ancora în evaluarea prețului?",
      "explanation": "Prima valoare care influențează comparația.",
      "correctFeedback": "Corect. Prima valoare care influențează comparația.",
      "incorrectFeedback": "Nu chiar. Prima valoare care influențează comparația.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Prima valoare care influențează comparația."
        },
        {
          "id": "1",
          "label": "Soldul final al contului."
        },
        {
          "id": "2",
          "label": "Un comision legal."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un preț tăiat mare dovedește că prețul nou este cel mai bun disponibil.",
      "explanation": "Prețul de referință trebuie verificat în contextul regulilor reducerii, dar nici un preț vechi real nu garantează valoarea actuală pentru tine. Același efect poate apărea la negocierea unei sume. Stabilește un interval din date independente înainte de discuție. Nu alege automat oferta mai ieftină dacă produsele au diferențe importante neanalizate.",
      "correctFeedback": "Corect. Prețul de referință trebuie verificat în contextul regulilor reducerii, dar nici un preț vechi real nu garantează valoarea actuală pentru tine. Același efect poate apărea la negocierea unei sume. Stabilește un interval din date independente înainte de discuție. Nu alege automat oferta mai ieftină dacă produsele au diferențe importante neanalizate.",
      "incorrectFeedback": "Nu chiar. Prețul de referință trebuie verificat în contextul regulilor reducerii, dar nici un preț vechi real nu garantează valoarea actuală pentru tine. Același efect poate apărea la negocierea unei sume. Stabilește un interval din date independente înainte de discuție. Nu alege automat oferta mai ieftină dacă produsele au diferențe importante neanalizate.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un magazin afișează 500 lei tăiat și preț nou 300. Alt magazin are un produs comparabil la 280. Reducerea de 200 față de ancora de 500 nu dovedește că 300 este cel mai bun preț. Teo verifică produsul, condițiile și totalul, folosind oferta comparabilă în loc să se bazeze numai pe cifra tăiată.",
        "Exemplul arată o situație posibilă, nu o reacție obligatorie pentru fiecare om. Folosește cifrele pentru verificarea alegerii și separă ce este confirmat de ce presupui. Poți modifica suma, termenul ori alternativa. Un plan realist arată ce mai rămâne disponibil după decizie, nu doar ce ai cumpărat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Oferta de 300 lei pare avantajoasă față de 500 lei tăiat. Același produs este 280 lei în altă parte, în aceleași condiții. Cât plătești în plus alegând prima ofertă?",
      "explanation": "Diferența relevantă între alternative este 20 lei. Cei 200 lei față de prețul tăiat nu arată care ofertă actuală are costul mai mic.",
      "correctFeedback": "Corect. Diferența relevantă între alternative este 20 lei. Cei 200 lei față de prețul tăiat nu arată care ofertă actuală are costul mai mic.",
      "incorrectFeedback": "Nu chiar. Diferența relevantă între alternative este 20 lei. Cei 200 lei față de prețul tăiat nu arată care ofertă actuală are costul mai mic.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "200 lei."
        },
        {
          "id": "1",
          "label": "20 lei."
        },
        {
          "id": "2",
          "label": "220 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Vezi 500 tăiat și 300 nou. Ce verifici?",
      "explanation": "Alternativele comparabile și condițiile.",
      "correctFeedback": "Corect. Alternativele comparabile și condițiile.",
      "incorrectFeedback": "Nu chiar. Alternativele comparabile și condițiile.",
      "type": "scenariu",
      "context": "Un magazin afișează 500 lei tăiat și preț nou 300. Alt magazin are un produs comparabil la 280. Reducerea de 200 față de ancora de 500 nu dovedește că 300 este cel mai bun preț. Teo verifică produsul, condițiile și totalul, folosind oferta comparabilă în loc să se bazeze numai pe cifra tăiată.",
      "options": [
        {
          "id": "0",
          "label": "Numai diferența de 200."
        },
        {
          "id": "1",
          "label": "Doar dacă prețul vechi a fost real, fără alte oferte actuale."
        },
        {
          "id": "2",
          "label": "Alternativele comparabile și condițiile."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-efectul-de-ancorare",
      "paragraphs": [
        "Teo vede 500 lei tăiat și 300 lei pentru un produs. Simte că economisește 200. Caută o ofertă comparabilă și găsește 280, dar verifică și accesoriile și condițiile. Observă că prima cifră i-a influențat impresia. Decide după comparația reală și nevoia proprie, fără să trateze prețul tăiat ca dovadă suficientă a valorii.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Un magazin afișează 500 lei tăiat și preț nou 300. Alt magazin are un produs comparabil la 280. Reducerea de 200 față de ancora de 500 nu dovedește că 300 este cel mai bun preț. Teo verifică produsul, condițiile și totalul, folosind oferta comparabilă în loc să se bazeze numai pe cifra tăiată. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Teo spune „economisesc 200 lei”, fără să fi comparat oferta de 280 lei. Care valoare i-a devenit reper inițial?",
      "explanation": "Prețul tăiat de 500 lei i-a format prima comparație. Ofertele actuale comparabile oferă un reper mai util pentru alegere.",
      "correctFeedback": "Corect. Prețul tăiat de 500 lei i-a format prima comparație. Ofertele actuale comparabile oferă un reper mai util pentru alegere.",
      "incorrectFeedback": "Nu chiar. Prețul tăiat de 500 lei i-a format prima comparație. Ofertele actuale comparabile oferă un reper mai util pentru alegere.",
      "caseId": "caz-efectul-de-ancorare",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "500 lei."
        },
        {
          "id": "1",
          "label": "280 lei văzuți ulterior."
        },
        {
          "id": "2",
          "label": "Bugetul disponibil, fără să fi analizat alte prețuri."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce găsește prin comparație?",
      "explanation": "O ofertă comparabilă la 280 lei.",
      "correctFeedback": "Corect. O ofertă comparabilă la 280 lei.",
      "incorrectFeedback": "Nu chiar. O ofertă comparabilă la 280 lei.",
      "caseId": "caz-efectul-de-ancorare",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "O garanție de profit."
        },
        {
          "id": "1",
          "label": "O ofertă comparabilă la 280 lei."
        },
        {
          "id": "2",
          "label": "Un venit de 200 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce verifică și accesoriile?",
      "explanation": "Produsele și totalurile trebuie să fie comparabile.",
      "correctFeedback": "Corect. Produsele și totalurile trebuie să fie comparabile.",
      "incorrectFeedback": "Nu chiar. Produsele și totalurile trebuie să fie comparabile.",
      "caseId": "caz-efectul-de-ancorare",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Orice accesoriu este gratuit."
        },
        {
          "id": "1",
          "label": "Prețul tăiat include mereu tot."
        },
        {
          "id": "2",
          "label": "Produsele și totalurile trebuie să fie comparabile."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Prețul de referință trebuie verificat în contextul regulilor reducerii, dar nici un preț vechi real nu garantează valoarea actuală pentru tine. Același efect poate apărea la negocierea unei sume. Stabilește un interval din date independente înainte de discuție. Nu alege automat oferta mai ieftină dacă produsele au diferențe importante neanalizate.",
        "Dacă ai făcut deja o alegere pe care o regreți, notează ce a declanșat-o și adaptează pasul următor. Rușinea nu completează bugetul. Caută un proces simplu pe care îl poți repeta și verifică efectul în timp. Dacă o problemă persistă și îți afectează viața, cere sprijin potrivit situației."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Cum te pregătești pentru o negociere?",
      "explanation": "Cu repere independente înainte de prima ofertă.",
      "correctFeedback": "Corect. Cu repere independente înainte de prima ofertă.",
      "incorrectFeedback": "Nu chiar. Cu repere independente înainte de prima ofertă.",
      "type": "scenariu",
      "context": "Un magazin afișează 500 lei tăiat și preț nou 300. Alt magazin are un produs comparabil la 280. Reducerea de 200 față de ancora de 500 nu dovedește că 300 este cel mai bun preț. Teo verifică produsul, condițiile și totalul, folosind oferta comparabilă în loc să se bazeze numai pe cifra tăiată.",
      "options": [
        {
          "id": "0",
          "label": "Cu repere independente înainte de prima ofertă."
        },
        {
          "id": "1",
          "label": "Doar cu prima cifră auzită."
        },
        {
          "id": "2",
          "label": "Cu un preț ales de reclamă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Prețul vechi este real. Ce mai verifici?",
      "explanation": "Utilitatea și valoarea actuală pentru tine.",
      "correctFeedback": "Corect. Utilitatea și valoarea actuală pentru tine.",
      "incorrectFeedback": "Nu chiar. Utilitatea și valoarea actuală pentru tine.",
      "type": "scenariu",
      "context": "Un magazin afișează 500 lei tăiat și preț nou 300. Alt magazin are un produs comparabil la 280. Reducerea de 200 față de ancora de 500 nu dovedește că 300 este cel mai bun preț. Teo verifică produsul, condițiile și totalul, folosind oferta comparabilă în loc să se bazeze numai pe cifra tăiată.",
      "options": [
        {
          "id": "0",
          "label": "Consideri cumpărarea obligatorie."
        },
        {
          "id": "1",
          "label": "Utilitatea și valoarea actuală pentru tine."
        },
        {
          "id": "2",
          "label": "Ignori alternativele."
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
          "body": "Ancorarea apare când prima valoare întâlnită influențează evaluarea unei valori ulterioare.",
          "detail": "Prețul tăiat de 500 lei face oferta de 300 să pară atractivă. Oferta comparabilă de 280 arată că reperul inițial nu confirmă cel mai mic cost actual.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Un magazin afișează 500 lei tăiat și preț nou 300. Alt magazin are un produs comparabil la 280.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Prețul de referință trebuie verificat în contextul regulilor reducerii, dar nici un preț vechi real nu garantează valoarea actuală pentru tine.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Compară o ofertă cu preț tăiat cu două repere independente, folosind cifre fictive.",
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
