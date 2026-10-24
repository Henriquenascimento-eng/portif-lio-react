import type { ButtonHTMLAttributes } from 'react'
import { buttonClass, type ButtonVariant } from '@/lib/buttonClass'
import { Spinner } from './Spinner'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  loading?: boolean
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className,
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading}
      className={buttonClass(variant, className)}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}
