import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "metoda-50-30-20",
  "title": "Metoda 50/30/20",
  "categoryId": "economii",
  "chapterId": "bugetul",
  "slug": "metoda-50-30-20",
  "description": "Mara încearcă procentele 50/30/20, dar chiria depășește partea pentru nevoi. Metoda trebuie adaptată, nu folosită ca verdict.",
  "objective": "Să poți folosi metoda ca instrument orientativ de organizare, fără să o tratezi ca regulă obligatorie pentru orice persoană.",
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
      "title": "Metoda 50/30/20",
      "body": "Mara încearcă procentele 50/30/20, dar chiria depășește partea pentru nevoi. Metoda trebuie adaptată, nu folosită ca verdict."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Metoda 50/30/20 este un reper de organizare: o parte pentru nevoi, o parte pentru dorințe și o parte pentru economii sau obiective financiare. Procentele oferă o structură de discuție, nu o lege a vieții personale. Contextul veniturilor, costurile locuirii și obligațiile pot cere alte proporții.",
        "Pentru a o aplica într-un exercițiu, pornește de la suma disponibilă pentru buget, nu amesteca brutul cu banii efectiv primiți. Înmulțește suma cu fiecare procent și verifică totalul. Apoi compară rezultatul cu cheltuielile reale și cu informațiile de care încă ai nevoie."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce rol are metoda?",
      "explanation": "Procentele trebuie comparate cu contextul.",
      "correctFeedback": "Corect. Procentele trebuie comparate cu contextul.",
      "incorrectFeedback": "Nu chiar. Procentele trebuie comparate cu contextul.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Reper orientativ de organizare."
        },
        {
          "id": "1",
          "label": "Regulă obligatorie pentru orice venit."
        },
        {
          "id": "2",
          "label": "Garanție că nevoile vor costa mai puțin."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Dacă nevoile depășesc 50%, persoana este automat iresponsabilă.",
      "explanation": "Costurile și veniturile pot cere alte proporții.",
      "correctFeedback": "Corect. Costurile și veniturile pot cere alte proporții.",
      "incorrectFeedback": "Nu chiar. Costurile și veniturile pot cere alte proporții.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu de 2.400 lei disponibili, 50% înseamnă 1.200, 30% înseamnă 720 și 20% înseamnă 480 lei. Cele trei sume totalizează 2.400 lei. Calculul explică metoda, nu recomandă această împărțire unei persoane concrete. Categoriile trebuie interpretate în context, nu numai după numele produsului.",
        "Dacă nevoile reale sunt 1.500 lei, diferența față de reperul de 1.200 este 300 lei. Nu acoperi diferența doar pe hârtie. Revizuiești proporțiile, costurile și obiectivele, astfel încât planul să rămână realizabil și să nu presupună bani inexistenți."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cât este 20% din 2.400 lei?",
      "explanation": "2.400 × 0,20 = 480 lei.",
      "correctFeedback": "Corect. 2.400 × 0,20 = 480 lei.",
      "incorrectFeedback": "Nu chiar. 2.400 × 0,20 = 480 lei.",
      "type": "scenariu",
      "context": "Aplici metoda într-un exemplu.",
      "options": [
        {
          "id": "0",
          "label": "240 lei."
        },
        {
          "id": "1",
          "label": "480 lei."
        },
        {
          "id": "2",
          "label": "720 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Nevoile sunt peste reper. Ce faci?",
      "explanation": "Planul trebuie să corespundă realității.",
      "correctFeedback": "Corect. Planul trebuie să corespundă realității.",
      "incorrectFeedback": "Nu chiar. Planul trebuie să corespundă realității.",
      "type": "scenariu",
      "context": "Nu există bani suplimentari.",
      "options": [
        {
          "id": "0",
          "label": "Ignori obligațiile în tabel."
        },
        {
          "id": "1",
          "label": "Inventez venit pentru echilibru."
        },
        {
          "id": "2",
          "label": "Revizuiești costurile și împărțirea realistă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-metoda-50-30-20",
      "paragraphs": [
        "Mara începe un job part-time și are în acest exemplu 2.400 lei disponibili într-o lună. Folosește metoda 50/30/20 și calculează 1.200 lei pentru nevoi, 720 pentru dorințe și 480 pentru economii. Apoi adună costurile reale de locuire, mâncare și transport și obține 1.500 lei. Reperul nu acoperă această sumă.",
        "Mara nu presupune că obligațiile se reduc doar fiindcă tabelul cere 50%. Verifică ce este fix, ce poate varia și ce obiective poate susține. Ajustează celelalte categorii și nu numește orice preferință nevoie pentru a ascunde diferența. Un coleg are alte costuri și poate folosi proporții diferite. Cei doi nu compară procentele ca verdict despre responsabilitate. Metoda rămâne un punct de pornire pentru o discuție clară, iar bugetul final trebuie să corespundă sumelor efective."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Cu cât depășesc nevoile Marei reperul?",
      "explanation": "1.500 − 1.200 = 300 lei.",
      "correctFeedback": "Corect. 1.500 − 1.200 = 300 lei.",
      "incorrectFeedback": "Nu chiar. 1.500 − 1.200 = 300 lei.",
      "caseId": "caz-metoda-50-30-20",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "300 lei."
        },
        {
          "id": "1",
          "label": "480 lei."
        },
        {
          "id": "2",
          "label": "1.200 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce trebuie păstrat în bugetul final?",
      "explanation": "Reperul ajută planul, nu înlocuiește sumele.",
      "correctFeedback": "Corect. Reperul ajută planul, nu înlocuiește sumele.",
      "incorrectFeedback": "Nu chiar. Reperul ajută planul, nu înlocuiește sumele.",
      "caseId": "caz-metoda-50-30-20",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Procentele cu orice preț."
        },
        {
          "id": "1",
          "label": "Totalul efectiv și obligațiile reale."
        },
        {
          "id": "2",
          "label": "Toate dorințele fără comparație."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Cum compară situația colegului?",
      "explanation": "Contextul diferit poate justifica altă structură.",
      "correctFeedback": "Corect. Contextul diferit poate justifica altă structură.",
      "incorrectFeedback": "Nu chiar. Contextul diferit poate justifica altă structură.",
      "caseId": "caz-metoda-50-30-20",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Aplicând identic chiria Marei."
        },
        {
          "id": "1",
          "label": "Judecând doar procentul economisit."
        },
        {
          "id": "2",
          "label": "Cu propriile lui costuri, fără verdict moral."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Economisirea poate varia într-o lună cu venit neregulat sau cost neașteptat. Un reper util nu trebuie să facă o situație dificilă să pară eșec moral. Poți începe cu o contribuție realistă și un plan revizuit, fără să pretinzi că fiecare persoană poate atinge imediat același procent.",
        "Mai evită clasificarea convenabilă: nu numi automat orice preferință nevoie ca să păstrezi procentele. Descrie funcția și consecințele, apoi decide transparent. Metoda ajută să vezi distribuția și compromisurile. Dacă împărțirea nu se potrivește realității, adaptezi instrumentul și urmărești rezultatul, nu ignori obligațiile."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Venitul este mai mic într-o lună. Ce reevaluezi?",
      "explanation": "Un procent nu creează resurse noi.",
      "correctFeedback": "Corect. Un procent nu creează resurse noi.",
      "incorrectFeedback": "Nu chiar. Un procent nu creează resurse noi.",
      "type": "scenariu",
      "context": "Ai venit neregulat.",
      "options": [
        {
          "id": "0",
          "label": "Sumele și obiectivele realizabile în acea perioadă."
        },
        {
          "id": "1",
          "label": "Doar etichetele din tabel."
        },
        {
          "id": "2",
          "label": "Presupui procentele ca bani garantați."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Cum clasifici o cheltuială ambiguă?",
      "explanation": "Clasificarea transparentă ajută compromisurile.",
      "correctFeedback": "Corect. Clasificarea transparentă ajută compromisurile.",
      "incorrectFeedback": "Nu chiar. Clasificarea transparentă ajută compromisurile.",
      "type": "scenariu",
      "context": "Un produs are parte necesară și opțiuni suplimentare.",
      "options": [
        {
          "id": "0",
          "label": "O numești nevoie pentru orice preferință."
        },
        {
          "id": "1",
          "label": "După funcție și context, nu ca să forțezi procentul."
        },
        {
          "id": "2",
          "label": "O numești dorință pentru orice altă persoană."
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
          "title": "Reper",
          "body": "Metoda nu este o obligație universală.",
          "detail": "Metoda nu este o obligație universală.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Calcul",
          "body": "Aplică procentele la suma disponibilă.",
          "detail": "Aplică procentele la suma disponibilă.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Adaptare",
          "body": "Bugetul trebuie să acopere realitatea.",
          "detail": "Bugetul trebuie să acopere realitatea.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Aplică informativ procentele unei sume ipotetice și compară-le cu trei costuri reale sau estimate.",
          "detail": "Aplică informativ procentele unei sume ipotetice și compară-le cu trei costuri reale sau estimate.",
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
