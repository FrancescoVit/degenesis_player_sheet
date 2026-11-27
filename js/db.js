// The only place that knows where sheets are stored.
// - Online: Supabase (login with email + password, one row per character).
//   Who can read or write what is decided by the database rules, not here.
// - Local: this browser's localStorage (no CONFIG, or a sheet opened without ?id=).
const DB = (() => {
  const LOCAL_SHEET_KEY = "degenesis.sheet.draft";
  const SETTINGS_KEY = "degenesis.settings";

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (err) { console.error("Save failed", err); return false; }
  }

  const configured = typeof CONFIG !== "undefined" && CONFIG.supabaseUrl && CONFIG.supabaseKey && window.supabase;
  const client = configured ? window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey) : null;

  // Every call returns data or throws an Error with a readable message.
  async function run(query) {
    const { data, error } = await query;
    if (error) throw new Error(error.message || String(error));
    return data;
  }
  const nameOf = (sheet) => String(sheet?.archetype?.name || "").trim();
  const COLUMNS = "id, nome, gruppo_id, proprietario, creato_il, aggiornato_il";

  return {
    online: Boolean(client),

    /* ----- Account ----- */
    async currentUser() {
      if (!client) return null;
      const { data } = await client.auth.getSession();
      return data.session ? data.session.user : null;
    },
    async signIn(email, password) {
      const data = await run(client.auth.signInWithPassword({ email, password }));
      return data.user;
    },
    async signOut() { if (client) await client.auth.signOut(); },
    async changePassword(password) { await run(client.auth.updateUser({ password })); },

    /* ----- Groups ----- */
    // Groups the user belongs to, with their role in each.
    async myGroups(userId) {
      const rows = await run(client.from("membri_gruppo").select("ruolo, gruppi (id, nome)").eq("utente_id", userId));
      return rows.filter((r) => r.gruppi).map((r) => ({ id: r.gruppi.id, nome: r.gruppi.nome, ruolo: r.ruolo }))
        .sort((a, b) => a.nome.localeCompare(b.nome));
    },

    /* ----- Characters ----- */
    // Own characters plus, for a master, those of their groups (the database decides).
    listCharacters: () => run(client.from("personaggi").select(COLUMNS).order("nome")),
    loadCharacter: (id) => run(client.from("personaggi").select(`${COLUMNS}, dati`).eq("id", id).single()),
    createCharacter: (sheet, groupId = null) =>
      run(client.from("personaggi").insert({ nome: nameOf(sheet), dati: sheet, gruppo_id: groupId }).select(COLUMNS).single()),
    saveCharacter: (id, sheet) => run(client.from("personaggi").update({ nome: nameOf(sheet), dati: sheet }).eq("id", id).select("id").single()),
    setGroup: (id, groupId) => run(client.from("personaggi").update({ gruppo_id: groupId }).eq("id", id).select("id").single()),
    deleteCharacter: (id) => run(client.from("personaggi").delete().eq("id", id)),
    // Full sheets of every character visible to the user (backup).
    exportAll: () => run(client.from("personaggi").select(`${COLUMNS}, dati`).order("nome")),

    /* ----- Local (this browser) ----- */
    loadLocal: async () => read(LOCAL_SHEET_KEY),
    saveLocal: async (sheet) => write(LOCAL_SHEET_KEY, sheet),

    // Settings are per device (e.g. track style), not part of the character.
    loadSettings: () => read(SETTINGS_KEY) || {},
    saveSettings: (settings) => write(SETTINGS_KEY, settings),
  };
})();
