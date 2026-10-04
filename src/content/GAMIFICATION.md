# Motorul de progres Finly

`src/lib/progress.ts` conține transformările pure. `src/lib/use-progress.ts`
încarcă progresul o singură dată și oferă acțiuni componentelor printr-un store
React comun. Numai `loadProgress` și `saveProgress` accesează localStorage.
Acțiunile sunt serializate; Web Locks coordonează taburile unde sunt disponibile.
Fiecare acțiune de recompensare salvează un singur obiect după toate calculele.
Dacă storage este blocat, sesiunea continuă în memorie.

## Compatibilitate

Cheia canonică rămâne `finly-progress-v2`. Vechiul envelope Zustand avea versiunea
0; schema nouă are `version: 1`. `migrateProgress` păstrează XP existent, ID-uri,
completări, simulator, recordul streak-ului și provocările identificabile.
Cheia `finly-learning-progress-v1` este importată numai la migrare, fără ștergere.
După migrare, obiectul canonic este singura sursă de adevăr.

Streak-urile vechi fără istoric sunt păstrate printr-o ancoră explicită de migrare,
fără date de activitate inventate. Bonusul streak deja atins este marcat gestionat.
Nu se acordă XP retroactiv și nu se afișează nivelurile sau realizările istorice
ca popup-uri noi. Utilizatorii noi pornesc cu 0 XP și streak 0.

## Recompense

- Prima completare: `lesson.xp`, fallback 30; cheia `lesson:{id}`.
- Toate întrebările corecte la prima încercare: +20 o dată per lecție,
  inclusiv într-un replay ulterior; cheia `perfect:{id}`.
- Provocarea zilei: +15 la primul răspuns, corect sau greșit; `daily:{date}`.
- Simulator: +50 la prima finalizare; `simulator:simulator`.
- Șapte zile active în același streak: +100 o dată per run; `streak7:{runId}`.

Ledger-ul împiedică reward duplicat. Sesiunile de lecție au și ID-uri pentru
protecție la double-click. Mastery folosește chei unice `lessonId:screenId`.
Realizările, nivelurile, freeze-ul și daily goal nu dau XP.

## Calendar și streak

Datele sunt calculate prin Intl în Europe/Bucharest, inclusiv DST. Lecțiile
finalizate (și replay-urile) și răspunsurile zilnice contează ca activitate;
simulatorul nu contează. Activitățile din aceeași zi sunt deduplicate.
Ziua curentă nu este considerată ratată.

Prima zi complet ratată eligibilă poate primi automat un freeze, maximum unul
pe săptămână ISO luni–duminică. Freeze-ul păstrează lanțul, fără a crește numărul
zilelor active. Următoarea zi neacoperită rupe lanțul; o absență lungă nu poate
fi salvată prin acumularea freeze-urilor. Recordul nu scade niciodată.

## Config și UI

`levels.ts` definește exact șapte niveluri, `achievements.ts` exact opt realizări,
iar `daily-challenges.ts` exact zece provocări. Configurile sunt validate la
import/build. Alegerea zilnică este deterministă după data locală și evită
repetarea imediată. Nivelul și procentele sunt derivate, inclusiv nivelul maxim.
Realizările deblocate rămân deblocate când curriculumul se extinde.

Nivelurile celebrate și toast-urile văzute sunt persistate separat de progres.
UI afișează întâi rezultatul acțiunii, apoi un singur moment de nivel și toast-uri
în ordine. Home și Profil folosesc aceiași helperi și același state.

## Verificare

`node scripts/verify-progress.cjs` verifică regulile pure, migrarea, ledger-ul,
freeze-ul, DST, nivelurile, realizările și storage invalid/blocat.
`node scripts/verify-gamification.cjs` verifică fluxurile în browser, persistența,
replay, double-click, două taburi, schimbarea zilei, accesibilitatea și layout-ul
la 375/390/430/1440 px. Nu necesită un framework de test nou.
