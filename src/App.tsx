import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/auth/ProtectedRoute'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Layout } from '@/components/layout/Layout'
import { PageLoading } from '@/components/ui/PageLoading'
import { useThemeStore } from '@/store/theme'
import Home from '@/pages/Home'

// Páginas (exceto a home) carregam por rota; dashboard e login (com o SDK do Supabase) ficam fora do pacote inicial do visitante.
const Projects = lazy(() => import('@/pages/Projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const AuthRoutes = lazy(() => import('@/auth/AuthRoutes'))
const Login = lazy(() => import('@/pages/Login'))
const Admin = lazy(() => import('@/pages/Admin'))

export function App() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projetos" element={<Projects />} />
          <Route path="projetos/:name" element={<ProjectDetail />} />
          <Route path="sobre" element={<About />} />
          <Route path="contato" element={<Contact />} />
          <Route
            element={
              <Suspense fallback={<PageLoading />}>
                <AuthRoutes />
              </Suspense>
            }
          >
            <Route
              path="login"
              element={
                <Suspense fallback={<PageLoading />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<PageLoading />}>
                    <Admin />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
