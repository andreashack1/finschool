import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "ce-faci-daca-ai-fost-inselat",
  "title": "Ce faci dacă ai fost înșelat",
  "categoryId": "siguranta-financiara",
  "chapterId": "datele-tale",
  "slug": "ce-faci-daca-ai-fost-inselat",
  "description": "Daria a introdus date pe o pagină falsă. Prioritatea este limitarea riscului, nu găsirea unei scuze sau plata unei promisiuni de recuperare.",
  "objective": "Să poți prioritiza pașii practici după ce observi o posibilă fraudă, fără panică și fără rușinare.",
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
      "title": "Ce faci dacă ai fost înșelat",
      "body": "Daria a introdus date pe o pagină falsă. Prioritatea este limitarea riscului, nu găsirea unei scuze sau plata unei promisiuni de recuperare."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "După un semnal de fraudă, începe cu limitarea accesului și a operațiunilor în curs, prin serviciile oficiale implicate. Dacă sunt expuse date bancare, contactează banca prin canalul cunoscut și explică exact ce ai comunicat sau autorizat. Nu aștepta să înțelegi perfect întreaga poveste înainte să ceri ajutor verificat.",
        "Nu continua o plată doar fiindcă ai făcut deja prima parte. O cerere suplimentară poate extinde pierderea. Oprește conversația care te împinge să autorizezi și separă reacția de presiunea acelei persoane. Nu comunica alte parole unui interlocutor care promite rezolvarea imediată."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Care este o prioritate imediată după expunere bancară?",
      "explanation": "Reacția verificată precede promisiunile de recuperare.",
      "correctFeedback": "Corect. Reacția verificată precede promisiunile de recuperare.",
      "incorrectFeedback": "Nu chiar. Reacția verificată precede promisiunile de recuperare.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Contactul oficial pentru limitarea riscului și verificare."
        },
        {
          "id": "1",
          "label": "Plata oricărei taxe de anulare din mesaj."
        },
        {
          "id": "2",
          "label": "Ascunderea situației."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Trebuie să înțelegi perfect frauda înainte să contactezi banca.",
      "explanation": "Poți cere ajutor explicând ce știi și ce ai făcut.",
      "correctFeedback": "Corect. Poți cere ajutor explicând ce știi și ce ai făcut.",
      "incorrectFeedback": "Nu chiar. Poți cere ajutor explicând ce știi și ce ai făcut.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Păstrează dovezi relevante: mesaje, confirmări, datele operațiunii și cronologia. Nu modifica inutil informațiile și nu publica actele sau codurile. Pentru o verificare competentă, datele precise sunt mai utile decât o poveste fără ore, sume sau destinații. Urmează cerințele canalului oficial pentru raportare, potrivit situației.",
        "Protejează conturile care pot controla alte servicii, precum e-mailul. Schimbă accesul prin aplicațiile legitime și verifică sesiunile disponibile. Dacă ai instalat ceva suspect, cere ajutor competent pentru dispozitiv. Lecția nu garantează recuperarea sumelor și nu inventează o procedură identică pentru toate fraudele."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Interlocutorul cere altă plată pentru anulare. Ce faci?",
      "explanation": "O cerere nouă poate extinde riscul.",
      "correctFeedback": "Corect. O cerere nouă poate extinde riscul.",
      "incorrectFeedback": "Nu chiar. O cerere nouă poate extinde riscul.",
      "type": "scenariu",
      "context": "Prima operațiune este suspectă.",
      "options": [
        {
          "id": "0",
          "label": "Plătești ca să justifici suma deja pierdută."
        },
        {
          "id": "1",
          "label": "Oprești și verifici independent."
        },
        {
          "id": "2",
          "label": "Trimiți toate parolele."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ce ajută documentarea?",
      "explanation": "Datele precise susțin verificarea competentă.",
      "correctFeedback": "Corect. Datele precise susțin verificarea competentă.",
      "incorrectFeedback": "Nu chiar. Datele precise susțin verificarea competentă.",
      "type": "scenariu",
      "context": "Vrei să explici situația instituției.",
      "options": [
        {
          "id": "0",
          "label": "Doar totalul pierdut, fără destinatari și confirmări."
        },
        {
          "id": "1",
          "label": "Ștergerea întregii conversații."
        },
        {
          "id": "2",
          "label": "Cronologia, sumele, mesajele și confirmările relevante."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-ce-faci-daca-ai-fost-inselat",
      "paragraphs": [
        "Daria primește un mesaj despre un colet și introduce date pe pagina trimisă. După confirmare observă că operațiunea nu corespunde livrării. Un interlocutor îi cere încă o plată pentru anulare. Daria se simte rușinată și este tentată să ascundă situația până vede dacă banii revin. Un prieten o ajută să se concentreze pe pașii practici.",
        "Ea oprește conversația și contactează banca prin canalul cunoscut, explicând datele introduse și codul autorizat. Păstrează mesajele, ora și confirmarea. Verifică și e-mailul folosit pentru acces și nu plătește serviciul anonim care promite recuperare sigură. Urmează pașii oficiali potriviți situației și urmărește tranzacțiile. Nu știe încă rezultatul recuperării, dar poate limita expunerea și poate furniza dovezi. Reacția este despre informații și protecție, fără a transforma greșeala într-un verdict despre persoană."
      ]
    },
    {
      "id": "q5",
      "question": "Ce ar fi putut întârzia reacția Dariei?",
      "explanation": "Sentimentele sunt de înțeles, dar nu trebuie să blocheze protecția.",
      "correctFeedback": "Corect. Sentimentele sunt de înțeles, dar nu trebuie să blocheze protecția.",
      "incorrectFeedback": "Nu chiar. Sentimentele sunt de înțeles, dar nu trebuie să blocheze protecția.",
      "caseId": "caz-ce-faci-daca-ai-fost-inselat",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Rușinea și așteptarea fără verificare."
        },
        {
          "id": "1",
          "label": "Păstrarea mesajelor."
        },
        {
          "id": "2",
          "label": "Contactul oficial rapid."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce explică băncii?",
      "explanation": "Acțiunile concrete ajută alegerea pașilor.",
      "correctFeedback": "Corect. Acțiunile concrete ajută alegerea pașilor.",
      "incorrectFeedback": "Nu chiar. Acțiunile concrete ajută alegerea pașilor.",
      "caseId": "caz-ce-faci-daca-ai-fost-inselat",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Numai suma plătită, fără datele și codurile expuse."
        },
        {
          "id": "1",
          "label": "Datele introduse și operațiunea autorizată."
        },
        {
          "id": "2",
          "label": "Doar numele folosit de expeditor, fără operațiunea autorizată."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "De ce refuză recuperarea garantată contra taxă?",
      "explanation": "Identitatea și procedura trebuie verificate separat.",
      "correctFeedback": "Corect. Identitatea și procedura trebuie verificate separat.",
      "incorrectFeedback": "Nu chiar. Identitatea și procedura trebuie verificate separat.",
      "caseId": "caz-ce-faci-daca-ai-fost-inselat",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Plata taxei ar confirma automat că serviciul este legitim."
        },
        {
          "id": "1",
          "label": "Suma mică a taxei ar elimina riscul unei noi pierderi."
        },
        {
          "id": "2",
          "label": "Promisiunea neconfirmată poate fi o nouă fraudă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Fraudele sunt construite să convingă, uneori prin panică, încredere sau relații. Rușinea poate întârzia reacția și comunicarea cu instituția ori cu o persoană de sprijin. Poți descrie faptele fără să te etichetezi. Cere ajutor și precizează ce ai făcut, inclusiv dacă ai comunicat un cod.",
        "Ferește-te de promisiuni de recuperare garantată contra unei taxe noi. Verifică independent identitatea și procedura. După limitarea riscului, urmărește operațiunile și păstrează răspunsurile oficiale. Prioritatea este un proces clar: oprești extinderea, protejezi accesul, documentezi și raportezi prin canalele competente."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ce cont merită protejat și pentru legătura cu alte servicii?",
      "explanation": "E-mailul poate permite acces la alte produse.",
      "correctFeedback": "Corect. E-mailul poate permite acces la alte produse.",
      "incorrectFeedback": "Nu chiar. E-mailul poate permite acces la alte produse.",
      "type": "scenariu",
      "context": "Au fost expuse credențiale reutilizate.",
      "options": [
        {
          "id": "0",
          "label": "E-mailul folosit la recuperarea accesului."
        },
        {
          "id": "1",
          "label": "Doar un cont fără legătură."
        },
        {
          "id": "2",
          "label": "Niciun cont dacă nu vezi pierdere."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Daria a contactat banca și a păstrat dovezile. Ce poate concluziona despre recuperarea banilor?",
      "explanation": "Limitarea expunerii și dovezile ajută verificarea. Nu confirmă singure recuperarea; urmărește răspunsurile oficiale și pașii potriviți situației.",
      "correctFeedback": "Corect. Limitarea expunerii și dovezile ajută verificarea. Nu confirmă singure recuperarea; urmărește răspunsurile oficiale și pașii potriviți situației.",
      "incorrectFeedback": "Nu chiar. Limitarea expunerii și dovezile ajută verificarea. Nu confirmă singure recuperarea; urmărește răspunsurile oficiale și pașii potriviți situației.",
      "type": "scenariu",
      "context": "Ai nevoie de o reacție realistă.",
      "options": [
        {
          "id": "0",
          "label": "Contactarea băncii garantează returnarea integrală."
        },
        {
          "id": "1",
          "label": "A făcut pași utili, dar rezultatul recuperării trebuie verificat."
        },
        {
          "id": "2",
          "label": "Dovezile înlocuiesc orice procedură de verificare."
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
          "title": "Oprește",
          "body": "Nu continua operațiunile cerute de sursa suspectă.",
          "detail": "O taxă nouă de anulare poate extinde pierderea inițială. Contactează serviciul oficial, explică datele expuse și păstrează mesajele, fără să aștepți o promisiune de recuperare sigură.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Protejează",
          "body": "Contactează serviciile oficiale implicate.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Documentează",
          "body": "Păstrează datele relevante și cere ajutor fără rușine.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Salvează canalele oficiale de ajutor și notează ce date ai păstra dacă ai observa o fraudă.",
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
