"use strict";

const toggleLanguage = () => {
	let frontFlag = document.querySelector("img#frontFlag");
	let backFlag = document.querySelector("img#backFlag");
	frontFlag.setAttribute("id", "backFlag");
	backFlag.setAttribute("id", "frontFlag");
	let newActiveLanguage = backFlag.getAttribute("data-language");
	fillStandardText(newActiveLanguage);
	translateSectionNames(newActiveLanguage);
	document.querySelector("section#contactLink a").href = `./html/contact${newActiveLanguage.toUpperCase()}.html`;
};

const fillStandardText = newActiveLanguage => {
	for (let querySelector in standardTranslations) {
		document.querySelector(querySelector).textContent = standardTranslations[querySelector][newActiveLanguage];
	}
};

const translateSectionNames = newActiveLanguage => {
	for (let planSection of pagePlans["noWca"]) {
		document.querySelector(`section#${planSection.id} h2`).textContent = planSection[newActiveLanguage];
	}
};
