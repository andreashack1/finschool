# FINLY — Simulator, Capitolul 5

## 1. AUDIT INIȚIAL

Capitolele 1–4 erau deja în workspace: DayKey Europe/Bucharest, bani întregi, ledger cu cheie unică, settlement, sincronizare cronologică a evenimentelor, CAS pe event_revision și starea „Acum”. Multe dintre aceste fișiere erau încă untracked; schimbările existente au fost păstrate. Migrarea precedentă este 0005_simulator_consequences.sql. Nu s-au aplicat migrări remote și nu s-au resetat date.

## 2. CE AM IMPLEMENTAT

Abonamente personale persistente, creare/editare/anulare prin server autentificat, recurență în luni calendaristice, plăți automate în ledger, calendar financiar read-only și integrare în următoarele trei mișcări financiare. Fără dependențe noi.

## 3. UI „CE URMEAZĂ”

Calendar și „+ Adaugă abonament” se află în headerul cardului existent. Ambele au text vizibil; adăugarea are și icon plus și accent albastru. „Acum” rămâne imediat după card în același container. Poziția „Evenimentele de azi” este păstrată. Browserul verifică layoutul la 320, 390, 430 și 1280 px, inclusiv un fixture de stare persistentă care afișează „Acum”.

## 4. FORMULAR „ADAUGĂ ABONAMENT”

Dialog compact pe desktop, panel de jos pe mobil. Câmpuri principale: Nume abonament, Cost, Data plății; Se repetă este secundar și implicit Lunar. Opțiuni 1/3/6/12 luni. Data de final este într-un control details discret. Numele este trim, text simplu, 1–60 caractere, fără HTML/control/invisible format characters. Numele duplicate sunt permise. Costul acceptă 300 / 300,50 / 300.50 și se transformă prin cifre în bani întregi, pozitiv și în limita PostgreSQL integer. Data trecută și câmpurile suplimentare de autoritate sunt respinse pe server.

Prima plată de azi are avertisment înainte de confirmare; soldul negativ nu blochează salvarea. Răspunsul serverului este autoritatea, iar după succes se reîncarcă dashboardul prin API și se închide dialogul, fără navigare completă. La redeschiderea calendarului se citește noua configurație. Clientul folosește createClientUuid, inclusiv când randomUUID nu există.

## 5. RECURRENCE ENGINE

Implementare pură unică în subscriptions.ts. nextSubscriptionDate avansează intervalMonths luni civile și folosește min(anchorDayOfMonth, zilele lunii țintă). Ancora nu se schimbă după clamp. 31 ianuarie → 28/29 februarie → 31 martie; 31 martie → 30 aprilie → 31 mai. Anual, 29 februarie devine 28 februarie și revine la 29 în an bisect. Fără +30 zile sau aritmetică în milisecunde pentru luni.

## 6. PAYMENT ENGINE

Abonamentele se procesează în synchronizeEvents după salary/fixed pentru fiecare zi, înaintea planificării zilei. Deciziile expirate din ziua precedentă și consecințele lor au fost procesate înainte de intrarea în ziua nouă. Catch-up folosește batchDays existent. Run-urile fără profil de evenimente folosesc settlementul existent, extins în serviciu cu aceleași plăți de abonament.

Sequence 999 urmează după maximum 699 de obligații fixe (300–998) și înaintea evenimentelor (1000+); abonamentele din aceeași zi sunt ordonate după UUID stabil. Cheia este runId:dueDay:subscription:subscriptionId, unică în ledger. Commitul cursorului nextDueOn și al plății folosește aceeași tranzacție/run lock/CAS. Crearea cu plata de azi include abonamentul, ledgerul și receiptul într-o tranzacție. Costul nu este limitat de sold. Retry-urile după răspuns pierdut nu creează încă un abonament sau încă o plată.

## 7. CALENDAR FINANCIAR

Luna implicită și ziua curentă vin din ceasul serverului simulatorului, nu din data dispozitivului. Navigare înainte/înapoi, fără luni anterioare începerii run-ului. Săptămâna începe luni, nume românești, markere compacte, zi selectată și Azi distincte. Detaliile sub grilă arată nume, sumă, Încasat / Plătit / Urmează / De plată.

Surse: salariu, cheltuieli fixe, abonamente. Istoricul vine exclusiv din ledger; viitorul este proiecție din snapshotul run-ului și configurația curentă a abonamentelor. Citirea calendarului nu execută settlement și nu scrie rânduri. DTO-ul nu conține refKeys, userId, runId, anchor sau evenimente viitoare. IDs/revisions apar doar unde sunt necesare editării abonamentelor.

## 8. EDIT / CANCEL

Managementul este în „Abonamentele mele” din calendar. Editarea permite nume, cost, frecvență, următoarea dată și data de final; noua dată confirmată devine ancora. Serverul sincronizează mai întâi obligațiile scadente. Plata de azi deja procesată nu este repetată. Revizia stale returnează versiunea actuală; UI explică schimbarea de pe alt dispozitiv. Anularea persistă status/cancelledAt, fără refund, ștergere de istoric sau reactivare. Datele de final sunt inclusive; abonamentele finite rămân active ca înregistrări, dar nu mai proiectează/încasează după final.

## 9. DATABASE — SCHEMA EXACTĂ

`public.sim_subscriptions`:

| Coloană | Tip / nulabilitate |
| --- | --- |
| id | uuid PRIMARY KEY |
| run_id | uuid NOT NULL |
| user_id | uuid NOT NULL |
| name | text NOT NULL |
| amount_bani | integer NOT NULL |
| interval_months | integer NOT NULL |
| anchor_day_of_month | integer NOT NULL |
| next_due_on | date NOT NULL |
| ends_on | date NULL |
| status | text NOT NULL |
| revision | integer NOT NULL |
| created_at | timestamptz NOT NULL |
| updated_at | timestamptz NOT NULL |
| cancelled_at | timestamptz NULL |

Constrângeri: nume trim 1..60 și fără HTML/control; amount_bani > 0; interval_months IN (1,3,6,12); anchor 1..31; revision >= 1; status IN ('active','cancelled'); status cancelled exact când cancelled_at este nenul; ends_on NULL sau >= ziua Bucharest a created_at. FK compus (run_id,user_id) → sim_runs(id,user_id), ON DELETE CASCADE. Index sim_subscriptions_schedule(run_id,status,next_due_on). RLS owner SELECT; authenticated SELECT, fără browser INSERT/UPDATE/DELETE; anon fără acces; service_role server-only.

`public.sim_subscription_operations`: run_id uuid NOT NULL, user_id uuid NOT NULL, operation_id uuid NOT NULL, subscription_id uuid NOT NULL REFERENCES sim_subscriptions(id), action text NOT NULL CHECK IN ('create','edit','cancel'), created_at timestamptz NOT NULL DEFAULT now(); PK(run_id,operation_id), FK compus run/user cu CASCADE. RLS activ, numai service_role are acces. Ledgerul permite noul kind abonament și păstrează unicitatea existentă a ref_key.

RPC-uri private: read_simulator_state extins; commit_simulator_events și apply_simulator_settlement extinse atomic peste corpurile existente; commit_subscription_cursors; mutate_simulator_subscription. SECURITY INVOKER, search_path gol, EXECUTE revocat pentru PUBLIC/anon/authenticated.

## 10. MIGRATION

Fișier: `supabase/migrations/0006_simulator_subscriptions.sql`. **Pregătită și testată local, nu aplicată în producție.**

Aplicare manuală: confirmă că 0003, 0004, 0005 sunt deja aplicate; deschide proiectul Supabase corect → SQL Editor; copiază întregul fișier 0006 și execută o singură dată. Scriptul are BEGIN/COMMIT și NOTIFY pgrst pentru schema cache. Apoi verifică tabelele, RLS și fluxul autentificat în simulator. Nu relansa fișierul deja aplicat; folosește o migrare nouă pentru schimbări ulterioare. Nu există pas de reset/truncate/ștergere.

## 11. FILES CREATED/MODIFIED

Create:

- `app/simulator/financial-controls.tsx`
- `app/api/simulator/calendar/route.ts`
- `app/api/simulator/subscriptions/route.ts`
- `app/api/simulator/dev/subscriptions/route.ts`
- `src/lib/simulator/subscriptions.ts`
- `src/lib/simulator/financial-calendar.ts`
- `src/lib/simulator/server/subscriptions.ts`
- `supabase/migrations/0006_simulator_subscriptions.sql`
- `tests/simulator-subscriptions.test.ts`
- `tests/simulator-subscriptions-integration.test.ts`
- `tests/simulator-subscriptions-browser.mjs`
- `src/lib/simulator/CHAPTER_5.md`

Modificate:

- `app/simulator/simulator-client.tsx`
- `app/simulator/simulator.css`
- `app/simulator/dev/simulator-dev-client.tsx`
- `src/lib/simulator/types.ts`
- `src/lib/simulator/dashboard.ts`
- `src/lib/simulator/events/synchronize.ts`
- `src/lib/simulator/server/service.ts`
- `src/lib/simulator/server/events.ts`
- `src/lib/simulator/server/database.ts`
- `src/lib/simulator/server/chapter-two.ts`
- `tests/simulator-production.mjs`

Probe: `artifacts/simulator-chapter-five-qa/report.json`, form-320/390/430/1280.png, calendar-320/390/430/1280.png, new-run-320/390/430/1280.png; verificarea producției în `artifacts/simulator-qa/production-report.json`. Copia izolată folosită pentru browser: `C:/Users/Fabian/finly-ch5-qa-20261010`, doar auth simulată și DB locală.

## 12. ENVIRONMENT VARIABLES

Nicio variabilă nouă în aplicație. Se reutilizează configurația Supabase existentă. NODE_OPTIONS=--use-system-ca a fost folosit temporar pentru descărcarea fonturilor existente la build; nu este o cerință nouă de produs.

## 13. TEST RESULTS

`npm test`: **26 fișiere, 642 teste PASS**, plus cele trei verificări de conținut existente. Capitolul 5: **45 teste noi PASS** = 26 domain/projection/validation + 19 integrare PostgreSQL PGlite. După ultima constrângere SQL, cele 19 teste de integrare au fost rerulate și au trecut.

Browser: **12 fluxuri PASS**, Chrome headless cu Next + SDK Supabase + Postgres local, autentificare simulată, fără migrare remote. 320/390/430/1280 px, zero erori JS/provider, randomUUID eliminat din browser pentru toate mutațiile. Probe pentru salvare, afișare imediată, calendar, plata la zi, jurnal, edit/cancel, negative balance, nume lung/sumă mare, pagină separată, logout/login, dev și auth.

`node tests/simulator-production.mjs`: **19 verificări PASS**, fără mutații autentificate. API calendar/subscriptions 401/no-store; dev routes 404; catalogul privat și service-role nu apar în JS public.

Testele DB acoperă concurență/retry, RLS cross-user, browser writes interzise, fără plăți în viitor, rename/price snapshots, end date/cancel, frecvență, catch-up și rollback forțat după eșec de ledger/cursor. PGlite rulează PostgreSQL real local; nu substituie o verificare a infrastructurii Supabase remote.

## 14. LINT

PASS: `npm run lint`, fără erori/avertismente în rularea finală.

## 15. TYPECHECK

PASS: `npx tsc --noEmit`. Fără domain any sau ts-ignore nou.

## 16. BUILD

PASS: `npm run build`, 40/40 pagini generate. Primul build fără acces la fonturi a eșuat pe Google Fonts; rerularea cu acces și certificatele sistemului a trecut. Buildul nu aplică migrarea, nu creează abonamente/ledger și nu necesită login.

## 17. /SIMULATOR/DEV TEST

În development, cu run existent: creează din /simulator un abonament scadent peste două zile; deschide /simulator/dev → „Inspectează abonamentele și plățile”; verifică ID/name/amount/interval/anchor/nextDue/end/status/revision, projected și payments. Apasă „Mută data +1 zi” de două ori; inspectează din nou: payments conține o singură plată și nextDue a avansat. Revino în simulator/calendar: Plătit și o tranzacție în jurnal. Nu folosi reset. În production pagina și API-ul dev sunt 404.

## 18. MANUAL UI TEST

/simulator → „+ Adaugă abonament” → Nume „Abonament sală” → Cost „300” → data autoritativă +2 zile → Lunar → Salvează abonamentul. Verifică noua mișcare în Ce urmează dacă este între primele trei. Calendar → selectează data: Abonament sală / −300 lei / De plată. Avansează ceasul dev până la dată → sincronizează → Calendar: Plătit; Jurnal: Abonament · Abonament sală / −300 lei. Două refreshuri nu adaugă încă o plată. Editarea ulterioară la 350,50 și Telefon păstrează prima tranzacție. Anulează din calendar; istoricul rămâne.

## 19. REQUIRES USER CHECK

Aplicarea manuală a migrației 0006 și verificarea pe infrastructura Supabase/deploymentul real nu au fost executate. Testul cu PC și iPhone fizic prin LAN, autentificarea reală cross-device și RLS/concurența pe DB remote rămân de verificat după aplicare. Au fost verificate local RLS/concurența PostgreSQL, dimensiunile mobile, persistarea și mutațiile fără randomUUID; nu se afirmă test hardware iPhone.

## 20. INTENTIONALLY NOT IMPLEMENTED

Plăți reale, Stripe, integrare bancară, debt/overdue/penalties/interest, biblioteca de 200 evenimente, push notifications, month-end education și reactivarea abonamentelor. Capitolul 6 nu a fost început.
