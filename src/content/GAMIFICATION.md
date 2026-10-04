# Motorul de progres Finly v2

`gamification-config.ts` este unica sursă pentru economia XP, niveluri, obiectivul
zilnic, freeze-uri și rotația provocărilor. Configul și conținutul sunt validate
cu Zod la import/build. `progress.ts` este API-ul public: transformări pure cu
`now: Date` injectat, selectori și o graniță explicită de storage. `use-progress.ts`
serializează acțiunile, recitește starea canonică și face o singură salvare per
tranzacție. Web Locks și evenimentul storage sincronizează taburile disponibile.

## Storage

Cheia existentă `finly-progress-v2` conține acum `version: 2`. Lipsa versiunii și
versiunile vechi sunt date de test și se resetează intenționat, fără migrare.
Un utilizator nou pornește cu 0 XP, Money Beginner, streak 0 și un freeze.
V2 se normalizează sigur; JSON corupt pornește curat, ID-urile XP duplicate sunt
numărate o singură dată. O versiune viitoare este read-only și nu este suprascrisă.
Cheile vechi nu mai sunt citite. Când storage nu este disponibil, se continuă în
memorie. Aplicația rămâne locală, fără backend sau garanții anti-cheat server-side.

Obiectul persistat conține jurnalul `xp_events`, `lessonStats`, activitățile și
freeze-urile pe date locale, balanța și ultima săptămână de grant, răspunsurile
zilnice, realizările cu data deblocării, notificările văzute, momentul de nivel
în așteptare, starea simulatorului, mastery și cea mai recentă dată observată.
Nu conține total XP, nivel curent, daily goal progress sau contoare de streak.
Aceste valori se derivă exclusiv din istoricul valid.

## Economia XP

- Prima finalizare: 4 XP per întrebare corectă din prima și 20 XP pentru lecție.
  XP-ul întrebărilor rămâne pending până la finalizare. Abandonul nu acordă XP.
- Perfect la prima finalizare: încă 15 XP. 7/9 = 48 XP; 9/9 = 71 XP din lecție.
- Replay: `min(max(score - previousBest, 0) × questionXp, 10)` per replay.
  Niciun bonus perfect retroactiv; un replay perfect poate debloca o realizare.
- Provocare corectă: 15 XP. Greșit: 0 XP, fără retry; ambele contează ca activitate.
- Daily Goal: 50 XP eligibili declanșează 10 XP o singură dată pe zi.
- Milestone streak: 3/7/14/30 zile active acordă 25/75/150/300 XP, fiecare o singură
  dată pe durata progresului v2, indiferent de câte ori se reconstruiește streak-ul.
- Simulatorul primar: 100 XP o singură dată. Realizările acordă 0 XP.
- Debug: un eveniment separat afectează totalul/nivelul, fără realizări XP sau goal.

Evenimentele au ID-uri deterministe pentru recompense unice. Jurnalul este
append-only; dubla finalizare a aceleiași sesiuni nu schimbă nici XP, nici numărul
completărilor. Mastery folosește `lessonId:screenId`, independent de shuffle.
Toate evenimentele unei lecții sunt atribuite datei locale a finalizării.

Daily Goal folosește flag-ul `countsTowardDailyGoal` al sursei. Contează întrebările,
finalizarea, perfectul inițial, replay improvement și provocarea corectă. Nu contează
bonusul goal-ului însuși, milestones, simulatorul sau debug. De exemplu 48 XP din
lecție + 15 din provocare declanșează +10, total 73 XP și 63 XP eligibili azi.

## Niveluri, calendar și freeze

Pragurile sunt 0, 150, 400, 800, 1400, 2200, 3200, 4500 XP: Money Beginner,
Budget Rookie, Money Explorer, Money Smart, Budget Builder, Finance Pro,
Money Master, Money Mentor. Progresul este relativ la pragul nivelului curent;
1050 XP înseamnă 250/600 în Money Smart. Nivelul maxim are bara 100%.
O tranzacție cu mai multe niveluri produce un singur moment cu nivelul final.

`bucharest-date.ts` folosește Intl Europe/Bucharest, inclusiv DST. `clock.ts` este
singurul wall-clock; în teste timpul este explicit, în dezvoltare poate fi avansat
virtual pe zile calendaristice. `maxSeenDateKey` și `maxSeenAt` împiedică regresia
accidentală a calendarului local și reluarea recompenselor din zile vechi.

O zi devine activă doar la finalizare de lecție sau submit al provocării. Mai multe
acțiuni în aceeași zi contează o dată. Freeze-ul protejează o singură zi complet
ratată, fără să crească streak-ul. Două zile consecutive ratate rup lanțul;
freeze-urile nu se pot concatena. Două absențe izolate, separate prin activitate,
pot fi protejate dacă există balanță. În fiecare luni se adaugă un freeze, până la
maximum 2. Reconcilierea la load poate consuma freeze, fără XP sau activitate nouă.

## Provocări și realizări

Exact 40 de provocări sunt permutate determinist cu Fisher–Yates folosind luna
locală și versiunea rotației. Ziua lunii selectează un index distinct: fără repetări
într-o lună de 31 de zile. Răspunsul și rezultatul se păstrează per dată locală.

Exact 21 de realizări active folosesc condiții declarative și ID-uri stabile.
Specialist cere o categorie cu minimum 3 lecții ready și toate terminate.
Condițiile controlează doar prima deblocare; extinderea curriculumului nu revocă
realizările. Progresul locked este derivat, iar data deblocării și notificările
văzute sunt persistate. Dialogul de nivel precede toast-urile, fără suprapunere.

Home, Profil, finalul lecției, provocarea și simulatorul folosesc același store/API.
Profilul afișează și ultimele șapte zile și jurnalul XP. Flame și Snowflake disting
activitatea de protecție. Mișcarea este discretă și respectă reduced motion.

## Verificare

- `npm test`: Vitest și verificările conținutului/curriculumului, inclusiv integritatea
  exactă a textelor, ID-urilor, screen order și metadatelor lecțiilor.
- `node scripts/verify-gamification.cjs`: QA de producție la 375/390/430/1440 px,
  reset v2, pending XP, replay, daily goal, refresh, simulator, shuffle și Axe.
- `node scripts/verify-gamification-moments.cjs`: level-up, focus/Escape, freeze și
  persistența notificărilor la aceleași dimensiuni.
- `node scripts/verify-gamification-dev.cjs`: panoul development-only, reset,
  calendar virtual, debug XP și finalizare prin acțiunea reală de domeniu.
- `npm run lint` și `npm run build` verifică integrarea finală.

Scripturile browser primesc `FINLY_PLAYWRIGHT_PATH`, `FINLY_AXE_PATH` și opțional
`FINLY_BASE_URL` / `FINLY_DEV_URL`. Panoul dev este exclus din UI și chunk-urile
producției; nu implementează reguli alternative de recompensare.
