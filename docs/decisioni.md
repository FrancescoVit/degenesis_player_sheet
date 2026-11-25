# Scheda personaggio interattiva per Degenesis — riepilogo decisioni

> Documento di partenza per lo sviluppo. Da far leggere a Claude Code all'inizio
> della prima sessione sul PC Linux Mint.
> Stato: fase di progettazione conclusa, **nessun codice ancora scritto**.

---

## 1. Obiettivo

Un sito web con la scheda del personaggio di **Degenesis (Rebirth)**, interattiva e compilabile, utilizzabile da PC, tablet e smartphone.
Durante la sessione ogni giocatore apre il sito, entra con il proprio account, apre la scheda del suo PG e la aggiorna giocando. Ogni modifica viene salvata su un database e ritrovata alla sessione successiva.

## 2. Requisiti decisi

- **Utenti**: solo il gruppo di gioco (pochi giocatori).
- **Ruoli**: previsti *giocatore* e *master*, ma **per ora si sviluppa solo la parte giocatore**. Il database prevede però già il campo ruolo e il legame utente ↔ personaggio, per aggiungere il master in seguito senza rifare nulla.
- **Tutto è modificabile**: un'unica modalità, nessuna distinzione tra "gioco" e "modifica".
- **Connessione sempre presente**: nessuna modalità offline, la scheda legge e scrive direttamente sul DB.
- **Lingua**: italiano. Tutte le etichette vanno raccolte in un unico file (`js/testi-it.js`).
  - **Da decidere**: tradurre o no i termini di gioco (Ego, Fleshwounds, Trauma, Primal, abilità, potenziali). Seguire l'edizione o il lessico usato dal gruppo.
- **Fedeltà alla scheda ufficiale**: ricrearne il più possibile disposizione e campi, con grafica propria in HTML/CSS (niente immagini del PDF ufficiale).

## 3. Interfaccia

### Struttura a sezioni (tab)
- Una sola pagina HTML; **barra di tab in alto**, fissa durante lo scorrimento. Su schermi stretti scorre lateralmente oppure diventa un menu a tendina.
- Cambiare tab mostra o nasconde la sezione corrispondente, senza ricaricare la pagina.
- Il sito ricorda l'ultimo tab aperto.
- **Intestazione compatta sempre visibile** su tutti i tab, in piccolo: **nome PG, Drafts/Dinars, Culto**.
- **Divisione in 5 tab**, fedele alle sezioni della scheda (riferimento: `riferimenti/Bash.pdf`):
  1. **Archetype** (esteso): nome, età, rango, esperienza, legacy, sesso, altezza, peso, drafts/dinars; Culture, Concept, Cult.
  2. **Attributes & Condition** — la "dashboard di gioco": a sinistra Attributes & Skills, a destra Condition, affiancati (su schermi stretti uno sotto l'altro); sotto, Advantages (Backgrounds, Potentials, Scars).
     - Condition contiene: riquadri dei valori derivati (Iniziativa PSY+Reaction; Ingombro trasportato / limite BOD+Force; Difesa attiva: Schivata AGI+Mobility, Contrattacco BOD+Brawl, Contrattacco BOD+Melee; Difesa passiva = 1 base +1 attivo e in piedi, +1 mosso > 2 m, copertura +1 parziale / +4 totale), tracciati, Modifiers, Complications.
     - Tracciati: si disegnano tutte le caselle possibili come sulla scheda (24 per Ego/Spore/Fleshwounds, 12 per Trauma). Quelle possedute (da formula) sono **nere**, quelle perse **rosse** (cliccando una nera), le restanti **bianche** e non cliccabili.
     - Formule (cheat sheet regole): Ego = (INT+Focus oppure INS+Primal)×2; Spore = (PSY+Faith/Willpower)×2; Fleshwounds = (BOD+Toughness)×2; Trauma = BOD+PSY.
  3. **Arsenal**: Weapons (handling, distance, damage, mag, properties, enc., tech, slots); Armor (armor value, properties, enc., tech, slots).
  4. **Possessions**: Equipment (con enc. e totale), Artifacts (activation, operation, appraisal value).
  5. **Altro**: Visuals, Portrait, Relationships (cult + mod.); impostazioni ed export/import.
- **Creazione del personaggio** (Katharsys p. 33): 10 punti attributo (+1 gratuito per attributo, quindi 16 in totale), 28 punti abilità, 4 punti background. Massimo in creazione: attributo 3, abilità 2, background 3; ogni bonus di Culture, Concept e Cult alza di +1 il massimo del tratto indicato. Dopo la creazione: attributi 1–6, abilità 0–6.
- Su PC e tablet: impaginato più largo, simile al foglio. Su smartphone: una colonna.

### Attributi e abilità
- Ogni attributo o abilità è una **fila di caselle/pallini selezionabili** (es. 1–6). Cliccando la n-esima si riempiono le prime n; cliccando l'ultima piena si scende di uno.
- **Contatore accanto** a ogni attributo o blocco: punti spesi / punti disponibili (attributi e abilità separati), rosso se si sfora.
- Punti disponibili e massimi (che in creazione dipendono da Cultura e Concetto) **configurabili** da un piccolo pannello, non scritti fissi nel codice. Così vale sia per la creazione sia per la crescita con l'esperienza.
- Abilità che si escludono a vicenda: **Focus / Primal** e **Faith / Willpower**. Attivandone una, l'altra si blocca.
- Mostrare la **riserva di dadi** calcolata (attributo + abilità, con il limite previsto dalle regole).

### Tracciati: Ego, Fleshwounds, Trauma (e Spore)
- Fila di caselle; **il numero di caselle si ricava dagli attributi** (formule da prendere dal manuale e **verificare**, non andare a memoria).
- Al click una casella passa da disponibile a **persa**. Due stili da provare: **rossa piena** oppure **barrata con una X**, eventualmente come opzione nelle impostazioni.
- Utili: pulsante "recupera tutto" e pulsanti rapidi −1/+1 per lo smartphone.

### Altre parti della scheda
Anagrafica (nome, Culto, Cultura, Concetto, rango), Background (Allies, Authority, Network, Renown, Resources, Secrets), Potenziali con livello, armi (scelte da un catalogo, con i valori compilati in automatico), armature, inventario, munizioni, denaro, note/diario.

### Possibili aggiunte (non prioritarie)
Tiradadi integrato (conta successi, trigger sui 6, segnala i fallimenti sugli 1), avvisi sulle soglie (es. Spore).

## 4. Architettura

```
Browser del giocatore  ──HTTPS──►  GitHub Pages   (serve solo i file HTML/CSS/JS)
        │
        └──────────HTTPS──────────►  Supabase      (database Postgres + login + regole di accesso)
```

- **Frontend statico** su **GitHub Pages**.
- Il **JavaScript eseguito nel browser** del giocatore legge e scrive direttamente sul DB tramite le API di Supabase. Non c'è un server proprio da gestire.
- **Database**: **Supabase** (alternativa: Firebase).
  - Attenzione: sul piano gratuito Supabase il progetto va in pausa dopo circa 7 giorni senza attività. Valutare la riattivazione manuale, un accesso automatico periodico, oppure Firebase.
- **Scheda salvata come un unico documento JSON per personaggio** (es. una tabella `personaggi` con colonna `dati jsonb`, più `proprietario`, `nome`, `aggiornato_il`). Semplice da salvare, esportare e copiare per i backup.
- **Salvataggio automatico a ogni modifica**, con un breve ritardo dopo l'ultimo cambiamento. Mai "solo alla chiusura": sui telefoni il browser può chiudersi senza preavviso.
- Conflitti tra due dispositivi aperti sullo stesso PG: vince l'ultima modifica.
- Pulsante **esporta/importa JSON** come backup.
- **Login**: email con *magic link*, offerto già pronto da Supabase. Niente password da gestire.
- Tutto il codice che parla con il DB sta in **`js/db.js`**, così si può cambiare servizio (Firebase, PocketBase) toccando un solo file.
- **Catalogo armi e armature** separato in `data/armi.json`. Per il repository pubblico: solo nomi e valori numerici, niente testi copiati dai manuali.

## 5. Sicurezza (decisioni)

Principio: il codice nel browser non è affidabile; **i controlli stanno sul server di Supabase**.

- **Row Level Security attiva su ogni tabella fin dall'inizio**: ognuno legge e modifica solo i propri personaggi. Verificarla provando ad accedere alla scheda di un altro utente. In futuro una regola aggiuntiva per il master.
- **Chiave `anon` (pubblica)**: va nel codice, va bene così.
- **Chiave `service_role`**: **mai** nel codice né nel repository.
- I campi di testo libero vanno mostrati sempre come **testo semplice** (`textContent`), **mai** con `innerHTML`, per evitare iniezioni di codice (XSS).
- Librerie esterne: poche, con versione fissata, possibilmente copiate nel repository.
- Dati personali: solo le email di login, gestite da Supabase.

## 6. Repository e hosting

- **Repository GitHub pubblico** + **GitHub Pages**. Decisione presa dopo aver valutato che il codice pubblico non crea problemi di sicurezza con le precauzioni seguenti:
  - autenticazione a due fattori (2FA) sull'account GitHub;
  - `.gitignore` fin dal primo commit (file di configurazione locali, `.env`, ecc.);
  - se un segreto finisce per errore in un commit, considerarlo compromesso e **rigenerarlo** (la cronologia git resta pubblica);
  - leggere sempre le pull request altrui prima di accettarle;
  - email dei commit: indirizzo noreply di GitHub.
- Licenza: da scegliere (es. MIT).
- **Sviluppo sul PC personale con Linux Mint**, non nella cartella OneDrive di lavoro: OneDrive e git sugli stessi file possono creare conflitti; inoltre è un account di lavoro.

### Struttura proposta

```
degenesis-scheda/
├─ index.html          ← login + lista PG
├─ scheda.html         ← la scheda a tab
├─ css/
├─ js/
│  ├─ scheda.js        ← logica (pallini, contatori, tracciati)
│  ├─ db.js            ← unico punto che parla con Supabase
│  └─ testi-it.js      ← tutte le etichette in italiano
├─ data/
│  └─ armi.json        ← catalogo armi/armature
├─ docs/
│  └─ decisioni.md     ← questo file
├─ .gitignore
└─ README.md
```

### App installabile (PWA), ultimo passo
`manifest.json` (nome, icona, colori) + un service worker minimale (tiene in memoria solo la grafica; i dati arrivano sempre dal DB). HTTPS lo fornisce già GitHub Pages.
- Android e PC: pulsante "Installa app".
- iPhone e iPad: Safari → Condividi → "Aggiungi alla schermata Home".

## 7. Piano di lavoro

1. **Bozza statica della scheda** (solo HTML/CSS/JS, nessun DB, salvataggio provvisorio nel browser) per decidere aspetto, tab, caselle, contatori e stile rosso o barrato.
2. **Logica**: contatori, massimi, esclusioni, tracciati derivati, riserva di dadi.
3. **Catalogo armi e armature** (`data/armi.json`).
4. **Supabase**: tabelle, Row Level Security, login con magic link, lista PG, salvataggio automatico.
5. **Pubblicazione** su GitHub Pages e prova al tavolo.
6. **PWA**.
7. Più avanti: **vista master**.

## 8. Cosa serve prima di iniziare la bozza

- [x] **Divisione della scheda in sezioni/tab**: vedi sezione 3.
- [x] **Scheda di riferimento**: `riferimenti/Bash.pdf` (cartella esclusa con `.gitignore`).
- [x] **Manuale**: `riferimenti/DEGENESIS-BOOK-01-PRIMAL-PUNK-EN-LQ.pdf` e `riferimenti/degenesis-rules-cheat-sheet-en-hq.pdf`.
- [ ] Decisione: termini di gioco tradotti o in originale.

## 9. Primo avvio

Avviare `claude` nella cartella del progetto e chiedere:
"leggi docs/decisioni.md e partiamo dal punto 1 del piano".
