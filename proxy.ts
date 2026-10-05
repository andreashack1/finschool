import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { publicSupabaseConfig,appUrl } from './src/lib/supabase/env';
import { isPublicAccountRoute, isAuthEntryRoute } from './src/lib/account/redirects';
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const config = publicSupabaseConfig();
  let authenticated = false;
  if (config) {
    const client = createServerClient(config.url, config.key, { cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values, headers) {
        for (const value of values) request.cookies.set(value.name, value.value);
        response = NextResponse.next({ request });
        for (const value of values) response.cookies.set(value.name, value.value, value.options);
        for (const [key, value] of Object.entries(headers)) response.headers.set(key, value);
      },
    } });
    const { data } = await client.auth.getUser();
    authenticated = Boolean(data.user);
  }
  const path = request.nextUrl.pathname;
  const target = authenticated && (isAuthEntryRoute(path) || path === '/incepe') ? '/' : !authenticated && !isPublicAccountRoute(path) && !path.startsWith('/api/') ? '/bun-venit' : null;
  if (!target) return response;
  const redirect = NextResponse.redirect(new URL(target, appUrl()));
  for (const cookie of response.cookies.getAll()) redirect.cookies.set(cookie);
  for (const header of ['cache-control','expires','pragma']) { const value = response.headers.get(header); if (value) redirect.headers.set(header, value); }
  return redirect;
}
export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)'] };
