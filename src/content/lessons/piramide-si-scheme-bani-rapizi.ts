import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "piramide-si-scheme-bani-rapizi",
  "title": "Piramide și scheme „bani rapizi”",
  "categoryId": "siguranta-financiara",
  "chapterId": "magazine-si-oferte-false",
  "slug": "piramide-si-scheme-bani-rapizi",
  "description": "Alex poate câștiga dacă aduce trei persoane care plătesc. Produsul este vag, iar explicația revine mereu la recrutare.",
  "objective": "Să poți identifica semnele unei scheme bazate pe recrutare sau promisiuni nerealiste de câștig.",
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
      "title": "Piramide și scheme „bani rapizi”",
      "body": "Alex poate câștiga dacă aduce trei persoane care plătesc. Produsul este vag, iar explicația revine mereu la recrutare."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O schemă suspectă poate prezenta câștiguri mari și rapide, fără explicația verificabilă a sursei banilor. Dacă venitul depinde mai ales de noii participanți care plătesc, întreabă ce valoare reală este oferită în afara recrutării. Nu confunda intrarea banilor noi cu o activitate sustenabilă.",
        "Un produs menționat în prezentare nu rezolvă automat întrebarea. Poate exista numai ca decor pentru plățile participanților. Caută cine cumpără efectiv produsul pentru utilitatea lui și cum se justifică venitul. Nu este suficient un grafic cu oameni sau o mărturie despre o plată primită."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce întrebare verifică mecanismul?",
      "explanation": "Sursa venitului trebuie explicată independent de intrări noi.",
      "correctFeedback": "Corect. Sursa venitului trebuie explicată independent de intrări noi.",
      "incorrectFeedback": "Nu chiar. Sursa venitului trebuie explicată independent de intrări noi.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "De unde vin banii fără recrutări noi?"
        },
        {
          "id": "1",
          "label": "Cât s-a plătit primilor participanți, fără sursa banilor."
        },
        {
          "id": "2",
          "label": "Cât costă intrarea, fără clienți din afara recrutării."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O plată către un participant dovedește sustenabilitatea schemei.",
      "explanation": "Plata și mecanismul viabil sunt dovezi diferite.",
      "correctFeedback": "Corect. Plata și mecanismul viabil sunt dovezi diferite.",
      "incorrectFeedback": "Nu chiar. Plata și mecanismul viabil sunt dovezi diferite.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Recrutarea se poate extinde rapid pe hârtie. Dacă fiecare participant aduce trei persoane, o etapă cu trei oameni este urmată de nouă, apoi de douăzeci și șapte. Aceasta nu dovedește că acei oameni există sau că vor plăti. Cererea de participanți noi crește, iar promisiunea depinde de continuarea ei.",
        "Plățile către primii participanți pot convinge alți oameni, dar nu confirmă sursa sustenabilă a banilor. Separă dovada unei plăți de dovada mecanismului. Verifică și ce costuri, condiții și riscuri sunt ascunse în spatele unei promisiuni de randament garantat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "În schemă, cei trei participanți trebuie să aducă fiecare trei oameni noi care plătesc. De câți participanți noi depinde etapa următoare?",
      "explanation": "Etapa nouă cere nouă oameni. Calculul arată cum crește nevoia de recrutare; nu dovedește că există clienți sau venit sustenabil.",
      "correctFeedback": "Corect. Etapa nouă cere nouă oameni. Calculul arată cum crește nevoia de recrutare; nu dovedește că există clienți sau venit sustenabil.",
      "incorrectFeedback": "Nu chiar. Etapa nouă cere nouă oameni. Calculul arată cum crește nevoia de recrutare; nu dovedește că există clienți sau venit sustenabil.",
      "type": "scenariu",
      "context": "Nu numărăm etapele anterioare.",
      "options": [
        {
          "id": "0",
          "label": "3 persoane."
        },
        {
          "id": "1",
          "label": "9 persoane."
        },
        {
          "id": "2",
          "label": "6 persoane."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Prezentarea promite câștig mare fără risc. Ce faci?",
      "explanation": "Un randament promis nu explică riscul sau sursa.",
      "correctFeedback": "Corect. Un randament promis nu explică riscul sau sursa.",
      "incorrectFeedback": "Nu chiar. Un randament promis nu explică riscul sau sursa.",
      "type": "scenariu",
      "context": "Activitatea rămâne vagă.",
      "options": [
        {
          "id": "0",
          "label": "Consideri promisiunea o garanție."
        },
        {
          "id": "1",
          "label": "Recrutezi înainte să citești."
        },
        {
          "id": "2",
          "label": "Ceri sursa verificabilă și condițiile, fără plată grăbită."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-piramide-si-scheme-bani-rapizi",
      "paragraphs": [
        "Alex este invitat de un coleg la o prezentare despre bani rapizi. Pentru a intra trebuie să plătească o sumă, iar câștigul prezentat depinde de aducerea a trei persoane care fac aceeași plată. Există un produs digital descris vag, dar întrebările despre clienți reali sunt întoarse spre recrutare. Colegul arată o captură cu o plată primită.",
        "Alex separă plata colegului de explicația sursei banilor. Calculează că trei persoane care aduc fiecare alte trei cer nouă participanți la etapa următoare, apoi douăzeci și șapte. Nu presupune că extinderea poate continua fără limită. Cere documente și o explicație despre valoarea oferită în afara grupului. Dacă nu primește răspunsuri verificabile, nu plătește și nu invită prieteni. Respectul pentru coleg nu transformă promisiunea în garanție și nici recuperarea unei plăți nu justifică transferarea riscului către alții."
      ]
    },
    {
      "id": "q5",
      "question": "Ce semnal observă Alex în răspunsuri?",
      "explanation": "Evitarea sursei banilor este relevantă.",
      "correctFeedback": "Corect. Evitarea sursei banilor este relevantă.",
      "incorrectFeedback": "Nu chiar. Evitarea sursei banilor este relevantă.",
      "caseId": "caz-piramide-si-scheme-bani-rapizi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Accentul pe recrutare în locul clienților și valorii reale."
        },
        {
          "id": "1",
          "label": "Doar existența unui produs digital."
        },
        {
          "id": "2",
          "label": "Doar existența unei plăți către coleg, fără sursa venitului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce dovedește captura colegului?",
      "explanation": "Nu extinzi o dovadă punctuală la promisiunea generală.",
      "correctFeedback": "Corect. Nu extinzi o dovadă punctuală la promisiunea generală.",
      "incorrectFeedback": "Nu chiar. Nu extinzi o dovadă punctuală la promisiunea generală.",
      "caseId": "caz-piramide-si-scheme-bani-rapizi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Profit garantat pentru toți."
        },
        {
          "id": "1",
          "label": "Cel mult o plată aparentă, nu mecanismul sustenabil."
        },
        {
          "id": "2",
          "label": "Creștere nelimitată a participanților."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce alegere limitează transferul riscului?",
      "explanation": "Recuperarea personală nu justifică expunerea altora la un mecanism neclar.",
      "correctFeedback": "Corect. Recuperarea personală nu justifică expunerea altora la un mecanism neclar.",
      "incorrectFeedback": "Nu chiar. Recuperarea personală nu justifică expunerea altora la un mecanism neclar.",
      "caseId": "caz-piramide-si-scheme-bani-rapizi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Recrutează cât mai repede fără explicații."
        },
        {
          "id": "1",
          "label": "Ascunde condițiile noilor participanți."
        },
        {
          "id": "2",
          "label": "Nu invită prieteni pentru a recupera o plată."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Presiunea poate veni prin prieteni, ceea ce face refuzul mai dificil. Poți respecta persoana și totuși să ceri documente și o explicație verificabilă. Nu recruta pe alții numai ca să recuperezi o sumă deja plătită. Aceasta poate transfera riscul către oameni apropiați fără să repare mecanismul.",
        "Înainte de bani, caută identitatea operatorului și verificări independente potrivite activității. Nu folosi un verdict juridic inventat pentru orice model comercial, dar tratează lipsa sursei reale, promisiunea fără risc și recrutarea obligatorie ca semnale. O pauză și refuzul unei informații neclare păstrează controlul deciziei."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Invitația vine de la un prieten. Ce se schimbă în verificare?",
      "explanation": "Relația nu este o garanție a activității.",
      "correctFeedback": "Corect. Relația nu este o garanție a activității.",
      "incorrectFeedback": "Nu chiar. Relația nu este o garanție a activității.",
      "type": "scenariu",
      "context": "Nu vrei să rănești relația.",
      "options": [
        {
          "id": "0",
          "label": "Păstrezi respectul și aceleași întrebări despre mecanism."
        },
        {
          "id": "1",
          "label": "Renunți la documente."
        },
        {
          "id": "2",
          "label": "Consideri orice prieten o autoritate financiară."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Produsul există. Ce mai verifici?",
      "explanation": "Un produs poate fi folosit ca decor al unei scheme.",
      "correctFeedback": "Corect. Un produs poate fi folosit ca decor al unei scheme.",
      "incorrectFeedback": "Nu chiar. Un produs poate fi folosit ca decor al unei scheme.",
      "type": "scenariu",
      "context": "Modelul se bazează pe participanți plătitori.",
      "options": [
        {
          "id": "0",
          "label": "Doar numele produsului."
        },
        {
          "id": "1",
          "label": "Cererea reală și venitul fără recrutare obligatorie."
        },
        {
          "id": "2",
          "label": "Doar un slogan de independență."
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
          "title": "Sursa",
          "body": "Cere explicația banilor fără recrutări noi.",
          "detail": "O captură cu o plată către coleg nu arată cine finanțează câștigurile următoare. Verifică dacă există clienți care cumpără pentru utilitate, fără să fie obligați să aducă alți participanți.",
          "type": "normal",
          "detailHighlights": [
            "participanți",
            "plată"
          ]
        },
        {
          "id": "idee-1",
          "title": "Dovezi",
          "body": "O plată nu garantează sustenabilitatea.",
          "type": "normal",
          "detail": "O captură cu un câștig arată cel mult o plată, nu cum vor fi finanțați următorii participanți.",
          "detailHighlights": [
            "participanți",
            "plată"
          ]
        },
        {
          "id": "idee-2",
          "title": "Prieteni",
          "body": "Nu transfera riscul pentru a recupera o sumă.",
          "type": "normal",
          "detail": "Invitarea prietenilor pentru a recupera banii poate muta pierderea la ei. Oprește recrutarea și păstrează dovezile.",
          "detailHighlights": [
            "pierderea",
            "dovezile"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "La o promisiune de bani rapizi, formulează întrebarea despre sursa venitului și verifică dacă primești un răspuns concret.",
          "type": "action",
          "detail": "Întreabă cine cumpără produsul pentru utilitate, fără recrutare. Un răspuns care revine doar la membri noi nu explică venitul sustenabil.",
          "detailHighlights": [
            "recrutare",
            "venitul"
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
