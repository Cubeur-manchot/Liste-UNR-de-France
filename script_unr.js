//'use strict'

  /***************************/
 /*          UTILS          */
/***************************/

function createTag(tagType)
{
	return (document.createElement(tagType));
}

function createTagWithId(tagType, tagId)
{
	var tag = document.createElement(tagType);
	tag.id = tagId;
	return(tag);
}
function createTagWithClassName(tagType, tagClassName)
{
	var tag = document.createElement(tagType);
	tag.className = tagClassName;
	return(tag);
}

function createTagWithInnerHTML(tagType, tagInnerHTML)
{
	var tag = document.createElement(tagType);
	tag.innerHTML = tagInnerHTML;
	return(tag);
}


function createTagWithIdAndClassName(tagType, tagId, tagClassName)
{
	var tag = document.createElement(tagType);
	tag.id = tagId;
	tag.className = tagClassName;
	return(tag);
}

function createTagWithClassNameAndInnerHTML(tagType, tagClassName, tagInnerHTML)
{
	var tag = document.createElement(tagType);
	tag.className = tagClassName;
	tag.innerHTML = tagInnerHTML;
	return(tag);
}

function createTagWithClassNameHrefInnerHTML(tagType, tagClassName, tagHref, tagInnerHTML)
{
	var tag = document.createElement(tagType);
	tag.className = tagClassName;
	tag.href = tagHref;
	tag.innerHTML = tagInnerHTML;
	return(tag);
}

function createTagWithClassNameHrefTitleTarget(tagType, tagClassName, tagHref, tagTitle, tagTarget)
{
	var tag = document.createElement(tagType);
	tag.className = tagClassName;
	tag.href = tagHref;
	tag.title = tagTitle;
	tag.target = tagTarget;
	return(tag);
}

  /***************************/
 /*     TOGGLE DISPLAY      */
/***************************/

function toggleCompactMode() // toggle between compact and normal mode
{
	var compactModeButtonOnOffPosition = document.querySelector('#offCompactButton');
	var xml = window.unrXmlData;
	if (compactModeButtonOnOffPosition != undefined) { // switch to compact mode
		var planTag = xml.querySelector('compactPlan');
		compactModeButtonOnOffPosition.id = 'onCompactButton';
		compactModeButtonOnOffPosition.innerHTML = 'Repasser en Mode Normal';
	} else { //switch back to normal mode
		var compactModeButtonOnOnPosition = document.querySelector('#onCompactButton');
		var planTag = xml.querySelector('normalPlan');
		compactModeButtonOnOnPosition.id = 'offCompactButton';
		compactModeButtonOnOnPosition.innerHTML = 'Passer en Mode Compact';
	}
	buildRecords(planTag, xml.querySelector('records'));
	buildPlan(planTag);
}

function toggleDisplayPlan() // toggle between 'none' and 'inline-block' display for #pagePlan box
{
	var pagePlan = document.querySelector('#pagePlan');
	pagePlan.style.display = (pagePlan.style.display == 'none' ? 'inline-block' : 'none');
}

function toggleDisplayAvgType(avgTypeIndex) // toggle between 'none' and default display for selected avgType
{
	var tagsOfThisAvgType = document.querySelectorAll('.' + window.avgTypes[avgTypeIndex]);
	var innerButton = document.querySelector('#filters').querySelectorAll('.innerButton')[avgTypeIndex];
	if (tagsOfThisAvgType[0].style.display != 'none') { // if it's displayed, it should be hidden
		tagsOfThisAvgType.forEach(function(tagToHide) { tagToHide.style.display = 'none'; }); // hide each tag in tagsOfThisAvgType
		switchToggleButtonToOff(innerButton);
	} else { // else it's hidden and it should be displayed
		tagsOfThisAvgType.forEach(function(tagToHide) { tagToHide.style.display = ''; }); // show each tag in tagsOfThisAvgType
		switchToggleButtonToOn(innerButton);
	}
}

function toggleDisplaySection(sectionIndex) {
	var section = document.querySelectorAll('.recordsSection')[sectionIndex];
	var innerButton = document.querySelectorAll('.sectionPlan')[sectionIndex].querySelector('.innerButton');
	toggleDisplaySectionOrSubsection(section, innerButton);
}

function toggleDisplaySubsection(sectionIndex, subsectionIndex) {
	var subSection = document.querySelectorAll('.recordsSection')[sectionIndex].querySelectorAll('.recordsSubsection')[subsectionIndex];
	var innerFilterButton = document.querySelectorAll('.sectionPlan')[sectionIndex].querySelectorAll('.innerButton')[subsectionIndex + 1];
	toggleDisplaySectionOrSubsection(subSection, innerFilterButton);
}

function toggleDisplaySectionOrSubsection(sectionOrSubsection, innerButton) // toggle between 'none' and default display for selected section/subsection
{
	if (sectionOrSubsection.style.display == '') {
		sectionOrSubsection.style.display = 'none';
		switchToggleButtonToOff(innerButton);
	} else {
		sectionOrSubsection.style.display = '';
		switchToggleButtonToOn(innerButton);
	}
}

function switchToggleButtonToOn(toggleButton) // switch button from off to on position
{
	toggleButton.style.background = 'rgb(100,255,100)';
	toggleButton.style.transform = 'translate(0px,-4px)';
}

function switchToggleButtonToOff(toggleButton) // switch button from on to off position
{
	toggleButton.style.background = 'rgb(255,100,100)';
	toggleButton.style.transform = 'translate(22px,-4px)';
}

  /***************************/
 /*      BUILDING PAGE      */
/***************************/

function buildPage()
{
	init();
	buildPlan(window.unrXmlData.querySelector('normalPlan'));
	buildRecords(window.unrXmlData.querySelector('normalPlan'), window.unrXmlData.querySelector('records'));
	buildPalmares(window.unrXmlData.querySelector('records'));
}

function init()
{
	// initialize records avgTypes
	window.avgTypes = ['single','mo3','avg5','avg12','avg50','avg100'];
	
	// initialize records data
	if(window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
	} else {
		var xmlhttp = new activeXObject('Microsoft.XMLHTTP');
	}
	xmlhttp.open('get', 'unrData.xml', false);
	xmlhttp.send();
	var xmlDoc = xmlhttp.responseXML;
	window.unrXmlData = xmlDoc.querySelector('xml');
}


/*
TO DOUX buildPlan :
- trouver comment accéder au this pour
- ne plus mettre de paramètre i ou j dans les toggle display des buttons
- pouvoir transformer le for en for of
- rajouter l'id de la section dans l'id de la subsection (faire un id composé)
- uniformiser le toggle display des sections et subsections en cherchant l'id qui sera unique
- créer une méthode à part pour créer un bouton et l'appeler 2 fois (1 fois pour le plan section et 1 fois pour le plan subsection)
*/
function buildPlan(xmlPlan)
{
	var pagePlan = document.querySelector('#pagePlan');
	pagePlan.innerHTML = '';
	var compact = document.querySelector('#onCompactButton') != undefined;
	
	// add filters for single, mo3, avg5...
	var avgTypeFilters = createTagWithId('div', 'filters');
	for (let avgTypeIndex in window.avgTypes) {
		var avgTypeFilter = createTagWithClassName('div', 'avgTypeFilter');
		var externalButton = createTagWithClassName('div', 'externalButton');
		externalButton.appendChild(createTagWithClassName('div', 'innerButton'));
		externalButton.onclick = function() { toggleDisplayAvgType(avgTypeIndex); };
		avgTypeFilter.appendChild(externalButton);
		avgTypeFilter.appendChild(createTag('br'));
		avgTypeFilter.appendChild(createTagWithClassNameAndInnerHTML('div', 'avgTypeFilterName', window.avgTypes[avgTypeIndex]));
		avgTypeFilters.appendChild(avgTypeFilter);
	}
	pagePlan.appendChild(avgTypeFilters);
	
	// add filter for each section
	var sections = xmlPlan.querySelectorAll('section');
	for (let i = 0; i < sections.length; i++) {
	//for (var i in sections) {
		var section = sections[i];
		var sectionPlan = createTagWithClassName('div', 'sectionPlan');
		var externalButton = createTagWithClassName('div', 'externalButton');
		externalButton.appendChild(createTagWithClassName('div', 'innerButton'));
		externalButton.onclick = function() { toggleDisplaySection(i); };
		sectionPlan.appendChild(externalButton);
		if (compact) {
			sectionPlan.style.width = '130px';
			sectionPlan.appendChild(createTag('br'));
		} else {
			sectionPlan.style.textAlign = 'left';
		}
		sectionPlan.appendChild(createTagWithClassNameHrefInnerHTML('a', 'sectionPlanTitle', '#' + sectionNameToId(section.getAttribute('nom')), section.getAttribute('nom')));
		sectionPlan.appendChild(createTag('br'));
		
		// add filter for each subsection
		var subsections = section.querySelectorAll('subsection');
		for (let j = 0; j < subsections.length; j++) {
			var subsection = subsections[j];
			var subsectionPlan = createTagWithClassName('div', 'subsectionPlan');
			var externalButton = createTagWithClassName('div', 'externalButton');
			externalButton.appendChild(createTagWithClassName('div', 'innerButton'));
			externalButton.onclick = function() { toggleDisplaySubsection(i, j); };
			subsectionPlan.appendChild(externalButton);
			subsectionPlan.appendChild(createTagWithClassNameHrefInnerHTML('a', 'subsectionPlanTitle', '#' + sectionNameToId(subsection.getAttribute('nom')), subsection.getAttribute('nom')));
			sectionPlan.appendChild(subsectionPlan);
			sectionPlan.appendChild(createTag('br'));
		}
		pagePlan.appendChild(sectionPlan);
	}
}

function buildRecords(xmlPlan, xmlRecords)
{
	var recordsTag = document.querySelector('#records');
	recordsTag.innerHTML = '';
	for (var section of xmlPlan.querySelectorAll('section')) {
		var sectionTag = createTagWithIdAndClassName('section', sectionNameToId(section.getAttribute('nom')), 'recordsSection');
		sectionTag.appendChild(createTagWithInnerHTML('h2', section.getAttribute('nom')));
		if (section.querySelector('subsection') == undefined) { // compact mode : no subsection
			sectionTag.appendChild(buildTableFromSection(section, xmlRecords));
		} else { // normal mode : some subsections in each section
			for (var subsection of section.querySelectorAll('subsection')) {
				var subsectionTag = createTagWithIdAndClassName('section', sectionNameToId(subsection.getAttribute('nom')), 'recordsSubsection');
				subsectionTag.appendChild(createTagWithInnerHTML('h3', subsection.getAttribute('nom')));
				subsectionTag.appendChild(buildTableFromSection(subsection, xmlRecords));
				sectionTag.appendChild(subsectionTag);
			}
		}
		recordsTag.appendChild(sectionTag);
	}
}

function buildTableFromSection(sectionTag, recordsXMLTag)
{
	var tableTag = createTag('table');
	
	// build header row
	var trTag = createTag('tr');
	trTag.appendChild(createTagWithInnerHTML('th', 'Épreuve'));
	for (avgType of window.avgTypes) {
		trTag.appendChild(createTagWithClassNameAndInnerHTML('th', avgType, avgType.charAt(0).toUpperCase() + avgType.substr(1,100)));
	}
	tableTag.appendChild(trTag);
	
	// build normal rows : for each event in sectionTag, look for the corresponding event in recordsXMLTag
	for (var planEvent of sectionTag.querySelectorAll('event')) {
		var eventName = planEvent.innerHTML;
		for (var recordEvent of recordsXMLTag.querySelectorAll('event')) {
			if (recordEvent.getAttribute('nom') != eventName) {
				continue;
			}
			var trTag = createTag('tr');
			trTag.appendChild(createTagWithClassNameAndInnerHTML('td', 'eventName', eventName));
			for (avgType of window.avgTypes) {
				var recordTag = recordEvent.querySelector(avgType);
				var tdTag = createTagWithClassName('td', recordTag.tagName);
				// build aTag if there is a link, and append tags to aTag or tdTag
				if (recordTag.getAttribute('lien') != '') {
					tdTag.className += ' avec_francocube';
					var aTag = createTagWithClassNameHrefTitleTarget('a', 'lien_francocube', recordTag.getAttribute('lien'), 'Discussion Francocube', '_blank');
					aTag.appendChild(createTagWithClassNameAndInnerHTML('div', 'temps', (recordTag.getAttribute('temps') != '' ? recordTag.getAttribute('temps') : 'x')));
					aTag.appendChild(createTagWithClassNameAndInnerHTML('div', 'nom', recordTag.getAttribute('nom')));
					if (recordTag.getAttribute('commentaire') != '') {
						aTag.appendChild(createTagWithClassNameAndInnerHTML('div', 'commentaire', recordTag.getAttribute('commentaire')));
					}
					tdTag.appendChild(aTag);
				} else {
					tdTag.appendChild(createTagWithClassNameAndInnerHTML('div', 'temps', (recordTag.getAttribute('temps') != '' ? recordTag.getAttribute('temps') : 'x')));
					tdTag.appendChild(createTagWithClassNameAndInnerHTML('div', 'nom', recordTag.getAttribute('nom')));
					if (recordTag.getAttribute('commentaire') != '') {
						tdTag.appendChild(createTagWithClassNameAndInnerHTML('div', 'commentaire', recordTag.getAttribute('commentaire')));
					}
				}
				trTag.appendChild(tdTag);
			}
			tableTag.appendChild(trTag);
			break;
		}
	}
	return (tableTag);
}

function buildPalmares(recordsXmlTag)
{
	// count records
	var countingArray = [];
	for (var recordEvent of recordsXmlTag.querySelectorAll('event')) {
		for (var avgType of window.avgTypes) {
			var name = recordEvent.querySelectorAll(avgType)[0].getAttribute('nom');
			if (name == '') {
				continue;
			}
			var listOfNamesToUpdate = [];
			while(name.includes('+')) {
				var indexOfPlus = name.indexOf('+');
				listOfNamesToUpdate.push(name.substring(0,indexOfPlus - 1));
				name = name.substring(indexOfPlus + 2,1000);
			}
			listOfNamesToUpdate.push(name);
			
			for (var name of listOfNamesToUpdate) {
				for (var j = 0; j < countingArray.length; j++) { // un for...in à faire ?
					if (name == countingArray[j].name) { // if the name is already in the list, count and ranking should be updated
						var countForThisPerson = ++countingArray[j].count;
						while (j > 0 && countingArray[j].count > countingArray[j-1].count) {
							countingArray[j].name = countingArray[j-1].name;
							countingArray[j].count = countingArray[j-1].count;
							countingArray[j-1].name = name;
							countingArray[j-1].count = countForThisPerson;
							j--;
						}
						break;
					}
				}
				if (j == countingArray.length) { // if the name is not in the list, it should be added to it
					countingArray[j] = {name: name, count: 1};
				}
			}
		}
	}
	var totalNbRecords = 0;
	for (var avgType of window.avgTypes) {
		totalNbRecords += recordsXmlTag.querySelectorAll(avgType).length;
	}
	
	palmares.appendChild(createTagWithInnerHTML('h2', 'Palmarès du nombre d\'UNRs'));
	var palmaresTable = createTag('table');
	
	// build palmares table header line
	var palmaresHeader = createTag('tr');
	palmaresHeader.appendChild(createTagWithInnerHTML('th', 'Personne (' + countingArray.length + ')'));
	palmaresHeader.appendChild(createTagWithInnerHTML('th', 'Nombre d\'UNRs (' + totalNbRecords + ')'));
	palmaresHeader.appendChild(createTagWithInnerHTML('th', 'Pourcentage des UNRs'));
	palmaresHeader.appendChild(createTagWithInnerHTML('th', 'Page des PB'));
	palmaresTable.appendChild(palmaresHeader);
	
	// build rows of the palmares table
	//for (var i = 0; i < countingArray.length; i++) { // un for...in à faire ?
	for (var palmaresRowIndex in countingArray) {
		var recordsSheetLink = 'x'; // will be intelligent in the future
		var palmaresLine = createTag('tr');
		palmaresLine.appendChild(createTagWithInnerHTML('td', countingArray[palmaresRowIndex].name));
		palmaresLine.appendChild(createTagWithInnerHTML('td', countingArray[palmaresRowIndex].count));
		palmaresLine.appendChild(createTagWithInnerHTML('td', ((100 * countingArray[palmaresRowIndex].count / totalNbRecords) + '').substring(0,4) + ' %'));
		palmaresLine.appendChild(createTagWithInnerHTML('td', recordsSheetLink));
		palmaresTable.appendChild(palmaresLine);
	}
	palmares.appendChild(palmaresTable);
}

function sectionNameToId(s)
{
	while(s.includes(' ')) {
		s = s.replace(' ','_');
	}
	return(s);
}