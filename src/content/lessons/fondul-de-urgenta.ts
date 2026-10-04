import type { ReadyLesson } from "../../types/learning";

export const emergencyFundLesson: ReadyLesson = {
  "id": "fondul-de-urgenta",
  "slug": "fondul-de-urgenta",
  "categoryId": "economii",
  "chapterId": "siguranta-ta-financiara",
  "title": "Fondul de urgență",
  "description": "Bani puși separat pentru surprize reale.",
  "minutes": 5,
  "xp": 30,
  "status": "ready",
  "contentVersion": 2,
  "formatVersion": 2,
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "O reparație care nu era în plan.",
      "body": "Telefonul de care ai nevoie pentru muncă se strică în mijlocul lunii. Reparația nu era în buget, iar cheltuielile obișnuite continuă. O sumă păstrată separat îți poate da timp să alegi fără grabă."
    },
    {
      "id": "concept",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Pentru surprize, nu pentru orice dorință.",
      "paragraphs": [
        "Un fond de urgență este o sumă pusă deoparte pentru cheltuieli importante și neașteptate. Nu este același lucru cu banii pentru o vacanță sau pentru un produs pe care îl dorești. Scopul lui este să îți ofere spațiu de decizie când apare o problemă.",
        "O urgență se judecă și după context. Un telefon defect poate fi urgent dacă depinzi de el pentru muncă. O reducere la un telefon nou nu devine urgență doar pentru că oferta expiră seara. Întreabă ce se întâmplă dacă amâni cheltuiala.",
        "Fondul nu face problema plăcută, dar poate evita o decizie luată sub presiune. Îl păstrezi separat în planul tău, tocmai ca să nu pară disponibil pentru fiecare dorință care apare."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Important și neașteptat sunt indicii mai utile decât «doar azi»."
      }
    },
    {
      "id": "urgenta",
      "type": "variante",
      "title": "Urgență sau dorință?",
      "question": "Care e o urgență reală în contextul descris?",
      "options": [
        {
          "id": "1",
          "label": "Telefonul necesar pentru muncă s-a stricat."
        },
        {
          "id": "0",
          "label": "Reducere la adidași."
        },
        {
          "id": "2",
          "label": "Bilete la concert."
        }
      ],
      "correctOption": "1",
      "explanation": "Telefonul necesar pentru muncă rezolvă o nevoie importantă și neașteptată.",
      "correctFeedback": "Telefonul necesar pentru muncă rezolvă o nevoie importantă și neașteptată.",
      "incorrectFeedback": "O ofertă sau un concert poate fi tentant, dar nu rezolvă problema importantă și neașteptată."
    },
    {
      "id": "scop",
      "type": "adevarat_fals",
      "title": "Bani pentru orice ofertă?",
      "question": "Fondul de urgență este o rezervă pentru orice reducere care apare.",
      "correctAnswer": false,
      "explanation": "Rezerva are un scop separat: surprize importante, nu orice ofertă.",
      "correctFeedback": "Rezerva are un scop separat: surprize importante, nu orice ofertă.",
      "incorrectFeedback": "Urgența nu este definită de cât de repede expiră o reducere."
    },
    {
      "id": "incepi-mic",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Dimensiunea pornește de la cheltuieli.",
      "paragraphs": [
        "Mulți oameni pornesc de la ideea de a acoperi mai multe luni de cheltuieli de bază. Este o regulă practică, nu o obligație legală și nici un număr potrivit automat pentru toată lumea. Nevoile și stabilitatea venitului pot fi diferite.",
        "Într-un exemplu, cheltuielile de bază sunt 1.800 lei pe lună. Pentru trei luni, calculul este 1.800 înmulțit cu 3, adică 5.400 lei. Suma oferă o direcție pentru plan, nu o cerință de atins imediat.",
        "Poți începe cu o rezervă mică și contribuții pe care le poți susține. Contează și să poți accesa banii când apare problema. Un fond greu de folosit la nevoie nu îndeplinește la fel de bine scopul pentru care l-ai construit."
      ],
      "finiMood": "thinking",
      "example": {
        "text": "1.800 lei × 3 luni = 5.400 lei, în exemplul nostru."
      },
      "detail": {
        "text": "Prima țintă poate fi mică; nu trebuie să construiești tot fondul dintr-o singură lună."
      }
    },
    {
      "id": "trei-luni",
      "type": "calcul",
      "title": "Trei luni de cheltuieli.",
      "context": "Exemplu de calcul.",
      "question": "Cheltuieli de bază de 1.800 lei pe lună: cât înseamnă 3 luni?",
      "options": [
        {
          "id": "0",
          "value": 3600
        },
        {
          "id": "1",
          "value": 5400
        },
        {
          "id": "2",
          "value": 6000
        }
      ],
      "expectedAnswer": 5400,
      "unit": "lei",
      "explanation": "1.800 × 3 = 5.400 lei. Exemplul pornește de la cheltuielile de bază.",
      "correctFeedback": "1.800 × 3 = 5.400 lei. Exemplul pornește de la cheltuielile de bază.",
      "incorrectFeedback": "Înmulțești cheltuiala lunară cu numărul de luni; nu adaugi doar trei lei sau o singură lună."
    },
    {
      "id": "rezerva-mica",
      "type": "scenariu",
      "title": "O țintă mare, un început mic.",
      "question": "Ce abordare este realistă?",
      "options": [
        {
          "id": "1",
          "label": "Aștepți până poți pune tot fondul odată."
        },
        {
          "id": "2",
          "label": "Folosești economiile pentru orice ofertă."
        },
        {
          "id": "0",
          "label": "Începi cu suma sustenabilă și ajustezi."
        }
      ],
      "correctOption": "0",
      "explanation": "O sumă mică și sustenabilă este un început real. Ținta nu trebuie atinsă dintr-o singură mișcare.",
      "correctFeedback": "O sumă mică și sustenabilă este un început real. Ținta nu trebuie atinsă dintr-o singură mișcare.",
      "incorrectFeedback": "O țintă mare nu anulează utilitatea unui început mic pe care îl poți menține.",
      "context": "Poți păstra separat 50 lei pe lună, dar ținta finală este mult mai mare."
    },
    {
      "id": "caz",
      "type": "caz_real",
      "caseId": "case-emergency-daria",
      "label": "Caz real",
      "title": "Daria are două cheltuieli în față.",
      "paragraphs": [
        "Daria este studentă și folosește laptopul pentru proiecte și câteva ore de muncă online. Are 1.000 lei într-o rezervă separată. Laptopul se defectează înainte de o săptămână cu termene importante. Un service estimează 400 lei pentru reparație, dar Daria vrea să confirme că intervenția rezolvă problema și că aparatul poate fi gata la timp.",
        "În aceeași zi apare o ofertă la căști de 250 lei, valabilă până seara. Daria și le dorea de ceva vreme. Pentru luna curentă are deja planificate mâncarea și transportul; acești bani nu sunt în rezerva de 1.000 lei. Un coleg îi poate împrumuta temporar un laptop, dar numai pentru două zile.",
        "Ar putea folosi rezerva pentru reparația necesară și să amâne căștile. Împrumutul temporar îi dă puțin timp pentru verificare, nu elimină problema. După reparație ar rămâne cu 600 lei în fond. Daria poate planifica apoi contribuții mici pentru refacerea rezervei, fără să trateze toată suma rămasă drept bani de cumpărături."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "daria-prioritate",
      "type": "scenariu",
      "title": "Ce rezolvă problema importantă?",
      "question": "Ce cheltuială are prioritate în fond?",
      "options": [
        {
          "id": "0",
          "label": "Reparația confirmată ca necesară."
        },
        {
          "id": "1",
          "label": "Căștile, fiindcă oferta expiră."
        },
        {
          "id": "2",
          "label": "Oricare, fiindcă banii sunt economisiți."
        }
      ],
      "correctOption": "0",
      "explanation": "Reparația susține o nevoie importantă și neașteptată. Oferta nu schimbă scopul fondului.",
      "correctFeedback": "Reparația susține o nevoie importantă și neașteptată. Oferta nu schimbă scopul fondului.",
      "incorrectFeedback": "Presiunea unei oferte nu o transformă în urgență; laptopul este necesar activităților Dariei.",
      "context": "Laptopul este necesar pentru facultate și muncă.",
      "caseId": "case-emergency-daria"
    },
    {
      "id": "daria-rezerva",
      "type": "calcul",
      "title": "Păstrează și o rezervă.",
      "context": "Exemplu de calcul.",
      "question": "Daria folosește 400 lei din fondul de 1.000 lei. Cât rămâne?",
      "options": [
        {
          "id": "0",
          "value": 350
        },
        {
          "id": "1",
          "value": 600
        },
        {
          "id": "2",
          "value": 750
        }
      ],
      "expectedAnswer": 600,
      "unit": "lei",
      "explanation": "1.000 − 400 = 600 lei. Cheltuiala necesară nu obligă la folosirea întregului fond.",
      "correctFeedback": "1.000 − 400 = 600 lei. Cheltuiala necesară nu obligă la folosirea întregului fond.",
      "incorrectFeedback": "Scazi doar reparația din fond. Căștile nu sunt o parte necesară a soluției.",
      "caseId": "case-emergency-daria"
    },
    {
      "id": "daria-refacere",
      "type": "variante",
      "title": "Ce urmează după reparație?",
      "question": "Care plan păstrează scopul fondului?",
      "options": [
        {
          "id": "1",
          "label": "Cheltuiește tot restul pe dorințe."
        },
        {
          "id": "2",
          "label": "Renunță la rezervă, fiindcă a folosit-o."
        },
        {
          "id": "0",
          "label": "Reface rezerva prin contribuții sustenabile."
        }
      ],
      "correctOption": "0",
      "explanation": "Folosirea pentru o urgență este scopul fondului. Refacerea lui pregătește următoarea surpriză.",
      "correctFeedback": "Folosirea pentru o urgență este scopul fondului. Refacerea lui pregătește următoarea surpriză.",
      "incorrectFeedback": "Fondul nu a eșuat fiindcă a fost folosit; merită reconstruit după cheltuiala necesară.",
      "caseId": "case-emergency-daria"
    },
    {
      "id": "nuante",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "O rezervă care chiar te ajută.",
      "paragraphs": [
        "O greșeală frecventă este să vezi fondul ca pe bani în plus. Atunci orice dorință poate părea o excepție acceptabilă, iar rezerva dispare înaintea unei probleme reale. O regulă personală despre ce numești urgență face decizia mai clară.",
        "Altă capcană este să crezi că fondul trebuie construit instant. Dacă o contribuție prea mare te lasă fără bani pentru nevoile curente, planul devine greu de menținut. Un început mic poate fi mai util decât o țintă perfectă pe care nu o poți susține.",
        "După folosire, verifică ce a rămas și cum poți reface suma treptat. Păstrează accesul la bani și separarea de dorințe. Fondul este o unealtă pentru surprize, nu o promisiune că nu vei mai avea niciodată probleme."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Folosirea fondului pentru scopul său nu este un eșec."
      }
    },
    {
      "id": "dupa-utilizare",
      "type": "variante",
      "title": "Ai folosit fondul. Acum ce?",
      "question": "Care reflex este util după o urgență?",
      "options": [
        {
          "id": "1",
          "label": "Consideri rezerva rămasă bani în plus."
        },
        {
          "id": "0",
          "label": "Verifici soldul și planifici refacerea."
        },
        {
          "id": "2",
          "label": "Nu mai păstrezi fondul separat."
        }
      ],
      "correctOption": "0",
      "explanation": "Refacerea treptată păstrează rolul rezervei pentru următoarea situație.",
      "correctFeedback": "Refacerea treptată păstrează rolul rezervei pentru următoarea situație.",
      "incorrectFeedback": "Banii rămași au încă un scop; nu devin automat bani disponibili pentru dorințe."
    },
    {
      "id": "instant",
      "type": "adevarat_fals",
      "title": "Totul din prima lună?",
      "question": "Dacă nu poți construi tot fondul într-o lună, nu merită să începi.",
      "correctAnswer": false,
      "explanation": "O contribuție mică poate construi o rezervă reală în timp.",
      "correctFeedback": "O contribuție mică poate construi o rezervă reală în timp.",
      "incorrectFeedback": "Ținta finală și prima contribuție sunt lucruri diferite. Poți începe cu o sumă sustenabilă."
    },
    {
      "id": "tine-minte",
      "type": "tine_minte",
      "title": "Ține minte",
      "finiMood": "happy",
      "items": [
        {
          "id": "punct-1",
          "title": "Surprize reale",
          "body": "Fondul este pentru cheltuieli importante și neașteptate. O dorință nu devine urgență fiindcă este la reducere.",
          "detail": "Întreabă ce se întâmplă dacă amâni cheltuiala.",
          "type": "normal"
        },
        {
          "id": "punct-2",
          "title": "Cheltuieli de bază",
          "body": "Dimensiunea poate porni de la cheltuielile esențiale. Mai multe luni sunt o idee practică, nu o lege universală.",
          "detail": "Folosește cheltuielile tale din exemplul de plan, nu un număr ales la întâmplare.",
          "type": "normal"
        },
        {
          "id": "punct-3",
          "title": "Acces când ai nevoie",
          "body": "Rezerva trebuie să poată fi folosită la o problemă reală. Separarea ei de dorințe ajută la păstrarea scopului.",
          "detail": "O sumă greu de accesat poate să nu rezolve urgența la timp.",
          "type": "normal"
        },
        {
          "id": "punct-4",
          "title": "Începi și reconstruiești",
          "body": "Poți începe mic. După utilizare, contribuțiile sustenabile refac treptat fondul.",
          "detail": "Nu trata utilizarea pentru o urgență ca pe un eșec.",
          "type": "normal"
        },
        {
          "id": "punct-5",
          "title": "Ce poți face azi",
          "body": "Notează trei situații care ar conta pentru tine ca urgență. Pentru fiecare, explică de ce este importantă și neașteptată.",
          "detail": "Lista te ajută când apare o ofertă care pune presiune.",
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
