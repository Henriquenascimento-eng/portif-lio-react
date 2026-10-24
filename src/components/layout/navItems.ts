import type { IconName } from '../ui/Icon'

export const navItems: Array<{ to: string; label: string; icon: IconName; end?: boolean }> = [
  { to: '/', label: 'Início', icon: 'home', end: true },
  { to: '/projetos', label: 'Projetos', icon: 'folder' },
  { to: '/sobre', label: 'Sobre', icon: 'user' },
  { to: '/contato', label: 'Contato', icon: 'mail' },
]
