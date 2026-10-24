# Instruções do projeto para a IA

Portfólio em React + TypeScript (Vite). O dono é estudante e precisa conseguir explicar todo o código: prefira soluções simples e explique decisões em poucas frases.

## Comandos

- `npm run dev`, `npm run build`, `npm test`, `npm run lint`, `npm run format`
- Antes de dizer que terminou: rode `npm run lint`, `npm test` e `npm run build`.

## Arquitetura

- `src/pages`: uma página por rota. `src/components`: peças reutilizáveis e sem requisições.
- Chamadas à API (GitHub, Supabase, EmailJS) ficam em `src/services`, nunca dentro de componentes.
- Estado de servidor com TanStack Query em hooks (`src/hooks`). Estado global só para o tema (`src/store`).
- Funções puras em `src/lib`. Tipos em `src/types`.
- Reaproveite `Button`, `ButtonLink`, `Skeleton`, `ErrorState` e `EmptyState`. Todo dado vindo de API precisa dos estados de carregamento, erro e vazio.
- Peso: dashboard, cena 3D e SDK do Supabase ficam em `import()` dinâmico. Não importe `three` nem `@supabase/supabase-js` no pacote inicial.

## Nomenclatura

- Componentes e páginas em PascalCase, um por arquivo. Hooks começam com `use`. Funções e variáveis em camelCase.
- Testes ao lado do arquivo, com sufixo `.test.ts` ou `.test.tsx`.
- Textos da interface em português do Brasil, com acentos.

## Commits e branches

- Conventional Commits em português: `feat: adiciona validação do formulário de contato`. Tipos: feat, fix, docs, style, refactor, test, chore, ci, perf.
- GitHub Flow: nunca commitar direto em `main`. Uma branch por funcionalidade (`feature/dashboard`, `fix/...`) e pull request com o CI verde.
- Commits pequenos, um assunto por commit.

## Segurança

- Nunca ler nem commitar `.env`. Novas variáveis entram em `.env.example` e na tabela do README.
- Regras de acesso do banco ficam em `supabase/schema.sql`; o dashboard não pode depender só de esconder botões.
