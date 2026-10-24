import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

type ThemeState = { theme: Theme; toggle: () => void }

const prefersDark = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches

/** Tema persistido em localStorage (chave "theme"). Sem escolha salva, segue o sistema. */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: prefersDark() ? 'dark' : 'light',
      toggle: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
    }),
    { name: 'theme' },
  ),
)
