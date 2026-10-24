import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'

const valid = {
  name: 'Maria Souza',
  email: 'maria@exemplo.com',
  message: 'Olá Henrique, gostei do seu portfólio e quero conversar.',
}

async function fill(user: ReturnType<typeof userEvent.setup>, values = valid) {
  await user.type(screen.getByLabelText('Nome'), values.name)
  await user.type(screen.getByLabelText('E-mail'), values.email)
  await user.type(screen.getByLabelText('Mensagem'), values.message)
}

describe('ContactForm', () => {
  it('mostra uma mensagem específica para cada campo vazio', async () => {
    const user = userEvent.setup()
    render(<ContactForm onSend={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(
      await screen.findByText('Informe seu nome com pelo menos 2 caracteres'),
    ).toBeInTheDocument()
    expect(screen.getByText('Informe seu e-mail')).toBeInTheDocument()
    expect(screen.getByText('A mensagem precisa ter no mínimo 20 caracteres')).toBeInTheDocument()
  })

  it('rejeita e-mail inválido e mensagem curta', async () => {
    const user = userEvent.setup()
    const onSend = vi.fn()
    render(<ContactForm onSend={onSend} />)
    await fill(user, { name: 'Ana', email: 'ana-sem-arroba', message: 'curta' })
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(await screen.findByText('E-mail inválido')).toBeInTheDocument()
    expect(screen.getByText('A mensagem precisa ter no mínimo 20 caracteres')).toBeInTheDocument()
    expect(onSend).not.toHaveBeenCalled()
  })

  it('bloqueia o botão durante o envio e evita mensagens duplicadas', async () => {
    const user = userEvent.setup()
    let finish: () => void = () => {}
    const onSend = vi.fn(() => new Promise<void>((resolve) => (finish = resolve)))
    render(<ContactForm onSend={onSend} />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    const sending = await screen.findByRole('button', { name: 'Enviando…' })
    expect(sending).toBeDisabled()
    await user.click(sending)
    expect(onSend).toHaveBeenCalledTimes(1)

    finish()
    expect(await screen.findByText(/Mensagem enviada/)).toBeInTheDocument()
  })

  it('mostra o erro quando o envio falha', async () => {
    const user = userEvent.setup()
    render(<ContactForm onSend={vi.fn().mockRejectedValue(new Error('Falha de rede simulada'))} />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Falha de rede simulada'),
    )
  })
})
