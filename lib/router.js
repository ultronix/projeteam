// ce fichier contient les info du router : iron router


Router.configure({
  // attend le subscribe avant de commencer
  waitOn: function() {
    return [
      // sur quel champs on va chercher dans la research instant
      Annonces.initEasySearch('titre'),
      Meteor.subscribe("annonces")
    ];
  }
});
Router.map(function() {
    this.route('home', {
        path: '/',
        template: 'home',
        layoutTemplate: 'layout'
    });

});

// ceci est un exemple
Router.route('/user/:_id', function () {
   this.render('user', {
    data: function () {
    return  Contacts.findOne({_id: this.params._id});
    }
  });
});

