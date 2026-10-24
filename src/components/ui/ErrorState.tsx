import { Button } from './Button'

type Props = { title?: string; message: string; onRetry?: () => void }

export function ErrorState({ title = 'Algo deu errado', message, onRetry }: Props) {
  return (
    <div role="alert" className="card p-6">
      <h3 className="text-xl">{title}</h3>
      <p className="mt-2 text-mute">{message}</p>
      {onRetry && (
        <Button variant="ghost" className="mt-4" onClick={onRetry}>
          Tentar de novo
        </Button>
      )}
    </div>
  )
}
