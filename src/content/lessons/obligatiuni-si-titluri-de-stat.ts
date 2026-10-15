import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "obligatiuni-si-titluri-de-stat",
  "title": "Obligațiuni și titluri de stat",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "instrumente",
  "slug": "obligatiuni-si-titluri-de-stat",
  "description": "Ana citește un exemplu de obligațiune cu valoare de 1.000 lei și cupon de 5% anual.",
  "objective": "Să poți explica obligațiuni și titluri de stat și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Obligațiuni și titluri de stat",
      "body": "Ana citește un exemplu de obligațiune cu valoare de 1.000 lei și cupon de 5% anual."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O obligațiune reprezintă un împrumut acordat emitentului, cu condiții privind plățile și scadența. Emitentul poate fi o companie sau un stat. Nu este același lucru cu o acțiune. Citește moneda, dobânda, termenul și posibilitatea de vânzare ori răscumpărare înainte de scadență. Produsele pot avea mecanisme și riscuri diferite.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce relație creează o obligațiune?",
      "explanation": "Un împrumut către emitent.",
      "correctFeedback": "Corect. Un împrumut către emitent.",
      "incorrectFeedback": "Nu chiar. Un împrumut către emitent.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Un împrumut către emitent."
        },
        {
          "id": "1",
          "label": "O participație identică unei acțiuni."
        },
        {
          "id": "2",
          "label": "Un salariu lunar."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Vânzarea oricărei obligațiuni înainte de termen garantează recuperarea integrală a sumei inițiale.",
      "explanation": "Titlul de stat nu înseamnă că orice ieșire înainte de termen păstrează automat suma și dobânda. Verifică regulile programului, piața disponibilă și riscurile de monedă ori inflație. Pentru obligațiuni de companie contează și capacitatea emitentului de a plăti. Nu aplica condițiile unui produs tuturor obligațiunilor.",
      "correctFeedback": "Corect. Titlul de stat nu înseamnă că orice ieșire înainte de termen păstrează automat suma și dobânda. Verifică regulile programului, piața disponibilă și riscurile de monedă ori inflație. Pentru obligațiuni de companie contează și capacitatea emitentului de a plăti. Nu aplica condițiile unui produs tuturor obligațiunilor.",
      "incorrectFeedback": "Nu chiar. Titlul de stat nu înseamnă că orice ieșire înainte de termen păstrează automat suma și dobânda. Verifică regulile programului, piața disponibilă și riscurile de monedă ori inflație. Pentru obligațiuni de companie contează și capacitatea emitentului de a plăti. Nu aplica condițiile unui produs tuturor obligațiunilor.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "O obligațiune fictivă de 1.000 lei plătește un cupon anual de 5%, adică 50 lei, în ipoteza respectării condițiilor. Dacă este vândută înainte de termen la 950, prețul de vânzare este cu 50 sub valoarea inițială. Cuponul și prețul sunt componente distincte; calculul real cere calendar, dobândă acumulată și costuri.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cupon 5% din 1.000. Cât este anual în exemplu?",
      "explanation": "50 lei.",
      "correctFeedback": "Corect. 50 lei.",
      "incorrectFeedback": "Nu chiar. 50 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "500 lei."
        },
        {
          "id": "1",
          "label": "50 lei."
        },
        {
          "id": "2",
          "label": "5 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Vânzare la 950 față de 1.000 inițial. Care este diferența de preț?",
      "explanation": "Minus 50 lei.",
      "correctFeedback": "Corect. Minus 50 lei.",
      "incorrectFeedback": "Nu chiar. Minus 50 lei.",
      "type": "scenariu",
      "context": "O obligațiune fictivă de 1.000 lei plătește un cupon anual de 5%, adică 50 lei, în ipoteza respectării condițiilor. Dacă este vândută înainte de termen la 950, prețul de vânzare este cu 50 sub valoarea inițială. Cuponul și prețul sunt componente distincte; calculul real cere calendar, dobândă acumulată și costuri.",
      "options": [
        {
          "id": "0",
          "label": "Plus 50 lei."
        },
        {
          "id": "1",
          "label": "Zero lei."
        },
        {
          "id": "2",
          "label": "Minus 50 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-obligatiuni-si-titluri-de-stat",
      "paragraphs": [
        "Ana citește un exemplu de obligațiune cu valoare de 1.000 lei și cupon de 5% anual. Are însă nevoie posibilă de bani înainte de scadență. Analizează separat un preț fictiv de vânzare de 950 și verifică regulile de ieșire. Nu presupune că termenul titlu de stat ori obligațiune face toate produsele identice și toate plățile sigure.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: O obligațiune fictivă de 1.000 lei plătește un cupon anual de 5%, adică 50 lei, în ipoteza respectării condițiilor. Dacă este vândută înainte de termen la 950, prețul de vânzare este cu 50 sub valoarea inițială. Cuponul și prețul sunt componente distincte; calculul real cere calendar, dobândă acumulată și costuri. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ana poate avea nevoie de bani înainte de termen. Ce criteriu al produsului trebuie să lege de această nevoie?",
      "explanation": "Accesul înainte de scadență depinde de condițiile produsului și poate schimba rezultatul. Cuponul singur nu descrie banii disponibili la data necesară.",
      "correctFeedback": "Corect. Accesul înainte de scadență depinde de condițiile produsului și poate schimba rezultatul. Cuponul singur nu descrie banii disponibili la data necesară.",
      "incorrectFeedback": "Nu chiar. Accesul înainte de scadență depinde de condițiile produsului și poate schimba rezultatul. Cuponul singur nu descrie banii disponibili la data necesară.",
      "caseId": "caz-obligatiuni-si-titluri-de-stat",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Acces înainte de scadență."
        },
        {
          "id": "1",
          "label": "Doar valoarea cuponului anual, fără ieșirea timpurie."
        },
        {
          "id": "2",
          "label": "Doar numele emitentului, presupunând recuperare integrală oricând."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce verifică pentru ieșirea timpurie?",
      "explanation": "Regulile și condițiile produsului.",
      "correctFeedback": "Corect. Regulile și condițiile produsului.",
      "incorrectFeedback": "Nu chiar. Regulile și condițiile produsului.",
      "caseId": "caz-obligatiuni-si-titluri-de-stat",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Numai cuponul anual."
        },
        {
          "id": "1",
          "label": "Regulile și condițiile produsului."
        },
        {
          "id": "2",
          "label": "Doar numele emitentului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce separă cuponul de preț?",
      "explanation": "Sunt componente diferite ale rezultatului.",
      "correctFeedback": "Corect. Sunt componente diferite ale rezultatului.",
      "incorrectFeedback": "Nu chiar. Sunt componente diferite ale rezultatului.",
      "caseId": "caz-obligatiuni-si-titluri-de-stat",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Sunt același lucru."
        },
        {
          "id": "1",
          "label": "Prețul nu poate varia."
        },
        {
          "id": "2",
          "label": "Sunt componente diferite ale rezultatului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Titlul de stat nu înseamnă că orice ieșire înainte de termen păstrează automat suma și dobânda. Verifică regulile programului, piața disponibilă și riscurile de monedă ori inflație. Pentru obligațiuni de companie contează și capacitatea emitentului de a plăti. Nu aplica condițiile unui produs tuturor obligațiunilor.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Obligațiunea este în altă monedă. Ce risc adaugi?",
      "explanation": "Schimbarea cursului față de moneda cheltuielilor.",
      "correctFeedback": "Corect. Schimbarea cursului față de moneda cheltuielilor.",
      "incorrectFeedback": "Nu chiar. Schimbarea cursului față de moneda cheltuielilor.",
      "type": "scenariu",
      "context": "O obligațiune fictivă de 1.000 lei plătește un cupon anual de 5%, adică 50 lei, în ipoteza respectării condițiilor. Dacă este vândută înainte de termen la 950, prețul de vânzare este cu 50 sub valoarea inițială. Cuponul și prețul sunt componente distincte; calculul real cere calendar, dobândă acumulată și costuri.",
      "options": [
        {
          "id": "0",
          "label": "Schimbarea cursului față de moneda cheltuielilor."
        },
        {
          "id": "1",
          "label": "Doar cuponul nominal, presupunând că valorează la fel în moneda cheltuielilor."
        },
        {
          "id": "2",
          "label": "Doar costul unui card."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Emitentul este o companie. Ce contează suplimentar?",
      "explanation": "Capacitatea de plată și riscul emitentului.",
      "correctFeedback": "Corect. Capacitatea de plată și riscul emitentului.",
      "incorrectFeedback": "Nu chiar. Capacitatea de plată și riscul emitentului.",
      "type": "scenariu",
      "context": "O obligațiune fictivă de 1.000 lei plătește un cupon anual de 5%, adică 50 lei, în ipoteza respectării condițiilor. Dacă este vândută înainte de termen la 950, prețul de vânzare este cu 50 sub valoarea inițială. Cuponul și prețul sunt componente distincte; calculul real cere calendar, dobândă acumulată și costuri.",
      "options": [
        {
          "id": "0",
          "label": "Doar valoarea cuponului, fără posibilitatea ca emitentul să nu plătească."
        },
        {
          "id": "1",
          "label": "Capacitatea de plată și riscul emitentului."
        },
        {
          "id": "2",
          "label": "Promisiunea unui comentariu online."
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
          "body": "O obligațiune reprezintă un împrumut acordat emitentului, cu condiții privind plățile și scadența.",
          "detail": "Cuponul anual și prețul unei vânzări înainte de scadență sunt componente diferite. Un preț de 950 față de 1.000 inițial poate modifica rezultatul, chiar dacă produsul are un cupon.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "O obligațiune fictivă de 1.000 lei plătește un cupon anual de 5%, adică 50 lei, în ipoteza respectării condițiilor. Dacă este vândută înainte de termen la 950, prețul de vânzare este cu 50 sub valoarea inițială.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Titlul de stat nu înseamnă că orice ieșire înainte de termen păstrează automat suma și dobânda.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pe un produs fictiv, separă cuponul, scadența și condițiile de acces înainte de termen.",
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
