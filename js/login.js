var adminUserName = "admin";
var adminPassword = "$uper4dmin";

function logInUser(){
	var username = $("#username-field").val();
	var password = $("#password-field").val();

	if(validateData(username, password)){
		localStorage.setItem("logged_user", username);
		window.location.replace("dashboard.html");
	}else{
		jQuery('#modal').modal("show");
	}
}

function validateData(pUserName, pPassword){
	if(pUserName === adminUserName && pPassword === adminPassword){
		return true;
	}else{
		var users = JSON.parse(localStorage.getItem('users'));
		for(i = 0; i < users.length; i++){
			if(users[i].username === pUserName){	
				if(users[i].password === pPassword){
					return true;
				} else{
					jQuery('#modal-message').html('Wrong password... Try again');
					return false;
				}			
			}
		}
		jQuery('#modal-message').html('The username is not registered in the system');
		return false;
	}
}