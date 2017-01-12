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