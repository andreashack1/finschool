// Rolling deployments must keep progress available before the presentation
// migration lands. Only a missing named RPC permits the existing transaction;
// permission, network and transaction failures must still fail normally.
export function isMissingStreakRpc(error: unknown, name: string): boolean {
  if (!error || typeof error !== 'object') return false;
  const value = error as { code?: unknown; message?: unknown };
  return value.code === 'PGRST202' && typeof value.message === 'string'
    && value.message.includes(`public.${name}(`);
}
