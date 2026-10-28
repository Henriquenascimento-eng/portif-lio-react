import { SkillsSection } from '@/components/about/SkillsSection'
import { Timeline } from '@/components/about/Timeline'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
// Foto local em WebP (240px para telas 2x): sem depender do servidor do GitHub e com cache longo.
import avatar from '@/assets/avatar.webp'

const timeline = [
  {
    period: '2026 a 2029',
    title: 'FIAP, Engenharia de Software',
    detail: 'Graduação em andamento.',
  },
  {
    period: 'Certificados',
    title: 'Alura',
    detail: 'Engenharia de Prompt, Python: IA aplicada, Java OO, IA generativa, HTML e CSS.',
  },
  {
    period: 'Certificados',
    title: 'FIAP',
    detail: 'Python Development, Design Thinking, Lógica de programação, Comunicação.',
  },
  {
    period: 'Aprendizados',
    title: 'Dados, banco de dados e web',
    detail:
      'Databricks. Python com pandas, NumPy, Streamlit e Matplotlib. SQLite. HTML, CSS e JS. Git, GitHub e Azure DevOps.',
  },
]

export default function About() {
  useDocumentTitle('Sobre')
  return (
    <section className="py-6">
      <div className="card flex flex-wrap items-center gap-6 p-6">
        <img
          src={avatar}
          alt="Foto de Henrique Nascimento"
          width={120}
          height={120}
          loading="lazy"
          decoding="async"
          className="size-[120px] rounded-full border border-line bg-panel2"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-accent">Sobre mim</p>
          <h1 className="mt-1 text-3xl sm:text-4xl">Quem sou eu?</h1>
          <p className="mt-3 max-w-xl text-mute">
            Tenho 18 anos e estudo Engenharia de Software. Procuro oportunidades em automação e
            dados, onde posso unir código e análise.
          </p>
        </div>
      </div>

      <h2 className="mt-10 mb-5 text-2xl sm:text-3xl">Habilidades</h2>
      <SkillsSection />

      <h2 className="mt-10 mb-5 text-2xl sm:text-3xl">Formação e certificados</h2>
      <Timeline items={timeline} />
    </section>
  )
}
