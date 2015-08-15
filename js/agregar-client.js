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
		window.location.replace("agregar-cliente.html");
	});

	// Button cancel listener
	jQuery("#cancel").click(function(){
		window.location.replace("clients.html");
	});


	// Object Client 
	var Client = function(id, firstName, lastName, phone){
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone; 

		this.getId = function(){
			return this.id;
		}
	};

	// Submit Form action
	jQuery("form").submit(function(event){
		// Prevent the default submit
		event.preventDefault();
		// Get the entered data and create a new client object
		var id = jQuery("#id").val();
		var firstName = jQuery("#first-name").val();
		var lastName = jQuery("#last-name").val();
		var phone = jQuery("#phone").val();
		var cliente = new Client(id, firstName, lastName, phone);
		saveClientInLocalStorage(cliente);
		window.location.replace("clients.html");
	});

	// Save the new client in the local storage
	function saveClientInLocalStorage(client){
		var clients = JSON.parse(window.localStorage.getItem("clients"));
		// Check if exist any client and save the new one
		if(!clients){
			window.localStorage.setItem('clients', JSON.stringify([client]));
		}else{
			clients.push(client);
			window.localStorage.setItem('clients', JSON.stringify(clients));
		}	
	};
});