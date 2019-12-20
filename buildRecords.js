"use strict";

// import functions from tagCreator.js
/* global createHtmlTag, createHtmlTagWithClassName, createHtmlTagWithTextContent, createHtmlTagWithIdAndClassName, createHtmlTagWithClassNameAndTextContent */

// import functions from utils.js
/* global sectionNameToId */

function buildRecords(planObject) // build all sections, h2, subsections, h3 and record tables
{
	let recordsHtmlTag = document.querySelector("#records"), sectionHtmlTag, subsectionHtmlTag, sectionObject, subsectionObject;
	recordsHtmlTag.textContent = "";
	for (sectionObject of planObject.sections) {
		sectionHtmlTag = createHtmlTagWithIdAndClassName("section", sectionNameToId(sectionObject.sectionName), "recordsSection");
		sectionHtmlTag.appendChild(createHtmlTagWithTextContent("h2", sectionObject.sectionName));
		if (planObject === window.compactPlan) { // compact mode : no subsection
			sectionHtmlTag.appendChild(buildTableForSection(sectionObject));
		} else { // normal mode : some subsections in each section
			for (subsectionObject of sectionObject.subsections) {
				subsectionHtmlTag = createHtmlTagWithIdAndClassName("section", sectionNameToId(subsectionObject.subsectionName), "recordsSubsection");
				subsectionHtmlTag.appendChild(createHtmlTagWithTextContent("h3", subsectionObject.subsectionName));
				subsectionHtmlTag.appendChild(buildTableForSection(subsectionObject));
				sectionHtmlTag.appendChild(subsectionHtmlTag);
			}
		}
		recordsHtmlTag.appendChild(sectionHtmlTag);
	}
}

function buildTableForSection(sectionObject) // build record table for input section/subsection
{
	let tableHtmlTag = createHtmlTagWithClassName("table", "recordTable"), trHtmlTag, tdHtmlTag, recordObject, eventName, avgType;
	tableHtmlTag.appendChild(buildHeaderRow());
	for (eventName of sectionObject.events) {
		trHtmlTag = createHtmlTag("tr");
		trHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("td", "eventName", eventName));
		for (avgType of window.avgTypes) {
			recordObject = window.smartRecordsDataBase[eventName][avgType];
			tdHtmlTag = createHtmlTagWithClassName("td", avgType);
			if (recordObject.time === "") {
				tdHtmlTag.textContent = "x";
			} else {
				tdHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "time", recordObject.time));
				tdHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "name", recordObject.name));
				if (recordObject.timeList.length !== 0) {
					tdHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "commentary", recordObject.timeList));
				}
			}
			trHtmlTag.appendChild(tdHtmlTag);
		}
		tableHtmlTag.appendChild(trHtmlTag);
	}
	return tableHtmlTag;
}

function buildHeaderRow() // build header row for record table
{
	let trHtmlTag = createHtmlTag("tr"), avgType;
	trHtmlTag.appendChild(createHtmlTagWithTextContent("th", "Épreuve"));
	for (avgType of window.avgTypes) {
		trHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("th", avgType, avgType.charAt(0).toUpperCase() + avgType.substr(1,100)));
	}
	return trHtmlTag;
}
