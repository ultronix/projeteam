$( document ).ready(function() {

	$(document).mouseup(function (e){
	    var container = $(".filter");

	    if (!container.is(e.target)
	        && container.has(e.target).length === 0)
	    {
	       	$(".container").removeClass("filter-deployed");
	       	$(".filter").removeClass("deploy-filter");
	    }
	});

	$( ".navbar-toggle" ).click(function() {
		console.log("coucou");
	});

});