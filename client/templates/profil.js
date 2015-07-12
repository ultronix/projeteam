
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
            'profile.tags': event.target.tags.value,
            'profile.birthday': event.target.birthday.value
        }} );
    }
});