// The only place that knows where sheets are stored.
// DRAFT VERSION: browser localStorage. It will be replaced by Supabase
// keeping the same functions (loadSheet / saveSheet / loadSettings / saveSettings).
const DB = (() => {
  const SHEET_KEY = "degenesis.sheet.draft";
  const SETTINGS_KEY = "degenesis.settings";

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (err) { console.error("Save failed", err); return false; }
  }

  return {
    loadSheet: async () => read(SHEET_KEY),
    saveSheet: async (sheet) => write(SHEET_KEY, sheet),
    // Settings are per device (e.g. track style), not part of the character.
    loadSettings: () => read(SETTINGS_KEY) || {},
    saveSettings: (settings) => write(SETTINGS_KEY, settings),
  };
})();
