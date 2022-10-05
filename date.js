"use strict";

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
