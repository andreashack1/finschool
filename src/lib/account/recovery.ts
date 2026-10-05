import 'server-only';
import { createHmac,timingSafeEqual } from 'node:crypto';
import { AccountError } from './errors';
function secret() {const key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!key)throw new AccountError('CONFIGURATION_ERROR',503);return key;}
export function recoveryProof(userId:string,now=Date.now()) {const payload=`${userId}.${now+900000}`;return `${payload}.${createHmac('sha256',secret()).update(payload).digest('hex')}`;}
export function validRecoveryProof(value:string|undefined,userId:string,now=Date.now()) {if(!value || !process.env.SUPABASE_SERVICE_ROLE_KEY)return false;const parts=value.split('.');if(parts.length!==3)return false;const [id,expiration,signature]=parts;if(id!==userId || !/^\d+$/.test(expiration ?? '') || Number(expiration)<now || Number(expiration)>now+900000 || !/^[a-f0-9]{64}$/.test(signature ?? ''))return false;const expected=createHmac('sha256',secret()).update(`${id}.${expiration}`).digest();return timingSafeEqual(Buffer.from(signature,'hex'),expected);}
