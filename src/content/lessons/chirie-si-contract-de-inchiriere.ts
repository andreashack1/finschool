import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "chirie-si-contract-de-inchiriere",
  "title": "Chirie și contract de închiriere",
  "categoryId": "pe-cont-propriu",
  "chapterId": "casa-ta",
  "slug": "chirie-si-contract-de-inchiriere",
  "description": "Mara primește un anunț cu fotografii atractive și o solicitare de avans imediat.",
  "objective": "Să poți explica chirie și contract de închiriere și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Chirie și contract de închiriere",
      "body": "Mara primește un anunț cu fotografii atractive și o solicitare de avans imediat."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Contractul de închiriere trebuie citit pentru chirie, termen, garanție, plăți separate și condițiile încetării. Verifică cine oferă locuința și în ce calitate. Un inventar și documentarea stării inițiale ajută la discutarea eventualelor deteriorări. Nu trimite o garanție doar pe baza unui anunț și a presiunii că există mulți alți doritori.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici în contractul de chirie?",
      "explanation": "Plățile, durata, garanția și încetarea.",
      "correctFeedback": "Corect. Plățile, durata, garanția și încetarea.",
      "incorrectFeedback": "Nu chiar. Plățile, durata, garanția și încetarea.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Plățile, durata, garanția și încetarea."
        },
        {
          "id": "1",
          "label": "Doar numărul fotografiilor."
        },
        {
          "id": "2",
          "label": "Doar distanța până la magazin."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Contractul de închiriere trebuie citit pentru chirie, termen, garanție, plăți separate și condițiile încetării.",
      "explanation": "Contractul de închiriere trebuie citit pentru chirie, termen, garanție, plăți separate și condițiile încetării. Verifică cine oferă locuința și în ce calitate. Un inventar și documentarea stării inițiale ajută la discutarea eventualelor deteriorări. Nu trimite o garanție doar pe baza unui anunț și a presiunii că există mulți alți doritori.",
      "correctFeedback": "Corect. Contractul de închiriere trebuie citit pentru chirie, termen, garanție, plăți separate și condițiile încetării. Verifică cine oferă locuința și în ce calitate. Un inventar și documentarea stării inițiale ajută la discutarea eventualelor deteriorări. Nu trimite o garanție doar pe baza unui anunț și a presiunii că există mulți alți doritori.",
      "incorrectFeedback": "Nu chiar. Contractul de închiriere trebuie citit pentru chirie, termen, garanție, plăți separate și condițiile încetării. Verifică cine oferă locuința și în ce calitate. Un inventar și documentarea stării inițiale ajută la discutarea eventualelor deteriorări. Nu trimite o garanție doar pe baza unui anunț și a presiunii că există mulți alți doritori.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Mara vede un apartament și cere înainte de plată contractul, identitatea și confirmarea dreptului de a-l închiria. Verifică dacă utilitățile sunt separate și cum se restituie garanția. La predare notează indexurile și defectele existente. Păstrează dovada plății, astfel încât suma achitată și destinația ei să poată fi verificate ulterior.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "De ce consemnezi defectele la predare?",
      "explanation": "Pentru a distinge starea inițială de deteriorările ulterioare.",
      "correctFeedback": "Corect. Pentru a distinge starea inițială de deteriorările ulterioare.",
      "incorrectFeedback": "Nu chiar. Pentru a distinge starea inițială de deteriorările ulterioare.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Pentru a crește chiria."
        },
        {
          "id": "1",
          "label": "Pentru a distinge starea inițială de deteriorările ulterioare."
        },
        {
          "id": "2",
          "label": "Pentru a elimina orice obligație."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ți se cere avans înainte de verificare și vizionare. Ce faci?",
      "explanation": "Verifici oferta și persoana înainte de plată.",
      "correctFeedback": "Corect. Verifici oferta și persoana înainte de plată.",
      "incorrectFeedback": "Nu chiar. Verifici oferta și persoana înainte de plată.",
      "type": "scenariu",
      "context": "Mara vede un apartament și cere înainte de plată contractul, identitatea și confirmarea dreptului de a-l închiria. Verifică dacă utilitățile sunt separate și cum se restituie garanția. La predare notează indexurile și defectele existente. Păstrează dovada plății, astfel încât suma achitată și destinația ei să poată fi verificate ulterior.",
      "options": [
        {
          "id": "0",
          "label": "Transferi ca să nu pierzi fotografia."
        },
        {
          "id": "1",
          "label": "Trimiți parola contului."
        },
        {
          "id": "2",
          "label": "Verifici oferta și persoana înainte de plată."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-chirie-si-contract-de-inchiriere",
      "paragraphs": [
        "Mara primește un anunț cu fotografii atractive și o solicitare de avans imediat. Cere vizionare și documentele ofertei. După verificare, discută în contract utilitățile, garanția și plecarea înainte de termen. La predare observă o ușă deteriorată și o notează în inventar cu indexurile contoarelor. Păstrează dovada sumei plătite și nu se bazează doar pe conversația inițială.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Mara vede un apartament și cere înainte de plată contractul, identitatea și confirmarea dreptului de a-l închiria. Verifică dacă utilitățile sunt separate și cum se restituie garanția. La predare notează indexurile și defectele existente. Păstrează dovada plății, astfel încât suma achitată și destinația ei să poată fi verificate ulterior. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce semnal observă Mara în prima solicitare?",
      "explanation": "Presiunea de plată imediată.",
      "correctFeedback": "Corect. Presiunea de plată imediată.",
      "incorrectFeedback": "Nu chiar. Presiunea de plată imediată.",
      "caseId": "caz-chirie-si-contract-de-inchiriere",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Presiunea de plată imediată."
        },
        {
          "id": "1",
          "label": "Existența unui apartament fotografiat."
        },
        {
          "id": "2",
          "label": "Un contract deja citit."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce notează Mara la predare?",
      "explanation": "Defectele și indexurile.",
      "correctFeedback": "Corect. Defectele și indexurile.",
      "incorrectFeedback": "Nu chiar. Defectele și indexurile.",
      "caseId": "caz-chirie-si-contract-de-inchiriere",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Numai numele vecinilor."
        },
        {
          "id": "1",
          "label": "Defectele și indexurile."
        },
        {
          "id": "2",
          "label": "Doar parola Wi-Fi."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce dovadă păstrează pentru bani?",
      "explanation": "Confirmarea plății și destinația sumei.",
      "correctFeedback": "Corect. Confirmarea plății și destinația sumei.",
      "incorrectFeedback": "Nu chiar. Confirmarea plății și destinația sumei.",
      "caseId": "caz-chirie-si-contract-de-inchiriere",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar culoarea transferului."
        },
        {
          "id": "1",
          "label": "Numai anunțul șters."
        },
        {
          "id": "2",
          "label": "Confirmarea plății și destinația sumei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O clauză neclară despre reparații sau plecare poate crea un cost neașteptat. Nu presupune că orice reparație revine automat chiriașului ori proprietarului. Citește condițiile și regulile aplicabile situației. Dacă locuința nu poate fi văzută și plata este cerută urgent, oprește-te pentru verificări; fotografia frumoasă nu dovedește autenticitatea ofertei.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "O clauză despre reparații este neclară. Ce faci?",
      "explanation": "Ceri clarificarea și verifici regula aplicabilă.",
      "correctFeedback": "Corect. Ceri clarificarea și verifici regula aplicabilă.",
      "incorrectFeedback": "Nu chiar. Ceri clarificarea și verifici regula aplicabilă.",
      "type": "scenariu",
      "context": "Mara vede un apartament și cere înainte de plată contractul, identitatea și confirmarea dreptului de a-l închiria. Verifică dacă utilitățile sunt separate și cum se restituie garanția. La predare notează indexurile și defectele existente. Păstrează dovada plății, astfel încât suma achitată și destinația ei să poată fi verificate ulterior.",
      "options": [
        {
          "id": "0",
          "label": "Ceri clarificarea și verifici regula aplicabilă."
        },
        {
          "id": "1",
          "label": "Presupui că nu vei plăti nimic."
        },
        {
          "id": "2",
          "label": "Presupui că vei plăti absolut tot."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Vrei să pleci înainte de termen. Ce citești?",
      "explanation": "Condițiile de încetare și obligațiile relevante.",
      "correctFeedback": "Corect. Condițiile de încetare și obligațiile relevante.",
      "incorrectFeedback": "Nu chiar. Condițiile de încetare și obligațiile relevante.",
      "type": "scenariu",
      "context": "Mara vede un apartament și cere înainte de plată contractul, identitatea și confirmarea dreptului de a-l închiria. Verifică dacă utilitățile sunt separate și cum se restituie garanția. La predare notează indexurile și defectele existente. Păstrează dovada plății, astfel încât suma achitată și destinația ei să poată fi verificate ulterior.",
      "options": [
        {
          "id": "0",
          "label": "Doar descrierea apartamentului."
        },
        {
          "id": "1",
          "label": "Condițiile de încetare și obligațiile relevante."
        },
        {
          "id": "2",
          "label": "Doar inventarul de scaune."
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
          "body": "Contractul de închiriere trebuie citit pentru chirie, termen, garanție, plăți separate și condițiile încetării.",
          "detail": "Contractul de închiriere trebuie citit pentru chirie, termen, garanție, plăți separate și condițiile încetării.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Mara vede un apartament și cere înainte de plată contractul, identitatea și confirmarea dreptului de a-l închiria. Verifică dacă utilitățile sunt separate și cum se restituie garanția.",
          "detail": "Mara vede un apartament și cere înainte de plată contractul, identitatea și confirmarea dreptului de a-l închiria. Verifică dacă utilitățile sunt separate și cum se restituie garanția.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "O clauză neclară despre reparații sau plecare poate crea un cost neașteptat.",
          "detail": "O clauză neclară despre reparații sau plecare poate crea un cost neașteptat.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Notează cinci lucruri pe care le-ai verifica înainte de plata unei garanții de chirie.",
          "detail": "Notează cinci lucruri pe care le-ai verifica înainte de plata unei garanții de chirie.",
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
