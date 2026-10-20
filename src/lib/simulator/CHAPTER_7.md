# Capitolul 7 — Monthly close și debrief Fini

## 1. Audit

Fundația existentă folosește `sim_runs`, ledger în bani, calendar civil Europe/Bucharest, settlement pur și RPC-uri cu lock pe run/revision CAS. Event engine închide zilele cronologic, iar abonamentele sunt decontate în același flux. Categoriile sunt normalizate în ledger; snapshot-urile evenimentelor păstrează metadata `life`. `0007_simulator_life_catalog.sql` există deja, deci Capitolul 7 adaugă migrarea **0008**, fără modificarea migrărilor precedente.

## 2. Arhitectură

`monthly-review.ts` conține funcții pure pentru perioade, agregare, detecție, ranking și construirea snapshot-ului. `server/monthly-review.ts` finalizează și confirmă review-uri folosind contextul autentificat și active run-ul. UI consumă exclusiv snapshot-ul persistent.

## 3. Închiderea lunii

Sincronizarea existentă decontează salariul, obligațiile, abonamentele, expirările și consecințele. După commit, finalizarea folosește `event_last_closed_day`; run-urile fără event engine folosesc cursorul financiar și ziua civilă curentă. Luna deschisă nu este finalizată. Sursele financiare sunt filtrate după `ledger.day`, nu după timpul înregistrării sau data revenirii.

Finalizarea ia același lock pe run, verifică revision și recalculează în SQL venitul, cheltuielile, soldurile și categoriile. Un conflict provoacă refetch/recompute limitat; nu livrează un dashboard care a ignorat finalizarea. Snapshot-urile sunt salvate cronologic, după settlement-ul consistent al lotului existent; nu există un al doilea motor sau cron.

## 4. Gate obligatoriu

Dashboard-ul expune `pendingMonthlyReview` și `pendingMonthlyReviewCount`. Mutațiile de evenimente, abonamente și activarea profilului verifică gate-ul server-side. SQL protejează rezolvările manuale și operațiile de abonament în tranzacțiile lor. Review-urile lipsă pentru luni încheiate blochează și ele mutațiile. Eroarea de domeniu este `MONTHLY_REVIEW_REQUIRED`.

Dialogul nativ face fundalul inert, păstrează focusul și interceptează Escape/cancel. Nu are X, Skip sau închidere prin backdrop. Numai acknowledgment-ul serverului încheie review-ul. Un deep link către o situație primește gate-ul și revine automat la `/simulator`, unde apare același panel.

## 5. Absență de mai multe luni

Catch-up-ul continuă în loturile existente chiar dacă review-urile nu au fost confirmate. Fiecare lună încheiată primește un snapshot separat. Cel mai vechi review neconfirmat este afișat primul; SQL respinge confirmarea unei luni ulterioare. Nicio lună restantă nu este combinată sau eliminată.

## 6. Prima lună parțială

Perioada începe la `run.startedOn` și se termină la ultima zi calendaristică a lunii. `daysInPeriod` include ambele capete. `isPartial` este afișat discret; comparațiile cu o lună parțială sunt suprimate. Fixture-ul 18–31 octombrie are exact 14 zile.

## 7. Modelul snapshot

Un rând `sim_monthly_reviews` conține identitatea, perioada, timestamp-urile și un JSON structurat cu sold inițial/final, venit, cheltuieli, categorii complete, top categorii, insights cu evidence, mesaj Fini, schemaVersion și policyVersion. Categoriile și textele sunt salvate. Dashboard-ul nu regenerează insights după refresh sau schimbarea politicii.

`unique(run_id,month_key)` asigură un singur review. Trigger-ul de immutability permite doar prima confirmare (`reviewed_at` și receipt UUID). Ledger-ul unei luni deja finalizate respinge inserări tardive. Reset-ul dev existent păstrează cascade-ul limitat la run-ul contului de test.

## 8. Bază de date

Migrare: `supabase/migrations/0008_simulator_monthly_reviews.sql`.

Adaugă tabelul, constraint-uri, index pentru ownership, RLS SELECT own, trigger-uri și RPC-uri de finalizare/acknowledgment. Extinde read-ul atomic existent și învelește mutația de abonamente. Nu șterge, resetează sau rescrie datele existente.

## 9. RLS și securitate

Browserul are doar SELECT pentru propriile rânduri. RPC-urile sensibile au EXECUTE doar pentru `service_role`, cu `security invoker` și search_path gol. Utilizatorul/run-ul sunt derivați din sesiunea autentificată. Endpoint-ul acceptă numai `{reviewId,operationId}` și verifică same-origin/account context. UUID-ul clientului folosește `createClientUuid`, inclusiv fallback-ul iPhone/LAN existent.

Ownership-ul, ordinea review-urilor, idempotency și privilegiile au teste pe PostgreSQL local. Migrarea nu a fost aplicată pe Supabase remote; advisors remote nu au fost rulați.

## 10. Detectoare implementate

- Acumularea cumpărăturilor mici, manuale, din categorii flexibile.
- Cea mai mare categorie de cheltuieli flexibile manuale.
- Abonamente efectiv decontate, inclusiv obligația fixă existentă din categoria abonamente.
- Cheltuieli neașteptate și o rezervă ipotetică egală exact cu acel total.
- Variante fără cost alese manual în minimum trei situații cu alternative plătite.
- Modificarea unei categorii între două luni complete, consecutive.
- Sold negativ la final.

Metadata normalizată exclude reparațiile și domeniile obligation/unexpected din feedback-ul despre cheltuieli flexibile. Alegerile care setează sau rezolvă probleme prin flags sunt excluse și pentru snapshot-urile vechi fără metadata `life`. Categoria tehnologie nu este presupusă flexibilă. Nu sunt deduse usage-ul abonamentelor, necesitatea cumpărăturilor sau cauzalitatea amânării unei probleme.

## 11. Ranking

Candidatele au prioritate deterministă, cu aport limitat pentru magnitudinea financiară și frecvență. Tie-break-ul este ID-ul stabil. Familia `flexible` suprimă dublarea small-spends/largest-category. Sunt selectate maximum trei familii diferite. Diagnosticul dev afișează separat candidatele și selecția actuală, alături de snapshot-ul stocat.

## 12. What-if

Pragul este 3.000 bani, strict sub 30 lei, cu minimum cinci tranzacții eligibile. Se aleg primele patru după zi/sequence/refKey și se însumează valorile reale. Exemplul testat 18+22+20+22 lei produce exact 82 lei. Formularea este ipotetică; nu declară cumpărăturile inutile.

## 13. Comparații

Numai luni complete și consecutive, pe aceeași categorie normalizată. Categoria dispărută poate avea zero în luna curentă. Schimbările sub pragul de relevanță de 10 lei nu generează observații. Acest prag selectează feedback-ul; nu reprezintă un benchmark financiar.

## 14. Fini UX

Folosește `FinlyMascot`, asset-ul canonic V2 prin `framing="head" mood="thinking"`. Un singur panel: header, trei cifre, maximum cinci categorii, maximum trei observații, un CTA. Titlul primește focus la deschidere, cu scroll la început. CTA: „Vezi luna următoare” când există alte review-uri, apoi „Începe luna următoare”. Eșecul de rețea păstrează panelul și același operationId pentru retry.

## 15. Mobile

La 320/390/430 px, cifrele se așază vertical. Dialogul folosește înălțimea viewport-ului dinamic și scroll vertical. Valorile mari pot face wrap. CTA rămâne accesibil prin scroll și tastatură. Nu există grafice sau dependențe vizuale noi.

## 16. Fișiere create

- `src/content/simulator/monthly-review-config.ts`
- `src/lib/simulator/monthly-review.ts`
- `src/lib/simulator/server/monthly-review.ts`
- `app/simulator/monthly-review-panel.tsx`
- `app/api/simulator/monthly-review/route.ts`
- `app/api/simulator/dev/monthly-reviews/route.ts`
- `supabase/migrations/0008_simulator_monthly_reviews.sql`
- `tests/simulator-monthly-review.test.ts`
- `tests/simulator-monthly-review-integration.test.ts`
- `tests/simulator-monthly-review-api.test.ts`
- `tests/simulator-monthly-review-browser.mjs`
- `src/lib/simulator/CHAPTER_7.md`

## 17. Fișiere modificate

`server/service.ts`, `server/database.ts`, `server/events.ts`, `server/subscriptions.ts`, `server/chapter-two.ts`, `chapter-two-api.ts`, `errors.ts`; `app/simulator/simulator-client.tsx`, `simulator.css`, `dev/simulator-dev-client.tsx`, `eveniment/[id]/event-detail-client.tsx`; harness-urile `simulator-chapter-two-service.test.ts`, `simulator-events-integration.test.ts`, `simulator-subscriptions-integration.test.ts` (fixture-uri și noua migrare; aserțiunile existente sunt păstrate).

## 18–21. Verificări

Comenzi: `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build`. QA browser: într-o copie locală izolată, `node tests/simulator-monthly-review-browser.mjs --turbopack` (sau fără flag pentru Webpack). Dacă folosești un junction către node_modules-ul proiectului original, setează `turbopack.root` în configurația copiei QA la directorul părinte comun. Harness-ul folosește Next real, SDK Supabase real, PostgreSQL PGlite și autentificare simulată local. Nu folosește conturi, emailuri sau migrare remote. Rezultatele și capturile se găsesc în `artifacts/simulator-chapter-seven/browser/`.

## 22. Acțiune pentru migrare

**Aplică în Supabase SQL Editor: `supabase/migrations/0008_simulator_monthly_reviews.sql`, după 0007.** Migrarea nu a fost aplicată automat. La prima sincronizare, run-urile existente primesc lazy backfill numai din sursele reale disponibile.

## 23. Manual QA A–M

Folosește un cont QA dedicat; nu reseta run-ul utilizatorului existent.

A. Deschide `/simulator` în aceeași lună în care ai pornit run-ul: nu apare panel.

B. În `/simulator/dev`, folosește +1 zi până la prima zi a lunii următoare. Dacă există catch-up în loturi, apasă „Inspectează planul / continuă sincronizarea” până este caughtUp. Intră în `/simulator`: apare panelul.

C. Înainte de CTA, refresh: aceeași lună, aceleași cifre și insights. Șterge localStorage și repetă; autoritatea rămâne serverul.

D. Escape, click pe backdrop, Tab și Shift+Tab: panelul rămâne, focusul nu ajunge la simulator. Nu există X sau Skip. Navigarea înapoi nu confirmă review-ul; la revenire reapare.

E. Apasă CTA: `reviewedAt` apare în diagnosticul dev. Double-click/retry nu dublează operația și nu creează ledger/XP.

F. Refresh și o altă pagină/device după sync: review-ul confirmat nu reapare.

G. Avansează repetat +30 zile (control dev), continuă catch-up și deschide simulatorul. Fiecare lună restantă apare separat, în ordine. Testul de integrare verifică septembrie → octombrie → noiembrie → decembrie la revenirea în ianuarie. O cerere pentru ID-ul unei luni ulterioare primește 409.

H. Testul `simulator-monthly-review-integration.test.ts` pornește un run pe 18 octombrie și verifică exact 18–31 octombrie, 14 zile, partial=true. Pentru verificare vizuală, folosește un cont QA care începe după prima zi a lunii; textul trebuie să arate durata reală.

I. Alege manual minimum cinci cumpărături flexibile sub 30 lei. Compară evidence/refKey-urile și suma din diagnosticul dev cu ledger-ul. Fixture-ul browser 18/22/20/22/21/19 lei verifică 6 cumpărături, 122 lei total și what-if exact 82 lei.

J. Creează „Music”, 30 lei, cu scadență astăzi. După închiderea lunii, compară suma categoriei cu ledger-ul efectiv decontat: include și abonamentul fix al fundației dacă scadența sa aparține perioadei. Plățile viitoare nu intră în snapshot.

K. Rulează fixture-ul low-data din browser: prima lună are doar soldul inițial, zero cheltuieli și zero insights. Apare „Asta a fost luna ta. Continuăm.”, iar CTA funcționează.

L. În două luni complete consecutive, compară aceeași categorie cu cheltuieli diferite de minimum 10 lei. Observația arată delta reală. Prima lună parțială nu este comparată cu luna completă următoare. Fixture-ul browser verifică acest flux.

M. La 320×568, 390 și 430 px, verifică header-ul vizibil inițial, absența overflow-ului orizontal, scroll-ul și CTA accesibil. Verifică și un sold negativ.

## 24. Limite cunoscute

Nu sunt implementate insight-uri despre costul cauzal al unei reparații amânate: nu există o dovadă suficientă pentru cuantificarea exactă. Metadatele insuficiente produc observații mai generale sau fallback. Loader-ul comun existent citește istoricul run-ului; stratul nou reutilizează acele surse și nu adaugă query-uri independente pentru întregul ledger. Închiderea are loc după commit-ul lotului cronologic existent, cu filtrare strictă pe lună și validare sub lock; nu modifică batching-ul motorului.

## 25. Intenționat neimplementat

Analytics/history page, grafice, scoruri, XP, badges, bugete, economii/investiții/credit, runtime AI, estimarea usage-ului abonamentelor, cron, push, notifications, Capitolul 8, deployment automat și migrare remote automată.
