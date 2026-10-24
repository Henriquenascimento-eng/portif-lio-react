import { GithubRateLimitError } from '@/services/github'
import type { Repo } from '@/types'
import { EmptyState } from '../ui/EmptyState'
import { ErrorState } from '../ui/ErrorState'
import { Skeleton } from '../ui/Skeleton'
import { ProjectCard } from './ProjectCard'

type Props = {
  repos?: Repo[]
  isLoading: boolean
  error: unknown
  onRetry: () => void
  skeletonCount?: number
}

export function ProjectGrid({ repos, isLoading, error, onRetry, skeletonCount = 3 }: Props) {
  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        <p className="sr-only" role="status">
          Carregando projetos do GitHub
        </p>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <Skeleton key={i} className="h-56" />
        ))}
      </div>
    )
  }

  if (error) {
    const limited = error instanceof GithubRateLimitError
    return (
      <ErrorState
        title={limited ? 'O GitHub pediu uma pausa' : 'Não foi possível carregar os projetos'}
        message={
          limited
            ? 'Muitas consultas partiram deste endereço. Aguarde alguns minutos e tente de novo.'
            : 'A API do GitHub não respondeu. Verifique sua conexão e tente de novo.'
        }
        onRetry={onRetry}
      />
    )
  }

  if (!repos || repos.length === 0) {
    return (
      <EmptyState title="Nenhum projeto por aqui ainda">
        Quando houver repositórios públicos no GitHub, eles aparecem nesta lista.
      </EmptyState>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <ProjectCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}
