import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cumparaturile-pe-impuls",
  "title": "Cumpărăturile pe impuls",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "capcanele-cumparaturilor",
  "slug": "cumparaturile-pe-impuls",
  "description": "Teo intră într-o aplicație pentru un mesaj și ajunge aproape să cumpere o pereche de căști pe care nu o căuta.",
  "objective": "Să poți identifica un impuls de cumpărare și să aplici o metodă simplă prin care încetinești decizia.",
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
      "title": "Cumpărăturile pe impuls",
      "body": "Teo intră într-o aplicație pentru un mesaj și ajunge aproape să cumpere o pereche de căști pe care nu o căuta."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O cumpărătură pe impuls apare când decizia este foarte rapidă și nu pornește dintr-un plan clar. O reclamă, o stare sau un cronometru pot accelera dorința. Nu înseamnă că produsul este automat inutil sau că persoana a greșit moral. Înseamnă că merită introdus un moment de verificare înainte de plată.",
        "Întreabă-te dacă ai căutat produsul înainte să îl vezi și ce problemă rezolvă. Dacă nu ai un răspuns, poți salva oferta fără să cumperi imediat. O pauză mută decizia din reacția la stimul spre comparația cu nevoile și banii disponibili."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce semnal indică un posibil impuls?",
      "explanation": "Viteza și lipsa unui scop anterior merită observate.",
      "correctFeedback": "Corect. Viteza și lipsa unui scop anterior merită observate.",
      "incorrectFeedback": "Nu chiar. Viteza și lipsa unui scop anterior merită observate.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Cumperi ceva neplanificat imediat după un stimul."
        },
        {
          "id": "1",
          "label": "Compari din timp două produse necesare."
        },
        {
          "id": "2",
          "label": "Verifici costul înainte de plată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O pauză trebuie să dureze obligatoriu exact aceeași perioadă pentru toți.",
      "explanation": "Durata poate varia; verificarea este partea importantă.",
      "correctFeedback": "Corect. Durata poate varia; verificarea este partea importantă.",
      "incorrectFeedback": "Nu chiar. Durata poate varia; verificarea este partea importantă.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pauza poate fi scurtă sau mai lungă, în funcție de cumpărătură. Nu există o durată magică potrivită tuturor. Important este să ai timp să verifici totalul, alternativele și obligațiile apropiate. Pentru un obiect mai costisitor, închiderea aplicației și revenirea ulterior pot reduce presiunea creată de mesajul comercial.",
        "Într-un exemplu, ai 240 lei disponibili, dar 150 lei sunt pentru un drum programat. O achiziție de 120 lei nu încape în restul de 90 lei fără schimbarea planului. Cifra din sold nu este suficientă; verifici ce parte este deja rezervată."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Din 240 lei, 150 sunt rezervați. Cât rămâne?",
      "explanation": "240 − 150 = 90 lei pentru alte alegeri.",
      "correctFeedback": "Corect. 240 − 150 = 90 lei pentru alte alegeri.",
      "incorrectFeedback": "Nu chiar. 240 − 150 = 90 lei pentru alte alegeri.",
      "type": "scenariu",
      "context": "Nu ai alte intrări în exemplu.",
      "options": [
        {
          "id": "0",
          "label": "240 lei."
        },
        {
          "id": "1",
          "label": "90 lei."
        },
        {
          "id": "2",
          "label": "390 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un cronometru te grăbește. Ce pas ajută?",
      "explanation": "Pauza permite evaluarea dincolo de presiune.",
      "correctFeedback": "Corect. Pauza permite evaluarea dincolo de presiune.",
      "incorrectFeedback": "Nu chiar. Pauza permite evaluarea dincolo de presiune.",
      "type": "scenariu",
      "context": "Produsul nu era pe lista ta.",
      "options": [
        {
          "id": "0",
          "label": "Plătești înainte să citești costul."
        },
        {
          "id": "1",
          "label": "Presupui că orice produs este necesar."
        },
        {
          "id": "2",
          "label": "Salvezi oferta și verifici totalul și alternativele."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cumparaturile-pe-impuls",
      "paragraphs": [
        "Teo are 240 lei în cont și a rezervat 150 lei pentru un drum la familie. Deschide o aplicație pentru a răspunde unui prieten. O reclamă îi arată căști de 120 lei, cu mesajul „ultimele minute”. Căștile actuale funcționează, iar Teo nu căutase un model nou înainte de reclamă.",
        "El adaugă produsul în coș și vede că plata este deja salvată. Înainte să confirme, închide aplicația și calculează suma rămasă după drumul planificat: 90 lei. Ar trebui să schimbe altă parte a planului ca să cumpere acum. Teo salvează modelul pentru o comparație ulterioară și verifică dacă prețul chiar este avantajos. Nu consideră dorința rușinoasă, dar nici cronometrul o obligație. Dacă revine la produs, va putea decide pe baza utilității și a bugetului."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce face cumpărătura lui Teo neplanificată?",
      "explanation": "Contextul arată apariția dorinței după stimul.",
      "correctFeedback": "Corect. Contextul arată apariția dorinței după stimul.",
      "incorrectFeedback": "Nu chiar. Contextul arată apariția dorinței după stimul.",
      "caseId": "caz-cumparaturile-pe-impuls",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Nu căuta căști, iar cele actuale funcționează."
        },
        {
          "id": "1",
          "label": "Orice cască este o cheltuială greșită."
        },
        {
          "id": "2",
          "label": "Toate reclamele sunt false."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "De ce nu ajunge soldul de 240 lei pentru comparație?",
      "explanation": "Suma disponibilă după obligații este mai mică.",
      "correctFeedback": "Corect. Suma disponibilă după obligații este mai mică.",
      "incorrectFeedback": "Nu chiar. Suma disponibilă după obligații este mai mică.",
      "caseId": "caz-cumparaturile-pe-impuls",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Soldul nu reprezintă bani reali."
        },
        {
          "id": "1",
          "label": "150 lei au deja o destinație apropiată."
        },
        {
          "id": "2",
          "label": "Teo trebuie să cheltuiască tot."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce îi permite închiderea aplicației?",
      "explanation": "Pauza schimbă procesul, nu impune rezultatul.",
      "correctFeedback": "Corect. Pauza schimbă procesul, nu impune rezultatul.",
      "incorrectFeedback": "Nu chiar. Pauza schimbă procesul, nu impune rezultatul.",
      "caseId": "caz-cumparaturile-pe-impuls",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Să garanteze că oferta este falsă."
        },
        {
          "id": "1",
          "label": "Să anuleze orice dorință viitoare."
        },
        {
          "id": "2",
          "label": "Să verifice utilitatea și prețul fără presiunea imediată."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O reducere pierdută nu este automat o pierdere financiară. Dacă nu aveai nevoie de produs și nu l-ai cumpărat, nu ai plătit prețul doar ca să „economisești” diferența din reclamă. Economisirea compară cheltuieli necesare sau planificate, nu orice preț tăiat dintr-o ofertă.",
        "Poți construi un mic sistem: scoți plata salvată, folosești o listă sau verifici bugetul înainte de coș. Nu trebuie să elimini toate cumpărăturile spontane. Scopul este să păstrezi posibilitatea de a alege și să observi când presiunea înlocuiește informația. O decizie conștientă poate fi și cumpărarea după verificare."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Nu cumperi un produs neplanificat redus. Ai pierdut reducerea ca bani?",
      "explanation": "O reducere ratată nu este automat pierdere financiară.",
      "correctFeedback": "Corect. O reducere ratată nu este automat pierdere financiară.",
      "incorrectFeedback": "Nu chiar. O reducere ratată nu este automat pierdere financiară.",
      "type": "scenariu",
      "context": "Nu aveai o nevoie pentru acel produs.",
      "options": [
        {
          "id": "0",
          "label": "Nu; nu ai făcut cheltuiala respectivă."
        },
        {
          "id": "1",
          "label": "Da, trebuie să plătești diferența."
        },
        {
          "id": "2",
          "label": "Da, orice ofertă este venit sigur."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "După pauză, produsul este util și încape în buget. Ce urmează?",
      "explanation": "Pauza ajută alegerea, nu creează o regulă morală.",
      "correctFeedback": "Corect. Pauza ajută alegerea, nu creează o regulă morală.",
      "incorrectFeedback": "Nu chiar. Pauza ajută alegerea, nu creează o regulă morală.",
      "type": "scenariu",
      "context": "Ai făcut comparația relevantă.",
      "options": [
        {
          "id": "0",
          "label": "Trebuie interzis indiferent de context."
        },
        {
          "id": "1",
          "label": "Poți decide conștient, după verificarea condițiilor."
        },
        {
          "id": "2",
          "label": "Trebuie cumpărat orice produs similar."
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
          "title": "Observă stimulul",
          "body": "Reclama și graba pot accelera o dorință.",
          "detail": "Reclama și graba pot accelera o dorință.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Introdu o pauză",
          "body": "Verificarea contează mai mult decât o durată rigidă.",
          "detail": "Verificarea contează mai mult decât o durată rigidă.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Sold și plan",
          "body": "Scade obligațiile înainte să decizi.",
          "detail": "Scade obligațiile înainte să decizi.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Salvează o achiziție neplanificată și verifică ulterior dacă încă rezolvă o problemă pentru tine.",
          "detail": "Salvează o achiziție neplanificată și verifică ulterior dacă încă rezolvă o problemă pentru tine.",
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
