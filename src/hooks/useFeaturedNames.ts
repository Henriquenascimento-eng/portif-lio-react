import { useQuery } from '@tanstack/react-query'
import { fetchFeaturedNames } from '@/services/featured'

export function useFeaturedNames() {
  return useQuery({ queryKey: ['featured'], queryFn: fetchFeaturedNames })
}
