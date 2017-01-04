function footer()
{
	document.write('<footer>Vous êtes sur la "version site" de la liste UNR de France. La version la plus à jour est <a href="https://docs.google.com/spreadsheets/d/1ClyK6KtsZHDJrHY8uc-1Iri3Yq4F6RX3vP4u56S7D8Y/edit#gid=0">celle-ci</a>.<br/>Il est possible que certains records ne soient pas mis à jour. Pour toute erreur, question ou suggestion, envoyer un MP à Cubeur-manchot sur le forum Francocube.</footer>');
}

function commentaires()
{
	var commentaires = document.getElementsByClassName('commentaire');
	var contenu = '';
	var html = '';
	for (var commentaire in commentaires) {
		contenu = commentaire.innerHTML;
		if (contenu != '') {
			html = '<div class="commentaire2">' + contenu + '</div>'
			commentaire.innerHTML = html;
		}
	}
}