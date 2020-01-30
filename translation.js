"use strict";

// import functions from utils.js
/* global sectionNameToId */

// import functions from statistics.js
/* global buildHistogram */

function toggleLanguage()
{
	translatePage();
	switchFlags();
	buildHistogram();
}

function getFrenchText(translationObject)
{
	return translationObject.textInFrench;
}

function getEnglishText(translationObject)
{
	return translationObject.textInEnglish;
}

function translateSectionNameFromFrenchToEnglish(frenchSectionName)
{
	let translationObject;
	for (translationObject of window.translations) {
		if (translationObject.translationType === "sectionName" && translationObject.textInFrench === frenchSectionName) { // if a translation corresponds, return english value
			return translationObject.textInEnglish;
		}
	}
	return frenchSectionName; // if no translation corresponds, the section name is the same in french and english
}

function translatePage()
{
	let sectionHtmlTag, elementToTranslateHtmlTag, getTranslatedText, translationObject, sectionId, translatedText;
	if (document.querySelector("img#frontFlag").src.substr(-10, 10) === "flagUK.png") {
		getTranslatedText = getFrenchText;
	} else {
		getTranslatedText = getEnglishText;
	}
	for (translationObject of window.translations) {
		translatedText = getTranslatedText(translationObject);
		if (translationObject.translationType === "globalOnce") { // one fixed string is translated once on the page
			elementToTranslateHtmlTag = document.querySelector(translationObject.selector);
			if (elementToTranslateHtmlTag) {
				elementToTranslateHtmlTag.textContent = translatedText;
			}
		} else if (translationObject.translationType === "globalMany") { // one fixed string is translated many times on the page
			for (elementToTranslateHtmlTag of document.querySelectorAll(translationObject.selector)) {
				elementToTranslateHtmlTag.textContent = translatedText;
			}
		} else { // section and subsection names are translated in the page plan and in the corresponding section
			sectionId = sectionNameToId(translationObject.textInFrench);
			elementToTranslateHtmlTag = document.querySelector("div#pagePlan a#pagePlan_" + sectionId);
			if (elementToTranslateHtmlTag) {
				elementToTranslateHtmlTag.textContent = translatedText;
			}
			sectionHtmlTag = document.querySelector("section#" + sectionId);
			if (sectionHtmlTag) {
				sectionHtmlTag.firstChild.textContent = translatedText;
			}
		}
	}
	if (getTranslatedText === getEnglishText) {
		document.querySelector("section#contact a").href = "contactEN.html";
	} else {
		document.querySelector("section#contact a").href = "contactFR.html";
	}
}

function switchFlags()
{
	let frontFlagHtmlTag = document.querySelector("img#frontFlag"), backFlagHtmlTag = document.querySelector("img#backFlag"), frontImageSource = frontFlagHtmlTag.src;
	frontFlagHtmlTag.src = backFlagHtmlTag.src;
	backFlagHtmlTag.src = frontImageSource;
}
