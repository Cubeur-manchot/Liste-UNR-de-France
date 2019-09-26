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
	tag.innerHTML = tagInnerHTML;
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
	tag.innerHTML = tagInnerHTML;
	return tag;
}

function createTagWithClassNameHrefInnerHTML(tagType, tagClassName, tagHref, tagInnerHTML)
{
	let tag = document.createElement(tagType);
	tag.className = tagClassName;
	tag.href = tagHref;
	tag.innerHTML = tagInnerHTML;
	return tag;
}

function createTagWithClassNameHrefTitleTarget(tagType, tagClassName, tagHref, tagTitle, tagTarget)
{
	let tag = document.createElement(tagType);
	tag.className = tagClassName;
	tag.href = tagHref;
	tag.title = tagTitle;
	tag.target = tagTarget;
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
		compactModeButtonOnOffPosition.innerHTML = "Repasser en Mode Normal";
	} else { //switch back to normal mode
		compactModeButtonOnOnPosition = document.querySelector("#onCompactButton");
		planTag = xml.querySelector("normalPlan");
		compactModeButtonOnOnPosition.id = "offCompactButton";
		compactModeButtonOnOnPosition.innerHTML = "Passer en Mode Compact";
	}
	buildRecords(planTag, xml.querySelector("records"));
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
	let tagsOfThisAvgType = document.querySelectorAll("." + externalButton.parentNode.querySelector(".avgTypeFilterName").innerHTML);
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
	let sectionOrSubsection = document.querySelector("#" + sectionNameToId(externalButton.parentNode.querySelector("a").innerHTML));
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
	buildRecords(window.unrXmlData.querySelector("normalPlan"), window.unrXmlData.querySelector("records"));
	buildPalmares(window.unrXmlData.querySelector("records"));
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
}

function buildPlan(xmlPlan)
{
	let pagePlan = document.querySelector("#pagePlan");
	pagePlan.innerHTML = "";
	
	// add filters for single, mo3, avg5...
	pagePlan.appendChild(buildAvgTypeFilters());
	
	// add filter for each section
	let sections = xmlPlan.querySelectorAll("section");
	let compact = document.querySelector("#onCompactButton") !== null;
	for (let section of sections) {
		let sectionPlan = createTagWithClassName("div", "sectionPlan");
		let sectionExternalButton = createTagWithClassName("div", "externalButton");
		sectionExternalButton.appendChild(createTagWithClassName("div", "innerButton"));
		sectionExternalButton.onclick = function() { toggleDisplaySectionOrSubsection(this); };
		sectionPlan.appendChild(sectionExternalButton);
		if (compact) {
			sectionPlan.style.width = "130px";
			sectionPlan.appendChild(createTag("br"));
		} else {
			sectionPlan.style.textAlign = "left";
		}
		sectionPlan.appendChild(createTagWithClassNameHrefInnerHTML("a", "sectionPlanTitle", "#" + sectionNameToId(section.getAttribute("nom")), section.getAttribute("nom")));
		sectionPlan.appendChild(createTag("br"));
		
		// add filter for each subsection
		let subsections = section.querySelectorAll("subsection");
		for (let subsection of subsections) {
			let subsectionPlan = createTagWithClassName("div", "subsectionPlan");
			let externalButton = createTagWithClassName("div", "externalButton");
			externalButton.appendChild(createTagWithClassName("div", "innerButton"));
			externalButton.onclick = function() { toggleDisplaySectionOrSubsection(this); };
			subsectionPlan.appendChild(externalButton);
			subsectionPlan.appendChild(createTagWithClassNameHrefInnerHTML("a", "subsectionPlanTitle", "#" + sectionNameToId(subsection.getAttribute("nom")), subsection.getAttribute("nom")));
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

function buildRecords(xmlPlan, xmlRecords)
{
	let section, sectionTag, subsection, subsectionTag;
	let recordsTag = document.querySelector("#records");
	recordsTag.innerHTML = "";
	for (section of xmlPlan.querySelectorAll("section")) {
		sectionTag = createTagWithIdAndClassName("section", sectionNameToId(section.getAttribute("nom")), "recordsSection");
		sectionTag.appendChild(createTagWithInnerHTML("h2", section.getAttribute("nom")));
		if (section.querySelector("subsection") === null) { // compact mode : no subsection
			sectionTag.appendChild(buildTableFromSection(section, xmlRecords));
		} else { // normal mode : some subsections in each section
			for (subsection of section.querySelectorAll("subsection")) {
				subsectionTag = createTagWithIdAndClassName("section", sectionNameToId(subsection.getAttribute("nom")), "recordsSubsection");
				subsectionTag.appendChild(createTagWithInnerHTML("h3", subsection.getAttribute("nom")));
				subsectionTag.appendChild(buildTableFromSection(subsection, xmlRecords));
				sectionTag.appendChild(subsectionTag);
			}
		}
		recordsTag.appendChild(sectionTag);
	}
}

function buildTableFromSection(sectionTag, recordsXMLTag)
{
	let planEvent, trTag, avgType, recordEvent, recordTag, tdTag;
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
		for (recordEvent of recordsXMLTag.querySelectorAll("event")) {
			if (recordEvent.getAttribute("nom") !== planEvent.innerHTML) {
				continue;
			}
			trTag = createTag("tr");
			trTag.appendChild(createTagWithClassNameAndInnerHTML("td", "eventName", planEvent.innerHTML));
			for (avgType of window.avgTypes) {
				recordTag = recordEvent.querySelector(avgType);
				tdTag = createTagWithClassName("td", recordTag.tagName);
				tdTag.appendChild(createTagWithClassNameAndInnerHTML("div", "temps", recordTag.getAttribute("temps") !== "" ? recordTag.getAttribute("temps") : "x"));
				tdTag.appendChild(createTagWithClassNameAndInnerHTML("div", "nom", recordTag.getAttribute("nom")));
				if (recordTag.getAttribute("commentary") !== "") {
					tdTag.appendChild(createTagWithClassNameAndInnerHTML("div", "commentary", recordTag.getAttribute("commentary")));
				}
				trTag.appendChild(tdTag);
			}
			tableTag.appendChild(trTag);
			break;
		}
	}
	return tableTag;
}

function buildPalmares(recordsXmlTag)
{
	let avgType, recordEvent, name, listOfNamesToUpdate, indexOfPlus, countForThisPerson, totalNbRecords, palmaresHeader, palmaresTable, palmaresLine, countingArrayRow;
	// count records
	let countingArray = [];
	let palmares = document.querySelector("#palmares");
	for (recordEvent of recordsXmlTag.querySelectorAll("event")) {
		for (avgType of window.avgTypes) {
			name = recordEvent.querySelectorAll(avgType)[0].getAttribute("nom");
			if (name === "") {
				continue;
			}
			listOfNamesToUpdate = [];
			while(name.includes("+")) {
				indexOfPlus = name.indexOf("+");
				listOfNamesToUpdate.push(name.substring(0,indexOfPlus - 1));
				name = name.substring(indexOfPlus + 2,1000);
			}
			listOfNamesToUpdate.push(name);

			// à couper et mettre dans une fonction à part
			for (name of listOfNamesToUpdate) {
				for (var j = 0; j < countingArray.length; j++) { // un for...in à faire ?
					if (name === countingArray[j].name) { // if the name is already in the list, count and ranking should be updated
						countForThisPerson = ++countingArray[j].count;
						while (j > 0 && countingArray[j].count > countingArray[j-1].count) {
							countingArray[j].name = countingArray[j-1].name;
							countingArray[j].count = countingArray[j-1].count;
							countingArray[j-1].name = name;
							countingArray[j-1].count = countForThisPerson;
							j--;
						}
						break;
					}
				}
				if (j === countingArray.length) { // if the name is not in the list, it should be added to it
					countingArray[j] = {name: name, count: 1};
				}
			}
		}
	}
	totalNbRecords = 0;
	for (avgType of window.avgTypes) {
		totalNbRecords += recordsXmlTag.querySelectorAll(avgType).length;
	}
	palmares.appendChild(createTagWithInnerHTML("h2", "Palmarès du nombre d'UNRs"));
	palmaresTable = createTag("table");
	
	// build palmares table header line
	palmaresHeader = createTag("tr");
	palmaresHeader.appendChild(createTagWithInnerHTML("th", "Personne (" + countingArray.length + ")"));
	palmaresHeader.appendChild(createTagWithInnerHTML("th", "Nombre d'UNRs (" + totalNbRecords + ")"));
	palmaresHeader.appendChild(createTagWithInnerHTML("th", "Pourcentage des UNRs"));
	palmaresTable.appendChild(palmaresHeader);
	
	// build rows of the palmares table
	for (countingArrayRow of countingArray) {
		palmaresLine = createTag("tr");
		palmaresLine.appendChild(createTagWithInnerHTML("td", countingArrayRow.name));
		palmaresLine.appendChild(createTagWithInnerHTML("td", countingArrayRow.count));
		palmaresLine.appendChild(createTagWithInnerHTML("td", (100 * countingArrayRow.count / totalNbRecords + "").substring(0,4) + " %"));
		palmaresTable.appendChild(palmaresLine);
	}
	palmares.appendChild(palmaresTable);
}

function sectionNameToId(name)
{
	let id = name;
	while(id.includes(" ")) {
		id = id.replace(" ", "_");
	}
	while(id.includes(",")) {
		id = id.replace(",", "");
	}
	return id;
}