function footer()
{
	document.write('<footer>La version Google Sheet est <a href="https://docs.google.com/spreadsheets/d/1ClyK6KtsZHDJrHY8uc-1Iri3Yq4F6RX3vP4u56S7D8Y/edit#gid=0">ici</a>.<br/>Pour toute erreur, question ou suggestion, <a href="http://forum.francocube.com/ucp.php?i=pm&mode=compose&u=4736">envoyer un MP à Cubeur-manchot sur le forum Francocube</a>.</footer>');
}

function script_UNR()
{
	var tds = document.getElementsByTagName('td');
	var ntds = tds.length;
	for (var i = 0; i < ntds; i++) {
		var td = tds[i];
		if (td.className != 'nom_epreuve') {
			var divs = td.getElementsByTagName('div');
			var temps = divs[0].innerHTML;
			var nom = divs[1].innerHTML;
			var commentaire = divs[2].innerHTML;
			var lien_discussion = divs[3].innerHTML;
			var lien_video = divs[4].innerHTML;
			var html = '<div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>';
			if (commentaire != '') {
				html += '<div class="commentaire">' + commentaire + '</div>';
			}
			if (lien_video == '') {
				if (lien_discussion == '') {
					td.className = 'sans_lien';
				} else {
					html = '<a href="' + lien_discussion + '" class="lien_discussion" target="_blank" title="Discussion">' + html + '</a>';
					td.className = 'avec_discussion';
				}
			} else {
				if (lien_discussion == '') {
					td.className = 'avec_video';
				html = '<a href="' + lien_video + '" class="lien_video" target="_blank" title="Youtube">' + html + '</a>';
				} else {
					td.className = 'avec_video_et_discussion';
				html = '<a href="' + lien_video + '" class="lien_video" target="_blank" title="Youtube"></a><a href="' + lien_discussion + '" class="lien_discussion" target="_blank" title="Discussion"></a>' + html;
				}
			}
			td.innerHTML = html;
		}
	}
	document.getElementById('plan').innerHTML = '<p class="intitule">' + document.getElementById('plan').innerHTML + '</p>';
	document.getElementById('filtrer').innerHTML = '<p class="intitule">' + document.getElementById('filtrer').innerHTML + '</p>';
}

function plan_de_page() {
	var plan = document.getElementById('plan');
	var plan_ouvert = document.getElementById('plan_ouvert');
	var plan_cache = document.getElementById('plan_cache');
	if (plan != undefined) {
		var parties = document.getElementsByClassName('partie');
		var nparties = parties.length;
		var html = '<p class="intitule">Plan de Page</p>';
		for (var i=0; i<nparties; i++) {
			var partie = parties[i];
			var h2 = partie.getElementsByTagName('h2')[0];
			html += '<div class="plan_partie"><div class="bouton_externe" onclick="afficher_cacher_bouton_plan(' + i + ',-1);"><div class="bouton_interne"></div></div><a href="#' + partie.id + '" class="plan_partie_titre" onmouseup="plan_de_page();">' + h2.innerHTML + '</a><br/>';
			var sous_parties = partie.getElementsByClassName('sous_partie');
			var nsous_parties = sous_parties.length;
			for (var j=0; j<nsous_parties; j++) {
				var sous_partie = sous_parties[j];
				var h3 = sous_partie.getElementsByTagName('h3')[0];
				html += '<div class="plan_sous_partie"><div class="bouton_externe" onclick="afficher_cacher_bouton_plan(' + i + ',' + j + ');"><div class="bouton_interne"></div></div><a href="#' + sous_partie.id + '" class="plan_sous_partie_titre" onmouseup="plan_de_page();">' + h3.innerHTML + '</a></div><br/>';
			}
			html += '</div>';
		}
		plan.innerHTML = html;
		plan.id = 'plan_ouvert';
		plan.className = 'ouvert';
	} else if (plan_ouvert != undefined) {
		plan_ouvert.id = 'plan_cache';
		plan_ouvert.className = 'ferme';
	} else {
		plan_cache.id = 'plan_ouvert';
		plan_cache.className = 'ouvert';
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

function filtrer() {
	var filtrer = document.getElementById('filtrer');
	var filtrer_ouvert = document.getElementById('filtrer_ouvert');
	var filtrer_cache = document.getElementById('filtrer_cache');
	if (filtrer != undefined) {
		var html = '<p class="intitule">Filtrer</p>';
		html += '<div class="filtrer_partie"><div class="bouton_externe" onclick="afficher_cacher_bouton_filtrer(1)"><div class="bouton_interne"></div></div><div class="filtrer_average">Single</div></div>';
		html += '<div class="filtrer_partie"><div class="bouton_externe" onclick="afficher_cacher_bouton_filtrer(2)"><div class="bouton_interne"></div></div><div class="filtrer_average">Mo3</div></div>';
		html += '<div class="filtrer_partie"><div class="bouton_externe" onclick="afficher_cacher_bouton_filtrer(3)"><div class="bouton_interne"></div></div><div class="filtrer_average">Avg5</div></div>';
		html += '<div class="filtrer_partie"><div class="bouton_externe" onclick="afficher_cacher_bouton_filtrer(4)"><div class="bouton_interne"></div></div><div class="filtrer_average">Avg12</div></div>';
		html += '<div class="filtrer_partie"><div class="bouton_externe" onclick="afficher_cacher_bouton_filtrer(5)"><div class="bouton_interne"></div></div><div class="filtrer_average">Avg50</div></div>';
		html += '<div class="filtrer_partie"><div class="bouton_externe" onclick="afficher_cacher_bouton_filtrer(6)"><div class="bouton_interne"></div></div><div class="filtrer_average">Avg100</div></div>';
		filtrer.innerHTML = html;
		filtrer.id = 'filtrer_ouvert';
		filtrer.className = 'ouvert';
	} else if (filtrer_ouvert != undefined) {
		filtrer_ouvert.id = 'filtrer_cache';
		filtrer_ouvert.className = 'ferme';
	} else {
		filtrer_cache.id = 'filtrer_ouvert';
		filtrer_cache.className = 'ouvert';
	}
}

function afficher_cacher_bouton_filtrer(i) {
	var lignes = document.getElementsByTagName('tr');
	var nlignes = lignes.length;
	var tds = document.getElementsByTagName('td');
	var ntds = tds.length;
	var ths = document.getElementsByTagName('th');
	var nths = ths.length;
	var bouton_interne = document.getElementById('filtrer_ouvert').getElementsByClassName('bouton_interne')[i-1];
	if (lignes[0].getElementsByTagName('th')[i].style.display != 'none') {
		for (var j=0; j*7<ntds-1; j++) {
			tds[7*j+i].style.display = 'none';
		}
		for (var j=0; j*7<nths-1; j++) {
			ths[7*j+i].style.display = 'none';
		}
		bouton_interne.style.background = 'rgb(255,100,100)';
		bouton_interne.style.transform = 'translate(22px,-2px)';
	} else {
		for (var j=0; j*7<ntds-1; j++) {
			tds[7*j+i].style.display = '';
		}
		for (var j=0; j*7<nths-1; j++) {
			ths[7*j+i].style.display = '';
		}
		bouton_interne.style.background = 'rgb(100,255,100)';
		bouton_interne.style.transform = 'translate(0px,-2px)';
	}
	filtrer();
}

function palmares() {
	var palmares = document.getElementById('palmares');
	var html = '';
	var i = 0;
	var j = 0;
	var count = 0;
	var valeur_courante = '';
	var indice_meilleur = 0;
	var rang = 0;
	var suffixe_rang = '';
	var noms_balises = document.getElementsByClassName('nom');
	var noms_normaux = new Array();
	var noms_reduits = new Array();
	var n_normaux = noms_balises.length;
	var n_reduits = 0;
	var pourcentage = 0;
	var cumule = 0;
	var pourcentage_string = '';
	var total = 0;
	var support = ['',0];
	for (i=0; i<n_normaux; i++) { /* comptage du total d'UNRs et transfert vers noms_normaux */
		noms_normaux[i] = noms_balises[i].innerHTML;
		if (noms_normaux[i] != '') total++;
	}
	noms_normaux.sort(); /* tri alphabétique */
	i=0;
	for (j=0; j<n_normaux; j++) {
		valeur_courante = noms_normaux[j];
		count = 0;
		while (valeur_courante == noms_normaux[j] && j < n_normaux) { /* comptage par nom */
			count++;
			j++;
		}
		noms_reduits[i] = [valeur_courante,count];
		j--;
		i++;
	}
	n_reduits = i;
	html = '<h2>Palmarès du nombre d\'UNRs</h2><table><tr><th>Personne (' + n_reduits + ')</th><th>Nombre d\'UNRs (' + total + ')</th><th>Classement</th><th>Pourcentage des UNRs</th></tr>';
	for (i=0; i<n_reduits; i++) { /* tri bulle */
		indice_meilleur = i;
		for (j=i+1; j<n_reduits; j++) {
			if (noms_reduits[j][1] > noms_reduits[indice_meilleur][1]) {
				indice_meilleur = j;
			}
		}
		support = noms_reduits[i];
		noms_reduits[i] = noms_reduits[indice_meilleur];
		noms_reduits[indice_meilleur] = support;
		if (i == 0 || noms_reduits[i][1] != noms_reduits[i-1][1]) {
			rang = i;
		}
		pourcentage = 100 * noms_reduits[i][1] / total;
		cumule += pourcentage;
		pourcentage_string = pourcentage + '';
		pourcentage_string = pourcentage_string.substring(0,4);
		if (i == 1) suffixe_rang = 'er'; else suffixe_rang = 'ème';
		if (i !=0) html += '<tr><td>' + noms_reduits[i][0] + '</td><td>' + noms_reduits[i][1] + '</td><td>' + rang + suffixe_rang + '</td><td>' + pourcentage_string + '%</td></tr>';
	}
	html += '</table>';
	palmares.innerHTML = html;
}