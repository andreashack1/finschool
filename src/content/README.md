# Conținutul Finly

`categories.ts` definește curriculumul și ordinea categorie → capitol → lecție.
`lessons/index.ts` leagă metadata din catalog de lecțiile publicate. Lecțiile fără
fișier în registry sunt automat `coming-soon`; nu au conținut gol în player.

## Adăugarea unei lecții

1. Creează un fișier în `lessons/`, exportând un `ReadyLesson`. Contractele sunt în
   `../types/learning.ts`: text, multiple-choice, true-false, scenario, quick-calc.
2. Importă lecția și adaug-o în lista `content` din `lessons/index.ts`.
3. Adaugă ID-ul și titlul în capitolul potrivit din `categories.ts`. `categoryId`
   și `chapterId` din lecție trebuie să corespundă catalogului.
4. Pentru publicarea unei categorii, schimbă statusul ei în `active`.

Player-ul, rutele, recomandarea Home, progresul și completion nu necesită modificări.
Folosește ID-uri stabile fără diacritice. Ordinea din catalog stabilește deblocarea;
lecțiile nepublicate sunt ignorate, iar următoarea lecție gata se deblochează după
cele gata anterioare din categorie, inclusiv la trecerea între capitole.

Pentru întrebări, fiecare opțiune are un ID; `correctOption` referă acel ID.
Un calcul are opțiuni numerice și `expectedAnswer`. Ordinea opțiunilor rămâne stabilă.
Feedback-ul explică motivul răspunsului, iar `feedbackFini` poate adăuga un mentor
ocazional. `recapPoints` apare la final, limitat la trei idei.

## Progres și compatibilitate

`finly-learning-progress-v1` păstrează doar versiunea, ID-urile terminate,
ultima lecție și data actualizării. Procentele se derivă din lecțiile `ready`.
Storage invalid sau indisponibil are fallback gol, cu progres funcțional în memorie.
Citirea are loc după mount; serverul folosește snapshot gol pentru hidratare stabilă.
Evenimentele `storage` sincronizează progresul între taburi.

La prima utilizare se migrează completion din `finly-progress-v2`, fără a
reacorda XP. Store-ul existent rămâne registrul recompenselor XP și al simulatorului;
starea educațională se citește exclusiv din noul progres. Refacerea unei lecții nu
acordă XP suplimentar. Screen index se resetează la refresh, conform flow-ului actual.

Lecțiile rapide existente despre buget și carduri sunt păstrate în același player.
Rămân accesibile din Home și din vechile linkuri `/rapid?lesson=...`, deși categoriile
lor complete sunt încă „În curând”. `/lectie` redirecționează către lecția salariului.

## Surse și verificări

Cotele fiscale și exemplul de salariu provin din `ro-facts.ts`, verificat pe
2026-10-03: Cod fiscal ANAF, art. 77, 78, 138 și 156, plus instrucțiunile D112 din
Ordinul 605/2026. Exemplul standard exclude deduceri și situații speciale.
Lecția inflației folosește materialul explicativ BCE, cu sursa în metadata.
Nu există cereri de rețea pentru conținut în timpul lecției.

- `node scripts/verify-learning.cjs`: catalog, screen contracts, progres, unlock,
  cazuri zero-ready/all-complete, migrare și storage invalid/blocat.
- `node scripts/verify-lesson.cjs`: browser, completion, retake, XP, refresh,
  tastatură, toate cele patru lecții și 375/390/430/1440 px.
- `node scripts/verify-accessibility.cjs`: axe WCAG, inclusiv Home, Profil,
  Simulator, categorii, player și feedback.
- `npm run lint`, apoi `npm run build`.

Scripturile de browser acceptă `FINLY_PLAYWRIGHT_PATH`, `FINLY_AXE_PATH` și
`FINLY_BASE_URL` (implicit `http://127.0.0.1:3100`). Nu adaugă dependențe runtime.
