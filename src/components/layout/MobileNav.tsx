import { Link, NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { navItems } from './navItems'
import { ThemeToggle } from './ThemeToggle'
import { Icon } from '../ui/Icon'

/** No celular: barra no topo com o nome e o tema, e abas fixas embaixo (como no template de referência). */
export function MobileNav() {
  return (
    <>
      <div className="flex items-center justify-between px-5 py-3 lg:hidden">
        <Link to="/" className="font-display text-lg font-bold text-ink no-underline">
          Henrique Nascimento
        </Link>
        <ThemeToggle showLabel={false} />
      </div>
      <nav
        aria-label="Principal"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 py-2 text-xs font-semibold no-underline',
                isActive ? 'text-accent' : 'text-mute',
              )
            }
          >
            <Icon name={item.icon} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
