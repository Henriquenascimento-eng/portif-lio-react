import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from './ProtectedRoute'

vi.mock('@/hooks/useAuth', () => ({ useAuth: vi.fn() }))

const base = { configured: true, signIn: vi.fn(), signOut: vi.fn() }

function renderAdmin() {
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/login" element={<p>Tela de login</p>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <p>Dashboard secreto</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  it('redireciona para o login quando não há sessão', () => {
    vi.mocked(useAuth).mockReturnValue({ ...base, user: null, loading: false })
    renderAdmin()
    expect(screen.getByText('Tela de login')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard secreto')).not.toBeInTheDocument()
  })

  it('não mostra o dashboard enquanto a sessão carrega', () => {
    vi.mocked(useAuth).mockReturnValue({ ...base, user: null, loading: true })
    renderAdmin()
    expect(screen.queryByText('Dashboard secreto')).not.toBeInTheDocument()
    expect(screen.queryByText('Tela de login')).not.toBeInTheDocument()
  })

  it('libera o dashboard para quem está logado', () => {
    vi.mocked(useAuth).mockReturnValue({
      ...base,
      user: { id: '1', email: 'dono@exemplo.com' } as never,
      loading: false,
    })
    renderAdmin()
    expect(screen.getByText('Dashboard secreto')).toBeInTheDocument()
  })
})
