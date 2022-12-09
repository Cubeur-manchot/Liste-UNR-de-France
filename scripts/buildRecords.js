"use strict";

const buildRecords = () => {
	let recordsSection = document.querySelector("section#records");
	for (let recordCategory of pagePlans.noWca) {
		// section
		let recordSection = createHtmlTag("section", {id: recordCategory.id, class: "card"});
		// title
		let sectionTitle = createHtmlTag("h2", {textContent: recordCategory.fr});
		recordSection.appendChild(sectionTitle);
		// table
		let table = createHtmlTag("table", {class: "recordTable"});
		// table headers
		let thead = createHtmlTag("thead");
		let tr = createHtmlTag("tr");
		tr.appendChild(createHtmlTag("th", {textContent: "Event"}));
		for (let avgType of avgTypes) {
			tr.appendChild(createHtmlTag("th", {textContent: avgType[0].toUpperCase() + avgType.slice(1)}));
		}
		thead.appendChild(tr);
		table.appendChild(thead);
		// table body
		let tbody = createHtmlTag("tbody");
		for (let eventName of recordCategory.events) {
			let eventRecords = records[eventName];
			let tr = createHtmlTag("tr");
			tr.appendChild(createHtmlTag("td", {class: "eventName", textContent: eventName}));
			for (let avgType of avgTypes) {
				if (eventRecords[avgType]) {
					let td = createHtmlTag("td", {class: avgType});
					td.appendChild(createHtmlTag("div", {class: "score",
						textContent: getFormattedRecord(eventRecords[avgType])}));
					td.appendChild(createHtmlTag("div", {class: "name",
						textContent: eventRecords[avgType].name ?? eventRecords[avgType].names.join(" + ")}));
					td.onclick = () => openRecordDetailsModal(eventName, avgType);
					tr.appendChild(td);
				} else {
					tr.appendChild(createHtmlTag("td", {textContent: "x"}));
				}
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
		recordSection.appendChild(table);
		recordsSection.appendChild(recordSection);
	}
};

const getFormattedRecord = record => {
	if (record.score) {
		if (record.time) {
			return `${record.score} (${record.time})`; // multi-blindfolded
		} else {
			return record.score; // fewest moves
		}
	} else {
		return record.time; // standard records
	}
};

const checkRefactorMessageVisibility = () => { // todo remove when obsolete
	let refactorMessageSection = document.querySelector("section#refactorMessage");
	let endDate = new Date(2022, 9, 7);
	endDate.setMonth(endDate.getMonth() + 6);
	if (new Date() < endDate) {
		refactorMessageSection.hidden = false;
	}
};
