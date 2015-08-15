jQuery(document).ready(function() {

	// Autoexecuted function when the  window is loading
	(function(){
		// Load the logged user name into the header option 
		jQuery("#menu-user-name").html("Hi " + localStorage.getItem("logged_user"));
		
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
		window.location.replace("agregar-chamba.html");
	});

	// Button cancel listener
	jQuery("#cancel").click(function(){
		window.location.replace("chambas.html");
	});

	// Object Client 
	var Chamba = function(id, clientName, date, details, notes){
		this.id = id;
		this.clientName = clientName;
		this.date = date;
		this.details = details;
		this.notes = notes;
	};
	
	// Submit Form action
	jQuery("form").submit(function(event){
		// Prevent the default submit
		event.preventDefault();
		// Get the entered data and create a new chamba object
		var id = generateChambaId();
		var client = jQuery("#clients-list").val();
		var date = jQuery("#date").val();
		var details = jQuery("#details").val();
		var notes = jQuery("#notes").val();
		var chamba = new Chamba(id, client, date, details, notes);
		saveChambaInLocalStorage(chamba);
		window.location.replace("chambas.html?action=added");		
	});

	// Generate the id for the new chamba
	function generateChambaId(){
		var chambas = JSON.parse(window.localStorage.getItem("chambas"));
		// Check if exist any chamba and save the new one
		if(!chambas){
			return '2100';
		}else{

			return (parseInt(chambas[chambas.length-1].id) + 1).toString();
		}
	};

	// Save the new chamba in the local storage
	function saveChambaInLocalStorage(chamba){
		var chambas = JSON.parse(window.localStorage.getItem("chambas"));
		// Check if exist any chamba and save the new one
		if(!chambas){
			window.localStorage.setItem('chambas', JSON.stringify([chamba]));
		}else{
			chambas.push(chamba);
			window.localStorage.setItem('chambas', JSON.stringify(chambas));
		}	
	};
});