'use client';
import { browserSupabase } from '../supabase/browser';
import { unregisterDevice } from '../simulator/notifications/client';

export const logoutErrorCopy = 'Nu te-am putut deconecta. Încearcă din nou.';
export const logoutUnconfirmedCopy = 'Datele contului au fost ascunse pe acest dispozitiv. Nu putem confirma închiderea sesiunii pe server.';

export async function logoutAccount(userId: string | null): Promise<boolean> {
  if (userId) { try { await unregisterDevice(userId); } catch { /* Current-session display validation remains the privacy boundary. */ } }
  const client = browserSupabase();
  let serverConfirmed = false;
  let browserConfirmed = false;
  // Let the browser SDK load the current session before the server expires
  // its cookies; signOut must also clear any session held in SDK memory.
  if (client) { try { await client.auth.getSession(); } catch { /* Still attempt both logout paths. */ } }
  try {
    const response = await fetch('/api/account/auth', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Finly-Account': userId ?? '' },
      body: JSON.stringify({ action: 'logout' }), signal: AbortSignal.timeout(5000),
    });
    serverConfirmed = response.ok;
  } catch { /* A failed request does not prove server revocation. */ }
  if (client) {
    client.auth.stopAutoRefresh();
    try { browserConfirmed = !(await client.auth.signOut()).error; } catch { /* Use supported local fallback below. */ }
    if (!browserConfirmed) {
      try { await client.auth.signOut({ scope: 'local' }); } catch { /* Cleanup still runs in the caller. */ }
    }
  }
  // Normal success requires the SSR route to confirm cookie cleanup, plus
  // browser SDK cleanup. An uncertain result must keep private UI hidden.
  return serverConfirmed && browserConfirmed;
}
