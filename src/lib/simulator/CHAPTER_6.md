# FINLY — Simulator, Capitolul 6

## 1. AUDIT INIȚIAL

Capitolele 1–5 erau deja în workspace. Catalogul server-only v1 avea 12 definiții, 24 variații și 72 opțiuni. Plannerul folosea RNG v1 cu namespace-uri independente, profilul Liceu 08–14 / Lucrez 09–17, cinci ferestre, cooldown de familie, protecție socială, durate și gap. Exista deja zi planificată explicit chiar dacă era goală; nu exista o cotă zilnică. Starea istorică, ledgerul, CAS, catch-up în batchuri de 31 de zile, calendarul și abonamentele au fost reutilizate. Lipseau taxonomia contextuală, istoricul semantic și pauzele distincte. Workspace-ul conținea modificări anterioare și multe fișiere untracked; au fost păstrate.

## 2. EVENT ENGINE CHANGES

Reutilizat: bani întregi, DayKey Bucharest, instance snapshots, prețuri stabile, rezolvare manuală/automată, affordability, consecințe declarative, RLS, run lock, ledger și sincronizare cronologică.

Adăugat: catalog v2 / policy v2 distincte, oportunități semantice probabilistice, raritate, profil/sezon, cooldown exact + familie + tag, penalizare ponderată după istoric, o singură situație pentru aceeași mini-poveste încă nerezolvată, validare și simulare offline. Plannerul v1 rămâne disponibil. Nicio modificare de layout în dashboard.

## 3. CATALOG

200 definiții; 212 variații; 464 opțiuni; 79 familii folosite; 15 domenii; 33 taguri folosite. Sunt păstrate cele 12 ID-uri originale. 41 definiții folosesc starea persistentă (20,5%); 7 au eligibilitate lunară. Liceu: 180 definiții eligibile pe profil; Lucrez: 176. Raportul identifică 0 titluri normalizate duplicate și 66 perechi de contexte care împart familia și tagurile, pentru revizie editorială; acestea sunt protejate de aceeași familie, nu sunt ID-uri independente folosite pentru a ocoli cooldownul. Contextul, nevoia și opțiunile au fost revizuite în toate fișierele; mostrele de 14 zile au fost inspectate pentru ambele profiluri.

## 4. DOMAIN DISTRIBUTION

| Domeniu | Definiții |
| --- | ---: |
| routine | 16 |
| food | 15 |
| school | 24 |
| work | 20 |
| transport | 16 |
| social | 21 |
| shopping | 16 |
| home | 12 |
| digital | 12 |
| leisure | 14 |
| obligation | 8 |
| unexpected | 8 |
| opportunity | 6 |
| weekend | 6 |
| seasonal | 6 |

## 5. RARITY DISTRIBUTION

Common: 23; occasional: 163; rare: 14. Raritatea influențează rankingul candidatului, nu numărul impus de situații pe zi.

## 6. LICEU EXPERIENCE

Înainte de program: patiserie, apă, stație. Pauza mică este derivată din începutul programului; pauza mare este după aproximativ patru ore. Materiale de proiect, print, obiecte uitate și colegi au contexte separate. După program: proiect, bibliotecă, cafenea, mall, transport. În weekend nu se generează situații care cer prezența la liceu. Nu există calendar de vacanțe inventat.

## 7. LUCREZ EXPERIENCE

Înainte de program: drum și cafea. Pauze: cantină, comandă comună, pachet uitat, automat, mici consumabile personale. După program: plimbare, masă, cumpărături, întâlnire de învățare. Weekendul are ferestre distincte; programul este preluat din policy, nu duplicat în cele 200 de definiții.

## 8. RANDOM DAILY FLOW

Fără minimum forțat; fără maxEventsPerDay sau trunchiere la patru. Oportunitățile pot să nu producă nimic. O zi goală se persistă și nu rerulează. O zi ocupată este posibilă natural: mostra Liceu are cinci situații pe 12 octombrie. RNG server-authoritative, versiunea 1, cu un namespace suplimentar life_opportunity și chei stabile după ID. Ordinea array-urilor nu schimbă rezultatul. Soldul și numele abonamentelor nu sunt input de generare.

## 9. ANTI-REPETITION

Exact event cooldown separat de familyCooldownDays; familie unică în zi; cooldown semantic pentru cafea, delivery, cinema, telefon, cablu, căști, cadou, cumpărături și gustări. În fereastra semantică de șapte zile, repetările reduc ponderea cu repeatWeightFactor. Istoricul folosit pentru regulile mai lungi este limitat la 90 de zile. Problemele încă active pot avea un follow-up contextual, fără să fie blocate de propriul tag, dar fără copii simultane ale mini-poveștii. Protecția socială v1 și conflictele de activitate rămân active.

## 10. STATEFUL MINI-STORIES

Telefon care se blochează → problemă activă → încurcă notițe/discuția de grup → reparație. Cablu, căști, geantă și cusătură deteriorată au început/follow-up/rezolvare. Printul amânat revine ca nevoie contextuală. Proviziile, pachetul, materialele de proiect, traseul pregătit și consumabilele pot oferi alternative temporare. Totul este set_flag / clear_flag / add_effect din Chapter 4, fără switch după event ID. Efectele expiră; rezolvarea elimină relevanța altui eveniment dependent. Alegerea gratuită nu introduce un ledger row de zero bani.

## 11. PRICING

Registry mic de intervale în bani întregi: apă/patiserie, cafea, prânz, delivery, print, materiale, transport, accesorii, reparații, cadouri etc. Sunt exemple de simulare, nu medii naționale sau prețuri de brand. Prețul exact este materializat o singură dată; relațiile base_plus_addon existente și limita PostgreSQL integer sunt validate. Feedbackul nou include suma efectivă, fără calificative morale.

## 12. CATALOG VERSIONING

Catalog v1 și policy v1 sunt intacte. Snapshot version rămâne 1, cu metadata life opțională pentru compatibilitate. Snapshoturile deja persistate nu sunt refăcute. Run-urile noi activate prin setup/profile pornesc direct v2 de la authoritative now. Run-urile vechi sunt întâi sincronizate în v1, apoi upgrade-ul se fixează pentru ziua de după azi și după ultimul plan deja salvat. Policy snapshot păstrează startsOn și previousPolicy, pentru goluri istorice până la tranziție. O cerere concurentă folosește revision/CAS și același run lock.

## 13. FILES CREATED/MODIFIED

Create:

```text
src/content/simulator/events/catalog-v2.server.ts
src/content/simulator/events/policy-v2.ts
src/content/simulator/events/prices.ts
src/content/simulator/events/life-builder.ts
src/content/simulator/events/routine.ts
src/content/simulator/events/food.ts
src/content/simulator/events/school.ts
src/content/simulator/events/work.ts
src/content/simulator/events/transport.ts
src/content/simulator/events/social.ts
src/content/simulator/events/shopping.ts
src/content/simulator/events/home.ts
src/content/simulator/events/digital.ts
src/content/simulator/events/leisure.ts
src/content/simulator/events/obligations.ts
src/content/simulator/events/unexpected.ts
src/content/simulator/events/opportunities.ts
src/content/simulator/events/weekend.ts
src/content/simulator/events/seasonal.ts
src/lib/simulator/events/life-taxonomy.ts
src/lib/simulator/events/life-report.ts
app/api/simulator/dev/life/route.ts
supabase/migrations/0007_simulator_life_catalog.sql
tests/simulator-life.test.ts
tests/simulator-life-state.test.ts
tests/simulator-life-integration.test.ts
tests/simulator-life-api.test.ts
tests/simulator-life-browser.mjs
scripts/verify-simulator-life.mjs
src/lib/simulator/CHAPTER_6.md
```

Modificate:

```text
src/content/simulator/events/registry.server.ts
src/lib/simulator/events/types.ts
src/lib/simulator/events/validate.ts
src/lib/simulator/events/planner.ts
src/lib/simulator/events/time.ts
src/lib/simulator/events/synchronize.ts
src/lib/simulator/server/database.ts
src/lib/simulator/server/events.ts
src/lib/simulator/server/chapter-two.ts
src/lib/simulator/server/consequence-demos.ts
app/api/simulator/profile/route.ts
app/api/simulator/dev/events/route.ts
app/simulator/dev/simulator-dev-client.tsx
tests/simulator-events.test.ts
tests/simulator-events-api.test.ts
tests/simulator-subscriptions-browser.mjs
tests/simulator-production.mjs
```

Artefacte: artifacts/simulator-chapter-six/catalog-and-simulation.json; artifacts/simulator-chapter-six/browser/report.json; capturi form/calendar/events la dimensiunile testate în același director; artifacts/simulator-qa/production-report.json. Un manifest cu toate căile Chapter 6 este în artifacts/simulator-chapter-six/files.json.

## 14. DATABASE

Nu sunt necesare tabele sau coloane noi. Migrarea 0007_simulator_life_catalog.sql adaugă doar RPC privat upgrade_simulator_life(uuid,uuid,bigint,date,timestamptz,boolean,jsonb), SECURITY INVOKER, search_path gol, execute doar service_role. Verifică owner/status, revision, ziua Bucharest, chronology caught-up și lipsa evenimentelor expirate pending; păstrează orice plan vechi. Nu scrie ledger sau instanțe și nu schimbă istoricul.

Aplicare manuală: verifică întâi că 0001–0006 sunt aplicate în proiectul Supabase corect; testează 0007 într-un mediu de test; deschide SQL Editor și rulează exact conținutul fișierului 0007; verifică existența funcției și granturile; apoi repornește aplicația cu codul nou. Nu rula reset/truncate și nu reaplica fișiere vechi. Nu am aplicat migrarea remote și nu am făcut deploy.

## 15. ENVIRONMENT VARIABLES

Nicio variabilă nouă de aplicație. Testele folosesc aceleași variabile Supabase cu un provider și PostgreSQL local, fără credențiale remote.

## 16. TESTS

npm test: 685/685 teste, 30/30 fișiere Vitest; trei verificatoare suplimentare pentru lecții PASS. Chapter 6: 43 teste noi (18 catalog/planner, 9 state, 8 PostgreSQL, 8 API). Browser: 17 fluxuri PASS, Next/SDK/PGlite real, Auth HTTP simulat; producție: 20 verificări PASS. Testele de regresie v1 rămân active. Nu există skip/only sau teste eliminate.

## 17. PLANNER SIMULATION REPORT

Seed-uri finly-life-liceu / finly-life-lucrez, început 2026-10-01, cu auto-resolution și consecințe istorice reale în memorie. Soldul de fixture este folosit numai la rezolvarea opțiunilor, niciodată pentru spawn.

| Profil | Zile | Evenimente | Zile liniștite | Zile cu ≥3 | Maxim observat |
| --- | ---: | ---: | ---: | ---: | ---: |
| Liceu | 30 | 41 | 5 (16,7%) | 3 (10%) | 5 |
| Liceu | 90 | 110 | 24 (26,7%) | 9 (10%) | 5 |
| Lucrez | 30 | 45 | 8 (26,7%) | 6 (20%) | 4 |
| Lucrez | 90 | 127 | 23 (25,6%) | 16 (17,8%) | 4 |

Zero încălcări pentru event cooldown, family cooldown, semantic cooldown, familie duplicată în zi sau suprapuneri de activități în toate mostrele. JSON include timeline complet, tag/family/domain/rarity counts, dayCounts, mostrele de 14 zile și diagnostic de duplicate.

## 18. LINT

npm run lint — PASS, fără erori sau warnings.

## 19. TYPECHECK

npx tsc --noEmit --pretty false — PASS.

## 20. BUILD

npm run build — PASS (Next 16.3.8). Nicio mutație DB, migrare sau sesiune de utilizator la build. Verificarea producției confirmă dev 404, private API 401/no-store, redirectul account-only și absența titlurilor/ID-urilor din catalog și a service-role din public JS.

## 21. /SIMULATOR/DEV MANUAL QA

1. Pornește npm run dev și autentifică-te. Aplică întâi migrarea în DB-ul de test. Nu folosi reset pe un run existent.
2. La /simulator/dev, pune „Zi pentru analiza vieții” = 2026-10-01. Apasă „Raport 90 zile — Liceu”. Este o simulare în memorie, nu modifică run-ul.
3. Zi liniștită: în simulation.dayCounts verifică 2026-10-09 și 2026-10-10 cu count 0. Zi normală: 2026-10-06 are două contexte diferite. Zi ocupată: 2026-10-12 are cinci; verifică orele/familiile în timeline.
4. Liceu: 2026-10-07 include print la 10:21, fotografii pentru panou la 12:17 și plimbare la 15:46. Weekendul folosește alte oportunități.
5. Apasă „Raport 90 zile — Lucrez”. Verifică 2026-10-05: pauză 11:24, context la 13:10, după program 17:45 și seară 20:13. Raportul nu schimbă profilul run-ului.
6. Anti-repeat: repetition trebuie să conțină numai zero; verifică familiile/tagurile pe timeline și cooldownurile/rejection reasons în selectedDay.candidates. Ziua aleasă aici este începutul unei simulări independente, nu replayul unui run personal. Diagnosticul „Inspectează planul” arată separat run-ul real și markerii persistați.
7. State chain: folosește „B. Problemă telefon”, avansează +15 minute, alege varianta gratuită din evenimentul dev. „Acum” arată flagul. Planifică „A doua verificare”, apoi „Repară telefonul”; avansează +15 minute și rezolvă. Verifică clear_flag și anularea celuilalt pending în diagnostic. Definițiile production pentru telefon/cablu/căști/geantă/cusătură sunt testate separat în simulator-life-state.test.ts.
8. Efect: „A. Provizii 2 zile”, +15 minute, rezolvă; inspectează activeEffects și effectiveAt. Avansează zilele pentru expirare. Testul production verifică alternativa de cină activă și după expirare.
9. Absență: lasă un eveniment pending, avansează +7 zile, continuă sincronizarea dacă caughtUp=false. Verifică resolutionEffectiveAt, auto choices, consecințe și markerii zilelor. Ledgerul abonamentelor rămâne unic.
10. /simulator: verifică Calendar și „Adaugă abonament” în Ce urmează, Acum direct dedesubt, Evenimentele de azi în locul existent, jurnalul și soldul. Verifică opțiunile gratuite/indisponibile și layoutul la 320/390/430.

Reproducere automată: node scripts/verify-simulator-life.mjs. Browserul trebuie lansat într-o copie izolată cu aceleași dependențe; tests/simulator-life-browser.mjs extinde testele Chapter 5. În QA, Turbopack.root a inclus rădăcina comună a copiei și node_modules legat, conform documentației Next; această setare este numai în copia QA, nu în next.config.ts al aplicației. Webpack dev a avut un manifest temporar gol; testul final Turbopack a trecut fără erori de browser/provider. Nu s-au modificat dependințe Next.

## 22. REQUIRES USER CHECK

Aplicarea manuală a migrației 0007 în proiectul Supabase real și verificarea acolo cu două sesiuni autentificate independente. Testele DB făcute aici folosesc PGlite local, nu proiectul hosted. Test fizic pe iPhone/LAN și PC/telefon după aplicare; dimensiunile mobile, lipsa crypto.randomUUID în browser și două pagini/dispozitive simulate au fost verificate automat. Nu a fost efectuat deploy.

## 23. INTENTIONALLY NOT IMPLEMENTED

Push notifications; analiză educațională la final de lună; extinderea job/locuință/viață; weather integration; generare AI runtime; inventar complet sau statistici RPG. Niciun nou card de dashboard. Capitolul 7 nu a fost început.
