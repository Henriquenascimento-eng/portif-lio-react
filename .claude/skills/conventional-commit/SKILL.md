---
name: conventional-commit
description: Escreve mensagens de commit no padrão Conventional Commits em português e sugere o nome da branch. Use quando for commitar ou abrir pull request.
---

# Commits deste projeto

1. Rode `git status` e `git diff --staged` para entender a mudança.
2. Escolha o tipo: feat, fix, docs, style, refactor, test, chore, ci ou perf.
3. Escreva `tipo(escopo opcional): descrição` no imperativo, em português, com até 72 caracteres.
4. Se a mudança mistura assuntos, proponha separar em mais de um commit.
5. Branch: `feature/nome-curto` ou `fix/nome-curto`, nunca commit direto em `main`.

Exemplos: `feat: adiciona validação do formulário de contato`, `fix(admin): bloqueia acesso sem login`.
