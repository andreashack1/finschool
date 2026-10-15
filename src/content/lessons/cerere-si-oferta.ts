import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cerere-si-oferta",
  "title": "Cerere și ofertă",
  "categoryId": "cuvintele-banilor",
  "chapterId": "preturi-si-dobanzi",
  "slug": "cerere-si-oferta",
  "description": "Biletele unui eveniment aproape s-au terminat, iar pentru alt eveniment au rămas multe locuri. De ce pot apărea prețuri diferite?",
  "objective": "Să poți identifica cum schimbările de cerere și ofertă pot influența prețul într-o situație reală.",
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
      "title": "Cerere și ofertă",
      "body": "Biletele unui eveniment aproape s-au terminat, iar pentru alt eveniment au rămas multe locuri. De ce pot apărea prețuri diferite?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Cererea descrie cât vor și pot cumpăra oamenii la diferite prețuri. Oferta descrie cât este disponibil pentru vânzare. Prețul poate fi influențat de interacțiunea lor. Dacă foarte mulți oameni vor bilete, iar numărul de locuri este limitat, apare presiune pentru prețuri mai mari. Nu înseamnă că organizatorul trebuie să schimbe automat prețul.",
        "Dorința singură nu este o cumpărare. Contează și disponibilitatea de a plăti. Un produs poate avea multe aprecieri online, dar puține comenzi la prețul cerut. Separă popularitatea vizibilă de cererea care se transformă efectiv în tranzacții."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Interesul crește, locurile rămân fixe. Ce se schimbă întâi?",
      "explanation": "Mai mulți cumpărători concurează pentru aceeași ofertă.",
      "correctFeedback": "Corect. Mai mulți cumpărători concurează pentru aceeași ofertă.",
      "incorrectFeedback": "Nu chiar. Mai mulți cumpărători concurează pentru aceeași ofertă.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Cererea raportată la oferta disponibilă."
        },
        {
          "id": "1",
          "label": "Oferta de locuri, fiindcă interesul creează automat capacitate."
        },
        {
          "id": "2",
          "label": "Prețul oficial, care trebuie să crească imediat."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Mai multe aprecieri online garantează mai multe cumpărări.",
      "explanation": "Cererea efectivă depinde și de preț și posibilitatea de plată.",
      "correctFeedback": "Corect. Cererea efectivă depinde și de preț și posibilitatea de plată.",
      "incorrectFeedback": "Nu chiar. Cererea efectivă depinde și de preț și posibilitatea de plată.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Oferta poate crește dacă apar mai multe produse sau dacă un eveniment adaugă o reprezentație. Cu mai multe alternative și aceeași cerere, presiunea asupra prețului poate scădea. Invers, un stoc limitat poate face competiția pentru produs mai intensă. Acestea sunt direcții posibile, nu promisiuni pentru fiecare etichetă.",
        "Mai contează costurile, regulile vânzării și momentul. Un organizator poate păstra prețul și folosi o listă de așteptare. Un magazin poate evita reducerea pentru că are alte constrângeri. Ca să explici o schimbare, caută ce s-a modificat în cerere, în disponibilitate sau în costuri."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Se adaugă o reprezentație. Ce crește?",
      "explanation": "Disponibilitatea suplimentară înseamnă ofertă mai mare.",
      "correctFeedback": "Corect. Disponibilitatea suplimentară înseamnă ofertă mai mare.",
      "incorrectFeedback": "Nu chiar. Disponibilitatea suplimentară înseamnă ofertă mai mare.",
      "type": "scenariu",
      "context": "Interesul publicului rămâne aproximativ același.",
      "options": [
        {
          "id": "0",
          "label": "Obligatoriu bugetul fiecărui spectator."
        },
        {
          "id": "1",
          "label": "Oferta de locuri."
        },
        {
          "id": "2",
          "label": "Raritatea tuturor biletelor."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un produs este „limitat”. Ce mai verifici?",
      "explanation": "O ofertă mică nu garantează potrivirea sau valoarea viitoare.",
      "correctFeedback": "Corect. O ofertă mică nu garantează potrivirea sau valoarea viitoare.",
      "incorrectFeedback": "Nu chiar. O ofertă mică nu garantează potrivirea sau valoarea viitoare.",
      "type": "scenariu",
      "context": "Un magazin promovează o colecție specială.",
      "options": [
        {
          "id": "0",
          "label": "Doar eticheta de raritate."
        },
        {
          "id": "1",
          "label": "Presupunerea că profitul este sigur."
        },
        {
          "id": "2",
          "label": "Disponibilitatea reală, utilitatea și alternativele."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cerere-si-oferta",
      "paragraphs": [
        "Vlad și Sofia vor să participe la un festival local. Sala are un număr fix de locuri, iar un artist popular anunță că va cânta acolo. Mulți colegi încep să caute bilete. Organizatorul păstrează prețul inițial, dar biletele se epuizează mai repede. Vlad observă oferte de revânzare mai scumpe și nu le confundă cu tariful oficial.",
        "Sofia găsește alt eveniment care adaugă o reprezentație, astfel încât sunt disponibile mai multe locuri. Nu presupune că prețul trebuie să scadă imediat; verifică oferta efectivă. Cei doi compară alternativele și bugetul, fără să considere că un bilet rar este automat potrivit. Înainte de plată caută canalul autorizat și condițiile. Popularitatea le explică o parte din presiunea asupra locurilor, dar nu verifică singură autenticitatea biletelor și nu justifică orice preț."
      ]
    },
    {
      "id": "q5",
      "question": "De ce s-au epuizat mai repede biletele oficiale?",
      "explanation": "Cererea mai mare poate accelera vânzările chiar fără schimbarea tarifului.",
      "correctFeedback": "Corect. Cererea mai mare poate accelera vânzările chiar fără schimbarea tarifului.",
      "incorrectFeedback": "Nu chiar. Cererea mai mare poate accelera vânzările chiar fără schimbarea tarifului.",
      "caseId": "caz-cerere-si-oferta",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "A crescut interesul pentru același număr de locuri."
        },
        {
          "id": "1",
          "label": "Prețul oficial trebuie să fi crescut, chiar dacă a rămas fix."
        },
        {
          "id": "2",
          "label": "Oferta de locuri s-a redus, deși capacitatea sălii este aceeași."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce spune noua reprezentație despre ofertă?",
      "explanation": "Oferta crește, dar tariful concret trebuie verificat.",
      "correctFeedback": "Corect. Oferta crește, dar tariful concret trebuie verificat.",
      "incorrectFeedback": "Nu chiar. Oferta crește, dar tariful concret trebuie verificat.",
      "caseId": "caz-cerere-si-oferta",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Prețul trebuie să scadă imediat, indiferent de costuri."
        },
        {
          "id": "1",
          "label": "Există mai multe locuri disponibile."
        },
        {
          "id": "2",
          "label": "Cererea a crescut automat în aceeași proporție."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce nu poate valida popularitatea?",
      "explanation": "Cererea și siguranța tranzacției sunt verificări diferite.",
      "correctFeedback": "Corect. Cererea și siguranța tranzacției sunt verificări diferite.",
      "incorrectFeedback": "Nu chiar. Cererea și siguranța tranzacției sunt verificări diferite.",
      "caseId": "caz-cerere-si-oferta",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Faptul că oamenii discută despre artist."
        },
        {
          "id": "1",
          "label": "Existența interesului pentru eveniment."
        },
        {
          "id": "2",
          "label": "Autenticitatea biletului oferit la revânzare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "„Ediție limitată” poate descrie o ofertă mică, dar poate fi și o tehnică de prezentare. Nu concluziona automat că produsul merită prețul cerut sau că va crește în valoare. Verifică disponibilitatea reală și alternativele. Raritatea și utilitatea personală sunt întrebări diferite.",
        "Când compari două momente, încearcă să schimbi mental un singur factor. Dacă numărul de bilete rămâne același și apar mai mulți cumpărători, urmărești cererea. Dacă interesul rămâne similar și apar mai multe locuri, urmărești oferta. Astfel eviți explicația vagă că orice scumpire vine doar dintr-un singur motiv."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un produs se scumpește după creșterea costurilor de producție. Ce concluzie e utilă?",
      "explanation": "Analiza caută factorul care s-a schimbat.",
      "correctFeedback": "Corect. Analiza caută factorul care s-a schimbat.",
      "incorrectFeedback": "Nu chiar. Analiza caută factorul care s-a schimbat.",
      "type": "scenariu",
      "context": "Numărul cumpărătorilor pare similar.",
      "options": [
        {
          "id": "0",
          "label": "Prețul poate fi influențat și de costuri, nu doar de cerere."
        },
        {
          "id": "1",
          "label": "Orice scumpire dovedește o modă."
        },
        {
          "id": "2",
          "label": "Oferta nu contează niciodată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ai buget limitat și un bilet foarte rar. Cum decizi?",
      "explanation": "Presiunea pieței nu înlocuiește decizia în contextul tău.",
      "correctFeedback": "Corect. Presiunea pieței nu înlocuiește decizia în contextul tău.",
      "incorrectFeedback": "Nu chiar. Presiunea pieței nu înlocuiește decizia în contextul tău.",
      "type": "scenariu",
      "context": "Mai există un eveniment cu locuri disponibile.",
      "options": [
        {
          "id": "0",
          "label": "Plătești orice fiindcă este rar."
        },
        {
          "id": "1",
          "label": "Compari experiența, alternativele și costul suportabil."
        },
        {
          "id": "2",
          "label": "Presupui că raritatea este o nevoie."
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
          "title": "Cerere",
          "body": "Popularitatea contează când se transformă în cumpărări.",
          "detail": "Un clip apreciat de mulți oameni nu confirmă că aceștia vor plăti prețul cerut. La bilete, interesul mai mare poate grăbi epuizarea locurilor chiar dacă organizatorul păstrează tariful.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Ofertă",
          "body": "Stocul sau numărul de locuri influențează disponibilitatea.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Mai mulți factori",
          "body": "Raritatea nu garantează valoarea sau siguranța.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Observă la un eveniment ce este limitat: numărul de locuri, timpul sau doar mesajul reclamei.",
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
