var chambaId;

jQuery(document).ready(function() {	
	// Set the logged user name in the header
	jQuery("#menu-user-name").html("Hi " + localStorage.getItem("logged_user"));

	// Autoexecuted function to load the User information when the window is loading
	(function(){
		// Get the id from the querystring
		chambaId = window.location.search.substr('?id='.length);
		// Get the chama from the local storage that match with the id and load the data into the fields
		var chambas = JSON.parse(localStorage.getItem('chambas'));
		for (var i = 0; i < chambas.length; i++) {
			var chamba = chambas[i];
			if(chamba.id === chambaId){				
				jQuery("#clients-list").val(chamba.clientName);
				jQuery("#date").val(chamba.date);
				jQuery("#details").val(chamba.details);
				jQuery("#notes").val(chamba.notes);
				break;
			}
		}		

alert('Cambiar funcionamiento del modal')
		// Get the clients to load the client combo box
		var clients = JSON.parse(localStorage.getItem('clients'));
		if(!clients || clients.length == 0){
			jQuery("#clients-list").val('').prop('disabled', true);
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

	// Object Chamba 
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
		var clientName = jQuery("#clients-list").val();
		var date = jQuery("#date").val();
		var details = jQuery("#details").val();
		var notes = jQuery("#notes").val();
		var chamba = new Chamba(chambaId, clientName, date, details, notes);
		// Go to delete the old data for this chamba
		var posToInsert = removeFromLocalStorage();
		saveChambaInLocalStorage(chamba, posToInsert);
		window.location.replace("chambas.html?action=updated");
	});

	// Delete a chamba in the local storage
	function removeFromLocalStorage(){
		var chambas = JSON.parse(localStorage.getItem('chambas'));
		for(i = 0; i < chambas.length; i++){
			if(chambas[i].id === chambaId){				
				chambas.splice(i, 1);
				localStorage.setItem('chambas', JSON.stringify(chambas));
				return i;			
			}
		}
	}

	// Save the new chamba in the local storage
	function saveChambaInLocalStorage(chamba, indexToInsert){
		var chambas = JSON.parse(window.localStorage.getItem("chambas"));
		// Check if exist any chamba and save the new one
		if(!chambas){
			window.localStorage.setItem('chambas', JSON.stringify([chamba]));
		}else{
			chambas.splice(indexToInsert, 0, chamba);
			window.localStorage.setItem('chambas', JSON.stringify(chambas));
		}	
	};
});