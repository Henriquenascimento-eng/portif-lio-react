# Checklist do CP3

## O que o código já cobre

| Requisito         | Onde está                                                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 1. Rotas          | `src/App.tsx`, `src/pages/NotFound.tsx`, `vercel.json`; falha da API em `ProjectGrid` e `ProjectDetail`; `ErrorBoundary` |
| 2. Carregamento   | `Skeleton`, `Spinner`, `ErrorState`, `EmptyState`; botão com `loading` no `ContactForm`                                  |
| 3. GitHub         | `src/services/github.ts` (inclui limite de requisições), `useRepos`, `ProjectCard`                                       |
| 4. Contato        | `ContactForm` (React Hook Form + Zod), `services/messages.ts` (salva no Supabase) e `services/email.ts` (EmailJS)        |
| 5. Dashboard      | `pages/Admin.tsx`, `auth/ProtectedRoute.tsx`, `supabase/schema.sql` (só o dono lê as mensagens)                          |
| 6. Tema           | `store/theme.ts` (Zustand + localStorage) e o script no `index.html` que evita o flash                                   |
| 7. Interface      | Tailwind, componentes `ui/`, cena 3D reativa a mouse e rolagem                                                           |
| 8. Performance    | Páginas e cena 3D com `lazy`, TanStack Query com cache, fontes locais, `width`/`height` e `loading="lazy"` na imagem     |
| 9. Testes         | `ContactForm.test.tsx`, `ProtectedRoute.test.tsx`, `github.test.ts`                                                      |
| 10. Deploy        | `vercel.json` e `.github/workflows/ci.yml` (a Vercel publica a cada push em `main` depois de conectar o repositório)     |
| 11. Versionamento | Padrão no `README.md` e no `CLAUDE.md`; `commitlint` + Husky em `.husky/`                                                |
| 12. Arquitetura   | Pastas descritas no README; ESLint, Prettier e `lint-staged`                                                             |

## O que só você pode fazer

1. **Repositório no GitHub**: crie um repositório público, rode `git init` na pasta, `npm install` (isso ativa o Husky) e faça o primeiro push. Nunca suba o `.env`.
2. **Histórico de commits**: faça commits reais à medida que revisar cada parte (uma branch por assunto, como `feature/rotas`, `feature/github-api`, `feature/contato`, `feature/dashboard`, `feature/tema-e-3d`, `chore/testes-e-ci`), abra pull requests e faça o merge. Não altere as datas dos commits.
3. **Supabase**: crie o projeto, rode `supabase/schema.sql`, crie o usuário do dono e copie URL e chave `anon` para o `.env`.
4. **EmailJS** (aviso por e-mail): crie um serviço de e-mail e um template que use `from_name`, `reply_to` e `message`; copie os 3 códigos para o `.env`.
5. **Vercel**: importe o repositório, cadastre as mesmas variáveis do `.env` e publique. Cada push em `main` publica de novo.
6. **Lighthouse**: depois do deploy, rode em modo mobile no site publicado (meta: 80 ou mais em performance). Se ficar abaixo, veja a aba "Opportunities" e me mande o relatório para ajustar.
7. **Teste em celular e desktop**: abra o site publicado no seu celular e anote o que quebrar.
8. **Vídeo**: siga o `docs/ROTEIRO-VIDEO.md`, com rosto e tela visíveis, no máximo 8 minutos, não listado no YouTube.
9. **Entrega no Teams até 03/11**: link do GitHub, link da Vercel e link do vídeo.

## Atenção: TypeScript

O projeto está escrito em TypeScript, que você disse não conhecer. No vídeo você terá de explicar o código, então estude o básico (tipos, `type`, props tipadas) ou peça a conversão do projeto para JavaScript.

## Antes de gravar, confira que você sabe explicar

- Por que a lista de projetos não faz nova requisição ao navegar (cache do TanStack Query).
- Como o `ProtectedRoute` decide entre carregando, login e conteúdo.
- Por que a segurança do dashboard está nas regras do banco (`schema.sql`) e não só no front-end.
- Como o tema evita o "flash" no carregamento.
- Por que a cena 3D só carrega depois e o que acontece com "reduzir movimento".
