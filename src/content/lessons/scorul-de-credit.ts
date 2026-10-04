import type { ReadyLesson } from "../../types/learning";

export const creditScoreLesson: ReadyLesson = {
  "id": "scorul-de-credit",
  "slug": "scorul-de-credit",
  "categoryId": "credite-si-datorii",
  "chapterId": "bazele-creditului",
  "title": "Scorul de credit",
  "description": "Cum contează comportamentul de plată în timp.",
  "minutes": 5,
  "xp": 30,
  "status": "ready",
  "contentVersion": 2,
  "formatVersion": 2,
  "screens": [
    {
      "id": "situatie",
      "type": "situatie",
      "title": "Un telefon în rate.",
      "body": "Vrei un telefon în rate, iar instituția care analizează cererea cere informații despre venit și obligațiile tale. Nu se uită doar la telefon. Încearcă să înțeleagă cum ar putea fi plătită noua datorie."
    },
    {
      "id": "istoric",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Istoricul este o parte din imagine.",
      "paragraphs": [
        "Istoricul de credit descrie cum ai gestionat obligațiile de plată în trecut. O instituție poate folosi aceste informații ca parte din evaluarea riscului: cât de probabil este ca o datorie să fie plătită în condițiile stabilite. Nu este o etichetă despre valoarea ta ca persoană.",
        "Plata ratelor la timp este un comportament relevant pentru această imagine. Întârzierile și obligațiile neplătite pot spune altceva. Un scor, dacă este folosit, rezumă anumite informații, dar nu trebuie imaginat ca un număr universal care decide singur orice cerere.",
        "Venitul, obligațiile existente și condițiile produsului pot conta în analiza unei cereri. Lecția explică ideea generală, fără formule de scoring sau praguri. Pentru detalii despre un sistem concret, contează informațiile verificate ale instituției."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Un istoric favorabil nu este o promisiune automată de aprobare."
      }
    },
    {
      "id": "evaluare",
      "type": "variante",
      "title": "Ce încearcă să afle instituția?",
      "question": "De ce poate analiza istoricul de credit?",
      "options": [
        {
          "id": "1",
          "label": "Pentru a garanta orice cerere nouă."
        },
        {
          "id": "2",
          "label": "Pentru a decide valoarea ta ca persoană."
        },
        {
          "id": "0",
          "label": "Pentru a evalua riscul de plată."
        }
      ],
      "correctOption": "0",
      "explanation": "Istoricul poate contribui la evaluarea riscului ca obligațiile să fie plătite conform acordului.",
      "correctFeedback": "Istoricul poate contribui la evaluarea riscului ca obligațiile să fie plătite conform acordului.",
      "incorrectFeedback": "Analiza privește obligațiile și riscul de plată, nu valoarea unei persoane sau o aprobare garantată."
    },
    {
      "id": "plata",
      "type": "variante",
      "title": "Ce comportament ajută?",
      "question": "Ce îți ajută istoricul de credit?",
      "options": [
        {
          "id": "0",
          "label": "Plata ratelor la timp."
        },
        {
          "id": "1",
          "label": "Plata cu întârziere."
        },
        {
          "id": "2",
          "label": "Ignorarea obligațiilor existente."
        }
      ],
      "correctOption": "0",
      "explanation": "Plata la timp arată respectarea obligațiilor asumate.",
      "correctFeedback": "Plata la timp arată respectarea obligațiilor asumate.",
      "incorrectFeedback": "Întârzierile sau ignorarea obligațiilor nu au același sens ca plata conform termenelor."
    },
    {
      "id": "obligatii",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "O rată trebuie să încapă în buget.",
      "paragraphs": [
        "Înainte de o obligație nouă, imaginea completă include venitul disponibil și plățile pe care le ai deja. Faptul că o instituție ar accepta o cerere nu înseamnă automat că rata este confortabilă pentru bugetul tău. Costul trebuie privit alături de celelalte nevoi.",
        "Într-un exemplu ai 2.500 lei venit, 1.900 lei cheltuieli curente și o rată existentă de 200 lei. Rămân 400 lei înaintea unei rate noi și a cheltuielilor neprevăzute. O rată nouă de 350 lei ar lăsa doar 50 lei, nu o rezervă mare.",
        "Dacă apare o problemă de plată, un reflex util este să verifici termenul și să contactezi instituția cât mai repede. Nu presupune că ignorarea mesajelor rezolvă situația. Pentru orice ofertă nouă, clarifică suma totală, scadențele și condițiile."
      ],
      "finiMood": "thinking",
      "example": {
        "text": "2.500 − 1.900 − 200 = 400 lei înainte de o rată nouă."
      },
      "detail": {
        "text": "Exemplul este despre buget, nu despre puncte de scoring."
      }
    },
    {
      "id": "termen",
      "type": "scenariu",
      "title": "Termenul este mâine.",
      "question": "Ce pas este util?",
      "options": [
        {
          "id": "0",
          "label": "Verifici plata și contactezi instituția rapid."
        },
        {
          "id": "1",
          "label": "Aștepți fără să verifici termenul."
        },
        {
          "id": "2",
          "label": "Ignori mesajele până luna viitoare."
        }
      ],
      "correctOption": "0",
      "explanation": "Verificarea și comunicarea rapidă pot ajuta la gestionarea situației înainte să se agraveze.",
      "correctFeedback": "Verificarea și comunicarea rapidă pot ajuta la gestionarea situației înainte să se agraveze.",
      "incorrectFeedback": "Amânarea fără verificare nu schimbă obligația sau termenul stabilit.",
      "context": "Ai o rată cu termen mâine și observi o problemă cu plata."
    },
    {
      "id": "aprobare",
      "type": "adevarat_fals",
      "title": "Aprobarea înlocuiește bugetul?",
      "question": "Dacă o cerere este aprobată, rata este automat confortabilă pentru orice buget.",
      "correctAnswer": false,
      "explanation": "Aprobarea și confortul în propriul buget sunt întrebări diferite.",
      "correctFeedback": "Aprobarea și confortul în propriul buget sunt întrebări diferite.",
      "incorrectFeedback": "Trebuie privite și cheltuielile, obligațiile existente și spațiul pentru surprize."
    },
    {
      "id": "caz",
      "type": "caz_real",
      "caseId": "case-credit-radu",
      "label": "Caz real",
      "title": "Radu vrea încă o rată.",
      "paragraphs": [
        "Radu are 21 de ani și un venit disponibil de 2.500 lei pe lună. Cheltuielile obișnuite sunt aproximativ 1.900 lei, iar el mai are o rată de 200 lei. Termenul acestei rate este mâine. Observă că transferul programat ar putea să nu fi fost confirmat și trebuie să verifice situația, nu doar să presupună că totul s-a rezolvat.",
        "În aceeași săptămână găsește un telefon cu o rată lunară prezentată ca fiind 350 lei. Nu a citit încă suma totală de plată, toate condițiile sau durata. Telefonul actual încă funcționează. Oferta este tentantă fiindcă rata izolată pare mică în comparație cu venitul, dar Radu are deja multe cheltuieli.",
        "Poate clarifica plata apropiată și apoi analiza oferta completă. În exemplul de buget, după cheltuieli și rata veche rămân 400 lei. Noua rată ar reduce diferența la 50 lei. Nu știm din acest caz dacă cererea va fi aprobată. Știm doar că o decizie informată are nevoie de condiții complete și de o verificare a bugetului."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "radu-prioritate",
      "type": "scenariu",
      "title": "Ce rezolvă mai întâi?",
      "question": "Care este primul pas util?",
      "options": [
        {
          "id": "1",
          "label": "Trimite imediat o cerere nouă."
        },
        {
          "id": "0",
          "label": "Verifică plata apropiată."
        },
        {
          "id": "2",
          "label": "Presupune că transferul s-a făcut."
        }
      ],
      "correctOption": "0",
      "explanation": "Obligația existentă are un termen apropiat și o problemă concretă de clarificat.",
      "correctFeedback": "Obligația existentă are un termen apropiat și o problemă concretă de clarificat.",
      "incorrectFeedback": "O cerere nouă nu clarifică plata care trebuie verificată acum.",
      "context": "Rata existentă are termen mâine, iar transferul este neclar.",
      "caseId": "case-credit-radu"
    },
    {
      "id": "radu-informatie",
      "type": "variante",
      "title": "Ce lipsește din ofertă?",
      "question": "Ce informație cere înainte să analizeze noua datorie?",
      "options": [
        {
          "id": "0",
          "label": "Costul total, durata și condițiile."
        },
        {
          "id": "1",
          "label": "Doar culoarea telefonului."
        },
        {
          "id": "2",
          "label": "Doar rata lunară afișată."
        }
      ],
      "correctOption": "0",
      "explanation": "Rata lunară izolată nu descrie întreaga obligație. Costul total și condițiile completează comparația.",
      "correctFeedback": "Rata lunară izolată nu descrie întreaga obligație. Costul total și condițiile completează comparația.",
      "incorrectFeedback": "O singură sumă lunară nu spune cât plătește în total și în ce condiții.",
      "caseId": "case-credit-radu"
    },
    {
      "id": "radu-flexibilitate",
      "type": "scenariu",
      "title": "Mai rămâne spațiu?",
      "question": "Ce concluzie este rezonabilă?",
      "options": [
        {
          "id": "1",
          "label": "Aprobarea viitoare este sigură."
        },
        {
          "id": "0",
          "label": "Bugetul ar avea puțin spațiu pentru surprize."
        },
        {
          "id": "2",
          "label": "Istoricul lui nu mai contează."
        }
      ],
      "correctOption": "0",
      "explanation": "Diferența de 50 lei arată un buget strâns în acest exemplu. Nu oferă o predicție despre aprobare.",
      "correctFeedback": "Diferența de 50 lei arată un buget strâns în acest exemplu. Nu oferă o predicție despre aprobare.",
      "incorrectFeedback": "Datele de buget nu garantează o decizie a instituției, dar arată spațiul disponibil pentru alte nevoi.",
      "context": "Noua rată ar lăsa 50 lei după cheltuielile din exemplu.",
      "caseId": "case-credit-radu"
    },
    {
      "id": "nuante",
      "type": "explicatie",
      "eyebrow": "CONCEPT",
      "title": "Nu există o scurtătură magică.",
      "paragraphs": [
        "Un istoric mai bun se construiește în timp prin comportament de plată responsabil. Nu se repară peste noapte doar fiindcă ai făcut o cerere nouă sau ai citit un truc online. Nici nu înseamnă că trebuie să iei credite doar pentru a urmări un scor.",
        "O altă capcană este să ignori termenul fiindcă plata pare mică. Valoarea și data scadenței sunt informații diferite; o sumă mică are tot un termen. Un calendar sau o verificare a plății poate ajuta fără să presupui că orice automatizare funcționează perfect.",
        "Înaintea unei datorii noi, separă două întrebări: ce condiții oferă instituția și ce poate susține bugetul. Nu inventa un număr de puncte sau o regulă universală dintr-o poveste auzită. Pentru sisteme concrete, caută informații verificate."
      ],
      "finiMood": "thinking",
      "detail": {
        "text": "Nu este necesar să iei o datorie doar ca să «construiești un scor»."
      }
    },
    {
      "id": "peste-noapte",
      "type": "adevarat_fals",
      "title": "Se repară peste noapte?",
      "question": "Un istoric de credit slab se repară peste noapte.",
      "correctAnswer": false,
      "explanation": "Comportamentul de plată responsabil se vede în timp, nu printr-o schimbare instantanee.",
      "correctFeedback": "Comportamentul de plată responsabil se vede în timp, nu printr-o schimbare instantanee.",
      "incorrectFeedback": "O promisiune de reparare instantanee nu înlocuiește gestionarea obligațiilor în timp."
    },
    {
      "id": "scor-motiv",
      "type": "variante",
      "title": "Un credit doar pentru scor?",
      "question": "Care reflex este mai util înainte de o datorie nouă?",
      "options": [
        {
          "id": "1",
          "label": "Iei datorii doar pentru un scor."
        },
        {
          "id": "2",
          "label": "Presupui că o rată mică nu are termen."
        },
        {
          "id": "0",
          "label": "Verifici nevoia, condițiile și bugetul."
        }
      ],
      "correctOption": "0",
      "explanation": "Nevoia și capacitatea de plată contează în decizie. Un scor nu este un motiv suficient, izolat.",
      "correctFeedback": "Nevoia și capacitatea de plată contează în decizie. Un scor nu este un motiv suficient, izolat.",
      "incorrectFeedback": "O datorie nouă aduce obligații; nu trebuie tratată doar ca o metodă de schimbare a unui număr."
    },
    {
      "id": "tine-minte",
      "type": "tine_minte",
      "title": "Ține minte",
      "finiMood": "happy",
      "items": [
        {
          "id": "punct-1",
          "title": "Istoric, nu etichetă",
          "body": "Istoricul descrie gestionarea obligațiilor de credit. Nu spune cât valorezi ca persoană.",
          "detail": "Nu presupune că un singur număr universal decide tot.",
          "type": "normal"
        },
        {
          "id": "punct-2",
          "title": "Plata la timp",
          "body": "Termenele fac parte din obligație. Verificarea unei plăți este utilă și când suma pare mică.",
          "detail": "Nu confunda un transfer programat cu unul confirmat.",
          "type": "normal"
        },
        {
          "id": "punct-3",
          "title": "Bugetul contează",
          "body": "O rată nouă se adaugă plăților existente. Aprobarea nu înseamnă automat confort financiar.",
          "detail": "Privește și spațiul rămas pentru nevoi neprevăzute.",
          "type": "normal"
        },
        {
          "id": "punct-4",
          "title": "Detalii verificate",
          "body": "Sistemele și condițiile concrete trebuie verificate. Lecția nu oferă formule, durate sau puncte de scoring inventate.",
          "detail": "Folosește informațiile oficiale ale sistemului și ale instituției.",
          "type": "normal"
        },
        {
          "id": "punct-5",
          "title": "Ce poți face azi",
          "body": "Verifică data unei plăți recurente sau a unei rate pe care o ai. Noteaz-o într-un loc ușor de găsit.",
          "detail": "Dacă nu ai rate, poți folosi un abonament ca exercițiu.",
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
