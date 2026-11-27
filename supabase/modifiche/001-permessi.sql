-- Fix for projects created with the first version of schema.sql:
-- logged-in users had no table privileges ("permission denied").
-- Safe to run more than once. The access rules (RLS) stay as they are.
grant select on public.gruppi, public.membri_gruppo to authenticated;
grant select, insert, update, delete on public.personaggi to authenticated;
