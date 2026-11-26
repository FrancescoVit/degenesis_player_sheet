-- DEGENESIS character sheet: database schema for Supabase.
-- Run once in the dashboard: SQL Editor → paste → Run.
-- Contains no keys or secrets: it is safe to keep in the public repository.
--
-- Model
--   gruppi         a group of players playing together (a table, a campaign)
--   membri_gruppo  who belongs to which group, as 'giocatore' or 'master'
--   personaggi     one row per character; the whole sheet is in `dati` (JSON)
--
-- Access rules (Row Level Security, enforced by Supabase, not by the browser)
--   - a player reads, edits and deletes only their own characters;
--   - the master of a group reads and edits (does not delete) every character
--     of that group; a master can lead several groups;
--   - groups and memberships are managed only by the administrator from the
--     dashboard: nobody can join a group or become master from the site.
--   - no anonymous access at all.

-- ---------- Tables ----------

create table public.gruppi (
  id        uuid primary key default gen_random_uuid(),
  nome      text not null,
  creato_il timestamptz not null default now()
);

create table public.membri_gruppo (
  gruppo_id uuid not null references public.gruppi (id) on delete cascade,
  utente_id uuid not null references auth.users (id) on delete cascade,
  ruolo     text not null default 'giocatore' check (ruolo in ('giocatore', 'master')),
  primary key (gruppo_id, utente_id)
);
create index membri_gruppo_utente on public.membri_gruppo (utente_id);

create table public.personaggi (
  id            uuid primary key default gen_random_uuid(),
  proprietario  uuid not null default auth.uid() references auth.users (id) on delete cascade,
  gruppo_id     uuid references public.gruppi (id) on delete set null,
  nome          text not null default '',
  dati          jsonb not null default '{}'::jsonb,
  creato_il     timestamptz not null default now(),
  aggiornato_il timestamptz not null default now()
);
create index personaggi_proprietario on public.personaggi (proprietario);
create index personaggi_gruppo on public.personaggi (gruppo_id);

-- ---------- Helper checks ----------
-- SECURITY DEFINER so the policies can read membri_gruppo without
-- triggering its own policies (avoids recursion). They only answer
-- about the current user.

create function public.sono_membro(g uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.membri_gruppo m
    where m.gruppo_id = g and m.utente_id = (select auth.uid())
  );
$$;

create function public.sono_master(g uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.membri_gruppo m
    where m.gruppo_id = g and m.utente_id = (select auth.uid()) and m.ruolo = 'master'
  );
$$;

revoke all on function public.sono_membro(uuid), public.sono_master(uuid) from public, anon;
grant execute on function public.sono_membro(uuid), public.sono_master(uuid) to authenticated;

-- ---------- Fields nobody may change from the site ----------
-- The owner never changes; only the owner moves a character to another group;
-- the update time is set by the server.

create function public.personaggi_controlla_modifica() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.proprietario is distinct from old.proprietario then
    raise exception 'Il proprietario di un personaggio non si può cambiare';
  end if;
  if new.gruppo_id is distinct from old.gruppo_id and old.proprietario <> (select auth.uid()) then
    raise exception 'Solo il proprietario può spostare il personaggio in un altro gruppo';
  end if;
  new.creato_il := old.creato_il;
  new.aggiornato_il := now();
  return new;
end;
$$;

create trigger personaggi_prima_di_modifica
  before update on public.personaggi
  for each row execute function public.personaggi_controlla_modifica();

-- ---------- Row Level Security ----------

alter table public.gruppi        enable row level security;
alter table public.membri_gruppo enable row level security;
alter table public.personaggi    enable row level security;

-- Nothing for anonymous visitors.
revoke all on public.gruppi, public.membri_gruppo, public.personaggi from anon;

-- Groups: visible to their members. Created/changed only from the dashboard.
create policy "gruppi: leggono i membri" on public.gruppi
  for select to authenticated using (public.sono_membro(id));

-- Memberships: everyone sees who is in their own groups. Changed only from the dashboard.
create policy "membri: leggono i membri dello stesso gruppo" on public.membri_gruppo
  for select to authenticated using (public.sono_membro(gruppo_id));

-- Characters
create policy "personaggi: leggono proprietario e master" on public.personaggi
  for select to authenticated
  using (proprietario = (select auth.uid()) or public.sono_master(gruppo_id));

create policy "personaggi: crea solo per sé, in un proprio gruppo" on public.personaggi
  for insert to authenticated
  with check (
    proprietario = (select auth.uid())
    and (gruppo_id is null or public.sono_membro(gruppo_id))
  );

create policy "personaggi: modificano proprietario e master" on public.personaggi
  for update to authenticated
  using (proprietario = (select auth.uid()) or public.sono_master(gruppo_id))
  with check (
    (proprietario = (select auth.uid()) and (gruppo_id is null or public.sono_membro(gruppo_id)))
    or public.sono_master(gruppo_id)
  );

create policy "personaggi: elimina solo il proprietario" on public.personaggi
  for delete to authenticated
  using (proprietario = (select auth.uid()));
