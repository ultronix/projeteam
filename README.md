# projeteam

## Note Romain 21/05

On peut se connecter, ajouter des annonces, modifier/supprimer ses annonces, voir les annonces de tout le monde via une searchbar


## Note Romain structure (à lire svp) 10/05/2015

C'est une todo-list, rien à voir avec le projet mais c'est histoire d'avoir une structure propre et que tout le monde puisse comprendre.<br>
Vous avez juste à faire la commande meteor pour faire marcher le projet.<br>

* J'ai adapté le todo de base à une structure qui m'a semblé clair/simple avec iron router d'intégré
* Enlevé auto-publish et insecure
* ajouté accounts-ui et accounts-password
* ajouté iron router

### Si vous n'avez pas fait le [tuto de base](https://www.meteor.com/install) faites-le avant de lire la suite (sérieusement faites-le)

* Le dossier server ne s'execute que coté server :
<br> Il n'y a qu'un fichier publish.js qui sert à publier les ressources voulues<br>
* Le dossier client ne s'execute que coté client :
<br> head.html sera le header appelé à chaque fois, il faudrait au mieux faire un fichier layout.html qui contiendra le header, le footer, le menu etc. et qui sera utiliser pour chaque page
<br> Le fichier template contiendra le corps des pages (ex : on appelle layout.html à chaque fois et on charge le contenu correspondant à la page dans ce dossier)
<br> Les pages en .js sont les "controller" de leur homonyme en .html<br>
* common s'execute des deux côtés et contiendra toutes nos methods
* lib s'execute avant tout autre chose

Je vous laisse regarder ce qu'il y a dedans pour que vous compreniez, évidemment ce n'est pas définitif.<br>
Donnez vos impressions svp<br>
PS : j'ai écris ProjectTeam au lieu de Projeteam sorry