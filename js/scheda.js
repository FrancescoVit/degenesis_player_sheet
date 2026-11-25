// Character sheet logic: tabs, pips, experience, tracks, lists, autosave.
// Security rule: user text is only ever written with .value / .textContent, never innerHTML.
"use strict";

/* ---------- Game structure ---------- */

const ATTRIBUTES = [
  { key: "body", skills: ["athletics", "brawl", "force", "melee", "stamina", "toughness"] },
  { key: "agility", skills: ["crafting", "dexterity", "navigation", "mobility", "projectiles", "stealth"] },
  { key: "charisma", skills: ["arts", "conduct", "expression", "leadership", "negotiation", "seduction"] },
  { key: "intellect", skills: ["artifactLore", "engineering", "focus", "legends", "medicine", "science"] },
  { key: "psyche", skills: ["cunning", "deception", "domination", "faith", "reaction", "willpower"] },
  { key: "instinct", skills: ["empathy", "orienteering", "perception", "primal", "survival", "taming"] },
];
const BACKGROUNDS = ["allies", "authority", "network", "renown", "resources", "secrets"];
// Mutually exclusive skills: having points in one locks the other.
const EXCLUSIVE = { focus: "primal", primal: "focus", faith: "willpower", willpower: "faith" };
const CULTURES = ["Africa", "Balkhan", "Borca", "Franka", "Hybrispania", "Pollen", "Purgare"];
const CULTS = ["Anabaptists", "Anubians", "Apocalyptics", "Chroniclers", "Clanners", "Hellvetics",
  "Jehammedans", "Judges", "Neolibyans", "Palers", "Scourgers", "Scrappers", "Spitalians"];
const MAX_DICE = 12;
const TRAIT_MAX = 6; // rules: attributes 1–6, skills 0–6

// Track maximums (Rules summary, Degenesis Rebirth).
// `max` = boxes the character has; `cap` = boxes drawn, like the printed sheet (the rest stay white).
const TRACKS = [
  { key: "ego", max: (a, s) => 2 * (s.primal > 0 ? a.instinct + s.primal : a.intellect + s.focus), cap: 4 * TRAIT_MAX },
  { key: "spore", max: (a, s) => 2 * (a.psyche + Math.max(s.faith, s.willpower)), cap: 4 * TRAIT_MAX },
  { key: "flesh", max: (a, s) => 2 * (a.body + s.toughness), cap: 4 * TRAIT_MAX },
  { key: "trauma", max: (a) => a.body + a.psyche, cap: 2 * TRAIT_MAX },
];

// Dice pools shown in the condition panel.
const DERIVED = [
  { key: "initiative", attr: "psyche", skill: "reaction" },
  { key: "dodge", attr: "agility", skill: "mobility", group: "activeDefense" },
  { key: "counterBrawl", attr: "body", skill: "brawl", group: "activeDefense" },
  { key: "counterMelee", attr: "body", skill: "melee", group: "activeDefense" },
];

// Editable lists. `cols` = desktop grid template.
const LISTS = {
  potentials: { path: "potentials", cols: "1fr auto", fields: ["name"], pips: { key: "level", max: 3 }, header: false },
  modifiers: { path: "condition.modifiers", cols: "1fr", fields: ["text"], header: false },
  complications: { path: "condition.complications", cols: "1fr", fields: ["text"], header: false },
  weapons: {
    path: "weapons",
    cols: "minmax(8rem,2fr) 4.5rem minmax(5rem,1fr) 5rem 3.5rem minmax(8rem,2fr) 3.5rem 3.5rem 3.5rem",
    fields: ["name", "handling", "distance", "damage", "mag", "properties", "enc", "tech", "slots"],
    numeric: ["enc"],
  },
  armor: {
    path: "armor",
    cols: "minmax(8rem,2fr) 6rem minmax(8rem,3fr) 3.5rem 3.5rem 3.5rem",
    fields: ["name", "armor", "properties", "enc", "tech", "slots"],
    numeric: ["enc"],
  },
  equipment: { path: "equipment", cols: "1fr 4rem", fields: ["name", "enc"], numeric: ["enc"] },
  artifacts: { path: "artifacts", cols: "minmax(8rem,2fr) minmax(6rem,1fr) minmax(8rem,2fr) 7rem", fields: ["name", "activation", "operation", "value"] },
  visuals: { path: "other.visuals", cols: "1fr", fields: ["text"], header: false },
  relationships: { path: "other.relationships", cols: "1fr 4rem", fields: ["name", "mod"] },
};

/* ---------- State ---------- */

function blankSheet() {
  const attributes = {}, skills = {}, backgrounds = {};
  ATTRIBUTES.forEach((a) => { attributes[a.key] = 1; a.skills.forEach((s) => { skills[s] = 0; }); });
  BACKGROUNDS.forEach((b) => { backgrounds[b] = 0; });
  return {
    archetype: { name: "", age: "", rank: "", experience: "", legacy: "", sex: "", height: "", weight: "", money: "", culture: "", concept: "", cult: "" },
    attributes, skills, backgrounds,
    preferred: Object.fromEntries(ATTRIBUTES.map((a) => [a.key, false])),
    potentials: [],
    scars: { groupName: "", alignment: "", constellation: "", scarsValue: "", infamy: 0 },
    condition: {
      lost: { ego: 0, spore: 0, flesh: 0, trauma: 0 },
      passive: { standing: false, moved: false, cover: "" },
      modifiers: [], complications: [],
    },
    weapons: [], armor: [], equipment: [], artifacts: [],
    // The backpack: Enc 1, holds up to 3 items that weigh nothing.
    backpack: { carried: true, slots: ["", "", ""] },
    other: { visuals: [], relationships: [], portrait: "" },
    // Free editing: pips change without spending XP (new character, corrections).
    config: { freeEdit: false },
  };
}

// Fill missing keys from defaults so older saves keep working.
function withDefaults(defaults, data) {
  if (Array.isArray(defaults)) return Array.isArray(data) ? data : defaults;
  if (defaults && typeof defaults === "object") {
    const out = {};
    const src = data && typeof data === "object" && !Array.isArray(data) ? data : {};
    Object.keys(defaults).forEach((k) => { out[k] = withDefaults(defaults[k], src[k]); });
    return out;
  }
  if (data === undefined || data === null) return defaults;
  if (typeof defaults === "boolean") return Boolean(data);
  return typeof defaults === "number" ? (Number(data) || 0) : String(data);
}

let state = blankSheet();
const settings = Object.assign({ trackStyle: "red", lastTab: "archetype" }, DB.loadSettings());

const t = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), TEXT) ?? path;
const getPath = (obj, path) => path.split(".").reduce((o, k) => o[k], obj);
function setPath(obj, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  keys.reduce((o, k) => o[k], obj)[last] = value;
}
const num = (v) => { const n = parseInt(v, 10); return Number.isFinite(n) ? n : 0; };

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else if (k === "style") Object.entries(v).forEach(([p, val]) => node.style.setProperty(p, val));
    else if (v === true) node.setAttribute(k, "");
    else if (v !== false && v != null) node.setAttribute(k, v);
  });
  children.flat().forEach((c) => c != null && node.append(c));
  return node;
}

/* ---------- Saving ---------- */

let saveTimer = null;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    const ok = await DB.saveSheet(state);
    if (ok) flashToast();
  }, 600);
}
function flashToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  clearTimeout(flashToast.timer);
  flashToast.timer = setTimeout(() => toast.classList.remove("show"), 900);
}

/* ---------- Pips ---------- */

// Row of diamond pips. Clicking pip n sets value n; clicking the last filled one lowers by one.
function pips({ value, max = 6, min = 0, limit = max, disabled = false, label, onSet, tip }) {
  const wrap = el("div", { class: "pips" + (disabled ? " is-disabled" : ""), role: "group", "aria-label": label });
  for (let i = 1; i <= max; i++) {
    wrap.append(el("button", {
      type: "button",
      class: "pip" + (i <= value ? " on" : "") + (i > limit ? " over" : ""),
      "aria-label": `${label} ${i}`,
      "aria-pressed": String(i <= value),
      title: tip ? tip(i) : null,
      disabled: disabled || i > limit,
      onclick: () => onSet(Math.max(min, i === value ? i - 1 : i)),
    }));
  }
  return wrap;
}

/* ---------- Tabs & summary ---------- */

function renderTabs() {
  const nav = document.getElementById("tabs");
  nav.replaceChildren(...Object.keys(TEXT.tabs).map((key) =>
    el("button", { type: "button", role: "tab", class: "tab", "data-tab": key, text: t(`tabs.${key}`), onclick: () => showTab(key) })));
  // A link like scheda.html#condition opens that tab directly; otherwise the last one used.
  const fromHash = location.hash.slice(1);
  showTab(TEXT.tabs[fromHash] ? fromHash : TEXT.tabs[settings.lastTab] ? settings.lastTab : "archetype");
}
function showTab(key) {
  document.querySelectorAll(".panel").forEach((p) => { p.hidden = p.id !== `tab-${key}`; });
  document.querySelectorAll(".tab").forEach((b) => {
    const active = b.dataset.tab === key;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", String(active));
    if (active) b.scrollIntoView({ block: "nearest", inline: "nearest" });
  });
  settings.lastTab = key;
  DB.saveSettings(settings);
  window.scrollTo({ top: 0 });
}

function renderSummary() {
  const a = state.archetype;
  const item = (label, value, cls) => el("span", { class: "sum-item " + (cls || "") },
    el("span", { class: "sum-label", text: label }), el("span", { class: "sum-value", text: value || "—" }));
  document.getElementById("summary").replaceChildren(
    item(t("summary.name"), a.name || t("summary.unnamed"), "sum-name"),
    item(t("summary.cult"), a.cult),
    item(t("summary.money"), a.money),
  );
}

/* ---------- Experience (Katharsys p. 102–103) ---------- */

// Raising one level costs: new level × factor. Preferred attributes ×10 (others ×12),
// skills of a preferred attribute ×4 (others ×5).
// Potentials: every new level costs (sum of all potential levels + 1) × 10, new potentials included.
const XP_FACTOR = {
  attribute: (pref) => (pref ? 10 : 12),
  skill: (pref) => (pref ? 4 : 5),
};
const SKILL_ATTRIBUTE = {};
ATTRIBUTES.forEach((a) => a.skills.forEach((s) => { SKILL_ATTRIBUTE[s] = a.key; }));

const xpAvailable = () => num(state.archetype.experience);
const freeEdit = () => state.config.freeEdit;
const potentialLevels = () => state.potentials.reduce((s, p) => s + num(p.level), 0);

// Cost of going from level `from` to level `to` (to > from).
function traitCost(factor, from, to) {
  let cost = 0;
  for (let l = from + 1; l <= to; l++) cost += l * factor;
  return cost;
}
function potentialCost(totalLevels, steps) {
  let cost = 0;
  for (let i = 1; i <= steps; i++) cost += (totalLevels + i) * 10;
  return cost;
}
// Highest level reachable with the XP available (lowering is always allowed).
function affordableLevel(current, max, costTo) {
  if (freeEdit()) return max;
  let level = current;
  while (level < max && costTo(level + 1) <= xpAvailable()) level++;
  return level;
}

// Apply a change to a trait, asking confirmation and moving XP. Returns true if applied.
function spendXp(label, from, to, costTo) {
  if (to === from) return false;
  if (freeEdit()) return true;
  const xp = xpAvailable();
  if (to > from) {
    const cost = costTo(to);
    if (cost > xp) { alert(t("xp.notEnough").replace("{cost}", cost).replace("{xp}", xp)); return false; }
    const msg = t("xp.confirmRaise").replace("{name}", label).replace("{from}", from).replace("{to}", to)
      .replace("{cost}", cost).replace("{xp}", xp);
    if (!confirm(msg)) return false;
    state.archetype.experience = String(xp - cost);
  } else {
    const refund = costTo.refund(from, to);
    const msg = t("xp.confirmLower").replace("{name}", label).replace("{from}", from).replace("{to}", to).replace("{cost}", refund);
    if (!confirm(msg)) return false;
    state.archetype.experience = String(xp + refund);
  }
  return true;
}
// costTo(level): XP to go from `current` up to `level`; costTo.refund(from, to): XP given back when lowering.
function traitCostFns(factor, current) {
  const costTo = (level) => traitCost(factor, current, level);
  costTo.refund = (from, to) => traitCost(factor, to, from);
  return costTo;
}

function renderXp() {
  document.getElementById("xp").replaceChildren(
    el("label", { class: "xp-field" },
      el("span", { class: "counter-label", text: t("xp.available") }),
      el("input", { type: "number", min: "0", inputmode: "numeric", "data-field": "archetype.experience" }),
      el("span", { class: "counter-label", text: "XP" })),
    el("label", { class: "free-edit" },
      el("input", { type: "checkbox", id: "free-edit",
        onchange: (e) => { state.config.freeEdit = e.target.checked; changed(); } }),
      el("span", { text: t("xp.freeEdit") })),
    el("p", { class: "note", id: "xp-note" }));
}
function updateXp() {
  const box = document.getElementById("xp");
  box.classList.toggle("free", freeEdit());
  box.classList.toggle("empty", !freeEdit() && xpAvailable() <= 0);
  document.getElementById("free-edit").checked = freeEdit();
  document.getElementById("xp-note").textContent = freeEdit() ? t("xp.freeEditHint") : t("xp.hint");
}

/* ---------- Attributes, skills, backgrounds ---------- */

function renderAttributes() {
  const { attributes: attrs, skills, preferred } = state;
  const blocks = ATTRIBUTES.map((a) => {
    const pref = preferred[a.key];
    const attrName = t(`attributes.${a.key}`);
    const attrCost = traitCostFns(XP_FACTOR.attribute(pref), attrs[a.key]);
    const head = el("div", { class: "bar attr-bar" },
      el("button", {
        type: "button", class: "pref" + (pref ? " on" : ""), "aria-pressed": String(pref),
        title: t("xp.preferred"), "aria-label": `${attrName}: ${t("xp.preferred")}`, text: pref ? "★" : "☆",
        onclick: () => { preferred[a.key] = !pref; changed(); },
      }),
      el("h3", { text: attrName }),
      pips({
        value: attrs[a.key], min: 1, limit: affordableLevel(attrs[a.key], TRAIT_MAX, attrCost), label: attrName,
        tip: (i) => (i > attrs[a.key] ? `${attrCost(i)} XP` : null),
        onSet: (v) => { if (spendXp(attrName, attrs[a.key], v, attrCost)) { attrs[a.key] = v; changed(); } },
      }));
    const rows = a.skills.map((s) => {
      const partner = EXCLUSIVE[s];
      const locked = partner && skills[partner] > 0;
      const pool = formatPool(attrs[a.key] + skills[s]);
      const name = t(`skills.${s}`);
      const cost = traitCostFns(XP_FACTOR.skill(pref), skills[s]);
      return el("div", { class: "stat-row" + (locked ? " locked" : "") },
        el("span", { class: "stat-name", text: name,
          title: locked ? `${t("exclusive")} ${t(`skills.${partner}`)}` : null }),
        pips({
          value: skills[s], limit: affordableLevel(skills[s], TRAIT_MAX, cost), disabled: locked, label: name,
          tip: (i) => (i > skills[s] ? `${cost(i)} XP` : null),
          onSet: (v) => { if (spendXp(name, skills[s], v, cost)) { skills[s] = v; changed(); } },
        }),
        el("span", { class: "pool", title: t("pool"), text: locked ? "" : pool }));
    });
    return el("div", { class: "block" + (pref ? " preferred" : "") }, head, ...rows);
  });
  document.getElementById("attributes").replaceChildren(...blocks);
}

function renderBackgrounds() {
  const { backgrounds } = state;
  document.getElementById("backgrounds").replaceChildren(...BACKGROUNDS.map((b) =>
    el("div", { class: "stat-row" },
      el("span", { class: "stat-name", text: t(`backgrounds.${b}`) }),
      pips({ value: backgrounds[b], label: t(`backgrounds.${b}`),
        onSet: (v) => { backgrounds[b] = v; changed(); } }))));
  document.getElementById("infamy").replaceChildren(
    el("span", { class: "stat-name", text: t("fields.infamy") }),
    pips({ value: state.scars.infamy, label: t("fields.infamy"), onSet: (v) => { state.scars.infamy = v; changed(); } }));
}

/* ---------- Condition tracks ---------- */

// Box order: [black = still available][red = lost][white = beyond the character's maximum].
// Clicking a black box marks it and those after it as lost; clicking a red box recovers it and those before it.
function renderTracks() {
  const lost = state.condition.lost;
  const blocks = TRACKS.map((tr) => {
    const max = Math.max(0, Math.min(tr.cap, tr.max(state.attributes, state.skills)));
    lost[tr.key] = Math.min(lost[tr.key], max);
    const n = lost[tr.key];
    const left = max - n;
    const name = t(`tracks.${tr.key}`);
    const set = (v) => { lost[tr.key] = Math.max(0, Math.min(max, v)); changed(); };
    const boxes = el("div", { class: "track-boxes", role: "group", "aria-label": name });
    for (let i = 0; i < tr.cap; i++) {
      const kind = i < left ? "have" : i < max ? "lost" : "none";
      boxes.append(el("button", {
        type: "button", class: `box ${kind}`, disabled: kind === "none",
        "aria-label": `${name} ${i + 1}`, "aria-pressed": String(kind === "lost"),
        onclick: () => set(kind === "have" ? max - i : max - i - 1),
      }));
    }
    const extra = tr.key === "trauma" && n > 0
      ? el("span", { class: "penalty", text: `${t("tracks.traumaPenalty")}: −${n}D` }) : null;
    return el("div", { class: "track" },
      el("div", { class: "track-head" },
        el("h3", { text: name }),
        el("span", { class: "track-count", text: `${left} / ${max}` }),
        extra,
        el("span", { class: "track-actions" },
          el("button", { type: "button", class: "button tiny", title: t("tracks.lose"), "aria-label": `${name}: ${t("tracks.lose")}`, text: "−1", onclick: () => set(n + 1) }),
          el("button", { type: "button", class: "button tiny", title: t("tracks.recover"), "aria-label": `${name}: ${t("tracks.recover")}`, text: "+1", onclick: () => set(n - 1) }),
          el("button", { type: "button", class: "button tiny ghost", text: t("tracks.recoverAll"), onclick: () => set(0) }))),
      boxes);
  });
  const tracks = document.getElementById("tracks");
  tracks.className = `tracks style-${settings.trackStyle}`;
  tracks.replaceChildren(...blocks);
}

/* ---------- Editable lists ---------- */

// Pips living inside editable lists (potentials): redrawn on refresh without rebuilding the list.
const livePips = new Set();
function redrawLivePips() {
  livePips.forEach((draw) => (draw.holder.isConnected ? draw() : livePips.delete(draw)));
}
// Potential levels: XP depends on the sum of all levels (this one included).
function potentialCostFns(current) {
  const others = potentialLevels() - current;
  const costTo = (level) => potentialCost(others + current, level - current);
  costTo.refund = (from, to) => potentialCost(others + to, from - to);
  return costTo;
}

function renderList(id) {
  const def = LISTS[id];
  const items = getPath(state, def.path);
  const container = document.getElementById(id);
  const rows = [];
  if (def.header !== false) {
    rows.push(el("div", { class: "list-row list-header", style: { "--cols": def.cols + " 2rem" } },
      ...def.fields.map((f) => el("span", { text: t(`columns.${f}`) })), el("span")));
  }
  items.forEach((item, index) => {
    const cells = def.fields.map((f) => el("label", { class: `cell cell-${f}` },
      def.header === false ? null : el("span", { class: "cell-label", text: t(`columns.${f}`) }),
      el("input", {
        value: item[f] ?? "", inputmode: (def.numeric || []).includes(f) ? "numeric" : null,
        "aria-label": `${t(`blocks.${id}`)} ${index + 1} ${t(`columns.${f}`)}`,
        oninput: (e) => { item[f] = e.target.value; (def.numeric || []).includes(f) ? changed() : changedText(); },
      })));
    if (def.pips) {
      const holder = el("div", { class: "cell cell-pips" });
      const draw = () => {
        const level = num(item[def.pips.key]);
        const label = item.name || t(`blocks.${id}`);
        const cost = potentialCostFns(level);
        holder.replaceChildren(pips({
          value: level, max: def.pips.max, label: `${label} ${t("columns.level")}`,
          limit: affordableLevel(level, def.pips.max, cost),
          tip: (i) => (i > level ? `${cost(i)} XP` : null),
          onSet: (v) => { if (spendXp(label, level, v, cost)) { item[def.pips.key] = v; changed(); } },
        }));
      };
      draw.holder = holder;
      livePips.add(draw);
      draw();
      cells.push(holder);
    }
    rows.push(el("div", { class: "list-row", style: { "--cols": def.cols + " 2rem" } }, ...cells,
      el("button", { type: "button", class: "remove", title: t("buttons.remove"), "aria-label": t("buttons.remove"), text: "×",
        onclick: () => { items.splice(index, 1); renderList(id); changed(); } })));
  });
  rows.push(el("button", { type: "button", class: "button small add", text: t("buttons.add"),
    onclick: () => {
      const item = {};
      def.fields.forEach((f) => { item[f] = ""; });
      if (def.pips) item[def.pips.key] = 0;
      items.push(item);
      renderList(id);
      const inputs = container.querySelectorAll("input");
      inputs[inputs.length - def.fields.length]?.focus();
      save();
    } }));
  container.replaceChildren(...rows);
}

// The backpack always sits on top of the equipment: fixed Enc, 3 slots at Enc 0.
const BACKPACK_ENC = 1;
function renderBackpack() {
  const bp = state.backpack;
  const node = document.getElementById("backpack");
  if (!node) return; // page and script out of sync (cache): don't break the rest
  node.classList.toggle("off", !bp.carried);
  node.replaceChildren(
    el("div", { class: "backpack-head" },
      el("label", { class: "backpack-name" },
        el("input", { type: "checkbox", checked: bp.carried ? "" : null,
          onchange: (e) => { bp.carried = e.target.checked; renderBackpack(); changed(); } }),
        el("strong", { text: t("backpack.name") })),
      el("span", { class: "backpack-enc", text: `${t("columns.enc")} ${bp.carried ? BACKPACK_ENC : 0}` }),
      el("span", { class: "note", text: t("backpack.note") })),
    ...bp.slots.map((value, i) => el("label", { class: "backpack-slot" },
      el("span", { class: "slot-num", text: `${i + 1}` }),
      el("input", { value, placeholder: t("backpack.empty"), disabled: bp.carried ? null : "",
        "aria-label": `${t("backpack.name")} ${i + 1}`,
        oninput: (e) => { bp.slots[i] = e.target.value; changedText(); } }))));
}

// Everything carried counts: weapons, armor, equipment and the backpack.
function encumbrance() {
  const sum = (list) => list.reduce((s, it) => s + num(it.enc), 0);
  return {
    total: sum(state.weapons) + sum(state.armor) + sum(state.equipment) + (state.backpack.carried ? BACKPACK_ENC : 0),
    limit: state.attributes.body + state.skills.force,
  };
}

const formatPool = (dice) => (dice > MAX_DICE ? `${MAX_DICE}D+${dice - MAX_DICE}` : `${dice}D`);

function tile(label, value, hint, cls = "") {
  return el("div", { class: `tile ${cls}`, title: hint },
    el("span", { class: "tile-label", text: label }),
    el("span", { class: "tile-value", text: value }),
    el("span", { class: "tile-hint", text: hint }));
}

function renderDerived() {
  const { attributes: a, skills: s } = state;
  const pool = (d) => formatPool(a[d.attr] + s[d.skill]);
  const enc = encumbrance();
  const initiative = DERIVED.find((d) => d.key === "initiative");
  const active = DERIVED.filter((d) => d.group === "activeDefense");
  document.getElementById("derived").replaceChildren(
    el("div", { class: "tiles" },
      tile(t("derived.initiative"), pool(initiative), t("derived.initiativeHint")),
      tile(t("derived.encumbrance"), `${enc.total} / ${enc.limit}`, t("derived.encumbranceHint"), enc.total > enc.limit ? "over" : "")),
    el("div", { class: "tile-group" },
      el("span", { class: "tile-group-label", text: t("derived.activeDefense") }),
      el("div", { class: "tiles" }, ...active.map((d) => tile(t(`derived.${d.key}`), pool(d), t(`derived.${d.key}Hint`))))));
}

// Passive defense (Rules summary): base 1, +1 active and standing, +1 moved > 2 m, cover +1 / +4.
function renderPassive() {
  const p = state.condition.passive;
  const value = 1 + (p.standing ? 1 : 0) + (p.moved ? 1 : 0) + (p.cover === "partial" ? 1 : p.cover === "complete" ? 4 : 0);
  const toggle = (label, on, onClick) => el("button", {
    type: "button", class: "chip" + (on ? " on" : ""), "aria-pressed": String(on), text: label, onclick: onClick,
  });
  const setCover = (c) => () => { p.cover = p.cover === c ? "" : c; changed(); };
  document.getElementById("passive").replaceChildren(
    tile(t("derived.passive"), String(value), t("derived.passiveHint"), "tile-passive"),
    el("div", { class: "chips" },
      toggle(t("derived.standing"), p.standing, () => { p.standing = !p.standing; changed(); }),
      toggle(t("derived.moved"), p.moved, () => { p.moved = !p.moved; changed(); }),
      toggle(t("derived.coverPartial"), p.cover === "partial", setCover("partial")),
      toggle(t("derived.coverComplete"), p.cover === "complete", setCover("complete"))));
}

function renderEncumbrance() {
  const { total, limit } = encumbrance();
  const node = document.getElementById("encumbrance");
  node.classList.toggle("over", total > limit);
  node.replaceChildren(
    el("strong", { text: `${t("encumbrance.total")}: ${total}` }),
    el("span", { text: ` / ${limit} ${t("encumbrance.limit")}. ` }),
    el("span", { class: "note", text: t("encumbrance.note") }));
}

/* ---------- Portrait ---------- */

function renderPortrait() {
  const box = document.getElementById("portrait");
  const src = state.other.portrait;
  box.replaceChildren(src && src.startsWith("data:image/")
    ? el("img", { src, alt: t("blocks.portrait") })
    : el("span", { class: "portrait-empty", text: "?" }));
  document.getElementById("portrait-remove").hidden = !src;
}

function loadPortrait(file) {
  if (!file || !file.type.startsWith("image/")) return;
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    const size = 480;
    const scale = Math.min(1, size / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    state.other.portrait = canvas.toDataURL("image/jpeg", 0.85);
    renderPortrait();
    save();
  };
  img.src = url;
}

/* ---------- Bound text fields ---------- */

function bindFields() {
  document.querySelectorAll("[data-field]").forEach((input) => {
    input.value = getPath(state, input.dataset.field) ?? "";
    input.oninput = () => { setPath(state, input.dataset.field, input.value); changedText(); };
  });
}
// Copy state into bound fields (e.g. XP shown in two tabs), except the one being typed in.
function syncFields() {
  document.querySelectorAll("[data-field]").forEach((input) => {
    if (input !== document.activeElement) input.value = getPath(state, input.dataset.field) ?? "";
  });
}

/* ---------- Refresh ---------- */

// After a change affecting numbers: redraw derived parts (no text inputs inside them).
function refresh() {
  renderAttributes();
  renderBackgrounds();
  updateXp();
  syncFields();
  redrawLivePips();
  renderDerived();
  renderPassive();
  renderTracks();
  renderEncumbrance();
  renderSummary();
}
function changed() {
  refresh();
  save();
}
// After typing: same redraw (the redrawn parts contain no text inputs, so focus is kept).
function changedText() {
  refresh();
  save();
}

function renderAll() {
  document.querySelectorAll("[data-text]").forEach((n) => { n.textContent = t(n.dataset.text); });
  document.title = t("appTitle");
  document.getElementById("list-cultures").replaceChildren(...CULTURES.map((c) => el("option", { value: c })));
  document.getElementById("list-cults").replaceChildren(...CULTS.map((c) => el("option", { value: c })));
  renderXp();
  bindFields();
  Object.keys(LISTS).forEach(renderList);
  renderBackpack();
  renderPortrait();
  document.querySelectorAll('input[name="trackStyle"]').forEach((r) => { r.checked = r.value === settings.trackStyle; });
  refresh();
}

// Defaults plus fixes for older saves.
function loadState(data) {
  const s = withDefaults(blankSheet(), data);
  s.backpack.slots = [0, 1, 2].map((i) => String(s.backpack.slots[i] ?? ""));
  s.equipment = s.equipment.filter((it) => !/^backpack$/i.test(String(it.name).trim()));
  return s;
}

function replaceSheet(data) {
  state = loadState(data);
  renderAll();
  save();
}

/* ---------- Settings & data buttons ---------- */

function setupControls() {
  document.querySelectorAll('input[name="trackStyle"]').forEach((r) => {
    r.onchange = () => { settings.trackStyle = r.value; DB.saveSettings(settings); renderTracks(); };
  });
  document.getElementById("portrait-input").onchange = (e) => { loadPortrait(e.target.files[0]); e.target.value = ""; };
  document.getElementById("portrait-remove").onclick = () => { state.other.portrait = ""; renderPortrait(); save(); };

  document.getElementById("btn-export").onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = el("a", { href: URL.createObjectURL(blob), download: `${(state.archetype.name || "character").replace(/[^\w-]+/g, "_")}.json` });
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  document.getElementById("import-input").onchange = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!data || typeof data !== "object" || !data.attributes) throw new Error("invalid");
      replaceSheet(data);
    } catch { alert(t("settings.importError")); }
  };
  document.getElementById("btn-example").onclick = () => {
    if (confirm(t("settings.confirmExample"))) replaceSheet(structuredClone(EXAMPLE_SHEET));
  };
  document.getElementById("btn-reset").onclick = () => {
    if (confirm(t("settings.confirmReset"))) replaceSheet(blankSheet());
  };
}

/* ---------- Start ---------- */

(async function start() {
  const saved = await DB.loadSheet();
  state = loadState(saved || structuredClone(EXAMPLE_SHEET));
  setupControls();
  renderTabs();
  renderAll();
})();
