export function isSafeInternalRedirect(value: unknown): value is string {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u0020]/.test(value)) return false;
  try { const decoded = decodeURIComponent(value); return !decoded.startsWith('//') && !/[\\\u0000-\u0020]/.test(decoded) && new URL(value, 'https://finly.invalid').origin === 'https://finly.invalid'; } catch { return false; }
}
export const safeNext = (value: unknown, fallback = '/') => isSafeInternalRedirect(value) ? value : fallback;
const publicPaths = new Set(['/bun-venit','/incepe','/creeaza-cont','/autentificare','/resetare-parola','/actualizeaza-parola','/verifica-email','/auth/callback','/salveaza-progresul','/termeni','/confidentialitate']);
export const isPublicAccountRoute = (path: string) => publicPaths.has(path);
export const isAuthEntryRoute = (path: string) => ['/bun-venit','/creeaza-cont','/autentificare'].includes(path);
