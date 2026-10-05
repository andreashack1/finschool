import { accountsConfigured } from '../../src/lib/supabase/admin';
import { AuthScreen } from '../components/account-screens';
export default function Page(){return <AuthScreen configured={accountsConfigured()} mode="reset"/>;}
