"use strict";

const getBubbleChartUpperBound = () => { // returns a date with format dd/MM/YYYY
	let currentLocalDate = new Date();
	currentLocalDate.setDate(currentLocalDate.getDate() + 14); // move 14 days to the future to avoid bubbles to overflow at the side of the chart
	let day = currentLocalDate.getDate();
	let month = currentLocalDate.getMonth();
	let year = currentLocalDate.getFullYear();
	return `${year}-${month < 9 ? "0" : ""}${month + 1}-${day < 10 ? "0" : ""}${day}`;
};

