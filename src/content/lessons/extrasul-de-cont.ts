import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "extrasul-de-cont",
  "title": "Extrasul de cont",
  "categoryId": "carduri-si-banca",
  "chapterId": "siguranta-banilor",
  "slug": "extrasul-de-cont",
  "description": "Mara vede o denumire necunoscută și un abonament repetat. Un extras este o urmă a operațiunilor, nu doar o sumă finală.",
  "objective": "Să poți citi tranzacțiile de bază dintr-un extras și să observi o plată necunoscută sau un cost recurent.",
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
      "title": "Extrasul de cont",
      "body": "Mara vede o denumire necunoscută și un abonament repetat. Un extras este o urmă a operațiunilor, nu doar o sumă finală."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Extrasul de cont descrie operațiuni pentru o perioadă. Poate arăta intrări, ieșiri, comisioane și solduri, în structura folosită de instituție. Înainte să interpretezi un rând, verifică data, suma, moneda, descrierea și sensul operațiunii. Nu confunda o încasare cu o cheltuială doar pentru că ambele au valori numerice.",
        "O retragere mută bani spre numerar, iar un transfer între conturile tale poate muta resurse fără consum. Extrasul unui singur cont nu descrie automat toți banii tăi. Pentru buget, leagă operațiunile de scop și evită numărarea de două ori a aceleiași sume."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici la un rând din extras?",
      "explanation": "Interpretarea cere identificarea operațiunii.",
      "correctFeedback": "Corect. Interpretarea cere identificarea operațiunii.",
      "incorrectFeedback": "Nu chiar. Interpretarea cere identificarea operațiunii.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Data, suma, moneda, sensul și descrierea."
        },
        {
          "id": "1",
          "label": "Doar ultimul sold."
        },
        {
          "id": "2",
          "label": "Doar lungimea textului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Extrasul unui cont arată automat și numerarul din portofel.",
      "explanation": "Documentul privește contul, nu toate locurile unde ai bani.",
      "correctFeedback": "Corect. Documentul privește contul, nu toate locurile unde ai bani.",
      "incorrectFeedback": "Nu chiar. Documentul privește contul, nu toate locurile unde ai bani.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu, soldul inițial este 200 lei, intrarea este 500 lei și ieșirile sunt 120 și 80 lei. Soldul final simplificat este 500 lei, dacă nu există alte operațiuni. Calculul verifică coerența evidenței, nu stabilește natura fiecărei plăți. Descrierea și documentele ajută această a doua verificare.",
        "Caută și repetiții: o sumă similară în fiecare lună poate indica un abonament. O denumire comercială poate diferi de numele magazinului pe care îl cunoști. Verifică dovada cumpărării și data înainte să concluzionezi, dar nu ignora o tranzacție pe care nu o poți explica."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Sold 200, intrare 500, ieșiri 120 și 80. Ce sold final rezultă?",
      "explanation": "200 + 500 − 120 − 80 = 500 lei.",
      "correctFeedback": "Corect. 200 + 500 − 120 − 80 = 500 lei.",
      "incorrectFeedback": "Nu chiar. 200 + 500 − 120 − 80 = 500 lei.",
      "type": "scenariu",
      "context": "Nu există alte operațiuni.",
      "options": [
        {
          "id": "0",
          "label": "700 lei."
        },
        {
          "id": "1",
          "label": "500 lei."
        },
        {
          "id": "2",
          "label": "300 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "O sumă se repetă lunar. Ce merită verificat?",
      "explanation": "Repetiția poate identifica un cost recurent.",
      "correctFeedback": "Corect. Repetiția poate identifica un cost recurent.",
      "incorrectFeedback": "Nu chiar. Repetiția poate identifica un cost recurent.",
      "type": "scenariu",
      "context": "Nu ai trecut serviciul în planul lunii.",
      "options": [
        {
          "id": "0",
          "label": "Dacă trebuie ignorată fiindcă e mică."
        },
        {
          "id": "1",
          "label": "Dacă orice repetare este venit."
        },
        {
          "id": "2",
          "label": "Dacă este un abonament și dacă mai este folosit."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-extrasul-de-cont",
      "paragraphs": [
        "Mara își verifică extrasul după o lună de facultate. În exemplu începe cu 200 lei, primește 500 și face două plăți de 120 și 80 lei. Calculul duce la 500 lei sold final. Într-un alt interval observă o sumă de 18 lei repetată și o denumire pe care nu o recunoaște imediat.",
        "Ea compară data denumirii cu o cumpărătură documentată și află că numele din extras diferă de numele afișat în magazin. Nu declară automat fraudă, dar verifică legătura. Plata repetată este un abonament pe care nu îl mai folosește. Mara caută administrarea serviciului și confirmarea opririi. Dacă o tranzacție rămâne fără explicație, contactează banca oficial. Nu publică extrasul complet grupului de colegi, deoarece datele necesare unei discuții despre buget nu includ toate tranzacțiile personale."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "De ce Mara verifică documentul cumpărării?",
      "explanation": "Data și dovada pot lega denumirile.",
      "correctFeedback": "Corect. Data și dovada pot lega denumirile.",
      "incorrectFeedback": "Nu chiar. Data și dovada pot lega denumirile.",
      "caseId": "caz-extrasul-de-cont",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Denumirea din extras poate fi diferită de cea cunoscută."
        },
        {
          "id": "1",
          "label": "Orice nume diferit anulează plata."
        },
        {
          "id": "2",
          "label": "Extrasul nu conține operațiuni reale."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce poate face cu abonamentul nefolosit?",
      "explanation": "Identificarea costului permite o decizie conștientă.",
      "correctFeedback": "Corect. Identificarea costului permite o decizie conștientă.",
      "incorrectFeedback": "Nu chiar. Identificarea costului permite o decizie conștientă.",
      "caseId": "caz-extrasul-de-cont",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Șterge doar istoricul contului."
        },
        {
          "id": "1",
          "label": "Verifică administrarea și confirmă oprirea reînnoirii."
        },
        {
          "id": "2",
          "label": "Îl plătește pentru totdeauna fără analiză."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce nu trimite inutil colegilor?",
      "explanation": "Distribuirea informației minime protejează datele.",
      "correctFeedback": "Corect. Distribuirea informației minime protejează datele.",
      "incorrectFeedback": "Nu chiar. Distribuirea informației minime protejează datele.",
      "caseId": "caz-extrasul-de-cont",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Un total calculat pentru un proiect comun."
        },
        {
          "id": "1",
          "label": "O sumă necesară decontării."
        },
        {
          "id": "2",
          "label": "Extrasul complet cu date personale."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "La o operațiune necunoscută, folosește canalul oficial al băncii și protejează accesul conform situației. Nu trimite extrasul complet unui apelant necunoscut care promite verificarea. Documentul poate dezvălui date personale și obiceiuri de plată. Distribuie numai informația necesară într-un context legitim.",
        "O verificare periodică te poate ajuta să observi costuri recurente uitate sau diferențe între plan și realitate. Nu trebuie să analizezi fiecare rând cu teamă; urmărești coerența și ce necesită clarificare. Separă stările tranzacțiilor dacă aplicația arată sume rezervate și finalizate, apoi cere explicația instituției la neclarități."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O tranzacție rămâne necunoscută. Ce faci?",
      "explanation": "Verificarea legitimă nu cere distribuirea credențialelor.",
      "correctFeedback": "Corect. Verificarea legitimă nu cere distribuirea credențialelor.",
      "incorrectFeedback": "Nu chiar. Verificarea legitimă nu cere distribuirea credențialelor.",
      "type": "scenariu",
      "context": "Nu găsești o dovadă care să o explice.",
      "options": [
        {
          "id": "0",
          "label": "Contactezi banca oficial și protejezi accesul după situație."
        },
        {
          "id": "1",
          "label": "O ignori permanent."
        },
        {
          "id": "2",
          "label": "Dai parola apelantului care promite ajutor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Transferi bani între conturile proprii. Cum îl tratezi în bugetul total?",
      "explanation": "Locul banilor se schimbă, nu resursele totale.",
      "correctFeedback": "Corect. Locul banilor se schimbă, nu resursele totale.",
      "incorrectFeedback": "Nu chiar. Locul banilor se schimbă, nu resursele totale.",
      "type": "scenariu",
      "context": "Operațiunea apare în ambele conturi.",
      "options": [
        {
          "id": "0",
          "label": "Ca două cheltuieli obligatorii."
        },
        {
          "id": "1",
          "label": "Ca mutare, fără venit nou sau consum dublu."
        },
        {
          "id": "2",
          "label": "Ca salariu suplimentar."
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
          "title": "Rânduri",
          "body": "Citește sensul și datele operațiunii.",
          "detail": "Citește sensul și datele operațiunii.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Repetiții",
          "body": "Observă costurile recurente.",
          "detail": "Observă costurile recurente.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Protecție",
          "body": "Nu distribui extrasul complet fără nevoie.",
          "detail": "Nu distribui extrasul complet fără nevoie.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Verifică trei tranzacții recente și caută un cost recurent pe care îl poți explica.",
          "detail": "Verifică trei tranzacții recente și caută un cost recurent pe care îl poți explica.",
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
