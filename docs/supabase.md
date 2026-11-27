# Supabase: guida per l'amministratore

Il servizio **non è aperto al pubblico**: nessuno può registrarsi dal sito. Gli account, i gruppi e i master li crea l'amministratore dalla dashboard di Supabase.

Chi vuole usare il codice per il proprio tavolo crea il proprio progetto Supabase seguendo questa stessa guida.

## 1. Creare il progetto (una volta)

1. Account su [supabase.com](https://supabase.com) (anche con GitHub).
2. **New project**: nome a piacere, password del database (salvarla in un password manager, non serve al sito), regione **Central EU (Frankfurt)**.
3. *SQL Editor* → incollare tutto `supabase/schema.sql` → **Run**.
4. *Authentication → Sign In / Providers*:
   - **Allow new users to sign up**: disattivato (registrazione chiusa);
   - **Email** provider: attivo; **Confirm email**: disattivato (gli account li crea l'amministratore).
5. *Authentication → URL Configuration*: **Site URL** = indirizzo GitHub Pages della scheda.
6. *Project Settings → API*: copiare **Project URL** e chiave **anon / publishable** in `js/config.js`.
   - La chiave **service_role / secret** non va **mai** nel codice né nel repository, né data a nessuno.

## 2. Creare un account

*Authentication → Users → Add user → Create new user*: email e password provvisoria, **Auto Confirm User** attivo. Comunicare email e password al giocatore, che può cambiarla dalla scheda.

Password dimenticata: senza un servizio email esterno il link di recupero non arriva. L'amministratore imposta una password nuova da *SQL Editor* e la comunica al giocatore:

```sql
update auth.users
set encrypted_password = extensions.crypt('nuova-password-provvisoria', extensions.gen_salt('bf'))
where email = 'giocatore1@example.com';
```

## 3. Gruppi e master

Da *SQL Editor* (le email sono quelle degli account già creati):

```sql
-- Nuovo gruppo
insert into public.gruppi (nome) values ('Il nostro tavolo');

-- Aggiungere giocatori e master al gruppo
insert into public.membri_gruppo (gruppo_id, utente_id, ruolo)
select g.id, u.id, 'giocatore'
from public.gruppi g, auth.users u
where g.nome = 'Il nostro tavolo'
  and u.email in ('giocatore1@example.com', 'giocatore2@example.com');

insert into public.membri_gruppo (gruppo_id, utente_id, ruolo)
select g.id, u.id, 'master'
from public.gruppi g, auth.users u
where g.nome = 'Il nostro tavolo' and u.email = 'master@example.com';

-- Chi è in quale gruppo
select g.nome, u.email, m.ruolo
from public.membri_gruppo m
join public.gruppi g on g.id = m.gruppo_id
join auth.users u on u.id = m.utente_id
order by g.nome, m.ruolo, u.email;
```

Un master può guidare più gruppi: basta aggiungerlo come `master` in ciascuno. Un giocatore può stare in più gruppi.

## 4. Chi vede cosa

| | Proprie schede | Schede del gruppo | Schede di altri gruppi |
|---|---|---|---|
| Giocatore | legge, modifica, elimina | — | — |
| Master del gruppo | legge, modifica, elimina (le proprie) | legge e modifica, non elimina | — |
| Visitatore senza login | — | — | — |

Un personaggio appartiene a un gruppo (o a nessuno). Solo il proprietario può spostarlo in un altro gruppo, e solo in un gruppo di cui fa parte.

## 5. Inattività

Sul piano gratuito il progetto va in pausa dopo circa una settimana senza richieste; i dati restano. Qualche giorno prima della sessione: dashboard → progetto → **Restore project** (la riattivazione può richiedere qualche minuto).

Un progetto in pausa si può riattivare solo entro un certo periodo (di solito alcuni mesi: controllare le condizioni attuali di Supabase). Per sicurezza, ogni tanto conviene esportare le schede in JSON.
