
Template.profil.rendered=function() {
    $('#tags').tagsinput('refresh');
    if(Session.get('imageURL')){
      $('.avatar-image').attr('src',imagesURL);
    }
}

Template.profil.events({
    "submit form": function(event){
        event.preventDefault();
        if(Session.get('imageURL')){
        Images.remove(Meteor.user().profile.imageId);
        }
        Meteor.users.update( { _id: Meteor.userId() }, { $set: {
            'profile.firstname': event.target.firstname.value,
            'profile.lastname': event.target.lastname.value,
            'profile.school': event.target.school.value,
            'profile.promo': event.target.promo.value,
            'profile.tags': event.target.tags.value.split(","), 
            'profile.birthday': event.target.birthday.value,
            'profile.imageURL': Session.get('imageURL'),
            'profile.imageId' : Session.get('imageId')
        }} );
    },
    "change .myFileInput": function(event, template){
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
            // handle success depending what you need to do
            var userId = Meteor.userId();
            var imagesURL = "http://testal.meteor.com/cfs/files/images/" + fileObj._id;
            Session.set('imageURL', imagesURL);
            Session.set('imageId', fileObj._id);
            
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