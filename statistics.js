"use strict";

// import functions from tagCreator.js
/* global createHtmlTag, createHtmlTagWithId, createHtmlTagWithTextContent, createHtmlTagWithClassNameAndTextContent */

// import functions from utils.js
/* global dateToString, getBeginOfWeek, multiplyColor, addColors, substractColors, rgbFromColorObject */

// import functions from Chart.js (local version)
/* global Chart */

function buildStatistics() // compute the statistics and build the tables and graphics displaying them
{
	countRecords();
	computeTopXLongestShortestStandingRecordEvents(5);
	computeDateAggregatedArray();
	createDataForTimeLine();
	initColors();
	buildHistogram();
	buildDoughnut();
	buildTimeLine();
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
	let aggregatedArray = [], aggregatedArrayElement, sectionObject, dataBaseObject, date, nullDate = new Date(0), weekBeginDate, eventName, avgType;
	window.aggregatedDataBase = [];
	for (sectionObject of window.compactPlan.sections) {
		for (eventName of sectionObject.events) {
			for (avgType of window.avgTypes) {
				dataBaseObject = window.smartRecordsDataBase[eventName][avgType];
				if (isDisplayed(dataBaseObject)) {
					date = dataBaseObject.date;
					if (date.getTime() !== nullDate.getTime()) {
						weekBeginDate = getBeginOfWeek(date);
						aggregatedArrayElement = {
							date: date,
							name: dataBaseObject.name,
							eventName: eventName,
							avgType: avgType,
							time: dataBaseObject.time
						};
						if (aggregatedArray[weekBeginDate] === undefined) {
							aggregatedArray[weekBeginDate] = [aggregatedArrayElement];
						} else {
							aggregatedArray[weekBeginDate].push(aggregatedArrayElement);
						}
					}
				}
			}
		}
	}
	for (date in aggregatedArray) {
		window.aggregatedDataBase.push(aggregatedArray[date]);
	}
}

function createDataForTimeLine() // create the three datasets used to build the time line chart
{
	let aggregatedDataBaseObject;
	window.timeLineData = {newData: [], bubbleData: [], labels: []};
	for (aggregatedDataBaseObject of window.aggregatedDataBase) {
		window.timeLineData.bubbleData.push({
			t: getBeginOfWeek(aggregatedDataBaseObject[0].date),
			y: 0,
			r: 3.5*Math.sqrt(Math.sqrt(aggregatedDataBaseObject.length))
		});
		window.timeLineData.labels.push(labelFromAggregatedDataBaseObject(aggregatedDataBaseObject));
		//window.timeLineData.labels.push(Math.random() > 0.5 ? "coucou" : "nuage");
	}
}

function labelFromAggregatedDataBaseObject(aggregatedDataBaseObject) // build the label corresponding to the aggregated database object
{
	let aggregatedDataBaseElement, label = [];
	for (aggregatedDataBaseElement of aggregatedDataBaseObject) {
		label.push(
			"["	+ dateToString(aggregatedDataBaseElement.date) + "] " + aggregatedDataBaseElement.name + " : " + aggregatedDataBaseElement.eventName + " " + aggregatedDataBaseElement.avgType + " (" + aggregatedDataBaseElement.time + ")\n"
		);
	}
	return label;
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
		histogramBackgroundColorGradient = palmaresHistogramContext.createLinearGradient(0, 150, 0, 400),
		histogramBorderColorGradient = palmaresHistogramContext.createLinearGradient(0, 150, 0, 400),
		histogramHoverBackgroundColorGradient = palmaresHistogramContext.createLinearGradient(0, 150, 0, 400),
		label, nbColors = window.lightColors.length, offset = 1/(nbColors - 1), colorIndex;
	palmaresHistogramContainerHtmlTag.textContent = "";
	for (colorIndex = 0; colorIndex < nbColors; colorIndex++) { // build the gradients
		histogramBackgroundColorGradient.addColorStop(colorIndex*offset, rgbFromColorObject(window.lightColors[colorIndex]));
		histogramBorderColorGradient.addColorStop(colorIndex*offset,  rgbFromColorObject(window.intenseColors[colorIndex]));
		histogramHoverBackgroundColorGradient.addColorStop(colorIndex*offset,  rgbFromColorObject(window.middleColors[colorIndex]));
	}
	if (document.querySelector("img#frontFlag").src.substr(-10, 10) === "flagFR.png") {
		label = "Nombre d'UNRs";
	} else {
		label = "Number of UNRs";
	}
	new Chart( // build the bar chart
		palmaresHistogramContext,
		{
			type: "bar",
			data: {
				labels: window.countingArray.names,
				datasets: [{
					label: label,
					backgroundColor: histogramBackgroundColorGradient,
					borderColor: histogramBorderColorGradient,
					borderWidth: 1,
					hoverBackgroundColor: histogramHoverBackgroundColorGradient,
					data: window.countingArray.counts
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		}
	);
	palmaresHistogramContainerHtmlTag.appendChild(palmaresHistogramCanvasHtmlTag);
}

function buildDoughnut() // build a doughnut chart with the UNR count for each person
{
	let palmaresDoughnutContainerHtmlTag = document.querySelector("div#palmaresDoughnutContainer"),
		palmaresDoughnutCanvasHtmlTag = createHtmlTagWithId("canvas", "palmaresDoughnut"),
		palmaresDoughnutContext = palmaresDoughnutCanvasHtmlTag.getContext("2d"), doughnutBackgroundColors = [], doughnutHoverColors = [], colorsIndexes,
		nbPersons = window.countingArray.counts.length, nbColorsForDoughnutGradient = window.lightColors.length, nbGradientParts = nbColorsForDoughnutGradient - 1,
		gradientLength = Math.floor((nbPersons - 1)/nbGradientParts), nbNotBiggerGradientParts = nbGradientParts - (nbPersons - nbColorsForDoughnutGradient) % nbGradientParts,
		i, j, gradientSize;
	palmaresDoughnutContainerHtmlTag.textContent = "";
	if (gradientLength === 0) { // particular case when there are not enough persons to build the gradients
		colorsIndexes = [0, 4, 2, 3, 5].slice(0, nbPersons).sort(); // take the nbPersons first elements of this array, it gives the color indexes to take
		for (j = 0; j < nbPersons; j++) {
			doughnutBackgroundColors.push(rgbFromColorObject(window.middleColors[colorsIndexes[j]]));
			doughnutHoverColors.push(rgbFromColorObject(window.intenseColors[colorsIndexes[j]]));
		}
	} else {
		for (i = 0; i < nbGradientParts; i++) { // manually compute gradients by linear interpolations from previous fixed color included and until next fixed color excluded
			gradientSize = gradientLength + (i >= nbNotBiggerGradientParts);
			for (j = 0; j < gradientSize; j++) {
				doughnutBackgroundColors.push(rgbFromColorObject(
					addColors(window.middleColors[i], multiplyColor(substractColors(window.middleColors[i + 1], window.middleColors[i]), j / gradientSize))
				));
				doughnutHoverColors.push(rgbFromColorObject(
					addColors(window.intenseColors[i], multiplyColor(substractColors(window.intenseColors[i + 1], window.intenseColors[i]), j / gradientSize))
				));
			}
		}
		doughnutHoverColors.push(rgbFromColorObject(window.intenseColors[nbColorsForDoughnutGradient - 1]));
		doughnutBackgroundColors.push(rgbFromColorObject(window.middleColors[nbColorsForDoughnutGradient - 1]));
	}
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
	let timeLineContainerHtmlTag = document.querySelector("div#timeLineContainer"),
		timeLineCanvasHtmlTag = createHtmlTagWithId("canvas", "timeLine"),
		timeLineContext = timeLineCanvasHtmlTag.getContext("2d"),
		timeLineBackgroundColorGradient = timeLineContext.createLinearGradient(1000, 250, 800, 650),
		nbColors = window.lightColors.length, offsetBegin = 0, offset = (1 - offsetBegin)/(nbColors - 1), colorIndex;
	for (colorIndex = 0; colorIndex < nbColors; colorIndex++) { // build the gradients
		timeLineBackgroundColorGradient.addColorStop(offsetBegin + colorIndex*offset, rgbFromColorObject(window.intenseColors[colorIndex]));
	}
	timeLineContainerHtmlTag.textContent = "";
	new Chart( // build the time line chart
		timeLineContext,
		{
			type: "line",
			data: {
				datasets: [{
					label: "Time Line",
					labels: window.timeLineData.labels,
					type: "bubble",
					data: window.timeLineData.bubbleData,
					backgroundColor: timeLineBackgroundColorGradient,
					borderColor: "rgb(0,0,0)",
					hoverBorderColor: "rgb(0,0,0)"
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
					}], yAxes: [{
						ticks: {
							display: false
						},
						gridLines: {
							lineWidth: 0,
							drawBorder: false
						}
					}],
				},
				tooltips: {
					callbacks: {
						label: function(t, d) {
							console.log(t);
							return d.datasets[t.datasetIndex].labels[t.index];
						}
					}
				}
			}
		}
	);
	timeLineContainerHtmlTag.appendChild(timeLineCanvasHtmlTag);
}
