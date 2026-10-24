import { getSupabase } from '@/lib/supabase'

export async function fetchFeaturedNames(): Promise<string[]> {
  const supabase = await getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase.from('featured_repos').select('name')
  if (error) throw new Error('Não foi possível carregar os destaques.')
  return data.map((row) => row.name as string)
}

export async function setRepoFeatured(name: string, featured: boolean) {
  const supabase = await getSupabase()
  if (!supabase) throw new Error('O serviço de destaques ainda não foi configurado.')
  const query = featured
    ? supabase.from('featured_repos').upsert({ name })
    : supabase.from('featured_repos').delete().eq('name', name)
  const { error } = await query
  if (error) throw new Error('Não foi possível salvar o destaque.')
}
