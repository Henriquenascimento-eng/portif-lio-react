import { Outlet } from 'react-router-dom'
import { AuthProvider } from './AuthProvider'

/** Agrupa /login e /admin: o Supabase só é carregado quando alguém entra nessas rotas. */
export default function AuthRoutes() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
