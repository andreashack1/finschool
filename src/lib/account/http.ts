import 'server-only';
import { NextResponse } from 'next/server';
import { AccountError, errorCopy } from './errors';
import type { User } from '@supabase/supabase-js';
import { appUrl } from '../supabase/env';
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
  if (!origin || origin !== appUrl()) throw new AccountError('ORIGIN_REJECTED', 403);
}
export async function readBody(request:Request):Promise<unknown> {
  const text=await request.text();if(Buffer.byteLength(text,'utf8')>65536)throw new AccountError('VALIDATION_ERROR',413);
  try{return JSON.parse(text);}catch{throw new AccountError('VALIDATION_ERROR');}
}
export function apiError(error: unknown) {
  const safe = error instanceof AccountError ? error : new AccountError('SERVER_ERROR', 503);
  return NextResponse.json({ error: { code: safe.code, message: errorCopy[safe.code] } }, { status: safe.status, headers: { 'Cache-Control': 'no-store' } });
}
