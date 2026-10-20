import { redirect } from 'next/navigation';
import { currentUser } from '../../src/lib/supabase/server';
import { accountsConfigured } from '../../src/lib/supabase/admin';
import { AuthScreen } from '../components/account-screens';
export default async function Page({searchParams}:PageProps<'/verifica-email'>){if(await currentUser())redirect('/salveaza-progresul');const params=await searchParams;return <AuthScreen configured={accountsConfigured()} mode="verify" verificationInvalid={params.invalid==='1'}/>;}
