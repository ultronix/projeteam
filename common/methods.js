
// common s'execute coté client/server
Meteor.methods({
  addAnnonces: function (titre, description, tel, personne, mail, tags) {
    // vérifie si l'user est connecté
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Annonces.insert({
      titre: titre,
      description: description,
      tel: tel,
      personne: personne,
      mail: mail,
      tags: tags,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },  
  modifAnnonces: function (c_id, titre, description, tel, personne, mail, tags) {
    // vérifie si l'user est connecté
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    /*
Tasks.update(taskId, { $set: { checked: setChecked} });*/
    Annonces.update(c_id, 
        { $set : 
          {
          titre: titre,
          description: description,
          tel: tel,
          personne: personne,
          mail: mail,
          tags: tags
          }
      });
  },
  deleteAnnonce: function (contactId) {
    Annonces.remove(contactId);
    Meteor.users.update({}, 
      {$pull: {participations: contactId, demandeSupport: contactId}})
    $(".modal-backdrop").remove();
  },
  seeInfo: function (thisId) {
    return  Annonces.findOne({_id: thisId});
  },
  update: function () {
    return  update = true;
  },  
  endup: function () {
    return  update = false;
  },
  addUser: function (email, password, name, lastname, school, promo, tags, date){
      return
  },




  // postuler pour une annonce

  postuler:  function (annonce_id) {
    // vérifie si l'user est connecté
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Annonces.update(annonce_id, { 
      $addToSet : 
          {
          postulants : Meteor.userId()
          }
      });
 
    Meteor.users.update( { _id: Meteor.userId() }, { 
      $addToSet : 
          {
          postule : annonce_id
          }
      });
  },
  validerPostuler: function (annonce_id, user_id){
    // vérifie si l'user est connecté
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Annonces.update(annonce_id, {
      $addToSet :
        {
        membres : user_id  
        }
    });
    Annonces.update(annonce_id, {
      $pull :
        {
        postulants : user_id  
        }
    });
    Meteor.users.update( { _id: user_id }, { 
      $addToSet : 
          {
          participations : annonce_id
          }
    });
    Meteor.users.update( { _id: user_id }, { 
      $pull : 
          {
          postule : annonce_id
          }
      });            
  },
  demande:  function (annonce_id, user_id) {
    // vérifie si l'user est connecté
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Annonces.update(annonce_id, { 
      $addToSet : 
          {
          supportDemande : user_id
          }
      });
    Meteor.users.update( { _id: user_id }, { 
      $addToSet : 
          {
          demandeSupport : annonce_id
          }
      });
  },

  validerDemande:  function (annonce_id) {
    // vérifie si l'user est connecté
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Annonces.update(annonce_id, { 
      $addToSet : 
          {
          supportValide : Meteor.userId()
          }
      });
    Annonces.update(annonce_id, {     
        $pull : 
          {
          supportDemande : Meteor.userId()
          }
      });
    Meteor.users.update( { _id: Meteor.userId() }, 
      {    
      $pull :{
          demandeSupport : annonce_id
      }    
    });
    Meteor.users.update( { _id: Meteor.userId() }, {
      $addToSet : 
          {
          projetValide : annonce_id
          }
      }); 
    },
  finalisationDemandeSupport: function(annonce_id, user_id){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Annonces.update(annonce_id, { 
      $addToSet : 
          {
          membres : user_id
          }
      });
    Annonces.update(annonce_id, {     
        $pull : 
          {
          supportValide : user_id
          }
      });
    Meteor.users.update( { _id: user_id }, 
      {    
      $pull :{
          projetValide : annonce_id
      }    
    });
    Meteor.users.update( { _id: user_id }, {
      $addToSet : 
          {
          participations : annonce_id
          }
      }); 
  }  
})