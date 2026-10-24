# Roteiro do vídeo (máximo 8 minutos)

Rosto e tela visíveis o tempo todo. Fale como numa entrevista: decisão, comparação, critério e o que você aceitou perder. As tabelas abaixo são um ponto de partida: pesquise cada alternativa, confirme e reescreva com as suas palavras.

## 0:00 a 0:30 Abertura

Quem você é, o que é o site e o que vai mostrar (stack, justificativas e o harness de IA).

## 0:30 a 3:30 Parte 1: stack e arquitetura

Mostre na tela a árvore de pastas e o diagrama abaixo.

```
Navegador
  Página (src/pages)
    chama Hook (useRepos, useAuth)  ->  Service (src/services)  ->  GitHub API / Supabase / EmailJS
    desenha Componentes (src/components), que só recebem dados por props
```

- **Critério para dividir componentes**: o que aparece em mais de um lugar vira componente de `ui/` (Button, Skeleton, ErrorState). Regra de ouro: componente não faz requisição; quem busca dado é hook e service.
- **Do código ao deploy**: branch `feature/...`, commit no padrão Conventional Commits (o commitlint recusa o que está fora do padrão), Husky roda lint e Prettier, push, pull request com o CI (lint, testes e build) verde, merge em `main` e a Vercel publica sozinha.
- Mostre uma rota protegida, o fluxo do formulário (validar, salvar no Supabase, avisar por e-mail) e a divisão em pacotes (`npm run build`).

## 3:30 a 5:30 Parte 2: justificativas da stack

| Escolha                      | Opções que comparei               | Critério                                                                     | O que aceitei perder                                           |
| ---------------------------- | --------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Vite + React                 | Next.js, Create React App         | Simples, build rápido, o enunciado pede React e deploy estático              | Sem renderização no servidor (SEO e primeira pintura piores)   |
| React Router                 | TanStack Router, wouter           | Mais documentação e exemplos; já tem rotas aninhadas                         | Menos segurança de tipos nas rotas que o TanStack Router       |
| TanStack Query               | SWR, `useEffect` + `useState`     | Cache e estados de carregamento prontos; evita requisição repetida ao GitHub | Mais uma dependência e um conceito novo para aprender          |
| Tailwind CSS                 | CSS Modules, MUI                  | Rápido de estilizar, tema com variáveis, identidade própria                  | HTML com muitas classes; menos componentes prontos que MUI     |
| React Hook Form + Zod        | Formik + Yup, validação manual    | Pouca re-renderização; esquema de validação reutilizável e testável          | Duas bibliotecas (aumentam o pacote da página de contato)      |
| Supabase                     | Firebase, backend próprio em Node | Login, banco SQL e regras de segurança prontos, plano gratuito               | Dependência de um serviço externo; regras RLS exigem cuidado   |
| EmailJS                      | Formspree, backend próprio        | Envia e-mail direto do front-end, sem servidor                               | A chave pública fica exposta; limite de envios no plano grátis |
| Zustand                      | Context, Redux Toolkit            | O estado global é só o tema; Zustand tem persistência pronta                 | Mais uma dependência para algo pequeno                         |
| three.js + React Three Fiber | Spline, só CSS                    | Controle total e cena leve feita em código                                   | Pacote grande (resolvido com carga sob demanda)                |
| Vitest + Testing Library     | Jest, Playwright                  | Mesma configuração do Vite; testa o comportamento do usuário                 | Não testa o navegador real (Playwright testaria)               |
| Vercel                       | Netlify, Hostinger                | Deploy automático por push e integração com GitHub                           | Plano gratuito tem limites; cola o projeto na plataforma       |
| TypeScript                   | JavaScript                        | Pega erros antes de rodar e documenta os dados do GitHub                     | Curva de aprendizado e mais código de tipos                    |

## 5:30 a 7:30 Parte 3: harness de IA

Mostre os arquivos versionados e justifique cada um.

- **Ferramenta e modelo**: diga a ferramenta e o modelo que você realmente usou e por quê. Este projeto foi gerado numa conversa no Claude (claude.ai). Para mostrar o harness funcionando, abra a pasta no Claude Code: ele lê o `CLAUDE.md`, o `.claude/settings.json`, o agente e a skill automaticamente.
- **`CLAUDE.md` (instruções do projeto)**: arquitetura, nomenclatura, commits, branches e segurança. É o que faz a IA seguir os padrões sem você repetir a cada pedido.
- **`.claude/settings.json`**: permissões (pode rodar lint, testes e build; não pode ler o `.env`).
- **`.claude/agents/reviewer.md`**: agente revisor, só leitura, que confere as regras do projeto antes do pull request.
- **`.claude/skills/conventional-commit/SKILL.md`**: skill que escreve commits e nomes de branch no padrão.
- **`.mcp.json` (conector)**: Supabase, para a IA consultar o banco e as tabelas. Diga o que você aceitou arriscar (dar acesso ao banco) e como limitou (projeto de desenvolvimento).
- **Como a IA seguiu os padrões**: mostre um commit rejeitado pelo commitlint, um erro de lint pego pelo Husky e o CI verde.
- **Como você conduziu a IA**: conte o que pediu, o que corrigiu e o que revisou. Escolha duas decisões da IA que você alterou ou questionou.

## 7:30 a 8:00 Fechamento

O que você aprendeu e o que melhoraria (por exemplo, SSR, testes end-to-end e um mundo 3D mais explorável).
