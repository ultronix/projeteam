  Session.setDefault('update', false);
  Template.ajout.rendered=function(){
  // refresh après l'ajout d'un tag
      $('#tags').tagsinput('refresh');
  }
  Template.formodif.rendered=function(){
      // refresh après l'ajout d'un tag
      $('#tags_modif').tagsinput('refresh');
  }
  Template.annoncesPopUp.rendered=function(){
      // refresh après l'ajout d'un tag
      $('#tags_annonce').tagsinput('refresh');
  }
  Template.liste.helpers({
    annonce : function(){
      // retourne que les annonces dont l'user est propriétaire
      return  Annonces.find({owner: Meteor.userId()});
    }
  });
  Template.annoncesPopUp.rendered= function(){
    Session.set("annonceId", $('#annonceId').val());
  };
  Template.annoncesPopUp.helpers({
    // si on est en mode update de Annonce
    update : function(){
       return Session.get('update');
    },
    postulantsAnnonce : function(){
       return Meteor.users.find({postule : this._id});
    },
    valideDemande : function(){
      return Meteor.users.find({projetValide : this._id});
    },
    membres : function(){
      return Meteor.users.find({participations : this._id});
    },    
    userId: function (){return Session.get("userId");} 
  });

  Template.searchBox.helpers({
    // si on est en mode update de Annonce
    annonce : function(){
       return Annonces.find();
    }
  });

  Template.liste.events({
   
    "click .delete": function () {      
      Meteor.call("deleteAnnonce", this._id);
    },
    "click .thisAnnonce": function () {      
      Meteor.call("seeInfo", this._id);
      Session.set('update', false);
    }
  });

 Template.annoncesPopUp.events({
    "click #update": function () {      
     Session.set('update', true);
    },
    "click #validerPostuler": function (event, template) {
     var annonceId = template.find('#annonceId').value;      
     Meteor.call("validerPostuler", annonceId, this._id );
    },
    "click #finaliser": function (event, template) {
     var annonceId = template.find('#annonceId').value;      
     Meteor.call("finalisationDemandeSupport", annonceId, this._id );
    },    

    "submit .modif": function (event) {
  

    var titre = event.target.titre.value;
    var description = event.target.description.value;
    var tel = event.target.tel.value;
    var personne = event.target.personne.value;
    var mail = event.target.mail.value;
    var tags = event.target.tags.value.split(",");
    var c_id = event.target.id;
    
    Meteor.call("modifAnnonces", c_id, titre, description, tel, personne, mail, tags);
    // fin de l'etat update
    Session.set('update', false);
    return false;
  }
  });
  Template.ajout.events({

  "submit .new-annonce": function (event) {
  

    var titre = event.target.titre.value;
    var description = event.target.description.value;
    var tel = event.target.tel.value;
    var personne = event.target.personne.value;
    var mail = event.target.mail.value;
    var tags = event.target.tags.value.split(",");

    // appelle la method addcontact (regarde plus bas)
    Meteor.call("addAnnonces", titre, description, tel, personne, mail, tags);
    // Clear form
    event.target.titre.value = "";
    event.target.description.value = "";
    event.target.tel.value = "";
    event.target.personne.value = "";
    event.target.mail.value = "";
    event.target.tags.value = "";

    $('#modalAdd').modal('hide');
  
    return false;
  }
  });


  Template.formodif.events({


  });
      // configuration account ui : pas de mail
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
