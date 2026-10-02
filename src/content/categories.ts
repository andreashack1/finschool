import type { Category, Chapter } from "../types/learning";

// Catalog order is curriculum order. Content and readiness live in the registry.
function chapter(categoryId: string, id: string, title: string, lessons: readonly (readonly [string, string])[]): Chapter {
  return { id, title, lessons: lessons.map(([lessonId, lessonTitle]) => ({ id: lessonId, slug: lessonId, categoryId, chapterId: id, title: lessonTitle, description: `O idee practică: ${lessonTitle.toLocaleLowerCase("ro-RO")}`, minutes: 3, xp: 20 })) };
}
export const categories: readonly Category[] = [
  { id: "primul-job", slug: "primul-job", title: "Primul job", description: "Salariu, contract și întrebările bune înainte să accepți.", icon: "BriefcaseBusiness", softColor: "#EAF6FF", status: "active", chapters: [
    chapter("primul-job", "primul-tau-salariu", "Primul tău salariu", [["ce-este-salariul", "Ce este salariul?"], ["salariu-brut-vs-net", "Salariu brut vs. net"], ["ce-intra-in-cont", "Ce intră efectiv în cont?"]]),
    chapter("primul-job", "fluturasul-de-salariu", "Fluturașul de salariu", [["ce-este-fluturasul", "Ce este fluturașul?"], ["taxe-si-contributii", "Taxe și contribuții"], ["cas-si-cass", "CAS și CASS pe înțelesul tău"]]),
    chapter("primul-job", "oferta-de-job", "Oferta de job", [["brut-sau-net", "Brut sau net?"], ["compari-doua-oferte", "Cum compari două oferte"], ["inainte-sa-accepti", "Ce întrebi înainte să accepți?"]]),
    chapter("primul-job", "prima-luna-de-munca", "Prima lună de muncă", [["cand-intra-salariul", "Când intră salariul?"], ["bonusuri-si-beneficii", "Bonusuri și beneficii"], ["primul-salariu", "Ce faci cu primul salariu?"]]),
  ] },
  { id: "bani-de-zi-cu-zi", slug: "bani-de-zi-cu-zi", title: "Bani de zi cu zi", description: "Un plan pentru bani, fără să renunți la tot ce îți place.", icon: "WalletCards", softColor: "#F0F1FC", status: "coming-soon", chapters: [
    chapter("bani-de-zi-cu-zi", "bugetul-tau", "Bugetul tău", [["ce-este-un-buget", "Ce este un buget?"], ["venituri-vs-cheltuieli", "Venituri vs. cheltuieli"], ["fixe-vs-variabile", "Cheltuieli fixe vs. variabile"], ["primul-buget", "Cum îți faci un buget?"]]),
    chapter("bani-de-zi-cu-zi", "alegeri-de-zi-cu-zi", "Alegeri de zi cu zi", [["nevoie-sau-dorinta", "Nevoie sau dorință?"], ["costul-abonamentului", "Cât costă de fapt un abonament?"], ["regula-48-de-ore", "Regula celor 48 de ore"]]),
    chapter("bani-de-zi-cu-zi", "planificare", "Planificare", [["planul-lunii", "Cum îți planifici o lună"], ["ramai-fara-bani", "De ce rămâi fără bani?"], ["setezi-o-limita", "Cum îți setezi o limită"]]),
  ] },
  { id: "carduri-si-banca", slug: "carduri-si-banca", title: "Carduri & bancă", description: "Conturi, carduri și transferuri explicate simplu.", icon: "CreditCard", softColor: "#ECF8FC", status: "coming-soon", chapters: [
    chapter("carduri-si-banca", "primul-tau-cont", "Primul tău cont", [["cont-bancar", "Ce este un cont bancar?"], ["iban", "Ce este IBAN-ul?"], ["ce-este-un-card", "Ce este un card?"]]),
    chapter("carduri-si-banca", "cum-functioneaza-cardul", "Cum funcționează cardul", [["card-debit-vs-credit", "Debit vs. credit"], ["contactless", "Contactless, pe scurt"], ["retrageri-numerar", "Retrageri de numerar"]]),
    chapter("carduri-si-banca", "transferuri", "Transferuri", [["trimiti-bani", "Cum trimiți bani?"], ["transfer-instant", "Ce este un transfer instant?"], ["verifici-transferul", "Ce verifici înainte să trimiți?"]]),
  ] },
  { id: "economii", slug: "economii", title: "Economii", description: "Pași mici pentru planurile tale mari.", icon: "PiggyBank", softColor: "#EDF8F4", status: "coming-soon", chapters: [
    chapter("economii", "incepe-sa-economisesti", "Începe să economisești", [["de-ce-economisim", "De ce economisim?"], ["prima-tinta", "Prima ta țintă"], ["plateste-te-primul", "Plătește-te pe tine primul"]]),
    chapter("economii", "fond-de-siguranta", "Fond de siguranță", [["ce-este-fondul", "Ce este fondul de siguranță?"], ["cat-pui-deoparte", "Cât ar trebui să ai?"], ["cand-folosesti-fondul", "Când îl folosești?"]]),
    chapter("economii", "dobanda", "Dobânda", [["ce-este-dobanda", "Ce este dobânda?"], ["dobanda-simpla", "Dobândă simplă"], ["dobanda-compusa", "Dobândă compusă, explicată simplu"]]),
  ] },
  { id: "siguranta-financiara", slug: "siguranta-financiara", title: "Siguranță financiară", description: "Recunoști capcanele înainte să dai click.", icon: "ShieldCheck", softColor: "#FAF1EF", status: "coming-soon", chapters: [
    chapter("siguranta-financiara", "scam-uri", "Scam-uri", [["semne-scam", "Semnele unui scam"], ["mesaje-false", "Mesaje false"], ["oferte-prea-bune", "Oferte prea bune"]]),
    chapter("siguranta-financiara", "cardul-tau", "Cardul tău", [["pin", "PIN-ul e doar al tău"], ["cvv", "Ce este CVV-ul?"], ["date-private", "Ce nu dai niciodată altcuiva"]]),
    chapter("siguranta-financiara", "online", "Online", [["phishing", "Phishing, fără jargon"], ["magazine-false", "Magazine false"], ["bani-trimisi-gresit", "Ce faci dacă ai trimis bani greșit?"]]),
  ] },
  { id: "economia-pe-scurt", slug: "economia-pe-scurt", title: "Economia pe scurt", description: "Prețuri, inflație și idei mari în explicații mici.", icon: "ChartNoAxesCombined", softColor: "#EEF2FC", status: "active", chapters: [
    chapter("economia-pe-scurt", "preturile-se-schimba", "De ce se schimbă prețurile?", [["ce-este-inflatia", "Ce este inflația?"], ["de-ce-cresc-preturile", "De ce cresc prețurile?"], ["puterea-de-cumparare", "Puterea de cumpărare"]]),
    chapter("economia-pe-scurt", "cum-se-formeaza-preturile", "Cum se formează prețurile?", [["cerere-si-oferta", "Cerere și ofertă"], ["produs-mai-scump", "De ce un produs devine mai scump?"], ["toata-lumea-vrea", "Când toată lumea vrea același lucru"]]),
    chapter("economia-pe-scurt", "economia-mare", "Economia mare, explicată simplu", [["pib", "Ce este PIB-ul?"], ["recesiune", "Ce este o recesiune?"], ["de-ce-conteaza-dobanzile", "De ce contează dobânzile?"]]),
    chapter("economia-pe-scurt", "banii-in-economie", "Banii în economie", [["cine-creeaza-banii", "Cine creează banii?"], ["ce-face-bnr", "Ce face BNR?"], ["dobanda-se-schimba", "De ce se schimbă dobânda?"]]),
  ] },
];
export const getCategory = (idOrSlug: string) => categories.find(c => c.id === idOrSlug || c.slug === idOrSlug);
