// Read-only remote reachability checks. Never prints credentials or response bodies.
import nextEnv from '@next/env';
import fs from 'node:fs';
nextEnv.loadEnvConfig(process.cwd());
const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const report={configured:{url:Boolean(url),publicKey:Boolean(key),serviceRole:Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)},checks:[],remoteMutationsTested:false};
if(url && key){
  for(const [name,path,init] of [
    ['Auth settings','/auth/v1/settings',{}],
    ['Username RPC (read-only)','/rest/v1/rpc/username_available',{method:'POST',body:JSON.stringify({candidate:'finly_qa_probe'})}],
  ]){
    try{const response=await fetch(new URL(path,url),{...init,headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(15000)});report.checks.push({name,status:response.status,reachable:true});}
    catch{report.checks.push({name,reachable:false});}
  }
}
fs.mkdirSync('artifacts/account-qa',{recursive:true});fs.writeFileSync('artifacts/account-qa/remote-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
