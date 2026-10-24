import { cn } from './cn'

export type ButtonVariant = 'primary' | 'ghost'

export function buttonClass(variant: ButtonVariant = 'primary', extra?: string) {
  return cn('btn', variant === 'primary' ? 'btn-primary' : 'btn-ghost', extra)
}
