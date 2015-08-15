jQuery(document).ready(function() {	
	// Set the logged user name in the header
	jQuery("#menu-user-name").html("Hi " + localStorage.getItem("logged_user"));


	// Autoexecuted function to load the User information when the window is loading
	(function(){
		// Get the id from the querystring
		var id = window.location.search.substr('?id='.length);
		// Get the user from the local storage that match with the id and load the data into the fields
		var clients = JSON.parse(localStorage.getItem('clients'));
		for (var i = 0; i < clients.length; i++) {
			var client = clients[i];
			if(client.id === id){
				jQuery("#id").val(client.id);
				jQuery("#first-name").val(client.firstName);
				jQuery("#last-name").val(client.lastName);
				jQuery("#phone").val(client.phone);
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
		// Go to delete the old data for this client
		removeFromLocalStorage(id);
		saveClientInLocalStorage(cliente);
		window.location.replace("clients.html?action=updated");
	});

	// Delete a client in the local storage
	function removeFromLocalStorage(id){
		var clients = JSON.parse(localStorage.getItem('clients'));
		for(i = 0; i < clients.length; i++){
			if(clients[i].id === id){				
				clients.splice(i, 1);
				localStorage.setItem('clients', JSON.stringify(clients));
				return;			
			}
		}
	}


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