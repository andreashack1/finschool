'use client';
import { useState } from 'react';
import { refreshNotifications } from '../../src/lib/simulator/notifications/client';
export default function NotificationDiagnostics({ userId }: { userId: string }) {
  const [data, setData] = useState<unknown>(null), [busy, setBusy] = useState(false), [error, setError] = useState('');
  async function inspect(action?: 'process' | 'test') {
    setBusy(true); setError('');
    try {
      const options = { cache: 'no-store' as const, headers: { 'Content-Type': 'application/json', 'X-Finly-Account': userId } };
      if (action) { const response = await fetch('/api/simulator/dev/notifications', { ...options, method: 'POST', body: JSON.stringify({ action }) }); if (!response.ok) throw new Error('Procesarea notificărilor nu este disponibilă.'); }
      const response = await fetch('/api/simulator/dev/notifications', options); if (!response.ok) throw new Error('Aplică migrarea notificărilor pentru diagnostic.');
      setData(await response.json()); refreshNotifications();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Diagnostic indisponibil.'); } finally { setBusy(false); }
  }
  return <section className="app-card notification-settings"><h2>Chapter 8 · Notificări</h2><div className="sim-event-actions"><button disabled={busy} onClick={() => void inspect()}>Inspectează notificările</button><button disabled={busy} onClick={() => void inspect('process')}>Procesează contul curent</button><button disabled={busy} onClick={() => void inspect('test')}>Notificare de test</button></div><p>Testul respectă preferințele, orele liniștite și bugetul push. Nu schimbă simulatorul.</p>{error && <p role="status">{error}</p>}{data !== null && <pre style={{ overflow: 'auto', maxHeight: 480 }}>{JSON.stringify(data, null, 2)}</pre>}</section>;
}
