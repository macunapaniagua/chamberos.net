var adminUsername="admin";jQuery(document).ready(function(){!function(){var e=localStorage.getItem("logged_user");jQuery("#menu-user-name").html("Hi "+e),jQuery("#welcome").html("Welcome "+e),e!==adminUsername&&jQuery(".user-item-to-hide").hide(),jQuery("#logout").click(function(){localStorage.removeItem("logged_user"),window.location.replace("index.html")})}()});