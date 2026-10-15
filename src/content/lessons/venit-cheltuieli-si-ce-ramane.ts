import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "venit-cheltuieli-si-ce-ramane",
  "title": "Venit, cheltuieli și ce rămâne",
  "categoryId": "cuvintele-banilor",
  "chapterId": "bazele",
  "slug": "venit-cheltuieli-si-ce-ramane",
  "description": "Teo primește 600 lei într-o lună. La final vede doar 90 lei în cont. Cum află unde s-a dus diferența?",
  "objective": "Să poți separa veniturile de cheltuieli și să calculezi ce rămâne după cheltuielile unei perioade.",
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
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Venit, cheltuieli și ce rămâne",
      "body": "Teo primește 600 lei într-o lună. La final vede doar 90 lei în cont. Cum află unde s-a dus diferența?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Venitul este o sumă care intră în perioada analizată: bani de buzunar, bursă sau plată pentru muncă. Cheltuielile sunt sumele folosite pentru produse, servicii ori alte plăți. Ca să afli ce rămâne, compară intrările și ieșirile din aceeași perioadă. Nu amesteca o săptămână de cheltuieli cu venitul unei luni.",
        "Într-un exemplu, intră 600 lei și se cheltuiesc 510 lei. Diferența este 90 lei. Aceasta nu îți spune singură dacă planul este bun sau rău. Îți arată ce resurse au rămas după plățile incluse în calcul."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Teo primește 400 lei de la familie și 200 lei pentru un proiect. Avea deja 90 lei. Ce sumă reprezintă venitul perioadei?",
      "explanation": "Cei 400 și 200 lei sunt intrări noi. Cei 90 lei existenți fac parte din soldul inițial, nu din venitul perioadei.",
      "correctFeedback": "Corect. Cei 400 și 200 lei sunt intrări noi. Cei 90 lei existenți fac parte din soldul inițial, nu din venitul perioadei.",
      "incorrectFeedback": "Nu chiar. Cei 400 și 200 lei sunt intrări noi. Cei 90 lei existenți fac parte din soldul inițial, nu din venitul perioadei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "600 lei."
        },
        {
          "id": "1",
          "label": "400 lei."
        },
        {
          "id": "2",
          "label": "90 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Transferul între conturile proprii este un venit nou.",
      "explanation": "Locul banilor se schimbă, nu suma totală deținută.",
      "correctFeedback": "Corect. Locul banilor se schimbă, nu suma totală deținută.",
      "incorrectFeedback": "Nu chiar. Locul banilor se schimbă, nu suma totală deținută.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Soldul afișat în aplicație poate include bani rămași din luna trecută. De aceea, soldul final nu este întotdeauna egal cu venitul lunii minus cheltuielile ei. Dacă începi cu 100 lei, primești 600 lei și cheltuiești 510 lei, închei cu 190 lei. Exemplele sunt simplificate și presupun că nu există alte mișcări.",
        "Un transfer între două conturi proprii nu este un venit nou pentru tine. Dacă muți 50 lei în economii, ai schimbat locul banilor. Pentru planificare poți separa suma economisită de banii disponibili, fără să numeri aceiași bani de două ori."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Începi cu 100 lei, primești 600 și cheltuiești 510. Ce sold ai?",
      "explanation": "100 + 600 − 510 = 190 lei.",
      "correctFeedback": "Corect. 100 + 600 − 510 = 190 lei.",
      "incorrectFeedback": "Nu chiar. 100 + 600 − 510 = 190 lei.",
      "type": "scenariu",
      "context": "Nu există alte tranzacții în acest exemplu.",
      "options": [
        {
          "id": "0",
          "label": "90 lei."
        },
        {
          "id": "1",
          "label": "190 lei."
        },
        {
          "id": "2",
          "label": "700 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Cum compari corect intrări și ieșiri?",
      "explanation": "Perioadele diferite produc comparații înșelătoare.",
      "correctFeedback": "Corect. Perioadele diferite produc comparații înșelătoare.",
      "incorrectFeedback": "Nu chiar. Perioadele diferite produc comparații înșelătoare.",
      "type": "scenariu",
      "context": "Vrei să verifici ce ți-a rămas în aprilie.",
      "options": [
        {
          "id": "0",
          "label": "Comparând o lună cu o singură zi."
        },
        {
          "id": "1",
          "label": "Ignorând abonamentele mici."
        },
        {
          "id": "2",
          "label": "Folosind aceeași perioadă și toate plățile relevante."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-venit-cheltuieli-si-ce-ramane",
      "paragraphs": [
        "Teo primește în acest exemplu 400 lei de la familie și 200 lei pentru un mic proiect. Începe luna fără bani rămași din perioada precedentă. Înregistrează 120 lei pentru transport, 180 lei pentru mâncare în afara casei, 150 lei pentru un accesoriu și 60 lei pentru un abonament. Aplicația îi arată 90 lei la final.",
        "Teo vrea să numească întreaga sumă economisire. Își amintește însă că trebuie să cumpere un bilet de tren de 70 lei săptămâna următoare. Mai mută 50 lei între două conturi proprii și se întreabă dacă transferul trebuie trecut ca venit. Ca să nu se încurce, scrie separat veniturile reale, cheltuielile făcute și plata apropiată. Înțelege astfel că transferul nu îi mărește resursele totale, iar o parte din sold are deja o destinație."
      ]
    },
    {
      "id": "q5",
      "question": "Teo vrea să numere și transferul între conturile lui ca o cheltuială de consum. Ce total descrie cumpărăturile din caz?",
      "explanation": "Transportul, mâncarea, accesoriul și abonamentul însumează 510 lei. Transferul propriu schimbă locul banilor, nu consumul.",
      "correctFeedback": "Corect. Transportul, mâncarea, accesoriul și abonamentul însumează 510 lei. Transferul propriu schimbă locul banilor, nu consumul.",
      "incorrectFeedback": "Nu chiar. Transportul, mâncarea, accesoriul și abonamentul însumează 510 lei. Transferul propriu schimbă locul banilor, nu consumul.",
      "caseId": "caz-venit-cheltuieli-si-ce-ramane",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "510 lei."
        },
        {
          "id": "1",
          "label": "600 lei."
        },
        {
          "id": "2",
          "label": "440 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Cât rămâne din 90 lei după biletul planificat?",
      "explanation": "90 − 70 = 20 lei fără acea obligație apropiată.",
      "correctFeedback": "Corect. 90 − 70 = 20 lei fără acea obligație apropiată.",
      "incorrectFeedback": "Nu chiar. 90 − 70 = 20 lei fără acea obligație apropiată.",
      "caseId": "caz-venit-cheltuieli-si-ce-ramane",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "90 lei."
        },
        {
          "id": "1",
          "label": "20 lei."
        },
        {
          "id": "2",
          "label": "160 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Cum tratează transferul de 50 lei?",
      "explanation": "Transferul merită urmărit, dar nu dublează resursele.",
      "correctFeedback": "Corect. Transferul merită urmărit, dar nu dublează resursele.",
      "incorrectFeedback": "Nu chiar. Transferul merită urmărit, dar nu dublează resursele.",
      "caseId": "caz-venit-cheltuieli-si-ce-ramane",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Îl adaugă la venit și economii simultan."
        },
        {
          "id": "1",
          "label": "Îl elimină din toate evidențele."
        },
        {
          "id": "2",
          "label": "Îl marchează ca transfer propriu, fără venit nou."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Ce rămâne nu este automat liber de orice obligație. Poate exista o factură care urmează să fie plătită sau un bilet de tren deja planificat. Separă soldul vizibil de suma disponibilă după obligațiile apropiate. Asta previne o cumpărătură care pare posibilă astăzi și creează o problemă mâine.",
        "Când banii nu ajung, verifică întâi lista și perioada. O plată uitată, o rambursare primită sau un transfer numărat de două ori poate schimba rezultatul. Abia după această verificare compari opțiuni precum amânarea unei dorințe, reducerea unui cost ori adaptarea planului la venit."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ioana vede 300 lei, dar are o factură de 250 lei. Ce verifică înainte de o ieșire?",
      "explanation": "Banii cu destinație stabilită nu sunt integral disponibili.",
      "correctFeedback": "Corect. Banii cu destinație stabilită nu sunt integral disponibili.",
      "incorrectFeedback": "Nu chiar. Banii cu destinație stabilită nu sunt integral disponibili.",
      "type": "scenariu",
      "context": "Factura trebuie plătită înainte de următorul venit.",
      "options": [
        {
          "id": "0",
          "label": "Ce sumă rămâne după factura apropiată."
        },
        {
          "id": "1",
          "label": "Doar soldul de 300 lei."
        },
        {
          "id": "2",
          "label": "Dacă prietenii cheltuiesc mai mult."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Lista nu se potrivește cu soldul. Care este primul pas?",
      "explanation": "Întâi corectezi datele, apoi adaptezi planul.",
      "correctFeedback": "Corect. Întâi corectezi datele, apoi adaptezi planul.",
      "incorrectFeedback": "Nu chiar. Întâi corectezi datele, apoi adaptezi planul.",
      "type": "scenariu",
      "context": "Ai o diferență de 30 lei între listă și cont.",
      "options": [
        {
          "id": "0",
          "label": "Declari imediat toate cumpărăturile greșite."
        },
        {
          "id": "1",
          "label": "Verifici plăți omise, rambursări și perioada."
        },
        {
          "id": "2",
          "label": "Dublez venitul estimat."
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
          "title": "Aceeași perioadă",
          "body": "Compară intrările și ieșirile aceleiași luni sau săptămâni.",
          "detail": "Un sold poate include bani rămași din luna trecută, deci nu descrie singur venitul lunii. Separă intrările noi și plățile perioadei înainte să stabilești ce ai disponibil.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Sold inițial",
          "body": "Banii din perioada precedentă contează la soldul final.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Transfer propriu",
          "body": "Mutarea între conturi nu creează venit.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Notează intrările și trei cheltuieli din ultima săptămână, apoi calculează diferența.",
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
