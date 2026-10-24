const dateFormat = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' })

export function formatDate(iso: string) {
  return dateFormat.format(new Date(iso))
}
