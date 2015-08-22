Annonces = new Mongo.Collection("annonces");

//Mise en place des fonctions de recherches
EasySearch.createSearchIndex('projets', {
  field: 'titre',
  collection: Annonces,
  props : {
        'tags' : []
    },
  use: 'mongo-db',
  query: function (searchString) {
    // Default query that is used for searching

    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    // Make the emails searchable
    query.$or.push({
      'tags': 
        { $all : searchString.split(",") }  
  		
    });
    console.log(searchString.split(","));
    return query;
  }

});

EasySearch.createSearchIndex('supports', {
  field: 'profile.firstname',
  collection: Meteor.users,
  props : {
        'profile.tags' : []
    },
  use: 'mongo-db',
  query: function (searchString) {
    // Default query that is used for searching

    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    // Make the emails searchable
    query.$or.push({
      'profile.tags': 
        { $all : searchString.split(",") }  
      
    });
    console.log(searchString.split(","));
    return query;
  }

});
//Mise en place des processus de validation
if (Meteor.isClient) {
$.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            regexPass: true,
            minlength: 6
        },
        repassword: {
          equalTo: "#password"
        },
        firstname: {
          required:true
        },
        lastname: {
          required:true
        }
    },
    messages: {
        email: {
            required: "Une adresse doit être renseigné",
            email: "Adresse invalide"
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters.",
            regexPass: "rentrer un mot de passe valide"
        },
        firstname:{
          required: "Le prenom requis"
        },
        lastname:{
          required: "Le nom est requis"
        }
    }
});
$.validator.addMethod("regexPass",
function(value, element) {
   return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
       && /[a-z]/.test(value) // has a lowercase letter
       && /\d/.test(value) // has a digit
});
}

//configurtion de l'uplaod d'image
Images = new FS.Collection("images", {
  filter: {
    maxSize: 1048576, // in bytes
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png', 'jpg']
    },
    onInvalid: function (message) {
      if (Meteor.isClient) {
        alert(message);
      } else {
        console.log(message);
      }
    }
  }, 
 stores: [new FS.Store.FileSystem("images", {path: "../../../../../public/upload/img/places"})]
});
Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});
