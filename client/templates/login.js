Template.login.events({
    'submit form': function(event) {
       event.preventDefault();
       /* var email = event.target.email.value;
        var password = event.target.password.value;
        Meteor.loginWithPassword(email, password, function(error)
        {
            if (error) {
                console.log(error.reason);
            } else {
                Router.go("home");
            }
        });*/
    }
});
Template.login.onRendered(function(){
    $('.login-form').validate({
        submitHandler: function(event){
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(email, password, function(error)
            {
                if (error) {
                    console.log(error.reason);
                } else {
                    Router.go("home");
                }
            });
        }
    });
});
