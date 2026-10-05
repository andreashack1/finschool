import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "anunturi-si-livrari-false",
  "title": "Anunțuri și livrări false",
  "categoryId": "siguranta-financiara",
  "chapterId": "mesaje-si-apeluri-false",
  "slug": "anunturi-si-livrari-false",
  "description": "Ana vinde o carte și primește un link pentru „încasarea banilor”. Pagina cere date de card și o confirmare de plată.",
  "objective": "Să poți recunoaște semnele unui anunț sau mesaj fals legat de vânzări și livrări.",
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
      "title": "Anunțuri și livrări false",
      "body": "Ana vinde o carte și primește un link pentru „încasarea banilor”. Pagina cere date de card și o confirmare de plată."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O poveste despre vânzare sau livrare poate ascunde o cerere de plată ori de date. Un cumpărător pretins poate spune că trebuie să intri într-un link ca să primești banii. Un mesaj de curier poate cere o sumă mică pentru un colet care nu este clar identificat. Verifică operațiunea reală, nu doar cuvintele încasare sau livrare.",
        "Dacă tu vinzi, primirea unei sume nu trebuie confundată cu autorizarea unei plăți către altcineva. Citește ce cere pagina și ce arată confirmarea. Folosește platforma sau serviciul accesat prin canalul cunoscut, fără să urmezi automat linkul conversației."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce verifici dincolo de povestea vânzării?",
      "explanation": "Intenția declarată poate diferi de operațiunea reală.",
      "correctFeedback": "Corect. Intenția declarată poate diferi de operațiunea reală.",
      "incorrectFeedback": "Nu chiar. Intenția declarată poate diferi de operațiunea reală.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Operațiunea pe care pagina cere să o autorizezi."
        },
        {
          "id": "1",
          "label": "Doar cuvântul încasare."
        },
        {
          "id": "2",
          "label": "Doar fotografia cumpărătorului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O sumă mică cerută de un mesaj de curier dovedește siguranța.",
      "explanation": "Suma mică nu verifică expeditorul sau pagina.",
      "correctFeedback": "Corect. Suma mică nu verifică expeditorul sau pagina.",
      "incorrectFeedback": "Nu chiar. Suma mică nu verifică expeditorul sau pagina.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Când aștepți un colet, un mesaj fals poate părea credibil pentru că se potrivește cu contextul. Verifică numărul comenzii și starea prin magazinul sau curierul cunoscut. Nu considera sigla și o sumă mică suficiente pentru autenticitate. Costul inițial mic poate fi o intrare spre date și autorizări mai importante.",
        "Un anunț atractiv cere și verificarea produsului, a persoanei și a modului de plată. Dacă discuția este mutată rapid în afara canalului folosit, întreabă de ce. Nu există o garanție universală că orice platformă protejează orice operațiune; citește condițiile serviciului concret."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Aștepți un colet și primești un link. Ce faci?",
      "explanation": "Contextul plauzibil nu confirmă autenticitatea.",
      "correctFeedback": "Corect. Contextul plauzibil nu confirmă autenticitatea.",
      "incorrectFeedback": "Nu chiar. Contextul plauzibil nu confirmă autenticitatea.",
      "type": "scenariu",
      "context": "Mesajul cere date de plată.",
      "options": [
        {
          "id": "0",
          "label": "Plătești orice mesaj care seamănă cu livrarea."
        },
        {
          "id": "1",
          "label": "Verifici comanda prin serviciul cunoscut."
        },
        {
          "id": "2",
          "label": "Trimiți parola cumpărătorului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Cumpărătorul trimite o captură. Ce verifici înainte să expediezi?",
      "explanation": "Captura nu substituie plata verificată.",
      "correctFeedback": "Corect. Captura nu substituie plata verificată.",
      "incorrectFeedback": "Nu chiar. Captura nu substituie plata verificată.",
      "type": "scenariu",
      "context": "Ai un produs de trimis.",
      "options": [
        {
          "id": "0",
          "label": "Doar claritatea imaginii."
        },
        {
          "id": "1",
          "label": "Doar tonul mesajului."
        },
        {
          "id": "2",
          "label": "Încasarea reală în propriul cont sau serviciu."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-anunturi-si-livrari-false",
      "paragraphs": [
        "Ana vinde o carte de facultate printr-un anunț. Un cumpărător spune că a plătit și îi trimite o pagină pentru încasare. Pagina cere datele cardului și un cod. În confirmarea afișată apare însă o plată, nu primirea banilor. Ana observă diferența dintre povestea conversației și operațiunea cerută.",
        "În aceeași zi primește un mesaj despre o taxă mică de livrare. Ea a comandat alt produs, ceea ce face mesajul aparent plauzibil. Verifică separat comanda în magazin și curierul prin canalul cunoscut. Nu plătește doar fiindcă suma este mică sau sigla familiară. Pentru carte, urmărește încasarea în propriul serviciu înainte de expediere, fără să se bazeze doar pe o captură. Păstrează conversația suspectă și nu comunică autorizările. Contextul real nu dovedește automat autenticitatea unui mesaj."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce diferență observă Ana pe pagina de încasare?",
      "explanation": "Citești operațiunea efectivă înainte de cod.",
      "correctFeedback": "Corect. Citești operațiunea efectivă înainte de cod.",
      "incorrectFeedback": "Nu chiar. Citești operațiunea efectivă înainte de cod.",
      "caseId": "caz-anunturi-si-livrari-false",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Cererea autorizează o plată, nu primirea banilor."
        },
        {
          "id": "1",
          "label": "Cartea este mai scumpă."
        },
        {
          "id": "2",
          "label": "Curierul are un alt logo."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "De ce mesajul de colet pare plauzibil?",
      "explanation": "O poveste poate folosi un context real.",
      "correctFeedback": "Corect. O poveste poate folosi un context real.",
      "incorrectFeedback": "Nu chiar. O poveste poate folosi un context real.",
      "caseId": "caz-anunturi-si-livrari-false",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Orice colet face toate linkurile sigure."
        },
        {
          "id": "1",
          "label": "Ana așteaptă o comandă, dar asta nu validează mesajul."
        },
        {
          "id": "2",
          "label": "Suma mică elimină riscul."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce face pentru expedierea cărții?",
      "explanation": "Plata confirmată și captura sunt diferite.",
      "correctFeedback": "Corect. Plata confirmată și captura sunt diferite.",
      "incorrectFeedback": "Nu chiar. Plata confirmată și captura sunt diferite.",
      "caseId": "caz-anunturi-si-livrari-false",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Trimite imediat după captură."
        },
        {
          "id": "1",
          "label": "Dictează codul pentru a grăbi cumpărătorul."
        },
        {
          "id": "2",
          "label": "Verifică încasarea înainte să trimită produsul."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Capturile de confirmare pot fi greșite sau falsificate. Verifică în propriul cont ori în serviciul legitim dacă plata a ajuns, înainte de a trimite produsul. Un mesaj entuziast nu înlocuiește încasarea reală și nici nu dovedește o obligație de livrare imediată.",
        "Dacă ai introdus date într-o pagină suspectă, contactează banca oficial și protejează accesul după situație. Păstrează anunțul, conversația și linkul pentru verificare, fără să le distribui ca recomandări. Scopul este să identifici momentul în care povestea despre colet sau vânzare se transformă într-o operațiune pe care nu ai intenționat-o."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Discuția se mută rapid în afara platformei. Ce verifici?",
      "explanation": "Canalul și condițiile pot schimba riscul.",
      "correctFeedback": "Corect. Canalul și condițiile pot schimba riscul.",
      "incorrectFeedback": "Nu chiar. Canalul și condițiile pot schimba riscul.",
      "type": "scenariu",
      "context": "Vânzarea a început într-un serviciu cunoscut.",
      "options": [
        {
          "id": "0",
          "label": "Motivul și condițiile modului de plată propus."
        },
        {
          "id": "1",
          "label": "Presupui că protecția platformei se aplică oriunde."
        },
        {
          "id": "2",
          "label": "Aprobi orice transfer nou."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ai introdus date pe pagina suspectă. Ce pas ajută?",
      "explanation": "Reacția verificată poate limita riscul.",
      "correctFeedback": "Corect. Reacția verificată poate limita riscul.",
      "incorrectFeedback": "Nu chiar. Reacția verificată poate limita riscul.",
      "type": "scenariu",
      "context": "Observi ulterior operațiunea neașteptată.",
      "options": [
        {
          "id": "0",
          "label": "Ștergi tot și ignori contul."
        },
        {
          "id": "1",
          "label": "Contactezi banca oficial și păstrezi dovezile."
        },
        {
          "id": "2",
          "label": "Plătești încă o taxă anonimă."
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
          "title": "Operațiunea",
          "body": "Încasarea nu este autorizarea unei plăți.",
          "detail": "Încasarea nu este autorizarea unei plăți.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Coletul",
          "body": "Verifică starea prin canalul cunoscut.",
          "detail": "Verifică starea prin canalul cunoscut.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Dovada",
          "body": "Confirmă încasarea, nu doar captura.",
          "detail": "Confirmă încasarea, nu doar captura.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "La un mesaj de livrare, verifică separat comanda și expeditorul înainte să deschizi linkul.",
          "detail": "La un mesaj de livrare, verifică separat comanda și expeditorul înainte să deschizi linkul.",
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
