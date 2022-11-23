"use strict";

const openRecordDetailsModal = (eventName, avgType) => {
	let record = records[eventName][avgType];
	// Event and avgType in title
	document.querySelector("div#recordDetailsModal label#modalTitleEnd").textContent = `(${eventName} ${avgType})`;
	// Score
	document.querySelector("div#recordDetailsModal div#recordScoreValue").textContent = record.score ?? "";
	// Time
	document.querySelector("div#recordDetailsModal div#recordTimeValue").textContent = record.time ?? "";
	// Memorization time
	document.querySelector("div#recordDetailsModal div#recordMemorizationTimeValue").textContent = record.memoTime ?? "";
	// Time list
	document.querySelector("div#recordDetailsModal div#recordTimeListValue").textContent = record.timeList ? formatTimeList(record.timeList) : "";
	// todo add other details (split, time/score list for avg, scramble(s), reconstruction, ...)
	// Date
	document.querySelector("div#recordDetailsModal div#recordDateValue").textContent = record.date;
	// Youtube video embed
	let youtubeVideoEmbedTag = document.querySelector("div#recordDetailsModal div#youtubeVideo");
	youtubeVideoEmbedTag.textContent = "";
	if (record.youtubeVideoId) {
		youtubeVideoEmbedTag.appendChild(createHtmlTag("iframe", {
			id: "youtubeVideoEmbedIframe",
			src: `https://www.youtube.com/embed/${record.youtubeVideoId}`
		}));
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
			class: "personRecordCountAndRank personInfoItem",
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
		// Youtube channel
		let personYoutubeChannelLinkTag = createHtmlTag("a", {class: "personYoutubeChannelLink infoLink personInfoItem"});
		personYoutubeChannelLinkTag.appendChild(createHtmlTag("img", {src: "./images/icons/youtubeIcon.svg", class: "icon"}));
		let personYoutubeChannelLabelTag = createHtmlTag("label", {class: "linkLabel"});
		if (persons[name].youtubeChannel) {
			personYoutubeChannelLinkTag.href = persons[name].youtubeChannel;
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
	let recordDiscordPostLink = document.querySelector("div#recordDetailsModal a#recordDiscordPostLink");
	if (record.discordLink) {
		recordDiscordPostLink.href = record.discordLink;
	} else {
		recordDiscordPostLink.removeAttribute("href");
	}
	// Opening the modal
	document.querySelector("div#recordDetailsModal").setAttribute("data-activated", "true");
};

const formatTimeList = timeList => {
	let nbElementsToDetect = {3: 0, 5: 1, 12: 1, 50: 3, 100: 5}[timeList.length];
	return timeList
		.map((timeString, index) => {return {
			timeString: timeString,
			timeSeconds: parseTimeSeconds(timeString),
			index: index
		};})
		.sort((timeObject1, timeObject2) => timeObject1.timeSeconds - timeObject2.timeSeconds)
		.map((timeObject, index) => {return {
			timeString: index < nbElementsToDetect || index > timeList.length - 1 - nbElementsToDetect
				? `(${timeObject.timeString})` : timeObject.timeString,
			index: timeObject.index
		};})
		.sort((timeObject1, timeObject2) => timeObject1.index - timeObject2.index)
		.map(timeObject => timeObject.timeString)
		.join(", ");
};

const parseTimeSeconds = time => {
	let timeSplitByColumn = time.split(":").reverse();
	return parseFloat(timeSplitByColumn[0]) 
		+ parseFloat(timeSplitByColumn[1] ?? "0") * 60
		+ parseFloat(timeSplitByColumn[2] ?? "0") * 3600;
};

/* Closing the modal */

const closeRecordDetailsModal = () => {
	document.querySelector("div#recordDetailsModal").setAttribute("data-activated", "false");
};
