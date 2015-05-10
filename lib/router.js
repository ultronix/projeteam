// ce fichier contient les info du router : iron router


Router.configure({
  // attend le subscribe avant de commencer
  waitOn: function() {
    return [
      Meteor.subscribe("tasks")
    ];
  }
});

Router.route('/', function () {
  this.render('Home')
});

// ceci est un exemple
Router.route('/user/:_id', function () {
   this.render('user', {
    data: function () {
    return  Contacts.findOne({_id: this.params._id});
    }
  });
});

