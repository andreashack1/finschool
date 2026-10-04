import type { ReadyLesson } from "../../types/learning";

export const inflationLesson: ReadyLesson = {
  "id": "ce-este-inflatia",
  "slug": "ce-este-inflatia",
  "categoryId": "economia-pe-scurt",
  "chapterId": "preturi",
  "title": "Inflația",
  "description": "Aceiași bani. Mai puține lucruri în coș.",
  "minutes": 5,
  "xp": 30,
  "status": "ready",
  "contentVersion": 2,
  "formatVersion": 2,
  "screens": [
    {
      "id": "snack",
      "type": "situatie",
      "title": "Același baton. Alt preț.",
      "body": "Anul trecut un baton costa 5 lei, iar acum costă 5,50 lei. Observi schimbări și la transport și la cumpărăturile obișnuite. Banii tăi de buzunar au rămas aceiași."
    },
    {
      "id": "concept",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Privește prețurile în general.",
      "paragraphs": [
        "Inflația înseamnă creșterea generală a nivelului prețurilor în timp. Nu este suficient să găsești un singur produs mai scump. Un magazin poate schimba prețul unei haine din multe motive, în timp ce alte produse se ieftinesc.",
        "Ca să înțelegi fenomenul, gândește-te la un coș de bunuri și servicii: mâncare, transport și alte lucruri folosite de oameni. Contează cum se schimbă prețurile privite împreună, nu dacă toate cresc identic. Unele pot rămâne la fel.",
        "Când nivelul general al prețurilor crește, aceeași sumă tinde să cumpere mai puțin. Asta nu înseamnă că bancnotele dispar din portofel. Înseamnă că între suma pe care o ai și lucrurile pe care le poți cumpăra apare o diferență."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "O singură scumpire nu descrie toate prețurile."
      }
    },
    {
      "id": "nivel-general",
      "type": "variante",
      "title": "Un produs sau un fenomen?",
      "question": "Un singur tricou se scumpește. Putem concluziona că există inflație?",
      "options": [
        {
          "id": "1",
          "label": "Da, orice scumpire este suficientă."
        },
        {
          "id": "0",
          "label": "Nu încă; trebuie privite prețurile în general."
        },
        {
          "id": "2",
          "label": "Da, dacă tricoul este popular."
        }
      ],
      "correctOption": "0",
      "explanation": "Inflația privește nivelul general al prețurilor. Un singur produs nu oferă suficiente informații.",
      "correctFeedback": "Inflația privește nivelul general al prețurilor. Un singur produs nu oferă suficiente informații.",
      "incorrectFeedback": "O schimbare izolată nu este suficientă pentru o concluzie despre prețurile în general."
    },
    {
      "id": "putere",
      "type": "variante",
      "title": "Banii din sertar.",
      "question": "Ai 100 lei ținuți într-un sertar un an, iar prețurile cresc în general. Ce s-a întâmplat?",
      "options": [
        {
          "id": "0",
          "label": "Ai mai mulți bani."
        },
        {
          "id": "1",
          "label": "Ai tot 100 lei, dar cumperi mai puțin."
        },
        {
          "id": "2",
          "label": "Nu s-a schimbat nimic."
        }
      ],
      "correctOption": "1",
      "explanation": "Suma rămâne aceeași, dar puterea de cumpărare scade.",
      "correctFeedback": "Suma rămâne aceeași, dar puterea de cumpărare scade.",
      "incorrectFeedback": "Numărul de lei nu se schimbă. Se schimbă cantitatea de lucruri pe care o poți cumpăra."
    },
    {
      "id": "procente",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Suma și puterea ei de cumpărare.",
      "paragraphs": [
        "Puterea de cumpărare descrie ce poți obține cu banii tăi. Dacă venitul rămâne la fel și coșul obișnuit devine mai scump, trebuie să alegi între mai puține lucruri sau o împărțire diferită a bugetului. Suma nominală și valoarea ei practică nu sunt același lucru.",
        "Uite un exemplu matematic: un produs de 20 lei se scumpește cu 10%. Creșterea este de 2 lei, deci noul preț este 22 lei. Acest procent este ipotetic; nu descrie rata actuală a inflației.",
        "Pentru propriul buget, te ajută să compari cheltuieli similare în perioade diferite. Nu presupune că venitul se ajustează automat odată cu prețurile. O schimbare a salariului sau a banilor de buzunar trebuie confirmată separat."
      ],
      "finiMood": "thinking",
      "example": {
        "text": "20 lei × 10% = 2 lei în plus. Noul preț: 22 lei."
      },
      "detail": {
        "text": "Comparațiile sunt mai utile pentru aceeași cantitate și același tip de produs."
      }
    },
    {
      "id": "pret-nou",
      "type": "calcul",
      "title": "Aplici procentul.",
      "context": "Exemplu de calcul.",
      "question": "Un produs costă 20 lei. Prețul crește cu 10%. Cât costă după?",
      "options": [
        {
          "id": "0",
          "value": 20
        },
        {
          "id": "1",
          "value": 22
        },
        {
          "id": "2",
          "value": 30
        }
      ],
      "expectedAnswer": 22,
      "unit": "lei",
      "explanation": "10% din 20 este 2. Adaugi creșterea la prețul inițial și obții 22 lei.",
      "correctFeedback": "10% din 20 este 2. Adaugi creșterea la prețul inițial și obții 22 lei.",
      "incorrectFeedback": "Procentul se aplică la prețul inițial: 2 lei în plus, nu 10 lei în plus."
    },
    {
      "id": "salariu",
      "type": "adevarat_fals",
      "title": "Venitul ține pasul automat?",
      "question": "Dacă prețurile cresc, salariul tău crește automat în același timp.",
      "correctAnswer": false,
      "explanation": "Venitul nu se ajustează automat doar pentru că prețurile au crescut.",
      "correctFeedback": "Venitul nu se ajustează automat doar pentru că prețurile au crescut.",
      "incorrectFeedback": "Creșterea prețurilor și schimbarea venitului sunt lucruri diferite; venitul trebuie verificat separat."
    },
    {
      "id": "caz",
      "type": "caz_real",
      "caseId": "case-inflation-andrei",
      "label": "Caz real",
      "title": "Același buget, alte prețuri.",
      "paragraphs": [
        "Andrei primește 300 lei pe săptămână pentru cheltuielile lui. Luna trecută planifica 80 lei pentru transport, 120 lei pentru mâncare și 60 lei pentru ieșiri. Păstra 40 lei pentru alte nevoi. Acum transportul ajunge la 90 lei, iar cumpărăturile alimentare similare costă 135 lei. Banii primiți săptămânal nu s-au schimbat.",
        "În același timp, un magazin îi arată o pereche de pantofi mai scumpă decât anul trecut. Andrei este tentat să folosească doar acel preț ca dovadă pentru ce se întâmplă în economie. Totuși, schimbările din propriul coș sunt mai utile pentru planul lui decât un produs pe care îl cumpără rar.",
        "Ar vrea să păstreze ieșirile la 60 lei, dar observă că rezerva se micșorează. Poate compara opțiuni similare, poate ajusta frecvența ieșirilor sau poate verifica ce cheltuieli sunt esențiale. Nu trebuie să renunțe automat la tot. Are nevoie de un plan care pornește de la prețurile actuale și de la venitul confirmat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "andrei-putere",
      "type": "scenariu",
      "title": "Ce se schimbă pentru Andrei?",
      "question": "Care concluzie este justificată?",
      "options": [
        {
          "id": "1",
          "label": "Venitul lui a crescut în termeni practici."
        },
        {
          "id": "2",
          "label": "Toate prețurile au crescut identic."
        },
        {
          "id": "0",
          "label": "Banii acoperă mai puțin din coșul lui."
        }
      ],
      "correctOption": "0",
      "explanation": "Același buget acoperă mai puțin din coșul descris. Nu aflăm că toate prețurile au aceeași evoluție.",
      "correctFeedback": "Același buget acoperă mai puțin din coșul descris. Nu aflăm că toate prețurile au aceeași evoluție.",
      "incorrectFeedback": "Prețurile din coș au crescut, nu venitul. Asta reduce ce poate acoperi cu aceeași sumă.",
      "context": "Bugetul rămâne 300 lei, dar transportul și mâncarea costă mai mult.",
      "caseId": "case-inflation-andrei"
    },
    {
      "id": "andrei-plan",
      "type": "scenariu",
      "title": "Un plan care rămâne realist.",
      "question": "Ce pas îi păstrează flexibilitatea?",
      "options": [
        {
          "id": "0",
          "label": "Recalculează rezerva și ajustează ieșirile."
        },
        {
          "id": "1",
          "label": "Păstrează estimările vechi fără verificare."
        },
        {
          "id": "2",
          "label": "Cheltuiește rezerva înainte de plan."
        }
      ],
      "correctOption": "0",
      "explanation": "Recalcularea arată ce mai este disponibil. Ajustările pot fi mici și făcute înainte de cheltuire.",
      "correctFeedback": "Recalcularea arată ce mai este disponibil. Ajustările pot fi mici și făcute înainte de cheltuire.",
      "incorrectFeedback": "Estimările vechi nu mai descriu coșul actual; rezerva trebuie recalculată înainte de alte decizii.",
      "context": "Transportul și mâncarea ajung împreună la 225 lei.",
      "caseId": "case-inflation-andrei"
    },
    {
      "id": "andrei-concluzie",
      "type": "variante",
      "title": "Ce nu știm încă?",
      "question": "Ce NU poate concluziona Andrei doar din prețul pantofilor?",
      "options": [
        {
          "id": "1",
          "label": "Că acea pereche este mai scumpă."
        },
        {
          "id": "2",
          "label": "Că trebuie să verifice alte prețuri."
        },
        {
          "id": "0",
          "label": "Că nivelul general al prețurilor a crescut."
        }
      ],
      "correctOption": "0",
      "explanation": "Un singur produs nu arată evoluția generală. Pentru buget poate observa și compara alte cheltuieli.",
      "correctFeedback": "Un singur produs nu arată evoluția generală. Pentru buget poate observa și compara alte cheltuieli.",
      "incorrectFeedback": "Prețul pantofilor este o informație despre acel produs, nu o măsură suficientă a inflației.",
      "caseId": "case-inflation-andrei"
    },
    {
      "id": "nuante",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Numărul de lei nu spune tot.",
      "paragraphs": [
        "O capcană este să privești doar suma din cont. Poți avea același număr de lei și totuși să observi că acoperi mai puține cumpărături. De aceea, o creștere a venitului nu se analizează doar după număr, ci și în raport cu prețurile relevante.",
        "Altă capcană este să transformi orice scumpire într-o concluzie despre economie. Pentru propria viață, o listă cu cheltuielile obișnuite este utilă. Pentru fenomenul general, ai nevoie de o privire mai largă decât prețul unui singur produs.",
        "Procentele sunt utile dacă știi la ce sumă se aplică. Nu compara prețuri fără să verifici cantitatea sau calitatea produsului. Și nu construi bugetul pe o creștere de venit pe care doar o speri; pornește de la banii confirmați."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Un preț mai mic pentru un ambalaj mai mic nu înseamnă automat o ofertă mai bună."
      }
    },
    {
      "id": "venit-confirmat",
      "type": "adevarat_fals",
      "title": "Un buget dintr-o promisiune?",
      "question": "Poți presupune în buget o creștere de venit doar fiindcă prețurile au crescut.",
      "correctAnswer": false,
      "explanation": "Bugetul pornește de la venit confirmat. Creșterea prețurilor nu confirmă o creștere a venitului.",
      "correctFeedback": "Bugetul pornește de la venit confirmat. Creșterea prețurilor nu confirmă o creștere a venitului.",
      "incorrectFeedback": "O ajustare a venitului trebuie confirmată separat înainte să o folosești în plan."
    },
    {
      "id": "cos-nou",
      "type": "calcul",
      "title": "Coșul din exemplu.",
      "context": "Exemplu de calcul.",
      "question": "Un coș de 100 lei se scumpește cu 10%, într-un exemplu. Cât costă acum?",
      "options": [
        {
          "id": "0",
          "value": 100
        },
        {
          "id": "1",
          "value": 105
        },
        {
          "id": "2",
          "value": 110
        }
      ],
      "expectedAnswer": 110,
      "unit": "lei",
      "explanation": "10% din 100 este 10. Coșul ajunge la 110 lei, fără să se schimbe suma pe care o ai.",
      "correctFeedback": "10% din 100 este 10. Coșul ajunge la 110 lei, fără să se schimbe suma pe care o ai.",
      "incorrectFeedback": "Creșterea de 10 lei se adaugă la cei 100 lei inițiali."
    },
    {
      "id": "tine-minte",
      "type": "tine_minte",
      "title": "Ține minte",
      "finiMood": "happy",
      "items": [
        {
          "id": "punct-1",
          "title": "Prețuri în general",
          "body": "Inflația privește nivelul general al prețurilor. Un singur produs mai scump nu este suficient ca dovadă.",
          "detail": "Privește mai multe bunuri și servicii, nu doar o etichetă.",
          "type": "normal"
        },
        {
          "id": "punct-2",
          "title": "Puterea de cumpărare",
          "body": "Aceeași sumă poate cumpăra mai puțin. Numărul de lei și ce obții cu ei sunt lucruri diferite.",
          "detail": "Compară un coș similar, nu cumpărături complet diferite.",
          "type": "normal"
        },
        {
          "id": "punct-3",
          "title": "Procente cu o bază",
          "body": "Un procent se aplică unei sume inițiale. În exemple, creșterea se adaugă la prețul vechi.",
          "detail": "10% din 20 lei înseamnă 2 lei, nu 10 lei.",
          "type": "normal"
        },
        {
          "id": "punct-4",
          "title": "Venitul se verifică separat",
          "body": "Salariul nu crește automat odată cu prețurile. Un plan realist folosește venitul confirmat.",
          "detail": "Nu cheltui dintr-o ajustare încă neconfirmată.",
          "type": "normal"
        },
        {
          "id": "punct-5",
          "title": "Ce poți face azi",
          "body": "Compară prețul unui produs folosit des cu cel de dinainte. Notează diferența, fără să tragi concluzii despre toate prețurile din acel singur produs.",
          "detail": "Verifică dacă ambalajul și cantitatea sunt aceleași.",
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
