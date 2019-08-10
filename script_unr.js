function getXML()
{
	if(window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
	} else {
		var xmlhttp = new activeXObject('Microsoft.XMLHTTP');
	}
	xmlhttp.open('get','xml_unr.xml',false);
	xmlhttp.send();
	var xmlDoc = xmlhttp.responseXML;
	return(xmlDoc);
}

function nouveau_script_unr()
{
	var xml = getXML();
	var balise_xml = xml.getElementsByTagName('xml')[0];
	var balise_xml_records = balise_xml.getElementsByTagName('records')[0];
	var balise_plan_normal = balise_xml.getElementsByTagName('plan_normal')[0];
	buildPalmares(balise_xml_records);
	buildPlan(balise_plan_normal);
	make_records(balise_plan_normal, balise_xml_records);
}

function change_compact()
{
	var bouton_compact_off = document.getElementById('bouton_compact_off');
	var xml = getXML();
	var balise_records = xml.getElementsByTagName('records')[0];
	if (bouton_compact_off != undefined) { /* on passe en compact */
		var xml_plan = xml.getElementsByTagName('plan_compact')[0];
		bouton_compact_off.id = 'bouton_compact_on';
		bouton_compact_off.innerHTML = 'Repasser en Mode Normal';
	} else { /* on repasse en normal */
		var bouton_compact_on = document.getElementById('bouton_compact_on');
		var xml_plan = xml.getElementsByTagName('plan_normal')[0];
		bouton_compact_on.id = 'bouton_compact_off';
		bouton_compact_on.innerHTML = 'Passer en Mode Compact';
	}
	make_records(xml_plan, balise_records);
	buildPlan(xml_plan);
}

function afficher_cacher_bouton_plan(i,j) {
	if (j == -1) {
		var element = document.getElementsByClassName('partie')[i];
	} else {
		var element = document.getElementsByClassName('partie')[i].getElementsByClassName('sous_partie')[j];
	}
	var innerButton = document.getElementsByClassName('plan_partie')[i].getElementsByClassName('bouton_interne')[j+1];
	if (element.style.display == '') {
		element.style.display = 'none';
		switchToggleButtonToOff(innerButton);
	} else {
		element.style.display = '';
		switchToggleButtonToOn(innerButton);
	}
}

function make_string(balise_record)
{
	var html_records = '';
	var temps = balise_record.getAttribute('temps');
	if (temps == '')
	{
		temps = 'x';
	}
	var nom = balise_record.getAttribute('nom');
	var commentaire = balise_record.getAttribute('commentaire');
	var lien = balise_record.getAttribute('lien');
	var lien_type = 'francocube'; // par défaut -> à modifier en cherchant des sous-chaînes dans le lien
	var avg = balise_record.tagName;
	if (commentaire != '') {
		var balise_commentaire = '<div class="commentaire">' + commentaire + '</div>';
	} else {
		var balise_commentaire = '';
	}
	if (lien != '') {
		if (lien_type == 'francocube') {
			html_records += '<td class="' + avg + ' avec_francocube"><a class="lien_francocube" href="' + lien + '" target="_blank" title="Discussion Francocube"><div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>' + balise_commentaire + '</a></td>';
		} else if (lien_type == 'youtube') {
			html_records += '<td class="' + avg + ' avec_youtube"><a class="lien_youtube" href="' + lien + '" target="_blank" title="Vidéo Youtube"><div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>' + balise_commentaire + '</a></td>';
		} else if (lien_type == 'pb_sheet') {
			html_records += '<td class="' + avg + ' avec_pb_sheet"><a class="lien_pb_sheet" href="' + lien + '" target="_blank" title="Feuille de PB"><div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>' + balise_commentaire + '</a></td>';
		} else if (lien_type == 'wca') {
			html_records += '<td class="' + avg + ' avec_wca"><a class="lien_wca" href="' + lien + '" target="_blank" title="Lien WCA"><div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>' + balise_commentaire + '</a></td>';
		}
	} else {
		html_records += '<td class="' + avg + ' avec_discussion"><div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>' + balise_commentaire + '</td>';
	}
	return (html_records);
}

function make_records(xml_plan, xml_records)
{
	var zone_records = document.getElementById('records');
	var html_records = '';
	var events_records = xml_records.getElementsByTagName('event');
	var n_events_records = events_records.length;
	var avg = new Array('single','mo3','avg5','avg12','avg50','avg100');
	var sections = xml_plan.getElementsByTagName('section');
	var n_sections = sections.length;
	for (var i=0; i<n_sections; i++) {
		var section = sections[i];
		var nom_section = section.getAttribute('nom');
		html_records += '<section id="' + sectionNameToId(nom_section) + '" class="partie"><h2>' + nom_section + '</h2>';
		var subsections = section.getElementsByTagName('subsection');
		var n_subsections = subsections.length;
		for (var j=0; j<n_subsections; j++) {
			var subsection = subsections[j];
			var nom_subsection = subsection.getAttribute('nom');
			html_records += '<section id="' + sectionNameToId(nom_subsection) + '" class="sous_partie"><h3>' + nom_subsection + '</h3><table><tr><th>Épreuve</th><th class="single">Single</th><th class="mo3">Mo3</th><th class="avg5">Avg5</th><th class="avg12">Avg12</th><th class="avg50">Avg50</th><th class="avg100">Avg100</th></tr>';
			var events = subsection.getElementsByTagName('event');
			var n_events = events.length;
			for (var k=0; k<n_events; k++) {
				var nom_event = events[k].innerHTML;
				var indice_correspondant = -1;
				for (var l=0; l<n_events_records; l++) {
					if (events_records[l].getAttribute('nom') == nom_event) {
						indice_correspondant = l;
					}
				}
				var event = events_records[indice_correspondant];
				html_records += '<tr><td class="nom_epreuve">' + nom_event + '</td>';
				for (var l=0; l<6; l++) {
					var record = event.getElementsByTagName(avg[l])[0];
					html_records += make_string(record);
				}
				html_records += '</tr>';
			}
			html_records += '</table></section>';
		}
		if (n_subsections == 0) {
			html_records += '<table><tr><th>Épreuve</th><th class="single">Single</th><th class="mo3">Mo3</th><th class="avg5">Avg5</th><th class="avg12">Avg12</th><th class="avg50">Avg50</th><th class="avg100">Avg100</th></tr>';
			var events = section.getElementsByTagName('event');
			var n_events = events.length;
			for (var k=0; k<n_events; k++) {
				var nom_event = events[k].innerHTML;
				var indice_correspondant = -1;
				for (var l=0; l<n_events_records; l++) {
					if (events_records[l].getAttribute('nom') == nom_event) {
						indice_correspondant = l;
					}
				}
				var event = events_records[indice_correspondant];
				html_records += '<tr><td class="nom_epreuve">' + nom_event + '</td>';
				for (var l=0; l<6; l++) {
					var record = event.getElementsByTagName(avg[l])[0];
					html_records += make_string(record);
				}
				html_records += '</tr>';
			}
			html_records += '</table>';
		}
		html_records += '</section>'
	}
	zone_records.innerHTML = html_records;
}

function sectionNameToId(s)
{
	return (s.replace(' ','_').replace(' ','_').replace(' ','_'));
}



/*---------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------*/

// en-dessous d'ici c'est optimisé

function buildPalmares(recordsXmlTag)
{
	var events = recordsXmlTag.getElementsByTagName('event');//
	var avgTypes = new Array('single','mo3','avg5','avg12','avg50','avg100');
	
	// count records
	var countingArray = [];
	for (var i = 0; i < events.length; i++) {
		for (var h = 0; h < avgTypes.length; h++) {
			var name = events[i].getElementsByTagName(avgTypes[h])[0].getAttribute("nom");
			if (name == '')
			{
				continue;
			}
			for (var j = 0; j < countingArray.length; j++) {
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
	var totalNbRecords = 0;
	for (var h = 0; h < avgTypes.length; h++) {
		totalNbRecords += recordsXmlTag.getElementsByTagName(avgTypes[h]).length;
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
	for (var i = 0; i < countingArray.length; i++) {
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
	var tagsOfThisAvgType = document.getElementsByClassName(["single", "mo3", "avg5", "avg12", "avg50", "avg100"][avgTypeIndex]);
	var innerButton = document.getElementById('filtrer').getElementsByClassName('bouton_interne')[avgTypeIndex];
	if (tagsOfThisAvgType[0].style.display != 'none') { // if it's displayed, it should be hidden
		for (var i = 0; i < tagsOfThisAvgType.length; i++) {
			tagsOfThisAvgType[i].style.display = 'none';
		}
		switchToggleButtonToOff(innerButton);
	} else { // else it's hidden and it should be displayed
		for (var i = 0; i < tagsOfThisAvgType.length; i++) {
			tagsOfThisAvgType[i].style.display = '';
		}
		switchToggleButtonToOn(innerButton);
	}
}

function toggleDisplayPlan() // toggle between 'none' and 'inline-block' display
{
	var pagePlan = document.getElementById('pagePlan');
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

function buildPlan(xml_plan)
{
	var avgTypes = new Array('single','mo3','avg5','avg12','avg50','avg100');
	var pagePlan = document.getElementById('pagePlan');
	pagePlan.innerHTML = "";
	// add filters for single, mo3, avg5...
	var avgTypeFilters = document.createElement("div");
	avgTypeFilters.id = "filtrer";
	for (var h = 0; h < avgTypes.length; h++) {
		var avgTypeFilter = document.createElement("div");
		avgTypeFilter.className = "filtrer_partie";
		//avgTypeFilter.innerHTML = '<div class="bouton_externe" onclick="afficher_cacher_bouton_filtrer(' + h + ')"><div class="bouton_interne"></div></div>';
		avgTypeFilter.innerHTML = '<div class="bouton_externe"><div class="bouton_interne"></div></div>';
		avgTypeFilter.appendChild(document.createElement("br"));
		var filterTitle = document.createElement("div");
		filterTitle.className = "filtrer_average";
		filterTitle.innerHTML = avgTypes[h];
		avgTypeFilter.appendChild(filterTitle);
		avgTypeFilters.appendChild(avgTypeFilter);
	}
	pagePlan.appendChild(avgTypeFilters);
	
	var compact = document.getElementById('bouton_compact_on') != undefined;
	var sections = xml_plan.getElementsByTagName('section');
	for (let i = 0; i < sections.length; i++) {
		var section = sections[i];
		var nom_section = section.getAttribute('nom');
		var id_section = sectionNameToId(nom_section);
		var subsections = section.getElementsByTagName('subsection');
		var n_subsections = subsections.length;
		
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
		sectionLink.href = '#' + id_section;
		sectionLink.className = "plan_partie_titre";
		sectionLink.innerHTML = nom_section;
		plan_partie.appendChild(sectionLink);
		plan_partie.appendChild(document.createElement("br"));
		
		for (let j = 0; j < n_subsections; j++) {
			var subsection = subsections[j];
			var nom_subsection = subsection.getAttribute('nom');
			var id_subsection = sectionNameToId(nom_subsection);
			var plan_sous_partie = document.createElement("div");
			plan_sous_partie.className = "plan_sous_partie";
			var bouton_externe = document.createElement("div");
			bouton_externe.className = "bouton_externe";
			bouton_externe.onclick = function() { afficher_cacher_bouton_plan(i, j); };
			var bouton_interne = document.createElement("div");
			bouton_interne.className = "bouton_interne";
			bouton_externe.appendChild(bouton_interne);
			plan_sous_partie.appendChild(bouton_externe);
			var subsection_link = document.createElement("a");
			subsection_link.href = "#" + id_subsection;
			subsection_link.className = "plan_sous_partie_titre";
			subsection_link.innerHTML = nom_subsection;
			plan_sous_partie.appendChild(subsection_link);
			plan_partie.appendChild(plan_sous_partie);
			plan_partie.appendChild(document.createElement("br"));
		}
		pagePlan.appendChild(plan_partie);
		var bouton_externe = plan_partie.getElementsByClassName("bouton_externe")[0];
		bouton_externe.onclick = function() { afficher_cacher_bouton_plan(i, -1); };
	}
}