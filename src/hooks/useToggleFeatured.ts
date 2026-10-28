import { useMutation, useQueryClient } from '@tanstack/react-query'
import { setRepoFeatured } from '@/services/featured'

/** Liga ou desliga um projeto dos destaques da home e recarrega a lista de destaques. */
export function useToggleFeatured() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: ({ name, on }: { name: string; on: boolean }) => setRepoFeatured(name, on),
    onSuccess: () => client.invalidateQueries({ queryKey: ['featured'] }),
  })
}
