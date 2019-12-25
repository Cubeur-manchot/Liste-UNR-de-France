"use strict";

// import functions from tagCreator.js
/* global createHtmlTag, createHtmlTagWithTextContent, createHtmlTagWithClassNameAndTextContent */

// import functions from utils.js
/* global dateToString */

// import functions from Chart.js (local version)
/* global Chart */

function buildStatistics() // compute the statistics and build the tables displaying them
{
	countRecords();
	computeTopXLongestShortestStandingRecordEvents(5);
	buildPalmaresSection();
	buildTopXLongestStandingRecordsTable();
	buildTopXShortestStandingRecordsTable();
}

function countRecords()
{
	let namesArray = [], countArray = [], namesWithMinimumCountArray, dataBaseObject, name, minimumCount;
	window.countingArray = {names: [], counts: []};
	// count records in database
	for (dataBaseObject of window.bruteRecordsDataBase) {
		for (name of listOfNamesToUpdateFromNameString(dataBaseObject.name)) {
			if (countArray[name] === undefined) {
				countArray[name] = 1;
				namesArray.push(name);
			} else {
				countArray[name]++;
			}
		}
	}
	// sort persons by count and stores them in window.countingArray
	while (namesArray.length !== 0) {
		minimumCount = 1000;
		namesWithMinimumCountArray = [];
		for (name of namesArray) { // find the persons that have the smallest UNR count
			if (countArray[name] < minimumCount) { // if the person has a smallest UNR count than the current minimum, update this minimum with the new value
				minimumCount = countArray[name];
				namesWithMinimumCountArray = [name];
			} else if (countArray[name] === minimumCount) { // if the person has the same UNR count than the current minimum, add the name to the list
				namesWithMinimumCountArray.push(name);
			}
		}
		window.countingArray.names = namesWithMinimumCountArray.concat(window.countingArray.names);
		window.countingArray.counts = Array(namesWithMinimumCountArray.length).fill(minimumCount).concat(window.countingArray.counts);
		namesArray = namesArray.filter(function(name) { return countArray[name] !== minimumCount; }); // remove names with minimum count
	}
}

function listOfNamesToUpdateFromNameString(inputNamesList) // convert a string of the form "firstPerson + secondPerson" to an array of the form ["firstPerson", "secondPerson"]
{
	let indexOfPlus, namesList = inputNamesList, arrayOfNamesToUpdate = [];
	if (inputNamesList === "") { // if list is empty, return empty array
		return arrayOfNamesToUpdate;
	}
	// if inputNamesList has no " + " (like "singlePerson"), it returns a 1-element array (["singlePerson"])
	while(namesList.includes(" + ")) { // split for each +
		indexOfPlus = namesList.indexOf(" + ");
		arrayOfNamesToUpdate.push(namesList.substring(0, indexOfPlus));
		namesList = namesList.substring(indexOfPlus + 3, 1000);
	}
	arrayOfNamesToUpdate.push(namesList); // add the last part of the string
	return arrayOfNamesToUpdate;
}

function computeTopXLongestShortestStandingRecordEvents(nbEvents) // compute statistics on longest standing and shortest standing records
{
	let dateSortedRecordArray = sortDataBaseByDate();
	window.topXLongestStandingRecordsEvents = aggregateFirstByDate(dateSortedRecordArray, nbEvents, "longestStanding");
	window.topXLongestStandingRecordsEvents[0].listOfAvgTypeAndTimePairs.shift(); // remove initial value because it appears twice
	window.topXShortestStandingRecordsEvents = aggregateFirstByDate(dateSortedRecordArray.reverse(), nbEvents, "shortestStanding");
	window.topXShortestStandingRecordsEvents[0].listOfAvgTypeAndTimePairs.pop(); // remove initial value because it appears twice
}

function sortDataBaseByDate() // sort window.bruteDataBase by date and remove empty records
{
	let dateSortedRecordArray = [], dataBaseObject, date, nullDate = new Date(0), arrayIndex, arraySorted;
	for (dataBaseObject of window.bruteRecordsDataBase) {
		date = dataBaseObject.date;
		if (date > nullDate) {
			dateSortedRecordArray.push({eventName: dataBaseObject.eventName, avgType: dataBaseObject.avgType, name: dataBaseObject.name, time: dataBaseObject.time, date: date});
			arrayIndex = dateSortedRecordArray.length - 1;
			arraySorted = false;
			while (!arraySorted && arrayIndex !== 0 ) {
				if (date < dateSortedRecordArray[arrayIndex - 1].date) {
					dateSortedRecordArray[arrayIndex] = dateSortedRecordArray[arrayIndex - 1];
					dateSortedRecordArray[arrayIndex - 1] = dataBaseObject;
					arrayIndex--;
				} else {
					arraySorted = true;
				}
			}
		}
	}
	return dateSortedRecordArray;
}

function aggregateFirstByDate(dateSortedRecordArray, nbElements, mode) // aggregate dataBase elements when they have the same event, person name and date
{
	let aggregatedArray = [], lastElement, recordObject, rank;
	lastElement = {
		rank: 1,
		date: dateSortedRecordArray[0].date,
		eventName: dateSortedRecordArray[0].eventName,
		name: dateSortedRecordArray[0].name,
		listOfAvgTypeAndTimePairs: [{avgType: dateSortedRecordArray[0].avgType, time: dateSortedRecordArray[0].time}]
	};
	aggregatedArray.push(lastElement);
	for (recordObject of dateSortedRecordArray) {
		if (recordObject.date.getTime() === lastElement.date.getTime() && recordObject.eventName === lastElement.eventName && recordObject.name === lastElement.name) {
			// correspondance found, just agregate to last element of the array
			if (mode === "longestStanding") { // agregating with normal order
				aggregatedArray[aggregatedArray.length - 1].listOfAvgTypeAndTimePairs.push({avgType: recordObject.avgType, time: recordObject.time});
			} else { // agregating with reverse order
				aggregatedArray[aggregatedArray.length - 1].listOfAvgTypeAndTimePairs.unshift({avgType: recordObject.avgType, time: recordObject.time});
			}
		} else {
			// no correspondance found, add new element to the array if it's not full
			if (aggregatedArray.length < nbElements || lastElement.date.getTime() === recordObject.date.getTime()) { // array is not full or there is a date equality, add new element
				if (recordObject.date.getTime() === lastElement.date.getTime()) { // date equality, rank is the same as the previous one
					rank = lastElement.rank;
				} else { // no date equality, rank is equal to the number of previous elements + 1
					rank = aggregatedArray.length + 1;
				}
				lastElement = {
					rank: rank,
					date: recordObject.date,
					eventName: recordObject.eventName,
					name: recordObject.name,
					listOfAvgTypeAndTimePairs: [{avgType: recordObject.avgType, time: recordObject.time}]
				};
				aggregatedArray.push(lastElement);
			} else { // array is full and the date is not equal to the previous one, agregation is finished
				return aggregatedArray;
			}
		}
	}
	return aggregatedArray; // return by security
}

function rgbFromColorObject(colorObject) // transform an object of the form {r: r, g: g, b: b} to a string of the form "rgb(r,g,b)"
{
	return "rgb(" + colorObject.r + "," + colorObject.g + "," + colorObject.b + ")";
}

function buildPalmaresSection() // build the bar graphic of UNR count
{
	window.gradientBackgroundColors = [{r:255,g:224,b:230}, {r:255,g:236,b:217}, {r:255,g:245,b:221}, {r:219,g:242,b:242}, {r:215,g:236,b:251}, {r:235,g:224,b:255}];
	window.gradientBorderColors = [{r:255,g:134,b:160}, {r:255,g:160,b:67}, {r:255,g:205,b:88}, {r:78,g:193,b:193}, {r:57,g:163,b:235}, {r:154,g:104,b:255}];
	buildHistogram();
	buildDoughnut();
}

function buildDoughnut()
{
	let context = document.getElementById("palmaresDoughnut").getContext("2d");
	let backgroundColors = [];
	let borderColors = [];
	let nbPersons = window.countingArray.counts.length; // number of data
	let nbColorsForGradient = window.gradientBackgroundColors.length; // number of given colors to create gradient
	let nbGradientParts = nbColorsForGradient - 1; // number of linear interpolations to do
	let gradientLength = Math.floor((nbPersons - 1)/nbGradientParts); // length of a linear interpolation (including starting point)
	let nbBiggerGradients = (nbPersons - nbColorsForGradient) % nbGradientParts; // number of gradients of length gradientLength + 1 instead of gradientLength
	let i, j, gradientSize, previousBackgroundColor, nextBackgroundColor, previousBorderColor, nextBorderColor;
	for (i = 0; i < nbGradientParts; i++) {
		previousBackgroundColor = window.gradientBackgroundColors[i];
		nextBackgroundColor = window.gradientBackgroundColors[i+1];
		previousBorderColor = window.gradientBorderColors[i];
		nextBorderColor = window.gradientBorderColors[i+1];

		// interpolate until next fixed color
		gradientSize = gradientLength + (i < nbBiggerGradients); // interpolation is of length 1 bigger if it's in the nbBiggerGradients first ones
		for (j = 0; j < gradientSize; j++) {
			backgroundColors.push(rgbFromColorObject({
				r: Math.round(previousBackgroundColor.r + (nextBackgroundColor.r - previousBackgroundColor.r) * j / gradientSize),
				g : Math.round(previousBackgroundColor.g + (nextBackgroundColor.g - previousBackgroundColor.g) * j / gradientSize),
				b : Math.round(previousBackgroundColor.b + (nextBackgroundColor.b - previousBackgroundColor.b) * j / gradientSize)
			}));
			borderColors.push(rgbFromColorObject({
				r: Math.round(previousBorderColor.r + (nextBorderColor.r - previousBorderColor.r) * j / gradientSize),
				g : Math.round(previousBorderColor.g + (nextBorderColor.g - previousBorderColor.g) * j / gradientSize),
				b : Math.round(previousBorderColor.b + (nextBorderColor.b - previousBorderColor.b) * j / gradientSize)
			}));
		}
	}
	backgroundColors.push(rgbFromColorObject(window.gradientBackgroundColors[nbColorsForGradient - 1]));
	borderColors.push(rgbFromColorObject(window.gradientBorderColors[nbColorsForGradient - 1]));

	new Chart(
		context,
		{
			type: "doughnut",
			data: {
				labels: window.countingArray.names,
				datasets: [{
					label: "Nombre d'UNRs",
					backgroundColor: borderColors,
					hoverBackgroundColor: backgroundColors,
					borderColor: "rgb(255, 255, 255)",
					borderWidth: 1,
					data: window.countingArray.counts
				}]
			},
			options: {}
		}
	);
}

function buildHistogram() // build a bar chart with the UNR count for each person
{
	let palmaresHistogramContext = document.getElementById("palmaresHistogram").getContext("2d"),
		backgroundColorGradientStroke = palmaresHistogramContext.createLinearGradient(0, 0, 0, 400),
		borderColorGradientStroke = palmaresHistogramContext.createLinearGradient(0, 0, 0, 400),
		nbColors = window.gradientBackgroundColors.length, offsetBegin = 0.3, offset = (1 - offsetBegin)/(nbColors - 1), colorIndex;
	for (colorIndex = 0; colorIndex < nbColors; colorIndex++) { // build the gradients
		backgroundColorGradientStroke.addColorStop(offsetBegin + colorIndex*offset, rgbFromColorObject(window.gradientBackgroundColors[colorIndex]));
		borderColorGradientStroke.addColorStop(offsetBegin + colorIndex*offset,  rgbFromColorObject(window.gradientBorderColors[colorIndex]));
	}
	new Chart( // build the bar chart
		palmaresHistogramContext,
		{
			type: "bar",
			data: {
				labels: window.countingArray.names,
				datasets: [{
					label: "Nombre d'UNRs",
					backgroundColor: backgroundColorGradientStroke,
					hoverBackgroundColor: borderColorGradientStroke,
					borderColor: borderColorGradientStroke,
					borderWidth: 1,
					data: window.countingArray.counts
				}]
			},
			options: {}
		}
	);
}

function buildTopXLongestStandingRecordsTable() // build the section of longest standing records
{
	let longestStandingHtmlTag = document.querySelector("#longestStanding");
	longestStandingHtmlTag.textContent = "";
	longestStandingHtmlTag.appendChild(createHtmlTagWithTextContent("h2", "UNRs les plus vieux"));
	longestStandingHtmlTag.appendChild(buildTopXLongestShortestStandingRecordsTable(window.topXLongestStandingRecordsEvents));
}

function buildTopXShortestStandingRecordsTable() // build the section of shortest standing records
{
	let longestStandingHtmlTag = document.querySelector("#shortestStanding");
	longestStandingHtmlTag.textContent = "";
	longestStandingHtmlTag.appendChild(createHtmlTagWithTextContent("h2", "UNRs les plus récents"));
	longestStandingHtmlTag.appendChild(buildTopXLongestShortestStandingRecordsTable(window.topXShortestStandingRecordsEvents));
}

function buildLongestShortestStandingTableHeaderRow() // build header row of the table of either the longest or the shortest standing records
{
	let longestOrShortestStandingHeaderRowHtmlTag = createHtmlTag("tr");
	longestOrShortestStandingHeaderRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Rang"));
	longestOrShortestStandingHeaderRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Personne"));
	longestOrShortestStandingHeaderRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Date"));
	longestOrShortestStandingHeaderRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Event"));
	longestOrShortestStandingHeaderRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Score"));
	return longestOrShortestStandingHeaderRowHtmlTag;
}

function buildTopXLongestShortestStandingRecordsTable(topXLongestOrShortestStandingRecordArray) // build the table of either the longest or the shortest standing records
{
	let longestOrShortestStandingTableHtmlTag = createHtmlTag("table"), longestOrShortestStandingRowHtmlTag, longestOrShortestStandingRecordObject;
	longestOrShortestStandingTableHtmlTag.appendChild(buildLongestShortestStandingTableHeaderRow());
	for (longestOrShortestStandingRecordObject of topXLongestOrShortestStandingRecordArray) {
		longestOrShortestStandingRowHtmlTag = createHtmlTag("tr");
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("td", "rank", longestOrShortestStandingRecordObject.rank));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("td", "name", longestOrShortestStandingRecordObject.name));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("td", "date", dateToString(longestOrShortestStandingRecordObject.date)));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("td", "eventName", longestOrShortestStandingRecordObject.eventName));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("td", "times", longestShortestStandingAvgTypes(longestOrShortestStandingRecordObject.listOfAvgTypeAndTimePairs)));
		longestOrShortestStandingTableHtmlTag.appendChild(longestOrShortestStandingRowHtmlTag);
	}
	return longestOrShortestStandingTableHtmlTag;
}

function longestShortestStandingAvgTypes(inputAvgTypeAndTimePairsArray) // convert an array [{avgType, time}, {avgType, time}, ...] to a string "time avgType, time avgType, ..."
{
	let outputString = "", avgTypeAndTimePair;
	for (avgTypeAndTimePair of inputAvgTypeAndTimePairsArray) {
		outputString += ", " + avgTypeAndTimePair.time + " " + avgTypeAndTimePair.avgType;
	}
	return outputString.substring(2);
}
