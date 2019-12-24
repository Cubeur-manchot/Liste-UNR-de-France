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

function buildPalmaresSection() // build the bar graphic of UNR count
{
	let ctx = document.getElementById('myChart').getContext('2d');
	let backgroundColorGradientStroke = ctx.createLinearGradient(0, 0, 0, 500);
	let borderColorGradientStroke = ctx.createLinearGradient(0, 0, 0, 500);

	backgroundColorGradientStroke.addColorStop(0.0, "rgb(255,224,230)");
	backgroundColorGradientStroke.addColorStop(0.2, "rgb(255,236,217)");
	backgroundColorGradientStroke.addColorStop(0.4, "rgb(255,245,221)");
	backgroundColorGradientStroke.addColorStop(0.6, "rgb(219,242,242)");
	backgroundColorGradientStroke.addColorStop(0.8, "rgb(215,236,251)");
	backgroundColorGradientStroke.addColorStop(1.0, "rgb(235,224,255)");

	borderColorGradientStroke.addColorStop(0.0, "rgb(255,134,160)");
	borderColorGradientStroke.addColorStop(0.2, "rgb(255,160,67)");
	borderColorGradientStroke.addColorStop(0.4, "rgb(255,205,88)");
	borderColorGradientStroke.addColorStop(0.6, "rgb(78,193,193)");
	borderColorGradientStroke.addColorStop(0.8, "rgb(57,163,235)");
	borderColorGradientStroke.addColorStop(1.0, "rgb(154,104,255)");

	new Chart(
		ctx,
		{
			type: 'bar',
			data: {
				labels: window.countingArray.names,
				datasets: [{
					label: "Nombre d'UNRs",
					backgroundColor: backgroundColorGradientStroke,
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
