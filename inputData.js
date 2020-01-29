"use strict";

// import functions from utils.js
/* global listToArray, stringToDate */

function inputData() // load XML file and stores data in window
{
	window.avgTypes = ["single","mo3","avg5","avg12","avg50","avg100"]; // initialize records avg types
	loadXml();
	storePersonsInDataBase();
	storeNormalPlanInDataBase();
	storeCompactPlanInDataBase();
	storeRecordsInDataBase();
	storeTranslations();
	window.unrXmlData = undefined;
}

function loadXml() // load unrData.xml and store it in window.unrXmlData
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

function storeTranslations()
{
	let translationXmlTag, translationType;
	window.translations = [];
	for (translationXmlTag of window.unrXmlData.querySelector("translations").querySelectorAll("translation")) {
		translationType = translationXmlTag.getAttribute("translationType");
		if (translationType === "globalOnce" || translationType === "globalMany") { // globalOnce or globalMany
			window.translations.push({
				translationType: translationType,
				selector: translationXmlTag.getAttribute("selector"),
				textInFrench: translationXmlTag.getAttribute("textInFrench"),
				textInEnglish: translationXmlTag.getAttribute("textInEnglish")
			});
		} else { // sectionName or subsectionName
			window.translations.push({
				translationType: translationType,
				textInFrench: translationXmlTag.getAttribute("textInFrench"),
				textInEnglish: translationXmlTag.getAttribute("textInEnglish")
			});
		}
	}
}

function storeRecordsInDataBase() // parse window.unrXmlData and store records content in window.recordsDataBase
{
	let recordEventXmlTag, recordXmlTag, recordDataBaseObject, eventName;
	window.bruteRecordsDataBase = [];
	window.smartRecordsDataBase = [];
	for (recordEventXmlTag of window.unrXmlData.querySelector("records").querySelectorAll("event")) { // for each event
		eventName = recordEventXmlTag.getAttribute("eventName");
		window.smartRecordsDataBase[eventName] = [];
		for (recordXmlTag of recordEventXmlTag.querySelectorAll("*")) { // for each avgType
			recordDataBaseObject = {
				name: recordXmlTag.getAttribute("name"),
				time: recordXmlTag.getAttribute("time"),
				memoTimeList: listToArray(recordXmlTag.getAttribute("memoTimeList")),
				timeList: listToArray(recordXmlTag.getAttribute("timeList")),
				scrambleList: listToArray(recordXmlTag.getAttribute("name")),
				date: stringToDate(recordXmlTag.getAttribute("date")),
				youtubeLink: recordXmlTag.getAttribute("youtubeLink"),
				francocubeLink: recordXmlTag.getAttribute("francocubeLink"),
				compactPlanSection: window.compactPlan.sectionFromEvent[eventName],
				normalPlanSection: window.normalPlan.sectionFromEvent[eventName],
				normalPlanSubsection: window.normalPlan.subsectionFromEvent[eventName]
			};
			window.smartRecordsDataBase[eventName][recordXmlTag.tagName] = recordDataBaseObject;
			recordDataBaseObject.eventName = eventName;
			recordDataBaseObject.avgType = recordXmlTag.tagName;
			window.bruteRecordsDataBase.push(recordDataBaseObject);

		}
	}
}

function storePersonsInDataBase() // parse window.unrXmlData and stores persons content in window.personsDataBase
{
	let personXmlTag;
	window.personsDataBase = []; // direct access to person information with window.personsDataBase[inputName]
	for (personXmlTag of window.unrXmlData.querySelector("persons").querySelectorAll("person")) {
		window.personsDataBase[personXmlTag.getAttribute("name")] = {wcaId: personXmlTag.getAttribute("wcaId"), pbSheetLink: personXmlTag.getAttribute("pbSheetLink")};
	}
}

function storeNormalPlanInDataBase() // parse window.unrXmlData and store the normal plan in window.normalPlan
{
	let sectionXmlTag, subsectionXmlTag, eventXmlTag, sectionObject, subsectionObject;
	window.normalPlan = {sections: [], sectionIsDisplayed: [], sectionFromEvent: [], subsectionIsDisplayed: [], subsectionFromEvent: []};
	for (sectionXmlTag of window.unrXmlData.querySelector("normalPlan").querySelectorAll("section")) {
		sectionObject = {sectionName: sectionXmlTag.getAttribute("sectionName"), subsections: []};
		for (subsectionXmlTag of sectionXmlTag.querySelectorAll("subsection")) {
			subsectionObject = {subsectionName: subsectionXmlTag.getAttribute("subsectionName"), events: []};
			for (eventXmlTag of subsectionXmlTag.querySelectorAll("event")) {
				subsectionObject.events.push(eventXmlTag.textContent);
				window.normalPlan.sectionFromEvent[eventXmlTag.textContent] = sectionObject.sectionName;
				window.normalPlan.subsectionFromEvent[eventXmlTag.textContent] = subsectionObject.subsectionName;
			}
			window.normalPlan.subsectionIsDisplayed[subsectionObject.subsectionName] = true;
			sectionObject.subsections.push(subsectionObject);
		}
		window.normalPlan.sectionIsDisplayed[sectionObject.sectionName] = true;
		window.normalPlan.sections.push(sectionObject);
	}
	window.normalPlan.isDisplayed = true;
}

function storeCompactPlanInDataBase() // parse window.unrXmlData and store the compact plan in window.compactPlan
{
	let sectionXmlTag, eventXmlTag, sectionObject;
	window.compactPlan = {sections: [], sectionIsDisplayed: [], sectionFromEvent: []};
	for (sectionXmlTag of window.unrXmlData.querySelector("compactPlan").querySelectorAll("section")) {
		sectionObject = {sectionName: sectionXmlTag.getAttribute("sectionName"), subsections: [], events: []};
		for (eventXmlTag of sectionXmlTag.querySelectorAll("event")) {
			sectionObject.events.push(eventXmlTag.textContent);
			window.compactPlan.sectionFromEvent[eventXmlTag.textContent] = sectionObject.sectionName;
		}
		window.compactPlan.sectionIsDisplayed[sectionObject.sectionName] = true;
		window.compactPlan.sections.push(sectionObject);
	}
	window.compactPlan.isDisplayed = false;
}
