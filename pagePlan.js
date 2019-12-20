"use strict";

// import functions from tagCreator.js
/* global createHtmlTag, createHtmlTagWithClassName, createHtmlTagWithClassNameAndTextContent, createHtmlTagWithClassNameHrefTextContent */

// import functions from utils.js
/* global sectionNameToId */

// import functions from buildRecords.js
/* global buildRecords */

function buildPlan(planObject) // build filters and links for sections and subsections
{
	let pagePlanHtmlTag = document.querySelector("#pagePlan"), sectionPlanHtmlTag, subsectionPlanHtmlTag, externalButtonHtmlTag, planSectionObject, planSubsectionObject;
	pagePlanHtmlTag.textContent = "";
	if (planObject === window.normalPlan) {
		pagePlanHtmlTag.className = "normalPlan";
	} else {
		pagePlanHtmlTag.className = "compactPlan";
	}
	for (planSectionObject of planObject.sections) { // create sections with name and filter
		sectionPlanHtmlTag = createHtmlTagWithClassName("div", "sectionPlan");
		externalButtonHtmlTag = createHtmlTagWithClassName("div", "externalButton");
		externalButtonHtmlTag.appendChild(createHtmlTagWithClassName("div", "innerButton"));
		externalButtonHtmlTag.onclick = function() { toggleDisplaySectionOrSubsection(this); };
		sectionPlanHtmlTag.appendChild(externalButtonHtmlTag);
		sectionPlanHtmlTag.appendChild(createHtmlTagWithClassNameHrefTextContent("a", "sectionPlanTitle",
			"#" + sectionNameToId(planSectionObject.sectionName), planSectionObject.sectionName));
		for (planSubsectionObject of planSectionObject.subsections) { // create subsections with name and filter
			subsectionPlanHtmlTag = createHtmlTagWithClassName("div", "subsectionPlan");
			externalButtonHtmlTag = createHtmlTagWithClassName("div", "externalButton");
			externalButtonHtmlTag.appendChild(createHtmlTagWithClassName("div", "innerButton"));
			externalButtonHtmlTag.onclick = function () { toggleDisplaySectionOrSubsection(this); };
			subsectionPlanHtmlTag.appendChild(externalButtonHtmlTag);
			subsectionPlanHtmlTag.appendChild(createHtmlTagWithClassNameHrefTextContent("a", "subsectionPlanTitle",
				"#" + sectionNameToId(planSubsectionObject.subsectionName), planSubsectionObject.subsectionName));
			sectionPlanHtmlTag.appendChild(subsectionPlanHtmlTag);
		}
		pagePlanHtmlTag.appendChild(sectionPlanHtmlTag);
	}
}

function buildAvgTypeFilters() // build filters for single, mo3, avg5, ...
{
	let avgTypeFiltersHtmlTag = document.querySelector("#avgTypeFilters"), avgTypeFilterHtmlTag, externalButtonHtmlTag, avgType;
	avgTypeFiltersHtmlTag.textContent = "";
	for (avgType of window.avgTypes) {
		avgTypeFilterHtmlTag = createHtmlTagWithClassName("div", "avgTypeFilter");
		externalButtonHtmlTag = createHtmlTagWithClassName("div", "externalButton");
		externalButtonHtmlTag.appendChild(createHtmlTagWithClassName("div", "innerButton"));
		externalButtonHtmlTag.onclick = function() { toggleDisplayAvgType(this); }; // onclick : hide/show every UNR of the avgType type
		avgTypeFilterHtmlTag.appendChild(externalButtonHtmlTag);
		avgTypeFilterHtmlTag.appendChild(createHtmlTag("br"));
		avgTypeFilterHtmlTag.appendChild(createHtmlTagWithClassNameAndTextContent("div", "avgTypeFilterName", avgType));
		avgTypeFiltersHtmlTag.appendChild(avgTypeFilterHtmlTag);
	}
	return avgTypeFiltersHtmlTag;
}

function toggleCompactMode() // toggle between compact and normal mode
{
	let compactModeButtonOnOnPositionHtmlTag, compactModeButtonOnOffPositionHtmlTag = document.querySelector("#offCompactButton"), planObject;
	if (compactModeButtonOnOffPositionHtmlTag) { // switch to compact mode
		planObject = window.compactPlan;
		compactModeButtonOnOffPositionHtmlTag.id = "onCompactButton";
		compactModeButtonOnOffPositionHtmlTag.textContent = "Repasser en Mode Normal";
	} else { //switch back to normal mode
		compactModeButtonOnOnPositionHtmlTag = document.querySelector("#onCompactButton");
		planObject = window.normalPlan;
		compactModeButtonOnOnPositionHtmlTag.id = "offCompactButton";
		compactModeButtonOnOnPositionHtmlTag.textContent = "Passer en Mode Compact";
	}
	buildAvgTypeFilters(); // reinitialize avg type filters
	buildPlan(planObject); // update plan and filters
	buildRecords(planObject); // update record sections and tables
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
	let htmlTagToHide, displayMode, selector = "." + externalButtonHtmlTag.parentNode.querySelector(".avgTypeFilterName").textContent;
	if (document.querySelector(selector).style.display === "") { // if these HTML tags are currently displayed, they should be hidden
		displayMode = "none";
		switchToggleButtonToOff(externalButtonHtmlTag.querySelector(".innerButton"));
	} else { // else they are currently hidden, and they should be displayed
		displayMode = "";
		switchToggleButtonToOn(externalButtonHtmlTag.querySelector(".innerButton"));
	}
	for (htmlTagToHide of document.querySelectorAll(selector)) {
		htmlTagToHide.style.display = displayMode;
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
