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
		
		// Get the clients to load the client combo box
		var clients = JSON.parse(localStorage.getItem('clients'));
		if(!clients || clients.length == 0){
			jQuery('#save').prop('disabled', true);
			jQuery('#modal').modal('show');
		} else {
			var datalist = jQuery('#clients');
			for (var i = 0; i < clients.length; i++) {
				datalist.append('<option value="' + clients[i].firstName + ' ' + clients[i].lastName + '"/>');
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
		var id = generateInvoiceId();
		var client = jQuery("#clients-list").val();
		var date = jQuery("#date").val();
		var details = jQuery("#details").val();
		var amount = jQuery("#amount").val();
		var invoice = new Invoice(id, client, date, details, amount);
		saveInvoiceInLocalStorage(invoice);
		window.location.replace("invoices.html?action=added");		
	});

	// Generate the id for the new Invoice
	function generateInvoiceId(){
		var invoices = JSON.parse(window.localStorage.getItem("invoices"));
		// Check if exist any invoice and save the new one
		if(!invoices){
			return '3100';
		}else{
			return (parseInt(invoices[invoices.length-1].id) + 1).toString();
		}
	};

	// Save the new invoice in the local storage
	function saveInvoiceInLocalStorage(invoice){
		var invoices = JSON.parse(window.localStorage.getItem("invoices"));
		// Check if exist any invoice and save the new one
		if(!invoices){
			window.localStorage.setItem('invoices', JSON.stringify([invoice]));
		}else{
			invoices.push(invoice);
			window.localStorage.setItem('invoices', JSON.stringify(invoices));
		}	
	};
});