import { redirect } from 'next/navigation';
import { currentUser } from '../../src/lib/supabase/server';
export async function PrivateLayout({children}:{children:React.ReactNode}) {if(!await currentUser())redirect('/bun-venit');return children;}
