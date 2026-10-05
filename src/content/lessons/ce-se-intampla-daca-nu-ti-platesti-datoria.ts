import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "ce-se-intampla-daca-nu-ti-platesti-datoria",
  "title": "Ce se întâmplă dacă nu-ți plătești datoria",
  "categoryId": "credite-si-datorii",
  "chapterId": "datorii-si-scor",
  "slug": "ce-se-intampla-daca-nu-ti-platesti-datoria",
  "description": "Oana pierde temporar o parte din venit și estimează că următoarea rată nu va putea fi plătită integral.",
  "objective": "Să poți explica ce se întâmplă dacă nu-ți plătești datoria și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [
  {
    "label": "ANPC · Informații standard pentru credit",
    "url": "https://www.anpc.ro/anpcftp/legislatie/100609/anexa2_inf_standard_credit_consumatori.pdf"
  },
  {
    "label": "ANPC · Protecția privind costul creditării IFN",
    "url": "https://anpc.ro/o-noua-lege-reglementeaza-dobanzile-creditelor-ifn-urilor/"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Ce se întâmplă dacă nu-ți plătești datoria",
      "body": "Oana pierde temporar o parte din venit și estimează că următoarea rată nu va putea fi plătită integral."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Neplata poate aduce costuri, comunicări de recuperare și alte consecințe prevăzute de contract și lege. Unele întârzieri pot afecta istoricul de credit în condițiile aplicabile. Nu toate situațiile au același calendar. Verifică suma, scadența și notificările, iar când anticipezi o dificultate contactează creditorul înainte să ignori mesajele.",
        "Înainte de o decizie, pune informațiile esențiale pe aceeași pagină: suma primită, calendarul plăților și costurile cerute. Citește documentele oferite înainte de semnare. O reclamă poate scoate în față numai un avantaj, în timp ce obligațiile tale sunt descrise în contract și în informațiile precontractuale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce poate produce o întârziere?",
      "explanation": "Costuri și alte consecințe conform condițiilor aplicabile.",
      "correctFeedback": "Corect. Costuri și alte consecințe conform condițiilor aplicabile.",
      "incorrectFeedback": "Nu chiar. Costuri și alte consecințe conform condițiilor aplicabile.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Costuri și alte consecințe conform condițiilor aplicabile."
        },
        {
          "id": "1",
          "label": "Ștergerea automată a datoriei."
        },
        {
          "id": "2",
          "label": "Transformarea ratei în economii."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Neplata poate aduce costuri, comunicări de recuperare și alte consecințe prevăzute de contract și lege.",
      "explanation": "Neplata poate aduce costuri, comunicări de recuperare și alte consecințe prevăzute de contract și lege. Unele întârzieri pot afecta istoricul de credit în condițiile aplicabile. Nu toate situațiile au același calendar. Verifică suma, scadența și notificările, iar când anticipezi o dificultate contactează creditorul înainte să ignori mesajele.",
      "correctFeedback": "Corect. Neplata poate aduce costuri, comunicări de recuperare și alte consecințe prevăzute de contract și lege. Unele întârzieri pot afecta istoricul de credit în condițiile aplicabile. Nu toate situațiile au același calendar. Verifică suma, scadența și notificările, iar când anticipezi o dificultate contactează creditorul înainte să ignori mesajele.",
      "incorrectFeedback": "Nu chiar. Neplata poate aduce costuri, comunicări de recuperare și alte consecințe prevăzute de contract și lege. Unele întârzieri pot afecta istoricul de credit în condițiile aplicabile. Nu toate situațiile au același calendar. Verifică suma, scadența și notificările, iar când anticipezi o dificultate contactează creditorul înainte să ignori mesajele.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Oana știe că nu va putea plăti integral următoarea rată. Cere în scris situația datoriei și opțiunile de adaptare a plăților. Nu presupune că o conversație telefonică schimbă automat contractul. Dacă primește o propunere, verifică noile termene, costurile și confirmarea acordului, astfel încât bugetul să folosească obligațiile reale.",
        "Cifrele sunt ipotetice și servesc comparației din exercițiu. Nu descriu oferta unei instituții. Un buget trebuie să includă și celelalte plăți necesare, nu numai creditul analizat. Compară aceeași sumă și aceeași durată acolo unde este posibil, apoi notează diferențele care împiedică o comparație directă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Anticipezi că nu poți plăti. Ce faci devreme?",
      "explanation": "Contactezi creditorul și ceri opțiuni documentate.",
      "correctFeedback": "Corect. Contactezi creditorul și ceri opțiuni documentate.",
      "incorrectFeedback": "Nu chiar. Contactezi creditorul și ceri opțiuni documentate.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Aștepți fără să citești nimic."
        },
        {
          "id": "1",
          "label": "Contactezi creditorul și ceri opțiuni documentate."
        },
        {
          "id": "2",
          "label": "Contractezi automat alt împrumut."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Primești o propunere nouă de plăți. Ce verifici?",
      "explanation": "Termenele, costurile și confirmarea acordului.",
      "correctFeedback": "Corect. Termenele, costurile și confirmarea acordului.",
      "incorrectFeedback": "Nu chiar. Termenele, costurile și confirmarea acordului.",
      "type": "scenariu",
      "context": "Oana știe că nu va putea plăti integral următoarea rată. Cere în scris situația datoriei și opțiunile de adaptare a plăților. Nu presupune că o conversație telefonică schimbă automat contractul. Dacă primește o propunere, verifică noile termene, costurile și confirmarea acordului, astfel încât bugetul să folosească obligațiile reale.",
      "options": [
        {
          "id": "0",
          "label": "Doar tonul conversației."
        },
        {
          "id": "1",
          "label": "Doar durata apelului."
        },
        {
          "id": "2",
          "label": "Termenele, costurile și confirmarea acordului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-ce-se-intampla-daca-nu-ti-platesti-datoria",
      "paragraphs": [
        "Oana pierde temporar o parte din venit și estimează că următoarea rată nu va putea fi plătită integral. În loc să închidă mesajele, cere creditorului o situație a datoriei și opțiuni documentate. Primește și un SMS separat cu un cont de plată necunoscut. Verifică expeditorul prin canalul oficial, apoi citește în scris orice propunere de schimbare a calendarului.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Oana știe că nu va putea plăti integral următoarea rată. Cere în scris situația datoriei și opțiunile de adaptare a plăților. Nu presupune că o conversație telefonică schimbă automat contractul. Dacă primește o propunere, verifică noile termene, costurile și confirmarea acordului, astfel încât bugetul să folosească obligațiile reale. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce schimbare afectează planul Oanei?",
      "explanation": "Scăderea temporară a venitului.",
      "correctFeedback": "Corect. Scăderea temporară a venitului.",
      "incorrectFeedback": "Nu chiar. Scăderea temporară a venitului.",
      "caseId": "caz-ce-se-intampla-daca-nu-ti-platesti-datoria",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Scăderea temporară a venitului."
        },
        {
          "id": "1",
          "label": "Culoarea SMS-ului."
        },
        {
          "id": "2",
          "label": "Creșterea numărului de reclame."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Cum verifică SMS-ul cu un cont necunoscut?",
      "explanation": "Prin canalul oficial al creditorului.",
      "correctFeedback": "Corect. Prin canalul oficial al creditorului.",
      "incorrectFeedback": "Nu chiar. Prin canalul oficial al creditorului.",
      "caseId": "caz-ce-se-intampla-daca-nu-ti-platesti-datoria",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Transferă imediat ca să scape de stres."
        },
        {
          "id": "1",
          "label": "Prin canalul oficial al creditorului."
        },
        {
          "id": "2",
          "label": "Trimite PIN-ul pentru confirmare."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "De ce cere situația datoriei?",
      "explanation": "Ca să verifice suma și componentele obligației.",
      "correctFeedback": "Corect. Ca să verifice suma și componentele obligației.",
      "incorrectFeedback": "Nu chiar. Ca să verifice suma și componentele obligației.",
      "caseId": "caz-ce-se-intampla-daca-nu-ti-platesti-datoria",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ca să elimine orice termen."
        },
        {
          "id": "1",
          "label": "Ca să obțină venit nou."
        },
        {
          "id": "2",
          "label": "Ca să verifice suma și componentele obligației."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O notificare de recuperare trebuie verificată: identitatea expeditorului, documentele și baza sumei. Nu plăti într-un cont primit printr-un mesaj neverificat. În același timp, nu ignora actele oficiale doar fiindcă situația este stresantă. Pentru o dispută sau procedură juridică, cere ajutor calificat și respectă termenele din documentele aplicabile.",
        "Dacă nu înțelegi o condiție, cere explicații înainte să te obligi. Păstrează contractul și comunicările relevante. Pentru dificultăți de plată, discută din timp cu creditorul și verifică opțiunile documentate. Nu trimite bani unei persoane care promite ștergerea sigură a datoriei fără să explice baza și procedura."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Primești un act cu termen juridic. Ce faci?",
      "explanation": "Îl verifici și ceri sprijin calificat la timp.",
      "correctFeedback": "Corect. Îl verifici și ceri sprijin calificat la timp.",
      "incorrectFeedback": "Nu chiar. Îl verifici și ceri sprijin calificat la timp.",
      "type": "scenariu",
      "context": "Oana știe că nu va putea plăti integral următoarea rată. Cere în scris situația datoriei și opțiunile de adaptare a plăților. Nu presupune că o conversație telefonică schimbă automat contractul. Dacă primește o propunere, verifică noile termene, costurile și confirmarea acordului, astfel încât bugetul să folosească obligațiile reale.",
      "options": [
        {
          "id": "0",
          "label": "Îl verifici și ceri sprijin calificat la timp."
        },
        {
          "id": "1",
          "label": "Îl ignori pentru că e neplăcut."
        },
        {
          "id": "2",
          "label": "Presupui că toate actele sunt reclame."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un recuperator cere plată. Ce verifici înainte?",
      "explanation": "Identitatea, documentele și baza sumei.",
      "correctFeedback": "Corect. Identitatea, documentele și baza sumei.",
      "incorrectFeedback": "Nu chiar. Identitatea, documentele și baza sumei.",
      "type": "scenariu",
      "context": "Oana știe că nu va putea plăti integral următoarea rată. Cere în scris situația datoriei și opțiunile de adaptare a plăților. Nu presupune că o conversație telefonică schimbă automat contractul. Dacă primește o propunere, verifică noile termene, costurile și confirmarea acordului, astfel încât bugetul să folosească obligațiile reale.",
      "options": [
        {
          "id": "0",
          "label": "Doar vocea persoanei."
        },
        {
          "id": "1",
          "label": "Identitatea, documentele și baza sumei."
        },
        {
          "id": "2",
          "label": "Doar promisiunea de ștergere imediată."
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
          "body": "Neplata poate aduce costuri, comunicări de recuperare și alte consecințe prevăzute de contract și lege.",
          "detail": "Neplata poate aduce costuri, comunicări de recuperare și alte consecințe prevăzute de contract și lege.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Oana știe că nu va putea plăti integral următoarea rată. Cere în scris situația datoriei și opțiunile de adaptare a plăților.",
          "detail": "Oana știe că nu va putea plăti integral următoarea rată. Cere în scris situația datoriei și opțiunile de adaptare a plăților.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "O notificare de recuperare trebuie verificată: identitatea expeditorului, documentele și baza sumei.",
          "detail": "O notificare de recuperare trebuie verificată: identitatea expeditorului, documentele și baza sumei.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Scrie un mesaj fictiv prin care ceri situația datoriei și opțiunile de plată, fără date personale reale.",
          "detail": "Scrie un mesaj fictiv prin care ceri situația datoriei și opțiunile de plată, fără date personale reale.",
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
