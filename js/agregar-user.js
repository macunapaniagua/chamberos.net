jQuery(document).ready(function() {	
	// Set the logged user name in the header
	jQuery("#menu-user-name").html("Hi " + localStorage.getItem("logged_user"));
	
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
		// Check that the username selecte be different from 'admin'
		if(username === 'admin'){
			jQuery('#modal-message').html('The username "admin" is not elegible. Please select another one');
			jQuery("#modal").modal('show');
			return;
		}
		// Check the password
		if(password === passwordConfirmation){
			var user = new User(username, name, password);
			if(saveUserInLocalStorage(user)){
				window.location.replace("users.html?action=added");
			} else{
				jQuery('#modal-message').html('There is already a user with the selected username. Please select another one');
				jQuery("#modal").modal('show');
			}
		}else{
			jQuery('#modal-message').html('The password and confirmation password must be the same');
			jQuery("#modal").modal('show');
		}		
	});

	// Save the new user in the local storage
	function saveUserInLocalStorage(user){
		var users = JSON.parse(window.localStorage.getItem("users"));
		// Check if exist any user and save the new one
		if(!users){
			window.localStorage.setItem('users', JSON.stringify([user]));
		}else{
			if(selectedUsernameIsRegistered(user.username, users)){
				return false;
			}
			users.push(user);
			window.localStorage.setItem('users', JSON.stringify(users));
		}
		return true;	
	};

	// Verify if the selected username is already registered
	function selectedUsernameIsRegistered(username, users){
		for(i = 0; i < users.length; i++){
			if(users[i].username === username){				
				return true;			
			}
		}
		return false;
	};
});