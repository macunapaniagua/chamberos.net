var adminUsername = "admin";

window.onload = function (){
	var loggedUser = localStorage.getItem("logged_user");
	// Disable "Add User" option if the loged user is not Administrator
	if(loggedUser !== adminUsername){
		jQuery("#users-module").hide();
	}
	// Load the User name in dashboard fields
	jQuery("#menu-user-name").html("Hi " + loggedUser);
	jQuery("#welcome").html("Welcome " + loggedUser);
}

jQuery(document).ready(function() {	
	
	jQuery("#logout").click(function(){
		localStorage.removeItem("logged_user");
		window.location.href = 'index.html';
	});

});