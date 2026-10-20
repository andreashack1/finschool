import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "actiuni",
  "title": "Acțiuni",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "instrumente",
  "slug": "actiuni",
  "description": "Teo folosește des produsele unei companii și presupune că acțiunea ei nu poate scădea.",
  "objective": "Să poți explica acțiuni și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Acțiuni",
      "body": "Teo folosește des produsele unei companii și presupune că acțiunea ei nu poate scădea."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O acțiune reprezintă o participație la o companie. Prețul poate varia, iar unele companii pot distribui dividende în condițiile aplicabile. Dividendele nu sunt salariu și nu sunt garantate în fiecare an. Deținerea unei acțiuni nu este un depozit bancar și poate pierde valoare, inclusiv mult din suma investită.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce reprezintă o acțiune?",
      "explanation": "O participație la o companie.",
      "correctFeedback": "Corect. O participație la o companie.",
      "incorrectFeedback": "Nu chiar. O participație la o companie.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "O participație la o companie."
        },
        {
          "id": "1",
          "label": "Un depozit garantat."
        },
        {
          "id": "2",
          "label": "Un împrumut către companie, cu aceeași relație ca o obligațiune."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Poți deține o participație într-o companie fără să primești dividende în fiecare an.",
      "explanation": "Dividendele depind de distribuirea lor și de condițiile aplicabile. Deținerea acțiunii nu creează un salariu anual garantat.",
      "correctFeedback": "Corect. Dividendele depind de distribuirea lor și de condițiile aplicabile. Deținerea acțiunii nu creează un salariu anual garantat.",
      "incorrectFeedback": "Nu chiar. Dividendele depind de distribuirea lor și de condițiile aplicabile. Deținerea acțiunii nu creează un salariu anual garantat.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Teo cumpără fictiv zece acțiuni la 20 lei, pentru 200 înainte de costuri. Dacă prețul ajunge la 18, valoarea lor este 180, o scădere de 20. Dacă nu vinde, diferența de preț nu este numerar încasat, dar valoarea deținerii s-a schimbat. Pentru un rezultat complet ar verifica și costurile și eventualele venituri.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Zece acțiuni la 18 lei au ce valoare?",
      "explanation": "180 lei.",
      "correctFeedback": "Corect. 180 lei.",
      "incorrectFeedback": "Nu chiar. 180 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "200 lei."
        },
        {
          "id": "1",
          "label": "180 lei."
        },
        {
          "id": "2",
          "label": "18 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Prețul scade de la 20 la 18 pentru zece acțiuni. Ce schimbare ai?",
      "explanation": "O scădere de 20 lei înainte de costuri.",
      "correctFeedback": "Corect. O scădere de 20 lei înainte de costuri.",
      "incorrectFeedback": "Nu chiar. O scădere de 20 lei înainte de costuri.",
      "type": "scenariu",
      "context": "Teo cumpără fictiv zece acțiuni la 20 lei, pentru 200 înainte de costuri. Dacă prețul ajunge la 18, valoarea lor este 180, o scădere de 20. Dacă nu vinde, diferența de preț nu este numerar încasat, dar valoarea deținerii s-a schimbat. Pentru un rezultat complet ar verifica și costurile și eventualele venituri.",
      "options": [
        {
          "id": "0",
          "label": "O creștere de 20."
        },
        {
          "id": "1",
          "label": "Nicio schimbare de valoare."
        },
        {
          "id": "2",
          "label": "O scădere de 20 lei înainte de costuri."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-actiuni",
      "paragraphs": [
        "Teo folosește des produsele unei companii și presupune că acțiunea ei nu poate scădea. Într-un exercițiu cumpără zece la 20 lei și vede apoi prețul de 18. Calculează valoarea de 180 și scăderea de 20, înainte de costuri. Înțelege că aprecierea unui produs și rezultatul unei investiții sunt întrebări diferite și verifică riscurile.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Teo cumpără fictiv zece acțiuni la 20 lei, pentru 200 înainte de costuri. Dacă prețul ajunge la 18, valoarea lor este 180, o scădere de 20. Dacă nu vinde, diferența de preț nu este numerar încasat, dar valoarea deținerii s-a schimbat. Pentru un rezultat complet ar verifica și costurile și eventualele venituri. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce presupunere corectează Teo?",
      "explanation": "Popularitatea produsului garantează acțiunea.",
      "correctFeedback": "Corect. Popularitatea produsului garantează acțiunea.",
      "incorrectFeedback": "Nu chiar. Popularitatea produsului garantează acțiunea.",
      "caseId": "caz-actiuni",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Popularitatea produsului garantează acțiunea."
        },
        {
          "id": "1",
          "label": "Prețul observat arată singur cât de sigură este deținerea."
        },
        {
          "id": "2",
          "label": "Folosirea produsului înlocuiește evaluarea riscului la prețul acțiunii."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Cât a investit inițial înainte de costuri?",
      "explanation": "200 lei.",
      "correctFeedback": "Corect. 200 lei.",
      "incorrectFeedback": "Nu chiar. 200 lei.",
      "caseId": "caz-actiuni",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "180 lei."
        },
        {
          "id": "1",
          "label": "200 lei."
        },
        {
          "id": "2",
          "label": "20 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce ar adăuga pentru rezultatul complet?",
      "explanation": "Costurile și eventualele venituri.",
      "correctFeedback": "Corect. Costurile și eventualele venituri.",
      "incorrectFeedback": "Nu chiar. Costurile și eventualele venituri.",
      "caseId": "caz-actiuni",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar variația prețului, fără comisioane."
        },
        {
          "id": "1",
          "label": "Doar dividendele posibile, fără valoarea deținerii."
        },
        {
          "id": "2",
          "label": "Costurile și eventualele venituri."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O companie cunoscută poate fi o investiție riscantă la un anumit preț. Nu confunda calitatea produselor cu randamentul garantat al acțiunii. Citește informațiile financiare și riscurile, fără să presupui că popularitatea pe rețele sociale înlocuiește analiza. Nu cumpăra doar pentru un dividend anunțat fără să înțelegi contextul și costurile.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Dividendele sunt obligatoriu identice anual?",
      "explanation": "Nu; depind de distribuirea și condițiile aplicabile.",
      "correctFeedback": "Corect. Nu; depind de distribuirea și condițiile aplicabile.",
      "incorrectFeedback": "Nu chiar. Nu; depind de distribuirea și condițiile aplicabile.",
      "type": "scenariu",
      "context": "Teo cumpără fictiv zece acțiuni la 20 lei, pentru 200 înainte de costuri. Dacă prețul ajunge la 18, valoarea lor este 180, o scădere de 20. Dacă nu vinde, diferența de preț nu este numerar încasat, dar valoarea deținerii s-a schimbat. Pentru un rezultat complet ar verifica și costurile și eventualele venituri.",
      "options": [
        {
          "id": "0",
          "label": "Nu; depind de distribuirea și condițiile aplicabile."
        },
        {
          "id": "1",
          "label": "Da, sunt un salariu fix."
        },
        {
          "id": "2",
          "label": "Da, chiar dacă nu sunt aprobate."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Apreciezi produsele companiei. Ce mai verifici?",
      "explanation": "Prețul, situația și riscurile investiției.",
      "correctFeedback": "Corect. Prețul, situația și riscurile investiției.",
      "incorrectFeedback": "Nu chiar. Prețul, situația și riscurile investiției.",
      "type": "scenariu",
      "context": "Teo cumpără fictiv zece acțiuni la 20 lei, pentru 200 înainte de costuri. Dacă prețul ajunge la 18, valoarea lor este 180, o scădere de 20. Dacă nu vinde, diferența de preț nu este numerar încasat, dar valoarea deținerii s-a schimbat. Pentru un rezultat complet ar verifica și costurile și eventualele venituri.",
      "options": [
        {
          "id": "0",
          "label": "Numai fidelitatea personală."
        },
        {
          "id": "1",
          "label": "Prețul, situația și riscurile investiției."
        },
        {
          "id": "2",
          "label": "Doar reclama companiei."
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
          "body": "O acțiune îți oferă o participație la o companie.",
          "detail": "Teo apreciază produsele companiei, dar cele zece acțiuni pot scădea de la 200 la 180 lei în exercițiu. Familiaritatea cu produsul nu garantează prețul acțiunii sau dividendele.",
          "type": "normal",
          "detailHighlights": [
            "prețul",
            "lei"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Valoarea deținerii se schimbă odată cu prețul acțiunii.",
          "type": "normal",
          "detail": "Valoarea totală se schimbă odată cu prețul acțiunii. Costurile tranzacției se verifică separat.",
          "detailHighlights": [
            "costurile tranzacției",
            "prețul"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "O marcă familiară nu garantează o investiție bună.",
          "type": "normal",
          "detail": "Faptul că folosești produsul unei firme nu îți spune dacă prețul acțiunii este potrivit sau dacă va plăti dividende.",
          "detailHighlights": [
            "prețul",
            "plăti"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Calculează valoarea a zece acțiuni fictive la două prețuri și separă rezultatul de opinia despre produse.",
          "type": "action",
          "detail": "Separă în calcul variația de preț de eventualele venituri și costuri. Părerea despre marcă nu este un rezultat financiar.",
          "detailHighlights": [
            "costuri",
            "preț"
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
