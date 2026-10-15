# Finly — Obiectivul meu

Implementare verificată local la 13 octombrie 2026. Nu a fost făcut deploy și migrarea nu a fost aplicată bazei de producție.

## 1. Savings goal audit

Dashboard-ul real este `app/simulator/simulator-client.tsx`. Cardul permanent de cheltuieli fixe era independent de motorul de settlement. Nu exista un model de obiectiv sau transfer intern. Ledger-ul avea tipuri explicite, bani întregi, identități stabile și mutații protejate prin lock/revizie. Auditul complet a fost publicat înaintea implementării. Repository-ul avea modificări preexistente, păstrate.

## 2. Existing balance / ledger model

`calculateBalance` rămâne suma ledger-ului și reprezintă disponibilul. `sim_ledger` rămâne unica sursă de mișcări monetare. Exemplu verificat: 1.000 lei disponibili → contribuție 200 lei → 800 disponibili + 200 rezervați.

## 3. Internal transfer implementation

Tip nou explicit: `transfer_obiectiv`. Contribuția înregistrează minus pe disponibil; retragerea/eliberarea înregistrează plus. Rezerva este opusul sumei transferurilor acelui obiectiv. Disponibil + rezervă se conservă. Nu sunt cheltuieli sau venituri.

## 4. Fixed-expense dashboard replacement

Cardul permanent a fost înlocuit în aceeași poziție/grilă cu `SavingsGoalCard`. Preview-ul inițial, configurația și logica de cheltuieli fixe sunt păstrate. Importurile și regulile CSS devenite nefolosite au fost eliminate.

## 5. Goal data model

`sim_savings_goals`: identitate, run/utilizator, nume, țintă în bani, status și timestamps. `sim_goal_operations`: receipts pentru idempotency. Mișcările sunt în ledger, cu `goal_id` și FK de ownership; nu există un sold materializat duplicat sau un al doilea motor financiar.

## 6. One-active-goal enforcement

Index unic parțial pe `user_id` pentru statusurile `active` și `reached`, plus verificare sub lock înainte de creare. Obiectivele arhivate permit crearea unuia nou.

## 7. Create goal flow

Sheet/dialog nativ: nume trim, maximum 60 de caractere, și sumă pozitivă. Fără categorie, termen sau depunere inițială. Creare `Laptop`, `3500` → `0 / 3.500 lei`.

## 8. Put-aside flow

Acțiune contextuală în cardul de disponibil. Input decimal, lei, quick amounts 50/100/200 doar dacă încap în disponibil și suma rămasă. Clientul oferă validări; RPC-ul verifică din nou banii și ținta sub lock. Actualizarea folosește răspunsul confirmat al serverului, fără reload.

## 9. Withdraw flow

Acțiune în cardul obiectivului. Sumă pozitivă, maximum rezerva curentă. Disponibilul crește exact cât scade rezerva. Inputul românesc `100,50` a fost verificat în browser și PostgreSQL.

## 10. Edit flow

Nume și țintă. Ținta sub rezervă este respinsă. Egalitatea produce `reached`; creșterea țintei reactivează obiectivul. ID-ul obiectivului din formular este fixat la deschidere pentru a evita schimbarea destinației în cazul unei actualizări din altă sesiune.

## 11. Delete / archive flow

Confirmare explicită; dacă există bani, suma eliberată este explicată. RPC-ul eliberează rezerva și arhivează în aceeași tranzacție. Un failure injectat în ledger a confirmat rollback-ul ambelor efecte. Obiectivul gol se arhivează fără o mișcare de zero lei.

## 12. Goal reached state

100%, copy „Obiectiv atins”, icon Check și un pulse de aproximativ o secundă. Rezerva rămâne în obiectiv. Retragerea sau creșterea țintei îl reactivează. `prefers-reduced-motion` oprește animația și tranziția barei.

## 13. Main balance card changes

Labelul existent „Sold disponibil” este păstrat. Se adaugă suma rezervată și „Pune deoparte” pentru obiectivul activ. Fără obiectiv, acțiunea contextuală devine „Creează obiectiv” și deschide formularul de creare. Cardul gol păstrează CTA-ul complet; în layout-ul real este mai jos, fără să fie imediat vizibil lângă cardul de disponibil pe mobil.

## 14. Spendable balance / affordability

Același `calculateBalance` este folosit de state, dashboard, affordability și settlement. Test verificat: 800 disponibili + 200 rezervați nu permit opțiunea de 900 lei. Planificarea RNG rămâne independentă de sold. Obligațiile automate păstrează regula existentă de sold negativ, fără acces la rezervă.

## 15. Monthly analysis handling

Transferurile sunt excluse explicit din cheltuielile pe categorii, lista de expenses și indicatorii de cash/behavior din monthly review, atât în TypeScript cât și în validarea SQL a snapshot-ului. Veniturile au deja tipuri explicite. Totalurile de venit/cheltuieli, categoriile, banii rămași și insights rămân neschimbate la transfer. Soldurile de început/final din review reprezintă totalul financiar, inclusiv rezerva; disponibilul pentru cheltuit rămâne cel din dashboard. Testul confirmă că disponibilul negativ cu rezervă suficientă nu produce un insight fals de total financiar negativ și că snapshot-ul corect se salvează efectiv în PostgreSQL.

## 16. Fixed expense regression status

PASS: settlement, salariu, calendar, „Ce urmează” și analiza lunară. Abonamentul obligatoriu de 900 lei poate duce 800 disponibili la −100, păstrând cei 200 lei în obiectiv. Nicio regulă nouă de settlement.

## 17. Database changes

Două tabele, un tip explicit în constraint-ul ledger-ului, coloana nullable `goal_id`, FK/indexe, wrapper de citire și RPC atomic. Validatorul SQL existent de monthly close este actualizat în migrarea nouă pentru a exclude transferurile, păstrând toate celelalte guards. Fără reset, backfill de bani, exemplu stocat sau rescriere de istoric. Migrațiile anterioare nu au fost modificate.

## 18. Migration file

`supabase/migrations/0012_simulator_savings_goal.sql`. Aplicată și verificată în PostgreSQL local/PGlite; necesită aplicare în mediul țintă înainte de activarea feature-ului acolo.

## 19. RLS / auth

RLS activ pe ambele tabele noi. Authenticated citește doar propriile obiective; mișcările păstrează politica owner a ledger-ului. Browser-ul nu poate scrie direct în tabele sau executa RPC-ul de bani. Ruta derivează utilizatorul din sesiunea verificată și reutilizează protecțiile Origin și account context. Modelul de grants/policies urmează [documentația Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).

## 20. Idempotency / concurrency

UUID sigur din helper-ul existent; receipt persistent cu payload normalizat; `ref_key` unic. Același UUID + aceeași cerere nu se repetă; payload diferit cu aceeași identitate este respins. Lock pe `sim_runs` și `event_revision`, comune cu evenimentele și abonamentele. Retry-ul este verificat înainte de revizia stale. Două cereri cu aceeași revizie nu pot consuma același disponibil. Gate-ul existent de monthly review este respectat atât în serviciu cât și sub lock în RPC.

## 21. Files created

- `src/lib/simulator/savings-goal.ts`
- `src/lib/simulator/server/savings-goal.ts`
- `app/api/simulator/goal/route.ts`
- `app/simulator/savings-goal.tsx`
- `supabase/migrations/0012_simulator_savings_goal.sql`
- `tests/simulator-savings-goal.test.ts`
- `tests/simulator-savings-goal-api.test.ts`
- `tests/simulator-savings-goal-browser.mjs`
- Acest raport și `artifacts/savings-goal/` cu raportul QA, log și 28 de capturi.

## 22. Files modified

- `src/lib/simulator/types.ts`
- `src/lib/simulator/state.ts`
- `src/lib/simulator/monthly-review.ts`
- `src/lib/simulator/dashboard.ts`
- `src/lib/simulator/errors.ts`
- `src/lib/simulator/server/database.ts`
- `src/lib/simulator/server/service.ts`
- `src/lib/simulator/server/chapter-two.ts`
- `app/simulator/simulator-client.tsx`
- `app/simulator/simulator.css`

## 23. Test results

PASS: `npx vitest run --maxWorkers=1` — 826 teste, 44 fișiere. Include 17 teste noi de obiectiv/API: contabilitate, validare, idempotency, CAS, ownership/RLS, rollback, ținte/statusuri, calendar, obligații și affordability. Suitele existente de simulator/ledger/monthly/events/subscriptions/streak/notifications au trecut. Verificările de conținut și shuffle au trecut. Execuția inițială cu mulți workers a depășit timeout-uri în teste existente; limitele și aserțiunile nu au fost modificate.

## 24. Lint

PASS: `npm run lint`.

## 25. Typecheck

PASS: `npx tsc --noEmit`.

## 26. Build

PASS: `npm run build`, inclusiv ruta `/api/simulator/goal`.

## 27. Manual QA

Browser QA PASS: Next real → API → SDK Supabase → PostgreSQL/PGlite → UI; Auth simulat numai local. Raport: `artifacts/savings-goal/report.json`; zero erori de browser/provider. Carduri și sheet-uri verificate la 320, 390, 430 și 1280 px, tastatură, Escape/focus, reduced motion, retry, altă sesiune și alt cont.

Pași pentru verificarea manuală în mediul cu migrarea aplicată:

1. Deschide simulatorul. Verifică absența cardului permanent „Cheltuieli fixe” și prezența „Obiectivul meu” în locul lui.
2. Apasă „Creează un obiectiv”, introdu `Laptop` și `3500`, apoi „Creează obiectivul”. Verifică `0 / 3.500 lei`.
3. Cu 1.000 lei disponibili într-un cont de test, apasă „Pune deoparte”, introdu `200` și confirmă. Verifică 800 disponibili, 200 în obiectiv, aproximativ 6%, venituri și cheltuieli lunare neschimbate.
4. Apasă „Scoate bani”, introdu `100` și confirmă. Verifică 900 disponibili, 100 în obiectiv și venitul lunar neschimbat.
5. Din meniul „…”, editează numele. Încearcă o țintă sub suma rezervată: trebuie respinsă. Țintă egală cu rezerva → atins; țintă mai mare → activ.
6. Depune exact suma rămasă, dacă disponibilul permite. Verifică 100%, feedback discret și bani în continuare rezervați. Retrage o parte: obiectivul devine activ.
7. Șterge/încheie obiectivul cu bani. Verifică textul de confirmare, revenirea integrală la disponibil și empty state; creează apoi un obiectiv nou.
8. În mediul de development local, avansează la următoarea scadență fixă. Verifică plata în ledger, calendar, „Ce urmează” și analiza lunară. Nu reseta date reale.
9. La 320/390/430 px verifică toate sheet-urile și accesul la submit prin scroll când viewport-ul este redus. La desktop verifică poziția în grilă.
10. Deschide o a doua sesiune și revino/focusează simulatorul după o contribuție. Verifică aceeași țintă, rezervă și stare. În alt cont, obiectivul nu trebuie să apară.

## 28. Known limitations

Migrarea/deploy-ul în producție nu au fost executate. Browser QA folosește viewport emulation, fără o tastatură virtuală fizică pe telefon. PostgreSQL local/PGlite verifică tranzacțiile și CAS; nu a fost rulat un stress test pe o bază remote cu multiple conexiuni fizice. Fără UI de istoric al obiectivelor, conform V1.

## 29. Intentionally unchanged systems

Auth, lecții/progres, streak/freeze, XP, daily goal, notificări/push, calendar commitments, frecvență/RNG/planning/expiry/consecințe ale evenimentelor, salariu, abonamente și reguli de settlement. Obiectivul nu adaugă categorii, deadline-uri, reguli automate sau recompense.
