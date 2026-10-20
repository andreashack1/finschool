import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverSupabase } from '../../../src/lib/supabase/server';
import { safeNext } from '../../../src/lib/account/redirects';
import { z } from 'zod';
import { recoveryProof } from '../../../src/lib/account/recovery';
import { appUrl } from '../../../src/lib/supabase/env';
import { apiError } from '../../../src/lib/account/http';
export async function GET(request:Request) {
  const url=new URL(request.url);const next=safeNext(url.searchParams.get('next'),'/salveaza-progresul');
  let origin:string;
  try { origin=appUrl(); } catch(error) { return apiError(error); }
  const recoveryRequested=url.searchParams.get('type')==='recovery' || next==='/actualizeaza-parola';
  try {
    const client=await serverSupabase();const code=url.searchParams.get('code');
    const hash=url.searchParams.get('token_hash');
    if(hash && url.searchParams.get('type')==='recovery') {
      const target=new URL('/actualizeaza-parola',origin);target.searchParams.set('token_hash',hash);target.searchParams.set('type','recovery');
      const response=NextResponse.redirect(target);response.headers.set('Cache-Control','no-store');return response;
    }
    const type=z.enum(['signup','email','recovery']).safeParse(url.searchParams.get('type'));
    if(hash && type.success) {
      const {data,error}=await client.auth.verifyOtp({token_hash:hash,type:type.data});if(error || !data.user || !data.session)throw new Error('invalid');
      if(type.data==='recovery')(await cookies()).set('finly-recovery',recoveryProof(data.user.id),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:900});
      const response=NextResponse.redirect(new URL(type.data==='recovery'?'/actualizeaza-parola':next,origin));response.headers.set('Cache-Control','no-store');return response;
    }
    if(!code)throw new Error('invalid');
    // Use the documented recovery event: redirectType exists at runtime in
    // Auth JS 2.117.2, but is absent from its public AuthTokenResponse type.
    // Never infer recovery from the caller-controlled `next` or `type` query.
    let recovery=false;
    const {data:{subscription}}=client.auth.onAuthStateChange(event=>{if(event==='PASSWORD_RECOVERY')recovery=true;});
    const result=await client.auth.exchangeCodeForSession(code,url.searchParams.get('sb_flow_id')?{flowId:url.searchParams.get('sb_flow_id')!}:undefined).finally(()=>subscription.unsubscribe());
    const {data,error}=result;
    if(error || !data.user || !data.session)throw new Error('invalid');
    if(recovery) (await cookies()).set('finly-recovery',recoveryProof(data.user.id),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:900});
    const response=NextResponse.redirect(new URL(recovery?'/actualizeaza-parola':next,origin));response.headers.set('Cache-Control','no-store');return response;
  } catch { console.error('[auth/callback]',{stage:'handoff',code:'CALLBACK_FAILED'});const response=NextResponse.redirect(new URL(recoveryRequested?'/actualizeaza-parola?invalid=1':'/verifica-email?invalid=1',origin));response.headers.set('Cache-Control','no-store');return response; }
}
