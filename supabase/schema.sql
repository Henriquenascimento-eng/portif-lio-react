-- Rode no SQL Editor do Supabase. Pode ser rodado de novo: as regras antigas são apagadas e recriadas.
-- Os usuários de login são criados no painel (Authentication > Users), nunca por SQL.
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) between 20 and 1000),
  replied boolean not null default false,
  created_at timestamptz not null default now()
);
create table if not exists public.featured_repos (name text primary key);

alter table public.messages enable row level security;
alter table public.featured_repos enable row level security;

-- Quem pode usar o dashboard: o dono e a conta de gerente. Para dar ou tirar acesso, mude só esta lista.
create or replace function public.is_admin() returns boolean
language sql stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') in ('riquesoares2007@gmail.com', 'login@gmail.com')
$$;

drop policy if exists "visitante envia mensagem" on public.messages;
drop policy if exists "dono lê mensagens" on public.messages;
drop policy if exists "dono atualiza mensagens" on public.messages;
drop policy if exists "todos leem destaques" on public.featured_repos;
drop policy if exists "dono escreve destaques" on public.featured_repos;

-- Qualquer visitante pode enviar uma mensagem, mas só quem está na lista lê e atualiza.
create policy "visitante envia mensagem" on public.messages for insert to anon, authenticated with check (true);
create policy "dono lê mensagens" on public.messages for select to authenticated using (public.is_admin());
create policy "dono atualiza mensagens" on public.messages for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Destaques: todos leem, só quem está na lista escreve.
create policy "todos leem destaques" on public.featured_repos for select to anon, authenticated using (true);
create policy "dono escreve destaques" on public.featured_repos for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
