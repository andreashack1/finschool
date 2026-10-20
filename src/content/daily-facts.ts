import { isDateKey } from '../lib/bucharest-date';

export interface DailyFinlyFact {
  readonly id: string;
  readonly categoryId: string;
  readonly lessonId: string;
  readonly text: string;
}

// Editorial order rotates topics; keep IDs stable when revising wording.
export const dailyFinlyFacts: readonly DailyFinlyFact[] = [
  { id: 'salary-net', categoryId: 'primul-job', lessonId: 'salariu-brut-vs-net', text: 'Un salariu de 5.000 lei brut nu înseamnă 5.000 lei în cont. Din brut se scad taxe și contribuții.' },
  { id: 'iban-account', categoryId: 'carduri-si-banca', lessonId: 'iban', text: 'IBAN-ul identifică un cont, nu cardul din portofel. Poți primi bani în cont fără să trimiți PIN-ul sau codul de confirmare.' },
  { id: 'small-daily', categoryId: 'de-ce-cheltuim-cum-cheltuim', lessonId: 'cheltuieli-mici-care-se-aduna', text: 'O cheltuială de 10 lei pe zi ajunge la 300 lei în 30 de zile. Repetarea poate conta mai mult decât prețul unei singure cumpărături.' },
  { id: 'emergency-access', categoryId: 'economii', lessonId: 'fondul-de-urgenta', text: 'Banii pentru urgențe au nevoie să fie ușor de accesat. O sumă blocată când ai nevoie de ea nu te ajută să plătești o reparație azi.' },
  { id: 'phishing-urgency', categoryId: 'siguranta-financiara', lessonId: 'phishing', text: 'Un mesaj care te grăbește să „salvezi contul” poate fi chiar capcana. Poți verifica situația deschizând separat aplicația băncii.' },
  { id: 'inflation-basket', categoryId: 'cuvintele-banilor', lessonId: 'ce-este-inflatia', text: 'Inflația nu înseamnă că toate prețurile cresc la fel. Coșul tău de cumpărături poate deveni mai scump într-un ritm diferit de media anunțată.' },
  { id: 'salary-benefits', categoryId: 'primul-job', lessonId: 'tichete-si-beneficii', text: 'Două oferte cu același salariu pot avea beneficii diferite. Un beneficiu cu reguli de folosire nu este întotdeauna echivalent cu aceeași sumă în numerar.' },
  { id: 'debit-own', categoryId: 'carduri-si-banca', lessonId: 'cardul-de-debit', text: 'Cardul de debit este o cale de acces la banii din cont. Cardul și contul nu sunt același lucru.' },
  { id: 'subscription-year', categoryId: 'bani-de-zi-cu-zi', lessonId: 'abonamentele', text: 'Un abonament de 25 lei pe lună înseamnă 300 lei pe an. Mai multe plăți mici pot ocupa împreună o parte serioasă din buget.' },
  { id: 'goal-monthly', categoryId: 'economii', lessonId: 'obiective-de-economisire', text: 'Un obiectiv de 600 lei în șase luni înseamnă 100 lei puși deoparte lunar. Termenul transformă o dorință într-o sumă concretă de planificat.' },
  { id: 'bank-call', categoryId: 'siguranta-financiara', lessonId: 'apelul-fals-de-la-banca', text: 'Numele afișat la un apel nu dovedește cine sună. Poți închide și suna tu banca la numărul din aplicație sau de pe card.' },
  { id: 'interest-direction', categoryId: 'cuvintele-banilor', lessonId: 'dobanda', text: 'Dobânda poate fi un cost când împrumuți bani și un venit când economisești. Contează de care parte a împrumutului te afli.' },
  { id: 'first-payday', categoryId: 'primul-job', lessonId: 'ce-faci-cu-primul-salariu', text: 'Primul salariu trebuie să acopere și zilele de până la următorul. Soldul din ziua plății nu este tot bugetul disponibil pentru cumpărături.' },
  { id: 'statement-small', categoryId: 'carduri-si-banca', lessonId: 'extrasul-de-cont', text: 'Extrasul de cont păstrează și plățile mici pe care le-ai uitat. Privite împreună, ele pot explica de ce soldul pare să scadă „singur”.' },
  { id: 'discount-unused', categoryId: 'bani-de-zi-cu-zi', lessonId: 'reduceri-care-nu-sunt-reduceri', text: 'O reducere nu îți economisește bani dacă te face să cumperi ceva de care nu aveai nevoie. Chiar și la jumătate de preț, tot cheltuiești.' },
  { id: 'compound-base', categoryId: 'economii', lessonId: 'dobanda-compusa', text: 'La dobânda compusă, dobânda rămasă în economii poate produce la rândul ei dobândă. Baza de calcul crește fără să fie nevoie să depui de fiecare dată bani noi.' },
  { id: 'fake-store', categoryId: 'siguranta-financiara', lessonId: 'magazine-false', text: 'Lacătul din browser arată că legătura este criptată, nu că magazinul este cinstit. Și un site fals poate avea o conexiune securizată.' },
  { id: 'currency-cost', categoryId: 'cuvintele-banilor', lessonId: 'cursul-valutar-si-euro', text: 'Cursul de schimb și comisionul pot schimba împreună costul unei conversii. Cursul afișat singur nu spune întotdeauna câți lei vei plăti.' },
  { id: 'contract-read', categoryId: 'primul-job', lessonId: 'primul-contract-de-munca', text: 'Promisiunea dintr-un interviu nu înlocuiește contractul. Salariul, programul și condițiile merită verificate în documentul pe care îl semnezi.' },
  { id: 'fees-use', categoryId: 'carduri-si-banca', lessonId: 'comisioane-bancare', text: 'Un cont fără taxă de administrare poate avea alte comisioane. Retragerile sau transferurile pe care le faci des pot conta mai mult decât numele ofertei.' },
  { id: 'unit-price', categoryId: 'pe-cont-propriu', lessonId: 'cheltuielile-din-supermarket', text: 'Ambalajul mai mare nu este automat mai avantajos. Prețul pe kilogram sau pe litru te ajută să compari cantități diferite.' },
  { id: 'save-first', categoryId: 'economii', lessonId: 'plateste-te-pe-tine-primul', text: 'Dacă pui economiile deoparte când primești banii, nu mai depinzi doar de ce rămâne la final. Și o sumă mică poate avea un loc stabil în buget.' },
  { id: 'card-secret', categoryId: 'siguranta-financiara', lessonId: 'protejeaza-datele-cardului', text: 'Ca să primești bani, nu trebuie să autorizezi o plată către altcineva. Un cod de confirmare poate aproba o operațiune, nu doar să îți verifice identitatea.' },
  { id: 'demand-price', categoryId: 'cuvintele-banilor', lessonId: 'cerere-si-oferta', text: 'Când mulți oameni vor același produs rar, prețul poate crește. Prețul mare nu dovedește singur că produsul este mai bun.' },
  { id: 'salary-slip', categoryId: 'primul-job', lessonId: 'fluturasul-de-salariu', text: 'Fluturașul de salariu explică drumul de la brut la net. Suma din cont este rezultatul calculului, nu toate informațiile despre salariul tău.' },
  { id: 'credit-limit', categoryId: 'credite-si-datorii', lessonId: 'cardul-de-credit', text: 'Limita unui card de credit nu este o economie a ta. Este o sumă împrumutată, care trebuie rambursată după regulile contractului.' },
  { id: 'real-cost', categoryId: 'bani-de-zi-cu-zi', lessonId: 'costul-real-al-unui-produs', text: 'Prețul unui produs poate fi doar începutul costului. Consumabilele, transportul și întreținerea pot schimba comparația dintre două oferte.' },
  { id: 'deposit-access', categoryId: 'economii', lessonId: 'unde-tii-banii-cont-depozit-numerar', text: 'Un depozit și un cont curent au roluri diferite. Înainte să alegi dobânda mai mare, verifică ce se întâmplă dacă retragi banii mai devreme.' },
  { id: 'fake-delivery', categoryId: 'siguranta-financiara', lessonId: 'anunturi-si-livrari-false', text: 'Un link de „încasare” trimis de un cumpărător poate ascunde o plată din contul tău. Verifică în aplicația oficială, fără să introduci datele cardului în link.' },
  { id: 'assets-debts', categoryId: 'cuvintele-banilor', lessonId: 'ce-detii-si-ce-datorezi', text: 'Soldul din cont nu arată singur situația ta financiară. Datoriile rămân de luat în calcul chiar dacă încă ai bani disponibili.' },
  { id: 'loan-total', categoryId: 'credite-si-datorii', lessonId: 'rata-lunara-si-costul-total', text: 'O rată lunară mai mică poate ascunde o perioadă mai lungă de plată. Compară și totalul rambursat, nu doar rata care încape în buget.' },
  { id: 'rent-start', categoryId: 'pe-cont-propriu', lessonId: 'cat-costa-sa-te-muti-singur', text: 'Mutarea nu costă doar prima chirie. Garanția, transportul și lucrurile de bază pot cere bani înainte să înceapă cheltuielile lunare obișnuite.' },
  { id: 'anchor-number', categoryId: 'de-ce-cheltuim-cum-cheltuim', lessonId: 'efectul-de-ancorare', text: 'Primul preț pe care îl vezi îți poate influența comparațiile următoare. Un preț tăiat foarte mare poate face oferta să pară bună fără să fie.' },
  { id: 'diversification-risk', categoryId: 'investitii-de-la-zero', lessonId: 'diversificarea', text: 'Mai multe investiții care depind de același lucru pot scădea împreună. Diversificarea înseamnă și riscuri diferite, nu doar mai multe nume.' },
  { id: 'budget-future', categoryId: 'economii', lessonId: 'primul-buget', text: 'Un buget poate include și cheltuieli care nu apar lunar. Dacă știi că urmează, poți pune treptat bani deoparte pentru ele.' },
  { id: 'loan-dae', categoryId: 'credite-si-datorii', lessonId: 'dobanda-la-credit-si-dae', text: 'Dobânda afișată nu surprinde singură toate costurile unui credit. DAE ajută la comparație, iar suma totală de plată arată câți bani rambursezi.' },
];

/** Input is Finly's trusted Europe/Bucharest civil day, not the browser's UTC day. */
export function getDailyFinlyFact(todayKey: string): DailyFinlyFact {
  if (!isDateKey(todayKey)) throw new Error('Invalid Finly day');
  const index = Math.floor(Date.parse(`${todayKey}T12:00:00Z`) / 86400000);
  return dailyFinlyFacts[((index % dailyFinlyFacts.length) + dailyFinlyFacts.length) % dailyFinlyFacts.length];
}
