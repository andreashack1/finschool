import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "crypto-ce-trebuie-sa-stii",
  "title": "Crypto: ce trebuie să știi",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "atentie-la-capcane",
  "slug": "crypto-ce-trebuie-sa-stii",
  "description": "Ana vede într-un exercițiu un activ de 100 lei ajuns la 60.",
  "objective": "Să poți explica crypto: ce trebuie să știi și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "ESMA · Riscuri și protecție pentru cryptoactive",
    "url": "https://www.esma.europa.eu/press-news/esma-news/eu-supervisory-authorities-warn-consumers-risks-and-limited-protection-certain"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Crypto: ce trebuie să știi",
      "body": "Ana vede într-un exercițiu un activ de 100 lei ajuns la 60."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Cryptoactivele sunt o categorie variată de active digitale, cu mecanisme și riscuri diferite. Prețurile pot varia mult, iar protecția juridică depinde de activ și serviciu. Nu le confunda cu un depozit garantat. Verifică furnizorul și produsul, fără să presupui că o autorizare elimină riscul de piață, fraudele ori problemele de acces.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce trebuie verificat la un cryptoactiv?",
      "explanation": "Produsul, furnizorul, riscurile și protecția aplicabilă.",
      "correctFeedback": "Corect. Produsul, furnizorul, riscurile și protecția aplicabilă.",
      "incorrectFeedback": "Nu chiar. Produsul, furnizorul, riscurile și protecția aplicabilă.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Produsul, furnizorul, riscurile și protecția aplicabilă."
        },
        {
          "id": "1",
          "label": "Doar popularitatea."
        },
        {
          "id": "2",
          "label": "Doar logo-ul."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un furnizor autorizat garantează că prețul cryptoactivului nu poate scădea.",
      "explanation": "Nu dezvălui fraza de recuperare ori cheile private. Promisiunile de randament sigur și cererile de taxă pentru deblocarea unui câștig trebuie verificate cu atenție. O stablecoin nu garantează automat păstrarea valorii ori răscumpărarea. Reglementarea nu oferă aceeași protecție pentru orice activ și nu înseamnă compensarea oricărei pierderi.",
      "correctFeedback": "Corect. Nu dezvălui fraza de recuperare ori cheile private. Promisiunile de randament sigur și cererile de taxă pentru deblocarea unui câștig trebuie verificate cu atenție. O stablecoin nu garantează automat păstrarea valorii ori răscumpărarea. Reglementarea nu oferă aceeași protecție pentru orice activ și nu înseamnă compensarea oricărei pierderi.",
      "incorrectFeedback": "Nu chiar. Nu dezvălui fraza de recuperare ori cheile private. Promisiunile de randament sigur și cererile de taxă pentru deblocarea unui câștig trebuie verificate cu atenție. O stablecoin nu garantează automat păstrarea valorii ori răscumpărarea. Reglementarea nu oferă aceeași protecție pentru orice activ și nu înseamnă compensarea oricărei pierderi.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un cryptoactiv fictiv cumpărat cu 100 lei ajunge la o valoare de 60, o scădere de 40%. Pentru a reveni de la 60 la 100 ar avea nevoie de o creștere de aproximativ 66,7%, nu de 40%. Calculul nu prezice o recuperare. Ana analizează și accesul la serviciu, costurile și păstrarea datelor de autentificare.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Valoarea scade de la 100 la 60. Care este scăderea?",
      "explanation": "40%.",
      "correctFeedback": "Corect. 40%.",
      "incorrectFeedback": "Nu chiar. 40%.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "60%."
        },
        {
          "id": "1",
          "label": "40%."
        },
        {
          "id": "2",
          "label": "10%."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "60 cresc cu 40%. La cât ajung?",
      "explanation": "84 lei.",
      "correctFeedback": "Corect. 84 lei.",
      "incorrectFeedback": "Nu chiar. 84 lei.",
      "type": "scenariu",
      "context": "Un cryptoactiv fictiv cumpărat cu 100 lei ajunge la o valoare de 60, o scădere de 40%. Pentru a reveni de la 60 la 100 ar avea nevoie de o creștere de aproximativ 66,7%, nu de 40%. Calculul nu prezice o recuperare. Ana analizează și accesul la serviciu, costurile și păstrarea datelor de autentificare.",
      "options": [
        {
          "id": "0",
          "label": "100 lei."
        },
        {
          "id": "1",
          "label": "140 lei."
        },
        {
          "id": "2",
          "label": "84 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-crypto-ce-trebuie-sa-stii",
      "paragraphs": [
        "Ana vede într-un exercițiu un activ de 100 lei ajuns la 60. Un mesaj promite recuperarea sigură și cere fraza de acces. Ana nu o transmite. Calculează scăderea de 40 și verifică furnizorul prin sursa oficială relevantă. Înțelege că autorizarea unui serviciu nu garantează prețul activului și că o creștere de 40% din 60 nu readuce suma la 100.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Un cryptoactiv fictiv cumpărat cu 100 lei ajunge la o valoare de 60, o scădere de 40%. Pentru a reveni de la 60 la 100 ar avea nevoie de o creștere de aproximativ 66,7%, nu de 40%. Calculul nu prezice o recuperare. Ana analizează și accesul la serviciu, costurile și păstrarea datelor de autentificare. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce informație nu transmite Ana mesajului?",
      "explanation": "Fraza de acces sau recuperare.",
      "correctFeedback": "Corect. Fraza de acces sau recuperare.",
      "incorrectFeedback": "Nu chiar. Fraza de acces sau recuperare.",
      "caseId": "caz-crypto-ce-trebuie-sa-stii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Fraza de acces sau recuperare."
        },
        {
          "id": "1",
          "label": "Prețul fictiv de 60."
        },
        {
          "id": "2",
          "label": "Faptul că există risc."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce verifică dincolo de promisiune?",
      "explanation": "Furnizorul prin sursa oficială relevantă.",
      "correctFeedback": "Corect. Furnizorul prin sursa oficială relevantă.",
      "incorrectFeedback": "Nu chiar. Furnizorul prin sursa oficială relevantă.",
      "caseId": "caz-crypto-ce-trebuie-sa-stii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Numai tonul mesajului."
        },
        {
          "id": "1",
          "label": "Furnizorul prin sursa oficială relevantă."
        },
        {
          "id": "2",
          "label": "Doar câștigurile afișate."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "De ce nu crede în recuperare sigură?",
      "explanation": "Prețul viitor nu este garantat.",
      "correctFeedback": "Corect. Prețul viitor nu este garantat.",
      "incorrectFeedback": "Nu chiar. Prețul viitor nu este garantat.",
      "caseId": "caz-crypto-ce-trebuie-sa-stii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Orice activ revine exact la 100."
        },
        {
          "id": "1",
          "label": "Autorizația stabilește prețul."
        },
        {
          "id": "2",
          "label": "Prețul viitor nu este garantat."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu dezvălui fraza de recuperare ori cheile private. Promisiunile de randament sigur și cererile de taxă pentru deblocarea unui câștig trebuie verificate cu atenție. O stablecoin nu garantează automat păstrarea valorii ori răscumpărarea. Reglementarea nu oferă aceeași protecție pentru orice activ și nu înseamnă compensarea oricărei pierderi.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O stablecoin promite stabilitate. Ce verifici?",
      "explanation": "Mecanismul, rezervele și condițiile de răscumpărare relevante.",
      "correctFeedback": "Corect. Mecanismul, rezervele și condițiile de răscumpărare relevante.",
      "incorrectFeedback": "Nu chiar. Mecanismul, rezervele și condițiile de răscumpărare relevante.",
      "type": "scenariu",
      "context": "Un cryptoactiv fictiv cumpărat cu 100 lei ajunge la o valoare de 60, o scădere de 40%. Pentru a reveni de la 60 la 100 ar avea nevoie de o creștere de aproximativ 66,7%, nu de 40%. Calculul nu prezice o recuperare. Ana analizează și accesul la serviciu, costurile și păstrarea datelor de autentificare.",
      "options": [
        {
          "id": "0",
          "label": "Mecanismul, rezervele și condițiile de răscumpărare relevante."
        },
        {
          "id": "1",
          "label": "Presupui protecție identică unui depozit."
        },
        {
          "id": "2",
          "label": "Ignori documentele."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ți se cere taxă pentru deblocarea profitului. Ce faci?",
      "explanation": "Verifici independent înainte de orice plată.",
      "correctFeedback": "Corect. Verifici independent înainte de orice plată.",
      "incorrectFeedback": "Nu chiar. Verifici independent înainte de orice plată.",
      "type": "scenariu",
      "context": "Un cryptoactiv fictiv cumpărat cu 100 lei ajunge la o valoare de 60, o scădere de 40%. Pentru a reveni de la 60 la 100 ar avea nevoie de o creștere de aproximativ 66,7%, nu de 40%. Calculul nu prezice o recuperare. Ana analizează și accesul la serviciu, costurile și păstrarea datelor de autentificare.",
      "options": [
        {
          "id": "0",
          "label": "Plătești imediat."
        },
        {
          "id": "1",
          "label": "Verifici independent înainte de orice plată."
        },
        {
          "id": "2",
          "label": "Trimiți și cheia privată."
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
          "body": "Cryptoactivele sunt o categorie variată de active digitale, cu mecanisme și riscuri diferite.",
          "detail": "Cryptoactivele sunt o categorie variată de active digitale, cu mecanisme și riscuri diferite.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Un cryptoactiv fictiv cumpărat cu 100 lei ajunge la o valoare de 60, o scădere de 40%. Pentru a reveni de la 60 la 100 ar avea nevoie de o creștere de aproximativ 66,7%, nu de 40%.",
          "detail": "Un cryptoactiv fictiv cumpărat cu 100 lei ajunge la o valoare de 60, o scădere de 40%. Pentru a reveni de la 60 la 100 ar avea nevoie de o creștere de aproximativ 66,7%, nu de 40%.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Nu dezvălui fraza de recuperare ori cheile private.",
          "detail": "Nu dezvălui fraza de recuperare ori cheile private.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Calculează scăderea din exemplu și notează datele de acces pe care nu le-ai comunica nimănui.",
          "detail": "Calculează scăderea din exemplu și notează datele de acces pe care nu le-ai comunica nimănui.",
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
