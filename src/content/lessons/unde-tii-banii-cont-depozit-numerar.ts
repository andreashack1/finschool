import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "unde-tii-banii-cont-depozit-numerar",
  "title": "Unde ții banii: cont, depozit, numerar",
  "categoryId": "economii",
  "chapterId": "unde-pui-banii",
  "slug": "unde-tii-banii-cont-depozit-numerar",
  "description": "Ana are bani pentru cheltuieli apropiate și pentru un scop mai îndepărtat. Un singur criteriu nu descrie toate variantele.",
  "objective": "Să poți compara trei moduri de a păstra bani în funcție de acces, risc și scop.",
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
      "title": "Unde ții banii: cont, depozit, numerar",
      "body": "Ana are bani pentru cheltuieli apropiate și pentru un scop mai îndepărtat. Un singur criteriu nu descrie toate variantele."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Locul banilor trebuie comparat cu scopul și momentul folosirii. Numerarul poate fi utilizat direct în anumite situații, dar poate fi pierdut sau furat. Un cont permite operațiuni și urmărirea tranzacțiilor, conform serviciilor disponibile. Un depozit are condiții despre termen, dobândă și acces. Nu sunt variante identice.",
        "Întrebarea nu este care loc este universal cel mai bun. Întreabă cât de repede ai nevoie de bani, ce riscuri există și ce costuri sau condiții se aplică. O sumă pentru o plată apropiată poate avea alte cerințe decât un obiectiv care poate aștepta."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Cu ce începi comparația locurilor de păstrare?",
      "explanation": "Cerințele diferă între sume și termene.",
      "correctFeedback": "Corect. Cerințele diferă între sume și termene.",
      "incorrectFeedback": "Nu chiar. Cerințele diferă între sume și termene.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Scopul, accesul necesar și riscurile."
        },
        {
          "id": "1",
          "label": "Doar dobânda afișată."
        },
        {
          "id": "2",
          "label": "Doar obiceiul unui prieten."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Numerarul păstrat apare automat în extrasul contului.",
      "explanation": "Numerarul are nevoie de evidență separată.",
      "correctFeedback": "Corect. Numerarul are nevoie de evidență separată.",
      "incorrectFeedback": "Nu chiar. Numerarul are nevoie de evidență separată.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Dobânda unui depozit nu trebuie privită separat de acces. Retragerea înainte de termen poate avea un efect conform condițiilor produsului, care trebuie citite. Lecția nu inventează o regulă identică pentru toate depozitele. Compară și instituția și protecția aplicabilă, prin documentele oficiale.",
        "Numerarul disponibil imediat poate fi util, dar nu se urmărește automat în extras și nu se recuperează printr-un cod dacă îl pierzi. Un cont poate avea tarife și cerințe de acces. Fă o comparație între utilizare, siguranță și cost, fără să transformi un procent de dobândă în singurul criteriu."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Un depozit are termen. Ce verifici pentru acces mai devreme?",
      "explanation": "Accesul și dobânda trebuie citite împreună.",
      "correctFeedback": "Corect. Accesul și dobânda trebuie citite împreună.",
      "incorrectFeedback": "Nu chiar. Accesul și dobânda trebuie citite împreună.",
      "type": "scenariu",
      "context": "Ai putea avea nevoie de bani rapid.",
      "options": [
        {
          "id": "0",
          "label": "Presupui o regulă universală."
        },
        {
          "id": "1",
          "label": "Condițiile și efectele retragerii înainte de termen."
        },
        {
          "id": "2",
          "label": "Consideri orice procent profit garantat."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Muți 200 lei între locuri proprii. Ce se întâmplă cu totalul?",
      "explanation": "Transferul schimbă locul, nu creează bani.",
      "correctFeedback": "Corect. Transferul schimbă locul, nu creează bani.",
      "incorrectFeedback": "Nu chiar. Transferul schimbă locul, nu creează bani.",
      "type": "scenariu",
      "context": "Este aceeași sumă deținută.",
      "options": [
        {
          "id": "0",
          "label": "Crește cu 200."
        },
        {
          "id": "1",
          "label": "Se dublează."
        },
        {
          "id": "2",
          "label": "Rămâne același, dacă nu există costuri."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-unde-tii-banii-cont-depozit-numerar",
      "paragraphs": [
        "Ana are în exemplu bani pentru un drum în săptămâna următoare și pentru un curs peste câteva luni. Compară numerarul, contul și un depozit. Reclama depozitului pune accent pe dobândă, dar Ana vrea să afle și condițiile retragerii înainte de termen. Nu presupune că toate sumele trebuie puse în același loc.",
        "Pentru drum verifică unde poate plăti și cât de repede poate accesa banii. Pentru curs compară termenul și costurile, fără să primească din lecție recomandarea unui produs. Mai verifică instituția și informațiile oficiale despre protecție. Dacă mută 200 lei între locuri proprii, îi înregistrează o singură dată în total. Numerarul este urmărit separat în evidență. Ana nu confundă o investiție afișată în aplicație cu depozitul comparat. Alegerea se bazează pe scop, acces și risc, nu numai pe procentul cel mai vizibil."
      ]
    },
    {
      "id": "q5",
      "question": "Ce nevoie are suma pentru drumul Anei?",
      "explanation": "Momentul plății determină criteriul accesului.",
      "correctFeedback": "Corect. Momentul plății determină criteriul accesului.",
      "incorrectFeedback": "Nu chiar. Momentul plății determină criteriul accesului.",
      "caseId": "caz-unde-tii-banii-cont-depozit-numerar",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Acces și utilizare în perioada apropiată."
        },
        {
          "id": "1",
          "label": "Un termen lung obligatoriu."
        },
        {
          "id": "2",
          "label": "Un randament speculativ."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce trebuie aflat dincolo de reclamă?",
      "explanation": "Procentul izolat nu descrie varianta completă.",
      "correctFeedback": "Corect. Procentul izolat nu descrie varianta completă.",
      "incorrectFeedback": "Nu chiar. Procentul izolat nu descrie varianta completă.",
      "caseId": "caz-unde-tii-banii-cont-depozit-numerar",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar dobânda, presupunând că accesul înainte de termen nu o schimbă."
        },
        {
          "id": "1",
          "label": "Condițiile, tarifele și protecția produsului."
        },
        {
          "id": "2",
          "label": "Doar protecția instituției, fără natura produsului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce nu confundă investiția cu depozitul?",
      "explanation": "Documentele determină categoria produsului.",
      "correctFeedback": "Corect. Documentele determină categoria produsului.",
      "incorrectFeedback": "Nu chiar. Documentele determină categoria produsului.",
      "caseId": "caz-unde-tii-banii-cont-depozit-numerar",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Toate produsele sunt identice în aplicație."
        },
        {
          "id": "1",
          "label": "Orice investiție este numerar."
        },
        {
          "id": "2",
          "label": "Natura și riscurile sunt diferite."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu număra transferul între locurile proprii ca venit nou. Dacă muți 200 lei din cont într-un spațiu de economisire, resursele totale nu cresc. Evidența trebuie să păstreze destinația și accesul, nu să dubleze sumele. Mai evită să consideri orice investiție un depozit: natura și riscurile produsului se verifică separat.",
        "Pentru o rezervă care poate fi necesară repede, compară timpul și condițiile accesului. Pentru numerar, ia în calcul locul și siguranța păstrării. Acestea sunt criterii educaționale, nu o recomandare personalizată de sumă sau produs. Un plan clar poate folosi variante diferite pentru nevoi diferite."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ce risc trebuie luat în calcul la numerar?",
      "explanation": "Disponibilitatea directă are riscuri proprii.",
      "correctFeedback": "Corect. Disponibilitatea directă are riscuri proprii.",
      "incorrectFeedback": "Nu chiar. Disponibilitatea directă are riscuri proprii.",
      "type": "scenariu",
      "context": "Ai nevoie de o comparație echilibrată.",
      "options": [
        {
          "id": "0",
          "label": "Pierderea sau furtul și siguranța păstrării."
        },
        {
          "id": "1",
          "label": "Un profit automat."
        },
        {
          "id": "2",
          "label": "Accesul numai prin aplicație."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce poate susține o alegere diferită pentru două sume?",
      "explanation": "Criteriile pot justifica variante diferite.",
      "correctFeedback": "Corect. Criteriile pot justifica variante diferite.",
      "incorrectFeedback": "Nu chiar. Criteriile pot justifica variante diferite.",
      "type": "scenariu",
      "context": "O sumă este pentru săptămâna viitoare, alta pentru viitor.",
      "options": [
        {
          "id": "0",
          "label": "O regulă universală că totul stă la fel."
        },
        {
          "id": "1",
          "label": "Scopuri și momente de folosire diferite."
        },
        {
          "id": "2",
          "label": "Un singur procent fără context."
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
          "title": "Scop",
          "body": "Compară locul cu momentul folosirii.",
          "detail": "Banii pentru drumul de săptămâna viitoare cer acces diferit de cei pentru cursul de peste câteva luni. Dobânda mai mare nu spune ce se întâmplă la retragerea înainte de termen.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Condiții",
          "body": "Accesul și costurile contează alături de dobândă.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Total",
          "body": "Mutarea banilor nu creează venit.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Compară pe hârtie contul, depozitul și numerarul pentru două scopuri cu termene diferite.",
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
