 
Meteor.publish("annonces", function () {
      return Annonces.find({});
});

Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});