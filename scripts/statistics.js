"use strict";

const buildStatistics = () => {
	let {countPerName, names, groups, countLevels} = countByPersonAndGroup();
	let colorGradient = buildColorGradient(countLevels.length);
	buildCountByPersonSplitByGroupBarChart(countPerName, names, groups);
	buildCountByGroupSplitByPersonBarChart(countPerName, names, groups, colorGradient);
	buildDoughnutChart(countPerName, names, colorGradient);
	buildGroupedBubbleChart();
	buildTimeline();
};

const buildCountByPersonSplitByGroupBarChart = (countPerName, names, groups) => {
	let container = document.querySelector("div#countByPersonSplitByGroupBarChartContainer");
	let canvas = createHtmlTag("canvas", {id: "countByPersonSplitByGroupBarChart"});
	let context = canvas.getContext("2d");
	let groupColors = {
		"Big cubes": colorScheme[0],
		"Blindfolded": colorScheme[1],
		"Dodecahedrons": colorScheme[2],
		"NxNxN cubes Shape Mods": colorScheme[3],
		"NxNxN cubes Variations": colorScheme[4],
		"Team, Relays": colorScheme[5]
	};
	
	let data = {
		labels: names,
		datasets: []
	};
	for (let group of groups) {
		let dataset = {
			label: group,
			data: [],
			backgroundColor: groupColors[group],
			stack: "allSameStack"
		};
		for (let countForName of countPerName) {
			dataset.data.push(countForName.countPerGroup[group] ?? 0);
		}
		data.datasets.push(dataset);
	}
	new Chart(context, {
		type: "bar",
		data: data,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					stacked: true
				},
				y: {
					stacked: true
				}
			}
		}
	});
	container.appendChild(canvas);
};

const buildCountByGroupSplitByPersonBarChart = (countPerName, names, groups, colorGradient) => {
	let container = document.querySelector("div#countByGroupSplitByPersonBarChartContainer");
	let canvas = createHtmlTag("canvas", {id: "countByGroupSplitByPersonBarChart"});
	let context = canvas.getContext("2d");
	let data = {
		labels: groups,
		datasets: []
	};
	let lastRecordCount = null;
	let countGroupIndex = -1;
	for (let nameIndex = 0; nameIndex < names.length; nameIndex++) {
		if (countPerName[nameIndex].totalCount !== lastRecordCount) {
			countGroupIndex++;
			lastRecordCount = countPerName[nameIndex].totalCount;
		}
		let dataset = {
			label: names[nameIndex],
			data: [],
			backgroundColor: colorGradient[countGroupIndex],
			stack: "allSameStack"
		};
		for (let group of groups) {
			dataset.data.push(countPerName[nameIndex].countPerGroup[group] ?? 0);
		}
		data.datasets.push(dataset);
	}
	new Chart(context, {
		type: "bar",
		data: data,
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				x: {
					stacked: true
				},
				y: {
					stacked: true
				}
			}
		}
	});
	container.appendChild(canvas);
};

const buildDoughnutChart = (countPerName, names, colorGradient) => {
	let container = document.querySelector("div#doughnutChartContainer");
	let canvas = createHtmlTag("canvas", {id: "doughnutChart"});
	let context = canvas.getContext("2d");
	let data = [];
	let backgroundColors = [];
	let lastRecordCount = null;
	let countGroupIndex = -1;
	for (let nameIndex = 0; nameIndex < names.length; nameIndex++) {
		data.push(countPerName[nameIndex].totalCount);
		if (countPerName[nameIndex].totalCount !== lastRecordCount) {
			countGroupIndex++;
			lastRecordCount = countPerName[nameIndex].totalCount;
		}
		backgroundColors.push(colorGradient[countGroupIndex]);
	}
	new Chart(context, {
		type: "doughnut",
		data: {
			labels: names,
			datasets: [{
				data: data,
				backgroundColor: backgroundColors
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
		}
	});
	container.appendChild(canvas);
};

const buildGroupedBubbleChart = () => { // todo
	let container = document.querySelector("div#groupedBubbleChartContainer");
	let canvas = createHtmlTag("canvas", {id: "groupedBubbleChart"});
	let context = canvas.getContext("2d");
	// new Chart(context, {...});
	//container.appendChild(canvas);
};

const buildTimeline = () => {
	let container = document.querySelector("div#timelineChartContainer");
	let canvas = createHtmlTag("canvas", {id: "timelineChart"});
	let context = canvas.getContext("2d");
	let data = {datasets: []};
	for (let groupIndex = 0; groupIndex < pagePlans.noWca.length; groupIndex++) {
		let dataset = {
			label: pagePlans.noWca[groupIndex].en,
			type: "bubble",
			data: [],
			labels: [],
			backgroundColor: []
		}
		let group = pagePlans.noWca[groupIndex];
		let color = colorScheme[groupIndex];
		let recordsGroupedByDate = [];
		for (let eventName of group.events) {
			for (let avgType in records[eventName]) {
				let record = records[eventName][avgType];
				let recordObjectForGroup = {
					eventName: eventName,
					avgType: avgType,
					name: record.name ?? record.names.join(" + "),
					time: record.time
				};
				let matchingRecordGroup = recordsGroupedByDate.find(recordGroup => recordGroup.date === record.date);
				if (matchingRecordGroup) {
					matchingRecordGroup.records.push(recordObjectForGroup);
				} else {
					recordsGroupedByDate.push({
						date: record.date,
						records: [recordObjectForGroup]
					});
				}
			}
		}
		for (let recordGroup of recordsGroupedByDate) {
			dataset.data.push({
				t: new Date(recordGroup.date),
				y: groupIndex,
				r: 5 * Math.sqrt(recordGroup.records.length)
			});
			dataset.backgroundColor.push(color);
			let subLabels = [];
			for (let record of recordGroup.records) {
				subLabels.push(`${record.eventName} ${record.avgType} : ${record.name} (${record.time})`);
			}
			dataset.labels.push(subLabels);
		}
		data.datasets.push(dataset);
	}
	new Chart(context, {
			data: data,
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [{
						type: "time",
						time: {
							tooltipFormat: "DD/MM/YYYY"
						}
					}],
					yAxes: [{
						display: false,
						ticks: {
							suggestedMin: -1,
							suggestedMax: 6
						}
					}]
				},
				tooltips: {
					callbacks: {
						label: function(t, d) {
							return d.datasets[t.datasetIndex].labels[t.index];
						}
					}
				}
			}
		}
	);
	container.appendChild(canvas);
};

const countByPersonAndGroup = () => {
	let countPerName = {};
	let groupLabels = [];
	// build count object
	for (let group of pagePlans.noWca) {
		groupLabels.push(group.en);
		for (let eventName of group.events) {
			for (let avgType in records[eventName]) {
				let record = records[eventName][avgType];
				let names = record.name ? [record.name] : record.names;
				for (let name of names) {		
					if (!countPerName[name]) {
						countPerName[name] = {
							name: name,
							countPerGroup: {},
							totalCount: 0
						};
					}
					if (!countPerName[name].countPerGroup[group.en]) {
						countPerName[name].countPerGroup[group.en] = 0;
					}
					countPerName[name].countPerGroup[group.en]++;
					countPerName[name].totalCount++;
				}
			}
		}
	}
	// convert object to array
	let countPerNameArray = [];
	for (let name in countPerName) {
		countPerNameArray.push({
			name: name,
			countPerGroup: countPerName[name].countPerGroup,
			totalCount: countPerName[name].totalCount
		});
	}
	// sort array
	countPerNameArray.sort((count1, count2) => count2.totalCount - count1.totalCount);
	// names
	let nameLabels = [];
	for (let countForName of countPerNameArray) {
		nameLabels.push(countForName.name);
	}
	// countLevels
	let countLevels = [];
	for (let countForName of countPerNameArray) {
		if (!countLevels.includes(countForName.totalCount)) {
			countLevels.push(countForName.totalCount)
		}
	}
	return {
		countPerName: countPerNameArray,
		names: nameLabels,
		groups: groupLabels,
		countLevels: countLevels
	};
};

const show = buttonId => { // show the div corresponding to the clicked button and hide the other ones
	document.querySelector("section#statistics ul").setAttribute("data-selected", buttonId.replace(/Button$/, ""));
};



/* OLD ----------------- */

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

/*function buildTimeLine() // build a time line chart made of many basic charts
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
				aspectRatio: 4,
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
}*/
