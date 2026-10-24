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

  const exhausted = res.headers.get('x-ratelimit-remaining') === '0'
  if (res.status === 429 || (res.status === 403 && exhausted)) throw new GithubRateLimitError()
  if (!res.ok) throw new Error(`O GitHub respondeu com o status ${res.status}`)

  const data = (await res.json()) as Repo[]
  return data.filter((repo) => !repo.fork)
}
