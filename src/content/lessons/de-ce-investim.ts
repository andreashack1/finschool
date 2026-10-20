import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "de-ce-investim",
  "title": "De ce investim",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "bazele",
  "slug": "de-ce-investim",
  "description": "Ana are două sume cu destinații diferite: taxa de peste două luni și un obiectiv pentru peste zece ani.",
  "objective": "Să poți explica de ce investim și să alegi o acțiune justificată în situația prezentată.",
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
  "sourceUrls": [
  {
    "label": "ASF · Ghidul investitorului",
    "url": "https://asfromania.ro/files/ghidul_investitorului.pdf"
  },
  {
    "label": "ASF · Registrul public",
    "url": "https://data.asfromania.ro/registru/registru.php"
  }
],
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "De ce investim",
      "body": "Ana are două sume cu destinații diferite: taxa de peste două luni și un obiectiv pentru peste zece ani."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Investiția folosește resurse acum cu speranța unor beneficii viitoare, asumând riscuri. Poate susține obiective pe termen lung, dar nu garantează câștigul. Economisirea pentru o plată apropiată și investiția nu sunt identice. Inflația poate reduce puterea de cumpărare, însă teama de inflație nu face automat potrivit orice instrument.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce presupune investiția?",
      "explanation": "Beneficii posibile viitoare și risc.",
      "correctFeedback": "Corect. Beneficii posibile viitoare și risc.",
      "incorrectFeedback": "Nu chiar. Beneficii posibile viitoare și risc.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Beneficii posibile viitoare și risc."
        },
        {
          "id": "1",
          "label": "Câștig obligatoriu."
        },
        {
          "id": "2",
          "label": "Acces fără condiții la orice sumă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Un obiectiv pe termen lung garantează că orice investiție va produce profit.",
      "explanation": "Nu investi doar pentru că altcineva arată un câștig. Verifică dacă ai obligații neacoperite și dacă poți suporta o pierdere fără să compromiți plățile necesare. Randamentul posibil trebuie legat de risc și de costuri. Un obiectiv vag, precum vreau mai mulți bani repede, nu descrie singur o strategie de investiție.",
      "correctFeedback": "Corect. Nu investi doar pentru că altcineva arată un câștig. Verifică dacă ai obligații neacoperite și dacă poți suporta o pierdere fără să compromiți plățile necesare. Randamentul posibil trebuie legat de risc și de costuri. Un obiectiv vag, precum vreau mai mulți bani repede, nu descrie singur o strategie de investiție.",
      "incorrectFeedback": "Nu chiar. Nu investi doar pentru că altcineva arată un câștig. Verifică dacă ai obligații neacoperite și dacă poți suporta o pierdere fără să compromiți plățile necesare. Randamentul posibil trebuie legat de risc și de costuri. Un obiectiv vag, precum vreau mai mulți bani repede, nu descrie singur o strategie de investiție.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Ana are bani pentru o taxă peste două luni și un obiectiv separat pentru peste zece ani. Nu pune automat cele două sume în același produs. Pentru taxă contează disponibilitatea la termen; pentru obiectivul lung poate studia instrumente și riscuri. Un orizont mai lung nu garantează profit și nu elimină nevoia unei rezerve accesibile.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Ce criteriu este esențial pentru taxa de peste două luni?",
      "explanation": "Disponibilitatea banilor la termen.",
      "correctFeedback": "Corect. Disponibilitatea banilor la termen.",
      "incorrectFeedback": "Nu chiar. Disponibilitatea banilor la termen.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Numai randamentul maxim."
        },
        {
          "id": "1",
          "label": "Disponibilitatea banilor la termen."
        },
        {
          "id": "2",
          "label": "Doar popularitatea produsului."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ai o obligație apropiată. Ce verifici înainte să investești suma?",
      "explanation": "Accesul și posibilitatea de pierdere.",
      "correctFeedback": "Corect. Accesul și posibilitatea de pierdere.",
      "incorrectFeedback": "Nu chiar. Accesul și posibilitatea de pierdere.",
      "type": "scenariu",
      "context": "Ana are bani pentru o taxă peste două luni și un obiectiv separat pentru peste zece ani. Nu pune automat cele două sume în același produs. Pentru taxă contează disponibilitatea la termen; pentru obiectivul lung poate studia instrumente și riscuri. Un orizont mai lung nu garantează profit și nu elimină nevoia unei rezerve accesibile.",
      "options": [
        {
          "id": "0",
          "label": "Doar rezultatul altcuiva."
        },
        {
          "id": "1",
          "label": "Doar perioada recomandată în reclamă, fără scadența propriei obligații."
        },
        {
          "id": "2",
          "label": "Accesul și posibilitatea de pierdere."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-de-ce-investim",
      "paragraphs": [
        "Ana are două sume cu destinații diferite: taxa de peste două luni și un obiectiv pentru peste zece ani. O reclamă propune același produs pentru toți banii. Ana separă scopurile și verifică accesul și riscul de pierdere. Pentru obiectivul lung începe să studieze instrumente, fără să transforme un randament trecut într-o promisiune pentru viitor.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Ana are bani pentru o taxă peste două luni și un obiectiv separat pentru peste zece ani. Nu pune automat cele două sume în același produs. Pentru taxă contează disponibilitatea la termen; pentru obiectivul lung poate studia instrumente și riscuri. Un orizont mai lung nu garantează profit și nu elimină nevoia unei rezerve accesibile. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "De ce Ana separă cele două sume?",
      "explanation": "Au scopuri și termene diferite.",
      "correctFeedback": "Corect. Au scopuri și termene diferite.",
      "incorrectFeedback": "Nu chiar. Au scopuri și termene diferite.",
      "caseId": "caz-de-ce-investim",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Au scopuri și termene diferite."
        },
        {
          "id": "1",
          "label": "Produsul recomandat tuturor ar trebui să se potrivească oricărui termen."
        },
        {
          "id": "2",
          "label": "Orizontul lung ar elimina nevoia de bani disponibili pentru taxă."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Obiectivul Anei este peste zece ani, dar taxa trebuie plătită în două luni. Ce orizont poate fi studiat separat de disponibilul pentru taxă?",
      "explanation": "Obiectivul de peste zece ani are alt termen decât taxa apropiată. Separarea permite evaluarea riscurilor fără să presupună că un produs se potrivește tuturor banilor.",
      "correctFeedback": "Corect. Obiectivul de peste zece ani are alt termen decât taxa apropiată. Separarea permite evaluarea riscurilor fără să presupună că un produs se potrivește tuturor banilor.",
      "incorrectFeedback": "Nu chiar. Obiectivul de peste zece ani are alt termen decât taxa apropiată. Separarea permite evaluarea riscurilor fără să presupună că un produs se potrivește tuturor banilor.",
      "caseId": "caz-de-ce-investim",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Două luni."
        },
        {
          "id": "1",
          "label": "Peste zece ani."
        },
        {
          "id": "2",
          "label": "O săptămână."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce evită din reclama primită?",
      "explanation": "Același produs ales automat pentru toți banii.",
      "correctFeedback": "Corect. Același produs ales automat pentru toți banii.",
      "incorrectFeedback": "Nu chiar. Același produs ales automat pentru toți banii.",
      "caseId": "caz-de-ce-investim",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Verificarea documentelor."
        },
        {
          "id": "1",
          "label": "Separarea scopurilor."
        },
        {
          "id": "2",
          "label": "Același produs ales automat pentru toți banii."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu investi doar pentru că altcineva arată un câștig. Verifică dacă ai obligații neacoperite și dacă poți suporta o pierdere fără să compromiți plățile necesare. Randamentul posibil trebuie legat de risc și de costuri. Un obiectiv vag, precum vreau mai mulți bani repede, nu descrie singur o strategie de investiție.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Inflația te preocupă. Ce concluzie e corectă?",
      "explanation": "Trebuie comparate riscurile, nu ales orice produs.",
      "correctFeedback": "Corect. Trebuie comparate riscurile, nu ales orice produs.",
      "incorrectFeedback": "Nu chiar. Trebuie comparate riscurile, nu ales orice produs.",
      "type": "scenariu",
      "context": "Ana are bani pentru o taxă peste două luni și un obiectiv separat pentru peste zece ani. Nu pune automat cele două sume în același produs. Pentru taxă contează disponibilitatea la termen; pentru obiectivul lung poate studia instrumente și riscuri. Un orizont mai lung nu garantează profit și nu elimină nevoia unei rezerve accesibile.",
      "options": [
        {
          "id": "0",
          "label": "Trebuie comparate riscurile, nu ales orice produs."
        },
        {
          "id": "1",
          "label": "Orice investiție este sigură."
        },
        {
          "id": "2",
          "label": "Obligațiile apropiate dispar."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Vezi un câștig trecut mare. Ce verifici?",
      "explanation": "Mecanismul, riscul și potrivirea cu scopul.",
      "correctFeedback": "Corect. Mecanismul, riscul și potrivirea cu scopul.",
      "incorrectFeedback": "Nu chiar. Mecanismul, riscul și potrivirea cu scopul.",
      "type": "scenariu",
      "context": "Ana are bani pentru o taxă peste două luni și un obiectiv separat pentru peste zece ani. Nu pune automat cele două sume în același produs. Pentru taxă contează disponibilitatea la termen; pentru obiectivul lung poate studia instrumente și riscuri. Un orizont mai lung nu garantează profit și nu elimină nevoia unei rezerve accesibile.",
      "options": [
        {
          "id": "0",
          "label": "Presupui repetarea garantată."
        },
        {
          "id": "1",
          "label": "Mecanismul, riscul și potrivirea cu scopul."
        },
        {
          "id": "2",
          "label": "Investești fără documente."
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
          "title": "Ideea de bază",
          "body": "Investiția urmărește un beneficiu viitor și presupune riscuri.",
          "detail": "Taxa Anei de peste două luni cere disponibil la un termen apropiat. Obiectivul de peste zece ani poate fi studiat separat, fără să aleagă automat același produs pentru toți banii.",
          "type": "normal",
          "detailHighlights": [
            "termen",
            "banii"
          ]
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Separă banii pentru scopuri apropiate de cei pentru termen lung.",
          "type": "normal",
          "detail": "Banii pentru o taxă apropiată au nevoie de alt acces decât un scop de peste mulți ani.",
          "detailHighlights": [
            "nevoie",
            "acces"
          ]
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Câștigul altcuiva nu justifică singur decizia ta.",
          "type": "normal",
          "detail": "Câștigul altcuiva nu arată dacă produsul se potrivește scopului tău sau dacă poți suporta o pierdere.",
          "detailHighlights": [
            "pierdere"
          ]
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Separă pe hârtie un scop apropiat și unul îndepărtat și notează cerințele de acces ale fiecăruia.",
          "type": "action",
          "detail": "Pentru fiecare scop, scrie termenul și ce s-ar întâmpla dacă suma ar scădea înainte să ai nevoie de ea.",
          "detailHighlights": [
            "termenul",
            "nevoie"
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
