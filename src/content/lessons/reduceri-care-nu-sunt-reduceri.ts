import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "reduceri-care-nu-sunt-reduceri",
  "title": "Reduceri care nu sunt reduceri",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "capcanele-cumparaturilor",
  "slug": "reduceri-care-nu-sunt-reduceri",
  "description": "Un hanorac afișează „−40%”, dar alt magazin îl vinde mai ieftin fără procent tăiat. Ce compari?",
  "objective": "Să poți calcula o reducere și să observi când prezentarea unei reduceri poate fi înșelătoare.",
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
      "title": "Reduceri care nu sunt reduceri",
      "body": "Un hanorac afișează „−40%”, dar alt magazin îl vinde mai ieftin fără procent tăiat. Ce compari?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O reducere procentuală se aplică unui preț de referință. Într-un exemplu, 25% din 200 lei reprezintă 50 lei, iar prețul după reducere este 150 lei. Procentul nu este prețul final și nu spune singur dacă oferta este bună. Un procent mare aplicat unei baze mari poate lăsa un preț ridicat.",
        "Când vezi o etichetă, separă trei informații: baza prezentată, suma scăzută și totalul de plătit. Verifică apoi dacă totalul este avantajos față de alternative comparabile. Nu considera cuvântul „reducere” o dovadă suficientă despre valoarea produsului."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "25% din 200 lei înseamnă cât?",
      "explanation": "200 × 0,25 = 50 lei scăzuți.",
      "correctFeedback": "Corect. 200 × 0,25 = 50 lei scăzuți.",
      "incorrectFeedback": "Nu chiar. 200 × 0,25 = 50 lei scăzuți.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "50 lei reducere."
        },
        {
          "id": "1",
          "label": "25 lei reducere."
        },
        {
          "id": "2",
          "label": "150 lei reducere."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un procent mai mare garantează un preț final mai mic decât orice alternativă.",
      "explanation": "Contează baza și costurile finale.",
      "correctFeedback": "Corect. Contează baza și costurile finale.",
      "incorrectFeedback": "Nu chiar. Contează baza și costurile finale.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Două reduceri succesive nu se adună automat. Dacă prețul de 200 lei scade cu 20%, ajunge la 160 lei. O reducere suplimentară de 10% aplicată lui 160 lei scade încă 16 lei și lasă 144 lei. Nu este același rezultat ca 30% din prețul inițial.",
        "Mai verifică transportul, condițiile codului și produsul exact. O ofertă poate cere o valoare minimă a coșului sau poate privi altă variantă. Înainte să calculezi cât „economisești”, verifică ce trebuie să cheltuiești efectiv ca să folosești promoția și dacă acea cumpărătură era relevantă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "După 20% din 200 și încă 10% din noul preț, cât plătești?",
      "explanation": "200 × 0,8 × 0,9 = 144 lei.",
      "correctFeedback": "Corect. 200 × 0,8 × 0,9 = 144 lei.",
      "incorrectFeedback": "Nu chiar. 200 × 0,8 × 0,9 = 144 lei.",
      "type": "scenariu",
      "context": "Reducerile sunt succesive în exemplu.",
      "options": [
        {
          "id": "0",
          "label": "140 lei."
        },
        {
          "id": "1",
          "label": "144 lei."
        },
        {
          "id": "2",
          "label": "170 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ce compari pentru două oferte?",
      "explanation": "Bazele diferite și costurile ascunse schimbă comparația.",
      "correctFeedback": "Corect. Bazele diferite și costurile ascunse schimbă comparația.",
      "incorrectFeedback": "Nu chiar. Bazele diferite și costurile ascunse schimbă comparația.",
      "type": "scenariu",
      "context": "Cauți un produs anume.",
      "options": [
        {
          "id": "0",
          "label": "Doar procentele din titlu."
        },
        {
          "id": "1",
          "label": "Doar numărul de culori din reclamă."
        },
        {
          "id": "2",
          "label": "Același produs și totalul cu condițiile relevante."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-reduceri-care-nu-sunt-reduceri",
      "paragraphs": [
        "Daria caută un hanorac potrivit pentru excursie. Un magazin afișează un preț de referință de 250 lei și o reducere de 40%, astfel încât produsul costă 150 lei. Transportul adaugă 20 lei. Alt magazin oferă același model la 160 lei cu ridicare gratuită. Daria observă mai întâi procentul mare și aproape ignoră livrarea.",
        "Mai vede un cod suplimentar de 10%, dar acesta se aplică numai după reducerea inițială și cere o condiție pe care trebuie să o verifice. Ea calculează scenariile separat, fără să adune procentele din reclamă. Colega ei propune să adauge produse inutile ca să atingă un prag promoțional. Daria compară costul întregului coș cu alternativa simplă. Procentul poate ajuta, dar nu înlocuiește verificarea produsului, a condițiilor și a totalului real de plată."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Care este totalul primei oferte fără cod?",
      "explanation": "150 + 20 = 170 lei cu transport.",
      "correctFeedback": "Corect. 150 + 20 = 170 lei cu transport.",
      "incorrectFeedback": "Nu chiar. 150 + 20 = 170 lei cu transport.",
      "caseId": "caz-reduceri-care-nu-sunt-reduceri",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "170 lei."
        },
        {
          "id": "1",
          "label": "150 lei."
        },
        {
          "id": "2",
          "label": "250 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce ofertă este mai ieftină fără cod în caz?",
      "explanation": "Totalul decide comparația costului, nu eticheta promoțională.",
      "correctFeedback": "Corect. Totalul decide comparația costului, nu eticheta promoțională.",
      "incorrectFeedback": "Nu chiar. Totalul decide comparația costului, nu eticheta promoțională.",
      "caseId": "caz-reduceri-care-nu-sunt-reduceri",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "170 lei fiindcă are reducere mai mare."
        },
        {
          "id": "1",
          "label": "160 lei cu ridicare gratuită."
        },
        {
          "id": "2",
          "label": "Sunt identice deoarece este același model."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce verifică înainte să adauge produse pentru prag?",
      "explanation": "Cheltuiala suplimentară poate depăși beneficiul promoției.",
      "correctFeedback": "Corect. Cheltuiala suplimentară poate depăși beneficiul promoției.",
      "incorrectFeedback": "Nu chiar. Cheltuiala suplimentară poate depăși beneficiul promoției.",
      "caseId": "caz-reduceri-care-nu-sunt-reduceri",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar suma „economisită” din banner."
        },
        {
          "id": "1",
          "label": "Presupune că tot ce adaugă este gratuit."
        },
        {
          "id": "2",
          "label": "Costul întregului coș și utilitatea produselor suplimentare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Prețul tăiat poate crea o ancoră: compari oferta cu cifra mare din aceeași reclamă, nu cu piața sau cu propriul buget. O comparație separată te ajută să vezi dacă prețul final este de fapt convenabil. Nu ai nevoie să presupui intenția comerciantului pentru a verifica cifrele.",
        "Regulile juridice privind prezentarea reducerilor se verifică în surse actuale competente; nu le deduci din acest exercițiu. Practic, păstrează oferta, compară același produs și cere clarificări dacă datele sunt neclare. O decizie bună poate fi cumpărarea sau amânarea, după ce înțelegi totalul și condițiile."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O bază tăiată foarte mare îți influențează percepția. Ce pas ajută?",
      "explanation": "O comparație independentă reduce efectul ancorei.",
      "correctFeedback": "Corect. O comparație independentă reduce efectul ancorei.",
      "incorrectFeedback": "Nu chiar. O comparație independentă reduce efectul ancorei.",
      "type": "scenariu",
      "context": "Nu știi dacă produsul chiar merită suma.",
      "options": [
        {
          "id": "0",
          "label": "Compari prețul final în alte oferte echivalente."
        },
        {
          "id": "1",
          "label": "Consideri cifra tăiată adevăr absolut."
        },
        {
          "id": "2",
          "label": "Ignori totalul în lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Lipsește condiția codului promoțional. Ce faci?",
      "explanation": "Condițiile determină dacă reducerea se aplică.",
      "correctFeedback": "Corect. Condițiile determină dacă reducerea se aplică.",
      "incorrectFeedback": "Nu chiar. Condițiile determină dacă reducerea se aplică.",
      "type": "scenariu",
      "context": "Oferta spune doar „până la”.",
      "options": [
        {
          "id": "0",
          "label": "Presupui că merge pentru orice produs."
        },
        {
          "id": "1",
          "label": "O verifici înainte de calculul final și plată."
        },
        {
          "id": "2",
          "label": "Aduni toate procentele automat."
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
          "title": "Baza contează",
          "body": "Procentul se aplică unei sume concrete.",
          "detail": "Procentul se aplică unei sume concrete.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Totalul contează",
          "body": "Include transportul și condițiile.",
          "detail": "Include transportul și condițiile.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Procente succesive",
          "body": "Aplică fiecare reducere la baza potrivită.",
          "detail": "Aplică fiecare reducere la baza potrivită.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Recalculează o ofertă în lei și compară totalul cu o alternativă pentru același produs.",
          "detail": "Recalculează o ofertă în lei și compară totalul cu o alternativă pentru același produs.",
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
