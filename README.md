# degenesis_player_sheet

Scheda personaggio interattiva per **Degenesis Rebirth**, utilizzabile da PC, tablet e smartphone.

> Stato: **in sviluppo**. Login e salvataggio online con Supabase; interfaccia ancora in inglese.

## Usarla

**Online:** https://francescovit.github.io/degenesis_player_sheet/

Si entra con email e password. Il servizio è chiuso: gli account li crea l'amministratore. Dopo il login c'è l'elenco dei propri personaggi (e, per il master, di quelli del gruppo); le schede si salvano da sole e sono uguali su ogni dispositivo.

**Senza account, solo in questo browser:** https://francescovit.github.io/degenesis_player_sheet/scheda.html (oppure scarica il repository e apri `scheda.html`). Al primo avvio c'è un personaggio d'esempio; dal tab **Altro** si esporta/importa in JSON.

## Usarla con il proprio database

Il codice è aperto: per usarla con il proprio tavolo si crea un progetto Supabase gratuito seguendo [`docs/supabase.md`](docs/supabase.md) e si mettono URL e chiave pubblica in `js/config.js`. Con `js/config.js` vuoto la scheda funziona solo in locale.

Catalogo di armi, armature, oggetti e potenziali: `catalogo.html`.

## Documentazione

Decisioni di progetto e piano di lavoro: [`docs/decisioni.md`](docs/decisioni.md).

## Licenza

Il codice è distribuito con licenza [MIT](LICENSE).

Degenesis è un marchio dei rispettivi proprietari (SIXMOREVODKA). Questo progetto non è ufficiale e non contiene testi o immagini dei manuali. Il catalogo in `data/` riporta solo nomi e valori di gioco con il riferimento alla pagina del manuale: questi restano dei rispettivi proprietari e non sono coperti dalla licenza MIT.
