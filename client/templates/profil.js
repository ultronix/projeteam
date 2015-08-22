
Template.profil.rendered=function() {
    $('#tags').tagsinput('refresh');
}

Template.profil.events({
    "submit form": function(event){
        event.preventDefault();
        Meteor.users.update( { _id: Meteor.userId() }, { $set: {
            'profile.firstname': event.target.firstname.value,
            'profile.lastname': event.target.lastname.value,
            'profile.school': event.target.school.value,
            'profile.promo': event.target.promo.value,
            'profile.tags': event.target.tags.value.split(","), 
            'profile.birthday': event.target.birthday.value
        }} );
    },
    "change .myFileInput": function(event, template){
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
            // handle success depending what you need to do
                Images.remove(Meteor.user().profile.imageId);
            var userId = Meteor.userId();
            var imagesURL = "/upload/img/places/" + fileObj.collectionName+ "-" + fileObj._id + "-" + fileObj.original.name;
            Meteor.users.update(userId, {$set: {
                "profile.imageURL": imagesURL,
                "profile.imageId" : fileObj._id
            }});
          }
        });
     })    
    }
});
Template.profil.helpers({
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});