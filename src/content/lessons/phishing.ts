import type { ReadyLesson } from "../../types/learning";

export const phishingLesson: ReadyLesson = {
  "id": "phishing",
  "slug": "phishing",
  "categoryId": "siguranta-financiara",
  "chapterId": "mesaje-si-apeluri-false",
  "title": "Phishing",
  "description": "Recunoști mesajele false și verifici în siguranță.",
  "minutes": 5,
  "xp": 30,
  "status": "ready",
  "contentVersion": 2,
  "formatVersion": 2,
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Un SMS urgent.",
      "body": "Primești un SMS care spune că trebuie să confirmi urgent contul bancar. Are un link și pare să știe numele tău. Înainte să reacționezi, merită să separi mesajul de canalul prin care îl verifici."
    },
    {
      "id": "concept",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Cineva încearcă să îți grăbească decizia.",
      "paragraphs": [
        "Phishing-ul este o încercare de a te păcăli să oferi date sensibile sau să intri pe o pagină falsă. Mesajul poate pretinde că vine de la bancă, de la un magazin sau chiar de la un prieten. Scopul este să îți folosească încrederea pentru acces la bani ori conturi.",
        "Poate cere o parolă, un PIN sau un cod primit prin SMS. Faptul că mesajul pare familiar nu face cererea sigură. O pagină poate copia aspectul unui serviciu real, iar un cont cunoscut poate fi folosit de altcineva.",
        "Un reflex sigur este să ieși din traseul propus de mesaj. Deschide singur aplicația oficială sau folosește un contact verificat separat. Nu trebuie să apeși linkul ca să afli dacă avertizarea este reală."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Verificarea printr-un canal separat întrerupe traseul propus de mesaj."
      }
    },
    {
      "id": "definitie",
      "type": "variante",
      "title": "Ce încearcă phishing-ul?",
      "question": "Care este scopul unui mesaj de phishing?",
      "options": [
        {
          "id": "0",
          "label": "Să obțină date sau acces prin înșelare."
        },
        {
          "id": "1",
          "label": "Să confirme că orice link este sigur."
        },
        {
          "id": "2",
          "label": "Să ofere automat protecție contului."
        }
      ],
      "correctOption": "0",
      "explanation": "Mesajul urmărește date sau acces, folosind încrederea și presiunea.",
      "correctFeedback": "Mesajul urmărește date sau acces, folosind încrederea și presiunea.",
      "incorrectFeedback": "Aspectul familiar nu schimbă scopul: încercarea de a obține date sau acces prin înșelare."
    },
    {
      "id": "link",
      "type": "variante",
      "title": "Cum verifici?",
      "question": "Primești un link suspect despre cont. Ce faci?",
      "options": [
        {
          "id": "1",
          "label": "Intri singur în aplicația sau site-ul oficial."
        },
        {
          "id": "0",
          "label": "Apeși linkul ca să verifici."
        },
        {
          "id": "2",
          "label": "Răspunzi cu datele cerute."
        }
      ],
      "correctOption": "1",
      "explanation": "Canalul oficial deschis separat nu depinde de linkul primit.",
      "correctFeedback": "Canalul oficial deschis separat nu depinde de linkul primit.",
      "incorrectFeedback": "Linkul poate duce la o pagină falsă. Verifică separat, fără să îi urmezi traseul."
    },
    {
      "id": "semnale",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Semnele care cer o pauză.",
      "paragraphs": [
        "Urgența artificială este un semnal de alarmă: «acum», «în cinci minute» sau «pierzi accesul» încearcă să reducă timpul în care gândești. Nu este singurul semn. Contează și linkul, cererea de date sensibile și felul în care mesajul pretinde să fie altcineva.",
        "Un exemplu: primești o alertă despre o plată de 250 lei, urmată de cererea de a trimite un cod pentru anulare. Suma face mesajul concret, dar nu îl validează. Codul poate proteja accesul sau aprobarea unei acțiuni, nu este o informație de trimis altcuiva.",
        "Greșelile neobișnuite și adresele ciudate pot ridica semne de întrebare. Totuși, un mesaj bine scris poate fi fals. Nu te baza pe o singură verificare vizuală și nu trimite PIN-uri, parole sau coduri prin conversația primită."
      ],
      "finiMood": "thinking",
      "example": {
        "text": "O alertă de 250 lei și un termen de cinci minute pot crea presiune; verificarea rămâne separată."
      },
      "detail": {
        "text": "Un text fără greșeli nu este automat legitim."
      }
    },
    {
      "id": "pin",
      "type": "adevarat_fals",
      "title": "PIN-ul prin SMS?",
      "question": "O bancă adevărată îți cere PIN-ul cardului prin SMS.",
      "correctAnswer": false,
      "explanation": "Nu trimite PIN-ul cardului prin SMS sau mesaje.",
      "correctFeedback": "Nu trimite PIN-ul cardului prin SMS sau mesaje.",
      "incorrectFeedback": "O cerere de PIN prin mesaj nu trebuie urmată; verifică situația printr-un canal oficial separat."
    },
    {
      "id": "urgenta-cod",
      "type": "scenariu",
      "title": "O alertă cu termen scurt.",
      "question": "Ce reacție este sigură?",
      "options": [
        {
          "id": "1",
          "label": "Trimiți codul fiindcă timpul e scurt."
        },
        {
          "id": "2",
          "label": "Verifici doar dacă logo-ul arată bine."
        },
        {
          "id": "0",
          "label": "Verifici separat și nu trimiți codul."
        }
      ],
      "correctOption": "0",
      "explanation": "Presiunea nu este o dovadă. Codul rămâne privat, iar situația se verifică separat.",
      "correctFeedback": "Presiunea nu este o dovadă. Codul rămâne privat, iar situația se verifică separat.",
      "incorrectFeedback": "Timpul scurt și aspectul mesajului nu justifică trimiterea codului.",
      "context": "Mesajul spune că ai cinci minute să trimiți un cod pentru a anula o plată."
    },
    {
      "id": "caz",
      "type": "caz_real",
      "caseId": "case-phishing-ioana",
      "label": "Caz real",
      "title": "Ioana primește două mesaje.",
      "paragraphs": [
        "Ioana are 18 ani și primește un SMS care pare să vină de la banca ei. Textul spune că o plată de 250 lei trebuie confirmată urgent, în cinci minute, printr-un link. Mesajul folosește numele ei și o imagine familiară. Ioana nu își amintește să fi făcut plata și observă că adresa linkului nu este cea pe care o folosește de obicei.",
        "Câteva clipe mai târziu primește un cod prin SMS. Nu a cerut ea acel cod. Apoi contul unui prieten îi scrie că a câștigat un premiu și că are nevoie de codul ei pentru a-l revendica. Conversația arată ca cele vechi, dar cererea este neobișnuită.",
        "Ioana poate deschide singură aplicația oficială și poate folosi un contact al băncii verificat separat. Pentru prieten, poate suna la numărul deja cunoscut. Numele, logo-ul și conversația familiară nu dovedesc cine controlează mesajele. Are mai mult de un motiv să încetinească: urgența, adresa neobișnuită și cererea pentru un cod pe care nu trebuie să îl comunice."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "ioana-semn",
      "type": "variante",
      "title": "De ce merită o pauză?",
      "question": "Care combinație ridică un semnal de alarmă în cazul Ioanei?",
      "options": [
        {
          "id": "1",
          "label": "Doar faptul că suma este 250 lei."
        },
        {
          "id": "0",
          "label": "Urgență, link neobișnuit și cerere de cod."
        },
        {
          "id": "2",
          "label": "Faptul că mesajul folosește numele ei."
        }
      ],
      "correctOption": "0",
      "explanation": "Presiunea și traseul neobișnuit, împreună cu cererea de cod, cer verificare separată.",
      "correctFeedback": "Presiunea și traseul neobișnuit, împreună cu cererea de cod, cer verificare separată.",
      "incorrectFeedback": "Suma sau numele nu validează mesajul; trebuie analizate și cererea de cod și canalul propus.",
      "caseId": "case-phishing-ioana"
    },
    {
      "id": "ioana-verifica",
      "type": "scenariu",
      "title": "Verificare fără link.",
      "question": "Cum verifică fără să continue traseul mesajului?",
      "options": [
        {
          "id": "1",
          "label": "Folosește linkul și caută acolo un număr."
        },
        {
          "id": "2",
          "label": "Întreabă expeditorul dacă este banca."
        },
        {
          "id": "0",
          "label": "Deschide singură aplicația oficială."
        }
      ],
      "correctOption": "0",
      "explanation": "Aplicația deschisă separat este independentă de linkul suspect.",
      "correctFeedback": "Aplicația deschisă separat este independentă de linkul suspect.",
      "incorrectFeedback": "Verificarea prin același link sau expeditor nu este un canal separat de mesajul suspect.",
      "context": "Ioana nu recunoaște plata de 250 lei.",
      "caseId": "case-phishing-ioana"
    },
    {
      "id": "cod",
      "type": "scenariu",
      "title": "Un «prieten» cere codul.",
      "question": "Ce face Ioana?",
      "options": [
        {
          "id": "0",
          "label": "Trimite codul în conversație."
        },
        {
          "id": "1",
          "label": "Nu trimite codul și sună prietenul separat."
        },
        {
          "id": "2",
          "label": "Trimite doar o parte din cod."
        }
      ],
      "correctOption": "1",
      "explanation": "Codul rămâne privat. Un apel pe un canal cunoscut verifică identitatea separat.",
      "correctFeedback": "Codul rămâne privat. Un apel pe un canal cunoscut verifică identitatea separat.",
      "incorrectFeedback": "Conversația familiară nu dovedește cine o controlează; nu comunica nici măcar o parte din cod.",
      "context": "Contul unui prieten cere codul primit prin SMS pentru un premiu.",
      "caseId": "case-phishing-ioana"
    },
    {
      "id": "nuante",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Aspectul familiar nu este dovadă.",
      "paragraphs": [
        "Un logo reușit sau un mesaj fără greșeli poate crea încredere, dar este ușor de copiat. Nici faptul că expeditorul îți cunoaște numele nu confirmă identitatea. Datele familiare fac o poveste mai convingătoare, nu o transformă automat în adevăr.",
        "O greșeală frecventă este să verifici mesajul prin contactul oferit chiar în el. Dacă linkul sau numărul face parte din înșelătorie, verificarea rămâne în același traseu. Folosește aplicația ori un contact pe care îl cunoști dintr-o sursă separată.",
        "Codurile de verificare, PIN-urile și parolele nu sunt monedă de schimb pentru ajutor sau premii. Dacă ai îndoieli, încetinește și verifică. Nu trebuie să răspunzi repede doar pentru că mesajul cere asta, iar recitirea lui nu înlocuiește un canal de încredere."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Un contact verificat separat este mai util decât numărul oferit în mesaj."
      }
    },
    {
      "id": "logo",
      "type": "scenariu",
      "title": "Arată exact ca banca.",
      "question": "Ce concluzie este sigură?",
      "options": [
        {
          "id": "0",
          "label": "Aspectul nu validează cererea de parolă."
        },
        {
          "id": "1",
          "label": "Numele dovedește că este legitim."
        },
        {
          "id": "2",
          "label": "Logo-ul face orice cerere sigură."
        }
      ],
      "correctOption": "0",
      "explanation": "Datele familiare pot fi copiate. Cererea sensibilă se verifică separat, fără a trimite parola.",
      "correctFeedback": "Datele familiare pot fi copiate. Cererea sensibilă se verifică separat, fără a trimite parola.",
      "incorrectFeedback": "Logo-ul și numele nu sunt o dovadă suficientă despre cine trimite mesajul.",
      "context": "Un mesaj are logo-ul corect și numele tău, dar cere parola."
    },
    {
      "id": "verificare-link",
      "type": "adevarat_fals",
      "title": "Un canal cu adevărat separat?",
      "question": "Numărul găsit pe pagina deschisă din linkul suspect este o verificare independentă.",
      "correctAnswer": false,
      "explanation": "Numărul poate face parte din aceeași pagină falsă. Folosește un contact verificat separat.",
      "correctFeedback": "Numărul poate face parte din aceeași pagină falsă. Folosește un contact verificat separat.",
      "incorrectFeedback": "Un număr din linkul suspect rămâne în traseul propus de mesaj."
    },
    {
      "id": "tine-minte",
      "type": "tine_minte",
      "title": "Ține minte",
      "finiMood": "happy",
      "items": [
        {
          "id": "punct-1",
          "title": "Oprește graba",
          "body": "Urgența artificială încearcă să reducă timpul de gândire. Un termen scurt nu dovedește legitimitatea.",
          "detail": "Poți încetini chiar dacă mesajul cere o reacție imediată.",
          "type": "normal"
        },
        {
          "id": "punct-2",
          "title": "Verifică separat",
          "body": "Deschide singur aplicația oficială sau folosește un contact cunoscut. Nu verifica doar prin linkul primit.",
          "detail": "Și numărul de pe o pagină falsă poate fi fals.",
          "type": "normal"
        },
        {
          "id": "punct-3",
          "title": "Codurile sunt private",
          "body": "PIN-urile, parolele și codurile de verificare nu se trimit altcuiva. O promisiune de premiu nu schimbă regula.",
          "detail": "Nici o parte din cod nu trebuie oferită.",
          "type": "normal"
        },
        {
          "id": "punct-4",
          "title": "Identitatea se confirmă",
          "body": "Logo-ul, numele și un cont familiar nu dovedesc cine trimite mesajul. Un canal separat ajută să verifici persoana.",
          "detail": "Poți suna prietenul la numărul deja cunoscut.",
          "type": "normal"
        },
        {
          "id": "punct-5",
          "title": "Ce poți face azi",
          "body": "Verifică unde ai aplicația oficială și contactul verificat al băncii. Astfel nu depinzi de un link din SMS când apare o alertă.",
          "detail": "Salvează contactul dintr-o sursă oficială, nu dintr-un mesaj urgent.",
          "type": "action"
        }
      ]
    },
    {
      "id": "final",
      "type": "final",
      "title": "Lecție terminată."
    }
  ]
};
