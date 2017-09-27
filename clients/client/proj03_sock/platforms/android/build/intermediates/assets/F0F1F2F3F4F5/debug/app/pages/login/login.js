//var vmModule = require("./main-view-model");
var application = require("application");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var activityIndicatorModule = require("ui/activity-indicator");
var http = require("http");
var appSettings = require("application-settings");
var orientationModule = require("nativescript-screen-orientation");

var socket = require("../../shared/socket");
var backend = require("../../shared/backend");
var utils = require("../../shared/utils");
var file = require("../../shared/file");
var glbservice = require("../../shared/globalservice");

var frameModule = require("ui/frame");



var u, p;
var ai;
var page;
var gs = glbservice.GlobalService;



function pageLoaded(args) {

	 orientationModule.setCurrentOrientation("portrait",function(){
                console.log("portrait orientation set");
            });

	

	//registerPush();
	page = args.object;
	u = page.getViewById("username");
	p = page.getViewById("password");
	ai = page.getViewById("ai");
	ai.visibility = "collapsed";

}


function loginTap() {

	var bl = page.getViewById("bloccus");
	bl.visibility = "collapsed";
	ai.visibility = "visible";
	ai.busy = true;

	backend.blueLogin(u.text, p.text, function (ldata) {

		console.log(JSON.stringify(ldata));

		if (ldata.loggedin) {

			if (String(ldata.loggedin) == "true") {

				global.user = {
					nickname: u.text,
					role: ldata.role
				}

				global.nickname = global.user.nickname;

				initApp(function () {
					//setAI(false);






					frameModule.topmost().navigate("pages/homepage/homepage");

				})

				//frameModule.topmost().navigate("pages/homepage/homepage");

			} else {

				alert("Dati di accesso non validi");
			}

		}

	})

}

function loginTapOld() {

	//alert(u.text+"-"+p.text);
	global.user = {
		nickname: "Demykwondroid",
		role: "tkdradmin"
	}

	global.nickname = global.user.nickname;
	//frameModule.topmost().navigate("homepage");

	doLogin();
}


function doLogin() {
	console.log("dologin");

	//var authorization = "Basic " + window.btoa(email + ":" + psw);
	var auth = new java.lang.String(u.text + ":" + p.text);
	var auth_encoded = "Basic " + android.util.Base64.encodeToString(auth.getBytes(), android.util.Base64.DEFAULT);

	var user = {
		"email": u.text,
		"password": p.text,
		"authorization": auth_encoded
	}

	console.log(JSON.stringify(user));

	var url = global.rooturl + "/atleti/login";
	//url=url.replace("http://","");
	console.log(url);

	/*fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user)
	}).then(r => { return r.json(); }).then(function (r) {
		// console.log(result);
		console.log(r);
	}, function (e) {
			console.log("Error occurred " + e);
		});*/





	http.request({
		url: url,
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		content: JSON.stringify(user)
	}).then(function (response) {
		result = response.content.toJSON();
		console.log(JSON.stringify(result));

		if (result.loggedin) {

			if (String(result.loggedin) == "true") {

				global.user = {
					nickname: user.email,
					role: result.role
				}

				global.nickname = global.user.nickname;

				initApp(function () {
					//setAI(false);



					frameModule.topmost().navigate("pages/homepage/homepage");





				})



			} else {

				alert("Dati di accesso non validi");
			}

		}

	}, function (e) {
		console.log("Error occurred " + e);
	});

}



initApp = function (callback) {

	utils.colog("initapp");
	socket.connect();


	backend.getAtleti(function (data) {

		utils.colog("getatleti done", data.length);
		file.writeJsonFile("atleti.json", data, function (fdata) {
			utils.colog(JSON.stringify(fdata));
			backend.getGare(function (gdata) {

				utils.colog("getgare done", gdata.length);
				file.writeJsonFile("gare.json", gdata, function (ffdata) {


					utils.colog(JSON.stringify(ffdata));

					var garefilter = utils.filterRows(gdata, {
						stato: "incorso"
					});
					if (garefilter.rows.length > 0) {
						var garaincorsoid = garefilter.rows[0].doc.id;
						utils.colog("garaincorso", garaincorsoid);
						backend.syncGara(garaincorsoid, function (sgdata) {
							utils.colog(JSON.stringify(sgdata));
						})
					}
					backend.fetchChat(function (cdata) {

						var lastchattimestamp = appSettings.getString("lastchattimestamp", "");
						console.log("lastchattimestamp", lastchattimestamp);
						console.log("cdata",cdata.rows.length);
						cdata.rows.forEach(function (item, index) {
							if (item.time > lastchattimestamp) {
								//console.log("pushing");
								gs.unreadchat.push(item);
								//console.log("pushed");
							}
						})
						console.log("unreadchat", gs.unreadchat.length);
						
						if (callback) callback();




					})






					

				})

			});

		})

	});




}

exports.pageLoaded = pageLoaded;
exports.loginTap = loginTap;