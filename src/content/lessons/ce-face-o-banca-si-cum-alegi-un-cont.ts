import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "ce-face-o-banca-si-cum-alegi-un-cont",
  "title": "Ce face o bancă și cum alegi un cont",
  "categoryId": "carduri-si-banca",
  "chapterId": "contul-tau",
  "slug": "ce-face-o-banca-si-cum-alegi-un-cont",
  "description": "Vlad compară două conturi: unul promite administrare gratuită, dar cere condiții pe care el nu le îndeplinește.",
  "objective": "Să poți identifica serviciile de bază ale unei bănci și criteriile relevante când compari două conturi.",
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
      "title": "Ce face o bancă și cum alegi un cont",
      "body": "Vlad compară două conturi: unul promite administrare gratuită, dar cere condiții pe care el nu le îndeplinește."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O bancă comercială poate oferi conturi, plăți, depozite și credite, în condiții distincte pentru fiecare serviciu. Contul curent te ajută să primești și să trimiți bani și să urmărești tranzacții. Cardul este un instrument legat de un cont sau de o facilitate, nu același lucru cu toate serviciile băncii.",
        "Când alegi un cont, începe cu operațiunile pe care le vei face: încasare, transferuri, plăți, numerar sau schimb valutar. O ofertă poate fi convenabilă pentru un tip de utilizare și mai scumpă pentru altul. Lista nevoilor este mai utilă decât alegerea doar după popularitate."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Cu ce începi compararea conturilor?",
      "explanation": "Utilizarea concretă determină criteriile relevante.",
      "correctFeedback": "Corect. Utilizarea concretă determină criteriile relevante.",
      "incorrectFeedback": "Nu chiar. Utilizarea concretă determină criteriile relevante.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Operațiunile și serviciile de care ai nevoie."
        },
        {
          "id": "1",
          "label": "Doar numărul prietenilor la bancă."
        },
        {
          "id": "2",
          "label": "Doar forma cardului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Administrarea gratuită înseamnă automat toate operațiunile gratuite.",
      "explanation": "Serviciile pot avea condiții și costuri separate.",
      "correctFeedback": "Corect. Serviciile pot avea condiții și costuri separate.",
      "incorrectFeedback": "Nu chiar. Serviciile pot avea condiții și costuri separate.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "„Gratuit” poate privi un serviciu sau poate depinde de condiții. Citește ce se întâmplă dacă nu mai intră venitul cerut ori dacă nu folosești contul conform ofertei. Nu presupune că toate operațiunile devin gratuite fiindcă administrarea nu costă. Retragerile, transferurile sau schimbul pot avea reguli separate.",
        "Pentru exercițiu, un cont costă 10 lei lunar dacă o condiție nu este îndeplinită. Aceasta înseamnă 120 lei într-un an, înainte de alte costuri. Compară scenariul tău realist, nu doar scenariul perfect din reclamă. Oferta concretă trebuie verificată în documentele instituției."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "10 lei lunar într-un an înseamnă cât?",
      "explanation": "10 × 12 = 120 lei în exemplul ipotetic.",
      "correctFeedback": "Corect. 10 × 12 = 120 lei în exemplul ipotetic.",
      "incorrectFeedback": "Nu chiar. 10 × 12 = 120 lei în exemplul ipotetic.",
      "type": "scenariu",
      "context": "Condiția de gratuitate nu este îndeplinită tot anul.",
      "options": [
        {
          "id": "0",
          "label": "10 lei."
        },
        {
          "id": "1",
          "label": "120 lei."
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
      "question": "Venitul tău este neregulat. Ce verifici la o gratuitate condiționată?",
      "explanation": "Condiția trebuie comparată cu situația realistă.",
      "correctFeedback": "Corect. Condiția trebuie comparată cu situația realistă.",
      "incorrectFeedback": "Nu chiar. Condiția trebuie comparată cu situația realistă.",
      "type": "scenariu",
      "context": "Oferta cere o încasare eligibilă.",
      "options": [
        {
          "id": "0",
          "label": "Doar sloganul gratuit."
        },
        {
          "id": "1",
          "label": "Presupui că toate veniturile se califică."
        },
        {
          "id": "2",
          "label": "Ce se întâmplă în lunile fără încasarea cerută."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-ce-face-o-banca-si-cum-alegi-un-cont",
      "paragraphs": [
        "Vlad caută un cont pentru bursa și plățile sale de student. Prima ofertă spune administrare gratuită dacă există o încasare de un anumit tip, iar în lipsa ei costă ipotetic 10 lei lunar. A doua are altă structură de costuri și include operațiunile pe care Vlad le folosește. El nu știe încă dacă bursa lui îndeplinește condiția primei oferte.",
        "Vlad scrie câte transferuri și retrageri face într-o lună, apoi cere clarificarea condiției și verifică documentele. Nu presupune că numele „student” elimină orice comision. Mai testează informativ dacă aplicația este potrivită nevoilor lui și unde poate cere ajutor. Calculează costul unui an în scenariul în care condiția nu este îndeplinită. Astfel compară oferte pentru propriile operațiuni, fără a primi din lecție recomandarea unui cont sau a unei instituții anume."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce informație îi lipsește lui Vlad?",
      "explanation": "Condiția neclară poate schimba costul contului.",
      "correctFeedback": "Corect. Condiția neclară poate schimba costul contului.",
      "incorrectFeedback": "Nu chiar. Condiția neclară poate schimba costul contului.",
      "caseId": "caz-ce-face-o-banca-si-cum-alegi-un-cont",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Dacă bursa îndeplinește condiția contului."
        },
        {
          "id": "1",
          "label": "Culoarea băncii centrale."
        },
        {
          "id": "2",
          "label": "Prețul unui credit necerut."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "De ce listează retragerile și transferurile?",
      "explanation": "Comparația privește întregul scenariu de utilizare.",
      "correctFeedback": "Corect. Comparația privește întregul scenariu de utilizare.",
      "incorrectFeedback": "Nu chiar. Comparația privește întregul scenariu de utilizare.",
      "caseId": "caz-ce-face-o-banca-si-cum-alegi-un-cont",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ca să aleagă orice cont popular."
        },
        {
          "id": "1",
          "label": "Ca să compare costurile serviciilor folosite."
        },
        {
          "id": "2",
          "label": "Ca să ignore administrarea."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce completează comparația prețurilor?",
      "explanation": "Un serviciu trebuie să fie și potrivit utilizării.",
      "correctFeedback": "Corect. Un serviciu trebuie să fie și potrivit utilizării.",
      "incorrectFeedback": "Nu chiar. Un serviciu trebuie să fie și potrivit utilizării.",
      "caseId": "caz-ce-face-o-banca-si-cum-alegi-un-cont",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar eticheta pentru studenți."
        },
        {
          "id": "1",
          "label": "O predicție de curs valutar."
        },
        {
          "id": "2",
          "label": "Accesul la servicii, aplicație și ajutor."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Accesul contează alături de cost. Poți avea nevoie de o aplicație accesibilă, de numerar în anumite locuri sau de ajutor printr-un canal verificat. Un cont ieftin care nu oferă serviciul necesar poate să nu rezolve problema. Verifică și cum se închide contul și ce documente primești.",
        "Nu există în această lecție o bancă recomandată tuturor. Compari condiții relevante, instituția și serviciile, fără să introduci date personale în site-uri neverificate. O decizie informată se poate schimba când utilizarea ta se schimbă. Revizuirea contului este un proces practic, nu o alegere definitivă făcută după un singur slogan."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O ofertă este neclară. Care este un pas util?",
      "explanation": "Condițiile verificate sunt mai utile decât presupunerile.",
      "correctFeedback": "Corect. Condițiile verificate sunt mai utile decât presupunerile.",
      "incorrectFeedback": "Nu chiar. Condițiile verificate sunt mai utile decât presupunerile.",
      "type": "scenariu",
      "context": "Nu știi ce operațiuni sunt incluse.",
      "options": [
        {
          "id": "0",
          "label": "Ceri explicația și verifici documentele instituției."
        },
        {
          "id": "1",
          "label": "Introduci date într-un link anonim."
        },
        {
          "id": "2",
          "label": "Presupui că orice cost va dispărea."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Îți schimbi utilizarea contului. Ce faci?",
      "explanation": "Potrivirea se poate modifica în timp.",
      "correctFeedback": "Corect. Potrivirea se poate modifica în timp.",
      "incorrectFeedback": "Nu chiar. Potrivirea se poate modifica în timp.",
      "type": "scenariu",
      "context": "Începi să folosești frecvent numerar.",
      "options": [
        {
          "id": "0",
          "label": "Consideri alegerea imposibil de revizuit."
        },
        {
          "id": "1",
          "label": "Reevaluezi costurile și serviciile relevante."
        },
        {
          "id": "2",
          "label": "Deschizi automat toate ofertele."
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
          "title": "Utilizare",
          "body": "Compară conturi pentru operațiunile tale.",
          "detail": "Compară conturi pentru operațiunile tale.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Condiții",
          "body": "Gratuitatea poate fi limitată sau condiționată.",
          "detail": "Gratuitatea poate fi limitată sau condiționată.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Acces",
          "body": "Costul și serviciile trebuie analizate împreună.",
          "detail": "Costul și serviciile trebuie analizate împreună.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Notează trei operațiuni bancare de care ai nevoie și unde ai verifica prețul fiecăreia.",
          "detail": "Notează trei operațiuni bancare de care ai nevoie și unde ai verifica prețul fiecăreia.",
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
