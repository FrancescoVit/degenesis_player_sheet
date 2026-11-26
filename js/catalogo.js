// Read-only view of the catalogs in data/*.js, with search and Cult filter.
// Text from the data goes only through textContent.

const t = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), TEXT) ?? path;

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else if (v != null && v !== false) node.setAttribute(k, v);
  });
  children.flat().forEach((c) => c != null && node.append(c));
  return node;
}

const CULTS = ["Anabaptists", "Anubians", "Apocalyptics", "Chroniclers", "Clanners", "Hellvetics",
  "Jehammedans", "Judges", "Neolibyans", "Palers", "Scourgers", "Scrappers", "Spitalians"];

// Columns shown per catalog (keys of the data, label path).
const VIEWS = {
  weapons: [["name", "columns.name"], ["group", "catalog.group"], ["caliber", "catalog.caliber"], ["handling", "columns.handling"],
    ["distance", "columns.distance"], ["damage", "columns.damage"], ["mag", "columns.mag"], ["properties", "columns.properties"],
    ["enc", "columns.enc"], ["tech", "columns.tech"], ["slots", "columns.slots"], ["value", "catalog.value"],
    ["res", "catalog.res"], ["cult", "catalog.cult"], ["page", "catalog.page"]],
  armor: [["name", "columns.name"], ["group", "catalog.group"], ["armor", "columns.armor"], ["properties", "columns.properties"],
    ["enc", "columns.enc"], ["tech", "columns.tech"], ["slots", "columns.slots"], ["value", "catalog.value"],
    ["res", "catalog.res"], ["cult", "catalog.cult"], ["page", "catalog.page"]],
  items: [["name", "columns.name"], ["group", "catalog.group"], ["effect", "catalog.effect"], ["enc", "columns.enc"],
    ["tech", "columns.tech"], ["value", "catalog.value"], ["res", "catalog.res"], ["cult", "catalog.cult"], ["page", "catalog.page"]],
  potentials: [["name", "columns.name"], ["cult", "catalog.cult"], ["prerequisite", "catalog.prerequisite"], ["page", "catalog.page"]],
};

const rowsOf = (key) => {
  const c = (window.CATALOG || {})[key];
  return c ? c.rows.map((r) => Object.fromEntries(c.cols.map((k, i) => [k, r[i]]))) : [];
};

let current = location.hash.slice(1) in VIEWS ? location.hash.slice(1) : "weapons";

function draw() {
  const query = document.getElementById("cat-search").value.trim().toLowerCase();
  const cult = document.getElementById("cat-cult").value;
  const cols = VIEWS[current];
  const rows = rowsOf(current).filter((r) => {
    // Cult filter: that Cult's items plus the ones anyone can have.
    if (cult && r.cult && !String(r.cult).split(",").some((c) => c.trim() === cult)) return false;
    return !query || cols.some(([k]) => String(r[k] ?? "").toLowerCase().includes(query));
  });
  document.getElementById("cat-note").textContent = current === "potentials" ? t("catalog.potentialsNote") : "";
  const head = el("tr", {}, ...cols.map(([, label]) => el("th", { text: t(label) })));
  const body = rows.map((r) => el("tr", {}, ...cols.map(([k]) => {
    let v = r[k] ?? "";
    if (k === "cult" && !v) v = current === "potentials" ? t("catalog.common") : "";
    return el("td", { class: `c-${k}`, text: String(v) });
  })));
  document.getElementById("cat-table").replaceChildren(rows.length
    ? el("table", {}, el("thead", {}, head), el("tbody", {}, ...body))
    : el("p", { class: "note", text: t("catalog.empty") }));
  document.querySelectorAll("#tabs button").forEach((b) => { b.classList.toggle("active", b.dataset.key === current); b.setAttribute("aria-selected", String(b.dataset.key === current)); });
}

function init() {
  document.querySelectorAll("[data-text]").forEach((n) => { n.textContent = t(n.dataset.text); });
  document.title = t("catalog.title");
  document.getElementById("tabs").replaceChildren(...Object.keys(VIEWS).map((key) =>
    el("button", { type: "button", role: "tab", class: "tab", "data-key": key, text: t(`catalog.${key}`),
      onclick: () => { current = key; history.replaceState(null, "", `#${key}`); draw(); } })));
  document.getElementById("cat-cult").replaceChildren(
    el("option", { value: "", text: t("catalog.allCults") }), ...CULTS.map((c) => el("option", { value: c, text: c })));
  document.getElementById("cat-search").addEventListener("input", draw);
  document.getElementById("cat-cult").addEventListener("change", draw);
  draw();
}

init();
