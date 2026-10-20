import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cat-costa-sa-te-muti-singur",
  "title": "Cât costă să te muți singur",
  "categoryId": "pe-cont-propriu",
  "chapterId": "casa-ta",
  "slug": "cat-costa-sa-te-muti-singur",
  "description": "Teodora are economii de 2.500 lei și vede o chirie de 1.200.",
  "objective": "Să poți explica cât costă să te muți singur și să alegi o acțiune justificată în situația prezentată.",
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
    "label": "ASF · Ghid RCA",
    "url": "https://asfromania.ro/files/Ghid_RCA.pdf"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Cât costă să te muți singur",
      "body": "Teodora are economii de 2.500 lei și vede o chirie de 1.200."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Mutarea presupune costuri inițiale și costuri lunare. La început pot apărea prima chirie, garanția, transportul și lucrurile necesare locuinței. Lunar se adaugă utilități, hrană, transport și alte obligații. Garanția poate fi recuperabilă conform condițiilor, dar banii trebuie să existe la început; nu sunt disponibili simultan pentru cumpărăturile obișnuite.",
        "Pentru viața pe cont propriu, separă costul de început de costurile repetate. O cheltuială vizibilă poate fi numai o parte din total. Notează ce include prețul și ce trebuie plătit separat. Verificarea făcută înainte de acceptare îți oferă timp pentru comparație și pentru clarificarea condițiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce separi în planul mutării?",
      "explanation": "Costurile inițiale de cele lunare.",
      "correctFeedback": "Corect. Costurile inițiale de cele lunare.",
      "incorrectFeedback": "Nu chiar. Costurile inițiale de cele lunare.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Costurile inițiale de cele lunare."
        },
        {
          "id": "1",
          "label": "Doar chiria, presupunând că garanția poate fi folosită și pentru mutare."
        },
        {
          "id": "2",
          "label": "Doar totalul primei luni, aplicat identic tuturor lunilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Dacă ai bani pentru prima chirie, ai automat bani pentru întreaga mutare.",
      "explanation": "O chirie accesibilă singură poate deveni dificilă împreună cu toate celelalte costuri. Cere estimări pentru utilități în perioade diferite și verifică ce include chiria. Nu trata garanția drept pierdere sigură, dar nici drept bani deja returnați. Condițiile de restituire și documentarea stării locuinței contează la finalul contractului.",
      "correctFeedback": "Corect. O chirie accesibilă singură poate deveni dificilă împreună cu toate celelalte costuri. Cere estimări pentru utilități în perioade diferite și verifică ce include chiria. Nu trata garanția drept pierdere sigură, dar nici drept bani deja returnați. Condițiile de restituire și documentarea stării locuinței contează la finalul contractului.",
      "incorrectFeedback": "Nu chiar. O chirie accesibilă singură poate deveni dificilă împreună cu toate celelalte costuri. Cere estimări pentru utilități în perioade diferite și verifică ce include chiria. Nu trata garanția drept pierdere sigură, dar nici drept bani deja returnați. Condițiile de restituire și documentarea stării locuinței contează la finalul contractului.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "În exemplu, chiria este 1.200 lei, garanția 1.200 și mutarea 300. Pentru aceste trei elemente sunt necesari 2.700 lei inițial. Ulterior, dacă utilitățile estimate sunt 250, locuirea lunară ajunge la 1.450 înainte de hrană și transport. Nu folosi totalul inițial drept cost lunar și nu ignora sumele care lipsesc din exercițiu.",
        "Sumele sunt ipotetice și nu reprezintă prețuri actuale ale pieței. Folosește exemplul pentru metoda de calcul, apoi înlocuiește cifrele cu oferte confirmate. Păstrează o evidență a termenelor, fiindcă un buget poate părea suficient lunar, dar să nu aibă bani disponibili exact la data plății."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cât însumează 1.200 chirie, 1.200 garanție și 300 mutare?",
      "explanation": "2.700 lei.",
      "correctFeedback": "Corect. 2.700 lei.",
      "incorrectFeedback": "Nu chiar. 2.700 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "1.500 lei."
        },
        {
          "id": "1",
          "label": "2.700 lei."
        },
        {
          "id": "2",
          "label": "2.400 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Chirie 1.200 și utilități 250. Ce total lunar ai înainte de alte costuri?",
      "explanation": "1.450 lei.",
      "correctFeedback": "Corect. 1.450 lei.",
      "incorrectFeedback": "Nu chiar. 1.450 lei.",
      "type": "scenariu",
      "context": "În exemplu, chiria este 1.200 lei, garanția 1.200 și mutarea 300. Pentru aceste trei elemente sunt necesari 2.700 lei inițial. Ulterior, dacă utilitățile estimate sunt 250, locuirea lunară ajunge la 1.450 înainte de hrană și transport. Nu folosi totalul inițial drept cost lunar și nu ignora sumele care lipsesc din exercițiu.",
      "options": [
        {
          "id": "0",
          "label": "2.700 lei."
        },
        {
          "id": "1",
          "label": "950 lei."
        },
        {
          "id": "2",
          "label": "1.450 lei."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cat-costa-sa-te-muti-singur",
      "paragraphs": [
        "Teodora are economii de 2.500 lei și vede o chirie de 1.200. Proprietarul cere și o garanție de 1.200, iar mutarea ar costa 300. Ea calculează că îi lipsesc 200 chiar înainte de cumpărăturile inițiale. Verifică separat utilitățile estimate la 250 și costurile de hrană și navetă. Nu decide numai din cifra chiriei.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: În exemplu, chiria este 1.200 lei, garanția 1.200 și mutarea 300. Pentru aceste trei elemente sunt necesari 2.700 lei inițial. Ulterior, dacă utilitățile estimate sunt 250, locuirea lunară ajunge la 1.450 înainte de hrană și transport. Nu folosi totalul inițial drept cost lunar și nu ignora sumele care lipsesc din exercițiu. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "Cât îi lipsește Teodorei din cei 2.500 pentru începutul de 2.700?",
      "explanation": "200 lei.",
      "correctFeedback": "Corect. 200 lei.",
      "incorrectFeedback": "Nu chiar. 200 lei.",
      "caseId": "caz-cat-costa-sa-te-muti-singur",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "200 lei."
        },
        {
          "id": "1",
          "label": "300 lei."
        },
        {
          "id": "2",
          "label": "1.200 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce costuri lunare nu sunt incluse în cei 1.450?",
      "explanation": "Hrana și transportul.",
      "correctFeedback": "Corect. Hrana și transportul.",
      "incorrectFeedback": "Nu chiar. Hrana și transportul.",
      "caseId": "caz-cat-costa-sa-te-muti-singur",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Chiria și utilitățile."
        },
        {
          "id": "1",
          "label": "Hrana și transportul."
        },
        {
          "id": "2",
          "label": "Garanția deja numărată."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Cum tratează garanția în disponibilul inițial?",
      "explanation": "Ca bani necesari, chiar dacă pot fi restituiți ulterior.",
      "correctFeedback": "Corect. Ca bani necesari, chiar dacă pot fi restituiți ulterior.",
      "incorrectFeedback": "Nu chiar. Ca bani necesari, chiar dacă pot fi restituiți ulterior.",
      "caseId": "caz-cat-costa-sa-te-muti-singur",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ca bani deja returnați."
        },
        {
          "id": "1",
          "label": "Ca venit nou."
        },
        {
          "id": "2",
          "label": "Ca bani necesari, chiar dacă pot fi restituiți ulterior."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "O chirie accesibilă singură poate deveni dificilă împreună cu toate celelalte costuri. Cere estimări pentru utilități în perioade diferite și verifică ce include chiria. Nu trata garanția drept pierdere sigură, dar nici drept bani deja returnați. Condițiile de restituire și documentarea stării locuinței contează la finalul contractului.",
        "Când costul sau situația se schimbă, actualizează planul și explică diferența. Nu număra aceeași sumă pentru două destinații simultan. Păstrează contractele, facturile și confirmările relevante. Pentru o problemă contractuală, verifică regula aplicabilă și cere sprijin potrivit, în loc să presupui că toate condițiile sunt identice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "De ce verifici utilitățile în perioade diferite?",
      "explanation": "Pot varia sezonier.",
      "correctFeedback": "Corect. Pot varia sezonier.",
      "incorrectFeedback": "Nu chiar. Pot varia sezonier.",
      "type": "scenariu",
      "context": "În exemplu, chiria este 1.200 lei, garanția 1.200 și mutarea 300. Pentru aceste trei elemente sunt necesari 2.700 lei inițial. Ulterior, dacă utilitățile estimate sunt 250, locuirea lunară ajunge la 1.450 înainte de hrană și transport. Nu folosi totalul inițial drept cost lunar și nu ignora sumele care lipsesc din exercițiu.",
      "options": [
        {
          "id": "0",
          "label": "Pot varia sezonier."
        },
        {
          "id": "1",
          "label": "Sunt mereu zero iarna."
        },
        {
          "id": "2",
          "label": "Înlocuiesc chiria."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce documentare ajută la restituirea garanției?",
      "explanation": "Condițiile și starea locuinței consemnată.",
      "correctFeedback": "Corect. Condițiile și starea locuinței consemnată.",
      "incorrectFeedback": "Nu chiar. Condițiile și starea locuinței consemnată.",
      "type": "scenariu",
      "context": "În exemplu, chiria este 1.200 lei, garanția 1.200 și mutarea 300. Pentru aceste trei elemente sunt necesari 2.700 lei inițial. Ulterior, dacă utilitățile estimate sunt 250, locuirea lunară ajunge la 1.450 înainte de hrană și transport. Nu folosi totalul inițial drept cost lunar și nu ignora sumele care lipsesc din exercițiu.",
      "options": [
        {
          "id": "0",
          "label": "Doar o promisiune vagă."
        },
        {
          "id": "1",
          "label": "Condițiile și starea locuinței consemnată."
        },
        {
          "id": "2",
          "label": "Doar suma garanției, fără starea consemnată la predare."
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
          "body": "Mutarea cere bani la început și un buget lunar separat.",
          "detail": "Prima chirie, garanția și mutarea cer 2.700 lei în exemplu, peste economiile de 2.500 ale Teodorei. Totalul lunar se calculează separat, cu utilități, hrană și transport.",
          "type": "normal",
          "detailHighlights": [
            "economiile",
            "garanția"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Garanția și prima chirie pot trebui plătite împreună.",
          "type": "normal",
          "detail": "Garanția, prima chirie și mutarea pot fi necesare înainte de următorul venit. Nu le confunda cu totalul lunar.",
          "detailHighlights": [
            "garanția",
            "totalul"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Adaugă hrana, utilitățile și transportul când compari locuințe.",
          "type": "normal",
          "detail": "O locuință poate părea accesibilă până adaugi utilitățile, transportul și hrana.",
          "detailHighlights": [
            "transportul"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Fă un tabel cu costurile de început și cele lunare ale unei mutări fictive.",
          "type": "action",
          "detail": "Separă în tabel ce plătești înainte de mutare de ce revine lunar și lasă o rezervă pentru diferențe față de estimare.",
          "detailHighlights": [
            "plătești"
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
