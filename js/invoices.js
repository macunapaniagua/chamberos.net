jQuery(document).ready(function() {	
	var loggedUser = localStorage.getItem("logged_user");
	jQuery("#menu-user-name").html("Hi " + loggedUser);
	
	jQuery("#logout").click(function(){
		localStorage.removeItem("logged_user");
		window.location.replace('index.html');
	});

	jQuery("#btn-new").click(function(){
		window.location.replace("agregar-invoice.html");
	});
});