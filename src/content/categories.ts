import { CategorySchema } from "../types/learning-schema";

// Existing category IDs and URLs are stable. Titles describe the new curriculum.
export const categories = CategorySchema.array().parse([
  {
    "id": "cum-functioneaza-banii",
    "slug": "cum-functioneaza-banii",
    "title": "Cum funcționează banii",
    "subtitle": "De unde vin banii, ce valoare au și ce vrei să faci cu ei.",
    "icon": "Coins",
    "softColor": "#EAF6FF",
    "difficulty": "usor",
    "order": 1,
    "chapters": [
      {
        "id": "ce-sunt-banii",
        "title": "Ce sunt banii",
        "lessons": [
          "ce-sunt-banii",
          "de-unde-vin-banii",
          "valoarea-banilor-in-timp"
        ]
      },
      {
        "id": "venit-si-cheltuieli",
        "title": "Venit și cheltuieli",
        "lessons": [
          "venit-vs-cheltuieli",
          "active-vs-pasive",
          "costul-de-oportunitate"
        ]
      },
      {
        "id": "obiective-financiare",
        "title": "Obiective financiare",
        "lessons": [
          "ce-vrei-de-la-bani",
          "termen-scurt-vs-termen-lung",
          "independenta-financiara"
        ]
      }
    ]
  },
  {
    "id": "bani-de-zi-cu-zi",
    "slug": "bani-de-zi-cu-zi",
    "title": "Cheltuiești deștept",
    "subtitle": "Cum cumperi inteligent și eviți capcanele din magazine și reclame.",
    "icon": "WalletCards",
    "softColor": "#F0F1FC",
    "difficulty": "usor",
    "order": 2,
    "chapters": [
      {
        "id": "nevoi-si-dorinte",
        "title": "Nevoi și dorințe",
        "lessons": [
          "nevoie-sau-dorinta",
          "cumperi-sau-inchiriezi",
          "costul-real-al-unui-produs"
        ]
      },
      {
        "id": "capcanele-cumparaturilor",
        "title": "Capcanele cumpărăturilor",
        "lessons": [
          "cumparaturile-pe-impuls",
          "regula-48-de-ore",
          "reduceri-care-nu-sunt-reduceri",
          "cum-te-conving-reclamele"
        ]
      },
      {
        "id": "cumperi-inteligent",
        "title": "Cumperi inteligent",
        "lessons": [
          "compara-preturile",
          "abonamentele",
          "iesiri-cu-prietenii-fara-sa-te-golesti"
        ]
      }
    ]
  },
  {
    "id": "carduri-si-banca",
    "slug": "carduri-si-banca",
    "title": "Banca și cardul tău",
    "subtitle": "Cum funcționează contul, cardul și plățile de zi cu zi.",
    "icon": "CreditCard",
    "softColor": "#ECF8FC",
    "difficulty": "usor",
    "order": 3,
    "chapters": [
      {
        "id": "contul-tau",
        "title": "Contul tău",
        "lessons": [
          "ce-face-o-banca",
          "contul-curent",
          "iban",
          "comisioane-bancare"
        ]
      },
      {
        "id": "cardul",
        "title": "Cardul",
        "lessons": [
          "cardul-de-debit",
          "cum-platesti-cu-cardul",
          "cardul-in-strainatate"
        ]
      },
      {
        "id": "bani-in-miscare",
        "title": "Bani în mișcare",
        "lessons": [
          "transferuri-si-plati-instant",
          "aplicatii-bancare",
          "plati-online-in-siguranta"
        ]
      }
    ]
  },
  {
    "id": "siguranta-financiara",
    "slug": "siguranta-financiara",
    "title": "Nu te lăsa păcălit",
    "subtitle": "Înșelătorii online și cum le recunoști la timp.",
    "icon": "ShieldCheck",
    "softColor": "#EEF2FC",
    "difficulty": "usor",
    "order": 4,
    "chapters": [
      {
        "id": "mesaje-si-apeluri-false",
        "title": "Mesaje și apeluri false",
        "lessons": [
          "phishing",
          "apelul-fals-de-la-banca",
          "inselatorii-pe-retele-sociale"
        ]
      },
      {
        "id": "magazine-si-oferte-false",
        "title": "Magazine și oferte false",
        "lessons": [
          "magazine-false",
          "giveaway-uri-false",
          "oferte-prea-bune"
        ]
      },
      {
        "id": "datele-tale",
        "title": "Datele tale",
        "lessons": [
          "protejeaza-datele-cardului",
          "furtul-de-identitate",
          "ce-faci-daca-ai-fost-inselat"
        ]
      }
    ]
  },
  {
    "id": "economii",
    "slug": "economii",
    "title": "Buget și economii",
    "subtitle": "Cum îți faci un buget și strângi bani fără să te privezi.",
    "icon": "PiggyBank",
    "softColor": "#EAF6FF",
    "difficulty": "usor",
    "order": 5,
    "chapters": [
      {
        "id": "bugetul",
        "title": "Bugetul",
        "lessons": [
          "primul-buget",
          "metoda-50-30-20",
          "unde-dispar-banii"
        ]
      },
      {
        "id": "economisirea",
        "title": "Economisirea",
        "lessons": [
          "puterea-economisirii",
          "plateste-te-primul",
          "economisesti-fara-sa-te-privezi"
        ]
      },
      {
        "id": "siguranta-ta-financiara",
        "title": "Siguranța ta financiară",
        "lessons": [
          "fondul-de-urgenta",
          "obiective-de-economisire",
          "cont-de-economii-vs-numerar"
        ]
      }
    ]
  },
  {
    "id": "primul-job",
    "slug": "primul-job",
    "title": "Primul job, primul salariu",
    "subtitle": "Contract, salariu, taxe și ce faci cu primii bani câștigați.",
    "icon": "BriefcaseBusiness",
    "softColor": "#F0F1FC",
    "difficulty": "mediu",
    "order": 6,
    "chapters": [
      {
        "id": "primul-job",
        "title": "Primul job",
        "lessons": [
          "primul-contract-de-munca",
          "munca-part-time-si-student",
          "negocierea-salariului"
        ]
      },
      {
        "id": "salariul",
        "title": "Salariul",
        "lessons": [
          "salariu-brut-vs-net",
          "fluturasul-de-salariu",
          "salariul-minim",
          "tichete-si-beneficii"
        ]
      },
      {
        "id": "taxele",
        "title": "Taxele",
        "lessons": [
          "de-ce-platim-taxe",
          "taxele-pe-salariu",
          "declaratia-unica",
          "angajat-vs-pfa"
        ]
      },
      {
        "id": "dupa-salariu",
        "title": "După salariu",
        "lessons": [
          "primul-salariu"
        ]
      }
    ]
  },
  {
    "id": "pe-cont-propriu",
    "slug": "pe-cont-propriu",
    "title": "Pe cont propriu",
    "subtitle": "Chirie, facturi și cheltuielile mari când te muți singur.",
    "icon": "House",
    "softColor": "#ECF8FC",
    "difficulty": "mediu",
    "order": 7,
    "chapters": [
      {
        "id": "casa-ta",
        "title": "Casa ta",
        "lessons": [
          "mutatul-de-acasa",
          "chirie-si-contract-de-inchiriere",
          "utilitati",
          "cumperi-casa-sau-inchiriezi"
        ]
      },
      {
        "id": "cumparaturi-mari",
        "title": "Cumpărături mari",
        "lessons": [
          "primul-telefon-sau-laptop",
          "costul-real-al-unei-masini",
          "asigurari"
        ]
      },
      {
        "id": "viata-de-zi-cu-zi",
        "title": "Viața de zi cu zi",
        "lessons": [
          "cumparaturile-din-supermarket",
          "vacanta",
          "cheltuieli-neprevazute",
          "banii-intr-o-relatie"
        ]
      }
    ]
  },
  {
    "id": "de-ce-cheltuim-cum-cheltuim",
    "slug": "de-ce-cheltuim-cum-cheltuim",
    "title": "De ce cheltuim cum cheltuim",
    "subtitle": "Cum îți influențează creierul și cei din jur deciziile cu banii.",
    "icon": "Brain",
    "softColor": "#EEF2FC",
    "difficulty": "mediu",
    "order": 8,
    "chapters": [
      {
        "id": "presiunea-din-jur",
        "title": "Presiunea din jur",
        "lessons": [
          "fomo-si-cheltuieli",
          "presiunea-sociala",
          "cum-vorbesti-despre-bani"
        ]
      },
      {
        "id": "creierul-si-banii",
        "title": "Creierul și banii",
        "lessons": [
          "cheltuieli-emotionale",
          "efectul-de-ancorare"
        ]
      },
      {
        "id": "obiceiuri",
        "title": "Obiceiuri",
        "lessons": [
          "gandirea-pe-termen-lung",
          "obiceiuri-bune-cu-banii"
        ]
      }
    ]
  },
  {
    "id": "economia-pe-scurt",
    "slug": "economia-pe-scurt",
    "title": "Cum funcționează economia",
    "subtitle": "Inflație, dobânzi, curs valutar și ce se întâmplă cu banii în țară.",
    "icon": "ChartNoAxesCombined",
    "softColor": "#EAF6FF",
    "difficulty": "mediu",
    "order": 9,
    "chapters": [
      {
        "id": "preturi",
        "title": "Prețuri",
        "lessons": [
          "ce-este-inflatia",
          "de-ce-cresc-preturile",
          "cerere-si-oferta"
        ]
      },
      {
        "id": "dobanzi",
        "title": "Dobânzi",
        "lessons": [
          "ce-este-dobanda",
          "cine-stabileste-dobanzile",
          "ce-face-bnr"
        ]
      },
      {
        "id": "economia-mare",
        "title": "Economia mare",
        "lessons": [
          "pib",
          "somajul",
          "recesiune-si-criza"
        ]
      },
      {
        "id": "valute",
        "title": "Valute",
        "lessons": [
          "cursul-valutar",
          "leul-si-euro"
        ]
      }
    ]
  },
  {
    "id": "credite-si-datorii",
    "slug": "credite-si-datorii",
    "title": "Credite și datorii",
    "subtitle": "Cum funcționează creditele, ce costă și cum eviți capcanele.",
    "icon": "Landmark",
    "softColor": "#F0F1FC",
    "difficulty": "mediu",
    "order": 10,
    "chapters": [
      {
        "id": "bazele-creditului",
        "title": "Bazele creditului",
        "lessons": [
          "ce-este-creditul",
          "dobanda-la-credit-si-dae",
          "scorul-de-credit"
        ]
      },
      {
        "id": "credite-de-zi-cu-zi",
        "title": "Credite de zi cu zi",
        "lessons": [
          "cardul-de-credit",
          "plata-in-rate-si-cumpara-acum-plateste-mai-tarziu",
          "creditele-rapide-ifn"
        ]
      },
      {
        "id": "credite-mari-si-riscuri",
        "title": "Credite mari și riscuri",
        "lessons": [
          "girant-si-garantii",
          "creditul-ipotecar",
          "cum-iesi-din-datorii"
        ]
      }
    ]
  },
  {
    "id": "afaceri-si-venituri-extra",
    "slug": "afaceri-si-venituri-extra",
    "title": "Afaceri și venituri extra",
    "subtitle": "Cum câștigi bani în plus și cum merge o afacere mică.",
    "icon": "Store",
    "softColor": "#ECF8FC",
    "difficulty": "greu",
    "order": 11,
    "chapters": [
      {
        "id": "primii-bani",
        "title": "Primii bani",
        "lessons": [
          "idei-de-venit-side-hustle",
          "freelancing",
          "vinzi-online"
        ]
      },
      {
        "id": "cum-merge-o-afacere",
        "title": "Cum merge o afacere",
        "lessons": [
          "costuri-si-profit",
          "cum-stabilesti-pretul",
          "primii-clienti"
        ]
      },
      {
        "id": "taxe-si-realitate",
        "title": "Taxe și realitate",
        "lessons": [
          "taxele-cand-ai-venit-propriu",
          "esecul-in-afaceri"
        ]
      }
    ]
  },
  {
    "id": "investitii-de-la-zero",
    "slug": "investitii-de-la-zero",
    "title": "Investiții de la zero",
    "subtitle": "Cum funcționează investițiile și ce riscuri au. Educație, nu sfat financiar.",
    "icon": "TrendingUp",
    "softColor": "#EEF2FC",
    "difficulty": "greu",
    "order": 12,
    "chapters": [
      {
        "id": "bazele",
        "title": "Bazele",
        "lessons": [
          "de-ce-investim",
          "risc-si-randament",
          "dobanda-compusa",
          "diversificarea"
        ]
      },
      {
        "id": "instrumente",
        "title": "Instrumente",
        "lessons": [
          "actiuni",
          "obligatiuni-si-titluri-de-stat",
          "etf-uri-si-fonduri",
          "cum-functioneaza-bursa"
        ]
      },
      {
        "id": "atentie-la-capcane",
        "title": "Atenție la capcane",
        "lessons": [
          "investesti-vs-speculezi",
          "crypto-ce-trebuie-sa-stii",
          "piramide-si-scheme-bani-rapizi"
        ]
      },
      {
        "id": "pe-termen-lung",
        "title": "Pe termen lung",
        "lessons": [
          "pensiile-pilonul-2-si-3",
          "cum-incepi-cu-sume-mici",
          "taxe-pe-castigurile-din-investitii"
        ]
      }
    ]
  }
]).sort((a, b) => a.order - b.order);
export const getCategory = (idOrSlug: string) => categories.find(c => c.id === idOrSlug || c.slug === idOrSlug);
