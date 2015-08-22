Template.users.helpers({
  isDemande: function (id, table) {
    return table.indexOf(id)!=-1;
  },
  myAnnonces: function(){
        return Annonces.find({ owner: Meteor.userId()});
  },
  userId: function (){return Session.get("userId");}              
 }) 

Template.users.rendered= function(){
  Session.set("userId", $('#userId').val());
}

Template.users.events({
  "click #demande": function (event, template) {     
    var userId = template.find('#userId').value;
    Meteor.call("demande", this._id, userId);
    },
  "click #valider": function (event, template) {
     var userId = template.find('#userId').value;      
     Meteor.call("finalisationDemandeSupport", this._id, userId );
    },    
})