Template.register.rendered=function(){
    // refresh après l'ajout d'un tag
    $('#tags').tagsinput('refresh');
}

Template.register.events({
    'submit form': function(event){
        $('#errorList').html('');
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        var repassword = event.target.repassword.value;
        var firstname = event.target.firstname.value;
        var lastname = event.target.lastname.value;
        var school = event.target.school.value;
        var promo = event.target.promo.value;
        var tags = event.target.tags.value.split(",");
        var birthday = event.target.birthday.value;
        if(repassword==password) {
            Accounts.createUser({
                email: email,
                password: password,
                profile: {
                    firstname: firstname,
                    lastname: lastname,
                    school: school,
                    promo: promo,
                    tags: tags,
                    birthday: birthday
                }
            }, function (error) {
                if (error) {
                    $('#errorList').append("<li>"+error.reason+"</li>");
                }
                else
                    Router.go('home');
            });
        }
        else
            $('#errorList').append("<li>mot de passe différent</li>");
    }
});