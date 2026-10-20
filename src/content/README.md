# Conținutul Finly

Curriculumul activ are **100 de lecții gata**, în **10 categorii** și **30 de capitole**.
Fiecare categorie are zece lecții. `categories.ts` declară ordinea pedagogică,
iar `lessons/index.ts` importă explicit fișierele statice și validează întregul arbore.
Nu există lecții „În curând” în curriculumul activ.

## Formatul lecțiilor

Toate cele 100 de lecții au `formatVersion: 2`; `contentVersion` urmărește
reviziile editoriale. Lecțiile încep cu o situație, alternează explicații și
practică și se încheie cu „Ține minte” și final. Numărul ecranelor și al
întrebărilor nu este fix. Metadata duratei folosește minute întregi.

Explicațiile au 2–4 paragrafe și 80–150 de cuvinte; cazul are 120–200.
Întrebările unui caz folosesc același `caseId`. Recapitularea are 4–6 puncte,
cu acțiunea „Ce poți face azi” la final. Schema impune ordinea, feedback-ul și
cel puțin trei tipuri de întrebări. Fiecare card din recapitulare, inclusiv
„Ce poți face azi”, cere un `detail` care adaugă informație și 1–3 expresii
`detailHighlights` prezente în text. Schema respinge duplicatele și copiile
aproape identice ale rezumatului. Rendererul oferă întotdeauna expandare.
Titlul și `leadIn` sunt opționale pentru întrebări; întrebarea poate fi singurul
heading, fără un prompt universal. Datele invalide opresc importul/build-ul.

Cele 48 de lecții finalizate în această etapă sunt în categoriile:
primul job (9), credite (9), pe cont propriu (10), comportament (10), investiții (10).
Sursele oficiale relevante sunt păstrate în `sourceUrls` și se pot deschide
din ecranul „Ține minte”. Exemplele numerice sunt ipotetice; lecția despre salariul
minim cere verificarea regulii actuale, fără să fixeze un prag care se poate schimba.

## Editare și integrare

Editează direct fișierul lecției din `lessons/`. Tipurile sunt în
`types/learning-schema.ts`. Păstrează ID-urile întrebărilor dacă sensul lor rămâne
același; pentru conținut nou, folosește ID-uri noi și crește `contentVersion`.
`formatVersion` identifică arhitectura pedagogică, separat de revizia conținutului.

Sursele editoriale ale ultimelor 48 de lecții sunt `scripts/curriculum-*.cjs`.
`node scripts/author-remaining-lessons.cjs` este generatorul istoric; nu este
folosit la runtime și suprascrie aceste 48 de fișiere cu sursa editorială veche.
Nu îl folosi pentru regenerarea lecțiilor după auditul de calitate: ar pierde
intervențiile curate. `lesson-quality-edits.cjs` documentează intervențiile
selective, iar `audit-lesson-quality.cjs` raportează validarea și ce mai necesită
revizuire. Testul de calitate păstrează un snapshot anterior pentru verificarea
materialului predat, ID-urilor și întrebărilor nemodificate.
`scripts/final-curriculum-map.cjs` păstrează harta celor 100 de titluri.
`node scripts/integrate-curriculum.cjs` generează harta și registry-ul static;
păstrează ID-urile celor șapte lecții publicate anterior.

## Progres și compatibilitate

Deblocarea este liniară în fiecare categorie, cu prima lecție disponibilă
independent în fiecare dintre cele zece categorii. Home caută prima lecție
neterminată și accesibilă, prioritizând ultima lecție începută dacă este accesibilă.
Progresul categoriei folosește cele zece lecții active; după una terminată este 10%.

ID-urile și ecranele celor șapte lecții publicate au fost păstrate. „Inflația”
continuă să folosească URL-ul `ce-este-inflatia`, iar „Primul tău buget” folosește
`primul-buget`. Reorganizarea mută apartenența unor lecții fără să schimbe răspunsurile
sau completările. Progresul unei categorii poate avea un procent mai mic deoarece
acum include mai multe lecții; completările și XP-ul câștigat rămân păstrate.

`archive/retired-lessons.ts` păstrează 103 metadata vechi pentru rezolvarea URL-urilor,
fără a le include în cele 100, deblocare ori recompense. Player-ul arată o explicație
pentru aceste URL-uri și trimite la catalog. Lecția rapidă `card-debit-vs-credit`
este păstrată separat; ruta rapidă pentru buget folosește obiectul publicat.
Linkurile vechi `cum-functioneaza-banii` și `economia-pe-scurt` duc la
`cuvintele-banilor`; categoria retrasă de afaceri duce la catalog.

Progresul contului este păstrat în Supabase și mapat la ProgressState v2.
Vechiul progres local de test nu este importat. Numai trial-ul primei lecții
folosește stare temporară cu resume; cache-ul și coada sunt separate pe userId.
Economia de replay este păstrată. Vezi `supabase/SETUP.md`.

## Verificări

- `npm test`: teste de cont, auth, SQL/RLS, sincronizare, gamification, shuffle și recompense pentru toate lecțiile,
  100 de formate extinse, harta canonică, arhiva, deblocarea și păstrarea progresului.
- `node scripts/validate-authored-lessons.cjs`: verifică toate cele 93 de lecții noi,
  inclusiv existența fișierelor și minimum jumătate de întrebări aplicate.
- `node scripts/verify-curriculum-browser.cjs`: alias de compatibilitate către
  `verify-account-local.mjs`, care testează playerul și progresul prin API-urile cloud,
  cu Auth simulat și migrarea PostgreSQL reală, pe mobil și desktop.
- `npm run lint` și `npm run build`: verificări de cod și build de producție.

Rapoartele sunt în `artifacts/curriculum-complete-validation.json`,
`artifacts/extended-content-validation.json`, `artifacts/answer-options-distribution.json`
și `artifacts/curriculum-complete-browser.json`.
Testul de browser acceptă `FINLY_PLAYWRIGHT_PATH` și `FINLY_BASE_URL`;
implicit folosește `http://127.0.0.1:3100`.
