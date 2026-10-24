import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase'
import { AuthContext, type AuthState } from './context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    let active = true
    getSupabase().then((supabase) => {
      if (!supabase || !active) return
      supabase.auth.getSession().then(({ data }) => {
        if (!active) return
        setUser(data.session?.user ?? null)
        setLoading(false)
      })
      const { data } = supabase.auth.onAuthStateChange((_event, session) =>
        setUser(session?.user ?? null),
      )
      unsubscribe = () => data.subscription.unsubscribe()
    })
    return () => {
      active = false
      unsubscribe?.()
    }
  }, [])

  const value = useMemo<AuthState>(
    () => ({
      user,
      loading,
      configured: isSupabaseConfigured,
      signIn: async (email, password) => {
        const supabase = await getSupabase()
        if (!supabase) throw new Error('O login ainda não foi configurado.')
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw new Error('E-mail ou senha incorretos.')
      },
      signOut: async () => {
        const supabase = await getSupabase()
        await supabase?.auth.signOut()
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
