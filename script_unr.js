function buildTdFromRecordTag(recordTag)
{
	// build tdTag, timeDivTag, nameDivTag, commentaryDivTag
	var tdTag = document.createElement('td');
	tdTag.className = recordTag.tagName;
	var timeDivTag = document.createElement('div');
	timeDivTag.className = 'temps';
	timeDivTag.innerHTML = (recordTag.getAttribute('temps') != '' ? recordTag.getAttribute('temps') : 'x');
	var nameDivTag = document.createElement('div');
	nameDivTag.className = 'nom';
	nameDivTag.innerHTML = recordTag.getAttribute('nom');
	if (recordTag.getAttribute('commentaire') != '') {
		var commentaryDivTag = document.createElement('div');
		commentaryDivTag.className = 'commentaire';
		commentaryDivTag.innerHTML = recordTag.getAttribute('commentaire');
	} else {
		var commentaryDivTag = undefined;
	}
	
	// build aTag if there is a link, and append tags to aTag or tdTag
	if (recordTag.getAttribute('lien') != '') {
		tdTag.className += ' avec_francocube';
		var aTag = document.createElement('a');
		aTag.className = "lien_francocube";
		aTag.href = recordTag.getAttribute('lien');
		aTag.target = "_blank";
		aTag.title = "Discussion Francocube";
		aTag.appendChild(timeDivTag);
		aTag.appendChild(nameDivTag);
		if (commentaryDivTag != undefined) {
			aTag.appendChild(commentaryDivTag);
		}
		tdTag.appendChild(aTag);
	} else {
		tdTag.appendChild(timeDivTag);
		tdTag.appendChild(nameDivTag);
		if (commentaryDivTag != undefined) {
			tdTag.appendChild(commentaryDivTag);
		}
	}
	return (tdTag);
}

function buildTableFromSection(sectionTag, recordsXMLTag)
{
	var tableTag = document.createElement('table');
	// build header row
	var trTag = document.createElement('tr');
	var thTag = document.createElement('th');
	thTag.innerHTML = 'Épreuve';
	trTag.appendChild(thTag);
	for (avgType of window.avgTypes) {
		var avgTypeThTag = document.createElement('th');
		avgTypeThTag.className = avgType;
		avgTypeThTag.innerHTML = avgType.charAt(0).toUpperCase() + avgType.substr(1,100);
		trTag.appendChild(avgTypeThTag);
	}
	tableTag.appendChild(trTag);
	
	// build normal rows : for each event in sectionTag, look for the corresponding event in recordsXMLTag
	for (var planEvent of sectionTag.querySelectorAll('event')) {
		var eventName = planEvent.innerHTML;
		for (var recordEvent of recordsXMLTag.querySelectorAll('event')) {
			if (recordEvent.getAttribute('nom') == eventName) {
				var trTag = document.createElement('tr');
				var tdTag = document.createElement('td');
				tdTag.className = "nom_epreuve";
				tdTag.innerHTML = eventName;
				trTag.appendChild(tdTag);
				for (avgType of window.avgTypes) {
					trTag.appendChild(buildTdFromRecordTag(recordEvent.querySelector(avgType)));
				}
				tableTag.appendChild(trTag);
			}
		}
	}
	return (tableTag);
}

function buildRecords(xml_plan, xml_records)
{
	var recordsTag = document.querySelector('#records');
	recordsTag.innerHTML = '';
	for (var section of xml_plan.querySelectorAll('section')) {
		var sectionTag = document.createElement('section');
		sectionTag.id = sectionNameToId(section.getAttribute('nom'));
		sectionTag.className = "partie";
		var sectionTitle = document.createElement('h2');
		sectionTitle.innerHTML = section.getAttribute('nom');
		sectionTag.appendChild(sectionTitle);
		var subsections = section.querySelectorAll('subsection');
		if (subsections.length == 0) { // compact mode : no subsection
			var tableTag = buildTableFromSection(section, xml_records);
			sectionTag.appendChild(tableTag);
			recordsTag.appendChild(sectionTag);
		} else { // normal mode : some subsections in each section
			for (var subsection of subsections) {
				var subsectionTag = document.createElement('section');
				subsectionTag.id = sectionNameToId(subsection.getAttribute('nom'));
				subsectionTag.className = "sous_partie";
				var subsectionTitleTag = document.createElement('h3');
				subsectionTitleTag.innerHTML = subsection.getAttribute('nom');
				subsectionTag.appendChild(subsectionTitleTag);
				var tableTag = buildTableFromSection(subsection, xml_records);
				subsectionTag.appendChild(tableTag);
				sectionTag.appendChild(subsectionTag);
			}
			recordsTag.appendChild(sectionTag);
		}
	}
}

function sectionNameToId(s)
{
	while(s.includes(' ')) {
		s = s.replace(' ','_');
	}
	return(s);
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
	
	// build palmares section title
	var palmaresTitle = document.createElement("h2");
	palmaresTitle.innerHTML = "Palmarès du nombre d'UNRs";
	var palmaresTable = document.createElement("table");
	
	// build palmares table header line
	var palmaresHeader = document.createElement("tr");
	var palmaresHeaderPerson = document.createElement("th");
	var palmaresHeaderUnrCount = document.createElement("th");
	var palmaresHeaderUnrPercent = document.createElement("th");
	var palmaresHeaderRecordsSheet = document.createElement("th");
	palmaresHeaderPerson.innerHTML = "Personne (" + countingArray.length + ")";
	palmaresHeaderUnrCount.innerHTML = "Nombre d'UNRs (" + totalNbRecords + ")";
	palmaresHeaderUnrPercent.innerHTML = "Pourcentage des UNRs";
	palmaresHeaderRecordsSheet.innerHTML = "Page des PB";
	palmaresHeader.appendChild(palmaresHeaderPerson);
	palmaresHeader.appendChild(palmaresHeaderUnrCount);
	palmaresHeader.appendChild(palmaresHeaderUnrPercent);
	palmaresHeader.appendChild(palmaresHeaderRecordsSheet);
	palmaresTable.appendChild(palmaresHeader);
	
	// build rows of the palmares table
	for (var i = 0; i < countingArray.length; i++) { // un for...in à faire ?
		var count = countingArray[i].count;
		var percent = ((100 * count / totalNbRecords) + '').substring(0,4);
		var recordsSheetLink = "x";
		var palmaresNewLine = document.createElement("tr");
		palmaresNewLine.innerHTML = "<td>" + countingArray[i].name + "</td>";
		palmaresNewLine.innerHTML += "<td>" + count + "</td>";
		palmaresNewLine.innerHTML += "<td>" + percent + " %</td>";
		palmaresNewLine.innerHTML += "<td>" +  recordsSheetLink + "</td>";
		palmaresTable.appendChild(palmaresNewLine);
	}
	palmares.appendChild(palmaresTitle);
	palmares.appendChild(palmaresTable);
}

function afficher_cacher_bouton_filtrer(avgTypeIndex)
{
	var tagsOfThisAvgType = document.querySelector('.' + window.avgTypes[avgTypeIndex]);
	var innerButton = document.querySelector('#filtrer').querySelectorAll('.bouton_interne')[avgTypeIndex];
	if (tagsOfThisAvgType[0].style.display != 'none') { // if it's displayed, it should be hidden
		for (var tagToHide of tagsOfThisAvgType) { // forEach ?
			tagToHide.style.display = 'none';
		}
		switchToggleButtonToOff(innerButton);
	} else { // else it's hidden and it should be displayed
		for (var tagToDisplay of tagsOfThisAvgType) { // forEach ?
			tagToDisplay.style.display = '';
		}
		switchToggleButtonToOn(innerButton);
	}
}

function toggleDisplayPlan() // toggle between 'none' and 'inline-block' display
{
	var pagePlan = document.querySelector('#pagePlan');
	pagePlan.style.display = (pagePlan.style.display == 'none' ? 'inline-block' : 'none');
}

function switchToggleButtonToOn(toggleButton)
{
	toggleButton.style.background = 'rgb(100,255,100)';
	toggleButton.style.transform = 'translate(0px,-2px)';
}

function switchToggleButtonToOff(toggleButton)
{
	toggleButton.style.background = 'rgb(255,100,100)';
	toggleButton.style.transform = 'translate(22px,-2px)';
}

function buildPlan(xmlPlan)
{
	var pagePlan = document.querySelector('#pagePlan');
	pagePlan.innerHTML = '';
	// add filters for single, mo3, avg5...
	var avgTypeFilters = document.createElement('div');
	avgTypeFilters.id = "filtrer";
	for (var avgType of window.avgTypes) {
		var avgTypeFilter = document.createElement('div');
		avgTypeFilter.className = 'filtrer_partie';
		//////////////////////////////////// ALERTE ! /////////// NE PAS SUPPRIMER LE COMMENTAIRE JUSTE EN-DESSOUS ////////// BOUTON A REBRANCHER ///////////
		//avgTypeFilter.innerHTML = '<div class="bouton_externe" onclick="afficher_cacher_bouton_filtrer(' + h + ')"><div class="bouton_interne"></div></div>';
		avgTypeFilter.innerHTML = '<div class="bouton_externe"><div class="bouton_interne"></div></div>';
		avgTypeFilter.appendChild(document.createElement('br'));
		var filterTitle = document.createElement('div');
		filterTitle.className = 'filtrer_average';
		filterTitle.innerHTML = avgType;
		avgTypeFilter.appendChild(filterTitle);
		avgTypeFilters.appendChild(avgTypeFilter);
	}
	pagePlan.appendChild(avgTypeFilters);
	
	var compact = document.querySelector('#bouton_compact_on') != undefined;
	var sections = xmlPlan.querySelectorAll('section');
	for (let i = 0; i < sections.length; i++) {
		var section = sections[i];
		var nom_section = section.getAttribute('nom');
		var subsections = section.querySelectorAll('subsection');
		
		var plan_partie = document.createElement("div");
		plan_partie.className = "plan_partie";
		if(compact) {
			plan_partie.style.width = "130px";
		} else {
			plan_partie.style.textAlign = "left";
		}
		
		var externalButton = document.createElement("div");
		externalButton.className = "bouton_externe";
		var innerButton = document.createElement("div");
		innerButton.className = "bouton_interne";
		externalButton.appendChild(innerButton);
		plan_partie.appendChild(externalButton);
		
		if (compact) {
			plan_partie.appendChild(document.createElement("br"));
		}
		var sectionLink = document.createElement("a");
		sectionLink.href = '#' + sectionNameToId(nom_section);
		sectionLink.className = "plan_partie_titre";
		sectionLink.innerHTML = nom_section;
		plan_partie.appendChild(sectionLink);
		plan_partie.appendChild(document.createElement("br"));
		
		for (let j = 0; j < subsections.length; j++) {
			var subsection = subsections[j];
			var plan_sous_partie = document.createElement("div");
			plan_sous_partie.className = "plan_sous_partie";
			var bouton_externe = document.createElement("div");
			bouton_externe.className = "bouton_externe";
			bouton_externe.onclick = function() { afficher_cacher_bouton_plan_sous_partie(i, j); };
			var bouton_interne = document.createElement("div");
			bouton_interne.className = "bouton_interne";
			bouton_externe.appendChild(bouton_interne);
			plan_sous_partie.appendChild(bouton_externe);
			var subsection_link = document.createElement("a");
			subsection_link.href = "#" + sectionNameToId(subsection.getAttribute('nom'));
			subsection_link.className = "plan_sous_partie_titre";
			subsection_link.innerHTML = subsection.getAttribute('nom');
			plan_sous_partie.appendChild(subsection_link);
			plan_partie.appendChild(plan_sous_partie);
			plan_partie.appendChild(document.createElement("br"));
		}
		pagePlan.appendChild(plan_partie);
		var bouton_externe = plan_partie.querySelector('.bouton_externe');
		bouton_externe.onclick = function() { afficher_cacher_bouton_plan(i); };
	}
}

function afficher_cacher_bouton_plan(i) {
	var category = document.querySelectorAll('.partie')[i];
	var innerButton = document.querySelectorAll('.plan_partie')[i].querySelector('.bouton_interne');
	toggleDisplayCategory(category, innerButton);
}

function afficher_cacher_bouton_plan_sous_partie(column, row) {
	var subCategory = document.querySelectorAll('.partie')[column].querySelectorAll('.sous_partie')[row];
	var innerButton = document.querySelectorAll('.plan_partie')[column].querySelectorAll('.bouton_interne')[row+1];
	toggleDisplayCategory(subCategory, innerButton);
}

function toggleDisplayCategory(category, innerButton)
{
	if (category.style.display == '') {
		category.style.display = 'none';
		switchToggleButtonToOff(innerButton);
	} else {
		category.style.display = '';
		switchToggleButtonToOn(innerButton);
	}
}

function getXML()
{
	if(window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
	} else {
		var xmlhttp = new activeXObject('Microsoft.XMLHTTP');
	}
	xmlhttp.open('get', 'unrData.xml', false);
	xmlhttp.send();
	var xmlDoc = xmlhttp.responseXML;
	return(xmlDoc);
}

function buildPage()
{
	window.avgTypes = new Array('single','mo3','avg5','avg12','avg50','avg100');
	var xmlDoc = getXML();
	var xmlTag = xmlDoc.querySelectorAll('xml')[0];
	var xmlRecordsTag = xmlTag.querySelectorAll('records')[0];
	var xmlNormalPlanTag = xmlTag.querySelectorAll('normalPlan')[0];
	buildPalmares(xmlRecordsTag);
	buildPlan(xmlNormalPlanTag);
	buildRecords(xmlNormalPlanTag, xmlRecordsTag);
}

function toggleCompactMode()
{
	var compactModeButtonOnOffPosition = document.querySelector('#bouton_compact_off');
	var xml = getXML();
	if (compactModeButtonOnOffPosition != undefined) { // switch to compact mode
		var planTag = xml.querySelectorAll('compactPlan')[0];
		compactModeButtonOnOffPosition.id = 'bouton_compact_on';
		compactModeButtonOnOffPosition.innerHTML = 'Repasser en Mode Normal';
	} else { //switch back to normal mode
		var compactModeButtonOnOnPosition = document.querySelector('#bouton_compact_on');
		var planTag = xml.querySelectorAll('normalPlan')[0];
		compactModeButtonOnOnPosition.id = 'bouton_compact_off';
		compactModeButtonOnOnPosition.innerHTML = 'Passer en Mode Compact';
	}
	buildRecords(planTag, xml.querySelectorAll('records')[0]);
	buildPlan(planTag);
}

