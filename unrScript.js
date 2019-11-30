"use strict";

  /****************************/
 /*      INITIALIZATION      */
/****************************/
/* All functions used to initialize the data needed to build the page. */

function init() // global initialization function
{
	window.avgTypes = ["single","mo3","avg5","avg12","avg50","avg100"]; // initialize records avg types
	loadXML();
	storeRecordsInDataBase();
	storePersonsInDataBase();
	storeNormalPlanInDataBase();
	storeCompactPlanInDataBase();
}

function loadXML() // load unrData.xml and store it in window.unrXmlData
{
	let xmlHttp;
	if(window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject("Microsoft.xmlHttp");
	}
	xmlHttp.open("get", "unrData.xml", false);
	xmlHttp.send();
	window.unrXmlData = xmlHttp.responseXML.querySelector("xml");
}

function storePersonsInDataBase() // parse window.unrXmlData and stores persons content in window.personsDataBase
{
	let personXmlTag, personDataBaseObject;
	window.personsDataBase = [];
	for (personXmlTag of window.unrXmlData.querySelector("persons").querySelectorAll("person")) {
		personDataBaseObject = {};
		personDataBaseObject.wcaId = personXmlTag.getAttribute("wcaId");
		personDataBaseObject.pbSheetLink = personXmlTag.getAttribute("pbSheetLink");
		window.personsDataBase[personXmlTag.getAttribute("name")] = personDataBaseObject; // direct access with window.personsDataBase[inputName]
	}
}

function storeNormalPlanInDataBase() // parse window.unrXmlData and store the normal plan in window.normalPlan
{
	let sectionXmlTag, subsectionXmlTag, eventXmlTag, sectionObject, subsectionObject;
	window.normalPlan = {};
	window.normalPlan.sections = [];
	for (sectionXmlTag of window.unrXmlData.querySelector("normalPlan").querySelectorAll("section")) {
		sectionObject = {};
		sectionObject.sectionName = sectionXmlTag.getAttribute("sectionName");
		sectionObject.subsections = [];
		for (subsectionXmlTag of sectionXmlTag.querySelectorAll("subsection")) {
			subsectionObject = {};
			subsectionObject.subsectionName = subsectionXmlTag.getAttribute("subsectionName");
			subsectionObject.events = [];
			for (eventXmlTag of subsectionXmlTag.querySelectorAll("event")) {
				subsectionObject.events.push(eventXmlTag.textContent);
			}
			sectionObject.subsections.push(subsectionObject);
		}
		window.normalPlan.sections.push(sectionObject);
	}
}

function storeCompactPlanInDataBase() // parse window.unrXmlData and store the compact plan in window.compactPlan
{
	let sectionXmlTag, eventXmlTag, sectionObject;
	window.compactPlan = {};
	window.compactPlan.sections = [];
	for (sectionXmlTag of window.unrXmlData.querySelector("compactPlan").querySelectorAll("section")) {
		sectionObject = {};
		sectionObject.sectionName = sectionXmlTag.getAttribute("sectionName");
		sectionObject.events = [];
		for (eventXmlTag of sectionXmlTag.querySelectorAll("event")) {
			sectionObject.events.push(eventXmlTag.textContent);
		}
		window.compactPlan.sections.push(sectionObject);
	}
}

function storeRecordsInDataBase() // parse window.unrXmlData and store records content in window.recordsDataBase
{
	let recordsXmlTag, recordEventXmlTag, recordXmlTag, recordDataBaseObject, eventName, compactPlanSectionName, normalPlanSectionAndSubsectionName, avgType, date;
	window.recordsDataBase = [];
	recordsXmlTag = window.unrXmlData.querySelector("records");
	for (recordEventXmlTag of recordsXmlTag.querySelectorAll("event")) { // for each event
		eventName = recordEventXmlTag.getAttribute("eventName");
		compactPlanSectionName = findCompactPlanSectionNameFromEventName(eventName);
		normalPlanSectionAndSubsectionName = findNormalPlanSectionAndSubsectionFromEventName(eventName);
		for (avgType of window.avgTypes) { // for each avgType
			recordXmlTag = recordEventXmlTag.querySelector(avgType);
			recordDataBaseObject = {}; // object used to store all information for one UNR
			recordDataBaseObject.eventName = eventName;
			recordDataBaseObject.avgType = avgType;
			recordDataBaseObject.name = recordXmlTag.getAttribute("name");
			recordDataBaseObject.time = recordXmlTag.getAttribute("time");
			if (recordXmlTag.getAttribute("memoTimeList") === null) {
				recordDataBaseObject.memoTimeList = "";
			} else {
				recordDataBaseObject.memoTimeList = listToArray(recordXmlTag.getAttribute("memoTimeList"));
			}
			recordDataBaseObject.timeList = listToArray(recordXmlTag.getAttribute("timeList"));
			recordDataBaseObject.scrambleList = listToArray(recordXmlTag.getAttribute("name"));
			date = recordXmlTag.getAttribute("date");
			if (date === "") {
				recordDataBaseObject.date = new Date(0);
			} else {
				recordDataBaseObject.date = dateOfString(recordXmlTag.getAttribute("date"));
			}
			recordDataBaseObject.youtubeLink = recordXmlTag.getAttribute("youtubeLink");
			recordDataBaseObject.francocubeLink = recordXmlTag.getAttribute("francocubeLink");
			recordDataBaseObject.compactPlanSection = compactPlanSectionName;
			recordDataBaseObject.normalPlanSection = normalPlanSectionAndSubsectionName.sectionName;
			recordDataBaseObject.normalPlanSubsection = normalPlanSectionAndSubsectionName.subsectionName;
			window.recordsDataBase.push(recordDataBaseObject); // add object in dataBase
		}
	}
}

function findCompactPlanSectionNameFromEventName(eventName) // return the section corresponding to input event in compact mode
{
	let sectionXmlTag, eventXmlTag;
	for (sectionXmlTag of window.unrXmlData.querySelector("compactPlan").querySelectorAll("section")) {
		for (eventXmlTag of sectionXmlTag.querySelectorAll("event")) {
			if (eventXmlTag.textContent === eventName) {
				return sectionXmlTag.getAttribute("sectionName");
			}
		}
	}
	return null;
}

function findNormalPlanSectionAndSubsectionFromEventName(eventName) // return both section and subsection corresponding to input event in normal mode
{
	let sectionXmlTag, subsectionXmlTag, eventXmlTag;
	for (sectionXmlTag of window.unrXmlData.querySelector("normalPlan").querySelectorAll("section")) {
		for (subsectionXmlTag of sectionXmlTag.querySelectorAll("subsection")) {
			for (eventXmlTag of subsectionXmlTag.querySelectorAll("event")) {
				if (eventXmlTag.textContent === eventName) {
					return {sectionName: sectionXmlTag.getAttribute("sectionName"), subsectionName: subsectionXmlTag.getAttribute("subsectionName")};
				}
			}
		}
	}
	return null;
}


  /****************************/
 /* BUILDING RECORD SECTION  */
/****************************/
/* All functions used to build the record section of the HTML page. */

function buildRecordSection() // global page building function
{
	//buildPlan(window.unrXmlData.querySelector("normalPlan"));
	buildPlan("normal");
	document.querySelector("#pagePlan").style.display = "none";
	buildRecords(window.unrXmlData.querySelector("normalPlan"));
}

function buildPlan(planType) // build filters for avg type, filters and links for section and subsection
{
	let sectionName, planDataBase, planSectionObject, subsectionPlanHtmlTag, subsectionName, subsectionExternalButtonHtmlTag, planSubsectionObject, sectionPlanHtmlTag, sectionExternalButtonHtmlTag, pagePlanHtmlTag = document.querySelector("#pagePlan");
	if (planType === "normal") {
		planDataBase = window.normalPlan;
	} else {
		planDataBase = window.compactPlan;
	}
	pagePlanHtmlTag.textContent = "";

	// add filters for single, mo3, avg5, ...
	pagePlanHtmlTag.appendChild(buildAvgTypeFilters());

	for (planSectionObject of planDataBase.sections) {
		// create section with name, filter and subsections
		sectionPlanHtmlTag = createHtmlTagWithClassName("div", "sectionPlan");
		sectionExternalButtonHtmlTag = createHtmlTagWithClassName("div", "externalButton");
		sectionExternalButtonHtmlTag.appendChild(createHtmlTagWithClassName("div", "innerButton"));
		sectionExternalButtonHtmlTag.onclick = function() { toggleDisplaySectionOrSubsection(this); };
		sectionPlanHtmlTag.appendChild(sectionExternalButtonHtmlTag);
		if (planType === "normal") {
			sectionPlanHtmlTag.style.textAlign = "left";
		} else {
			sectionPlanHtmlTag.style.width = "130px";
			sectionPlanHtmlTag.appendChild(createHtmlTag("br"));
		}
		sectionName = planSectionObject.sectionName;
		sectionPlanHtmlTag.appendChild(createHtmlTagWithClassNameHrefTextContent("a", "sectionPlanTitle", "#" + sectionNameToId(sectionName), sectionName));
		sectionPlanHtmlTag.appendChild(createHtmlTag("br"));

		// add filter for each subsection
		if (planType === "normal") {
			for (planSubsectionObject of planSectionObject.subsections) {
				subsectionPlanHtmlTag = createHtmlTagWithClassName("div", "subsectionPlan");
				subsectionExternalButtonHtmlTag = createHtmlTagWithClassName("div", "externalButton");
				subsectionExternalButtonHtmlTag.appendChild(createHtmlTagWithClassName("div", "innerButton"));
				subsectionExternalButtonHtmlTag.onclick = function () { toggleDisplaySectionOrSubsection(this); };
				subsectionPlanHtmlTag.appendChild(subsectionExternalButtonHtmlTag);
				subsectionName = planSubsectionObject.subsectionName;
				subsectionPlanHtmlTag.appendChild(createHtmlTagWithClassNameHrefTextContent("a", "subsectionPlanTitle", "#" + sectionNameToId(subsectionName), subsectionName));
				sectionPlanHtmlTag.appendChild(subsectionPlanHtmlTag);
				sectionPlanHtmlTag.appendChild(createHtmlTag("br"));
			}
		}
		pagePlanHtmlTag.appendChild(sectionPlanHtmlTag);
	}
}

function buildAvgTypeFilters() // build filters for single, mo3, avg5, ...
{
	let avgTypeFiltersHtmlTag = createHtmlTagWithId("div", "filters"), avgTypeFilterHtmlTag, externalButtonHtmlTag, avgType;
	for (avgType of window.avgTypes) {
		avgTypeFilterHtmlTag = createHtmlTagWithClassName("div", "avgTypeFilter");
		externalButtonHtmlTag = createHtmlTagWithClassName("div", "externalButton");
		externalButtonHtmlTag.appendChild(createHtmlTagWithClassName("div", "innerButton"));
		externalButtonHtmlTag.onclick = function() { toggleDisplayAvgType(this); }; // onclick : hide/show every UNR of the type avgType
		avgTypeFilterHtmlTag.appendChild(externalButtonHtmlTag);
		avgTypeFilterHtmlTag.appendChild(createHtmlTag("br"));
		avgTypeFilterHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "avgTypeFilterName", avgType));
		avgTypeFiltersHtmlTag.appendChild(avgTypeFilterHtmlTag);
	}
	return avgTypeFiltersHtmlTag;
}

function buildRecords(planXmlTag) // build all sections, h2, subsections, h3 and record tables
{
	let sectionXmlTag, subsectionXmlTag, recordsHtmlTag = document.querySelector("#records"), sectionHtmlTag, subsectionHtmlTag;
	recordsHtmlTag.textContent = "";
	for (sectionXmlTag of planXmlTag.querySelectorAll("section")) {
		sectionHtmlTag = createHtmlTagWithIdAndClassName("section", sectionNameToId(sectionXmlTag.getAttribute("sectionName")), "recordsSection");
		sectionHtmlTag.appendChild(createHtmlTagWithTextContent("h2", sectionXmlTag.getAttribute("sectionName")));
		if (sectionXmlTag.querySelector("subsection") === null) { // compact mode : no subsection
			sectionHtmlTag.appendChild(buildTableForSection(sectionXmlTag));
		} else { // normal mode : some subsections in each section
			for (subsectionXmlTag of sectionXmlTag.querySelectorAll("subsection")) {
				subsectionHtmlTag = createHtmlTagWithIdAndClassName("section", sectionNameToId(subsectionXmlTag.getAttribute("subsectionName")), "recordsSubsection");
				subsectionHtmlTag.appendChild(createHtmlTagWithTextContent("h3", subsectionXmlTag.getAttribute("subsectionName")));
				subsectionHtmlTag.appendChild(buildTableForSection(subsectionXmlTag));
				sectionHtmlTag.appendChild(subsectionHtmlTag);
			}
		}
		recordsHtmlTag.appendChild(sectionHtmlTag);
	}
}

function buildTableForSection(sectionXmlTag) // build record table for input section/subsection
{
	let planEventXmlTag, tableHtmlTag = createHtmlTag("table"), trHtmlTag, tdHtmlTag, recordObject, avgType, time;

	// build header row
	trHtmlTag = createHtmlTag("tr");
	trHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Épreuve"));
	for (avgType of window.avgTypes) {
		trHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("th", avgType, avgType.charAt(0).toUpperCase() + avgType.substr(1,100)));
	}
	tableHtmlTag.appendChild(trHtmlTag);

	// build normal rows : for each event in sectionTag, each avg type, look for the corresponding data object in window.recordDataBase
	for (planEventXmlTag of sectionXmlTag.querySelectorAll("event")) {
		trHtmlTag = createHtmlTag("tr");
		trHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("td", "eventName", planEventXmlTag.textContent));
		for (avgType of window.avgTypes) {
			recordObject = findRecordObjectInDataBase(planEventXmlTag.textContent, avgType); // contains data for concerned UNR
			tdHtmlTag = createHtmlTagWithClassName("td", avgType);
			time = recordObject.time;
			if (time === "") {
				time = "x";
			}
			tdHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "time", time));
			tdHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "name", recordObject.name));
			if (recordObject.timeList.length !== 0) {
				tdHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "commentary", recordObject.timeList));
			}
			trHtmlTag.appendChild(tdHtmlTag);
		}
		tableHtmlTag.appendChild(trHtmlTag);
	}
	return tableHtmlTag;
}

function findRecordObjectInDataBase(eventName, avgType) // return dataBase element corresponding to input event name and avg type
{
	let dataBaseObject;
	for (dataBaseObject of window.recordsDataBase) {
		if (dataBaseObject.eventName === eventName && dataBaseObject.avgType === avgType) {
			return dataBaseObject;
		}
	}
	return null;
}


  /****************************/
 /* COMPUTING FOR STATISTICS */
/****************************/
/* All functions used to calculate data to build the statistics section. */

function initStatistics() // statistics initialization function
{
	countRecords();
	computeTopXLongestShortestStandingRecordEvents(5);
}

function countRecords() // count records in window.recordDataBase and store the result in window.countingArray for palmares section
{
	let dataBaseObject, personNames;
	window.countingArray = [];
	for (dataBaseObject of window.recordsDataBase) {
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

function listOfNamesToUpdateFromNameString(inputNamesList) // convert "firstPerson + secondPerson" to ["firstPerson", "secondPerson"]
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
	let dateSortedRecordArray = sortDataBaseByDate(window.recordsDataBase);
	window.topXLongestStandingRecordsEvents = aggregateFirstByDate(dateSortedRecordArray, nbEvents, "longestStanding");
	window.topXLongestStandingRecordsEvents[0].listOfTimes.shift(); // remove initial value because it appears twice
	window.topXShortestStandingRecordsEvents = aggregateFirstByDate(dateSortedRecordArray.reverse(), nbEvents, "shortestStanding");
	window.topXShortestStandingRecordsEvents[0].listOfTimes.pop(); // remove initial value because it appears twice
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
		listOfTimes: [{avgType: dateSortedRecordArray[0].avgType, time: dateSortedRecordArray[0].time}]
	};
	biggestAggregatedArray.push(lastElement);
	for (recordObject of dateSortedRecordArray) {
		if (recordObject.date.getTime() === lastElement.date.getTime() && recordObject.eventName === lastElement.eventName && recordObject.name === lastElement.name) {
			// correspondance found, just agregate to last element of the array
			if (mode === "longestStanding") { // agregating with longest standing mode
				biggestAggregatedArray[biggestAggregatedArray.length - 1].listOfTimes.push({avgType: recordObject.avgType, time: recordObject.time});
			} else { // agregating with shortest standing mode
				biggestAggregatedArray[biggestAggregatedArray.length - 1].listOfTimes.unshift({avgType: recordObject.avgType, time: recordObject.time});
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
					listOfTimes: [{avgType: recordObject.avgType, time: recordObject.time}]
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


  /****************************/
 /*    BUILDING STATISTICS   */
/****************************/
/* All functions used to build the record section of the HTML page. */

function buildStatistics()
{
	buildPalmaresSection(window.countingArray);
	buildTopXLongestStandingRecordsTable();
	buildTopXShortestStandingRecordsTable();
}

function buildPalmaresSection(countingArray) // build table with ranking on each person's UNR count
{
	let palmaresHtmlTag = document.querySelector("#palmares"), palmaresTableHtmlTag, palmaresRowHtmlTag, countingArrayElement, totalNbRecords;
	palmaresHtmlTag.textContent = "";

	// count records
	totalNbRecords = 0;
	for (countingArrayElement of countingArray) {
		totalNbRecords += countingArrayElement.count;
	}

	// build header and table tag
	palmaresHtmlTag.appendChild(createHtmlTagWithTextContent("h2", "Palmarès du nombre d'UNRs"));
	palmaresTableHtmlTag = createHtmlTag("table");

	// build palmares table header row
	palmaresRowHtmlTag = createHtmlTag("tr");
	palmaresRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Personne (" + countingArray.length + ")"));
	palmaresRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Nombre d'UNRs (" + totalNbRecords + ")"));
	palmaresRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Pourcentage des UNRs"));
	palmaresTableHtmlTag.appendChild(palmaresRowHtmlTag);

	// build rows of the palmares table
	for (countingArrayElement of countingArray) {
		palmaresRowHtmlTag = createHtmlTag("tr");
		palmaresRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", countingArrayElement.name));
		palmaresRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", countingArrayElement.count));
		palmaresRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", (100 * countingArrayElement.count / totalNbRecords + "").substring(0,4) + " %"));
		palmaresTableHtmlTag.appendChild(palmaresRowHtmlTag);
	}
	palmaresHtmlTag.appendChild(palmaresTableHtmlTag);
}

function buildTopXLongestStandingRecordsTable()
{
	let longestStandingHtmlTag = document.querySelector("#longestStanding");
	longestStandingHtmlTag.textContent = "";
	longestStandingHtmlTag.appendChild(createHtmlTagWithTextContent("h2", "UNRs les plus vieux"));
	longestStandingHtmlTag.appendChild(buildTopXLongestShortestStandingRecordsTable(window.topXLongestStandingRecordsEvents));
}

function buildTopXShortestStandingRecordsTable()
{
	let longestStandingHtmlTag = document.querySelector("#shortestStanding");
	longestStandingHtmlTag.textContent = "";
	longestStandingHtmlTag.appendChild(createHtmlTagWithTextContent("h2", "UNRs les plus récents"));
	longestStandingHtmlTag.appendChild(buildTopXLongestShortestStandingRecordsTable(window.topXShortestStandingRecordsEvents));
}

function buildTopXLongestShortestStandingRecordsTable(topXLongestOrShortestStandingRecordArray)
{
	let longestOrShortestStandingTableHtmlTag, longestOrShortestStandingRowHtmlTag, longestOrShortestStandingRecordObject;
	longestOrShortestStandingTableHtmlTag = createHtmlTag("table");

	// build longest/shortest standing table header row
	longestOrShortestStandingRowHtmlTag = createHtmlTag("tr");
	longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Rang"));
	longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Personne"));
	longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Date"));
	longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Event"));
	longestOrShortestStandingTableHtmlTag.appendChild(longestOrShortestStandingRowHtmlTag);

	// build rows of the longest/shortest standing record table
	for (longestOrShortestStandingRecordObject of topXLongestOrShortestStandingRecordArray) {
		longestOrShortestStandingRowHtmlTag = createHtmlTag("tr");
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", longestOrShortestStandingRecordObject.rank));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", longestOrShortestStandingRecordObject.name));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", dateToString(longestOrShortestStandingRecordObject.date)));
		longestOrShortestStandingRowHtmlTag.appendChild(createHtmlTagWithTextContent("td", longestOrShortestStandingRecordObject.eventName + " " + longestShortestStandingListOfTimesToAvgTypes(longestOrShortestStandingRecordObject.listOfTimes)));
		longestOrShortestStandingTableHtmlTag.appendChild(longestOrShortestStandingRowHtmlTag);
	}
	return longestOrShortestStandingTableHtmlTag;
}

function longestShortestStandingListOfTimesToAvgTypes(inputListOfTimesArray)
{
	let outputString = "", listOfTimesElement;
	for (listOfTimesElement of inputListOfTimesArray) {
		outputString += ", " + listOfTimesElement.avgType;
	}
	return "(" + outputString.substring(2) + ")";
}


  /****************************/
 /*      TOGGLE DISPLAY      */
/****************************/
/* All function used as onclick to show/hide plan/section/subsection/avgType or toggle between compact/normal modes. */

function toggleCompactMode() // toggle between compact and normal mode
{
	let unrDataXmlTag = window.unrXmlData, planXmlTag, compactModeButtonOnOnPositionHtmlTag, compactModeButtonOnOffPositionHtmlTag = document.querySelector("#offCompactButton"), planType;
	if (compactModeButtonOnOffPositionHtmlTag) { // switch to compact mode
		planType = "compact";
		planXmlTag = unrDataXmlTag.querySelector("compactPlan");
		compactModeButtonOnOffPositionHtmlTag.id = "onCompactButton";
		compactModeButtonOnOffPositionHtmlTag.textContent = "Repasser en Mode Normal";
	} else { //switch back to normal mode
		planType = "normal";
		compactModeButtonOnOnPositionHtmlTag = document.querySelector("#onCompactButton");
		planXmlTag = unrDataXmlTag.querySelector("normalPlan");
		compactModeButtonOnOnPositionHtmlTag.id = "offCompactButton";
		compactModeButtonOnOnPositionHtmlTag.textContent = "Passer en Mode Compact";
	}
	buildPlan(planType); // update plan and filters
	buildRecords(planXmlTag); // update record sections and tables
}

function toggleDisplayPlan() // toggle display of filters section between none and inline-block modes
{
	let pagePlanHtmlTag = document.querySelector("#pagePlan");
	if (pagePlanHtmlTag.style.display === "none") {
		pagePlanHtmlTag.style.display = "inline-block";
	} else {
		pagePlanHtmlTag.style.display = "none";
	}
}

function toggleDisplayAvgType(externalButtonHtmlTag) // toggle between none and default display for each UNR of selected avgType
{
	let thisAvgTypeHtmlTags = document.querySelectorAll("." + externalButtonHtmlTag.parentNode.querySelector(".avgTypeFilterName").textContent);
	if (thisAvgTypeHtmlTags[0].style.display === "") { // if they are displayed, they should be hidden
		// show each tag in tagsOfThisAvgType
		thisAvgTypeHtmlTags.forEach(function (tagToHide) { tagToHide.style.display = "none"; });
		switchToggleButtonToOff(externalButtonHtmlTag.querySelector(".innerButton"));
	} else { // else they are hidden and they should be displayed
		// hide each tag in tagsOfThisAvgType
		thisAvgTypeHtmlTags.forEach(function (tagToShow) { tagToShow.style.display = ""; });
		switchToggleButtonToOn(externalButtonHtmlTag.querySelector(".innerButton"));
	}
}

function toggleDisplaySectionOrSubsection(externalButtonHtmlTag) // toggle between none and default display for selected section
{
	let sectionOrSubsectionHtmlTag = document.querySelector("#" + sectionNameToId(externalButtonHtmlTag.parentNode.querySelector("a").textContent));
	if (sectionOrSubsectionHtmlTag.style.display === "") { // if it's displayed, it should be hidden
		sectionOrSubsectionHtmlTag.style.display = "none";
		switchToggleButtonToOff(externalButtonHtmlTag.querySelector(".innerButton"));
	} else { // else it's hidden and it should be displayed
		sectionOrSubsectionHtmlTag.style.display = "";
		switchToggleButtonToOn(externalButtonHtmlTag.querySelector(".innerButton"));
	}
}

function switchToggleButtonToOn(innerButtonHtmlTag) // switch button from off position to on position
{
	innerButtonHtmlTag.style.background = "rgb(100,255,100)";
	innerButtonHtmlTag.style.transform = "translate(0px,-4px)";
}

function switchToggleButtonToOff(innerButtonHtmlTag) // switch button from on position to off position
{
	innerButtonHtmlTag.style.background = "rgb(255,100,100)";
	innerButtonHtmlTag.style.transform = "translate(22px,-4px)";
}


  /****************************/
 /*      GENERAL UTILS       */
/****************************/
/* All utility function used to initialize data and build page. */

function sectionNameToId(name) // transform a section name to id format
{
	let id = name;
	while (id.includes(" ")) { // replace every space by underscore
		id = id.replace(" ", "_");
	}
	while (id.includes(",")) { // delete every comma
		id = id.replace(",", "");
	}
	return id;
}

function dateOfString(dateString) // build a Date object from a string of the form "yyyy-mm-dd"
{
	return new Date(dateString.substring(0, 4), dateString.substring(5, 7) - 1, dateString.substring(8, 10)); // months are in [0..11] in Date objects
}

function dateToString(date) // build a displayable string from a Date object
{
	let dateString, monthString, dayString, year, month, dateOfMonth, day;
	year = date.getFullYear();
	month = date.getMonth();
	dateOfMonth = date.getDate();
	day = date.getDay();
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
	dateString = dayString + " " + dateOfMonth + " " + monthString + " " + year;
	return dateString;
}

function listToArray(inputListString) // convert a string of the form "a, b, c" to an array of the form ["a", "b", "c"]
{
	let listString = inputListString, outputArray = [], indexOfComma;
	if (listString === "") { // if the list is empty, return an empty array
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

  /****************************/
 /*   BUILDING PAGE UTILS    */
/****************************/
/* All function used to create HTML tags. */

function createHtmlTag(tagType) // create simple tag
{
	return document.createElement(tagType);
}

function createHtmlTagWithId(tagType, tagId) // create simple tag and set its id attribute
{
	let htmlTag = document.createElement(tagType);
	htmlTag.id = tagId;
	return htmlTag;
}

function createHtmlTagWithClassName(tagType, tagClassName) // create simple tag and set its class attribute
{
	let htmlTag = document.createElement(tagType);
	htmlTag.className = tagClassName;
	return htmlTag;
}

function createHtmlTagWithTextContent(tagType, tagTextContent) // create simple tag and set its text content
{
	let htmlTag = document.createElement(tagType);
	htmlTag.textContent = tagTextContent;
	return htmlTag;
}

function createHtmlTagWithIdAndClassName(tagType, tagId, tagClassName) // create simple tag and set its id and class attributes
{
	let htmlTag = document.createElement(tagType);
	htmlTag.id = tagId;
	htmlTag.className = tagClassName;
	return htmlTag;
}

function createHtmlTagWithClassNameAndTextContent(tagType, tagClassName, tagTextContent) // create simple tag and set its class attribute and text content
{
	let htmlTag = document.createElement(tagType);
	htmlTag.className = tagClassName;
	htmlTag.textContent = tagTextContent;
	return htmlTag;
}

function createHtmlTagWithClassNameHrefTextContent(tagType, tagClassName, tagHref, tagTextContent) // create simple tag and set text content and class and href attributes
{
	let htmlTag = document.createElement(tagType);
	htmlTag.className = tagClassName;
	htmlTag.href = tagHref;
	htmlTag.textContent = tagTextContent;
	return htmlTag;
}
