// Potentials catalog: names, Cult and prerequisites only (descriptions are in the book).
// Source: DEGENESIS Rebirth, Katharsys: Cult potentials in each Cult chapter,
// common potentials (open to everyone) on pages 98–99.
// cult "" = common potential. Clanners have no Cult potentials in the book.
// A character can learn the common potentials and those of their own Cult.
var CATALOG = window.CATALOG || {};

CATALOG.potentials = {
  maxLevel: 3,
  cols: ["name", "cult", "prerequisite", "page"],
  rows: [
    // Common
    ["Asceticism", "", "", 98],
    ["Brainwave", "", "", 98],
    ["Elephant Skin", "", "", 98],
    ["Ether Call", "", "", 98],
    ["Moving Mountains", "", "", 98],
    ["Danger Sense", "", "", 98],
    ["Could Be Worse", "", "", 99],
    ["Marathon", "", "", 99],
    ["Number Cruncher", "", "INT 4", 99],
    ["Sleek", "", "", 99],
    ["Unyielding", "", "Willpower", 99],

    // Spitalians
    ["Kranzler's Teachings", "Spitalians", "Focus", 49],
    ["Last Bastion", "Spitalians", "", 49],
    ["Phalanx", "Spitalians", "", 49],
    ["Preservalis", "Spitalians", "Preservist", 49],
    ["Splaying", "Spitalians", "", 49],
    ["The Last Farewell", "Spitalians", "Primal", 49],

    // Chroniclers
    ["Dead End", "Chroniclers", "", 53],
    ["Download", "Chroniclers", "", 53],
    ["Fractal Memory", "Chroniclers", "", 53],
    ["Nova", "Chroniclers", "Primal", 53],
    ["Tesla", "Chroniclers", "", 53],
    ["Upload", "Chroniclers", "", 53],

    // Hellvetics
    ["Assault", "Hellvetics", "Primal", 57],
    ["Discipline", "Hellvetics", "Focus", 57],
    ["Forced March", "Hellvetics", "", 57],
    ["Infiltration", "Hellvetics", "", 57],
    ["Morale", "Hellvetics", "", 57],
    ["Shield Wall", "Hellvetics", "", 57],

    // Judges
    ["Fiat Lux", "Judges", "Renown 4", 61],
    ["Hammer Blow", "Judges", "", 61],
    ["Janus Face", "Judges", "", 61],
    ["Lynch Law", "Judges", "", 61],
    ["Stampede", "Judges", "", 61],
    ["Steel Thunder", "Judges", "", 61],

    // Scrappers
    ["Darwin", "Scrappers", "", 69],
    ["Nitro", "Scrappers", "Primal", 69],
    ["Rat", "Scrappers", "PSY+Cunning 6", 69],
    ["The Mob", "Scrappers", "", 69],
    ["Tough Dog", "Scrappers", "BOD+Toughness 6", 69],
    ["Truffle Pig", "Scrappers", "", 69],

    // Neolibyans
    ["At Eye Level", "Neolibyans", "", 73],
    ["Inspiration", "Neolibyans", "", 73],
    ["Lion's Share", "Neolibyans", "", 73],
    ["Marksman", "Neolibyans", "Focus", 73],
    ["Nine Lives", "Neolibyans", "", 73],
    ["Wheel of Fortune", "Neolibyans", "", 73],

    // Scourgers
    ["Elder Blood", "Scourgers", "PSY+Faith 8", 77],
    ["Hyena's Laughter", "Scourgers", "", 77],
    ["Simba's Prey", "Scourgers", "Focus", 77],
    ["The Lion's Revenge", "Scourgers", "Primal", 77],
    ["Trial of the Hero", "Scourgers", "", 77],
    ["Wild Dog Run", "Scourgers", "", 77],

    // Anubians
    ["Ammit's Feast", "Anubians", "Primal", 81],
    ["Eye of Horus", "Anubians", "", 81],
    ["Gaze of Fate", "Anubians", "Focus", 81],
    ["Mercy of Anubis", "Anubians", "", 81],
    ["Navel of Nefertem", "Anubians", "", 81],
    ["Sekhmet's Slumber", "Anubians", "", 81],

    // Jehammedans
    ["Call of Jehammed", "Jehammedans", "", 85],
    ["Fleece of Aries", "Jehammedans", "Arianoi; black fleece", 85],
    ["Iconide's Blessing", "Jehammedans", "Iconide or Oracle rank", 85],
    ["Iconide's Curse", "Jehammedans", "Iconide or Oracle rank", 85],
    ["Ire of Jehammed", "Jehammedans", "Faith", 85],
    ["Oracle", "Jehammedans", "Oracle rank", 85],

    // Apocalyptics
    ["1,000 Ways", "Apocalyptics", "Melee only", 89],
    ["All-In", "Apocalyptics", "", 89],
    ["Black Omen", "Apocalyptics", "", 89],
    ["Card of Destiny", "Apocalyptics", "Faith; Raven, Albatross or Buzzard", 89],
    ["Crow's Nest", "Apocalyptics", "Primal", 89],
    ["Mirror", "Apocalyptics", "Focus", 89],

    // Anabaptists
    ["Fisherman's Blood", "Anabaptists", "Primal", 93],
    ["Killing Joke", "Anabaptists", "", 93],
    ["Pneuma", "Anabaptists", "Focus", 93],
    ["Realm of Emanations", "Anabaptists", "PSY+Faith 8", 93],
    ["Torchbearer", "Anabaptists", "At least Elysian or Furor", 93],
    ["Zealot", "Anabaptists", "", 93],

    // Palers
    ["Alias", "Palers", "", 97],
    ["Chosen", "Palers", "Halo", 97],
    ["Lament", "Palers", "Primal", 97],
    ["Midnight Sun", "Palers", "Focus", 97],
    ["Nightmare", "Palers", "", 97],
    ["Suggestor", "Palers", "Demagogue", 97],
  ],
};
