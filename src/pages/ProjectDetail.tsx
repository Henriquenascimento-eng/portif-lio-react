import { Link, useParams } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useRepos } from '@/hooks/useRepos'
import { formatDate } from '@/lib/format'
import { GithubRateLimitError } from '@/services/github'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { name } = useParams()
  const { data, isLoading, error, refetch } = useRepos()
  const repo = data?.find((item) => item.name === name)
  useDocumentTitle(repo?.name ?? 'Projeto')

  if (isLoading) {
    return (
      <div className="py-6" aria-busy="true">
        <p className="sr-only" role="status">
          Carregando projeto
        </p>
        <Skeleton className="h-16 w-2/3" />
        <Skeleton className="mt-4 h-40" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-6">
        <ErrorState
          title="Não foi possível abrir este projeto"
          message={
            error instanceof GithubRateLimitError
              ? 'O GitHub limitou as consultas. Aguarde alguns minutos e tente de novo.'
              : 'A API do GitHub não respondeu. Tente de novo em instantes.'
          }
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  if (!repo) return <NotFound title="Projeto não encontrado" />

  return (
    <article className="py-6">
      <Link to="/projetos" className="font-extrabold text-link">
        Voltar para os projetos
      </Link>
      <h1 className="mt-3 text-3xl sm:text-5xl">{repo.name}</h1>
      <p className="mt-3 max-w-2xl text-lg">
        {repo.description ?? 'Este projeto ainda não tem descrição no GitHub.'}
      </p>
      <dl className="card mt-6 grid max-w-2xl gap-3 p-5 sm:grid-cols-3">
        <div>
          <dt className="text-sm font-bold text-mute">Linguagem</dt>
          <dd className="font-extrabold">{repo.language ?? 'Não informada'}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-mute">Estrelas</dt>
          <dd className="font-extrabold">{repo.stargazers_count}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-mute">Última atualização</dt>
          <dd className="font-extrabold">{formatDate(repo.updated_at)}</dd>
        </div>
      </dl>
      {repo.topics.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {repo.topics.map((topic) => (
            <li key={topic} className="chip">
              {topic}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={repo.html_url}>Ver código no GitHub</ButtonLink>
        {repo.homepage && (
          <ButtonLink href={repo.homepage} variant="ghost">
            Abrir demonstração
          </ButtonLink>
        )}
      </div>
    </article>
  )
}
