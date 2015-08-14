  Template.projets.helpers({
  isMyProject: function (owner) {
    return owner === Meteor.userId();
  },
    projets : function(){
      // retourne que les annonces dont l'user est propriétaire
      return  Annonces.find({owner: {$nin: [Meteor.userId()]}});
    }

 })   
