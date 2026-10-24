import type { SupabaseClient } from '@supabase/supabase-js'
import { env } from './env'

export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)

let client: Promise<SupabaseClient | null> | undefined

/** Carrega o SDK do Supabase só quando alguém precisa dele (fora do pacote inicial). */
export function getSupabase() {
  if (!client) {
    client = isSupabaseConfigured
      ? import('@supabase/supabase-js').then((m) =>
          m.createClient(String(env.supabaseUrl), String(env.supabaseAnonKey)),
        )
      : Promise.resolve(null)
  }
  return client
}
