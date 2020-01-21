"use strict";

// import functions from tagCreator.js
/* global createHtmlTag, createHtmlTagWithId, createHtmlTagWithTextContent, createHtmlTagWithClassNameAndTextContent */

// import functions from utils.js
/* global dateToString, multiplyColor, addColors, substractColors, rgbFromColorObject */

// import functions from Chart.js (local version)
/* global Chart */

function buildStatistics() // compute the statistics and build the tables and graphics displaying them
{
	countRecords();
	computeTopXLongestShortestStandingRecordEvents(5);
	//computeDateAggregatedArray();
	//createDataForTimeLine();
	initColors();
	buildHistogram();
	buildDoughnut();
	//buildTimeLine();
	buildTopXLongestStandingRecordsTable();
	buildTopXShortestStandingRecordsTable();
}

function isNormalSectionDisplayed(dataBaseObject) // tell if a record object is display in normal mode
{
	return window.normalPlan.sectionIsDisplayed[dataBaseObject.normalPlanSection] && window.normalPlan.subsectionIsDisplayed[dataBaseObject.normalPlanSubsection];
}

function isCompactSectionDisplayed(dataBaseObject) // tell if a record object is displayed in compact mode
{
	return window.compactPlan.sectionIsDisplayed[dataBaseObject.compactPlanSection];
}

function isAvgTypeDisplayed(dataBaseObject) // tell if a record object is displayed regarding to avgType filters
{
	return window.avgTypeFilters[dataBaseObject.avgType].isDisplayed;
}

function isDisplayed(dataBaseObject) // tell if a record object is displayed regarding to filters
{
	return isAvgTypeDisplayed(dataBaseObject) && window.isSectionDisplayed(dataBaseObject);
}

function countRecords() // count records for histogram and doughnut charts
{
	let namesArray = [], countArray = [], namesWithMinimumCountArray, dataBaseObject, name, minimumCount;
	window.countingArray = {names: [], counts: []};
	// count records in database
	for (dataBaseObject of window.bruteRecordsDataBase) {
		if (isDisplayed(dataBaseObject)) {
			for (name of listOfNamesToUpdateFromNameString(dataBaseObject.name)) {
				if (countArray[name] === undefined) {
					countArray[name] = 1;
					namesArray.push(name);
				} else {
					countArray[name]++;
				}
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
	if (window.topXLongestStandingRecordsEvents.length !== 0) {
		window.topXLongestStandingRecordsEvents[0].listOfAvgTypeAndTimePairs.shift(); // remove initial value because it appears twice
	}
	window.topXShortestStandingRecordsEvents = aggregateFirstByDate(dateSortedRecordArray.reverse(), nbEvents, "shortestStanding");
	if (window.topXShortestStandingRecordsEvents.length !== 0) {
		window.topXShortestStandingRecordsEvents[0].listOfAvgTypeAndTimePairs.pop(); // remove initial value because it appears twice
	}
}

function sortDataBaseByDate() // sort window.bruteDataBase by date and remove empty records
{
	let dateSortedRecordArray = [], dataBaseObject, date, nullDate = new Date(0), arrayIndex, arraySorted;
	for (dataBaseObject of window.bruteRecordsDataBase) {
		date = dataBaseObject.date;
		if (date > nullDate && isDisplayed(dataBaseObject)) {
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

function computeDateAggregatedArray() // aggregate database objects that have the same person, eventName and date and stores it in window.aggregatedDataBase
{
	let aggregatedArray, aggregatedArrayObject, sectionObject, dataBaseObject, eventName, avgType;
	window.aggregatedDataBase = [];
	for (sectionObject of window.compactPlan.sections) {
		for (eventName of sectionObject.events) {
			aggregatedArray = [];
			for (avgType of window.avgTypes) {
				dataBaseObject = window.smartRecordsDataBase[eventName][avgType];
				if (dataBaseObject.time !== "") {
					if (aggregatedArray.length === 0) { // if it's the first element to be possibly aggregated, it should be added
						aggregatedArray.push({
							date: dataBaseObject.date,
							eventName: dataBaseObject.eventName,
							name: dataBaseObject.name,
							listOfAvgTypeAndTimePairs: [{avgType: avgType, time: dataBaseObject.time}]
						});
					} else {
						for (aggregatedArrayObject of aggregatedArray) { // try to match to an aggregated element
							if (aggregatedArrayObject.date.getDate() === dataBaseObject.date.getDate() && aggregatedArrayObject.name === dataBaseObject.name) {
								aggregatedArrayObject.listOfAvgTypeAndTimePairs.push({avgType: avgType, time: dataBaseObject.time}); // aggregate to the element that corresponds
								dataBaseObject = undefined;
							}
						}
						if (dataBaseObject !== undefined) {
							aggregatedArray.push({
								date: dataBaseObject.date,
								eventName: dataBaseObject.eventName,
								name: dataBaseObject.name,
								listOfAvgTypeAndTimePairs: [{avgType: avgType, time: dataBaseObject.time}]
							});
						}
					}
				}
			}
			window.aggregatedDataBase = window.aggregatedDataBase.concat(aggregatedArray);
		}
	}
}

function createDataForTimeLine() // create the three datasets used to build the time line chart
{
	let dateCounterArray = [], aggregatedDataBaseObject, date;
	window.timeLineData = {zeroData: [], barData: [], bubbleData: []};
	for (aggregatedDataBaseObject of window.aggregatedDataBase) {
		window.timeLineData.zeroData.push({ // data to create a line on the x axis with a point on each date
			t: aggregatedDataBaseObject.date,
			y: 0
		});
		if (dateCounterArray[aggregatedDataBaseObject.date] === undefined) { // increment the count for each date we already met
			dateCounterArray[aggregatedDataBaseObject.date] = 1;
		} else {
			dateCounterArray[aggregatedDataBaseObject.date]++;
		}
		window.timeLineData.bubbleData.push({ // data to create a bubble chart with a bubble on each aggregated object (many points for the same date)
			t: aggregatedDataBaseObject.date,
			y: dateCounterArray[aggregatedDataBaseObject.date],
			r: 3*Math.sqrt(aggregatedDataBaseObject.listOfAvgTypeAndTimePairs.length) // increasing bubble size but not linear
		});
	}
	for (date in dateCounterArray) {
		window.timeLineData.barData.push({ // data to create a bar chart with a bar on each date (only one bar for each date)
			t: new Date(date), // dateCounterArray indexes are actually stored as numbers, so dates should be rebuilt from them
			y: dateCounterArray[date]
		});
	}
}

function aggregateFirstByDate(dateSortedRecordArray, nbElements, mode) // aggregate dataBase elements when they have the same event, person name and date
{
	let aggregatedArray = [], lastElement, recordObject, rank;
	if (dateSortedRecordArray.length === 0) {
		return aggregatedArray;
	}
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

function initColors() // initialize window.lightColors, window.middleColors and window.intenseColors for histogram and doughnut charts
{
	let i;
	window.lightColors = [{r:255,g:224,b:230}, {r:255,g:236,b:217}, {r:255,g:245,b:221}, {r:219,g:242,b:242}, {r:215,g:236,b:251}, {r:235,g:224,b:255}];
	window.intenseColors = [{r:255,g:134,b:160}, {r:255,g:160,b:67}, {r:255,g:205,b:88}, {r:78,g:193,b:193}, {r:57,g:163,b:235}, {r:154,g:104,b:255}];
	window.middleColors = [];
	for (i = 0; i < window.lightColors.length; i++) {
		window.middleColors.push(multiplyColor(addColors(window.lightColors[i], window.intenseColors[i]),0.5));
	}
}

function buildHistogram() // build a bar chart with the UNR count for each person
{
	let palmaresHistogramContainerHtmlTag = document.querySelector("div#palmaresHistogramContainer"),
		palmaresHistogramCanvasHtmlTag = createHtmlTagWithId("canvas", "palmaresHistogram"),
		palmaresHistogramContext = palmaresHistogramCanvasHtmlTag.getContext("2d"),
		histogramBackgroundColorGradient = palmaresHistogramContext.createLinearGradient(0, 0, 0, 400),
		histogramBorderColorGradient = palmaresHistogramContext.createLinearGradient(0, 0, 0, 400),
		histogramHoverBackgroundColorGradient = palmaresHistogramContext.createLinearGradient(0, 0, 0, 400),
		nbColors = window.lightColors.length, offsetBegin = 0.3, offset = (1 - offsetBegin)/(nbColors - 1), colorIndex;
	palmaresHistogramContainerHtmlTag.textContent = "";
	for (colorIndex = 0; colorIndex < nbColors; colorIndex++) { // build the gradients
		histogramBackgroundColorGradient.addColorStop(offsetBegin + colorIndex*offset, rgbFromColorObject(window.lightColors[colorIndex]));
		histogramBorderColorGradient.addColorStop(offsetBegin + colorIndex*offset,  rgbFromColorObject(window.intenseColors[colorIndex]));
		histogramHoverBackgroundColorGradient.addColorStop(offsetBegin + colorIndex*offset,  rgbFromColorObject(window.middleColors[colorIndex]));
	}
	new Chart( // build the bar chart
		palmaresHistogramContext,
		{
			type: "bar",
			data: {
				labels: window.countingArray.names,
				datasets: [{
					label: "Nombre d'UNRs",
					backgroundColor: histogramBackgroundColorGradient,
					borderColor: histogramBorderColorGradient,
					borderWidth: 1,
					hoverBackgroundColor: histogramHoverBackgroundColorGradient,
					data: window.countingArray.counts
				}]
			}
		}
	);
	palmaresHistogramContainerHtmlTag.appendChild(palmaresHistogramCanvasHtmlTag);
}

function buildDoughnut() // build a doughnut chart with the UNR count for each person
{
	let palmaresDoughnutContainerHtmlTag = document.querySelector("div#palmaresDoughnutContainer"),
		palmaresDoughnutCanvasHtmlTag = createHtmlTagWithId("canvas", "palmaresDoughnut"),
		palmaresDoughnutContext = palmaresDoughnutCanvasHtmlTag.getContext("2d"), doughnutBackgroundColors = [], doughnutHoverColors = [],
		nbPersons = window.countingArray.counts.length, nbColorsForDoughnutGradient = window.lightColors.length, nbGradientParts = nbColorsForDoughnutGradient - 1,
		gradientLength = Math.floor((nbPersons - 1)/nbGradientParts), nbNotBiggerGradientParts = nbGradientParts - (nbPersons - nbColorsForDoughnutGradient) % nbGradientParts,
		i, j, gradientSize;
	palmaresDoughnutContainerHtmlTag.textContent = "";
	for (i = 0; i < nbGradientParts; i++) { // manually compute gradients by linear interpolations from previous fixed color included and until next fixed color excluded
		gradientSize = gradientLength + (i >= nbNotBiggerGradientParts);
		for (j = 0; j < gradientSize; j++) {
			doughnutBackgroundColors.push(rgbFromColorObject(
				addColors(window.middleColors[i], multiplyColor(substractColors(window.middleColors[i+1], window.middleColors[i]),j / gradientSize))
			));
			doughnutHoverColors.push(rgbFromColorObject(
				addColors(window.intenseColors[i], multiplyColor(substractColors(window.intenseColors[i+1], window.intenseColors[i]), j / gradientSize))
			));
		}
	}
	doughnutHoverColors.push(rgbFromColorObject(window.intenseColors[nbColorsForDoughnutGradient - 1]));
	doughnutBackgroundColors.push(rgbFromColorObject(window.middleColors[nbColorsForDoughnutGradient - 1]));
	new Chart( // build the doughnut chart
		palmaresDoughnutContext,
		{
			type: "doughnut",
			data: {
				labels: window.countingArray.names,
				datasets: [{
					label: "Nombre d'UNRs",
					data: window.countingArray.counts,
					backgroundColor: doughnutBackgroundColors,
					borderColor: "rgb(255, 255, 255)",
					borderWidth: 1,
					borderAlign: "inner",
					hoverBackgroundColor: doughnutHoverColors,
					hoverBorderColor: doughnutHoverColors
				}]
			}
		}
	);
	palmaresDoughnutContainerHtmlTag.appendChild(palmaresDoughnutCanvasHtmlTag);
}

function buildTimeLine() // build a time line chart made of many basic charts
{
	let timeLineContext = document.getElementById("timeLine").getContext("2d");
	new Chart( // build the time line chart
		timeLineContext,
		{
			type: "line",
			data: {
				datasets: [{ // line chart on the x axis
					label: "test zero",
					data: window.timeLineData.zeroData,
					fill: false,
					borderColor: 'rgba(220,20,60,1)',
					backgroundColor: 'rgba(220,20,60,1)'
				}, { // bar chart on each date
					label: "test bar",
					type: "bar",
					data: window.timeLineData.barData,
					backgroundColor:"rgb(0,0,255)",
				}, { // bubble chart on each aggregated data of each date
					label: "test bulle",
					type: "bubble",
					data: window.timeLineData.bubbleData,
					backgroundColor:"rgb(0,255,0)",
				}]
			},
			options: {
						scales: {
							xAxes: [{
								type: "time",
								time: {
									parser: "x",
									displayFormats: {
										quarter: "MM/YYYY",
										month: "MM/YYYY",
										week: "LLLL",
										day: "L",
										hour: "DD/MM/YYYY HH:mm",
										minute: "HH:mm",
										second: "HH:mm:ss"
									},
									tooltipFormat: "DD/MM/YYYY HH:mm:ss"
								}
							}],
					yAxes: [{
						display: false
					}],
				}
			}
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
