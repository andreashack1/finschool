import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "nevoi-vs-dorinte",
  "title": "Nevoi vs. dorințe",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "nevoi-si-dorinte",
  "slug": "nevoi-vs-dorinte",
  "description": "Ana are nevoie de încălțăminte pentru ploaie, dar modelul promovat de prieteni costă mult mai mult. Unde se termină funcția și începe preferința?",
  "objective": "Să poți distinge între o nevoie și o dorință în funcție de context, fără să tratezi dorințele ca fiind automat „rele”.",
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
      "title": "Nevoi vs. dorințe",
      "body": "Ana are nevoie de încălțăminte pentru ploaie, dar modelul promovat de prieteni costă mult mai mult. Unde se termină funcția și începe preferința?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O nevoie este legată de funcționare, siguranță sau obligații în contextul tău. O dorință adaugă preferințe, confort sau plăcere. Diferența nu stă mereu în numele produsului. Un telefon poate fi necesar pentru comunicare, iar schimbarea unui telefon funcțional pentru o culoare nouă poate fi o dorință.",
        "Dorințele nu sunt automat greșite. Contează dacă le alegi conștient și dacă încap lângă obligațiile tale. Ca să separi funcția de preferință, întreabă „ce problemă trebuie să rezolv?” și apoi „ce îmbunătățire aleg în plus?”. Astfel eviți judecarea oamenilor doar după obiectele cumpărate."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce întrebare ajută întâi?",
      "explanation": "Funcția clară permite separarea necesității de preferințe.",
      "correctFeedback": "Corect. Funcția clară permite separarea necesității de preferințe.",
      "incorrectFeedback": "Nu chiar. Funcția clară permite separarea necesității de preferințe.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Ce problemă trebuie să rezolve cumpărătura?"
        },
        {
          "id": "1",
          "label": "Ce cumpără toată lumea?"
        },
        {
          "id": "2",
          "label": "Care este prețul cel mai mare, presupunând că rezolvă nevoia mai bine."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O dorință este automat o cheltuială greșită.",
      "explanation": "Preferințele pot avea loc într-un plan care ține cont de obligații.",
      "correctFeedback": "Corect. Preferințele pot avea loc într-un plan care ține cont de obligații.",
      "incorrectFeedback": "Nu chiar. Preferințele pot avea loc într-un plan care ține cont de obligații.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Contextul poate schimba clasificarea. O conexiune la internet poate fi necesară pentru cursuri online, dar un pachet mai scump cu servicii nefolosite poate fi opțional. Nu trebuie să etichetezi întreaga achiziție într-un singur fel. Poți identifica partea minimă necesară și costul preferințelor suplimentare.",
        "Într-un exemplu, o pereche potrivită pentru ploaie costă 180 lei, iar un model cu design preferat costă 300 lei. Diferența este 120 lei. Nu este o interdicție de cumpărare. Este informația de care ai nevoie ca să compari preferința cu alte destinații posibile ale banilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Care este costul suplimentar al modelului preferat?",
      "explanation": "300 − 180 = 120 lei pentru preferința suplimentară.",
      "correctFeedback": "Corect. 300 − 180 = 120 lei pentru preferința suplimentară.",
      "incorrectFeedback": "Nu chiar. 300 − 180 = 120 lei pentru preferința suplimentară.",
      "type": "scenariu",
      "context": "Două modele rezolvă aceeași funcție de bază.",
      "options": [
        {
          "id": "0",
          "label": "180 lei."
        },
        {
          "id": "1",
          "label": "120 lei."
        },
        {
          "id": "2",
          "label": "300 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Internetul este mereu doar o dorință?",
      "explanation": "Contextul și nivelul serviciului schimbă clasificarea.",
      "correctFeedback": "Corect. Contextul și nivelul serviciului schimbă clasificarea.",
      "incorrectFeedback": "Nu chiar. Contextul și nivelul serviciului schimbă clasificarea.",
      "type": "scenariu",
      "context": "Un student urmează cursuri online.",
      "options": [
        {
          "id": "0",
          "label": "Da, pentru orice persoană."
        },
        {
          "id": "1",
          "label": "Nu, orice pachet premium este obligatoriu."
        },
        {
          "id": "2",
          "label": "Nu; poate fi necesar pentru cursuri sau muncă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-nevoi-vs-dorinte",
      "paragraphs": [
        "Ana merge zilnic pe jos până la liceu și pantofii ei lasă apa să intre. Are un buget de 350 lei, din care 80 lei sunt deja necesari pentru transportul unui drum programat. Găsește o pereche potrivită pentru ploaie la 180 lei și una cu design popular la 300 lei. Ambele îi rezolvă problema de bază în acest exemplu.",
        "Prietenele preferă modelul mai scump, dar Ana vrea să vadă separat funcția și preferința. Diferența de 120 lei ar consuma o parte din banii necesari drumului. Ea nu spune că modelul frumos este o alegere greșită pentru oricine. Verifică dacă poate aștepta, dacă există o alternativă și ce sumă rămâne după obligație. Decizia ei se bazează pe propriul context, nu pe clasificarea obiectului ca fiind mereu nevoie sau mereu dorință."
      ]
    },
    {
      "id": "q5",
      "question": "Ce este necesar în cazul Anei?",
      "explanation": "Necesitatea privește funcția, nu automat marca sau designul.",
      "correctFeedback": "Corect. Necesitatea privește funcția, nu automat marca sau designul.",
      "incorrectFeedback": "Nu chiar. Necesitatea privește funcția, nu automat marca sau designul.",
      "caseId": "caz-nevoi-vs-dorinte",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Încălțăminte care rezolvă problema ploii."
        },
        {
          "id": "1",
          "label": "Exact modelul popular de 300 lei."
        },
        {
          "id": "2",
          "label": "Orice accesoriu purtat de prietene."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "După păstrarea celor 80 lei, ce buget are pentru pantofi?",
      "explanation": "350 − 80 = 270 lei disponibili pentru această alegere.",
      "correctFeedback": "Corect. 350 − 80 = 270 lei disponibili pentru această alegere.",
      "incorrectFeedback": "Nu chiar. 350 − 80 = 270 lei disponibili pentru această alegere.",
      "caseId": "caz-nevoi-vs-dorinte",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "350 lei."
        },
        {
          "id": "1",
          "label": "270 lei."
        },
        {
          "id": "2",
          "label": "430 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce compară înainte de modelul mai scump?",
      "explanation": "Decizia se evaluează în contextul bugetului.",
      "correctFeedback": "Corect. Decizia se evaluează în contextul bugetului.",
      "incorrectFeedback": "Nu chiar. Decizia se evaluează în contextul bugetului.",
      "caseId": "caz-nevoi-vs-dorinte",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar aprobarea prietenelor."
        },
        {
          "id": "1",
          "label": "Doar diferența de calitate presupusă din preț, fără obligația apropiată."
        },
        {
          "id": "2",
          "label": "Costul preferinței cu obligația apropiată și alternativele."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O listă a nevoilor nu trebuie copiată identic de la altcineva. Distanța până la școală, accesul la transport, munca și sănătatea schimbă prioritățile. Dacă cineva numește o cheltuială „lux”, cere întâi contextul. Clasificarea este un instrument de planificare, nu o etichetă despre valoarea persoanei.",
        "Mai există tentația de a numi orice dorință nevoie pentru a evita comparația. Încearcă să descrii exact consecința amânării: apare o problemă reală sau doar pierzi o preferință? Poți apoi decide să cumperi, să economisești ori să amâni, fără să inventezi o singură alegere morală."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Telefonul funcționează, iar noutatea este numai culoarea. Ce descrie schimbarea?",
      "explanation": "Utilitatea existentă și îmbunătățirea dorită se separă.",
      "correctFeedback": "Corect. Utilitatea existentă și îmbunătățirea dorită se separă.",
      "incorrectFeedback": "Nu chiar. Utilitatea existentă și îmbunătățirea dorită se separă.",
      "type": "scenariu",
      "context": "Te tentează un model nou.",
      "options": [
        {
          "id": "0",
          "label": "O preferință suplimentară care poate fi planificată."
        },
        {
          "id": "1",
          "label": "O nevoie obligatorie, fiindcă există un model nou."
        },
        {
          "id": "2",
          "label": "O prioritate față de orice obligație, dacă produsul este popular."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Cum verifici o achiziție numită nevoie?",
      "explanation": "Consecințele ajută clasificarea fără moralizare.",
      "correctFeedback": "Corect. Consecințele ajută clasificarea fără moralizare.",
      "incorrectFeedback": "Nu chiar. Consecințele ajută clasificarea fără moralizare.",
      "type": "scenariu",
      "context": "Nu e clar dacă produsul trebuie cumpărat acum.",
      "options": [
        {
          "id": "0",
          "label": "O declari nevoie fiindcă îți place."
        },
        {
          "id": "1",
          "label": "Descrii consecința concretă a amânării."
        },
        {
          "id": "2",
          "label": "O interzici fiindcă altcineva nu o folosește."
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
          "title": "Funcție",
          "body": "Începe cu problema reală de rezolvat.",
          "detail": "Ambele perechi din exemplu pot proteja de ploaie, dar designul preferat costă în plus. Separă funcția necesară de preferință înainte să compari diferența cu alte obligații.",
          "type": "normal",
          "detailHighlights": [
            "funcția necesară"
          ]
        },
        {
          "id": "idee-1",
          "title": "Context",
          "body": "Același produs poate avea roluri diferite.",
          "type": "normal",
          "detail": "Un laptop pentru proiecte și unul ales pentru funcții nefolosite pot semăna la raft. Contează utilizarea ta.",
          "detailHighlights": [
            "utilizarea"
          ]
        },
        {
          "id": "idee-2",
          "title": "Preferințe",
          "body": "Dorințele pot fi planificate, fără vinovăție.",
          "type": "normal",
          "detail": "Poți pune bani deoparte și pentru un concert. Diferența este să îi planifici după obligațiile apropiate.",
          "detailHighlights": [
            "obligațiile",
            "bani"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "La o cumpărătură pe care o ai în minte, scrie funcția necesară și preferința suplimentară.",
          "type": "action",
          "detail": "Scrie separat ce trebuie să facă produsul și ce ți-ar plăcea în plus. Așa poți compara alternative fără să ignori preferințele.",
          "detailHighlights": [
            "preferințele"
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
