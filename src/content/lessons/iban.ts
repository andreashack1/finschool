import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "iban",
  "title": "IBAN",
  "categoryId": "carduri-si-banca",
  "chapterId": "contul-tau",
  "slug": "iban",
  "description": "Ioana trebuie să primească bani pentru un proiect. Un mesaj cere „IBAN și codul de confirmare”. Sunt informații cu același rol?",
  "objective": "Să poți recunoaște ce este IBAN-ul, unde îl găsești și când îl poți folosi în siguranță.",
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
      "title": "IBAN",
      "body": "Ioana trebuie să primească bani pentru un proiect. Un mesaj cere „IBAN și codul de confirmare”. Sunt informații cu același rol?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "IBAN identifică un cont bancar pentru operațiuni precum transferul. Îl poți găsi în zona detaliilor contului din aplicația băncii sau în documentele contului. Nu este același lucru cu numărul cardului și nu este parola aplicației. Folosește informația afișată de banca ta, nu o valoare ghicită din alte numere.",
        "Când cineva trebuie să îți trimită bani prin transfer, IBAN-ul poate fi o informație relevantă, alături de datele cerute legitim pentru operațiune. Totuși, distribuirea lui se face într-un context clar. Faptul că IBAN-ul nu este parola nu înseamnă că orice solicitare este autentică."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce identifică IBAN-ul?",
      "explanation": "Identificatorul contului are alt rol decât credențialele.",
      "correctFeedback": "Corect. Identificatorul contului are alt rol decât credențialele.",
      "incorrectFeedback": "Nu chiar. Identificatorul contului are alt rol decât credențialele.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Un cont bancar."
        },
        {
          "id": "1",
          "label": "Parola aplicației."
        },
        {
          "id": "2",
          "label": "Codul de confirmare al fiecărei plăți."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "IBAN-ul este același lucru cu numărul cardului.",
      "explanation": "Contul și cardul au identificatori cu roluri diferite.",
      "correctFeedback": "Corect. Contul și cardul au identificatori cu roluri diferite.",
      "incorrectFeedback": "Nu chiar. Contul și cardul au identificatori cu roluri diferite.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un cod de confirmare sau o parolă are alt rol: poate autoriza accesul sau o operațiune. Nu îl trimiți unei persoane doar fiindcă spune că vrea să îți plătească ceva. Pentru a primi bani printr-un transfer obișnuit, nu trebuie să autorizezi o plată către altcineva printr-un cod primit.",
        "Înainte să trimiți bani, verifici și destinatarul, nu doar forma IBAN-ului. Un identificator valid poate aparține altei persoane. Dacă un furnizor schimbă contul printr-un mesaj neașteptat, confirmă separat prin canalul cunoscut. Corectitudinea tehnică și autenticitatea cererii sunt verificări diferite."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Unde cauți IBAN-ul tău?",
      "explanation": "Banca afișează identificatorul contului.",
      "correctFeedback": "Corect. Banca afișează identificatorul contului.",
      "incorrectFeedback": "Nu chiar. Banca afișează identificatorul contului.",
      "type": "scenariu",
      "context": "Ai nevoie să primești un transfer.",
      "options": [
        {
          "id": "0",
          "label": "Îl deduci din codul primit prin SMS."
        },
        {
          "id": "1",
          "label": "În detaliile contului din sursa oficială a băncii."
        },
        {
          "id": "2",
          "label": "Îl copiezi din contul unui coleg."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Cineva cere codul pentru a-ți trimite bani. Ce faci?",
      "explanation": "Codurile pot autoriza accesul sau operațiuni.",
      "correctFeedback": "Corect. Codurile pot autoriza accesul sau operațiuni.",
      "incorrectFeedback": "Nu chiar. Codurile pot autoriza accesul sau operațiuni.",
      "type": "scenariu",
      "context": "Persoana nu este confirmată prin canalul cunoscut.",
      "options": [
        {
          "id": "0",
          "label": "Îl trimiți pentru orice rambursare."
        },
        {
          "id": "1",
          "label": "Trimiți și parola ca să fie mai rapid."
        },
        {
          "id": "2",
          "label": "Nu comunici codul și verifici separat cererea."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-iban",
      "paragraphs": [
        "Ioana coordonează un proiect de voluntariat și trebuie să primească rambursarea unei cheltuieli. Organizatorul cunoscut îi cere IBAN-ul prin canalul folosit de echipă. Ea deschide aplicația băncii și găsește detaliile contului, fără să copieze numărul cardului. Trimite numai informația necesară, nu întregul extras cu tranzacții personale.",
        "Mai târziu primește un mesaj separat de la o persoană care pretinde că grăbește plata. Mesajul cere și un cod de confirmare și o autentificare printr-un link. Ioana observă că identificarea contului și autorizarea accesului sunt lucruri diferite. Nu trimite codul și verifică cererea prin contactul cunoscut al organizatorului. Pentru o plată către furnizor, verifică separat dacă un IBAN schimbat este autentic. Un număr care pare corect nu confirmă singur identitatea celui care l-a trimis."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce a trimis Ioana pentru cererea legitimă?",
      "explanation": "Distribuirea minimă reduce expunerea datelor.",
      "correctFeedback": "Corect. Distribuirea minimă reduce expunerea datelor.",
      "incorrectFeedback": "Nu chiar. Distribuirea minimă reduce expunerea datelor.",
      "caseId": "caz-iban",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Informația necesară contului, fără tranzacții inutile."
        },
        {
          "id": "1",
          "label": "Întregul istoric și parola."
        },
        {
          "id": "2",
          "label": "Numărul cardului în locul IBAN-ului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "Ce semnal schimbă evaluarea celui de-al doilea mesaj?",
      "explanation": "Cererea de autorizare nu este simplă identificare a contului.",
      "correctFeedback": "Corect. Cererea de autorizare nu este simplă identificare a contului.",
      "incorrectFeedback": "Nu chiar. Cererea de autorizare nu este simplă identificare a contului.",
      "caseId": "caz-iban",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Faptul că există un cont."
        },
        {
          "id": "1",
          "label": "Solicitarea unui cod și autentificarea prin link neașteptat."
        },
        {
          "id": "2",
          "label": "Faptul că Ioana folosește o aplicație."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Cum verifică un IBAN schimbat al furnizorului?",
      "explanation": "Un IBAN valid poate aparține unui destinatar greșit.",
      "correctFeedback": "Corect. Un IBAN valid poate aparține unui destinatar greșit.",
      "incorrectFeedback": "Nu chiar. Un IBAN valid poate aparține unui destinatar greșit.",
      "caseId": "caz-iban",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar după forma numărului."
        },
        {
          "id": "1",
          "label": "Prin răspuns cu parola."
        },
        {
          "id": "2",
          "label": "Prin contactul cunoscut, separat de mesajul schimbării."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Copiază IBAN-ul din sursa oficială și verifică operațiunea înainte de confirmare. Dacă îl introduci manual, o greșeală poate cauza respingere sau alte probleme, în funcție de situație. Nu presupune că aplicația rezolvă orice destinatar greșit doar pentru că acceptă textul introdus.",
        "Mai protejează documentele complete ale contului: ele pot conține alte informații personale. Când este suficient IBAN-ul, nu trimite un extras cu toate tranzacțiile. Întrebarea practică este ce informație este necesară și cui o oferi. Separarea identificatorului de credențiale te ajută să primești și să trimiți bani fără a confunda rolurile."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Aplicația acceptă IBAN-ul. Ce mai verifici?",
      "explanation": "Validarea formatului nu garantează intenția corectă.",
      "correctFeedback": "Corect. Validarea formatului nu garantează intenția corectă.",
      "incorrectFeedback": "Nu chiar. Validarea formatului nu garantează intenția corectă.",
      "type": "scenariu",
      "context": "Urmează să trimiți bani.",
      "options": [
        {
          "id": "0",
          "label": "Destinatarul, suma și autenticitatea operațiunii."
        },
        {
          "id": "1",
          "label": "Nimic, orice cerere acceptată este sigură."
        },
        {
          "id": "2",
          "label": "Doar bateria telefonului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Este necesar doar IBAN-ul. Ce document eviți să trimiți inutil?",
      "explanation": "Trimiți informația minimă relevantă.",
      "correctFeedback": "Corect. Trimiți informația minimă relevantă.",
      "incorrectFeedback": "Nu chiar. Trimiți informația minimă relevantă.",
      "type": "scenariu",
      "context": "Primești o rambursare legitimă.",
      "options": [
        {
          "id": "0",
          "label": "Identificatorul necesar operațiunii."
        },
        {
          "id": "1",
          "label": "Extrasul complet cu tranzacții personale."
        },
        {
          "id": "2",
          "label": "Denumirea monedei contului, dacă este necesară."
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
          "title": "Identificator",
          "body": "IBAN-ul identifică un cont, nu parola.",
          "detail": "IBAN-ul identifică un cont, nu parola.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Coduri separate",
          "body": "Nu comunica credențiale pentru a primi bani.",
          "detail": "Nu comunica credențiale pentru a primi bani.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Destinatar",
          "body": "Formatul valid nu confirmă autenticitatea cererii.",
          "detail": "Formatul valid nu confirmă autenticitatea cererii.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Deschide aplicația băncii și găsește unde este afișat IBAN-ul tău, fără să îl trimiți nimănui.",
          "detail": "Deschide aplicația băncii și găsește unde este afișat IBAN-ul tău, fără să îl trimiți nimănui.",
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
