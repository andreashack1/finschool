import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "furtul-de-identitate",
  "title": "Furtul de identitate",
  "categoryId": "siguranta-financiara",
  "chapterId": "datele-tale",
  "slug": "furtul-de-identitate",
  "description": "Ioana primește o confirmare pentru un serviciu financiar pe care nu l-a cerut. Nu știe încă dacă mesajul este real sau o capcană.",
  "objective": "Să poți recunoaște situații în care datele tale pot fi folosite de altcineva și să identifici primul pas de verificare.",
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
      "title": "Furtul de identitate",
      "body": "Ioana primește o confirmare pentru un serviciu financiar pe care nu l-a cerut. Nu știe încă dacă mesajul este real sau o capcană."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Furtul de identitate implică folosirea datelor unei persoane pentru a pretinde că este ea. Poate privi conturi, contracte sau alte operațiuni. Un mesaj neașteptat nu dovedește singur că un contract există: poate fi și o încercare de a te atrage într-un link fals. Verificarea începe prin canalul autentic al instituției menționate.",
        "Nu răspunde cu mai multe documente ca să anulezi o cerere neconfirmată. Întâi identifici instituția și situația reală. Dacă există o operațiune făcută fără acord, păstrezi informațiile și ceri pașii de verificare competenți. Lecția nu inventează proceduri juridice sau consecințe universale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce faci întâi cu o confirmare financiară neașteptată?",
      "explanation": "Mesajul poate descrie o problemă reală sau poate fi capcana.",
      "correctFeedback": "Corect. Mesajul poate descrie o problemă reală sau poate fi capcana.",
      "incorrectFeedback": "Nu chiar. Mesajul poate descrie o problemă reală sau poate fi capcana.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Verifici instituția prin canal independent."
        },
        {
          "id": "1",
          "label": "Intri în link și trimiți toate actele."
        },
        {
          "id": "2",
          "label": "Plătești taxa de anulare fără verificare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Orice mesaj despre un cont necunoscut dovedește că acel cont există.",
      "explanation": "Autenticitatea și existența operațiunii trebuie confirmate.",
      "correctFeedback": "Corect. Autenticitatea și existența operațiunii trebuie confirmate.",
      "incorrectFeedback": "Nu chiar. Autenticitatea și existența operațiunii trebuie confirmate.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Documentele și informațiile personale pot fi colectate prin oferte de job, premii, vânzări sau cereri de verificare false. Întreabă cine solicită datele, în ce scop și prin ce procedură. O cerere reală de identificare trebuie diferențiată de o colectare neexplicată într-un chat sau un site necunoscut.",
        "Protejează și contul de e-mail, deoarece poate fi folosit pentru recuperarea accesului la alte servicii. Dacă observi acces neautorizat, schimbă credențialele prin serviciul legitim și verifică sesiunile disponibile. Nu folosi aceeași parolă compromisă pentru alte conturi. Verificarea datelor și protecția accesului lucrează împreună."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Un job cere actul într-un chat neclar. Ce verifici?",
      "explanation": "Datele de identificare necesită un context verificat.",
      "correctFeedback": "Corect. Datele de identificare necesită un context verificat.",
      "incorrectFeedback": "Nu chiar. Datele de identificare necesită un context verificat.",
      "type": "scenariu",
      "context": "Nu ai confirmat angajatorul.",
      "options": [
        {
          "id": "0",
          "label": "Doar salariul promis."
        },
        {
          "id": "1",
          "label": "Solicitantul, scopul și procedura legitimă."
        },
        {
          "id": "2",
          "label": "Presupui că orice recrutare cere toate datele imediat."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "E-mailul a fost accesat de altcineva. Ce pas ajută?",
      "explanation": "E-mailul poate controla recuperarea altor conturi.",
      "correctFeedback": "Corect. E-mailul poate controla recuperarea altor conturi.",
      "incorrectFeedback": "Nu chiar. E-mailul poate controla recuperarea altor conturi.",
      "type": "scenariu",
      "context": "Observi o autentificare necunoscută.",
      "options": [
        {
          "id": "0",
          "label": "Refolosești parola compromisă."
        },
        {
          "id": "1",
          "label": "Trimiți parola unui recuperator."
        },
        {
          "id": "2",
          "label": "Protejezi accesul prin serviciul legitim și verifici sesiunile."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-furtul-de-identitate",
      "paragraphs": [
        "Ioana primește un e-mail care anunță deschiderea unui serviciu financiar. Ea nu a solicitat acel produs. Mesajul include un link pentru anulare și cere fotografia actului plus o taxă. Ioana nu știe dacă produsul există sau dacă mesajul însuși este fals. Nu urmează linkul și caută separat contactul oficial al instituției menționate.",
        "Ea notează ora și conținutul mesajului și verifică prin serviciul legitim dacă există o cerere pe numele ei. Mai verifică accesul la e-mail, pentru că recent a folosit aceeași parolă într-un site necunoscut. Dacă se confirmă o operațiune fără acord, cere pașii competenți și păstrează documentele. Nu publică actul într-un grup și nu plătește persoanei care promite anularea imediată. Separă confirmarea faptelor de protejarea accesului și de procedura eventual necesară."
      ]
    },
    {
      "id": "q5",
      "question": "De ce Ioana nu folosește linkul de anulare?",
      "explanation": "Verificarea independentă precede datele și plata.",
      "correctFeedback": "Corect. Verificarea independentă precede datele și plata.",
      "incorrectFeedback": "Nu chiar. Verificarea independentă precede datele și plata.",
      "caseId": "caz-furtul-de-identitate",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Cererea și instituția nu sunt încă autentificate."
        },
        {
          "id": "1",
          "label": "Orice anulare este imposibilă."
        },
        {
          "id": "2",
          "label": "Nu există furt de identitate."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce verifică separat de mesaj?",
      "explanation": "Faptele și accesul sunt verificări complementare.",
      "correctFeedback": "Corect. Faptele și accesul sunt verificări complementare.",
      "incorrectFeedback": "Nu chiar. Faptele și accesul sunt verificări complementare.",
      "caseId": "caz-furtul-de-identitate",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Numai designul e-mailului."
        },
        {
          "id": "1",
          "label": "Existența cererii și accesul la e-mail."
        },
        {
          "id": "2",
          "label": "Numai numele expeditorului afișat."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce păstrează pentru pașii competenți?",
      "explanation": "Datele documentate ajută analiza.",
      "correctFeedback": "Corect. Datele documentate ajută analiza.",
      "incorrectFeedback": "Nu chiar. Datele documentate ajută analiza.",
      "caseId": "caz-furtul-de-identitate",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Un act publicat integral."
        },
        {
          "id": "1",
          "label": "Doar promisiunea apelantului."
        },
        {
          "id": "2",
          "label": "Cronologia, mesajele și operațiunile relevante."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Păstrează o cronologie: ce mesaj ai primit, ce date ai trimis și ce operațiuni ai observat. Aceasta te ajută când contactezi instituția sau autoritatea competentă. Nu publica actele integral pentru a cere ajutor în grupuri. Poți descrie problema fără să expui încă o dată informațiile sensibile.",
        "Dacă cineva promite ștergerea unui contract necunoscut contra unei taxe, verifică independent înainte de plată. O poveste despre identitate poate fi folosită și pentru o nouă fraudă. Scopul primului pas este să afli ce există realmente și să limitezi accesul, nu să autorizezi în panică cereri neconfirmate."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Vrei ajutor într-un grup. Ce informație eviți să publici?",
      "explanation": "Căutarea ajutorului nu cere expunerea integrală.",
      "correctFeedback": "Corect. Căutarea ajutorului nu cere expunerea integrală.",
      "incorrectFeedback": "Nu chiar. Căutarea ajutorului nu cere expunerea integrală.",
      "type": "scenariu",
      "context": "Situația privește identitatea ta.",
      "options": [
        {
          "id": "0",
          "label": "Actele și datele personale complete."
        },
        {
          "id": "1",
          "label": "O descriere fără identificatori sensibili."
        },
        {
          "id": "2",
          "label": "O întrebare generală despre canalul competent."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Un necunoscut cere bani pentru ștergerea contractului. Ce faci?",
      "explanation": "O cerere de recuperare poate fi o nouă fraudă.",
      "correctFeedback": "Corect. O cerere de recuperare poate fi o nouă fraudă.",
      "incorrectFeedback": "Nu chiar. O cerere de recuperare poate fi o nouă fraudă.",
      "type": "scenariu",
      "context": "Contractul nu este încă confirmat.",
      "options": [
        {
          "id": "0",
          "label": "Plătești fiindcă problema pare urgentă."
        },
        {
          "id": "1",
          "label": "Verifici independent, fără plata grăbită."
        },
        {
          "id": "2",
          "label": "Dai și parola e-mailului."
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
          "title": "Confirmă",
          "body": "Mesajul și operațiunea se verifică separat.",
          "detail": "Mesajul despre un cont necunoscut poate fi el însuși o înșelătorie. Confirmă dacă există cererea prin instituția contactată separat, înainte să trimiți documente sau o taxă de anulare.",
          "type": "normal",
          "detailHighlights": [
            "instituția",
            "cont"
          ]
        },
        {
          "id": "idee-1",
          "title": "Acces",
          "body": "Protejează e-mailul și credențialele.",
          "type": "normal",
          "detail": "Schimbă credențialele compromise și verifică sesiunile active. Recuperarea unui cont nu confirmă că toate celelalte sunt sigure.",
          "detailHighlights": [
            "credențialele",
            "cont"
          ]
        },
        {
          "id": "idee-2",
          "title": "Documentează",
          "body": "Păstrează cronologia fără să publici actele.",
          "type": "normal",
          "detail": "Păstrează mesajele și datele operațiunilor suspecte. O cronologie ajută instituțiile să înțeleagă ce s-a întâmplat.",
          "detailHighlights": [
            "cronologie",
            "datele"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Verifică sesiunile contului de e-mail și modul legitim de recuperare a accesului.",
          "type": "action",
          "detail": "Alege un cont important și verifică metoda de recuperare. O adresă veche inaccesibilă poate îngreuna recâștigarea accesului.",
          "detailHighlights": [
            "recuperare",
            "cont"
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
