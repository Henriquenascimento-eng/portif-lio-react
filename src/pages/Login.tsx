import { useState, type FormEvent } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { PageLoading } from '@/components/ui/PageLoading'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Login() {
  useDocumentTitle('Entrar')
  const { user, loading, configured, signIn } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) return <PageLoading />
  if (user) {
    const from = (location.state as { from?: string } | null)?.from
    return <Navigate to={from ?? '/admin'} replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-md py-8">
      <h1 className="text-3xl sm:text-4xl">Área do dono</h1>
      <p className="mt-2 mb-5 text-mute">Entre para ver as mensagens e escolher os destaques.</p>
      {!configured && (
        <p role="alert" className="card mb-4 p-4 font-bold">
          O login ainda não foi configurado neste site.
        </p>
      )}
      <form onSubmit={handleSubmit} className="card grid gap-4 p-6">
        <div>
          <label htmlFor="login-email" className="mb-1 block font-extrabold">
            E-mail
          </label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="username"
            className="field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="login-password" className="mb-1 block font-extrabold">
            Senha
          </label>
          <input
            id="login-password"
            type="password"
            required
            autoComplete="current-password"
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" loading={submitting} disabled={!configured}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </Button>
        {error && (
          <p role="alert" className="font-bold text-[#c02a40] dark:text-[#ff9aa9]">
            {error}
          </p>
        )}
      </form>
    </section>
  )
}
