"use strict";

// import functions from tagCreator.js
/* global createHtmlTag, createHtmlTagWithTextContent */

// import functions from utils.js
/* global dateToString */

function countRecords() // count records in window.recordDataBase and store the result in window.countingArray for palmares section
{
	let dataBaseObject, personNames;
	window.countingArray = [];
	for (dataBaseObject of window.bruteRecordsDataBase) {
		personNames = dataBaseObject.name;
		if (personNames !== "") {
			addNamesInCountingArray(listOfNamesToUpdateFromNameString(personNames));
		}
	}
}

function addNamesInCountingArray(arrayOfNamesToUpdate) // both increment UNR count and update ranking in window.countingArray for input names
{
	let personName, personUnrCount, countingArrayIndex, countingArray = window.countingArray;
	for (personName of arrayOfNamesToUpdate) {
		countingArrayIndex = findIndexInCountingArray(personName);
		if (countingArrayIndex === -1) { // if the name is not in the list, it should be added to it
			countingArray.push({name: personName, count: 1});
		} else { // if the name is already in the list, count and ranking should be updated
			countingArray[countingArrayIndex].count++; // update count for this person
			personUnrCount = countingArray[countingArrayIndex].count;
			while (countingArrayIndex > 0 && countingArray[countingArrayIndex].count > countingArray[countingArrayIndex-1].count) { // update array sort
				countingArray[countingArrayIndex].name = countingArray[countingArrayIndex-1].name;
				countingArray[countingArrayIndex].count = countingArray[countingArrayIndex-1].count;
				countingArray[countingArrayIndex-1].name = personName;
				countingArray[countingArrayIndex-1].count = personUnrCount;
				countingArrayIndex--;
			}
		}
	}
}

function findIndexInCountingArray(name) // return the index of the name in the countingArray (-1 if absent)
{
	let countingArrayElement, countingArray = window.countingArray;
	for (countingArrayElement of countingArray) {
		if (countingArrayElement.name === name) {
			return countingArray.indexOf(countingArrayElement);
		}
	}
	return -1;
}

function listOfNamesToUpdateFromNameString(inputNamesList) // convert a string of the form "firstPerson + secondPerson" to an array of the form ["firstPerson", "secondPerson"]
{
	// if inputNamesList has no " + " (like "singlePerson"), it returns a 1-element array (["singlePerson"])
	let indexOfPlus, namesList = inputNamesList, arrayOfNamesToUpdate = [];
	while(namesList.includes(" + ")) { // split for each +
		indexOfPlus = namesList.indexOf(" + ");
		arrayOfNamesToUpdate.push(namesList.substring(0, indexOfPlus));
		namesList = namesList.substring(indexOfPlus + 3, 1000);
	}
	arrayOfNamesToUpdate.push(namesList); // add the last part of the string
	return arrayOfNamesToUpdate;
}


function computeTopXLongestShortestStandingRecordEvents(nbEvents)
{
	let dateSortedRecordArray = sortDataBaseByDate(window.bruteRecordsDataBase);
	window.topXLongestStandingRecordsEvents = aggregateFirstByDate(dateSortedRecordArray, nbEvents, "longestStanding");
	window.topXLongestStandingRecordsEvents[0].listOfAvgTypeAndTimePairs.shift(); // remove initial value because it appears twice
	window.topXShortestStandingRecordsEvents = aggregateFirstByDate(dateSortedRecordArray.reverse(), nbEvents, "shortestStanding");
	window.topXShortestStandingRecordsEvents[0].listOfAvgTypeAndTimePairs.pop(); // remove initial value because it appears twice
}

function sortDataBaseByDate(dataBaseArray)
{
	let dateSortedRecordArray = [], dataBaseObject, date, nullDate = new Date(0), arrayIndex, arraySorted;
	for (dataBaseObject of dataBaseArray) {
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

function aggregateFirstByDate(dateSortedRecordArray, nbElements, mode)
{
	let biggestAggregatedArray = [], lastElement, recordObject, rank;
	lastElement = {
		rank: 1,
		date: dateSortedRecordArray[0].date,
		eventName: dateSortedRecordArray[0].eventName,
		name: dateSortedRecordArray[0].name,
		listOfAvgTypeAndTimePairs: [{avgType: dateSortedRecordArray[0].avgType, time: dateSortedRecordArray[0].time}]
	};
	biggestAggregatedArray.push(lastElement);
	for (recordObject of dateSortedRecordArray) {
		if (recordObject.date.getTime() === lastElement.date.getTime() && recordObject.eventName === lastElement.eventName && recordObject.name === lastElement.name) {
			// correspondance found, just agregate to last element of the array
			if (mode === "longestStanding") { // agregating with longest standing mode
				biggestAggregatedArray[biggestAggregatedArray.length - 1].listOfAvgTypeAndTimePairs.push({avgType: recordObject.avgType, time: recordObject.time});
			} else { // agregating with shortest standing mode
				biggestAggregatedArray[biggestAggregatedArray.length - 1].listOfAvgTypeAndTimePairs.unshift({avgType: recordObject.avgType, time: recordObject.time});
			}
		} else {
			// no correspondance found, add new element to the array if it's not full
			if (biggestAggregatedArray.length < nbElements || lastElement.date.getTime() === recordObject.date.getTime()) { // array is not full or there is a date equality, add new element
				if (recordObject.date.getTime() === lastElement.date.getTime()) { // date equality
					rank = lastElement.rank;
				} else { // no date equality
					rank = biggestAggregatedArray.length + 1;
				}
				lastElement = {
					rank: rank,
					date: recordObject.date,
					eventName: recordObject.eventName,
					name: recordObject.name,
					listOfAvgTypeAndTimePairs: [{avgType: recordObject.avgType, time: recordObject.time}]
				};
				biggestAggregatedArray.push(lastElement);
			} else { // array is full and the date is not equal to the previous one, agregation is finished
				return biggestAggregatedArray;
			}
		}
	}
	// return by security
	return biggestAggregatedArray;
}


function buildStatistics() // build the tables containing statistics
{
	countRecords();
	computeTopXLongestShortestStandingRecordEvents(5);
	buildPalmaresSection();
	buildTopXLongestStandingRecordsTable();
	buildTopXShortestStandingRecordsTable();
}

function buildPalmaresTableHeaderRow(nbPersons, nbRecords) // build header row for table of ranking on each person's UNR count
{
	let palmaresHeaderRowHtmlTag = createHtmlTag("tr");
	palmaresHeaderRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Personne (" + nbPersons + ")"));
	palmaresHeaderRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Nombre d'UNRs (" + nbRecords + ")"));
	palmaresHeaderRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Pourcentage des UNRs"));
	return palmaresHeaderRowHtmlTag;
}

function buildPalmaresSection() // build table of ranking on each person's UNR count
{
	let palmaresHtmlTag = document.querySelector("#palmares"), palmaresTableHtmlTag, palmaresRowHtmlTag, countingArrayElement, totalNbRecords = 0;
	palmaresHtmlTag.textContent = "";
	for (countingArrayElement of window.countingArray) { // count records
		totalNbRecords += countingArrayElement.count;
	}
	palmaresHtmlTag.appendChild(createHtmlTagWithTextContent("h2", "Palmarès du nombre d'UNRs"));
	palmaresTableHtmlTag = createHtmlTag("table");
	palmaresTableHtmlTag.appendChild(buildPalmaresTableHeaderRow(window.countingArray.length, totalNbRecords));
	for (countingArrayElement of window.countingArray) {
		palmaresRowHtmlTag = createHtmlTag("tr");
		palmaresRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", countingArrayElement.name));
		palmaresRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", countingArrayElement.count));
		palmaresRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", (100 * countingArrayElement.count / totalNbRecords + "").substring(0,4) + " %"));
		palmaresTableHtmlTag.appendChild(palmaresRowHtmlTag);
	}
	palmaresHtmlTag.appendChild(palmaresTableHtmlTag);
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
	return longestOrShortestStandingHeaderRowHtmlTag;
}

function buildTopXLongestShortestStandingRecordsTable(topXLongestOrShortestStandingRecordArray) // build the table of either the longest or the shortest standing records
{
	let longestOrShortestStandingTableHtmlTag = createHtmlTag("table"), longestOrShortestStandingRowHtmlTag, longestOrShortestStandingRecordObject;
	longestOrShortestStandingTableHtmlTag.appendChild(buildLongestShortestStandingTableHeaderRow());
	for (longestOrShortestStandingRecordObject of topXLongestOrShortestStandingRecordArray) {
		longestOrShortestStandingRowHtmlTag = createHtmlTag("tr");
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", longestOrShortestStandingRecordObject.rank));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", longestOrShortestStandingRecordObject.name));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", dateToString(longestOrShortestStandingRecordObject.date)));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("td",longestOrShortestStandingRecordObject.eventName + " " +
			longestShortestStandingAvgTypes(longestOrShortestStandingRecordObject.listOfAvgTypeAndTimePairs)));
		longestOrShortestStandingTableHtmlTag.appendChild(longestOrShortestStandingRowHtmlTag);
	}
	return longestOrShortestStandingTableHtmlTag;
}

function longestShortestStandingAvgTypes(inputAvgTypeAndTimePairsArray) // convert an aray of the form [{avgType, time}, {avgType, time}, ...] to a string of the form "(avgType, avgType, ...)"
{
	let outputString = "", avgTypeAndTimePair;
	for (avgTypeAndTimePair of inputAvgTypeAndTimePairsArray) {
		outputString += ", " + avgTypeAndTimePair.avgType;
	}
	return "(" + outputString.substring(2) + ")";
}
