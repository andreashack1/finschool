import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "conturi-folosite-de-altii",
  "title": "Conturi folosite de alții",
  "categoryId": "siguranta-financiara",
  "chapterId": "datele-tale",
  "slug": "conturi-folosite-de-altii",
  "description": "Un coleg îi propune lui Radu să primească bani și să îi trimită mai departe pentru un comision. Scopul nu este explicat.",
  "objective": "Să poți înțelege riscul de a lăsa altă persoană să folosească un cont financiar sau bancar pe numele tău.",
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
      "title": "Conturi folosite de alții",
      "body": "Un coleg îi propune lui Radu să primească bani și să îi trimită mai departe pentru un comision. Scopul nu este explicat."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un cont pe numele tău poate fi folosit în operațiuni pe care alții vor să le ascundă sau să le mute printr-un intermediar. Dacă primești și trimiți bani fără să înțelegi sursa și scopul, pierzi controlul informației, chiar dacă persoana spune că este doar un favor. Un comision nu explică legitimitatea operațiunii.",
        "Nu trebuie să afirmi din lecție o consecință juridică exactă pentru orice situație. Întrebarea practică este dacă poți identifica banii, destinatarul și motivul, și dacă ai un context legitim verificat. O persoană apropiată nu face automat tranzacțiile transparente sau lipsite de risc."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce lipsește dintr-o cerere de intermediere neclară?",
      "explanation": "Plata promisă nu justifică tranzacții neexplicate.",
      "correctFeedback": "Corect. Plata promisă nu justifică tranzacții neexplicate.",
      "incorrectFeedback": "Nu chiar. Plata promisă nu justifică tranzacții neexplicate.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Sursa, scopul și contextul legitim al banilor."
        },
        {
          "id": "1",
          "label": "Un comision mai mare."
        },
        {
          "id": "2",
          "label": "Un mesaj mai prietenos."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un prieten care folosește contul tău elimină riscul operațiunilor.",
      "explanation": "Relația nu explică sursa și scopul banilor.",
      "correctFeedback": "Corect. Relația nu explică sursa și scopul banilor.",
      "incorrectFeedback": "Nu chiar. Relația nu explică sursa și scopul banilor.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Cererea poate fi prezentată ca job rapid, ajutor pentru un cont blocat sau metodă de plată pentru un client. Dacă activitatea constă mai ales în trecerea banilor prin contul tău, cere explicații înainte să accepți. Nu oferi accesul la aplicație, cardul sau codurile pentru ca altcineva să opereze în locul tău.",
        "O plată intrată nu devine automat venit pe care îl poți păstra. Poate exista o dispută ori o situație pe care nu o cunoști. Nu cheltui și nu retransmite sume necunoscute în grabă. Verifică prin banca ta și documentează cererea, fără să urmezi instrucțiuni despre ascunderea tranzacțiilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Un job cere numai să primești și să retransmiți sume. Ce verifici?",
      "explanation": "Intermedierea fără explicație este un semnal de risc.",
      "correctFeedback": "Corect. Intermedierea fără explicație este un semnal de risc.",
      "incorrectFeedback": "Nu chiar. Intermedierea fără explicație este un semnal de risc.",
      "type": "scenariu",
      "context": "Nu există un serviciu descris clar.",
      "options": [
        {
          "id": "0",
          "label": "Doar comisionul promis."
        },
        {
          "id": "1",
          "label": "Activitatea reală, participanții și documentele."
        },
        {
          "id": "2",
          "label": "Doar numărul de transferuri."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Apare o sumă necunoscută. Ce faci înainte de folosire?",
      "explanation": "Încasarea nu confirmă dreptul sau scopul.",
      "correctFeedback": "Corect. Încasarea nu confirmă dreptul sau scopul.",
      "incorrectFeedback": "Nu chiar. Încasarea nu confirmă dreptul sau scopul.",
      "type": "scenariu",
      "context": "Nu recunoști expeditorul.",
      "options": [
        {
          "id": "0",
          "label": "O cheltuiești fiindcă este în cont."
        },
        {
          "id": "1",
          "label": "O trimiți imediat la adresa din mesaj."
        },
        {
          "id": "2",
          "label": "Verifici prin bancă și păstrezi datele."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-conturi-folosite-de-altii",
      "paragraphs": [
        "Radu primește de la un coleg o propunere de câștig ușor: să încaseze bani în contul lui și să îi trimită apoi către altă persoană, păstrând un comision. Colegul spune că propriul cont este temporar indisponibil. Nu explică sursa banilor sau legătura dintre persoanele implicate. Îi cere și acces la aplicație ca să facă totul mai repede.",
        "Radu observă că activitatea nu este un serviciu clar, ci folosirea contului său ca intermediar. Întreabă despre sursă, scop și documente, fără să primească răspunsuri coerente. Refuză accesul și nu transmite coduri. Dacă ar apărea deja o sumă necunoscută, ar verifica prin bancă înainte să o cheltuiască sau să o trimită mai departe. Păstrează conversația și nu acceptă o nouă adresă de transfer ca soluție automată. Relația cu colegul nu îl obligă să renunțe la controlul contului."
      ]
    },
    {
      "id": "q5",
      "title": "Tu ce ai verifica?",
      "question": "Ce cerere ar reduce controlul lui Radu?",
      "explanation": "Accesul oferit permite operațiuni pe care nu le controlează.",
      "correctFeedback": "Corect. Accesul oferit permite operațiuni pe care nu le controlează.",
      "incorrectFeedback": "Nu chiar. Accesul oferit permite operațiuni pe care nu le controlează.",
      "caseId": "caz-conturi-folosite-de-altii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Accesul colegului la aplicație și coduri."
        },
        {
          "id": "1",
          "label": "O explicație documentată."
        },
        {
          "id": "2",
          "label": "O verificare prin bancă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "title": "Tu ce ai verifica?",
      "question": "De ce comisionul nu este suficient?",
      "explanation": "Câștigul personal nu verifică operațiunea.",
      "correctFeedback": "Corect. Câștigul personal nu verifică operațiunea.",
      "incorrectFeedback": "Nu chiar. Câștigul personal nu verifică operațiunea.",
      "caseId": "caz-conturi-folosite-de-altii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Orice comision este interzis."
        },
        {
          "id": "1",
          "label": "Nu explică legitimitatea sursei și destinației."
        },
        {
          "id": "2",
          "label": "Conturile nu pot primi bani."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "title": "Tu ce ai verifica?",
      "question": "Ce face dacă a acceptat deja?",
      "explanation": "Limitarea accesului și documentarea sunt pași utili.",
      "correctFeedback": "Corect. Limitarea accesului și documentarea sunt pași utili.",
      "incorrectFeedback": "Nu chiar. Limitarea accesului și documentarea sunt pași utili.",
      "caseId": "caz-conturi-folosite-de-altii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Continuă ca să nu supere colegul."
        },
        {
          "id": "1",
          "label": "Ascunde tranzacțiile."
        },
        {
          "id": "2",
          "label": "Oprește accesul oferit și verifică prin bancă."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Presiunea relațională poate face refuzul dificil. Poți spune că nu lași contul să fie folosit fără sursă și scop clare. Nu trebuie să acuzi persoana pentru a păstra această limită. Dacă ai acceptat deja, oprește accesul oferit și cere informații prin canalul oficial al băncii.",
        "Nu încerca să repari situația cu un transfer către un nou destinatar dictat de aceeași persoană. O operațiune suplimentară poate prelungi problema. Păstrează conversațiile și datele relevante pentru verificare. Controlul contului înseamnă și să înțelegi operațiunile, nu doar să cunoști parola și să vezi un sold."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Cum poți refuza fără verdict despre persoană?",
      "explanation": "Limita poate privi procesul, nu judecarea relației.",
      "correctFeedback": "Corect. Limita poate privi procesul, nu judecarea relației.",
      "incorrectFeedback": "Nu chiar. Limita poate privi procesul, nu judecarea relației.",
      "type": "scenariu",
      "context": "Cererea vine de la cineva apropiat.",
      "options": [
        {
          "id": "0",
          "label": "Spui că nu folosești contul pentru operațiuni neclare."
        },
        {
          "id": "1",
          "label": "Inventez o acuzație juridică exactă."
        },
        {
          "id": "2",
          "label": "Accepți pentru a evita discuția."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Aceeași persoană propune alt transfer ca să repare situația. Ce faci?",
      "explanation": "O tranzacție nouă poate extinde problema.",
      "correctFeedback": "Corect. O tranzacție nouă poate extinde problema.",
      "incorrectFeedback": "Nu chiar. O tranzacție nouă poate extinde problema.",
      "type": "scenariu",
      "context": "Sursa primei sume rămâne necunoscută.",
      "options": [
        {
          "id": "0",
          "label": "Urmezi toate instrucțiunile din grabă."
        },
        {
          "id": "1",
          "label": "Verifici independent înainte de operațiunea nouă."
        },
        {
          "id": "2",
          "label": "Dai și acces la alt cont."
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
          "title": "Sursă",
          "body": "Înțelege de unde vin și unde merg banii.",
          "detail": "Înțelege de unde vin și unde merg banii.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Control",
          "body": "Nu da contul și autorizările altcuiva.",
          "detail": "Nu da contul și autorizările altcuiva.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Limită",
          "body": "Poți refuza operațiuni neclare fără moralizare.",
          "detail": "Poți refuza operațiuni neclare fără moralizare.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pregătește o formulare scurtă prin care refuzi folosirea contului tău pentru transferuri fără scop verificat.",
          "detail": "Pregătește o formulare scurtă prin care refuzi folosirea contului tău pentru transferuri fără scop verificat.",
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
