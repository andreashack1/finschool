import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "obiective-de-economisire",
  "title": "Obiective de economisire",
  "categoryId": "economii",
  "chapterId": "economisirea",
  "slug": "obiective-de-economisire",
  "description": "Radu vrea un laptop pentru facultate. Are deja o parte din bani, deci contribuția se calculează pentru diferență, nu pentru tot prețul.",
  "objective": "Să poți transforma un obiectiv într-o sumă și un termen și să calculezi contribuția periodică necesară.",
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
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Obiective de economisire",
      "body": "Radu vrea un laptop pentru facultate. Are deja o parte din bani, deci contribuția se calculează pentru diferență, nu pentru tot prețul."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un obiectiv de economisire poate fi descris prin produs sau scop, suma necesară și termen. Dacă ai deja bani separați, scazi acea sumă înainte să calculezi contribuția. Nu număra economii folosite pentru alt scop ca și cum ar fi disponibile integral pentru acesta.",
        "Într-un exemplu, un laptop costă 1.800 lei și ai 600 lei separați. Diferența este 1.200 lei. Pentru șase luni, o contribuție de 200 lei lunar ar acoperi diferența dacă prețul și planul rămân constante. Nu includem randamente sau costuri suplimentare în acest exercițiu."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce calculezi înainte de contribuția periodică?",
      "explanation": "Suma deja separată reduce ceea ce lipsește.",
      "correctFeedback": "Corect. Suma deja separată reduce ceea ce lipsește.",
      "incorrectFeedback": "Nu chiar. Suma deja separată reduce ceea ce lipsește.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Diferența dintre țintă și economiile dedicate."
        },
        {
          "id": "1",
          "label": "Doar întregul preț ignorând economiile."
        },
        {
          "id": "2",
          "label": "Doar media prietenilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Banii dedicați altui scop pot fi numărați integral pentru ambele simultan.",
      "explanation": "Aceeași sumă nu acoperă două obiective în același timp.",
      "correctFeedback": "Corect. Aceeași sumă nu acoperă două obiective în același timp.",
      "incorrectFeedback": "Nu chiar. Aceeași sumă nu acoperă două obiective în același timp.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Termenul și contribuția se influențează. Dacă poți separa numai 150 lei lunar, șase luni aduc 900 lei, deci lipsesc 300. Poți compara un termen mai lung sau un cost diferit. Nu folosi un câștig investițional nesigur drept soluție garantată pentru diferența unui scop apropiat.",
        "Verifică și costul real al obiectivului: transport, accesorii necesare sau alte componente pot schimba totalul. Un preț estimat trebuie marcat ca estimare și revizuit. Planul este util când îți arată diferențele, nu când presupune că toate variabilele vor rămâne favorabile."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Țintă 1.800, economii 600. Ce diferență ai?",
      "explanation": "1.800 − 600 = 1.200 lei.",
      "correctFeedback": "Corect. 1.800 − 600 = 1.200 lei.",
      "incorrectFeedback": "Nu chiar. 1.800 − 600 = 1.200 lei.",
      "type": "scenariu",
      "context": "Economiile sunt dedicate obiectivului.",
      "options": [
        {
          "id": "0",
          "label": "2.400 lei."
        },
        {
          "id": "1",
          "label": "1.200 lei."
        },
        {
          "id": "2",
          "label": "600 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Diferența de 1.200 în șase luni cere cât lunar?",
      "explanation": "1.200 împărțit la 6 este 200 lei.",
      "correctFeedback": "Corect. 1.200 împărțit la 6 este 200 lei.",
      "incorrectFeedback": "Nu chiar. 1.200 împărțit la 6 este 200 lei.",
      "type": "scenariu",
      "context": "Nu includem randamente în exercițiu.",
      "options": [
        {
          "id": "0",
          "label": "150 lei."
        },
        {
          "id": "1",
          "label": "300 lei."
        },
        {
          "id": "2",
          "label": "200 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-obiective-de-economisire",
      "paragraphs": [
        "Radu vrea un laptop ipotetic de 1.800 lei peste șase luni și are 600 lei separați pentru el. Calculează diferența de 1.200 lei și contribuția de 200 lei lunar. Bugetul lui ar permite însă doar 150 lei fără să afecteze obligațiile relevante. În șase luni ar adăuga 900 lei și ar ajunge la 1.500, cu 300 sub țintă.",
        "Radu compară un termen mai lung și alte modele potrivite, fără să presupună un profit sigur pentru diferență. Verifică dacă prețul include accesoriul necesar și transportul. Banii pentru un drum la familie nu sunt numărați încă o dată pentru laptop. La o schimbare de venit, actualizează planul și verifică utilitatea produsului. Economisirea îi oferă opțiuni, nu obligația de a cumpăra exact modelul inițial. Suma, termenul și contribuția rămân legate de resurse și costuri reale."
      ]
    },
    {
      "id": "q5",
      "question": "Cu 150 lunar, cât lipsește lui Radu la termen?",
      "explanation": "600 + 900 = 1.500, cu 300 sub 1.800.",
      "correctFeedback": "Corect. 600 + 900 = 1.500, cu 300 sub 1.800.",
      "incorrectFeedback": "Nu chiar. 600 + 900 = 1.500, cu 300 sub 1.800.",
      "caseId": "caz-obiective-de-economisire",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "300 lei."
        },
        {
          "id": "1",
          "label": "900 lei."
        },
        {
          "id": "2",
          "label": "600 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce adaptare poate compara?",
      "explanation": "Diferența trebuie rezolvată prin ipoteze realiste.",
      "correctFeedback": "Corect. Diferența trebuie rezolvată prin ipoteze realiste.",
      "incorrectFeedback": "Nu chiar. Diferența trebuie rezolvată prin ipoteze realiste.",
      "caseId": "caz-obiective-de-economisire",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Profit sigur inventat."
        },
        {
          "id": "1",
          "label": "Termen mai lung sau cost diferit."
        },
        {
          "id": "2",
          "label": "Ignorarea obligațiilor."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce verifică accesoriile și transportul?",
      "explanation": "Ținta trebuie să includă componentele necesare.",
      "correctFeedback": "Corect. Ținta trebuie să includă componentele necesare.",
      "incorrectFeedback": "Nu chiar. Ținta trebuie să includă componentele necesare.",
      "caseId": "caz-obiective-de-economisire",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Sunt mereu gratuite."
        },
        {
          "id": "1",
          "label": "Nu există cost real în economisire."
        },
        {
          "id": "2",
          "label": "Pot modifica totalul obiectivului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un progres vizibil poate susține continuitatea, dar nu transformă fiecare lună într-un test de caracter. Dacă intrarea se schimbă, actualizează contribuția și termenul. Mai verifică dacă obiectivul încă îți este util; nu trebuie să continui o achiziție doar fiindcă ai început economisirea.",
        "Pentru mai multe scopuri, folosește o evidență care separă sumele. O sută de lei nu poate fi contribuția integrală pentru două obiective simultan. Prioritățile și termenele se compară transparent. Acțiunea mică este să calculezi ce lipsește și ce ritm poate fi susținut, nu să promiți o sumă care ignoră obligațiile."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Prețul se schimbă. Ce actualizezi?",
      "explanation": "Variabilele obiectivului trebuie revizuite.",
      "correctFeedback": "Corect. Variabilele obiectivului trebuie revizuite.",
      "incorrectFeedback": "Nu chiar. Variabilele obiectivului trebuie revizuite.",
      "type": "scenariu",
      "context": "Ai primit o ofertă nouă.",
      "options": [
        {
          "id": "0",
          "label": "Suma lipsă și ritmul sau termenul."
        },
        {
          "id": "1",
          "label": "Doar contribuția lunară, presupunând că termenul rămâne realizabil."
        },
        {
          "id": "2",
          "label": "Doar procentul de progres, păstrând ținta la prețul vechi."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Obiectivul nu mai este util. Ce poți face?",
      "explanation": "Economisirea creează opțiuni, nu obligație de achiziție.",
      "correctFeedback": "Corect. Economisirea creează opțiuni, nu obligație de achiziție.",
      "incorrectFeedback": "Nu chiar. Economisirea creează opțiuni, nu obligație de achiziție.",
      "type": "scenariu",
      "context": "Nevoile tale s-au schimbat.",
      "options": [
        {
          "id": "0",
          "label": "Cumpăra obligatoriu fiindcă ai început."
        },
        {
          "id": "1",
          "label": "Reevalua destinația economiilor în contextul tău."
        },
        {
          "id": "2",
          "label": "Șterge banii din evidență."
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
          "title": "Diferență",
          "body": "Scade economiile dedicate din țintă.",
          "detail": "Pentru laptopul de 1.800 lei, cei 600 lei dedicați lasă 1.200 lei de strâns. Nu include în aceeași sumă și banii rezervați drumului la familie.",
          "type": "normal",
          "detailHighlights": [
            "banii",
            "sumă"
          ]
        },
        {
          "id": "idee-1",
          "title": "Ritm",
          "body": "Împarte ce lipsește la perioadele disponibile.",
          "type": "normal",
          "detail": "Ritmul se calculează din suma rămasă, nu din prețul întreg dacă ai economii deja separate.",
          "detailHighlights": [
            "economii",
            "prețul"
          ]
        },
        {
          "id": "idee-2",
          "title": "Revizuire",
          "body": "Actualizează costul, termenul și utilitatea.",
          "type": "normal",
          "detail": "Un termen nou sau un preț schimbat cer recalcularea planului. Nu tratezi estimarea veche ca promisiune.",
          "detailHighlights": [
            "estimarea",
            "termen"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pentru un obiectiv, calculează ce lipsește și contribuția periodică într-un scenariu fără randament promis.",
          "type": "action",
          "detail": "Scrie și unde păstrezi suma, separat de banii de consum, ca să poți urmări progresul fără dublă numărare.",
          "detailHighlights": [
            "banii",
            "suma"
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
