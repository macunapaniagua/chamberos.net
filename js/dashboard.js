var adminUsername = "admin";

window.onload = function (){
	var loggedUser = localStorage.getItem("logged_user");
	if(loggedUser !== adminUsername){
		$("#users-module").hide();
	}
}