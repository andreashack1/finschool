import { NextResponse } from 'next/server';
import { serverSupabase } from '../../../../src/lib/supabase/server';
import { UsernameSchema,normalizeUsername } from '../../../../src/lib/account/schemas';
import { apiError } from '../../../../src/lib/account/http';
export async function GET(request:Request) { try {const candidate=normalizeUsername(new URL(request.url).searchParams.get('username') ?? '');if(!UsernameSchema.safeParse(candidate).success)return NextResponse.json({available:false});const {data,error}=await (await serverSupabase()).rpc('username_available',{candidate});if(error)throw error;return NextResponse.json({available:data===true},{headers:{'Cache-Control':'no-store'}});}catch(error){return apiError(error);} }
