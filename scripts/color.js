"use strict";

const colorScheme = [
	"#ff6384",
	"#ff9f40",
	"#efdd56",
	"#2cc02c",
	"#36a2eb",
	"#9966ff"
];

const buildColorGradient = gradientLength => {
	let colorGradientProportions = [];
	for (let colorIndex in colorScheme) {
		colorGradientProportions[colorIndex] = colorIndex / (colorScheme.length - 1);
	}
	let gradient = [];
	for (let gradientIndex = 0; gradientIndex < gradientLength; gradientIndex++) {
		let gradientProportion = gradientIndex / (gradientLength - 1);
		let nextColorIndex = colorGradientProportions.findIndex(position => position >= gradientProportion);
		let nextColor = colorScheme[nextColorIndex];
		let nextColorProportion = colorGradientProportions[nextColorIndex];
		if (gradientProportion === nextColorProportion) {
			gradient.push(nextColor);
		} else {
			let previousColorProportion = colorGradientProportions[nextColorIndex - 1];
			let previousColor = colorScheme[nextColorIndex - 1];
			gradient.push(computeWeightedColor(previousColor, nextColorProportion - gradientProportion,
				nextColor, gradientProportion - previousColorProportion));
		}
	}
	return gradient;
};

const computeWeightedColor = (firstColor, firstWeight, secondColor, secondWeight) => {
	let totalWeight = firstWeight + secondWeight;
	return "#"
		+ Math.floor((parseInt(firstColor.substring(1, 3), 16) * firstWeight
			+ parseInt(secondColor.substring(1, 3), 16) * secondWeight) / totalWeight).toString(16)
		+ Math.floor((parseInt(firstColor.substring(3, 5), 16) * firstWeight
			+ parseInt(secondColor.substring(3, 5), 16) * secondWeight) / totalWeight).toString(16)
		+ Math.floor((parseInt(firstColor.substring(5, 7), 16) * firstWeight
			+ parseInt(secondColor.substring(5, 7), 16) * secondWeight) / totalWeight).toString(16);
};
