# Conținutul Finly

`categories.ts` declară cele 12 categorii, dificultatea, ordinea și capitolele.
Capitolele conțin numai ID-uri de lecție. `lessons/coming-soon.ts` păstrează metadata,
iar fiecare lecție publicată are un fișier separat. Curriculumul are 119 lecții:
șapte sunt gata: Salariu brut vs. net și cele șase lecții publicate în acest update.

## Publicarea unei lecții

1. Creează un fișier în `lessons/` cu un `ReadyLesson`.
2. Importă lecția în `lessons/index.ts` și adaug-o în lista `content`.
3. Scoate metadata acelui ID din `comingSoonLessons`. Pentru o lecție nouă,
   adaugă ID-ul în capitolul potrivit din `categories.ts`.
4. Folosește un ID stabil, fără diacritice; păstrează ID-urile deja publicate.

Nu trebuie modificat player-ul, Home, progresul sau JSX-ul categoriilor.
Ordinea categorii → capitole → ID-uri este ordinea pedagogică.
Blocarea este liniară în fiecare categorie și ignoră lecțiile nepublicate.

`types/learning-schema.ts` definește schemele Zod și ecranele:
`situatie`, `explicatie`, `variante`, `adevarat_fals`, `scenariu`, `calcul`,
`recap`, `caz_real`, `tine_minte`, `final`. Tipurile TypeScript sunt derivate din scheme.
Cele șapte lecții gata folosesc `contentVersion: 2`, `formatVersion: 2`, 5 minute și XP-ul existent.
`formatVersion` selectează arhitectura pedagogică; `contentVersion` identifică revizia
conținutului pentru siguranța sesiunii. O revizie a unei lecții legacy nu îi schimbă formatul.
Formatul extins are 16 pași și 9 întrebări: situație, explicație, două întrebări,
explicație, două întrebări, caz, trei întrebări de caz, explicație, două întrebări,
Ține minte și final. Conținutul rapid vechi poate folosi în continuare recap.
Explicațiile au 2–4 paragrafe și 80–150 de cuvinte, plus exemplu/detaliu opțional.
Cazul are 120–200 de cuvinte și un `caseId` stabil, referit de cele trei întrebări.
Ține minte are 4–6 puncte; ultimul este acțiunea „Ce poți face azi”.
Schema impune ordinea, lungimile, feedback-ul și minimum trei tipuri de întrebări.
O lecție extinsă invalidă oprește dezvoltarea/build-ul cu ID-ul și regula încălcată.
Întrebările au 3–4 variante, feedback și răspuns blocat după selecție.

Registry-ul validează întreg arborele la import, inclusiv în production build:
ID-uri, ordinea categoriilor, referințe, apartenență, opțiuni corecte,
ecrane duplicate, recap și final. Datele invalide produc erori explicite.

## Progres, compatibilitate și XP

Sursa unică este acum `finly-progress-v2`, obiect versionat cu schema 1.
`finly-learning-progress-v1` este citit numai la migrare și nu este șters.
Progresul categorie/capitol se derivă numai din
lecțiile gata din curriculum. Zero lecții disponibile înseamnă „În curând”.
Home caută prima lecție gata, neterminată și accesibilă în ordinea curriculumului,
prioritizând ultima lecție începută dacă este încă disponibilă.

Toate cele șase ID-uri de categorie existente sunt păstrate:
primul-job, bani-de-zi-cu-zi, carduri-si-banca, economii, siguranta-financiara,
economia-pe-scurt. Titlurile și organizarea capitolelor s-au schimbat.
Toate vechile ID-uri de lecție rămân rezolvabile; cele retrase din curriculum
sunt metadata de compatibilitate și nu intră în numărătoare/progres.
Titlul „Inflația” păstrează ID-ul și URL-ul `ce-este-inflatia`.

La migrare se reunesc completările din v1 și din vechiul `finly-progress-v2`,
inclusiv aliasurile salary, inflatie, carduri și buget. ID-urile necunoscute din
v1 sunt păstrate. JSON corupt sau localStorage indisponibil nu provoacă crash.
Salvarea funcționează în memorie chiar când storage e blocat.
Evenimentele storage sincronizează taburile; SSR folosește snapshot gol.

Poziția, răspunsurile și încercările unei sesiuni sunt doar în memoria player-ului,
nu în localStorage. Reîncărcarea începe la primul pas. Cheia React include
`lesson.id:contentVersion`, astfel încât o schimbare de conținut repornește sesiunea.
Versiunea conținutului nu schimbă versiunea storage-ului și nu resetează completări,
ledger, XP, mastery, realizări sau streak. ID-urile întrebărilor păstrează sensul
vechi acolo unde acesta este același; întrebările diferite au ID-uri noi.
Contorul întrebărilor se derivă numai din ecranele interactive; bara numără toți pașii.
Dialogul „Recitește cazul” și accordionul sunt UI local, fără efect asupra scorului.

XP, streak, provocarea zilei, simulatorul și realizările folosesc motorul pur
`src/lib/progress.ts` și același obiect persistent. Completion se salvează numai
la intrarea pe final. Ledger-ul recompenselor împiedică XP duplicat.
Regulile și migrarea sunt documentate în [GAMIFICATION.md](GAMIFICATION.md).

Rutele rapide existente de buget și carduri sunt păstrate, pe
`/rapid?lesson=buget` și `/rapid?lesson=carduri`, cu același player generic,
aceleași ID-uri. Bugetul folosește acum lecția publicată de 30 XP din registry.
Doar cardurile rămân conținut rapid separat, fără să crească denominatorul
curriculumului. Bugetul publicat contează acum în progresul categoriei.
`/rapid?lesson=salary`, `/rapid?lesson=inflatie` și `/lectie` rămân compatibile.

## Date fiscale

`ro-facts.ts` centralizează datele fiscale și exemplul de calcul, validate prin
Zod. verifiedAt este 2026-10-03. Surse: Codul fiscal ANAF (art. 77, 78, 138, 156)
și instrucțiunile D112 din Ordinul 605/2026.
Exemplul exclude deduceri, facilități și alte rețineri. Titlurile nu includ cote
fiscale. Inflația explică creșterea generală a nivelului prețurilor, conform BCE.
Datele și URL-urile surselor nu apar ca informații de debug în UI.

## Verificare

- `node scripts/verify-learning.cjs`: schema, referințe invalide, ID-uri vechi,
  numărătoare, progres, deblocare și storage/migrare.
- `node scripts/verify-extended-lessons.cjs`: toate cele șapte formate extinse,
  fixture-uri invalide, XP perfect/replay și păstrarea progresului existent.
- `node scripts/verify-session-safety.cjs`: reload în mijlocul lecției,
  utilizator cu recompense deja câștigate, o singură greșeală, replay perfect,
  dialog neutru și focus de tastatură la 375, 390, 430 și 1440 px.
- `node scripts/verify-lesson.cjs`: browser, toate cele șapte lecții gata, rutele rapide vechi,
  feedback, caz/dialog, Ține minte, contoare, final, XP fără farming, refresh, Home, provocare și simulator;
  375, 390, 430 și 1440 px; cazuri storage gol, valid, complet și corupt.
- `node scripts/verify-accessibility.cjs`: axe WCAG pe pagini, player,
  feedback, recap și final.
- `npm run lint`, apoi `npm run build`.

Testele de browser acceptă FINLY_PLAYWRIGHT_PATH, FINLY_AXE_PATH și FINLY_BASE_URL.
Implicit serverul de test este http://127.0.0.1:3100. Nu sunt dependențe runtime.

## Ordinea variantelor

`variante` și `scenariu` folosesc implicit shuffle în player. Declară `shuffle: false`
când textul depinde de ordine (de exemplu „Toate cele de mai sus” sau referințe la
litere/poziții). Nu reordona static acele întrebări. Adevărat/Fals și `calcul`
păstrează ordinea existentă și sunt excluse din shuffle și balansarea statică.

`src/lib/lesson-options.ts` implementează Fisher–Yates pe copie, cu seed derivat
din sesiune, lesson ID și screen ID. Player-ul inițializează seed-ul numai după
hydration și îl schimbă la replay. Re-randările și recitirea cazului păstrează
ordinea; corectitudinea, selecția și feedback-ul urmăresc ID-ul opțiunii.
Seed-ul nu este salvat în localStorage, deoarece sesiunea existentă se resetează
deja la refresh. Nu este necesară schimbarea contentVersion pentru reorder.

Registry-ul validează toate lecțiile ready, inclusiv conținutul rapid legacy:
maximum două poziții corecte identice consecutiv în succesiunea întrebărilor
eligibile; distribuție cu diferență maximum unu per grup de 3/4 opțiuni, pentru
grupuri de cel puțin trei întrebări. `shuffle: false` este o excepție explicită.
Conținutul static nu este randomizat la build.

- `node scripts/verify-answer-options.cjs`: integritatea exactă a textelor,
  ID-urilor și metadata față de snapshot; balansare, shuffle, excepții și XP/mastery.
- `node scripts/verify-option-shuffle-browser.cjs`: ordine stabilă după feedback,
  resize și modal; shortcut-uri vizuale, highlights, replay și Ochi format la
  375/390/430/1440 px.
