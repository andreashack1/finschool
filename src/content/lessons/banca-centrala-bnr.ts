import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "banca-centrala-bnr",
  "title": "Banca centrală (BNR)",
  "categoryId": "cuvintele-banilor",
  "chapterId": "preturi-si-dobanzi",
  "slug": "banca-centrala-bnr",
  "description": "Alex citește o știre despre BNR și se întreabă dacă acolo își poate deschide contul pentru salariu.",
  "objective": "Să poți recunoaște rolurile principale ale băncii centrale și să diferențiezi BNR de o bancă comercială obișnuită.",
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
      "title": "Banca centrală (BNR)",
      "body": "Alex citește o știre despre BNR și se întreabă dacă acolo își poate deschide contul pentru salariu."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "BNR este banca centrală a României, cu un rol diferit de banca la care folosești un cont sau un card. Politica monetară urmărește stabilitatea prețurilor. BNR lucrează cu instrumente care influențează condițiile monetare și supraveghează instituții de credit în cadrul atribuțiilor sale. Nu este ghișeul obișnuit pentru plata abonamentului tău.",
        "O bancă comercială oferă servicii precum conturi, plăți, depozite și credite clienților săi. Dacă ai un comision necunoscut sau o problemă cu accesul la aplicație, începi cu banca respectivă. Nu presupui că orice operațiune personală este gestionată direct de banca centrală."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Unde cauți un cont pentru salariu?",
      "explanation": "Banca centrală are alt rol decât serviciile bancare obișnuite.",
      "correctFeedback": "Corect. Banca centrală are alt rol decât serviciile bancare obișnuite.",
      "incorrectFeedback": "Nu chiar. Banca centrală are alt rol decât serviciile bancare obișnuite.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "La o bancă comercială care oferă acest serviciu."
        },
        {
          "id": "1",
          "label": "La ghișeul BNR pentru orice client."
        },
        {
          "id": "2",
          "label": "La organizatorul știrii."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "BNR fixează direct prețul fiecărui produs din magazin.",
      "explanation": "Politica monetară influențează condițiile generale, fără să fixeze fiecare etichetă.",
      "correctFeedback": "Corect. Politica monetară influențează condițiile generale, fără să fixeze fiecare etichetă.",
      "incorrectFeedback": "Nu chiar. Politica monetară influențează condițiile generale, fără să fixeze fiecare etichetă.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Când banca centrală schimbă condițiile dobânzilor, efectele se pot transmite către finanțare, economisire și cerere. Transmiterea nu este instantanee și nu arată identic la toate produsele. O știre nu rescrie automat fiecare contract în aceeași zi. Condițiile concrete ale contului sau creditului tău rămân importante.",
        "Gândește-te la un semnal care influențează mediul financiar, nu la o comandă care fixează fiecare preț din magazine. Prețul unui bilet poate depinde și de cerere, costuri sau numărul de locuri. BNR nu stabilește direct prețul fiecărui produs și nu îți promite un curs viitor pentru vacanță."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "O decizie monetară schimbă automat toate contractele în aceeași zi?",
      "explanation": "Transmiterea poate dura și diferă între produse.",
      "correctFeedback": "Corect. Transmiterea poate dura și diferă între produse.",
      "incorrectFeedback": "Nu chiar. Transmiterea poate dura și diferă între produse.",
      "type": "scenariu",
      "context": "Ai văzut o știre despre dobânzi.",
      "options": [
        {
          "id": "0",
          "label": "Da, aceeași modificare se aplică tuturor produselor."
        },
        {
          "id": "1",
          "label": "Nu; verifici mecanismul fiecărui produs."
        },
        {
          "id": "2",
          "label": "Da, dacă știrea este publicată în aceeași zi."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Apare un comision necunoscut în cont. Cu cine începi verificarea?",
      "explanation": "Instituția care administrează contul poate explica tranzacția.",
      "correctFeedback": "Corect. Instituția care administrează contul poate explica tranzacția.",
      "incorrectFeedback": "Nu chiar. Instituția care administrează contul poate explica tranzacția.",
      "type": "scenariu",
      "context": "Vrei detalii despre o operațiune personală.",
      "options": [
        {
          "id": "0",
          "label": "Cu orice magazin din apropiere."
        },
        {
          "id": "1",
          "label": "Cu un comentariu anonim despre BNR."
        },
        {
          "id": "2",
          "label": "Cu banca la care ai contul."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-banca-centrala-bnr",
      "paragraphs": [
        "Alex începe un job de vară și caută un cont în care să primească salariul. În aceeași dimineață vede o știre despre o decizie a BNR privind politica monetară. Se gândește că o instituție atât de importantă ar trebui să aibă și un cont pentru studenți. Un coleg îi arată diferența dintre banca centrală și serviciile unei bănci comerciale.",
        "Alex compară apoi două conturi după comisioane, condiții și acces la aplicație. Mai are de plătit o excursie în euro. Vede un curs de referință în știre, dar aplicația băncii îi arată altă ofertă pentru schimbul concret. Nu presupune că una dintre cifre este automat falsă. Verifică ce reprezintă fiecare și costul tranzacției. Știrea despre BNR îl ajută să înțeleagă contextul, iar contractele și ofertele îi explică operațiunile personale."
      ]
    },
    {
      "id": "q5",
      "question": "Ce criterii îl ajută pe Alex să aleagă contul?",
      "explanation": "Comparația conturilor cere date despre produsele efective.",
      "correctFeedback": "Corect. Comparația conturilor cere date despre produsele efective.",
      "incorrectFeedback": "Nu chiar. Comparația conturilor cere date despre produsele efective.",
      "caseId": "caz-banca-centrala-bnr",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Condițiile, comisioanele și serviciile folosite."
        },
        {
          "id": "1",
          "label": "Doar numele BNR din știre."
        },
        {
          "id": "2",
          "label": "Doar popularitatea unui clip."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "De ce poate diferi cursul aplicației de reperul din știre?",
      "explanation": "Verifici ce reprezintă cotația și eventualele costuri.",
      "correctFeedback": "Corect. Verifici ce reprezintă cotația și eventualele costuri.",
      "incorrectFeedback": "Nu chiar. Verifici ce reprezintă cotația și eventualele costuri.",
      "caseId": "caz-banca-centrala-bnr",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Alex primește automat orice curs publicat."
        },
        {
          "id": "1",
          "label": "Oferta de tranzacționare și reperul au funcții diferite."
        },
        {
          "id": "2",
          "label": "Orice diferență dovedește fraudă."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce poate afla din știrea BNR?",
      "explanation": "Știrile generale nu sunt oferte personale sau predicții garantate.",
      "correctFeedback": "Corect. Știrile generale nu sunt oferte personale sau predicții garantate.",
      "incorrectFeedback": "Nu chiar. Știrile generale nu sunt oferte personale sau predicții garantate.",
      "caseId": "caz-banca-centrala-bnr",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Prețul garantat al excursiei de anul viitor."
        },
        {
          "id": "1",
          "label": "Contractul personal al fiecărui student."
        },
        {
          "id": "2",
          "label": "Context despre condițiile monetare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Un curs publicat ca reper nu trebuie confundat cu suma exactă oferită la schimb de orice instituție. O bancă sau o casă de schimb poate avea propriile cotații și costuri. Pentru o tranzacție personală compari oferta efectivă, moneda și comisioanele, nu doar o cifră văzută într-o știre.",
        "Înainte să interpretezi un mesaj despre BNR, întreabă-te dacă vorbește despre politica monetară, despre sistemul bancar sau despre o operațiune a ta. Apoi alegi canalul potrivit. Această separare te ajută să folosești știrile ca informație de context, fără să le transformi în predicții garantate."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Un prieten spune că o decizie BNR garantează ieftinirea telefonului. Ce lipsește?",
      "explanation": "Mai mulți factori influențează prețul unui bun.",
      "correctFeedback": "Corect. Mai mulți factori influențează prețul unui bun.",
      "incorrectFeedback": "Nu chiar. Mai mulți factori influențează prețul unui bun.",
      "type": "scenariu",
      "context": "Ai de evaluat afirmația prietenului.",
      "options": [
        {
          "id": "0",
          "label": "Legătura concretă cu cererea, costurile și prețul acelui produs."
        },
        {
          "id": "1",
          "label": "Doar valoarea noii rate, fără costurile producătorului."
        },
        {
          "id": "2",
          "label": "Doar data deciziei, fără condițiile pieței produsului."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Cum folosești un curs de referință pentru schimb?",
      "explanation": "Reperul nu substituie oferta tranzacției tale.",
      "correctFeedback": "Corect. Reperul nu substituie oferta tranzacției tale.",
      "incorrectFeedback": "Nu chiar. Reperul nu substituie oferta tranzacției tale.",
      "type": "scenariu",
      "context": "Pregătești o plată într-o altă monedă.",
      "options": [
        {
          "id": "0",
          "label": "Ca drept automat la orice ghișeu."
        },
        {
          "id": "1",
          "label": "Ca reper, apoi verifici oferta efectivă și costurile."
        },
        {
          "id": "2",
          "label": "Ca predicție sigură pentru luna viitoare."
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
          "title": "Rol distinct",
          "body": "BNR este banca centrală, nu contul tău curent.",
          "detail": "O știre despre politica monetară oferă context pentru economie. Pentru o problemă cu tranzacția sau contul personal, verifică produsul și contactează banca la care îl folosești.",
          "type": "normal",
          "detailHighlights": [
            "politica monetară",
            "tranzacția"
          ]
        },
        {
          "id": "idee-1",
          "title": "Efecte generale",
          "body": "Politica monetară se transmite prin mai multe mecanisme.",
          "type": "normal",
          "detail": "O schimbare de politică monetară nu ajunge simultan și identic la toate creditele și depozitele.",
          "detailHighlights": [
            "politică monetară",
            "creditele"
          ]
        },
        {
          "id": "idee-2",
          "title": "Tranzacția ta",
          "body": "Verifică oferta efectivă a instituției folosite.",
          "type": "normal",
          "detail": "Banca la care ai cont își publică propriile tarife și condiții. O știre despre BNR nu le înlocuiește.",
          "detailHighlights": [
            "condiții",
            "banca"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Ia o știre despre BNR și separă efectul general descris de operațiunea personală pe care ai vrea să o faci.",
          "type": "action",
          "detail": "Separă în notițe decizia BNR de oferta băncii tale; verifică dacă știrea chiar spune când și cui i se aplică efectul.",
          "detailHighlights": [
            "BNR"
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
