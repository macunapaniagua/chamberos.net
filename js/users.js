jQuery(document).ready(function() {	
	
	// Autoexecuted function when the  window is loading
	(function(){
		// Load the logged user name into the header option 
		jQuery("#menu-user-name").html("Hi " + localStorage.getItem("logged_user"));
		// Get the action from the querystring
		var action = window.location.search.substr('?action='.length);		
		if(action){
			jQuery('#message-action').html(action);
			jQuery('#message').show();
		}
		// Read the Local Storage data and Load the table with the values
		var users = JSON.parse(window.localStorage.getItem("users"));
		if(users && users.length != 0){
			for (var i = 0; i < users.length; i++) {
				createNewRow(users[i]);
			}
		}
	})();	

	// Create a new row with the user information
	function createNewRow(user){
		$('.table tbody').append(
			'<tr><td data-label="Username">' + user.username + '</td>'
			+ '<td data-label="Name">' + user.name + '</td>'
			+ '<td data-label="Password">' + user.password + '</td>'
			+ '<td data-label="Actions">'
			+ '<a class="edit-row" href="#"><img src="../images/editar.png"/></a>'
			+ '<a class="delete-row" href="#"><img src="../images/eliminar.png"/></a>'
			+ '</td></tr>'
			);
	}

	// Get the id of the selected row and redirect to the edit page with the id in the url
	jQuery(".edit-row").click(function(){
		// Get the row where the clicked button is located
		var row = jQuery(this).closest("tr");
		// Get the id of the row
		var id = row.find('td').eq(0).html();
    	// Create the url
    	var url = 'editar-user.html?id=' + id;
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
    	// Get the username of the row to delete
    	var username = row.find('td').eq(0).html();
    	if(removeFromLocalStorage(username)){
    		row.remove();
    	}    	
    });

    // Delete a client in the local storage
    function removeFromLocalStorage(username){
    	var users = JSON.parse(localStorage.getItem('users'));
    	for(i = 0; i < users.length; i++){
    		if(users[i].username === username){				
    			users.splice(i, 1);
    			localStorage.setItem('users', JSON.stringify(users));
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

	// Open the Window to add a new User
	jQuery("#btn-new").click(function(){
		window.location.replace("agregar-user.html");
	});
});