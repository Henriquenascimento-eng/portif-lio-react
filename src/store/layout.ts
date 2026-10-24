import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type LayoutState = { collapsed: boolean; toggleSidebar: () => void }

/** Barra lateral recolhida ou aberta, lembrada entre visitas. */
export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({ collapsed: false, toggleSidebar: () => set({ collapsed: !get().collapsed }) }),
    { name: 'layout' },
  ),
)
