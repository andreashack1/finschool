import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "investesti-vs-speculezi",
  "title": "Investești vs. speculezi",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "atentie-la-capcane",
  "slug": "investesti-vs-speculezi",
  "description": "Ana primește un mesaj că un preț va crește mâine.",
  "objective": "Să poți explica investești vs. speculezi și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "ASF · Ghidul investitorului",
    "url": "https://asfromania.ro/files/ghidul_investitorului.pdf"
  },
  {
    "label": "ASF · Registrul public",
    "url": "https://data.asfromania.ro/registru/registru.php"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Investești vs. speculezi",
      "body": "Ana primește un mesaj că un preț va crește mâine."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Investiția urmărește o teză legată de valoare, venituri și obiective, iar speculația mizează mai mult pe schimbări de preț anticipate. Distincția nu depinde numai de durata deținerii. Ambele pot pierde bani. Explică motivul deciziei, ce informații îl susțin și ce rezultat nefavorabil ai luat în calcul înainte să cumperi.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce trebuie explicat înainte de decizie?",
      "explanation": "Motivul, informația și riscul analizat.",
      "correctFeedback": "Corect. Motivul, informația și riscul analizat.",
      "incorrectFeedback": "Nu chiar. Motivul, informația și riscul analizat.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Motivul, informația și riscul analizat."
        },
        {
          "id": "1",
          "label": "Doar dorința de profit."
        },
        {
          "id": "2",
          "label": "Numai ultima creștere."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un termen lung de deținere nu transformă singur o anticipare de preț într-o decizie fundamentată pe valoare.",
      "explanation": "Motivul și informațiile care susțin decizia contează, nu doar durata. Păstrarea unui instrument după scădere nu produce automat analiza care lipsea.",
      "correctFeedback": "Corect. Motivul și informațiile care susțin decizia contează, nu doar durata. Păstrarea unui instrument după scădere nu produce automat analiza care lipsea.",
      "incorrectFeedback": "Nu chiar. Motivul și informațiile care susțin decizia contează, nu doar durata. Păstrarea unui instrument după scădere nu produce automat analiza care lipsea.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Ana compară studiul unei companii pentru un obiectiv lung cu o cumpărare bazată pe speranța că prețul crește mâine. A doua idee nu are analiză a companiei și depinde de mișcarea rapidă. Nu transformă un pariu într-o investiție doar spunând că va păstra produsul dacă scade. Verifică și dacă folosește bani împrumutați.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Mesajul spune că prețul crește mâine fără dovezi. Pe ce se bazează decizia?",
      "explanation": "Pe o anticipare speculativă de preț.",
      "correctFeedback": "Corect. Pe o anticipare speculativă de preț.",
      "incorrectFeedback": "Nu chiar. Pe o anticipare speculativă de preț.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Pe o analiză demonstrată a valorii."
        },
        {
          "id": "1",
          "label": "Pe o anticipare speculativă de preț."
        },
        {
          "id": "2",
          "label": "Pe o garanție legală."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ideea nu are analiză. Ce face amânarea vânzării?",
      "explanation": "Nu o transformă automat într-o decizie fundamentată.",
      "correctFeedback": "Corect. Nu o transformă automat într-o decizie fundamentată.",
      "incorrectFeedback": "Nu chiar. Nu o transformă automat într-o decizie fundamentată.",
      "type": "scenariu",
      "context": "Ana compară studiul unei companii pentru un obiectiv lung cu o cumpărare bazată pe speranța că prețul crește mâine. A doua idee nu are analiză a companiei și depinde de mișcarea rapidă. Nu transformă un pariu într-o investiție doar spunând că va păstra produsul dacă scade. Verifică și dacă folosește bani împrumutați.",
      "options": [
        {
          "id": "0",
          "label": "Garantează profitul."
        },
        {
          "id": "1",
          "label": "Elimină riscul."
        },
        {
          "id": "2",
          "label": "Nu o transformă automat într-o decizie fundamentată."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-investesti-vs-speculezi",
      "paragraphs": [
        "Ana primește un mesaj că un preț va crește mâine. Nu găsește o explicație verificabilă, doar entuziasm. Separat, studiază o companie pentru un obiectiv lung și notează riscurile. Compară motivele celor două decizii. Nu spune că primul pariu devine sigur doar pentru că ar putea păstra instrumentul după o scădere și nu folosește automat bani împrumutați.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Ana compară studiul unei companii pentru un obiectiv lung cu o cumpărare bazată pe speranța că prețul crește mâine. A doua idee nu are analiză a companiei și depinde de mișcarea rapidă. Nu transformă un pariu într-o investiție doar spunând că va păstra produsul dacă scade. Verifică și dacă folosește bani împrumutați. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce lipsă observă Ana în mesaj?",
      "explanation": "O explicație verificabilă.",
      "correctFeedback": "Corect. O explicație verificabilă.",
      "incorrectFeedback": "Nu chiar. O explicație verificabilă.",
      "caseId": "caz-investesti-vs-speculezi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "O explicație verificabilă."
        },
        {
          "id": "1",
          "label": "Entuziasmul."
        },
        {
          "id": "2",
          "label": "Promisiunea de creștere."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce notează pentru studiul companiei?",
      "explanation": "Motivele și riscurile.",
      "correctFeedback": "Corect. Motivele și riscurile.",
      "incorrectFeedback": "Nu chiar. Motivele și riscurile.",
      "caseId": "caz-investesti-vs-speculezi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar durata deținerii, presupunând că înlocuiește analiza."
        },
        {
          "id": "1",
          "label": "Motivele și riscurile."
        },
        {
          "id": "2",
          "label": "Doar prețul de mâine garantat."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce evită împrumutul automat?",
      "explanation": "Poate amplifica pierderea și obligațiile.",
      "correctFeedback": "Corect. Poate amplifica pierderea și obligațiile.",
      "incorrectFeedback": "Nu chiar. Poate amplifica pierderea și obligațiile.",
      "caseId": "caz-investesti-vs-speculezi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Elimină costurile."
        },
        {
          "id": "1",
          "label": "Garantează un rezultat bun."
        },
        {
          "id": "2",
          "label": "Poate amplifica pierderea și obligațiile."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un termen lung nu repară automat o decizie fără înțelegerea instrumentului. Tranzacțiile frecvente pot aduce costuri și expuneri diferite, iar împrumutul poate amplifica pierderea. Nu folosi rezultatul unei singure tranzacții drept dovadă că metoda funcționează. Separă procesul deciziei de norocul unui rezultat favorabil.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O singură tranzacție a câștigat. Ce dovedește?",
      "explanation": "Un rezultat favorabil, nu validarea sigură a metodei.",
      "correctFeedback": "Corect. Un rezultat favorabil, nu validarea sigură a metodei.",
      "incorrectFeedback": "Nu chiar. Un rezultat favorabil, nu validarea sigură a metodei.",
      "type": "scenariu",
      "context": "Ana compară studiul unei companii pentru un obiectiv lung cu o cumpărare bazată pe speranța că prețul crește mâine. A doua idee nu are analiză a companiei și depinde de mișcarea rapidă. Nu transformă un pariu într-o investiție doar spunând că va păstra produsul dacă scade. Verifică și dacă folosește bani împrumutați.",
      "options": [
        {
          "id": "0",
          "label": "Un rezultat favorabil, nu validarea sigură a metodei."
        },
        {
          "id": "1",
          "label": "Profit permanent."
        },
        {
          "id": "2",
          "label": "Lipsa oricărui risc."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Tranzacționezi frecvent. Ce adaugi analizei?",
      "explanation": "Costurile și expunerile cumulative.",
      "correctFeedback": "Corect. Costurile și expunerile cumulative.",
      "incorrectFeedback": "Nu chiar. Costurile și expunerile cumulative.",
      "type": "scenariu",
      "context": "Ana compară studiul unei companii pentru un obiectiv lung cu o cumpărare bazată pe speranța că prețul crește mâine. A doua idee nu are analiză a companiei și depinde de mișcarea rapidă. Nu transformă un pariu într-o investiție doar spunând că va păstra produsul dacă scade. Verifică și dacă folosește bani împrumutați.",
      "options": [
        {
          "id": "0",
          "label": "Doar tranzacția cea mai bună."
        },
        {
          "id": "1",
          "label": "Costurile și expunerile cumulative."
        },
        {
          "id": "2",
          "label": "Zero comisioane presupuse."
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
          "body": "Investiția urmărește o teză legată de valoare, venituri și obiective, iar speculația mizează mai mult pe schimbări de preț anticipate.",
          "detail": "Promisiunea că prețul crește mâine nu înlocuiește informațiile despre instrument. Păstrarea lui după o scădere nu transformă automat anticiparea inițială într-o decizie fundamentată.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Ana compară studiul unei companii pentru un obiectiv lung cu o cumpărare bazată pe speranța că prețul crește mâine. A doua idee nu are analiză a companiei și depinde de mișcarea rapidă.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Un termen lung nu repară automat o decizie fără înțelegerea instrumentului.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Scrie motivul unei decizii fictive și separă informația verificabilă de o anticipare de preț.",
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
