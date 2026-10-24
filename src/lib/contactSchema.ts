import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome com pelo menos 2 caracteres'),
  email: z.string().trim().min(1, 'Informe seu e-mail').email('E-mail inválido'),
  message: z
    .string()
    .trim()
    .min(20, 'A mensagem precisa ter no mínimo 20 caracteres')
    .max(1000, 'A mensagem pode ter no máximo 1000 caracteres'),
})

export type ContactValues = z.infer<typeof contactSchema>
