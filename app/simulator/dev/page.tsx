import { notFound, redirect } from 'next/navigation';
import { currentUser } from '../../../src/lib/supabase/server';
import SimulatorDevClient from './simulator-dev-client';

export const dynamic = 'force-dynamic';
export default async function SimulatorDevPage() {
  if (process.env.NODE_ENV !== 'development') notFound();
  const user = await currentUser();
  if (!user) redirect('/bun-venit');
  return <SimulatorDevClient userId={user.id} />;
}
