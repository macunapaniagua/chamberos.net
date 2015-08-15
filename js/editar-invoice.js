var invoiceId;

jQuery(document).ready(function() {	
	// Set the logged user name in the header
	jQuery("#menu-user-name").html("Hi " + localStorage.getItem("logged_user"));

	// Autoexecuted function to load the Invoice information when the window is loading
	(function(){
		// Get the id from the querystring
		invoiceId = window.location.search.substr('?id='.length);
		// Get the invoice from the local storage that match with the id and load the data into the fields
		var invoices = JSON.parse(localStorage.getItem('invoices'));
		for (var i = 0; i < invoices.length; i++) {
			var invoice = invoices[i];
			if(invoice.id === invoiceId){				
				jQuery("#clients-list").val(invoice.clientName);
				jQuery("#date").val(invoice.date);
				jQuery("#details").val(invoice.details);
				jQuery("#amount").val(invoice.amount);
				break;
			}
		}		

		// Get the clients to load the client combo box
		// var clients = JSON.parse(localStorage.getItem('clients'));
		// if(!clients || clients.length == 0){
		// 	jQuery("#clients-list").val('').prop('disabled', true);
		// 	jQuery('#save').prop('disabled', true);
		// 	jQuery('#modal').modal('show');
		// } else {
		// 	var datalist = jQuery('#clients');
		// 	for (var i = 0; i < clients.length; i++) {
		// 		datalist.append('<option value="' + clients[i].firstName + ' ' + clients[i].lastName + '"/>');
		// 	}
		// }
	})();
	
	// Logout action
	jQuery("#logout").click(function(){
		localStorage.removeItem("logged_user");
		window.location.replace('index.html');
	});

	// Button new listener
	jQuery("#btn-new").click(function(){
		window.location.replace("agregar-invoice.html");
	});

	// Button cancel listener
	jQuery("#cancel").click(function(){
		window.location.replace("invoices.html");
	});

	// Object Invoice 
	var Invoice = function(id, clientName, date, details, amount){
		this.id = id;
		this.clientName = clientName;
		this.date = date;
		this.details = details;
		this.amount = amount;
	};
	
	// Submit Form action
	jQuery("form").submit(function(event){
		// Prevent the default submit
		event.preventDefault();
		// Get the entered data and create a new Invoice object
		var clientName = jQuery("#clients-list").val();
		var date = jQuery("#date").val();
		var details = jQuery("#details").val();
		var amount = jQuery("#amount").val();
		var invoice = new Invoice(invoiceId, clientName, date, details, amount);
		// Go to delete the old data for this invoice
		var posToInsert = removeFromLocalStorage();
		saveInvoiceInLocalStorage(invoice, posToInsert);
		window.location.replace("invoices.html?action=updated");
	});

	// Delete a invoice in the local storage
	function removeFromLocalStorage(){
		var invoices = JSON.parse(localStorage.getItem('invoices'));
		for(i = 0; i < invoices.length; i++){
			if(invoices[i].id === invoiceId){				
				invoices.splice(i, 1);
				localStorage.setItem('invoices', JSON.stringify(invoices));
				return i;			
			}
		}
	}

	// Save the new invoice in the local storage
	function saveInvoiceInLocalStorage(invoice, indexToInsert){
		var invoices = JSON.parse(window.localStorage.getItem("invoices"));
		// Check if exist any invoice and save the new one
		if(!invoices){
			window.localStorage.setItem('invoices', JSON.stringify([invoice]));
		}else{
			invoices.splice(indexToInsert, 0, invoice);
			window.localStorage.setItem('invoices', JSON.stringify(invoices));
		}	
	};
});