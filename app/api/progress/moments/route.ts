import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '../../../../src/lib/supabase/server';
import { adminSupabase } from '../../../../src/lib/supabase/admin';
import { sameOrigin,readBody,requireAccountContext,apiError } from '../../../../src/lib/account/http';
import { AccountError } from '../../../../src/lib/account/errors';
import { StreakMomentSchema } from '../../../../src/lib/streak-moments';
import { isMissingStreakRpc } from '../../../../src/lib/account/streak-rpc';
const requestSchema=z.discriminatedUnion('action',[
  z.object({action:z.literal('claim'),claim:z.uuid()}).strict(),
  z.object({action:z.literal('ack'),claim:z.uuid(),ids:z.array(z.uuid()).min(1).max(128)}).strict(),
]);
export async function POST(request:Request) {
  try {
    sameOrigin(request);const user=await requireUser();requireAccountContext(request,user);
    const body=requestSchema.safeParse(await readBody(request));
    if(!body.success)throw new AccountError('INVALID_OPERATION');
    const db=adminSupabase();
    if(body.data.action==='claim') {
      const {data,error}=await db.rpc('claim_streak_moments',{p_user:user.id,p_claim:body.data.claim});
      if(isMissingStreakRpc(error,'claim_streak_moments'))return NextResponse.json({events:[]},{headers:{'Cache-Control':'no-store'}});
      if(error)throw new AccountError('SERVER_ERROR',503);
      return NextResponse.json({events:z.array(StreakMomentSchema).parse(data)},{headers:{'Cache-Control':'no-store'}});
    }
    const {data,error}=await db.rpc('acknowledge_streak_moments',{p_user:user.id,p_claim:body.data.claim,p_ids:body.data.ids});
    if(error)throw new AccountError('SERVER_ERROR',503);
    if(!data)throw new AccountError('INVALID_OPERATION',409);
    return NextResponse.json({acknowledged:true},{headers:{'Cache-Control':'no-store'}});
  }catch(error){return apiError(error);}
}
