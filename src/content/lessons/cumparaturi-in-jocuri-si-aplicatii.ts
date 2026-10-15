import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cumparaturi-in-jocuri-si-aplicatii",
  "title": "Cumpărături în jocuri și aplicații",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "capcanele-cumparaturilor",
  "slug": "cumparaturi-in-jocuri-si-aplicatii",
  "description": "Alex cumpără pachete mici într-un joc. Fiecare pare ieftin, dar aplicația bancară arată un total surprinzător.",
  "objective": "Să poți vedea costul cumulat al microtranzacțiilor și să recunoști mecanismele care fac cheltuielile mici să pară nesemnificative.",
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
      "title": "Cumpărături în jocuri și aplicații",
      "body": "Alex cumpără pachete mici într-un joc. Fiecare pare ieftin, dar aplicația bancară arată un total surprinzător."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "O microtranzacție este o cumpărătură mică într-un joc sau într-o aplicație. Suma individuală poate părea ușor de ignorat, mai ales când plata este rapidă. Totuși, zece cumpărături de 8 lei costă 80 lei. Mărimea fiecărei plăți nu schimbă adunarea lor.",
        "Uneori produsul folosește monede virtuale, astfel încât costul nu mai este exprimat direct în lei la fiecare pas. Înainte să cumperi, traduce pachetul în bani reali și vezi cât consumi efectiv. Moneda din joc este o reprezentare în aplicație, nu un motiv ca suma din cont să dispară din buget."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Alex vede zece plăți de 8 lei în aceeași săptămână. Ce total din bugetul real compară cu celelalte activități?",
      "explanation": "Cele zece plăți consumă 80 lei. Prețul mic al fiecărui pachet și moneda din joc nu reduc totalul în bani reali.",
      "correctFeedback": "Corect. Cele zece plăți consumă 80 lei. Prețul mic al fiecărui pachet și moneda din joc nu reduc totalul în bani reali.",
      "incorrectFeedback": "Nu chiar. Cele zece plăți consumă 80 lei. Prețul mic al fiecărui pachet și moneda din joc nu reduc totalul în bani reali.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "80 lei."
        },
        {
          "id": "1",
          "label": "8 lei."
        },
        {
          "id": "2",
          "label": "18 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Moneda virtuală face cumpărătura fără cost în bani reali.",
      "explanation": "Pachetul cumpărat cu bani reali trebuie inclus în buget.",
      "correctFeedback": "Corect. Pachetul cumpărat cu bani reali trebuie inclus în buget.",
      "incorrectFeedback": "Nu chiar. Pachetul cumpărat cu bani reali trebuie inclus în buget.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Pachetele pot lăsa resturi de monedă virtuală care te încurajează să mai cumperi. O ofertă temporară sau o recompensă vizibilă poate accelera decizia. Recunoașterea mecanismului te ajută să alegi, fără să declare orice cumpărătură în joc inutilă. Pentru unii oameni, divertismentul are o valoare planificată.",
        "Într-un exemplu, un pachet de 40 lei oferă 500 unități, iar obiectul dorit costă 300. Rămân 200 unități, dar ele nu sunt automat bani recuperabili. Verifică regulile și evită să cumperi încă un pachet doar fiindcă ai un rest pe care vrei să îl folosești."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Un pachet lasă unități nefolosite. Ce verifici?",
      "explanation": "Restul nu creează o obligație de continuare.",
      "correctFeedback": "Corect. Restul nu creează o obligație de continuare.",
      "incorrectFeedback": "Nu chiar. Restul nu creează o obligație de continuare.",
      "type": "scenariu",
      "context": "Ai cumpărat un obiect din joc.",
      "options": [
        {
          "id": "0",
          "label": "Presupui că trebuie să cumperi încă un pachet."
        },
        {
          "id": "1",
          "label": "Regulile restului și dacă mai vrei într-adevăr altceva."
        },
        {
          "id": "2",
          "label": "Consideri unitățile rămase bani recuperabili automat."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "O recompensă este incertă. Ce ai cumpărat?",
      "explanation": "Rezultatul aleatoriu nu este echivalent cu o livrare sigură.",
      "correctFeedback": "Corect. Rezultatul aleatoriu nu este echivalent cu o livrare sigură.",
      "incorrectFeedback": "Nu chiar. Rezultatul aleatoriu nu este echivalent cu o livrare sigură.",
      "type": "scenariu",
      "context": "Produsul nu promite un rezultat cert.",
      "options": [
        {
          "id": "0",
          "label": "Obiectul garantat după orice plată."
        },
        {
          "id": "1",
          "label": "Un depozit fără risc."
        },
        {
          "id": "2",
          "label": "O șansă, nu garanția obiectului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cumparaturi-in-jocuri-si-aplicatii",
      "paragraphs": [
        "Alex joacă seara cu colegii. Într-o săptămână cumpără de zece ori un pachet de 8 lei, fără să noteze plățile, fiindcă fiecare pare mică. La final vede 80 lei în istoricul contului. Nu a cumpărat un singur obiect mare, dar suma totală este reală și reduce banii pentru celelalte activități.",
        "Jocul îi propune apoi un pachet de monedă virtuală la 40 lei. Obiectul dorit consumă doar o parte, iar restul poate fi folosit pentru altă ofertă. Un coleg spune că restul îl obligă să continue ca să nu îl piardă. Alex verifică regulile și observă că unitățile rămase nu sunt automat numerar. Își stabilește un buget de divertisment, citește istoricul și introduce confirmarea plății. Astfel poate decide cât valorează experiența pentru el, fără să ascundă costul în sume mici sau în monede virtuale."
      ]
    },
    {
      "id": "q5",
      "question": "De ce l-a surprins totalul pe Alex?",
      "explanation": "Mărimea mică a fiecărei plăți poate ascunde totalul perceput.",
      "correctFeedback": "Corect. Mărimea mică a fiecărei plăți poate ascunde totalul perceput.",
      "incorrectFeedback": "Nu chiar. Mărimea mică a fiecărei plăți poate ascunde totalul perceput.",
      "caseId": "caz-cumparaturi-in-jocuri-si-aplicatii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "A privit plățile separat și nu le-a adunat."
        },
        {
          "id": "1",
          "label": "Plățile mici nu ar trebui să apară în cont."
        },
        {
          "id": "2",
          "label": "Moneda jocului anulează tranzacțiile."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Restul îl obligă să continue?",
      "explanation": "Banii deja cheltuiți nu justifică automat încă o cumpărătură.",
      "correctFeedback": "Corect. Banii deja cheltuiți nu justifică automat încă o cumpărătură.",
      "incorrectFeedback": "Nu chiar. Banii deja cheltuiți nu justifică automat încă o cumpărătură.",
      "caseId": "caz-cumparaturi-in-jocuri-si-aplicatii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Da, orice rest cere o plată nouă."
        },
        {
          "id": "1",
          "label": "Nu; poate decide fără a adăuga alt cost."
        },
        {
          "id": "2",
          "label": "Da, costul nou este justificat automat de suma deja plătită."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce sistem reduce surprizele?",
      "explanation": "Costul vizibil și confirmarea păstrează controlul deciziei.",
      "correctFeedback": "Corect. Costul vizibil și confirmarea păstrează controlul deciziei.",
      "incorrectFeedback": "Nu chiar. Costul vizibil și confirmarea păstrează controlul deciziei.",
      "caseId": "caz-cumparaturi-in-jocuri-si-aplicatii",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Ascunderea istoricului."
        },
        {
          "id": "1",
          "label": "Folosirea cardului altcuiva fără acord."
        },
        {
          "id": "2",
          "label": "Buget de divertisment, istoric și confirmarea plății."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Când recompensa este incertă, cumpărarea unei șanse nu este același lucru cu primirea sigură a obiectului dorit. Un număr de încercări nu garantează rezultatul doar pentru că ai cheltuit deja. Separă costul efectuat de probabilitatea rezultatului următor și verifică informațiile disponibile.",
        "Poți stabili un buget de divertisment și confirma fiecare plată. Dezactivarea cumpărării rapide sau verificarea istoricului reduce surprizele. Nu folosi datele de plată ale altcuiva fără acord. Un joc poate rămâne plăcut chiar când alegi să nu plătești, iar o cumpărare planificată trebuie să rămână vizibilă în evidența banilor."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ai pierdut la o recompensă incertă. Ce nu poți presupune?",
      "explanation": "Încercările anterioare nu dovedesc o garanție viitoare.",
      "correctFeedback": "Corect. Încercările anterioare nu dovedesc o garanție viitoare.",
      "incorrectFeedback": "Nu chiar. Încercările anterioare nu dovedesc o garanție viitoare.",
      "type": "scenariu",
      "context": "Jocul nu oferă o regulă verificată de garantare.",
      "options": [
        {
          "id": "0",
          "label": "Că plata următoare garantează rezultatul dorit."
        },
        {
          "id": "1",
          "label": "Că ai făcut o cheltuială."
        },
        {
          "id": "2",
          "label": "Că trebuie verificat bugetul."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Cum compari cumpărătura în joc cu o ieșire?",
      "explanation": "Comparația privește costul și valoarea personală, fără moralizare.",
      "correctFeedback": "Corect. Comparația privește costul și valoarea personală, fără moralizare.",
      "incorrectFeedback": "Nu chiar. Comparația privește costul și valoarea personală, fără moralizare.",
      "type": "scenariu",
      "context": "Ai bani limitați pentru activități plăcute.",
      "options": [
        {
          "id": "0",
          "label": "Doar după numărul unităților virtuale."
        },
        {
          "id": "1",
          "label": "În bani reali și în același buget de divertisment."
        },
        {
          "id": "2",
          "label": "Considerând jocul automat bun sau rău."
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
          "title": "Adună plățile",
          "body": "Sumele mici pot forma un total mare.",
          "detail": "Zece plăți de 8 lei consumă 80 lei din bugetul real. Unitățile virtuale rămase după un pachet nu sunt automat numerar recuperabil și nu te obligă să mai cumperi.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Tradu în lei",
          "body": "Monedele virtuale nu elimină costul.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Șansă și garanție",
          "body": "O recompensă incertă poate să nu apară.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Verifică istoricul cumpărăturilor dintr-o aplicație și adună costul unei săptămâni, dacă există.",
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
