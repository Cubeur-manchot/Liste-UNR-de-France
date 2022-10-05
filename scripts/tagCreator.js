"use strict";

const createHtmlTag = (type, properties) => {
	let htmlTag = document.createElement(type);
	if (properties) {
		for (let property in properties) {
			if (property === "textContent") {
				htmlTag[property] = properties[property];	
			} else {
				htmlTag.setAttribute(property, properties[property]);
			}
		}
	}
	return htmlTag;
};
