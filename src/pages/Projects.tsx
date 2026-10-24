import { useMemo, useState } from 'react'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { cn } from '@/lib/cn'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useRepos } from '@/hooks/useRepos'

export default function Projects() {
  useDocumentTitle('Projetos')
  const { data, isLoading, error, refetch } = useRepos()
  const [language, setLanguage] = useState<string | null>(null)

  const languages = useMemo(
    () => [...new Set((data ?? []).map((repo) => repo.language).filter(Boolean))] as string[],
    [data],
  )
  const visible = useMemo(
    () => (data ?? []).filter((repo) => !language || repo.language === language),
    [data, language],
  )

  return (
    <section className="py-6">
      <h1 className="text-3xl sm:text-4xl">Projetos</h1>
      <p className="mt-2 mb-5 max-w-xl text-mute">
        Esta lista vem direto do meu GitHub e se atualiza sozinha a cada novo repositório.
      </p>
      {languages.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar por linguagem">
          {[null, ...languages].map((item) => (
            <button
              key={item ?? 'todas'}
              type="button"
              aria-pressed={language === item}
              onClick={() => setLanguage(item)}
              className={cn(
                'cursor-pointer rounded-full border border-line px-4 py-1 font-extrabold',
                language === item ? 'border-accent bg-accent/15 text-accent' : 'bg-panel text-ink',
              )}
            >
              {item ?? 'Todas'}
            </button>
          ))}
        </div>
      )}
      <ProjectGrid
        repos={visible}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
        skeletonCount={6}
      />
    </section>
  )
}
