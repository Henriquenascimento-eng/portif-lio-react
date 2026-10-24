import type { ReactNode } from 'react'

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="card p-6 text-center">
      <h3 className="text-xl">{title}</h3>
      {children && <div className="mt-2 text-mute">{children}</div>}
    </div>
  )
}
