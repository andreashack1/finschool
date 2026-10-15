import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "abonamentele",
  "title": "Abonamentele",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "cumperi-inteligent",
  "slug": "abonamentele",
  "description": "Mara plătește trei servicii lunar, dar folosește numai unul. Sumele mici continuă să plece chiar când aplicațiile rămân închise.",
  "objective": "Să poți calcula costul unui abonament pe termen mai lung și să recunoști abonamentele pe care nu le mai folosești.",
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
      "title": "Abonamentele",
      "body": "Mara plătește trei servicii lunar, dar folosește numai unul. Sumele mici continuă să plece chiar când aplicațiile rămân închise."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un abonament schimbă o cumpărătură punctuală într-o plată repetată, conform condițiilor serviciului. O sumă lunară poate părea mică, dar costul unei perioade mai lungi este relevant. Într-un exemplu, 25 lei lunar înseamnă 300 lei în douăsprezece luni, dacă prețul rămâne constant și plătești tot anul.",
        "Nu confunda plata cu utilizarea. Serviciul poate fi disponibil, iar tu să nu îl folosești. Pentru o comparație practică, notează costul, cât de des îl utilizezi și data următoarei plăți. Abonamentul este un instrument util când beneficiul justifică suma în contextul tău."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "25 lei lunar pe 12 luni costă cât în exemplu?",
      "explanation": "25 × 12 = 300 lei la preț constant.",
      "correctFeedback": "Corect. 25 × 12 = 300 lei la preț constant.",
      "incorrectFeedback": "Nu chiar. 25 × 12 = 300 lei la preț constant.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "300 lei."
        },
        {
          "id": "1",
          "label": "25 lei."
        },
        {
          "id": "2",
          "label": "250 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Ștergerea aplicației închide automat orice abonament.",
      "explanation": "Abonamentul trebuie administrat prin canalul relevant al plății.",
      "correctFeedback": "Corect. Abonamentul trebuie administrat prin canalul relevant al plății.",
      "incorrectFeedback": "Nu chiar. Abonamentul trebuie administrat prin canalul relevant al plății.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "O perioadă de test poate trece la plată dacă așa sunt condițiile acceptate. Verifică data și metoda de anulare înainte de activare. Ștergerea aplicației nu înseamnă automat că ai închis abonamentul. Caută locul unde este administrată plata și confirmarea opririi reînnoirii.",
        "Un pachet anual poate avea un cost lunar echivalent mai mic, dar cere o sumă mai mare acum și poate reduce flexibilitatea. Compară numai dacă te aștepți realist să folosești serviciul pentru perioada respectivă. O ofertă ieftină pe lună nu ajută dacă plătești un an pentru două luni de utilizare."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici înainte de un test gratuit?",
      "explanation": "Condițiile pot include reînnoirea plătită.",
      "correctFeedback": "Corect. Condițiile pot include reînnoirea plătită.",
      "incorrectFeedback": "Nu chiar. Condițiile pot include reînnoirea plătită.",
      "type": "scenariu",
      "context": "Serviciul cere o metodă de plată.",
      "options": [
        {
          "id": "0",
          "label": "Doar numele aplicației."
        },
        {
          "id": "1",
          "label": "Data trecerii la plată și metoda de anulare."
        },
        {
          "id": "2",
          "label": "Presupui că orice test se oprește singur."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un plan anual pare mai ieftin lunar. Ce mai compari?",
      "explanation": "Costul pe lună nu descrie singur angajamentul anual.",
      "correctFeedback": "Corect. Costul pe lună nu descrie singur angajamentul anual.",
      "incorrectFeedback": "Nu chiar. Costul pe lună nu descrie singur angajamentul anual.",
      "type": "scenariu",
      "context": "Nu știi dacă vei folosi serviciul tot anul.",
      "options": [
        {
          "id": "0",
          "label": "Doar echivalentul din reclamă."
        },
        {
          "id": "1",
          "label": "Doar diferența față de prețul anterior, fără perioada folosită."
        },
        {
          "id": "2",
          "label": "Suma plătită acum, flexibilitatea și utilizarea probabilă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-abonamentele",
      "paragraphs": [
        "Mara are trei abonamente ipotetice: 25 lei pentru muzică, 18 lei pentru o aplicație de editare și 12 lei pentru un serviciu de stocare. Folosește muzica des, dar nu a mai deschis aplicația de editare de două luni. Spațiul de stocare îi este încă necesar pentru proiecte. Toate plățile continuă automat.",
        "Ea calculează 55 lei lunar și 660 lei într-un an dacă prețurile nu se schimbă. Nu anulează totul numai pentru a avea o regulă rigidă. Verifică mai întâi utilizarea și condițiile fiecărui serviciu. Pentru editare caută administrarea abonamentului, nu doar butonul de ștergere a aplicației. După oprirea reînnoirii păstrează confirmarea și urmărește extrasul. O ofertă anuală pentru muzică este evaluată separat, în funcție de suma disponibilă și de utilizarea probabilă, fără a confunda prețul lunar echivalent cu plata imediată."
      ]
    },
    {
      "id": "q5",
      "question": "Cât plătește Mara lunar în total?",
      "explanation": "25 + 18 + 12 = 55 lei.",
      "correctFeedback": "Corect. 25 + 18 + 12 = 55 lei.",
      "incorrectFeedback": "Nu chiar. 25 + 18 + 12 = 55 lei.",
      "caseId": "caz-abonamentele",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "55 lei."
        },
        {
          "id": "1",
          "label": "43 lei."
        },
        {
          "id": "2",
          "label": "660 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Care abonament merită verificat primul pentru utilizare redusă?",
      "explanation": "Mara nu a folosit editarea, dar trebuie să verifice și condițiile.",
      "correctFeedback": "Corect. Mara nu a folosit editarea, dar trebuie să verifice și condițiile.",
      "incorrectFeedback": "Nu chiar. Mara nu a folosit editarea, dar trebuie să verifice și condițiile.",
      "caseId": "caz-abonamentele",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Muzica doar fiindcă este divertisment."
        },
        {
          "id": "1",
          "label": "Aplicația de editare."
        },
        {
          "id": "2",
          "label": "Stocarea fără a verifica proiectele."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Cum confirmă oprirea plății?",
      "explanation": "Confirmarea și tranzacțiile verifică rezultatul.",
      "correctFeedback": "Corect. Confirmarea și tranzacțiile verifică rezultatul.",
      "incorrectFeedback": "Nu chiar. Confirmarea și tranzacțiile verifică rezultatul.",
      "caseId": "caz-abonamentele",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Șterge doar iconița."
        },
        {
          "id": "1",
          "label": "Presupune că mesajul informal este suficient."
        },
        {
          "id": "2",
          "label": "Păstrează confirmarea și verifică următorul extras."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Revizuirea abonamentelor nu înseamnă anularea tuturor serviciilor plăcute. Poți păstra ce folosești, modifica pachetul sau opri ce nu mai are rol. Scopul este să faci plățile repetitive vizibile și să le alegi din nou, nu să le lași să continue numai fiindcă au fost activate cândva.",
        "După anulare verifică data până la care ai acces și următorul extras. Păstrează confirmarea și evită presupunerea că o apăsare neclară a rezolvat totul. Dacă apar plăți neexplicate, contactează serviciul prin canalul potrivit și compară tranzacția cu condițiile acceptate, fără să inventezi reguli de rambursare."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un serviciu este folosit des și încape în plan. Ce alegere poate fi rezonabilă?",
      "explanation": "Revizuirea ajută alegerea, fără moralizarea divertismentului.",
      "correctFeedback": "Corect. Revizuirea ajută alegerea, fără moralizarea divertismentului.",
      "incorrectFeedback": "Nu chiar. Revizuirea ajută alegerea, fără moralizarea divertismentului.",
      "type": "scenariu",
      "context": "Analizezi utilitatea unui abonament.",
      "options": [
        {
          "id": "0",
          "label": "Îl păstrezi după verificarea costului și valorii."
        },
        {
          "id": "1",
          "label": "Îl anulezi fiindcă toate abonamentele sunt rele."
        },
        {
          "id": "2",
          "label": "Activezi automat toate pachetele similare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "După anulare vezi o plată neclară. Ce faci întâi?",
      "explanation": "Datele și documentele preced concluzia.",
      "correctFeedback": "Corect. Datele și documentele preced concluzia.",
      "incorrectFeedback": "Nu chiar. Datele și documentele preced concluzia.",
      "type": "scenariu",
      "context": "Ai păstrat confirmarea anulării.",
      "options": [
        {
          "id": "0",
          "label": "Introduci datele cardului într-un mesaj nesolicitat."
        },
        {
          "id": "1",
          "label": "Compari data și condițiile, apoi ceri clarificare prin canalul oficial."
        },
        {
          "id": "2",
          "label": "Inventez un termen universal de rambursare."
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
          "title": "Adună pe termen lung",
          "body": "Costul lunar se repetă.",
          "detail": "Un serviciu de 25 lei lunar cere 300 lei pentru douăsprezece luni cu preț constant. Compară această sumă cu utilizarea probabilă și verifică reînnoirea, nu doar ultima plată.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Utilizare",
          "body": "Plata și folosirea nu sunt același lucru.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Anulare verificată",
          "body": "Ștergerea aplicației poate să nu oprească plata.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Fă o listă privată cu abonamentele tale, costul și data următoarei plăți, dacă există.",
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
