import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "presiunea-sociala",
  "title": "Presiunea socială",
  "categoryId": "de-ce-cheltuim-cum-cheltuim",
  "chapterId": "presiunea-din-jur",
  "slug": "presiunea-sociala",
  "description": "Radu este invitat la o ieșire care costă aproximativ 120 lei.",
  "objective": "Să poți explica presiunea socială și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Presiunea socială",
      "body": "Radu este invitat la o ieșire care costă aproximativ 120 lei."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Presiunea socială apare când alegerea de bani este influențată de așteptările grupului. Poate privi ieșiri, haine, cadouri sau dispozitive. O invitație nu creează aceeași capacitate de plată pentru fiecare. Poți pune o limită și propune o alternativă fără să explici toate detaliile veniturilor tale. Apartenența nu trebuie măsurată prin suma cheltuită.",
        "Un obicei de cheltuire nu definește valoarea unei persoane. Observă contextul, informația disponibilă și alternativa pe care o ai. O pauză scurtă și o întrebare concretă pot face alegerea mai ușor de evaluat. Nu trebuie să elimini orice plăcere pentru a construi un plan de bani util."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce poate influența presiunea socială?",
      "explanation": "Cheltuieli pentru a corespunde așteptărilor grupului.",
      "correctFeedback": "Corect. Cheltuieli pentru a corespunde așteptărilor grupului.",
      "incorrectFeedback": "Nu chiar. Cheltuieli pentru a corespunde așteptărilor grupului.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Cheltuieli pentru a corespunde așteptărilor grupului."
        },
        {
          "id": "1",
          "label": "Doar taxele legale."
        },
        {
          "id": "2",
          "label": "Numai prețul utilităților."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Presiunea socială apare când alegerea de bani este influențată de așteptările grupului.",
      "explanation": "Presiunea socială apare când alegerea de bani este influențată de așteptările grupului. Poate privi ieșiri, haine, cadouri sau dispozitive. O invitație nu creează aceeași capacitate de plată pentru fiecare. Poți pune o limită și propune o alternativă fără să explici toate detaliile veniturilor tale. Apartenența nu trebuie măsurată prin suma cheltuită.",
      "correctFeedback": "Corect. Presiunea socială apare când alegerea de bani este influențată de așteptările grupului. Poate privi ieșiri, haine, cadouri sau dispozitive. O invitație nu creează aceeași capacitate de plată pentru fiecare. Poți pune o limită și propune o alternativă fără să explici toate detaliile veniturilor tale. Apartenența nu trebuie măsurată prin suma cheltuită.",
      "incorrectFeedback": "Nu chiar. Presiunea socială apare când alegerea de bani este influențată de așteptările grupului. Poate privi ieșiri, haine, cadouri sau dispozitive. O invitație nu creează aceeași capacitate de plată pentru fiecare. Poți pune o limită și propune o alternativă fără să explici toate detaliile veniturilor tale. Apartenența nu trebuie măsurată prin suma cheltuită.",
      "type": "adevarat_fals",
      "correctAnswer": true
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un grup propune o ieșire de 120 lei, iar Radu a stabilit 60 pentru socializare. Spune limita și propune o întâlnire de 40. Dacă ceilalți aleg varianta inițială, poate refuza acea ieșire fără să presupună că trebuie să o finanțeze prin datorie. Bugetele diferite cer o discuție, nu o judecată asupra persoanelor.",
        "Exemplul arată o situație posibilă, nu o reacție obligatorie pentru fiecare om. Folosește cifrele pentru verificarea alegerii și separă ce este confirmat de ce presupui. Poți modifica suma, termenul ori alternativa. Un plan realist arată ce mai rămâne disponibil după decizie, nu doar ce ai cumpărat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ieșire 120, limită 60. Cât depășește limita?",
      "explanation": "60 lei.",
      "correctFeedback": "Corect. 60 lei.",
      "incorrectFeedback": "Nu chiar. 60 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "40 lei."
        },
        {
          "id": "1",
          "label": "60 lei."
        },
        {
          "id": "2",
          "label": "180 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Cum formulezi o limită fără date private?",
      "explanation": "Spui suma pe care o poți susține și propui o alternativă.",
      "correctFeedback": "Corect. Spui suma pe care o poți susține și propui o alternativă.",
      "incorrectFeedback": "Nu chiar. Spui suma pe care o poți susține și propui o alternativă.",
      "type": "scenariu",
      "context": "Un grup propune o ieșire de 120 lei, iar Radu a stabilit 60 pentru socializare. Spune limita și propune o întâlnire de 40. Dacă ceilalți aleg varianta inițială, poate refuza acea ieșire fără să presupună că trebuie să o finanțeze prin datorie. Bugetele diferite cer o discuție, nu o judecată asupra persoanelor.",
      "options": [
        {
          "id": "0",
          "label": "Publici toate veniturile."
        },
        {
          "id": "1",
          "label": "Te obligi la orice cost."
        },
        {
          "id": "2",
          "label": "Spui suma pe care o poți susține și propui o alternativă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-presiunea-sociala",
      "paragraphs": [
        "Radu este invitat la o ieșire care costă aproximativ 120 lei. Are o limită de 60 pentru această parte a lunii. Un prieten spune că toată lumea vine. Radu explică limita fără să arate extrasul bancar și propune o întâlnire de 40. Acceptă că grupul poate alege altfel, iar el poate participa la o altă ocazie.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Un grup propune o ieșire de 120 lei, iar Radu a stabilit 60 pentru socializare. Spune limita și propune o întâlnire de 40. Dacă ceilalți aleg varianta inițială, poate refuza acea ieșire fără să presupună că trebuie să o finanțeze prin datorie. Bugetele diferite cer o discuție, nu o judecată asupra persoanelor. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce expresie exercită presiune asupra lui Radu?",
      "explanation": "Toată lumea vine.",
      "correctFeedback": "Corect. Toată lumea vine.",
      "incorrectFeedback": "Nu chiar. Toată lumea vine.",
      "caseId": "caz-presiunea-sociala",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Toată lumea vine."
        },
        {
          "id": "1",
          "label": "Întâlnirea alternativă costă 40."
        },
        {
          "id": "2",
          "label": "Ai o limită de 60."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce variantă propune Radu?",
      "explanation": "O întâlnire de 40 lei.",
      "correctFeedback": "Corect. O întâlnire de 40 lei.",
      "incorrectFeedback": "Nu chiar. O întâlnire de 40 lei.",
      "caseId": "caz-presiunea-sociala",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Un împrumut de 120."
        },
        {
          "id": "1",
          "label": "O întâlnire de 40 lei."
        },
        {
          "id": "2",
          "label": "O ieșire de 200."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce poate face dacă grupul păstrează varianta scumpă?",
      "explanation": "Refuză acea ieșire și caută altă ocazie.",
      "correctFeedback": "Corect. Refuză acea ieșire și caută altă ocazie.",
      "incorrectFeedback": "Nu chiar. Refuză acea ieșire și caută altă ocazie.",
      "caseId": "caz-presiunea-sociala",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Presupune că trebuie să se împrumute."
        },
        {
          "id": "1",
          "label": "Renunță la orice limită."
        },
        {
          "id": "2",
          "label": "Refuză acea ieșire și caută altă ocazie."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "A spune nu unei sume nu înseamnă a spune nu persoanei. Folosește o formulare concretă, precum pot participa până la această sumă. Nu ascunde costul într-un împrumut doar pentru a părea că ai același buget. În același timp, evită să impui limita ta tuturor; propune și lasă loc unei alegeri diferite.",
        "Dacă ai făcut deja o alegere pe care o regreți, notează ce a declanșat-o și adaptează pasul următor. Rușinea nu completează bugetul. Caută un proces simplu pe care îl poți repeta și verifică efectul în timp. Dacă o problemă persistă și îți afectează viața, cere sprijin potrivit situației."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un prieten cere dovada contului pentru limita ta. Ce faci?",
      "explanation": "Păstrezi datele private și exprimi limita.",
      "correctFeedback": "Corect. Păstrezi datele private și exprimi limita.",
      "incorrectFeedback": "Nu chiar. Păstrezi datele private și exprimi limita.",
      "type": "scenariu",
      "context": "Un grup propune o ieșire de 120 lei, iar Radu a stabilit 60 pentru socializare. Spune limita și propune o întâlnire de 40. Dacă ceilalți aleg varianta inițială, poate refuza acea ieșire fără să presupună că trebuie să o finanțeze prin datorie. Bugetele diferite cer o discuție, nu o judecată asupra persoanelor.",
      "options": [
        {
          "id": "0",
          "label": "Păstrezi datele private și exprimi limita."
        },
        {
          "id": "1",
          "label": "Trimiți parola."
        },
        {
          "id": "2",
          "label": "Publici extrasul complet."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Cum respecți și preferința grupului?",
      "explanation": "Propui alternativa fără să impui tuturor alegerea.",
      "correctFeedback": "Corect. Propui alternativa fără să impui tuturor alegerea.",
      "incorrectFeedback": "Nu chiar. Propui alternativa fără să impui tuturor alegerea.",
      "type": "scenariu",
      "context": "Un grup propune o ieșire de 120 lei, iar Radu a stabilit 60 pentru socializare. Spune limita și propune o întâlnire de 40. Dacă ceilalți aleg varianta inițială, poate refuza acea ieșire fără să presupună că trebuie să o finanțeze prin datorie. Bugetele diferite cer o discuție, nu o judecată asupra persoanelor.",
      "options": [
        {
          "id": "0",
          "label": "Declari că doar limita ta contează."
        },
        {
          "id": "1",
          "label": "Propui alternativa fără să impui tuturor alegerea."
        },
        {
          "id": "2",
          "label": "Accepți automat costul lor."
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
          "body": "Presiunea socială apare când alegerea de bani este influențată de așteptările grupului.",
          "detail": "Presiunea socială apare când alegerea de bani este influențată de așteptările grupului.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Un grup propune o ieșire de 120 lei, iar Radu a stabilit 60 pentru socializare. Spune limita și propune o întâlnire de 40.",
          "detail": "Un grup propune o ieșire de 120 lei, iar Radu a stabilit 60 pentru socializare. Spune limita și propune o întâlnire de 40.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "A spune nu unei sume nu înseamnă a spune nu persoanei.",
          "detail": "A spune nu unei sume nu înseamnă a spune nu persoanei.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Scrie o formulare calmă prin care refuzi un cost și propui o alternativă.",
          "detail": "Scrie o formulare calmă prin care refuzi un cost și propui o alternativă.",
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
