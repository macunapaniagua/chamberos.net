jQuery(document).ready(function() {	
	// Set the logged user name in the header
	jQuery("#menu-user-name").html("Hi " + localStorage.getItem("logged_user"));

	// Autoexecuted function to load the User information when the window is loading
	(function(){
		// Get the username from the querystring
		var username = window.location.search.substr('?id='.length);
		// Get the user from the local storage that match with the id and load the data into the fields
		var users = JSON.parse(localStorage.getItem('users'));
		for (var i = 0; i < users.length; i++) {
			var user = users[i];
			if(user.username === username){
				jQuery("#Username").val(user.username);
				jQuery("#full-name").val(user.name);
				jQuery("#password").val(user.password);
				jQuery("#repeat-password").val(user.password);
				break;
			}
		}
	})();
	
	// Logout action
	jQuery("#logout").click(function(){
		localStorage.removeItem("logged_user");
		window.location.replace('index.html');
	});

	// Button new listener
	jQuery("#btn-new").click(function(){
		window.location.replace("agregar-user.html");
	});

	// Button cancel listener
	jQuery("#cancel").click(function(){
		window.location.replace("users.html");
	});

	// Object User 
	var User = function(username, name, password){
		this.username = username;
		this.name = name;
		this.password = password;
	};

	// Submit Form action
	jQuery("form").submit(function(event){
		// Prevent the default submit
		event.preventDefault();
		// Get the entered data and create a new user object
		var username = jQuery("#Username").val();
		var name = jQuery("#full-name").val();
		var password = jQuery("#password").val();
		var passwordConfirmation = jQuery("#repeat-password").val();
		if(password === passwordConfirmation){
			var user = new User(username, name, password);
			// Go to delete the old data for this user
			removeFromLocalStorage(username);
			saveClientInLocalStorage(user);
			window.location.replace("users.html?action=updated");			
		}else{
			jQuery('#modal-message').html('The password and confirmation password must be the same');
			jQuery("#modal").modal('show');
		}
	});

	// Delete a User in the local storage
	function removeFromLocalStorage(username){
		var users = JSON.parse(localStorage.getItem('users'));
		for(i = 0; i < users.length; i++){
			if(users[i].username === username){				
				users.splice(i, 1);
				localStorage.setItem('users', JSON.stringify(users));
				return;			
			}
		}
	}

	// Save the new user in the local storage
	function saveClientInLocalStorage(user){
		var users = JSON.parse(window.localStorage.getItem("users"));
		// Check if exist any user and save the new one
		if(!users){
			window.localStorage.setItem('users', JSON.stringify([user]));
		}else{
			users.push(user);
			window.localStorage.setItem('users', JSON.stringify(users));
		}	
	};
});