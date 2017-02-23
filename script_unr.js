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
	make_palmares(balise_xml_records);
	make_plan(balise_plan_normal);
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
	make_plan(xml_plan);
}

function make_plan(xml_plan)
{
	var bouton_compact_on = document.getElementById('bouton_compact_on');
	if (bouton_compact_on != undefined) {
		var compact = true;
		var string_compact = ' style="display: block; padding: 5px; margin: 0px;"';
	} else {
		var compact = false;
		var string_compact = ' style="display: inline-block; padding: 5px;"';
	}
	var html_plan = '';
	var plan_de_page = document.getElementById('plan_de_page');
	var sections = xml_plan.getElementsByTagName('section');
	var n_sections = sections.length;
	for (var i=0; i<n_sections; i++) {
		var section = sections[i];
		var nom_section = section.getAttribute('nom');
		var id_section = to_id(nom_section);
		html_plan += '<div class="plan_partie"' + string_compact + '><div class="bouton_externe" onclick="afficher_cacher_bouton_plan(' + i + ',-1);"><div class="bouton_interne"></div></div><a href="' + id_section + '" class="plan_partie_titre">' + nom_section + '</a><br/>';
		var subsections = section.getElementsByTagName('subsection');
		var n_subsections = subsections.length;
		for (var j=0; j<n_subsections; j++) {
			var subsection = subsections[j];
			var nom_subsection = subsection.getAttribute('nom');
			var id_subsection = to_id(nom_subsection);
			html_plan += '<div class="plan_sous_partie"><div class="bouton_externe" onclick="afficher_cacher_bouton_plan(' + i + ',' + j + ')"><div class="bouton_interne"></div></div><a href="' + id_subsection + '" class="plan_sous_partie_titre">' + nom_subsection + '</a></div><br/>';
		}
	html_plan += '</div>';
	}
	plan_de_page.innerHTML = html_plan;
}

function afficher_cacher_plan()
{
	var plan_de_page = document.getElementById('plan_de_page');
	if (plan_de_page.style.display == 'none') {
		plan_de_page.style.display = 'inline-block';
	} else {
		plan_de_page.style.display = 'none';
	}
}

function afficher_cacher_bouton_plan(i,j) {
	var bouton_interne = document.getElementsByClassName('plan_partie')[i].getElementsByClassName('bouton_interne')[j+1];
	if (j == -1) {
		var element = document.getElementsByClassName('partie')[i];
	} else {
		var element = document.getElementsByClassName('partie')[i].getElementsByClassName('sous_partie')[j];
	}
	if (element.style.display == '') {
		element.style.display = 'none';
		bouton_interne.style.background = 'rgb(255,100,100)';
		bouton_interne.style.transform = 'translate(22px,-2px)';
	} else {
		element.style.display = '';
		bouton_interne.style.background = 'rgb(100,255,100)';
		bouton_interne.style.transform = 'translate(0px,-2px)';
	}
	plan_de_page();
}

function make_string(balise_record)
{
	var html_records = '';
	var temps = balise_record.getElementsByTagName('temps')[0].innerHTML;
	var nom = balise_record.getElementsByTagName('nom')[0].innerHTML;
	var commentaire = balise_record.getElementsByTagName('commentaire')[0].innerHTML;
	var lien_discussion = balise_record.getElementsByTagName('lien_discussion')[0].innerHTML;
	var lien_video = balise_record.getElementsByTagName('lien_video')[0].innerHTML;
	if (commentaire != '') {
		var balise_commentaire = '<div class="commentaire">' + commentaire + '</div>';
	} else {
		var balise_commentaire = '';
	}
	if (lien_discussion != '') {
		if (lien_video != '') {
			html_records += '<td class="avec_video_et_discussion"><a class="lien_video" href="' + lien_video + '" target="_blank" title="Youtube"></a><a class="lien_discussion" href="' + lien_discussion + '" target="_blank" title="Discussion"></a><div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>' + balise_commentaire + '</td>';
		} else {
			html_records += '<td class="avec_discussion"><a class="lien_discussion" href="' + lien_discussion + '" target="_blank" title="Discussion"><div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>' + balise_commentaire + '</a></td>';
		}
	} else {
		if (lien_video != '') {
			html_records += '<td class="avec_video"><a class="lien_discussion" href="' + lien_discussion + '" target="_blank" title="Youtube"><div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>' + balise_commentaire + '</a></td>';
		} else {
			html_records += '<td class="sans_lien"><div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>' + balise_commentaire + '</td>';
		}
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
		html_records += '<section id="' + to_id(nom_section) + '" class="partie"><h2>' + nom_section + '</h2>';
		var subsections = section.getElementsByTagName('subsection');
		var n_subsections = subsections.length;
		for (var j=0; j<n_subsections; j++) {
			var subsection = subsections[j];
			var nom_subsection = subsection.getAttribute('nom');
			html_records += '<section id="' + to_id(nom_subsection) + '" class="sous_partie"><h3>' + nom_subsection + '</h3><table><tr><th>Épreuve</th><th>Single</th><th>Mo3</th><th>Avg5</th><th>Avg12</th><th>Avg50</th><th>Avg100</th></tr>';
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
			html_records += '<table><tr><th>Épreuve</th><th>Single</th><th>Mo3</th><th>Avg5</th><th>Avg12</th><th>Avg50</th><th>Avg100</th></tr>';
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

function make_palmares(records)
{
	var events = records.getElementsByTagName('event');
	var avg = new Array('single','mo3','avg5','avg12','avg50','avg100');
	var n_events = events.length;
	var noms_denombre = new Array();
	var denombre = new Array();
	var n_noms = 0;
	var total_denombre = 0;
	for (var i=0; i<n_events; i++) {
		var event = events[i];
		for (var h=0; h<6; h++) {
			var event_avg = event.getElementsByTagName(avg[h])[0];
			var nom = event_avg.getElementsByTagName('nom')[0].innerHTML;
			if (nom != '') {
				total_denombre += 1;
				for (var j=0; j<n_noms; j++) { /* recherche du nom actuel dans la liste des noms déjà vus */
					if (nom == noms_denombre[j]) {
						denombre[j] += 1;
						while (j>0 && denombre[j]>denombre[j-1]) { /* actualisation du tri */
							var nom_stock = noms_denombre[j];
							var denombre_stock = denombre[j];
							noms_denombre[j] = noms_denombre[j-1];
							denombre[j] = denombre[j-1];
							noms_denombre[j-1] = nom_stock;
							denombre[j-1] = denombre_stock;
							j -= 1;
						}
						j = n_noms + 1;
					}
				}
				if (j == n_noms || n_noms == 0) { /* si nom inexistant dans la liste des déjà vus, on le crée */
					noms_denombre[n_noms] = nom;
					denombre[n_noms] = 1;
					n_noms += 1;
				}
			}
		}
	}
	var html_palmares = '<h2>Palmarès du nombre d\'UNRs</h2><table><tr><th>Personne (' + n_noms + ')</th><th>Nombre d\'UNRs (' + total_denombre + ')</th><th>Pourcentage des UNRs</th></tr>'
	var palmares = document.getElementById('palmares');
	for (var i=0; i<n_noms; i++) { /* écriture du html du palmarès */
		var pourcentage = ((100*denombre[i]/total_denombre)+'').substring(0,4);
		html_palmares += '<tr><td>' + noms_denombre[i] + '</td><td>' + denombre[i] + '</td><td>' + pourcentage + '%</td></tr>';
	}
	html_palmares += '</table>';
	palmares.innerHTML = html_palmares;
}

function to_id(s)
{
	return (s.replace(' ','_').replace(' ','_').replace(' ','_').replace(' ','_').replace(' ','_').replace(' ','_'));
}