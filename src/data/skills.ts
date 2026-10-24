export type Skill = { name: string; short: string; level: number; category: string }

export const SKILL_CATEGORIES = ['Linguagens', 'Dados', 'Banco de dados e APIs', 'Ferramentas']

// ATENÇÃO: os níveis (0 a 100) são estimativas iniciais. Ajuste para refletir o seu nível real.
export const skills: Skill[] = [
  { name: 'Python', short: 'Py', level: 80, category: 'Linguagens' },
  { name: 'SQL', short: 'SQL', level: 70, category: 'Linguagens' },
  { name: 'HTML', short: 'HT', level: 75, category: 'Linguagens' },
  { name: 'CSS', short: 'CS', level: 70, category: 'Linguagens' },
  { name: 'JavaScript', short: 'JS', level: 65, category: 'Linguagens' },
  { name: 'Java', short: 'Jv', level: 55, category: 'Linguagens' },
  { name: 'Pandas', short: 'Pd', level: 70, category: 'Dados' },
  { name: 'NumPy', short: 'Np', level: 65, category: 'Dados' },
  { name: 'Matplotlib', short: 'Mp', level: 60, category: 'Dados' },
  { name: 'Streamlit', short: 'St', level: 60, category: 'Dados' },
  { name: 'Power BI', short: 'BI', level: 50, category: 'Dados' },
  { name: 'Databricks', short: 'Db', level: 40, category: 'Dados' },
  { name: 'SQLite', short: 'SQ', level: 70, category: 'Banco de dados e APIs' },
  { name: 'APIs em Python', short: 'API', level: 70, category: 'Banco de dados e APIs' },
  { name: 'React', short: 'Re', level: 25, category: 'Ferramentas' },
  { name: 'Git e GitHub', short: 'Git', level: 70, category: 'Ferramentas' },
  { name: 'Azure DevOps', short: 'Az', level: 45, category: 'Ferramentas' },
  { name: 'Engenharia de prompt', short: 'Pr', level: 70, category: 'Ferramentas' },
  { name: 'IA generativa', short: 'IA', level: 65, category: 'Ferramentas' },
]
