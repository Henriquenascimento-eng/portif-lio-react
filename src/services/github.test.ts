import { fetchRepos, GithubRateLimitError } from './github'

function mockFetch(init: { status: number; body?: unknown; headers?: Record<string, string> }) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify(init.body ?? []), {
        status: init.status,
        headers: init.headers,
      }),
    ),
  )
}

afterEach(() => vi.unstubAllGlobals())

describe('fetchRepos', () => {
  it('descarta forks', async () => {
    mockFetch({
      status: 200,
      body: [
        { id: 1, name: 'meu-app', fork: false },
        { id: 2, name: 'copia', fork: true },
      ],
    })
    const repos = await fetchRepos()
    expect(repos.map((repo) => repo.name)).toEqual(['meu-app'])
  })

  it('sinaliza o limite de requisições da API', async () => {
    mockFetch({ status: 403, headers: { 'x-ratelimit-remaining': '0' } })
    await expect(fetchRepos()).rejects.toBeInstanceOf(GithubRateLimitError)
  })

  it('falha com mensagem clara em outros erros', async () => {
    mockFetch({ status: 500 })
    await expect(fetchRepos()).rejects.toThrow('status 500')
  })
})
