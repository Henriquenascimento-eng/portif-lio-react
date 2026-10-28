import { useThemeStore } from './theme'

beforeEach(() => {
  localStorage.clear()
  useThemeStore.setState({ theme: 'light' })
})

describe('tema', () => {
  it('troca o tema e salva a escolha no localStorage', () => {
    useThemeStore.getState().toggle()
    expect(useThemeStore.getState().theme).toBe('dark')
    expect(JSON.parse(localStorage.getItem('theme') ?? '{}').state.theme).toBe('dark')
  })

  it('recupera o tema salvo quando a pessoa volta ao site', async () => {
    localStorage.setItem('theme', JSON.stringify({ state: { theme: 'dark' }, version: 0 }))
    await useThemeStore.persist.rehydrate()
    expect(useThemeStore.getState().theme).toBe('dark')
  })
})
