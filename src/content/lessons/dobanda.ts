import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "dobanda",
  "title": "Dobânda",
  "categoryId": "cuvintele-banilor",
  "chapterId": "preturi-si-dobanzi",
  "slug": "dobanda",
  "description": "Ioana vede „5% pe an” la economii și „5% pe lună” într-o ofertă de împrumut. Procentele seamănă, costurile nu.",
  "objective": "Să poți explica de ce banii împrumutați sau economisiți pot avea un cost sau un câștig exprimat prin dobândă.",
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
      "title": "Dobânda",
      "body": "Ioana vede „5% pe an” la economii și „5% pe lună” într-o ofertă de împrumut. Procentele seamănă, costurile nu."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Dobânda este legată de folosirea banilor într-o anumită perioadă. Când împrumuți, poate fi un cost pe care îl plătești creditorului. Când depui bani într-un produs care oferă dobândă, poate fi o sumă primită conform condițiilor acelui produs. Sensul banilor depinde de rolul tău în relație.",
        "Un procent nu este o sumă completă fără o bază și o perioadă. Cinci procente din 100 lei înseamnă 5 lei, iar din 1.000 lei înseamnă 50 lei. „Pe an” și „pe lună” descriu intervale diferite, chiar dacă cifra procentului este aceeași."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce lipsește dintr-un simplu „5%”?",
      "explanation": "Un procent se interpretează împreună cu suma și timpul.",
      "correctFeedback": "Corect. Un procent se interpretează împreună cu suma și timpul.",
      "incorrectFeedback": "Nu chiar. Un procent se interpretează împreună cu suma și timpul.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Baza, perioada și condițiile."
        },
        {
          "id": "1",
          "label": "Doar suma; procentul arată singur durata."
        },
        {
          "id": "2",
          "label": "Doar perioada; procentul produce aceeași sumă pentru orice bază."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Dobânda are întotdeauna sensul unui câștig pentru tine.",
      "explanation": "Ca debitor poate fi un cost; ca deponent poate fi un venit.",
      "correctFeedback": "Corect. Ca debitor poate fi un cost; ca deponent poate fi un venit.",
      "incorrectFeedback": "Nu chiar. Ca debitor poate fi un cost; ca deponent poate fi un venit.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Într-un exemplu simplificat de dobândă simplă, păstrezi 1.000 lei un an la 5% anual și primești 50 lei înainte de alte rețineri sau costuri. Pentru exercițiu presupunem că suma și rata rămân constante. Într-un produs real verifici condițiile, durata și momentul plății.",
        "La un împrumut, dobânda afișată poate să nu includă toate costurile. Comisioanele și felul rambursării schimbă suma totală. Nu compara două oferte doar după cifra mare din reclamă. Cere aceeași perioadă, aceeași sumă și informații despre costul complet, ca să nu compari lucruri diferite."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Depozitul de 1.000 lei produce 50 lei dobândă într-un an, fără costuri. O ofertă de împrumut afișează tot 5%, dar lunar și cu comision. Ce poți compara deja?",
      "explanation": "Cei 50 lei rezultă din baza și durata depozitului. La împrumut, perioada lunară și comisionul schimbă comparația; cifra de 5% nu ajunge.",
      "correctFeedback": "Corect. Cei 50 lei rezultă din baza și durata depozitului. La împrumut, perioada lunară și comisionul schimbă comparația; cifra de 5% nu ajunge.",
      "incorrectFeedback": "Nu chiar. Cei 50 lei rezultă din baza și durata depozitului. La împrumut, perioada lunară și comisionul schimbă comparația; cifra de 5% nu ajunge.",
      "type": "scenariu",
      "context": "Suma rămâne constantă un an; nu includem alte costuri.",
      "options": [
        {
          "id": "0",
          "label": "Costul împrumutului este sigur tot 50 lei."
        },
        {
          "id": "1",
          "label": "Câștigul depozitului este calculabil, dar costul împrumutului cere alte condiții."
        },
        {
          "id": "2",
          "label": "Împrumutul este mai ieftin fiindcă procentele sunt egale."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Două oferte afișează 5%, una lunar și alta anual. Ce faci?",
      "explanation": "Aceeași rată pentru perioade diferite nu înseamnă aceeași sumă.",
      "correctFeedback": "Corect. Aceeași rată pentru perioade diferite nu înseamnă aceeași sumă.",
      "incorrectFeedback": "Nu chiar. Aceeași rată pentru perioade diferite nu înseamnă aceeași sumă.",
      "type": "scenariu",
      "context": "Ai nevoie de o comparație corectă.",
      "options": [
        {
          "id": "0",
          "label": "Le consideri identice."
        },
        {
          "id": "1",
          "label": "Compari numai procentul, fiindcă durata este deja inclusă în cifra 5."
        },
        {
          "id": "2",
          "label": "Compari pe aceeași durată și verifici costul complet."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-dobanda",
      "paragraphs": [
        "Ioana are în acest exemplu 1.000 lei pentru un curs programat peste un an. Citește despre un depozit cu dobândă simplă de 5% anual, fără alte costuri în exercițiu. Un prieten îi arată și o ofertă de împrumut care folosește aceeași cifră, dar spune 5% lunar. Ioana observă că rolul ei și perioada sunt complet diferite.",
        "Ea calculează 50 lei pentru un an în primul exemplu. Nu presupune că poate aplica aceeași concluzie împrumutului. Oferta acestuia menționează separat un comision și un calendar de rambursare. Înainte să compare orice produs, Ioana caută durata, baza calculului și condițiile accesului la bani. Pentru curs ar putea avea nevoie de sumă înainte de termen, așa că verifică și efectul retragerii anticipate. Decizia nu poate fi luată doar din două procente care arată la fel."
      ]
    },
    {
      "id": "q5",
      "question": "De ce Ioana nu transferă concluzia de la depozit la împrumut?",
      "explanation": "Contextul decide dacă procentul reprezintă venit sau cost.",
      "correctFeedback": "Corect. Contextul decide dacă procentul reprezintă venit sau cost.",
      "incorrectFeedback": "Nu chiar. Contextul decide dacă procentul reprezintă venit sau cost.",
      "caseId": "caz-dobanda",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Rolul, durata și costurile sunt diferite."
        },
        {
          "id": "1",
          "label": "Același procent produce aceeași sumă indiferent de durată."
        },
        {
          "id": "2",
          "label": "Dobânda este întotdeauna bani primiți, chiar și la împrumut."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce verifică pentru banii cursului?",
      "explanation": "Momentul când ai nevoie de bani contează.",
      "correctFeedback": "Corect. Momentul când ai nevoie de bani contează.",
      "incorrectFeedback": "Nu chiar. Momentul când ai nevoie de bani contează.",
      "caseId": "caz-dobanda",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar câștigul la scadență, presupunând că retragerea nu îl afectează."
        },
        {
          "id": "1",
          "label": "Accesul înainte de termen și efectul asupra dobânzii."
        },
        {
          "id": "2",
          "label": "Doar cifra de 5%."
        }
      ],
      "correctOption": "1",
      "leadIn": "Ioana ar putea avea nevoie de sumă înainte de termen."
    },
    {
      "id": "q7",
      "question": "Ce informație trebuie inclusă la împrumut?",
      "explanation": "Costul creditului nu se reduce la dobânda izolată.",
      "correctFeedback": "Corect. Costul creditului nu se reduce la dobânda izolată.",
      "incorrectFeedback": "Nu chiar. Costul creditului nu se reduce la dobânda izolată.",
      "caseId": "caz-dobanda",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar dobânda din reclamă, fără celelalte plăți."
        },
        {
          "id": "1",
          "label": "Doar prima plată, fără termenele următoare."
        },
        {
          "id": "2",
          "label": "Comisionul și calendarul rambursării."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un câștig din dobândă nu este același lucru cu un câștig de putere de cumpărare. Dacă prețurile cresc, suma mai mare poate cumpăra mai puțin decât ai presupus. Asta nu anulează dobânda; arată că trebuie să separi sumele nominale de ceea ce poți cumpăra cu ele.",
        "Mai verifică dacă rata este fixă sau poate varia și ce se întâmplă când retragi banii înainte de termen. O promisiune de procent nu spune singură cât de accesibili sunt banii. Pentru început, cele trei întrebări utile sunt: pe ce sumă, pentru cât timp și cu ce condiții?"
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Prețurile cresc după ce primești dobândă. Ce compari?",
      "explanation": "Câștigul nominal nu garantează câștig real.",
      "correctFeedback": "Corect. Câștigul nominal nu garantează câștig real.",
      "incorrectFeedback": "Nu chiar. Câștigul nominal nu garantează câștig real.",
      "type": "scenariu",
      "context": "Vrei să vezi ce poți cumpăra după un an.",
      "options": [
        {
          "id": "0",
          "label": "Suma obținută și puterea ei de cumpărare."
        },
        {
          "id": "1",
          "label": "Doar creșterea soldului, fără prețurile cumpărăturilor."
        },
        {
          "id": "2",
          "label": "Doar procentul dobânzii, indiferent ce sumă primești."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Rata se poate schimba. Ce întrebare este utilă?",
      "explanation": "Mecanismul ratei influențează rezultatul.",
      "correctFeedback": "Corect. Mecanismul ratei influențează rezultatul.",
      "incorrectFeedback": "Nu chiar. Mecanismul ratei influențează rezultatul.",
      "type": "scenariu",
      "context": "Oferta nu spune că dobânda este fixă.",
      "options": [
        {
          "id": "0",
          "label": "Care a fost rata inițială, presupunând că rămâne aceeași?"
        },
        {
          "id": "1",
          "label": "Când și prin ce regulă se modifică?"
        },
        {
          "id": "2",
          "label": "Cât câștigi dacă folosești rata inițială pentru toată perioada?"
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
          "title": "Rolul tău",
          "body": "Dobânda poate fi cost sau venit.",
          "detail": "La depozit, instituția poate plăti dobândă pentru suma păstrată. La împrumut, tu o plătești pentru folosirea banilor altcuiva; aceeași cifră poate descrie sensuri opuse.",
          "type": "normal",
          "detailHighlights": [
            "instituția",
            "împrumut"
          ]
        },
        {
          "id": "idee-1",
          "title": "Perioada",
          "body": "Lunar și anual nu sunt echivalente.",
          "detail": "O ofertă de 5% pe lună descrie alt interval decât una de 5% pe an. Adu ofertele la aceeași durată și aceeași sumă înainte să compari rezultatul.",
          "type": "normal",
          "detailHighlights": [
            "sumă"
          ]
        },
        {
          "id": "idee-2",
          "title": "Condiții",
          "body": "Verifică baza, costurile și accesul la bani.",
          "detail": "Comisionul și calendarul rambursării pot schimba costul unui împrumut. Pentru economii, verifică și ce se întâmplă dacă ai nevoie de sumă înainte de scadență.",
          "type": "normal",
          "detailHighlights": [
            "comisionul",
            "scadență"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Găsește într-o ofertă informativă perioada și baza dobânzii, fără să deschizi un produs.",
          "type": "action",
          "detail": "Notează dacă procentul este anual sau lunar și dacă oferta include comisioane. Fără aceste date, două cifre asemănătoare nu sunt comparabile.",
          "detailHighlights": [
            "comisioane",
            "procentul"
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
