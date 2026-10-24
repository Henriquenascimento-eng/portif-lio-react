import { useThemeStore } from '@/store/theme'
import { cn } from '@/lib/cn'
import { Icon } from '../ui/Icon'

export function ThemeToggle({ showLabel = true }: { showLabel?: boolean }) {
  const { theme, toggle } = useThemeStore()
  const dark = theme === 'dark'
  const label = dark ? 'Modo claro' : 'Modo escuro'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={showLabel ? undefined : label}
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-panel2 px-3 py-2 font-semibold text-ink hover:border-accent',
        !showLabel && 'justify-center',
      )}
    >
      <Icon name={dark ? 'sun' : 'moon'} />
      {showLabel && label}
    </button>
  )
}
