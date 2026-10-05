import { currentUser } from '../../src/lib/supabase/server';
import { GateScreen } from '../components/account-screens';
export default async function Page(){const user=await currentUser();return <GateScreen authenticated={Boolean(user)} userId={user?.id ?? null}/>;}
