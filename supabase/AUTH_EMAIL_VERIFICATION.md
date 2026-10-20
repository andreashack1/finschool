# Finly email verification V2

## State contract

Signup calls Supabase Auth once after form/username validation. A session returns
`authenticated`; every successful outcome without a session returns
`check_email_or_login`. The latter includes obfuscated existing-user responses:
it does not prove account creation or email delivery. No email lookup is exposed.
Profiles are created by the existing auth-user INSERT trigger, never by resend.

The browser keeps the normalized pending email and resend deadline in
sessionStorage (tab lifetime), only for UX. Signup starts a 60-second cooldown;
every successful resend starts another. Refresh reads the same deadline. There
is no lifetime resend count. Supabase and SMTP remain authoritative rate limiters.
Blocked storage degrades gracefully to in-memory cooldown and provider limits.
Authenticated account initialization/login clears both hints. Password-reset
requests have a separate sessionStorage cooldown and retain generic responses.

Resend uses only `auth.resend({type:'signup'})`. Generic validation outcomes
remain generic; server diagnostics retain stage, code and status, never provider
messages, email addresses, credentials or tokens. HTTP 429/provider rate-limit
codes remain errors, without an invented Retry-After value.

## Required production configuration — verify in Dashboard

These settings have NOT been inspected or changed remotely by this task.

1. Supabase → Authentication → Providers → Email: **Confirm email ON**.
   Preserve account-enumeration protection; review Confirm phone together with
   Supabase signup documentation because it affects existing-user responses.
2. Authentication → URL Configuration → Site URL:
   `https://finly2-ruddy.vercel.app`.
3. Redirect URLs must include:
   - `https://finly2-ruddy.vercel.app/auth/callback`
   - `https://finly2-ruddy.vercel.app/auth/callback?next=/actualizeaza-parola`
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/callback?next=/actualizeaza-parola`
   Add the same two entries for the actual local dev port and 127.0.0.1 if used.
   Set local NEXT_PUBLIC_APP_URL to that exact dev origin. To intentionally send
   local email callbacks, also set server-only FINLY_DEV_AUTH_EMAIL_ORIGIN to
   that loopback origin. Without this opt-in, Auth emails target the public app.
   See [password recovery configuration](AUTH_PASSWORD_RECOVERY.md).
4. Vercel production NEXT_PUBLIC_APP_URL must be
   `https://finly2-ruddy.vercel.app`. No deployment was performed here.
5. Authentication → Email / SMTP Settings: enable custom SMTP, set the provider's
   host/port/username/password and verified sender. Configure domain SPF/DKIM and
   appropriate DMARC with the provider. Credentials belong only in Supabase's
   SMTP configuration, never source or NEXT_PUBLIC variables.
6. Authentication → Rate Limits: choose an email-sent quota suitable for Finly
   traffic and SMTP limits; preserve roughly 60 seconds between confirmation
   requests. No provider-specific quota belongs in application code.
7. Verify signup and recovery templates (examples in SETUP.md), expiry, Auth logs
   and provider delivery logs. Disable email link tracking that rewrites tokens.
   SMTP delivers email; Supabase alone owns confirmation and password recovery.

Custom SMTP is required before public release. Local automated tests simulate
Auth transport; they cannot establish remote SMTP configuration or inbox delivery.
See [Supabase SMTP](https://supabase.com/docs/guides/auth/auth-smtp),
[signup](https://supabase.com/docs/reference/javascript/auth-signup),
[resend](https://supabase.com/docs/reference/javascript/auth-resend).

## Password recovery / production origin

`appUrl()` now fails closed with CONFIGURATION_ERROR in production when
NEXT_PUBLIC_APP_URL is absent, malformed, local/private, or differs from the
canonical production origin. There is no production fallback. Development may
use its explicit localhost port; the local configuration inspected was port 3115.
Do not copy that local value into Vercel Production.

The generated production reset destination is:
`https://finly2-ruddy.vercel.app/auth/callback?next=/actualizeaza-parola`.
The installed SDK may append `sb_flow_id` for PKCE; preserve it when applicable.
URL allowlisting must accommodate the complete actual recovery redirect/query,
using a narrowly scoped callback query pattern if the Dashboard requires it.

Authentication → Email Templates → Reset Password / Recovery:
- `{{ .ConfirmationURL }}` respects the provider-generated recovery flow and
  requested redirect when URL Configuration allows it. PKCE requires the browser
  that initiated recovery (it holds the verifier cookie).
- An existing custom template built from `{{ .SiteURL }}` may ignore the supplied
  callback. Check and replace it with the supported provider link or the
  `{{ .RedirectTo }}` + token_hash recovery example in SETUP.md.
- Remove all hardcoded localhost/127.0.0.1/LAN hosts. Do not log actual email links.
- A token_hash recovery template supports opening in another browser: Supabase
  verifies it with `type=recovery` before Finly creates any recovery proof.

Hosted URL Configuration, email templates, SMTP and Vercel environment values
were not available for inspection in this session. Their current values cannot
be inferred from local source. Previously sent emails retain their old links:
request a NEW email after correcting configuration and deploying the fix.

Auth JS 2.117.2 exposes `redirectType` at runtime, but omits it from the public
AuthTokenResponse type. Finly uses the documented PASSWORD_RECOVERY event emitted
during successful PKCE exchange instead. A query `next`/`type` never grants PKCE
recovery authority. OTP recovery is verified by Supabase with the recovery type.
Both paths require a user and a session, then set a signed, HttpOnly, short-lived
Finly recovery cookie. Invalid/expired links show the recovery error/retry screen.

`/actualizeaza-parola` shows Parolă nouă and Confirmă parola nouă. Client/server
reuse PasswordSchema and require matching passwords. The update endpoint also
requires authenticated user, matching account context and the recovery cookie.
It calls Auth updateUser, deletes that cookie, retains the Supabase session and
navigates directly to `/`. No passwords, hashes or reset tokens are stored in
Finly tables. Cookie deletion consumes the browser's proof; Supabase owns the
single-use recovery link. No database revocation registry was added.

### Exact manual recovery QA (fresh controlled inbox)

A–D. Open `/autentificare`, click Ai uitat parola?, enter a confirmed test email,
and submit. Expect generic success and a 60-second cooldown across refresh.
E–G. Receive a NEW email. Inspect the actual link privately: it must use the
public Supabase/Finly recovery flow and contain no localhost/127.0.0.1/LAN redirect.
Click it; expect public Finly to open.
H–J. Expect Alege o parolă nouă., Parolă nouă and Confirmă parola nouă. Check
show/hide controls, invalid/empty/mismatching values, then save matching valid
passwords. Check a mobile viewport as well.
K–L. Expect the password to change and direct authenticated continuation to `/`.
M–O. Log out manually; the NEW password must work, and the old password must fail.
Reopen the used link and an expired/malformed link: expect the clear invalid-link
screen and Cere un link nou. Repeat reset under controlled 429: expect clean copy.

Automated provider-contract and browser tests simulate Auth/email transport and
use isolated PostgreSQL fixtures. They cannot prove live inbox delivery, actual
production link hosts, or live password replacement until this manual QA runs.

## Manual QA with controlled inboxes

A. Sign up a new address with an available username. Verify one Auth user/profile,
   unconfirmed status, first email, prefilled verification field and cooldown.
B. Leave it unconfirmed; after cooldown request resend. Verify a new email and
   the same user/profile ID. Refresh: the cooldown must continue.
C. Wait again and resend a third time; repeat later/tomorrow. No lifetime limit.
D. Open a currently valid confirmation link. Verify confirmed status, session and
   safe Finly redirect. Previously superseded/expired links may require resend.
E. Sign up again with the confirmed address and a fresh available username. Verify
   the generic verification/login guidance, one original user/profile and unchanged
   metadata. A taken username still receives normal username validation.
F. Confirm an address, then simulate a failed app redirect (offline/device issue).
   Return to verification and choose Conectează-te. Original password must work;
   confirmation remains valid and no new signup/verification is needed.
G. Use Ai uitat parola? for that account. Verify recovery email, valid recovery
   callback, new password and normal login independently of confirmation resend.
H. Exercise a controlled provider rate limit. Verify clean Romanian error, no
   delivery promise or duplicate user, safe structured logs and later retry.
   Repeat unknown/confirmed/unconfirmed requests: no existence flag is returned.
