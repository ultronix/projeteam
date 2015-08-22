 Template.demandes.helpers({
 isDemande: function (id, table) {
    return table.indexOf(id)!=-1;
  }, 
    projets : function(){
      // retourne que les projets dont l'user n'est pas propriétaire
      return  Annonces.find({
      	owner: {$nin: [Meteor.userId()]},
      	membres : { $nin : [Meteor.userId()] }
      });
    }

 });   

Template.demandes.events({
    "click #valider": function () {      
      Meteor.call("validerDemande", this._id);
    }
  });
  