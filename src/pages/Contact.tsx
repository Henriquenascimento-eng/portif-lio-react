import { ContactForm } from '@/components/contact/ContactForm'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useSendMessage } from '@/hooks/useSendMessage'

const links = [
  ['E-mail', 'mailto:riquesoares2007@gmail.com'],
  ['GitHub', 'https://github.com/Henriquenascimento-eng'],
  ['LinkedIn', 'https://www.linkedin.com/in/henrique-da-silva-soares-do-nascimento-117402202/'],
  ['Instagram', 'https://instagram.com/rique___07'],
]

export default function Contact() {
  useDocumentTitle('Contato')
  const sendMessage = useSendMessage()
  return (
    <section className="grid gap-8 py-6 md:grid-cols-[1.4fr_1fr]">
      <div>
        <h1 className="text-3xl sm:text-4xl">Vamos conversar?</h1>
        <p className="mt-2 mb-5 max-w-md text-mute">
          Conte sobre a vaga, o projeto ou a dúvida. A mensagem chega direto para mim.
        </p>
        <ContactForm onSend={sendMessage.mutateAsync} />
      </div>
      <aside>
        <h2 className="text-xl">Outros caminhos</h2>
        <ul className="mt-3 grid gap-2 font-extrabold">
          {links.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                className="text-link"
                {...(href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  )
}
