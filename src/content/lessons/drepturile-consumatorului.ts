import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "drepturile-consumatorului",
  "title": "Drepturile consumatorului",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "cumperi-inteligent",
  "slug": "drepturile-consumatorului",
  "description": "Vlad primește un produs care nu funcționează. Înainte să scrie o reclamație furioasă, ce informații și pași îl ajută?",
  "objective": "Să poți identifica pașii de bază pe care îi poți verifica atunci când un produs sau serviciu are o problemă.",
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
      "title": "Drepturile consumatorului",
      "body": "Vlad primește un produs care nu funcționează. Înainte să scrie o reclamație furioasă, ce informații și pași îl ajută?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Când o cumpărătură are o problemă, începe cu datele concrete: produsul sau serviciul, comerciantul, data, dovada achiziției și descrierea problemei. Diferența dintre un defect, o livrare greșită și o simplă răzgândire poate schimba procedura relevantă. Nu presupune că toate situațiile au aceeași soluție.",
        "Păstrează documentele și mesajele importante. Contactează comerciantul printr-un canal verificabil și explică problema clar. O cerere precisă este mai utilă decât o etichetă generală precum „totul este o înșelătorie”. Nu trimite informații sensibile care nu sunt necesare pentru identificarea cumpărării."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Cu ce începi când un produs are o problemă?",
      "explanation": "Faptele clare permit identificarea procedurii.",
      "correctFeedback": "Corect. Faptele clare permit identificarea procedurii.",
      "incorrectFeedback": "Nu chiar. Faptele clare permit identificarea procedurii.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Datele cumpărării, dovada și descrierea problemei."
        },
        {
          "id": "1",
          "label": "Doar o postare furioasă."
        },
        {
          "id": "2",
          "label": "Un termen ghicit pentru toate produsele."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Defectul și simpla răzgândire au automat aceeași procedură.",
      "explanation": "Situația concretă și regulile aplicabile trebuie diferențiate.",
      "correctFeedback": "Corect. Situația concretă și regulile aplicabile trebuie diferențiate.",
      "incorrectFeedback": "Nu chiar. Situația concretă și regulile aplicabile trebuie diferențiate.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Regulile pot depinde de tipul cumpărării, de produs și de situație. Un termen văzut într-un clip nu trebuie aplicat automat oricărei achiziții. Pentru informații actuale, verifică sursele competente și condițiile relevante. Lecția te ajută să pregătești cazul, fără să inventeze un drept universal la orice rambursare.",
        "Dacă răspunsul comerciantului nu clarifică problema, poți verifica procedura autorității competente. Pentru o sesizare, o cronologie și documente lizibile ajută analiza. Alege canalul oficial pentru reclamații, nu o adresă găsită într-un comentariu. Verifică ce informații sunt cerute înainte de a trimite cererea."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Un clip dă un termen universal. Ce faci?",
      "explanation": "Informația juridică actuală nu se stabilește din presupuneri.",
      "correctFeedback": "Corect. Informația juridică actuală nu se stabilește din presupuneri.",
      "incorrectFeedback": "Nu chiar. Informația juridică actuală nu se stabilește din presupuneri.",
      "type": "scenariu",
      "context": "Vrei să folosești o procedură de reclamație.",
      "options": [
        {
          "id": "0",
          "label": "Îl aplici fără să citești contextul."
        },
        {
          "id": "1",
          "label": "Verifici sursa competentă și situația cumpărării."
        },
        {
          "id": "2",
          "label": "Ștergi toate documentele."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ce canal alegi pentru sesizare?",
      "explanation": "Autenticitatea canalului și cerințele cererii contează.",
      "correctFeedback": "Corect. Autenticitatea canalului și cerințele cererii contează.",
      "incorrectFeedback": "Nu chiar. Autenticitatea canalului și cerințele cererii contează.",
      "type": "scenariu",
      "context": "Comerciantul nu a clarificat problema.",
      "options": [
        {
          "id": "0",
          "label": "Orice adresă dintr-un comentariu."
        },
        {
          "id": "1",
          "label": "Un mesaj care cere codul bancar."
        },
        {
          "id": "2",
          "label": "Canalul oficial competent, după verificarea cerințelor."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-drepturile-consumatorului",
      "paragraphs": [
        "Vlad cumpără online o lampă pentru biroul de student. Produsul ajunge, dar nu funcționează conform descrierii. El păstrează confirmarea comenzii, dovada plății și fotografii relevante, fără să publice datele personale. Notează când a primit coletul și ce problemă a observat. Nu încearcă să modifice dispozitivul înainte să ceară informații.",
        "Vlad contactează comerciantul prin adresa verificată din documentele comenzii. Descrie defectul și întreabă ce procedură se aplică. Un prieten îi spune un termen din memorie, dar acesta nu explică dacă situația privește un defect sau o răzgândire. Vlad verifică informații oficiale și păstrează răspunsurile. Dacă nu primește clarificare, pregătește cronologia și documentele pentru canalul competent. Procesul nu garantează din lecție un rezultat juridic, dar îi permite să prezinte o problemă concretă și verificabilă."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce a făcut util Vlad înainte de contact?",
      "explanation": "Documentarea susține o solicitare precisă.",
      "correctFeedback": "Corect. Documentarea susține o solicitare precisă.",
      "incorrectFeedback": "Nu chiar. Documentarea susține o solicitare precisă.",
      "caseId": "caz-drepturile-consumatorului",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "A păstrat documentele și a descris defectul."
        },
        {
          "id": "1",
          "label": "A presupus că orice produs are aceeași regulă."
        },
        {
          "id": "2",
          "label": "A publicat toate datele plății."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce lipsește din termenul amintit de prieten?",
      "explanation": "Un termen fără context poate induce în eroare.",
      "correctFeedback": "Corect. Un termen fără context poate induce în eroare.",
      "incorrectFeedback": "Nu chiar. Un termen fără context poate induce în eroare.",
      "caseId": "caz-drepturile-consumatorului",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Entuziasmul."
        },
        {
          "id": "1",
          "label": "Contextul și regula aplicabilă situației concrete."
        },
        {
          "id": "2",
          "label": "Un număr mai mare."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce pregătește dacă trebuie să verifice o sesizare?",
      "explanation": "O prezentare verificabilă ajută analiza cazului.",
      "correctFeedback": "Corect. O prezentare verificabilă ajută analiza cazului.",
      "incorrectFeedback": "Nu chiar. O prezentare verificabilă ajută analiza cazului.",
      "caseId": "caz-drepturile-consumatorului",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar porecla unui coleg."
        },
        {
          "id": "1",
          "label": "Numai o acuzație fără date."
        },
        {
          "id": "2",
          "label": "Cronologia, documentele și răspunsurile relevante."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O reacție rapidă poate fi utilă, dar nu trebuie confundată cu panica. Salvează oferta și dovezile, notează ce ai observat și evită intervenții care pot face problema mai greu de documentat. Dacă produsul prezintă un risc de siguranță, oprirea utilizării și cererea de informații competente au prioritate.",
        "Nu transforma discuția într-o promisiune că orice cerere va primi aceeași soluție. Scopul este să urmărești un proces bazat pe fapte și reguli verificabile. Comunicarea clară, păstrarea dovezilor și consultarea surselor potrivite îți oferă un punct de pornire mai bun decât presupunerile despre termene sau rezultate."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Produsul pare periculos. Ce prioritate este rezonabilă?",
      "explanation": "Siguranța și păstrarea dovezilor contează.",
      "correctFeedback": "Corect. Siguranța și păstrarea dovezilor contează.",
      "incorrectFeedback": "Nu chiar. Siguranța și păstrarea dovezilor contează.",
      "type": "scenariu",
      "context": "Dispozitivul prezintă un semnal de risc.",
      "options": [
        {
          "id": "0",
          "label": "Oprești utilizarea și ceri informații competente."
        },
        {
          "id": "1",
          "label": "Continui până apare un rezultat mai grav."
        },
        {
          "id": "2",
          "label": "Îl modifici fără a documenta problema."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce poate promite această lecție?",
      "explanation": "Regulile și soluțiile se verifică în context.",
      "correctFeedback": "Corect. Regulile și soluțiile se verifică în context.",
      "incorrectFeedback": "Nu chiar. Regulile și soluțiile se verifică în context.",
      "type": "scenariu",
      "context": "Analizezi o cumpărătură problematică.",
      "options": [
        {
          "id": "0",
          "label": "Rambursare identică în orice situație."
        },
        {
          "id": "1",
          "label": "Un proces de verificare, nu un rezultat juridic universal."
        },
        {
          "id": "2",
          "label": "Un termen actual inventat."
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
          "title": "Documentează",
          "body": "Păstrează dovada și descrie problema.",
          "detail": "Păstrează dovada și descrie problema.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Diferențiază",
          "body": "Defectul, livrarea greșită și răzgândirea nu sunt identice.",
          "detail": "Defectul, livrarea greșită și răzgândirea nu sunt identice.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Verifică oficial",
          "body": "Procedura și termenele actuale cer surse competente.",
          "detail": "Procedura și termenele actuale cer surse competente.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Găsește unde păstrezi dovada unei cumpărături și notează canalul verificat al comerciantului.",
          "detail": "Găsește unde păstrezi dovada unei cumpărături și notează canalul verificat al comerciantului.",
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
