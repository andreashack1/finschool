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
function providerError(error:{status?:number;code?:string},fallback=new AccountError('VALIDATION_ERROR')) {
  if(error.status===429 || ['over_email_send_rate_limit','over_request_rate_limit'].includes(error.code ?? ''))return new AccountError('RATE_LIMITED',429);
  if(!error.status || error.status>=500)return new AccountError('SERVER_ERROR',503);
  return fallback;
}
export async function POST(request:Request) {
  let stage='request';
  const diagnostic=(error:unknown)=>{
    if(process.env.NODE_ENV!=='development')return;
    const value=(error instanceof z.ZodError ? new AccountError('VALIDATION_ERROR') : error) as {code?:string;message?:string};
    const redact=(text:string)=>text.replace(/(?:sb_(?:secret|publishable)_|eyJ)[A-Za-z0-9._-]+/g,'[redacted]');
    console.error('[account/auth]',{stage,code:value?.code ?? 'UNEXPECTED_ERROR',message:redact(value?.message ?? 'Unknown error')});
  };
  try {
    sameOrigin(request);
    const input:unknown=await readBody(request);
    const action=z.object({action:z.enum(['signup','login','reset','resend','update','logout']),data:z.unknown().optional()}).strict().parse(input);
    if(action.action!=='logout' && !accountsConfigured())throw new AccountError('CONFIGURATION_ERROR',503);
    stage='supabase-client';
    const client=await serverSupabase();
    const callback=`${appUrl()}/auth/callback`;
    if(action.action==='signup') {
      stage='validation';
      const parsed=SignupSchema.safeParse(action.data);if(!parsed.success){
        if(parsed.error.issues.some(issue=>issue.path[0]==='terms' || issue.path[0]==='privacy'))throw new AccountError('LEGAL_CONSENT_REQUIRED');
        if(parsed.error.issues.some(issue=>issue.path[0]==='parentalConsent'))throw new AccountError('PARENT_ACKNOWLEDGEMENT_REQUIRED');
        throw new AccountError('VALIDATION_ERROR');
      }
      const v=parsed.data;
      stage='username-availability';
      const availability=await client.rpc('username_available',{candidate:v.username}).abortSignal(AbortSignal.timeout(5000));
      if(availability.error)diagnostic(availability.error);
      if(!availability.error && availability.data===false)throw new AccountError('USERNAME_TAKEN',409);
      stage='supabase-signup';
      const {data,error}=await client.auth.signUp({email:v.email,password:v.password,options:{emailRedirectTo:callback, data:{username:v.username,display_name:v.displayName,age_range:v.ageRange,parental_consent:v.parentalConsent,terms:true,privacy:true,terms_version:accountConfig.termsVersion,privacy_version:accountConfig.privacyVersion}}});
      if(error) { diagnostic(error);if(error.code==='23505')throw new AccountError('USERNAME_TAKEN',409);const failure=providerError(error);if(failure.code!=='RATE_LIMITED'){const available=await client.rpc('username_available',{candidate:v.username}).abortSignal(AbortSignal.timeout(5000));if(!available.error && available.data===false)throw new AccountError('USERNAME_TAKEN',409);}throw failure; }
      stage='response';
      return NextResponse.json({session:Boolean(data.session)},{headers:{'Cache-Control':'no-store'}});
    }
    if(action.action==='login') {
      stage='supabase-login';
      const value=z.object({email:EmailSchema,password:z.string().min(1).max(128)}).strict().parse(action.data);
      const {error}=await client.auth.signInWithPassword(value);if(error)throw providerError(error,new AccountError('INVALID_CREDENTIALS',401));
    }
    if(action.action==='reset' || action.action==='resend') {
      stage=action.action==='reset'?'supabase-reset':'supabase-resend';
      const {email}=z.object({email:EmailSchema}).strict().parse(action.data);
      const {error}=action.action==='reset'?await client.auth.resetPasswordForEmail(email,{redirectTo:`${callback}?next=/actualizeaza-parola`}):await client.auth.resend({type:'signup',email,options:{emailRedirectTo:callback}});
      if(error){const failure=providerError(error);if(failure.code!=='VALIDATION_ERROR')throw failure;}
      // The reset response is deliberately identical for known and unknown emails.
    }
    if(action.action==='update') {
      stage='supabase-update';
      const user=await requireUser();requireAccountContext(request,user);const jar=await cookies();
      if(!validRecoveryProof(jar.get('finly-recovery')?.value,user.id))throw new AccountError('RECOVERY_REQUIRED',403);
      const value=z.object({password:PasswordSchema,repeatPassword:PasswordSchema}).strict().refine(v=>v.password===v.repeatPassword).parse(action.data);
      const {error}=await client.auth.updateUser({password:value.password});if(error)throw providerError(error);jar.delete('finly-recovery');
    }
    if(action.action==='logout') {const {data}=await client.auth.getUser();if(data.user)requireAccountContext(request,data.user,false); const {error}=await client.auth.signOut({scope:'local'});if(error)throw new AccountError('SERVER_ERROR',503);(await cookies()).delete('finly-recovery'); }
    return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
  } catch(error) { diagnostic(error);return apiError(error instanceof z.ZodError ? new AccountError('VALIDATION_ERROR') : error); }
}
