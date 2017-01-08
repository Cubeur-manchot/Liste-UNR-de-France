function footer()
{
	document.write('<footer>Vous êtes sur la "version site" de la liste UNR de France. La version la plus à jour est <a href="https://docs.google.com/spreadsheets/d/1ClyK6KtsZHDJrHY8uc-1Iri3Yq4F6RX3vP4u56S7D8Y/edit#gid=0">celle-ci</a>.<br/>Il est possible que certains records ne soient pas mis à jour. Pour toute erreur, question ou suggestion, envoyer un MP à Cubeur-manchot sur le forum Francocube.</footer>');
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
			var html = '<div class="temps">' + temps + '</div><div class="nom">' + nom + '</div>';
			if (commentaire != '') {
				html += '<div class="commentaire">' + commentaire + '</div>';
			}
			var as = td.getElementsByTagName('a');
			var lien_discussion = as[0].href;
			var lien_video = as[1].href;
			if (lien_video.substr(-1,1) != '#') { 
				html = '<a href="' + lien_video + '" class="lien_video" target="_blank" title="Youtube">' + html + '</a>';
			} else {
				if (lien_discussion.substr(-1,1) != '#') { 
					html = '<a href="' + lien_discussion + '" class="lien_discussion" target="_blank" title="Discussion">' + html + '</a>';
				}
			}
			td.innerHTML = html;
		}
	}
}