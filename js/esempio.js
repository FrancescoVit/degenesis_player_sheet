// Example character used to preview the draft (from the group's sheet "Bash").
const EXAMPLE_SHEET = {
  archetype: {
    name: "Bash", age: "40", rank: "Agent (2)", experience: "", legacy: "",
    sex: "M", height: "175", weight: "90", money: "43",
    culture: "Franka", concept: "The Traveler", cult: "Chroniclers",
  },
  attributes: { body: 3, agility: 3, charisma: 2, intellect: 3, psyche: 3, instinct: 2 },
  skills: {
    athletics: 0, brawl: 0, force: 2, melee: 2, stamina: 0, toughness: 1,
    crafting: 1, dexterity: 1, navigation: 0, mobility: 0, projectiles: 2, stealth: 1,
    arts: 0, conduct: 0, expression: 0, leadership: 0, negotiation: 0, seduction: 0,
    artifactLore: 2, engineering: 1, focus: 1, legends: 2, medicine: 0, science: 1,
    cunning: 0, deception: 2, domination: 2, faith: 0, reaction: 1, willpower: 2,
    empathy: 0, orienteering: 1, perception: 2, primal: 0, survival: 1, taming: 0,
  },
  backgrounds: { allies: 0, authority: 0, network: 2, renown: 0, resources: 1, secrets: 1 },
  potentials: [{ name: "Fractal Memory", level: 1 }],
  scars: { groupName: "", alignment: "", constellation: "", scarsValue: "", infamy: 0 },
  condition: {
    lost: { ego: 0, spore: 0, flesh: 0, trauma: 0 },
    passive: { standing: false, moved: false, cover: "" },
    modifiers: [], complications: [],
  },
  weapons: [
    { name: "Knife", handling: "+1D", distance: "1", damage: "2+F/3", mag: "", properties: "Smooth Running (2T)", enc: "1", tech: "II", slots: "1" },
    { name: "Bow", handling: "-1D", distance: "10 / 40", damage: "6+F/3", mag: "1", properties: "", enc: "1", tech: "I", slots: "2" },
    { name: "Vocoder", handling: "", distance: "10", damage: "", mag: "120", properties: "Area Damage (45°), Dazed (1), Thunder Strike", enc: "1", tech: "IV", slots: "" },
  ],
  armor: [{ name: "Fur Cape", armor: "1", properties: "", enc: "1", tech: "I", slots: "" }],
  equipment: [
    { name: "Flask", enc: "" }, { name: "Torch", enc: "" }, { name: "Flint and Tinder", enc: "" },
    { name: "Blanket / Sleeping Bag", enc: "2" }, { name: "Backpack", enc: "1" }, { name: "Bandage", enc: "" },
  ],
  artifacts: [],
  other: { visuals: [], relationships: [], portrait: "" },
  config: { attrPoints: "16", skillPoints: "28", backgroundPoints: "4", attrMax: 6, skillMax: 6, backgroundMax: 6 },
};
