import { Component, type ReactNode } from 'react'
import { ErrorState } from './ui/ErrorState'

type State = { failed: boolean }

/** Último recurso: se um componente quebrar ao renderizar, mostra uma página amigável. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="mx-auto max-w-xl p-8">
        <ErrorState
          title="Esta página travou"
          message="Ocorreu um erro inesperado. Recarregue a página para tentar de novo."
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }
}
