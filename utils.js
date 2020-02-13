"use strict";

function sectionNameToId(inputName) // transform a section name to id format
{
	let outputId = inputName;
	while (outputId.includes(" ")) { // replace every space by underscore
		outputId = outputId.replace(" ", "-");
	}
	while (outputId.includes(",")) { // delete every comma
		outputId = outputId.replace(",", "_");
	}
	return outputId;
}

function sectionIdToName(inputId) // transform back a section id to original name
{
	let outputName = inputId;
	while (outputName.includes("-")) { // replace every space by underscore
		outputName = outputName.replace("-", " ");
	}
	while (outputName.includes("_")) { // delete every comma
		outputName = outputName.replace("_", ",");
	}
	return outputName;
}

function stringToDate(inputString) // build a Date object from a string of the form "yyyy-mm-dd"
{
	if (inputString === "") {
		return new Date(0);
	} else {
		return new Date(inputString.substring(0, 4), inputString.substring(5, 7) - 1, inputString.substring(8, 10)); // months are in [0..11] in Date objects
	}
}

function dateToString(inputDate) // build a displayable string from a Date object
{
	return addZeroIfSmallerThanTen(inputDate.getDate()) + "/" + addZeroIfSmallerThanTen(inputDate.getMonth() + 1) + "/" + inputDate.getFullYear();
}

function addZeroIfSmallerThanTen(inputNumber) // if a number is on one character, add a zero at the beginning
{
	if (inputNumber < 10) {
		return "0" + inputNumber;
	} else {
		return inputNumber;
	}
}

function getBeginOfWeek(inputDate) // return the Date object corresponding to the begin of the week of the input date
{
	let dayOfWeek = inputDate.getDay();
	if (dayOfWeek === 0) { // sunday
		dayOfWeek = 7; // weeks begin on monday
	}
	return new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate() - dayOfWeek + 1);
}

function listToArray(inputString) // convert a string of the form "a, b, c" to an array of the form ["a", "b", "c"]
{
	let outputArray = [], listString = inputString, indexOfComma;
	if (listString === "" || listString === null) { // if the list is empty, return an empty array
		return outputArray;
	}
	while (listString.includes(", ")) // else there are at least 1 element, we cut at every ", "
	{
		indexOfComma = listString.indexOf(", ");
		outputArray.push(listString.substring(0, indexOfComma));
		listString = listString.substring(indexOfComma + 2, 1000);
	}
	outputArray.push(listString); // insert last element
	return outputArray;
}

function multiplyColor(colorObject, number) // multiply an {r, g, b} color object by a number n
{
	return {
		r: Math.round(colorObject.r * number),
		g: Math.round(colorObject.g * number),
		b: Math.round(colorObject.b * number)
	};
}

function addColors(firstColorObject, secondColorObject) // add two {r, g, b} color objects
{
	return {
		r: firstColorObject.r + secondColorObject.r,
		g: firstColorObject.g + secondColorObject.g,
		b: firstColorObject.b + secondColorObject.b
	};
}

function substractColors(firstColorObject, secondColorObject) // substract two {r, g, b} color objects
{
	return addColors(firstColorObject, multiplyColor(secondColorObject, -1));
}

function rgbFromColorObject(colorObject) // transform an object of the form {r: r, g: g, b: b} to a string of the form "rgb(r,g,b)"
{
	return "rgb(" + colorObject.r + "," + colorObject.g + "," + colorObject.b + ")";
}
