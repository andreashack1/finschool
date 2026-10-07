import { NextResponse } from 'next/server';
import { serverSupabase } from '../../../../src/lib/supabase/server';
import { UsernameSchema,normalizeUsername } from '../../../../src/lib/account/schemas';
import { apiError } from '../../../../src/lib/account/http';
export async function GET(request:Request) {
  try {
    const candidate=normalizeUsername(new URL(request.url).searchParams.get('username') ?? '');
    if(!UsernameSchema.safeParse(candidate).success)return NextResponse.json({available:false},{headers:{'Cache-Control':'no-store'}});
    const {data,error}=await (await serverSupabase()).rpc('username_available',{candidate}).abortSignal(AbortSignal.timeout(5000));
    if(error || typeof data!=='boolean') {
      if(process.env.NODE_ENV==='development')console.error('[username-availability]',{stage:'rpc',code:error?.code || 'INVALID_RESULT',message:'RPC-ul nu a confirmat disponibilitatea.'});
      throw error ?? new Error('Invalid boolean response');
    }
    return NextResponse.json({available:data},{headers:{'Cache-Control':'no-store'}});
  }catch(error){return apiError(error);}
}
