import { ButtonLink } from '@/components/ui/ButtonLink'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function NotFound({ title = 'Página não encontrada' }: { title?: string }) {
  useDocumentTitle(title)
  return (
    <section className="py-12 text-center">
      <p className="font-display text-8xl font-bold gradient-text">404</p>
      <h1 className="text-2xl sm:text-3xl">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-mute">
        O endereço que você abriu não existe ou foi movido. Volte para o início ou veja os projetos.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <ButtonLink to="/">Ir para o início</ButtonLink>
        <ButtonLink to="/projetos" variant="ghost">
          Ver projetos
        </ButtonLink>
      </div>
    </section>
  )
}
