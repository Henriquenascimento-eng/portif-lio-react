# Condução da IA: vistoria de 28/10/2026

Registro do que pedi à IA, do que ela encontrou e do que foi corrigido nesta vistoria. Só fatos que aconteceram; os espaços "Minhas observações" são para eu completar.

## Ferramenta e modelo

- Ferramenta: Claude Code, extensão do VS Code, no Windows 11.
- Modelo: Claude Opus 5.5 (`claude-opus-5-5`).
- Harness usado: `CLAUDE.md` (lido no início), agente `reviewer` (`.claude/agents/reviewer.md`, rodado sobre todas as mudanças antes dos pull requests), regras de commit da skill `conventional-commit`, hooks do Husky e commitlint.

## O que eu pedi

Uma vistoria completa contra os 12 requisitos do CP3: status com evidência de cada requisito, rodar lint, formatação, testes e build, testar o site num navegador de verdade, medir o Lighthouse mobile, conferir Supabase e EmailJS em produção, reforçar testes, corrigir o README e criar este registro e o guia de estudo. Regras: uma branch por assunto, Conventional Commits em português, sem commitar na `main`, sem mexer no `.env` e sem reescrever o histórico.

## O que a IA encontrou

| Problema                                                                                                      | Como foi encontrado                                                              |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `npm run format:check` falhava em 77 arquivos no Windows (quebra de linha CRLF)                               | Saída do comando; `git ls-files --eol` mostrou `i/lf w/crlf`                     |
| O site publicado não tem as variáveis do Supabase nem do EmailJS: formulário, login e destaques não funcionam | O JS publicado tem o mesmo hash do build local sem `.env` e nenhum `supabase.co` |
| Lighthouse: contraste insuficiente do violeta no tema escuro (4,19:1, mínimo 4,5:1)                           | Relatório do Lighthouse, auditoria `color-contrast`                              |
| Lighthouse: `robots.txt` inexistente (a Vercel devolvia o HTML no lugar)                                      | Auditoria `robots-txt` (31 erros)                                                |
| Cena 3D carregava dentro da janela de medição e gerava tarefa longa de 175 a 460 ms                           | Auditoria `long-tasks` comparando duas medições                                  |
| Ordem dos títulos errada em `/projetos` (h1 seguido de h3)                                                    | Auditoria `heading-order`                                                        |
| Limite do GitHub dependia de um cabeçalho que o navegador pode não conseguir ler                              | Teste no navegador com Playwright, bloqueando a API                              |
| Repositório especial de perfil aparecia como projeto em destaque                                              | Captura de tela da home                                                          |
| Bloco de código da home passava da margem no celular; cartão "Sobre" espremido em 375 px                      | Capturas de tela em 375 px                                                       |
| `Admin.tsx` e `ContactForm.tsx` chamavam dados fora de `src/hooks`, contra o `CLAUDE.md`                      | Leitura do código                                                                |
| Avatar vindo do servidor do GitHub                                                                            | Leitura do código (`About.tsx`)                                                  |
| README com placeholders e `cd portfolio-henrique`                                                             | Leitura do README                                                                |

Verificado e funcionando sem mudança: rotas, 404, F5 em link compartilhado (local e produção), redirecionamento de `/admin` para `/login`, skeleton com rede lenta, estado de erro e vazio, nenhuma requisição repetida ao GitHub em 5 navegações, tema salvo depois de recarregar, sem rolagem horizontal em 375 px.

## O que foi corrigido (branches e commits)

| Branch                    | Commits                                                                                                                                                                                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chore/fim-de-linha`      | `chore: força quebra de linha LF com .gitattributes`                                                                                                                                                                                                                                                                          |
| `fix/github-api`          | `fix(github): trata qualquer 403 ou 429 como limite de requisições`; `fix(github): esconde o repositório especial do perfil da lista`                                                                                                                                                                                         |
| `perf/imagens`            | `perf(sobre): troca o avatar do GitHub por um WebP local de 240px`; `perf: guarda em cache por 1 ano os arquivos com hash de /assets`                                                                                                                                                                                         |
| `fix/acessibilidade-seo`  | `fix(tema): clareia o violeta do tema escuro…`; `feat(seo): adiciona robots.txt…`; `feat(seo): adiciona metadados Open Graph…`; `style(sobre): coloca o texto abaixo da foto no celular`; `fix(projetos): corrige a ordem dos títulos…`; `style(home): impede o bloco de código…`; `fix(seo): usa cor da barra do navegador…` |
| `refactor/hooks-de-dados` | `refactor(admin): move consultas e mutações do dashboard para hooks`; `refactor(contato): envia a mensagem pelo hook useSendMessage na página`                                                                                                                                                                                |
| `test/cobertura`          | `test(projetos): cobre carregamento, erro da API, limite e lista vazia`; `test(tema): …salvo entre visitas`; `test(contato): cobre o esquema de validação…`; `test(contato): deixa mais claro o nome do teste…`                                                                                                               |
| `perf/cena-3d`            | `perf(home): carrega a cena 3D só depois da primeira interação`; `test(home): garante que o 3D espera interação…`                                                                                                                                                                                                             |
| `fix/readme`              | `docs(readme): troca placeholders por links reais e corrige o passo a passo`                                                                                                                                                                                                                                                  |
| `docs/guia-de-estudo`     | este arquivo, o guia de estudo, o checklist, o `CLAUDE.md` e as permissões do harness                                                                                                                                                                                                                                         |

Resultado medido antes do merge (todas as branches juntas, preview local, Lighthouse mobile): home de 96/95/100/91 para 97/100/100/100 (performance, acessibilidade, boas práticas, SEO). Testes: de 10 para 25.

## Decisões da IA que eu posso questionar no vídeo

1. **Cena 3D só depois de interação.** A IA trocou "carregar 1,5 s depois de aparecer" por "carregar quando a pessoa mexe o mouse, toca, rola ou digita". Ganho: a primeira carga fica leve. Perda: quem só olha a página sem interagir vê o carro em SVG, não o 3D.
2. **Qualquer 403 do GitHub conta como limite.** Mais simples e não depende de cabeçalho, mas um 403 por outro motivo também mostraria "O GitHub pediu uma pausa".
3. **Só WebP, sem AVIF.** O AVIF ficou só 8% menor (8,1 KB contra 8,9 KB); a IA preferiu um formato só, sem `<picture>`.
4. **Otimização não feita.** A IA considerou ler os destaques da home sem o SDK do Supabase (REST puro), mas não fez porque não havia projeto Supabase para testar.

## Onde a IA foi barrada ou precisou de mim

- O harness bloqueou um `git reset --hard` que a IA tentou usar para renormalizar as quebras de linha (comando destrutivo). Ela trocou por um caminho seguro: rodar o Prettier e conferir com `git diff` que só a quebra de linha mudava.
- O GitHub CLI (`gh`) não estava instalado. Eu escolhi abrir e mesclar os pull requests pelo site do GitHub; a IA criou as branches e fez o push.
- O conector MCP do Supabase (`.mcp.json`) precisa de autorização interativa, então a IA não conseguiu conferir o banco nem testar o fluxo real de mensagem, login e destaques.

## O que não foi verificado

- Envio real de e-mail pelo EmailJS e o fluxo real do dashboard (dependem das variáveis na Vercel e do usuário no Supabase).
- Se o `supabase/schema.sql` foi aplicado no banco.
- Lighthouse do site publicado depois dos merges.

## Minhas observações

- O que eu revisei pessoalmente:
- O que eu mudaria nas decisões acima:
- O que aprendi com esta vistoria:
