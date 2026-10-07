import { accountConfig } from '../../content/account-config';
import { normalizeUsername, UsernameSchema } from './schemas';

export type UsernameStatus = 'idle' | 'checking' | 'available' | 'taken' | 'error';
export const usernameStatusCopy: Record<UsernameStatus, string> = {
  idle: '', checking: 'Se verifică…', available: 'Disponibil', taken: 'Deja folosit',
  error: 'Nu am putut verifica acum. Poți continua, verificăm la creare.',
};
export function usernameValidationMessage(value: string): string {
  const candidate = normalizeUsername(value);
  if (candidate.length < accountConfig.usernameMin) return 'Username-ul trebuie să aibă cel puțin 3 caractere.';
  if (candidate.length > accountConfig.usernameMax) return 'Username-ul poate avea cel mult 20 de caractere.';
  if (!/^[a-z0-9_]+$/.test(candidate)) return 'Folosește doar litere a–z, cifre și underscore.';
  if (!UsernameSchema.safeParse(candidate).success) return 'Acest username este rezervat.';
  return '';
}

// Each invocation owns its request. Cleanup also prevents updates from a
// transport that ignores abort, so a stale response cannot change the UI.
export function startUsernameCheck(value: string, update: (status: UsernameStatus) => void): () => void {
  const candidate = normalizeUsername(value);
  if (usernameValidationMessage(candidate)) return () => {};
  let active = true;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const controller = new AbortController();
  const diagnostic = (stage: string, code: string) => {
    if (process.env.NODE_ENV === 'development') console.error('[username-availability]', { stage, code, message: 'Verificarea disponibilității a eșuat.' });
  };
  const debounce = setTimeout(async () => {
    update('checking');
    timeout = setTimeout(() => {
      if (!active) return;
      active = false;
      controller.abort();
      diagnostic('request', 'TIMEOUT');
      update('error');
    }, 5000);
    try {
      const response = await fetch(`/api/account/username?username=${encodeURIComponent(candidate)}`, { signal: controller.signal, cache: 'no-store' });
      const result: unknown = await response.json();
      if (!active) return;
      if (!response.ok || !result || typeof result !== 'object' || !('available' in result) || typeof result.available !== 'boolean') {
        diagnostic('response', `HTTP_${response.status}`);
        update('error');
      } else update(result.available ? 'available' : 'taken');
    } catch {
      if (active) { diagnostic('request', 'NETWORK_ERROR'); update('error'); }
    } finally {
      clearTimeout(timeout);
    }
  }, accountConfig.usernameDebounceMs);
  return () => { active = false; clearTimeout(debounce); clearTimeout(timeout); controller.abort(); };
}
