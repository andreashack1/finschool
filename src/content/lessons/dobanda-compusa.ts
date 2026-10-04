import type { ReadyLesson } from "../../types/learning";

export const compoundInterestLesson: ReadyLesson = {
  "id": "dobanda-compusa",
  "slug": "dobanda-compusa",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "bazele",
  "title": "Dobânda compusă",
  "description": "Înțelege dobânda la dobândă, efectul timpului și limitele unui exemplu matematic.",
  "minutes": 5,
  "xp": 30,
  "status": "ready",
  "contentVersion": 2,
  "formatVersion": 2,
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Aceeași sumă, altă bază",
      "body": "Ai 1.000 lei puși deoparte și urmărești un exemplu de calcul cu o creștere ipotetică de 10% pe an. După primul an, suma este mai mare. La ce sumă se aplică procentul în anul următor?"
    },
    {
      "id": "concept",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Câștigul intră în baza de calcul",
      "paragraphs": [
        "Dobânda simplă se calculează doar la suma inițială. Dobânda compusă folosește o bază care poate include și câștigurile acumulate anterior, dacă acestea rămân în sumă. De aici vine expresia «dobândă la dobândă»: în perioada următoare, procentul se aplică și peste câștigul păstrat.",
        "Imaginează-ți, doar pentru calcul, 1.000 lei și o rată de 10% pentru o perioadă. Câștigul este 100 lei, iar totalul ajunge la 1.100 lei. Dacă păstrezi și cei 100 lei, următoarea perioadă pornește de la acest total. Dacă îi retragi, baza nu crește în același fel. Mecanismul descrie calculul, nu promite o rată reală."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "mecanism",
      "type": "variante",
      "title": "Ce se compune?",
      "question": "Ce diferențiază dobânda compusă de cea simplă?",
      "options": [
        {
          "id": "1",
          "label": "Procentul trebuie să crească în fiecare perioadă."
        },
        {
          "id": "2",
          "label": "Suma inițială se dublează automat."
        },
        {
          "id": "0",
          "label": "Câștigul păstrat poate intra în baza următorului calcul."
        }
      ],
      "correctOption": "0",
      "explanation": "Și câștigurile păstrate pot participa la calculul următor.",
      "correctFeedback": "Și câștigurile păstrate pot participa la calculul următor.",
      "incorrectFeedback": "Diferența este baza de calcul, nu o creștere obligatorie a ratei."
    },
    {
      "id": "anul-unu",
      "type": "calcul",
      "title": "Prima perioadă",
      "context": "Exemplu de calcul.",
      "question": "În exemplu, 1.000 lei cresc cu 10%. Care este totalul?",
      "options": [
        {
          "id": "0",
          "value": 100
        },
        {
          "id": "1",
          "value": 1100
        },
        {
          "id": "2",
          "value": 1010
        }
      ],
      "expectedAnswer": 1100,
      "unit": "lei",
      "explanation": "10% din 1.000 este 100, iar totalul este 1.100 lei.",
      "correctFeedback": "10% din 1.000 este 100, iar totalul este 1.100 lei.",
      "incorrectFeedback": "Adaugi câștigul de 100 lei la suma inițială de 1.000 lei."
    },
    {
      "id": "timp",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Perioadele se leagă între ele",
      "paragraphs": [
        "Timpul contează fiindcă oferă mai multe ocazii pentru ca suma acumulată să intre din nou în calcul. În exemplul nostru, după primul an ai 1.100 lei. Dacă presupunem aceeași rată ipotetică de 10% și păstrăm tot câștigul, al doilea an adaugă 110 lei, nu 100.",
        "Totalul devine 1.210 lei. Diferența de 10 lei apare din calculul aplicat și câștigului din primul an. La dobânda simplă, două perioade ar adăuga câte 100 lei la aceeași sumă inițială. Comparația are sens doar dacă celelalte condiții sunt identice. Ratele, retragerile și costurile pot schimba rezultatul în situațiile reale."
      ],
      "finiMood": "thinking",
      "example": {
        "text": "Exemplu matematic: 1.000 → 1.100 → 1.210 lei, la 10% pe perioadă, cu tot câștigul păstrat."
      }
    },
    {
      "id": "anul-doi",
      "type": "calcul",
      "title": "A doua perioadă",
      "context": "Exemplu de calcul.",
      "question": "Aplicăm din nou 10%, acum la 1.100 lei. Care este totalul?",
      "options": [
        {
          "id": "0",
          "value": 1200
        },
        {
          "id": "1",
          "value": 1210
        },
        {
          "id": "2",
          "value": 1110
        }
      ],
      "expectedAnswer": 1210,
      "unit": "lei",
      "explanation": "10% din 1.100 este 110, iar totalul este 1.210 lei.",
      "correctFeedback": "10% din 1.100 este 110, iar totalul este 1.210 lei.",
      "incorrectFeedback": "Baza este acum 1.100 lei. Adaugi 110 lei, nu doar 100."
    },
    {
      "id": "comparatie",
      "type": "variante",
      "title": "Aceleași condiții",
      "question": "Cu aceeași rată pozitivă și câștigul păstrat, ce mecanism poate crește mai repede în mai multe perioade?",
      "options": [
        {
          "id": "1",
          "label": "Dobânda simplă, calculată doar la suma inițială."
        },
        {
          "id": "2",
          "label": "Cele două dau mereu același total."
        },
        {
          "id": "0",
          "label": "Dobânda compusă."
        }
      ],
      "correctOption": "0",
      "explanation": "Baza dobânzii compuse poate crește de la o perioadă la alta.",
      "correctFeedback": "Baza dobânzii compuse poate crește de la o perioadă la alta.",
      "incorrectFeedback": "La dobânda simplă baza rămâne suma inițială; la cea compusă include câștigurile păstrate."
    },
    {
      "id": "caz",
      "type": "caz_real",
      "caseId": "case-compound-teo",
      "label": "Caz real",
      "title": "Teo compară două calendare",
      "paragraphs": [
        "Teo, 20 de ani, vrea să înțeleagă un calcul, înainte să citească oferte reale. Desenează două scenarii pe hârtie. În primul, 1.000 lei participă la trei perioade de calcul. În al doilea, aceeași sumă participă doar la două perioade, fiindcă începe mai târziu. Pentru ambele presupune 10% pe perioadă, fără costuri sau retrageri, cu tot câștigul păstrat.",
        "După două perioade, fiecare scenariu care a parcurs acest interval ajunge la 1.210 lei. Primul mai are încă o perioadă în care procentul se aplică acestui total. Teo observă că timpul schimbă rezultatul chiar dacă suma inițială și rata din calcul sunt identice.",
        "Un coleg îi spune că poate folosi rezultatul ca promisiune pentru orice investiție. Teo nu este convins: rata a fost aleasă doar pentru exercițiu, iar în realitate ar trebui verificate riscurile, costurile și condițiile. Vrea să separe concluzia despre mecanism de o presupunere despre câștiguri viitoare."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "teo-perioada",
      "type": "calcul",
      "title": "Încă o perioadă",
      "context": "Exemplu de calcul.",
      "question": "În primul scenariu al lui Teo, ce total rezultă după încă 10% aplicat celor 1.210 lei?",
      "options": [
        {
          "id": "0",
          "value": 1310
        },
        {
          "id": "1",
          "value": 1331
        },
        {
          "id": "2",
          "value": 1320
        }
      ],
      "expectedAnswer": 1331,
      "unit": "lei",
      "explanation": "Câștigul este 121 lei, deci totalul matematic ajunge la 1.331 lei.",
      "correctFeedback": "Câștigul este 121 lei, deci totalul matematic ajunge la 1.331 lei.",
      "incorrectFeedback": "Calculezi 10% din întreaga bază de 1.210 lei, apoi adaugi cei 121 lei.",
      "caseId": "case-compound-teo"
    },
    {
      "id": "teo-timp",
      "type": "scenariu",
      "title": "Ce explică diferența?",
      "question": "De ce primul scenariu are un total mai mare?",
      "options": [
        {
          "id": "1",
          "label": "A folosit neapărat un produs mai sigur."
        },
        {
          "id": "0",
          "label": "A avut o perioadă suplimentară de calcul."
        },
        {
          "id": "2",
          "label": "A avut o rată mai mare."
        }
      ],
      "correctOption": "0",
      "explanation": "Diferența vine din perioada suplimentară, cu aceeași rată și aceeași sumă inițială.",
      "correctFeedback": "Diferența vine din perioada suplimentară, cu aceeași rată și aceeași sumă inițială.",
      "incorrectFeedback": "Nu avem produse sau rate diferite: comparăm doar timpul din exercițiu.",
      "context": "Teo compară scenariile în aceleași condiții ipotetice.",
      "caseId": "case-compound-teo"
    },
    {
      "id": "teo-promisiune",
      "type": "adevarat_fals",
      "title": "Calcul sau promisiune?",
      "question": "Rezultatul lui Teo garantează același câștig pentru o investiție reală.",
      "correctAnswer": false,
      "explanation": "Scenariul explică un mecanism cu ipoteze, nu garantează rezultate reale.",
      "correctFeedback": "Scenariul explică un mecanism cu ipoteze, nu garantează rezultate reale.",
      "incorrectFeedback": "Rata de 10% a fost aleasă pentru exercițiu; condițiile reale pot fi diferite.",
      "caseId": "case-compound-teo"
    },
    {
      "id": "nuante",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Nu confunda ipoteza cu oferta",
      "paragraphs": [
        "Un exemplu cu aceeași rată în fiecare perioadă este util pentru a vedea mecanismul. Nu înseamnă că rata va rămâne identică într-o situație reală. O greșeală frecventă este să citești totalul calculat și să îl tratezi ca pe o promisiune, fără să verifici condițiile care l-au produs.",
        "Nici compunerea nu înseamnă «bani gratis». Dacă vorbim despre investiții, contează riscul, costurile și felul în care pot varia rezultatele. Dacă retragi câștigul, baza următoare poate fi mai mică decât în exemplu. Reflexul util este să separi întrebarea «cum funcționează calculul?» de întrebarea «ce condiții are această ofertă?». Prima nu oferă singură răspunsul la a doua."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Mecanismul de calcul nu este o recomandare de produs și nu garantează câștiguri."
      }
    },
    {
      "id": "oferta",
      "type": "scenariu",
      "title": "Înainte de concluzie",
      "question": "Ce merită verificat înainte să îl legi de o ofertă reală?",
      "options": [
        {
          "id": "0",
          "label": "Ipotezele, costurile, riscurile și condițiile ratei."
        },
        {
          "id": "1",
          "label": "Doar totalul de la finalul graficului."
        },
        {
          "id": "2",
          "label": "Doar dacă scrie «dobândă compusă»."
        }
      ],
      "correctOption": "0",
      "explanation": "Totalul depinde de condițiile calculului, care pot diferi de o ofertă reală.",
      "correctFeedback": "Totalul depinde de condițiile calculului, care pot diferi de o ofertă reală.",
      "incorrectFeedback": "Un grafic nu înlocuiește verificarea ipotezelor, costurilor și riscurilor.",
      "context": "Vezi un grafic construit cu o rată constantă ipotetică."
    },
    {
      "id": "doua-perioade",
      "type": "calcul",
      "title": "Verifică mecanismul",
      "context": "Exemplu de calcul.",
      "question": "Într-un exercițiu, 100 lei cresc cu 10% în fiecare dintre două perioade, fără retrageri. Care este totalul?",
      "options": [
        {
          "id": "0",
          "value": 120
        },
        {
          "id": "1",
          "value": 121
        },
        {
          "id": "2",
          "value": 110
        }
      ],
      "expectedAnswer": 121,
      "unit": "lei",
      "explanation": "Prima perioadă dă 110 lei, iar a doua adaugă 11 lei: total 121.",
      "correctFeedback": "Prima perioadă dă 110 lei, iar a doua adaugă 11 lei: total 121.",
      "incorrectFeedback": "Al doilea procent se aplică celor 110 lei, nu doar sumei inițiale."
    },
    {
      "id": "tine-minte",
      "type": "tine_minte",
      "title": "Ține minte",
      "finiMood": "happy",
      "items": [
        {
          "id": "punct-1",
          "title": "Dobândă la dobândă",
          "body": "Câștigurile păstrate pot intra în baza următorului calcul. Baza poate crește de la o perioadă la alta.",
          "detail": "Retragerea câștigului schimbă exemplul.",
          "type": "normal"
        },
        {
          "id": "punct-2",
          "title": "Timpul contează",
          "body": "Mai multe perioade pot amplifica efectul mecanismului. Comparația cere aceleași condiții în celelalte privințe.",
          "detail": "Separă timpul de diferențele dintre produse.",
          "type": "normal"
        },
        {
          "id": "punct-3",
          "title": "Rata este o ipoteză",
          "body": "Procentul de 10% din lecție servește calculului. Nu reprezintă o ofertă sau o rată curentă.",
          "detail": "O rată reală poate avea alte condiții.",
          "type": "normal"
        },
        {
          "id": "punct-4",
          "title": "Calculul nu garantează",
          "body": "Un total matematic depinde de ipotezele folosite. În investiții reale contează și riscurile și costurile.",
          "detail": "Educația despre mecanism nu este sfat financiar.",
          "type": "normal"
        },
        {
          "id": "punct-5",
          "title": "Ce poți face azi",
          "body": "Calculează pe hârtie două perioade pornind de la 100 lei și o rată ipotetică de 10%. Aplică al doilea procent totalului obținut după prima perioadă.",
          "detail": "Compară rezultatul cu două câștiguri de câte 10 lei.",
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
