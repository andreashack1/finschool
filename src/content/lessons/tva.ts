import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "tva",
  "title": "TVA",
  "categoryId": "cuvintele-banilor",
  "chapterId": "taxe-si-valute",
  "slug": "tva",
  "description": "Pe un bon, Radu vede baza, TVA-ul și totalul. Sunt trei sume de plătit sau trei moduri de a descrie aceeași cumpărătură?",
  "objective": "Să poți recunoaște TVA-ul într-o situație de cumpărare și să înțelegi de ce apare în prețul final.",
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
      "title": "TVA",
      "body": "Pe un bon, Radu vede baza, TVA-ul și totalul. Sunt trei sume de plătit sau trei moduri de a descrie aceeași cumpărătură?"
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "TVA este un impozit legat de consum, care poate fi inclus în prețul unei cumpărături. Un document poate separa valoarea fără TVA de TVA și de total. Nu înseamnă că trebuie să plătești totalul încă o dată peste aceste componente. Într-un exemplu inventat, baza de 100 lei și TVA de 20 lei formează un total de 120 lei.",
        "Aceste cifre sunt doar componente aritmetice pentru exercițiu, fără a afirma o cotă fiscală actuală. Pentru o cumpărătură reală citești documentul și prețul final comunicat, iar pentru reguli actuale folosești informații oficiale verificate."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Baza este 100 lei și TVA înscris 20 lei. Ce total rezultă în exemplu?",
      "explanation": "Totalul componentelor este 100 + 20, fără plată dublă.",
      "correctFeedback": "Corect. Totalul componentelor este 100 + 20, fără plată dublă.",
      "incorrectFeedback": "Nu chiar. Totalul componentelor este 100 + 20, fără plată dublă.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "120 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "220 lei."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "TVA scris separat pe document trebuie plătit încă o dată peste totalul care îl include.",
      "explanation": "Baza și TVA sunt componente ale aceluiași total. Separarea pe document explică suma, nu creează o a doua plată peste total.",
      "correctFeedback": "Corect. Baza și TVA sunt componente ale aceluiași total. Separarea pe document explică suma, nu creează o a doua plată peste total.",
      "incorrectFeedback": "Nu chiar. Baza și TVA sunt componente ale aceluiași total. Separarea pe document explică suma, nu creează o a doua plată peste total.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Când compari oferte, verifică dacă sumele sunt prezentate pe aceeași bază. O ofertă de 100 lei fără TVA și una de 120 lei cu TVA nu se compară direct până nu cunoști totalul efectiv al fiecăreia. Mai pot exista transport sau alte costuri separate, care nu sunt automat explicate de TVA.",
        "Pentru exerciții, poți aduna componentele înscrise pe un bon fără să cunoști din memorie o cotă. Dacă documentul arată bază 80 lei și TVA 16 lei, totalul este 96 lei în exemplul ipotetic. Calculul verifică documentul, nu stabilește legalitatea unei cote fiscale."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cum compari o sumă fără TVA cu una cu TVA inclus?",
      "explanation": "Componentele incluse trebuie să fie aceleași.",
      "correctFeedback": "Corect. Componentele incluse trebuie să fie aceleași.",
      "incorrectFeedback": "Nu chiar. Componentele incluse trebuie să fie aceleași.",
      "type": "scenariu",
      "context": "Ai două oferte pentru același produs.",
      "options": [
        {
          "id": "0",
          "label": "Ignori TVA la prima ofertă."
        },
        {
          "id": "1",
          "label": "Aduci ambele oferte la totalul efectiv comparabil."
        },
        {
          "id": "2",
          "label": "Alegi mereu cifra inițială mai mică."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Oferta A are bază 80 lei și TVA 16 lei. Oferta B are total 96 lei cu TVA inclus. Ce concluzie este justificată înainte de alte costuri?",
      "explanation": "Aducerea ofertelor la aceeași bază arată două totaluri de 96 lei. Abia apoi verifici alte componente, precum transportul.",
      "correctFeedback": "Corect. Aducerea ofertelor la aceeași bază arată două totaluri de 96 lei. Abia apoi verifici alte componente, precum transportul.",
      "incorrectFeedback": "Nu chiar. Aducerea ofertelor la aceeași bază arată două totaluri de 96 lei. Abia apoi verifici alte componente, precum transportul.",
      "type": "scenariu",
      "context": "Verifici numai adunarea componentelor din exercițiu.",
      "options": [
        {
          "id": "0",
          "label": "A este mai ieftină fiindcă cifra inițială este 80."
        },
        {
          "id": "1",
          "label": "B este mai scumpă fiindcă TVA este inclus."
        },
        {
          "id": "2",
          "label": "Totalurile sunt egale: 96 lei pentru fiecare."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-tva",
      "paragraphs": [
        "Radu pregătește o comandă de materiale pentru un proiect studențesc. În acest exemplu ipotetic, un furnizor scrie „100 lei fără TVA” și precizează o componentă TVA de 20 lei. Altul afișează 120 lei cu TVA inclus. Colegii spun că prima ofertă este sigur mai ieftină. Radu citește însă totalurile înainte de a alege.",
        "Primul furnizor mai cere 15 lei transport, iar al doilea oferă ridicare fără cost suplimentar. Totalul primei opțiuni devine 135 lei în exercițiu. Radu nu transformă cifrele inventate într-o regulă fiscală pentru toate produsele. Pe documentul final caută separat baza, TVA și totalul, apoi verifică transportul. Astfel poate explica grupului de ce o sumă fără TVA nu trebuie comparată direct cu un total și de ce costul livrării este o altă componentă."
      ]
    },
    {
      "id": "q5",
      "question": "Ofertele de 100 fără TVA și 120 cu TVA sunt comparabile direct?",
      "explanation": "Titlul ofertei nu înlocuiește suma finală.",
      "correctFeedback": "Corect. Titlul ofertei nu înlocuiește suma finală.",
      "incorrectFeedback": "Nu chiar. Titlul ofertei nu înlocuiește suma finală.",
      "caseId": "caz-tva",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Nu înainte de calcularea totalurilor și costurilor suplimentare."
        },
        {
          "id": "1",
          "label": "Da, fiindcă 100 este mai mic."
        },
        {
          "id": "2",
          "label": "Da, fiindcă transportul nu contează."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Care este totalul primei opțiuni cu transport?",
      "explanation": "100 + 20 + 15 = 135 lei în cazul ipotetic.",
      "correctFeedback": "Corect. 100 + 20 + 15 = 135 lei în cazul ipotetic.",
      "incorrectFeedback": "Nu chiar. 100 + 20 + 15 = 135 lei în cazul ipotetic.",
      "caseId": "caz-tva",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "120 lei."
        },
        {
          "id": "1",
          "label": "135 lei."
        },
        {
          "id": "2",
          "label": "115 lei."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce a identificat Radu separat de TVA?",
      "explanation": "Transportul este un cost distinct în comparație.",
      "correctFeedback": "Corect. Transportul este un cost distinct în comparație.",
      "incorrectFeedback": "Nu chiar. Transportul este un cost distinct în comparație.",
      "caseId": "caz-tva",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Transportul este aceeași componentă cu TVA fiindcă apare pe document."
        },
        {
          "id": "1",
          "label": "Transportul este deja inclus automat în orice preț fără TVA."
        },
        {
          "id": "2",
          "label": "Costul transportului."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu orice diferență de preț dintre două magazine vine din TVA. Pot diferi marja, transportul, serviciile incluse sau produsul însuși. Întâi verifică dacă ofertele privesc același lucru și dacă totalurile includ aceleași componente. O comparație incompletă poate face o ofertă aparent mai mică să coste mai mult la final.",
        "La fel, o sumă de TVA afișată pe document nu este un bacșiș sau o contribuție aleasă de cumpărător. Rolul ei ține de mecanismul fiscal. Dacă documentul nu este clar, cere o explicație despre componente și păstrează dovada cumpărării, fără să inventezi din memorie reguli sau procente."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Două totaluri diferă. Poți explica totul prin TVA?",
      "explanation": "Mai mulți factori pot modifica prețul final.",
      "correctFeedback": "Corect. Mai mulți factori pot modifica prețul final.",
      "incorrectFeedback": "Nu chiar. Mai mulți factori pot modifica prețul final.",
      "type": "scenariu",
      "context": "Compari două magazine.",
      "options": [
        {
          "id": "0",
          "label": "Nu; verifici produsul și toate componentele incluse."
        },
        {
          "id": "1",
          "label": "Da, orice diferență este fiscală."
        },
        {
          "id": "2",
          "label": "Da, transportul este mereu TVA."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Unde cauți o cotă fiscală actuală?",
      "explanation": "Exemplele aritmetice nu sunt surse pentru reguli actuale.",
      "correctFeedback": "Corect. Exemplele aritmetice nu sunt surse pentru reguli actuale.",
      "incorrectFeedback": "Nu chiar. Exemplele aritmetice nu sunt surse pentru reguli actuale.",
      "type": "scenariu",
      "context": "Ai nevoie de o informație fiscală reală.",
      "options": [
        {
          "id": "0",
          "label": "Într-un bon inventat pentru quiz."
        },
        {
          "id": "1",
          "label": "În informații oficiale verificate, nu în cifrele acestui exercițiu."
        },
        {
          "id": "2",
          "label": "Într-o presupunere din reclame."
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
          "title": "Componente",
          "body": "Baza și TVA pot forma totalul afișat.",
          "detail": "În exemplul fictiv, baza de 100 lei și TVA de 20 lei dau 120 lei. Nu adăuga încă o dată TVA peste acel total și verifică separat transportul.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "Comparație",
          "body": "Compară totaluri care includ aceleași costuri.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Exemplu și regulă",
          "body": "Cifrele ipotetice nu stabilesc cote actuale.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Pe un bon pe care îl ai, găsește totalul și componentele TVA, fără să publici date personale.",
          "type": "action"
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
