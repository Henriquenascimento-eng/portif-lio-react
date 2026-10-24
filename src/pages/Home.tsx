import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HeroScene } from '@/components/scene/HeroScene'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useFeaturedNames } from '@/hooks/useFeaturedNames'
import { useRepos } from '@/hooks/useRepos'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function Home() {
  useDocumentTitle('Automação e dados')
  const repos = useRepos()
  const featured = useFeaturedNames()

  const highlighted = useMemo(() => {
    const all = repos.data ?? []
    const chosen = all.filter((repo) => featured.data?.includes(repo.name))
    return chosen.length > 0 ? chosen : all.slice(0, 3)
  }, [repos.data, featured.data])

  const waitingFeatured = isSupabaseConfigured && featured.isLoading

  return (
    <>
      <section className="grid items-center gap-8 py-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-accent">Olá, eu sou o Henrique</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">
            Automatizo processos e transformo <span className="gradient-text">dados</span> em
            soluções.
          </h1>
          <p className="mt-4 max-w-md text-mute">
            Estudo Engenharia de Software na FIAP e uso Python, SQL e APIs para transformar tarefas
            repetitivas em sistemas confiáveis.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to="/projetos">Ver projetos</ButtonLink>
            <ButtonLink to="/contato" variant="ghost">
              Falar comigo
            </ButtonLink>
          </div>
          <pre
            className="card mt-8 overflow-x-auto p-4 text-sm leading-relaxed"
            aria-label="Resumo em código"
          >
            <code>
              <span className="text-violet">const</span> henrique = {'{'}
              {'\n  '}foco: [<span className="text-accent">'automação'</span>,{' '}
              <span className="text-accent">'dados'</span>],
              {'\n  '}stack: [<span className="text-accent">'Python'</span>,{' '}
              <span className="text-accent">'SQL'</span>,{' '}
              <span className="text-accent">'APIs'</span>, <span className="text-accent">'IA'</span>
              ],
              {'\n  '}abertoAOportunidades: <span className="text-pink">true</span>,{'\n'}
              {'}'}
            </code>
          </pre>
        </div>
        <HeroScene />
      </section>

      <section className="mt-10" aria-labelledby="destaques">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <h2 id="destaques" className="text-2xl sm:text-3xl">
            Projetos em destaque
          </h2>
          <Link to="/projetos" className="font-semibold">
            Ver todos os projetos
          </Link>
        </div>
        <ProjectGrid
          repos={highlighted}
          isLoading={repos.isLoading || waitingFeatured}
          error={repos.error}
          onRetry={() => repos.refetch()}
        />
      </section>
    </>
  )
}
