import { simulatorApi } from '../../../../src/lib/simulator/server/http';
import { preferences, pushConfigured, savePreferences } from '../../../../src/lib/simulator/notifications/service';
import { readBody } from '../../../../src/lib/account/http';
export async function GET(request: Request) { return simulatorApi(request, async user => ({ preferences: await preferences(user.id), configured: pushConfigured() })); }
export async function POST(request: Request) { return simulatorApi(request, async user => savePreferences(user.id, await readBody(request))); }
