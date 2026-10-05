import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cum-vorbesti-despre-bani",
  "title": "Cum vorbești despre bani",
  "categoryId": "de-ce-cheltuim-cum-cheltuim",
  "chapterId": "presiunea-din-jur",
  "slug": "cum-vorbesti-despre-bani",
  "description": "Lia și Dan au convenit împărțirea unei cheltuieli de 200 lei.",
  "objective": "Să poți explica cum vorbești despre bani și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Cum vorbești despre bani",
      "body": "Lia și Dan au convenit împărțirea unei cheltuieli de 200 lei."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O conversație despre bani devine mai clară când are un scop concret, fapte și un moment potrivit. Separă observația de acuzație: o sumă nu a fost restituită la termen este diferit de ești mereu iresponsabil. Întreabă ce regulă puteți stabili pentru viitor. Nu trebuie să dezvălui toate datele personale ca să negociezi o contribuție.",
        "Un obicei de cheltuire nu definește valoarea unei persoane. Observă contextul, informația disponibilă și alternativa pe care o ai. O pauză scurtă și o întrebare concretă pot face alegerea mai ușor de evaluat. Nu trebuie să elimini orice plăcere pentru a construi un plan de bani util."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce face conversația verificabilă?",
      "explanation": "Sume, termene și un scop concret.",
      "correctFeedback": "Corect. Sume, termene și un scop concret.",
      "incorrectFeedback": "Nu chiar. Sume, termene și un scop concret.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Sume, termene și un scop concret."
        },
        {
          "id": "1",
          "label": "Acuzații generale."
        },
        {
          "id": "2",
          "label": "Publicarea parolelor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O promisiune vagă precum cândva este un termen de plată verificabil.",
      "explanation": "Evită discuția în mijlocul unei certe ori în fața unui public inutil. Un acord trebuie să precizeze sume și termene, nu doar vom vedea. Dacă cealaltă persoană nu poate plăti, clarifică limitele tale înainte de o promisiune nouă. Respectul nu cere să ascunzi diferențele ori să accepți presiuni asupra conturilor personale.",
      "correctFeedback": "Corect. Evită discuția în mijlocul unei certe ori în fața unui public inutil. Un acord trebuie să precizeze sume și termene, nu doar vom vedea. Dacă cealaltă persoană nu poate plăti, clarifică limitele tale înainte de o promisiune nouă. Respectul nu cere să ascunzi diferențele ori să accepți presiuni asupra conturilor personale.",
      "incorrectFeedback": "Nu chiar. Evită discuția în mijlocul unei certe ori în fața unui public inutil. Un acord trebuie să precizeze sume și termene, nu doar vom vedea. Dacă cealaltă persoană nu poate plăti, clarifică limitele tale înainte de o promisiune nouă. Respectul nu cere să ascunzi diferențele ori să accepți presiuni asupra conturilor personale.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Lia a plătit 200 lei pentru o cheltuială comună, iar partea convenită a lui Dan era 100 până vineri. Luni încă nu a primit-o. Spune suma și termenul, întreabă ce s-a întâmplat și cere o dată realistă. Notează noul acord dacă îl acceptă, fără să considere o scuză vagă drept confirmare de plată.",
        "Exemplul arată o situație posibilă, nu o reacție obligatorie pentru fiecare om. Folosește cifrele pentru verificarea alegerii și separă ce este confirmat de ce presupui. Poți modifica suma, termenul ori alternativa. Un plan realist arată ce mai rămâne disponibil după decizie, nu doar ce ai cumpărat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cheltuială 200 împărțită egal. Cât revine lui Dan?",
      "explanation": "100 lei.",
      "correctFeedback": "Corect. 100 lei.",
      "incorrectFeedback": "Nu chiar. 100 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "200 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "50 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Plata nu a venit la termen. Cum începi?",
      "explanation": "Spui suma și data convenită, apoi ceri clarificare.",
      "correctFeedback": "Corect. Spui suma și data convenită, apoi ceri clarificare.",
      "incorrectFeedback": "Nu chiar. Spui suma și data convenită, apoi ceri clarificare.",
      "type": "scenariu",
      "context": "Lia a plătit 200 lei pentru o cheltuială comună, iar partea convenită a lui Dan era 100 până vineri. Luni încă nu a primit-o. Spune suma și termenul, întreabă ce s-a întâmplat și cere o dată realistă. Notează noul acord dacă îl acceptă, fără să considere o scuză vagă drept confirmare de plată.",
      "options": [
        {
          "id": "0",
          "label": "Insulți persoana."
        },
        {
          "id": "1",
          "label": "Ascunzi complet problema."
        },
        {
          "id": "2",
          "label": "Spui suma și data convenită, apoi ceri clarificare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cum-vorbesti-despre-bani",
      "paragraphs": [
        "Lia și Dan au convenit împărțirea unei cheltuieli de 200 lei. Lia a plătit, iar cei 100 ai lui Dan trebuiau returnați vineri. Luni nu au venit. Lia alege o discuție privată și spune concret suma și termenul. Cere o dată realistă pentru plată și discută cum vor confirma viitoarele cheltuieli, fără acuzații generale.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Lia a plătit 200 lei pentru o cheltuială comună, iar partea convenită a lui Dan era 100 până vineri. Luni încă nu a primit-o. Spune suma și termenul, întreabă ce s-a întâmplat și cere o dată realistă. Notează noul acord dacă îl acceptă, fără să considere o scuză vagă drept confirmare de plată. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce termen fusese convenit în cazul Liei?",
      "explanation": "Vineri.",
      "correctFeedback": "Corect. Vineri.",
      "incorrectFeedback": "Nu chiar. Vineri.",
      "caseId": "caz-cum-vorbesti-despre-bani",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Vineri."
        },
        {
          "id": "1",
          "label": "Oricând."
        },
        {
          "id": "2",
          "label": "Peste un an."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce cere Lia pentru următorul pas?",
      "explanation": "O dată realistă de plată.",
      "correctFeedback": "Corect. O dată realistă de plată.",
      "incorrectFeedback": "Nu chiar. O dată realistă de plată.",
      "caseId": "caz-cum-vorbesti-despre-bani",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Parola lui Dan."
        },
        {
          "id": "1",
          "label": "O dată realistă de plată."
        },
        {
          "id": "2",
          "label": "Un venit garantat din investiții."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "De ce alege o discuție privată?",
      "explanation": "Reduce expunerea inutilă și permite clarificarea.",
      "correctFeedback": "Corect. Reduce expunerea inutilă și permite clarificarea.",
      "incorrectFeedback": "Nu chiar. Reduce expunerea inutilă și permite clarificarea.",
      "caseId": "caz-cum-vorbesti-despre-bani",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Elimină obligația."
        },
        {
          "id": "1",
          "label": "Înlocuiește suma cu o acuzație."
        },
        {
          "id": "2",
          "label": "Reduce expunerea inutilă și permite clarificarea."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Evită discuția în mijlocul unei certe ori în fața unui public inutil. Un acord trebuie să precizeze sume și termene, nu doar vom vedea. Dacă cealaltă persoană nu poate plăti, clarifică limitele tale înainte de o promisiune nouă. Respectul nu cere să ascunzi diferențele ori să accepți presiuni asupra conturilor personale.",
        "Dacă ai făcut deja o alegere pe care o regreți, notează ce a declanșat-o și adaptează pasul următor. Rușinea nu completează bugetul. Caută un proces simplu pe care îl poți repeta și verifică efectul în timp. Dacă o problemă persistă și îți afectează viața, cere sprijin potrivit situației."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Cealaltă persoană nu poate plăti acum. Ce clarifici?",
      "explanation": "Opțiunile și limitele unui nou acord.",
      "correctFeedback": "Corect. Opțiunile și limitele unui nou acord.",
      "incorrectFeedback": "Nu chiar. Opțiunile și limitele unui nou acord.",
      "type": "scenariu",
      "context": "Lia a plătit 200 lei pentru o cheltuială comună, iar partea convenită a lui Dan era 100 până vineri. Luni încă nu a primit-o. Spune suma și termenul, întreabă ce s-a întâmplat și cere o dată realistă. Notează noul acord dacă îl acceptă, fără să considere o scuză vagă drept confirmare de plată.",
      "options": [
        {
          "id": "0",
          "label": "Opțiunile și limitele unui nou acord."
        },
        {
          "id": "1",
          "label": "Presupui plata deja făcută."
        },
        {
          "id": "2",
          "label": "Oferi bani noi fără evaluare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Cum închei cu o regulă utilă?",
      "explanation": "Confirmi suma, termenul și modul de evidență.",
      "correctFeedback": "Corect. Confirmi suma, termenul și modul de evidență.",
      "incorrectFeedback": "Nu chiar. Confirmi suma, termenul și modul de evidență.",
      "type": "scenariu",
      "context": "Lia a plătit 200 lei pentru o cheltuială comună, iar partea convenită a lui Dan era 100 până vineri. Luni încă nu a primit-o. Spune suma și termenul, întreabă ce s-a întâmplat și cere o dată realistă. Notează noul acord dacă îl acceptă, fără să considere o scuză vagă drept confirmare de plată.",
      "options": [
        {
          "id": "0",
          "label": "Spui doar să fie bine."
        },
        {
          "id": "1",
          "label": "Confirmi suma, termenul și modul de evidență."
        },
        {
          "id": "2",
          "label": "Eviți orice detaliu concret."
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
          "body": "O conversație despre bani devine mai clară când are un scop concret, fapte și un moment potrivit.",
          "detail": "O conversație despre bani devine mai clară când are un scop concret, fapte și un moment potrivit.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Lia a plătit 200 lei pentru o cheltuială comună, iar partea convenită a lui Dan era 100 până vineri. Luni încă nu a primit-o.",
          "detail": "Lia a plătit 200 lei pentru o cheltuială comună, iar partea convenită a lui Dan era 100 până vineri. Luni încă nu a primit-o.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Evită discuția în mijlocul unei certe ori în fața unui public inutil.",
          "detail": "Evită discuția în mijlocul unei certe ori în fața unui public inutil.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Transformă o acuzație generală într-o cerere cu sumă și termen, folosind un exemplu fictiv.",
          "detail": "Transformă o acuzație generală într-o cerere cu sumă și termen, folosind un exemplu fictiv.",
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
