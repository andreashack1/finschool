import { accountsConfigured } from '../../src/lib/supabase/admin';
import { cookies } from 'next/headers';
import { currentUser } from '../../src/lib/supabase/server';
import { AuthScreen } from '../components/account-screens';
import { validRecoveryProof } from '../../src/lib/account/recovery';
export const metadata={referrer:'no-referrer' as const,robots:{index:false,follow:false}};
// Opening a recovery URL does not verify or exchange its token.
export default async function Page({searchParams}:PageProps<'/actualizeaza-parola'>){
 const params=await searchParams;
 const tokenHash=params.type==='recovery' && typeof params.token_hash==='string' && /^[A-Za-z0-9_-]{1,512}$/.test(params.token_hash)?params.token_hash:undefined;
 if(tokenHash)return <AuthScreen configured={accountsConfigured()} mode="update" recoveryValid recoveryTokenHash={tokenHash}/>;
 const user=await currentUser();
 return <AuthScreen configured={accountsConfigured()} mode="update" accountUserId={user?.id ?? null} recoveryValid={Boolean(params.invalid!=='1' && user && validRecoveryProof((await cookies()).get('finly-recovery')?.value,user.id))}/>;
}
