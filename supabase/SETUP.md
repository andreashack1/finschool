# Activarea conturilor Finly

Codul folosește Next 16 `proxy.ts`, Supabase JS 2.117.2 și SSR 0.12.7. Database
este singura sursă de progres pentru cont. `progress.ts` și gamification config
rămân motorul unic; SQL persistă rezultatul calculat de server, fără motor XP separat.

## Configurare

1. Creează/deschide proiectul Supabase.
2. În Settings → API / API Keys copiază Project URL, anon/publishable key și cheia
   service_role pentru operații server. Cheia service_role nu este publică.
3. În rădăcina aplicației, `.env.local` trebuie să fie **fișier**, cu:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ANON_OR_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=SERVER_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`NEXT_PUBLIC_APP_URL` trebuie să coincidă exact cu originea folosită în browser
(protocol + host + port, fără cale). Este originea de încredere pentru protecția
same-origin a mutațiilor și pentru redirecturile callback/proxy. În producție
setează domeniul public, nu un hostname intern al platformei.

Directorul `.env.local` găsit inițial a fost păstrat ca `.env.local.backup`.
Fișierul nou păstrează cele două valori existente; service role încă trebuie
completată. Valorile reale nu sunt în git și nu au fost afișate în raport.

4. Execută o singură dată `supabase/migrations/0001_accounts_and_progress.sql`
   în Supabase SQL Editor. Nu există migrări anterioare necesare în acest proiect.
   SQL este tranzacțional; nu a fost executat remote de agent.
5. Authentication → URL Configuration:
   - Site URL: URL-ul real de producție.
   - Redirect URLs: `http://localhost:3000/auth/callback` și
     `https://DOMENIUL-REAL/auth/callback`.
   - Adaugă și variantele pentru resetare:
     `http://localhost:3000/auth/callback?next=/actualizeaza-parola` și
     `https://DOMENIUL-REAL/auth/callback?next=/actualizeaza-parola`.
     Dacă deschizi local aplicația prin 127.0.0.1, folosește același host în
     NEXT_PUBLIC_APP_URL și adaugă ambele variante pentru acel host.
   - Recuperarea folosește același callback cu `next=/actualizeaza-parola`.
     Callback-ul acceptă code PKCE și token_hash OTP, cu redirects interne validate.
6. Verifică opțiunea Confirm email și template-urile email. Signup suportă atât
   confirmarea activată, cât și sesiunea imediată. PKCE trebuie deschis în browserul
   care a cerut linkul; callback-ul OTP poate fi folosit cu template token_hash.
   Pentru confirmare care poate fi deschisă și în alt browser, template-ul
   **Confirm signup** poate folosi linkul:

   ```html
   <a href="{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email">Confirmă contul</a>
   ```

   Pentru **Reset password**, linkul compatibil cu parametrul `next` trimis de cod:

   ```html
   <a href="{{ .RedirectTo }}&token_hash={{ .TokenHash }}&type=recovery">Resetează parola</a>
   ```

   Aceste două exemple sunt pentru cererile trimise de Finly. `.RedirectTo`
   include deja `?next=/actualizeaza-parola` la resetare. Nu adăuga încă un `?`.
   Template-urile implicite cu `.ConfirmationURL` rămân compatibile cu PKCE;
   în acel caz linkul se deschide în browserul care a început cererea.
   Vezi documentația oficială pentru
   [template-uri email](https://supabase.com/docs/guides/auth/auth-email-templates) și
   [URL-uri permise](https://supabase.com/docs/guides/auth/redirect-urls).
7. Verifică politicile Auth: inactivity timeout, session lifetime și single-session
   policy să corespundă produsului. Codul nu introduce timeout custom de login.
   Nu presupune valori din dashboard; sesiunile revocate/expirate cer reautentificare.
8. Repornește `npm run dev`. După schimbarea variabilelor publice pentru producție,
   reconstruiește aplicația.

## Vercel

Project → Settings → Environment Variables: adaugă **toate cele patru** variabile
de mai sus. `NEXT_PUBLIC_APP_URL` este domeniul real Vercel. Service role este secret
server-only; nu o prefixa cu NEXT_PUBLIC_. Redeploy după configurare.

## Persistență și QA

- Snapshot: `GET /api/progress`; mutații cu dovezi: `POST /api/progress`.
- X-Finly-Account este doar o verificare de context, niciodată autoritate de user.
  Userul țintă provine exclusiv din `auth.getUser()` verificat pe server.
- Read/apply/profile RPC-uri service-only. Revizie CAS + row lock + operation UUID
  + event_key unic protejează concurența și retry-ul după răspuns pierdut.
- Cache: `finly-account-cache:v1:{userId}`, doar afișare. Coada FIFO:
  `finly-sync-queue:v1:{userId}`. Focus/online/resume refac snapshot-ul și sincronizarea.
  La intrarea online cache-ul nu se afișează până la răspunsul cloud. Un cont deja
  verificat poate folosi cache-ul când browserul este offline.
- Trial: `finly-onboarding-progress:v1`, numai prima lecție canonică, cu first
  answers și ID stabil. Se șterge numai după import confirmat de server.
- `finly-progress`/`finly-progress-v2` nu sunt citite/importate de cont; nici XP-ul de test.
- Simulatorul existent folosește aceeași mutație server; UX-ul lui nu a fost refăcut.
- Documentele legale sunt draft `2026-10-draft`, marcate „În lucru”, fără contract inventat.

Rulează `npm test`, `npm run lint`, `npm run build`. Browser QA:
`node scripts/verify-account-browser.mjs`, cu FINLY_QA_URL dacă portul diferă și
FINLY_PLAYWRIGHT_PATH dacă Playwright nu este în locația locală documentată în script.
Raportul și imaginile se găsesc în `artifacts/account-qa/`.

QA complet local, inclusiv Home, Profil, recovery valid și mutațiile reale Next/SQL:
`node scripts/verify-account-local.mjs`. Acesta pornește un provider Auth simulat
pe 3116 și Next pe 3115, cu chei fictive în procesul izolat. Migrarea este executată
în PostgreSQL PGlite; `.env.local` și Supabase remote nu sunt modificate.
Raport: `artifacts/account-qa/local-report.json`.

Verificare read-only online: `node --use-system-ca scripts/verify-supabase-remote.mjs`.
La final pass din 2026-10-05: Auth settings 200, username RPC 404, service role lipsă.
404 indică faptul că RPC-ul nu este disponibil prin API; trebuie verificată/rulată
migrarea în proiectul configurat. Nu s-au făcut signup/login sau mutații remote.

Continuă cu verificările remote/manuale din `security-checklist.md` după activare.
Acestea includ livrare email, close/reopen și login Incognito/cross-device; nu sunt
declarate ca executate într-un Supabase încă neconfigurat complet.
