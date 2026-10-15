import { z } from 'zod';
import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { readBody } from '../../../../src/lib/account/http';
import { register, unregister, subscriptionInput, pushConfigured } from '../../../../src/lib/simulator/notifications/service';
export async function POST(request: Request) { return simulatorApi(request, async user => {
  if (!pushConfigured()) return { ok: false, configured: false };
  return register(user.id, subscriptionInput.parse(await readBody(request)));
}); }
export async function DELETE(request: Request) { return simulatorApi(request, async user => {
  const input = z.strictObject({ endpoint: z.string().max(2048) }).parse(await readBody(request));
  return unregister(user.id, input.endpoint);
}); }
