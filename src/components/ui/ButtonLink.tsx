import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { buttonClass, type ButtonVariant } from '@/lib/buttonClass'

type Props = { children: ReactNode; variant?: ButtonVariant; className?: string } & (
  { to: string; href?: never } | { href: string; to?: never }
)

/** Link com aparência de botão: rota interna (to) ou endereço externo (href). */
export function ButtonLink({ children, variant = 'primary', className, to, href }: Props) {
  const classes = buttonClass(variant, className)
  if (to !== undefined) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  )
}
