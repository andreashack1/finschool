import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "utilitati-si-cum-citesti-o-factura",
  "title": "Utilități și cum citești o factură",
  "categoryId": "pe-cont-propriu",
  "chapterId": "casa-ta",
  "slug": "utilitati-si-cum-citesti-o-factura",
  "description": "Elena primește o factură de 150 lei și o compară cu una veche mai mică.",
  "objective": "Să poți explica utilități și cum citești o factură și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Utilități și cum citești o factură",
      "body": "Elena primește o factură de 150 lei și o compară cu una veche mai mică."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O factură de utilități arată perioada, consumul, tarifele, taxele, eventualul sold anterior și termenul de plată. Verifică dacă indexul este citit, transmis sau estimat. Suma nouă poate include o regularizare ori datorii vechi. Compararea a două facturi cere și perioada și cantitatea, nu doar totalul în lei.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici înainte să compari două facturi?",
      "explanation": "Perioada, cantitatea și componentele.",
      "correctFeedback": "Corect. Perioada, cantitatea și componentele.",
      "incorrectFeedback": "Nu chiar. Perioada, cantitatea și componentele.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Perioada, cantitatea și componentele."
        },
        {
          "id": "1",
          "label": "Doar totalul mare."
        },
        {
          "id": "2",
          "label": "Doar tariful unitar, fără consum și soldul anterior."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Suma de plată a facturii reprezintă întotdeauna numai consumul lunii curente.",
      "explanation": "O factură estimată poate fi ajustată ulterior prin regularizare. Nu considera o lună mică dovada unui consum permanent mic. Verifică unitatea și tariful contractual, precum și datele furnizorului înainte de plată. Dacă observi o diferență de index, documenteaz-o și cere verificarea; nu modifica singur suma datorată fără clarificare.",
      "correctFeedback": "Corect. O factură estimată poate fi ajustată ulterior prin regularizare. Nu considera o lună mică dovada unui consum permanent mic. Verifică unitatea și tariful contractual, precum și datele furnizorului înainte de plată. Dacă observi o diferență de index, documenteaz-o și cere verificarea; nu modifica singur suma datorată fără clarificare.",
      "incorrectFeedback": "Nu chiar. O factură estimată poate fi ajustată ulterior prin regularizare. Nu considera o lună mică dovada unui consum permanent mic. Verifică unitatea și tariful contractual, precum și datele furnizorului înainte de plată. Dacă observi o diferență de index, documenteaz-o și cere verificarea; nu modifica singur suma datorată fără clarificare.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pe o factură fictivă, consumul este 100 de unități la 1 leu, cu un cost fix de 20 lei. Totalul acestor componente este 120 lei. Dacă apare și un sold anterior de 30, suma de plată devine 150. Elena separă consumul curent de sold înainte să concluzioneze că tariful a crescut.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Consumul costă 100 lei, costul fix este 20 lei și soldul anterior este 30 lei. Ce sumă de plată verifici pe factura din exemplu?",
      "explanation": "Cele trei componente însumează 150 lei, dar numai 100 lei reprezintă consumul. Totalul mai mare nu dovedește singur creșterea tarifului.",
      "correctFeedback": "Corect. Cele trei componente însumează 150 lei, dar numai 100 lei reprezintă consumul. Totalul mai mare nu dovedește singur creșterea tarifului.",
      "incorrectFeedback": "Nu chiar. Cele trei componente însumează 150 lei, dar numai 100 lei reprezintă consumul. Totalul mai mare nu dovedește singur creșterea tarifului.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "120 lei."
        },
        {
          "id": "1",
          "label": "150 lei."
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
      "question": "Factura folosește un index estimat. Ce verifici?",
      "explanation": "Cum și când se poate face regularizarea.",
      "correctFeedback": "Corect. Cum și când se poate face regularizarea.",
      "incorrectFeedback": "Nu chiar. Cum și când se poate face regularizarea.",
      "type": "scenariu",
      "context": "Pe o factură fictivă, consumul este 100 de unități la 1 leu, cu un cost fix de 20 lei. Totalul acestor componente este 120 lei. Dacă apare și un sold anterior de 30, suma de plată devine 150. Elena separă consumul curent de sold înainte să concluzioneze că tariful a crescut.",
      "options": [
        {
          "id": "0",
          "label": "Presupui un consum exact definitiv."
        },
        {
          "id": "1",
          "label": "Ignori contoarele."
        },
        {
          "id": "2",
          "label": "Cum și când se poate face regularizarea."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-utilitati-si-cum-citesti-o-factura",
      "paragraphs": [
        "Elena primește o factură de 150 lei și o compară cu una veche mai mică. Documentul arată 100 de unități la 1 leu, un cost fix de 20 și un sold anterior de 30. Ea separă componentele și verifică perioada și tipul indexului. Observă că suma finală nu reprezintă numai consumul curent și caută confirmarea plății precedente.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Pe o factură fictivă, consumul este 100 de unități la 1 leu, cu un cost fix de 20 lei. Totalul acestor componente este 120 lei. Dacă apare și un sold anterior de 30, suma de plată devine 150. Elena separă consumul curent de sold înainte să concluzioneze că tariful a crescut. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Ce parte din factura Elenei este sold anterior?",
      "explanation": "30 lei.",
      "correctFeedback": "Corect. 30 lei.",
      "incorrectFeedback": "Nu chiar. 30 lei.",
      "caseId": "caz-utilitati-si-cum-citesti-o-factura",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "30 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "20 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Care sunt componentele curente din exemplu?",
      "explanation": "100 lei consum și 20 lei cost fix.",
      "correctFeedback": "Corect. 100 lei consum și 20 lei cost fix.",
      "incorrectFeedback": "Nu chiar. 100 lei consum și 20 lei cost fix.",
      "caseId": "caz-utilitati-si-cum-citesti-o-factura",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "150 lei exclusiv consum."
        },
        {
          "id": "1",
          "label": "100 lei consum și 20 lei cost fix."
        },
        {
          "id": "2",
          "label": "30 lei consum și 100 lei sold."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce caută plata precedentă?",
      "explanation": "Pentru verificarea soldului de 30 lei.",
      "correctFeedback": "Corect. Pentru verificarea soldului de 30 lei.",
      "incorrectFeedback": "Nu chiar. Pentru verificarea soldului de 30 lei.",
      "caseId": "caz-utilitati-si-cum-citesti-o-factura",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Pentru a schimba tariful unilateral."
        },
        {
          "id": "1",
          "label": "Pentru a evita citirea perioadei."
        },
        {
          "id": "2",
          "label": "Pentru verificarea soldului de 30 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O factură estimată poate fi ajustată ulterior prin regularizare. Nu considera o lună mică dovada unui consum permanent mic. Verifică unitatea și tariful contractual, precum și datele furnizorului înainte de plată. Dacă observi o diferență de index, documenteaz-o și cere verificarea; nu modifica singur suma datorată fără clarificare.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Indexul facturat diferă de dovada ta. Ce faci?",
      "explanation": "Documentezi diferența și ceri verificarea.",
      "correctFeedback": "Corect. Documentezi diferența și ceri verificarea.",
      "incorrectFeedback": "Nu chiar. Documentezi diferența și ceri verificarea.",
      "type": "scenariu",
      "context": "Pe o factură fictivă, consumul este 100 de unități la 1 leu, cu un cost fix de 20 lei. Totalul acestor componente este 120 lei. Dacă apare și un sold anterior de 30, suma de plată devine 150. Elena separă consumul curent de sold înainte să concluzioneze că tariful a crescut.",
      "options": [
        {
          "id": "0",
          "label": "Documentezi diferența și ceri verificarea."
        },
        {
          "id": "1",
          "label": "Scazi singur diferența din suma de plată, fără clarificare."
        },
        {
          "id": "2",
          "label": "Consideri indexul estimat definitiv, fără să păstrezi dovada."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un mesaj cere plata într-un cont nou. Ce verifici?",
      "explanation": "Datele prin canalul oficial al furnizorului.",
      "correctFeedback": "Corect. Datele prin canalul oficial al furnizorului.",
      "incorrectFeedback": "Nu chiar. Datele prin canalul oficial al furnizorului.",
      "type": "scenariu",
      "context": "Pe o factură fictivă, consumul este 100 de unități la 1 leu, cu un cost fix de 20 lei. Totalul acestor componente este 120 lei. Dacă apare și un sold anterior de 30, suma de plată devine 150. Elena separă consumul curent de sold înainte să concluzioneze că tariful a crescut.",
      "options": [
        {
          "id": "0",
          "label": "Doar urgența mesajului."
        },
        {
          "id": "1",
          "label": "Datele prin canalul oficial al furnizorului."
        },
        {
          "id": "2",
          "label": "Doar prima literă a numelui."
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
          "body": "Separă pe factură consumul curent, costurile fixe și soldul anterior.",
          "detail": "Factura de 150 lei include 100 consum, 20 cost fix și 30 sold anterior. Diferența față de o factură veche nu dovedește singură creșterea tarifului; verifică și perioada și indexul.",
          "type": "normal",
          "detailHighlights": [
            "sold anterior",
            "cost fix"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "O factură mai mare nu dovedește singură un tarif mai mare.",
          "type": "normal",
          "detail": "Totalul poate include sold anterior, cost fix și consum curent. O sumă mai mare nu dovedește singură un tarif mai mare.",
          "detailHighlights": [
            "sold anterior",
            "consum curent"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Consumul estimat poate fi corectat ulterior prin regularizare.",
          "type": "normal",
          "detail": "La regularizare, consumul real poate corecta estimările anterioare. Compară indexurile și perioada.",
          "detailHighlights": [
            "indexurile",
            "perioada"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pe o factură fictivă, separă consumul curent, costul fix, soldul anterior și scadența.",
          "type": "action",
          "detail": "Urmărește scadența separat de perioada de consum; factura poate cere plata acum pentru o perioadă deja încheiată.",
          "detailHighlights": [
            "scadența",
            "perioada"
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
