import 'server-only';
import type { User } from '@supabase/supabase-js';
import { ZodError } from 'zod';
import { apiError, readBody, requireAccountContext, sameOrigin } from '../../account/http';
import { requireUser } from '../../supabase/server';
import { SimulatorError } from '../errors';
import { emptyInputSchema } from '../api-types';

export async function emptyBody(request: Request) {
  // An empty POST is valid; supplied JSON must still reject dates/economy fields.
  if (request.headers.get('content-length') === '0' || !request.headers.get('content-type')) {
    const body = await request.text();
    if (body.trim()) throw new SimulatorError('INVALID_SIMULATOR_INPUT');
    return;
  }
  emptyInputSchema.parse(await readBody(request));
}
export async function simulatorApi(request: Request, action: (user: User) => Promise<unknown>, developmentOnly = false) {
  if (developmentOnly && process.env.NODE_ENV !== 'development') return new Response(null, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  try {
    const user = await requireUser();
    requireAccountContext(request, user, false);
    if (request.method !== 'GET') sameOrigin(request);
    return Response.json(await action(user), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const safe = error instanceof ZodError ? new SimulatorError('INVALID_SIMULATOR_INPUT') : error;
    if (safe instanceof SimulatorError) return Response.json({ error: { code: safe.code, message: safe.message } }, { status: safe.status, headers: { 'Cache-Control': 'no-store' } });
    return apiError(safe);
  }
}
