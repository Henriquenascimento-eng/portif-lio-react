import { env } from '@/lib/env'
import type { ContactValues } from '@/lib/contactSchema'

/** Avisa o dono por e-mail via EmailJS. Sem as variáveis, não faz nada. */
export async function notifyOwner(values: ContactValues) {
  const { emailjsServiceId, emailjsTemplateId, emailjsPublicKey } = env
  if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) return false

  const emailjs = (await import('@emailjs/browser')).default
  await emailjs.send(
    emailjsServiceId,
    emailjsTemplateId,
    { from_name: values.name, reply_to: values.email, message: values.message },
    { publicKey: emailjsPublicKey },
  )
  return true
}
