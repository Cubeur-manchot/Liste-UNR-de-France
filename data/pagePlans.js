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
			events: ["3x3x3 Blindfolded", "4x4x4 Blindfolded", "5x5x5 Blindfolded", "6x6x6 Blindfolded", 
				"Clock Blindfolded", "3x3x3 Blindfolded One-Handed"
			]
		},
		{
			id: "dodecahedrons",
			fr: "Dodécaèdres", en: "Dodecahedrons",
			events: ["Kilominx", "Masterkilominx", "Gigaminx"]
		},
		{
			id: "otherPuzzles",
			fr: "Autres puzzles", en: "Other puzzles",
			events: ["Mirror", "Mastermorphix", "Megamorphix", "Gigamorphix", "Molecube", "Face Turning Octahedron"]
		},
		{
			id: "cubeVariations",
			fr: "Variations de cubes NxNxN", en: "NxNxN cubes Variations",
			events: ["3x3x3 Virtual cube", "4x4x4 One-Handed", "4x4x4 Fewest Moves", "5x5x5 One-Handed"]
		},
		{
			id: "teamAndRelays",
			fr: "Team, Relais", en: "Team, Relays",
			events: ["Mini-Guilford Solo", "Mini-Guilford Duo", "Team Blind"]
		}
	]
};

const groupLabels = pagePlans.noWca.map(group => group.en);
