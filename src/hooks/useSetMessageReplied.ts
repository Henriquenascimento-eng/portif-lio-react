import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setMessageReplied } from '@/services/messages'

/** Marca (ou desmarca) uma mensagem como respondida e recarrega a lista. */
export function useSetMessageReplied() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ id, replied }: { id: string; replied: boolean }) =>
      setMessageReplied(id, replied),
    onSuccess: () => client.invalidateQueries({ queryKey: ['messages'] }),
  })
}
