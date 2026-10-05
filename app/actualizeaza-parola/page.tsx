import { accountsConfigured } from '../../src/lib/supabase/admin';
import { cookies } from 'next/headers';
import { currentUser } from '../../src/lib/supabase/server';
import { AuthScreen } from '../components/account-screens';
import { validRecoveryProof } from '../../src/lib/account/recovery';
export default async function Page(){const user=await currentUser();return <AuthScreen configured={accountsConfigured()} mode="update" accountUserId={user?.id ?? null} recoveryValid={Boolean(user && validRecoveryProof((await cookies()).get('finly-recovery')?.value,user.id))}/>;}
