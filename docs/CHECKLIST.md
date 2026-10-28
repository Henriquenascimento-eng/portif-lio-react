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
| 9. Testes         | 7 arquivos `.test.ts(x)`, 25 testes (formulário, dashboard sem login, GitHub, estados da lista, tema, cena 3D)           |
| 10. Deploy        | `vercel.json` e `.github/workflows/ci.yml` (a Vercel publica a cada push em `main` depois de conectar o repositório)     |
| 11. Versionamento | Padrão no `README.md` e no `CLAUDE.md`; `commitlint` + Husky em `.husky/`                                                |
| 12. Arquitetura   | Pastas descritas no README; ESLint, Prettier e `lint-staged`                                                             |

## O que só você pode fazer

1. **Pull requests**: abrir e mesclar no GitHub os PRs das branches da vistoria de 28/10 (veja `docs/CONDUCAO-DA-IA.md`), esperando o CI ficar verde.
2. **Supabase**: criar o projeto, rodar `supabase/schema.sql` no SQL Editor, criar o usuário do dono (Authentication > Users) e desligar o cadastro aberto.
3. **EmailJS**: criar o serviço de e-mail e um template com `from_name`, `reply_to` e `message`.
4. **Vercel**: cadastrar as 6 variáveis do `.env.example` em Settings > Environment Variables e fazer **Redeploy** (o Vite embute as variáveis no build).
5. **Teste real em produção**: enviar uma mensagem pelo site, ver o e-mail chegar, entrar em `/admin`, marcar como respondida e escolher os destaques.
6. **Descrições no GitHub**: preencher o "About" (descrição) de cada repositório; o site mostra "Projeto sem descrição" quando está vazio.
7. **Habilidades**: conferir os níveis em `src/data/skills.ts`.
8. **Lighthouse do site publicado**: rodar o PageSpeed Insights depois dos merges e guardar a captura para o vídeo.
9. **Vídeo**: seguir o `docs/ROTEIRO-VIDEO.md` e o `docs/GUIA-DE-ESTUDO.md`, com rosto e tela visíveis, até 8 minutos, não listado no YouTube.
10. **Entrega no Teams até 03/11**: link do GitHub, link da Vercel e link do vídeo.

## Atenção: TypeScript

O projeto está escrito em TypeScript, que você disse não conhecer. No vídeo você terá de explicar o código, então estude o básico (tipos, `type`, props tipadas) ou peça a conversão do projeto para JavaScript.

## Antes de gravar, confira que você sabe explicar

- Por que a lista de projetos não faz nova requisição ao navegar (cache do TanStack Query).
- Como o `ProtectedRoute` decide entre carregando, login e conteúdo.
- Por que a segurança do dashboard está nas regras do banco (`schema.sql`) e não só no front-end.
- Como o tema evita o "flash" no carregamento.
- Por que a cena 3D só carrega depois e o que acontece com "reduzir movimento".
