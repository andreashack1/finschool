import { redirect } from 'next/navigation';
import { currentUser } from '../../src/lib/supabase/server';
export default async function Page(){if(!await currentUser())redirect('/bun-venit');redirect('/?tab=simulator');}
