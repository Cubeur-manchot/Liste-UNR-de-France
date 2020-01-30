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
	let monthString, dayString, year, month, dateOfMonth, day;
	year = inputDate.getFullYear();
	month = inputDate.getMonth();
	dateOfMonth = inputDate.getDate();
	day = inputDate.getDay();
	switch (month) {
		case 0: monthString = "janvier"; break;
		case 1: monthString = "février"; break;
		case 2: monthString = "mars"; break;
		case 3: monthString = "avril"; break;
		case 4: monthString = "mai"; break;
		case 5: monthString = "juin"; break;
		case 6: monthString = "juillet"; break;
		case 7: monthString = "août"; break;
		case 8: monthString = "septembre"; break;
		case 9: monthString = "octobre"; break;
		case 10: monthString = "novembre"; break;
		default: monthString = "décembre"; break;
	}
	switch (day) {
		case 0: dayString = "dimanche"; break;
		case 1: dayString = "lundi"; break;
		case 2: dayString = "mardi"; break;
		case 3: dayString = "mercredi"; break;
		case 4: dayString = "jeudi"; break;
		case 5: dayString = "vendredi"; break;
		default: dayString = "samedi"; break;
	}
	return dayString + " " + dateOfMonth + " " + monthString + " " + year;
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
		b: firstColorObject.b + secondColorObject.b,
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
