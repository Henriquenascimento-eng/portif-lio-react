type Item = { period: string; title: string; detail: string }

/** Linha do tempo vertical (inspirada na seção de formação do site de referência). */
export function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative ml-3 border-l border-line">
      {items.map((item) => (
        <li key={item.title} className="relative mb-6 pl-8 last:mb-0">
          <span
            aria-hidden="true"
            className="absolute -left-[9px] top-3 size-4 rounded-full bg-gradient-to-br from-accent to-violet ring-4 ring-bg"
          />
          <div className="card p-5">
            <p className="text-sm font-semibold text-accent">{item.period}</p>
            <h3 className="mt-1 text-xl">{item.title}</h3>
            <p className="mt-1 text-mute">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
