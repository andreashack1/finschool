import { NextResponse } from 'next/server';
import { requireUser } from '../../../src/lib/supabase/server';
import { getAccountSnapshot,mutateAccountProgress } from '../../../src/lib/account/repository';
import { OperationSchema } from '../../../src/lib/account/contracts';
import { AccountError } from '../../../src/lib/account/errors';
import { apiError,sameOrigin,readBody,requireAccountContext } from '../../../src/lib/account/http';
export async function GET(request:Request) { try {const user=await requireUser();requireAccountContext(request,user,false); return NextResponse.json(await getAccountSnapshot(user),{headers:{'Cache-Control':'no-store'}}); } catch(error) { return apiError(error); } }
export async function POST(request:Request) { try { sameOrigin(request);const user=await requireUser();requireAccountContext(request,user); const payload=OperationSchema.safeParse(await readBody(request));if(!payload.success)throw new AccountError('INVALID_OPERATION');return NextResponse.json(await mutateAccountProgress(user,payload.data),{headers:{'Cache-Control':'no-store'}}); } catch(error) { return apiError(error); } }
