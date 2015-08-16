var adminUsername = "admin";

jQuery(document).ready(function() {	
	
	(function(){

		var loggedUser = localStorage.getItem("logged_user");
		// Load the User name in dashboard fields
		jQuery("#menu-user-name").html("Hi " + loggedUser);
		jQuery("#welcome").html("Welcome " + loggedUser);
		// Disable "Add User" option if the loged user is not Administrator
		if(loggedUser !== adminUsername){
			jQuery(".user-item-to-hide").hide();
		}

		jQuery("#logout").click(function(){
			localStorage.removeItem("logged_user");
			window.location.replace('index.html');
		});

	})();
});