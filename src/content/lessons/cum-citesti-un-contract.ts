import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cum-citesti-un-contract",
  "title": "Cum citești un contract",
  "categoryId": "primul-job",
  "chapterId": "primul-job",
  "slug": "cum-citesti-un-contract",
  "description": "Ioana a discutat despre patru ore zilnic și un loc de muncă aproape de facultate.",
  "objective": "Să poți explica cum citești un contract și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Cum citești un contract",
      "body": "Ioana a discutat despre patru ore zilnic și un loc de muncă aproape de facultate."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Citește un contract urmărind cine se obligă, ce trebuie făcut, cât se plătește și când începe sau încetează obligația. Pentru un job, caută funcția, locul muncii, norma, salariul brut și durata. Anexele și fișa postului pot explica responsabilitățile. O semnătură confirmă acceptarea documentului, nu promisiunile pe care speri să le conțină.",
        "La primul job, separă promisiunea verbală de informația scrisă. Păstrează documentele primite și cere explicații despre termenii pe care nu îi înțelegi. O discuție clară înainte de începere ajută atât planul de bani, cât și organizarea timpului. Nu transmite public documente care conțin date personale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Cu ce începi citirea?",
      "explanation": "Părțile, obligațiile, plata și durata.",
      "correctFeedback": "Corect. Părțile, obligațiile, plata și durata.",
      "incorrectFeedback": "Nu chiar. Părțile, obligațiile, plata și durata.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Părțile, obligațiile, plata și durata."
        },
        {
          "id": "1",
          "label": "Doar salariul promis, fără program și responsabilități."
        },
        {
          "id": "2",
          "label": "Doar durata, presupunând că anexele nu creează obligații."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O ofertă verbală de patru ore și un contract cu opt ore trebuie clarificate înainte să îți planifici programul.",
      "explanation": "Programul scris poate diferi de discuția inițială. Clarifică diferența înainte de acceptare, ca să nu organizezi cursurile după o promisiune neconfirmată.",
      "correctFeedback": "Corect. Programul scris poate diferi de discuția inițială. Clarifică diferența înainte de acceptare, ca să nu organizezi cursurile după o promisiune neconfirmată.",
      "incorrectFeedback": "Nu chiar. Programul scris poate diferi de discuția inițială. Clarifică diferența înainte de acceptare, ca să nu organizezi cursurile după o promisiune neconfirmată.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Ioana compară discuția de recrutare cu documentul: i s-a spus patru ore, dar apare o normă de opt ore. Marchează diferența și cere corectarea ori explicația înainte de semnare. Nu schimbă singură textul după ce a semnat. Verifică și dacă durata este determinată sau nedeterminată, deoarece această informație contează pentru planificare.",
        "Într-o comparație de oferte, folosește aceeași perioadă și aceeași normă de lucru. Notează ce este confirmat și ce este doar estimare. Cifrele din lecție sunt exerciții, nu salarii impuse de lege. Pentru situația reală, verifică documentele angajatorului și regulile aplicabile la data respectivă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ce compară Ioana între discuție și contract?",
      "explanation": "Norma și locul muncii.",
      "correctFeedback": "Corect. Norma și locul muncii.",
      "incorrectFeedback": "Nu chiar. Norma și locul muncii.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Doar salariul, presupunând că programul discutat rămâne valabil."
        },
        {
          "id": "1",
          "label": "Norma și locul muncii."
        },
        {
          "id": "2",
          "label": "Doar durata contractului, fără punctul de lucru."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Anexa menționată lipsește. Ce faci?",
      "explanation": "Ceri anexa înainte de acceptarea documentelor.",
      "correctFeedback": "Corect. Ceri anexa înainte de acceptarea documentelor.",
      "incorrectFeedback": "Nu chiar. Ceri anexa înainte de acceptarea documentelor.",
      "type": "scenariu",
      "context": "Ioana compară discuția de recrutare cu documentul: i s-a spus patru ore, dar apare o normă de opt ore. Marchează diferența și cere corectarea ori explicația înainte de semnare. Nu schimbă singură textul după ce a semnat. Verifică și dacă durata este determinată sau nedeterminată, deoarece această informație contează pentru planificare.",
      "options": [
        {
          "id": "0",
          "label": "O consideri fără conținut."
        },
        {
          "id": "1",
          "label": "O înlocuiești cu o reclamă."
        },
        {
          "id": "2",
          "label": "Ceri anexa înainte de acceptarea documentelor."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cum-citesti-un-contract",
      "paragraphs": [
        "Ioana a discutat despre patru ore zilnic și un loc de muncă aproape de facultate. Contractul primit menționează opt ore și un alt punct de lucru. Fișa postului este indicată ca anexă, dar nu a fost trimisă. Ioana face o listă cu cele trei diferențe și cere documentele complete, ca să nu planifice cursurile pe baza discuției inițiale.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Ioana compară discuția de recrutare cu documentul: i s-a spus patru ore, dar apare o normă de opt ore. Marchează diferența și cere corectarea ori explicația înainte de semnare. Nu schimbă singură textul după ce a semnat. Verifică și dacă durata este determinată sau nedeterminată, deoarece această informație contează pentru planificare. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Care este diferența de program în cazul Ioanei?",
      "explanation": "Patru ore discutate, opt ore scrise.",
      "correctFeedback": "Corect. Patru ore discutate, opt ore scrise.",
      "incorrectFeedback": "Nu chiar. Patru ore discutate, opt ore scrise.",
      "caseId": "caz-cum-citesti-un-contract",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Patru ore discutate, opt ore scrise."
        },
        {
          "id": "1",
          "label": "Două ore discutate, patru scrise."
        },
        {
          "id": "2",
          "label": "Aceeași normă în ambele."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "De ce cere Ioana fișa postului?",
      "explanation": "Ca să înțeleagă responsabilitățile menționate.",
      "correctFeedback": "Corect. Ca să înțeleagă responsabilitățile menționate.",
      "incorrectFeedback": "Nu chiar. Ca să înțeleagă responsabilitățile menționate.",
      "caseId": "caz-cum-citesti-un-contract",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ca să afle soldul bancar al firmei."
        },
        {
          "id": "1",
          "label": "Ca să înțeleagă responsabilitățile menționate."
        },
        {
          "id": "2",
          "label": "Ca să schimbe unilateral contractul."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce risc evită clarificarea locului muncii?",
      "explanation": "Planificarea navetei pe baza unei adrese neconfirmate.",
      "correctFeedback": "Corect. Planificarea navetei pe baza unei adrese neconfirmate.",
      "incorrectFeedback": "Nu chiar. Planificarea navetei pe baza unei adrese neconfirmate.",
      "caseId": "caz-cum-citesti-un-contract",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Plata automată a oricărui transport."
        },
        {
          "id": "1",
          "label": "Închiderea contului personal."
        },
        {
          "id": "2",
          "label": "Planificarea navetei pe baza unei adrese neconfirmate."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un termen neclar nu trebuie tratat ca avantaj. Cere explicația în scris și citește anexele menționate, inclusiv condițiile relevante pentru încetarea raportului de muncă. Nu presupune că o frază precum alte atribuții anulează orice limită legală. Dacă documentul ridică o problemă serioasă, verifică textul legal și solicită sprijin potrivit situației.",
        "Dacă observi o diferență, formulează o întrebare concretă și păstrează răspunsul. Nu completa singur informația lipsă cu o presupunere favorabilă. Pentru o problemă contractuală sau fiscală, folosește sursa oficială relevantă și ajutor calificat. Un exemplu de învățare nu poate acoperi toate situațiile de muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Durata este determinată. Ce înseamnă pentru plan?",
      "explanation": "Trebuie să verifici termenul și condițiile.",
      "correctFeedback": "Corect. Trebuie să verifici termenul și condițiile.",
      "incorrectFeedback": "Nu chiar. Trebuie să verifici termenul și condițiile.",
      "type": "scenariu",
      "context": "Ioana compară discuția de recrutare cu documentul: i s-a spus patru ore, dar apare o normă de opt ore. Marchează diferența și cere corectarea ori explicația înainte de semnare. Nu schimbă singură textul după ce a semnat. Verifică și dacă durata este determinată sau nedeterminată, deoarece această informație contează pentru planificare.",
      "options": [
        {
          "id": "0",
          "label": "Trebuie să verifici termenul și condițiile."
        },
        {
          "id": "1",
          "label": "Salariul este mereu mai mare."
        },
        {
          "id": "2",
          "label": "Contractul nu trebuie citit."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "O clauză este neclară. Care este următorul pas?",
      "explanation": "Ceri o explicație și verifici regula aplicabilă.",
      "correctFeedback": "Corect. Ceri o explicație și verifici regula aplicabilă.",
      "incorrectFeedback": "Nu chiar. Ceri o explicație și verifici regula aplicabilă.",
      "type": "scenariu",
      "context": "Ioana compară discuția de recrutare cu documentul: i s-a spus patru ore, dar apare o normă de opt ore. Marchează diferența și cere corectarea ori explicația înainte de semnare. Nu schimbă singură textul după ce a semnat. Verifică și dacă durata este determinată sau nedeterminată, deoarece această informație contează pentru planificare.",
      "options": [
        {
          "id": "0",
          "label": "Presupui sensul cel mai favorabil."
        },
        {
          "id": "1",
          "label": "Ceri o explicație și verifici regula aplicabilă."
        },
        {
          "id": "2",
          "label": "Semnezi doar pentru că ceilalți au semnat."
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
          "body": "Citește un contract urmărind cine se obligă, ce trebuie făcut, cât se plătește și când începe sau încetează obligația.",
          "detail": "Ioana a discutat patru ore, dar documentul menționează opt și alt loc de muncă. Clarifică diferențele și cere anexa lipsă înainte să își organizeze cursurile după acea ofertă.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Ioana compară discuția de recrutare cu documentul: i s-a spus patru ore, dar apare o normă de opt ore. Marchează diferența și cere corectarea ori explicația înainte de semnare.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Un termen neclar nu trebuie tratat ca avantaj.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Fă o listă de verificare cu norma, locul, salariul brut, durata și anexele unui contract fictiv.",
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
