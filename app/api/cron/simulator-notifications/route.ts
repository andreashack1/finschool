import { timingSafeEqual } from 'node:crypto';
import { notificationWorker } from '../../../../src/lib/simulator/notifications/worker';
export const runtime = 'nodejs';
export const maxDuration = 240;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const expected = Buffer.from(`Bearer ${secret ?? ''}`), actual = Buffer.from(request.headers.get('authorization') ?? '');
  if (!secret || actual.length !== expected.length || !timingSafeEqual(actual, expected)) return new Response(null, { status: 401 });
  try { return Response.json(await notificationWorker(), { headers: { 'Cache-Control': 'no-store' } }); }
  catch { return Response.json({ error: 'Worker unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}
