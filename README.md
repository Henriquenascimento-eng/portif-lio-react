# Portfólio de Henrique Nascimento

Site de portfólio em React que lista meus projetos direto da API do GitHub, recebe mensagens por um formulário de contato e tem um dashboard protegido por login. Feito para o CP3 (Stack e Harness Engineering) da FIAP.

- Site publicado: _coloque aqui o link da Vercel_
- Repositório: _coloque aqui o link do GitHub_

## Tecnologias

| Área              | Escolha                                           |
| ----------------- | ------------------------------------------------- |
| Build e linguagem | Vite, React 19 e TypeScript                       |
| Rotas             | React Router                                      |
| Dados da API      | TanStack Query (cache e estados de carga)         |
| Estilo            | Tailwind CSS v4 com variáveis de tema             |
| Formulário        | React Hook Form e Zod                             |
| Backend           | Supabase (login, mensagens e destaques)           |
| E-mail            | EmailJS                                           |
| Tema              | Zustand com `localStorage`                        |
| 3D                | three.js e React Three Fiber (carga sob demanda)  |
| Testes            | Vitest e Testing Library                          |
| Qualidade         | ESLint, Prettier, Husky, lint-staged e commitlint |
| Deploy            | Vercel (deploy a cada push em `main`)             |

## Como rodar

```bash
git clone <url-do-repositorio>
cd portfolio-henrique
npm install
cp .env.example .env   # preencha as variáveis (veja abaixo)
npm run dev
```

### Variáveis de ambiente (`.env`)

O site funciona sem elas (a lista de projetos só precisa do GitHub), mas o formulário, o login e os destaques precisam do Supabase.

| Variável                   | Para quê                                                     |
| -------------------------- | ------------------------------------------------------------ |
| `VITE_GITHUB_USER`         | Usuário do GitHub cujos repositórios são exibidos            |
| `VITE_SUPABASE_URL`        | URL do projeto Supabase                                      |
| `VITE_SUPABASE_ANON_KEY`   | Chave pública (anon) do Supabase                             |
| `VITE_EMAILJS_SERVICE_ID`  | Serviço do EmailJS (aviso por e-mail, opcional)              |
| `VITE_EMAILJS_TEMPLATE_ID` | Template do EmailJS, com `from_name`, `reply_to` e `message` |
| `VITE_EMAILJS_PUBLIC_KEY`  | Chave pública do EmailJS                                     |

### Configurar o Supabase

1. Crie um projeto em supabase.com e copie a URL e a chave `anon` em Settings > API.
2. No SQL Editor, rode o arquivo `supabase/schema.sql` (tabelas, regras de segurança por linha).
3. Em Authentication > Users, crie o usuário do dono com o e-mail `riquesoares2007@gmail.com` e desligue o cadastro aberto (Sign In / Providers > Allow new users to sign up).

## Scripts

| Comando           | O que faz                               |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento             |
| `npm run build`   | Checa os tipos e gera `dist/`           |
| `npm run preview` | Serve o build local (para o Lighthouse) |
| `npm test`        | Roda os testes                          |
| `npm run lint`    | ESLint                                  |
| `npm run format`  | Prettier                                |

## Estrutura de pastas

```
src/
  components/    peças reutilizáveis
    ui/          Button, ButtonLink, Skeleton, Spinner, ErrorState, EmptyState
    layout/      Layout, Sidebar, MobileNav, ThemeToggle
    about/       SkillsSection, Timeline
    projects/    ProjectCard, ProjectGrid
    contact/     ContactForm
    scene/       HeroScene (carga sob demanda), Scene3D, StaticCar
  pages/         uma página por rota (Home, Projects, ProjectDetail, About, Contact, Login, Admin, NotFound)
  auth/          contexto de login, rota protegida
  data/          conteúdo editável (skills.ts: habilidades e níveis)
  hooks/         lógica de dados e estado ligada ao React (useRepos, useAuth...)
  services/      chamadas externas (GitHub, Supabase, EmailJS), sem JSX
  store/         estado global do tema (Zustand)
  lib/           funções puras (validação, formatação, variáveis de ambiente)
  types/         tipos compartilhados
```

Fluxo dos dados: `página` chama um `hook` (TanStack Query) que chama um `service`; o resultado volta para a página e vai para componentes de apresentação. Componentes visuais não fazem requisições.

## Design

- **Cores**: fundo azul-marinho escuro com brilhos violeta e verde-água, e botões em gradiente violeta e rosa, inspiradas em abusaid.netlify.app. O tema claro usa as mesmas famílias de cor com contraste ajustado.
- **Sistema de design**: barra lateral fixa que pode ser recolhida, página que "vira" a cada troca de rota e, no celular, abas fixas embaixo, inspirado no template de Ryan Balieiro. Tokens de cor em `src/index.css` e classes reutilizáveis (`card`, `btn`, `chip`, `field`).
- **Habilidades**: abas por categoria e barras de nível, inspiradas em dev-portfolio-template.netlify.app e no template de Ryan Balieiro. Para editar, mude `src/data/skills.ts`. Os níveis são estimativas: ajuste para o seu nível real.
- **Fontes**: Space Grotesk (títulos) e Inter (texto), instaladas localmente.

## Rotas

`/` início, `/projetos`, `/projetos/:name`, `/sobre`, `/contato`, `/login`, `/admin` (protegida) e `*` (404). O arquivo `vercel.json` redireciona qualquer endereço para `index.html`, então links compartilhados funcionam, inclusive ao atualizar a página.

## Padrões do projeto

### Nomenclatura

- Componentes e páginas: `PascalCase` (`ProjectCard.tsx`), um componente principal por arquivo.
- Hooks: começam com `use` e ficam em `src/hooks` (`useRepos.ts`).
- Funções, variáveis e arquivos de `lib` e `services`: `camelCase`.
- Tipos: `PascalCase`. Constantes globais: `UPPER_SNAKE_CASE` só quando forem realmente fixas.
- Testes ao lado do arquivo testado: `Nome.test.tsx`.

### Commits (Conventional Commits)

Formato: `tipo(escopo opcional): descrição no imperativo, em português`.

Tipos usados: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`.

```
feat: adiciona validação do formulário de contato
fix(admin): corrige o redirecionamento sem login
```

O `commitlint` recusa mensagens fora do padrão (hook `commit-msg` do Husky).

### Branches (GitHub Flow)

- `main` está sempre pronta para publicar e cada push dispara o deploy.
- Cada funcionalidade nasce em uma branch própria a partir de `main`: `feature/rotas`, `feature/github-api`, `feature/contato`, `feature/dashboard`, `fix/...`, `chore/...`.
- A branch volta para `main` por pull request, com o CI (lint, formatação, testes e build) passando.

### Qualidade automática

Antes de cada commit, o Husky roda o `lint-staged` (ESLint e Prettier nos arquivos alterados). O GitHub Actions (`.github/workflows/ci.yml`) repete lint, formatação, testes e build a cada push e pull request.

## Testes

- Validação do formulário de contato (campos vazios, e-mail inválido, mensagem curta, botão bloqueado durante o envio, erro de envio).
- Bloqueio do dashboard sem login (redireciona para `/login`, não mostra o conteúdo enquanto carrega e libera quando há sessão).
- Serviço do GitHub (descarte de forks, limite de requisições, erros).

## Performance

- Páginas divididas por rota (`React.lazy`): o visitante da home não baixa o formulário nem o dashboard.
- A cena 3D (three.js) é um pacote separado, baixado só depois que a área aparece na tela, e é ignorada com "reduzir movimento" ou economia de dados.
- O SDK do Supabase também é carregado sob demanda.
- Uma única consulta ao GitHub é compartilhada por todas as páginas (TanStack Query, `staleTime` de 10 minutos).
- Fontes locais (`@fontsource`), skeletons com altura fixa e imagem com `width`, `height` e `loading="lazy"`, para evitar saltos de layout.

Para medir: `npm run build && npm run preview`, abrir no Chrome em janela anônima e rodar o Lighthouse em modo mobile. Também vale conferir no PageSpeed Insights depois do deploy.

## Harness de IA

Os arquivos que orientam a IA estão versionados no repositório: `CLAUDE.md` (instruções do projeto), `.claude/settings.json` (permissões), `.claude/agents/reviewer.md` (agente revisor) e `.claude/skills/conventional-commit/SKILL.md` (skill de commits). Os mesmos padrões deste README estão repetidos lá para a IA segui-los.
