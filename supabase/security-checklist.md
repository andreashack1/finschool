# Finly — verificări de securitate

## Verificat automat, local

`npm test` rulează motorul existent, validarea contului, SDK-ul Supabase SSR cu
transport simulat, coada offline și migrarea pe Postgres local (PGlite, exclusiv
dependență de test). Nu creează conturi fake în aplicație sau un backend alternativ.

- Migrarea se execută integral într-o tranzacție.
- Trigger-ul creează profilul și consimțămintele; username duplicat/rezervat și
  lipsa declarației parentale pentru 14–15 sunt refuzate de DB.
- Rolul authenticated poate selecta numai propriul profil; anon nu citește progres.
- Scrierile directe în XP, lecții și streak sunt refuzate.
- RPC-urile private nu sunt accesibile din rolurile anon/authenticated.
- Disponibilitatea username-ului returnează numai boolean.
- Două completări simultane produc o singură recompensă de primă finalizare.
- Două îmbunătățiri simultane ale aceluiași best score produc un singur reward.
- Daily Challenge concurrent păstrează un singur răspuns și un singur reward.
- Un operationId repetat nu repetă tentativa sau XP-ul; event_key este unic.
- Trial-ul canonic anterior contului se importă o dată; replay-ul nu repetă baza.
- Activitatea offline de luni sincronizată marți rămâne activitate de luni.
- Răspunsul pierdut după commit reîncearcă același ID.
- Sesiunea invalidă păstrează coada contului; logout-ul explicit o curăță.
- Header-ul de context este comparat cu userul verificat: coada A nu se aplică în B.
- Cookie-urile SSR persistă între clienți request-scoped și sunt curățate la logout.
- Recuperarea cere callback valid și dovadă HMAC server-only, cu expirare și user exact.
- Ștergerea auth.users face cascade în toate cele zece tabele ale utilizatorului.
- Versiunile absente/null/vechi ale consimțământului resping atomic signup-ul.
- Toate cele 11 tabele au RLS și nu acordă clientului INSERT/UPDATE/DELETE.
- Online, cache-ul local nu se afișează înaintea snapshot-ului serverului.
- Origin și redirecturile folosesc NEXT_PUBLIC_APP_URL și funcționează prin
  hostname intern Next fără să accepte origini externe sau forwarded host arbitrar.
- Ștergerea verifică același header de context ca celelalte mutații.

Browser QA complet: `node scripts/verify-account-local.mjs`; Auth este simulat,
dar rutele Next și migrarea PostgreSQL sunt cele reale. Include signup/import,
retry, Daily Challenge, refresh, context redeschis cu cookies, al doilea browser,
logout/login, recovery, forms, keyboard, focus pe erori și cache întârziat.
Ecranele sunt capturate la 375/390/430/1440px. Nu dovedește email delivery sau
funcționarea unui proiect Supabase remote.

## De verificat în proiectul Supabase după configurare

Migrarea nu a fost executată în proiectul remote. Testele cu transport Auth simulat
nu înlocuiesc livrarea emailurilor și politicile sesiunilor din dashboard.

1. Rulează `migrations/0001_accounts_and_progress.sql` o singură dată în SQL Editor.
2. Creează două conturi de test prin Finly. Cu anon key + sesiunea normală A,
   încearcă SELECT după user_id B pe fiecare tabel; rezultatul trebuie să fie gol.
   Pe profiles, filtrul este `id`. Pentru anon, SELECT trebuie refuzat.
3. Cu client authenticated normal, încearcă INSERT xp_events, UPDATE lesson_progress,
   UPDATE user_stats, INSERT user_achievements și apelurile RPC private: toate refuzate.
4. Testează username simultan în două ferestre: numai unul se înregistrează.
5. Fresh browser: welcome → /incepe → rezultat → gate → signup → email dacă este
   activat → callback → import → Home. Username/display name și XP sunt cele reale.
6. Închide complet browserul și redeschide. O sesiune Supabase refresh încă validă
   trebuie să ajungă direct în Home. Sesiunile revocate cer autentificare.
7. În Incognito, autentifică același cont: XP, level, lecții, best score, streak,
   freeze, realizări și răspunsul Daily Challenge trebuie să coincidă.
8. Cu contul și cache-ul deja încărcate, treci offline, termină o lecție, reconectează.
   Verifică o singură operație/recompensă și data Bucharest a activității.
9. Verifică resetarea pentru email cunoscut/necunoscut, link expirat, actualizare și
   login cu parola nouă. Configurează SMTP/livrarea emailurilor în Supabase.
10. Logout ascunde datele și șterge cache/coadă; login le recuperează din DB.
    Ștergerea cere username exact, șterge Auth și progresul, apoi arată welcome.

## Limite explicite

Un client offline poate manipula răspunsurile/timpul local. Serverul verifică
conținutul, opțiunile, prima lecție, timestamps și recalculează reward-urile; nu
acceptă XP, level, streak sau corectitudine furnizate de client. Aceasta nu este
o garanție de anti-cheat pentru dispozitiv. Pagina nu colectează date bancare.
