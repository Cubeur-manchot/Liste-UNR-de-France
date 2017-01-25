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
					td.className = 'avec_discussion'
				}
			} else {
				html = '<a href="' + lien_video + '" class="lien_video" target="_blank" title="Youtube">' + html + '</a>';
				if (lien_discussion == '') {
					td.className = 'avec_video';
				} else {
					td.className = 'avec_video_et_discussion';
				}
			}
			td.innerHTML = html;
		}
	}
}

function plan_de_page() {
	var plan = document.getElementById('plan');
	var plan_ouvert = document.getElementById('plan_ouvert');
	var plan_cache = document.getElementById('plan_cache');
	if (plan != undefined) {
		var parties = document.getElementsByClassName('partie');
		var nparties = parties.length;
		var html = '<p id="intitule_plan">Plan de Page</p>';
		for (var i=0; i<nparties; i++) {
			var partie = parties[i];
			var h2 = partie.getElementsByTagName('h2')[0];
			html += '<div class="plan_partie"><div class="plan_bouton_externe" onclick="afficher_cacher_bouton(' + i + ',-1);"><div class="plan_bouton_interne"></div></div><a href="#' + partie.id + '" class="plan_partie_titre" onmouseup="plan_de_page();">' + h2.innerHTML + '</a><br/>';
			var sous_parties = partie.getElementsByClassName('sous_partie');
			var nsous_parties = sous_parties.length;
			for (var j=0; j<nsous_parties; j++) {
				var sous_partie = sous_parties[j];
				var h3 = sous_partie.getElementsByTagName('h3')[0];
				html += '<div class="plan_sous_partie"><div class="plan_bouton_externe" onclick="afficher_cacher_bouton(' + i + ',' + j + ');"><div class="plan_bouton_interne"></div></div><a href="#' + sous_partie.id + '" class="plan_sous_partie_titre" onmouseup="plan_de_page();">' + h3.innerHTML + '</a></div><br/>';
			}
			html += '</div>';
		}
		plan.innerHTML = html;
		plan.id = 'plan_ouvert';
	} else if (plan_ouvert != undefined) {
		plan_ouvert.id = 'plan_cache';
	} else {
		plan_cache.id = 'plan_ouvert';
	}
}

function afficher_cacher_bouton(i,j) {
	if (j == -1) {
		var partie = document.getElementsByClassName('partie')[i];
		if (partie.style.display == 'block' || partie.style.display == '') {
			partie.style.display = 'none';
			var plan = document.getElementById('plan_ouvert');
			var bouton_interne = plan.getElementsByClassName('plan_partie')[i].getElementsByClassName('plan_bouton_interne')[0];
			bouton_interne.style.background = 'rgb(255,100,100)';
			bouton_interne.style.transform = 'translate(22px,0px)';
			plan_de_page();
		} else {
			partie.style.display = 'block';
			var plan = document.getElementById('plan_ouvert');
			var bouton_interne = plan.getElementsByClassName('plan_partie')[i].getElementsByClassName('plan_bouton_interne')[0];
			bouton_interne.style.background = 'rgb(100,255,100)';
			bouton_interne.style.transform = 'translate(0px,0px)';
			plan_de_page();
		}
	} else {
		var sous_partie = document.getElementsByClassName('partie')[i].getElementsByClassName('sous_partie')[j];
		if (sous_partie.style.display == 'block' || sous_partie.style.display == '') {
			var plan = document.getElementById('plan_ouvert');
			var bouton_interne = plan.getElementsByClassName('plan_partie')[i].getElementsByClassName('plan_sous_partie')[j].getElementsByClassName('plan_bouton_interne')[0];
			bouton_interne.style.background = 'rgb(255,100,100)';
			bouton_interne.style.transform = 'translate(22px,0px)';
			sous_partie.style.display = 'none';
			plan_de_page();
		} else {
			sous_partie.style.display = 'block';
			var plan = document.getElementById('plan_ouvert');
			var bouton_interne = plan.getElementsByClassName('plan_partie')[i].getElementsByClassName('plan_sous_partie')[j].getElementsByClassName('plan_bouton_interne')[0];
			bouton_interne.style.background = 'rgb(100,255,100)';
			bouton_interne.style.transform = 'translate(0px,0px)';
			plan_de_page();
		}
	}
}


function filtrer() {
	var filtrer = document.getElementById('filtrer');
	var html = 'Coucou ! Désolé, mais les filtres ne sont pas encore prêt...';
	var h2s = filtrer.getElementsByTagName('h2');
	filtrer.innerHTML = html;
}