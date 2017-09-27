var pictureSource; // picture source
var destinationType; // sets the format of returned value
var scheda={};
var loggedin=false;
var fbloggedin=false;

var facebookcheck=true;
var debugActive=true;

var settings=null;


//var cordovaApp=true;

var rooturl="http://localhost:3000";
//var rooturl="http://192.168.0.106:3000";
//var rooturl="http://192.168.0.101:3000";
//var rooturl="http://192.168.1.5:3000";
//var rooturl="http://demywl.mybluemix.net";
//var rooturl="http://62.101.111.160:3000";
//var rooturl="http://appkwondo.mybluemix.net";
//var rooturl="http://tkdr.herokuapp.com";


var socketnickname="";
//var socket = new io.Socket();


var socket;

var isPhone=false;
var boname="scheda";
var bonames="Schede";
var parm_garaid="";
var cattxt="Categoria: ";
var showMsg=null;
var garaid="";
var jGara={};
var $gara={};
var $gare={};
var jcurrentgara={};
var activeTab=0;
var $atleti={};
var delmatchid="";
  var prevSelection = "tab1";
  var $matches;
  var $allmatches={};
  var cat="";
  var selectedAtl={};
  var selectedid="";
  var cookieDays=3;
  var storage;
  var cronaca={ rows:[]};
  var autorefresh=false;
  	 var timerMatches=20000;
	 var mf={}
	 var iscrittiincat=[];
	 var viewcat="";
	 
	 var fb_userid="";  
	 var fb_user={
		 
	 };

    
	 
	 function colog(txt) {
		 if (!debugActive) return;
		 console.log(txt);
		 
	 }
	 
	 function toggleLeftMenu(){
		 var pageid=$.mobile.activePage.attr('id');
		var l=$( "#"+pageid+" #menuPanel").length;
		
		if (l>0){
			 $("#"+pageid+" #menuPanel").remove();
		}
		
		
		  var data={
		  loggedin: loggedin
		  }
		  var html= new EJS({url: 'tpl/menupanel.ejs'}).render(data); 
          $("#"+pageid).append(html);
		  $("#"+pageid+" #menuPanel").panel();
		  
			
		
		$( "#"+pageid+" #menuPanel" ).panel("toggle");
		
		 
	 }
	 
	 
	 var autorefreshcount=0;
	function setMatchesRefresh()
	 {
	  if (autorefresh) {
	  autorefreshcount++;
      console.log("running ")	  
	  if (autorefreshcount==1) setInterval(function () {refreshMatches();}, timerMatches);
	  }
	 }
	 
	 
	  function cancelDelMatch()
 {
  $("#matchesatleta #popDelMatch").popup("close");
 }

var app = {
    initialize: function() {
		colog("app.initialize")
        this.bind();
    },
	
	onCameraSuccess: function(mediaFiles) {
  
       toast("Photo acquired",'long'); 
	
	   var i, path, len;
       for (i = 0, len = mediaFiles.length; i < len; i += 1) {
         path = mediaFiles[i].fullPath;
        // do something interesting with the file
		 $("#fotoAnteprima").attr("src", path).css({width: "128px", height: "128px"});
       }
	
   
  
    },
	
	onCameraError: function(errorMessage) {
  
     //navigator.notification.alert(errorMessage, function() {}, "Errore");
	 toast("Error acquiring photo: "+errorMessage,'long'); 
  
   },
	
	onMenuButton: function() {
		
		toggleLeftMenu();
		return;
		//navigator.notification.alert("MenuButton pressed!",function() {}, "Informazione");
		var pageid=$.mobile.activePage.attr('id');
		var l=$( "#"+pageid+" #menuPanel").length;
		
		if (l>0){
			 $("#"+pageid+" #menuPanel").remove();
		}
		
		
		  var data={
		  loggedin: loggedin
		  }
		  var html= new EJS({url: 'tpl/menupanel.ejs'}).render(data); 
          $("#"+pageid).append(html);
		  $("#"+pageid+" #menuPanel").panel();
		  
			
		
		$( "#"+pageid+" #menuPanel" ).panel("toggle");
		
		
		
	},
	
	onBackButton: function() {
		//navigator.notification.alert("MenuButton pressed!",function() {}, "Informazione");
		var pageid=$.mobile.activePage.attr('id');
		$("#"+pageid+" #btnBack").trigger("click");
		
	},
	
	online: function() {
         
        $("#btnInviaSchede").removeClass("ui-disabled");
    },
     
    offline: function() {
         
        $("#btnInviaSchede").addClass("ui-disabled");
    },
     
	isOnline: function() {
         
        var networkState = navigator.connection.type;
		toast(networkState,'short')
         
        return ((networkState != Connection.NONE) && (networkState != Connection.UNKNOWN));
    }, 
	 
    bind: function() {
		colog("app.bind")
	     document.addEventListener('deviceready', this.deviceready, false);
	
		 
		 
    },
     
    deviceready: function() {
		colog("deviceready !");
		document.addEventListener("online", app.online, false);
        document.addEventListener("offline", app.offline, false);
	    document.addEventListener("menubutton", app.onMenuButton, false);
		document.addEventListener("backbutton", app.onBackButton, false);
		
		storage=window.localStorage;
        //var pushNotification = window.plugins.pushNotification;
		//colog("registering for push")
		//pushNotification.unregister(pushSuccessHandler, pushErrorHandler);;
        //pushNotification.register(pushSuccessHandler, pushErrorHandler,{"senderID":"866111544630","ecb":"onNotificationGCM"});
	
	    /*window.GcmPushPlugin.register(pushSuccessHandler, pushErrorHandler, {
               "senderId":"866111544630",
               "jsCallback":"onNotification"
		});*/ 
	     
	    /*var push = PushNotification.init({ "android": {"senderID": "866111544630"},
         "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } ); 
		 
		colog("launched push registration") 
		push.on('registration', function(data) {
          colog("registered with GCM:")
		  colog(data)
    });
	push.on('error', function(e) {
        colog("error in GCM")
		colog(e)
    });*/

	 
	   
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
		
		colog("Navigator user agent from deviceready: "+navigator.userAgent)
		if (navigator.userAgent.indexOf("Android") != -1) {
             $.mobile.defaultPageTransition = 'none';
             $.mobile.defaultDialogTransition = 'none';
             $.mobile.buttonMarkup.hoverDelay = 0
         }
		 
		 if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
     isPhone=true;
} else {
    isPhone=false;
}
		
		docready();
		 

	 
	
        
        app.start();
    },
	
	
	
    start: function() {
     
        //...
    },
	
	exit: function() {
 
        navigator.notification.confirm(
          "Vuoi veramente chiudere AppKwonDo ?",
            function(buttonIndex) {
                 
                if (buttonIndex == 1) navigator.app.exitApp();
            },
            "Informazione",
            "Sì,No");
    },
	
	storage: window.localStorage,
     
    initialize: function() {
        this.bind();
    },
	
	loadAllSchede: function(callback){
		 $.ajax({
            url: rooturl+"/atleti/findall",
            type: "GET"})
         .done(function(data) {
			 //alert(JSON.stringify(data));
			 $atleti=data;
			 callback(data);
		 });
			// navigator.notification
		
	},
		loadAllGare: function(callback){
		 $.ajax({
            url: rooturl+"/gare/findall",
            type: "GET"})
         .done(function(data) {
			 //alert(JSON.stringify(data));
			 callback(data);
		 });
			// navigator.notification
		
	},
};
 
function isCordovaApp() {
	 var retvalue=false;
	 colog("isCordovaApp URL:"+document.URL);
	 if (document.URL.indexOf('http://') === -1
  && document.URL.indexOf('https://') === -1) retvalue=true;
  
   if ((retvalue==true) && !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) retvalue=false;
   
   return retvalue;
	 
 } 
 function initApp() {
	 
	   app.initialize();
	colog("Navigator user agent from docready "+navigator.userAgent);
	var ica=isCordovaApp();
	colog("isCordovaApp: "+ica);
	//if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
		if (ica) {
     isPhone=true;
} else {
    isPhone=false;
}
   colog("Running on phone: "+isPhone);
	
   if (!isPhone) docready();
	 
	 
 }
 
 
$(document).ready(function() {
   initApp();
	
});

function playSound(filename){   
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
}

function snotify(msg){
    
	colog("Snotify:")
	colog(msg);
   if (settings.notifiche==false){
	  colog("notifiche non attive nei settings, esco senza notificare") 
	   return;
	   
   }	
	
	var wnot={
		body: msg.text,
		icon: "img/logotkdrozzano.png"
	}
	
		
	if (isPhone){
	 
		notify(msg.text)
		 var html= new EJS({url: 'tpl/popnotification.ejs'}).render(wnot); 
			var pageid=$.mobile.activePage.attr('id');
			colog("current pageid: "+pageid)
			//alert(html);
	        $("#"+pageid+" div[data-role=content]").append(html);
            $("#"+pageid+" #popNotification").popup();
			$("#"+pageid+" #popNotification").popup("open");
			playSound("img/chimes")
	        setTimeout(function(){ 
			 $("#"+pageid+" #popNotification").popup("close").remove();
			 
			}, 6000);   
	 
	} else {
		
	        var html= new EJS({url: 'tpl/popnotification.ejs'}).render(wnot); 
			var pageid=$.mobile.activePage.attr('id');
			colog("current pageid: "+pageid)
			//alert(html);
	        $("#"+pageid+" div[data-role=content]").append(html);
            $("#"+pageid+" #popNotification").popup();
			$("#"+pageid+" #popNotification").popup("open");
			playSound("img/chimes")
	        setTimeout(function(){ 
			 $("#"+pageid+" #popNotification").popup("close").remove();
			 
			}, 6000);   
            
                        
      	  
		
		
	if (!("Notification" in window)) {
           colog("This browser does not support system notifications");
        }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
	colog("notification are granted")
    var notification = new Notification("AppKwonDo",wnot);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
	  colog("asking grant for notifications")
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("AppKwonDo",wnot);
      }
    });
  }
	}
	
}



function docready()
{
	  $("a").addClass("fastClick");
	  
	  $("#popResult .incbutton").on("click", function() {
		  var r=$("#popResult #risult").val();
		  if (r.trim()=="") r="0-0";
		  var id=$(this).attr("id");
		  var r1=parseInt(r.split("-")[0].trim(),10);
		  var r2=parseInt(r.split("-")[1].trim(),10);
		  
		  colog("r1: "+r1);
		  colog("r2: "+r2);
		  
		  var index=id.substring(id.length-1);
		  var oper=id.substring(0,id.length-1);
		 
		  colog(index+" - "+oper);
		  
		  if (oper=="plus"){
			 if (index==1) r1++;
			  if (index==2) r2++;
		  }
		  if (oper=="minus"){
			   if (index==1) r1--;
			  if (index==2) r2--;
			  
			  if (r1<0) r1=0;
			  if (r2<0) r2=0;
		  }
		  
		  var rf=r1+"-"+r2;
		  
		  //if (id=="plus1") oper="plus";
		  $("#popResult #risult").val(rf);
		  
	  });
	  
	 /*
	  $("#popResult #resultform .inctext").after('<div class="inc incbutton">+</div><div class="dec incbutton">-</div>');
	  
	  $("#popResult .inctext").css("width", "75px !important;").css("border","1px solid yellow");
	  var parent=$("#popResult .inctext").closest("div");
	  //alert($(parent).html());
	  parent.css("width", "75px !important;").css("border","1px solid green");
	$(".incbutton").on("click", function() {

  var $button = $(this);
  var oldValue = $button.parent().find("input").val();

  if ($button.text() == "+") {
	  var newVal = parseFloat(oldValue) + 1;
	} else {
   // Don't allow decrementing below zero
    if (oldValue > 0) {
      var newVal = parseFloat(oldValue) - 1;
    } else {
      newVal = 0;
    }
  }

  $button.parent().find("input").val(newVal);

});*/
	  
	  
	  //var srv=getCookie("server");
	  //if (srv) rooturl=srv;
	  loadOptions();
	  $(".serverspan").html("Connesso al server: "+rooturl.replace("http://","").replace("https://",""));
	  var lurl=window.location.href;
	  lurl="";
	  // Defaults to sessionStorage for storing the Facebook token
      //openFB.init({appId: '924594024295731'});

      //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
      openFB.init({appId: '924594024295731', tokenStore: window.localStorage});

	  
	  colog("docready !");
	  colog("url: "+lurl)
	  //var arr=lurl.toLowerCase().split("indexa.html");
	  /*
	  if (lurl.indexOf("#")>-1) {
		  window.location.href="index.html";
		  //app.initialize();
		  return;
		  
	  }*/
	  jQuery.support.cors = true;
	    storage=window.localStorage;
     
	  socket = io.connect(rooturl);
	  colog("socket connected to socket server");
	 
	  
	  
	  $.ajaxSetup({ cache: false });
	  /*
	  $("#scheda h3").html(boname);
	  $("#homePage h3").html(bonames.toUpperCase());
	  $("#elencoSchede h3").html(bonames.toUpperCase());
	  */
	  $.event.special.tap.emitTapOnTaphold = false;
	   FastClick.attach(document.body);
		 
	  //socket.connect(rooturl); 
	  
	  socket.on('sysmsg',function(data){
		  
		  snotify(data);
		  
		  
	  });
	  
	  socket.on('refreshsockets',function(data){
		  console.log("refreshsockets");
		  showSockets();
		  
		  
	  })
	  
	   socket.on('getnickname',function(data){
		  console.log("getnickname: "+data.sockid);
		  setCookie("socketid",data.sockid);
		  
		  
	  })
	  
	  socket.on('notification', function (data) {
		colog("received notification from socket.io server:")
		colog(data);	
	    
		snotify(data);
		
		if (data.updategara){
			if (data.updategara=="yes"){
				
				
				var pageid=$.mobile.activePage.attr('id');
		if (jcurrentgara){
			if (jcurrentgara.id==data.garaid){
				refreshCurrentGara();
			}
			
		}
				
			}
			
			
		}
		
		

		
		//console.log(data.message);
	  }); 
	  
	  socket.on('connect',function() {
      colog('Client has connected to the server!');
    });
    // Add a connect listener
    socket.on('message',function(data) {
     colog('Received a message from the server!');
	 colog(data);
    });
    // Add a disconnect listener
    socket.on('disconnect',function() {
      colog('The client has disconnected!');
    });

		 
		 
	$("#optionsPage #server").val(rooturl); 
		 
		 $('#matchesatleta #dialogForAtleta').popup();
		   $("#gara #popResult").popup();
	  $("#gara #popDelMatch").popup();
	   $("#gara #popAddMatch").popup();
	//   	$("#gara #dialogCategorie").popup();
	// $('#gara #dialogForAtleta').popup();
	  
	  //	$( "#index #menuPanel" ).panel();
		$( "#page_atleti #atleti_categorie" ).panel();
	

         	  bindGaraPage();

		
		 
	  //EVENTS

		
	
	 $("#menuExit").on("tap", function(event) {
		 exitapp();
		 
		 
	 });
	 
	 
			 
		
	refreshAtletiServer();	
	refreshGareServer();
	//autoLogin();
	
  $(document).on('pagebeforeshow', function(event) {
	  colog("pagebeforeshow");
	  colog("fbloggedin "+fbloggedin);
	  //alert(fbloggedin)
		if (!fbloggedin) window.location.href="index.html";
		return; 
	/* colog("pagebeforecreate")
	var data={} ;
	var apage=event.target.id;
	var pl=$("#"+apage+" #menuPanel").length;

	if (pl==0)
	{	
     colog("creatin panel for page "+apage)
     var panel= new EJS({url: 'tpl/menupanel.ejs'}).render(data); 
     $("#"+apage).append(panel);
	 $("#"+apage+" #menuPanel").panel();
    }*/	 

 });
 
 $(document).on('pageshow', function(event) {
		colog("pageshow")
		colog("fbloggedin "+fbloggedin);
		//alert(fbloggedin)
		if (!fbloggedin) window.location.href="index.html";
		return; 
		 
		 var lurl=window.location.href;
	
	  colog("url: "+lurl)
	  //var arr=lurl.toLowerCase().split("indexa.html");
	  if (lurl.indexOf("#")>-1) {
		  window.location.href="index.html";
		  //app.initialize();
		  return;
		  
	  }
	});

	
	/*
	var mode=getQueryString("mode");
	colog(mode);
	*/
}

function exitapp()
{
 app.exit();	
}



var scheda = {
 
    send: function() {
         
        navigator.notification.confirm("Confermi l'invio delle schede?",
                                       scheda.confirmedSend,
                                       "Conferma invio",
                                       "Sì,No");
    },
	
	save: function(schd,success,fail) {
		
		//alert("scheda save");
         
        if (scheda.data.nome != "") {
			
			
			
			/*delete scheda.data._id;
			delete scheda.data._rev;*/
			
		//	 scheda.data.coordinate = position.coords;
        //alert(JSON.stringify(scheda.data));
        app.storage.setItem( scheda.data.nome, JSON.stringify(scheda.data));
		//refreshSchede();
		/*
		 navigator.geolocation.getCurrentPosition(
                    scheda.onPositionSuccess,
					
					
                    scheda.onPositionError, 
                    {maximumAge: 5000, timeout: 5000, enableHighAccuracy: true});
		
		*/
		var func="addScheda";
		if (scheda.data._id) func="updScheda";
		
		colog("posting "+JSON.stringify(scheda.data));
		   $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/schede/"+func,
            type: "POST",
            data: scheda.data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			 fail();	
			}	else {
				
				app.storage.clear(); 
			 //navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
			// navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
			colog("save result: "+JSON.stringify(data));
			//refreshSchedeServer();
			success();
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
		
         
		
           
       
        }
    },
  
    onPositionSuccess: function(position) {
         
        scheda.data.coordinate = position.coords;
        toast(JSON.stringify(scheda.data),"short");
        app.storage.setItem( scheda.data.nome, JSON.stringify(scheda.data));
		refreshSchedeServer();
    },
  
    onPositionError: function(error) {
  
        var messaggio = "";
  
        switch (error.code) {
         
            case PositionError.PERMISSION_DENIED:
                messaggio = "L'applicazione non è autorizzata all'acquisizione della posizione corrente";
                break;
             
            case PositionError.POSITION_UNAVAILABLE:
                messaggio = "Non è disponibile la rilevazione della posizione corrente";
                break;
             
            case PositionError.TIMEOUT:
                messaggio = "Non è stato possibile rilevare la posizione corrente";
                break;
        }
         
        toast(messaggio,"long");
    },
	
	
	
	load: function(nome) {
     
        if (nome != "") {
             
			 
			 
            var value = app.storage.getItem($.trim(nome));
            scheda.data = JSON.parse(value);
        }
    },
	
	loadById: function(id,callback) {
		 delete scheda.data._id;
		 delete scheda.data._rev;
		 $.ajax({
            url: rooturl+"/schede/findById/"+id,
            type: "GET"})
         .done(function(data) {
			 colog("loadbyid "+id+": "+JSON.stringify(data));
			 scheda.data=data;
			 callback(scheda);
		 });
		
		
	},
	
	remove: function(id,rev) {
		
		debugga(id+" "+rev);
     
        if (id != "") {
            //app.storage.removeItem($.trim(nome));
			$.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/schede/delScheda",
            type: "POST",
            //data: {id: scheda.data._id, rev: scheda.data._rev 
			data: {id: id, rev: rev }
			})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			app.storage.clear(); 
			// navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
			//alerta(JSON.stringify(data));
			refreshSchedeServer();
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
        }
    },
	
	send: function(listaSchede, successCallback, failCallback) {
  
        $.ajax({
            url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
            type: "POST",
            data: listaSchede})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert(data);
			app.storage.clear(); 
			successCallback();})
        .fail(failCallback);
    },
	
	
	
	data: {nome: "", indirizzo: "", descrizione: "", prezzo: "0,00",  coordinate: {}, photoURI: "", barcode: ""}
}	



var gara = {
 
    send: function() {
         
        navigator.notification.confirm("Confermi l'invio delle schede?",
                                       scheda.confirmedSend,
                                       "Conferma invio",
                                       "Sì,No");
    },
	
	save: function(schd,success,fail) {
		
		//alert("scheda save");
         
        if (scheda.data.nome != "") {
			
			
			
			/*delete scheda.data._id;
			delete scheda.data._rev;*/
			
		//	 scheda.data.coordinate = position.coords;
        //alert(JSON.stringify(scheda.data));
        app.storage.setItem( scheda.data.nome, JSON.stringify(scheda.data));
		//refreshSchede();
		/*
		 navigator.geolocation.getCurrentPosition(
                    scheda.onPositionSuccess,
					
					
                    scheda.onPositionError, 
                    {maximumAge: 5000, timeout: 5000, enableHighAccuracy: true});
		
		*/
		var func="addScheda";
		if (scheda.data._id) func="updScheda";
		
		colog("posting "+JSON.stringify(scheda.data));
		   $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/schede/"+func,
            type: "POST",
            data: scheda.data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			 fail();	
			}	else {
				
				app.storage.clear(); 
			 //navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
			// navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
			colog("save result: "+JSON.stringify(data));
			//refreshSchedeServer();
			success();
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
		
         
		
           
       
        }
    },
  
    onPositionSuccess: function(position) {
         
        scheda.data.coordinate = position.coords;
        toast(JSON.stringify(scheda.data),"short");
        app.storage.setItem( scheda.data.nome, JSON.stringify(scheda.data));
		refreshSchedeServer();
    },
  
    onPositionError: function(error) {
  
        var messaggio = "";
  
        switch (error.code) {
         
            case PositionError.PERMISSION_DENIED:
                messaggio = "L'applicazione non è autorizzata all'acquisizione della posizione corrente";
                break;
             
            case PositionError.POSITION_UNAVAILABLE:
                messaggio = "Non è disponibile la rilevazione della posizione corrente";
                break;
             
            case PositionError.TIMEOUT:
                messaggio = "Non è stato possibile rilevare la posizione corrente";
                break;
        }
         
        toast(messaggio,"long");
    },
	
	
	
	load: function(nome) {
     
        if (nome != "") {
             
			 
			 
            var value = app.storage.getItem($.trim(nome));
            scheda.data = JSON.parse(value);
        }
    },
	
	loadById: function(id,callback) {
		 delete scheda.data._id;
		 delete scheda.data._rev;
		 $.ajax({
            url: rooturl+"/gare/findById/"+id,
            type: "GET"})
         .done(function(data) {
			 $gara=data.rows[0];
			 jcurrentgara=$gara.doc;
			 colog("jcurrentgara: "+JSON.stringify(jcurrentgara))
			var $jgara={
				rows: []
			}; 
			
		
			 
			 colog("loadbyid "+id+": "+JSON.stringify(data));
			 
			 scheda.data=data;
			 callback(scheda);
		 });
		
		
	},
	
	remove: function(id,rev) {
		
		debugga(id+" "+rev);
     
        if (id != "") {
            //app.storage.removeItem($.trim(nome));
			$.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/schede/delScheda",
            type: "POST",
            //data: {id: scheda.data._id, rev: scheda.data._rev 
			data: {id: id, rev: rev }
			})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			app.storage.clear(); 
			// navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
			//alerta(JSON.stringify(data));
			refreshSchedeServer();
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
        }
    },
	
	send: function(listaSchede, successCallback, failCallback) {
  
        $.ajax({
            url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
            type: "POST",
            data: listaSchede})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert(data);
			app.storage.clear(); 
			successCallback();})
        .fail(failCallback);
    },
	
	
	
	data: {nome: "", indirizzo: "", descrizione: "", prezzo: "0,00",  coordinate: {}, photoURI: "", barcode: ""}
}	


var atleta = {
 
    send: function() {
         
        navigator.notification.confirm("Confermi l'invio delle schede?",
                                       scheda.confirmedSend,
                                       "Conferma invio",
                                       "Sì,No");
    },
	
	save: function(schd,success,fail) {
		
		//alert("scheda save");
         
        if (scheda.data.nome != "") {
			
			
			
			/*delete scheda.data._id;
			delete scheda.data._rev;*/
			
		//	 scheda.data.coordinate = position.coords;
        //alert(JSON.stringify(scheda.data));
        app.storage.setItem( scheda.data.nome, JSON.stringify(scheda.data));
		//refreshSchede();
		/*
		 navigator.geolocation.getCurrentPosition(
                    scheda.onPositionSuccess,
					
					
                    scheda.onPositionError, 
                    {maximumAge: 5000, timeout: 5000, enableHighAccuracy: true});
		
		*/
		var func="addScheda";
		if (scheda.data._id) func="updScheda";
		
		colog("posting "+JSON.stringify(scheda.data));
		   $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/schede/"+func,
            type: "POST",
            data: scheda.data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			 fail();	
			}	else {
				
				app.storage.clear(); 
			 //navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
			// navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
			colog("save result: "+JSON.stringify(data));
			//refreshSchedeServer();
			success();
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
		
         
		
           
       
        }
    },
  
    onPositionSuccess: function(position) {
         
        scheda.data.coordinate = position.coords;
        toast(JSON.stringify(scheda.data),"short");
        app.storage.setItem( scheda.data.nome, JSON.stringify(scheda.data));
		refreshSchedeServer();
    },
  
    onPositionError: function(error) {
  
        var messaggio = "";
  
        switch (error.code) {
         
            case PositionError.PERMISSION_DENIED:
                messaggio = "L'applicazione non è autorizzata all'acquisizione della posizione corrente";
                break;
             
            case PositionError.POSITION_UNAVAILABLE:
                messaggio = "Non è disponibile la rilevazione della posizione corrente";
                break;
             
            case PositionError.TIMEOUT:
                messaggio = "Non è stato possibile rilevare la posizione corrente";
                break;
        }
         
        toast(messaggio,"long");
    },
	
	
	
	load: function(nome) {
     
        if (nome != "") {
             
			 
			 
            var value = app.storage.getItem($.trim(nome));
            scheda.data = JSON.parse(value);
        }
    },
	
	loadById: function(id,callback) {
		 delete scheda.data._id;
		 delete scheda.data._rev;
		 $.ajax({
            url: rooturl+"/atleti/findById/"+id,
            type: "GET"})
         .done(function(data) {
			 colog("loadbyid "+id+": "+JSON.stringify(data));
			 scheda.data=data;
			 callback(scheda);
		 });
		
		
	},
	
	remove: function(id,rev) {
		
		debugga(id+" "+rev);
     
        if (id != "") {
            //app.storage.removeItem($.trim(nome));
			$.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/schede/delScheda",
            type: "POST",
            //data: {id: scheda.data._id, rev: scheda.data._rev 
			data: {id: id, rev: rev }
			})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			app.storage.clear(); 
			// navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
			//alerta(JSON.stringify(data));
			refreshSchedeServer();
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
        }
    },
	
	send: function(listaSchede, successCallback, failCallback) {
  
        $.ajax({
            url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
            type: "POST",
            data: listaSchede})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert(data);
			app.storage.clear(); 
			successCallback();})
        .fail(failCallback);
    },
	
	
	
	data: {nome: "", indirizzo: "", descrizione: "", prezzo: "0,00",  coordinate: {}, photoURI: "", barcode: ""}
}	


function refreshGareServer(filtro)
{
	  var pageid=$.mobile.activePage.attr('id');
	  //navigator.notification.activityStart("Caricamento", "loading");
	  //progressStart("Lettura dati");
	  app.loadAllGare(function(data){
		  
		  if (data.error)
		  {
			toast("errore","long");  
			  
		  } else {
		  
		  toast("Gare caricate da "+rooturl);
		  //alert(data);
		  $gare=data;

          var elencoSchede = $("#listagare");
            elencoSchede.html("");
			
			var lih='<li data-role="list-divider" role="heading" data-theme="b">'+data.rows.length+' gare</li>';
			elencoSchede.append(lih);
			
			
			data.rows.sort(function(a,b) {
			  if ((a.doc.data)	&& (b.doc.data))
			  {	  
				var nome1=getNormalD(a.doc.data);
				var nome2=getNormalD(b.doc.data);
				if (nome1>nome2) return -1;
				if (nome1<nome2) return 1;
			  }	
				return 0;
				
			});
			
			if (filtro){
				data=filterRows(data,{
					stato: filtro
					
				},true)  //exact matching
				
			}
			
			var html = new EJS({url: 'tpl/gare.ejs'}).render(data.rows); 
			elencoSchede.empty().append(html);
			progressStop();
			
			//$("#"+pageid+" #recnum span").html(data.rows.length+" gare");
			$("#gare #recnum span").html(data.rows.length+ " gare");
			
			elencoSchede.find("li").on("tap",function() {
				var id=$(this).find("a").attr("id").split("_")[0];
				 colog("requesting id "+id);
				 $("#gara #listabyprog").empty();
				 setCookie("lastcronaca","");
				 $.mobile.changePage("#gara");
				 openGara(id,function(){
					 garaid=id;
					  $gara=data;
					 
				 });
			
                return false;
				
			})
			
			elencoSchede.find("li").on("taphold",function() {
			 if (!loggedin) return;	
				   var id=$(this).find("a").attr("id").split("_")[0];
				   var rev=$(this).find("a").attr("id").split("_")[1];
				   
				  
				   var g=getGaraById(id);
				   colog(g)
				    var d={
						id: id,
						rev: rev,
						doc: g.doc
					};
	                      var html= new EJS({url: 'tpl/popgare.ejs'}).render(d); 
	                      $("#gare div[data-role=content]").append(html);
						  $("#gare #popGare #ulpopgare").listview();
	                      $("#gare #popGare").popup();
	                      $("#gare #popGare").popup("open");
					      return; 
				  
				    gConfirm("Confermi l'eliminazione della gara ?","Conferma eliminazione",function() {
					
					 	 
					
					
					var data={};
						data.id=id;
						data.rev=rev;						
					  
					 $.ajax({url : rooturl+"/gare/delete",
                     type: "POST",
					data: data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			console.log("error");
			}	else {
				console.log("posted")
				
				//$.mobile.changePage("#gare");
				refreshGareServer();
			
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
					  
				  },function() {
					  
					  
				  });  
			
			
			});
           
			elencoSchede.listview();	
            elencoSchede.listview("refresh");	
		  }
		 //navigator.notification.activityStop();
		//progressStop();
	  });	  
	
}

function markGara(id,stato){
	
	var data={
		id: id,
		stato: stato
	}
	
	 $.ajax({url : rooturl+"/gare/update",
                     type: "POST",
					data: data})
        .done(function(data) {
			popGareCancel();
			refreshGareServer();
			
		});
	
}

function editGara(id){
	
	 
	 console.log("editgara");
	 var gara=getGaraById(id);
	  var page=$("#page_editgara");
		 //page.css("background","yellow");
		  var data={};
		 
		 page.find(".jform").each(function(){
			 var id=$(this).attr("id");
			 //data[id]=$(this).val();
			 
			 $(this).val(gara.doc[id]);
			 
		 })
		 
		 
		
	 
		 $.mobile.changePage("#page_editgara");
}

function editGaraOk(){
	 var id=$("#page_editgara #id").val();
	 //alert(id);
	 var data={
		 id: id
	 }
	 var page=$("#page_editgara");
	 
	  var vcheck=checkValidGaraForm(page);
		  if (vcheck.error==true){
			  
			  alert("Errore di inserimento:\n\n"+vcheck.errors);
			  return;
		  }
		 //page.css("background","yellow");
		 
		 page.find(".jform").each(function(){
			 var id=$(this).attr("id");
			 data[id]=$(this).val();
			 
			// $(this).val(gara.doc[id]);
			 
		 })
		 
		 console.log(data);
	 
	 
	 $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/gare/update",
            type: "POST",
            data: data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			console.log("error");
			}	else {
				console.log("posted")
				
				$.mobile.changePage("#gare");
				refreshGareServer();
			
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
	
}

function deleteGara(id){
	
	
}

function refreshCurrentGara()
{
 autorefreshcount=0;
 $("#gara .medals").html("Caricamento in corso...")	
 var id=jcurrentgara.id;
colog("refreshCurrentGara - id= "+id);
openGara(id); 
	
}

function openGara(id,callback){
	colog("opengara "+id);
	//alert("id");
	//alert(JSON.stringify(gara));
	
	 $("#gara #navbar ul li").bind("tap",function(){
		   // sdebug("clicked tab");
			var idx=$(this).index();
			//sdebug("index: "+idx);
            var newSelection = $(this).children("a").attr("data-tab-class");
            $("."+prevSelection).addClass("ui-screen-hidden");
			//$("."+prevSelection).removeClass("ui-btn-active");
            $("."+newSelection).removeClass("ui-screen-hidden");
            prevSelection = newSelection;
			// $("#navbar ul li a").css("border","1px solid black");
			$("#gara #navbar ul li").removeClass("tabselected");
			$("#gara #navbar ul li a").removeClass("ui-btn-active");
			// $(this).find("a").css("border","1px solid silver");
			$(this).addClass("tabselected");
			$(this).find("a").addClass("tabselected").addClass("ui-btn-active").addClass
("ui-state-persist");
            $("#gara .ulupdate").hide();
			
			var dtc=$(this).find("a").attr("data-tab-class");
			$("#gara .ul"+dtc).show();
			//sdebug(dtc);
			
            
			//$(this).find("a").removeClass("ui-btn");
			activeTab=idx;
        });
	
	
	gara.loadById(id,function(data) {
		
		refreshMatches();
		
		
		
		//alert(JSON.stringify(data))
		/*loadMatchesByProg(id);
		loadMatchesByAtleta(id);
		loadCronaca(id);*/
		//console.log(JSON.stringify($matches));
		$("#gara #hdr").find("#hgara a").html($gara.doc.location+" -     "+$gara.doc.data);
	    $("#gara #hdriscritti").find("h1").html($gara.doc.title+" "+$gara.doc.location+" -     "+$gara.doc.data);
	   
	   var arriscritti=$gara.doc.iscritti.split(",");
	   var niscritti=arriscritti.length;
	   var niscrittitext="";
	   iscrittiincat=[];
	   
	   
	   
	   if (cat!="")
	   { 
        niscritti=0;   
		niscrittitext=" in cat. "+cat.toUpperCase();
	   $(arriscritti).each(function(i) {
		   var atl=getAtletaById(arriscritti[i]);
		   var dn=atl.datanascita;
		   var categ=getCategoria(dn);
		   if (categ.toLowerCase()==cat.toLowerCase()){ 
		    niscritti++;
			iscrittiincat.push(arriscritti[i]);
		   
		   }
		   
		   
		   
	   })
	   
	   } else iscrittiincat=arriscritti;
	   
	
	   		mf=getMaschiFemmine(iscrittiincat,"iscritti")
	   $("#gara #ligaratitle").html("Gara: <b>"+$gara.doc.title+"</b>");
	   var maptxt="";
	   if ($gara.doc.maplocation){
		   if ($gara.doc.maplocation.trim()!="") maptxt="&nbsp;&nbsp;<a href='#' onclick='garaMaps()' class='pulsante' style='width:40px;'>Mappa</a>";
	   }
	   $("#gara #ligaralocation").html("Location: "+$gara.doc.location+maptxt);
	   $("#liiscritti").text(niscritti+" atleti iscritti"+niscrittitext+" --  "+"F: "+mf.femmine+" M: "+mf.maschi);

		//alert(iscrittiincat.length)
		//  var ff=getMaschiFemmine($,"iscritti")
		//   $("#limaschifemmine").text("F "+mf.femmine+" M "+mf.maschi);
		if (callback) callback();
		
		colog("stato gara: "+jcurrentgara.stato);
		if (jcurrentgara.stato=="disputata"){
			$("#matchesatleta #actionpanela").hide();
			 $("#iscrittiPage #btnAddIscritto").hide();
		}
		//refreshMeByProg();
	});
	
}


function doLogin(){
	var page=$("#login");
	var email=page.find("#txt-email").val();
	var psw=page.find("#txt-password").val();
	var ck=page.find("#chck-rememberme").prop("checked");
	var ckal=page.find("#chck-autologin").prop("checked");
	//var ckal=page.find("#chck-autologin:checked").length;
	
	//alert("ckal: "+ckal);
		
	progressStart("Loggin in...","Log-in");
	$.ajax({
			url: rooturl+"/atleti/login",
			data: {
				email: email,
				password: psw
			},
            type: "POST"})
        .done(function(data) {
			progressStop();
			colog("login result: "+JSON.stringify(data));
			if (data.loggedin=="true")
			{
			 toast("login eseguito con successo");	
			 $("#index .loginspan").html("Accesso amministratore eseguito");
			 loggedin=true;
			 $("#index #lilogout").show();
			 $("#index #lilogin").hide();
			 $("#index #liatleti").show();
			 //$("#index #lioptions").show();
			 $("#index #lisockets").show();
			 $("#gara #liresetcronaca").show();
			 $("#gara #lisysmsg").show();
			 $("#gare #liaggiungigara").show();
			 $("#page_atleti #liaggiungiatleta").show();
			 $("#matchesatleta #actionpanela").show();
			 $("#iscrittiPage #btnAddIscritto").show();
			 $("#gare #test").show();
			 $(".showadmin").show();
			 colog("ckal: "+ckal);
			 if (ckal)
			 {
			  colog("setting autologin true")	 
			  setCookie("autologin","true",cookieDays);	 
			 } else deleteCookie("autologin");	
		     if (ck)
			 {
				 
			  setCookie("email",email,cookieDays);	 
			  setCookie("psw",psw,cookieDays);
			  colog("setted rememberme cookies")
			 } else {
			   deleteCookie("email");
			  deleteCookie("psw");
			  colog("deleted rememberme cookies");
				 
			 }
			 
		
			 
			 $.mobile.changePage("#index");
			 
		
			} else {
				$("#login #dlg-invalid-credentials").popup("open");
				$("#index .loginspan").html("");
			}	
			
		   

		})
        .fail(function() {
			progressStop();
			toast("Error getting elibrary documents","long");
			//dlg.dialog('close');
		});	
	

	
}	


function refreshNews(callback) {
	$.ajax({
			url: rooturl+"/news",
			dataType: "json",
            type: "GET"})
        .done(function(data) {
			//alert(data.rows.length);
			var html = new EJS({url: 'tpl/news.ejs'}).render(data.rows); 
			$("#page_news #content").html(html);
			
			if (callback) callback(data);
	    });
	
}

 function initTabs()
	 {
	  $("#gara a[data-role=tab]").each(function (i) {
         $(this).bind("vclick",function() {
		   sdebug($(this).attr("id"));
		   activeTab=i;
		   setActiveTab(activeTab);
		 });
		 
        });
	 }
	 
	 function setActiveTab(n)
	 {
	  //return;	 
	 $("#gara #navbar ul li:eq("+n+")").trigger("vclick");
	 return;
	 $( "#tabs" ).tabs( "option", "active", n );
	 
	 $("#gara .tab-content div:eq("+n+")").removeClass("ui-screen-hidden");
	 $("#navbar ul li:eq("+n+") a").addClass("ui-btn-active");
	 
	  //$("ul.cachedlistview").hide();
	  sdebug("setting activetab to "+n);
	  /*$("a[data-role=tab]").each(function (i) {
         $(this).removeClass("ui-btn-active");
		 if (i==n) $(this).addClass("ui-btn-active");

        });
		*/
      var listaname="lista"+tabs[n];
	  sdebug("showing list "+listaname);
	 // $("ul#"+listaname).show();
	  refreshMode=tabs[n];
	 
	 }
	 
	 
 function loadCronaca(id){
 colog("loadcronaca for gara "+id);
	   $.ajax({
            url: rooturl+"/matches/getcronaca/"+id,
            type: "GET"})
         .done(function(data) {
			  $("#gara #listacronaca").empty();
			 if (!data.error)
			 {
				console.log("cronaca: "+data.rows.length);
				colog(data);
			 //alert(JSON.stringify(data));
			 var arr=data.rows;
			 cronaca=data;
			 
			 var html = new EJS({url: 'tpl/cronaca.ejs'}).render(data.rows); 
		
			 /*var htm="";
			 $(arr).each(function(i) {
				 var row=data.rows[i];
				 htm+="<li>"+row.time+" "+row.text+"</li>";
				 
				 
			 });*/
			 
			 $("#gara #listacronaca").append(html);
			 $("#gara #listacronaca").listview();
			 $("#gara #listacronaca").listview("refresh");
			 } else 
			 {   //error
 			  console.log("error reading cronaca for this gara id="+id)	  
				 
				 
			 }
			 
			 
			
		 });


 } 
	 

 function loadMatchesByProg(id,options){
	   	  var opt = { 
		        matches: $allmatches,
				showNullMatches: false,
	            ulSelector: "listabyprog",
				showUpdated: true,
				datarel: "popup",
				clickAtletaMatches: true,
				callback: null
        };
        $.extend(opt, options);
	   colog("loadmatchesbyprog "+id);
	   $.ajax({
            url: rooturl+"/matches/findbygaraid/"+id,
            type: "GET"})
         .done(function(data) {
			 //alert(JSON.stringify(data));
			 $matches=data;
			 $allmatches=data;
			 colog("total matches: "+$matches.rows.length);
			 var $jmatches=[];
			 	 if (cat!="")
		{
			var $jmatches={
				rows: []
			}
		    $(data.rows).each(function(i){
				var dn=data.rows[i].doc.datanascita;
				colog("datanascita: "+dn)
				if (getCategoria(dn).toLowerCase()==cat.toLowerCase()) {
					
					$jmatches.rows.push(data.rows[i])
				}
				
				
			})	
			$matches=$jmatches;
			colog("matches after categoria "+cat+": "+$matches.rows.length);
		}
			
			
			//var mf=getMaschiFemmine($matches.rows)
			
               var html = new EJS({url: 'tpl/matchesbyprog.ejs'}).render($matches.rows); 
			//alert(html);
			var listaname="listabyprog";
		   var listview=$("#gara ul#"+listaname);
		  // alert(listview.length)
		   listview.empty();
		   listview.append(html);
		   listview.listview();
		   listview.listview("refresh");
		   
		   
		    var mtext="";
		   if ($.trim(viewcat)!="") mtext=" in cat. "+viewcat.toUpperCase();
		   
		   
		   colog("$allmatches for cat "+viewcat+"-------->"+JSON.stringify($allmatches))
		    var $b=filterRows($matches,{ dadisputare: "yes"});
		   var $c=filterRows($b,{ disputato: "yes"});
		   
		   
		   colog("$C--->"+JSON.stringify($c))
		   
		   var $v=filterRows($c,{ vinto: "yes"});
		   var $p=filterRows($c,{ vinto: "no"});
		   var p=$c.rows.length-$v.rows.length;
		   
		   var gf=getMaschiFemmine($b.rows);
		   var ctext=$b.rows.length+" match da disputare ( M: "+gf.maschi+", F: "+gf.femmine+" )";
		   gf=getMaschiFemmine($v.rows)
		   var cf=getMaschiFemmine($c.rows)
		   var pf=getMaschiFemmine($p.rows)
		   ctext+="<br>"+$c.rows.length+" match disputati ( M: "+cf.maschi+", F: "+cf.femmine+" ) <br>"+$v.rows.length+" vinti ( M: "+gf.maschi+", F: "+gf.femmine+" ) <br>"+p+" persi ( M: "+pf.maschi+", F: "+pf.femmine+" )"+mtext
		   
		   $("#limatches").html(ctext)
		   
		   
		   var $oro=filterRows($c,{ medagliamatch: "oro"});
		   var $arg=filterRows($c,{ medagliamatch: "argento"});
		   var $bro=filterRows($c,{ medagliamatch: "bronzo"});
		   
		   var mforo=getMaschiFemmine($oro.rows);
		   var mfarg=getMaschiFemmine($arg.rows);
		   var mfbro=getMaschiFemmine($bro.rows);
		   
		   ctext="ORI: "+$oro.rows.length+" ( M: "+mforo.maschi+", F: "+mforo.femmine+" )<br>ARGENTI: "+$arg.rows.length+" ( M: "+mfarg.maschi+", F: "+mfarg.femmine+" )<br>BRONZI: "+$bro.rows.length+" ( M: "+mfbro.maschi+", F: "+mfbro.femmine+" ) "+mtext;
		   $("#limedaglie").html(ctext) 
		   
		   //$("#limatches").html($matches.rows.length+" incontri")
		   $("#gara #ulinfogara span").html(getMedaglieGara($matches));
		   
	     $("#gara #navbar ul li").bind("vclick",function(){
		   // sdebug("clicked tab");
			var idx=$(this).index();
			//sdebug("index: "+idx);
            var newSelection = $(this).children("a").attr("data-tab-class");
            $("."+prevSelection).addClass("ui-screen-hidden");
			//$("."+prevSelection).removeClass("ui-btn-active");
            $("."+newSelection).removeClass("ui-screen-hidden");
            prevSelection = newSelection;
			// $("#navbar ul li a").css("border","1px solid black");
			$("#gara #navbar ul li").removeClass("tabselected");
			$("#gara #navbar ul li a").removeClass("ui-btn-active");
			// $(this).find("a").css("border","1px solid silver");
			$(this).addClass("tabselected");
			$(this).find("a").addClass("tabselected").addClass("ui-btn-active").addClass
("ui-state-persist");
            $("#gara .ulupdate").hide();
			
			var dtc=$(this).find("a").attr("data-tab-class");
			$("#gara .ul"+dtc).show();
			//sdebug(dtc);
			
            
			//$(this).find("a").removeClass("ui-btn");
			activeTab=idx;
			if (opt.callback) opt.callback();
        });
		    setActiveTab(activeTab);
			
		   
			 //alert(data.length);
		 });
	
	 
	 
 }

 
 function loadMatchesByAtleta(id){
	 colog("loadmatchesbyatleta "+id);
	   $.ajax({
            url: rooturl+"/matches/findbygaraid/byatleta/"+id,
            type: "GET"})
         .done(function(data) {
			 //alert(JSON.stringify(data));
			 var $matchesbyatleta=data;
			 
			 	 colog("total matches: "+$matchesbyatleta.length);
			
			 	 if (cat!="")
		{
			var $jmatchesbyatleta=[];
		    $(data).each(function(i){
				var dn=data[i].datanascita;
				colog("datanascita: "+dn)
				if (getCategoria(dn).toLowerCase()==cat.toLowerCase()) {
					
					$jmatchesbyatleta.push(data[i])
				}
				
				
			})	
			$matchesbyatleta=$jmatchesbyatleta;
			colog("matches after categoria "+cat+": "+$matchesbyatleta.length);
		}
			
			 var html = new EJS({url: 'tpl/matchesbyatleta.ejs'}).render($matchesbyatleta); 
			  var listaname="listabyatleta";
		   var listview=$("ul#"+listaname);
		   listview.empty();
		   listview.append(html);
		   listview.listview();
		   listview.listview("refresh");
		  // $("#limatches").html(data.rows.length+" incontri")
		   //$("#gara #ulinfogara span").html(getMedaglieGara($matches));
		   
	     $("#gara #navbar ul li").bind("vclick",function(){
		    //sdebug("clicked tab");
			var idx=$(this).index();
			//sdebug("index: "+idx);
            var newSelection = $(this).children("a").attr("data-tab-class");
            $("."+prevSelection).addClass("ui-screen-hidden");
			//$("."+prevSelection).removeClass("ui-btn-active");
            $("."+newSelection).removeClass("ui-screen-hidden");
            prevSelection = newSelection;
			// $("#navbar ul li a").css("border","1px solid black");
			$("#gara #navbar ul li").removeClass("tabselected");
			$("#gara #navbar ul li a").removeClass("ui-btn-active");
			// $(this).find("a").css("border","1px solid silver");
			$(this).addClass("tabselected");
			$(this).find("a").addClass("tabselected").addClass("ui-btn-active").addClass("ui-state-persist");
            $("#gara .ulupdate").hide();
			
			var dtc=$(this).find("a").attr("data-tab-class");
			$("#gara .ul"+dtc).show();
			//sdebug(dtc);
			
            
			//$(this).find("a").removeClass("ui-btn");
			activeTab=idx;
        });
		    setActiveTab(activeTab);
		   
			 //alert(data.length);
		 });
	
	 
	 
 }
 
 function refreshMeByProg(options)
	 {
	  var $mm=$matches;
	  sdebug("$mm.lenght: "+$mm.find("match").length);
	  var opt = { 
		        matches: $mm,
				showNullMatches: false,
	            ulSelector: "listabyprog",
				showUpdated: true,
				datarel: "popup",
				clickAtletaMatches: true,
				callback: null
        };
        $.extend(opt, options);
	
	  var $m=opt.matches; 
	  
      sdebug("refreshMeByProg matches: " +$m.find("match").length+" - shownullmatches: "+opt.showNullMatches+" - ulSelector: "+opt.ulSelector);
	  refreshMode="byprog";
	   
	   var xmatchesgara=$.parseXML("<matches></matches>");
	  var $matchesgara=$(xmatchesgara);
	  
	  //$matches=$(matches_xml);
	  
	  sdebug("matches: "+$matches.find("match").length);
	  
		    var aid=garaid;
		    var htm="";
		    //htm+="<ul id='lista' data-role='listview' data-theme='c' >";
			 
			 
			 
			$m.find('match').each(function(){
			    var match=$(this);
				var id = $(this).find("garaid").text();
				sdebug("match: "+id)
				if (id==aid)
				{
				 var cognome = $(this).find('progid').text();
				 var nome = $(this).find('atletaid').text();
				 var datanasc=$.trim($(this).find("datanascita").text());
				
			     sdebug(cognome+" - "+nome+" datanasc: "+datanasc);
				 
				 var $m=match.clone();
				 
				 if ($.trim(viewcat)!="")
				 {
				  var catatleta=getCategoria(datanasc);
                  sdebug("categoria for "+nome+": "+catatleta);				  
				  if  ($.trim(viewcat)==$.trim(catatleta)) $matchesgara.find("matches").append($m);	 
					 
				 } else  $matchesgara.find("matches").append($m);
				 //sdebug(match);
				
				} 
				
			});
			
			matches=$matchesgara.find("match");

		   matches.sort(function(a, b){
		     	var progid_a = $(a).find('progid').text();
				var progid_b = $(b).find('progid').text();
				
				if ( progid_a< progid_b )  return -1;
                if ( progid_a> progid_b  ) return 1;
               return 0;
           }); 
		   
		   matches.each(function() {
		   
		   
		    var $sav=$(this).clone();
			
		    
			
		     var mid=$(this).find("id").text(); 
			var progid=$(this).find("progid").text(); 
			var matchid=$(this).find("matchid").text(); 
			var vinto=$(this).find("vinto").text(); 
			var disputato=$(this).find("disputato").text(); 
			var dadisputare=$(this).find("dadisputare").text(); 
			var medaglia=$(this).find("medagliamatch").text(); 
			var risultato=$(this).find("risultato").text(); 
			var datanasc=$(this).find("datanascita").text(); 
			var categoria=getCategoria(datanasc).toUpperCase();
			//sdebug("progid: "+progid);
			var atletaid=$(this).find("atletaid").text();
			
			var anome=$(this).find("atletaname").text();
			
			//anome=getAtletaNameById(atletaid);
			
			
			
			$sav.append("<atletaname></atletaname>");
			$sav.find("atletaname").text(anome);
			
			$msav.find("matches").append($sav);
			
	
			
			var style="";
		
			var doIt=false;
			var matchclass="";
			
			if ($.trim(dadisputare)=="yes") doIt=true;
			if ($.trim(dadisputare)=="no"){
				doIt=false;
				matchclass="black";
			   if (opt.showNullMatches) doIt=true;
		
			}
			
			if ($.trim(disputato)=="yes")
			{
			 if ($.trim(vinto)=="yes")
			 {
			  style=" style='background-color: green' ";
			  matchclass="green";
			 }
			 if ($.trim(vinto)=="no")
			 {
			  style=" style='background-color: #C00000 ' ";
			  matchclass="red";
			 }
			} 
			
			
			if (doIt)
			{
			var imgsrc="matchtoplay.png";
			if (medaglia=="oro") imgsrc="medaglia_oro.png";
			if (medaglia=="argento") imgsrc="medaglia_argento.png";
			if (medaglia=="bronzo") imgsrc="medaglia_bronzo.png";
			
			if (($.trim(disputato)=="yes") && (medaglia=="none"))
			{
			 if ($.trim(vinto)=="yes") imgsrc="matchok.png";
			 if ($.trim(vinto)!="yes") imgsrc="matchko.png";
			
			}
			
			var ris="";
			var svinto="Non disputato";
			var risclass="nondisputato";
			if ($.trim(disputato)=="yes"){
			 risclass="vinto";
			 svinto="Vinto, ";
   			 ris="risultato: "+risultato;
			 if ($.trim(vinto)!="yes"){
 			    svinto="Perso, ";
			    risclass="perso";
			 }
			} 
			ris=svinto+ris;
			style="";
			
			var clickatleta="onclick='setResult(this)'";
			if (opt.clickAtletaMatches)
			{
			 clickatleta="onclick=\"matchesPerAtleta('"+atletaid+"','"+anome+"','"+datanasc+"')\"";
			
			}
			htm+="<li "+style+" tkdr-matchid='"+matchid+"' data-icon='false' id='match_"+mid+"' ><a  shref=javascript:matchAtletaDetail('"+atletaid+"') id='prog"+mid+"' data-ajax='false'  href='#' " +clickatleta+" shref='gareatleta.html?atletaid="+atletaid+"&garaid="+garaid+"'><img swidth='50' sheight='50' src='images/"+imgsrc+"' class='imgicon sui-li-icon ui-corner-none' ><div><span class='match "+matchclass+"'>"+matchid+"</span><br><span class='categoria'>"+categoria+"</span><br><span class='atleta'>"+anome+"</span><br><span class='soft "+risclass+"'>"+ris+"</span></div></a><input type='hidden' class='datanascita' value='"+datanasc+"' /><input type='hidden' class='atletaid' value='"+atletaid+"' /><input type='hidden' class='atletaname' value='"+anome+"'/></li>";
			} 
		  });
		   //htm+="</ul>";
		   
		   //var listaname="listabyprog";
		   var listaname=opt.ulSelector;
		   var listview=$("ul#"+listaname);
		   listview.empty();
		   listview.append(htm);
		   listview.listview();
		   listview.listview("refresh");
		   if (opt.showUpdated)
		   {
		   //$("#ulinfogara li span.left").html(sgetMedaglieGara(garaid)+ " - "+matches.length+" match");
		   $("#ulinfogara li span.left").html(sgetMedaglieGara(garaid));
		   var mtext="";
		   if ($.trim(viewcat)!="") mtext=" in cat. "+viewcat.toUpperCase();
		   
		   
		   
		    var $b=filterRows($allMatches,{ dadisputare: "yes"});
		   var $c=filterRows($b,{ disputato: "yes"});
		   
		   var $v=filterRows($b,{ vinto: "yes"});
		   var $p=filterRows($b,{ vinto: "no"});
		   
		   var ctext=$b.rows.length+" incontri da disputare"
		   ctext+="<br>"+$b.rows.length+" incontri disputati, "+$v.length+" vinti, "+$p.length+" persi"
		   
		   $("#limatches").html(ctext+mtext)
		  
		   $("#gara #ulinfogara span").html(getMedaglieGara($a));
		   
		   //$("#limatches").html(matches.length+" incontri"+mtext);
		   
		   
		   
		
		     var d = new Date();  // 30 Jan 2011
           var dd=formatDateTime(d);  // '30.01.11'
		   sdebug("data "+dd);
		   
		    $("li.liprog").find("span").html("Aggiornato: "+dd);
		   }
		    //debug($msav.find("matches").html());
			
			if (opt.callback!=null) opt.callback();
	    
	 } 
	 

function refreshAtletiServer()
{
	  //var pageid=$.mobile.activePage.attr('id');
	  //var pageId="#"+pageid;
	  debugga("refreshAtletiServer");
	  //navigator.notification.activityStart("Caricamento", "loading");
	  //progressStart("Lettura dati");
	  app.loadAllSchede(function(data){
		  
		  if (data.error)
		  {
			toast("errore","long");  
			  
		  } else {
		  
		  //alert(data);
		  toast("Atleti caricati da "+rooturl);

          var elencoSchede = $("#lista_atleti");
            elencoSchede.html("");
			
			var lih='<li data-role="list-divider" role="heading" data-theme="b">'+data.rows.length+' atleti</li>';
			elencoSchede.append(lih);
			
			/*
			data.rows.sort(function(a,b) {
			  if ((a.doc.nome)	&& (b.doc.nome))
			  {	  
				var nome1=a.doc.nome.toLowerCase();
				var nome2=b.doc.nome.toLowerCase();
				if (nome1>nome2) return 1;
				if (nome1<nome2) return -1;
			  }	
				return 0;
				
			});
			*/
			
			//$("#"+pageid+" #recnum span").html(data.rows.length+" atleti");
			var html = new EJS({url: 'tpl/atleti.ejs'}).render(data.rows); 
			elencoSchede.empty().append(html);
			progressStop();
			$("#page_atleti #recnum span").html(data.rows.length+ " atleti");
			
			elencoSchede.find("li").on("tap",function() {
				var id=$(this).find("a").attr("id").split("_")[0];
				 colog("requesting id "+id);
				 
				 progressStart("Lettura dati");
				 atleta.loadById(id,function(data) {
					 progressStop();
					 //alert(JSON.stringify(data));
					  var obj=data.data.rows[0].doc;	
					   
                       var pophtm=createHtmGrid(obj);
					   var lv=createHtmListview(obj);
					   //alert(lv);
					   $("#page_atleta  #listax_atleta").empty().append(lv);
					   
					   $("#page_atleta #atletaid").val(id);
					   $.mobile.changePage("#page_atleta");
					   $("#page_atleta  #listax_atleta").listview();
		    		   //createPopup(pophtm);
					   return;
				 $("#txtNome").val(atleta.data.nome);
                 $("#txtIndirizzo").val(atleta.data.indirizzo);
                 $("#txtDescrizione").val(atleta.data.descrizione);
                 $("#txtPrezzo").val(atleta.data.prezzo);
				 $("#scanDiv").html(atleta.data.barcode);
				 
				 if ($.trim(atleta.data.photoURI)!="")
				 {
				  //alert(scheda.data.photoURI);	 
			      $("#fotoAnteprima").attr("src",atleta.data.photoURI).css({width: "128px", height: "128px"});
				  //alert($("#fotoAnteprima").attr("src"));
                  $("#fotoAnteprima").on("tap",function() {
					  $("#fullPhoto").attr("src",atleta.data.photoURI).css({width: "400px", height: "700px"});
					   $.mobile.changePage("#viewPhoto",{role: "dialog"});
					  
					  
				  });				  
				 } else {
				 	 
				  $("#fotoAnteprima").attr("src","img/nophoto.jpg").css({width: "128px", height: "128px"}); 	 
				 }
				  $("#scheda h3").html("Modifica "+boname);
                 $.mobile.changePage("#scheda");
					 
				 });
         
                return false;
				
			})
			
			/*
			
			elencoSchede.find("li").on("taphold",function() {
				//return;
			    var id=$(this).find("a").attr("id").split("_")[0];
				   var rev=$(this).find("a").attr("id").split("_")[1];
				  // scheda.remove(id,rev);
					  
                   //   $.mobile.changePage("#elencoSchede");
				   
				   
				  gConfirm("Confermi l'eliminazione dell' atleta ?","Conferma eliminazione",function() {
					  scheda.remove(id,rev);
					  
                      $.mobile.changePage("#elencoSchede");
				  },function() {
					  
					  
				  });  
     /*
              navigator.notification.confirm("Confermi l'eliminazione della scheda?",function(buttonIndex) {
					  
                    if (buttonIndex == 1) {
                      scheda.remove(id,rev);
					  
                      $.mobile.changePage("#elencoSchede");
                   }
                 },"Conferma eliminazione","Sì,No");
				 */
         /*       return false;
			
			});


		   /*
            for (var i=0; i<data.rows.length; i++) {
				
			   scheda.data=data.rows[i].doc; 	
 
               var li = $("<li data-theme='c'><a href='#' id='"+data.rows[i].doc._id+"_"+data.rows[i].doc._rev+"' data-transition='slide'>" +  data.rows[i].doc.nome +  "</a></li>");
  
               li.on("tap", function() {
				  
          				  
				   
				 
				
         
               //  scheda.load($(this).text());
				 //navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
				 
				 var id=$(this).find("a").attr("id").split("_")[0];
				 console.log("requesting id "+id);
				 
				 progressStart("Lettura dati");
				 scheda.loadById(id,function(data) {
					 progressStop();
					 //alert(JSON.stringify(data));
				 $("#txtNome").val(scheda.data.nome);
                 $("#txtIndirizzo").val(scheda.data.indirizzo);
                 $("#txtDescrizione").val(scheda.data.descrizione);
                 $("#txtPrezzo").val(scheda.data.prezzo);
				 $("#scanDiv").html(scheda.data.barcode);
				 
				 if ($.trim(scheda.data.photoURI)!="")
				 {
				  //alert(scheda.data.photoURI);	 
			      $("#fotoAnteprima").attr("src",scheda.data.photoURI).css({width: "128px", height: "128px"});
				  //alert($("#fotoAnteprima").attr("src"));
                  $("#fotoAnteprima").on("tap",function() {
					  $("#fullPhoto").attr("src",scheda.data.photoURI).css({width: "400px", height: "700px"});
					   $.mobile.changePage("#viewPhoto",{role: "dialog"});
					  
					  
				  });				  
				 } else {
				 	 
				  $("#fotoAnteprima").attr("src","img/nophoto.jpg").css({width: "128px", height: "128px"}); 	 
				 }
                 $.mobile.changePage("#scheda");
					 
				 });
         
                return false;
              });
    

              li.on("taphold", function() {
  
                   var id=$(this).find("a").attr("id").split("_")[0];
				   var rev=$(this).find("a").attr("id").split("_")[1];
				  // scheda.remove(id,rev);
					  
                   //   $.mobile.changePage("#elencoSchede");
     
              navigator.notification.confirm("Confermi l'eliminazione della scheda?",function(buttonIndex) {
					  
                    if (buttonIndex == 1) {
                      scheda.remove(id,rev);
					  
                      $.mobile.changePage("#elencoSchede");
                   }
                 },"Conferma eliminazione","Sì,No");
				 
                return false;
               });
	
               elencoSchede.append(li);
	          
            }
            */
			
			
		elencoSchede.find("li").on("taphold",function() {
			 if (!loggedin) return;	
				   var id=$(this).find("a").attr("id").split("_")[0];
				   var rev=$(this).find("a").attr("id").split("_")[1];
				   
				    gConfirm("Confermi l'eliminazione dell'atleta ?","Conferma eliminazione",function() {
					var data={};
						data.id=id;
						data.rev=rev;						
					  
					 $.ajax({url : rooturl+"/atleti/delete",
                     type: "POST",
					data: data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			console.log("error");
			}	else {
				console.log("posted")
				
				//$.mobile.changePage("#gare");
				refreshAtletiServer();
			
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
					  
				  },function() {
					  
					  
				  });  
			
			
			});
            
			 elencoSchede.listview();	
            elencoSchede.listview("refresh");	
		  }
		 //navigator.notification.activityStop();
		// progressStop();
	  });	  
	
}



function progressStart(text)
{
 if (isPhone) {
	 
   navigator.notification.activityStart(text, "caricamento...");	
 } else
 {
   $.mobile.loading( 'show', {
	text: text,
	textVisible: true,
	theme: 'z',
	html: ""
   });
     	 
 }	 
}
function progressStop()
{
 if (isPhone) {
	 navigator.notification.activityStop();
 }	 
{
   $.mobile.loading( 'hide');
     	 
 }	  
}


function refreshSchede()
{

		  
	 
      var elencoSchede = $("#liElencoSchede");
            elencoSchede.html("");
			
			var lih='<li data-role="list-divider" role="heading" data-theme="b">'+app.storage.length+' schede</li>';
			elencoSchede.append(lih);
             
            for (var i=0; i<app.storage.length; i++) {
 
               var li = $("<li data-theme='c'><a href='#' data-transition='slide'>" + 
                app.storage.key(i) + 
                "</a></li>");
  
               li.on("tap", function() {
         
                 scheda.load($(this).text());
				 //navigator.notification.alert(JSON.stringify(scheda.data), function() {}, "Avviso");
				 
				 
         
                 $("#txtNome").val(scheda.data.nome);
                 $("#txtIndirizzo").val(scheda.data.indirizzo);
                 $("#txtDescrizione").val(scheda.data.descrizione);
                 $("#txtPrezzo").val(scheda.data.prezzo);
				 $("#scanDiv").html(scheda.data.barcode);
				 
				 if ($.trim(scheda.data.photoURI)!="")
				 {
				  //alert(scheda.data.photoURI);	 
			      $("#fotoAnteprima").attr("src",scheda.data.photoURI).css({width: "128px", height: "128px"});
				  //alert($("#fotoAnteprima").attr("src"));
                  $("#fotoAnteprima").on("tap",function() {
					  $("#fullPhoto").attr("src",scheda.data.photoURI).css({width: "400px", height: "700px"});
					   $.mobile.changePage("#viewPhoto",{role: "dialog"});
					  
					  
				  });				  
				 } else {
				 	 
				  $("#fotoAnteprima").attr("src","img/nophoto.jpg").css({width: "128px", height: "128px"}); 	 
				 }
				  $("#scheda h3").html("Modifica "+boname);
                 $.mobile.changePage("#scheda");
              });
    

              li.on("taphold", function() {
  
                  var key = $(this).text();
     
                  navigator.notification.confirm("Confermi l'eliminazione della scheda?",function(buttonIndex) {
                    if (buttonIndex == 1) {
                      scheda.remove(key);
                      $.mobile.changePage("#elencoSchede");
                   }
                 },"Conferma eliminazione","Sì,No");
               });
	
               elencoSchede.append(li);
	
            }

             
            elencoSchede.listview("refresh");	
			
			// });
	
}


function alerta(txt)
{
 if (isPhone)
 {
  navigator.notification.alert(txt, function() {}, "Avviso"); 
 }	else debugga(txt);	
	
}

function debugga(txt)
{
 colog(txt)	;
}

function newScheda()
{
 //	data: {nome: "", indirizzo: "", descrizione: "", prezzo: "0,00",  coordinate: {}, photoURI: "", barcode: ""}	
 delete scheda.data._id;
 delete scheda.data._rev;
 scheda.data.nome="";
 scheda.data.indirizzo="";
 scheda.data.descrizione="";
 scheda.data.prezzo="";
 scheda.data.coordinate="";
 scheda.data.photoURI="";
 scheda.data.barcode="";
 
  $("#txtNome").val("");
  $("#txtIndirizzo").val("");
  $("#txtDescrizione").val("");
  $("#txtPrezzo").val("");
  $("#scanDiv").html("No code");
  $("#fotoAnteprima").attr("src","img/nophoto.jpg").css({width: "128px", height: "128px"});
 
 $("#scheda h3").html("Nuova "+boname);
$.mobile.changePage("#scheda");	
}

function toast(msg,duration)
{
 if (isPhone) {
  window.plugins.toast.show(msg, duration, 'center', function(a){}, function(b){});		 
 } else console.log(msg);
 
	
}

function gConfirm(question,title,onYes,onNo) {
	
	if (isPhone){
		
		
		 navigator.notification.confirm(
  
            question,
  
            function(buttonIndex) {
  
              if (buttonIndex == 1) {
               onYes();
             } else onNo();
            },
            title, 
            "Sì,No");
		
		
		
	} else
	{
	 if (confirm(question))
     {
	  onYes();	 
	 }	else
	 {
	  onNo();	 
	 }		 
		
		
	}
	
}


function importAtleti()
{
// var tkurl="http://localhost:3000"	
  $.ajax({
            url: rooturl+"/atleti/findall",
            type: "GET"})
         .done(function(data) {
			 //alert(JSON.stringify(data));
			 alert(data.length);
		 });
	
}

	function getNormalD(data)
	{
	 //data=data.substring(0,8);
	 var retvalue=data.substring(6)+data.substring(3,5)+data.substring(0,2);
	 
	 return retvalue;
	
	}


	
	function createPopup(content)
	{
	  var closeBtn = $('<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>').button();

    // text you get from Ajax
      //var content = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing. Morbi convallis sem et dui sollicitudin tincidunt.</p>";

    // Popup body - set width is optional - append button and Ajax msg
    var popup = $("<div/>", {
        "data-role": "popup"
    }).css({
        "width": $(window).width() / 1.5 + "px"
    }).append(closeBtn).append(content);

    // Append it to active page
    $(".ui-page-active").append(popup);

    // Create it and add listener to delete it once it's closed
    // open it
    $("[data-role=popup]").on("popupafterclose", function () {
        $(this).remove();
    }).on("popupafteropen", function () {
        $(this).popup("reposition", {
            "positionTo": "window"
            //x: 150,
            //y: 200
        });
    }).popup({
        "dismissible": false,
            "history": false,
            "theme": "b",
            "overlayTheme": "b"
    }).popup("open");

		
		
	}
	
	
	function createHtmGrid(obj)
	{
	 var pophtm="<table border=1 width='300'>";					   
					   for (var key in obj) {
                         colog(' name=' + key + ' value=' + obj[key]);
                         pophtm+="<tr><td>"+key+"</td><td>"+obj[key]+"</td></tr>";

                       } 	 
					   pophtm+="</table>";
    return pophtm;					   
		
	}
	
		
	function createHtmListview(obj)
	{
	 var pophtm='<ul data-role="listview">';
     var pophtm=''; 	 
					   for (var key in obj) {
                         colog(' name=' + key + ' value=' + obj[key]);
						 var value=obj[key];
						 if (key.toLowerCase()=="categoria") value=getCategoria(obj["datanascita"],true).toUpperCase();
                         pophtm+='<li class="gradient ui-li-static ui-body-inherit"><span class="small">'+key+'</span><br><span class="medium">'+value+'</li>';

                       } 	 
					   //pophtm+="</ul>";
    return pophtm;					   
		
	}
	
	function bindGaraPage()
	{
	  colog("bindaGaraPage");	
	  $(document).on("pageshow","#gara",function() {
		
		 var durl=$(this).data("url");
		 debug("durl: "+durl);
		 /*garaid=durl.split("id=")[1];
		 garaid=sessionStorage["id"];*/
		 garaid=parm_garaid;
		 setActiveTab(activeTab);
		// alert("ricevo "+garaid);
		 //garaid=parm_garaid;
		 
		 
		 
	 $("#gara #dialogCategorie").popup();
	 $('#gara #dialogForAtleta').popup();
	
	  
	
		 
		 
	 $("#gara #refresh").on("tap",function() {
	   debug("activetab: "+activeTab);
	   //refreshGara();
	   //refreshCronaca();
	  })
	 $(".tb").remove();
		 $("#av_toolbar_regdiv").remove();
		 $("#av_toolbar_iframe").remove();
	
/*	
	 if(navigator.userAgent.match(/Android/i)){
    window.scrollTo(0,1);
	}
	*/
	
	$('#gara .spancat').on('vclick',function() {
		sdebug("clicked on categorie");
		var lv=$("#gara ul#ulcategorie");
		   lv.listview();
		   lv.listview("refresh");
		//$("#gara #dialogCategorie").popup();
		//$("#dialogCategorie").popup('open', {positionTo: '.spancat'});
		$("#gara #dialogCategorie").popup('open');
		
	});
	
	$("#gara #ulcategorie li").on("vclick",function() {
		
		var txt=$(this).text();
		viewcat=txt.toLowerCase();
		var t=txt.toLowerCase();
		if (viewcat.toLowerCase()=="tutte") viewcat="";
		cat=viewcat;
		//alert(cat);
		document.cookie="cookiecat="+viewcat+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
		$("#dialogCategorie").popup('close');
		
		
		if (t.indexOf("esordienti")>-1) t=t.replace("esordienti","eso");
		if (t.indexOf("cadetti")>-1) t=t.replace("cadetti","cad");
		if (t.indexOf("junior")>-1) t=t.replace("junior","jun");
		if (t.indexOf("senior")>-1) t=t.replace("senior","sen");
		$(".spancat").text(cattxt+t.toUpperCase());
		refreshCurrentGara();
		
	});
	
	$("#gara #listabyprog li").on("vclick",function() {
	   var id=$(this).attr("id");
	   var id=id.replace("prog","");
	   //alert(id);
	
	});
	
	

	     $("#gara #navbar ul li").on("vclick",function(){
		   // sdebug("clicked tab");
			var idx=$(this).index();
			//sdebug("index: "+idx);
            var newSelection = $(this).children("a").attr("data-tab-class");
            $("."+prevSelection).addClass("ui-screen-hidden");
			//$("."+prevSelection).removeClass("ui-btn-active");
            $("."+newSelection).removeClass("ui-screen-hidden");
            prevSelection = newSelection;
			// $("#navbar ul li a").css("border","1px solid black");
			$("#gara #navbar ul li").removeClass("tabselected");
			$("#gara #navbar ul li a").removeClass("ui-btn-active");
			// $(this).find("a").css("border","1px solid silver");
			$(this).addClass("tabselected");
			$(this).find("a").addClass("tabselected").addClass("ui-btn-active").addClass
("ui-state-persist");
            $("#gara .ulupdate").hide();
			
			var dtc=$(this).find("a").attr("data-tab-class");
			$("#gara .ul"+dtc).show();
			//sdebug(dtc);
			
            
			//$(this).find("a").removeClass("ui-btn");
			activeTab=idx;
        });
	 
	     //setActiveTab(activeTab);
		 
		 
	
		 
		 
		 
		 $("#gara #bubble").on("vclick",function() {
		 
		    //$("#gara #bubble").css("background","black");
			notifyseen=true;
			notifycount=0;
			nonletti=0;
			$("#gara .nonvisto").removeClass("nonvisto");
			$("#gara #bubble").html("0").hide();
			
			if (cronaca.rows.length>0)
			{
			setCookie("lastcronaca",cronaca.rows[0].time)
			var c=getCookie("cronacaletti_"+jcurrentgara.id);
			if (!c) c="";
			$(cronaca.rows).each(function(i){
				var row=cronaca.rows[i];
				//if (c.indexOf(row.time)=="")
			//	{
				if (c.trim()!="") c+=",";
				c+=row.time;
			//	}
				
			})
			console.log("setting cookie cronacaletti_"+jcurrentgara.id+": "+c);
			setCookie("cronacaletti_"+jcurrentgara.id,c);
			//alert(c);
			
			}
			
			$("#gara a#tab_cronaca").trigger("click");
	        //document.cookie="notifycount="+notifycount+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
			//document.cookie="cronacanonletti= ; expires=Thu, 18 Dec 2023 12:00:00 UTC";
		 });
		 
		  
		 
	     //document.title="Incontri gara";
	     
		 //$("ul.cachedlistview").hide();
	    
		 //alert($gare.length);
		 
		 	$("#gara #panelright").on("tap",function() {
                $(this).panel( "close" );
            });
	 
	  //$.mobile.ajaxLinksEnabled = false;
	   
	   //garaid = getParameterByName('id');
	   //alert(garaid);
	   anninascita="" //getParameterByName('anni');
	   cat="" // getParameterByName('cat');
	   searchgara ="" //getParameterByName('gara');
	   
	   if ($.trim(cat)!="") {
		   debug("viewing category: "+cat);
		   viewcat=cat;
	   }
	   
	   var cookiecat=getCookie("cookiecat");
	   
	   if ($.trim(cookiecat)!="") viewcat=cookiecat;
	   
	   
	   var t="" //viewcat;
	   
	   if ($.trim(t)=="") t="tutte";
	   if (t.indexOf("esordienti")>-1) t=t.replace("esordienti","eso");
		if (t.indexOf("cadetti")>-1) t=t.replace("cadetti","cad");
		if (t.indexOf("junior")>-1) t=t.replace("junior","jun");
		if (t.indexOf("senior")>-1) t=t.replace("senior","sen");
	   t=t.toUpperCase();
	   
	   $("#gara .spancat").text(cattxt+t);
	   
	   debug("cookiecat: "+cookiecat);
	   
	   if  (($.trim(garaid)=="") && ($.trim(searchgara)=="")) searchgara="corna";
	   
	   /*
	   $("a[data-role=tab]").each(function (i) {
         $(this).bind("click",function() {
		   sdebug($(this).attr("id"));
		   activeTab=i;
		   setActiveTab(activeTab);
		 });
		 
        });
	   */
	   
	   
	   if (showMsg) {
		  // $.mobile.changePage( "#msgDialog", { role: "dialog" } );
		   $("#msgBar").show();
	   }
	   	 /*$("#msgDialog").{}popup();
		 $("#msgDialog").popup('open');*/
	   
	   //refreshGara(true);
	   //refreshCronaca();
	 
	 
	   
	 
	 });	
		
	}
	
	function sdebug(txt)
	{
	 debugga(txt);	
		
	}
	function debug(txt)
	{
	 debugga(txt);	
		
	}
	
	 function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}


 function refreshGara(forcerefresh,options){
	  var opt = { 
		       
				callback: null
        };
        $.extend(opt, options);
	
	 refreshCronaca();
	
	   oldupdatetext=$("#gara #ulinfogara li span.left").html();
	   
	   $("#gara #ulinfogara li span.left").html("Aggiornamento...");
    /*$.mobile.loading( 'show', {
	text: 'Caricamento in corso..',
	textVisible: true,
	theme: 'b',
	html: ""
	});*/
	
	
	/*   $.ajax({
		type: "GET",
		url: "atleti.xml",
		dataType: "xml",
		success: function(axml) {
		 atleti_xml=axml;
		 $atleti=$(axml);
		 sdebug("caricati "+$atleti.find("atleta").length+" atleti");
		 
	   */
	   
	   var doRefresh=false;
	   
	   colog("gara: "+JSON.stringify($gara));
	   var gara=$gara;
	   //console.log(JSON.stringify(gara));
	   
	  $("#gara #hdr").find("#hgara a").html(gara.doc.location+" -     "+gara.doc.data);
	    $("#hdriscritti").find("h1").html(gara.doc.title+" "+gara.doc.location+" -     "+gara.doc.data);
	   
	   var arriscritti=gara.doc.iscritti.split(",");
	   var niscritti=arriscritti.length;
	   
	   $("#ligaratitle").html("Gara: <b>"+gara.doc.title+"</b>");
	   $("#ligaralocation").html("Location: "+gara.doc.location);
	   $("#liiscritti").text(niscritti+" atleti iscritti ");
	    //var mf=getMaschiFemmine();
        datagara=gara.doc.data;
         
		var arrd=datagara.split("/");
        annogara=arrd[2];		
	   
	   
	     var d = new Date();  // 30 Jan 2011
         // var dd=formatDateTime(d);  // '30.01.11'
	   /*
	   	  $("#gara li.liprog").find("span").html("Aggiornato: "+dd);
		  $("#gara li.liatleta").find("span").html("Aggiornato: "+dd);
		  $("#gara li.linotify").find("span").html("Aggiornato: "+dd);
	   */
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   return;
	   
	    $gara=getGaraById(garaid);
	   
	   $.ajax({
		type: "GET",
		url: rooturl+"/gare/findall/xml",
		dataType: "xml",
		success: function(gxml) {
			
			gare_xml=gxml;
		   $gare=$(gxml);
		 
		 if ($.trim(searchgara)!="")
		 {
		  $gare.find("gara").each(function() {
		    var loc=$(this).find("location").text();
			var id=$(this).find("id").text();
			
			if (loc.toLowerCase().indexOf(searchgara.toLowerCase())>-1)
			{
			 $gara=getGaraById(id);
			 garaid=id;
			}
		  });
		 
		 } else
		 {
		   $gara=getGaraById(garaid);
		 }  
		 
		 sdebug("garaid "+garaid);
		 
		 
		 
		 
		 sdebug("caricate "+$gare.find("gara").length+" gare");
		 
		 matchfile="matches_"+garaid+".xml";
		 //matchfile="matches.xml";
		 
		 //alert(g.length);
	     
	 //alert("deccomi");
	  // $("#hdr").find("h1").html("Gara "+$gara.find("title").text()+" "+$gara.find("location").text()+" - "+$gara.find("data").text());
	   $("#gara #hdr").find("#hgara a").html($gara.find("location").text()+" -     "+$gara.find("data").text());
	    $("#hdriscritti").find("h1").html($gara.find("title").text()+" "+$gara.find("location").text()+" -     "+$gara.find("data").text());
	   
	   var arriscritti=$gara.find("iscritti").text().split(",");
	   var niscritti=arriscritti.length;
	   
	   $("#ligaratitle").html("Gara: <b>"+$gara.find("title").text()+"</b>");
	   $("#ligaralocation").html("Location: "+$gara.find("location").text());
	   $("#liiscritti").text(niscritti+" atleti iscritti ");
	  
        datagara=$gara.find("data").text();
         
		var arrd=datagara.split("/");
        annogara=arrd[2];		
		
   
         xgare = $.parseXML( gares_xml );
  
       //  $gare = $( xgare );

		//refreshMeByProg();
		
	
		//if (refreshMode=="byatleta") refreshMeByAtleta(xml);
		
		
		  
		 
		  $.ajax({
		type: "GET",
		url: rooturl+matchfile,
		dataType: "xml",
		success: function(mxml) {
			 //debug($matches);
			 matches_xml=mxml;
			 var $newmatches=$(mxml);
			 
			if (1==1)  //compare by date
			{
			   var $a=$newmatches.find("matches").clone();
			   if ($matches!=null) {
				 var $b=$matches.find("matches").clone();
				 
				 if ($b.find("match").length!=$a.find("match").length)  //hanno lunghezze diverse
				 {
				  sdebug("diverso numero di match")	 ;
				  doRefresh=true;
				 } else {    //stessa lunghezza, controllo date
					 sdebug("ugual numero di match");
					 var $diff=compareByDate($b,$a,"match");
				    if ($diff.find("match").length>0)
				    {
				     sdebug($diff.find("match").length+" differenze di lastupdate")	;
				     doRefresh=true;
				    } else
					{
					 sdebug("0 differenze di lastupdate");
					 doRefresh=false;
					}
				 }
				 
			 } else doRefresh=true; //prima volta
	
				
			}				
			 
		   if (1==0)	 //compare by xml 
		   { 
			 
			 //alert($matches.find("matches").html());
			 sdebug("$(mxml):"+$newmatches.find("matches").html());
			 var h=$newmatches.find("matches").html();
			 var $a=$newmatches.find("matches").clone();
			 if ($matches!=null) {
				 sdebug("$matches: "+$matches.find("match").length);
				 sdebug($matches.find("matches").html());
				 var $b=$matches.find("matches").clone();
				 compareXmlFile($b,$a,"match");
			 }
		   } 
		  /*if ($matches==$(mxml)) {
			  doRefresh=false;
			  debug("nessun aggiornamento");
			  
		  } */
		  $matches=$(mxml);
		  sdebug("caricati "+$matches.find("match").length+" match");
		  setActiveTab(activeTab);
		  
		  if (forcerefresh) doRefresh=true;
		
		if (doRefresh)
		{	
	  
	     sdebug("launching refresh");
		 $("#ulinfogara li span.left").html("Scarico aggiornamenti");
		 refreshMeByAtleta();
		 refreshMeByProg({
		   callback: opt.callback
		 });
		
		} else {
		  sdebug("no refresh to perform");
		  //$("#ulinfogara li").html(oldupdatetext);
		   $("#ulinfogara li span.left").html(sgetMedaglieGara(garaid));
		   $("#limatches").html($matches.find("match").length+" incontri");
		  var d = new Date();  // 30 Jan 2011
          var dd=formatDateTime(d);  // '30.01.11'
		  sdebug("data "+dd);
		  $("li.liprog").find("span").html("Aggiornato: "+dd);
		  $("li.liatleta").find("span").html("Aggiornato: "+dd);
		  $("li.linotify").find("span").html("Aggiornato: "+dd);
		}
		 //refreshCronaca();
		//refreshCronaca();
	     initButtons();	
		if (first) {
		 setInt();
		 first=false;
        }		 
		//setIntCronaca();
		$("div.tb").remove();
		//$.mobile.loading( 'hide');
		
		
		  //alert(matches_xml);
			
			
			
			//fine match.xml
		
		
		
		
		}  
     }); //chiusura match.xml	
	 
	 }
	 });
	 /*}
     });*/	 	  
	 }
	 
	 
	 function getMaschiFemmine($m,su_cosa){
		 colog("getmaschifemmine");
		 colog(jcurrentgara.iscritti)
		 var iscritti=jcurrentgara.iscritti.split(",");
		 var maschi=0;
		 var femmine=0;
		 $($m).each(function(i){
			  //console.log("$M: "+JSON.stringify($m[i]))
			  var $a;
			  if (su_cosa=="iscritti"){
				  $a=getAtletaById($m[i]);
			  } else $a=getAtletaById($m[i].doc.atletaid);
			  
			  var sesso="M";
			  if ($a.sesso) sesso=$a.sesso.toUpperCase();
			  
			  if (sesso=="M") maschi++;
			  if (sesso=="F") femmine++;
			  //console.log($a.cognome+" "+$a.nome+" - "+sesso);
			 
		 })
		 var retvalue={
			 maschi: maschi,
			 femmine: femmine
		 }
		 
		  return retvalue;
		 
	
		 
		 
		 
	 }
	 
	 
	 function refreshCronaca()
	 {
		 
	 }
	 
		
	
function getMedaglieGara($m)
	{
		//alert($m);
	var ori=0;
	  var argenti=0;
	  var bronzi=0;
	 $($m.rows).each(function(i) {
	  var match=$m.rows[i].doc;
	  var mid=match.garaid;
	  var datanasc=match.datanascita;
	  var med=$.trim(match.medagliamatch);
	  //debug(med);
	  //var computa=false;
	  var computa=true;
	  /*
	   if ($.trim(viewcat)!="")
		{
		var catatleta=getCategoria(datanasc);
        sdebug("categoria : "+catatleta);				  
		if  ($.trim(viewcat)==$.trim(catatleta)) computa=true;	 
					 
		} else computa=true;
	  */ 
	  if (computa)
	  {
	   if ($.trim(med)=="oro") ori++;
	   if ($.trim(med)=="argento") argenti++;
	   if ($.trim(med)=="bronzo") bronzi++;
	  
	  
	  }
	 
	 });
	 var retvalue="<span style='color: yellow;'>ORI: <b>"+ori+"</b></span>&nbsp;&nbsp;&nbsp;<span style='color: silver;'>ARG: <b>"+argenti+"</b></span>&nbsp;&nbsp;&nbsp;<span style='color: orange;'>BRO: <b>"+bronzi+"</b></span>";
	 return retvalue;
	
	}
	
	
	function getCategoria(dn,useCurrentDate)
	{
	
     var cat="senior a";		 
	 var curyear=new Date().getFullYear();
	 //console.log("curyear "+curyear)
	 if (useCurrentDate!=true){
	  var arrd=jcurrentgara.data.split("/");
      var annogara=arrd[2];
	  curyear=annogara;
	 }
	 //sdebug("curyear: "+curyear);
     
	 if ($.trim(dn)=="") {
		 return "senior b";
	 }
     var ar=dn.split(".");	
     var byear=ar[2];	 
	 
	 var eta=parseInt(curyear,10)-parseInt(byear,10);
	 //sdebug("calcolo età: "+eta);
	 
	 if ((eta>=18) && (eta<=35)) cat="senior a"; 
	 if ((eta>=15) && (eta<=17)) cat="junior"; 
	 if ((eta>=12) && (eta<=14)) cat="cadetti a"; 
	 if ((eta>=10) && (eta<=11)) cat="cadetti b"; 
	 if (eta>35) cat="senior b";
	 if (eta<10) cat="esordienti";
	
	 
	 return cat	
		
	}
	
	function showIscritti(){
	
     refreshIscritti();
	 //$.mobile.changePage("iscritti.html");
	 $.mobile.changePage("#iscrittiPage");
	


	
	}
	
	function refreshIscritti() {
	  var iscritti=jcurrentgara.iscritti;
     colog("iscritti: "+iscritti);
	 var arr=iscritti.split(",");
	 if (iscritti.trim()=="") arr=[];
	 //alert(arr.length)
	 
	 var html="";
	 var atls=[];
	
	$(arr).each(function(i){
		 
		 var at=getAtletaById(arr[i]);
		 var doc={};
		 doc.nome=at.cognome+" "+at.nome;
		 doc.id=at.id;
		 atls.push(doc);
		 
		 
	 })
	 
	 
	 
	 atls.sort(function(a,b){
		var a1=a.nome.trim();
		var b1=b.nome.trim();
		//console.log("nomi a1b1: "+a1+" - "+b1);
        if (a1>b1) return 1;		
		if (a1<b1) return -1;
		return 0;
		 
	 });

	 html= new EJS({url: 'tpl/iscritti.ejs'}).render(atls); 
	 
	  /*$(atls).each(function(i){
		  
		  html+="<li><a href='#'>"+atls[i]+"</a></li>"; 
		  
	  })*/
	 
	 
	
	 var lista=$("#iscrittiPage #uliscritti");
	 lista.empty();
	 lista.append(html);
	 lista.listview();
	 lista.listview("refresh");
	 
	 $("#iscrittiPage #infogaraiscritti").html(atls.length+" iscritti");
	 
	
	
		
	}
	
	function getAtletaById(id,campo)
{
 //return "mango";
 //debug("getAtletaNameById("+id+")");
 var retvalue="";
 

 
 $($atleti.rows).each(function(i) {
	         var atl=$atleti.rows[i].doc;
		     var aid=atl.id;
			 var cognome=atl.cognome;
			 var nome=atl.nome;
			 //debug(aid+" "+cognome+" "+nome);
			 if (aid==id) {
			  retvalue=atl;
			  return retvalue;
			 }
			 
 });
		 
	
 return retvalue;
}


function showMatchesForAtleta(id)
{
 var $matchesForAtleta=[];	
 var atl=getAtletaById(id);
 selectedAtl=atl;
// alert($matches.rows.length)
 $($allmatches.rows).each(function(i){
	 
	 var match=$allmatches.rows[i];
	 var aid=match.doc.atletaid;
	 if (aid==id)
	 {
	  $matchesForAtleta.push(match);	 
		 
	 }
	 
	 
 })	
 
 $matchesForAtleta.sort(function(a,b){
	 var a1=a.doc.progid;
	 var b1=b.doc.progid;
	 if (a1>b1) return 1;
	 if (a1<b1) return -1;
	 return 0;
	 
 })
	
 //console.log(JSON.stringify($matchesForAtleta));	
 
 var html= new EJS({url: 'tpl/matchesforatleta.ejs'}).render($matchesForAtleta); 
 
 var lista=$("#matchesatleta #listampa");
 lista.empty();
 lista.append(html);
 $(document).off( 'taphold', '#matchesatleta ul#listampa li');
 $(document).on( 'taphold', '#matchesatleta ul#listampa li', function(event){
 if (!loggedin) return;
            
			    $(this).addClass("tapped");
				var id=$(this).attr("id").replace("match_","");
				delmatchid=id;
				if (jcurrentgara.stato!="disputata")  $("#popDelMatch").popup('open');
              //alert('Hello');
            });      

 $("#matchesatleta #mparecnum").html($matchesForAtleta.length+" incontri per "+atl.cognome+" "+atl.nome);

 
	
}

function sysMsg(dest)
	 {
	  var pageid=$.mobile.activePage.attr('id');	 
	  var destsocket="";	 
	  if (dest) {
		  destsocket=dest;
		  
	  }	 
	  //alert(destsocket)
	 if (!loggedin) return;
		 /*
	  sdebug("setresult");
	  var li=$(obj).closest("li");
	  li.addClass("liselected");
	  
	  var id=li.attr("id").replace("match_","");
	  sdebug("clicked matchid: "+id);
	  selectedid=id;

	  //selectedmatchid=li.attr("tkdr-matchid");
	  //alert(li.attr("id"));
	  //$('#popResult #radio_vinto').attr('checked', true);
	  */
	  var d={
		  destsocket: destsocket
	  };
	  var html= new EJS({url: 'tpl/sysmsg.ejs'}).render(d); 
	  $("#"+pageid+" div[data-role=content]").append(html);
	  $("#"+pageid+" #popSysMsg #dest").val(destsocket);
	  $("#"+pageid+" #popSysMsg").popup();
	  $("#"+pageid+" #popSysMsg").popup("open");
	 }
	 
	 
	 function sysMsgOk(){
		 //alert("sysmsgok")
		 var pageid=$.mobile.activePage.attr('id');
		 var text=$("#"+pageid+" #popSysMsg #tamsg").val();
		 var dest=$("#"+pageid+" #popSysMsg #dest").val();
		 
		 if (text.trim()==""){
			  $("#gara #popSysMsg").popup("close").remove();
			  return;
		 
		 } 
		 //alert(text)
		 var msg_to="all";
		 if (dest.trim()!="") msg_to=dest;
		 socketNotify({
			 type: "notification",
			 to: msg_to,
			 text: text
			
			 //updategara: "yes"
			 
		 })
		 
		 
		 $("#"+pageid+" #popSysMsg").popup("close").remove();
	 }
	 
	  function sysMsgCancel(){
		 var pageid=$.mobile.activePage.attr('id');
		 $("#"+pageid+" #popSysMsg").popup("close").remove();
		 
		 
	 }
	 
	 
	  function popGareOk(){
		 
		 $("#gare #popGare").popup("close").remove();
		 
		 
	 }

	 
	  function popGareCancel(){
		 
		 $("#gare #popGare").popup("close").remove();
		 
		 
	 }


  function setResult(obj)
	 {
	  if (!loggedin) return;
	  var stato=jcurrentgara.stato;
	  var esci=false;
	  if (stato=="disputata") esci=true;
	  if (esci) return;
	  sdebug("setresult");
	  var li=$(obj).closest("li");
	  li.addClass("liselected");
	  
	  var id=li.attr("id").replace("match_","");
	  sdebug("clicked matchid: "+id);
	  selectedid=id;

	  selectedmatchid=li.attr("tkdr-matchid");
	  //alert(li.attr("id"));
	  //$('#popResult #radio_vinto').prop('checked', true).checkboxradio('refresh');
	  $('#popResult #risult').val("");
	  $('#popResult #checkgp').prop('checked', false).checkboxradio('refresh');
	  $("#popResult").popup("open");
	 }
	 
	 
	function setResultById(id,obj)
	 {
	 
	  if (!loggedin) return;
	  
	  var stato=jcurrentgara.stato;
	  var $m=filterRows($allmatches,{ id: id});
	  
	  
	  var esci=false;
	  if ($m.rows.length==0) esci=true;
	  if (stato=="disputata") esci=true;
	  if (esci) return;
	  colog("setresultbyid "+id);
	  colog($m);
	  
	  //var li=$(obj).closest("li");
	  //li.addClass("liselected");
	  
	  //var id=li.attr("id").replace("match_","");
	  sdebug("setting result2 for matchid: "+id);
	  selectedid=id;

	  selectedmatchid=$m.rows[0].doc.matchid;
	  //alert(li.attr("id"));
	  //$('#popResult #radio_vinto').prop('checked', true).checkboxradio('refresh');
	  $('#popResult #risult').val(obj.risultato);
	  
	  var ckgp=false;
	  if (obj.goldenpoint){
		  if (obj.glodenpoint=="yes") ckgp=true;
	  }
	  $('#popResult #checkgp').prop('checked', ckgp).checkboxradio('refresh');
	  //$("#popResult").popup("open");
	 }
	 function setResultCancel()
	 {
	     $("ul#listampa li").removeClass("liselected");
		 $("#popResult").popup("close");
		 selectedid="";
		 selectedmatchid="";
	 }
	 function setResultOK()
	 {
	  var notifica=true;	 
	  progressStart("Aggiornamento..","Aggiornamento");	 
	  var cronacatxt="";
	  var derbytext="";
	  var ordarr=new Array("primo","secondo","terzo","quarto","quinto","sesto","settimo","ottavo","nono","decimo");
	  var ordbinarr=new Array("finale","semifinale","quarto di finale","ottavo di finale","sedicesimo di finale","trentaduesimo di finale");
      var result=$("#popResult #risult").val();
	  var goldenpoint=$("#popResult #checkgp").prop("checked");
	  //alert(goldenpoint);
	  //return;
	 
	 //alert($("ul#lista li.liselected").length);
	 
	 var id=selectedid;
	 var selectedatletaname=selectedAtl.cognome+" "+selectedAtl.nome;
	 var selectedcat=getCategoria(selectedAtl.datanascita);
	 var name=selectedAtl.cognome+" "+selectedAtl.nome;
	 //alert(id);
	 
	 var valore=$("input:radio[name=radio-choice-0]:checked").val();
	 //alert(v);
	 
	 
	
	 	  
	  var url="updagent.php?action=edit&tag=match";
	  
	  var urln="/matches/update/"+jcurrentgara.id+"/"+id;
	  
	    var ln=$("#matchesatleta ul#listampa li").length;
	   var ord=$("#matchesatleta ul#listampa li#match_"+id).index();
	   var ordbin=ln-ord-1;
	   var nextordbin=ordbin-1;
	   //alert(ordbinarr[ordbin])
	   //if (nextordbin>-1) alert(ordbinarr[nextordbin])
	   
	
	  var v="";
	  var d="";
	  var dd="";
	  var ris="";
	   var med="none";
	   
	   var vintotxt="vince";
	  
	  if (valore=="nondisputato")
	  {
	   v="no";
	   dd="yes";
	   d="no";
	   med="none";
	   notifica=false;
	   
	  } else
	  {
	  if (valore=="vinto") {
	  v="yes";
	  vintotxt="vince";
	  
	  }
	  if (valore=="perso") {
	  v="no";
	   vintotxt="perde";
	  }
	  d="yes";
	  dd="yes";
	  var nincontro=selectedmatchid;
	  var eunico="";
	  if (ln==1) eunico=" e unico ";
	  
	  var thisincontro="";
	  if (ordbin<4) thisincontro=", "+ordbinarr[ordbin];
	  cronacatxt+=selectedatletaname+" "+vintotxt+" il suo "+ordarr[ord]+" "+eunico+"incontro (n."+nincontro+thisincontro+") ";
	  if ($.trim(result)!="") cronacatxt+=" per "+result;
	  if (goldenpoint) cronacatxt+=" al golden point "
	  var escl="";
	  if (nextordbin<2) escl=" !!";
	  if ((nextordbin>-1) && (v=="yes")) cronacatxt+=" e va in "+ordbinarr[nextordbin]+escl+". ";
	  
	 
	  }
	  
	  var doc={
		  vinto: v,
		  disputato: d,
		  dadisputare: dd
       }
	  
	  
	   
	   url+="&id="+id;
	   url+="&garaid="+garaid;
	   url+="&vinto="+v;
	   url+="&disputato="+d;
	   url+="&dadisputare="+dd;
	   if ($.trim(result)!="") {
		 url+="&risultato="+result;
         doc.risultato=result;		 
		   
	   } 
	   
	 
	   
	   sdebug("ln: "+ln);
	   sdebug("ord: "+ord);
	  
	   if (parseInt(ord,10)==(parseInt(ln,10)-1))
	   {
	    if (d=="yes")
		{
	     if (v=="no") med="argento";
		 if (v=="yes") med="oro";
	    } else med="none";
	   }
	   
	   if (parseInt(ord,10)==(parseInt(ln,10)-2))
	   {
	    if (d=="yes")
		{
	     if (v=="no") med="bronzo";
		} else med="none"; 
		
	   
	   }
	   
	   if (med!="none") cronacatxt+=". E' "+med.toUpperCase()+" !";
	   
	   url+="&medagliamatch="+med;
	   doc.medagliamatch=med;
	  
	   //alert(ord);
	   
	   
	   
	   var nextgarecount=0;
	   $("#matchesatleta ul#listampa li").each(function(i) {
	      var id=$(this).attr("id").replace("match_","");
	      var urlx="updagent.php?action=edit&tag=match&garaid="+garaid+"&id="+id;
		  var pdoc={
			  
		  };
		  if (i<ord)
		  {
		   sdebug("gara precedente "+i);
		   if (d=="yes")
		   {
		    urlx+="&disputato=yes&vinto=yes&dadisputare=yes&medagliamatch=none";
			pdoc.disputato="yes";
			pdoc.vinto="yes";
			pdoc.dadisputare="yes";
			pdoc.medagliamatch="none";
		   
		   }
		   
		    sdebug(urlx);
			
			
			urlx="/matches/update/"+jcurrentgara.id+"/"+id;
			
			$.ajax({
			type: "POST",
			url: rooturl+urlx,
			data: pdoc,
			async: false
			});
			
		    /*$.post(urlx,{ a: '1'},function() {
			});*/
		  
		  }
		  
		  if (i>ord)
		  {
		   sdebug("gara successiva "+i);
		   nextgarecount++;
		   if (nextgarecount==1){
			   
			  // alert("prossima gara: "+id);
			  
			   var derbies=getDerby(id,selectedcat);
			   
			   $(derbies.rows).each(function(i){
				   colog("derby con "+derbies.rows[i].doc.atletaname);
				   derbytext=" .Sarà derby con "+derbies.rows[i].doc.atletaname+" al "+derbies.rows[i].doc.matchid+" ! "
				   var did=derbies.rows[i].doc.id;
				   var  urld="/matches/update/"+jcurrentgara.id+"/"+did;
				
				if (v=="yes")
				{	
					$.ajax({
					type: "POST",
					url: rooturl+ urld,
					data: {
						derby: id
					},
					async: false
					});
					
					urld="/matches/update/"+jcurrentgara.id+"/"+id;
					$.ajax({
					type: "POST",
					url: rooturl+ urld,
					data: {
						derby: did
					},
					async: false
					});
					
					 } else {
				   
				   $.ajax({
					type: "POST",
					url: rooturl+ urld,
					data: {
						derby: null
					},
					async: false
					});
					
					urld="/matches/update/"+jcurrentgara.id+"/"+id;
					$.ajax({
					type: "POST",
					url: rooturl+ urld,
					data: {
						derby: null
					},
					async: false
					});
				   
				   
			   }
				   
			   })
			  
			   
			   
			   nextgarecount=0;
		   }
		   
		   
		   
		   if (d=="yes")
		   {
		    if (v=="yes")
			{
		     urlx+="&disputato=no&vinto=no&dadisputare=yes&medagliamatch=none";
			 	pdoc.disputato="no";
			pdoc.vinto="no";
			pdoc.dadisputare="yes";
			pdoc.medagliamatch="none";
		    } 
			if (v=="no")
			{
		     urlx+="&disputato=no&vinto=no&dadisputare=no&medagliamatch=none";
			 	pdoc.disputato="no";
			pdoc.vinto="no";
			pdoc.dadisputare="no";
			pdoc.medagliamatch="none";
		    } 
		   }
		   
		   if (d=="no")
		   {
		     urlx+="&disputato=no&vinto=no&dadisputare=yes&medagliamatch=none";
			 	pdoc.disputato="no";
			pdoc.vinto="no";
			pdoc.dadisputare="yes";
			pdoc.medagliamatch="none";
		   }
		   
		   
		    urlx="/matches/update/"+jcurrentgara.id+"/"+id;
		    sdebug(urlx);
			$.ajax({
			type: "POST",
			url: rooturl+ urlx,
			data: pdoc,
			async: false
			});
			
		    /*$.post(urlx,{ a: '1'},function() {
			});*/
		  
		  }
		  
		 
	   });
	   
	   
	   cronacatxt+=derbytext;
	   var cronurl="savecronaca.php?garaid="+garaid+"&text="+encodeURI(cronacatxt);
	   
	   cronurl="/matches/addcronaca/"+jcurrentgara.id;
	   
	   $.post(rooturl+urln,doc,function() {
	     
		   $("#popResult").popup('close');  
		   var atletaid=$("ul#listampa li.liselected").find("input:hidden.atletaid").val();
	    $("#matchesatleta ul#listampa li").removeClass("liselected");
		
		 
		 
		 var na=getCookie("notifiche_atleta");
		 if (na) {
			 if (na.trim()!=""){
				if (na.indexOf(selectedAtl.id.trim())>-1)
                {
				 //sendGCM(cronacatxt);	
			     //notify(cronacatxt);  		
				}					
				 
			 }
			 
			
			 
		 }
		 
		 //manda notifica ad altri device
		 
		 if (notifica) {
		 socketNotify({
			 type: "notification",
			 to: "all",
			 text: cronacatxt,
			 garaid: jcurrentgara.id,
			 updategara: "yes"
			 
		 })
		 }
		 //sendGCM(cronacatxt);
		  $.ajax({
			type: "POST",
			url: rooturl+cronurl,
			async: false,
			data: { text: cronacatxt}
			},function() {
					
				loadCronaca();
			 
		     });
		 
		  refreshMatches(function(){
			     
			 	 showMatchesForAtleta(selectedAtl.id);
				 progressStop();
		  });		 
		
				
			
		 
		
		  
	
		
		
		/*
		
		 */
		
		
		
		
	  
	});
	 }
	 
	 
	 function getDerby(id,category){
		 colog("getDerby for matchid "+id+" in category "+category);
		 var retvalue={ rows:[]};
		 var samemid={ rows:[]}
		 colog("allmatches")
		 colog($allmatches)
		 var $r=filterRows($allmatches,{ id: id});
			   
			   console.log("$r-->"+JSON.stringify($r))
			   
			   var mid=$r.rows[0].doc.matchid;
			   var dn=$r.rows[0].doc.datanascita;
			   var cat=getCategoria(dn);
			  
			   var $r1=filterRows($allmatches,{ matchid: mid, dadisputare: "yes", disputato: "no"})
			    colog("incontri con matchid="+mid+": "+$r1.rows.length+" in categoria "+cat);
			 $($r1.rows).each(function(i){
				 var row=$r1.rows[i];
				 var rid=row.doc.id;
				 if (rid!=id) {
					 var cat=getCategoria(row.doc.datanascita);
					 var doIt=true;
					 if (cat.trim().toLowerCase()!=category.trim().toLowerCase()){
						 doIt=false;
						 colog("match "+mid+" in category "+cat+" ignored, searching for category "+category);
						 }
					 if (doIt) samemid.rows.push(row);
					//retvalue.rows.push(row);
					 
				 }
				 
				 
				 
			 })	
			 
			 
			 //determina se i presunti derby siano il prossimo incontro dell'atleta derbeggiante
			 
			$(samemid.rows).each(function(i){
				 var row=samemid.rows[i];
				 var aname=row.doc.atletaname;
				 var aid=row.doc.atletaid;
				 
				
				var $ia=filterRows($allmatches,{
				   atletaid: aid
				 
			    })
				
				$ia.rows.sort(function(a,b){
					var a1=a.doc.matchid;
					var b1=b.doc.matchid;
					if (a1>b1) return 1;
					if (a1<b1) return -1;
					return 0;
				})
				var iord=0;
				colog("analisi incontri di "+aname);
				$($ia.rows).each(function(j){
					var row=$ia.rows[j];
					var mmid=row.doc.matchid;
					var disp=row.doc.disputato;
					var dadisp=row.doc.dadisputare;
					
					
					
					var eligible=false;
				
					
					if ((disp=="no") && (dadisp=="yes")) {
						
						iord++;
						eligible=true;
				    }	
					colog("matchid "+mmid+" - eligible: "+eligible)					
					if ((mmid==mid) && (iord==1)) {
					  retvalue.rows.push(row);
                      colog("è il primo prossimo incontro, DERBY OK") 					  
						
					}
				})
				//alert($ia.rows.length+" incontri per "+aname)
				
				
			}) 
			
				
		 colog("Derby trovati per match id "+id+": "+retvalue.rows.length)		
		 return retvalue;
		 
	 }
	 
	  
	 function addMatch() {

  $("#popAddMatch").popup('open');

}

function addMatchCancel() {
	$("#popAddMatch").popup('close');
	
}

var mf={ maschi: "0", femmine: "0"};
function refreshMatches(cb){
	colog("RefreshMatches");
	$("#gara .medals").html("Caricamento in corso...")	
	mf={ maschi: "0", femmine: "0"};
	loadMatchesByProg(jcurrentgara.id,{
					
		callback: function() {
			progressStop();
			if (cb) cb(); 
			//console.log("MATCHES.LENGHT: "+$matches.rows.length);
			//mf=getMaschiFemmine(iscrittiincat,"iscritti");
			
			// $("#limaschifemmine").text("M:"+mf.maschi+" - F: "+mf.femmine);
			//console.log(JSON.stringify(mf))
		}
	});
	
    loadMatchesByAtleta(jcurrentgara.id);
    loadCronaca(jcurrentgara.id);
	if (autorefresh) {
		
	  setMatchesRefresh();	
	}
}

 function addMatchOK()
 {
	  var $mid=$("#matchid");
	
	var progid=$mid.val().substring(1);
	//var datanascita=$atleta.find("datanascita").text();
	var datanascita=selectedAtl.datanascita;
	var atletaname=selectedAtl.cognome+" "+selectedAtl.nome;
	var atletaid=selectedAtl.id;
	//var atletaname=$atleta.find("cognome").text()+" "+$atleta.find("nome").text();
	//alert(datanascita);
	//return;
	
	var doc={
		 progid: progid,
		 garaid: jcurrentgara.id,
		 atletaid: atletaid,
		 atletaname: atletaname,
		 risultato: "",
		 ordine: "1",
		 vinto: "no",
		 disputato: "no",
		 dadisputare: "yes",
		 matchid: $mid.val(),
		 lastupdate: "never",
		 datanascita: datanascita
		
	}
	
	
	
	//console.log(JSON.stringify(doc));
	
	   $.ajax({
			url: rooturl+"/matches/add/"+jcurrentgara.id,
            type: "POST",
            data: doc})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			console.log("error");
			}	else {
				console.log("posted")
				//var derbies=getDerby(id);
				$(data.addedmatches.rows).each(function(i){
					
					var row=data.addedmatches.rows[i];
					var addedid=row.doc.id;
					var cat=getCategoria(row.doc.datanascita);
					colog("derbies");
					colog("$allmatches")
					colog($allmatches);
					$allmatches.rows.push(row);
					var derbies=getDerby(addedid,cat);
					colog(derbies);
					if (derbies.rows.length>0) {
					if ($allmatches.rows.length>0) 
					{
						//set derby on me 
						var derbyid=derbies.rows[0].doc.id;
						//$allmatches.rows[$allmatches.rows.length-1].derby=derbyid;
						
						 var  urld="/matches/update/"+jcurrentgara.id+"/"+addedid;
				
					$.ajax({
					type: "POST",
					url: rooturl+ urld,
					data: {
						derby: derbyid
					},
					async: false
					});
					
					urld="/matches/update/"+jcurrentgara.id+"/"+derbyid;
					$.ajax({
					type: "POST",
					url: rooturl+ urld,
					data: {
						derby: addedid
					},
					async: false
					});
					
					
						
						
						//set derby on the other one
						/*$($allmatches.rows).each(function(i){
							var did=$allmatches.rows[i].doc.id;
							if (did==derbyid){
								
								$allmatches.rows[i].doc.derby=addedid;
							}
							
						})*/
						//var r=filterRows($allmatches,{ id: derbies.rows[0].doc.id})
					}					
					}
					
				})
				toast("Match "+doc.matchid+" added for atleta "+selectedAtl.cognome+" "+selectedAtl.nome);
				refreshMatches(function() {
					$("#popAddMatch").popup("close");
					showMatchesForAtleta(selectedAtl.id)
					
				})
				
				
				
					  
	
				 
	/*			 				$.ajax({
                   url: rooturl+"/matches/findbygaraid/"+jcurrentgara.id,
                  type: "GET"})
                .done(function(data) {
			 //alert(JSON.stringify(data));
			      $matches=data;
			     $allmatches=data;
				 gara.loadById(jcurrentgara.id,function(){
					 
					showMatchesForAtleta(selectedAtl.id) 
				 })
				  
				})
                 .fail(function() {
					 toast("Error getting matches for gara "+jcurrentgara.id,"long");
					 
				 })		
*/				 
				//refreshGareServer();
			
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
		 

	  
 }
	 
	 
	 function test() {
		 var $a=filterRows($allmatches,{
			 /*progid:"01",*/
			 vinto: "yes",
			 datanascita: ".2003"
		 });
		 //console.log($a.rows.length+" results")
		 //console.log(JSON.stringify($a));
		 
		  var html = new EJS({url: 'tpl/matchesbyprog.ejs'}).render($a.rows); 
			  var listaname="listabyprog";
		   var listview=$("ul#"+listaname);
		   listview.empty();
		   listview.append(html);
		   listview.listview();
		   listview.listview("refresh");
		   $("#limatches").html($matches.rows.length+" incontri")
		   $("#gara #ulinfogara span").html(getMedaglieGara($matches));
		 
	 }
	 
	 function filterAndRender(filter){
		 colog("filterandrender "+JSON.stringify(filter));
		 var $a=filterRows($allmatches,filter);
		 //console.log($a.rows.length+" results")
		 //console.log(JSON.stringify($a));
		 
		  var html = new EJS({url: 'tpl/matchesbyprog.ejs'}).render($a.rows); 
			  var listaname="listabyprog";
		   var listview=$("ul#"+listaname);
		   listview.empty();
		   listview.append(html);
		   listview.listview();
		   listview.listview("refresh");
		   
		  
		   var $b=filterRows($a,{ dadisputare: "yes"});
		   var $c=filterRows($b,{ disputato: "yes"});
		   
		   var $v=filterRows($b,{ vinto: "yes"});
		   var $p=filterRows($b,{ vinto: "no"});
		   
		   var mtext=$b.rows.length+" incontri da disputare"
		   mtext+="<br>"+$b.rows.length+" incontri disputati, "+$v.length+" vinti, "+$p.length+" persi"
		   
		   $("#limatches").html(mtext)
		  
		   $("#gara #ulinfogara span").html(getMedaglieGara($a));
		 
		 
	 }
	 
	 function filterRows($m,filt,exact) {
		 if (!exact) exact=false;
		 colog("filterrows: ")
		 console.log($m)
		 var $retrows={
			 rows: []
		 };
		 var rows = $m.rows; //[{person:"me", age :"30"},{person:"you",age:"25"}];
         
		 $(rows).each(function(i){
			 
			 var row=rows[i];
			 var eligible=true;
			 
			 for(var key in row.doc){
			 // console.log("key: "+key + " . "+ row.doc[key]);
              for (var fkey in filt){
				  if (fkey==key) {
					  //console.log("found key ---->"+fkey);
					  var v1=filt[fkey].toLowerCase();
					  if (v1.trim()!="")
					  {	  
					  var v2=row.doc[key].toLowerCase();
					  if (exact)
					  {
							if (v2.trim()==v1.trim()){
						 // console.log("found !: "+v2);
						 
							} else {
								eligible=eligible && false;
							}
					  } else {
							if (v2.indexOf(v1)>-1){
							// console.log("found !: "+v2);
						 
							} else {
								eligible=eligible && false;
							}
						  
						  
					  }
					  
					  }
					  
				  }
			  } 
            }
			if (eligible)  $retrows.rows.push(row);
    	 });
		 
		return $retrows; 
	 }
	 
	 
	 function searchMatches(){
		 
		 var result=[];
		 var vinti=0;
		 var persi=0;
		 var disputati=0;
		 var nondisputati=0;
		 var ori=0;
		 var argenti=0;
		 var bronzi=0;
		 var nomedaglia=0;
		 
		 var ssex="M";
		 
		 ssex=$("#searchMatches #sex").val();
		 var scat=$("#searchMatches #categ").val();
		  var smed=$("#searchMatches #medag").val();
		 
		 var filters=[
		 
		 {
		  name: "sesso",
          value: ssex		  
		 },
		 {
		  name: "categoria",
          value: scat		  
		 },
		 {
		  name: "medagliamatch",
          value: smed		  
		 }
		 /*
		 {
		  name: "atletaname",
          value: "morte"		  
		 }*/
		 ];
			 
		 var $amatches={rows: []}	 
		 $($allmatches.rows).each(function(i){
			 var adoc=$allmatches.rows[i].doc;
			 //console.log(JSON.stringify(doc));
			 var aid=adoc.atletaid;
			 var atl=getAtletaById(aid);
			 
			 //var docu=doc;
			 var docu={}
			 adoc.sesso=atl.sesso;
			 adoc.categoria=getCategoria(atl.datanascita);
			 //console.log(JSON.stringify(adoc))
			 docu=adoc;
			//  console.log(docu.sesso+" - "+docu.categoria)
			// console.log(JSON.stringify(docu))
			 
			 $amatches.rows.push(docu);
			 
		 });
		 
		  //console.log(JSON.stringify($amatches))
		 $($amatches.rows).each(function(i){
			 
			 var doc=$amatches.rows[i];
			 var eligible=true;
			 
			 $(filters).each(function(i){
				 var f=filters[i];
				 //console.log(JSON.stringify(f));
				 
				 
				 if (doc[f.name])
				 {	 
				 //console.log("applying filter");
				 var f1=doc[f.name].toLowerCase();
				 var f2="";
				 if (f.value!=null) f2=f.value.toLowerCase();
				 //console.log("f1: "+f1+" - f2:"+f2)
				 var checkit=true;
				 if (f2.trim()=="") checkit=false;
				 if (f2.trim()=="_") checkit=false;
				 if (checkit)
				 {	 
				 if (f1.indexOf(f2)==-1){
					 eligible=false;
					 
				 }
				 }
				 } else eligible=false;
				 
			 })
			 
			 //console.log("eligible: "+eligible);
			 
			 var atl=getAtletaById(doc.atletaid);
			 
			 //if (atl.sesso==ssex)
			 if (eligible)	 
			 {	 
			  result.push(doc);
			 }
			 
			 
			 
			 
			 
		 })
		 
		 
		 var htm="";
		 $(result).each(function(i) {
			htm+="<li>"+result[i].atletaname+" - "+result[i].matchid+"</li>";
			if (result[i].disputato=="yes")
			{	
			 if (result[i].vinto=="yes"){
				 vinti++
			 } else persi++
			 disputati++;
			 if (result[i].medagliamatch=="oro") ori++;
			 if (result[i].medagliamatch=="argento") argenti++;
			 if (result[i].medagliamatch=="bronzo") bronzi++;
			 
			} else nondisputati++;
		 })
		 $("#searchlist").empty();
		 $("#searchlist").append(htm);
		 $("#searchlist").listview();
		 $("#searchlist").listview("refresh");
		
		 
		 //console.log(JSON.stringify(result));
		 
		 var txt="";
		 
		 txt+="disputati: "+disputati+"<br>"
		 txt+="vinti: "+vinti+"<br>";
		 txt+="persi: "+persi+"<br>";
		 txt+="non disputati: "+nondisputati+"<br>";
		 txt+="ori: "+ori+"<br>";
		 txt+="argenti: "+argenti+"<br>";
		 txt+="bronzi: "+bronzi+"<br>";
		 
		 $("#searchMatches #searchResults").empty().html(txt);
		 
		 
	 }
	 
	 
	 function addGara(){
		 console.log("addgara");
		 $.mobile.changePage("#page_addgara");
		 
		 
	 }
	 
	 function addAtleta(){
		 console.log("addatleta");
		 $.mobile.changePage("#page_addatleta");
		 
		 
	 }
	 
	  function addAtletaOk(obj){
		  var page=$(obj).closest("div[data-role=page]");
		 //page.css("background","yellow");
		  var data={};
		 
		 var vcheck=checkValidAtletaForm(page);
		  if (vcheck.error==true){
			  
			  alert("Errore di inserimento:\n\n"+vcheck.errors);
			  return;
		  }
		 
		 page.find(".jform").each(function(){
			 var id=$(this).attr("id");
			 data[id]=$(this).val();
			 
			 
		 })
		 
		 
		
		 
		   $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/atleti/add",
            type: "POST",
            data: data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			console.log("error");
			}	else {
				console.log("posted")
				
				$.mobile.changePage("#page_atleti");
				refreshAtletiServer();
			
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
		 
		 
		 
	 }
	 
	 function addGaraOk(obj) {
		 var page=$(obj).closest("div[data-role=page]");
		  var vcheck=checkValidGaraForm(page);
		  if (vcheck.error==true){
			  
			  alert("Errore di inserimento:\n\n"+vcheck.errors);
			  return;
		  }
		 //page.css("background","yellow");
		  var data={};
		 
		 page.find(".jform").each(function(){
			 var id=$(this).attr("id");
			 data[id]=$(this).val();
			 
			 
		 })
		 
		 
		
		 
		   $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/gare/add",
            type: "POST",
            data: data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			console.log("error");
			}	else {
				console.log("posted")
				
				$.mobile.changePage("#gare");
				refreshGareServer();
			
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
		 
		 
	 }

	 
	  function editAtleta(obj){
		 console.log("editatleta");
		 var page=$(obj).closest("div[data-role=page]");
		 var hid=page.find("#atletaid");
		 var id=hid.val();
		 colog("Editing atletaid "+id);
		 
		 var atl=getAtletaById(id);
		 
		 console.log(atl)
		 
		 
		 //page.css("background","yellow");
		  var data={};
		 
		 $("#page_editatleta").find(".jform").each(function(){
			 
			 var campo=$(this).attr("id");
			 colog("campo "+campo+" - "+atl[campo])
			 $(this).val(atl[campo]);
			 //data[id]=$(this).val();
			 
			 
		 })
		  $("#page_editatleta").find("#atletaid").val(id);
		 
		 $.mobile.changePage("#page_editatleta");
		 
		 
	 }
	 
	 function checkValidGaraForm(page){
		 
		 var errors="";
		 var error=false;
		 var valore="";
		 
		 //check campi vuoti
		 var fields="location,title,data,stato"
		 var arr=fields.split(",");
		 $(arr).each(function(i){
			 var valore=page.find("#"+arr[i]).val();
			 if (valore.trim()==""){
			    error=true;
			    errors+="- il campo "+arr[i]+" non può essere vuoto\n";
			  }
			 
		 })
		 
		 //check data
		 valore=page.find("#data").val();
		 var arr=valore.split("/");
		 if (arr.length!=3){
			 error=true;
			 errors+="- la data deve essere nel formato gg/mm/aaaa\n";
		 }
		 
		 //check stato
		 valore=page.find("#stato").val();
		 var validstatuses="nondisputata,disputata,incorso";
		 var foundvalid=false;
		 var arrv=validstatuses.split(",");
		 $(arrv).each(function(i){
			 if (arrv[i]==valore) foundvalid=true;
			 
		 })
		 if (!foundvalid){
			 error=true;
			 errors+="- stato invalido, stati validi sono nondisputata,disputata,incorso\n";
			 
		 }
			 
			 
		
		 var retvalue={
			 error: error,
			 errors: errors
		 };
		 return retvalue;
		 
	 }
	 
	 function checkValidAtletaForm(page){
		 
		 var errors="";
		 var error=false;
		 var valore="";
		 //check nome e cognome
		 valore=page.find("#nome").val();
		 if (valore.trim()==""){
			 error=true;
			 errors+="- il nome non può essere vuoto\n";
		 }
		 valore=page.find("#cognome").val();
		 if (valore.trim()==""){
			 error=true;
			 errors+="- il cognome non può essere vuoto\n";
		 }
		 //check datanascita
		 valore=page.find("#datanascita").val();
		 var arr=valore.split(".");
		 if (arr.length!=3){
			 error=true;
			 errors+="- la data di nascita deve essere nel formato gg.mm.aaaa\n";
		 }
			 
			 
		
		 var retvalue={
			 error: error,
			 errors: errors
		 };
		 return retvalue;
		 
	 }
	 
	 function editAtletaOk(obj) {
		 var page=$(obj).closest("div[data-role=page]");
		  var hid=page.find("#atletaid").val();
		  //alert(hid);
		 //page.css("background","yellow");
		  var data={};
		  var vcheck=checkValidAtletaForm(page);
		  if (vcheck.error==true){
			  
			  alert("Errore di inserimento:\n\n"+vcheck.errors);
			  return;
		  }
		 
		 page.find(".jform").each(function(){
			 var id=$(this).attr("id");
			 data[id]=$(this).val();
			
			 
		 })
		 
		 
		
		 
		   $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/atleti/update/"+hid,
            type: "POST",
            data: data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			console.log("error");
			}	else {
				console.log("posted")
				
				$.mobile.changePage("#page_atleti");
				refreshAtletiServer();
			
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
		 
		 
	 }
	 
	 
	 function addIscritto(){
		 //alert($atleti.rows.length);
		 var atl=[];
		 var gis=jcurrentgara.iscritti;
		 
		 $($atleti.rows).each(function(i){
			 var at=$atleti.rows[i];
			 var id=at.doc.id.trim();
			 //if (gis.indexOf(id)==-1){
				 atl.push(at);
			 //}
			 
			 
		 })
		 
		 //var atl=$atleti.rows;
		 atl.sort(function(a,b) {
			 var a1=a.doc.cognome.trim();
			 //console.log(a1)
			 var b1=b.doc.cognome.trim();
			 if (a1>b1) return 1;
			 if (a1<b1) return -1;
			 return 0;
		 });
		 var htm = new EJS({url: 'tpl/selectiscritti.ejs'}).render(atl);
		$("#selectIscrittiPage #selectiscr").empty().append(htm)
		
		$.mobile.changePage("#selectIscrittiPage");
		//$('#selectIscrittiPage #collfs').trigger('expand');
		 
		 
	 }
	 
	 
	 function addIscrittiOk(){
		 
		 var iscr="";
		 $('#selectIscrittiPage :checkbox:checked').each(function(i){
          var id = $(this).val();
		  if (iscr.trim()!="") iscr+=",";
		  iscr+=id;
        });
		//alert(iscr);
		//if (jcurrentgara.iscritti.trim()!="") jcurrentgara.iscritti+=",";
		jcurrentgara.iscritti=iscr;
		var data={};
		data.id=jcurrentgara.id;
		data.iscritti=iscr;
		 $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/gare/update",
            type: "POST",
            data: data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			 toast("error");
			}	else {
				console.log("posted")
				showIscritti();
				
			
			}
			
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting update","long");
			
		});
		
		
		
	 }
	 
	 
	 
	 function saveOptions(){
		 rooturl=$("#optionsPage #server").val();
		 
		
		 
		 var notifiche=$("#optionsPage #ckNotifiche").prop("checked");
	
		 
		 var options={
			 server: rooturl,
			 notifiche: notifiche
		 }
		 //setCookie("server",rooturl)
		 setCookie("options",JSON.stringify(options));
		 settings=options;
		 $(".serverspan").html("Server: "+rooturl);
		 refreshAtletiServer();	
	     refreshGareServer();
		 refreshNews(function(data){
				 
				 
		 });
		 $.mobile.changePage("#index")
		 
	 }
	 
	 function setServer(srv){
		 $("#optionsPage #server").val(srv);
		 
	 }
	 
	 function loadOptions(){
		 var defaultoptions={
			 server: rooturl,
			 notifiche: true
		 }
		 var opts=getCookie("options");
		 if (opts==null){
			 setCookie("options",JSON.stringify(defaultoptions));
			 settings=defaultoptions;
		 } else {
			 var o=JSON.parse(opts);
			 $("#optionsPage #server").val(o.server);
			 $("#optionsPage #ckNotifiche").prop("checked",o.notifiche);
			 settings=o;
		 }
		 
		 
		 
	 }
	 
function delMatch()
{
	
	 var id=delmatchid;
	 
	gConfirm("Sei sicuro di voler cancellare l'incontro ?","Conferma",function() {
	 
	 colog("deleting matchid "+id);
	  
	  var url="updagent.php?action=delete&tag=match";
	  
	  
	  //find and reset its derby counterpart, if there is one
	  
	  $($allmatches.rows).each(function(i){
		  var meid=$allmatches.rows[i].doc.id;
		  var doc=$allmatches.rows[i].doc;
		  if (meid.trim()==id.trim()){
			  if (doc.derby){
				  
				  if (doc.derby.trim()!="") {
					  var did=doc.derby;
					  	
						 var  urld="/matches/update/"+jcurrentgara.id+"/"+did;
				
					$.ajax({
					type: "POST",
					url: rooturl+ urld,
					data: {
						derby: null
					},
					async: false
					});
					
					colog("resetted derby flag on matchid "+did);
							
					  
				  }
				  
				  
			  }			  
		  }
		  
	  })
	
	url+="&id="+id;
	url+="&garaid="+garaid;
	
	url="/matches/delete/"+jcurrentgara.id+"/"+id;
	
	$.post(rooturl+url,{ a: '1'},function() {
	  delmatchid="";
	  refreshMatches(function() {
		  $("#matchesatleta #popDelMatch").popup("close");
		 showMatchesForAtleta(selectedAtl.id);
		 
		 
		 // $.mobile.changePage("#matchesatleta");
					
	  })
	  
	});
	
	},function() {
		cancelDelMatch()
		
	});
	  
 }
 
 function cancelDelMatch()
 {
  $("#matchesatleta #popDelMatch").popup("close");
 }
 
 
function getCookie(c_name)
{
 	
 var c_value;	
 colog("isPhone: "+isPhone)
 if (isPhone)
 {
   var storage=window.localStorage;	 
 // alert("getting localstorage "+c_name);	 
   colog("storage: "+storage)
   c_value=storage.getItem(c_name)
 } else {	 
	
	
 c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
    {
    c_end = c_value.length;
    }
  c_value = unescape(c_value.substring(c_start,c_end));
  }
  }
return c_value;
}

function setCookie(c_name,value,exdays)
{
 if (isPhone) {
	 var storage=window.localStorage;	 
	// alert("setting localstorage "+c_name+" to "+value);
  	 storage.setItem(c_name, value);	 
 }	
 else
 {
 
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
 }
 
// alert(getCookie(c_name));
}



var deleteCookie = function(name) {
	if (isPhone) {
	  var storage=window.localStorage;	 
	// alert("removing localstorage "+name);	
	 storage.removeItem(name);
	} else {
	 
	 
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
};


function autoLogin(){
	 var em=getCookie("email");
	var pw=getCookie("psw");
	var al=getCookie("autologin");
	colog("autologin cookie: "+al);

	if (al)
	{
		//)alert(al);
	 if (al=="true")	{
	 if (em && pw)
	{
     $("#login #txt-email").val(em);
	 $("#login #txt-password").val(pw);
		doLogin();
	} else {
	  toast("Login automatico fallito");
	}
	
		 
	 }
		
		
	}
	//alert("cookies: "+em+" - "+pw);
	
	
}

function showLoginPage() {
	
	colog("showloginpage")
	//$.mobile.changePage("#index");
	//return;
	
	//alert("showLoginPage");
	var em=getCookie("email");
	var pw=getCookie("psw");
	var al=getCookie("autologin");

	
	//alert("cookies: "+em+" - "+pw);
	if (em && pw)
	{
     $("#login #txt-email").val(em);
	 $("#login #txt-password").val(pw);
		
	} else {
		$("#login #txt-email").val("");
	 $("#login #txt-password").val("");
	}
	if (al){
		$("#login #chck-autologin").attr("data-cacheval","false");
		} else $("#login #chck-autologin").attr("data-cacheval","true");
	
	//alert(em+" - "+pw);
	$.mobile.changePage("#index");
}

function doLogout(){
	//showLoginPage();
	 gConfirm("Sei sicuro di volerti scollegare ?","Log out",function() {
		loggedin=false;
			 //$("#index #lilogout").hide();
			 $("#index #lilogin").show();
			 $("#index #liatleti").hide();
			  //$("#index #lioptions").hide();
			   $("#index #lisockets").hide();
			 $("#gare #liaggiungigara").hide();
			  $("#gara #liresetcronaca").hide();
			  $("#gara #lisysmsg").hide();
			 $("#page_atleti #liaggiungiatleta").hide();
			 $("#matchesatleta #actionpanela").hide();
			 $("#iscrittiPage #btnAddIscritto").hide();
			 $("#gare #test").hide();
			 $("#index .loginspan").html("");
			 $(".showadmin").hide();
			 fb_logout(function(){
				//fb_revoke(); 
				$.mobile.changePage("#index_fb");
			 });
	},function() {
		
		
	});
	
	//$.mobile.changePage("#login");
	
}	

function showNotifications() {
	
	 var iscritti=jcurrentgara.iscritti;
     colog("iscritti: "+iscritti);
	 var arr=iscritti.split(",");
	 if (iscritti.trim()=="") arr=[];
	
	 var atls=[];
	
	$(arr).each(function(i){
		 
		 var at=getAtletaById(arr[i]);
		 var doc={};
		 doc.nome=at.cognome+" "+at.nome;
		 doc.id=at.id;
		 atls.push(doc);
		 
		 
	 })
	 
	 
	 
	 atls.sort(function(a,b){
		var a1=a.nome.trim();
		var b1=b.nome.trim();
		//console.log("nomi a1b1: "+a1+" - "+b1);
        if (a1>b1) return 1;		
		if (a1<b1) return -1;
		return 0;
		 
	 });

	 html= new EJS({url: 'tpl/selectnotifiche.ejs'}).render(atls); 
	 $("#page_notifiche #ulatleti").empty().append(html);
	 $.mobile.changePage("#page_notifiche");
}


	 function setNotificheOk(){
		 
		 var iscr="";
		 $('#page_notifiche :checkbox:checked').each(function(i){
          var id = $(this).val();
		  colog(id);
		  if (iscr.trim()!="") iscr+=",";
		  iscr+=id;
        });
		//alert(iscr);
		//if (jcurrentgara.iscritti.trim()!="") jcurrentgara.iscritti+=",";
		setCookie("notifiche_atleta",iscr);
		/*var data={};
		data.id=jcurrentgara.id;
		data.iscritti=iscr;
		 $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/gare/update",
            type: "POST",
            data: data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			 toast("error");
			}	else {
				console.log("posted")
				showIscritti();
				
			
			}
			
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting update","long");
			
		});*/
		
		
		$.mobile.changePage("#gara");
	 }
	 
	 
	var notcount=0;
	 function notify(txt) {
		 
		 if (isPhone)
		 {
			  notcount++;
			  if (notcount>3) notcount=1;
			var id=notcount; 
			cordova.plugins.notification.local.schedule({
				id: 1,
				text: txt,
				title: "AppKwonDo",
				icon: "file://img/logotkdrozzano_icon.png"

				//sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
			   // every: 'day',
			  //  firstAt: next_monday,
			//	data: { key:'value' }
			}) 
			
			/*
			cordova.plugins.notification.local.off("click");
			cordova.plugins.notification.local.on("click", function (notification) {
				 alert("clicked notifichation");
				 $("#dialogNotifiche #content").empty.html(notification.text);
                 $.mobile.changePage("#dialogNotifiche",{
					 role: "dialog"
				 })
			});
			*/
			 
		 } else	 console.log("Notification: "+txt);
		 
		 
		 
	 }
	 
	 
	 function pushSuccessHandler(result) {
	 var txt='Push Callback Success! Result = '+result;	
     //alert(txt)
	 console.log(txt)
    }
	
	function pushErrorHandler(error) {
     //alert(error);
	 console.log("pushError: "+error);
	}
	
	
    function onNotificationGCM(e) {
		console.log("onNotificationGCM");
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
					toast("Registered on GCM");
					   cordova.plugins.notification.local.on("click", function (notification) {
				 toast("clicked notification");
				 $("#dialogNotifiche #content").empty.html(notification.text);
                 $.mobile.changePage("#dialogNotifiche",{
					 role: "dialog"
				 })
			});
                    //alert('registration id = '+e.regid);
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
			  notify(e.message);
              //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              //alert('GCM error = '+e.msg);
			  console.log("GCM error "+e.msg)
            break;
 
            default:
              //alert('An unknown GCM event has occurred');
			  console.log('An unknown GCM event has occurred')
              break;
        }
    }

	
	function sendGCM(txt){
		
	  console.log("sendGCM: "+txt);	
		
		 var obj={};
	 obj.message=txt;
	 obj.title="AppKwonDo";
	 obj.msgcnt="3";
	 obj.soundname="beep.wav";
		
		
		 $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/matches/notify",
            type: "POST",
            data: obj})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			 colog("error posting notification");	
			 toast("error");
			}	else {
				colog("posted GCM notification")
				
			
			}
			
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting GCM push","long");
			
		});
		
		
	}
	
	
	function resetCronaca() {
		var gid=jcurrentgara.id;
		
		gConfirm("Vuoi veramente resettare la cronaca per questa gara ?","conferma",
		function(){
			$.ajax({
				type: "GET",
				url: rooturl+"/gare/resetcronaca/"+gid,
		     	success: function(gxml) {
					
					toast("Cronaca resettata");
					refreshCurrentGara();
			    } 
			 
		 });
			
		},
		function() {
			
			
			
		});
		
		
		//alert(gid);
		
		
		
		
		
	}
	
	
	function socketNotify(msg){
		sendSocketMessage(msg);
		
	}
	
	function sendSocketMessage(message){
		
		
		
		var msg={
			to: "all",
			text: "sample message",
			type: "notification"
			
		}
		
		if (message) msg=message;
		
		socket.send(msg);
		colog("socket message sent to socket.io server")
		
	}
	
	
	
		
 function getGaraById(id)
 {
  var retvalue=null;
  sdebug("getGaraById "+id);
  console.log($gare);
  var retvalue={};
  //$(gare_xml).find("gara").each(function() {
  $($gare.rows).each(function(i) {
    var $gara=$gare.rows[i];
    var garaid=$gara.doc.id;
	 //debug("garaid "+garaid);
	if ($.trim(garaid)==$.trim(id)) {
	 sdebug("trovata gara");
	 retvalue=$gara;
	}
  });
  return retvalue;
 }
 
 
 function garaMaps(garaid){
	 
	 var gara=jcurrentgara;
	 var mapl="";
	 if (gara.maplocation) mapl=gara.maplocation;
	 
	 var html= new EJS({url: 'tpl/garamap.ejs'}).render(mapl); 
	 $("#garamaps #content").html(html);
	 $.mobile.changePage("#garamaps");
	 
	 
	 
 }
 
 
 function deleteGara(id){
	 
	 
	 var rev=id;
	 	    gConfirm("Confermi l'eliminazione della gara ?","Conferma eliminazione",function() {
					
					 	 
					
					
					var data={};
						data.id=id;
						data.rev=rev;						
					  
					 $.ajax({url : rooturl+"/gare/delete",
                     type: "POST",
					data: data})
        .done(function(data) {
			// navigator.notification.alert(data, function() {}, "Avviso");
			//alert("done: "+data);
			if (data.error)
			{
			console.log("error");
			}	else {
				console.log("posted")
				
				//$.mobile.changePage("#gare");
				refreshGareServer();
			
			}
			
			//successCallback();
		})
        .fail(function() {
			toast("Error posting","long");
			
		});
					  
				  },function() {
					  
					  
				  });  
	 
	 
 }
 
 
 function showSocketsPage() {
	 showSockets(function(){
		 $.mobile.changePage("#page_sockets")
		 
	 })
	/* var sdata={};
	 $.ajax({url : rooturl+"/socketusers",
                     type: "GET",
					data: sdata})
        .done(function(data) {
			var html= new EJS({url: 'tpl/sockets.ejs'}).render(data);
			//alert(html);
            $("#page_sockets #content").html(html);	
           	$("#page_sockets #ulsockets").listview();
			$.mobile.changePage("#page_sockets")
			
		});*/
	 
 }
 
  function showSockets(callback) {
	 var sdata={};
	 //progressStart("Caricamento","");
	 $("#page_sockets #pconn").html("Aggiornamento...");	
	 $.ajax({url : rooturl+"/socketusers",
                     type: "GET",
					data: sdata})
        .done(function(data) {
			var html= new EJS({url: 'tpl/sockets.ejs'}).render(data);
			//alert(html);
            $("#page_sockets #content").html(html);	
           	$("#page_sockets #ulsockets").listview();
			$("#page_sockets #pconn").html(data.length+ " utenti connessi ad AppKwonDo");
			//progressStop();
			if (callback) callback();
			
		});
	 
 }
 
 function clickSocket(id){
	 //alert(id);
	 var pageid=$.mobile.activePage.attr('id');
	 var d={ 
	 destsocket: id
	 };
	  var html= new EJS({url: 'tpl/sysmsg.ejs'}).render(d); 
	  $("#"+pageid+" div[data-role=content]").append(html);
	  $("#"+pageid+" #popSysMsg #dest").val(id);
	  $("#"+pageid+" #popSysMsg").popup();
	  $("#"+pageid+" #popSysMsg").popup("open");
	 return;
	 
	 
	 var msg={
			to: id,
			text: "sample message",
			type: "notification"
			
		}
		
		//if (message) msg=message;
		
		socket.send(msg);
		colog("socket message sent to socket.io server")
	 
 }
 
 
 
 
 
  function fb_login() {
	  
	     
	    
		if (!facebookcheck) {
			
			fbloggedin=true;
			
			refreshNews();
			
			$.mobile.changePage("#login");
			//showLoginPage();
								
		} else {
	  
	   
        openFB.login(
                function(response) {
                    if(response.status === 'connected') {
                        colog('Facebook login succeeded, got access token: ' + response.authResponse.token);
						
						//$.mobile.changePage("#index");
						$("#index_fb #errormsg").html("");
						fb_getInfo(function(){
							fbCheckGroup("116270558490682",fb_user,function(b){
							  var whitelist="holly ozoora";
							  var arrwl=whitelist.toLowerCase().split(",");
							  $(arrwl).each(function(x){
								  var wl=arrwl[x].trim();
								  if (fb_user.name.toLowerCase().indexOf(wl)>-1) b=true;	
							  })
								
								
							
							if (b) {
								colog("bravo, fai parte del gruppo facebook asd taekwondorozzano");
								$("#index_fb #errormsg").html("");
								fbloggedin=true;
								refreshNews();
								$.mobile.changePage("#index");
								autoLogin();
								 var msg={
			                      device: "browser",
									type: "clientspecs",
									nickname: socketnickname
			
						         }
								if (isPhone) msg.device="mobile";
		
		//if (message) msg=message;
		
								socket.send(msg);                        
								
								//alert(fb_userid);
							} else {
							  var testo="Non fai attualmente parte del gruppo Facebook ASD Taekwondo Rozzano." 	
							  $("#index_fb #errormsg").html(testo);
							}	
	  
	                    })
							
						});
                    } else {
                        colog('Login Facebook fallito: ' + response.error);
						$("#index_fb #errormsg").html("Accesso a Facebook fallito");
                    }
                }, {scope: 'email,publish_actions,user_managed_groups'});
    
        }
	}

    function fb_getInfo(callback) {
        openFB.api({
            path: '/me',
            success: function(data) {
                colog(JSON.stringify(data));
				fb_userid=data.id;
				fb_user.id=data.id;
				fb_user.name=data.name;
				socketnickname=fb_user.name;
				
				colog("fb_userid: "+fb_userid);
				colog("fb_name: "+data.name);
				colog("socketnickname: "+socketnickname)
				//alert($("#fbuser").length);
				//alert($("#index #fbuser").length);
				$("#index #fbuser #userName").html(data.name);
				$("#index #fbuser #userPic").attr('src','http://graph.facebook.com/' + data.id + '/picture?type=small');
                $("#index #fbuser").show();
				if (callback) callback();
				//document.getElementById("userName").innerHTML = data.name;
                //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
            },
            error: fb_errorHandler});
    }

    function fb_share() {
        openFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: document.getElementById('Message').value || 'Testing Facebook APIs'
            },
            success: function() {
                alert('the item was posted on Facebook');
            },
            error: fb_errorHandler});
    }

    function fb_revoke() {
        openFB.revokePermissions(
                function() {
                    alert('Permissions revoked');
                },
                fb_errorHandler);
    }

    function fb_logout(callback) {
        openFB.logout(
                function() {
                    colog('Logout successful');
					fbloggedin=false;
					if (callback) callback();
                },
                fb_errorHandler);
    }

    function fb_errorHandler(error) {
        alert(error.message);
    }
	
	
	
	var fbCheckGroup = function(groupid, us, callback){
		var userid=us.id;
	 openFB.api({
            path: '/'+groupid+'/members',
			params: {
			 limit: 400
			},
            success: function(data) {
                colog(JSON.stringify(data));
				
				colog(data.data.length+" users nel gruppo");
				var found=false;
				for (var i=0; i<data.data.length; i++){
				  var user=data.data[i];
				  var id=user.id;
				  //if (id==fb_userid) found=true;
				  if (id==userid) found=true;
				}
				
				if (callback) callback(found);
				
				
                //document.getElementById("userName").innerHTML = data.name;
                //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
            },
            error: fb_errorHandler});
	
	
 /*       openFB.api('/me/groups', function(response) {

        console.log(response);
       for(var i=0;i<response.length;i++){
         if(response[i].id == groupid){ callback(true); return }
        }
  callback(false);*/

};


  function fb_checkgroup(){
    fbCheckGroup("116270558490682",fb_user,function(b){
	  if (b) alert("bravo, fai parte del gruppo");
	  
	})
	
	
	
   }
   
   
   function getQueryString(sParam)
  {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)  return sParameterName[1];
        
    }
  }