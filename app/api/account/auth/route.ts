import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { serverSupabase,requireUser } from '../../../../src/lib/supabase/server';
import { authEmailOrigin } from '../../../../src/lib/supabase/env';
import { SignupSchema,EmailSchema,PasswordSchema } from '../../../../src/lib/account/schemas';
import { accountConfig } from '../../../../src/content/account-config';
import { AccountError } from '../../../../src/lib/account/errors';
import { apiError,sameOrigin,readBody,requireAccountContext } from '../../../../src/lib/account/http';
import { recoveryProof,validRecoveryProof } from '../../../../src/lib/account/recovery';
import { accountsConfigured } from '../../../../src/lib/supabase/admin';
function providerError(error:{status?:number;code?:string},fallback=new AccountError('VALIDATION_ERROR')) {
  if(error.status===429 || ['over_email_send_rate_limit','over_request_rate_limit'].includes(error.code ?? ''))return new AccountError('RATE_LIMITED',429);
  if(!error.status || error.status>=500)return new AccountError('SERVER_ERROR',503);
  return fallback;
}
export async function POST(request:Request) {
  let stage='request';
  const diagnostic=(error:unknown)=>{
    const value=(error instanceof z.ZodError ? new AccountError('VALIDATION_ERROR') : error) as {code?:string;status?:number};
    // Log structured codes only: provider messages may contain sensitive data.
    console.error('[account/auth]',{stage,code:value?.code ?? 'UNEXPECTED_ERROR',status:value?.status ?? null});
  };
  try {
    sameOrigin(request);
    const input:unknown=await readBody(request);
    const action=z.object({action:z.enum(['signup','login','reset','resend','recover','update','logout']),data:z.unknown().optional()}).strict().parse(input);
    if(action.action!=='logout' && !accountsConfigured())throw new AccountError('CONFIGURATION_ERROR',503);
    stage='supabase-client';
    const client=await serverSupabase();
    const callback=()=>`${authEmailOrigin()}/auth/callback`;
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
      const {data,error}=await client.auth.signUp({email:v.email,password:v.password,options:{emailRedirectTo:callback(), data:{username:v.username,display_name:v.displayName,age_range:v.ageRange,parental_consent:v.parentalConsent,terms:true,privacy:true,terms_version:accountConfig.termsVersion,privacy_version:accountConfig.privacyVersion}}});
      if(error) { diagnostic(error);if(error.code==='23505')throw new AccountError('USERNAME_TAKEN',409);const failure=providerError(error);if(failure.code!=='RATE_LIMITED'){const available=await client.rpc('username_available',{candidate:v.username}).abortSignal(AbortSignal.timeout(5000));if(!available.error && available.data===false)throw new AccountError('USERNAME_TAKEN',409);}throw failure; }
      stage='response';
      return NextResponse.json({state:data.session?'authenticated':'check_email_or_login'},{headers:{'Cache-Control':'no-store'}});
    }
    if(action.action==='login') {
      stage='supabase-login';
      const value=z.object({email:EmailSchema,password:z.string().min(1).max(128)}).strict().parse(action.data);
      const {error}=await client.auth.signInWithPassword(value);if(error)throw providerError(error,new AccountError('INVALID_CREDENTIALS',401));
    }
    if(action.action==='reset' || action.action==='resend') {
      stage=action.action==='reset'?'supabase-reset':'supabase-resend';
      if(action.action==='reset')console.info('[auth/recovery] stage=request-email');
      const {email}=z.object({email:EmailSchema}).strict().parse(action.data);
      const {error}=action.action==='reset'?await client.auth.resetPasswordForEmail(email,{redirectTo:`${authEmailOrigin()}/actualizeaza-parola`}):await client.auth.resend({type:'signup',email,options:{emailRedirectTo:callback()}});
      if(error){diagnostic(error);const failure=providerError(error);if(failure.code!=='VALIDATION_ERROR')throw failure;}
      // The reset response is deliberately identical for known and unknown emails.
    }
    if(action.action==='recover') {
      // Validate both passwords BEFORE consuming a one-time token.
      const value=z.object({tokenHash:z.string().min(1).max(512).regex(/^[A-Za-z0-9_-]+$/),password:PasswordSchema,repeatPassword:PasswordSchema}).strict().refine(v=>v.password===v.repeatPassword).parse(action.data);
      const jar=await cookies();
      let authorized=false;
      if(jar.get('finly-recovery')?.value){
        const {data,error}=await client.auth.getUser();
        authorized=!error && Boolean(data.user && validRecoveryProof(jar.get('finly-recovery')?.value,data.user.id));
      }
      if(!authorized){
        stage='verify-token';
        console.info('[auth/recovery] stage=verify-token');
        const {data,error}=await client.auth.verifyOtp({token_hash:value.tokenHash,type:'recovery'});
        if(error || !data.user || !data.session){
          console.error('[auth/recovery]',{stage,code:error?.code ?? 'RECOVERY_SESSION_MISSING',status:error?.status ?? null});
          if(error && ['otp_expired','invalid_token'].includes(error.code ?? ''))throw new AccountError('RECOVERY_REQUIRED',403);
          if(error && (error.status===429 || ['over_email_send_rate_limit','over_request_rate_limit'].includes(error.code ?? '')))throw new AccountError('RATE_LIMITED',429);
          throw new AccountError('RECOVERY_TEMPORARY',503);
        }
        jar.set('finly-recovery',recoveryProof(data.user.id),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:900});
      }
      stage='update-password';
      console.info('[auth/recovery] stage=update-password');
      try {
        const {error}=await client.auth.updateUser({password:value.password});
        if(error){console.error('[auth/recovery]',{stage,code:error.code ?? 'PASSWORD_UPDATE_FAILED',status:error.status ?? null});throw new Error('update-failed');}
      }catch{
        console.error('[auth/recovery]',{stage,code:'PASSWORD_UPDATE_FAILED'});
        throw new AccountError('RECOVERY_TEMPORARY',503);
      }
      jar.delete('finly-recovery');
      console.info('[auth/recovery] stage=complete');
    }
    if(action.action==='update') {
      stage='supabase-update';
      const user=await requireUser();requireAccountContext(request,user);const jar=await cookies();
      if(!validRecoveryProof(jar.get('finly-recovery')?.value,user.id))throw new AccountError('RECOVERY_AUTH_REQUIRED',403);
      const value=z.object({password:PasswordSchema,repeatPassword:PasswordSchema}).strict().refine(v=>v.password===v.repeatPassword).parse(action.data);
      const {error}=await client.auth.updateUser({password:value.password});if(error)throw providerError(error);jar.delete('finly-recovery');
    }
    if(action.action==='logout') {const {data}=await client.auth.getUser();if(data.user)requireAccountContext(request,data.user,false); const {error}=await client.auth.signOut({scope:'local'});if(error)throw new AccountError('SERVER_ERROR',503);(await cookies()).delete('finly-recovery'); }
    return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
  } catch(error) { diagnostic(error);return apiError(error instanceof z.ZodError ? new AccountError('VALIDATION_ERROR') : error); }
}
