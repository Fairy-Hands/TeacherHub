# Teacher Hub

MVP SaaS para professores particulares de inglês.

## Stack

- Next.js
- React
- TypeScript
- TailwindCSS
- Prisma
- PostgreSQL
- NextAuth/Auth.js
- React Hook Form
- Zod
- TanStack Query

## Setup

1. Instale as dependências.
2. Copie `.env.example` para `.env`.
3. Configure `DATABASE_URL` e `DIRECT_URL`.
4. Rode `prisma generate` e `next dev`.

## Variáveis de ambiente

- `DATABASE_URL`: conexão pooled do Neon para a aplicação
- `DIRECT_URL`: conexão direta do Neon para Prisma
- `NEXTAUTH_URL`: URL base da aplicação
- `NEXTAUTH_SECRET`: segredo do Auth.js / NextAuth

## Vercel

Você já pode conectar no Vercel quando tiver:

1. o repositório no GitHub
2. `DATABASE_URL` e `DIRECT_URL` configurados no Neon
3. `NEXTAUTH_SECRET` definido
4. o projeto importado no Vercel com as env vars

Para o deploy, use as mesmas env vars no painel da Vercel e aponte `NEXTAUTH_URL` para a URL final do domínio.

## Escopo do MVP

- Dashboard
- Cadastro de alunos
- Agenda
- Diário de aula
- Financeiro
