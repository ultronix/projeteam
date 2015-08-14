// ce fichier contient les info du router : iron router
Router.configure({
  // layout de l'app entiere
  layoutTemplate: 'layout',
  // attend le subscribe avant de commencer
  layoutTemplate: 'layout',
  waitOn: function() {
    return [
      // sur quel champs on va chercher dans la research instant
      Annonces.initEasySearch('titre'),
      Meteor.subscribe("annonces"),
      Meteor.subscribe('allUsers')
    ];
  }
});


    Router.route('home', {
        path: '/',
        template: 'home'
    });


// ceci est un exemple
Router.route('/annonce/:_id', function () {
   this.render('annonce', {
    data: function () {
    return  Annonces.findOne({_id: this.params._id});
    }
  });
});

Router.route('/users/:_id', function () {
   this.render('users', {
    data: function () {
    return  Meteor.users.findOne({_id: this.params._id});
    }
  });
});


Router.route('/register');
Router.route('/login');
Router.route('/profil');
Router.route('/projets');
