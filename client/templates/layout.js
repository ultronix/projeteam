Template.layout.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go("home");
    },
    'click .btn-filter': function(event){
        event.preventDefault();
        if ($(".filter").hasClass("deploy-filter")) {

        	$(".filter").removeClass("deploy-filter");
        	$(".container").removeClass("filter-deployed");
        }
        else {
        	$(".filter").addClass("deploy-filter");  
        	$(".container").addClass("filter-deployed");      	
        };
    },
    'click .valid-filter': function(event){
    	if ($(".filter").hasClass("deploy-filter")) {

        	$(".filter").removeClass("deploy-filter");
        	$(".container").removeClass("filter-deployed");
        }
        else {
        	$(".filter").addClass("deploy-filter");  
        	$(".container").addClass("filter-deployed");      	
        };
    },
    'click .itemMenu': function(event){
        console.log("coucou");
        $("#op").removeAttr("checked");
    }
});