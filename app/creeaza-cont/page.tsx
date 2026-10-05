import { accountsConfigured } from '../../src/lib/supabase/admin';
import { redirect } from 'next/navigation';
import { currentUser } from '../../src/lib/supabase/server';
import { AuthScreen } from '../components/account-screens';
export default async function Page(){if(await currentUser())redirect('/');return <AuthScreen configured={accountsConfigured()} mode="signup"/>;}
