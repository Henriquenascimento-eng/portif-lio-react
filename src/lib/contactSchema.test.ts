import { contactSchema } from './contactSchema'

const valid = {
  name: 'Maria',
  email: 'maria@exemplo.com',
  message: 'Uma mensagem com mais de vinte caracteres.',
}

describe('contactSchema', () => {
  it('aceita dados válidos', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('recusa nome que fica curto depois de tirar os espaços', () => {
    const result = contactSchema.safeParse({ ...valid, name: '  A  ' })
    expect(result.success).toBe(false)
  })

  it('recusa mensagem com mais de 1000 caracteres', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'a'.repeat(1001) })
    expect(result.error?.issues[0].message).toBe('A mensagem pode ter no máximo 1000 caracteres')
  })
})
