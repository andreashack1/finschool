import type { AccountProfile } from './schemas';
// Minimal types for the tables/RPCs used here. Generate a full schema from the
// deployed project with Supabase CLI when managing additional database APIs.
export type Json=string|number|boolean|null|Json[]|{[key:string]:Json|undefined};
export type Database={public:{Tables:{profiles:{Row:AccountProfile;Insert:AccountProfile;Update:Partial<Pick<AccountProfile,'username'|'display_name'>>;Relationships:[]}};Views:Record<string,never>;Enums:Record<string,never>;CompositeTypes:Record<string,never>;Functions:{
  username_available:{Args:{candidate:string};Returns:boolean};
  update_account_profile:{Args:{p_user:string;p_username:string;p_display_name:string|null};Returns:boolean};
  read_account_progress:{Args:{p_user:string};Returns:Json};
  apply_progress_mutation:{Args:{p_user:string;p_operation:string|null;p_type:string;p_revision:number;p_state:Json;p_result:Json;p_streak:number;p_longest:number};Returns:Json};
}}};
