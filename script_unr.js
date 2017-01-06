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
			var html = '<div class="temps">' + td.getElementsByClassName('temps')[0].innerHTML + '</div>';
			html += '<div class="nom">' + td.getElementsByClassName('nom')[0].innerHTML + '</div>';
			var commentaire = td.getElementsByClassName('commentaire')[0].innerHTML;
			if (commentaire != '') {
				html += '<div class="commentaire">' + commentaire + '</div>';
			}
			var lien_video = td.getElementsByClassName('lien_video')[0].href;
			var lien_discussion = td.getElementsByClassName('lien_discussion')[0].href;
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