import { Suspense } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useLayoutStore } from '@/store/layout'
import { PageLoading } from '../ui/PageLoading'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'

export function Layout() {
  const collapsed = useLayoutStore((state) => state.collapsed)
  const { pathname } = useLocation()

  return (
    <div className="min-h-dvh">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-1 focus:text-[#06281f]"
      >
        Pular para o conteúdo
      </a>
      <Sidebar />
      <MobileNav />
      <div
        className={cn(
          'transition-[padding] duration-300',
          collapsed ? 'lg:pl-[84px]' : 'lg:pl-[264px]',
        )}
      >
        <main id="conteudo" className="mx-auto w-full max-w-5xl px-5 pb-28 lg:pt-6 lg:pb-10">
          {/* A chave faz a página "virar" a cada troca de rota */}
          <div key={pathname} className="page-flip">
            <Suspense fallback={<PageLoading />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
        <footer className="mx-auto hidden max-w-5xl px-5 pb-8 text-sm text-mute lg:block">
          © 2026 Henrique Nascimento. <Link to="/login">Área do dono</Link>
        </footer>
      </div>
    </div>
  )
}
