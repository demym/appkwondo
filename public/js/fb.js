

function fbTest() {
   
    fb_connect();
}

function fb_connect() {


    var permissions = [
        'publish_actions',
        'manage_pages',
        'publish_pages',
        'user_managed_groups',
        'user_events'
    ]
/*
    facebookConnectPlugin.login(permissions,
        function () {
            conslog("success");
        }, function (e) {
            conslog("failure", e);
        })
        */
        	openFB.login(
			function (response) {
				if (response.status === 'connected') {
					conslog('Facebook login succeeded, got access token: ' + response.authResponse.token);

					//$.mobile.changePage("#index");
					//$("#index_fb #errormsg").html("");
					fb_getInfo(function () {
						fbCheckGroup("116270558490682", fb_user, function (b) {
							var whitelist = "holly ozoora";
							var arrwl = whitelist.toLowerCase().split(",");
							$(arrwl).each(function (x) {
								var wl = arrwl[x].trim();
								if (fb_user.name.toLowerCase().indexOf(wl) > -1) b = true;
							})



							if (b) {
								colog("bravo, fai parte del gruppo facebook asd taekwondorozzano");
								//$("#index_fb #errormsg").html("");
								//fbloggedin = true;
								//refreshNews();
								//$.mobile.changePage("#index");
								//autoLogin();
								var msg = {
									device: "browser",
									type: "clientspecs",
									nickname: socketnickname,
									appversion: appversion

								}
								if (isPhone) msg.device = "mobile";

								//if (message) msg=message;

								//socket.send(msg);

								//alert(fb_userid);
							} else {
								var testo = "Non fai attualmente parte del gruppo Facebook ASD Taekwondo Rozzano."
								//$("#index_fb #errormsg").html(testo);
                                conslog(testo);
							}

						})

					});
				} else {
					conslog('Login Facebook fallito: ' + response.error);
					$("#index_fb #errormsg").html("Accesso a Facebook fallito");
				}
			}, { scope: 'publish_actions,manage_pages,publish_pages,user_managed_groups,user_events' });

}

