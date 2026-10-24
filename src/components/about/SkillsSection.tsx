import { useState } from 'react'
import { SKILL_CATEGORIES, skills } from '@/data/skills'
import { cn } from '@/lib/cn'

const ALL = 'Todas'

/** Habilidades com abas por categoria e barras de nível (inspirado nos templates de referência). */
export function SkillsSection() {
  const [category, setCategory] = useState(ALL)
  const visible = skills.filter((skill) => category === ALL || skill.category === category)

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar habilidades">
        {[ALL, ...SKILL_CATEGORIES].map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={cn(
              'cursor-pointer rounded-full border px-4 py-1.5 text-sm font-semibold',
              category === item
                ? 'border-accent bg-accent/15 text-accent'
                : 'border-line bg-panel text-ink hover:border-accent',
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <ul key={category} className="grid gap-4 sm:grid-cols-2">
        {visible.map((skill) => (
          <li key={skill.name} className="card card-hover flex items-center gap-4 p-4">
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet to-pink font-display text-sm font-bold text-white"
            >
              {skill.short}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-baseline justify-between gap-2 font-semibold">
                <span className="truncate">{skill.name}</span>
                <span className="text-sm text-mute">{skill.level}%</span>
              </p>
              <div
                role="progressbar"
                aria-label={`Nível em ${skill.name}`}
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-2 h-2 overflow-hidden rounded-full bg-panel2"
              >
                <div
                  className="bar-fill h-full rounded-full bg-gradient-to-r from-accent to-violet"
                  style={{ '--w': `${skill.level}%` } as React.CSSProperties}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
