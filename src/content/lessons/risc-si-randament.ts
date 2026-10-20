import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "risc-si-randament",
  "title": "Risc și randament",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "bazele",
  "slug": "risc-si-randament",
  "description": "Dan vede o investiție de 1.000 ajunsă ipotetic la 1.100 și spune că a câștigat 10%.",
  "objective": "Să poți explica risc și randament și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Risc și randament",
      "body": "Dan vede o investiție de 1.000 ajunsă ipotetic la 1.100 și spune că a câștigat 10%."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Randamentul descrie schimbarea valorii și veniturile unei investiții în raport cu suma investită. Riscul privește rezultatele nesigure, inclusiv pierderea. Un câștig posibil mai mare nu este un câștig garantat. Compară randamentul după costuri și în contextul perioadei, fără să tratezi o medie istorică drept rezultat sigur pentru anul următor.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce descrie riscul?",
      "explanation": "Rezultate nesigure, inclusiv pierderea.",
      "correctFeedback": "Corect. Rezultate nesigure, inclusiv pierderea.",
      "incorrectFeedback": "Nu chiar. Rezultate nesigure, inclusiv pierderea.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Rezultate nesigure, inclusiv pierderea."
        },
        {
          "id": "1",
          "label": "Numai profitul maxim."
        },
        {
          "id": "2",
          "label": "Doar durata unui cont."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un câștig posibil mai mare nu este echivalent cu un câștig garantat; comparația trebuie să includă și riscul.",
      "explanation": "Randamentul descrie rezultatul, iar riscul privește incertitudinea lui. O valoare posibilă sau istorică nu confirmă cât vei obține.",
      "correctFeedback": "Corect. Randamentul descrie rezultatul, iar riscul privește incertitudinea lui. O valoare posibilă sau istorică nu confirmă cât vei obține.",
      "incorrectFeedback": "Nu chiar. Randamentul descrie rezultatul, iar riscul privește incertitudinea lui. O valoare posibilă sau istorică nu confirmă cât vei obține.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "O investiție fictivă de 1.000 lei valorează 1.100 înainte de costuri, o creștere de 10%. Dacă ai costuri de 20 lei incluse în exercițiu, rezultatul net este 80, adică 8% față de suma inițială. Alt scenariu poate produce pierdere. Cifrele arată metoda, nu o promisiune ori valoarea unei taxe actuale.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Creștere 100 și costuri 20 la suma inițială 1.000. Ce rezultat net ai?",
      "explanation": "80 lei, adică 8%.",
      "correctFeedback": "Corect. 80 lei, adică 8%.",
      "incorrectFeedback": "Nu chiar. 80 lei, adică 8%.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "100 lei, adică 10%."
        },
        {
          "id": "1",
          "label": "80 lei, adică 8%."
        },
        {
          "id": "2",
          "label": "120 lei, adică 12%."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ai nevoie de bani curând. Ce risc trebuie evaluat?",
      "explanation": "Vânzarea la un moment nefavorabil.",
      "correctFeedback": "Corect. Vânzarea la un moment nefavorabil.",
      "incorrectFeedback": "Nu chiar. Vânzarea la un moment nefavorabil.",
      "type": "scenariu",
      "context": "O investiție fictivă de 1.000 lei valorează 1.100 înainte de costuri, o creștere de 10%. Dacă ai costuri de 20 lei incluse în exercițiu, rezultatul net este 80, adică 8% față de suma inițială. Alt scenariu poate produce pierdere. Cifrele arată metoda, nu o promisiune ori valoarea unei taxe actuale.",
      "options": [
        {
          "id": "0",
          "label": "Doar câștigul trecut, presupunând că prețul va rămâne favorabil."
        },
        {
          "id": "1",
          "label": "Doar randamentul dorit, fără momentul când trebuie să vinzi."
        },
        {
          "id": "2",
          "label": "Vânzarea la un moment nefavorabil."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-risc-si-randament",
      "paragraphs": [
        "Dan vede o investiție de 1.000 ajunsă ipotetic la 1.100 și spune că a câștigat 10%. Adaugă apoi costuri de 20 și calculează 80 net, adică 8%. Are însă o obligație apropiată și înțelege că ar putea fi nevoit să vândă într-un moment nefavorabil. Nu confundă calmul său cu posibilitatea reală de a pierde banii.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: O investiție fictivă de 1.000 lei valorează 1.100 înainte de costuri, o creștere de 10%. Dacă ai costuri de 20 lei incluse în exercițiu, rezultatul net este 80, adică 8% față de suma inițială. Alt scenariu poate produce pierdere. Cifrele arată metoda, nu o promisiune ori valoarea unei taxe actuale. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Dan a calculat o creștere de 100 lei înainte de costuri și un rezultat net de 80 lei. Ce cost explică diferența?",
      "explanation": "Costurile de 20 lei reduc rezultatul de la 100 la 80 lei. Compararea randamentelor înainte de costuri poate ascunde această diferență.",
      "correctFeedback": "Corect. Costurile de 20 lei reduc rezultatul de la 100 la 80 lei. Compararea randamentelor înainte de costuri poate ascunde această diferență.",
      "incorrectFeedback": "Nu chiar. Costurile de 20 lei reduc rezultatul de la 100 la 80 lei. Compararea randamentelor înainte de costuri poate ascunde această diferență.",
      "caseId": "caz-risc-si-randament",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "20 lei."
        },
        {
          "id": "1",
          "label": "80 lei."
        },
        {
          "id": "2",
          "label": "1.100 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "De ce nu folosește doar creșterea de 10%?",
      "explanation": "Costurile reduc rezultatul net.",
      "correctFeedback": "Corect. Costurile reduc rezultatul net.",
      "incorrectFeedback": "Nu chiar. Costurile reduc rezultatul net.",
      "caseId": "caz-risc-si-randament",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Costurile dublează câștigul."
        },
        {
          "id": "1",
          "label": "Costurile reduc rezultatul net."
        },
        {
          "id": "2",
          "label": "Valoarea inițială este zero."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce distincție observă Dan despre calm?",
      "explanation": "Nu este același lucru cu capacitatea de a suporta pierderea.",
      "correctFeedback": "Corect. Nu este același lucru cu capacitatea de a suporta pierderea.",
      "incorrectFeedback": "Nu chiar. Nu este același lucru cu capacitatea de a suporta pierderea.",
      "caseId": "caz-risc-si-randament",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Calmul garantează că poate păstra investiția până când prețul revine."
        },
        {
          "id": "1",
          "label": "Calmul poate înlocui verificarea obligațiilor apropiate."
        },
        {
          "id": "2",
          "label": "Nu este același lucru cu capacitatea de a suporta pierderea."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Toleranța emoțională la fluctuații și capacitatea financiară de a suporta o pierdere sunt diferite. Poți fi calm și totuși să ai nevoie urgentă de bani. Verifică moneda, lichiditatea și concentrarea, nu doar variația prețului. Un produs prezentat ca fără risc trebuie analizat pentru ce anume este garantat și de cine.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un produs promite fără risc. Ce întrebi?",
      "explanation": "Ce este garantat, de cine și în ce condiții.",
      "correctFeedback": "Corect. Ce este garantat, de cine și în ce condiții.",
      "incorrectFeedback": "Nu chiar. Ce este garantat, de cine și în ce condiții.",
      "type": "scenariu",
      "context": "O investiție fictivă de 1.000 lei valorează 1.100 înainte de costuri, o creștere de 10%. Dacă ai costuri de 20 lei incluse în exercițiu, rezultatul net este 80, adică 8% față de suma inițială. Alt scenariu poate produce pierdere. Cifrele arată metoda, nu o promisiune ori valoarea unei taxe actuale.",
      "options": [
        {
          "id": "0",
          "label": "Ce este garantat, de cine și în ce condiții."
        },
        {
          "id": "1",
          "label": "Doar cât a câștigat alt client, fără garanția concretă."
        },
        {
          "id": "2",
          "label": "Numai câți clienți îl folosesc."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "O medie istorică este 8%. Ce înseamnă pentru anul următor?",
      "explanation": "Nu garantează același rezultat.",
      "correctFeedback": "Corect. Nu garantează același rezultat.",
      "incorrectFeedback": "Nu chiar. Nu garantează același rezultat.",
      "type": "scenariu",
      "context": "O investiție fictivă de 1.000 lei valorează 1.100 înainte de costuri, o creștere de 10%. Dacă ai costuri de 20 lei incluse în exercițiu, rezultatul net este 80, adică 8% față de suma inițială. Alt scenariu poate produce pierdere. Cifrele arată metoda, nu o promisiune ori valoarea unei taxe actuale.",
      "options": [
        {
          "id": "0",
          "label": "Rezultatul va fi exact 8%."
        },
        {
          "id": "1",
          "label": "Nu garantează același rezultat."
        },
        {
          "id": "2",
          "label": "Nu poate exista pierdere."
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
          "body": "Randamentul arată rezultatul în raport cu suma investită.",
          "detail": "Creșterea fictivă de 100 lei dintr-o investiție de 1.000 lasă 80 lei după costuri de 20. Rezultatul net diferă de cifra inițială, iar scenariul nu garantează evoluția următoare.",
          "type": "normal",
          "detailHighlights": [
            "costuri",
            "net"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Costurile pot reduce câștigul față de cifra afișată.",
          "type": "normal",
          "detail": "Costurile reduc rezultatul față de creșterea afișată. Compară sume nete pentru același interval.",
          "detailHighlights": [
            "costurile",
            "sume"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "A suporta emoțional fluctuația diferă de a-ți permite pierderea.",
          "type": "normal",
          "detail": "Poți accepta emoțional fluctuația și totuși să nu îți permiți financiar pierderea banilor pentru chirie.",
          "detailHighlights": [
            "pierderea"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Calculează un rezultat fictiv înainte și după costuri și notează un scenariu de pierdere.",
          "type": "action",
          "detail": "În scenariul de pierdere, verifică și dacă mai poți acoperi obligațiile apropiate, separat de reacția la scădere.",
          "detailHighlights": [
            "obligațiile",
            "pierdere"
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
