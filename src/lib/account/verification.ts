import { accountConfig } from '../../content/account-config';
import { EmailSchema } from './schemas';

// Temporary UX hints only. Supabase owns identity, confirmation and rate limits.
export const pendingEmailKey = 'finly.pendingVerificationEmail';
export const resendAvailableKey = 'finly.verificationResendAvailableAt';
export const resetAvailableKey = 'finly.passwordResetAvailableAt';
function storage() { try { return window.sessionStorage; } catch { return null; } }
export function pendingVerificationEmail() {
  const parsed = EmailSchema.safeParse(storage()?.getItem(pendingEmailKey));
  return parsed.success ? parsed.data : '';
}
export function rememberVerificationEmail(email: string) {
  const parsed = EmailSchema.safeParse(email);
  try { if (parsed.success) storage()?.setItem(pendingEmailKey, parsed.data); } catch { /* Storage may be blocked. */ }
}
export function verificationCooldown(now = Date.now(), key = resendAvailableKey) {
  const at = Number(storage()?.getItem(key));
  return Number.isFinite(at) ? Math.max(0, Math.ceil((at - now) / 1000)) : 0;
}
export function startVerificationCooldown(now = Date.now(), key = resendAvailableKey) {
  const at = now + accountConfig.emailCooldownSeconds * 1000;
  try { storage()?.setItem(key, String(at)); } catch { /* Provider still rate limits. */ }
  return at;
}
export function clearVerificationState() {
  try { storage()?.removeItem(pendingEmailKey); storage()?.removeItem(resendAvailableKey); } catch { /* Best effort. */ }
}
