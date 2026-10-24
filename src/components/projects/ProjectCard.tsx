import { Link } from 'react-router-dom'
import { formatDate } from '@/lib/format'
import type { Repo } from '@/types'

export function ProjectCard({ repo }: { repo: Repo }) {
  return (
    <article className="card card-hover flex min-h-56 flex-col p-5">
      <h3 className="text-xl">
        <Link to={`/projetos/${repo.name}`} className="text-ink no-underline hover:text-accent">
          {repo.name}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-mute">
        {repo.description ?? 'Projeto sem descrição no GitHub.'}
      </p>
      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-bold">
        {repo.language && <span className="chip">{repo.language}</span>}
        <span>{repo.stargazers_count} estrelas</span>
        <span>Atualizado em {formatDate(repo.updated_at)}</span>
      </p>
    </article>
  )
}
