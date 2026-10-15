# FINLY ABOUT PAGE — FULL REBUILD

1. **Audit:** `/despre`, accesată din `/?tab=profile`, avea o pagină client de marketing separată vizual de aplicație. Au fost inspectate statusul și diff-ul existent, layout-ul privat, shell-ul, curriculumul, gamification și simulatorul.
2. **Probleme vechi:** navbar marketing, hero supradimensionat, card fictiv de lecție, XP/streak inventate, preview demo, dialoguri cu afirmații false despre conturi și salvare.
3. **Rută/auth:** `/despre` rămâne privată; vizitatorul ajunge la `/bun-venit`. Guard-ul și proxy-ul nu sunt modificate. Înapoi duce la `/?tab=profile`; CTA la `/lectii`.
4. **Structură:** header → hero → Ce este Finly? → Cum înveți → Ce găsești în Finly → simulator → De ce Finly? → CTA → linkuri legale.
5. **Copy nou:** redat integral mai jos.
6. **Features:** lecții, categorii/capitole, quiz-uri/scenarii, explicații, XP, streak, progres salvat, provocarea zilei, simulator cu venituri/cheltuieli/calendar/consecințe/abonamente/bilanț lunar. Referințe: `src/content/lessons/index.ts`, `app/components/gamification-ui.tsx`, `app/finly-client.tsx`, `app/simulator/simulator-client.tsx`, `financial-controls.tsx`, `monthly-review-panel.tsx` și serviciile simulatorului. Notificările nu sunt promovate.
7. **Eliminat:** demo/prototip, statistici false, Lecția 1 din 5, +20 XP, 3 zile la rând, signup CTA, promisiuni 100% gratuit/5 minute universal, vechiul dialog legal.
8. **Mobil:** margini existente 18–20 px, cards verticale, mascotă de 96 px lățime, touch targets de minimum 44 px, safe-area din shell. Zero overflow la 320/390/430 px.
9. **Desktop:** conținut de 800 px, hero cu Fini lateral, pași în trei coloane, features în două coloane. Zero overflow la 1366/1440/1920 px.
10. **Fini:** `/brand/fini-bust-normal.svg`, prin `FinlyMascot` și Next Image; asset-ul produsului actual.
11. **Design:** clase existente `finly-app`, `app-content`, `screen-heading`, `back-button`, `app-card`, `icon-tile`, `app-button`, `bottom-nav`, `desktop-brand`; culorile tokenizate și Bricolage Grotesque existente. CSS nou limitat la pagină.
12. **Counts:** 100 ready lessons din `getReadyLessons()`; 10 categorii filtrate din `categories` pe baza lecțiilor ready. Nicio valoare duplicată în componentă.
13. **Creat:** `app/despre/about.css`, `scripts/verify-about.mjs`, raportul și capturile QA.
14. **Modificat:** `app/despre/page.tsx`. **Șters:** `app/components/lesson-preview.tsx`, fără alte utilizări. Modificările preexistente sunt păstrate.
15. **Migrare DB:** NONE. Fixture-ul QA aplică migrările existente exclusiv în PostgreSQL temporar în memorie.
16. **Teste:** 36 fișiere, 756 teste PASS cu `npx vitest run --maxWorkers=2`; toate cele trei validări curriculum PASS. Prima rulare paralelă cu build/browser a avut un timeout la un test existent; reluarea păstrează timeout-urile și aserțiunile originale.
17. **Lint:** PASS după curățarea runner-ului generat.
18. **Typecheck:** `npx tsc --noEmit` PASS, plus TypeScript din build PASS.
19. **Build:** `npm run build` PASS. Fără deployment în această sarcină.
20. **QA:** Next real, SDK real, PostgreSQL local, Auth HTTP simulat. Flux Profil → Despre → Înapoi și CTA către Lecții PASS; guest redirect, deep link, headings, mascot asset/loading, keyboard și cele șase viewport-uri PASS. Zero erori JavaScript. Fixture-ul provider a primit patru erori de notificări din Profil; notificările nu au fost validate în acest test. Capturi inspectate vizual: 320, 390, 1440 px; celelalte capturi generate și verificate automat.
21. **Claims neverificate în cod:** NONE. Disponibilitatea simulatorului pe deployment-ul remote nu a fost verificată în această sarcină; raportul descrie implementarea locală actuală.

## Copy integral

**Despre Finly**

**Învață să te descurci cu banii.**

Lecții, situații practice și un simulator în care vezi ce se întâmplă când iei decizii cu banii.

**Ce este Finly?**

Finly este o aplicație de educație financiară pentru tineri. Înveți conceptele pas cu pas, apoi le aplici prin întrebări și situații inspirate din viața reală.

**Cum înveți**

- Înțelegi — Explicații simple și exemple pe care le poți lega de viața reală.
- Alegi — Răspunzi la întrebări și iei decizii în scenarii practice.
- Aplici — În simulator vezi cum alegerile de zi cu zi îți schimbă banii în timp.

**Ce găsești în Finly**

- 100 de lecții · 10 categorii — Organizate pe categorii și capitole, de la bazele banilor la decizii mai complexe.
- Quiz-uri și scenarii — Îți verifici ideile și primești explicații pentru răspunsuri.
- Progres în ritmul tău — XP-ul, streak-ul și progresul salvat în cont te ajută să rămâi constant.
- Provocarea zilei — Revii la ce ai învățat printr-o nouă întrebare.
- Simulator financiar — Exersezi decizii cu bani fictivi și urmărești efectele lor.

**Învață făcând alegeri**

În simulator gestionezi bani fictivi într-un calendar care urmărește timpul real. Primești venituri, ai cheltuieli și întâlnești situații de zi cu zi. Alegerile îți schimbă soldul, iar unele au consecințe mai târziu.

Poți adăuga abonamente și urmări plățile. La final de lună vezi unde s-au dus banii și ce ai putea schimba.

Banii și situațiile din simulator sunt pentru exercițiu.

Deschide simulatorul

**De ce Finly?**

- Fără limbaj complicat — Pornim de la zero, fără să presupunem că știi deja finanțe.
- Situații familiare — Exemplele pornesc de la lucruri pe care le întâlnești zi de zi.
- Loc pentru încercări — Poți testa alegeri în simulator fără să riști bani reali.

**Un pas mai departe.**

Alege ce vrei să înțelegi și învață în ritmul tău.

Vezi lecțiile · Termeni · Confidențialitate

## Manual QA A–P

A. Autentifică-te și deschide Profil/Cont (`/?tab=profile`).
B. Apasă „Despre Finly”; confirmă `/despre`.
C. Confirmă header-ul „Despre Finly” și „Înapoi la profil”; verifică revenirea.
D. Confirmă hero-ul compact „Învață să te descurci cu banii.”
E. Confirmă Fini în varianta bust actuală, fără suprapuneri.
F. Confirmă lipsa navbar-ului marketing; navigația aplicației rămâne disponibilă.
G. Caută în text „demo” și „prototip”: zero apariții.
H. Confirmă 100 lecții/10 categorii și compară cu `getReadyLessons()`/categoriile active.
I. Confirmă absența XP/streak fictive și „Lecția 1 din 5”.
J. Citește cele cinci feature rows și verifică disponibilitatea lor în aplicație.
K. Citește descrierea simulatorului și avertizarea despre bani fictivi; deschide simulatorul.
L. Apasă „Vezi lecțiile”: `/lectii`, fără signup CTA. Deschide direct `/despre`; apoi testează fără sesiune: `/bun-venit`.
M. DevTools responsive: 320 × 844; parcurge pagina până la CTA/footer, fără overflow sau tăieri.
N. Repetă la 390 × 844; verifică spacing, Fini și wrapping.
O. Repetă la 430 × 844; verifică lățimea cardurilor și safe-area.
P. Repetă la 1366/1440/1920 × 900; verifică max-width, grids și navigația. Folosește Tab pentru linkuri și focus vizibil.
