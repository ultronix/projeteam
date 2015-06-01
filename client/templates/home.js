  Session.setDefault('update', false);
  Template.liste.helpers({
    annonce : function(){
      // retourne que les annonces dont l'user est propriétaire
      return  Annonces.find({owner: Meteor.userId()});
    }
  });

  Template.login.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();

      var email = t.find('#login-email').value, 
      password = t.find('#login-password').value;

      Meteor.loginWithPassword(email, password, function(err){
        if (err) {
          console.log(email);
        }          
        else {
          console.log("success");
        }
          
      });
         return false; 
    }
  });

  Template.register.events({
    'submit #register-form' : function(e, t) {
      e.preventDefault();
      var email = t.find('#account-email').value
        , password = t.find('#account-password').value;

        // Trim and validate the input

      Accounts.createUser({email: email, password : password}, function(err){
          if (err) {
            console.log("error");
          } else {
            console.log("success");
          }

        });

      return false;
    }
  });

  Template.annonces.helpers({
    // si on est en mode update de Annonce
    update : function(){
       return Session.get('update');
    }
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

 Template.annonces.events({
    "click #update": function () {      
     Session.set('update', true);
    },

    "submit .modif": function (event) {
  

    var titre = event.target.titre.value;
    var description = event.target.description.value;
    var tel = event.target.tel.value;
    var personne = event.target.personne.value;
    var mail = event.target.mail.value;
    var tags = event.target.tags.value;
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
    var tags = event.target.tags.value;

    // appelle la method addcontact (regarde plus bas)
    Meteor.call("addAnnonces", titre, description, tel, personne, mail, tags);
    // Clear form
    event.target.titre.value = "";
    event.target.description.value = "";
    event.target.tel.value = "";
    event.target.personne.value = "";
    event.target.mail.value = "";
    event.target.tags.value = "";
  
    return false;
  }
  });


  Template.formodif.events({


  });
      // configuration account ui : pas de mail
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
