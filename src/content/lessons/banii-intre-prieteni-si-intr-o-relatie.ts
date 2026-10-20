import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "banii-intre-prieteni-si-intr-o-relatie",
  "title": "Banii între prieteni și într-o relație",
  "categoryId": "pe-cont-propriu",
  "chapterId": "viata-de-zi-cu-zi",
  "slug": "banii-intre-prieteni-si-intr-o-relatie",
  "description": "Lia și Dan au o factură comună de 300 lei.",
  "objective": "Să poți explica banii între prieteni și într-o relație și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "ASF · Ghid RCA",
    "url": "https://asfromania.ro/files/Ghid_RCA.pdf"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Banii între prieteni și într-o relație",
      "body": "Lia și Dan au o factură comună de 300 lei."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Banii împărțiți cer acorduri clare despre sume, scop și termen. O contribuție egală nu este singura variantă posibilă; persoanele pot conveni o împărțire proporțională sau altă regulă explicită. Un împrumut și un cadou sunt diferite. Nu presupune că apropierea personală elimină nevoia de claritate și nici că trebuie să accepți orice presiune.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce clarifici la bani oferiți altcuiva?",
      "explanation": "Scopul, suma și dacă sunt cadou sau împrumut.",
      "correctFeedback": "Corect. Scopul, suma și dacă sunt cadou sau împrumut.",
      "incorrectFeedback": "Nu chiar. Scopul, suma și dacă sunt cadou sau împrumut.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Scopul, suma și dacă sunt cadou sau împrumut."
        },
        {
          "id": "1",
          "label": "Doar data conversației."
        },
        {
          "id": "2",
          "label": "Doar prietenii comuni."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Dacă Lia achită temporar factura comună, plata nu devine automat un cadou pentru Dan.",
      "explanation": "Plata făcută de o persoană și contribuția datorată de cealaltă sunt distincte. Clarificați regula și dacă suma trebuie rambursată.",
      "correctFeedback": "Corect. Plata făcută de o persoană și contribuția datorată de cealaltă sunt distincte. Clarificați regula și dacă suma trebuie rambursată.",
      "incorrectFeedback": "Nu chiar. Plata făcută de o persoană și contribuția datorată de cealaltă sunt distincte. Clarificați regula și dacă suma trebuie rambursată.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Doi colegi au o factură comună de 300 lei și aleg să împartă egal: 150 fiecare. Dacă au convenit o regulă de două treimi și o treime, sumele ar fi 200 și 100. Regula trebuie discutată înainte. O persoană care plătește integral temporar notează contribuțiile datorate, fără să transforme automat plata într-un cadou.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Doi colegi au convenit împărțirea egală a facturii de 300 lei. Unul achită integral. Ce contribuție rămâne de rambursat de celălalt?",
      "explanation": "În acordul egal, fiecare suportă 150 lei. Cel care a achitat temporar tot primește contribuția celuilalt, fără să numere plata ca un cadou.",
      "correctFeedback": "Corect. În acordul egal, fiecare suportă 150 lei. Cel care a achitat temporar tot primește contribuția celuilalt, fără să numere plata ca un cadou.",
      "incorrectFeedback": "Nu chiar. În acordul egal, fiecare suportă 150 lei. Cel care a achitat temporar tot primește contribuția celuilalt, fără să numere plata ca un cadou.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "100 lei."
        },
        {
          "id": "1",
          "label": "150 lei."
        },
        {
          "id": "2",
          "label": "300 lei fiecare."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Două treimi din 300 lei înseamnă cât?",
      "explanation": "200 lei.",
      "correctFeedback": "Corect. 200 lei.",
      "incorrectFeedback": "Nu chiar. 200 lei.",
      "type": "scenariu",
      "context": "Doi colegi au o factură comună de 300 lei și aleg să împartă egal: 150 fiecare. Dacă au convenit o regulă de două treimi și o treime, sumele ar fi 200 și 100. Regula trebuie discutată înainte. O persoană care plătește integral temporar notează contribuțiile datorate, fără să transforme automat plata într-un cadou.",
      "options": [
        {
          "id": "0",
          "label": "150 lei."
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
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-banii-intre-prieteni-si-intr-o-relatie",
      "paragraphs": [
        "Lia și Dan au o factură comună de 300 lei. Lia o achită și presupune că fiecare contribuie cu 150, dar Dan credea că folosesc o altă proporție. Discută regula și notează suma fiecăruia pentru viitor. Lia mai clarifică dacă o sumă oferită anterior era împrumut sau cadou. Nu trimite parola bancară pentru a demonstra că are încredere.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Doi colegi au o factură comună de 300 lei și aleg să împartă egal: 150 fiecare. Dacă au convenit o regulă de două treimi și o treime, sumele ar fi 200 și 100. Regula trebuie discutată înainte. O persoană care plătește integral temporar notează contribuțiile datorate, fără să transforme automat plata într-un cadou. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce a lipsit înainte de plata Liei?",
      "explanation": "Acordul asupra regulii de împărțire.",
      "correctFeedback": "Corect. Acordul asupra regulii de împărțire.",
      "incorrectFeedback": "Nu chiar. Acordul asupra regulii de împărțire.",
      "caseId": "caz-banii-intre-prieteni-si-intr-o-relatie",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Acordul asupra regulii de împărțire."
        },
        {
          "id": "1",
          "label": "Existența facturii."
        },
        {
          "id": "2",
          "label": "Confirmarea că Lia poate achita temporar, presupunând că stabilește singură contribuția lui Dan."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce clarifică despre suma anterioară?",
      "explanation": "Dacă era împrumut sau cadou.",
      "correctFeedback": "Corect. Dacă era împrumut sau cadou.",
      "incorrectFeedback": "Nu chiar. Dacă era împrumut sau cadou.",
      "caseId": "caz-banii-intre-prieteni-si-intr-o-relatie",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar faptul că suma a fost trimisă, fără condițiile returnării."
        },
        {
          "id": "1",
          "label": "Dacă era împrumut sau cadou."
        },
        {
          "id": "2",
          "label": "Doar apropierea dintre ei, presupunând că exclude rambursarea."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce protejează chiar într-o relație apropiată?",
      "explanation": "Parolele și controlul conturilor personale.",
      "correctFeedback": "Corect. Parolele și controlul conturilor personale.",
      "incorrectFeedback": "Nu chiar. Parolele și controlul conturilor personale.",
      "caseId": "caz-banii-intre-prieteni-si-intr-o-relatie",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar dreptul de a vedea soldul, oferind acces pentru plăți."
        },
        {
          "id": "1",
          "label": "Doar acordul despre sume, fără limite privind accesul la cont."
        },
        {
          "id": "2",
          "label": "Parolele și controlul conturilor personale."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu oferi acces la parole, PIN sau conturi ca dovadă de încredere. Poți discuta contribuțiile fără să renunți la controlul datelor personale. Dacă un împrumut nu este rambursat, clarifică situația și documentele, evitând promisiuni noi fără evaluare. Stabilește limite despre sumele pe care le poți oferi fără să afectezi obligațiile necesare.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ți se cere PIN-ul ca dovadă de încredere. Ce faci?",
      "explanation": "Păstrezi PIN-ul privat și discuți limita.",
      "correctFeedback": "Corect. Păstrezi PIN-ul privat și discuți limita.",
      "incorrectFeedback": "Nu chiar. Păstrezi PIN-ul privat și discuți limita.",
      "type": "scenariu",
      "context": "Doi colegi au o factură comună de 300 lei și aleg să împartă egal: 150 fiecare. Dacă au convenit o regulă de două treimi și o treime, sumele ar fi 200 și 100. Regula trebuie discutată înainte. O persoană care plătește integral temporar notează contribuțiile datorate, fără să transforme automat plata într-un cadou.",
      "options": [
        {
          "id": "0",
          "label": "Păstrezi PIN-ul privat și discuți limita."
        },
        {
          "id": "1",
          "label": "Îl trimiți imediat."
        },
        {
          "id": "2",
          "label": "Îl publici pentru amândoi."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un împrumut nou afectează chiria ta. Ce verifici?",
      "explanation": "Limita pe care o poți susține și obligațiile necesare.",
      "correctFeedback": "Corect. Limita pe care o poți susține și obligațiile necesare.",
      "incorrectFeedback": "Nu chiar. Limita pe care o poți susține și obligațiile necesare.",
      "type": "scenariu",
      "context": "Doi colegi au o factură comună de 300 lei și aleg să împartă egal: 150 fiecare. Dacă au convenit o regulă de două treimi și o treime, sumele ar fi 200 și 100. Regula trebuie discutată înainte. O persoană care plătește integral temporar notează contribuțiile datorate, fără să transforme automat plata într-un cadou.",
      "options": [
        {
          "id": "0",
          "label": "Doar dorința de a evita o discuție."
        },
        {
          "id": "1",
          "label": "Limita pe care o poți susține și obligațiile necesare."
        },
        {
          "id": "2",
          "label": "Presupui că banii vor reveni mâine."
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
          "body": "Stabiliți clar suma, scopul și termenul banilor împărțiți.",
          "detail": "Lia achită factura, dar ea și Dan nu conveniseră aceeași regulă de împărțire. Plata temporară nu decide singură contribuțiile și nu transformă automat suma într-un cadou.",
          "type": "normal",
          "detailHighlights": [
            "contribuțiile",
            "împărțire"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Regula de împărțire se discută înainte de plată.",
          "type": "normal",
          "detail": "Împărțirea egală și împărțirea după utilizare pot duce la sume diferite. Acordul se face înainte de plată.",
          "detailHighlights": [
            "utilizare",
            "plată"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Încrederea nu cere parole, PIN sau acces la cont.",
          "type": "normal",
          "detail": "Încrederea nu cere acces la parole sau PIN. Puteți clarifica o contribuție fără să împărțiți conturile.",
          "detailHighlights": [
            "parole",
            "acces"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Formulează un acord fictiv despre suma, termenul și regula unei cheltuieli comune.",
          "type": "action",
          "detail": "Scrie dacă suma este cadou, împrumut sau contribuție și ce termen ați convenit. Evitați presupunerile diferite.",
          "detailHighlights": [
            "împrumut",
            "termen"
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
