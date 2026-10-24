import { createContext } from 'react'
import type { User } from '@supabase/supabase-js'

export type AuthState = {
  user: User | null
  loading: boolean
  configured: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthState | null>(null)
