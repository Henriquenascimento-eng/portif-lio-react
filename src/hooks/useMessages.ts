import { useQuery } from '@tanstack/react-query'
import { listMessages } from '@/services/messages'

/** Mensagens do formulário de contato, para o dashboard. */
export function useMessages() {
  return useQuery({ queryKey: ['messages'], queryFn: listMessages })
}
