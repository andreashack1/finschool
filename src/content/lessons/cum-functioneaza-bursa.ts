import type { ReadyLesson } from "../../types/learning";

export const lesson: ReadyLesson = {
  "id": "cum-functioneaza-bursa",
  "title": "Cum funcționează bursa",
  "categoryId": "investitii-de-la-zero",
  "chapterId": "instrumente",
  "slug": "cum-functioneaza-bursa",
  "description": "Dan vede ultimul preț de 100 și plasează un ordin limită de cumpărare la 100.",
  "objective": "Să poți explica cum funcționează bursa și să alegi o acțiune justificată în situația prezentată.",
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
      "title": "Cum funcționează bursa",
      "body": "Dan vede ultimul preț de 100 și plasează un ordin limită de cumpărare la 100."
    },
    {
      "id": "explicatie-1",
      "type": "explicatie",
      "title": "Cum funcționează",
      "paragraphs": [
        "Bursa oferă un cadru de tranzacționare în care ordinele de cumpărare și vânzare pot fi potrivite conform regulilor pieței. Accesul se face prin intermediari, care trebuie verificați. Prețul afișat nu garantează executarea oricărei cantități la acel nivel. Lichiditatea, diferența dintre cotații și tipul ordinului influențează tranzacția.",
        "Aici învățăm concepte, fără să alegem un produs pentru situația ta. Înainte de o investiție reală, verifică scopul, termenul, accesul la bani și posibilitatea unei pierderi. O reclamă sau rezultatul altei persoane nu înlocuiește documentele produsului. Banii pentru obligații apropiate au alte cerințe decât un obiectiv îndepărtat."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q1",
      "title": "Uite unde e diferența.",
      "question": "Ce face un ordin limită de cumpărare?",
      "explanation": "Stabilește un preț maxim acceptat.",
      "correctFeedback": "Corect. Stabilește un preț maxim acceptat.",
      "incorrectFeedback": "Nu chiar. Stabilește un preț maxim acceptat.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Stabilește un preț maxim acceptat."
        },
        {
          "id": "1",
          "label": "Garantează orice executare."
        },
        {
          "id": "2",
          "label": "Elimină costurile."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q2",
      "title": "Uite unde e diferența.",
      "question": "Plasarea unui ordin limită garantează executarea lui imediată.",
      "explanation": "Nu confunda plasarea ordinului cu executarea sa. Verifică statusul și confirmarea, precum și costurile intermediarului. Într-o piață cu puține ordine, prețul realizat poate diferi de ultima tranzacție afișată. Autorizația intermediarului trebuie verificată în registrul oficial relevant; un logo ori o aplicație funcțională nu dovedesc singure autorizarea.",
      "correctFeedback": "Corect. Nu confunda plasarea ordinului cu executarea sa. Verifică statusul și confirmarea, precum și costurile intermediarului. Într-o piață cu puține ordine, prețul realizat poate diferi de ultima tranzacție afișată. Autorizația intermediarului trebuie verificată în registrul oficial relevant; un logo ori o aplicație funcțională nu dovedesc singure autorizarea.",
      "incorrectFeedback": "Nu chiar. Nu confunda plasarea ordinului cu executarea sa. Verifică statusul și confirmarea, precum și costurile intermediarului. Într-o piață cu puține ordine, prețul realizat poate diferi de ultima tranzacție afișată. Autorizația intermediarului trebuie verificată în registrul oficial relevant; un logo ori o aplicație funcțională nu dovedesc singure autorizarea.",
      "type": "adevarat_fals",
      "correctAnswer": false
    },
    {
      "id": "explicatie-2",
      "type": "explicatie",
      "title": "Aplică ideea",
      "paragraphs": [
        "Un cumpărător fictiv acceptă cel mult 100 lei, iar un vânzător cere 102. Ordinele nu se potrivesc la aceste limite. Un ordin limită la 100 controlează prețul maxim de cumpărare, dar poate rămâne neexecutat. Un ordin la piață urmărește executarea la prețurile disponibile, fără aceeași limită de preț.",
        "Cifrele sunt ipotetice, iar scenariul nu promite o evoluție viitoare. Separă valoarea investită, schimbarea prețului și costurile. Nu considera o sumă afișată drept numerar deja încasat. Când compari instrumente, verifică și comisioanele, moneda și condițiile vânzării, astfel încât calculul să folosească ipotezele corecte."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q3",
      "title": "Uite unde e diferența.",
      "question": "Cumpărător maximum 100, vânzător minimum 102. Se potrivesc limitele?",
      "explanation": "Nu, există o diferență de 2 lei.",
      "correctFeedback": "Corect. Nu, există o diferență de 2 lei.",
      "incorrectFeedback": "Nu chiar. Nu, există o diferență de 2 lei.",
      "type": "variante",
      "options": [
        {
          "id": "0",
          "label": "Da, obligatoriu la 100."
        },
        {
          "id": "1",
          "label": "Nu, există o diferență de 2 lei."
        },
        {
          "id": "2",
          "label": "Da, obligatoriu la 102."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q4",
      "title": "Uite unde e diferența.",
      "question": "Ai trimis un ordin. Ce verifici?",
      "explanation": "Statusul și confirmarea executării.",
      "correctFeedback": "Corect. Statusul și confirmarea executării.",
      "incorrectFeedback": "Nu chiar. Statusul și confirmarea executării.",
      "type": "scenariu",
      "context": "Un cumpărător fictiv acceptă cel mult 100 lei, iar un vânzător cere 102. Ordinele nu se potrivesc la aceste limite. Un ordin limită la 100 controlează prețul maxim de cumpărare, dar poate rămâne neexecutat. Un ordin la piață urmărește executarea la prețurile disponibile, fără aceeași limită de preț.",
      "options": [
        {
          "id": "0",
          "label": "Doar apăsarea butonului."
        },
        {
          "id": "1",
          "label": "Numai ultimul preț afișat."
        },
        {
          "id": "2",
          "label": "Statusul și confirmarea executării."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "caz-real",
      "type": "caz_real",
      "title": "O alegere din viața reală",
      "caseId": "caz-cum-functioneaza-bursa",
      "paragraphs": [
        "Dan vede ultimul preț de 100 și plasează un ordin limită de cumpărare la 100. Vânzătorul din exercițiu cere 102, așa că ordinul nu se execută. Dan verifică statusul și înțelege diferența dintre cotație și tranzacție. Înainte de folosirea reală a unei aplicații, verifică intermediarul și tarifele, fără să se bazeze numai pe aspectul aplicației.",
        "Pentru a decide, persoana din exemplu folosește următoarea verificare: Un cumpărător fictiv acceptă cel mult 100 lei, iar un vânzător cere 102. Ordinele nu se potrivesc la aceste limite. Un ordin limită la 100 controlează prețul maxim de cumpărare, dar poate rămâne neexecutat. Un ordin la piață urmărește executarea la prețurile disponibile, fără aceeași limită de preț. Alegerea se bazează pe aceste date, fără să presupună un venit suplimentar sau condiții care nu au fost confirmate."
      ]
    },
    {
      "id": "q5",
      "question": "De ce ordinul lui Dan nu se execută în exemplu?",
      "explanation": "Prețul cerut depășește limita sa.",
      "correctFeedback": "Corect. Prețul cerut depășește limita sa.",
      "incorrectFeedback": "Nu chiar. Prețul cerut depășește limita sa.",
      "caseId": "caz-cum-functioneaza-bursa",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Prețul cerut depășește limita sa."
        },
        {
          "id": "1",
          "label": "Ultimul preț de 100 ar trebui să oblige vânzătorul să accepte 100."
        },
        {
          "id": "2",
          "label": "Ordinul limită ar trebui să accepte 102 ca să se execute."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q6",
      "question": "Vânzătorul cere 102 lei, dar ordinul lui Dan are limită 100. Ce preț maxim poate accepta acest ordin fără schimbarea limitei?",
      "explanation": "Limita de cumpărare rămâne 100 lei. Faptul că vânzătorul cere mai mult poate lăsa ordinul neexecutat, fără să mărească automat limita.",
      "correctFeedback": "Corect. Limita de cumpărare rămâne 100 lei. Faptul că vânzătorul cere mai mult poate lăsa ordinul neexecutat, fără să mărească automat limita.",
      "incorrectFeedback": "Nu chiar. Limita de cumpărare rămâne 100 lei. Faptul că vânzătorul cere mai mult poate lăsa ordinul neexecutat, fără să mărească automat limita.",
      "caseId": "caz-cum-functioneaza-bursa",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "102 lei."
        },
        {
          "id": "1",
          "label": "100 lei."
        },
        {
          "id": "2",
          "label": "Orice preț disponibil."
        }
      ],
      "correctOption": "1"
    },
    {
      "id": "q7",
      "question": "Ce verifică pentru aplicația reală?",
      "explanation": "Intermediarul și tarifele.",
      "correctFeedback": "Corect. Intermediarul și tarifele.",
      "incorrectFeedback": "Nu chiar. Intermediarul și tarifele.",
      "caseId": "caz-cum-functioneaza-bursa",
      "type": "scenariu",
      "context": "Aplică ideea în cazul de mai sus.",
      "options": [
        {
          "id": "0",
          "label": "Doar prețul afișat, fără confirmarea și tarifele intermediarului."
        },
        {
          "id": "1",
          "label": "Doar faptul că aplicația funcționează, fără verificarea autorizării."
        },
        {
          "id": "2",
          "label": "Intermediarul și tarifele."
        }
      ],
      "correctOption": "2"
    },
    {
      "id": "explicatie-3",
      "type": "explicatie",
      "title": "Aici e capcana",
      "paragraphs": [
        "Nu confunda plasarea ordinului cu executarea sa. Verifică statusul și confirmarea, precum și costurile intermediarului. Într-o piață cu puține ordine, prețul realizat poate diferi de ultima tranzacție afișată. Autorizația intermediarului trebuie verificată în registrul oficial relevant; un logo ori o aplicație funcțională nu dovedesc singure autorizarea.",
        "Un produs cunoscut poate avea totuși riscuri pe care nu le înțelegi încă. Citește informațiile relevante și verifică intermediarul prin registrul oficial potrivit. Nu trimite bani doar pentru că o persoană promite câștig sigur. Poți amâna o decizie până când poți explica mecanismul și ce ai putea pierde."
      ],
      "finiMood": "thinking"
    },
    {
      "id": "q8",
      "title": "Uite unde e diferența.",
      "question": "Ce risc de preț are ordinul la piață?",
      "explanation": "Executarea la prețuri disponibile diferite de ultima cotație.",
      "correctFeedback": "Corect. Executarea la prețuri disponibile diferite de ultima cotație.",
      "incorrectFeedback": "Nu chiar. Executarea la prețuri disponibile diferite de ultima cotație.",
      "type": "scenariu",
      "context": "Un cumpărător fictiv acceptă cel mult 100 lei, iar un vânzător cere 102. Ordinele nu se potrivesc la aceste limite. Un ordin limită la 100 controlează prețul maxim de cumpărare, dar poate rămâne neexecutat. Un ordin la piață urmărește executarea la prețurile disponibile, fără aceeași limită de preț.",
      "options": [
        {
          "id": "0",
          "label": "Executarea la prețuri disponibile diferite de ultima cotație."
        },
        {
          "id": "1",
          "label": "O limită maximă identică oricând."
        },
        {
          "id": "2",
          "label": "Zero variație garantată."
        }
      ],
      "correctOption": "0"
    },
    {
      "id": "q9",
      "title": "Uite unde e diferența.",
      "question": "Piața are puține ordine. Ce poate varia?",
      "explanation": "Prețul realizat față de ultima tranzacție.",
      "correctFeedback": "Corect. Prețul realizat față de ultima tranzacție.",
      "incorrectFeedback": "Nu chiar. Prețul realizat față de ultima tranzacție.",
      "type": "scenariu",
      "context": "Un cumpărător fictiv acceptă cel mult 100 lei, iar un vânzător cere 102. Ordinele nu se potrivesc la aceste limite. Un ordin limită la 100 controlează prețul maxim de cumpărare, dar poate rămâne neexecutat. Un ordin la piață urmărește executarea la prețurile disponibile, fără aceeași limită de preț.",
      "options": [
        {
          "id": "0",
          "label": "Prețul maxim al ordinului limită se mărește automat."
        },
        {
          "id": "1",
          "label": "Prețul realizat față de ultima tranzacție."
        },
        {
          "id": "2",
          "label": "Ultimul preț afișat garantează orice cantitate la acel nivel."
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
          "body": "Bursa oferă un cadru de tranzacționare în care ordinele de cumpărare și vânzare pot fi potrivite conform regulilor pieței.",
          "detail": "Limita de cumpărare de 100 lei nu se potrivește vânzătorului care cere 102 în exercițiu. Plasarea ordinului nu confirmă executarea; verifică statusul și confirmarea tranzacției.",
          "type": "normal"
        },
        {
          "id": "idee-1",
          "title": "În exemplu",
          "body": "Un cumpărător fictiv acceptă cel mult 100 lei, iar un vânzător cere 102. Ordinele nu se potrivesc la aceste limite.",
          "type": "normal"
        },
        {
          "id": "idee-2",
          "title": "Capcana",
          "body": "Nu confunda plasarea ordinului cu executarea sa.",
          "type": "normal"
        },
        {
          "id": "azi",
          "title": "Ce poți face azi",
          "body": "Simulează două ordine limită și explică de ce unele limite nu se potrivesc.",
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
