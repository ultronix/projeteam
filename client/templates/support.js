  Template.supports.helpers({
  isMyId: function (id) {
    return id === Meteor.userId();
  },
    supports: function(){
      // retourne que les supports
      return  Meteor.users.find({ _id: {$nin: [Meteor.userId()]}});
    }

 })  

  