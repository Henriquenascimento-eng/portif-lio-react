import { env } from '@/lib/env'
import type { Repo } from '@/types'

export class GithubRateLimitError extends Error {
  constructor() {
    super('Limite de requisições da API do GitHub atingido')
    this.name = 'GithubRateLimitError'
  }
}

export async function fetchRepos(signal?: AbortSignal): Promise<Repo[]> {
  const url = `https://api.github.com/users/${env.githubUser}/repos?per_page=100&sort=updated`
  const res = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } })

  // Sem login, a API só devolve 403 ou 429 nesta rota quando o limite (60 por hora) acaba.
  if (res.status === 403 || res.status === 429) throw new GithubRateLimitError()
  if (!res.ok) throw new Error(`O GitHub respondeu com o status ${res.status}`)

  const data = (await res.json()) as Repo[]
  // Esconde cópias (forks) e o repositório especial do perfil (mesmo nome do usuário).
  const profileRepo = env.githubUser.toLowerCase()
  return data.filter((repo) => !repo.fork && repo.name.toLowerCase() !== profileRepo)
}
