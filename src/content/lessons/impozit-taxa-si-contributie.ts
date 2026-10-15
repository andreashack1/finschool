import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "impozit-taxa-si-contributie",
  "title": "Impozit, taxă și contribuție",
  "categoryId": "cuvintele-banilor",
  "chapterId": "taxe-si-valute",
  "slug": "impozit-taxa-si-contributie",
  "description": "Mara vede rețineri pe salariu și un tarif pentru un document. Toate sunt bani plătiți, dar au exact același rol?",
  "objective": "Să poți diferenția cele trei concepte într-un context simplu fără să le tratezi ca sinonime.",
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
      "title": "Impozit, taxă și contribuție",
      "body": "Mara vede rețineri pe salariu și un tarif pentru un document. Toate sunt bani plătiți, dar au exact același rol?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "În limbajul obișnuit, oamenii spun uneori „taxe” pentru multe plăți către stat. Pentru înțelegere, e util să separi conceptele. Un impozit este o obligație fiscală legată de o bază stabilită prin reguli, precum un venit. Nu cumpără automat un serviciu individual exact pentru persoana care îl plătește.",
        "O taxă poate fi legată de o procedură sau un serviciu public concret. O contribuție este asociată unui sistem cu un scop, precum protecția socială. Aceste explicații sunt conceptuale, nu o clasificare juridică universală a fiecărei plăți. Denumirea și regulile documentului real rămân importante."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce întrebare separă conceptele mai bine?",
      "explanation": "Rolul mecanismului contează, nu doar ieșirea banilor.",
      "correctFeedback": "Corect. Rolul mecanismului contează, nu doar ieșirea banilor.",
      "incorrectFeedback": "Nu chiar. Rolul mecanismului contează, nu doar ieșirea banilor.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Care sunt baza, scopul și regulile plății?"
        },
        {
          "id": "1",
          "label": "Care este suma, presupunând că sumele egale au același rol?"
        },
        {
          "id": "2",
          "label": "Cui îi plătești, presupunând că toate plățile către stat sunt identice?"
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O contribuție socială este automat un depozit personal retragibil oricând.",
      "explanation": "Un sistem social are alte reguli decât un cont de economii personal.",
      "correctFeedback": "Corect. Un sistem social are alte reguli decât un cont de economii personal.",
      "incorrectFeedback": "Nu chiar. Un sistem social are alte reguli decât un cont de economii personal.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pe un fluturaș salarial poți găsi impozit și contribuții, iar pentru o procedură distinctă poți găsi o taxă. Faptul că toate reduc banii disponibili nu le face identice. Întrebările utile sunt ce bază au, cui se plătesc și ce mecanism susțin. Nu deduci o cotă doar din numele plății.",
        "Într-un exercițiu ipotetic, două rețineri de 40 și 60 lei însumează 100 lei, dar adunarea nu explică rolul lor. Pentru calculul real ai nevoie de regulile aplicabile și de documentele perioadei. Procentele actuale și situațiile speciale se verifică separat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Două rețineri ipotetice de 40 și 60 lei au același rol fiindcă însumează 100?",
      "explanation": "Calculul total nu explică mecanismul fiecărei rețineri.",
      "correctFeedback": "Corect. Calculul total nu explică mecanismul fiecărei rețineri.",
      "incorrectFeedback": "Nu chiar. Calculul total nu explică mecanismul fiecărei rețineri.",
      "type": "scenariu",
      "context": "Analizezi un document simplificat.",
      "options": [
        {
          "id": "0",
          "label": "Da, adunarea le face identice."
        },
        {
          "id": "1",
          "label": "Nu; suma totală și clasificarea sunt lucruri diferite."
        },
        {
          "id": "2",
          "label": "Da, orice reținere este o taxă pentru documente."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ai doar denumirea unei rețineri. Ce lipsește pentru calculul real?",
      "explanation": "Numele singur nu stabilește suma corectă.",
      "correctFeedback": "Corect. Numele singur nu stabilește suma corectă.",
      "incorrectFeedback": "Nu chiar. Numele singur nu stabilește suma corectă.",
      "type": "scenariu",
      "context": "Vrei să înțelegi diferența brut-net.",
      "options": [
        {
          "id": "0",
          "label": "Totalul brut, presupunând că toate reținerile au aceeași bază."
        },
        {
          "id": "1",
          "label": "Procentele reținute de un coleg, fără condițiile sale."
        },
        {
          "id": "2",
          "label": "Baza și regulile aplicabile situației."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-impozit-taxa-si-contributie",
      "paragraphs": [
        "Mara primește primul fluturaș de salariu și vede sume diferite față de oferta brută. Documentul separă contribuțiile de impozitul pe venit. Ea nu cunoaște încă toate regulile, așa că cere persoanei responsabile să îi explice denumirile și baza calculului. Nu tratează fiecare rând drept aceeași plată cu alt nume.",
        "În aceeași săptămână, Mara solicită un document printr-o procedură publică și vede o taxă aferentă serviciului. Un coleg spune că aceasta trebuie să fie identică unei contribuții salariale, fiindcă banii ajung la o instituție. Mara verifică scopul și documentul, nu doar destinatarul generic. Mai primește un mesaj care cere o plată pentru o procedură pe care nu a solicitat-o. Înainte să trimită bani, confirmă cererea prin canalul oficial. Înțelegerea termenilor o ajută și să pună întrebări mai precise."
      ]
    },
    {
      "id": "q5",
      "question": "De ce Mara cere denumirile și baza calculului?",
      "explanation": "O explicație precisă este mai utilă decât o etichetă generică.",
      "correctFeedback": "Corect. O explicație precisă este mai utilă decât o etichetă generică.",
      "incorrectFeedback": "Nu chiar. O explicație precisă este mai utilă decât o etichetă generică.",
      "caseId": "caz-impozit-taxa-si-contributie",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ca să distingă mecanismele și să verifice documentul."
        },
        {
          "id": "1",
          "label": "Ca să presupună că toate plățile sunt voluntare."
        },
        {
          "id": "2",
          "label": "Ca să ignore contribuțiile."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Taxa pentru procedură este identică automat unei contribuții salariale?",
      "explanation": "Plata pentru o procedură și finanțarea unui sistem pot avea roluri diferite.",
      "correctFeedback": "Corect. Plata pentru o procedură și finanțarea unui sistem pot avea roluri diferite.",
      "incorrectFeedback": "Nu chiar. Plata pentru o procedură și finanțarea unui sistem pot avea roluri diferite.",
      "caseId": "caz-impozit-taxa-si-contributie",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Da, fiindcă ambele sunt plăți."
        },
        {
          "id": "1",
          "label": "Nu; scopul și regulile trebuie analizate separat."
        },
        {
          "id": "2",
          "label": "Da, dacă apar în aceeași săptămână."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce face cu solicitarea nesperată de plată?",
      "explanation": "Un termen fiscal nu dovedește autenticitatea mesajului.",
      "correctFeedback": "Corect. Un termen fiscal nu dovedește autenticitatea mesajului.",
      "incorrectFeedback": "Nu chiar. Un termen fiscal nu dovedește autenticitatea mesajului.",
      "caseId": "caz-impozit-taxa-si-contributie",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Plătește doar fiindcă apare cuvântul taxă."
        },
        {
          "id": "1",
          "label": "Trimite datele cardului colegului."
        },
        {
          "id": "2",
          "label": "O confirmă prin canalul oficial înainte să trimită bani."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O contribuție nu este același lucru cu un depozit personal pe care îl retragi oricând. Sistemele sociale au reguli proprii privind finanțarea și prestațiile. Nici plata unui impozit nu înseamnă că fiecare serviciu public devine o cumpărătură directă și individuală. Separă mecanismul colectiv de tranzacția cu un magazin.",
        "Dacă vezi o reținere necunoscută, nu îi ghici natura. Cere denumirea completă și explicația de pe document, apoi verifică sursa competentă. Aceeași prudență se aplică unei taxe pentru o procedură: înainte să plătești, confirmă destinatarul și scopul, nu doar mesajul care solicită banii."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Cum verifici o reținere necunoscută?",
      "explanation": "Întâi identifici obligația și regulile ei.",
      "correctFeedback": "Corect. Întâi identifici obligația și regulile ei.",
      "incorrectFeedback": "Nu chiar. Întâi identifici obligația și regulile ei.",
      "type": "scenariu",
      "context": "Pe fluturaș apare un rând nou.",
      "options": [
        {
          "id": "0",
          "label": "Ceri explicația documentului și verifici sursa competentă."
        },
        {
          "id": "1",
          "label": "Îi atribui un procent din memorie."
        },
        {
          "id": "2",
          "label": "O numești automat fraudă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce nu poți deduce dintr-un exemplu ipotetic?",
      "explanation": "Exemplul explică structura, nu actualizează legislația.",
      "correctFeedback": "Corect. Exemplul explică structura, nu actualizează legislația.",
      "incorrectFeedback": "Nu chiar. Exemplul explică structura, nu actualizează legislația.",
      "type": "scenariu",
      "context": "Folosești un document creat pentru exercițiu.",
      "options": [
        {
          "id": "0",
          "label": "Suma aritmetică înscrisă."
        },
        {
          "id": "1",
          "label": "Cota legală actuală aplicabilă tuturor."
        },
        {
          "id": "2",
          "label": "Faptul că există două componente."
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
          "title": "Denumiri",
          "body": "Termenii nu sunt sinonime perfecte.",
          "detail": "Două rețineri care reduc salariul pot susține mecanisme diferite. Pentru o plată necunoscută, cere denumirea, baza și scopul din document, fără să îi atribui o regulă doar după sumă.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Mecanisme",
          "body": "Caută baza, scopul și regulile.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Verificare",
          "body": "Un cuvânt fiscal nu validează o solicitare de plată.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Alege o plată de pe un document și formulează întrebarea „ce mecanism reprezintă și unde îl verific?”.",
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
