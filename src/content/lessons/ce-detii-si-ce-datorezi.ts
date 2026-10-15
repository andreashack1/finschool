import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "ce-detii-si-ce-datorezi",
  "title": "Ce deții și ce datorezi",
  "categoryId": "cuvintele-banilor",
  "chapterId": "bazele",
  "slug": "ce-detii-si-ce-datorezi",
  "description": "Daria are un laptop, 700 lei în cont și o sumă împrumutată de la un prieten. Ce imagine oferă toate împreună?",
  "objective": "Să poți diferenția lucrurile pe care le deții de obligațiile pe care trebuie să le plătești și să înțelegi de ce diferența contează.",
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
      "title": "Ce deții și ce datorezi",
      "body": "Daria are un laptop, 700 lei în cont și o sumă împrumutată de la un prieten. Ce imagine oferă toate împreună?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Ce deții include bani și bunuri care îți aparțin. Ce datorezi include obligații de plată către alte persoane sau instituții. Sunt două liste diferite. Un laptop cumpărat cu bani împrumutați poate apărea în prima listă, iar suma de rambursat în a doua. Existența bunului nu face datoria să dispară.",
        "Diferența dintre valoarea bunurilor și obligații oferă o imagine simplificată a poziției financiare. Nu este același lucru cu banii disponibili astăzi. Un bun poate avea valoare, dar vânzarea lui durează sau te lasă fără ceva necesar pentru școală ori muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Unde intră suma de rambursat unui prieten?",
      "explanation": "Un împrumut personal rămâne o datorie.",
      "correctFeedback": "Corect. Un împrumut personal rămâne o datorie.",
      "incorrectFeedback": "Nu chiar. Un împrumut personal rămâne o datorie.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "La obligații de plată."
        },
        {
          "id": "1",
          "label": "La venit sigur."
        },
        {
          "id": "2",
          "label": "La bunuri deținute."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Laptopul și împrumutul pentru el pot exista simultan în cele două liste.",
      "explanation": "Deținerea bunului nu elimină obligația de rambursare.",
      "correctFeedback": "Corect. Deținerea bunului nu elimină obligația de rambursare.",
      "incorrectFeedback": "Nu chiar. Deținerea bunului nu elimină obligația de rambursare.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pentru o comparație realistă, folosește o valoare actuală estimată a bunurilor, nu automat prețul de cumpărare. Un laptop de 3.000 lei poate fi revândut cu mai puțin după utilizare. Valoarea exactă depinde de stare și de piață; exemplul nu este o evaluare oficială.",
        "La datorii contează atât suma rămasă, cât și termenele. Două persoane pot datora aceeași sumă, dar una trebuie să plătească mâine și alta în câteva luni. De aceea, imaginea generală și capacitatea de a plăti la timp trebuie analizate separat. Nu vinde în minte bunuri la un preț încă neconfirmat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ce valoare folosești într-o estimare actuală?",
      "explanation": "Valoarea actuală poate diferi de prețul plătit.",
      "correctFeedback": "Corect. Valoarea actuală poate diferi de prețul plătit.",
      "incorrectFeedback": "Nu chiar. Valoarea actuală poate diferi de prețul plătit.",
      "type": "scenariu",
      "context": "Îți inventariezi bunurile folosite.",
      "options": [
        {
          "id": "0",
          "label": "Întotdeauna prețul nou."
        },
        {
          "id": "1",
          "label": "O valoare de revânzare realistă, cu incertitudine."
        },
        {
          "id": "2",
          "label": "Prețul cel mai mare găsit vreodată."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Două datorii egale au termene diferite. Ce se schimbă?",
      "explanation": "Termenul afectează planificarea lichidității.",
      "correctFeedback": "Corect. Termenul afectează planificarea lichidității.",
      "incorrectFeedback": "Nu chiar. Termenul afectează planificarea lichidității.",
      "type": "scenariu",
      "context": "Una trebuie plătită mâine, cealaltă peste trei luni.",
      "options": [
        {
          "id": "0",
          "label": "Suma se dublează automat."
        },
        {
          "id": "1",
          "label": "Datoria cu termen mai lung dispare."
        },
        {
          "id": "2",
          "label": "Presiunea asupra banilor disponibili în perioada apropiată."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-ce-detii-si-ce-datorezi",
      "paragraphs": [
        "Daria începe facultatea și folosește un laptop cumpărat anul trecut cu 2.800 lei. Pentru exercițiu estimează că l-ar putea vinde acum cu 1.800 lei. Are 700 lei în cont și îi datorează unui prieten 500 lei, împrumutați pentru o reparație. Prietenul are nevoie de bani în două săptămâni. Daria nu are alte obligații în acest exemplu.",
        "Ea adună valoarea estimată a laptopului și banii din cont, apoi scade datoria. Rezultatul arată bine, dar laptopul este necesar pentru seminare și nu are un cumpărător confirmat. Daria își propune să separe imaginea generală de planul pentru rambursare. Verifică ce bani intră înainte de termen și ce cheltuieli esențiale are până atunci. Dacă planul nu ajunge, discută din timp cu prietenul, fără să presupună că un bun nevândut este deja numerar."
      ]
    },
    {
      "id": "q5",
      "question": "Care este diferența simplificată din cazul Dariei?",
      "explanation": "1.800 + 700 − 500 = 2.000 lei.",
      "correctFeedback": "Corect. 1.800 + 700 − 500 = 2.000 lei.",
      "incorrectFeedback": "Nu chiar. 1.800 + 700 − 500 = 2.000 lei.",
      "caseId": "caz-ce-detii-si-ce-datorezi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "2.000 lei."
        },
        {
          "id": "1",
          "label": "2.500 lei."
        },
        {
          "id": "2",
          "label": "700 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce informație contează pentru plata peste două săptămâni?",
      "explanation": "Capacitatea de plată depinde de bani disponibili la termen.",
      "correctFeedback": "Corect. Capacitatea de plată depinde de bani disponibili la termen.",
      "incorrectFeedback": "Nu chiar. Capacitatea de plată depinde de bani disponibili la termen.",
      "caseId": "caz-ce-detii-si-ce-datorezi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Valoarea tuturor bunurilor, fără termenele de vânzare."
        },
        {
          "id": "1",
          "label": "Intrările și cheltuielile înainte de scadență."
        },
        {
          "id": "2",
          "label": "Venitul așteptat după scadență, fără banii disponibili până atunci."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce nu tratează laptopul ca numerar?",
      "explanation": "Valoarea estimată nu este o încasare confirmată.",
      "correctFeedback": "Corect. Valoarea estimată nu este o încasare confirmată.",
      "incorrectFeedback": "Nu chiar. Valoarea estimată nu este o încasare confirmată.",
      "caseId": "caz-ce-detii-si-ce-datorezi",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Bunurile nu au niciodată valoare."
        },
        {
          "id": "1",
          "label": "Datoria este deja anulată."
        },
        {
          "id": "2",
          "label": "Nu este vândut și îi este necesar la facultate."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un telefon util nu devine automat o investiție doar pentru că îl deții. Poate ajuta la muncă, poate servi distracției și poate pierde valoare în timp. Nu ai nevoie de etichete rigide ca să faci o listă clară. Întrebarea practică este ce valoare și ce utilizare are acum.",
        "La fel, un împrumut de la un prieten rămâne o obligație chiar dacă nu vine printr-o aplicație bancară. Clarifică suma, termenul și înțelegerea dintre voi. Nu confunda o poziție financiară pozitivă pe hârtie cu posibilitatea imediată de a rambursa fiecare datorie."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Radu deține bunuri valoroase, dar nu poate plăti o factură mâine. Ce lipsește?",
      "explanation": "Valoarea totală și lichiditatea imediată sunt diferite.",
      "correctFeedback": "Corect. Valoarea totală și lichiditatea imediată sunt diferite.",
      "incorrectFeedback": "Nu chiar. Valoarea totală și lichiditatea imediată sunt diferite.",
      "type": "scenariu",
      "context": "Bunurile nu se pot vinde până mâine.",
      "options": [
        {
          "id": "0",
          "label": "Bani disponibili la momentul necesar."
        },
        {
          "id": "1",
          "label": "O listă cu prețuri mai mari."
        },
        {
          "id": "2",
          "label": "Mai multe obiecte cumpărate pe credit."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un plan de rambursare nu ajunge. Care este un pas util?",
      "explanation": "Comunicarea și datele reale ajută un plan responsabil.",
      "correctFeedback": "Corect. Comunicarea și datele reale ajută un plan responsabil.",
      "incorrectFeedback": "Nu chiar. Comunicarea și datele reale ajută un plan responsabil.",
      "type": "scenariu",
      "context": "Ai o datorie către o persoană apropiată.",
      "options": [
        {
          "id": "0",
          "label": "Ascunzi obligația fiindcă deții un telefon."
        },
        {
          "id": "1",
          "label": "Clarifici din timp suma, termenul și opțiunile cu creditorul."
        },
        {
          "id": "2",
          "label": "Presupui că termenul nu contează."
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
          "title": "Două liste",
          "body": "Bunurile și obligațiile se notează separat.",
          "detail": "Daria poate avea un laptop valoros și o datorie de plătit în două săptămâni. Bunul nevândut nu este numerar pentru scadență, chiar dacă poziția ei financiară pe hârtie este pozitivă.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Valoare actuală",
          "body": "Prețul plătit nu este garantat la revânzare.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Acces la bani",
          "body": "Un bun valoros nu plătește automat o factură mâine.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Fă două liste private: trei lucruri pe care le deții și obligațiile de plată pe care le ai, dacă există.",
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
