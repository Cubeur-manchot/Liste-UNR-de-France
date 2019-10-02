"use strict";

  /***************************/
 /*          UTILS          */
/***************************/

function createTag(tagType)
{
	return document.createElement(tagType);
}

function createTagWithId(tagType, tagId)
{
	let tag = document.createElement(tagType);
	tag.id = tagId;
	return tag;
}

function createTagWithClassName(tagType, tagClassName)
{
	let tag = document.createElement(tagType);
	tag.className = tagClassName;
	return tag;
}

function createTagWithInnerHTML(tagType, tagInnerHTML)
{
	let tag = document.createElement(tagType);
	tag.textContent = tagInnerHTML;
	return tag;
}

function createTagWithIdAndClassName(tagType, tagId, tagClassName)
{
	let tag = document.createElement(tagType);
	tag.id = tagId;
	tag.className = tagClassName;
	return tag;
}

function createTagWithClassNameAndInnerHTML(tagType, tagClassName, tagInnerHTML)
{
	let tag = document.createElement(tagType);
	tag.className = tagClassName;
	tag.textContent = tagInnerHTML;
	return tag;
}

function createTagWithClassNameHrefInnerHTML(tagType, tagClassName, tagHref, tagInnerHTML)
{
	let tag = document.createElement(tagType);
	tag.className = tagClassName;
	tag.href = tagHref;
	tag.textContent = tagInnerHTML;
	return tag;
}

  /***************************/
 /*     TOGGLE DISPLAY      */
/***************************/

function toggleCompactMode() // toggle between compact and normal mode
{
	let xml = window.unrXmlData;
	let compactModeButtonOnOffPosition = document.querySelector("#offCompactButton");
	let compactModeButtonOnOnPosition;
	let planTag;
	if (compactModeButtonOnOffPosition) { // switch to compact mode
	//if (compactModeButtonOnOnPosition === null) { // switch to compact mode
		planTag = xml.querySelector("compactPlan");
		compactModeButtonOnOffPosition.id = "onCompactButton";
		compactModeButtonOnOffPosition.textContent = "Repasser en Mode Normal";
	} else { //switch back to normal mode
		compactModeButtonOnOnPosition = document.querySelector("#onCompactButton");
		planTag = xml.querySelector("normalPlan");
		compactModeButtonOnOnPosition.id = "offCompactButton";
		compactModeButtonOnOnPosition.textContent = "Passer en Mode Compact";
	}
	buildRecords(planTag);
	buildPlan(planTag);
}

function toggleDisplayPlan() // toggle between 'none' and 'inline-block' display for #pagePlan box
{
	let pagePlan = document.querySelector("#pagePlan");
	if (pagePlan.style.display === "none") {
		pagePlan.style.display = "inline-block";
	} else {
		pagePlan.style.display = "none";
	}
}

function toggleDisplayAvgType(externalButton) // toggle between 'none' and default display for selected avgType
{
	let tagsOfThisAvgType = document.querySelectorAll("." + externalButton.parentNode.querySelector(".avgTypeFilterName").textContent);
	if (tagsOfThisAvgType[0].style.display === "none") { // else it's hidden and it should be displayed
		// show each tag in tagsOfThisAvgType
		tagsOfThisAvgType.forEach(function (tagToHide) { tagToHide.style.display = ""; });
		switchToggleButtonToOn(externalButton.querySelector(".innerButton"));
	} else { // if it's displayed, it should be hidden
		// hide each tag in tagsOfThisAvgType
		tagsOfThisAvgType.forEach(function (tagToHide) { tagToHide.style.display = "none"; });
		switchToggleButtonToOff(externalButton.querySelector(".innerButton"));
	}
}

function toggleDisplaySectionOrSubsection(externalButton)
{
	let sectionOrSubsection = document.querySelector("#" + sectionNameToId(externalButton.parentNode.querySelector("a").textContent));
	if (sectionOrSubsection.style.display === "") {
		sectionOrSubsection.style.display = "none";
		switchToggleButtonToOff(externalButton.querySelector(".innerButton"));
	} else {
		sectionOrSubsection.style.display = "";
		switchToggleButtonToOn(externalButton.querySelector(".innerButton"));
	}
}

function switchToggleButtonToOn(toggleButton)
{
	toggleButton.style.background = "rgb(100,255,100)";
	toggleButton.style.transform = "translate(0px,-4px)";
}

function switchToggleButtonToOff(toggleButton)
{
	toggleButton.style.background = "rgb(255,100,100)";
	toggleButton.style.transform = "translate(22px,-4px)";
}

  /***************************/
 /*      BUILDING PAGE      */
/***************************/

function buildPage()
{
	init();
	buildPlan(window.unrXmlData.querySelector("normalPlan"));
	document.querySelector("#pagePlan").style.display = "none";
	buildRecords(window.unrXmlData.querySelector("normalPlan"));
	buildPalmaresSection(window.countingArray);
}

function init()
{
	// initialize records data
	let xmlHttp;
	if(window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject("Microsoft.xmlHttp");
	}
	/*
	TOUT DOUX : mettre le false à true pour faire un appel asynchrone à unrData.xml
	NB : trouver comment on attend la réponse du serveur
	*/
	xmlHttp.open("get", "unrData.xml", false);
	xmlHttp.send();
	window.unrXmlData = xmlHttp.responseXML.querySelector("xml");

	// initialize records avgTypes
	window.avgTypes = ["single","mo3","avg5","avg12","avg50","avg100"];

	// store xml content in window.recordDataBase
	storeInDataBase();

	// count records for palmares section
	countRecords(window.recordDataBase);
}

function storeInDataBase()
{
	let recordsXmlTag, recordEvent, avgType, recordXmlTag, dataBaseObject, eventName, compactPlanSectionName, normalPlanSectionAndSubsectionName, normalPlanSubsectionName, normalPlanSectionName;
	window.recordDataBase = [];
	recordsXmlTag = window.unrXmlData.querySelector("records");
	for (recordEvent of recordsXmlTag.querySelectorAll("event")) {
		eventName = recordEvent.getAttribute("eventName");
		compactPlanSectionName = findCompactPlanSectionNameFromEventName(eventName);
		normalPlanSectionAndSubsectionName = findNormalPlanSectionAndSubsectionFromEventName(eventName);
		normalPlanSectionName = normalPlanSectionAndSubsectionName.sectionName;
		normalPlanSubsectionName = normalPlanSectionAndSubsectionName.subsectionName;
		for (avgType of window.avgTypes) {
			recordXmlTag = recordEvent.querySelector(avgType);
			dataBaseObject = {};
			dataBaseObject.eventName = eventName;
			dataBaseObject.avgType = avgType;
			dataBaseObject.name = recordXmlTag.getAttribute("name");
			dataBaseObject.time = recordXmlTag.getAttribute("time");
			if (recordXmlTag.getAttribute("memoTimeList") === null) {
				dataBaseObject.memoTimeList = "";
			} else {
				dataBaseObject.memoTimeList = listToArray(recordXmlTag.getAttribute("memoTimeList"));
			}
			dataBaseObject.timeList = listToArray(recordXmlTag.getAttribute("timeList"));
			dataBaseObject.scrambleList = listToArray(recordXmlTag.getAttribute("name"));
			dataBaseObject.date = dateOfString(recordXmlTag.getAttribute("date"));
			dataBaseObject.youtubeLink = recordXmlTag.getAttribute("youtubeLink");
			dataBaseObject.francocubeLink = recordXmlTag.getAttribute("francocubeLink");
			dataBaseObject.compactPlanSection = compactPlanSectionName;
			dataBaseObject.normalPlanSection = normalPlanSectionName;
			dataBaseObject.normalPlanSubsection = normalPlanSubsectionName;
			window.recordDataBase.push(dataBaseObject);
		}
	}
}

function dateOfString(dateString) // build a Date object from a string of the form yyyy-mm-dd
{
	return new Date(dateString.substring(0, 4), dateString.substring(5, 7), dateString.substring(8, 10));
}

function findCompactPlanSectionNameFromEventName(eventName)
{
	let section, eventTag;
	for (section of window.unrXmlData.querySelector("compactPlan").querySelectorAll("section")) {
		for (eventTag of section.querySelectorAll("event")) {
			if (eventTag.textContent === eventName) {
				return section.getAttribute("sectionName");
			}
		}
	}
	return null;
}

function findNormalPlanSectionAndSubsectionFromEventName(eventName)
{
	let section, subsection, eventTag;
	for (section of window.unrXmlData.querySelector("normalPlan").querySelectorAll("section")) {
		for (subsection of section.querySelectorAll("subsection")) {
			for (eventTag of subsection.querySelectorAll("event")) {
				if (eventTag.textContent === eventName) {
					return {sectionName: section.getAttribute("sectionName"), subsectionName: subsection.getAttribute("subsectionName")};
				}
			}
		}
	}
	return null;
}

function listToArray(inputListString) // convert a string of the form "a, b, c" to an array of the form ["a", "b", "c"]
{
	let indexOfComma;
	let outputArray = [];
	let listString = inputListString;
	if (listString === "") { // if the list is empty, return an empty array
		return outputArray;
	}
	while (listString.includes(", ")) // else there are at least 1 element, we cut at every ", "
	{
		indexOfComma = listString.indexOf(", ");
		outputArray.push(listString.substring(0, indexOfComma));
		listString = listString.substring(indexOfComma + 2, 1000);
	}
	outputArray.push(listString);
	return outputArray;
}

function buildPlan(xmlPlan)
{
	let compact, section, sectionName, sectionPlan, sectionExternalButton, subsection, subsectionName, subsectionPlan, subsectionExternalButton;
	let pagePlan = document.querySelector("#pagePlan");
	pagePlan.textContent = "";

	// add filters for single, mo3, avg5...
	pagePlan.appendChild(buildAvgTypeFilters());

	// add filter for each section
	compact = document.querySelector("#onCompactButton") !== null;
	for (section of xmlPlan.querySelectorAll("section")) {
		sectionPlan = createTagWithClassName("div", "sectionPlan");
		sectionExternalButton = createTagWithClassName("div", "externalButton");
		sectionExternalButton.appendChild(createTagWithClassName("div", "innerButton"));
		sectionExternalButton.onclick = function() { toggleDisplaySectionOrSubsection(this); };
		sectionPlan.appendChild(sectionExternalButton);
		if (compact) {
			sectionPlan.style.width = "130px";
			sectionPlan.appendChild(createTag("br"));
		} else {
			sectionPlan.style.textAlign = "left";
		}
		sectionName = section.getAttribute("sectionName");
		sectionPlan.appendChild(createTagWithClassNameHrefInnerHTML("a", "sectionPlanTitle", "#" + sectionNameToId(sectionName), sectionName));
		sectionPlan.appendChild(createTag("br"));

		// add filter for each subsection
		for (subsection of section.querySelectorAll("subsection")) {
			subsectionPlan = createTagWithClassName("div", "subsectionPlan");
			subsectionExternalButton = createTagWithClassName("div", "externalButton");
			subsectionExternalButton.appendChild(createTagWithClassName("div", "innerButton"));
			subsectionExternalButton.onclick = function() { toggleDisplaySectionOrSubsection(this); };
			subsectionPlan.appendChild(subsectionExternalButton);
			subsectionName = subsection.getAttribute("subsectionName");
			subsectionPlan.appendChild(createTagWithClassNameHrefInnerHTML("a", "subsectionPlanTitle", "#" + sectionNameToId(subsectionName), subsectionName));
			sectionPlan.appendChild(subsectionPlan);
			sectionPlan.appendChild(createTag("br"));
		}
		pagePlan.appendChild(sectionPlan);
	}
}

function buildAvgTypeFilters()
{
	let avgType, avgTypeFilter, externalButton;
	let avgTypeFilters = createTagWithId("div", "filters");
	for (avgType of window.avgTypes) {
		avgTypeFilter = createTagWithClassName("div", "avgTypeFilter");
		externalButton = createTagWithClassName("div", "externalButton");
		externalButton.appendChild(createTagWithClassName("div", "innerButton"));
		externalButton.onclick = function() { toggleDisplayAvgType(this); };
		avgTypeFilter.appendChild(externalButton);
		avgTypeFilter.appendChild(createTag("br"));
		avgTypeFilter.appendChild(createTagWithClassNameAndInnerHTML("div", "avgTypeFilterName", avgType));
		avgTypeFilters.appendChild(avgTypeFilter);
	}
	return avgTypeFilters;
}

function buildRecords(xmlPlan)
{
	let section, sectionTag, subsection, subsectionTag;
	let recordsTag = document.querySelector("#records");
	recordsTag.textContent = "";
	for (section of xmlPlan.querySelectorAll("section")) {
		sectionTag = createTagWithIdAndClassName("section", sectionNameToId(section.getAttribute("sectionName")), "recordsSection");
		sectionTag.appendChild(createTagWithInnerHTML("h2", section.getAttribute("sectionName")));
		if (section.querySelector("subsection") === null) { // compact mode : no subsection
			sectionTag.appendChild(buildTableFromSection(section));
		} else { // normal mode : some subsections in each section
			for (subsection of section.querySelectorAll("subsection")) {
				subsectionTag = createTagWithIdAndClassName("section", sectionNameToId(subsection.getAttribute("subsectionName")), "recordsSubsection");
				subsectionTag.appendChild(createTagWithInnerHTML("h3", subsection.getAttribute("subsectionName")));
				subsectionTag.appendChild(buildTableFromSection(subsection));
				sectionTag.appendChild(subsectionTag);
			}
		}
		recordsTag.appendChild(sectionTag);
	}
}

function buildTableFromSection(sectionTag)
{
	let planEvent, trTag, avgType, recordObject, tdTag, time;
	let tableTag = createTag("table");

	// build header row
	trTag = createTag("tr");
	trTag.appendChild(createTagWithInnerHTML("th", "Épreuve"));
	for (avgType of window.avgTypes) {
		trTag.appendChild(createTagWithClassNameAndInnerHTML("th", avgType, avgType.charAt(0).toUpperCase() + avgType.substr(1,100)));
	}
	tableTag.appendChild(trTag);

	// build normal rows : for each event in sectionTag, look for the corresponding event in recordsXMLTag
	for (planEvent of sectionTag.querySelectorAll("event")) {
		trTag = createTag("tr");
		trTag.appendChild(createTagWithClassNameAndInnerHTML("td", "eventName", planEvent.textContent));
		for (avgType of window.avgTypes) {
			recordObject = findEventRecordXMLTag(planEvent.textContent, avgType);
			tdTag = createTagWithClassName("td", avgType);
			time = recordObject.time;
			if (time === "") {
				time = "x";
			}
			tdTag.appendChild(createTagWithClassNameAndInnerHTML("div", "time", time));
			tdTag.appendChild(createTagWithClassNameAndInnerHTML("div", "name", recordObject.name));
			if (recordObject.timeList.length !== 0) {
				tdTag.appendChild(createTagWithClassNameAndInnerHTML("div", "commentary", recordObject.timeList));
			}
			trTag.appendChild(tdTag);
		}
		tableTag.appendChild(trTag);
	}
	return tableTag;
}


function findEventRecordXMLTag(eventName, avgType)
{
	let dataBaseObject;
	for (dataBaseObject of window.recordDataBase) {
		if (dataBaseObject.eventName === eventName && dataBaseObject.avgType === avgType) {
			return dataBaseObject;
		}
	}
	return null;
}
function countRecords(recordDataBase)
{
	let dataBaseObject, name, listOfNamesToAdd;
	window.countingArray = [];
	for (dataBaseObject of recordDataBase) {
		name = dataBaseObject.name;
		if (name !== "") {
			listOfNamesToAdd = listOfNamesToUpdateFromNameString(name);
			addNamesInCountingArray(window.countingArray, listOfNamesToAdd);
		}
	}
}

function listOfNamesToUpdateFromNameString(inputName)
{
	let indexOfPlus;
	let name = inputName;
	let listOfNamesToUpdate = [];
	while(name.includes(" + ")) {
		indexOfPlus = name.indexOf(" + ");
		listOfNamesToUpdate.push(name.substring(0, indexOfPlus));
		name = name.substring(indexOfPlus + 3, 1000);
	}
	listOfNamesToUpdate.push(name);
	return listOfNamesToUpdate;
}

function addNamesInCountingArray(countingArray, listOfNamesToUpdate)
{
	let name, count, countingArrayIndex;
	for (name of listOfNamesToUpdate) {
		countingArrayIndex = findIndexInCountingArray(countingArray, name);
		if (countingArrayIndex === -1) { // if the name is not in the list, it should be added to it
			countingArray.push({name: name, count: 1});
		} else { // if the name is already in the list, count and ranking should be updated
			countingArray[countingArrayIndex].count++;
			count = countingArray[countingArrayIndex].count;
			while (countingArrayIndex > 0 && countingArray[countingArrayIndex].count > countingArray[countingArrayIndex-1].count) {
				countingArray[countingArrayIndex].name = countingArray[countingArrayIndex-1].name;
				countingArray[countingArrayIndex].count = countingArray[countingArrayIndex-1].count;
				countingArray[countingArrayIndex-1].name = name;
				countingArray[countingArrayIndex-1].count = count;
				countingArrayIndex--;
			}
		}
	}
}

function findIndexInCountingArray(countingArray, name)
{
	let countingArrayElement;
	for (countingArrayElement of countingArray) {
		if (countingArrayElement.name === name) {
			return countingArray.indexOf(countingArrayElement);
		}
	}
	return -1;
}

function buildPalmaresSection(countingArray)
{
	let palmaresTable, palmaresHeader, palmaresLine, countingArrayElement, totalNbRecords;
	let palmares = document.querySelector("#palmares");
	palmares.textContent = "";

	// count records
	totalNbRecords = 0;
	for (countingArrayElement of countingArray) {
		totalNbRecords += countingArrayElement.count;
	}

	// build header and table tag
	palmares.appendChild(createTagWithInnerHTML("h2", "Palmarès du nombre d'UNRs"));
	palmaresTable = createTag("table");

	// build palmares table header line
	palmaresHeader = createTag("tr");
	palmaresHeader.appendChild(createTagWithInnerHTML("th", "Personne (" + countingArray.length + ")"));
	palmaresHeader.appendChild(createTagWithInnerHTML("th", "Nombre d'UNRs (" + totalNbRecords + ")"));
	palmaresHeader.appendChild(createTagWithInnerHTML("th", "Pourcentage des UNRs"));
	palmaresTable.appendChild(palmaresHeader);

	// build rows of the palmares table
	for (countingArrayElement of countingArray) {
		palmaresLine = createTag("tr");
		palmaresLine.appendChild(createTagWithInnerHTML("td", countingArrayElement.name));
		palmaresLine.appendChild(createTagWithInnerHTML("td", countingArrayElement.count));
		palmaresLine.appendChild(createTagWithInnerHTML("td", (100 * countingArrayElement.count / totalNbRecords + "").substring(0,4) + " %"));
		palmaresTable.appendChild(palmaresLine);
	}
	palmares.appendChild(palmaresTable);
}

function sectionNameToId(name)
{
	let id = name;
	while (id.includes(" ")) {
		id = id.replace(" ", "_");
	}
	while (id.includes(",")) {
		id = id.replace(",", "");
	}
	return id;
}