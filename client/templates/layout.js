Template.layout.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
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
    'click .container': function(event){
        event.preventDefault();
        $(".filter").removeClass("deploy-filter");
        $(".container").removeClass("filter-deployed");
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
    }
});