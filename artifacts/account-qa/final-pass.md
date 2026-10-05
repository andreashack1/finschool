# Finly — final pass, 2026-10-05

Implementarea existentă a fost păstrată. Au fost finalizate auditul, regresiile,
QA browser și cleanup-ul; nu s-a creat o migrare suplimentară și nu s-a rulat SQL remote.

## Remedieri

- Intrarea online așteaptă progresul cloud și nu afișează cache local neverificat.
- SQL respinge versiuni de consimțământ absente/null/vechi și limitează stats invalide.
- Same-origin folosește originea publică configurată, inclusiv când Next are hostname intern.
- Callback/proxy folosesc domeniul configurat; callback invalid răspunde no-store.
- Ștergerea contului verifică identitatea tabului față de sesiunea verificată.
- Resetarea nu mai afișează succes pentru indisponibilitate/rate limit a providerului.
- Username are etichetă accesibilă stabilă, iar confirmarea expirată are mesaj explicit.
- Fini nu se mai suprapune cu textul lecției următoare pe Home.
- Bannerul sync nu interceptează clickuri; finalizarea lecției dezactivează butonul în timpul salvării.
- Persistența permanentă veche locală, stuburile și panoul dev au fost eliminate.
  Comenzile QA vechi sunt aliasuri către suita actuală, fără injectarea progresului local.

## Rezultate finale

- `npm test`: 7 fișiere, 202 teste trecute; toate cele trei verificări de conținut trecute.
- `npm run lint`: exit 0; 0 erori și 0 avertismente.
- `npm run build`: exit 0; compilare, TypeScript și generarea paginilor trecute.
- 17 chunk-uri JS client scanate: 0 referințe service role / marker secret de test.
- Browser: 32 verificări publice + 20 verificări suplimentare la 375/390/430/1440px,
  9 redirecturi fără cont și 8 grupuri de verificări end-to-end locale.
- Fără overflow în ecranele verificate și fără erori JavaScript.
- Prima lecție: resume la refresh, ID stabil, gate obligatoriu, import o singură dată.
- Lecția a doua: player autentificat → mutație Next reală → SQL → progres persistat.
- Retry cu UUID identic: fără XP/tentativă suplimentară.
- Două contexte de browser: aceleași XP, level, lecții, best score, perfect state,
  streak/longest/freeze, achievements și Daily Challenge din DB.
- Recuperare: OTP simulat → proof server → schimbare parolă → login cu parola nouă.

Auth HTTP a fost simulat în QA local. Next/API/SSR SDK și migrarea în PostgreSQL
PGlite sunt reale. Redeschiderea contextului folosește cookies exportate; închiderea
completă a browserului și livrarea emailurilor remote necesită test manual.
401 din `local-report.json` este cazul intenționat de parolă incorectă.

## Supabase remote

S-au executat numai probe read-only: Auth settings 200, username RPC 404.
`SUPABASE_SERVICE_ROLE_KEY` lipsește. Nu s-au creat conturi, trimis emailuri sau
testat mutații/sesiuni/cross-device pe proiectul Supabase real.

Rulează fișierul final `supabase/migrations/0001_accounts_and_progress.sql` o singură
dată pentru instalarea acestei scheme. Configurația `.env.local`, Vercel, URL-urile
Auth și exemplele template-urilor email sunt în `supabase/SETUP.md`.

După activare, urmează checklist-ul `supabase/security-checklist.md`: signup/email,
reset real și link expirat, logout/login, browser închis/redeschis, Incognito/al doilea
dispozitiv, mutații online/offline/retry, RLS cu două conturi și scrieri directe refuzate.

Rapoarte brute: `report.json`, `local-report.json`, `remote-report.json` în acest director.
