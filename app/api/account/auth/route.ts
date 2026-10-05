import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { serverSupabase,requireUser } from '../../../../src/lib/supabase/server';
import { appUrl } from '../../../../src/lib/supabase/env';
import { SignupSchema,EmailSchema,PasswordSchema } from '../../../../src/lib/account/schemas';
import { accountConfig } from '../../../../src/content/account-config';
import { AccountError } from '../../../../src/lib/account/errors';
import { apiError,sameOrigin,readBody,requireAccountContext } from '../../../../src/lib/account/http';
import { validRecoveryProof } from '../../../../src/lib/account/recovery';
import { accountsConfigured } from '../../../../src/lib/supabase/admin';
export async function POST(request:Request) {
  try {
    sameOrigin(request);
    const input:unknown=await readBody(request);
    const action=z.object({action:z.enum(['signup','login','reset','resend','update','logout']),data:z.unknown().optional()}).strict().parse(input);
    if(action.action!=='logout' && !accountsConfigured())throw new AccountError('CONFIGURATION_ERROR',503);
    const client=await serverSupabase();
    const callback=`${appUrl()}/auth/callback`;
    if(action.action==='signup') {
      const parsed=SignupSchema.safeParse(action.data);if(!parsed.success)throw new AccountError('VALIDATION_ERROR');
      const v=parsed.data;
      const availability=await client.rpc('username_available',{candidate:v.username});
      if(availability.error)throw new AccountError(availability.error.code==='PGRST202'?'CONFIGURATION_ERROR':'SERVER_ERROR',503);
      if(availability.data!==true)throw new AccountError('USERNAME_TAKEN',409);
      const {data,error}=await client.auth.signUp({email:v.email,password:v.password,options:{emailRedirectTo:callback, data:{username:v.username,display_name:v.displayName,age_range:v.ageRange,parental_consent:v.parentalConsent,terms:true,privacy:true,terms_version:accountConfig.termsVersion,privacy_version:accountConfig.privacyVersion}}});
      if(error) { const available=await client.rpc('username_available',{candidate:v.username});if(available.data===false)throw new AccountError('USERNAME_TAKEN',409);throw new AccountError(error.status===429?'RATE_LIMITED':'VALIDATION_ERROR'); }
      return NextResponse.json({session:Boolean(data.session)},{headers:{'Cache-Control':'no-store'}});
    }
    if(action.action==='login') {
      const value=z.object({email:EmailSchema,password:z.string().min(1).max(128)}).strict().parse(action.data);
      const {error}=await client.auth.signInWithPassword(value);if(error)throw new AccountError(error.status===429?'RATE_LIMITED':'INVALID_CREDENTIALS',401);
    }
    if(action.action==='reset' || action.action==='resend') {
      const {email}=z.object({email:EmailSchema}).strict().parse(action.data);
      if(action.action==='reset'){const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:`${callback}?next=/actualizeaza-parola`});if(error?.status===429)throw new AccountError('RATE_LIMITED',429);if(error && (!error.status || error.status>=500))throw new AccountError('SERVER_ERROR',503);}
      else { const {error}=await client.auth.resend({type:'signup',email,options:{emailRedirectTo:callback}});if(error?.status===429)throw new AccountError('RATE_LIMITED',429); }
      // The reset response is deliberately identical for known and unknown emails.
    }
    if(action.action==='update') {
      const user=await requireUser();requireAccountContext(request,user);const jar=await cookies();
      if(!validRecoveryProof(jar.get('finly-recovery')?.value,user.id))throw new AccountError('RECOVERY_REQUIRED',403);
      const value=z.object({password:PasswordSchema,repeatPassword:PasswordSchema}).strict().refine(v=>v.password===v.repeatPassword).parse(action.data);
      const {error}=await client.auth.updateUser({password:value.password});if(error)throw new AccountError('VALIDATION_ERROR');jar.delete('finly-recovery');
    }
    if(action.action==='logout') {const {data}=await client.auth.getUser();if(data.user)requireAccountContext(request,data.user,false); const {error}=await client.auth.signOut({scope:'local'});if(error)throw new AccountError('SERVER_ERROR',503);(await cookies()).delete('finly-recovery'); }
    return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
  } catch(error) { return apiError(error instanceof z.ZodError ? new AccountError('VALIDATION_ERROR') : error); }
}
