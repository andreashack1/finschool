import { redirect } from 'next/navigation';
import { currentUser } from '../../../../src/lib/supabase/server';
import EventDetailClient from './event-detail-client';
import '../../simulator.css';
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) redirect(`/autentificare?next=${encodeURIComponent(`/simulator/eveniment/${id}`)}`);
  return <EventDetailClient id={id} userId={user.id}/>;
}
