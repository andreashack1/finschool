import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "magazine-false",
  "title": "Magazine false",
  "categoryId": "siguranta-financiara",
  "chapterId": "magazine-si-oferte-false",
  "slug": "magazine-false",
  "description": "Daria găsește un laptop mult mai ieftin pe un site necunoscut. Pagina are sigle și recenzii, dar cine este comerciantul?",
  "objective": "Să poți observa semnale de risc înainte să introduci datele cardului într-un magazin necunoscut.",
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
      "title": "Magazine false",
      "body": "Daria găsește un laptop mult mai ieftin pe un site necunoscut. Pagina are sigle și recenzii, dar cine este comerciantul?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Un magazin fals poate copia aspectul unui site legitim. Siglele, fotografiile și recenziile afișate nu confirmă singure că există un comerciant verificabil. Înainte să introduci date, caută identitatea operatorului, date de contact coerente și condițiile cumpărării. Verifică adresa exactă a site-ului, nu doar numele din reclamă.",
        "O conexiune protejată ajută transportul datelor, dar nu demonstrează onestitatea celui care controlează pagina. Nu trata simbolul de securitate ca o garanție a livrării. Întrebarea este cine primește informația și banii, nu numai dacă pagina se deschide fără avertisment."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce trebuie identificat înainte de plată?",
      "explanation": "Aspectul paginii nu dovedește identitatea operatorului.",
      "correctFeedback": "Corect. Aspectul paginii nu dovedește identitatea operatorului.",
      "incorrectFeedback": "Nu chiar. Aspectul paginii nu dovedește identitatea operatorului.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Comerciantul și legătura lui cu site-ul exact."
        },
        {
          "id": "1",
          "label": "Doar fotografia produsului."
        },
        {
          "id": "2",
          "label": "Doar numărul de stele."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Conexiunea protejată garantează onestitatea comerciantului.",
      "explanation": "Protecția conexiunii și autenticitatea comerciantului sunt distincte.",
      "correctFeedback": "Corect. Protecția conexiunii și autenticitatea comerciantului sunt distincte.",
      "incorrectFeedback": "Nu chiar. Protecția conexiunii și autenticitatea comerciantului sunt distincte.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Compară oferta cu produse echivalente și caută informații independente despre comerciant. Un preț foarte mic poate avea o explicație, dar cere verificare, mai ales când se combină cu lipsa contactului, presiune și plată dificil de urmărit. Nu concluziona dintr-un singur semn; privește ansamblul informațiilor.",
        "Recenziile pot fi selectate sau inventate. Caută detalii despre experiențe și coerența datelor, fără să consideri un număr de stele suficient. O identitate copiată de la o firmă reală trebuie și ea verificată: există o legătură între acea firmă și site-ul exact pe care vrei să plătești?"
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Prețul mic, contactul neclar și graba apar împreună. Ce faci?",
      "explanation": "Semnalele combinate cer prudență și informații.",
      "correctFeedback": "Corect. Semnalele combinate cer prudență și informații.",
      "incorrectFeedback": "Nu chiar. Semnalele combinate cer prudență și informații.",
      "type": "scenariu",
      "context": "Site-ul este necunoscut.",
      "options": [
        {
          "id": "0",
          "label": "Plătești înainte de verificare."
        },
        {
          "id": "1",
          "label": "Verifici ansamblul și oprești dacă nu poți clarifica."
        },
        {
          "id": "2",
          "label": "Presupui că orice reducere este sigură."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Firma există în realitate. Ce mai lipsește?",
      "explanation": "Identitatea unei firme poate fi copiată.",
      "correctFeedback": "Corect. Identitatea unei firme poate fi copiată.",
      "incorrectFeedback": "Nu chiar. Identitatea unei firme poate fi copiată.",
      "type": "scenariu",
      "context": "Numele ei apare pe pagina de plată.",
      "options": [
        {
          "id": "0",
          "label": "Confirmarea că pagina are conexiune protejată."
        },
        {
          "id": "1",
          "label": "Confirmarea că site-ul folosește adresa unei firme reale."
        },
        {
          "id": "2",
          "label": "Dovada că site-ul aparține acelei firme."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-magazine-false",
      "paragraphs": [
        "Daria caută un laptop pentru facultate și vede o reclamă cu un preț mult sub celelalte oferte. Site-ul are fotografii bune, un simbol de conexiune protejată și recenzii foarte entuziaste. Pagina nu oferă însă date clare despre comerciant, iar contactul este doar un formular. Mesajul insistă că stocul se termină în câteva minute.",
        "Daria caută identitatea operatorului și compară adresa site-ului cu informațiile independente găsite. Observă că numele unei firme reale apare fără o legătură confirmată cu pagina. Nu consideră sigla sau conexiunea o dovadă de livrare. Înainte de datele cardului, verifică produsul, totalul și condițiile. Dacă nu poate clarifica cine primește plata, oprește achiziția. Un coleg care a plătit deja păstrează confirmarea și contactează banca oficial, fără să trimită încă o taxă unei persoane care promite rezolvarea."
      ]
    },
    {
      "id": "q5",
      "question": "Ce semnale observă Daria?",
      "explanation": "Ansamblul cere verificarea operatorului.",
      "correctFeedback": "Corect. Ansamblul cere verificarea operatorului.",
      "incorrectFeedback": "Nu chiar. Ansamblul cere verificarea operatorului.",
      "caseId": "caz-magazine-false",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Date neclare, presiune și preț neobișnuit."
        },
        {
          "id": "1",
          "label": "Numai existența unui laptop."
        },
        {
          "id": "2",
          "label": "Numai o conexiune protejată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "De ce recenziile nu sunt suficiente?",
      "explanation": "Informația independentă completează afirmațiile site-ului.",
      "correctFeedback": "Corect. Informația independentă completează afirmațiile site-ului.",
      "incorrectFeedback": "Nu chiar. Informația independentă completează afirmațiile site-ului.",
      "caseId": "caz-magazine-false",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Stelele arată numai popularitatea produsului, deci verifică și comerciantul."
        },
        {
          "id": "1",
          "label": "Pot fi selectate sau inventate pe pagina controlată."
        },
        {
          "id": "2",
          "label": "Recenziile de pe site sunt suficiente dacă sunt multe."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce alegere păstrează controlul înainte de card?",
      "explanation": "O ofertă nu creează obligație de plată.",
      "correctFeedback": "Corect. O ofertă nu creează obligație de plată.",
      "incorrectFeedback": "Nu chiar. O ofertă nu creează obligație de plată.",
      "caseId": "caz-magazine-false",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Introducerea tuturor datelor din grabă."
        },
        {
          "id": "1",
          "label": "Plata unei taxe pentru verificarea identității."
        },
        {
          "id": "2",
          "label": "Oprirea cumpărării dacă destinatarul nu poate fi clarificat."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Dacă nu poți identifica destinatarul și condițiile, poți opri cumpărarea. O ofertă atractivă nu creează obligația de a continua. Nu plăti o taxă suplimentară neașteptată doar pentru a recupera prima sumă înainte să verifici cererea. Aceasta poate prelungi o pierdere.",
        "Dacă ai introdus date într-un magazin suspect, contactează banca oficial și protejează accesul conform situației. Păstrează oferta și confirmările pentru verificare. Nu te rușina că pagina părea credibilă: copiile sunt construite pentru a convinge. Procesul util este verificarea înainte de plată și reacția documentată după un semnal de risc."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ai plătit, apoi apare o taxă pentru recuperare. Ce verifici?",
      "explanation": "O solicitare nouă poate extinde pierderea.",
      "correctFeedback": "Corect. O solicitare nouă poate extinde pierderea.",
      "incorrectFeedback": "Nu chiar. O solicitare nouă poate extinde pierderea.",
      "type": "scenariu",
      "context": "Destinatarul este încă neclar.",
      "options": [
        {
          "id": "0",
          "label": "Cererea prin canale oficiale înainte de altă plată."
        },
        {
          "id": "1",
          "label": "Presupui că a doua plată repară prima."
        },
        {
          "id": "2",
          "label": "Trimiți parola pentru rambursare."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Ce păstrezi după un semnal de fraudă?",
      "explanation": "Dovezile ajută verificarea și reacția.",
      "correctFeedback": "Corect. Dovezile ajută verificarea și reacția.",
      "incorrectFeedback": "Nu chiar. Dovezile ajută verificarea și reacția.",
      "type": "scenariu",
      "context": "Ai cumpărat pe un site suspect.",
      "options": [
        {
          "id": "0",
          "label": "Doar totalul pierdut, fără legătura cu tranzacția."
        },
        {
          "id": "1",
          "label": "Oferta, confirmarea și conversațiile relevante."
        },
        {
          "id": "2",
          "label": "Doar numele firmei copiate, fără adresa exactă a site-ului."
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
          "title": "Identitate",
          "body": "Verifică operatorul și site-ul exact.",
          "detail": "Numele unei firme reale poate fi copiat pe altă pagină. Caută legătura cu adresa exactă a magazinului; sigla și conexiunea protejată nu confirmă singure comerciantul.",
          "type": "normal",
          "detailHighlights": [
            "conexiunea protejată"
          ]
        },
        {
          "id": "idee-1",
          "title": "Ansamblu",
          "body": "Mai multe semnale se analizează împreună.",
          "type": "normal",
          "detail": "Lipsa datelor firmei, prețul neobișnuit și plata grăbită pot forma împreună un semnal. Un singur indiciu nu decide totul.",
          "detailHighlights": [
            "prețul",
            "plata"
          ]
        },
        {
          "id": "idee-2",
          "title": "Conexiune",
          "body": "Protecția tehnică nu garantează livrarea.",
          "type": "normal",
          "detail": "Lacătul conexiunii protejează transferul datelor, nu promite că magazinul va livra.",
          "detailHighlights": [
            "transferul"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "La un magazin necunoscut, caută identitatea și un contact verificabil înainte să introduci date.",
          "type": "action",
          "detail": "Caută firma și adresa exactă a site-ului în surse separate. Nu te limita la recenziile afișate de vânzător.",
          "detailHighlights": [
            "limita",
            "surse"
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
