import { redirect } from 'next/navigation';
import { currentUser } from '../../src/lib/supabase/server';
import { WelcomeScreen } from '../components/account-screens';
export default async function Page(){if(await currentUser())redirect('/');return <WelcomeScreen/>;}
