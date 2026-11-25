// All interface labels. English for the draft; an Italian file (testi-it.js)
// with the same keys can replace this one later.
const TEXT = {
  appTitle: "DEGENESIS — Character Sheet",

  tabs: {
    archetype: "Archetype",
    stats: "Attributes & Condition",
    arsenal: "Arsenal",
    possessions: "Possessions",
    other: "Altro",
  },

  summary: { name: "Name", money: "Drafts", cult: "Cult", unnamed: "(no name)" },

  sections: {
    archetype: "Archetype",
    origins: "Culture · Concept · Cult",
    attributes: "Attributes & Skills",
    advantages: "Advantages",
    condition: "Condition",
    arsenal: "Arsenal",
    possessions: "Possessions",
    profile: "Profile",
    settings: "Settings & data",
  },

  fields: {
    name: "Name", age: "Age", rank: "Rank", experience: "Experience",
    legacy: "Legacy", sex: "Sex", height: "Height", weight: "Weight",
    money: "Drafts / Dinars", culture: "Culture", concept: "Concept", cult: "Cult",
    groupName: "Group name", alignment: "Alignment", constellation: "Constellation",
    scarsValue: "Scars value", infamy: "Infamy",
  },

  attributes: {
    body: "Body", agility: "Agility", charisma: "Charisma",
    intellect: "Intellect", psyche: "Psyche", instinct: "Instinct",
  },

  skills: {
    athletics: "Athletics", brawl: "Brawl", force: "Force", melee: "Melee", stamina: "Stamina", toughness: "Toughness",
    crafting: "Crafting", dexterity: "Dexterity", navigation: "Navigation", mobility: "Mobility", projectiles: "Projectiles", stealth: "Stealth",
    arts: "Arts", conduct: "Conduct", expression: "Expression", leadership: "Leadership", negotiation: "Negotiation", seduction: "Seduction",
    artifactLore: "Artifact Lore", engineering: "Engineering", focus: "Focus", legends: "Legends", medicine: "Medicine", science: "Science",
    cunning: "Cunning", deception: "Deception", domination: "Domination", faith: "Faith", reaction: "Reaction", willpower: "Willpower",
    empathy: "Empathy", orienteering: "Orienteering", perception: "Perception", primal: "Primal", survival: "Survival", taming: "Taming",
  },

  backgrounds: {
    allies: "Allies", authority: "Authority", network: "Network",
    renown: "Renown", resources: "Resources", secrets: "Secrets",
  },

  blocks: {
    backgrounds: "Backgrounds", potentials: "Potentials", scars: "Scars",
    modifiers: "Modifiers", complications: "Complications",
    weapons: "Weapons", armor: "Armor", equipment: "Equipment", artifacts: "Artifacts",
    visuals: "Visuals", portrait: "Portrait", relationships: "Relationships",
  },

  xp: {
    available: "Experience available",
    freeEdit: "Free editing (no XP)",
    hint: "Raising a trait spends XP after confirmation (Katharsys p. 102). Attributes: new level × 10 if preferred (★), × 12 otherwise. Skills: new level × 4 if their attribute is preferred, × 5 otherwise. Potentials: (all potential levels + 1) × 10. Lowering refunds the XP.",
    freeEditHint: "Free editing is on: pips change without spending XP. Use it to create a character or fix mistakes, then turn it off.",
    preferred: "Preferred attribute (cheaper XP). Rules: Focus → INT, AGI, PSY; Primal → BOD, CHA, INS.",
    skillSum: "Sum of skill levels",
    notEnough: "Not enough experience: {cost} XP needed, {xp} XP available.",
    confirmRaise: "Raise {name} from {from} to {to} for {cost} XP?\n(available: {xp} XP)",
    confirmLower: "Lower {name} from {from} to {to} and refund {cost} XP?",
  },

  exclusive: "Excludes",
  pool: "Dice pool (attribute + skill). Over 12D the excess becomes automatic successes.",

  tracks: {
    ego: "Ego", spore: "Spore Infestations", flesh: "Fleshwounds", trauma: "Trauma",
    recoverAll: "Recover all", lost: "lost", left: "left",
    traumaPenalty: "Trauma penalty",
    lose: "Lose one", recover: "Recover one",
  },

  derived: {
    initiative: "Initiative", initiativeHint: "PSY + Reaction",
    dodge: "Dodge", dodgeHint: "AGI + Mobility",
    counterBrawl: "Counter (Brawl)", counterBrawlHint: "BOD + Brawl",
    counterMelee: "Counter (Melee)", counterMeleeHint: "BOD + Melee",
    activeDefense: "Active defense",
    encumbrance: "Encumbrance", encumbranceHint: "carried / limit (BOD + Force)",
    passive: "Passive defense", passiveHint: "Base 1 + situation",
    standing: "Active & standing +1", moved: "Moved > 2 m +1",
    coverPartial: "Partial cover +1", coverComplete: "Complete cover +4",
  },

  columns: {
    name: "Name", handling: "Handling", distance: "Distance", damage: "Damage", mag: "Mag",
    properties: "Properties", enc: "Enc.", tech: "Tech", slots: "Slots", armor: "Armor value",
    activation: "Activation", operation: "Operation", value: "Appraisal value",
    text: "", mod: "Mod.", level: "Level",
  },

  encumbrance: {
    total: "Total encumbrance", limit: "limit (Body + Force)",
    note: "Weapons + armor + equipment. −1D per point over the limit.",
  },

  buttons: {
    add: "+ Add", remove: "Remove", exportJson: "Export JSON", importJson: "Import JSON",
    loadExample: "Load example (Bash)", reset: "Empty sheet",
    uploadPortrait: "Choose image", removePortrait: "Remove image",
  },

  settings: {
    trackStyle: "Lost boxes style", styleRed: "Red fill", styleCross: "Crossed (X)",
    storageNote: "Draft: data is saved only in this browser (localStorage).",
    confirmReset: "Empty the whole sheet? This cannot be undone (export first if needed).",
    confirmExample: "Replace the current sheet with the example character?",
    importError: "This file is not a valid character sheet.",
  },

  saved: "Saved",
};
