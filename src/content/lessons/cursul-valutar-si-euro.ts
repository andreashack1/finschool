import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cursul-valutar-si-euro",
  "title": "Cursul valutar și euro",
  "categoryId": "cuvintele-banilor",
  "chapterId": "taxe-si-valute",
  "slug": "cursul-valutar-si-euro",
  "description": "Sofia are nevoie de 100 euro pentru o excursie. Vede două cursuri și un comision. Care este costul real în lei?",
  "objective": "Să poți interpreta un curs valutar simplu și să compari ce se întâmplă când schimbi lei în euro sau invers.",
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
      "title": "Cursul valutar și euro",
      "body": "Sofia are nevoie de 100 euro pentru o excursie. Vede două cursuri și un comision. Care este costul real în lei?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un curs valutar exprimă raportul dintre două monede. Dacă, într-un exemplu, un euro costă 5 lei, atunci 100 euro costă 500 lei înainte de alte costuri. Cifrele folosite aici sunt ipotetice, nu cotații actuale. Când schimbi în sens invers, aceeași relație ar însemna 500 lei împărțiți la 5, adică 100 euro.",
        "Într-o ofertă reală pot exista cursuri diferite pentru cumpărare și vânzare. Denumirile sunt adesea privite din perspectiva instituției. Ca să nu inversezi operațiunea, întreabă concret câți lei dai și câți euro primești pentru suma ta."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "La cursul ipotetic 5 lei/euro, cât costă 100 euro fără comision?",
      "explanation": "100 × 5 = 500 lei.",
      "correctFeedback": "Corect. 100 × 5 = 500 lei.",
      "incorrectFeedback": "Nu chiar. 100 × 5 = 500 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "500 lei."
        },
        {
          "id": "1",
          "label": "20 lei."
        },
        {
          "id": "2",
          "label": "105 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un curs de referință garantează oferta fiecărei instituții.",
      "explanation": "Oferta efectivă și costurile pot diferi de reper.",
      "correctFeedback": "Corect. Oferta efectivă și costurile pot diferi de reper.",
      "incorrectFeedback": "Nu chiar. Oferta efectivă și costurile pot diferi de reper.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pentru aceeași sumă în euro, un curs mai mare în lei pe euro înseamnă mai mulți lei de plătit. În exemplu, 100 euro la 5 lei costă 500 lei, iar la 5,10 lei costă 510 lei înainte de comisioane. Diferența este 10 lei, nu 0,10 lei pentru întreaga tranzacție.",
        "Comisioanele pot schimba comparația. O ofertă cu un curs mai mic poate avea un cost fix suplimentar. Compară suma finală pe care o plătești și suma finală primită. Verifică și momentul cursului, deoarece o ofertă văzută anterior poate să nu fie disponibilă la confirmare."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "La 5,10 lei/euro, cât costă 100 euro fără comision?",
      "explanation": "100 × 5,10 = 510 lei.",
      "correctFeedback": "Corect. 100 × 5,10 = 510 lei.",
      "incorrectFeedback": "Nu chiar. 100 × 5,10 = 510 lei.",
      "type": "scenariu",
      "context": "Folosești o cotație ipotetică pentru exercițiu.",
      "options": [
        {
          "id": "0",
          "label": "500 lei."
        },
        {
          "id": "1",
          "label": "510 lei."
        },
        {
          "id": "2",
          "label": "5,10 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ai 500 lei și curs ipotetic 5 lei/euro fără costuri. Câți euro primești?",
      "explanation": "În acest sens împărți lei la lei/euro.",
      "correctFeedback": "Corect. În acest sens împărți lei la lei/euro.",
      "incorrectFeedback": "Nu chiar. În acest sens împărți lei la lei/euro.",
      "type": "scenariu",
      "context": "Schimbi din lei în euro.",
      "options": [
        {
          "id": "0",
          "label": "2.500 euro."
        },
        {
          "id": "1",
          "label": "495 euro."
        },
        {
          "id": "2",
          "label": "100 euro."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cursul-valutar-si-euro",
      "paragraphs": [
        "Sofia organizează o excursie cu colegii și trebuie să plătească 100 euro. Pentru exercițiu găsește două oferte ipotetice: prima schimbă la 5 lei pentru un euro și adaugă 15 lei comision, iar a doua la 5,10 lei fără comision. Ea vede cifra mai mică din prima ofertă și este tentată să o aleagă imediat.",
        "Înainte de confirmare, Sofia calculează costul total: 515 lei pentru prima și 510 lei pentru a doua. Mai verifică dacă aceste oferte se referă la operațiunea de care are nevoie, adică dă lei și primește euro. Un coleg îi trimite un curs de referință văzut dimineață, dar acesta nu este neapărat prețul tranzacției din aplicație. Sofia notează totalul confirmat, păstrează loc pentru costurile excursiei și nu folosește cifrele exercițiului ca predicție pentru săptămâna viitoare."
      ]
    },
    {
      "id": "q5",
      "question": "Cât costă prima ofertă din caz?",
      "explanation": "100 × 5 + 15 = 515 lei.",
      "correctFeedback": "Corect. 100 × 5 + 15 = 515 lei.",
      "incorrectFeedback": "Nu chiar. 100 × 5 + 15 = 515 lei.",
      "caseId": "caz-cursul-valutar-si-euro",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "515 lei."
        },
        {
          "id": "1",
          "label": "500 lei."
        },
        {
          "id": "2",
          "label": "510 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Care ofertă are totalul mai mic în exemplu?",
      "explanation": "Comisionul poate inversa comparația ratelor.",
      "correctFeedback": "Corect. Comisionul poate inversa comparația ratelor.",
      "incorrectFeedback": "Nu chiar. Comisionul poate inversa comparația ratelor.",
      "caseId": "caz-cursul-valutar-si-euro",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Prima, doar fiindcă rata afișată e mai mică."
        },
        {
          "id": "1",
          "label": "A doua: 510 lei față de 515 lei."
        },
        {
          "id": "2",
          "label": "Sunt identice fără calcul."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce trebuie confirmat despre sensul operațiunii?",
      "explanation": "Cumpărare și vânzare pot fi afișate din perspectiva instituției.",
      "correctFeedback": "Corect. Cumpărare și vânzare pot fi afișate din perspectiva instituției.",
      "incorrectFeedback": "Nu chiar. Cumpărare și vânzare pot fi afișate din perspectiva instituției.",
      "caseId": "caz-cursul-valutar-si-euro",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar cursul pentru operațiunea inversă, presupunând că este identic."
        },
        {
          "id": "1",
          "label": "Doar valuta contului, fără suma finală primită."
        },
        {
          "id": "2",
          "label": "Câți lei dă Sofia și câți euro primește."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu presupune că o monedă va avea mâine cursul de astăzi sau că un curs de referință este oferta ta garantată. Pentru o plată apropiată contează suma confirmată în operațiune. Prognozele și zvonurile nu sunt echivalente cu un preț efectiv și pot introduce riscuri suplimentare.",
        "Mai verifică dacă plata este exprimată în lei sau în euro și cine face conversia. O comparație clară începe cu moneda datorată, apoi cu raportul de schimb și costurile. Nu trebuie să prezici piețele ca să eviți inversarea calculelor sau omiterea unui comision în bugetul excursiei."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Cursul crește de la 5 la 5,10 pentru 100 euro. Cu cât crește costul fără comisioane?",
      "explanation": "Diferența de 0,10 se aplică fiecăruia dintre cei 100 euro.",
      "correctFeedback": "Corect. Diferența de 0,10 se aplică fiecăruia dintre cei 100 euro.",
      "incorrectFeedback": "Nu chiar. Diferența de 0,10 se aplică fiecăruia dintre cei 100 euro.",
      "type": "scenariu",
      "context": "Compari două cotații ipotetice.",
      "options": [
        {
          "id": "0",
          "label": "10 lei."
        },
        {
          "id": "1",
          "label": "0,10 lei."
        },
        {
          "id": "2",
          "label": "100 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici chiar înainte de confirmare?",
      "explanation": "Prețul efectiv al tranzacției poate diferi de reperul anterior.",
      "correctFeedback": "Corect. Prețul efectiv al tranzacției poate diferi de reperul anterior.",
      "incorrectFeedback": "Nu chiar. Prețul efectiv al tranzacției poate diferi de reperul anterior.",
      "type": "scenariu",
      "context": "Urmează să schimbi bani pentru o plată.",
      "options": [
        {
          "id": "0",
          "label": "Doar o captură veche cu un curs."
        },
        {
          "id": "1",
          "label": "Totalul operațiunii, moneda și comisioanele curente."
        },
        {
          "id": "2",
          "label": "Predicția unui comentariu anonim."
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
          "title": "Sensul",
          "body": "Clarifică moneda dată și moneda primită.",
          "detail": "Cotațiile de cumpărare și vânzare pot fi prezentate din perspectiva instituției. Înainte de confirmare, verifică exact câți lei dai, câți euro primești și ce comision se adaugă.",
          "type": "normal",
          "detailHighlights": [
            "confirmare",
            "euro"
          ]
        },
        {
          "id": "idee-1",
          "title": "Calcul",
          "body": "Pentru lei/euro înmulțești euro ca să afli lei.",
          "type": "normal",
          "detail": "Verifică unitatea cotației înainte să calculezi. Un curs afișat pentru un euro se folosește diferit de unul pentru o sută de unități.",
          "detailHighlights": [
            "euro"
          ]
        },
        {
          "id": "idee-2",
          "title": "Totalul",
          "body": "Compară cursul împreună cu toate costurile.",
          "type": "normal",
          "detail": "Un curs atractiv poate veni cu un comision fix. Pentru sume mici, acesta poate schimba oferta mai avantajoasă.",
          "detailHighlights": [
            "comision fix",
            "sume"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Compară informativ două oferte pentru aceeași sumă și notează totalul, fără să faci schimbul.",
          "type": "action",
          "detail": "Cere sau simulează suma netă primită pentru aceeași sumă dată, ca să compari oferte în aceeași direcție.",
          "detailHighlights": [
            "suma netă",
            "sumă"
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
