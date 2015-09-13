  Template.projets.helpers({
  isMyProject: function (owner) {
    return owner === Meteor.userId();
  },
    projets : function(){
      // retourne que les projets dont l'user n'est pas propriétaire
      return  Annonces.find({owner: {$nin: [Meteor.userId()]}});
    }

 })   
