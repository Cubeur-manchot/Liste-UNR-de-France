"use strict";

// import functions from tagCreator.js
/* global createHtmlTag, createHtmlTagWithClassName, createHtmlTagWithClassNameAndTextContent, createHtmlTagWithIdClassNameHrefTextContent */

// import functions from utils.js
/* global sectionNameToId, sectionIdToName */

// import functions from buildRecords.js
/* global buildRecords */

// import functions from statistics.js
/* global buildStatistics, isNormalSectionDisplayed, isCompactSectionDisplayed */

// import functions from translation.js
/* global translateSectionNameFromFrenchToEnglish */


function buildPlan(planObject) // build filters and links for sections and subsections
{
	let pagePlanHtmlTag = document.querySelector("#pagePlan"), sectionPlanHtmlTag, subsectionPlanHtmlTag, planSectionObject, planSubsectionObject;
	pagePlanHtmlTag.textContent = "";
	if (planObject === window.normalPlan) {
		pagePlanHtmlTag.className = "normalPlan";
		window.isSectionDisplayed = isNormalSectionDisplayed;
	} else {
		pagePlanHtmlTag.className = "compactPlan";
		window.isSectionDisplayed = isCompactSectionDisplayed;
	}
	for (planSectionObject of planObject.sections) { // create sections with name and filter
		planObject.sectionIsDisplayed[planSectionObject.sectionName] = true;
		sectionPlanHtmlTag = buildPlanSectionOrSubsectionItem("section", planSectionObject.sectionName);
		for (planSubsectionObject of planSectionObject.subsections) { // create subsections with name and filter
			planObject.subsectionIsDisplayed[planSubsectionObject.subsectionName] = true;
			subsectionPlanHtmlTag = buildPlanSectionOrSubsectionItem("subsection", planSubsectionObject.subsectionName);
			sectionPlanHtmlTag.appendChild(subsectionPlanHtmlTag);
		}
		pagePlanHtmlTag.appendChild(sectionPlanHtmlTag);
	}
}

function buildPlanSectionOrSubsectionItem(type, sectionOrSubsectionName) // build a line for the plan with an external button, an inner button and a link
{
	let sectionOrSubsectionPlanHtmlTag = createHtmlTagWithClassName("div", type + "Plan"),
		externalButtonHtmlTag = createHtmlTagWithClassName("div", "externalButton"),
	sectionOrSubsectionId = sectionNameToId(sectionOrSubsectionName);
	externalButtonHtmlTag.appendChild(createHtmlTagWithClassName("div", "innerButton"));
	externalButtonHtmlTag.onclick = function() { toggleDisplaySectionOrSubsection(this); };
	sectionOrSubsectionPlanHtmlTag.appendChild(externalButtonHtmlTag);
	if (document.querySelector("img#frontFlag").src.substr(-10, 10) === "flagUK.png") { // if english language, translate text to english
		sectionOrSubsectionName = translateSectionNameFromFrenchToEnglish(sectionOrSubsectionName);
	}
	sectionOrSubsectionPlanHtmlTag.appendChild(createHtmlTagWithIdClassNameHrefTextContent("a", "pagePlan_" + sectionOrSubsectionId, type + "PlanTitle",
		"#" + sectionOrSubsectionId, sectionOrSubsectionName));
	return sectionOrSubsectionPlanHtmlTag;
}

function buildAvgTypeFilters() // build filters for single, mo3, avg5, ...
{
	let avgTypeFiltersHtmlTag = document.querySelector("#avgTypeFilters"), avgTypeFilterHtmlTag, externalButtonHtmlTag, avgType;
	avgTypeFiltersHtmlTag.textContent = "";
	window.avgTypeFilters = [];
	for (avgType of window.avgTypes) {
		avgTypeFilterHtmlTag = createHtmlTagWithClassName("div", "avgTypeFilter");
		externalButtonHtmlTag = createHtmlTagWithClassName("div", "externalButton");
		externalButtonHtmlTag.appendChild(createHtmlTagWithClassName("div", "innerButton"));
		externalButtonHtmlTag.onclick = function() { toggleDisplayAvgType(this); }; // onclick : hide/show every UNR of the avgType type
		avgTypeFilterHtmlTag.appendChild(externalButtonHtmlTag);
		avgTypeFilterHtmlTag.appendChild(createHtmlTag("br"));
		avgTypeFilterHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "avgTypeFilterName", avgType));
		avgTypeFiltersHtmlTag.appendChild(avgTypeFilterHtmlTag);
		window.avgTypeFilters[avgType] = {isDisplayed: true};
	}
	return avgTypeFiltersHtmlTag;
}

function toggleCompactMode() // toggle between compact and normal mode
{
	let compactModeButtonOnOnPositionHtmlTag, compactModeButtonOnOffPositionHtmlTag = document.querySelector("#offCompactButton"), planObject;
	if (compactModeButtonOnOffPositionHtmlTag) { // switch to compact mode
		planObject = window.compactPlan;
		compactModeButtonOnOffPositionHtmlTag.id = "onCompactButton";
		compactModeButtonOnOffPositionHtmlTag.textContent = "Mode Compact";
		window.normalPlan.isDisplayed = false;
		window.compactPlan.isDisplayed = true;
	} else { //switch back to normal mode
		compactModeButtonOnOnPositionHtmlTag = document.querySelector("#onCompactButton");
		planObject = window.normalPlan;
		compactModeButtonOnOnPositionHtmlTag.id = "offCompactButton";
		compactModeButtonOnOnPositionHtmlTag.textContent = "Mode Normal";
		window.normalPlan.isDisplayed = true;
		window.compactPlan.isDisplayed = false;
	}
	buildAvgTypeFilters(); // reinitialize avg type filters
	buildPlan(planObject); // update plan and filters
	buildRecords(planObject); // update record sections and tables
	buildStatistics();
}

function toggleDisplayPlan() // toggle between none and inline-block display for avgType filters and section filters
{
	let pagePlanHtmlTag = document.querySelector("#pagePlanAndFilters");
	if (pagePlanHtmlTag.style.display === "inline-block") {
		pagePlanHtmlTag.style.display = "none";
	} else {
		pagePlanHtmlTag.style.display = "inline-block";
	}
}

function toggleDisplayAvgType(externalButtonHtmlTag) // toggle between none and default display for each UNR of selected avgType
{
	let htmlTagToHide, displayMode, avgType = externalButtonHtmlTag.parentNode.querySelector(".avgTypeFilterName").textContent;
	if (document.querySelector("." + avgType).style.display === "") { // if these HTML tags are currently displayed, they should be hidden
		displayMode = "none";
		switchToggleButtonToOff(externalButtonHtmlTag.querySelector(".innerButton"));
		window.avgTypeFilters[avgType].isDisplayed = false;
	} else { // else they are currently hidden, and they should be displayed
		displayMode = "";
		switchToggleButtonToOn(externalButtonHtmlTag.querySelector(".innerButton"));
		window.avgTypeFilters[avgType].isDisplayed = true;
	}
	for (htmlTagToHide of document.querySelectorAll("." + avgType)) {
		htmlTagToHide.style.display = displayMode;
	}
	buildStatistics();
}

function toggleDisplaySectionOrSubsection(externalButtonHtmlTag) // toggle between none and default display for selected section
{
	let sectionOrSubsectionId = externalButtonHtmlTag.parentNode.querySelector("a").id.substring(9,100),
		sectionOrSubsectionHtmlTag = document.querySelector("#" + sectionOrSubsectionId);
	if (sectionOrSubsectionHtmlTag.style.display === "") { // if it's displayed, it should be hidden
		sectionOrSubsectionHtmlTag.style.display = "none";
		setSectionOrSubsectionDisplayInPlan(sectionIdToName(sectionOrSubsectionId), false);
		switchToggleButtonToOff(externalButtonHtmlTag.querySelector(".innerButton"));
	} else { // else it's hidden and it should be displayed
		sectionOrSubsectionHtmlTag.style.display = "";
		setSectionOrSubsectionDisplayInPlan(sectionIdToName(sectionOrSubsectionId), true);
		switchToggleButtonToOn(externalButtonHtmlTag.querySelector(".innerButton"));
	}
	buildStatistics();
}

function setSectionOrSubsectionDisplayInPlan(sectionOrSubsectionName, displayMode) // set the isDisplayed property of a section or a subsection in window.normalPlan or window.compactPlan
{
	if (window.normalPlan.isDisplayed) {
		if (window.normalPlan.sectionIsDisplayed[sectionOrSubsectionName] === undefined) {
			window.normalPlan.subsectionIsDisplayed[sectionOrSubsectionName] = displayMode;
		} else {
			window.normalPlan.sectionIsDisplayed[sectionOrSubsectionName] = displayMode;
		}
	} else {
		window.compactPlan.sectionIsDisplayed[sectionOrSubsectionName] = displayMode;
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
