import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "de-ce-economisim-si-cat",
  "title": "De ce economisim și cât",
  "categoryId": "economii",
  "chapterId": "economisirea",
  "slug": "de-ce-economisim-si-cat",
  "description": "Sofia vrea bani pentru un curs. O sumă aleasă din entuziasm poate fi prea mare dacă ignoră cheltuielile necesare.",
  "objective": "Să poți lega economisirea de un scop concret și să alegi o sumă realistă pentru contextul unui scenariu.",
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
      "title": "De ce economisim și cât",
      "body": "Sofia vrea bani pentru un curs. O sumă aleasă din entuziasm poate fi prea mare dacă ignoră cheltuielile necesare."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Economisirea separă bani pentru un scop sau pentru flexibilitate viitoare. Un scop clar face planul mai ușor de verificat: ce vrei, cât costă și când ai nevoie de sumă? Nu trebuie să existe un procent universal. Contextul veniturilor și obligațiilor determină ce contribuție poate fi susținută.",
        "O sumă foarte mare promisă și abandonată nu este automat mai utilă decât o contribuție modestă repetabilă. Începe cu resursele disponibile după costurile relevante. Economiile rămân bani ai tăi, dar au o destinație separată. Nu le trata ca dispărute și nici ca libere pentru orice cumpărătură."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce face un scop verificabil?",
      "explanation": "Un obiectiv concret permite compararea planului.",
      "correctFeedback": "Corect. Un obiectiv concret permite compararea planului.",
      "incorrectFeedback": "Nu chiar. Un obiectiv concret permite compararea planului.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Suma, termenul și resursele necesare."
        },
        {
          "id": "1",
          "label": "Doar entuziasmul."
        },
        {
          "id": "2",
          "label": "Un procent impus tuturor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Economisirea are obligatoriu același procent pentru fiecare persoană.",
      "explanation": "Contribuția depinde de context și obligații.",
      "correctFeedback": "Corect. Contribuția depinde de context și obligații.",
      "incorrectFeedback": "Nu chiar. Contribuția depinde de context și obligații.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu, un curs costă 600 lei peste șase luni și nu ai bani separați pentru el. O contribuție de 100 lei lunar ar acoperi suma dacă planul se respectă și prețul nu se schimbă. Cifrele sunt ipotetice, nu recomandarea unei contribuții personale.",
        "Dacă suma realizabilă este numai 75 lei lunar, în șase luni strângi 450 lei. Diferența este 150 lei. Poți compara un termen mai lung, un curs alternativ sau o sursă confirmată de venit. Nu ascunde diferența în tabel și nu presupune că orice câștig viitor se va întâmpla."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "600 lei în șase luni fără economii inițiale cer cât lunar în exemplu?",
      "explanation": "600 împărțit la 6 este 100 lei.",
      "correctFeedback": "Corect. 600 împărțit la 6 este 100 lei.",
      "incorrectFeedback": "Nu chiar. 600 împărțit la 6 este 100 lei.",
      "type": "scenariu",
      "context": "Nu includem randamente sau costuri schimbate.",
      "options": [
        {
          "id": "0",
          "label": "60 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "150 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "75 lei lunar timp de șase luni înseamnă cât?",
      "explanation": "75 × 6 = 450 lei.",
      "correctFeedback": "Corect. 75 × 6 = 450 lei.",
      "incorrectFeedback": "Nu chiar. 75 × 6 = 450 lei.",
      "type": "scenariu",
      "context": "Verifici suma realizabilă.",
      "options": [
        {
          "id": "0",
          "label": "600 lei."
        },
        {
          "id": "1",
          "label": "75 lei."
        },
        {
          "id": "2",
          "label": "450 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-de-ce-economisim-si-cat",
      "paragraphs": [
        "Sofia găsește un curs ipotetic de 600 lei care începe peste șase luni. Nu are încă bani separați. Calculează că ar avea nevoie de 100 lei lunar, dar bugetul ei permite în mod realist doar 75 lei după costurile relevante. Dacă păstrează această sumă, va strânge 450 lei până la termen.",
        "Ea notează diferența de 150 lei în loc să promită o contribuție imposibilă. Compară un curs cu alt termen și o variantă mai accesibilă, fără să se bazeze pe un proiect de venit neconfirmat. Mai are o mică rezervă pentru o reparație, pe care nu o numără automat și pentru curs. Când apare o cheltuială necesară, reevaluează planul. Scopul rămâne important, dar suma periodică și termenul trebuie să corespundă resurselor reale. Economisirea nu este un verdict despre cât de ambițioasă este Sofia."
      ]
    },
    {
      "id": "q5",
      "question": "Care este diferența față de scopul Sofiei?",
      "explanation": "600 − 450 = 150 lei.",
      "correctFeedback": "Corect. 600 − 450 = 150 lei.",
      "incorrectFeedback": "Nu chiar. 600 − 450 = 150 lei.",
      "caseId": "caz-de-ce-economisim-si-cat",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "150 lei."
        },
        {
          "id": "1",
          "label": "75 lei."
        },
        {
          "id": "2",
          "label": "450 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce opțiune păstrează planul realist?",
      "explanation": "Suma lipsă trebuie explicată printr-o adaptare.",
      "correctFeedback": "Corect. Suma lipsă trebuie explicată printr-o adaptare.",
      "incorrectFeedback": "Nu chiar. Suma lipsă trebuie explicată printr-o adaptare.",
      "caseId": "caz-de-ce-economisim-si-cat",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ascunderea diferenței."
        },
        {
          "id": "1",
          "label": "Compararea termenului și alternativelor."
        },
        {
          "id": "2",
          "label": "Un venit neconfirmat tratat ca primit."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce separă rezerva de curs?",
      "explanation": "Destinațiile separate arată resursele reale.",
      "correctFeedback": "Corect. Destinațiile separate arată resursele reale.",
      "incorrectFeedback": "Nu chiar. Destinațiile separate arată resursele reale.",
      "caseId": "caz-de-ce-economisim-si-cat",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Economiile nu mai sunt ale ei."
        },
        {
          "id": "1",
          "label": "Orice rezervă trebuie cheltuită imediat."
        },
        {
          "id": "2",
          "label": "Aceiași bani nu acoperă integral două scopuri simultan."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un obiectiv nu trebuie urmărit cu orice preț. Dacă apare o obligație importantă sau costul se schimbă, revizuiește suma și termenul. Economisirea este un proces de adaptare, nu un test moral. Mai multe scopuri pot cere priorități diferite și o separare simplă în evidență.",
        "Verifică progresul fără să numeri aceeași sumă pentru două scopuri simultan. Dacă ai 200 lei pentru curs, nu îi considera și rezerva completă pentru o reparație. Claritatea destinației te ajută să vezi resursele reale. O contribuție potrivită scenariului trebuie să lase loc și obligațiilor, nu numai obiectivului atractiv."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Apare o obligație necesară. Ce faci cu planul?",
      "explanation": "Adaptarea păstrează realismul.",
      "correctFeedback": "Corect. Adaptarea păstrează realismul.",
      "incorrectFeedback": "Nu chiar. Adaptarea păstrează realismul.",
      "type": "scenariu",
      "context": "Bugetul lunii s-a schimbat.",
      "options": [
        {
          "id": "0",
          "label": "Reevaluezi contribuția și termenul."
        },
        {
          "id": "1",
          "label": "Menții orice promisiune ignorând plata."
        },
        {
          "id": "2",
          "label": "Declari economisirea imposibilă pentru totdeauna."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce contribuție este utilă în scenariu?",
      "explanation": "Planul trebuie susținut cu bani efectivi.",
      "correctFeedback": "Corect. Planul trebuie susținut cu bani efectivi.",
      "incorrectFeedback": "Nu chiar. Planul trebuie susținut cu bani efectivi.",
      "type": "scenariu",
      "context": "Ai un scop și venit limitat.",
      "options": [
        {
          "id": "0",
          "label": "Cea mai mare sumă imaginabilă."
        },
        {
          "id": "1",
          "label": "Una repetabilă după verificarea obligațiilor."
        },
        {
          "id": "2",
          "label": "Orice sumă care arată bine în tabel."
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
          "title": "Scop",
          "body": "Clarifică suma și termenul.",
          "detail": "Cursul de 600 lei în șase luni ar cere 100 lei lunar dacă nu există economii inițiale. Dacă sunt realizabili numai 75 lei, marchează diferența și compară alt termen sau o alternativă.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Realism",
          "body": "Contribuția trebuie susținută de buget.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Separare",
          "body": "Nu număra aceeași sumă pentru două scopuri.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Alege un scop mic și estimează suma și termenul, fără să stabilești o contribuție pe care nu o poți susține.",
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
