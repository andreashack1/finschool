import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "costul-real-al-unui-produs",
  "title": "Costul real al unui produs",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "nevoi-si-dorinte",
  "slug": "costul-real-al-unui-produs",
  "description": "Un dispozitiv costă 250 lei în reclamă, dar nu include accesoriul necesar și transportul. Eticheta nu spune toată povestea.",
  "objective": "Să poți calcula și identifica costuri suplimentare precum transport, accesorii, comisioane sau costuri recurente.",
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
      "title": "Costul real al unui produs",
      "body": "Un dispozitiv costă 250 lei în reclamă, dar nu include accesoriul necesar și transportul. Eticheta nu spune toată povestea."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Costul de pe etichetă este un punct de pornire. Costul real poate include ce trebuie să plătești ca să primești și să folosești produsul: transport, accesorii necesare, instalare sau consumabile. Nu orice accesoriu este obligatoriu; separă ce este necesar de ce îți dorești în plus.",
        "Într-un exemplu, un dispozitiv costă 250 lei, transportul 20 lei și accesoriul necesar 30 lei. Totalul inițial este 300 lei. O ofertă la 280 lei care le include poate fi mai ieftină pentru aceeași utilizare. Comparația cere componente echivalente, nu doar două etichete."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce trebuie adăugat la preț pentru comparație?",
      "explanation": "Totalul relevant include componente necesare și confirmate.",
      "correctFeedback": "Corect. Totalul relevant include componente necesare și confirmate.",
      "incorrectFeedback": "Nu chiar. Totalul relevant include componente necesare și confirmate.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Costurile necesare primirii și utilizării produsului."
        },
        {
          "id": "1",
          "label": "Orice accesoriu imaginabil."
        },
        {
          "id": "2",
          "label": "Doar produsele cumpărate de prieteni."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O etichetă mai mică garantează costul total mai mic.",
      "explanation": "Transportul, accesoriile și costurile recurente pot schimba comparația.",
      "correctFeedback": "Corect. Transportul, accesoriile și costurile recurente pot schimba comparația.",
      "incorrectFeedback": "Nu chiar. Transportul, accesoriile și costurile recurente pot schimba comparația.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Unele produse continuă să coste după cumpărare. Un aparat poate avea consumabile, o aplicație poate cere abonament, iar un obiect poate necesita întreținere. Alege o perioadă pentru comparație, precum un an, și estimează aceleași componente pentru ambele variante. Nu amesteca prețul inițial al uneia cu costul anual al celeilalte.",
        "Dacă un serviciu atașat costă ipotetic 10 lei lunar, în douăsprezece luni adaugă 120 lei. Totalul unui dispozitiv de 300 lei devine 420 lei în acest exemplu, dacă nu există alte costuri. Estimarea ajută planificarea, dar trebuie actualizată dacă utilizarea diferă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cât costă inițial 250 + 20 + 30 lei?",
      "explanation": "Aduni toate cele trei componente necesare.",
      "correctFeedback": "Corect. Aduni toate cele trei componente necesare.",
      "incorrectFeedback": "Nu chiar. Aduni toate cele trei componente necesare.",
      "type": "scenariu",
      "context": "Dispozitivul necesită accesoriul din exemplu.",
      "options": [
        {
          "id": "0",
          "label": "280 lei."
        },
        {
          "id": "1",
          "label": "300 lei."
        },
        {
          "id": "2",
          "label": "250 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un serviciu costă 10 lei lunar. Cât adaugă într-un an?",
      "explanation": "10 × 12 = 120 lei, dacă este folosit tot anul.",
      "correctFeedback": "Corect. 10 × 12 = 120 lei, dacă este folosit tot anul.",
      "incorrectFeedback": "Nu chiar. 10 × 12 = 120 lei, dacă este folosit tot anul.",
      "type": "scenariu",
      "context": "Nu există alte costuri în exercițiu.",
      "options": [
        {
          "id": "0",
          "label": "10 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "120 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-costul-real-al-unui-produs",
      "paragraphs": [
        "Radu caută un dispozitiv pentru proiectele de la facultate. Prima ofertă afișează 250 lei. În pagina de comandă descoperă transport de 20 lei și un accesoriu de 30 lei fără de care nu îl poate folosi cu laptopul lui. A doua ofertă costă 280 lei și le include pe ambele. Produsele au aceeași utilitate de bază în acest exercițiu.",
        "Radu află apoi că serviciul opțional al primei variante costă 10 lei lunar. Nu îl trece automat în total, fiindcă trebuie să afle dacă îi este necesar. Compară costul inițial și separat scenariul unui an de utilizare cu serviciu. Mai verifică compatibilitatea și posibilitatea de reparare. În loc să aleagă doar cifra de 250 lei, notează ce este inclus, ce este opțional și ce informație lipsește pentru o comparație corectă."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Care ofertă este mai ieftină inițial în caz?",
      "explanation": "Componentele incluse fac diferența.",
      "correctFeedback": "Corect. Componentele incluse fac diferența.",
      "incorrectFeedback": "Nu chiar. Componentele incluse fac diferența.",
      "caseId": "caz-costul-real-al-unui-produs",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "A doua: 280 lei față de 300 lei."
        },
        {
          "id": "1",
          "label": "Prima, doar fiindcă eticheta spune 250."
        },
        {
          "id": "2",
          "label": "Nu poate fi făcută nicio adunare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "De ce Radu verifică serviciul opțional?",
      "explanation": "Un cost opțional intră în scenariul relevant dacă îl folosești.",
      "correctFeedback": "Corect. Un cost opțional intră în scenariul relevant dacă îl folosești.",
      "incorrectFeedback": "Nu chiar. Un cost opțional intră în scenariul relevant dacă îl folosești.",
      "caseId": "caz-costul-real-al-unui-produs",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ca să considere toate opțiunile obligatorii."
        },
        {
          "id": "1",
          "label": "Ca să afle dacă este necesar pentru utilizarea lui."
        },
        {
          "id": "2",
          "label": "Ca să ignore orice cost lunar."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce informație ar mai putea schimba alegerea?",
      "explanation": "Utilitatea și întreținerea completează costul.",
      "correctFeedback": "Corect. Utilitatea și întreținerea completează costul.",
      "incorrectFeedback": "Nu chiar. Utilitatea și întreținerea completează costul.",
      "caseId": "caz-costul-real-al-unui-produs",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Culoarea mesajului promoțional."
        },
        {
          "id": "1",
          "label": "Numărul de reclame văzute."
        },
        {
          "id": "2",
          "label": "Compatibilitatea și durata utilizării."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Cel mai mic cost nu este singurul criteriu. Un produs mai durabil, reparabil sau potrivit poate justifica un preț inițial mai mare. Întrebarea este dacă beneficiul este relevant pentru utilizarea ta și dacă îl poți verifica. O promisiune vagă de calitate nu este echivalentă cu o informație despre compatibilitate sau garanție.",
        "Nu include costuri inventate doar ca să faci o ofertă să pară rea. Marchează ce este confirmat și ce este estimat. Dacă lipsește o informație importantă, cere-o înainte de plată. Un total clar te ajută să compari alternativele și să vezi dacă achiziția încape în buget."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Cum compari corect costuri recurente?",
      "explanation": "Ipotezele echivalente fac comparația utilă.",
      "correctFeedback": "Corect. Ipotezele echivalente fac comparația utilă.",
      "incorrectFeedback": "Nu chiar. Ipotezele echivalente fac comparația utilă.",
      "type": "scenariu",
      "context": "Două produse au abonamente diferite.",
      "options": [
        {
          "id": "0",
          "label": "Pentru aceeași perioadă și utilizare estimată."
        },
        {
          "id": "1",
          "label": "O lună pentru unul și un an pentru altul."
        },
        {
          "id": "2",
          "label": "Fără să verifici dacă serviciul este folosit."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Lipsește prețul unui consumabil necesar. Ce faci?",
      "explanation": "O informație necunoscută trebuie verificată.",
      "correctFeedback": "Corect. O informație necunoscută trebuie verificată.",
      "incorrectFeedback": "Nu chiar. O informație necunoscută trebuie verificată.",
      "type": "scenariu",
      "context": "Vrei să compari costul unui an.",
      "options": [
        {
          "id": "0",
          "label": "Presupui automat că este gratuit."
        },
        {
          "id": "1",
          "label": "Ceri informația și marchezi totalul ca incomplet."
        },
        {
          "id": "2",
          "label": "Inventez o sumă care justifică alegerea."
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
          "title": "Total inițial",
          "body": "Adună transportul și accesoriile necesare.",
          "detail": "Adună transportul și accesoriile necesare.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Perioadă",
          "body": "Compară costurile recurente pe același interval.",
          "detail": "Compară costurile recurente pe același interval.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Utilitate",
          "body": "Un total mai mic nu înlocuiește potrivirea produsului.",
          "detail": "Un total mai mic nu înlocuiește potrivirea produsului.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "La o ofertă informativă, notează prețul, două costuri suplimentare posibile și ce trebuie confirmat.",
          "detail": "La o ofertă informativă, notează prețul, două costuri suplimentare posibile și ce trebuie confirmat.",
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
