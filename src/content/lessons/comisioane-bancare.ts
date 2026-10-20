import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "comisioane-bancare",
  "title": "Comisioane bancare",
  "categoryId": "carduri-si-banca",
  "chapterId": "contul-tau",
  "slug": "comisioane-bancare",
  "description": "Mara vede un transfer gratuit și o retragere cu taxă. Gratuitatea unei operațiuni nu descrie întregul cont.",
  "objective": "Să poți observa comisioanele care pot afecta costul unui cont sau al unei operațiuni.",
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
      "title": "Comisioane bancare",
      "body": "Mara vede un transfer gratuit și o retragere cu taxă. Gratuitatea unei operațiuni nu descrie întregul cont."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un comision este un cost pentru un serviciu, conform condițiilor produsului. Poate fi fix, procentual sau condiționat de modul folosirii contului. Administrarea, retragerile, transferurile și schimbul valutar pot avea reguli diferite. Nu presupune că toate costurile dispar dacă o reclamă spune că plata cu cardul este gratuită.",
        "Caută tariful pentru operațiunea exactă: canalul folosit, moneda, suma și instituția implicată. Aceeași persoană poate plăti costuri diferite pentru două operațiuni aparent asemănătoare. Informația relevantă este suma finală aplicabilă scenariului tău, nu numai numele serviciului."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici la un comision?",
      "explanation": "Tariful depinde de scenariul efectiv.",
      "correctFeedback": "Corect. Tariful depinde de scenariul efectiv.",
      "incorrectFeedback": "Nu chiar. Tariful depinde de scenariul efectiv.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Operațiunea exactă, baza și condițiile."
        },
        {
          "id": "1",
          "label": "Doar procentul, fără minimumul pe operațiune."
        },
        {
          "id": "2",
          "label": "Doar gratuitatea altui serviciu."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un transfer gratuit face automat retragerile gratuite.",
      "explanation": "Operațiunile pot avea tarife separate.",
      "correctFeedback": "Corect. Operațiunile pot avea tarife separate.",
      "incorrectFeedback": "Nu chiar. Operațiunile pot avea tarife separate.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu ipotetic, retragerea are comision de 1%, minimum 5 lei. Pentru 100 lei, un procent înseamnă 1 leu, dar minimul face costul 5 lei. Pentru 800 lei, procentul înseamnă 8 lei, peste minimum. Tariful real trebuie verificat; cifrele sunt doar un exercițiu de interpretare.",
        "La un cost fix pe operațiune, frecvența contează. Patru operațiuni de câte 5 lei adaugă 20 lei. Compară un scenariu realist pentru o lună, fără să presupui că retragerile mai mari sunt mereu potrivite. Accesul la numerar și siguranța păstrării lui contează separat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "La 1%, minimum 5 lei, ce cost are retragerea de 100 lei?",
      "explanation": "Minimumul depășește procentul calculat.",
      "correctFeedback": "Corect. Minimumul depășește procentul calculat.",
      "incorrectFeedback": "Nu chiar. Minimumul depășește procentul calculat.",
      "type": "scenariu",
      "context": "Tariful este ipotetic.",
      "options": [
        {
          "id": "0",
          "label": "1 leu."
        },
        {
          "id": "1",
          "label": "5 lei."
        },
        {
          "id": "2",
          "label": "100 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "La același tarif, ce cost are retragerea de 800 lei?",
      "explanation": "Un procent din 800 este 8, peste minimum.",
      "correctFeedback": "Corect. Un procent din 800 este 8, peste minimum.",
      "incorrectFeedback": "Nu chiar. Un procent din 800 este 8, peste minimum.",
      "type": "scenariu",
      "context": "Aplici condițiile din exemplu.",
      "options": [
        {
          "id": "0",
          "label": "5 lei."
        },
        {
          "id": "1",
          "label": "80 lei."
        },
        {
          "id": "2",
          "label": "8 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-comisioane-bancare",
      "paragraphs": [
        "Mara folosește un cont pentru bursa de student. Într-un exercițiu, transferul prin aplicație nu costă, dar retragerea la un anumit bancomat are comision de 1%, minimum 5 lei. Ea retrage 100 lei de patru ori într-o lună și vede patru costuri de câte 5 lei. Inițial crede că totalul ar trebui să fie doar 4 lei.",
        "Mara recitește tariful și observă minimumul aplicat fiecărei operațiuni. Calculează costul lunar de 20 lei și verifică alternativele disponibile, fără să transforme exercițiul într-o recomandare de retragere a unei sume mari. Mai urmărește condiția de administrare gratuită, pentru că bursa nu intră în fiecare lună. Dacă apare un cost neexplicat, cere băncii detaliile prin canalul oficial. Ea compară costul, accesul și siguranța, nu numai cuvântul gratuit din oferta inițială."
      ]
    },
    {
      "id": "q5",
      "question": "Cât costă cele patru retrageri ale Marei?",
      "explanation": "Patru minimumuri de 5 lei însumează 20 lei.",
      "correctFeedback": "Corect. Patru minimumuri de 5 lei însumează 20 lei.",
      "incorrectFeedback": "Nu chiar. Patru minimumuri de 5 lei însumează 20 lei.",
      "caseId": "caz-comisioane-bancare",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "20 lei."
        },
        {
          "id": "1",
          "label": "4 lei."
        },
        {
          "id": "2",
          "label": "5 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "De ce comparația inițială era incompletă?",
      "explanation": "Procentul și pragul se aplică împreună.",
      "correctFeedback": "Corect. Procentul și pragul se aplică împreună.",
      "incorrectFeedback": "Nu chiar. Procentul și pragul se aplică împreună.",
      "caseId": "caz-comisioane-bancare",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Confunda comisionul retragerii cu cel al administrării."
        },
        {
          "id": "1",
          "label": "Ignora minimumul pe fiecare operațiune."
        },
        {
          "id": "2",
          "label": "Aplica minimumul o singură dată pentru toate retragerile."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce verifică în lunile fără bursă?",
      "explanation": "O condiție neîndeplinită poate modifica un cost.",
      "correctFeedback": "Corect. O condiție neîndeplinită poate modifica un cost.",
      "incorrectFeedback": "Nu chiar. O condiție neîndeplinită poate modifica un cost.",
      "caseId": "caz-comisioane-bancare",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Presupune că oferta nu se poate schimba niciodată."
        },
        {
          "id": "1",
          "label": "Elimină comisioanele din evidență."
        },
        {
          "id": "2",
          "label": "Condiția gratuității și tariful aplicabil."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O gratuitate poate depinde de o încasare, de un număr de plăți ori de un canal. Dacă situația ta se schimbă, verifică ce tarif se aplică după schimbare. Nu inventa costuri ascunse, dar nici nu ignora condițiile înscrise într-un document. Cere o explicație când nu înțelegi baza comisionului.",
        "În extras, leagă comisionul de operațiune și verifică data. Un rând separat nu înseamnă automat fraudă, iar o sumă mică nu înseamnă că trebuie ignorată. Păstrează tariful relevant și solicită clarificarea prin banca ta dacă suma nu se potrivește condițiilor cunoscute."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un rând din extras pare neclar. Ce faci?",
      "explanation": "Datele și condițiile preced concluzia.",
      "correctFeedback": "Corect. Datele și condițiile preced concluzia.",
      "incorrectFeedback": "Nu chiar. Datele și condițiile preced concluzia.",
      "type": "scenariu",
      "context": "Nu recunoști baza comisionului.",
      "options": [
        {
          "id": "0",
          "label": "Îl legi de operațiune și ceri explicația băncii."
        },
        {
          "id": "1",
          "label": "Îl declari automat fraudă."
        },
        {
          "id": "2",
          "label": "Îl ignori fiindcă este mic."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Cum compari două conturi?",
      "explanation": "Costul utilizării reale este mai relevant decât un singur slogan.",
      "correctFeedback": "Corect. Costul utilizării reale este mai relevant decât un singur slogan.",
      "incorrectFeedback": "Nu chiar. Costul utilizării reale este mai relevant decât un singur slogan.",
      "type": "scenariu",
      "context": "Ai frecvențe diferite de retragere și transfer.",
      "options": [
        {
          "id": "0",
          "label": "Numai după un serviciu gratuit."
        },
        {
          "id": "1",
          "label": "După operațiunile tale și costul lunar estimat."
        },
        {
          "id": "2",
          "label": "Numai după procent, fără costuri fixe și frecvență."
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
          "title": "Operațiunea",
          "body": "Tarifele diferă între servicii.",
          "detail": "Un transfer gratuit nu stabilește tariful retragerilor. Caută costul pentru operațiunea, moneda și canalul pe care le folosești.",
          "type": "normal",
          "detailHighlights": [
            "operațiunea",
            "tariful"
          ]
        },
        {
          "id": "idee-1",
          "title": "Praguri",
          "body": "Un minimum poate depăși procentul.",
          "detail": "La tariful ipotetic de 1%, minimum 5 lei, o retragere de 100 lei costă 5 lei. Patru retrageri separate costă 20 lei, fiindcă minimumul se aplică de fiecare dată.",
          "type": "normal",
          "detailHighlights": [
            "retragere",
            "tariful"
          ]
        },
        {
          "id": "idee-2",
          "title": "Frecvență",
          "body": "Costurile mici pe operațiune se adună.",
          "type": "normal",
          "detail": "Mai multe retrageri pot genera mai multe comisioane fixe. Calculează după frecvența ta reală, fără să retragi inutil bani în plus.",
          "detailHighlights": [
            "comisioane",
            "frecvența"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Găsește tariful unei operațiuni pe care o folosești și verifică dacă are cost fix, procent sau minimum.",
          "type": "action",
          "detail": "Notează și canalul operațiunii: tariful din aplicație poate diferi de cel de la ghișeu sau de la alt bancomat.",
          "detailHighlights": [
            "tariful"
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
