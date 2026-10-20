# Password recovery V4

Runtime production NEXT_PUBLIC_APP_URL must equal https://www.finlyapp.online.
Production rejects missing, malformed, loopback and LAN origins. authEmailOrigin()
centralizes email destinations. Development local email testing requires explicit
FINLY_DEV_AUTH_EMAIL_ORIGIN and matching runtime origin/redirect allowlist.

New flow: reset request -> /actualizeaza-parola -> form -> POST recover ->
verifyOtp(type=recovery, token_hash) -> updateUser(password) -> session cookies -> /.
GET/render never verifies the token. Both passwords pass PasswordSchema and match
before verifyOtp. No PKCE verifier is required. Token is never stored in browser
storage or database. Successful navigation replaces the recovery history entry.
A verified recovery creates a 15 minute HTTP-only signed proof for retry when
updateUser fails. Proof requires an authenticated matching user and is cleared
only on success. Ordinary login does not create proof.

## Required hosted configuration (not inspected or changed by this task)

Authentication -> URL Configuration:
Site URL: https://www.finlyapp.online
Allowed redirects:
- https://www.finlyapp.online/actualizeaza-parola
- https://www.finlyapp.online/auth/callback (signup/resend)
Retain localhost entries only for intentional development.

Authentication -> Email Templates -> Reset Password:

```html
<h2>Resetează parola</h2>
<p>Ai cerut să schimbi parola contului tău Finly.</p>
<p>
  <a href="{{ .RedirectTo }}?token_hash={{ .TokenHash }}&amp;type=recovery">
    Alege o parolă nouă
  </a>
</p>
<p>Dacă nu ai cerut această schimbare, poți ignora emailul.</p>
```

Do not use ConfirmationURL for new recovery emails. Old PKCE links may fail;
request a new email. Signup confirmation remains on /auth/callback.
Provider rate limits remain enabled; UI persists 60 second reset cooldown in
sessionStorage and shares deadline-only hints between open tabs.

## Manual production QA

1. Update Supabase Recovery email template.
2. Deploy corrected Finly code.
3. Wait until any current 60-second rate limit has expired.
4. Request ONE fresh password-reset email.
5. Ignore/delete all older reset emails.
6. Click the newest email (also test a separate browser/private window).
7. Verify URL begins https://www.finlyapp.online/actualizeaza-parola.
8. Verify Parolă nouă and Confirmă parola nouă fields.
9. Submit valid matching password.
10. Verify redirect into Finly.
11. Logout.
12. Verify NEW password works.
13. Verify OLD password fails.

Additionally open/prefetch a fresh link without submitting, then submit normally;
GET must leave token valid. Reusing a completed token must fail safely on submit.
Automated QA uses an isolated local provider fixture, never production email.

Recovery diagnostics log stages and provider code/status only. Only explicit OTP rejection codes map to the expired-link message; rate limits and provider/session failures remain distinct. This configuration must be pasted into the hosted Dashboard; local code does not update it.
