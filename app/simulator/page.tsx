import { redirect } from 'next/navigation';
import { currentUser } from '../../src/lib/supabase/server';
import SimulatorClient from './simulator-client';
import './simulator.css';
export const metadata = { title: 'SimLife · Finly' };
export default async function Page() {
  const user = await currentUser();
  if (!user) redirect('/bun-venit');
  return <SimulatorClient key={user.id} userId={user.id}/>;
}
