Template.annonce.events({
   
    "click #postuler": function () {      
      Meteor.call("postuler", this._id);
    }
  });

Template.annonce.helpers({
	postulees : function(){
	  // retourne les annonces déjà postulés (afin d'afficher le bouton "je postule" ou non)
	return  Annonces.findOne(
	  	{$and : 
	  		[
				{ _id: this._id},
				{postulants : Meteor.userId()}
	  		]
	  	}
	  );
	}
});