import type { ReadyLesson } from "../../types/learning";
import { lei, roFacts, salaryExample as e } from "../ro-facts";

export const salaryLesson: ReadyLesson = {
  "id": "salariu-brut-vs-net",
  "slug": "salariu-brut-vs-net",
  "categoryId": "primul-job",
  "chapterId": "salariul",
  "title": "Salariu brut vs. net",
  "description": "Înțelege unde merg banii dintre ofertă și cont.",
  "minutes": 5,
  "xp": 30,
  "status": "ready",
  "contentVersion": 2,
  "formatVersion": 2,
  "sourceUrls": roFacts.sources,
  "screens": [
    {
      "id": "intro",
      "type": "situatie",
      "title": "Ai primul job. Dar cât primești?",
      "body": "Ai primit prima ofertă de job și suma din contract pare suficientă pentru planurile tale. Apoi afli că în cont va ajunge alt număr. Nu înseamnă automat că e o greșeală: cele două sume descriu lucruri diferite."
    },
    {
      "id": "oferta-concept",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Brutul e startul. Netul e ce rămâne.",
      "paragraphs": [
        "Salariul brut este suma înainte de reținerile aplicabile. Netul este suma rămasă pentru angajat după acele rețineri. Ambele descriu același salariu, dar în momente diferite ale calculului. De aceea, o ofertă cu un număr mare nu îți spune singură câți bani vei putea folosi.",
        "Când cineva comunică un salariu, primul reflex util este să întrebi «brut sau net?». Nu e o întrebare incomodă. Clarifici baza discuției înainte să compari oferte sau să faci un plan pentru chirie, transport și economii.",
        "Dacă vrei să estimezi banii disponibili pentru cheltuieli personale, te uiți la net. Brutul rămâne important pentru înțelegerea contractului, însă nu îl tratezi ca pe suma care va intra integral în cont."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "O sumă fără eticheta brut/net este o informație incompletă."
      }
    },
    {
      "id": "contract",
      "type": "variante",
      "title": "Ce înseamnă suma din contract?",
      "question": "Ai semnat pentru 5.000 lei brut. Ce ai stabilit?",
      "options": [
        {
          "id": "1",
          "label": "Suma disponibilă integral în cont."
        },
        {
          "id": "0",
          "label": "Suma înainte de rețineri."
        },
        {
          "id": "2",
          "label": "Banii rămași după cheltuieli."
        }
      ],
      "correctOption": "0",
      "explanation": "Brutul este suma înainte de rețineri. Netul se obține după aplicarea lor.",
      "correctFeedback": "Brutul este suma înainte de rețineri. Netul se obține după aplicarea lor.",
      "incorrectFeedback": "Suma din contract este brută, nu suma disponibilă integral pentru cheltuieli."
    },
    {
      "id": "anunt",
      "type": "scenariu",
      "title": "O sumă, un detaliu lipsă.",
      "question": "Ce informație clarifici înainte să compari oferta?",
      "options": [
        {
          "id": "1",
          "label": "În ce zi se plătește?"
        },
        {
          "id": "0",
          "label": "Este brut sau net?"
        },
        {
          "id": "2",
          "label": "Ce bancă folosește firma?"
        }
      ],
      "correctOption": "0",
      "explanation": "Brut sau net schimbă sensul sumei. Data și banca nu clarifică valoarea disponibilă.",
      "correctFeedback": "Brut sau net schimbă sensul sumei. Data și banca nu clarifică valoarea disponibilă.",
      "incorrectFeedback": "Data plății poate fi utilă, dar primul detaliu pentru comparație este dacă suma e brută sau netă.",
      "context": "Un recruiter spune «5.000 lei pe lună»."
    },
    {
      "id": "retineri-concept",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Drumul dintre cele două sume.",
      "paragraphs": [
        "Între brut și net pot exista contribuții, impozit și alte rețineri aplicabile. Nu este un comision al băncii doar pentru că primești salariul. Calculul depinde de situația angajatului și de regulile relevante, așa că o estimare pentru altcineva nu se potrivește neapărat identic la tine.",
        "În exemplul simplificat de mai jos urmărim un contract obișnuit de muncă în România și presupunem o lună întreagă, fără deduceri sau situații speciale. Exemplul arată traseul calculului; nu înlocuiește o estimare făcută pentru contractul și situația ta.",
        "Pentru două oferte, compară aceeași perioadă și separă partea fixă de bonusurile condiționate. O sumă «până la» nu este echivalentă cu un net fix confirmat. Beneficiile contează, dar nu toate pot fi folosite ca bani pentru orice cheltuială."
      ],
      "finiMood": "thinking",
      "example": {
        "text": `${lei(e.gross)} brut → ${lei(e.net)} net. ${roFacts.salary.assumptions}`
      },
      "figuresNote": "Cifre orientative: condițiile individuale pot schimba netul.",
      "detail": {
        "text": "Cere o estimare a netului și condițiile părții variabile."
      }
    },
    {
      "id": "retineri",
      "type": "variante",
      "title": "Diferența dintre brut și net.",
      "question": "Ce poate explica diferența dintre brut și net?",
      "options": [
        {
          "id": "1",
          "label": "Doar banca în care ai contul."
        },
        {
          "id": "2",
          "label": "Cheltuielile tale personale."
        },
        {
          "id": "0",
          "label": "Reținerile aplicabile salariului."
        }
      ],
      "correctOption": "0",
      "explanation": "Netul rezultă după reținerile aplicabile. Cheltuielile tale apar abia după încasare.",
      "correctFeedback": "Netul rezultă după reținerile aplicabile. Cheltuielile tale apar abia după încasare.",
      "incorrectFeedback": "Diferența nu este formată de cumpărăturile tale sau de simpla alegere a băncii."
    },
    {
      "id": "bonus",
      "type": "adevarat_fals",
      "title": "Un «până la» este garantat?",
      "question": "«Până la 5.000 lei net, cu bonus» garantează 5.000 lei în fiecare lună.",
      "correctAnswer": false,
      "explanation": "Bonusul poate avea condiții. Partea fixă și cea variabilă trebuie clarificate separat.",
      "correctFeedback": "Bonusul poate avea condiții. Partea fixă și cea variabilă trebuie clarificate separat.",
      "incorrectFeedback": "«Până la» descrie o posibilitate, nu o sumă fixă confirmată pentru fiecare lună."
    },
    {
      "id": "caz",
      "type": "caz_real",
      "caseId": "case-salary-mara",
      "label": "Caz real",
      "title": "Mara compară două oferte.",
      "paragraphs": [
        "Mara are 19 ani și caută primul job pe care să îl poată combina cu facultatea. Prima ofertă menționează 5.500 lei brut pe lună și un bonus posibil de 400 lei. A doua comunică 3.300 lei net fix, plus un beneficiu pentru mese. Ambele descriu inițial un program de opt ore, dar Mara încă nu a văzut condițiile complete ale bonusului.",
        "Ea estimează cheltuieli de bază de 1.800 lei pe lună și ar vrea să păstreze o rezervă pentru transport suplimentar. Prima firmă este mai aproape de casă. A doua pare să aibă un program mai flexibil, însă acest lucru trebuie confirmat. Mara observă că ar fi tentant să compare direct cele două numere afișate.",
        "Înainte să aleagă, poate cere netul estimat al primei oferte, condițiile bonusului și detalii despre program. Beneficiul pentru mese poate ajuta, dar nu plătește automat toate cheltuielile. Decizia nu se reduce la numărul cel mai mare: contează banii disponibili, predictibilitatea lor și contextul în care lucrează."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "mara-clarifica",
      "type": "scenariu",
      "title": "Înainte de comparație.",
      "question": "Care este primul pas util?",
      "options": [
        {
          "id": "0",
          "label": "Cere netul estimat al primei oferte."
        },
        {
          "id": "1",
          "label": "Adună bonusul posibil la brut."
        },
        {
          "id": "2",
          "label": "Alege numărul afișat mai mare."
        }
      ],
      "correctOption": "0",
      "explanation": "Netul estimat pune sumele pe o bază comparabilă. Bonusul rămâne separat până îi cunoaște condițiile.",
      "correctFeedback": "Netul estimat pune sumele pe o bază comparabilă. Bonusul rămâne separat până îi cunoaște condițiile.",
      "incorrectFeedback": "Compararea directă a brutului cu netul poate schimba concluzia. Mai întâi clarifică netul primei oferte.",
      "context": "Mara are o ofertă brută și una netă.",
      "caseId": "case-salary-mara"
    },
    {
      "id": "mara-context",
      "type": "variante",
      "title": "O comparație completă.",
      "question": "Cum compară Mara ofertele fără să decidă doar după bani?",
      "options": [
        {
          "id": "1",
          "label": "Doar suma maximă cu bonus."
        },
        {
          "id": "2",
          "label": "Doar beneficiul pentru mese."
        },
        {
          "id": "0",
          "label": "Net fix, condiții și program confirmat."
        }
      ],
      "correctOption": "0",
      "explanation": "Netul și condițiile de lucru împreună fac comparația mai utilă. Niciun detaliu izolat nu decide automat.",
      "correctFeedback": "Netul și condițiile de lucru împreună fac comparația mai utilă. Niciun detaliu izolat nu decide automat.",
      "incorrectFeedback": "Un beneficiu sau un bonus posibil nu înlocuiește verificarea sumei fixe și a programului.",
      "caseId": "case-salary-mara"
    },
    {
      "id": "mara-buget",
      "type": "variante",
      "title": "Baza bugetului.",
      "question": "Ce sumă poate folosi Mara pentru planul celei de-a doua oferte?",
      "options": [
        {
          "id": "1",
          "label": "Brutul celeilalte oferte."
        },
        {
          "id": "2",
          "label": "Netul plus orice bonus posibil."
        },
        {
          "id": "0",
          "label": "Netul fix de 3.300 lei."
        }
      ],
      "correctOption": "0",
      "explanation": "Bugetul pornește de la banii confirmați. Bonusurile posibile nu sunt venit sigur.",
      "correctFeedback": "Bugetul pornește de la banii confirmați. Bonusurile posibile nu sunt venit sigur.",
      "incorrectFeedback": "Pentru cheltuieli recurente, baza este venitul net confirmat al ofertei analizate.",
      "caseId": "case-salary-mara"
    },
    {
      "id": "nuante",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Uite ce merită verificat.",
      "paragraphs": [
        "O greșeală frecventă este să îți faci bugetul din brut și să observi diferența abia după încasare. Alta este să presupui că orice sumă dintr-un anunț este netă. Eticheta și perioada fac parte din informație, nu sunt detalii de decor.",
        "Chiar și două sume nete pot descrie situații diferite: o lună întreagă sau doar o parte, un program diferit ori o combinație de salariu fix și bonus. Verifică ce este confirmat înainte să construiești cheltuieli recurente în jurul sumei.",
        "Beneficiile și flexibilitatea pot conta în comparație, dar nu transformă automat oferta într-una mai bună pentru oricine. Un reflex util este să separi întrebările: ce bani intră, în ce condiții și ce cheltuieli poți susține din suma fixă."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Compară aceeași perioadă, apoi verifică partea fixă."
      }
    },
    {
      "id": "plata-partiala",
      "type": "scenariu",
      "title": "Prima lună arată diferit.",
      "question": "Ce verifici întâi?",
      "options": [
        {
          "id": "0",
          "label": "Perioada plătită și fluturașul."
        },
        {
          "id": "1",
          "label": "Doar brutul din anunț."
        },
        {
          "id": "2",
          "label": "Presupui că estimarea era netul garantat."
        }
      ],
      "correctOption": "0",
      "explanation": "O plată pentru o parte din lună trebuie comparată cu perioada respectivă, nu automat cu luna întreagă.",
      "correctFeedback": "O plată pentru o parte din lună trebuie comparată cu perioada respectivă, nu automat cu luna întreagă.",
      "incorrectFeedback": "Mai întâi verifică perioada și componentele plății; suma pentru o lună întreagă poate să nu fie comparația potrivită.",
      "context": "Ai început la jumătatea lunii și primești mai puțin decât estimarea unei luni întregi."
    },
    {
      "id": "bani-ramasi",
      "type": "calcul",
      "title": "Banii disponibili după cheltuieli.",
      "context": "Exemplu de calcul.",
      "question": "Într-un exemplu ai 3.300 lei net și cheltuieli de 1.800 lei. Cât rămâne?",
      "options": [
        {
          "id": "0",
          "value": 1200
        },
        {
          "id": "1",
          "value": 1500
        },
        {
          "id": "2",
          "value": 1800
        }
      ],
      "expectedAnswer": 1500,
      "unit": "lei",
      "explanation": "3.300 − 1.800 = 1.500 lei. Calculul pornește de la netul disponibil.",
      "correctFeedback": "3.300 − 1.800 = 1.500 lei. Calculul pornește de la netul disponibil.",
      "incorrectFeedback": "Cheltuielile se scad din net: 3.300 minus 1.800, nu din brut sau dintr-un bonus posibil."
    },
    {
      "id": "tine-minte",
      "type": "tine_minte",
      "title": "Ține minte",
      "finiMood": "happy",
      "items": [
        {
          "id": "punct-1",
          "title": "Brutul este înainte",
          "body": "Brutul descrie suma înainte de rețineri. Nu este automat suma care intră integral în cont.",
          "detail": "Caută eticheta sumei în ofertă sau contract.",
          "type": "normal"
        },
        {
          "id": "punct-2",
          "title": "Netul este disponibil",
          "body": "Netul rămâne după reținerile aplicabile. El este baza pentru cheltuielile tale personale.",
          "detail": "Separă încasarea de banii rămași după propriile cheltuieli.",
          "type": "normal"
        },
        {
          "id": "punct-3",
          "title": "Compară aceeași bază",
          "body": "Compară net cu net și aceeași perioadă. Separă partea fixă de un bonus condiționat.",
          "detail": "Nu aduna un bonus posibil la venitul sigur.",
          "type": "normal"
        },
        {
          "id": "punct-4",
          "title": "Contextul contează",
          "body": "Programul și beneficiile pot schimba comparația. Nu toate beneficiile înlocuiesc banii pentru orice cheltuială.",
          "detail": "Confirmă condițiile înainte să tragi concluzii.",
          "type": "normal"
        },
        {
          "id": "punct-5",
          "title": "Ce poți face azi",
          "body": "Alege un anunț de job și caută dacă suma este brută sau netă. Dacă nu scrie, formulează întrebarea pe care ai trimite-o recruiterului.",
          "detail": "Un mesaj scurt poate clarifica baza întregii oferte.",
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
