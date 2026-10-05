import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cardul-in-strainatate",
  "title": "Cardul în străinătate",
  "categoryId": "carduri-si-banca",
  "chapterId": "cardul",
  "slug": "cardul-in-strainatate",
  "description": "Sofia vede la un terminal două monede pentru aceeași cumpărătură. Alegerea cere comparația conversiei, nu o apăsare grăbită.",
  "objective": "Să poți identifica costuri și decizii de verificat înainte de a folosi cardul într-o altă monedă.",
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
      "title": "Cardul în străinătate",
      "body": "Sofia vede la un terminal două monede pentru aceeași cumpărătură. Alegerea cere comparația conversiei, nu o apăsare grăbită."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Într-o altă țară, plata poate implica o monedă diferită de cea a contului. Conversia și eventualele costuri determină suma finală. Nu presupune că folosirea cardului păstrează automat prețul exprimat în moneda contului. Verifică tariful, moneda tranzacției și cine face conversia.",
        "Unele terminale oferă plata în moneda locală sau conversia afișată în moneda ta. Cele două variante pot folosi mecanisme și cursuri diferite. Nu există în lecție un produs recomandat personal. Compară costul și condițiile efective, iar dacă informația lipsește, cere clarificare înainte să confirmi."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce influențează suma finală într-o altă monedă?",
      "explanation": "Moneda și mecanismul conversiei contează.",
      "correctFeedback": "Corect. Moneda și mecanismul conversiei contează.",
      "incorrectFeedback": "Nu chiar. Moneda și mecanismul conversiei contează.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Conversia și costurile aplicabile."
        },
        {
          "id": "1",
          "label": "Doar culoarea terminalului."
        },
        {
          "id": "2",
          "label": "Doar distanța călătoriei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Plata convenabilă cu cardul garantează retragere gratuită la orice bancomat.",
      "explanation": "Retragerile pot avea tarife și operatori diferiți.",
      "correctFeedback": "Corect. Retragerile pot avea tarife și operatori diferiți.",
      "incorrectFeedback": "Nu chiar. Retragerile pot avea tarife și operatori diferiți.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu ipotetic, o cumpărătură de 20 euro ar costa 100 lei la un curs de 5 lei pe euro, fără alte costuri. O conversie oferită pe terminal arată 106 lei. Diferența este 6 lei, dar comparația este completă numai dacă verifici și condițiile conversiei alternative prin serviciul tău.",
        "Retragerea de numerar este o operațiune distinctă. Pot exista costuri ale băncii și ale operatorului bancomatului. Nu deduce gratuitatea retragerii din gratuitatea plății. Citește ecranul și documentele relevante, inclusiv ce se întâmplă dacă refuzi conversia sau continui operațiunea."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "20 euro la curs ipotetic 5 lei/euro costă cât fără alte costuri?",
      "explanation": "20 × 5 = 100 lei în ipoteza dată.",
      "correctFeedback": "Corect. 20 × 5 = 100 lei în ipoteza dată.",
      "incorrectFeedback": "Nu chiar. 20 × 5 = 100 lei în ipoteza dată.",
      "type": "scenariu",
      "context": "Cifrele nu reprezintă o cotație actuală.",
      "options": [
        {
          "id": "0",
          "label": "25 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "106 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Terminalul oferă două monede. Ce verifici?",
      "explanation": "Variantele pot folosi cursuri și condiții diferite.",
      "correctFeedback": "Corect. Variantele pot folosi cursuri și condiții diferite.",
      "incorrectFeedback": "Nu chiar. Variantele pot folosi cursuri și condiții diferite.",
      "type": "scenariu",
      "context": "Urmează să confirmi cumpărătura.",
      "options": [
        {
          "id": "0",
          "label": "Alegi după mărimea fontului."
        },
        {
          "id": "1",
          "label": "Presupui că orice conversie este identică."
        },
        {
          "id": "2",
          "label": "Cine convertește și costul efectiv al ambelor variante."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cardul-in-strainatate",
      "paragraphs": [
        "Sofia merge într-o excursie de studenți și cumpără un obiect de 20 euro. Terminalul oferă o variantă de 106 lei sau plata în euro. În exercițiu, serviciul cardului ar converti la 5 lei pe euro fără alte costuri, adică 100 lei. Sofia compară cele două condiții ipotetice, fără să presupună că vor fi identice la orice card.",
        "Pentru o retragere ulterioară, bancomatul afișează separat un cost al operatorului. Sofia verifică și tariful propriului cont înainte să continue. Ea nu consideră că plata convenabilă la magazin face retragerea gratuită. Păstrează confirmările și urmărește istoricul. Înainte de drum a salvat canalul oficial de ajutor și a verificat limitele. Dacă pierde cardul, știe unde poate solicita blocarea. Astfel pregătirea și verificarea fiecărei operațiuni sunt distincte de alegerea unei instituții recomandate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Care este diferența din cazul Sofiei?",
      "explanation": "106 − 100 = 6 lei în exercițiu.",
      "correctFeedback": "Corect. 106 − 100 = 6 lei în exercițiu.",
      "incorrectFeedback": "Nu chiar. 106 − 100 = 6 lei în exercițiu.",
      "caseId": "caz-cardul-in-strainatate",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "6 lei."
        },
        {
          "id": "1",
          "label": "20 lei."
        },
        {
          "id": "2",
          "label": "100 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce verifică la bancomat separat?",
      "explanation": "Retragerea este o nouă operațiune cu propriile costuri.",
      "correctFeedback": "Corect. Retragerea este o nouă operațiune cu propriile costuri.",
      "incorrectFeedback": "Nu chiar. Retragerea este o nouă operațiune cu propriile costuri.",
      "caseId": "caz-cardul-in-strainatate",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar tariful filmului."
        },
        {
          "id": "1",
          "label": "Costul operatorului și tariful contului."
        },
        {
          "id": "2",
          "label": "Doar prețul obiectului cumpărat."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "De ce nu generalizează cursul exercițiului?",
      "explanation": "Exemplul învață calculul, nu recomandă un produs.",
      "correctFeedback": "Corect. Exemplul învață calculul, nu recomandă un produs.",
      "incorrectFeedback": "Nu chiar. Exemplul învață calculul, nu recomandă un produs.",
      "caseId": "caz-cardul-in-strainatate",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Cursurile sunt întotdeauna fixe."
        },
        {
          "id": "1",
          "label": "Toate cardurile au același tarif."
        },
        {
          "id": "2",
          "label": "Este ipotetic, iar serviciile reale au condiții proprii."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Înainte de călătorie, verifică funcționarea cardului, limitele relevante și canalul oficial de ajutor. Pregătește o modalitate de reacție dacă telefonul sau cardul se pierde. Nu oferi date de acces unei persoane care se prezintă drept suport printr-un mesaj neașteptat.",
        "După plată, urmărește moneda și suma în istoric. O sumă rezervată și valoarea finală pot necesita explicația serviciului folosit. Nu repeta o plată neclară fără verificare. Exemplele de curs sunt doar aritmetice; ele nu prezic euro și nu stabilesc tariful niciunei instituții. Scopul este să înțelegi întrebările relevante înainte de confirmare."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ce pregătești înainte de drum?",
      "explanation": "Pregătirea facilitează reacția la probleme.",
      "correctFeedback": "Corect. Pregătirea facilitează reacția la probleme.",
      "incorrectFeedback": "Nu chiar. Pregătirea facilitează reacția la probleme.",
      "type": "scenariu",
      "context": "Vei folosi cardul într-o altă țară.",
      "options": [
        {
          "id": "0",
          "label": "Limitele relevante și canalul oficial de ajutor."
        },
        {
          "id": "1",
          "label": "Parola scrisă public pe card."
        },
        {
          "id": "2",
          "label": "Un link de suport anonim."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "O plată apare neclară în istoric. Ce faci înainte s-o repeți?",
      "explanation": "Verificarea evită concluziile și plățile duplicate.",
      "correctFeedback": "Corect. Verificarea evită concluziile și plățile duplicate.",
      "incorrectFeedback": "Nu chiar. Verificarea evită concluziile și plățile duplicate.",
      "type": "scenariu",
      "context": "Terminalul nu a arătat un rezultat clar.",
      "options": [
        {
          "id": "0",
          "label": "Confirmi din nou de mai multe ori."
        },
        {
          "id": "1",
          "label": "Verifici starea și suma prin serviciul folosit."
        },
        {
          "id": "2",
          "label": "Presupui că orice rezervare este finală."
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
          "title": "Monedă",
          "body": "Verifică în ce monedă se face plata.",
          "detail": "Verifică în ce monedă se face plata.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Conversie",
          "body": "Compară cursul și toate costurile.",
          "detail": "Compară cursul și toate costurile.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Pregătire",
          "body": "Salvează canalul oficial pentru probleme.",
          "detail": "Salvează canalul oficial pentru probleme.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Înainte de o călătorie, găsește tarifele pentru o plată și o retragere în altă monedă.",
          "detail": "Înainte de o călătorie, găsește tarifele pentru o plată și o retragere în altă monedă.",
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
