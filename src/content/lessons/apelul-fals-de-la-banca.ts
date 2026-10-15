import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "apelul-fals-de-la-banca",
  "title": "Apelul fals de la „bancă”",
  "categoryId": "siguranta-financiara",
  "chapterId": "mesaje-si-apeluri-false",
  "slug": "apelul-fals-de-la-banca",
  "description": "Vlad este sunat despre un presupus credit. Apelantul știe numele lui și îi cere să mute banii pentru protecție.",
  "objective": "Să poți identifica semnale suspecte într-un apel și să verifici identitatea apelantului printr-un canal separat.",
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
      "title": "Apelul fals de la „bancă”",
      "body": "Vlad este sunat despre un presupus credit. Apelantul știe numele lui și îi cere să mute banii pentru protecție."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un apelant poate pretinde că lucrează la bancă și poate folosi informații reale despre tine. Numele, un ton profesionist sau numărul afișat nu confirmă singure identitatea. Când cererea privește bani sau acces, verificarea trebuie făcută printr-un canal separat, pe care îl cunoști deja.",
        "Semnalele importante sunt presiunea, secretul și cererile de autorizare: mută banii imediat, nu spune nimănui, comunică un cod sau instalează o aplicație. Nu ai nevoie să demonstrezi pe loc intenția apelantului. Poți închide discuția și contacta banca prin aplicația ori datele oficiale pe care le-ai verificat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce confirmă identitatea apelantului mai sigur?",
      "explanation": "Informații reale pot fi folosite într-o poveste falsă.",
      "correctFeedback": "Corect. Informații reale pot fi folosite într-o poveste falsă.",
      "incorrectFeedback": "Nu chiar. Informații reale pot fi folosite într-o poveste falsă.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Contactarea separată a băncii prin canalul cunoscut."
        },
        {
          "id": "1",
          "label": "Faptul că știe numele."
        },
        {
          "id": "2",
          "label": "Tonul profesional."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Numărul afișat este suficient pentru a autoriza orice cerere.",
      "explanation": "Identitatea trebuie verificată separat.",
      "correctFeedback": "Corect. Identitatea trebuie verificată separat.",
      "incorrectFeedback": "Nu chiar. Identitatea trebuie verificată separat.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un „cont sigur” propus de apelant poate fi doar un destinatar controlat de altcineva. O poveste despre un credit fals poate crea panică pentru a grăbi transferul. Separă problema pretinsă de acțiunea cerută: chiar dacă vrei să verifici un credit, nu trebuie să urmezi instrucțiunile unei persoane neconfirmate.",
        "Codurile, parolele și accesul la dispozitiv pot autoriza operațiuni. Nu le comunica pentru a demonstra că ești tu. Când contactezi separat instituția, explică ce ai primit și ce acțiuni ai făcut. Folosește numărul cunoscut, nu numărul dictat ca suport de aceeași persoană."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Un apelant cere mutarea în cont sigur. Ce faci?",
      "explanation": "Destinatarul propus poate aparține altcuiva.",
      "correctFeedback": "Corect. Destinatarul propus poate aparține altcuiva.",
      "incorrectFeedback": "Nu chiar. Destinatarul propus poate aparține altcuiva.",
      "type": "scenariu",
      "context": "Nu ai inițiat apelul.",
      "options": [
        {
          "id": "0",
          "label": "Transferi înainte să citești destinatarul."
        },
        {
          "id": "1",
          "label": "Oprești și verifici independent cererea."
        },
        {
          "id": "2",
          "label": "Dictezi parola pentru protecție."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Apelantul îți dă numărul suportului. Este verificare separată?",
      "explanation": "Același lanț poate controla ambele contacte.",
      "correctFeedback": "Corect. Același lanț poate controla ambele contacte.",
      "incorrectFeedback": "Nu chiar. Același lanț poate controla ambele contacte.",
      "type": "scenariu",
      "context": "Vrei să confirmi apelul.",
      "options": [
        {
          "id": "0",
          "label": "Da, orice număr oferit de el confirmă povestea."
        },
        {
          "id": "1",
          "label": "Da, dacă răspunde altă voce."
        },
        {
          "id": "2",
          "label": "Nu; folosești date oficiale găsite independent."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-apelul-fals-de-la-banca",
      "paragraphs": [
        "Vlad primește un apel în timpul pauzei de la primul job. Persoana îi spune numele și pretinde că cineva a cerut un credit pe numele lui. Îi cere să nu închidă și să mute economiile într-un cont sigur. Numărul afișat pare familiar, iar tonul este convingător. Vlad se teme că va pierde banii dacă întârzie.",
        "Apelantul cere apoi un cod primit pe telefon și promite că o altă persoană de la o autoritate va confirma procedura. Vlad observă că povestea îl împinge să autorizeze operațiuni, nu doar să verifice o informație. Închide apelul și contactează banca prin canalul cunoscut. Păstrează numărul, ora și mesajele, fără să ofere parole. Dacă ar fi autorizat deja o operațiune, ar explica rapid băncii ce s-a întâmplat. Faptul că apelantul știe numele nu înlocuiește verificarea separată."
      ]
    },
    {
      "id": "q5",
      "question": "Ce semnale apar în cazul lui Vlad?",
      "explanation": "Presiunea și autorizarea sunt centrale în risc.",
      "correctFeedback": "Corect. Presiunea și autorizarea sunt centrale în risc.",
      "incorrectFeedback": "Nu chiar. Presiunea și autorizarea sunt centrale în risc.",
      "caseId": "caz-apelul-fals-de-la-banca",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Urgență, transfer și cererea unui cod."
        },
        {
          "id": "1",
          "label": "Doar o informație neutră."
        },
        {
          "id": "2",
          "label": "Numai o comparație de conturi."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "De ce numele corect nu este suficient?",
      "explanation": "Datele personale nu sunt o dovadă completă de identitate.",
      "correctFeedback": "Corect. Datele personale nu sunt o dovadă completă de identitate.",
      "incorrectFeedback": "Nu chiar. Datele personale nu sunt o dovadă completă de identitate.",
      "caseId": "caz-apelul-fals-de-la-banca",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Dacă numele e corect, nu mai trebuie verificată cererea."
        },
        {
          "id": "1",
          "label": "Poate fi cunoscut și de o persoană neautorizată."
        },
        {
          "id": "2",
          "label": "Numărul afișat și numele sunt două confirmări independente."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Cum tratează promisiunea celui de-al doilea apel?",
      "explanation": "Rolurile pretinse nu înlocuiesc canalul competent.",
      "correctFeedback": "Corect. Rolurile pretinse nu înlocuiesc canalul competent.",
      "incorrectFeedback": "Nu chiar. Rolurile pretinse nu înlocuiesc canalul competent.",
      "caseId": "caz-apelul-fals-de-la-banca",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Acceptă orice persoană introdusă de primul apelant."
        },
        {
          "id": "1",
          "label": "Trimite coduri tuturor interlocutorilor."
        },
        {
          "id": "2",
          "label": "Verifică independent, fără să accepte lanțul ca dovadă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Frauda poate fi construită în mai multe apeluri, cu persoane care pretind roluri diferite. Un al doilea interlocutor prezentat drept autoritate nu verifică automat primul mesaj. Caută independent canalul competent și nu continua doar pentru că povestea pare coordonată.",
        "Dacă ai comunicat date sau ai autorizat ceva, reacționează fără rușine: contactează banca oficial, protejează accesul și păstrează informațiile apelului. Nu plăti unei persoane necunoscute care promite recuperarea imediată. Recunoașterea semnalelor îți permite să introduci o pauză și să reduci riscul; vinovăția nu ajută verificarea."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ai comunicat un cod. Ce pas este util?",
      "explanation": "Reacția verificată poate limita consecințele.",
      "correctFeedback": "Corect. Reacția verificată poate limita consecințele.",
      "incorrectFeedback": "Nu chiar. Reacția verificată poate limita consecințele.",
      "type": "scenariu",
      "context": "Observi ulterior că apelul era suspect.",
      "options": [
        {
          "id": "0",
          "label": "Contactezi banca oficial și explici rapid ce ai făcut."
        },
        {
          "id": "1",
          "label": "Ascunzi situația din rușine."
        },
        {
          "id": "2",
          "label": "Plătești imediat un recuperator anonim."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce protejează pauza?",
      "explanation": "Nu trebuie să rezolvi totul în conversația neconfirmată.",
      "correctFeedback": "Corect. Nu trebuie să rezolvi totul în conversația neconfirmată.",
      "incorrectFeedback": "Nu chiar. Nu trebuie să rezolvi totul în conversația neconfirmată.",
      "type": "scenariu",
      "context": "Apelantul insistă să nu închizi.",
      "options": [
        {
          "id": "0",
          "label": "Certitudinea că apelul este fals, fără alte verificări."
        },
        {
          "id": "1",
          "label": "Timpul pentru verificarea identității și operațiunii."
        },
        {
          "id": "2",
          "label": "Posibilitatea de a verifica prin numărul dictat de apelant."
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
          "title": "Nu te grăbi",
          "body": "Urgența poate fi parte din poveste.",
          "detail": "Povestea despre un credit necunoscut îl împinge pe Vlad să mute bani și să comunice un cod. Închide apelul și verifică situația prin contactul băncii găsit separat, fără să urmeze numărul dictat.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Canal separat",
          "body": "Sună folosind datele oficiale cunoscute.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Coduri protejate",
          "body": "Nu comunica autorizări apelantului.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Găsește și salvează canalul oficial de contact al băncii tale, fără să pornești de la un mesaj nesolicitat.",
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
