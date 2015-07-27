
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
  }

})