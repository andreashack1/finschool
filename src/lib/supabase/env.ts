import { AccountError } from '../account/errors';

export const productionAppOrigin = 'https://www.finlyapp.online';

// Email destinations are independent of the current development server.
// Local email callbacks require this explicit server-only opt-in.
export function authEmailOrigin() {
  if (process.env.NODE_ENV === 'production') return appUrl();
  const local = process.env.FINLY_DEV_AUTH_EMAIL_ORIGIN;
  if (!local) return productionAppOrigin;
  try {
    const parsed = new URL(local);
    if (!['http:', 'https:'].includes(parsed.protocol) || !['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname) || parsed.username || parsed.password || parsed.pathname !== '/' || parsed.search || parsed.hash) throw new Error('origin');
    return parsed.origin;
  } catch { throw new AccountError('CONFIGURATION_ERROR', 503); }
}

export function publicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try { if (!['http:', 'https:'].includes(new URL(url).protocol)) return null; } catch { return null; }
  return { url, key };
}
export function appUrl() {
  const production = process.env.NODE_ENV === 'production';
  const value = process.env.NEXT_PUBLIC_APP_URL;
  try {
    const parsed = new URL(value || (production ? '' : 'http://localhost:3000'));
    if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== '/') throw new Error('origin');
    // Explicit production configuration is mandatory. Exact origin validation
    // also excludes loopback, private LAN, alternate ports and arbitrary hosts.
    if (production && parsed.origin !== productionAppOrigin) throw new Error('production-origin');
    return parsed.origin;
  } catch {
    if (production) throw new AccountError('CONFIGURATION_ERROR', 503);
    return 'http://localhost:3000';
  }
}
