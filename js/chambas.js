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
		var chambas = JSON.parse(window.localStorage.getItem("chambas"));
		if(chambas && chambas.length != 0){
			for (var i = 0; i < chambas.length; i++) {
				createNewRow(chambas[i]);
			}
		}
	})();	

	// Create a new row with the chamba information
	function createNewRow(chamba){
		$('.table tbody').append(
			'<tr><td data-label="Chamba #">' + chamba.id + '</td>'
			+ '<td data-label="Date">' + chamba.date + '</td>'
			+ '<td data-label="Client">' + chamba.clientName + '</td>'
			+ '<td data-label="Description">' + chamba.details + '</td>'
			+ '<td data-label="Notes">' + chamba.notes + '</td>'
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
    	var url = 'editar-chamba.html?id=' + id;
    	window.location.replace(url);
    });

	// Search the row to delete and display a modal to confirm the process
	jQuery(".delete-row").click(function(){
		// Get the row where the clicked button is located
		var row = jQuery(this).closest("tr");	
		// Set the Id(0) (of the chamba to delete) in the modal box
		var chambaId = row.find('td').eq(0).html();		
		jQuery("#chamba-to-delete").html(chambaId);
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
    	var chambas = JSON.parse(localStorage.getItem('chambas'));
    	for(i = 0; i < chambas.length; i++){
    		if(chambas[i].id === id){				
    			chambas.splice(i, 1);
    			localStorage.setItem('chambas', JSON.stringify(chambas));
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
		window.location.replace("agregar-chamba.html");
	});
});