Template.register.rendered=function(){
    // refresh après l'ajout d'un tag
    $('#tags').tagsinput('refresh');
    $('.register').validate({
    submitHandler: function(form){
        $('#errorList').html('');
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var firstname = $('[name=firstname]').val();
        var lastname = $('[name=lastname]').val();
        var school = $('[name=school]').val();
        var promo = $('[name=promo]').val();
        var tags = $('[name=tags]').val().split(",");
        var birthday = $('[name=birthday]').val();
        var imageURL = Session.get('imageURL');
        var imageId = Session.get('imageId')
        Accounts.createUser({
            email: email,
            password: password,
            profile: {
                firstname: firstname,
                lastname: lastname,
                school: school,
                promo: promo,
                tags: tags,
                birthday: birthday,
                imageURL : imageURL,
                imageId : imageId
            }
        }, 
        function (error){
            if (error) {
                Images.remove(imageId);
                $('#errorList').append("<li>Le mail existe déjà</li>");
            }
            else
                delete Session.keys['imageURL'];
                delete Session.keys['imageId'];
                delete Session.keys['emailRegister'];
                delete Session.keys['firstnameRegister'];
                delete Session.keys['lastNameRegister'];
                delete Session.keys['schoolRegister'];
                delete Session.keys['promoRegister'];
                delete Session.keys['tagsRegister'];
                delete Session.keys['birthdayRegister'];
                Router.go('home');
        });
    }
});
}
Template.register.events({
    'submit form': function(event){
        event.preventDefault();
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
            
            Images.remove(Session.get('imageId'));
            Session.set('imageId', fileObj._id);
            Session.set('emailRegister', $('[name=email]').val());
            Session.set('firstnameRegister', $('[name=firstname]').val());
            Session.set('lastNameRegister', $('[name=lastname]').val());
            Session.set('schoolRegister', $('[name=school]').val());
            Session.set('promoRegister', $('[name=promo]').val());
            Session.set('tagsRegister', $('[name=tags]').val());
            Session.set('birthdayRegister', $('[name=birthday]').val());
          }
        });
     }),
     Session.set('imageURL', imagesURL);
    }
});
Template.register.helpers({
  imageURL: function (){return Session.get("imageURL");},
  email: function (){return Session.get("emailRegister");},
  firstname: function (){return Session.get("firstnameRegister");},
  lastname: function (){return Session.get("lastNameRegister");},
  school: function (){return Session.get("schoolRegister");},       
  promo: function (){return Session.get("promoRegister");},
  tags: function (){return Session.get("tagsRegister");},
  birthday: function (){return Session.get("birthdayRegister");}
 }) 