// General items catalog (survival, tools, talismans, medicine...).
// Source: DEGENESIS Rebirth, Katharsys, chapter "Bazaar" (pages in `page`).
// Only names and game values. `effect` is a short note of the game modifier,
// written for this sheet (not text from the book); empty when the item only
// has a narrative use: see the book page.
var CATALOG = window.CATALOG || {};

CATALOG.items = {
  cols: ["name", "group", "effect", "enc", "tech", "value", "res", "cult", "page"],
  rows: [
    // Getting food
    ["Fishing gear", "Getting food", "INS+Survival +1D", "", "I", "5", "", "", 170],
    ["Flask", "Getting food", "Water for (2) days", "", "I", "10", "", "", 170],
    ["Cooking equipment", "Getting food", "", "", "II", "30", "", "", 170],
    ["Water filter", "Getting food", "", "", "III", "120", "", "", 170],

    // Traps (Hidden rating / damage)
    ["Pitfall", "Traps", "Hidden 2C", "", "I", "", "", "", 171],
    ["Tripwire", "Traps", "Hidden 5C", "", "II", "5", "", "", 171],
    ["Bear trap", "Traps", "Hidden 4C, (8) Damage", "1", "II", "30", "", "", 171],
    ["Mine", "Traps", "Hidden 4C", "1", "III", "Special", "", "", 171],

    // Light / fire
    ["Torch", "Light / fire", "Darkness penalty -1D, (30) min", "", "I", "3", "", "", 171],
    ["Lamp oil", "Light / fire", "", "", "II", "10", "", "", 171],
    ["Flint and tinder", "Light / fire", "", "", "I", "20", "", "", 171],
    ["Matches", "Light / fire", "(10) uses", "", "II", "25", "", "", 171],
    ["Oil lamp", "Light / fire", "Darkness penalty -2D, (2) hours", "", "II", "40", "", "", 171],
    ["Lighter", "Light / fire", "", "", "III", "180", "", "", 171],
    ["Sunburst", "Light / fire", "Darkness penalty -2D", "1", "IV", "1200", "2", "Palers", 171],
    ["Cyclops Eye", "Light / fire", "Darkness penalty -2D", "2", "V", "14000", "3", "Palers", 171],

    // Orienteering / tracking
    ["Regional map", "Orienteering", "INS+Orienteering +1D", "", "II", "40", "", "", 171],
    ["Compass", "Orienteering", "INS+Orienteering +1D", "", "III", "220", "", "", 171],
    ["Noumenon Vocalizer", "Orienteering", "", "2", "IV", "2400", "3", "Spitalians", 171],
    ["Gauging material", "Orienteering", "", "", "IV", "600 x Level", "4", "Spitalians", 171],
    ["Tracker", "Orienteering", "Range (100) m", "1", "V", "4400", "4", "Chroniclers", 171],
    ["Binocular", "Orienteering", "INS+Perception +4D (from afar)", "", "IV", "5200", "2", "Hellvetics", 171],
    ["Pathfinder", "Orienteering", "INS+Orienteering +4D", "2", "V", "15000", "4", "Hellvetics", 171],
    ["Transponder bracelet", "Orienteering", "Range (20) m", "", "V", "580", "1", "Hellvetics", 171],
    ["Astrolabe", "Orienteering", "INS+Orienteering +1D", "", "II", "650", "1", "Neolibyans", 171],
    ["Atlas", "Orienteering", "INS+Orienteering +1D x Level (1-3)", "", "II", "1000 x Level", "2/3/4", "Neolibyans", 171],
    ["RG Atlas", "Orienteering", "INS+Orienteering +2D", "", "V", "4500", "3", "Palers", 171],

    // Climbing
    ["10 m of rope", "Climbing", "", "", "II", "60", "", "", 171],
    ["Climbing harness", "Climbing", "With rope: BOD+Athletics +1D", "", "III", "400", "", "", 171],

    // Overnight
    ["Blanket / sleeping bag", "Overnight", "+1 Flesh Wound recovered per night", "2", "I", "10", "", "", 172],
    ["Camo net", "Overnight", "+2C to stay hidden", "2", "II", "60", "", "", 172],
    ["Insect net", "Overnight", "", "2", "II", "80", "", "", 172],
    ["Tent", "Overnight", "", "3", "I", "120", "", "", 172],

    // Transportation (the backpack has its own block on the sheet)
    ["Backpack", "Transportation", "", "1", "I", "15", "", "", 172],
    ["Sleigh", "Transportation", "", "1", "I", "20", "", "", 172],
    ["Carrying rig", "Transportation", "Attached items Enc -1 x Level (1-3)", "", "II", "100 x Level", "1/2/3", "Scrappers", 172],

    // In the shadows
    ["Camo paint", "Shadows", "AGI+Stealth +2D", "", "I", "15", "", "", 172],
    ["Lock pick", "Shadows", "", "", "II", "20", "", "", 172],
    ["Periscope", "Shadows", "AGI+Stealth +2D (difficult terrain)", "1", "II", "100", "2", "Scrappers", 172],
    ["Key ring", "Shadows", "Lock picking: AGI+Dexterity +1D", "", "II", "400", "3", "Apocalyptics", 172],
    ["Sesamite", "Shadows", "Lock picking: AGI+Dexterity +3D", "", "V", "18000", "5", "Palers", 172],

    // Technology
    ["Bugs and surveillance equipment", "Technology", "AGI+Stealth (+2) Successes when placing", "", "IV", "2200", "2", "Spitalians", 172],
    ["Draft printer", "Technology", "", "", "IV", "4000", "2", "Chroniclers", 172],
    ["Stream drones + display", "Technology", "INS+Perception +1D", "", "V", "19000", "6", "Chroniclers", 172],
    ["Forager Uplink", "Technology", "", "2", "V", "33000", "4", "Hellvetics", 172],
    ["Pneumatic metal shears", "Technology", "BOD+Force +4D (metal obstacles)", "3", "IV", "1800", "3", "Scrappers", 172],
    ["Toolkit", "Technology", "AGI+Crafting / AGI+Dexterity +1D x Level (1-3)", "2", "III", "600 x Level", "2/4/6", "Scrappers", 172],
    ["Electronics tools", "Technology", "+1D on electrical devices", "", "IV", "2400", "2", "Palers", 172],
    ["Throwing Pulsor", "Technology", "", "", "V", "6000", "3", "Palers", 172],
    ["Smoke Grenade", "Technology", "-4D to sight Actions, (5) m radius", "", "IV", "80", "2", "Hellvetics", 172],
    ["Shock Grenade", "Technology", "(5) m radius", "", "IV", "110", "2", "Hellvetics, Palers", 172],

    // Sun discs
    ["Phaeton", "Sun discs", "", "1", "V", "18000", "3", "Palers", 172],
    ["Cataract", "Sun discs", "", "1", "V", "12000", "3", "Palers", 172],
    ["Orbital", "Sun discs", "", "1", "V", "22000", "4", "Palers", 172],
    ["Arbiter", "Sun discs", "INT+Artifact Lore +2D", "1", "VI", "44000", "6", "Palers", 172],
    ["Quantum", "Sun discs", "", "1", "V", "9000", "3", "Palers", 172],
    ["Quasar", "Sun discs", "", "1", "V", "38000", "5", "Palers", 172],

    // Chronicler suit modules
    ["Source", "Chronicler suit modules", "", "2", "V", "5000 x Level", "2", "Chroniclers", 173],
    ["Fumor", "Chronicler suit modules", "Passive Defense +1 x Level", "1", "IV", "2500 x Level", "2", "Chroniclers", 173],
    ["Dome of rays", "Chronicler suit modules", "Social interaction +1D x Level (superstition)", "1", "IV", "1000 x Level", "2", "Chroniclers", 173],
    ["Greenlight", "Chronicler suit modules", "", "1", "V", "4000 x Level", "4", "Chroniclers", 173],
    ["Discharge", "Chronicler suit modules", "", "1", "IV", "1000 x Level", "3", "Chroniclers", 173],
    ["Screamer", "Chronicler suit modules", "", "1", "IV", "500", "2", "Chroniclers", 173],
    ["Freon", "Chronicler suit modules", "Attack AGI+Projectiles, Handling +2D", "1", "IV", "2000 x Level", "4", "Chroniclers", 173],

    // Heavy duty modules
    ["Heavyweight", "Heavy duty modules", "BOD+Force +6D, 2 slots", "", "V", "6800", "3", "Hellvetics", 173],
    ["Cutting tool", "Heavy duty modules", "3 slots", "", "IV", "1200", "2", "Hellvetics", 173],
    ["Cooling aggregate", "Heavy duty modules", "1 slot", "", "V", "5000", "4", "Hellvetics", 173],
    ["Arc welder", "Heavy duty modules", "3 slots", "", "IV", "2000", "3", "Hellvetics", 173],
    ["Tunnel Driller", "Heavy duty modules", "3 slots", "", "IV", "1000", "2", "Hellvetics", 173],

    // Talismans / insignia
    ["Codex", "Talismans", "+1 Ego Point (1 Round of meditation)", "", "II", "300", "", "Judges", 174],
    ["Codex, Special Edition", "Talismans", "+1 Ego Point (meditation); CHA+Expression +2D", "", "II", "800", "3", "Judges", 174],
    ["Judgment tools", "Talismans", "", "", "II", "40", "1", "Judges", 174],
    ["Clan tattoos", "Talismans", "PSY+Faith/Willpower +1D", "", "I", "150", "1", "Clanners", 174],
    ["Body paint", "Talismans", "PSY+Faith/Willpower +2D", "", "I", "30", "1", "Clanners", 174],
    ["Anubis mask", "Talismans", "Social interactions with Africans +1D", "", "I", "200", "", "Anubians", 174],
    ["Anubis finger", "Talismans", "", "", "I", "9000", "", "Anubians", 174],
    ["Soul stones", "Talismans", "Social interaction with believers +1D", "", "I", "800", "1", "Anubians", 174],
    ["Scourger mask", "Talismans", "Mental attacks: PSY+Faith/Willpower +2D", "", "I", "140", "1", "Scourgers", 174],
    ["Balancer", "Talismans", "", "", "II", "500", "1", "Neolibyans", 174],
    ["Balancer: pocket calculator", "Talismans", "Math: INT+Engineering +4D", "", "IV", "20000", "3", "Neolibyans", 174],
    ["Balancer: lock", "Talismans", "Lock picking AGI+Dexterity (5)", "", "III", "4000", "2", "Neolibyans", 174],
    ["Balancer: trap", "Talismans", "Poison Potency (5)", "", "III", "8000", "2", "Neolibyans", 174],
    ["Apocalyptic Tarot", "Talismans", "Raven: CHA+Leadership +1D", "", "II", "560", "", "Apocalyptics", 174],
    ["Icons", "Talismans", "+2D to the foreseen Action", "2", "I", "200", "", "Jehammedans", 174],
    ["Jehammed's Teachings", "Talismans", "Social interactions within the Cult +2D", "", "II", "2000", "3", "Jehammedans", 174],
    ["Jehammed's Will / Aries's Blessing", "Talismans", "Social interactions within the Cult +4D", "", "II", "6000", "5", "Jehammedans", 174],
    ["Seal stone", "Talismans", "Authority (+1)", "", "I", "300", "2", "Jehammedans", 174],
    ["Jehammed's Star", "Talismans", "Saraeli: Renown (+2)", "", "I", "90", "", "Jehammedans", 174],
    ["Grim sun", "Talismans", "Mental defense: PSY+Faith/Willpower +1D", "", "II", "190", "1", "Palers", 174],

    // Communication
    ["Radio", "Communication", "Range (5) km", "1", "IV", "1500", "", "", 174],
    ["Portable Uplink", "Communication", "INT+Legends +2D, INT+Engineering +1D", "3", "IV", "3500", "6", "Chroniclers", 174],
    ["Radio Backpack", "Communication", "Range (200) km", "3", "IV", "6000", "3", "Hellvetics", 174],

    // Gas masks (+1 Success per level vs spores, germs, toxins)
    ["Breathing cloth", "Gas masks", "Level 1: +1S", "", "I", "5", "", "", 174],
    ["Charcoal absorber", "Gas masks", "Level 2: +2S", "", "III", "200", "", "", 174],
    ["Breathing apparatus", "Gas masks", "Level 3: +3S, oxygen for (1) hour", "2", "IV", "600", "", "", 174],

    // Spitalian agents
    ["SP 4016TH", "Agents", "Poisoned (4C, -2D, 1 day)", "", "IV", "50", "2", "Spitalians", 166],
    ["Pheromone marker", "Agents", "", "", "IV", "30", "3", "Spitalians", 166],
    ["Irritant", "Agents", "Poisoned (5C, -3D)", "", "IV", "70", "3", "Spitalians", 166],
    ["EX-Aerosol / EG-1", "Agents", "", "", "V", "1500", "6", "Spitalians", 166],
    ["Fire dust", "Agents", "Fire damage (8)", "", "IV", "80", "3", "Spitalians", 166],
    ["Black band", "Agents", "Narcotic (6C, 6 Ego)", "", "IV", "600", "5", "Spitalians", 166],
    ["Chlorine gas", "Agents", "Poisoned (5C, 1 Trauma per Round)", "", "III", "120", "4", "Spitalians", 166],

    // Medical equipment
    ["Bandage", "Medical", "Recover (1) Flesh Wound right after the wound", "", "I", "10", "", "", 183],
    ["Field kit", "Medical", "INT+Medicine +2D, (5) doses", "1", "III", "250", "2", "Spitalians", 183],
    ["Apothecarium", "Medical", "INT+Science +1S x Level, (10) doses", "1", "IV", "2500 x Level", "4/5/6", "Spitalians", 183],
    ["Surgical tools (medical)", "Medical", "Treating Trauma: INT+Medicine +1D x Level", "1", "III", "1000 x Level", "3/4/5", "Spitalians", 183],
    ["Sequencer", "Medical", "(+2) Potency on the target", "1", "V", "4500", "5", "Spitalians", 183],
    ["Crucible", "Medical", "INT+Science +1D", "", "I", "150", "2", "Anubians", 183],

    // Pharmaceutics
    ["Distillate, 1 l", "Pharmaceutics", "", "", "I", "20", "", "", 184],
    ["Healing herbs", "Pharmaceutics", "INT+Medicine +1D, (1) dose", "", "I", "30", "", "", 184],
    ["Antidote", "Pharmaceutics", "Resistance to poison +2D x Level", "", "III", "100 x Level", "3/4/5", "Spitalians", 184],
    ["Stimulants", "Pharmaceutics", "PSY+Reaction +1D x Level", "", "III", "200 x Level", "4/5/6", "Spitalians", 184],
    ["Pain killers", "Pharmaceutics", "Trauma penalty -2 x Level", "", "III", "200 x Level", "4/5/6", "Spitalians", 184],
    ["Narcotics", "Pharmaceutics", "Surgeon: INT+Medicine +1D x Level", "", "III", "300 x Level", "4/5/6", "Spitalians", 184],
    ["Antibiotics", "Pharmaceutics", "Resistance to bacterial infections +2S x Level", "", "III", "100 x Level", "3/4/5", "Spitalians", 184],
    ["EX", "Pharmaceutics", "Spore infestation -1D", "", "IV", "200", "2", "Spitalians", 184],
    ["Duat Blood", "Pharmaceutics", "Resistance rolls +1S x Level", "", "", "300 x Level", "1/2/3", "Anubians", 184],
    ["Duat fruit", "Pharmaceutics", "", "", "", "200 x Level", "1/2/3", "Anubians", 184],
    ["Marduk oil", "Pharmaceutics", "Vs pheromantic influence +4S, (1) hour", "", "", "400", "", "Anubians", 184],
    ["Blood of Aries", "Pharmaceutics", "Regenerate (1) Flesh Wound per hour; addictive", "", "VI", "3000", "6", "Jehammedans", 184],

    // Elysian oils (effects last (4) hours unless noted)
    ["Perat", "Elysian oils", "PSY+Faith/Willpower, INS+Perception +1D x Level", "", "II", "50 x Level", "1/2/3", "Anabaptists", 185],
    ["Hiddekel", "Elysian oils", "INS+Primal, PSY+Reaction +1D x Level", "", "II", "100 x Level", "2/3/4", "Anabaptists", 185],
    ["Gehon", "Elysian oils", "INT+Focus +1D x Level, Trauma penalty -1D x Level", "", "II", "100 x Level", "2/3/4", "Anabaptists", 185],
    ["Pischon", "Elysian oils", "CHA+Expression, PSY+Faith +1D x Level", "", "II", "1000 x Level", "4/5/6", "Anabaptists", 185],
    ["Styx", "Elysian oils", "", "", "II", "200", "5", "Anabaptists", 185],
    ["Acheron", "Elysian oils", "", "", "II", "200", "5", "Anabaptists", 185],
  ],
};
