import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Json } from '../../account/database';
import { adminSupabase } from '../../supabase/admin';

/** Additional schema metadata, isolated from account/progress types.
 * The existing client still owns credentials, transport and server-only lifetime. */
type SimulatorDatabase = {
  public: {
    Tables: { sim_runs: { Row: { id: string; user_id: string }; Insert: never; Update: never; Relationships: [] } };
    Views: Record<string, never>; Enums: Record<string, never>; CompositeTypes: Record<string, never>;
    Functions: {
      mutate_simulator_goal: { Args: { p_user:string;p_run:string;p_expected:number;p_day:string;p_now:string;p_development:boolean;p_input:Json };Returns:Json };
      upgrade_simulator_decisions: { Args: { p_user:string;p_run:string;p_expected:number;p_day:string;p_now:string;p_development:boolean;p_policy:Json };Returns:Json };
      finalize_simulator_month: { Args: { p_user:string;p_run:string;p_expected:number;p_day:string;p_snapshot:Json };Returns:Json };
      acknowledge_simulator_month: { Args: { p_user:string;p_run:string;p_review:string;p_operation:string };Returns:Json };
      upgrade_simulator_life: { Args: { p_user:string;p_run:string;p_expected:number;p_day:string;p_now:string;p_development:boolean;p_policy:Json };Returns:Json };
      activate_simulator_events: { Args: { p_user: string; p_run: string; p_expected: string | null; p_engine: Json }; Returns: Json };
      commit_simulator_events: { Args: { p_user: string; p_run: string; p_expected: number; p_settled: string | null; p_through: string; p_engine: Json; p_days: Json; p_instances: Json; p_entries: Json; p_now: string; p_development: boolean; p_operations?: Json; p_subscriptions?: Json }; Returns: Json };
      read_simulator_state: { Args: { p_user: string }; Returns: Json };
      apply_simulator_settlement: { Args: { p_user: string; p_run: string; p_expected: string | null; p_through: string; p_entries: Json; p_subscriptions?: Json; p_revision?: number }; Returns: Json };
      mutate_simulator_subscription: { Args: { p_user: string; p_run: string; p_expected: number; p_day: string; p_now: string; p_development: boolean; p_action: string; p_operation: string; p_subscription: Json; p_entries: Json }; Returns: Json };
      start_simulator_run: { Args: { p_user: string; p_run: Json; p_entries: Json }; Returns: Json };
    };
  };
};
export function simulatorDatabase(): SupabaseClient<SimulatorDatabase> {
  // Generic schema metadata is compile-time only; the runtime client is reused.
  return adminSupabase() as unknown as SupabaseClient<SimulatorDatabase>;
}
