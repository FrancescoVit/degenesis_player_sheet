// Characters page: login, list of characters, create / import / export.
// All text from the database is shown with textContent only.

const t = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), TEXT) ?? path;
const fill = (text, values) => text.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? "");

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else if (v === true) node.setAttribute(k, "");
    else if (v !== false && v != null) node.setAttribute(k, v);
  });
  children.flat().forEach((c) => c != null && node.append(c));
  return node;
}

const main = document.getElementById("home");
const bar = document.getElementById("home-bar");

function toast(text, isError = false) {
  const node = document.getElementById("toast");
  node.textContent = text;
  node.classList.toggle("error", isError);
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("show"), isError ? 5000 : 1500);
}
// Network errors usually mean the free project is paused.
function explain(err) {
  console.error(err);
  const msg = String(err && err.message || err);
  return /fetch|network|load failed/i.test(msg) ? t("home.paused") : fill(t("home.error"), { msg });
}
const fail = (err) => toast(explain(err), true);

function download(name, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = el("a", { href: URL.createObjectURL(blob), download: name });
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const fileName = (text) => String(text || "character").replace(/[^\w-]+/g, "_");
const isSheet = (data) => data && typeof data === "object" && !Array.isArray(data) && data.attributes;
const formatDate = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });

/* ---------- No database configured ---------- */

function renderLocalOnly() {
  bar.replaceChildren(el("span", { class: "home-title", text: t("home.characters") }));
  main.replaceChildren(
    el("p", { class: "note", text: t("home.localMode") }),
    el("p", {}, el("a", { class: "button", href: "scheda.html", text: t("home.openLocal") })));
}

/* ---------- Login ---------- */

function renderLogin(message = "") {
  bar.replaceChildren(el("span", { class: "home-title", text: t("home.characters") }));
  const email = el("input", { type: "email", autocomplete: "username", required: true });
  const password = el("input", { type: "password", autocomplete: "current-password", required: true });
  const error = el("p", { class: "error", role: "alert", text: message });
  const button = el("button", { type: "submit", class: "button", text: t("home.login") });
  const form = el("form", { class: "login" },
    el("h2", { class: "section-title", text: t("home.loginTitle") }),
    el("label", { class: "field" }, el("span", { text: t("home.email") }), email),
    el("label", { class: "field" }, el("span", { text: t("home.password") }), password),
    button, error,
    el("p", { class: "note", text: t("home.noAccount") }));
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    button.disabled = true;
    error.textContent = "";
    try {
      await DB.signIn(email.value.trim(), password.value);
      await renderHome();
    } catch (err) {
      error.textContent = /invalid|credentials/i.test(err.message) ? t("home.loginError") : explain(err);
      button.disabled = false;
    }
  });
  main.replaceChildren(form);
  email.focus();
}

/* ---------- Characters ---------- */

async function renderHome() {
  const user = await DB.currentUser();
  if (!user) return renderLogin();

  bar.replaceChildren(
    el("span", { class: "home-title", text: t("home.characters") }),
    el("span", { text: `${t("home.loggedAs")} ${user.email}` }),
    el("button", { type: "button", text: t("home.logout"), onclick: async () => { await DB.signOut(); renderLogin(); } }));

  let groups, characters;
  try {
    [groups, characters] = await Promise.all([DB.myGroups(user.id), DB.listCharacters()]);
  } catch (err) {
    main.replaceChildren(el("p", { class: "home-msg error", text: explain(err) }));
    return;
  }
  const groupName = new Map(groups.map((g) => [g.id, g.nome]));
  const mine = characters.filter((c) => c.proprietario === user.id);
  const others = characters.filter((c) => c.proprietario !== user.id);

  const groupSelect = (value, onchange) => el("select", { onchange },
    el("option", { value: "", text: t("home.noGroup") }),
    ...groups.map((g) => el("option", { value: g.id, text: g.nome, selected: g.id === value })));

  const row = (c, own) => el("div", { class: "char-row" },
    el("a", { class: "char-name", href: `scheda.html?id=${encodeURIComponent(c.id)}`, text: c.nome || TEXT.summary.unnamed }),
    el("span", { class: "char-group" }, own
      ? groupSelect(c.gruppo_id, async (e) => {
        try { await DB.setGroup(c.id, e.target.value || null); toast(t("saved")); } catch (err) { fail(err); renderHome(); }
      })
      : el("span", { text: groupName.get(c.gruppo_id) || "" })),
    el("span", { class: "char-date", text: `${t("home.updated")} ${formatDate(c.aggiornato_il)}` }),
    el("span", { class: "char-buttons" },
      el("a", { class: "button small", href: `scheda.html?id=${encodeURIComponent(c.id)}`, text: t("home.open") }),
      own ? el("button", { type: "button", class: "button small ghost", text: t("home.duplicate"), onclick: () => duplicate(c) }) : null,
      own ? el("button", { type: "button", class: "button small danger", text: t("home.delete"), onclick: () => remove(c) }) : null));

  // New character: in the chosen group (default: the first one).
  const newGroup = groupSelect(groups[0] ? groups[0].id : "", null);
  const createFrom = async (sheet) => {
    try {
      const created = await DB.createCharacter(sheet, newGroup.value || null);
      location.href = `scheda.html?id=${encodeURIComponent(created.id)}`;
    } catch (err) { fail(err); }
  };
  const importInput = el("input", { type: "file", accept: "application/json,.json", hidden: true,
    onchange: async (e) => {
      const file = e.target.files[0];
      e.target.value = "";
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (!isSheet(data)) throw new Error("invalid");
        await createFrom(data);
      } catch { toast(TEXT.settings.importError, true); }
    } });
  const local = await DB.loadLocal();

  const sections = [
    el("h2", { class: "section-title", text: t("home.mine") }),
    el("div", { class: "home-actions" },
      el("button", { type: "button", class: "button", text: t("home.newCharacter"), onclick: () => createFrom({}) }),
      groups.length ? el("label", {}, `${t("home.newIn")} `, newGroup) : null,
      el("label", { class: "button ghost" }, el("span", { text: t("home.importJson") }), importInput),
      isSheet(local) ? el("button", { type: "button", class: "button ghost", text: t("home.importLocal"), onclick: () => createFrom(local) }) : null,
      el("button", { type: "button", class: "button ghost", text: t("home.exportAll"), onclick: exportAll })),
    el("div", { class: "char-list" }, mine.length ? mine.map((c) => row(c, true)) : el("p", { class: "note", text: t("home.none") })),
  ];

  // Master view: the database only returns other people's characters to a master of their group.
  if (others.length) {
    sections.push(el("h2", { class: "section-title", text: t("home.ofGroups") }));
    groups.filter((g) => g.ruolo === "master").forEach((g) => {
      const list = others.filter((c) => c.gruppo_id === g.id);
      if (!list.length) return;
      sections.push(el("h3", { class: "bar", text: g.nome }), el("div", { class: "char-list" }, list.map((c) => row(c, false))));
    });
  }

  sections.push(passwordBox());
  main.replaceChildren(...sections);
}

async function duplicate(c) {
  try {
    const full = await DB.loadCharacter(c.id);
    const sheet = full.dati || {};
    if (sheet.archetype) sheet.archetype.name = `${sheet.archetype.name || ""} ${t("home.copySuffix")}`.trim();
    await DB.createCharacter(sheet, full.gruppo_id);
    renderHome();
  } catch (err) { fail(err); }
}

async function remove(c) {
  if (!confirm(fill(t("home.confirmDelete"), { name: c.nome || TEXT.summary.unnamed }))) return;
  try { await DB.deleteCharacter(c.id); renderHome(); } catch (err) { fail(err); }
}

// Backup: every character this user can see, full sheets, in one file.
async function exportAll() {
  try {
    const rows = await DB.exportAll();
    download(`degenesis-${new Date().toISOString().slice(0, 10)}.json`, {
      exported: new Date().toISOString(),
      characters: rows.map((r) => ({ id: r.id, name: r.nome, group: r.gruppo_id, updated: r.aggiornato_il, sheet: r.dati })),
    });
  } catch (err) { fail(err); }
}

function passwordBox() {
  const input = el("input", { type: "password", autocomplete: "new-password", minlength: "8" });
  return el("details", { class: "block" },
    el("summary", { text: t("home.changePassword") }),
    el("div", { class: "password-box" },
      el("label", { class: "field" }, el("span", { text: t("home.newPassword") }), input),
      el("button", { type: "button", class: "button small", text: t("home.changePassword"),
        onclick: async () => {
          if (input.value.length < 8) return toast(t("home.passwordShort"), true);
          try { await DB.changePassword(input.value); input.value = ""; toast(t("home.passwordChanged")); } catch (err) { fail(err); }
        } })));
}

/* ---------- Start ---------- */

document.title = t("home.title");
if (DB.online) renderHome().catch((err) => renderLogin(explain(err)));
else renderLocalOnly();
