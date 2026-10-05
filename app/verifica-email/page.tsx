import { accountsConfigured } from '../../src/lib/supabase/admin';
import { AuthScreen } from '../components/account-screens';
export default async function Page({searchParams}:PageProps<'/verifica-email'>){const params=await searchParams;return <AuthScreen configured={accountsConfigured()} mode="verify" verificationInvalid={params.invalid==='1'}/>;}
