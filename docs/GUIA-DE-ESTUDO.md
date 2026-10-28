# Guia de estudo do código

Este guia explica, em linguagem simples, o que cada pasta e cada arquivo importante faz. Leia na ordem: primeiro a ideia geral, depois as pastas, por fim as perguntas de entrevista.

## A ideia geral em 4 frases

1. Cada **página** (`src/pages`) é uma rota do site.
2. A página pede dados a um **hook** (`src/hooks`), que usa o TanStack Query para guardar o resultado em cache.
3. O hook chama um **service** (`src/services`), que é quem conversa com o GitHub, o Supabase ou o EmailJS.
4. A página entrega os dados prontos para os **componentes** (`src/components`), que só desenham na tela.

```
Página  ->  Hook (TanStack Query)  ->  Service  ->  GitHub / Supabase / EmailJS
   |
   +-> Componentes (só recebem dados por props)
```

## TypeScript em 1 minuto

- `type Repo = { name: string; language: string | null }` descreve o formato de um objeto. `string | null` quer dizer "texto ou vazio".
- `function ProjectCard({ repo }: { repo: Repo })` diz que o componente recebe uma prop `repo` no formato `Repo`. Se você passar outra coisa, o editor avisa antes de rodar.
- `Promise<Repo[]>` é "uma resposta que chega depois, com uma lista de `Repo`".
- `as const`, `keyof typeof` (em `Icon.tsx`) servem para o TypeScript saber exatamente quais nomes de ícone existem.
- O `npm run build` roda `tsc --noEmit` primeiro: se houver erro de tipo, o deploy não acontece.

## Pastas e arquivos

### Raiz do projeto

| Arquivo                    | Para que serve                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `index.html`               | Página base. Tem o script que aplica o tema escuro **antes** do React carregar (evita o flash). |
| `vite.config.ts`           | Configura o Vite (React, Tailwind, atalho `@/` para `src/`) e o Vitest (testes com jsdom).      |
| `vercel.json`              | Manda qualquer endereço para o `index.html` (F5 em `/projetos/x` funciona) e define cache.      |
| `.env.example`             | Lista das variáveis necessárias, sem valores. O `.env` real nunca vai para o GitHub.            |
| `.gitattributes`           | Força quebra de linha LF, para o Prettier não reclamar no Windows.                              |
| `eslint.config.js`         | Regras de qualidade do código (ESLint).                                                         |
| `.prettierrc`              | Regras de formatação: sem ponto e vírgula, aspas simples, linha de até 100 caracteres.          |
| `commitlint.config.js`     | Faz o commit ser recusado se a mensagem não seguir Conventional Commits.                        |
| `.husky/`                  | Hooks do Git: `pre-commit` roda lint e Prettier; `commit-msg` roda o commitlint.                |
| `.github/workflows/ci.yml` | CI no GitHub Actions: instala, lint, formatação, testes e build a cada push e pull request.     |
| `supabase/schema.sql`      | Tabelas e regras de segurança (RLS) do banco. É aqui que o dashboard fica protegido de verdade. |
| `CLAUDE.md` e `.claude/`   | Instruções e ferramentas da IA (veja "Harness de IA" no README).                                |

### `src/main.tsx` e `src/App.tsx`

- `main.tsx` liga tudo: cria o `QueryClient` (cache de 10 minutos), o roteador (`BrowserRouter`) e carrega as fontes e o CSS.
- `App.tsx` declara as rotas. A home é importada normalmente; as outras páginas usam `lazy(() => import(...))`, então só são baixadas quando alguém abre a rota. `/login` e `/admin` ficam dentro de `AuthRoutes`, o único lugar que carrega o Supabase para o login.

### `src/pages` (uma página por rota)

| Arquivo             | Rota              | O que faz                                                                            |
| ------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| `Home.tsx`          | `/`               | Apresentação, cena 3D e projetos em destaque (escolhidos no dashboard ou 3 últimos). |
| `Projects.tsx`      | `/projetos`       | Lista do GitHub com filtro por linguagem.                                            |
| `ProjectDetail.tsx` | `/projetos/:name` | Página de um projeto. Usa o mesmo cache da lista (não chama o GitHub de novo).       |
| `About.tsx`         | `/sobre`          | Foto, habilidades e formação.                                                        |
| `Contact.tsx`       | `/contato`        | Formulário; envia pela função do hook `useSendMessage`.                              |
| `Login.tsx`         | `/login`          | Login do dono pelo Supabase.                                                         |
| `Admin.tsx`         | `/admin`          | Dashboard: mensagens com "marcar como respondida" e escolha dos destaques.           |
| `NotFound.tsx`      | `*`               | Página 404 amigável (também usada para "projeto não encontrado").                    |

### `src/hooks` (dados ligados ao React)

- `useRepos`: busca os repositórios. A chave `['repos']` é a mesma em todas as páginas, então o GitHub é chamado uma vez só.
- `useFeaturedNames` e `useToggleFeatured`: lê e altera os destaques.
- `useMessages` e `useSetMessageReplied`: lista as mensagens e marca como respondida. Depois de alterar, `invalidateQueries` manda recarregar a lista.
- `useSendMessage`: envia o formulário de contato.
- `useAuth`: lê o usuário logado do contexto. `useDocumentTitle`: troca o título da aba.

### `src/services` (conversa com o mundo de fora, sem JSX)

- `github.ts`: chama a API do GitHub, descarta forks e o repositório de perfil, e lança `GithubRateLimitError` quando a resposta é 403 ou 429 (limite de 60 consultas por hora sem login).
- `messages.ts`: salva a mensagem no Supabase e depois tenta avisar por e-mail. Se o e-mail falhar, a mensagem continua salva.
- `email.ts`: envia o e-mail pelo EmailJS (o SDK só é baixado na hora de enviar).
- `featured.ts`: lê e grava os projetos em destaque.

### `src/components` (só desenham)

- `ui/`: peças reaproveitadas em todo o site: `Button` (com `loading`, que bloqueia o clique), `ButtonLink`, `Skeleton`, `Spinner`, `ErrorState`, `EmptyState`, `PageLoading`, `Icon`.
- `projects/ProjectGrid.tsx`: decide entre carregando, erro, vazio e lista. `ProjectCard.tsx`: um card.
- `contact/ContactForm.tsx`: React Hook Form + Zod. Mostra o erro de cada campo e bloqueia o botão durante o envio.
- `layout/`: barra lateral (desktop), abas embaixo (celular) e botão de tema.
- `scene/`: `HeroScene` decide quando carregar a cena 3D; `Scene3D` é a cena em React Three Fiber; `StaticCar` é o carro em SVG mostrado antes.
- `ErrorBoundary.tsx`: se algo quebrar ao desenhar, mostra uma página amigável em vez de tela branca.

### `src/auth`

- `AuthProvider.tsx`: carrega o Supabase, descobre se há sessão e avisa quando ela muda.
- `ProtectedRoute.tsx`: enquanto carrega, mostra "Carregando"; sem usuário, redireciona para `/login`; com usuário, mostra o dashboard.

### `src/lib`, `src/store`, `src/types`, `src/data`

- `lib/contactSchema.ts`: regras do formulário (nome com 2+ letras, e-mail válido, mensagem entre 20 e 1000 caracteres).
- `lib/supabase.ts`: cria o cliente do Supabase só quando alguém precisa (import dinâmico).
- `lib/env.ts`, `lib/format.ts`, `lib/cn.ts`, `lib/buttonClass.ts`: funções puras pequenas.
- `store/theme.ts`: tema com Zustand + `persist` (salva no `localStorage` com a chave `theme`). `store/layout.ts`: barra lateral recolhida ou não.
- `types/index.ts`: formatos `Repo` e `StoredMessage`. `data/skills.ts`: suas habilidades (edite os níveis).

## 15 perguntas prováveis de entrevista

1. **Por que a lista de projetos não chama o GitHub de novo ao trocar de página?**
   Porque todas as páginas usam `useRepos` com a mesma chave `['repos']`, e o TanStack Query guarda o resultado por 10 minutos (`staleTime`).

2. **O que acontece quando o GitHub bloqueia por limite?**
   O service lança `GithubRateLimitError` (status 403 ou 429) e o `ProjectGrid` mostra "O GitHub pediu uma pausa", com botão "Tentar de novo".

3. **Como o dashboard fica protegido?**
   Em duas camadas: o `ProtectedRoute` redireciona quem não está logado, e as regras RLS do `schema.sql` só deixam o e-mail do dono ler as mensagens. Esconder a tela sozinho não basta.

4. **Por que a chave do Supabase pode ficar no front-end?**
   É a chave pública (`anon`). Ela só faz o que as regras RLS permitem: inserir mensagem e ler destaques.

5. **Como o formulário valida cada campo?**
   O esquema Zod define as regras e mensagens; o `zodResolver` liga o esquema ao React Hook Form, que mostra o erro embaixo do campo.

6. **Como você evita mensagens duplicadas?**
   O botão recebe `loading={isSubmitting}`, e o `Button` fica `disabled` enquanto envia. Há um teste para isso.

7. **Para onde vai a mensagem?**
   Primeiro é salva no Supabase (aparece no dashboard). Depois o EmailJS envia uma cópia para o meu e-mail.

8. **Como o tema continua igual quando a pessoa volta?**
   O Zustand com `persist` salva no `localStorage`. Um script no `index.html` lê esse valor antes do React carregar, para não piscar.

9. **Por que F5 em `/projetos/nome` não dá erro 404 na Vercel?**
   O `vercel.json` reescreve todo endereço para o `index.html`, e o React Router decide a página no navegador.

10. **Como a cena 3D não atrapalha a performance?**
    Ela é um pacote separado (`lazy`), baixado só quando a área aparece e a pessoa interage. Com "reduzir movimento" ou economia de dados, nunca carrega.

11. **Como você evitou saltos de layout (CLS)?**
    Skeletons com a mesma altura dos cards, imagem com `width` e `height`, fontes locais e área fixa para a cena 3D. O CLS medido foi 0,004.

12. **Qual o critério para criar um componente?**
    Se aparece em mais de um lugar, vira componente em `ui/`. Componente não faz requisição: quem busca dados é hook e service.

13. **O que roda antes de cada commit e a cada push?**
    Antes do commit: ESLint e Prettier (Husky + lint-staged) e o commitlint na mensagem. A cada push e pull request: o CI roda lint, formatação, testes e build. Depois do merge na `main`, a Vercel publica.

14. **O que os testes cobrem?**
    Validação do formulário, bloqueio do dashboard sem login, serviço do GitHub (limite e erros), estados de carregamento, erro e vazio, tema salvo e regras da cena 3D. São 25 testes.

15. **O que você faria diferente?**
    Testes de ponta a ponta com Playwright no CI, renderização no servidor para SEO e uma função no servidor para o e-mail, sem expor a chave do EmailJS.
