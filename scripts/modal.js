"use strict";

const recordDetailsModal = (eventName, avgType) => {
	let record = records[eventName][avgType];
	buildRecordDetailsModal(record);
	openRecordDetailsModal();
};

/* Building the modal */

const buildRecordDetailsModal = record => {
	// Time
	document.querySelector("div#recordTimeValue").textContent = record.time;
	// todo add other details (split, memo time, time list for avg, scramble(s), reconstruction, ...)
	// Date
	document.querySelector("div#recordDateValue").textContent = record.date;
	// Youtube video embed
	let youtubeVideoEmbedTag = document.querySelector("div#recordDetailsModal div#youtubeVideo");
	youtubeVideoEmbedTag.textContent = "";
	if (record.youtubeVideoId) {
		youtubeVideoEmbedTag.setAttribute("data-youtubeVideoAvailable", "true");
		youtubeVideoEmbedTag.appendChild(createHtmlTag("iframe", {
			id: "youtubeVideoEmbedIframe",
			src: `https://www.youtube.com/embed/${record.youtubeVideoId}`
		}));
	} else {
		youtubeVideoEmbedTag.setAttribute("data-youtubeVideoAvailable", "false");
	}
	// Person(s) info, loop over all people owning the record
	let personsInfoTag = document.querySelector("div#recordDetailsModal div#personsList");
	personsInfoTag.textContent = "";
	for (let name of record.name ? [record.name] : record.names) {
		let personInfoTag = createHtmlTag("div", {class: "personInfo"});
		// Person name
		personInfoTag.appendChild(createHtmlTag("div", {class: "personName personInfoItem", "textContent": name}));
		// Person UNR count and rank
		let countForName = countPerName.find(countForName => countForName.name === name);
		personInfoTag.appendChild(createHtmlTag("div", {
			class: "personRecordCountAndRank",
			textContent: `${countForName.totalCount} UNR${countForName.totalCount > 1 ? "s" : ""} (top ${countForName.rank})`
		})); // todo add tooltip with list of UNRs ?
		// WCA profile
		let personWcaProfileLinkTag = createHtmlTag("a", {class: "personWcaProfileLink infoLink personInfoItem"});
		personWcaProfileLinkTag.appendChild(createHtmlTag("img", {src: "./images/icons/wcaIcon.svg", class: "icon"}));
		let personWcaProfileLabelTag = createHtmlTag("label", {class: "linkLabel"});
		if (persons[name].wcaId) {
			personWcaProfileLinkTag.href = `https://www.worldcubeassociation.org/persons/${persons[name].wcaId}`;
			personWcaProfileLinkTag.target = "_blank";
			personWcaProfileLabelTag.textContent = persons[name].wcaId;
		} else {
			personWcaProfileLabelTag.textContent = "No WCA profile";
		}
		personWcaProfileLinkTag.appendChild(personWcaProfileLabelTag);
		personInfoTag.appendChild(personWcaProfileLinkTag);
		// PB sheet
		let personPbSheetLinkTag = createHtmlTag("a", {class: "personPbSheetLink infoLink personInfoItem"});
		personPbSheetLinkTag.appendChild(createHtmlTag("img", {src: "./images/icons/googleSheetsIcon.svg", class: "icon"}));
		let personPbSheetLabelTag = createHtmlTag("label", {class: "linkLabel personInfoItem"});
		if (persons[name].pbSheet) {
			personPbSheetLinkTag.href = persons[name].pbSheet;
			personPbSheetLinkTag.target = "_blank";
			personPbSheetLabelTag.textContent = "PB sheet";
		} else {
			personPbSheetLabelTag.textContent = "No PB sheet";
		}
		personPbSheetLinkTag.appendChild(personPbSheetLabelTag);
		personInfoTag.appendChild(personPbSheetLinkTag);
		// Youtube channel // todo fix replace id with full url
		let personYoutubeChannelLinkTag = createHtmlTag("a", {class: "personYoutubeChannelLink infoLink personInfoItem"});
		personYoutubeChannelLinkTag.appendChild(createHtmlTag("img", {src: "./images/icons/youtubeIcon.svg", class: "icon"}));
		let personYoutubeChannelLabelTag = createHtmlTag("label", {class: "linkLabel"});
		if (persons[name].youtubeChannel) {
			personYoutubeChannelLinkTag.href = `https://www.youtube.com/user/${persons[name].youtubeChannel}`;
			personYoutubeChannelLinkTag.target = "_blank";
			personYoutubeChannelLabelTag.textContent = "Youtube channel";
		} else {
			personYoutubeChannelLabelTag.textContent = "No Youtube channel";
		}
		personYoutubeChannelLinkTag.appendChild(personYoutubeChannelLabelTag);
		personInfoTag.appendChild(personYoutubeChannelLinkTag);
		personsInfoTag.appendChild(personInfoTag);
	}
	// Record post info
	let recordFrancocubePostLink = document.querySelector("div#recordDetailsModal a#recordFrancocubePostLink");
	if (record.francocubePostId) {
		recordFrancocubePostLink.href = `https://forum.francocube.com/viewtopic.php?p=${record.francocubePostId}#p${record.francocubePostId}`;
	} else {
		recordFrancocubePostLink.removeAttribute("href");
	}

	if (record.links && record.links[0].includes("discord")) { // temporary, todo remove when migrated
		record.discordLink = record.links[0];
	}
	let recordDiscordPostLink = document.querySelector("div#recordDetailsModal a#recordDiscordPostLink");
	if (record.discordLink) {
		recordDiscordPostLink.href = record.discordLink;
	} else {
		recordDiscordPostLink.removeAttribute("href");
	}
};

/* Showing and hiding the modal */

const openRecordDetailsModal = () => {
	document.body.setAttribute("data-modalMode", "true"); // CSS will do the rest
};

const hideRecordDetailsModal = () => {
	document.body.setAttribute("data-modalMode", "false"); // CSS will do the rest
};
