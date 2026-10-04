# Finly — raport de verificare a lecțiilor extinse

Verificare: 4 octombrie 2026. Browser QA pe build-ul de producție.

La inspecția inițială, workspace-ul conținea deja lecțiile extinse și rendererele
lor. Au fost păstrate, inspectate și testate. În această intervenție au fost
separate revizia conținutului de formatul pedagogic, întărite testele și eliminate
titlurile de feedback repetate din conținutul lecției Dobânda compusă.

1. **Fișiere modificate în această intervenție:** `src/types/learning-schema.ts`,
   `src/content/README.md`, `scripts/verify-extended-lessons.cjs` și cele șapte
   fișiere din `src/content/lessons`: `salariu-brut-vs-net.ts`, `inflatia.ts`,
   `fondul-de-urgenta.ts`, `primul-buget.ts`, `scorul-de-credit.ts`, `phishing.ts`,
   `dobanda-compusa.ts`. Testele au regenerat capturi și rapoarte în `artifacts`.
   Player-ul și rendererele inspectate sunt `app/components/lesson-player.tsx`
   și `app/components/lesson-reading.tsx`; stilurile sunt în `app/finly-app.css`.
2. **Tipuri:** `LessonScreen` este derivat din discriminated union Zod.
   Suportă explicații structurate, `caz_real`, `tine_minte` și `caseId` pe întrebări.
   `ReadyLesson` are `contentVersion` și, acum, `formatVersion` independent.
3. **Zod:** explicațiile structurate au 2–4 paragrafe și 80–150 de cuvinte;
   cazurile au 2–3 paragrafe și 120–200 de cuvinte. Exemplul și detaliul sunt
   opționale. Ține minte are 4–6 itemi cu titlu/body/detail și se termină cu
   acțiunea „Ce poți face azi”. Referințele, opțiunile și ID-urile sunt validate.
4. **Validator pedagogic:** `formatVersion: 2` impune exact ordinea celor
   16 ecrane, 9 întrebări, 3 explicații, un caz urmat imediat de 3 întrebări
   asociate, recapitularea penultimă și finalul ultim. Cere feedback în ambele
   situații și minimum 3 tipuri interactive. Registry-ul îl execută la import,
   inclusiv în build. Lecțiile coming-soon nu au această obligație.
5. **Cele șapte lecții:** toate au 5 minute, 30 XP, 16 pași, 9 întrebări și
   5 puncte de recapitulare. În total: 112 pași, 63 întrebări, 21 explicații,
   7 cazuri. Explicațiile au 95–122 de cuvinte, cazurile 146–163.
   Întrebările au fost citite în ordinea lecției, după explicațiile relevante.
6. **Versiuni și sesiuni:** toate cele șapte au `contentVersion: 2` și
   `formatVersion: 2`. Revizia poate crește fără să schimbe formatul.
   Poziția și răspunsurile nu sunt persistate în aplicația existentă.
   Reload pornește la pasul 1; cheia React include ID-ul și contentVersion.
   Nu a fost introdus un nou sistem de persistență a sesiunilor.
   Completările, XP, ledger-ul, mastery, achievements și streak rămân păstrate.
7. **Recitește cazul:** dialog nativ generic, centrat pe desktop și apropiat
   de marginea inferioară pe mobil, cu maximum 78dvh și scroll intern.
   Are etichetă accesibilă, focus inițial, închidere cu Escape/buton și returnarea
   focusului. Testat înainte și după răspuns: aceeași întrebare, același progres,
   aceeași selecție și același rezultat perfect.
8. **Ține minte:** renderer generic cu accordion, primul item deschis,
   preview al primei propoziții și `aria-expanded`/`aria-controls`.
   Expandarea este exclusiv UI, fără efect asupra XP sau progresului.
9. **Contoare:** „Întrebarea X din 9” este derivat numai din ecranele interactive.
   Nu apare pe citire, caz, recapitulare sau final. Bara numără toți cei 16 pași,
   începe la 1/16 și ajunge la 100% pe final. Nu există timer de lecție.
10. **Perfect și replay:** testat pentru fiecare lecție: 9/9 din prima = 50 XP
    la prima finalizare; o greșeală = 30 XP; replay perfect ulterior = 20 XP
    dacă bonusul lipsea; replay după recompense = 0 XP. Primul răspuns contează.
    ID-urile lesson/category/chapter și XP au fost comparate cu snapshot-ul
    existent. Cheile istorice mastery sunt păstrate, inclusiv cele retrase.
11. **ro-facts:** exemplul salarial importă cifrele din `ro-facts.ts`.
    Nu au fost schimbate ratele sau `verifiedAt` și nu a fost pretinsă o nouă
    verificare fiscală. UI afișează „Cifre orientative”. Nu există quiz fiscal
    exact bazat pe date lipsă. Creditul folosește concepte generale, fără formule,
    praguri sau reguli românești inventate. Exemplele matematice sunt ipotetice;
    dobânda compusă nu promite randamente și păstrează nota educațională.
12. **Mobile QA:** 375, 390 și 430 px, toate cele șapte lecții parcurse.
    Contoare, feedback, caz, modal, accordion, final și replay verificate.
    Fără overflow orizontal. Capturi generate în `artifacts`.
13. **Desktop QA:** 1440 px, aceleași verificări și inspecție vizuală a
    explicațiilor, modalului și recapitulării. Fără erori de consolă/hydration.
    Axe: 296 scanări WCAG A/AA la mobil și desktop, zero încălcări.
14. **Lint:** `npm run lint` — PASS, inclusiv după ultimele modificări de teste.
15. **Build:** `npm run build` — PASS: compilare, TypeScript și generare rute.
    Prima încercare în sandbox nu a putut descărca fonturile Google existente;
    rularea cu acces la rețea a trecut fără schimbarea fonturilor aplicației.

## Dovezi automate

- `extended-content-validation.json`: identitate, lungimi și structura tuturor lecțiilor.
- `extended-session-safety.json`: sesiuni, recompense și modal la toate cele patru lățimi.
- `curriculum-browser-results.json`: cele șapte lecții, storage și fluxuri existente; errors = [].
- `learning-accessibility.json`: cele 296 de scanări, fără încălcări.

Au trecut `verify-learning.cjs`, `verify-progress.cjs`,
`verify-extended-lessons.cjs`, `verify-session-safety.cjs`,
`verify-lesson.cjs` și `verify-accessibility.cjs`.
Fixture-urile invalide verifică explicit: 7 întrebări, lipsa Ține minte,
caz prea scurt, explicație prea lungă, caseId inexistent, final în poziție greșită,
feedback lipsă, ID-uri duplicate, opțiune corectă inexistentă, acțiune lipsă
și contentVersion lipsă pentru formatul extins. Nu a rămas conținut invalid.
