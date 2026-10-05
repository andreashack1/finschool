import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cheltuieli-neprevazute",
  "title": "Cheltuieli neprevăzute",
  "categoryId": "pe-cont-propriu",
  "chapterId": "viata-de-zi-cu-zi",
  "slug": "cheltuieli-neprevazute",
  "description": "Telefonul Sofiei necesită o reparație de 400 lei pentru a putea fi folosit la cursuri.",
  "objective": "Să poți explica cheltuieli neprevăzute și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "ASF · Ghid RCA",
    "url": "https://asfromania.ro/files/Ghid_RCA.pdf"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Cheltuieli neprevăzute",
      "body": "Telefonul Sofiei necesită o reparație de 400 lei pentru a putea fi folosit la cursuri."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O cheltuială neprevăzută apare fără să fie inclusă concret în plan, dar unele costuri neregulate pot fi anticipate. Revizia anuală, înlocuirea periodică sau o factură sezonieră nu sunt automat surprize totale. Separă o rezervă pentru urgențe de sumele pentru costuri cunoscute. Verifică mai întâi necesitatea și momentul plății.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce distincție ajută planul?",
      "explanation": "Urgențe și costuri neregulate cunoscute.",
      "correctFeedback": "Corect. Urgențe și costuri neregulate cunoscute.",
      "incorrectFeedback": "Nu chiar. Urgențe și costuri neregulate cunoscute.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Urgențe și costuri neregulate cunoscute."
        },
        {
          "id": "1",
          "label": "Doar plăți cu cardul și numerar."
        },
        {
          "id": "2",
          "label": "Doar numărul facturilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Orice cheltuială care nu apare lunar este imposibil de anticipat.",
      "explanation": "Nu orice ofertă urgentă este o urgență reală. Cere un diagnostic ori o explicație a costului înainte să plătești când situația permite. Dacă rezerva nu ajunge, compară opțiunile și termenele, fără să presupui că orice credit rapid este soluția potrivită. După folosirea rezervei, actualizează soldul; nu o considera încă întreagă.",
      "correctFeedback": "Corect. Nu orice ofertă urgentă este o urgență reală. Cere un diagnostic ori o explicație a costului înainte să plătești când situația permite. Dacă rezerva nu ajunge, compară opțiunile și termenele, fără să presupui că orice credit rapid este soluția potrivită. După folosirea rezervei, actualizează soldul; nu o considera încă întreagă.",
      "incorrectFeedback": "Nu chiar. Nu orice ofertă urgentă este o urgență reală. Cere un diagnostic ori o explicație a costului înainte să plătești când situația permite. Dacă rezerva nu ajunge, compară opțiunile și termenele, fără să presupui că orice credit rapid este soluția potrivită. După folosirea rezervei, actualizează soldul; nu o considera încă întreagă.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Sofia are o reparație necesară de 400 lei și o rezervă accesibilă de 600. Dacă o folosește, rămân 200, apoi poate planifica refacerea treptată. O altă cheltuială anuală de 240 lei poate fi pregătită prin 20 lei lunar. Cele două situații cer evidențe diferite, chiar dacă niciuna nu apare în fiecare lună.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Din rezervă 600 plătești 400. Cât rămâne?",
      "explanation": "200 lei.",
      "correctFeedback": "Corect. 200 lei.",
      "incorrectFeedback": "Nu chiar. 200 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "600 lei."
        },
        {
          "id": "1",
          "label": "200 lei."
        },
        {
          "id": "2",
          "label": "1.000 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un cost anual de 240 împărțit în 12 luni cere cât lunar?",
      "explanation": "20 lei.",
      "correctFeedback": "Corect. 20 lei.",
      "incorrectFeedback": "Nu chiar. 20 lei.",
      "type": "scenariu",
      "context": "Sofia are o reparație necesară de 400 lei și o rezervă accesibilă de 600. Dacă o folosește, rămân 200, apoi poate planifica refacerea treptată. O altă cheltuială anuală de 240 lei poate fi pregătită prin 20 lei lunar. Cele două situații cer evidențe diferite, chiar dacă niciuna nu apare în fiecare lună.",
      "options": [
        {
          "id": "0",
          "label": "24 lei."
        },
        {
          "id": "1",
          "label": "120 lei."
        },
        {
          "id": "2",
          "label": "20 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cheltuieli-neprevazute",
      "paragraphs": [
        "Telefonul Sofiei necesită o reparație de 400 lei pentru a putea fi folosit la cursuri. Are o rezervă de 600 și verifică explicația costului. Separat, știe că un serviciu anual costă 240. Folosește rezerva pentru reparația necesară și notează cei 200 rămași, iar pentru costul anual construiește un plan lunar. Nu numără aceeași sumă pentru ambele.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Sofia are o reparație necesară de 400 lei și o rezervă accesibilă de 600. Dacă o folosește, rămân 200, apoi poate planifica refacerea treptată. O altă cheltuială anuală de 240 lei poate fi pregătită prin 20 lei lunar. Cele două situații cer evidențe diferite, chiar dacă niciuna nu apare în fiecare lună. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "De ce reparația Sofiei este relevantă acum?",
      "explanation": "Dispozitivul este necesar la cursuri.",
      "correctFeedback": "Corect. Dispozitivul este necesar la cursuri.",
      "incorrectFeedback": "Nu chiar. Dispozitivul este necesar la cursuri.",
      "caseId": "caz-cheltuieli-neprevazute",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Dispozitivul este necesar la cursuri."
        },
        {
          "id": "1",
          "label": "Are o reclamă cu cronometru."
        },
        {
          "id": "2",
          "label": "Un prieten cumpără alt model."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce verifică înainte de reparație?",
      "explanation": "Explicația și necesitatea costului.",
      "correctFeedback": "Corect. Explicația și necesitatea costului.",
      "incorrectFeedback": "Nu chiar. Explicația și necesitatea costului.",
      "caseId": "caz-cheltuieli-neprevazute",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar numărul atelierelor."
        },
        {
          "id": "1",
          "label": "Explicația și necesitatea costului."
        },
        {
          "id": "2",
          "label": "Doar culoarea telefonului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce sold notează după plată?",
      "explanation": "200 lei rămași.",
      "correctFeedback": "Corect. 200 lei rămași.",
      "incorrectFeedback": "Nu chiar. 200 lei rămași.",
      "caseId": "caz-cheltuieli-neprevazute",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "600 lei ca și cum nu a plătit."
        },
        {
          "id": "1",
          "label": "400 lei ca venit."
        },
        {
          "id": "2",
          "label": "200 lei rămași."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu orice ofertă urgentă este o urgență reală. Cere un diagnostic ori o explicație a costului înainte să plătești când situația permite. Dacă rezerva nu ajunge, compară opțiunile și termenele, fără să presupui că orice credit rapid este soluția potrivită. După folosirea rezervei, actualizează soldul; nu o considera încă întreagă.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O ofertă expiră azi. Este automat urgență?",
      "explanation": "Nu; verifici dacă achiziția este necesară.",
      "correctFeedback": "Corect. Nu; verifici dacă achiziția este necesară.",
      "incorrectFeedback": "Nu chiar. Nu; verifici dacă achiziția este necesară.",
      "type": "scenariu",
      "context": "Sofia are o reparație necesară de 400 lei și o rezervă accesibilă de 600. Dacă o folosește, rămân 200, apoi poate planifica refacerea treptată. O altă cheltuială anuală de 240 lei poate fi pregătită prin 20 lei lunar. Cele două situații cer evidențe diferite, chiar dacă niciuna nu apare în fiecare lună.",
      "options": [
        {
          "id": "0",
          "label": "Nu; verifici dacă achiziția este necesară."
        },
        {
          "id": "1",
          "label": "Da, indiferent de nevoie."
        },
        {
          "id": "2",
          "label": "Da, chiar dacă produsul nu va fi folosit."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Rezerva nu ajunge. Ce compari?",
      "explanation": "Opțiunile, termenele și costurile soluțiilor.",
      "correctFeedback": "Corect. Opțiunile, termenele și costurile soluțiilor.",
      "incorrectFeedback": "Nu chiar. Opțiunile, termenele și costurile soluțiilor.",
      "type": "scenariu",
      "context": "Sofia are o reparație necesară de 400 lei și o rezervă accesibilă de 600. Dacă o folosește, rămân 200, apoi poate planifica refacerea treptată. O altă cheltuială anuală de 240 lei poate fi pregătită prin 20 lei lunar. Cele două situații cer evidențe diferite, chiar dacă niciuna nu apare în fiecare lună.",
      "options": [
        {
          "id": "0",
          "label": "Doar aprobarea cea mai rapidă."
        },
        {
          "id": "1",
          "label": "Opțiunile, termenele și costurile soluțiilor."
        },
        {
          "id": "2",
          "label": "Un venit neconfirmat ca sigur."
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
          "body": "O cheltuială neprevăzută apare fără să fie inclusă concret în plan, dar unele costuri neregulate pot fi anticipate.",
          "detail": "O cheltuială neprevăzută apare fără să fie inclusă concret în plan, dar unele costuri neregulate pot fi anticipate.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Sofia are o reparație necesară de 400 lei și o rezervă accesibilă de 600. Dacă o folosește, rămân 200, apoi poate planifica refacerea treptată.",
          "detail": "Sofia are o reparație necesară de 400 lei și o rezervă accesibilă de 600. Dacă o folosește, rămân 200, apoi poate planifica refacerea treptată.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Nu orice ofertă urgentă este o urgență reală.",
          "detail": "Nu orice ofertă urgentă este o urgență reală.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Separă trei costuri neregulate previzibile de un exemplu de urgență și notează cum le-ai pregăti.",
          "detail": "Separă trei costuri neregulate previzibile de un exemplu de urgență și notează cum le-ai pregăti.",
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
