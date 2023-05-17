"use strict";

const pagePlans = {
	noWca: [
		{
			id: "bigCubes",
			fr: "Big cubes", en: "Big cubes",
			events: ["8x8x8", "9x9x9", "10x10x10", "11x11x11", "12x12x12", "13x13x13"]
		},
		{
			id: "blindfolded",
			fr: "Blindfolded", en: "Blindfolded",
			events: ["3x3x3 Blindfolded", "4x4x4 Blindfolded", "5x5x5 Blindfolded",
				"6x6x6 Blindfolded", "7x7x7 Blindfolded", "8x8x8 Blindfolded", "9x9x9 Blindfolded",
				"Megaminx Blindfolded", "Square One Blindfolded", "Clock Blindfolded",
				"Relay 2-5 Blindfolded", "Relay 2-6 Blindfolded", "3x3x3 Multi-Blindfolded"]
		},
		{
			id: "dodecahedrons",
			fr: "Dodécaèdres", en: "Dodecahedrons",
			events: ["Kilominx", "Masterkilominx", "Gigaminx"]
		},
		{
			id: "shapeMods",
			fr: "Shape Mods de cubes NxNxN", en: "NxNxN cubes Shape Mods",
			events: ["Mirror", "Inequilateral", "Penrose", "Ghost", "Mastermorphix", "Megamorphix", "Molecube"]
		},
		{
			id: "cubeVariations",
			fr: "Variations de cubes NxNxN", en: "NxNxN cubes Variations",
			events: ["3x3x3 Virtual cube", "4x4x4 One-Handed", "4x4x4 Fewest Moves"]
		},
		{
			id: "teamAndRelays",
			fr: "Team, Relais", en: "Team, Relays",
			events: ["Mini-Guilford Solo", "Mini-Guilford Duo", "Relay WCA 17 events",
				"Team Blind", "Team Solve Duo", "2-man 3x3x3 Blindfolded relay"]
		}
	]
};

const groupLabels = pagePlans.noWca.map(group => group.en);
