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
		var invoices = JSON.parse(window.localStorage.getItem("invoices"));
		if(invoices && invoices.length != 0){
			for (var i = 0; i < invoices.length; i++) {
				createNewRow(invoices[i]);
			}
		}
	})();

	// Create a new row with the invoice information
	function createNewRow(invoice){
		$('.table tbody').append(
			'<tr><td data-label="Invoice #">' + invoice.id + '</td>'
			+ '<td data-label="Date">' + invoice.date + '</td>'
			+ '<td data-label="Client">' + invoice.clientName + '</td>'
			+ '<td data-label="Description">' + invoice.details + '</td>'
			+ '<td data-label="Amount">$' + invoice.amount + '</td>'
			+ '<td data-label="Actions">'
			+ '<a class="edit-row" href="#""><img src="../images/editar.png"/></a>'
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
    	var url = 'editar-invoice.html?id=' + id;
    	window.location.replace(url);
    });

	// Search the row to delete and display a modal to confirm the process
	jQuery(".delete-row").click(function(){
		// Get the row where the clicked button is located
		var row = jQuery(this).closest("tr");	
		// Set the Id(0) (of the invoice to delete) in the modal box
		var chambaId = row.find('td').eq(0).html();		
		jQuery("#invoice-to-delete").html(chambaId);
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

    // Delete a invoice in the local storage
    function removeFromLocalStorage(id){
    	var invoices = JSON.parse(localStorage.getItem('invoices'));
    	for(i = 0; i < invoices.length; i++){
    		if(invoices[i].id === id){				
    			invoices.splice(i, 1);
    			localStorage.setItem('invoices', JSON.stringify(invoices));
    			return true;			
    		}
    	}
    	return false;
    };

	// Close the session
	jQuery("#logout").click(function(){
		localStorage.removeItem("logged_user");
		window.location.replace('index.html');
	});

	// Button new listener
	jQuery("#btn-new").click(function(){
		window.location.replace("agregar-invoice.html");
	});	
});	