import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "ce-sunt-banii",
  "title": "Ce sunt banii",
  "categoryId": "cuvintele-banilor",
  "chapterId": "bazele",
  "slug": "ce-sunt-banii",
  "description": "Mara vinde o carte, compară două ghiozdane și păstrează o parte din bani pentru excursie. Aceiași bani au trei roluri.",
  "objective": "Să poți explica rolurile de bază ale banilor și să recunoști când banii sunt folosiți ca mijloc de schimb, măsură a valorii sau mod de păstrare a valorii.",
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
      "title": "Ce sunt banii",
      "body": "Mara vinde o carte, compară două ghiozdane și păstrează o parte din bani pentru excursie. Aceiași bani au trei roluri."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Banii fac schimburile mai simple. Dacă ai o carte de vândut, nu trebuie să găsești o persoană care are exact ghiozdanul dorit și vrea exact cartea ta. Primești bani, apoi îi folosești la altă cumpărătură. Acesta este rolul de mijloc de schimb.",
        "Prețurile exprimate în aceeași monedă te ajută și să compari valori. Un ghiozdan de 150 lei și unul de 230 lei pot fi puse pe aceeași scară. Prețul nu spune singur calitatea, dar oferă un punct comun pentru comparație. În acest rol, banii sunt o măsură a valorii."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Când Mara primește 40 lei pentru carte, ce rol au banii?",
      "explanation": "Plata permite schimbul fără un troc direct.",
      "correctFeedback": "Corect. Plata permite schimbul fără un troc direct.",
      "incorrectFeedback": "Nu chiar. Plata permite schimbul fără un troc direct.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Mijloc de schimb."
        },
        {
          "id": "1",
          "label": "Dovadă că orice carte valorează 40 lei."
        },
        {
          "id": "2",
          "label": "Garanție că prețurile nu se schimbă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "De ce poți compara prețurile celor două ghiozdane?",
      "explanation": "Prețurile oferă o scară comună, nu o evaluare completă.",
      "correctFeedback": "Corect. Prețurile oferă o scară comună, nu o evaluare completă.",
      "incorrectFeedback": "Nu chiar. Prețurile oferă o scară comună, nu o evaluare completă.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Au obligatoriu aceeași calitate."
        },
        {
          "id": "1",
          "label": "Sunt exprimate în aceeași unitate monetară."
        },
        {
          "id": "2",
          "label": "Modelul mai scump trebuie cumpărat."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Poți păstra o sumă pentru o cumpărătură viitoare. Nu consumi tot ce primești în aceeași zi, ci transferi o parte din posibilitatea de a cumpăra către viitor. Acesta este rolul de păstrare a valorii. Totuși, suma și puterea ei de cumpărare sunt lucruri diferite.",
        "Dacă prețul ghiozdanului crește până la excursie, cei 150 lei păstrați pot să nu mai ajungă. Banii nu garantează că vei cumpăra mereu aceeași cantitate. Într-un exemplu simplu, plata unei cărți, compararea prețurilor și economisirea pentru excursie ilustrează trei funcții diferite ale aceleiași monede."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Păstrarea banilor garantează aceeași putere de cumpărare peste un an.",
      "explanation": "Suma poate rămâne aceeași, iar prețurile se pot schimba.",
      "correctFeedback": "Corect. Suma poate rămâne aceeași, iar prețurile se pot schimba.",
      "incorrectFeedback": "Nu chiar. Suma poate rămâne aceeași, iar prețurile se pot schimba.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Vlad păstrează bani pentru o bicicletă. Ce rol folosește?",
      "explanation": "Economisirea mută resurse către viitor, fără garanția prețului.",
      "correctFeedback": "Corect. Economisirea mută resurse către viitor, fără garanția prețului.",
      "incorrectFeedback": "Nu chiar. Economisirea mută resurse către viitor, fără garanția prețului.",
      "type": "scenariu",
      "context": "Vlad nu cumpără bicicleta astăzi.",
      "options": [
        {
          "id": "0",
          "label": "Transformarea automată a banilor în profit."
        },
        {
          "id": "1",
          "label": "Schimbul direct al bicicletelor."
        },
        {
          "id": "2",
          "label": "Păstrarea valorii pentru o utilizare viitoare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-ce-sunt-banii",
      "paragraphs": [
        "Mara, elevă în ultimul an, vinde o carte pe care nu o mai folosește pentru 40 lei. Cumpărătorul nu are nimic de schimb care să îi fie util, dar plata îi permite Marei să cumpere ulterior de la altcineva. Ea adaugă suma la economiile pentru o excursie. Nu a decis încă ce echipament va lua și preferă să aștepte lista organizatorilor.",
        "Într-un magazin vede două ghiozdane, unul la 150 lei și unul la 230 lei. Modelul mai scump are accesorii pe care probabil nu le va utiliza. Mara compară dimensiunea, rezistența și prețurile, fără să presupună că mai scump înseamnă automat mai bun. Până în luna excursiei, prețul primului model se schimbă. Suma din economii a rămas identică, dar cumpărătura posibilă s-a modificat. Ea verifică din nou bugetul înainte de a plăti."
      ]
    },
    {
      "id": "q5",
      "question": "Ce a rezolvat plata pentru carte?",
      "explanation": "Banii permit schimburi între persoane cu nevoi diferite.",
      "correctFeedback": "Corect. Banii permit schimburi între persoane cu nevoi diferite.",
      "incorrectFeedback": "Nu chiar. Banii permit schimburi între persoane cu nevoi diferite.",
      "caseId": "caz-ce-sunt-banii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Mara nu a avut nevoie de un troc potrivit."
        },
        {
          "id": "1",
          "label": "A fixat prețul tuturor cărților."
        },
        {
          "id": "2",
          "label": "A eliminat orice risc al excursiei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Cum ar trebui comparate ghiozdanele?",
      "explanation": "Prețul este o informație, iar utilitatea completează comparația.",
      "correctFeedback": "Corect. Prețul este o informație, iar utilitatea completează comparația.",
      "incorrectFeedback": "Nu chiar. Prețul este o informație, iar utilitatea completează comparația.",
      "caseId": "caz-ce-sunt-banii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Le alegi după preț, fără să verifici ce accesorii folosești."
        },
        {
          "id": "1",
          "label": "Prețul împreună cu utilitatea și calitatea relevantă."
        },
        {
          "id": "2",
          "label": "Le compari doar după numărul accesoriilor incluse."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce explică schimbarea cumpărăturii posibile?",
      "explanation": "Suma nominală diferă de puterea de cumpărare.",
      "correctFeedback": "Corect. Suma nominală diferă de puterea de cumpărare.",
      "incorrectFeedback": "Nu chiar. Suma nominală diferă de puterea de cumpărare.",
      "caseId": "caz-ce-sunt-banii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Puterea de cumpărare a rămas aceeași fiindcă soldul este identic."
        },
        {
          "id": "1",
          "label": "Economiile trebuie să crească automat când prețul se schimbă."
        },
        {
          "id": "2",
          "label": "Prețul s-a schimbat, chiar dacă suma economisită nu."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Banii pot exista ca numerar sau ca sume în cont. O plată cu cardul nu creează automat bani noi pentru tine; cardul este un instrument prin care accesezi un cont sau, în condiții distincte, un credit. Uită-te la sursa sumei, nu doar la obiectul cu care plătești.",
        "Mai există o capcană: un preț mai mare nu dovedește că un produs este mai potrivit. Banii ajută comparația, dar decizia cere și informații despre utilitate, durată și buget. Separă întrebarea „cât costă?” de „îmi rezolvă problema?”. Astfel folosești măsura valorii fără să o confunzi cu valoarea personală."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Alex are 100 lei în cont și vrea două bilete de câte 60 lei. Ce contează înainte să plătească cu cardul de debit?",
      "explanation": "Cardul accesează banii din cont. Cele două bilete costă împreună 120 lei, iar soldul de 100 lei nu acoperă plata.",
      "correctFeedback": "Corect. Cardul accesează banii din cont. Cele două bilete costă împreună 120 lei, iar soldul de 100 lei nu acoperă plata.",
      "incorrectFeedback": "Nu chiar. Cardul accesează banii din cont. Cele două bilete costă împreună 120 lei, iar soldul de 100 lei nu acoperă plata.",
      "type": "scenariu",
      "context": "Alex cumpără un bilet de tren.",
      "options": [
        {
          "id": "0",
          "label": "Suma disponibilă în cont."
        },
        {
          "id": "1",
          "label": "Limita înscrisă pentru o singură plată, fără să verifice soldul."
        },
        {
          "id": "2",
          "label": "Valoarea banilor primiți luna trecută, chiar dacă i-a cheltuit."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un produs costă mai mult. Ce poți concluziona sigur?",
      "explanation": "Prețul nu demonstrează singur potrivirea produsului.",
      "correctFeedback": "Corect. Prețul nu demonstrează singur potrivirea produsului.",
      "incorrectFeedback": "Nu chiar. Prețul nu demonstrează singur potrivirea produsului.",
      "type": "scenariu",
      "context": "Compari două produse pentru aceeași nevoie.",
      "options": [
        {
          "id": "0",
          "label": "Este automat potrivit pentru orice persoană."
        },
        {
          "id": "1",
          "label": "Prețul este mai mare; utilitatea cere alte informații."
        },
        {
          "id": "2",
          "label": "Nu mai trebuie comparat."
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
          "title": "Schimb",
          "body": "Banii reduc nevoia unui troc direct.",
          "detail": "Poți vinde o carte unei persoane și cumpăra un ghiozdan de la alta. Nu trebuie ca fiecare să aibă exact obiectul dorit de celălalt.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Comparație",
          "body": "Prețurile în aceeași monedă oferă o scară comună.",
          "detail": "Două etichete în lei pot fi comparate direct ca sumă. Pentru alegere, verifică și dacă produsele rezolvă aceeași nevoie; prețul mai mare nu dovedește utilitatea.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Viitor",
          "body": "O sumă păstrată poate avea altă putere de cumpărare.",
          "detail": "Dacă ghiozdanul se scumpește până la excursie, economiile identice pot să nu mai ajungă. Verifică din nou prețul înainte să consideri obiectivul acoperit.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Identifică la o plată de azi ce rol al banilor folosești și ce informație îți mai trebuie înainte să cumperi.",
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
