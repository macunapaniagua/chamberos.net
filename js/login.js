var adminUserName = "admin";
var adminPassword = "$uper4dmin";

function logInUser(){
	var username = $("#username-field").val();
	var password = $("#password-field").val();

	if(validateData(username, password)){
		window.location.href = "../html/dashboard.html";
	}else{
		alert("Los datos de inicio de sesión no coiciden o no pertenecen a un usuario registrado");
	}
}

function validateData(pUserName, pPassword){
	if(pUserName === adminUserName && pPassword === adminPassword){
		return true;
	}

	return false;

}