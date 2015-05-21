 
Meteor.publish("annonces", function () {
      return Annonces.find({});
});