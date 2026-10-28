import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Skeleton } from '@/components/ui/Skeleton'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useFeaturedNames } from '@/hooks/useFeaturedNames'
import { useMessages } from '@/hooks/useMessages'
import { useRepos } from '@/hooks/useRepos'
import { useSetMessageReplied } from '@/hooks/useSetMessageReplied'
import { useToggleFeatured } from '@/hooks/useToggleFeatured'
import { formatDate } from '@/lib/format'

function Messages() {
  const { data, isLoading, error, refetch } = useMessages()
  const toggle = useSetMessageReplied()

  if (isLoading) return <Skeleton className="h-32" />
  if (error)
    return (
      <ErrorState message="Não foi possível carregar as mensagens." onRetry={() => refetch()} />
    )
  if (!data || data.length === 0) {
    return (
      <EmptyState title="Nenhuma mensagem ainda">
        As mensagens do formulário aparecem aqui.
      </EmptyState>
    )
  }

  return (
    <ul className="grid gap-4">
      {data.map((item) => (
        <li key={item.id} className="card p-5">
          <p className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-display text-xl font-bold">{item.name}</span>
            <span className="text-sm font-bold text-mute">{formatDate(item.created_at)}</span>
          </p>
          <a href={`mailto:${item.email}`} className="font-bold text-link">
            {item.email}
          </a>
          <p className="mt-2 whitespace-pre-wrap">{item.message}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button
              variant={item.replied ? 'ghost' : 'primary'}
              loading={toggle.isPending && toggle.variables?.id === item.id}
              onClick={() => toggle.mutate({ id: item.id, replied: !item.replied })}
            >
              {item.replied ? 'Reabrir' : 'Marcar como respondida'}
            </Button>
            <span className="font-bold">{item.replied ? 'Respondida' : 'Aguardando resposta'}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

function FeaturedPicker() {
  const repos = useRepos()
  const featured = useFeaturedNames()
  const toggle = useToggleFeatured()

  if (repos.isLoading || featured.isLoading) return <Skeleton className="h-32" />
  if (repos.error || featured.error) {
    return (
      <ErrorState
        message="Não foi possível carregar os projetos."
        onRetry={() => {
          repos.refetch()
          featured.refetch()
        }}
      />
    )
  }
  if (!repos.data || repos.data.length === 0) {
    return <EmptyState title="Sem repositórios públicos" />
  }

  return (
    <ul className="card grid gap-1 p-4">
      {repos.data.map((repo) => (
        <li key={repo.id}>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 font-bold hover:bg-ink/10">
            <input
              type="checkbox"
              className="size-5 accent-[var(--accent)]"
              checked={featured.data?.includes(repo.name) ?? false}
              disabled={toggle.isPending}
              onChange={(e) => toggle.mutate({ name: repo.name, on: e.target.checked })}
            />
            {repo.name}
          </label>
        </li>
      ))}
    </ul>
  )
}

export default function Admin() {
  useDocumentTitle('Dashboard')
  const { user, signOut } = useAuth()
  return (
    <section className="py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl">Dashboard</h1>
          <p className="text-mute">Conectado como {user?.email}</p>
        </div>
        <Button variant="ghost" onClick={() => signOut()}>
          Sair
        </Button>
      </div>
      <h2 className="mt-8 mb-3 text-2xl sm:text-3xl">Mensagens recebidas</h2>
      <Messages />
      <h2 className="mt-10 mb-1 text-2xl sm:text-3xl">Projetos em destaque na home</h2>
      <p className="mb-3 text-mute">Se nenhum estiver marcado, a home mostra os 3 mais recentes.</p>
      <FeaturedPicker />
    </section>
  )
}
