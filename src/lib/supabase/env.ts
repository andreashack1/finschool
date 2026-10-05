export function publicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try { if (!['http:', 'https:'].includes(new URL(url).protocol)) return null; } catch { return null; }
  return { url, key };
}
export function appUrl() {
  const value = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try { const parsed=new URL(value);if(['http:','https:'].includes(parsed.protocol))return parsed.origin; } catch {}
  return 'http://localhost:3000';
}
