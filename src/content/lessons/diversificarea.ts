import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "diversificarea",
  "title": "Diversificarea",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "bazele",
  "slug": "diversificarea",
  "description": "Lia compară 1.000 lei într-o singură companie cu cinci poziții de câte 200.",
  "objective": "Să poți explica diversificarea și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Diversificarea",
      "body": "Lia compară 1.000 lei într-o singură companie cu cinci poziții de câte 200."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Diversificarea înseamnă distribuirea expunerilor pentru a reduce dependența de un singur rezultat. Numărul de produse nu este suficient: mai multe instrumente pot depinde de aceeași companie, industrie ori piață. Analizează ce deții efectiv. Diversificarea poate reduce unele riscuri, dar nu elimină pierderile și nici riscul unei scăderi generale.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce urmărește diversificarea?",
      "explanation": "Reducerea dependenței de un singur rezultat.",
      "correctFeedback": "Corect. Reducerea dependenței de un singur rezultat.",
      "incorrectFeedback": "Nu chiar. Reducerea dependenței de un singur rezultat.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Reducerea dependenței de un singur rezultat."
        },
        {
          "id": "1",
          "label": "Profit garantat."
        },
        {
          "id": "2",
          "label": "Eliminarea tuturor costurilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Diversificarea elimină orice posibilitate de pierdere.",
      "explanation": "Cinci companii din același sector pot reacționa similar la un șoc. Două fonduri cu aceleași dețineri pot adăuga puțină diversificare reală. Verifică suprapunerile și costurile, fără să cumperi produse doar pentru număr. Un portofoliu mai răspândit cere tot un scop, un termen și o evaluare a pierderii posibile.",
      "correctFeedback": "Corect. Cinci companii din același sector pot reacționa similar la un șoc. Două fonduri cu aceleași dețineri pot adăuga puțină diversificare reală. Verifică suprapunerile și costurile, fără să cumperi produse doar pentru număr. Un portofoliu mai răspândit cere tot un scop, un termen și o evaluare a pierderii posibile.",
      "incorrectFeedback": "Nu chiar. Cinci companii din același sector pot reacționa similar la un șoc. Două fonduri cu aceleași dețineri pot adăuga puțină diversificare reală. Verifică suprapunerile și costurile, fără să cumperi produse doar pentru număr. Un portofoliu mai răspândit cere tot un scop, un termen și o evaluare a pierderii posibile.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Lia are 1.000 lei într-o singură companie. Un alt portofoliu fictiv împarte aceeași sumă între cinci companii, câte 200. Dacă una pierde 50% și celelalte rămân neschimbate, pierderea acelui portofoliu este 100 lei. În prima variantă, aceeași scădere a unicei companii ar fi 500. Ipoteza nu prezice mișcările reale.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "O poziție de 200 pierde 50%. Cât pierde?",
      "explanation": "100 lei.",
      "correctFeedback": "Corect. 100 lei.",
      "incorrectFeedback": "Nu chiar. 100 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "500 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "50 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Cinci produse depind de aceeași companie. Ce verifici?",
      "explanation": "Expunerile reale și suprapunerea.",
      "correctFeedback": "Corect. Expunerile reale și suprapunerea.",
      "incorrectFeedback": "Nu chiar. Expunerile reale și suprapunerea.",
      "type": "scenariu",
      "context": "Lia are 1.000 lei într-o singură companie. Un alt portofoliu fictiv împarte aceeași sumă între cinci companii, câte 200. Dacă una pierde 50% și celelalte rămân neschimbate, pierderea acelui portofoliu este 100 lei. În prima variantă, aceeași scădere a unicei companii ar fi 500. Ipoteza nu prezice mișcările reale.",
      "options": [
        {
          "id": "0",
          "label": "Doar numărul produselor."
        },
        {
          "id": "1",
          "label": "Numai titlurile lor."
        },
        {
          "id": "2",
          "label": "Expunerile reale și suprapunerea."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-diversificarea",
      "paragraphs": [
        "Lia compară 1.000 lei într-o singură companie cu cinci poziții de câte 200. Simulează doar o companie care pierde jumătate, celelalte fiind neschimbate. Vede pierderi de 500 în prima variantă și 100 în a doua. Apoi observă că toate cele cinci companii pot aparține aceluiași sector și verifică dacă expunerile sunt cu adevărat diferite.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Lia are 1.000 lei într-o singură companie. Un alt portofoliu fictiv împarte aceeași sumă între cinci companii, câte 200. Dacă una pierde 50% și celelalte rămân neschimbate, pierderea acelui portofoliu este 100 lei. În prima variantă, aceeași scădere a unicei companii ar fi 500. Ipoteza nu prezice mișcările reale. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Cât pierde prima variantă a Liei la scădere de 50%?",
      "explanation": "500 lei.",
      "correctFeedback": "Corect. 500 lei.",
      "incorrectFeedback": "Nu chiar. 500 lei.",
      "caseId": "caz-diversificarea",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "500 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "200 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce ipoteză simplificatoare are simularea?",
      "explanation": "Celelalte companii rămân neschimbate.",
      "correctFeedback": "Corect. Celelalte companii rămân neschimbate.",
      "incorrectFeedback": "Nu chiar. Celelalte companii rămân neschimbate.",
      "caseId": "caz-diversificarea",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Toate cresc garantat."
        },
        {
          "id": "1",
          "label": "Celelalte companii rămân neschimbate."
        },
        {
          "id": "2",
          "label": "Nu există risc general."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "De ce verifică sectorul companiilor?",
      "explanation": "Pot reacționa similar la același șoc.",
      "correctFeedback": "Corect. Pot reacționa similar la același șoc.",
      "incorrectFeedback": "Nu chiar. Pot reacționa similar la același șoc.",
      "caseId": "caz-diversificarea",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Sectorul garantează profit."
        },
        {
          "id": "1",
          "label": "Numărul cinci anulează riscul."
        },
        {
          "id": "2",
          "label": "Pot reacționa similar la același șoc."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Cinci companii din același sector pot reacționa similar la un șoc. Două fonduri cu aceleași dețineri pot adăuga puțină diversificare reală. Verifică suprapunerile și costurile, fără să cumperi produse doar pentru număr. Un portofoliu mai răspândit cere tot un scop, un termen și o evaluare a pierderii posibile.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Două fonduri au aceleași dețineri. Ce concluzie e posibilă?",
      "explanation": "Diversificarea suplimentară poate fi redusă.",
      "correctFeedback": "Corect. Diversificarea suplimentară poate fi redusă.",
      "incorrectFeedback": "Nu chiar. Diversificarea suplimentară poate fi redusă.",
      "type": "scenariu",
      "context": "Lia are 1.000 lei într-o singură companie. Un alt portofoliu fictiv împarte aceeași sumă între cinci companii, câte 200. Dacă una pierde 50% și celelalte rămân neschimbate, pierderea acelui portofoliu este 100 lei. În prima variantă, aceeași scădere a unicei companii ar fi 500. Ipoteza nu prezice mișcările reale.",
      "options": [
        {
          "id": "0",
          "label": "Diversificarea suplimentară poate fi redusă."
        },
        {
          "id": "1",
          "label": "Ai automat două piețe independente."
        },
        {
          "id": "2",
          "label": "Nu mai există pierdere."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Piața scade în general. Ce risc rămâne?",
      "explanation": "Mai multe expuneri pot pierde simultan.",
      "correctFeedback": "Corect. Mai multe expuneri pot pierde simultan.",
      "incorrectFeedback": "Nu chiar. Mai multe expuneri pot pierde simultan.",
      "type": "scenariu",
      "context": "Lia are 1.000 lei într-o singură companie. Un alt portofoliu fictiv împarte aceeași sumă între cinci companii, câte 200. Dacă una pierde 50% și celelalte rămân neschimbate, pierderea acelui portofoliu este 100 lei. În prima variantă, aceeași scădere a unicei companii ar fi 500. Ipoteza nu prezice mișcările reale.",
      "options": [
        {
          "id": "0",
          "label": "Diversificarea garantează zero pierdere."
        },
        {
          "id": "1",
          "label": "Mai multe expuneri pot pierde simultan."
        },
        {
          "id": "2",
          "label": "Toate prețurile rămân fixe."
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
          "body": "Diversificarea înseamnă distribuirea expunerilor pentru a reduce dependența de un singur rezultat.",
          "detail": "Diversificarea înseamnă distribuirea expunerilor pentru a reduce dependența de un singur rezultat.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Lia are 1.000 lei într-o singură companie. Un alt portofoliu fictiv împarte aceeași sumă între cinci companii, câte 200.",
          "detail": "Lia are 1.000 lei într-o singură companie. Un alt portofoliu fictiv împarte aceeași sumă între cinci companii, câte 200.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Cinci companii din același sector pot reacționa similar la un șoc.",
          "detail": "Cinci companii din același sector pot reacționa similar la un șoc.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Desenează două portofolii fictive și caută o dependență comună ascunsă.",
          "detail": "Desenează două portofolii fictive și caută o dependență comună ascunsă.",
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
