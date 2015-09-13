 
Meteor.publish("annonces", function () {
      return Annonces.find({});
});

Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});
Meteor.publish("images", function(){ return Images.find(); });