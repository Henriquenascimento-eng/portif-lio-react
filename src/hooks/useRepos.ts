import { useQuery } from '@tanstack/react-query'
import { fetchRepos } from '@/services/github'

/** Uma única consulta ao GitHub, compartilhada (e em cache) entre todas as páginas. */
export function useRepos() {
  return useQuery({ queryKey: ['repos'], queryFn: ({ signal }) => fetchRepos(signal) })
}
