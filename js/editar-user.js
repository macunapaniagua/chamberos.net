jQuery(document).ready(function(){function e(e){var r=JSON.parse(localStorage.getItem("users"));for(i=0;i<r.length;i++)if(r[i].username===e)return r.splice(i,1),void localStorage.setItem("users",JSON.stringify(r))}function r(e){var r=JSON.parse(window.localStorage.getItem("users"));r?(r.push(e),window.localStorage.setItem("users",JSON.stringify(r))):window.localStorage.setItem("users",JSON.stringify([e]))}jQuery("#menu-user-name").html("Hi "+localStorage.getItem("logged_user")),function(){for(var e=window.location.search.substr("?id=".length),r=JSON.parse(localStorage.getItem("users")),a=0;a<r.length;a++){var o=r[a];if(o.username===e){jQuery("#Username").val(o.username),jQuery("#full-name").val(o.name),jQuery("#password").val(o.password),jQuery("#repeat-password").val(o.password);break}}}(),jQuery("#logout").click(function(){localStorage.removeItem("logged_user"),window.location.replace("index.html")}),jQuery("#btn-new").click(function(){window.location.replace("agregar-user.html")}),jQuery("#cancel").click(function(){window.location.replace("users.html")});var a=function(e,r,a){this.username=e,this.name=r,this.password=a};jQuery("form").submit(function(o){o.preventDefault();var s=jQuery("#Username").val(),t=jQuery("#full-name").val(),n=jQuery("#password").val(),l=jQuery("#repeat-password").val();if(n===l){var u=new a(s,t,n);e(s),r(u),window.location.replace("users.html?action=updated")}else jQuery("#modal-message").html("The password and confirmation password must be the same"),jQuery("#modal").modal("show")})});