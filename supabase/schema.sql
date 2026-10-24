-- Rode no SQL Editor do Supabase. O dono é identificado pelo e-mail do login.
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

-- Qualquer visitante pode enviar uma mensagem, mas só o dono lê e atualiza.
create policy "visitante envia mensagem" on public.messages for insert to anon, authenticated with check (true);
create policy "dono lê mensagens" on public.messages for select to authenticated
  using ((auth.jwt() ->> 'email') = 'riquesoares2007@gmail.com');
create policy "dono atualiza mensagens" on public.messages for update to authenticated
  using ((auth.jwt() ->> 'email') = 'riquesoares2007@gmail.com');

-- Destaques: todos leem, só o dono escreve.
create policy "todos leem destaques" on public.featured_repos for select to anon, authenticated using (true);
create policy "dono escreve destaques" on public.featured_repos for all to authenticated
  using ((auth.jwt() ->> 'email') = 'riquesoares2007@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'riquesoares2007@gmail.com');
