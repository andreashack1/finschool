# Finly — Simulator Life Profile & Context Engine

1. **Life profile audit.** `/simulator` → `SimulatorClient` → dashboard API → `simulatorPageState`/`loadRun`. Absența unui run activ indică un simulator nou. Inițializarea existentă este RPC-ul tranzacțional `start_simulator_run`; configurația este un snapshot JSONB. Auditul a precedat modificările, inclusiv `git status`, `git diff`, migrații, RLS, catalog, planificare, calendar și teste. Arborele de lucru avea deja numeroase modificări și fișiere simulator neversionate; acestea au fost păstrate.

2. **Probleme găsite.** Venitul era universal 2.000 lei, locuința la părinți costa implicit 300 lei, chiria 800 lei, transportul 120 lei; existau și abonamente/telefon implicite. Setup-ul lega locuința și programul, fără a adapta venitul. Dashboard-ul și calendarul impuneau eticheta „Salariu”. Programul liceului era 08:00–14:00. Catalogul avea deja domenii, familii, taguri și oportunități temporale.

3. **Setup nou.** „Cum începi?” → situație → locuință → transport → „Așa începi” → „Începe simularea”. Fiecare întrebare schimbă comportamentul. Navigarea înapoi păstrează răspunsurile; refresh înainte de confirmare reîncepe în siguranță întrebările, fără a crea un run. Dashboard-ul nou nu furnizează presupuneri financiare înainte de alegeri. POST-ul validează profilul și construiește configurația pe server.

4. **Model de date.** `config_snapshot.lifeProfile`: `{ version: 1, activityStatus: 'liceu' | 'lucrez', housingStatus: 'parinti' | 'chirie', transportMode: 'public' | 'walk' }`. Snapshot-ul conține și veniturile recurente separate. `started_on` existent identifică începutul. Fără localStorage, tabel duplicat, vârstă sau informații personale suplimentare. Este configurația unei simulări.

5. **Preseturi.** Sursa canonică este `src/content/simulator/life-profile-config.ts`. Banii sunt reprezentați în bani întregi. Venitul și ajutorul intră pe 1; chiria este scadentă pe 5; transportul public pe 1. Ordinea de ledger: venit 200, ajutor 201, obligații 300+. Sumele zero nu produc tranzacții.

| Profil | Venit lunar | Ajutor chirie | Chirie | Rămâne înainte de transport |
|---|---:|---:|---:|---:|
| Liceu + părinți | Buget lunar 1.000 lei | 0 | 0 | 1.000 lei |
| Muncă + părinți | Salariu 2.000 lei | 0 | 0 | 2.000 lei |
| Muncă + pe cont propriu | Salariu 2.000 lei | 600 lei | 1.200 lei | 1.400 lei |
| Liceu + pe cont propriu | Buget lunar 1.600 lei | 600 lei | 1.200 lei | 1.000 lei |

6. **Liceu + părinți.** Buget lunar 1.000 lei; fără chirie sau contribuție la locuință.

7. **Muncă + părinți.** Salariu 2.000 lei; fără chirie sau contribuție automată.

8. **Muncă + pe cont propriu.** Mișcări distincte +2.000, +600 și −1.200 lei. Rezultatul este 1.400 lei înainte de alte costuri.

9. **Liceu + pe cont propriu.** Buget lunar 1.600 lei, ajutor 600 lei, chirie 1.200 lei. Sprijinul general este cu 600 lei mai mare decât la părinți, pentru a păstra baza disponibilă de 1.000 lei. Nu este salariu.

10. **Chirie și familie.** Ajutorul este o intrare distinctă, niciodată compensat în chirie. Bugetul și ajutorul folosesc tipul existent `ajustare`, categoria `venit`, referințe recurente stabile; nu sunt `salariu`. Selectoarele recunosc explicit aceste venituri. Analiza lunară le include ca venituri fără a introduce categorii analitice noi.

11. **Transport.** Public = 120 lei/lună; mers pe jos = zero obligații recurente de transport. Evenimentele ocazionale de transport rămân posibile; situațiile care presupun așteptarea transportului public cer profilul potrivit.

12. **Contribuția universală.** Nu este generată pentru profiluri noi. Configurația legacy rămâne disponibilă exclusiv pentru istoricul și compatibilitatea simulărilor vechi. Abonamentele și telefonul nu sunt preinstalate în profilurile noi; abonamentele create de utilizator continuă prin motorul existent.

13. **Ce urmează.** „PRIVIRE ÎNAINTE” eliminat. Titlul și controalele existente rămân. Venitul, ajutorul, chiria și transportul provin din snapshot; profilurile noi pot vedea până la cinci mișcări apropiate. Calendarul păstrează fluxurile separate, clasifică suportul distinct și exclude evenimentele aleatorii.

14. **Fini.** Mesajul utilizează eticheta mișcării. Cardul de venit afișează „Buget lunar” sau „Salariu”; textele despre următoarea încasare sunt neutre. Intrările pozitive nu sunt notificate ca plăți scadente mâine.

15. **Eligibilitate.** Extensie centrală a catalogului existent: contexte `school`, `work`, `break`, `free_time`, `home`, `transport`, `general`; restricții opționale de locuință și transport. Clasificarea folosește domenii, familii, taguri și oportunități, fără comparații de titluri. Planner-ul primește profilul din snapshot. În timpul programului sunt acceptate doar contexte de pauză potrivite, păstrând regulile existente pentru durata activităților. RNG-ul, cooldown-urile, raritatea, probabilitățile oportunităților și fereastra de răspuns rămân în motorul existent. Planificarea nu citește soldul.

16. **Liceu.** Luni–vineri 08:00–14:30, valori centralizate și salvate în politica noului motor. După program se extinde pool-ul de timp liber.

17. **Muncă.** Luni–vineri 09:00–17:00. Pauze/mese/cumpărături scurte în program; timp liber după program.

18. **Weekend.** Nu are interval ocupat școală/muncă; oportunitățile de weekend rămân flexibile. Conversia orei și DayKey folosesc utilitarele Europe/Bucharest existente, inclusiv DST.

19. **Audit catalog.** 200 definiții, 79 familii. Context școlar: 24; muncă: 20; timp liber: 158; acasă: 14; transport: 19. Numerele sunt suprapuse. Cinci definiții cer locuință independentă; patru cer transport public. Toate cele 200 au metadate de context. Zero evenimente noi și zero rescrieri de copy. Testele pe 60 de zile confirmă un pool activ, număr variabil și zile liniștite pentru ambele activități.

20. **Compatibilitate existentă.** Absența `lifeProfile` înseamnă legacy. Selectoarele și settlement-ul continuă să folosească snapshot-ul run-ului; filtrul nou de profil nu se aplică. Nu se cere setup, nu se rescriu tranzacții și nu se resetează conturi. Profilul și mișcările inițiale se salvează într-o singură tranzacție. Activarea motorului de evenimente este reluabilă: dacă nu a reușit după crearea run-ului, dashboard-ul o reia din profilul deja salvat. Retry-ul și două cereri concurente păstrează run-ul câștigător. Profilul de activitate din snapshot are prioritate față de o cerere ulterioară.

21. **Bază de date.** Refolosește JSONB-ul și RPC-urile existente. RLS și permisiunile rămân active. Serverul derivă identitatea din sesiune; utilizatorul nu poate furniza propriul `user_id`, salariul sau configurația financiară. Testele PostgreSQL verifică rollback, retry, deduplicare, citire între sesiuni și izolarea profilului.

22. **Migrare.** NONE. Nu au fost editate migrații existente. Următorul număr liber inspectat a fost 0013; nu a fost folosit.

23. **Fișiere create.**

    - `src/lib/simulator/life-profile.ts`
    - `src/content/simulator/life-profile-config.ts`
    - `src/lib/simulator/events/profile-context.ts`
    - `app/simulator/life-setup.tsx`
    - `tests/simulator-life-profile.test.ts`
    - `tests/simulator-life-profile-sql.test.ts`
    - `tests/simulator-life-profile-browser.mjs`
    - `docs/SIMULATOR_LIFE_PROFILE.md`
    - Dovezi QA în `artifacts/life-profile/`.

24. **Fișiere modificate în această implementare.**

    - `app/api/simulator/{start,run,preview}/route.ts`
    - `app/api/simulator/dev/events/route.ts`
    - `app/simulator/{simulator-client.tsx,simulator.css}`
    - `app/simulator/dev/simulator-dev-client.tsx`
    - `src/lib/simulator/{types.ts,api-types.ts,dashboard.ts,settle.ts,financial-calendar.ts,monthly-review.ts}`
    - `src/lib/simulator/events/{life-taxonomy.ts,planner.ts,synchronize.ts}`
    - `src/lib/simulator/server/{service.ts,chapter-two.ts,events.ts}`
    - `src/lib/simulator/notifications/observe.ts` — doar exclude intrările pozitive din notificările de plată.
    - `src/content/simulator/events/catalog-v2.server.ts`
    - `tests/simulator-chapter-two-{api,service}.test.ts` — contractul nou de setup, păstrând verificările de autoritate.

25. **Teste.** PASS: 866 teste în 47 fișiere, zero eșecuri. Raportul final este `artifacts/life-profile/vitest.json`. Acoperă foundation, recurențe, calendar, evenimente, RNG, consecințe, abonamente, analiză lunară, notificări și compatibilitate legacy. Nu au fost adăugate `.skip`/`.only`, șterse teste sau slăbite verificări. Testele vechi de start au fost actualizate pentru profilul complet și setup fără presupuneri.

26. **Lint.** `npm run lint`: PASS, fără warnings.

27. **Typecheck.** `npx tsc --noEmit`: PASS; verificarea TypeScript din build: PASS.

28. **Build.** `npm run build`: PASS. `node tests/simulator-production.mjs`: PASS, 20 controale pentru protecții production/auth/cache și absența catalogului privat/cheilor server din bundle-ul public.

29. **QA în browser.** Chrome headless, Next real, SDK real, PostgreSQL PGlite; cinci conturi sintetice, provider Auth local. Patru profiluri principale: întrebări, înapoi, refresh înainte de confirmare, lipsa inițializării premature, confirmare, profil persistent, retrimitere concurentă, refresh după start și login într-un al doilea browser context. Cont legacy: dashboard direct, sold și ledger păstrate. Ceas dev: marți 11:00/17:00 la liceu, 13:00/19:00 la muncă, plus weekend; planuri adecvate și răspuns de 30 minute. Capturi și verificări de overflow/tap targets la 320/390/430 px. Raport: `artifacts/life-profile/browser/report.json`; zero erori de browser/provider în rularea finală. Modurile public/mers pe jos și toate cele opt combinații financiare sunt acoperite și în testele de domeniu. Controalele dev existente pot crea acum toate combinațiile; resetul existent rămâne exclusiv development.

30. **Limite cunoscute.** QA-ul cross-device folosește sesiuni independente de browser, nu două dispozitive fizice. Auth este simulat local; nu au fost create conturi pe Supabase remote și nu s-a făcut deploy. Persistența și tranzacțiile au fost verificate pe PostgreSQL local cu SQL-ul real. Începutul la mijlocul lunii păstrează regula existentă: sold inițial 400 lei și fără plăți retroactive; presetul descrie lunile complete. Politica existentă pentru excepții de calendar rămâne disponibilă, fără un sistem nou de vacanțe/sărbători. Profilul nu se editează în timpul simulării. Lecțiile, streak/freeze și logica obiectivelor de economisire nu au fost modificate.
