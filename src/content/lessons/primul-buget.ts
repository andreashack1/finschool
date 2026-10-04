import type { ReadyLesson } from "../../types/learning";

export const budgetLesson: ReadyLesson = {
  "id": "primul-buget",
  "slug": "primul-buget",
  "categoryId": "economii",
  "chapterId": "bugetul",
  "title": "Primul tău buget",
  "description": "Un plan simplu pentru banii care intră și ies.",
  "minutes": 5,
  "xp": 30,
  "status": "ready",
  "contentVersion": 2,
  "formatVersion": 2,
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Unde au dispărut banii?",
      "body": "Ai primit banii pentru lună, iar după două săptămâni nu mai știi pe ce s-au dus. Ai plătit lucruri mici, câteva abonamente și două ieșiri. Nu ai nevoie de un tabel perfect, ci de un plan care să le facă vizibile."
    },
    {
      "id": "intro",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Un plan, nu o pedeapsă.",
      "paragraphs": [
        "Un buget este un plan pentru banii care intră și ies. Începi cu venitul disponibil, apoi decizi ce trebuie acoperit și ce vrei să păstrezi pentru mai târziu. Scopul nu este să interzică orice lucru plăcut, ci să îți arate ce alegeri încap în aceeași sumă.",
        "Dacă aștepți să vezi ce rămâne la final, economisirea și alte obiective pot primi doar resturile. Planificarea înainte de cheltuire le dă un loc clar, alături de nevoile curente. Asta nu înseamnă că planul nu se poate schimba.",
        "Nu ai nevoie să cumperi o aplicație înainte să începi. O listă simplă poate fi suficientă pentru primul pas. Contează să folosești venit confirmat, nu bani pe care doar speri să îi primești."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Mai întâi afli suma disponibilă; abia apoi o împarți."
      }
    },
    {
      "id": "start",
      "type": "variante",
      "title": "De unde începi?",
      "question": "Care este prima etapă a bugetului?",
      "options": [
        {
          "id": "1",
          "label": "Cumperi o aplicație de buget."
        },
        {
          "id": "2",
          "label": "Cheltuiești și economisești restul."
        },
        {
          "id": "0",
          "label": "Notezi venitul disponibil confirmat."
        }
      ],
      "correctOption": "0",
      "explanation": "Trebuie să știi câți bani ai la dispoziție înainte să planifici folosirea lor.",
      "correctFeedback": "Trebuie să știi câți bani ai la dispoziție înainte să planifici folosirea lor.",
      "incorrectFeedback": "Aplicația poate ajuta, dar baza planului este venitul disponibil, nu instrumentul folosit."
    },
    {
      "id": "resturi",
      "type": "adevarat_fals",
      "title": "Plan sau doar resturi?",
      "question": "Economisirea doar din ce rămâne la final este același lucru cu planificarea ei de la început.",
      "correctAnswer": false,
      "explanation": "Un obiectiv planificat primește un loc înainte de cheltuire. Resturile pot varia mult.",
      "correctFeedback": "Un obiectiv planificat primește un loc înainte de cheltuire. Resturile pot varia mult.",
      "incorrectFeedback": "Așteptarea restului nu oferă aceeași vizibilitate ca o sumă planificată pentru obiectiv."
    },
    {
      "id": "categorii",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Categorii care te ajută să vezi.",
      "paragraphs": [
        "Poți separa cheltuielile fixe, cele variabile și banii pentru obiective. Fixe înseamnă relativ previzibile, cum sunt un abonament sau chiria. Variabile înseamnă că suma poate diferi, cum se întâmplă cu mâncarea sau ieșirile. Variabil nu înseamnă automat neimportant.",
        "Într-un exemplu ai 2.000 lei, cheltuieli fixe de 700 lei, mâncare de 500 lei și ieșiri de 400 lei. După acestea rămân 400 lei. Dacă ai un obiectiv de economisire, îl pui în plan înainte să tratezi toată diferența drept bani liberi.",
        "Categoriile sunt o unealtă, nu un examen. O cheltuială poate fi importantă chiar dacă suma ei se schimbă. Planul devine mai util când arată atât obligațiile, cât și locul în care poți ajusta fără să ignori nevoile esențiale."
      ],
      "finiMood": "thinking",
      "example": {
        "text": "2.000 − 700 − 500 − 400 = 400 lei disponibili pentru alte alegeri."
      },
      "detail": {
        "text": "Verifică și obiectivele înainte să numești diferența «bani liberi»."
      }
    },
    {
      "id": "ramane",
      "type": "calcul",
      "title": "Ce mai rămâne?",
      "context": "Exemplu de calcul.",
      "question": "Ai 2.000 lei. Fixe: 700, mâncare: 500, ieșiri: 400. Cât rămâne?",
      "options": [
        {
          "id": "0",
          "value": 200
        },
        {
          "id": "1",
          "value": 400
        },
        {
          "id": "2",
          "value": 600
        }
      ],
      "expectedAnswer": 400,
      "unit": "lei",
      "explanation": "După cele trei categorii rămân 400 lei. Urmează să decizi ce rol au în plan.",
      "correctFeedback": "După cele trei categorii rămân 400 lei. Urmează să decizi ce rol au în plan.",
      "incorrectFeedback": "Scazi fiecare categorie o singură dată: 2.000 minus 700, 500 și 400."
    },
    {
      "id": "categorie",
      "type": "scenariu",
      "title": "Variabil nu înseamnă inutil.",
      "question": "Cum o privești în buget?",
      "options": [
        {
          "id": "0",
          "label": "Variabilă, dar importantă."
        },
        {
          "id": "1",
          "label": "Inutilă, fiindcă suma diferă."
        },
        {
          "id": "2",
          "label": "Fixă, fiindcă ai nevoie de ea."
        }
      ],
      "correctOption": "0",
      "explanation": "Categoria descrie predictibilitatea sumei, nu importanța nevoii.",
      "correctFeedback": "Categoria descrie predictibilitatea sumei, nu importanța nevoii.",
      "incorrectFeedback": "O sumă care variază nu face nevoia inutilă și nici nu o transformă într-un cost fix.",
      "context": "Costul mâncării diferă între luni, dar ai nevoie de ea."
    },
    {
      "id": "caz",
      "type": "caz_real",
      "caseId": "case-budget-vlad",
      "label": "Caz real",
      "title": "Vlad și ieșirea neplanificată.",
      "paragraphs": [
        "Vlad are 19 ani și un venit disponibil de 2.000 lei pe lună. Planifică 700 lei pentru cheltuieli fixe, inclusiv transportul și un abonament, 500 lei pentru mâncare și 400 lei pentru ieșiri. Vrea să păstreze 300 lei pentru un laptop. Cei 100 lei rămași sunt o mică rezervă în buget, nu întregul lui fond pentru urgențe.",
        "La jumătatea lunii, prietenii propun o ieșire suplimentară de 150 lei. Vlad ar vrea să participe. Nu are un venit suplimentar confirmat și nu vrea să amâne automat obiectivul pentru laptop. O parte din suma pentru ieșiri nu a fost încă folosită, iar o altă ieșire planificată poate fi simplificată.",
        "Are mai multe opțiuni aparent rezonabile: poate reduce costul noii ieșiri, poate muta bani din alte activități sociale sau poate ajusta explicit obiectivul. Ce nu funcționează este să pretindă că cei 150 lei nu schimbă nimic. Un plan flexibil îi permite să aleagă, dar trebuie să arate de unde vine diferența."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "vlad-obiectiv",
      "type": "scenariu",
      "title": "Ce are deja un rol?",
      "question": "Cum ar trebui privită?",
      "options": [
        {
          "id": "1",
          "label": "Ca 400 lei liberi pentru orice."
        },
        {
          "id": "0",
          "label": "Ca bani deja împărțiți în plan."
        },
        {
          "id": "2",
          "label": "Ca venit suplimentar sigur."
        }
      ],
      "correctOption": "0",
      "explanation": "Diferența dintre venit și primele categorii nu este automat liberă; obiectivul are deja un loc.",
      "correctFeedback": "Diferența dintre venit și primele categorii nu este automat liberă; obiectivul are deja un loc.",
      "incorrectFeedback": "Cei 300 lei pentru laptop au un rol. O nouă cheltuială cere o ajustare, nu o presupunere.",
      "context": "Diferența de 400 lei include 300 lei pentru laptop și 100 lei rezervă.",
      "caseId": "case-budget-vlad"
    },
    {
      "id": "vlad-flexibil",
      "type": "scenariu",
      "title": "Participi fără totul-sau-nimic.",
      "question": "Care variantă păstrează planul vizibil?",
      "options": [
        {
          "id": "1",
          "label": "Renunță automat la toate economiile."
        },
        {
          "id": "0",
          "label": "Reduce o altă ieșire sau costul celei noi."
        },
        {
          "id": "2",
          "label": "Cheltuiește și verifică abia luna viitoare."
        }
      ],
      "correctOption": "0",
      "explanation": "Poate ajusta o categorie flexibilă fără să abandoneze complet obiectivul.",
      "correctFeedback": "Poate ajusta o categorie flexibilă fără să abandoneze complet obiectivul.",
      "incorrectFeedback": "O cheltuială socială nu cere automat anularea economiilor; diferența poate fi planificată explicit.",
      "context": "Vlad vrea să păstreze obiectivul și să iasă cu prietenii.",
      "caseId": "case-budget-vlad"
    },
    {
      "id": "vlad-diferenta",
      "type": "calcul",
      "title": "Ce sumă trebuie ajustată?",
      "context": "Exemplu de calcul.",
      "question": "Vlad folosește rezerva de 100 lei pentru ieșirea de 150 lei. Cât mai trebuie acoperit?",
      "options": [
        {
          "id": "0",
          "value": 50
        },
        {
          "id": "1",
          "value": 100
        },
        {
          "id": "2",
          "value": 150
        }
      ],
      "expectedAnswer": 50,
      "unit": "lei",
      "explanation": "150 − 100 = 50 lei de găsit printr-o ajustare explicită.",
      "correctFeedback": "150 − 100 = 50 lei de găsit printr-o ajustare explicită.",
      "incorrectFeedback": "Rezerva acoperă doar 100 lei; diferența de 50 lei încă trebuie planificată.",
      "caseId": "case-budget-vlad"
    },
    {
      "id": "nuante",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Un buget pe care îl poți folosi.",
      "paragraphs": [
        "O capcană este să ignori cheltuielile mici fiindcă fiecare pare neimportantă. Împreună pot schimba mult suma disponibilă. Alta este să construiești un plan fără loc pentru viața reală, apoi să îl abandonezi la prima abatere.",
        "Un buget prea strict poate arăta bine pe hârtie și să fie greu de respectat. Flexibilitatea nu înseamnă să ignori totalul, ci să vezi ce muți și ce efect are mutarea. Dacă ai cheltuit mai mult într-o categorie, verifică de unde vine diferența.",
        "O abatere este informație pentru următorul plan, nu dovada că ai eșuat. Poți actualiza estimările folosind cheltuielile observate. Obiectivele rămân mai clare când sunt planificate dinainte, iar ajustările sunt făcute conștient, nu ascunse în restul de la final."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Un plan util se ajustează când afli ceva nou."
      }
    },
    {
      "id": "ajustare",
      "type": "variante",
      "title": "Ai depășit o estimare.",
      "question": "Ce faci când o categorie a costat mai mult decât credeai?",
      "options": [
        {
          "id": "1",
          "label": "Abandonezi orice buget."
        },
        {
          "id": "2",
          "label": "Păstrezi estimarea fără să verifici."
        },
        {
          "id": "0",
          "label": "Verifici diferența și ajustezi planul."
        }
      ],
      "correctOption": "0",
      "explanation": "Cheltuiala observată este informație pentru o estimare mai bună și o ajustare explicită.",
      "correctFeedback": "Cheltuiala observată este informație pentru o estimare mai bună și o ajustare explicită.",
      "incorrectFeedback": "O abatere nu anulează utilitatea planului. Verifică diferența înainte să decizi ce schimbi."
    },
    {
      "id": "iesire-plan",
      "type": "calcul",
      "title": "O alegere în plan.",
      "context": "Exemplu de calcul.",
      "question": "Din 400 lei disponibili planifici o ieșire de 150 lei. Cât rămâne pentru celelalte alegeri?",
      "options": [
        {
          "id": "0",
          "value": 150
        },
        {
          "id": "1",
          "value": 250
        },
        {
          "id": "2",
          "value": 350
        }
      ],
      "expectedAnswer": 250,
      "unit": "lei",
      "explanation": "400 − 150 = 250 lei. Următoarele alegeri trebuie să încapă în această sumă.",
      "correctFeedback": "400 − 150 = 250 lei. Următoarele alegeri trebuie să încapă în această sumă.",
      "incorrectFeedback": "Cheltuiala planificată se scade din suma disponibilă; nu păstrezi cei 400 lei ca și cum nimic nu s-a schimbat."
    },
    {
      "id": "tine-minte",
      "type": "tine_minte",
      "title": "Ține minte",
      "finiMood": "happy",
      "items": [
        {
          "id": "punct-1",
          "title": "Începi cu venitul",
          "body": "Notezi venitul disponibil confirmat. Nu pornești de la un bonus pe care doar îl speri.",
          "detail": "O listă simplă este suficientă pentru început.",
          "type": "normal"
        },
        {
          "id": "punct-2",
          "title": "Categorii utile",
          "body": "Separi sumele previzibile de cele care variază. Categoria nu spune dacă o cheltuială este importantă sau inutilă.",
          "detail": "Mâncarea poate fi variabilă și esențială.",
          "type": "normal"
        },
        {
          "id": "punct-3",
          "title": "Planifici înainte",
          "body": "Obiectivele primesc un loc în buget. Diferența rămasă nu este automat disponibilă pentru orice.",
          "detail": "Verifică ce rol ai dat deja fiecărei sume.",
          "type": "normal"
        },
        {
          "id": "punct-4",
          "title": "Flexibilitate vizibilă",
          "body": "Poți ajusta un plan fără să renunți la el. O abatere îți arată ce estimare merită schimbată.",
          "detail": "Arată de unde vine diferența unei cheltuieli noi.",
          "type": "normal"
        },
        {
          "id": "punct-5",
          "title": "Ce poți face azi",
          "body": "Notează ultimele cinci cheltuieli. Pune-le în categorii și observă una pe care nu ai planificat-o.",
          "detail": "Nu trebuie să le judeci; folosește-le ca informație.",
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
