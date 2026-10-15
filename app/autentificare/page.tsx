import { accountsConfigured } from '../../src/lib/supabase/admin';
import { redirect } from 'next/navigation';
import { currentUser } from '../../src/lib/supabase/server';
import { AuthScreen } from '../components/account-screens';
export default async function Page({searchParams}:{searchParams:Promise<{next?:string}>}){const {next}=await searchParams;const destination=next && /^\/simulator\/eveniment\/[a-f0-9-]{36}$/.test(next)?next:'/';if(await currentUser())redirect(destination);return <AuthScreen configured={accountsConfigured()} mode="login" destination={destination}/>;}
