// Weapons, armor and shields catalog.
// Source: DEGENESIS Rebirth, Katharsys, chapter "Bazaar" (pages in `page`).
// Only names and game values are listed: no descriptions or other text from the books.
// "-" in the book = empty here. Qualities are listed by name only (rules in the book).
var CATALOG = window.CATALOG || {};

CATALOG.weapons = {
  cols: ["name", "group", "caliber", "handling", "distance", "damage", "mag", "properties", "enc", "tech", "slots", "value", "res", "cult", "page"],
  rows: [
    // Brawl (BOD+Brawl)
    ["Bite", "Brawl", "", "-3D", "1", "F/3", "", "", "", "I", "", "", "", "", 162],
    ["Kick", "Brawl", "", "+1D", "1", "", "", "Dazed (F/2)", "", "I", "", "", "", "", 162],
    ["Blow", "Brawl", "", "+2D", "1", "", "", "Dazed (F/3), Smooth Running (2T)", "", "I", "", "", "", "", 162],
    ["Brass Knuckles", "Brawl", "", "+2D", "1", "1+F/2", "", "Blunt, Smooth Running (3T)", "", "II", "1", "10", "", "", 162],
    ["Streamer Glove", "Brawl", "", "+2D", "1", "", "30", "Dazed (5)", "", "IV", "1", "4200", "3", "Chroniclers", 162],
    ["Blade Bracelet", "Brawl", "", "+2D", "1", "2+F/2", "", "Smooth Running (2T), Camo (4S)", "", "II", "1", "40", "1", "Apocalyptics", 162],

    // Armed melee (BOD+Melee)
    ["Butt stock", "Melee", "", "", "1", "F/3", "", "Blunt", "", "III", "", "", "", "", 163],
    ["Flail", "Melee", "", "-1D", "2", "2+F/3", "", "Blunt, Talisman (+1D) for Anabaptists", "2", "I", "1", "5", "", "", 163],
    ["Pitchfork", "Melee", "", "", "2", "2+F/3", "", "Talisman (+1D) for Anabaptists", "2", "I", "1", "5", "", "", 163],
    ["Shard dagger", "Melee", "", "", "1", "4+F/3", "", "Fragile", "1", "I", "1", "5", "", "", 163],
    ["Club", "Melee", "", "", "1", "2+F/2", "", "Blunt", "3", "I", "2", "20", "", "", 163],
    ["Stiletto", "Melee", "", "", "1", "2+F/3", "", "Smooth Running (2T)", "1", "II", "1", "25", "", "", 163],
    ["Grapple", "Melee", "", "-1D", "3", "2+F/3", "", "", "2", "II", "1", "30", "", "", 163],
    ["Chain of blades", "Melee", "", "-2D", "3", "3+F/3", "", "Out of Control (3)", "2", "II", "1", "40", "", "", 163],
    ["Knife", "Melee", "", "+1D", "1", "2+F/3", "", "Smooth Running (2T)", "1", "II", "1", "40", "", "", 163],
    ["Spade", "Melee", "", "", "1", "3+F/3", "", "", "2", "II", "2", "40", "", "", 163],
    ["Hand axe", "Melee", "", "", "1", "4+F/3", "", "", "1", "II", "1", "50", "", "", 163],
    ["Spear", "Melee", "", "", "2", "4+F/3", "", "", "2", "I", "1", "50", "", "", 163],
    ["Stone axe", "Melee", "", "-2D", "1", "3+F/2", "", "Blunt", "3", "I", "1", "120", "", "", 163],
    ["Sledgehammer", "Melee", "", "-2D", "1", "F", "", "Blunt, Impact (3T)", "4", "II", "1", "280", "", "", 163],
    ["Riding Pick", "Melee", "", "", "1", "5+F/2", "", "", "1", "II", "2", "300", "", "", 163],
    ["Mace", "Melee", "", "", "1", "4+F/2", "", "Blunt", "2", "II", "1", "350", "", "", 163],
    ["Morning star", "Melee", "", "-1D", "1", "5+F/2", "", "Blunt", "2", "II", "2", "400", "", "", 163],
    ["Pickaxe", "Melee", "", "-3D", "1", "1+F", "", "Impact (3T)", "4", "II", "1", "450", "", "", 163],
    ["Saber", "Melee", "", "", "1", "6+F/3", "", "", "1", "II", "2", "600", "", "", 163],
    ["Sword", "Melee", "", "", "1", "6+F/3", "", "", "2", "II", "2", "600", "", "", 163],
    ["Battle axe", "Melee", "", "-2D", "2", "6+F/2", "", "Impact (2T)", "3", "II", "2", "750", "", "", 163],
    ["Splayer", "Melee", "", "-1D", "2", "4+F/3", "", "Cutting (2T, +1D damage)", "3", "IV", "2", "2800", "", "Spitalians", 163],
    ["Surgical tools", "Melee", "", "", "1", "3+F/3", "", "", "1", "III", "1", "1000 x Level", "3/4/5", "Spitalians", 163],
    ["Injector Gun", "Melee", "", "", "1", "", "", "Special, Piercing (4)", "1", "IV", "1", "1400", "4", "Spitalians", 163],
    ["Preservalis Sword", "Melee", "", "", "1", "7+F/2", "", "", "2", "III", "2", "1800", "", "Spitalians", 163],
    ["Shocker", "Melee", "", "", "1", "", "16", "Dazed (8)", "1", "IV", "1", "2400", "3", "Chroniclers", 163],
    ["Judgment Hammer", "Melee", "", "-2D", "1", "1+F", "", "Blunt, Impact (3T)", "3", "III", "2", "1500", "", "Judges", 163],
    ["Crusher", "Melee", "", "-2D", "1", "2+F/2", "", "Blunt", "3", "I", "6", "600", "1", "Scrappers", 163],
    ["Iron Club of the Cockroach Kings", "Melee", "", "-3D", "2", "2+F", "", "Blunt, Impact (3T)", "5", "I", "2", "300", "Unique", "Clanners", 163],
    ["Khopesh", "Melee", "", "", "1", "6+F/2", "", "Special Damage (Psychonauts, +2)", "2", "II", "2", "1800", "3", "Anubians", 163],
    ["Ammit Sickle", "Melee", "", "", "1", "7+F/2", "", "Special Damage (Psychonauts, +3)", "2", "II", "2", "3200", "6", "Anubians", 163],
    ["Curved dagger", "Melee", "", "+1D", "1", "2+F/3", "", "Special", "1", "II", "2", "180", "3", "Neolibyans", 163],
    ["Ancestor spear", "Melee", "", "", "2", "4+F/3", "", "Talisman (+2D)", "2", "I", "2", "500", "", "Scourgers", 163],
    ["Scourge", "Melee", "", "-2D", "3", "3+F/3", "22", "Dazed (8), Out of Control (3)", "1", "IV", "2", "1900", "2", "Scourgers", 163],
    ["Scimitar", "Melee", "", "", "1", "6+F/3", "", "", "2", "II", "1", "600", "3", "Jehammedans", 163],
    ["Ram staff", "Melee", "", "-2D", "2", "F/3", "", "Blunt, Standard (Attacks +1D)", "3", "I", "1", "3300", "4", "Jehammedans", 163],
    ["Horn", "Melee", "", "+1D", "1", "9+F/3", "", "", "1", "V", "", "24000", "6", "Jehammedans", 163],
    ["Damascene Saber", "Melee", "", "", "1", "7+F/3", "", "", "2", "III", "2", "2800", "5", "Jehammedans", 163],
    ["Koumaya dagger", "Melee", "", "+1D", "1", "2+F/3", "", "", "1", "II", "1", "50", "1", "Apocalyptics", 163],
    ["Steel cotters", "Melee", "", "", "1", "", "", "Special, Piercing (2)", "1", "II", "", "5", "1", "Apocalyptics", 163],
    ["Ibis staff", "Melee", "", "-2D", "2", "F/3", "", "Fragile", "2", "I", "1", "220", "", "Apocalyptics", 163],
    ["Flyssa", "Melee", "", "", "1", "7+F/3", "", "", "2", "II", "2", "1600", "3", "Apocalyptics", 163],
    ["Warflail", "Melee", "", "-1D", "2", "2+F/2", "", "Blunt, Talisman (+1D)", "3", "I", "1", "30", "1", "Anabaptists", 163],
    ["Bidenhander", "Melee", "", "-2D", "2", "8+F/3", "", "Impact (2T), Special", "3", "II", "2", "1400", "2", "Anabaptists", 163],

    // Thrown weapons (AGI+Projectiles)
    ["Stone", "Thrown", "", "", "5 / 30", "F/2", "1", "Blunt", "1", "I", "", "", "", "", 164],
    ["Sling", "Thrown", "", "-1D", "5 / 15", "2+F/3", "1", "Blunt", "1", "I", "1", "5", "", "", 164],
    ["Bola", "Thrown", "", "-2D", "3 / 10", "F/3", "1", "Entangled (-3D), Out of Control", "1", "I", "", "20", "", "", 164],
    ["Shuriken", "Thrown", "", "", "3 / 10", "2+F/2", "1", "", "1", "I", "", "20", "", "", 164],
    ["Net", "Thrown", "", "-2D", "2 / 5", "", "1", "Entangled (-5D)", "1", "II", "", "30", "", "", 164],
    ["Throwing knife", "Thrown", "", "", "3 / 10", "3+F/3", "1", "", "1", "II", "1", "40", "", "", 164],
    ["Harpoon", "Thrown", "", "", "5 / 15", "F", "1", "", "2", "II", "1", "50", "", "", 164],
    ["Atlatl", "Thrown", "", "-1D", "10 / 30", "3+F/2", "1", "", "2", "I", "1", "50", "", "", 164],
    ["Throwing axe", "Thrown", "", "", "3 / 10", "3+F/2", "1", "", "1", "II", "1", "50", "", "", 164],

    // Projectiles (AGI+Projectiles)
    ["Blow gun", "Projectiles", "Nails", "", "3 / 12", "4", "1", "", "", "I", "1", "30", "", "", 164],
    ["Bow", "Projectiles", "Arrows", "-1D", "10 / 40", "6+F/3", "1", "", "1", "I", "2", "200", "", "", 164],
    ["Crossbow", "Projectiles", "Bolt", "", "15 / 60", "10", "1", "", "3", "II", "1", "400", "", "", 164],
    ["Heavy Crossbow", "Projectiles", "Bolt", "-2D", "20 / 80", "12", "1", "", "4", "II", "2", "800", "", "", 164],
    ["Composite bow", "Projectiles", "Arrows", "", "15 / 60", "8+F/3", "1", "", "1", "IV", "2", "2000", "", "", 164],
    ["Repeating Crossbow", "Projectiles", "Bolt", "", "15 / 60", "10", "4", "", "2", "III", "2", "2000", "", "", 164],
    ["Harpoon Crossbow", "Projectiles", "Harpoon", "-2D", "10 / 40", "8", "1", "", "4", "II", "1", "600", "2", "Apocalyptics", 164],

    // Handguns (AGI+Projectiles)
    ["Signal Pistol", "Handguns", "Special", "", "15 / 60", "5", "1", "Fire Hazardous", "1", "IV", "2", "900", "", "", 164],
    ["Pistol", "Handguns", "9mm", "", "10 / 40", "9", "12", "", "1", "III", "1", "1200", "", "", 164],
    ["Revolver", "Handguns", ".44", "", "10 / 40", "10", "6", "", "1", "III", "1", "1200", "", "", 164],
    ["Automatic Pistol", "Handguns", "4.6x30 mm", "", "10 / 40", "7", "20", "Smooth Running (3T)", "1", "IV", "2", "2500", "", "", 164],
    ["Heavy Pistol", "Handguns", ".50 GL", "", "10 / 40", "12", "12", "Thunder Strike", "1", "IV", "2", "2800", "", "", 164],
    ["Stubbed Trailblazer (HF-full jacket)", "Handguns", "HF-full jacket", "", "15 / 60", "11", "20", "Smooth Running (2T)", "2", "V", "2", "14000", "4", "Hellvetics", 164],
    ["Stubbed Trailblazer (HF-hollow point)", "Handguns", "HF-hollow point", "", "15 / 60", "14", "20", "Smooth Running (2T)", "2", "V", "2", "14000", "4", "Hellvetics", 164],
    ["Flintlock Pistol", "Handguns", "Lead bullets", "", "5 / 20", "8", "1", "Muzzle Loader", "1", "III", "1", "300", "2", "Judges", 164],
    ["Grinder", "Handguns", "Black powder", "", "5 / 20", "8", "1", "Muzzle Loader, Scatter", "2", "III", "2", "600", "4", "Scrappers", 164],
    ["Submachine Gun", "Handguns", "4.6x30 mm", "", "10 / 40", "7", "35", "Smooth Running (2T), Salvoes (3)", "2", "IV", "2", "3500", "3", "Palers", 164],

    // Rifles (AGI+Projectiles)
    ["Hunting rifle", "Rifles", ".357", "", "30 / 120", "6", "4", "", "2", "IV", "2", "900", "", "", 165],
    ["Shotgun", "Rifles", "Cal. 12 Buckshot", "", "5 / 20", "10", "2", "Scatter, Double Barreled", "2", "IV", "2", "1500", "", "", 165],
    ["Pumpgun", "Rifles", "Cal. 12", "", "5 / 40", "10", "4", "", "2", "IV", "2", "2000", "", "", 165],
    ["Sniper rifle", "Rifles", "5.56x45mm", "", "50 / 400", "11", "6", "Sensitive", "3", "IV", "2", "4000", "", "", 165],
    ["Light MG", "Rifles", "5.56x45mm", "-1D", "30 / 80", "11", "Belt", "Salvoes (4), Jamming", "4", "IV", "2", "5000", "", "", 165],
    ["Fungicide Rifle", "Rifles", "Cartridges", "", "2 / 8", "Special", "Special", "", "2", "IV", "2", "2300", "2", "Spitalians", 165],
    ["Trailblazer (HF-full jacket)", "Rifles", "HF-full jacket", "", "30 / 120", "11", "35", "Smooth Running (3T), Salvoes (3)", "2", "IV", "2", "18000", "", "Hellvetics", 165],
    ["Trailblazer (HF-hollow point)", "Rifles", "HF-hollow point", "", "30 / 120", "14", "35", "Smooth Running (3T), Salvoes (3)", "2", "IV", "2", "18000", "", "Hellvetics", 165],
    ["Trailblazer (Buckshot)", "Rifles", "Buckshot", "", "10 / 40", "10", "3", "Scatter", "2", "IV", "2", "18000", "", "Hellvetics", 165],
    ["Judges' musket", "Rifles", "Lead bullet", "", "10 / 40", "8", "1", "Muzzle Loader", "2", "III", "2", "900", "2", "Judges", 165],
    ["Marvel", "Rifles", "Lead bullet", "", "10 / 40", "8", "1", "Muzzle Loader", "2", "III", "6", "1400", "1", "Scrappers", 165],
    ["Assault rifle", "Rifles", "5.56x45mm", "", "30 / 120", "11", "30", "Salvoes (3)", "2", "IV", "1", "12000", "2", "Scourgers", 165],
    ["Hunting rifle (Neolibyan)", "Rifles", ".357", "+1D", "30 / 120", "6", "4", "Special", "2", "IV", "2", "1800", "3", "Neolibyans", 165],
    ["Masterpiece rifle", "Rifles", ".50GL", "+2D", "50 / 400", "12", "4", "Thunder Strike", "2", "IV", "1", "14000", "5", "Neolibyans", 165],
    ["Sagur-72", "Rifles", "5x30 mm Caseless", "+2D", "30 / 120", "8", "35", "Smooth Running (2T), Salvoes (3)", "2", "V", "", "27000", "", "RG", 165],
    ["Flechette rifle", "Rifles", "Flechettes", "+2D", "30 / 120", "13", "60", "Smooth Running (1T), Salvoes (5)", "2", "V", "", "32000", "", "RG", 165],
    ["Soul burner", "Rifles", "E-Cube", "+2D", "50 / 400", "16", "15", "Biometrically Encoded, Fatal, Terrifying (4)", "2", "VI", "", "56000", "", "Free Spirit", 165],

    // Heavy weapons (AGI+Projectiles)
    ["Grenade launcher", "Heavy weapons", "Grenades", "-2D", "20 / 60", "Special", "1", "Deviation", "2", "IV", "2", "1900", "", "", 165],
    ["Rocket launcher", "Heavy weapons", "Missile", "-2D", "20 / 60", "15", "1", "Armor Piercing, Explosive", "4", "IV", "2", "4200", "", "", 165],
    ["Heavy MG", "Heavy weapons", "5.56x45mm", "-2D", "50 / 200", "11", "Belt", "Salvoes (10), Jamming", "6", "IV", "2", "8000", "", "", 165],
    ["Cartridge launcher", "Heavy weapons", "Cartridges", "-2D", "20 / 60", "Special", "4", "Deviation", "3", "IV", "2", "2800", "3", "Spitalians", 165],
    ["Pneumo Hammer", "Heavy weapons", "Bolt / Coal", "-2D", "10 / 30", "10", "12", "Thunder Strike, Special", "3", "III", "2", "1500", "", "Clanners", 165],
    ["Spitfire", "Heavy weapons", "Petro", "-2D", "3 / 10", "12", "15", "Fire Hazardous, Special", "3", "III", "2", "3800", "3", "Anabaptists", 165],

    // Explosives
    ["Black powder", "Explosives", "", "", "", "10", "1", "Thunder Strike, Explosive", "1", "II", "", "100", "", "", 165],
    ["TNT", "Explosives", "", "", "", "14", "1", "Thunder Strike, Explosive", "1", "III", "", "300", "", "", 165],
    ["Explosives", "Explosives", "", "", "", "16", "1", "Thunder Strike, Explosive", "1", "IV", "", "800", "3", "Hellvetics", 165],
    ["Explosive bottles", "Explosives", "", "", "", "6", "1", "Fire Hazardous, Explosive, Special", "1", "II", "", "60", "1", "Jehammedans", 165],

    // Sonic weapons (combo INT+Engineering and PSY+Domination)
    ["Vocoder", "Sonic", "E-Cube", "", "10", "1+T Ego", "", "Thunder Strike, Area Damage (45°)", "1", "IV", "", "1500", "1", "Chroniclers", 166],
    ["Cascader", "Sonic", "4x E-Cube", "", "10", "1+T Trauma", "8", "Thunder Strike, Area Damage (45°)", "2", "IV", "", "6000", "5", "Chroniclers", 166],
  ],
};

// Attack roll per weapon group.
CATALOG.weaponSkills = {
  Brawl: "BOD+Brawl", Melee: "BOD+Melee", Thrown: "AGI+Projectiles", Projectiles: "AGI+Projectiles",
  Handguns: "AGI+Projectiles", Rifles: "AGI+Projectiles", "Heavy weapons": "AGI+Projectiles",
  Explosives: "", Sonic: "INT+Engineering & PSY+Domination",
};

CATALOG.armor = {
  cols: ["name", "group", "armor", "properties", "enc", "tech", "slots", "value", "res", "cult", "page"],
  rows: [
    ["Salted clothing", "Armor", "1", "Unstable (4)", "1", "I", "", "20", "", "", 169],
    ["Fur cape", "Armor", "1", "", "1", "I", "", "40", "", "", 169],
    ["Mammoth hide wrap", "Armor", "2", "", "2", "I", "", "100", "", "", 169],
    ["Leather coat", "Armor", "2", "", "2", "I", "2", "120", "", "", 169],
    ["Leather armor", "Armor", "3", "", "2", "II", "2", "320", "", "", 169],
    ["Chain mail", "Armor", "4", "", "3", "II", "1", "400", "", "", 169],
    ["Rubber harness", "Armor", "4", "Insulated", "3", "II", "2", "650", "", "", 169],
    ["Scrapper armor", "Armor", "4", "Unstable (6)", "3", "II", "6", "700", "", "", 169],
    ["Reinforced metal plate armor", "Armor", "5", "Massive (7)", "4", "II", "2", "750", "", "", 169],
    ["Kevlar jacket", "Armor", "4", "Bulletproof (7)", "2", "III", "1", "1400", "", "", 169],
    ["AMSUMO casing", "Armor", "8", "Massive (10)", "3", "V", "1", "9000", "", "", 169],
    ["Spitalian suit", "Armor", "2", "Sealed (+4S), Respected (Patients, +1D)", "2", "III", "2", "300", "2", "Spitalians", 169],
    ["Hygienist suit", "Armor", "2", "Sealed (+6S)", "3", "III", "3", "900", "3", "Spitalians", 169],
    ["Preservist variety", "Armor", "3", "Sealed (+4S)", "3", "III", "2", "800", "4", "Spitalians", 169],
    ["Chroniclers' suit", "Armor", "2", "First Impression (+1D)", "1", "IV", "2", "300", "2", "Chroniclers", 169],
    ["Harness", "Armor", "5", "Fire Resistant (8)", "3", "IV", "2", "4800", "", "Hellvetics", 169],
    ["Spotter Harness", "Armor", "3", "Camo (5C)", "2", "IV", "2", "3500", "3", "Hellvetics", 169],
    ["Heavy Duty Harness", "Armor", "7", "Massive (9), Fire Resistant (8)", "4", "V", "3", "8000", "4", "Hellvetics", 169],
    ["Judge's hat and coat", "Armor", "2", "", "2", "II", "2", "180", "1", "Judges", 169],
    ["Druschinnik silk armor", "Armor", "3", "", "1", "III", "", "600", "4", "Clanners", 169],
    ["Flak jacket and helmet", "Armor", "4", "", "1", "IV", "1", "1600", "2", "Scourgers", 169],
    ["Flak jacket and lion helmet", "Armor", "4", "", "2", "IV", "1", "1600", "", "Scourgers", 169],
    ["Ram helmet (Arianoi)", "Armor", "1", "Terrifying (3)", "1", "I", "", "100", "1", "Jehammedans", 169],
    ["Black fleece (Arianoi)", "Armor", "3", "Fire Resistant (8), Insulated, Terrifying (5)", "1", "VI", "", "16000", "6", "Jehammedans", 169],
    ["Ceramic fiber weave", "Armor", "5", "Bulletproof (8), Sealed (+1S)", "2", "V", "1", "22000", "", "RG", 169],
    ["Composite armor", "Armor", "6", "Bulletproof (9)", "2", "V", "1", "28000", "", "RG", 169],
    ["Graph combat suit", "Armor", "7", "Bulletproof (10), Sealed (+2S)", "3", "VI", "", "60000", "", "Free Spirit", 169],
    // Shields: no armor rating; defense bonus / passive defense and attack penalty in the properties.
    ["Sheet metal shield", "Shields", "", "Defense +1D/0, Attack -1D", "1", "II", "", "40", "", "", 169],
    ["Plastic shield", "Shields", "", "Defense +2D/0, Attack -1D", "1", "III", "", "220", "", "", 169],
    ["Oval shield", "Shields", "", "Defense +2D/+1, Attack -1D", "2", "II", "", "250", "1", "Scourgers", 169],
    ["Tunnel Shield", "Shields", "", "Defense +4D/+2, Attack -2D", "3", "IV", "", "450", "2", "Hellvetics", 169],
  ],
};
