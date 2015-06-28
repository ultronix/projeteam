Template.register.rendered=function(){
    // refresh après l'ajout d'un tag
    $('#tags').tagsinput('refresh');
}

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var name = event.target.name.value;
        var surname = event.target.surname.value;
        var school = event.target.school.value;
        var promo = event.target.promo.value;
        var tags = event.target.tags.value;
        var date = event.target.date.value;
        Meteor.users.findOne({email: 'emailVar'});
        console.log("Form submitted.");
    }
});

function validForm (object, journeys ) {
    $('#errorList').html('');
    var error = false;
    //Object mapping for error list
    var errorObj = {
        email : "<li>veillez entrer un email et qui est valide</li>",
        emailExist : "<li>un compte avec cet email existe déjà</li>",
        passwordRegister :"<li>veillez entrer un mot de passe valide</li>",
        passwordRepeat :"<li>mot de passe différent ou invalide</li>",
        name : "<li>veillez entrer votre prénom</li>",
        lastname :"<li>veillez entrer votre nom</li>" ,
        school : "<li>veillez entrer votre école</li>",
        promo : "<li>veillez entrer la promo</li>",
        tags : "<li>veillez entrer au moins une compétence</li>",
        date : "<li>veillez entrer la date de disponibilité</li>"
    };
    //Convert both begin & end date picked from the form into date format
    var beginDateCurrent = convertDate(object.beginDate);
    var endDateCurrent = convertDate(object.endDate);
    /* Loop through object
     *
     */
    $.each( object, function(key, value) {
        //Check if empty
        if(value === "") {
            error = true;
            //Add class error
            $('#'+key).parents('.form-group').addClass('has-error');
            $('#errorList').append(errorObj[key]);
        }
        else {
            if(key===email){
                if(value===Meteor.users.findOne({email: 'emailVar'})){
                    error = true;
                    $('#'+key).parents('.form-group').hasClass('has-error');
                    $('#errorList').append(errorObj[emailExist]);
                }
                else{
                    $('#'+key).parents('.form-group').removeClass('has-error');
                }
            }
            else {
                if ($('#' + key).parents('.form-group').hasClass('has-error')) {
                    $('#' + key).parents('.form-group').removeClass('has-error');
                }
            }
        }
    });
    //if error is true
    if(error) {
        $('#errorNotification').show();
        return false;
    } else {
        $('#errorNotification').hide();
        return true;
    }
};

Template.register.events({
    'click #create' : function (event, template) {
        event.preventDefault();
        var userBuilder = {
            email : template.find("#email").value,
            password : template.find("#passwordRegister").value,
            name : template.find("#name").value,
            lastname : template.find("#lastname").value,
            school  : template.find("#school").value,
            promo : template.find($("#promo")).value,
            tags : template.find("#tags").value,
            date : template.find("#date").value
        };
        if (validForm(journeyBuilder,( Meteor.users.count() === 0  ? null : Meteor.users ))) {
                    Meteor.call("addUser", userBuilder.email,userBuilder.password, userBuilder.name, userBuilder.lastname,userBuilder.school, userBuilder.promo, userBuilder.tags, userBuilder.date);
                    Router.go('/home')
                }


}}
);