jQuery(document).ready(function(){function e(e){$(".table tbody").append('<tr><td data-label="Id">'+e.id+'</td><td data-label="Full name">'+e.firstName+" "+e.lastName+'</td><td data-label="Phone">'+e.phone+'</td><td data-label="Actions"><a class="edit-row" href="#"><img src="../images/editar.png"/></a><a class="delete-row" href="#"><img src="../images/eliminar.png"/></a></td></tr>')}function t(e){var t=JSON.parse(localStorage.getItem("clients"));for(i=0;i<t.length;i++)if(t[i].id===e)return t.splice(i,1),localStorage.setItem("clients",JSON.stringify(t)),!0;return!1}!function(){var t=localStorage.getItem("logged_user");jQuery("#menu-user-name").html("Hi "+t),"admin"!==t&&jQuery(".user-item-to-hide").hide();var a=window.location.search.substr("?action=".length);a&&(jQuery("#message-action").html(a),jQuery("#message").show());var l=JSON.parse(window.localStorage.getItem("clients"));if(l&&0!=l.length)for(var r=0;r<l.length;r++)e(l[r])}(),jQuery(".edit-row").click(function(){var e=jQuery(this).closest("tr"),t=e.find("td").eq(0).html(),a="editar-cliente.html?id="+t;window.location.replace(a)}),jQuery(".delete-row").click(function(){var e=jQuery(this).closest("tr"),t=e.find("td").eq(1).html();jQuery("#user-to-delete").html(t),jQuery("#modal-delete").data("row",e).modal("show")}),jQuery("#btnDeleteYes").click(function(){var e=jQuery("#modal-delete").data("row"),a=e.find("td").eq(0).html();t(a)&&e.remove()}),jQuery("#logout").click(function(){localStorage.removeItem("logged_user"),window.location.replace("index.html")}),jQuery("#btn-new").click(function(){window.location.replace("agregar-cliente.html")})});