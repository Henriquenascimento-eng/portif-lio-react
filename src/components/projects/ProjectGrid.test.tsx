import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { GithubRateLimitError } from '@/services/github'
import type { Repo } from '@/types'
import { ProjectGrid } from './ProjectGrid'

const repo: Repo = {
  id: 1,
  name: 'meu-app',
  description: 'Um app de exemplo',
  language: 'Python',
  stargazers_count: 2,
  updated_at: '2026-10-20T12:00:00Z',
  html_url: 'https://github.com/exemplo/meu-app',
  homepage: null,
  topics: [],
  fork: false,
}

// ProjectCard usa <Link>, então o teste precisa de um roteador.
function renderGrid(props: Partial<Parameters<typeof ProjectGrid>[0]> = {}) {
  const onRetry = vi.fn()
  render(
    <MemoryRouter>
      <ProjectGrid isLoading={false} error={null} onRetry={onRetry} {...props} />
    </MemoryRouter>,
  )
  return { onRetry }
}

describe('ProjectGrid', () => {
  it('mostra o aviso de carregamento enquanto busca os projetos', () => {
    renderGrid({ isLoading: true })
    expect(screen.getByRole('status')).toHaveTextContent('Carregando projetos do GitHub')
  })

  it('mostra um erro amigável e permite tentar de novo quando a API falha', async () => {
    const { onRetry } = renderGrid({ error: new Error('status 500') })
    expect(screen.getByRole('alert')).toHaveTextContent('Não foi possível carregar os projetos')
    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('explica o limite de requisições do GitHub', () => {
    renderGrid({ error: new GithubRateLimitError() })
    expect(screen.getByRole('alert')).toHaveTextContent('O GitHub pediu uma pausa')
  })

  it('mostra o estado vazio quando não há repositórios', () => {
    renderGrid({ repos: [] })
    expect(screen.getByText('Nenhum projeto por aqui ainda')).toBeInTheDocument()
  })

  it('mostra descrição, linguagem, data e link individual de cada projeto', () => {
    renderGrid({ repos: [repo] })
    expect(screen.getByRole('link', { name: 'meu-app' })).toHaveAttribute(
      'href',
      '/projetos/meu-app',
    )
    expect(screen.getByText('Um app de exemplo')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText(/Atualizado em 20 de out\. de 2026/)).toBeInTheDocument()
  })
})
