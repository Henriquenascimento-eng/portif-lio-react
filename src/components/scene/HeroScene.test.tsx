import { act, fireEvent, render, screen } from '@testing-library/react'
import { HeroScene } from './HeroScene'

// A cena 3D de verdade precisa de WebGL; no teste, trocamos por um texto simples.
vi.mock('./Scene3D', () => ({ default: () => <p>cena 3D</p> }))

let showOnScreen: (visible: boolean) => void = () => {}

beforeEach(() => {
  showOnScreen = () => {}
  // O jsdom não tem IntersectionObserver: este falso deixa o teste dizer quando a área aparece.
  class FakeObserver {
    constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) {
      showOnScreen = (visible) => callback([{ isIntersecting: visible }])
    }
    observe() {}
    disconnect() {}
  }
  vi.stubGlobal('IntersectionObserver', FakeObserver)
})

afterEach(() => vi.unstubAllGlobals())

describe('HeroScene', () => {
  it('mostra o carro em SVG e só carrega o 3D depois que a pessoa interage', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }))
    render(<HeroScene />)
    act(() => showOnScreen(true))
    expect(screen.getByRole('img', { name: /Carrinho/ })).toBeInTheDocument()
    expect(screen.queryByText('cena 3D')).not.toBeInTheDocument()

    fireEvent.pointerMove(window)
    expect(await screen.findByText('cena 3D')).toBeInTheDocument()
  })

  it('nunca carrega o 3D para quem pede menos movimento', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }))
    render(<HeroScene />)
    act(() => showOnScreen(true))
    fireEvent.pointerMove(window)
    expect(screen.queryByText('cena 3D')).not.toBeInTheDocument()
  })
})
