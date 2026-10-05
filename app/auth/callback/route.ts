import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serverSupabase } from '../../../src/lib/supabase/server';
import { safeNext } from '../../../src/lib/account/redirects';
import { z } from 'zod';
import { recoveryProof } from '../../../src/lib/account/recovery';
import { appUrl } from '../../../src/lib/supabase/env';
export async function GET(request:Request) {
  const url=new URL(request.url);const next=safeNext(url.searchParams.get('next'),'/salveaza-progresul');
  try {
    const client=await serverSupabase();const code=url.searchParams.get('code');
    const hash=url.searchParams.get('token_hash');
    const type=z.enum(['signup','email','recovery']).safeParse(url.searchParams.get('type'));
    if(hash && type.success) {
      const {data,error}=await client.auth.verifyOtp({token_hash:hash,type:type.data});if(error || !data.user)throw new Error('invalid');
      if(type.data==='recovery')(await cookies()).set('finly-recovery',recoveryProof(data.user.id),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:900});
      const response=NextResponse.redirect(new URL(type.data==='recovery'?'/actualizeaza-parola':next,appUrl()));response.headers.set('Cache-Control','no-store');return response;
    }
    if(!code)throw new Error('invalid');
    const {data,error}=await client.auth.exchangeCodeForSession(code,url.searchParams.get('sb_flow_id')?{flowId:url.searchParams.get('sb_flow_id')!}:undefined);
    if(error || !data.user)throw new Error('invalid');
    const recovery=z.object({redirectType:z.string().nullable().optional()}).parse(data).redirectType==='recovery';
    if(recovery) (await cookies()).set('finly-recovery',recoveryProof(data.user.id),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:900});
    const response=NextResponse.redirect(new URL(recovery?'/actualizeaza-parola':next,appUrl()));response.headers.set('Cache-Control','no-store');return response;
  } catch { const response=NextResponse.redirect(new URL(next==='/actualizeaza-parola'?'/actualizeaza-parola?invalid=1':'/verifica-email?invalid=1',appUrl()));response.headers.set('Cache-Control','no-store');return response; }
}
