import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "tichete-si-beneficii",
  "title": "Tichete și beneficii",
  "categoryId": "primul-job",
  "chapterId": "salariul",
  "slug": "tichete-si-beneficii",
  "description": "Lia are de plătit o chirie și găsește o ofertă cu abonament medical și bonus de performanță.",
  "objective": "Să poți explica tichete și beneficii și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "Inspecția Muncii · Codul muncii",
    "url": "https://inprobe.inspectiamuncii.ro/informatii-utile/codul-muncii/"
  },
  {
    "label": "ANAF · Codul fiscal",
    "url": "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Tichete și beneficii",
      "body": "Lia are de plătit o chirie și găsește o ofertă cu abonament medical și bonus de performanță."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Pachetul de remunerare poate include bani și beneficii cu utilizări diferite. Tichetele de masă nu sunt același lucru cu numerarul liber disponibil. Un abonament medical sau un curs poate fi util, dar valoarea afișată nu este automat venit de cheltuit. Verifică eligibilitatea, frecvența și tratamentul fiscal înainte de a compara două pachete.",
        "La primul job, separă promisiunea verbală de informația scrisă. Păstrează documentele primite și cere explicații despre termenii pe care nu îi înțelegi. O discuție clară înainte de începere ajută atât planul de bani, cât și organizarea timpului. Nu transmite public documente care conțin date personale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce distincție contează la beneficii?",
      "explanation": "Bani disponibili, servicii și sume condiționate.",
      "correctFeedback": "Corect. Bani disponibili, servicii și sume condiționate.",
      "incorrectFeedback": "Nu chiar. Bani disponibili, servicii și sume condiționate.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Bani disponibili, servicii și sume condiționate."
        },
        {
          "id": "1",
          "label": "Doar numărul de beneficii."
        },
        {
          "id": "2",
          "label": "Doar valoarea totală din reclamă, fără utilizările permise."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O ofertă cu net mai mic, dar cu abonament medical, poate fi utilă în funcție de serviciile folosite; valoarea abonamentului nu este numerar pentru chirie.",
      "explanation": "Banii și serviciile au utilizări diferite. Compară costul înlocuit de beneficiu și netul fix, fără să adaugi valoarea comercială la sold.",
      "correctFeedback": "Corect. Banii și serviciile au utilizări diferite. Compară costul înlocuit de beneficiu și netul fix, fără să adaugi valoarea comercială la sold.",
      "incorrectFeedback": "Nu chiar. Banii și serviciile au utilizări diferite. Compară costul înlocuit de beneficiu și netul fix, fără să adaugi valoarea comercială la sold.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Lia compară o ofertă cu 3.000 lei net și beneficii cu una de 3.200 lei net fără aceleași beneficii. Nu adună abonamentul medical la soldul pentru chirie. Verifică dacă ar folosi serviciul și ce cheltuială ar înlocui. O primă dependentă de obiective este trecută separat de venitul fix, deoarece plata ei nu este sigură.",
        "Într-o comparație de oferte, folosește aceeași perioadă și aceeași normă de lucru. Notează ce este confirmat și ce este doar estimare. Cifrele din lecție sunt exerciții, nu salarii impuse de lege. Pentru situația reală, verifică documentele angajatorului și regulile aplicabile la data respectivă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Un abonament medical valorează comercial 100 lei. Ce înseamnă?",
      "explanation": "Este un serviciu, nu 100 lei adăugați automat în cont.",
      "correctFeedback": "Corect. Este un serviciu, nu 100 lei adăugați automat în cont.",
      "incorrectFeedback": "Nu chiar. Este un serviciu, nu 100 lei adăugați automat în cont.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Ai primit numerar."
        },
        {
          "id": "1",
          "label": "Este un serviciu, nu 100 lei adăugați automat în cont."
        },
        {
          "id": "2",
          "label": "Îți reduce orice factură cu 100 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Bonusul depinde de obiective. Cum îl bugetezi?",
      "explanation": "Separat de venitul fix confirmat.",
      "correctFeedback": "Corect. Separat de venitul fix confirmat.",
      "incorrectFeedback": "Nu chiar. Separat de venitul fix confirmat.",
      "type": "scenariu",
      "context": "Lia compară o ofertă cu 3.000 lei net și beneficii cu una de 3.200 lei net fără aceleași beneficii. Nu adună abonamentul medical la soldul pentru chirie. Verifică dacă ar folosi serviciul și ce cheltuială ar înlocui. O primă dependentă de obiective este trecută separat de venitul fix, deoarece plata ei nu este sigură.",
      "options": [
        {
          "id": "0",
          "label": "Ca sigur în fiecare lună."
        },
        {
          "id": "1",
          "label": "Ca sumă deja economisită."
        },
        {
          "id": "2",
          "label": "Separat de venitul fix confirmat."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-tichete-si-beneficii",
      "paragraphs": [
        "Lia are de plătit o chirie și găsește o ofertă cu abonament medical și bonus de performanță. Reclama prezintă valoarea totală a pachetului, dar chiria se plătește din bani disponibili. Lia separă netul fix de servicii și bonusul condiționat. Întreabă când se acordă tichetele și ce utilizări au, apoi compară oferta cu una care oferă mai mulți bani net.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Lia compară o ofertă cu 3.000 lei net și beneficii cu una de 3.200 lei net fără aceleași beneficii. Nu adună abonamentul medical la soldul pentru chirie. Verifică dacă ar folosi serviciul și ce cheltuială ar înlocui. O primă dependentă de obiective este trecută separat de venitul fix, deoarece plata ei nu este sigură. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Lia trebuie să plătească chiria. Ce componentă cere acoperire din netul disponibil, chiar dacă pachetul include servicii?",
      "explanation": "Chiria cere bani disponibili. Un serviciu sau un bonus posibil nu acoperă automat o plată care trebuie făcută acum.",
      "correctFeedback": "Corect. Chiria cere bani disponibili. Un serviciu sau un bonus posibil nu acoperă automat o plată care trebuie făcută acum.",
      "incorrectFeedback": "Nu chiar. Chiria cere bani disponibili. Un serviciu sau un bonus posibil nu acoperă automat o plată care trebuie făcută acum.",
      "caseId": "caz-tichete-si-beneficii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Chiria."
        },
        {
          "id": "1",
          "label": "Valoarea comercială a abonamentului medical, tratată ca sumă intrată în cont."
        },
        {
          "id": "2",
          "label": "Bonusul condiționat, considerat încasat înainte de confirmare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce clarificare cere Lia despre tichete?",
      "explanation": "Momentul acordării și utilizările permise.",
      "correctFeedback": "Corect. Momentul acordării și utilizările permise.",
      "incorrectFeedback": "Nu chiar. Momentul acordării și utilizările permise.",
      "caseId": "caz-tichete-si-beneficii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar valoarea nominală, presupunând că poate fi folosită la orice plată."
        },
        {
          "id": "1",
          "label": "Momentul acordării și utilizările permise."
        },
        {
          "id": "2",
          "label": "Doar totalul anual, fără momentul acordării."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Cum compară utilitatea abonamentului?",
      "explanation": "Verifică dacă îl folosește și ce cost ar înlocui.",
      "correctFeedback": "Corect. Verifică dacă îl folosește și ce cost ar înlocui.",
      "incorrectFeedback": "Nu chiar. Verifică dacă îl folosește și ce cost ar înlocui.",
      "caseId": "caz-tichete-si-beneficii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Adaugă automat valoarea la net."
        },
        {
          "id": "1",
          "label": "Îl consideră mereu fără valoare."
        },
        {
          "id": "2",
          "label": "Verifică dacă îl folosește și ce cost ar înlocui."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O valoare din reclamă poate fi brută, condiționată sau limitată la anumite utilizări. Cere politica beneficiului și eventualele rețineri, fără să presupui un tratament identic pentru toate produsele. Nu bugeta fiecare lună ca și cum bonusul maxim ar fi deja câștigat. Compară și accesul real la serviciu, nu numai prețul comercial anunțat.",
        "Dacă observi o diferență, formulează o întrebare concretă și păstrează răspunsul. Nu completa singur informația lipsă cu o presupunere favorabilă. Pentru o problemă contractuală sau fiscală, folosește sursa oficială relevantă și ajutor calificat. Un exemplu de învățare nu poate acoperi toate situațiile de muncă."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un beneficiu are condiții de eligibilitate. Ce verifici?",
      "explanation": "Dacă îndeplinești condițiile și când ai acces.",
      "correctFeedback": "Corect. Dacă îndeplinești condițiile și când ai acces.",
      "incorrectFeedback": "Nu chiar. Dacă îndeplinești condițiile și când ai acces.",
      "type": "scenariu",
      "context": "Lia compară o ofertă cu 3.000 lei net și beneficii cu una de 3.200 lei net fără aceleași beneficii. Nu adună abonamentul medical la soldul pentru chirie. Verifică dacă ar folosi serviciul și ce cheltuială ar înlocui. O primă dependentă de obiective este trecută separat de venitul fix, deoarece plata ei nu este sigură.",
      "options": [
        {
          "id": "0",
          "label": "Dacă îndeplinești condițiile și când ai acces."
        },
        {
          "id": "1",
          "label": "Doar numele beneficiului."
        },
        {
          "id": "2",
          "label": "Doar suma maximă din reclamă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Oferta afișează doar totalul pachetului. Ce ceri?",
      "explanation": "Defalcarea sumelor și tratamentului lor.",
      "correctFeedback": "Corect. Defalcarea sumelor și tratamentului lor.",
      "incorrectFeedback": "Nu chiar. Defalcarea sumelor și tratamentului lor.",
      "type": "scenariu",
      "context": "Lia compară o ofertă cu 3.000 lei net și beneficii cu una de 3.200 lei net fără aceleași beneficii. Nu adună abonamentul medical la soldul pentru chirie. Verifică dacă ar folosi serviciul și ce cheltuială ar înlocui. O primă dependentă de obiective este trecută separat de venitul fix, deoarece plata ei nu este sigură.",
      "options": [
        {
          "id": "0",
          "label": "O singură sumă mai mare."
        },
        {
          "id": "1",
          "label": "Defalcarea sumelor și tratamentului lor."
        },
        {
          "id": "2",
          "label": "Doar valoarea maximă a bonusului, fără condițiile sale."
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
          "body": "Pachetul de remunerare poate include bani și beneficii cu utilizări diferite.",
          "detail": "Un abonament medical poate înlocui un serviciu folosit, dar nu intră automat ca numerar pentru chirie. Lia compară separat netul fix, serviciile utile și bonusurile condiționate.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Lia compară o ofertă cu 3.000 lei net și beneficii cu una de 3.200 lei net fără aceleași beneficii. Nu adună abonamentul medical la soldul pentru chirie.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "O valoare din reclamă poate fi brută, condiționată sau limitată la anumite utilizări.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Separă într-o ofertă fictivă netul fix, beneficiile folosite și bonusurile condiționate.",
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
