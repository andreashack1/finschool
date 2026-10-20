import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cum-te-conving-reclamele",
  "title": "Cum te conving reclamele",
  "categoryId": "bani-de-zi-cu-zi",
  "chapterId": "capcanele-cumparaturilor",
  "slug": "cum-te-conving-reclamele",
  "description": "Sofia vede un creator preferat promovând un produs cu mesajul „toată lumea îl are”. Ce informație primește și ce emoție i se activează?",
  "objective": "Să poți recunoaște câteva tehnici prin care reclamele cresc dorința de a cumpăra fără să presupui că orice reclamă este înșelătoare.",
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
      "title": "Cum te conving reclamele",
      "body": "Sofia vede un creator preferat promovând un produs cu mesajul „toată lumea îl are”. Ce informație primește și ce emoție i se activează?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Reclamele prezintă produse și încearcă să influențeze atenția și decizia. Pot oferi informații utile, dar aleg ce pun în prim-plan. Dovada socială, precum „popular printre studenți”, poate sugera că alegerea grupului este relevantă. Popularitatea nu arată însă automat compatibilitatea cu nevoia ta sau calitatea produsului.",
        "O altă tehnică este asocierea cu o persoană apreciată. Dacă îți place creatorul, aprecierea se poate transfera asupra obiectului. Separă relația cu persoana de informația despre produs. Întreabă-te ce beneficiu concret este demonstrat și ce parte este doar atmosfera mesajului."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "„Mulți studenți îl folosesc” pune accent pe ce?",
      "explanation": "Popularitatea poate influența alegerea fără a demonstra potrivirea.",
      "correctFeedback": "Corect. Popularitatea poate influența alegerea fără a demonstra potrivirea.",
      "incorrectFeedback": "Nu chiar. Popularitatea poate influența alegerea fără a demonstra potrivirea.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Dovadă socială."
        },
        {
          "id": "1",
          "label": "Compatibilitate demonstrată cu orice dispozitiv."
        },
        {
          "id": "2",
          "label": "Garanția celui mai mic preț."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "O reclamă care folosește emoții este automat falsă.",
      "explanation": "Tehnica de persuasiune și adevărul afirmației sunt verificări diferite.",
      "correctFeedback": "Corect. Tehnica de persuasiune și adevărul afirmației sunt verificări diferite.",
      "incorrectFeedback": "Nu chiar. Tehnica de persuasiune și adevărul afirmației sunt verificări diferite.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Raritatea și urgența pot reduce timpul dedicat comparației. Un mesaj precum „stoc limitat” poate descrie o situație reală sau poate pune accent pe presiune. În ambele cazuri, verifici totalul, utilitatea și condițiile înainte de a cumpăra. Faptul că oferta expiră nu face produsul obligatoriu pentru tine.",
        "O demonstrație poate fi mai utilă decât un slogan, dar și ea poate selecta un context favorabil. Caută dacă utilizarea prezentată seamănă cu a ta. Pentru un obiect tehnic, verifică specificații și compatibilitate; pentru un serviciu, verifică exact ce este inclus și ce trebuie plătit separat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Un creator apreciat recomandă un produs. Ce separi?",
      "explanation": "Popularitatea persoanei nu înlocuiește verificarea funcției.",
      "correctFeedback": "Corect. Popularitatea persoanei nu înlocuiește verificarea funcției.",
      "incorrectFeedback": "Nu chiar. Popularitatea persoanei nu înlocuiește verificarea funcției.",
      "type": "scenariu",
      "context": "Îți place creatorul, dar nu cunoști obiectul.",
      "options": [
        {
          "id": "0",
          "label": "Popularitatea persoanei de durata ofertei, fără a verifica produsul."
        },
        {
          "id": "1",
          "label": "Aprecierea persoanei de dovezile despre produs."
        },
        {
          "id": "2",
          "label": "Prețul de funcție, presupunând că aprecierea creatorului este o dovadă tehnică."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Un cronometru te grăbește. Ce verifici?",
      "explanation": "Urgența nu transformă oferta într-o nevoie.",
      "correctFeedback": "Corect. Urgența nu transformă oferta într-o nevoie.",
      "incorrectFeedback": "Nu chiar. Urgența nu transformă oferta într-o nevoie.",
      "type": "scenariu",
      "context": "Nu căutai produsul anterior.",
      "options": [
        {
          "id": "0",
          "label": "Doar timpul rămas."
        },
        {
          "id": "1",
          "label": "Dacă poți cumpăra fără citire."
        },
        {
          "id": "2",
          "label": "Utilitatea, totalul și condițiile înainte de plată."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cum-te-conving-reclamele",
      "paragraphs": [
        "Sofia urmărește un creator care prezintă un accesoriu pentru telefon. Clipul spune că produsul este folosit de mulți studenți și că oferta se termină în acea seară. Creatorul îl folosește cu un model de telefon diferit de al Sofiei. Ea apreciază clipurile lui și aproape apasă pe cumpărare fără să verifice compatibilitatea.",
        "Sofia pune mesajul într-o formă neutră: accesoriul are un preț, o funcție promisă și anumite condiții. Observă separat popularitatea, persoana apreciată și urgența. Caută apoi specificațiile, costul transportului și informații despre utilizarea cu telefonul ei. Nu declară reclama automat falsă, dar nici nu transformă aprecierea creatorului într-o dovadă tehnică. Dacă produsul nu se potrivește dispozitivului, mesajul entuziast nu rezolvă problema. Dacă se potrivește și încape în buget, poate lua o decizie informată."
      ]
    },
    {
      "id": "q5",
      "question": "Ce informație lipsește Sofiei?",
      "explanation": "Demonstrația cu alt model nu răspunde situației ei.",
      "correctFeedback": "Corect. Demonstrația cu alt model nu răspunde situației ei.",
      "incorrectFeedback": "Nu chiar. Demonstrația cu alt model nu răspunde situației ei.",
      "caseId": "caz-cum-te-conving-reclamele",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Compatibilitatea cu telefonul ei."
        },
        {
          "id": "1",
          "label": "Numărul exact de urmăritori."
        },
        {
          "id": "2",
          "label": "Preferința tuturor colegilor."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Ce tehnici apar împreună în clip?",
      "explanation": "Mai multe influențe pot apărea în același mesaj.",
      "correctFeedback": "Corect. Mai multe influențe pot apărea în același mesaj.",
      "incorrectFeedback": "Nu chiar. Mai multe influențe pot apărea în același mesaj.",
      "caseId": "caz-cum-te-conving-reclamele",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Numai un calcul neutru."
        },
        {
          "id": "1",
          "label": "Popularitate, persoană apreciată și urgență."
        },
        {
          "id": "2",
          "label": "Numai informații despre garanție."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce verificare poate schimba decizia în mod concret?",
      "explanation": "Datele despre produs completează mesajul comercial.",
      "correctFeedback": "Corect. Datele despre produs completează mesajul comercial.",
      "incorrectFeedback": "Nu chiar. Datele despre produs completează mesajul comercial.",
      "caseId": "caz-cum-te-conving-reclamele",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar utilizarea demonstrată pe alt telefon, fără compatibilitatea cu al ei."
        },
        {
          "id": "1",
          "label": "Doar entuziasmul comentariilor."
        },
        {
          "id": "2",
          "label": "Specificațiile și costul total al utilizării."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Recunoașterea unei tehnici nu dovedește singură că reclama este falsă. Un produs bun poate fi promovat prin emoții și dovadă socială. Scopul tău este să identifici influența și să o completezi cu informații independente, nu să respingi automat orice mesaj comercial sau orice recomandare.",
        "Poți reformula reclama într-o propoziție neutră: „produsul costă această sumă și promite această funcție”. Apoi notezi ce poți verifica. Dacă fără muzică, creator și cronometru oferta nu mai pare potrivită, ai găsit o influență importantă asupra deciziei. Tot tu alegi, după ce înțelegi mesajul."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Cum reformulezi util reclama?",
      "explanation": "O formulare neutră separă informația de atmosferă.",
      "correctFeedback": "Corect. O formulare neutră separă informația de atmosferă.",
      "incorrectFeedback": "Nu chiar. O formulare neutră separă informația de atmosferă.",
      "type": "scenariu",
      "context": "Vrei să evaluezi oferta fără presiune.",
      "options": [
        {
          "id": "0",
          "label": "Prețul, funcția promisă și condițiile verificabile."
        },
        {
          "id": "1",
          "label": "Creatorul este simpatic, deci produsul este necesar."
        },
        {
          "id": "2",
          "label": "Orice reclamă trebuie ignorată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Produsul este potrivit după verificare. Ce concluzie e rezonabilă?",
      "explanation": "Persuasiunea nu impune rezultatul deciziei.",
      "correctFeedback": "Corect. Persuasiunea nu impune rezultatul deciziei.",
      "incorrectFeedback": "Nu chiar. Persuasiunea nu impune rezultatul deciziei.",
      "type": "scenariu",
      "context": "Ai confirmat compatibilitatea și totalul.",
      "options": [
        {
          "id": "0",
          "label": "Trebuie respins fiindcă are reclamă."
        },
        {
          "id": "1",
          "label": "Poți decide pe baza datelor și bugetului."
        },
        {
          "id": "2",
          "label": "Trebuie cumpărat fiindcă este popular."
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
          "title": "Observă tehnica",
          "body": "Popularitatea, asocierea și urgența pot influența.",
          "detail": "Creatorul poate demonstra produsul cu un telefon diferit de al tău. Aprecierea lui nu confirmă compatibilitatea; verifică specificațiile și costurile pentru utilizarea ta.",
          "type": "normal",
          "detailHighlights": [
            "compatibilitatea",
            "utilizarea"
          ]
        },
        {
          "id": "idee-1",
          "title": "Separă dovezile",
          "body": "Creatorul apreciat nu garantează potrivirea.",
          "type": "normal",
          "detail": "Un creator poate primi bani pentru promovare și poate avea alte nevoi decât tine. Caută specificațiile separat.",
          "detailHighlights": [
            "promovare",
            "bani"
          ]
        },
        {
          "id": "idee-2",
          "title": "Reformulează",
          "body": "Pune oferta în termeni neutri și verificabili.",
          "type": "normal",
          "detail": "Transformă «ofertă incredibilă» în întrebări despre preț, compatibilitate și costuri. Așa rămân lucruri pe care le poți verifica.",
          "detailHighlights": [
            "costuri",
            "preț"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Alege o reclamă și notează o tehnică de persuasiune și o informație pe care ai verifica-o separat.",
          "type": "action",
          "detail": "Alege un fapt din reclamă și caută-l în documentația produsului, fără să pornești de la linkul de cumpărare.",
          "detailHighlights": [
            "produsului"
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
