jQuery(document).ready(function() {	
	
	// Autoexecuted function when the  window is loading
	(function(){
		var loggedUser = localStorage.getItem("logged_user");
		// Load the logged user name into the header option
		jQuery("#menu-user-name").html("Hi " + loggedUser);
		// Disable "Add User" option if the loged user is not Administrator
		if(loggedUser !== 'admin'){
			jQuery(".user-item-to-hide").hide();
		}
		// Get the action from the querystring
		var action = window.location.search.substr('?action='.length);	
		if(action){
			jQuery('#message-action').html(action);
			jQuery('#message').show();
		}
		// Read the Local Storage data and Load the table with the values
		var clients = JSON.parse(window.localStorage.getItem("clients"));
		if(clients && clients.length != 0){
			for (var i = 0; i < clients.length; i++) {
				createNewRow(clients[i]);
			}
		}
	})();	

	// Create a new row with the client information
	function createNewRow(client){
		$('.table tbody').append('<tr><td data-label="Id">' 
			+ client.id 
			+ '</td><td data-label="Full name">' 
			+ client.firstName + ' ' + client.lastName 
			+ '</td><td data-label="Phone">' 
			+ client.phone 
			+ '</td><td data-label="Actions"><a class="edit-row" href="#">'
			+ '<img src="../images/editar.png"/></a><a class="delete-row" href="#">'
			+ '<img src="../images/eliminar.png"/></a></td></tr>'
			);
	}

	// Get the id of the selected row and redirect to the edit page with the id in the url
	jQuery(".edit-row").click(function(){
		// Get the row where the clicked button is located
		var row = jQuery(this).closest("tr");
		// Get the id of the row
		var id = row.find('td').eq(0).html();
    	// Create the url
    	var url = 'editar-cliente.html?id=' + id;
    	window.location.replace(url);
    });

	// Search the row to delete and display a modal to confirm the process
	jQuery(".delete-row").click(function(){
		// Get the row where the clicked button is located
		var row = jQuery(this).closest("tr");		
		// Set the name(1) of the client to delete in the modal box
		var fullName = row.find('td').eq(1).html();		
		jQuery("#user-to-delete").html(fullName);
		// Add the row to the modal and open it
		jQuery('#modal-delete').data('row', row).modal('show');
	});

	// Delete the row when the user select yes in the modal
	jQuery("#btnDeleteYes").click(function(){
		var row = jQuery('#modal-delete').data('row');  	
    	// Get the id of the row to delete
    	var id = row.find('td').eq(0).html();
    	if(removeFromLocalStorage(id)){
    		row.remove();
    	}    	
    });

    // Delete a client in the local storage
    function removeFromLocalStorage(id){
    	var clients = JSON.parse(localStorage.getItem('clients'));
    	for(i = 0; i < clients.length; i++){
    		if(clients[i].id === id){				
    			clients.splice(i, 1);
    			localStorage.setItem('clients', JSON.stringify(clients));
    			return true;			
    		}
    	}
    	return false;
    }

	// Close the session
	jQuery("#logout").click(function(){
		localStorage.removeItem("logged_user");
		window.location.replace('index.html');
	});

	// Open the Window to add a new Client
	jQuery("#btn-new").click(function(){
		window.location.replace("agregar-cliente.html");
	});
});