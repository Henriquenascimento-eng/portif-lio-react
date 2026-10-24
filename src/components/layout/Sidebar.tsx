import { Link, NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useLayoutStore } from '@/store/layout'
import { Icon } from '../ui/Icon'
import { navItems } from './navItems'
import { ThemeToggle } from './ThemeToggle'

const socials = [
  ['GitHub', 'https://github.com/Henriquenascimento-eng'],
  ['LinkedIn', 'https://www.linkedin.com/in/henrique-da-silva-soares-do-nascimento-117402202/'],
  ['Instagram', 'https://instagram.com/rique___07'],
]

export function Sidebar() {
  const { collapsed, toggleSidebar } = useLayoutStore()
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-line bg-panel/90 p-4 backdrop-blur transition-[width] duration-300 lg:flex',
        collapsed ? 'w-[84px]' : 'w-[264px]',
      )}
    >
      <Link
        to="/"
        className="mb-8 flex items-center gap-3 text-ink no-underline"
        aria-label="Henrique Nascimento, início"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-pink font-display text-lg font-bold text-white">
          HN
        </span>
        {!collapsed && (
          <span className="leading-tight">
            <span className="block font-display font-bold">Henrique Nascimento</span>
            <span className="block text-sm text-mute">Automação e dados</span>
          </span>
        )}
      </Link>

      <nav aria-label="Principal" className="grid gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            aria-label={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl border px-3 py-2.5 font-semibold no-underline',
                collapsed && 'justify-center',
                isActive
                  ? 'border-accent/50 bg-accent/10 text-accent'
                  : 'border-transparent text-ink hover:bg-panel2',
              )
            }
          >
            <Icon name={item.icon} />
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto grid gap-3">
        {!collapsed && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 px-1 text-sm font-semibold">
            {socials.map(([label, href]) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <ThemeToggle showLabel={!collapsed} />
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={collapsed ? 'Abrir barra lateral' : 'Recolher barra lateral'}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-line px-3 py-2 text-mute hover:text-ink"
        >
          <Icon name={collapsed ? 'right' : 'left'} />
          {!collapsed && 'Recolher'}
        </button>
      </div>
    </aside>
  )
}
