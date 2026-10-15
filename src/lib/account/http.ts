import 'server-only';
import { NextResponse } from 'next/server';
import { AccountError, errorCopy } from './errors';
import type { User } from '@supabase/supabase-js';
import { appUrl } from '../supabase/env';
import { devOriginHosts } from '../../content/dev-origins';
export function requireAccountContext(request:Request,user:User,required=true) {
  const expected=request.headers.get('X-Finly-Account');
  // This header never selects a user or grants permission. Only the verified
  // session determines ownership; the header prevents stale-tab queue crossover.
  if((required || expected) && expected!==user.id)throw new AccountError('AUTH_REQUIRED',401);
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  // Next may construct request.url with an internal hostname behind proxying.
  // Compare the browser Origin to our configured public origin, never a
  // client-supplied forwarded host or the internal runtime URL.
  if (origin === appUrl()) return;
  // A local dev server may choose another port when the configured one is
  // occupied. Trust loopback or explicitly configured LAN origins on this
  // request's protocol + port; Next can use localhost internally for LAN traffic.
  // production still requires the canonical origin, never forwarded headers.
  if (origin && process.env.NODE_ENV === 'development') {
    try {
      const browserOrigin = new URL(origin), requestUrl = new URL(request.url);
      const loopback = (hostname:string) => ['localhost','127.0.0.1','[::1]'].includes(hostname);
      if (loopback(browserOrigin.hostname) && loopback(requestUrl.hostname) && browserOrigin.protocol === requestUrl.protocol && browserOrigin.port === requestUrl.port) return;
      if (devOriginHosts.includes(browserOrigin.hostname) && (loopback(requestUrl.hostname) || requestUrl.hostname === browserOrigin.hostname) && browserOrigin.protocol === requestUrl.protocol && browserOrigin.port === requestUrl.port && origin === browserOrigin.origin) return;
    } catch { /* Reject malformed origins. */ }
  }
  throw new AccountError('ORIGIN_REJECTED', 403);
}
export async function readBody(request:Request):Promise<unknown> {
  const text=await request.text();if(Buffer.byteLength(text,'utf8')>65536)throw new AccountError('VALIDATION_ERROR',413);
  try{return JSON.parse(text);}catch{throw new AccountError('VALIDATION_ERROR');}
}
export function apiError(error: unknown) {
  const safe = error instanceof AccountError ? error : new AccountError('SERVER_ERROR', 503);
  return NextResponse.json({ error: { code: safe.code, message: errorCopy[safe.code] } }, { status: safe.status, headers: { 'Cache-Control': 'no-store' } });
}
