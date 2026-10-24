import type { ContactValues } from '@/lib/contactSchema'
import { getSupabase } from '@/lib/supabase'
import type { StoredMessage } from '@/types'
import { notifyOwner } from './email'

async function requireClient() {
  const supabase = await getSupabase()
  if (!supabase) throw new Error('O serviço de mensagens ainda não foi configurado.')
  return supabase
}

/** Salva a mensagem para o dashboard e tenta avisar o dono por e-mail. */
export async function sendContactMessage(values: ContactValues) {
  const supabase = await requireClient()
  const { error } = await supabase.from('messages').insert(values)
  if (error) throw new Error('Não foi possível enviar a mensagem. Tente novamente.')
  await notifyOwner(values).catch(() => false)
}

export async function listMessages(): Promise<StoredMessage[]> {
  const supabase = await requireClient()
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error('Não foi possível carregar as mensagens.')
  return data as StoredMessage[]
}

export async function setMessageReplied(id: string, replied: boolean) {
  const supabase = await requireClient()
  const { error } = await supabase.from('messages').update({ replied }).eq('id', id)
  if (error) throw new Error('Não foi possível atualizar a mensagem.')
}
