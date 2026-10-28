import { useMutation } from '@tanstack/react-query'
import { sendContactMessage } from '@/services/messages'

/** Envia a mensagem do formulário (salva no Supabase e avisa por e-mail). */
export function useSendMessage() {
  return useMutation({ mutationFn: sendContactMessage })
}
