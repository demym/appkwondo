var pictureSource; // picture source
var destinationType; // sets the format of returned value
var scheda={};
var loggedin=false;
var role="tkdruser";
var fbloggedin=false;
var chatrefreshcount=0;

var appversion="1.2.3";

var crnonletti=0;
	var garanotifyid="";

var facebookcheck=true;
var debugActive=false;

var defaultimage="img/logotkdrozzano.jpg";

var tapevent="tap";

var cronaca_unread=[];
var cronaca_read=[];
var chatnonletti=[];
var chatunreadcount=0;

var fotodata="";
var sounddata="";

var currentround="1";
var currentresult="0-0";
var currentammon=0;

var chatmultiroom=false;

var realtime={
	round: "1",
	result: "0-0",
	ammoniz: 0,
	running: false,
	active: false,
	fineround: false
	
	
}

var realtimeArray=[];

var chatuser={
	sockid: "",
	nickname: ""
	
}

var rtmatches=[];

//var rooturl="http://localhost:3000";
//var rooturl="http://9.71.212.241:3000";
//var rooturl="http://192.168.1.105:3000";
var rooturl="http://192.168.1.109:3000";
//var rooturl="http://192.168.1.105:3000";
//var rooturl="http://demywl.mybluemix.net";
//var rooturl="http://62.101.111.160:3000";
//var rooturl="http://appkwondo.mybluemix.net";
//var rooturl="http://tkdr.herokuapp.com";

var typingtimeout=null;

var caricamentotext="<img style='position: relative; top: 4px;' src='images/ajax-loader2.gif' />&nbsp;&nbsp;&nbsp;Caricamento...";

var imgtext="<img style='position: relative; top: 4px;' src='images/ajax-loader2.gif' />&nbsp;&nbsp;&nbsp;";
//imgtext="";



var settings=null;

	
var garaFilters={
		categoria: "",
		sesso: "",
		medaglia: "",
		quadrato: ""
}
var isFiltered=false;


//var cordovaApp=true;




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
var jGara={
	cronaca: {
		rows: []
	}
};
var $gara={};
var $gare={};
var jcurrentgara={};
var activeTab=0;
var jmatchesbyatleta=[]
var jmatchesbyprog=[];
var $atleti={};
var $allatleti={};
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

	 $(window).resize(function () {
		 /* do something */ 
		 //console.log("resize event")
		 resizeImage("#viewimage #img1");
		 
		 
    }); 
	/*
	$("#viewimage #img1").load(function(){
      var h=this.height,w=this.width
      $(this).removeAttr('width').removeAttr('height')
      var actualHeight =this.height,actualWidth=this.width;
      $(this).attr{{height:h,width:w}).data({height: actualHeight, width: actualWidth})
   })
   */
   
   
   
   
   function setBadge(){
	    //get total unread chat messages
	   var total=chatunreadcount;
	  /* var total=0;
	   for (var i=0; i<chatnonletti.length; i++) {
		   
		   var ch=chatnonletti[i];
		   var garaid=ch.garaid;
		   
		   var count=ch.count;
		   
		  
			   
		   
		   total+=count;
		   
	   }*/
	   
	   
	   console.log("chat non letti totali: "+total);
	
	   if (total==0) {
		   
		    if (isPhone) cordova.plugins.notification.badge.clear();
	   } else  {
		   
		   if (isPhone) cordova.plugins.notification.badge.set(total)
	   }   
	   
   }
   
   function getChatNonLetti(gid) {
	   
	   var retvalue=0;
	   
	   var found=false;
	   for (var i=0; i<chatnonletti.length; i++) {
		   
		   var ch=chatnonletti[i];
		   if (ch.garaid) {
			   
			   if (ch.garaid==gid) {
				   retvalue=ch.count;
				   found=true;
				   
			   }	   
		   }
		   
	   }
	   
	   return retvalue;
	   
   }
   
   function setChatNonLetti(gid,count) {
	   
	   
	    var found=false;
	   for (var i=0; i<chatnonletti.length; i++) {
		   
		   var ch=chatnonletti[i];
		   if (ch.garaid) {
			   
			   if (ch.garaid==gid) {
				   ch.count=count;
				   found=true;
				  
			   }
			   
			     
		   }
		   
	   }
	   
	   if (found==false) {
		   
		   var newchnl={
			   garaid: gid,
			   count: count
		   };
		   if (count>0) chatnonletti.push(newchnl);
		   
	   }
	   
	   
	   
	   setCookie("chat_unread",chatunreadcount);
	  
	   
	   
   }
   
   function addChatNonLetti(gid) {
	   return;
	   var found=false;
	   for (var i=0; i<chatnonletti.length; i++) {
		   
		   var ch=chatnonletti[i];
		   if (ch.garaid) {
			   
			   if (ch.garaid==gid) {
				   ch.count++;
				   found=true;
				   
			   } 	   
			   
		   }
		   
	   }
	   
	   if (found==false) {
		   
		   var newchnl={
			   garaid: gid,
			   count: 1
		   };
		   console.log("create new chatnonletti element for garaid "+gid);
		   chatnonletti.push(newchnl);
		   
	   }
	   
	   setBadge();
	   setCookie("chat_unread",JSON.stringify(chatnonletti));
	   
   }
   
   function deleteFromRealtimeArray(key){
	   conslog("key "+key);
	   for (var i=0; i<realtimeArray.length; i++) {
		   
		   var rta=realtimeArray[i];
		   var rkey=rta.garaid+"_"+rta.matchid;
		   conslog("key "+key+" ---> rkey "+rkey)
		   if (key==rkey) {
			   found=true;
			   conslog("found key to delete "+rkey)
			   realtimeArray.splice(i,1);
			   console.log("deleting from realtime array "+key)
			   
		   }
		   
	   }
	   
	   
   }
   
   function getFromRealtimeArray(key){
	   
	   var retvalue=null;
	   for (var i=0; i<realtimeArray.length; i++) {
		   
		   var rta=realtimeArray[i];
		   var rkey=rta.garaid+"_"+rta.matchid;
		   if (key==rkey) {
			   found=true;
			   realtimeArray[i]=data;
			   retvalue=data;
		   }
		   
	   }
	   return retvalue;
   }
   
   function syncRealtimeArray(data) {
	   return;
	   conslog("syncRealtimeArray function");
	   conslog(data);
	   for (var x=0; x<realtimeArray.length; x++) {
			
			var rta=realtimeArray[x];
			var key=rta.garaid+"_"+rta.id;
			
			//check if it is still present in realtime server structure
			/*var foundrt=false;
			for (var y=0; y<data.realtime.rows.length; y++) {
				
				var doc=data.realtime.rows[y].doc;
				
				var rkey=doc.garaid+"_"+doc.id;
				if (rkey==key) {
					found=true;
					var rt=false;
					if (doc.realtime) {
						if (String(doc.realtime)=="true") rt=true;
					}
					
					if (rt==true) {
						conslog("match "+rkey+" is in realtime, checking and adding in realtimearray");
						foundrt=true;
					}
					
				}
				
				
				
				
			}
			
			/*if (!foundrt) {  //remove this match from realtime array
					
						//deleteFromRealtimeArray(key);
						realtimeArray.splice(x,1);
						conslog("match "+key+" not anymore in realtime, deleting from realtimearray");
			}*/
			
		}
		
		//add realtime matches in realtimearray if not already there
		
		for (var y=0; y<data.realtime.rows.length; y++) {
				
				var doc=data.realtime.rows[y].doc;
				
				var rkey=doc.garaid+"_"+doc.id;
		        var rt=false;
					if (doc.realtime) {
						if (String(doc.realtime)=="true") rt=true;
					}
					
					if (rt==true) {
						conslog("match "+rkey+" is in realtime, checking and adding in realtimearray");
						
						checkRealtimeArray(doc);
					}
		}			
		
		
	   
   }
   
   function addLastRealtimeData(data){
	   
	   conslog("addLastRealtimeData");
	   conslog(data);
	   var key=data.garaid+"_"+data.matchid;
	   
	   var found=false;
	   for (var i=0; i<realtimeArray.length; i++) {
		   
		   var rta=realtimeArray[i];
		   var rkey=rta.garaid+"_"+rta.id;
		   
		   if (rkey==key) {
			   conslog("found realtimeArray element to update");
			   rta.lastrealtimedata=data
			   found=true;
		   }
		   
	   }
	   
	   if (!found) conslog("match "+key+" not found in realtimeArray");
   }
   
   function checkRealtimeArray(data,changedata) {
	   
	   if (changedata==null){
		   
		 changedata=true;  
	   }  
	   
	   conslog("checkrealtimearray - changedata: "+changedata);
	   conslog(data);
	   
	   var key=data.garaid+"_"+data.matchid;
	   
	   //check if realtime match already in array
	   var found=false;
	   for (var i=0; i<realtimeArray.length; i++) {
		   
		   var rta=realtimeArray[i];
		   var rkey=rta.garaid+"_"+rta.matchid;
		   if (key==rkey) {
			   found=true;
			   conslog("match "+key+" found in realtimearray")
			   if (changedata) realtimeArray[i]=data;
			   
			   
		   }
		   
	   }
	   
	   if (!found) {
		   
		   conslog("match "+key+" not found in realtimearray, pushing it")
		   realtimeArray.push(data);
		   
	   }
	   
	   
	   
   }
    
	function resizeImage(selector){
  //Resize Bottom Right Image
  var img = $(selector);
  img.removeAttr('width').removeAttr('height')
 
  
  var imageParentElement = jQuery(selector).parent();
  conslog("cw: "+imageParentElement.css("width")+" - ch: "+imageParentElement.css("height"))
  var imgwidth=parseInt(img.css("width").replace("px",""),10);
  var imgheight=parseInt(img.css("height").replace("px",""),10);
  
  imgwidth=$(selector).get(0).naturalWidth;
  imgheight=$(selector).get(0).naturalHeight;
  
  //var widthRatio = imageParentElement.outerWidth() / imgwidth;
  var widthRatio = imageParentElement.css("width") / imgwidth;
  var heightRatio = imageParentElement.css("height") / imgheight;
  var ratio = Math.max(widthRatio, heightRatio);
   conslog("w: "+imgwidth+" - height: "+imgheight);
  var newwidth=parseInt(imageParentElement.css("width").replace("px",""),10);
  

  var ratio2=newwidth/imgwidth;
  conslog("ratio2: "+ratio2);
  
  var newheight=Math.ceil(ratio2*imgheight);
  conslog("newwidth: "+newwidth+" - newheight: "+newheight);
  
  img.css({
    width: newwidth ,
    height: newheight
  });
}
	 
	 function colog(txt) {
		 var dbg=debugActive;
		 //dbg=true;
		 if (!dbg) return;
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
	 
	 	 function toggleRightMenu(menu_ejs){
		 var pageid=$.mobile.activePage.attr('id');
		var l=$( "#"+pageid+" #"+menu_ejs).length;
		
		if (l>0){
			 $("#"+pageid+" #"+menu_ejs).remove();
		}
		
		
		  var data={
		  loggedin: loggedin,
		  role: role
		  }
		  var html= new EJS({url: 'tpl/'+menu_ejs+'.ejs'}).render(data); 
          $("#"+pageid).append(html);
		  $("#"+pageid+" #"+menu_ejs).panel();
		  
			
		
		$( "#"+pageid+" #"+menu_ejs).panel("toggle");
		
		 
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
	 
	 function toggleCheckbox(obj,hdiv){
		 
		var l=$(obj).prop("checked");
		var div=$("#"+hdiv);
		conslog(l);
		if (l) {
			
			div.show();
			
		} else {
			
			div.hide();
		}
        		
		 
	 }
	 
	 function openPopup(htm,titolo){
		 if (!titolo) titolo="";
		 var pageid=$.mobile.activePage.attr('id');
			conslog("current pageid: "+pageid)
			//alert(html);
			$("#"+pageid+" div[data-role=content] #temppopup").remove();
			//var html='<div data-role="popup" id="temppopup" style="padding: 4px;"data-dismissible="false" data-theme="a" class="ui-corner-all"><a href="#" onclick="popCloseRemove()" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>'+html+"</div>"';
	        var html= new EJS({url: 'tpl/genericpop.ejs'}).render(htm);
			$("#"+pageid+" div[data-role=content]").append(html);
			
			$("#"+pageid+" #temppopup h5").html(titolo);
            $("#"+pageid+" #temppopup").popup();
			$("#"+pageid).page('destroy').page()
			$("#"+pageid+" #temppopup").popup("open",{"transition":"flip"});
		 
		 
	 }
	 
	 function popCloseRemove(){
		 var pageid=$.mobile.activePage.attr('id');
			colog("current pageid: "+pageid)
			//alert(html);
			$("#"+pageid+" #temppopup").popup("close").remove();
		 
	 }
	 
	 
	 function openTabulato(h){
		 //window.open(h);
		 //return;
		  progressStart("Caricamento..");
		  $.ajax({
            url: h,
            type: "GET",
			dataType: "html"})
         .done(function(data) {
			 colog(data);
			 var img=$(data).find("img[alt=drawing_load_error]");
			 var src=img.attr("src").replace("./","");
			 colog(src);
			 var im="<img style='width: 400px; height: 500px;' src='http://demo.tkdtechnology.it/"+src+"' />";
			 openPopup(im);
			  progressStop();
		 });
		 
	 }
	 
	  function openTabulatoPage(obj,h){
		 //window.open(h);
		 //return;
		 var titolo=$(obj).html();
		 var url=rooturl+"/gettkdtabulato"
		  progressStart("Caricamento..");
		  $.ajax({
            url: url,
            type: "POST",
			dataType: "html",
			data: {
				url: h
				
			}})
         .done(function(data) {
			 colog(data);
			 var img=$(data).find("img[alt=drawing_load_error]");
			 var src=img.attr("src").replace("./","");
			 colog(src);
			 var im="<img style='width: 600px; height: 600px;' src='http://demo.tkdtechnology.it/"+src+"' />";
			 $("#page_tabulato #cat").html(titolo)
			  $("#page_tabulato #cont").html(im)
			  progressStop();
			  
			  $("#page_tabulato #url").val(h);
			  $.mobile.changePage("#page_tabulato");
			  
			  var image=$("#page_tabulato #cont img").get(0);

			image.addEventListener('gesturechange',function(e){
                console.log(e.scale)
				if(e.scale>1){
					//zoom in 
					//increase the size of image according to the e.scale
				}

				else if(e.scale<1){
					//zoom out 
					//decrease the size of image according to the e.scale
				}
			});
		 });
		 
	 }
	 
	 function openTabulatoImage(){
		 var url=$("#page_tabulato #url").val();
		 window.open(url,"_blank","location=no&toolbar=yes");
		 
	 }
	 
	  function getTabulatoImg(h,callback){
		 //window.open(h);
		 //return;
		 
		 progressStart("Caricamento..");
		  $.ajax({
            url: h,
            type: "GET",
			dataType: "html"})
         .done(function(data) {
			 colog(data);
			 var img=$(data).find("img[alt=drawing_load_error]");
			 var src=img.attr("src").replace("./","");
			 colog(src);
			 var im="<img style='width: 500px; height: 600px;' src='http://demo.tkdtechnology.it/"+src+"' />";
			 callback(im);
			 progressStop();
		 });
		 
	 }
	 
	 
	 function getTkdTechnology(){
		 		progressStart("Caricamento..");
		 var url=rooturl+"/gettkdtech";	
         //var url="http://demo.tkdtechnology.it";		 
				
		 $.ajax({
            url: url,
            type: "GET"})
         .done(function(data) {
			 
			
			 
			 var divclass=$(data).find("div#tab-63-atl-cls");
			 var divtabs=$(data).find("div#tab-63");
			 
			 
			 var navtabs=$(data).find("div.tabs:first ul:first li");
			 colog("navtabs: "+navtabs.length);
			 var htm="";
			 colog(data);
			 $(navtabs).each(function(i){
				 
				 var tabn=$(this).find("a").attr("href");
				 var tabt=$(this).find("a").html();
				 colog(tabt)
				 var divint=$(data).find("div"+tabn+"-atl-int");
				 var divclass=$(data).find("div"+tabn+"-atl-cls");
				 var divtabul=$(data).find("div"+tabn+"-atl-tab");
				 var divcat=$(data).find("div"+tabn+"-atl-cat");
				 //$(this).append(divclass.html());
				 var table=divclass.find("table");
				 
				 var tableint=divint.find("table");
				 getTkdtInteractive(tableint);
				 
			     //table.attr("border","1");
				 table.css("border","2px solid black");
				 table.css("width","100%");
			   
				 table.find("thead tr").prepend("<th width=8>&nbsp;</th>")
				 table.find("th").css("background","#f6f6f6");
				 table.find("tr").each(function(i){
					 var tr=$(this);
					 if (i>0) $(this).prepend("<td width=10>"+i+"</td>");
					 var td=$(this).find("td:first");
					 colog(td.length)
					 if (tr.html().toLowerCase().indexOf("rozzano")>-1) {
						 tr.find("td").css("font-weight","bold");
						 tr.css("background","lightgreen")
					 }
					 
					 
					 
				 })
				 var htmtab="";
				 divtabul.find("a").each(function(i){
					 var t=$(this).html();
					 var questo=$(this);
					 var h=$(this).attr("href");
					 var name="tabulato"+i;
					 htmtab+="<a style='font-size: 10px; white-space: normal;' class=tabbutton href='#' onclick=openTabulatoPage(this,'"+h+"') >"+t+"</a>";
					 //htmtab+='<div id="c'+name+'" onclick=getTabulatoImg("'+h+'")  data-role="collapsible" data-collapsed="true" data-theme="c" data-mini="true"><h5 id="results-header">'+t+'</h5><div class=tabimg></div></div>';
					
					 
				 })
				 
			
				 
				 table.find("td").css("text-align","center");
			     table.find("td,th").css("font-size","12px");
				  table.find("td").css("border-top","1px solid gray")
				 //htm+='<div data-role="collapsible" data-collapsed="false" data-theme="c" data-mini="true"><h5 id="results-header">'+tabt+'</h5>'+divclass.html()+htmtab+"</div>";
				 htm+='<div data-role="collapsible" data-collapsed="true" data-theme="c" data-mini="true"><h5 id="results-header">'+tabt+'</h5><div data-role="collapsible" data-collapsed="true" data-theme="c" data-mini="true"><h5 id="results-header">Classifica</h5>'+divclass.html()+'</div><div data-role="collapsible" data-collapsed="true" data-theme="c" data-mini="true"><h5 id="results-header">Tabulati</h5>'+htmtab+'</div><div data-role="collapsible" data-collapsed="true" data-theme="c" data-mini="true"><h5 id="results-header">Atleti per categoria</h5>'+divcat.html()+"</div></div>";
				 
			 })
			 
			 //colog(divclass.length);
			 var html=navtabs.html()+divclass.html();
			// colog(htm)
			 //$("#index div[data-role=content] #popGare").remove();
						  //alert($("#gare #popGare").length);
			//var html= new EJS({url: 'tpl/popnotification.ejs'}).render(wnot); 
	
			//openPopup(htm);
			$("#page_tkdt").find("#cont").html(htm);
			if (!$("#page_tdkt").is(":visible")){
				colog("page_tkdt not visible, showing it")
				$.mobile.changePage("#page_tkdt");
				}
			$("#temppopup").find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});
			$("#page_tkdt").find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});
			
			$("#page_tkdt").find("a.tabbutton").button();
			progressStop();
			
			
			
			
	         
			 
			  var pageid=$.mobile.activePage.attr('id');
			 $( "#"+pageid+" #menuPanel" ).panel("close");
			 
						 // $("#gare #popGare #ulpopgare").listview();
	                      //$("#index #popGare").popup();
	                      //$("#index #popGare").popup("open");
						  
						  
						  
		 });
		 
	 }
	 
	 
	 var tkdt_iscritti={
		 rows: []
	 }
	 
	 function getTkdtInteractive(t){
		 
		 
		 
		 
		 
		 console.log("getTkdInteractive")
		 
		 var body=t.find("tbody");
		 //console.log("tbody: "+body.length)
		 var trs=body.find("tr");
		 //console.log("trs: "+trs.length)
		 trs.each(function(){
			 var tr=$(this);
			 var cognome=tr.find("td:eq(0)").remove("span").html();
			 var nome=tr.find("td:eq(1)").remove("span").html();
			 var societa=tr.find("td:eq(2)").remove("span").html();
			 var cat=tr.find("td:eq(3)").remove("span").html();
			 var cintura=tr.find("td:eq(4)").remove("span").html();
			 var peso=tr.find("td:eq(5)").remove("span").html();
			 var sesso=tr.find("td:eq(6)").remove("span").html();
			 
			 
			 
			 if (societa.toLowerCase().trim().indexOf("rozzano")>-1) {
			  	
				var newtkdtiscr={
					cognome: cognome,
					nome: nome,
                    categoria: cat,
					categoria_cintura: cintura,
					categoria_peso: peso,
					sesso: sesso	
				 
				}	
				 
				 
			 console.log("interactive: "+cognome+" "+nome+" - "+cat+" - "+peso+" - "+cintura);
			 tkdt_iscritti.rows.push(newtkdtiscr);
			 }
			 
			 
		 })
		 
		 
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
		console.log("menubutton pressed")
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
            url: rooturl+"/atleti/findall?societaid="+settings.mysocieta,
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
            url: rooturl+"/gare/findall?societa="+settings.mysocieta,
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


function myToast(wnot) {

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
			 
			}, 1800); 


}
function snotify(msg){
    
	colog("Snotify:")
	colog(msg);
   if (settings.notifiche==false){
	  colog("notifiche non attive nei settings, esco senza notificare") 
	   return;
	   
   }	
	
	var wnot={
		body: msg.text.replace("<b>","").replace("</b>",""),
		icon: "img/logotkdrozzano.png"
	}
	
		
	if (isPhone){
	 
		notify(msg.text)
		/*
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
			*/
	 
	} else 
	{
		
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

function conslog(txt){
	
	var dbg=debugActive;
	//dbg=true;
	if (dbg) console.log(txt);
	
}


function closePanel(){
	
	conslog("panels found: "+$("[data-role=panel]:visible").length);
	// $("[data-role=panel] a").on("click", function () {
			//if($(this).attr("href") == "#"+$.mobile.activePage[0].id) {
			$("[data-role=panel]:visible").panel("close");
			//}
    // });
	
}

function updateHomeInfos(){
	conslog('updateHomeInfos')
	$(".serverspan").html("Connesso al server: "+rooturl.replace("http://","").replace("https://",""));
	$("#userName").html("<b><font style='color: blue'>"+chatuser.nickname.toUpperCase()+"</font></b>");
	$(".societaspan").html("Società: "+settings.mysocietaname);
	
	
	
}


var recorder = new Object;
var recording=false;

function recordAudio() {
	
	 
	 console.log("recordAudio "+recording);
	 if (recording) {
		 
		 $("#cronacaelements a#recordaudio span").text("REGISTRA").css("color","black");
		 $("#cronacaelements a#recordaudio").css("background","silver");
		 //recording=false;
		 recorder.stop();
		 //recorder.playback();
	 }	 
	 if (!recording) {

		 $("#cronacaelements  a#recordaudio span").text("FERMA REGISTRAZIONE").css("color","yellow");
		 $("#cronacaelements  a#recordaudio").css("background","red");
		 //recording=true;
		 recorder.record();  
		 
	 } 
	
	
	recording=!recording;
}


function recordChatAudio() {
	
	 
	 console.log("recordAudio "+recording);
	 if (recording) {
		 
		 /*$("#cronacaelements a#recordaudio span").text("REGISTRA").css("color","black");
		 $("#cronacaelements a#recordaudio").css("background","silver");*/
		 //recording=false;
		 //$("#page_chat #tdaudio").css("border","0px solid red");
		 $("#page_chat #recording").hide();
		 $("#page_chat #chataudio").attr("src","img/audio.png");
		 console.log("registrazione terminata");
		
		 if (isPhone) {
		 recorder.stopcb(function(data){
			 console.log(data);
			 
		/*	 
			postChat({
			 garaid: "",
			 nickname: chatuser.nickname,
			 sockid: chatuser.sockid,
			 audio: data,
			 text: ""
		  });*/
		   var html= new EJS({url: 'tpl/recordaudiook.ejs'}).render({ audio: data });
		  openPopup(html,"Conferma invio");
			/* recorder.playback();*/
			 
			 
		 });
		
		 
		 }
		 
	 }	 
	 if (!recording) {

		 /*$("#cronacaelements  a#recordaudio span").text("FERMA REGISTRAZIONE").css("color","yellow");
		 $("#cronacaelements  a#recordaudio").css("background","red");*/
		 //recording=true;
		 //$("#page_chat #tdaudio").css("border","2px solid red");
		 $("#page_chat #recording").show();
		 $("#page_chat #chataudio").attr("src","img/audiorecording.png");
		 console.log("registrazione in corso, premi il microfono per interrompere");
		 if (isPhone) {
		 recorder.record();  
		 }
	 } 
	
	
	recording=!recording;
}

function cancelChatAudio(){
	
	 popCloseRemove();
	
}

function sendChatAudio(data){
	
		postChat({
			 garaid: "",
			 nickname: chatuser.nickname,
			 sockid: chatuser.sockid,
			 audio: data,
			 text: ""
		  });
		  popCloseRemove();
	
	
}

function playAudio() {
	recorder.playback();
	
}

function sendAudio() {
	alert("non ancora implementato");
	
}

var errorHandler = function (fileName, e) {  
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
    };

    console.log('Error (' + fileName + '): ' + msg);
}



function readAudioFile(fname) {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;

   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {

      fs.root.getFile(fname, {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               var txtArea = document.getElementById('textarea');
               txtArea.value = this.result;
            };

            reader.readAsText(file);

         }, errorCallback);

      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
	  console.log("ERROR: ",error);
   }
	
}	

var printEventType = function(event) {
      console.log('got event: ' + event.type);
};


function bindFeedback() {
	
	//$(document).off(tapevent);
	$(document).on(tapevent,"a",function(){
		 conslog("primordial tap event");
		if (isPhone) {
        window.plugins.deviceFeedback.acoustic();		
		
		} //else playSound("img/chatsend");
		 
	 });
	 
	/* $(document).on("collapsiblecollapse","#gara #ulgara",function(){
		 console.log("primordial tap event");
		if (isPhone) {
        window.plugins.deviceFeedback.acoustic();		
		
		} //else playSound("img/chatsend");
		 
	 });
	 
	  $(document).on("collapsibleexpand","#gara #ulgara",function(){
		 console.log("primordial tap event");
		if (isPhone) {
        window.plugins.deviceFeedback.acoustic();		
		
		} //else playSound("img/chatsend");
		 
	 });*/
	 
	 //$(document).on("collapsiblecollapse","#ulgara"
	 
	 
	 
	
}

function playFeedback(){
	if (isPhone) {
        window.plugins.deviceFeedback.acoustic();		
		
		} //else playSound("img/chatsend");
		 
	
}


function docready()

{
 var head=getQueryString("head");
if (head=="no") {
	
	$(document).find("[data-role=header]").remove();
	
} 

/*
$(document)
    .on('blur.textarea','#page_chat #chatmsg',function(){
  console.log("blur");
  this.rows=1;
  
})
		.on('focus.textarea', '#page_chat #chatmsg', function(){
			var savedValue = this.value;
			this.value = '';
			this.baseScrollHeight = this.scrollHeight;
			this.value = savedValue;
		})
		.on('input.textarea', '#page_chat #chatmsg', function(){
			var minRows = this.getAttribute('data-min-rows')|0,rows;
			this.rows = minRows;
            console.log(this.scrollHeight , this.baseScrollHeight);
			rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
			this.rows = minRows + rows;
		});
*/	
 $("#page_chat #chatmsg").focus(function(e){
	 console.log("focus event");
	/* $("#page_chat #chataudio").hide();
	 $("#page_chat #chattext").show();*/
	 
 });	
 
 $("#page_chat #chatmsg").blur(function(e){
	 console.log("blur event");
	
	 
 });

 $("#page_chat #chatmsg").keyup(function (e) {
   if (e.keyCode == 13) {
  //socket.emit('send', {nickname: $('#nickname').val(), msg: $("#msg").val()});
  //$('#msg').val('');
   }
   else{
    socket.emit('typing', {nickname: chatuser.nickname});
   }
});	
	

	console.log("Using server on "+rooturl);
	var cr=getCookie("cronaca_read");
	var chatunreadcookie=getCookie("chat_unread");
	
	console.log("chat_unread cookie",chatunreadcookie);
	
	if (chatunreadcookie!=null) {
		console.log("trovato cookie chat_unread, popolo chatnonletti")
		//chatnonletti=JSON.parse(chatunreadcookie);
		chatunreadcount=chatunreadcookie;
	}
	
	setChatBubbles();
	
	refreshChat();
	
    console.log("cronaca_read cookie: ",cr)	
	
	/*if (cr!=null) {
		console.log("ripristino cookie cronaca_read");
		cronaca_read=JSON.parse(cr);
		console.log(cronaca_read);
		
	}*/
	
    if (isPhone) {
		
	 recorder.stop = function() {
      window.plugins.audioRecorderAPI.stop(function(msg) {
    // success 
	    var fname=msg.substring(1);
	    var arr=msg.split("/");
	    fname='file://'+msg;
	    conslog("STOP, fname: "+fname);
		 conslog("msg: "+msg);
	    myToast({body: fname+"<br>"+msg});
	 
	    window.resolveLocalFileSystemURL(fname, 
	      function(fileEntry){
			 conslog("fileEntry: ",fileEntry) 
		    fileEntry.file(function(file) {
			  conslog("file: ",file)	
			  
			  
              var reader = new FileReader();
			  conslog("reader",reader);
			   reader.onload = function(){
                conslog('onload readystate: ' + reader.readyState);
				var dataURL = reader.result;
				conslog(dataURL);
				sounddata=dataURL;
				};
              reader.onloadend = function(evt) {
				 conslog("onloadend",evt) 
                 //var content = this.result;
                 //console.log(content);
		      }
			  reader.onloadstart = printEventType;
              reader.onprogress = printEventType;
			  reader.readAsDataURL(file);
		   }); 
         },
	      function(error) {
		   console.log("error reading file",error)
		   
	   });
		 
	   conslog('stopaudio ok: ' + msg);
	 }, 
	 function(msg) {
       // failed 
       conslog('stopaudio ko!!: ' + msg);
     });
            


	 
	  //readAudioFile(cordova.file.applicationDirectory+msg,1);
	  //readAudioFile(fname,1);
    
	
 
}

 recorder.stopcb = function(callback) {
      window.plugins.audioRecorderAPI.stop(function(msg) {
    // success 
	    var fname=msg.substring(1);
	    var arr=msg.split("/");
	    fname='file://'+msg;
	    conslog("STOP, fname: "+fname);
		 conslog("msg: "+msg);
	    //myToast({body: fname+"<br>"+msg});
	 
	    window.resolveLocalFileSystemURL(fname, 
	      function(fileEntry){
			 conslog("fileEntry: ",fileEntry) 
		    fileEntry.file(function(file) {
			  conslog("file: ",file)	
			  
			  
              var reader = new FileReader();
			  conslog("reader",reader);
			   reader.onload = function(){
                conslog('onload readystate: ' + reader.readyState);
				var dataURL = reader.result;
				conslog(dataURL);
				sounddata=dataURL;
				callback(dataURL);
				};
              reader.onloadend = function(evt) {
				 conslog("onloadend",evt) 
                 //var content = this.result;
                 //console.log(content);
		      }
			  reader.onloadstart = printEventType;
              reader.onprogress = printEventType;
			  reader.readAsDataURL(file);
		   }); 
         },
	      function(error) {
		   console.log("error reading file",error)
		   
	   });
		 
	   conslog('stopaudio ok: ' + msg);
	 }, 
	 function(msg) {
       // failed 
       conslog('stopaudio ko!!: ' + msg);
     });
            


	 
	  //readAudioFile(cordova.file.applicationDirectory+msg,1);
	  //readAudioFile(fname,1);
    
	
 
}

  	recorder.record = function() {
	
	
	
	

  window.plugins.audioRecorderAPI.record(function(msg) {
    // complete 
    conslog('recordaudio ok: ' + msg);
	var arr=msg.split("/");
	var fname=arr[arr.length-1];
	//readAudioFile(msg);
    
	
	/*$.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/audio/save",
            type: "POST",
            data: scheda.data})
        .done(function(data) {});*/
  }, function(msg) {
    // failed 
    conslog('recordaudio ko!!!: ' + msg);
	
	
	
  }, 30); // record 30 seconds */
}
     recorder.playback = function() {
  window.plugins.audioRecorderAPI.playback(function(msg) {
    // complete 
    conslog('playbackaudio ok: ' + msg);
  }, function(msg) {
    // failed 
    conslog('playbackaudio ko!!: ' + msg);
  });
}
		
		
	}
	
 $("#page_chat #chataudio").on(tapevent,function (e) {
       //console.log("touchstart");
	   //e.preventDefault();
	   recordChatAudio();
  });	

	/*$("#page_chat #chataudio").touchend(function (e) {
       console.log("touchend");
	   //e.preventDefault();
	   $("page_chat #chataudio").css("border","0px solid red");
	   
  });*/
	
    $("a.sgradient").removeClass("sgradient");
	
	/* $(document).on('touchstart click', 'li a', function(e){
         //e.stopPropagation(); //stops 'ghost clicks' (double clicking)
		 var c=$(this);
		 c.addClass("clicked");
		 setTimeout(function(){ c.removeClass("clicked"); }, 1000);
        console.log("Clicked");
    });
	
	
	 $(document).on('touchend click', 'li a', function(e){
        //e.stopPropagation(); //stops 'ghost clicks' (double clicking)
        console.log("deClicked");
		//$(this).removeClass("clicked");
    });*/
	
	
	  $("a").addClass("fastClick");
	  
	  bindFeedback();


	  
	  $("a.ui-btn-left,a.ui-btn-right").addClass("transparentborderbutton").addClass("ui-nodisc-icon");
	  //$("div#menupanel ul li a").removeClass("ui-btn-icon-right").removeClass("ui-icon-carat-r");
	  
	   $.mobile.defaultPageTransition = 'none';
	   //$(document).bind("vmouseover", function () { });
	 //$.mobile.defaultPageTransition = "none";
      $.mobile.defaultDialogTransition = "none"; 
	  
	      $.mobile.page.prototype.options.addBackBtn = true;
	     // $.mobile.defaultPageTransition = 'none';
	      $.mobile.useFastClick  = true;
	
	  
	  $("#popResult #roundfieldset").find(".roundnumber").off(tapevent);
	  $("#popResult #roundfieldset").find(".foundnumber").on(tapevent,function(){
		  conslog("clicked roundnumber")
		  var uncheck=false;
		  if ($("#popResult #radio_round1").is(":checked")) uncheck=true;
		  if ($("#popResult #radio_round2").is(":checked")) uncheck=true;
		  if ($("#popResult #radio_round3").is(":checked")) uncheck=true;
		  if ($("#popResult #radio_gp").is(":checked")) uncheck=true;
		  
		  if (uncheck)  $("#popResult #ckfineround").prop("checked",false).checkboxradio("refresh");
		  
		  
	  });

	  
	  
	  $("#popResult .incbutton").off(tapevent);
	  $("#popResult .incbutton").on(tapevent, function() {
		  var r=$("#popResult #risult").val();
		  var amm1=$("#popResult #ammoniz1").val();
		  var amm2=$("#popResult #ammoniz1").val();
		  if (r.trim()=="") r="0-0";
		  if (amm1.trim()=="") amm1="0";
		  if (amm2.trim()=="") amm2="0";
		  var id=$(this).attr("id");
		  var r1=parseInt(r.split("-")[0].trim(),10);
		  var r2=parseInt(r.split("-")[1].trim(),10);
		  var ammon1=parseInt(amm1,10);
		  var ammon2=parseInt(amm2,10);
		  
		  colog("r1: "+r1);
		  colog("r2: "+r2);
		  conslog("ammon1: "+ammon1);
		  conslog("ammon2: "+ammon2)
		  
		  var index=id.substring(id.length-1);
		  var oper=id.substring(0,id.length-1);
		 
		  conslog(index+" - "+oper);
		  
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
		  if (oper=="ammplus") {
			  
			  if (index==1) ammon1++;
			  if (index==2) ammon2++;
			  
			  if (ammon1<0) ammon1=0;
			  if (ammon2<0) ammon2=0;
			  
		  }
		   if (oper=="ammminus"){
			   if (index==1) ammon1--;
			  if (index==2) ammon2--;
			  
			  if (ammon1<0) ammon1=0;
			  if (ammon2<0) ammon2=0;
		  }
		  
		  var rf=r1+"-"+r2;
		  
		  //set vinto/perso
		  conslog("r1: "+r1+" - r2: "+r2+" - ammon1: "+ammon1)
		  if (r1>r2) {
			  $("#popResult #radio_vinto").click();
			  $("#popResult #radio_vinto").click();
			// $("#popResult #radio_vinto").attr("checked",true);
			// $("#popResult input[type='radio']").checkboxradio("refresh");
		// $("#popResult #radio_nondisputato").attr("checked",false).checkboxradio("refresh");*/
			  
			  
		  }
		  if (r1<r2) {
			 /* $("#popResult #radio_vinto").attr("checked",false).checkboxradio("refresh");*/
			   $("#popResult #radio_perso").click();
			   $("#popResult #radio_perso").click();
			 /* $("#popResult #radio_nondisputato").attr("checked",false).checkboxradio("refresh");*/
			  
			  
		  }
		  
		  if (r1==r2) {
			 /* $("#popResult #radio_vinto").attr("checked",false).checkboxradio("refresh");
			 $("#popResult #radio_perso").attr("checked",false).checkboxradio("refresh");*/
			  $("#popResult #radio_nondisputato").click();
			  $("#popResult #radio_nondisputato").click();
			  
			  
		  }
		  
		  //if (id=="plus1") oper="plus";
		  $("#popResult #risult").val(rf);
		  $("#popResult #ammoniz1").val(ammon1);
		  
		  //REALTIME
		  var ck=$("#popResult #ck_realtime:checked");
		  
		  
		  if (ck.length>0) {  //REALTIME active
		  
		     console.log("notify realtime result for "+selectedmatchid+" - "+rf+" - ");
			 realtime.active=true;
			 realtime.running=true;
			 realtime.result=rf;
			 
			 sendRealtime();
			 var obj={
				sockid: chatuser.sockid,
				nickname: chatuser.nickname,
			    text: "<b>"+realtime.result+"</b>"
		 
			}
			//postChat(obj); 
			 /*
		  
		     socketNotify({
			 type: "realtime",
			 to: "all",
			 garaid: jcurrentgara.id,
			 matchid: selectedid,
			 matchnumber: selectedmatchid,
			 result: rf,
			 ammoniz1: ammon1,
			 ammoniz2: ammon2,
			 event: "matchupdate",
			 text: rf
		 
		 })*/
			  
			  
			  
		  }
		  
		  
	  });
	 
	 
	  
	  $("#popResult #ck_realtime").off(tapevent);
	  $("#popResult #ck_realtime").on(tapevent,function() {
		  var ck=$("#popResult #ck_realtime:checked");
		  if (ck.length>0) {
			  
			 realtime.active=true;
			 sendRealtime();
			 
			  
			socketNotify({
			 type: "realtime",
			 to: "all",
			 garaid: jcurrentgara.id,
			 matchid: selectedid,
			 matchnumber: selectedmatchid,
			 result: rf,
			 ammoniz1: ammon1,
			 ammoniz2: ammon2,
			 event: "startmatch",
			 text: rf
		 
		 })
			  
			  
		  } else  realtime.active=false;
		  
		  
	  });
	  
	  var lurl=window.location.href;
	  
	  // Defaults to sessionStorage for storing the Facebook token
      //openFB.init({appId: '924594024295731'});

      //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
      openFB.init({appId: '924594024295731', tokenStore: window.localStorage});

	  
	  colog("docready !");
	  colog("url: "+lurl)
	  //var arr=lurl.toLowerCase().split("indexa.html");
	  if (lurl.indexOf("#")>-1) {
		  colog("back to index")
		  window.location.href="index.html";
		  //app.initialize();
		  return;
		  
	  }
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
	  
	  socket.on('refreshchat',function(data){
		  console.log("received socket refreshchat ");
		  refreshChat();
		  chatunreadcount=0;
		  setCookie("chat_unread","0");
		  setChatBubbles();
	  });
	  
	  socket.on('realtime',function(data){
		  
		  console.log("realtime update:",data)
		  //addLastRealtimeData(data);
		  
		  var evt;
		  
		  var sck=data;
		  
		  if (data.event) evt=data.event;
		  
		  if (evt=="refreshcronaca") {
			  garanotifyid=sck.garaid;
			  if (!jcurrentgara.stato) {
				  console.log("nessuna gara, carico la "+garanotifyid);
				  openGara(garanotifyid,function(gdata){
					 //garaid=id;
					  //$gara=data;
					  
					  //inizio blocco uguale
					  		  console.log('refreshcronaca');
			  var nonletti=jGara.cronaca.rows.length-cronaca_read.length;
			  if (nonletti<0) nonletti=0;
		     $.ajax({
              url: rooturl+"/matches/getcronaca/"+jcurrentgara.id,
              type: "GET"})
              .done(function(data) {
				
				jGara.cronaca=data;
				renderCronaca(jGara.cronaca)
				var nonletti2=jGara.cronaca.rows.length-cronaca_read.length;
				if (nonletti2<0) nonletti2=0;
				if (nonletti!=nonletti2) {
					var nuovi=nonletti2-nonletti;
					var cron=sck.cron;
					
					
					
					
					
					var text=nuovi+" nuovi messaggi di cronaca ";
					if (nuovi==1) text=nuovi+" nuovo messaggio di cronaca";
					var text2="";
					//if (cron.text) text2+="testuale";
				    
					
					if (cron.audio){
						if (text2.trim()!="") text2+=",";
						text2+=" audio";
					}	
					
					if (cron.foto){
						if (text2.trim()!="") text2+=",";
						text2+=" foto";
					}	
					text+=text2;
					
					if (cron.text) {
						text+=" - "+cron.textmsg;
					}
					
					snotify({ text: text});
					
				}
				//activeTab=2;
				//setActiveTab(activeTab);
				return;
			});
					  
					  
					  //fine blocco uguale
					 
				 });
				  return;
			  }	  
			  console.log('refreshcronaca');
			  var nonletti=jGara.cronaca.rows.length-cronaca_read.length;
			  if (nonletti<0) nonletti=0;
		     $.ajax({
              url: rooturl+"/matches/getcronaca/"+jcurrentgara.id,
              type: "GET"})
              .done(function(data) {
				
				jGara.cronaca=data;
				renderCronaca(jGara.cronaca)
				var nonletti2=jGara.cronaca.rows.length-cronaca_read.length;
				if (nonletti2<0) nonletti2=0;
				if (nonletti!=nonletti2) {
					var nuovi=nonletti2-nonletti;
					var cron=sck.cron;
					
					var text=nuovi+" nuovi messaggi di cronaca ";
					if (nuovi==1) text=nuovi+" nuovo messaggio di cronaca";
					var text2="";
					//if (cron.text) text2+="testuale";
				
					if (cron.audio){
						if (text2.trim()!="") text2+=",";
						text2+=" audio";
					}	
					
					if (cron.foto){
						if (text2.trim()!="") text2+=",";
						text2+=" foto";
					}	
					text+=text2;
					
					if (cron.text) {
						text+=" - "+cron.textmsg;
					}
					
					snotify({ text: text});
					
				}
				//activeTab=2;
				//setActiveTab(activeTab);
				return;
			});
			  
		  }
		  
		  if (evt=="resetcronaca") {
			  console.log('realtime resetcronaca, letti '+cronaca_read.length);
			  var gid=data.garaid;
		      
				 deleteCronacaReadForGara(gid)
				  
			  
			  return;
		  }
		  
		  /*if (data.garaid==jcurrentgara.id) {*/
			  
			  
			  
			  updRealtimeResult(data);
			
			  
			  
			  
		  /*}*/
		  
	  });
	  
	  socket.on("typing",function(data) {
		  
		  var nick=data.nickname;
		  //console.log(nick+" sta scrivendo");
		  $("#page_chat .chattyping").html(data.nickname+" sta scrivendo....");
		  if (typingtimeout) clearTimeout(typingtimeout);
		  typingtimeout = setTimeout(typingTimeoutFunction, 3000);
		  
	  } );
	  
	  socket.on('sysmsg',function(data){
		  
		  snotify(data);
		  
		  
	  });
	  
	  socket.on('refreshsockets',function(data){
		  console.log("refreshsockets");
		  showSockets();
		  
		  
	  })
	  
	  socket.on("chatmsg",function(data){
		  console.log("chatmsg",data);
		 // if (data.nickname==chatuser.nickname){
			  
			  var page=$("#page_chat");
			 
			   
			  /*var ghtml = new EJS({url: 'tpl/gare.ejs'}).render($gare.rows); */
			 
			  
			  /*listagare.empty().append(ghtml);
			  listagare.listview();	
              listagare.listview("refresh");*/
			 
			  var html= new EJS({url: 'tpl/chatsingle.ejs'}).render(data);
			  var pageid=$.mobile.activePage.attr('id');
			  
			  var doAppend=true;
			  
			  if ((data.nickname==chatuser.nickname) && (data.foto)) doAppend=false;
			  
			  if (doAppend) page.find(".container").append(html);
			  if (pageid=="page_chat") {
			  $('html,body').animate({scrollTop:9999999}, 500);
			  }
			  var ntext=data.nickname+" - "+data.text;
			  if (data.text=="") {
				  var tipo="Immagine";
				  if (data.audio) tipo="Messaggio vocale";
				  ntext=data.nickname+" - "+tipo;
				  
			  }
			  var ora=data.time.substring(8,10)+":"+data.time.substring(10,12);
			  if (data.nickname!=chatuser.nickname) {
				  playSound("img/chat");
				  if (pageid!="page_chat") { 
				     garanotifyid=data.garaid; 
				     snotify({text: ntext, garaid: data.garaid});
					 //addChatNonLetti(data.garaid);
					 chatunreadcount++;
					 setCookie("chat_unread",chatunreadcount);
					 } 
			  }	 
			  setChatBubbles();
              		
              /*					
			  var listagare=$("#gare #listagare");
			  var li=listagare.find("li#ligare_"+data.garaid);
			  var bub=li.find(".chatgarabubble");
			  //var cnlcount=getChatNonLetti(data.garaid);
			  var cnlcount=chatunreadcount;
			 
			  if (cnlcount>0) {
				  bub.removeClass("hidden").html(cnlcount);
				  $("#gara #chatgarabubble").html(cnlcount).show();
			  } else{
				bub.addClass("hidden").html("0");  
				  $("#gara #chatgarabubble").html("0").hide(); 
			  } */
			  
		//  }
		  
		  
	  });
	  
	   socket.on('getnickname',function(data){
		  console.log("getnickname: "+data.sockid);
		  setCookie("socketid",data.sockid);
		  chatuser.sockid=data.sockid;
		  
		   var msg={
			                      device: "browser",
									type: "clientspecs",
									nickname: chatuser.nickname
			
						         }
			if (isPhone) msg.device="mobile";
		
		//if (message) msg=message;
		
			socket.send(msg);       
		  
		  
		  
	  })
	  
	  socket.on('notification', function (data) {
		colog("received notification from socket.io server:")
		colog(data);	
	    
		if (data.text) {
			
			if (data.text.trim()!="") snotify(data);
		}
		
		
		if (data.updategara){
			if (data.updategara=="yes"){
				
				
				var pageid=$.mobile.activePage.attr('id');
		if (jcurrentgara){
			if (jcurrentgara.id==data.garaid){
				refreshCurrentGara(function() {
				  //var html2=new EJS({url: 'tpl/matchesrealtime2.ejs'}).render(jGara.realtime.rows)
				  //var html2=new EJS({url: 'tpl/matchesrealtime.ejs'}).render(realtimeArray);
			      //$("#page_chat .chatrealtime .rtul").empty().append(html2);
				  
				  
				  
				}	);
				//openGara(jcurrentgara.id,function(){})
			}
			
		}
				
			}
			
			
		}
		
		

		
		//console.log(data.message);
	  }); 
	  
	  socket.on('refreshgara', function (data) {
		colog("received refreshgara from socket.io server:")
		colog(data);	
	    
		//snotify(data);
		
		if (data.updategara){
			if (data.updategara=="yes"){
				
				
				var pageid=$.mobile.activePage.attr('id');
		if (jcurrentgara){
			if (jcurrentgara.id==data.garaid){
				refreshCurrentGara();
				//openGara(jcurrentgara.id,function(){})
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
	  $("#gara  #popDelMatch").popup();
	   $("#gara  #popAddMatch").popup();
	//   	$("#gara #dialogCategorie").popup();
	// $('#gara #dialogForAtleta').popup();
	  
	  //	$( "#index #menuPanel" ).panel();
		$( "#page_atleti #atleti_categorie" ).panel();
	

         	  bindGaraPage();

		
		 
	  //EVENTS

		
	$("#menuExit").off(tapevent);
	 $("#menuExit").on(tapevent, function(event) {
		 exitapp();
		 
		 
	 });
	 
	 
			 
		 loadOptions(function(){
			refreshAtletiServer();	
		    refreshGareServer(); 
			//updateHomeInfos();
			/*
			$(".serverspan").html("Connesso al server: "+rooturl.replace("http://","").replace("https://",""));
			$(".societaspan").html("Profilato su società: "+settings.mysocieta);
			*/
		 }); 
	
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
	$('#page_chat #chataudio').on('touchstart', function(e){
	$(this).addClass('tapped');
	console.log("touchstart a")
});

$('#page_chat #chataudio').on('touchend', function(e){
	$(this).removeClass('tapped');
	console.log("touchend a")
});*/
 
	
	
	var mode=getQueryString("mode");
	if (mode=="open") $.mobile.changePage("#index");
	
}

function typingTimeoutFunction() {
	clearTimeout(typingtimeout);
	typingtimeout=null;
	$("#page_chat .chattyping").html("");
	
}


function getMatchById(id){
	
	var match={};
	
	$(jGara.matchesbyprog.rows).each(function(i) {
		
		var row=jGara.matchesbyprog.rows[i];
		var doc=row.doc;
		var mid=doc.id;
		if (id==mid) {
			match=doc;
			return match;
		}	
		
	});
	
	return match;
	
}

function displayRtMatches() {
	
	conslog(rtmatches);
	
}

function addMatchToRealtime(mid) {
	
	conslog("adding match "+mid+" to realtime")
	//check if it's already there
	var found=false;
	$(rtmatches).each(function(i) {
		
		var id=rtmatches[i].id;
		if (id==mid) found=true;
		
		
	});
	
	if (!found) {
		
		var match=getMatchById(mid);
		rtmatches.push(match)
		conslog("added match to realtime list")
		
	} else conslog("match already in realtime list")
	
	
}

function delMatchFromRealtime(mid) {
	
    
	$(rtmatches).each(function(i) {
		
		var id=rtmatches[i].id;
		if (id==mid) {
				
			rtmatches.splice(i, 1);
			conslog("match "+mid+" removed from relatime list");
		
		}
		
	});
	
	
}

function sendRealtime(force) {
	
	var doit=false;
	if (realtime.active) doit=true;
	if (force) {
		if (force==true) doit=true;
	}
	
	if (doit) {
		
	var text="TEMPO REALE !<br> ";
	
	
	
	var color="black";
	var mtext="in pausa";
	if (realtime.running) {
		mtext="IN CORSO";
		color="blue";
	}	
	
	if (realtime.fineround) {
		mtext="FINE ROUND "+realtime.round;
		color="black";
	}	
	
	var rtext="<font color='"+color+"'>Round "+realtime.round;
	if (realtime.round=="GP") rtext="<font color='"+color+"'>GoldenPoint"
    
	text+=" "+rtext;
	
	text+=", "+mtext;
	
	text+=", "+realtime.result+"</font>";
	
	conslog(realtime)
	
	if (realtime.foto){
		
		text+="<br><img style='float: left' src='"+realtime.foto+"' width='60px' height='60px' />";
		
	}
	
	//addMatchToRealtime(selectedid);
   	
	var color="black";
	if (realtime.active) color="blue";
	var htext="<span style='color: "+color+"'>"+text+"</span>";
	
	
	var rdata={
			 type: "realtime",
			 to: "all",
			 garaid: jcurrentgara.id,
			 matchid: selectedid,
			 matchnumber: selectedmatchid,
			 result: realtime.result,
			 ammoniz1: 0,
			 ammoniz2: 0,
			 event: "realtime",
			 text: text,
			 match: getMatchById(selectedid),
			 active: realtime.active
		 
		 }
	
	socketNotify(rdata);
		 
	//addLastRealtimeData(rdata);	 
	updRealtimeResult(rdata);
	
	}
}

function clickRound(round) {
	
	realtime.round=round;
	realtime.active=true;
	realtime.running=true;
	realtime.fineround=false;
	
	currentround=round;
	var r="Round "+round;
	if (round.toLowerCase()=="gp") round="GoldenPoint";
	conslog("clicked round")
	$("#popResult #ckfineround").prop("checked",false).checkboxradio("refresh");
	var pausematch=true;
	 $("#popResult #ckpausematch").prop("checked",pausematch).checkboxradio("refresh");
    clickPauseMatch(); 
	
	var ck=$("#popResult #ck_realtime:checked");
		  
		  
		  if (ck.length>0) {  //REALTIME active
		  
		     console.log("notify realtime result for "+selectedmatchid+" - "+r+" - ");
		  
		     sendRealtime();
			 /*
		     socketNotify({
			 type: "realtime",
			 to: "all",
			 garaid: jcurrentgara.id,
			 matchid: selectedid,
			 matchnumber: selectedmatchid,
			 result: "",
			 ammoniz1: "",
			 ammoniz2: "",
			 event: "realtime",
			 text: r
		 
		 })*/
			  
			  
			  
		  }
}





function viewCronacaElements() {
	
	var garaid=jcurrentgara.id;
	var url="http://tkdr.herokuapp.com/matches/viewcronacaelements/"+garaid;
	
	$.get(url,function(data) {
		
		$("#viewCelem [data-role=content]").html(data); 
		$("#viewCelem [data-role=content] ul").listview();
		$.mobile.changePage("#viewCelem");
	});
	
	
}

function sendCronacaElements() {
	
	var page="#cronacaelements";
	var almenouno=false;
	
	var cron={
		foto: false,
		audio: false,
		text: false
	}
	
	var sendobj={
		text: "",
		image: "",
		sound: ""
	}
	
	var l=$(page+" #ckFotoCelem:checked").length;
	

	if (l>0) {   //sendFoto
	    almenouno=almenouno || true;
	    console.log("sending foto");
		if (fotodata.trim()!="") {
			sendobj.image=fotodata;
			cron.foto=true;
			//sendFoto();
		}	
		
 	} else delete sendobj.image;
 	
	l=$(page+" #ckTestoCelem:checked").length;
	
	if (l>0) {   //sendText
	   almenouno=almenouno || true;
	    console.log("sending text");
		text=$(page+" textarea#testo").val();
			sendobj.text=text;
			cron.text=true;
			cron.textmsg=text;
			//sendFoto();
	
		
	} 
	
	l=$(page+" #ckAudioCelem:checked").length;
	
	if (l>0) {   //sendAudio
	    almenouno=almenouno || true;
	    console.log("sending audio");
		console.log(sounddata);
		if (sounddata.trim()!="") {
			sendobj.sound=sounddata;
			cron.audio=true;
			//sendFoto();
	    }
		
	} else delete sendobj.sound;
	
	
	if (!almenouno) {
		
		alert("Per aggiornare la cronaca selezionare almeno un elemento testo, audio o immagine")
		return;
		
	}
	
	console.log(sendobj)
	//return;
	
	progressStart("Caricamento");
	 var cronurl="/matches/addcronacaelement/"+jcurrentgara.id;
	 $.ajax({
			type: "POST",
			url: rooturl+cronurl,
			async: true,
			data: sendobj,
			success: function(data) {
			
					
				console.log("send elements result:",data)
				progressStop(); 
				$.mobile.back();
				
				
				//notify users for cronaca refresh
		socketNotify({
			 type: "realtime",
			 to: "all",
			 garaid: jcurrentgara.id,
			 event: "refreshcronaca",
			 cron: cron
			 
		 
		 })
				
				 $.ajax({
            url: rooturl+"/matches/getcronaca/"+jcurrentgara.id,
            type: "GET"})
            .done(function(data) {
				
				jGara.cronaca=data;
				renderCronaca(jGara.cronaca)
				activeTab=2;
				setActiveTab(activeTab);
				
			});
				
				
				
				
			},
			error: function(err) {
				alert("errore nell'invio");
				progressStop(); 
				console.log("errore nell'invio",err)
			}
	 });
	
}


function toDataUrl(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
      var reader  = new FileReader();
      reader.onloadend = function () {
          callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}

function getChatAudio(){
	
	
	
}


function getChatFoto(){
	
	if (!navigator.camera) {
		conslog("Camera API not supported in getFoto");
		  //$('.fotoview img').attr('src', "url(data:image/jpeg;base64,"+imgData+")");
		 // $('.fotoview img').attr('src', "url(data:image/jpeg;base64,"+imgData+")");
		  //$('.fotoview').css("background-image","url(data:image/jpeg;base64,"+imgData+")").css("width","100%").css("height","100%");
		  //$('.fotoview').css("background-image","url("+defaultimage+")").css("width","100%").css("height","300px");
		  
		  toDataUrl(defaultimage, function(base64Img){
                 //console.log(base64Img);
				 fotodata=base64Img;
         });
		  
		  //$('.fotoview').show();
      
      return;
  }
  var options =   {   quality: 100,
                      destinationType: Camera.DestinationType.DATA_URL,
                      sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                      encodingType: 0,    // 0=JPG 1=PNG,
					  targetWidth: 800,
					  targetHeight: 800,
					  correctOrientation : true
                  };

  navigator.camera.getPicture(
      function(imgData) {
          /*$('.fotoview img').attr('src', "url(data:image/jpeg;base64,"+imgData+")");
		  $('.fotoview').css("background-image","url(data:image/jpeg;base64,"+imgData+")").css("width","100%").css("height","250px");
		  $('.fotoview').show();*/
          conslog("photo length: "+imgData.length);		 
		  var fdata="data:image/jpeg;base64,"+imgData;
		  conslog("fotodata");
		  conslog(fdata);
		  
		  var postdata={
			 garaid: "",
			 nickname: chatuser.nickname,
			 sockid: chatuser.sockid,
			 foto: fdata,
			 text: ""
		  }
		  console.log(postdata);
		   var html= new EJS({url: 'tpl/chatsingle.ejs'}).render(postdata);
		   //console.log(html);
		   $("#page_chat").find(".container").append(html);
		   $('html,body').animate({scrollTop:9999999}, 500);
		
		  /*var html= new EJS({url: 'tpl/chatsingle.ejs'}).render(postdata);
			var pageid=$.mobile.activePage.attr('id');
			  page.find(".container").append(html);
			  */
		  
		  postChat(postdata);
		  
		  
		  
		  //try to make a thumbnail
		  
		  
		  
      },
      function() {
          console.log('Error taking picture', 'Error');
      },
      options);

	
	
}

function getFoto(){
	
	if (!navigator.camera) {
		conslog("Camera API not supported in getFoto");
		  //$('.fotoview img').attr('src', "url(data:image/jpeg;base64,"+imgData+")");
		 // $('.fotoview img').attr('src', "url(data:image/jpeg;base64,"+imgData+")");
		  //$('.fotoview').css("background-image","url(data:image/jpeg;base64,"+imgData+")").css("width","100%").css("height","100%");
		  $('.fotoview').css("background-image","url("+defaultimage+")").css("width","100%").css("height","300px");
		  
		  toDataUrl(defaultimage, function(base64Img){
                 //console.log(base64Img);
				 fotodata=base64Img;
         });
		  
		  $('.fotoview').show();
      
      return;
  }
  var options =   {   quality: 25,
                      destinationType: Camera.DestinationType.DATA_URL,
                      sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                      encodingType: 0,    // 0=JPG 1=PNG,
					  targetWidth: 500,
					  targetHeight: 500,
					  correctOrientation : true
                  };

  navigator.camera.getPicture(
      function(imgData) {
          $('.fotoview img').attr('src', "url(data:image/jpeg;base64,"+imgData+")");
		  $('.fotoview').css("background-image","url(data:image/jpeg;base64,"+imgData+")").css("width","100%").css("height","250px");
		  $('.fotoview').show();
          conslog("photo length: "+imgData.length);		 
		  fotodata="data:image/jpeg;base64,"+imgData;
		  console.log("fotodata");
		  console.log(fotodata);
		  
		  //try to make a thumbnail
		  
		  
		  
      },
      function() {
          alert('Error taking picture', 'Error');
      },
      options);

	
	
}

function sendFoto() {
	realtime.foto=fotodata;
	sendRealtime();
	delete realtime.foto;
	$.mobile.back();
	
}


function createCronacaElement() {
	
	
	conslog("createCronacaElement")
	$("#cronacaelements .fotoview").css("width","100%");
	$.mobile.changePage("#cronacaelements");
	return;
	var html= new EJS({url: 'tpl/cronacaelement.ejs'}).render({});
    openPopup(html,"Cronaca tempo reale");
	
}

function clickRealtime() {
	 //return;
	var ck=$("#popResult #ck_realtime:checked");
	var rtdiv=$("#popResult #realtimediv");
	
	var text="Tempo reale";
	var color="black";
    
  

	
	if (ck.length>0) {
		
		rtdiv.show();
		color="lightgreen";
		text="TEMPO REALE ATTIVO";
		realtime.active=true;
		//$("#popResult").popup({ placement: "center" });
		
		
	} else {
		
		rtdiv.hide();
		color="black";
		text="Tempo reale";
		realtime.active=false;
		//$("#popResult").popup({ placement: "center" }).popup("refresh");
		
	}
	
	 var htext="<span style='color: "+color+";'>"+text+"</span>";
	$("#popResult label[for=ck_realtime]").html(htext.replace("MATCH ",""))  
    sendRealtime(true);	
	
	var urln="/matches/update/"+jcurrentgara.id+"/"+selectedid;
	var doc={
		realtime: realtime.active
	}
	
	var testo="disattivato";
	if (realtime.active) testo="attivato";
	
	$.post(rooturl+urln,doc,function() {
           console.log("realtime setted to "+realtime.active+" for matchid "+selectedid);
		   refreshCurrentGara(function(){
			refreshChat(true);   
		   });
		   
		   
		 if (settings.notifiche) {
		 socketNotify({
			 type: "notification",
			 to: "all",
			 text: "",
			 garaid: jcurrentgara.id,
			 updategara: "yes"
			 
		 })
		 }
    });
	
	/*socketNotify({
			 type: "realtime",
			 to: "all",
			 garaid: jcurrentgara.id,
			 matchid: selectedid,
			 matchnumber: selectedmatchid,
			 result: "",
			 ammoniz1: 0,
			 ammoniz2: 0,
			 event: "realtime",
			 text: "TEMPO REALE: "+realtime.active.toUpperCase(),
			 active: realtime.active
		 
	 })*/
	 
}

function clickPausa() {
  conslog("clicked fine round");
  var l=$("#popResult #ckfineround:checked").length;
  
  var pausematch=false;
  
  if (l>0) {
	  conslog("checked")
	  pausematch=true;
  }	  
  if (l==0) conslog("unchecked");
   
  $("#popResult #ckpausematch").prop("checked",!pausematch).checkboxradio("refresh");
clickPauseMatch(); 

 var ck=$("#popResult #ck_realtime:checked");
		  
  var r="Fine match n."+currentround;
  if (currentround.toLowerCase()=="gp") r="Fine GoldenPoint";  
		  
		  if (ck.length>0) {  //REALTIME active
		  
		     console.log("notify realtime result for "+selectedmatchid);
		     
			 realtime.active=true;
			 realtime.running=!pausematch;
			 realtime.fineround=pausematch;
			 
			 sendRealtime();
			 
			 /*
			 
		     socketNotify({
			 type: "realtime",
			 to: "all",
			 garaid: jcurrentgara.id,
			 matchid: selectedid,
			 matchnumber: selectedmatchid,
			 result: "",
			 ammoniz1: "",
			 ammoniz2: "",
			 event: "realtime",
			 text: r
		 
		 })*/
			  
			  
			  
		  } 
}

function clickPauseMatch() {
	  conslog("clicked pausa match");
  var l=$("#popResult #ckpausematch:checked").length;
  
  var text="MATCH IN PAUSA";
  var color="black";
  realtime.running=false;
  realtime.fineround=false;
  if (l>0) {
	  conslog("checked, match in corso")
	  text="MATCH IN CORSO";
	  color="orange";
	  realtime.running=true;
  }	  
  if (l==0) conslog("unchecked, match in pausa")
	  
  var htext="<span style='color: "+color+";'>"+text+"</span>";
  $("#popResult label[for=ckpausematch]").html(htext.replace("MATCH ",""))
  
  
  var ck=$("#popResult #ck_realtime:checked");
		  
  var r="Round "+currentround+", "+text+", punteggio: "+currentresult;
  if (currentround.toLowerCase()=="gp") r="GoldenPoint, "+text+", punteggio: "+currentresult;  
		  
		  if (ck.length>0) {  //REALTIME active
		  
		     console.log("notify realtime result for "+selectedmatchid);
		  
		     realtime.active=true;
			 sendRealtime();
			 
			 /*
		  
		     socketNotify({
			 type: "realtime",
			 to: "all",
			 garaid: jcurrentgara.id,
			 matchid: selectedid,
			 matchnumber: selectedmatchid,
			 result: "",
			 ammoniz1: "",
			 ammoniz2: "",
			 event: "realtime",
			 text: r
		 
		 })*/
			  
			  
			  
		  } 
	
}

function refreshRealtime(mbyprog){
	
	for (var i=0; i<mbyprog.rows.length; i++) {
		
		var row=mbyprog.rows[i];
		var doc=row.doc;
		var rt=false;
		if (doc.realtime) rt=doc.realtime;
		conslog("realtime: ",rt,doc)
		
		var rtdoc={
			active: rt,
			garaid: doc.garaid,
			matchid: doc.id,
			match: doc
		}
		
		if (String(rt)=="true") {
			
			checkRealtimeArray(rtdoc,false);
		} else {
			deleteFromRealtimeArray(doc.garaid+"_"+doc.id);
			
		}
		
	}
	
	  var html2=new EJS({url: 'tpl/matchesrealtime2.ejs'}).render(realtimeArray);
				  //var html2=new EJS({url: 'tpl/matchesrealtime.ejs'}).render(realtimeArray);
			  $("#page_chat .chatrealtime .rtul").empty().append(html2);
	
	
}

function updRealtimeResult(data){
	console.log("updrealtimeresult",data);
	console.log("before checkrealtimearray",realtimeArray);
	//checkRealtimeArray(data.match);
	console.log("after checkrealtimearray",realtimeArray);
	var mid=data.matchid;
	var result=data.result;
	var ammo=data.ammoniz1;
	var match=data.match;
	var ev=data.event;
	
	conslog("updateRealtimeResult "+mid+" - "+result);
	conslog("updrealtimeresult ");
	conslog(data)
	
	
	console.log("rtarray: ",realtimeArray);
	//var testo="<font style='color: blue'><b>TEMPO REALE !!! --> "+result+"</b></font>";
	
	
	var testo=data.text;
	if (String(data.active)=="true") {
		//conslog("data.active="+data.active)
		testo="<font style='color: blue'>"+data.text+"</font>";
		checkRealtimeArray(data);
		//console.log("after checkrealtimearray",realtimeArray);
	} else {
		//console.log("deleting from realtimearray");
		deleteFromRealtimeArray(data.garaid+"_"+data.matchid);
		//console.log(realtimeArray)
	}	
	
	
	
	if (realtimeArray.length>0){
		
		
		$("#index #lichat a").css("color","lightgreen").html("Chatkwondo - Tempo reale");
		$("#gara #lichat a").css("color","lightgreen").html("Chatkwondo - Tempo reale").css("font-weight","bold");
	} else {
		$("#index #lichat a").css("color","black").html("Chatkwondo");
		$("#gara #lichat a").css("color","white").html("Chatkwondo").css("font-weight","normal");
		
	}
	
	  console.log("rendering following realtimearray",realtimeArray)
	  var html2=new EJS({url: 'tpl/matchesrealtime2.ejs'}).render(realtimeArray);
				  //var html2=new EJS({url: 'tpl/matchesrealtime.ejs'}).render(realtimeArray);
			  $("#page_chat .chatrealtime .rtul").empty().append(html2);
	
	
	
	
	$("#page_chat .chatrealtime .rtul li").each(function() {
		
		  var lid=$(this).attr("id").replace("match_","");
	   
	   var a=$(this).find("a");
	   if (lid==mid) {
		   
		   $(this).css("")
		   colog("found match to update in realtime");
		   
		   if (ev=="matchupdate") {
		     a.find("span.soft").html(testo);
		     a.find("img.imgicon").attr("src","images/greenblink.gif")
		   } else 
		   if (ev=="matchstart"){
		     a.find("img.imgicon").attr("src","images/greenblink.gif") 	   
		   } else {
			   
			 //a.find("span.soft").html(testo);
			 
			 
			 if (data.active){
				 conslog("realtime active !")
			  if (a.find("span.realtime").length==0) {
				  a.find("div").append("<span class='realtime'></span>")
				  console.log("creating realtime div "+a.find("span.realtime").length);
				  console.log(testo);
			  }	  
			  a.find("span.vinto").hide();	  
              a.find("span.realtime").html(testo);			
			  //a.find("span.soft").show();	 
			  
			  if (a.find("img.blinkicon").length==0) a.prepend("<img src='images/greenblink.gif' class='imgicon blinkicon' />") 
               a.find("img.imgicon:eq(1)").hide();	
               a.find("span.vinto").hide();		   
		      //a.find("img.imgicon").attr("src","images/greenblink.gif")  
		     } else {
				 /*
				 conslog("realtime not active !")
				a.find("span.realtime").remove();
				a.find("span.vinto").show();
			   	a.find("img.blinkicon").remove();  
				a.find("img.imgicon:first").show();	 
				a.find("span.vinto").show();
				*/
			 }
			   
		   }
	   }
		
		
	});
	
	
}



function updRealtimeResult_old(data){
	
	//checkRealtimeArray(data);
	
	var mid=data.matchid;
	var result=data.result;
	var ammo=data.ammoniz1;
	var match=data.match;
	var ev=data.event;
	
	conslog("updateRealtimeResult "+mid+" - "+result);
	conslog("updrealtimeresult ");
	conslog(data)
	
	
	console.log("rtarray: ",realtimeArray);
	//var testo="<font style='color: blue'><b>TEMPO REALE !!! --> "+result+"</b></font>";
	
	
	var testo=data.text;
	if (data.active) testo="<font style='color: blue'>"+data.text+"</font>";
	
	
	$("#page_chat .chatrealtime .rtul li").each(function() {
		
		  var lid=$(this).attr("id").replace("match_","");
	   
	   var a=$(this).find("a");
	   if (lid==mid) {
		   
		   $(this).css("")
		   colog("found match to update in realtime");
		   
		   if (ev=="matchupdate") {
		     a.find("span.soft").html(testo);
		     a.find("img.imgicon").attr("src","images/greenblink.gif")
		   } else 
		   if (ev=="matchstart"){
		     a.find("img.imgicon").attr("src","images/greenblink.gif") 	   
		   } else {
			   
			 //a.find("span.soft").html(testo);
			 
			 if (data.active){
				 conslog("realtime active !")
			  if (a.find("span.realtime").length==0) {
				  a.find("div").append("<span class='realtime'></span>")
				  console.log("creating realtime div "+a.find("span.realtime").length);
				  console.log(testo);
			  }	  
			  a.find("span.vinto").hide();	  
              a.find("span.realtime").html(testo);			
			  //a.find("span.soft").show();	 
			  if (a.find("img.blinkicon").length==0) a.prepend("<img src='images/greenblink.gif' class='imgicon blinkicon' />") 
               a.find("img.imgicon:eq(1)").hide();	
               a.find("span.vinto").hide();		   
		      //a.find("img.imgicon").attr("src","images/greenblink.gif")  
		     } else {
				 conslog("realtime not active !")
				a.find("span.realtime").remove();
				a.find("span.vinto").show();
			   	a.find("img.blinkicon").remove();  
				a.find("img.imgicon:first").show();	 
				a.find("span.vinto").show();
			 }
			   
		   }
	   }
		
		
	});
	
	
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
		
		
			//toast("Error posting","long");
			myToast({
			 body: "Error posting",
			 
			});
		});
		
         
		
           
       
        }
    },
  
    onPositionSuccess: function(position) {
         
        scheda.data.coordinate = position.coords;
        myToast({
		 body: JSON.stringify(scheda.data)
		 });
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
         
        myToast({body: messaggio});
		
	//	oast(messaggio,"long");
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
		    myToast({
			body: "Error posting"
			});
//			toast("Error posting","long");
			
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
		 myToast({
			body: "Error posting"
			});
			//toast("Error posting","long");
			
		});
		
         
		
           
       
        }
    },
  
    onPositionSuccess: function(position) {
         
        scheda.data.coordinate = position.coords;
		 myToast({
			body: JSON.stringify(scheda.data)
			});
       // toast(JSON.stringify(scheda.data),"short");
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
         myToast({
		 body: messaggio
		 });
        //toast(messaggio,"long");
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
            url: rooturl+"/gare/findById/"+id+"?societa="+settings.mysocieta,
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
		   myToast({
		   body: "Error posting"
		   });
			//toast("Error posting","long");
			
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
		myToast({
		   body: "Error posting"
		   });
			//toast("Error posting","long");
			
		});
		
         
		
           
       
        }
    },
  
    onPositionSuccess: function(position) {
         
        scheda.data.coordinate = position.coords;
		myToast({
		   body: JSON.stringify(scheda.data)
		   });
        //toast(JSON.stringify(scheda.data),"short");
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
		myToast({
		 body: messaggio
		});
         
  //      toast(messaggio,"long");
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
		myToast({
		 body: "Error posting"
		});
		//	toast("Error posting","long");
			
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


function setChatBubbles(){
	 //var cnlcount=getChatNonLetti(jcurrentgara.id);
	 var cnlcount=chatunreadcount;
     //var li=$("#gare #ligare_"+jcurrentgara.id);
     
    	 
		
			 
			  if (cnlcount>0) {
				  //bub.removeClass("hidden").html(cnlcount);
				  $("#gara #chatgarabubble").html(cnlcount).show();
				 // li.find(".chatgarabubble").html(cnlcount).show();
				  $("#index #chatcountbubble").html(cnlcount).show();
			  } else{
				//bub.addClass("hidden").html("0");  
				  $("#gara #chatgarabubble").html("0").hide(); 
				  //li.find(".chatgarabubble").html("0").hide();
				  $("#index #chatcountbubble").html("0").hide();
			  } 
			  
			  setBadge();
			  
			   /*conslog("realtimearray");
			   conslog(realtimeArray);
			   if (realtimeArray.length>0) {
			   //if (jGara.realtime.rows.length>0) {
					  
					$("#gara #lichat a span").html("ChatKwonDo TEMPOREALE").css("color","lightgreen").css("font-weight","bold");  
					$("#gara #lichat").css("background","2px solid lightgreen");
					//$("#gara #lichat a").addClass("temporeale")
					  
				  } else {
					$("#gara #lichat a span").html("ChatKwonDo").css("color","white").css("font-weight","normal");    
					 $("#gara #lichat").css("border","0px solid lightgreen"); 
					 //$("#gara #lichat a").removeClass("temporeale");
				  } */
	
}

function refreshGareServer(filtro)
{
	  var pageid=$.mobile.activePage.attr('id');
	  //navigator.notification.activityStart("Caricamento", "loading");
	  //progressStart("Lettura dati");
	  var caricamentotext=imgtext+"Caricamento...."
	  $("#gare #recnum span").html(caricamentotext);
	  
	  app.loadAllGare(function(data){
		  
		  if (data.error)
		  {
		  myToast({
		 body: "errore"
		 });
//			toast("errore","long");  
			  
		  } else {
			  conslog("Gare caricate da "+rooturl)
		  /*myToast({
		 body: "Gare caricate da "+rooturl
		});*/
		  
		  //toast("Gare caricate da "+rooturl);
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
			
			elencoSchede.find("li").off(tapevent);
			elencoSchede.find("li").on(tapevent,function() {
				playFeedback();
				//bindFeedback();
				var id=$(this).find("a").attr("id").split("_")[0];
				 colog("requesting id "+id);
				 $("#gara #listabyprog").empty();
				 setCookie("lastcronaca","");
				 $.mobile.changePage("#gara");
				 openGara(id,function(){
					 garaid=id;
					  $gara=data;
					 
					 //setChatBubbles();
					
					 
				 });
			
                return false;
				
			})
			
			elencoSchede.find("li").off("taphold");
			elencoSchede.find("li").on("taphold",function() {
			 if (role!="tkdradmin") return;	
				   var id=$(this).find("a").attr("id").split("_")[0];
				   var rev=$(this).find("a").attr("id").split("_")[1];
				   
				  
				   var g=getGaraById(id);
				   colog(g)
				   //alert(id);
				    var d={
						id: id,
						rev: rev,
						doc: g.doc
					};
	                      var html= new EJS({url: 'tpl/popgare.ejs'}).render(d); 
						  $("#gare div[data-role=content] #popGare").remove();
						  //alert($("#gare #popGare").length);
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
		myToast({
		 body: "Error posting"
		});
			//toast("Error posting","long");
			
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
		  popGareCancel();
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
		myToast({
		 body: "Error posting"
		});
			//toast("Error posting","long");
			
		});
	
}

/*
function deleteGara(id){
	
	
}
*/

function refreshCurrentGara(callback)
{
 autorefreshcount=0;
 var caricamentotext=imgtext+"Refresh in corso..."
 $("#gara .medals").html(caricamentotext)	
 var id=jcurrentgara.id;
conslog("refreshCurrentGara - id= "+id);
openGara(id,callback); 
	
}

function popGareCloseRemove(){
	
	$("#gare #popGare").popup("close").remove();
	
}

function loadFullGaraById(id,callback){
	//alert(settings.societa)
	$.ajax({
			url: rooturl+"/gare/fullgarabyid/"+id+"?societaid="+settings.mysocieta,
			dataType: "json",
            type: "GET"})
        .done(function(data) {
			//alert(data.rows.length);
			
			
			if (callback) callback(data);
	    });
	
	
	
}

function renderGaraInfo($matches) {
	
	   var mtext="";
		   if (isFiltered) mtext=" (filtri applicati) ";
		   
		   //var $matches=jGara.matchesbyprog;
		   //colog("$allmatches -------->"+JSON.stringify($allmatches))
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
		   
		   
		   
		   ctext="ORI: "+$oro.rows.length+" ( M: "+mforo.maschi+", F: "+mforo.femmine+" ) - punti: "+getPunti($oro.rows.length,0,0)+"<br>ARGENTI: "+$arg.rows.length+" ( M: "+mfarg.maschi+", F: "+mfarg.femmine+" ) - punti: "+getPunti(0,$arg.rows.length,0)+"<br>BRONZI: "+$bro.rows.length+" ( M: "+mfbro.maschi+", F: "+mfbro.femmine+" ) - punti: "+getPunti(0,0,$bro.rows.length)+"<br><br>Punteggio totale medaglie: "+getPunti($oro.rows.length,$arg.rows.length,$bro.rows.length)+" "+mtext;
		   $("#limedaglie").html(ctext) 
		   var today = new Date();
			var formattedToday = today.toLocaleDateString() + " "+today.toLocaleTimeString();
		   $("#lilastupdate").html("<span color=gray><i>Ultimo aggiornamento: "+formattedToday+"</i></span>") 
		   
		   //$("#limatches").html($matches.rows.length+" incontri")
		   $("#gara #ulinfogara span").html(getMedaglieGara($matches));
		   $("#gara #navbar ul li").unbind(tapevent);
	     $("#gara #navbar ul li").bind(tapevent,function(){
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
			//activeTab=idx;
		 });
	
}

function openGara(id,callback){
	colog("opengara "+id);
	//alert("id");
	//alert(JSON.stringify(gara));
	
	 $("#gara #navbar ul li").unbind(tapevent);
	 $("#gara #navbar ul li").bind(tapevent,function(){
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
			cacheViews();
        });
	
	
	var caricamentotext=imgtext+"Caricamento...";
	$("#gara .medals").html(caricamentotext);
	loadFullGaraById(id,function(data){
	//gara.loadById(id,function(data) {
		
		jGara=data;
		jcurrentgara=data.gara.rows[0].doc;
		//refreshMatches();
		jmatchesbyprog=data.matchesbyprog;
		jmatchesbyprog=filterMatches(data.matchesbyprog.rows,true);
		jmatchesbyatleta=filterMatchesByAtleta(data.matchesbyatleta.rows);
		//renderMatchesByProg(data.matchesbyprog);
		renderMatchesByProg(jmatchesbyprog);
		renderMatchesByAtleta(jmatchesbyatleta);
		renderCronaca(data.cronaca);
		renderGaraInfo(jmatchesbyprog);
		//refreshChat();
		//bindFeedback();
		
		refreshRealtime(jmatchesbyprog);
		//refreshchatcount++;
		
		
		//check for realtime matches in realtimearray
		//conslog("checking and syncing realtime matches")
		//console.log("realtimearr: ",data);
		//syncRealtimeArray(data);
		//renderRealtime(data);
		
		//alert(JSON.stringify(data))data
		/*loadMatchesByProg(id);
		loadMatchesByAtleta(id);
		loadCronaca(id);*/
		//console.log(JSON.stringify($matches));
		var $gara={doc: jcurrentgara }
		//var $gara=jcurrentgara;
		$("#gara #hdr").find("#hgara a").html($gara.doc.location+" -     "+$gara.doc.data+" - "+settings.mysocietaname);
	    $("#gara #hdriscritti").find("h1").html($gara.doc.title+" "+$gara.doc.location+" -     "+$gara.doc.data);
	   
	   var arriscritti=[];
	   
	   if ($gara.doc.myiscritti) arriscritti=$gara.doc.myiscritti.split(",");
	   
	   //var arriscritti=$gara.doc.myiscritti.split(",");
	   
	   var niscritti=arriscritti.length;
	   var niscrittitext="";
	   iscrittiincat=[];
	
	   iscrittiincat=filterIscritti(arriscritti);
	   niscritti=iscrittiincat.length;
	   
	
	   		mf=getMaschiFemmine(iscrittiincat,"iscritti")
			$("#gara #lisocieta").html("<b>"+settings.mysocietaname+"</b>");
	   $("#gara #ligaratitle").html("Gara: <b>"+$gara.doc.title+"</b>");
	   var maptxt="";
	   if ($gara.doc.maplocation){
		   if ($gara.doc.maplocation.trim()!="") maptxt="&nbsp;&nbsp;<a sclass='ui-btn ui-mini' href='#' onclick='garaMaps()' class='pulsante' style='width:40px;'>Mappa</a>";
	   }
	   $("#gara #ligaralocation").html("Location: "+$gara.doc.location+maptxt);
	   $("#liiscritti").text(niscritti+" atleti iscritti"+niscrittitext+" --  "+"F: "+mf.femmine+" M: "+mf.maschi);

		//alert(iscrittiincat.length)
		//  var ff=getMaschiFemmine($,"iscritti")
		//   $("#limaschifemmine").text("F "+mf.femmine+" M "+mf.maschi);
		
		
		
		setChatBubbles();
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
		
	var url=rooturl+"/atleti/login";	
	conslog("Accessing url "+url)	;
	progressStart("Accesso in corso...","Log-in");
	$.ajax({
			url: url,
			data: {
				email: email,
				password: psw
			},
            type: "POST"})
        .done(function(data) {
			progressStop();
			colog("login result: "+JSON.stringify(data));
			role=data.role;
			//if (data.role=="admin")
			loggedin=true;
			if (data.loggedin=="true")
			{
			myToast({
		 body: "login eseguito con successo"
		});
		     
			 
			chatuser.nickname=email; 
			 var msg={
			                      device: "browser",
									type: "clientspecs",
									nickname: chatuser.nickname
			
						         }
			if (isPhone) msg.device="mobile";
		
		//if (message) msg=message;
		
			socket.send(msg);       
			
			
			// toast("login eseguito con successo");	
			 
			 if (role=="tkdradmin") {
				 $("#index .loginspan").html("Accesso amministratore eseguito");
			
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
			 } else {
				$(".showadmin").hide();				 
			 }
			 console.log("ckal: "+ckal);
			 if (ckal)
			 {
			  console.log("setting autologin true")	 
			  setCookie("autologin","true",cookieDays);	 
			 } 
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
			 refreshNews();
			 updateHomeInfos();
			 
		
			} else {
				$("#login #dlg-invalid-credentials").popup().popup("open");
				deleteCookie("email");
				deleteCookie("psw");
				deleteCookie("autologin");
				$("#index .loginspan").html("");
				console.log("showin login page")
				showLoginPage();
			}	
			
		   

		})
        .fail(function(err) {
			
			progressStop();
			conslog("error:")
			conslog(err);
			myToast({
		      body: "Error"
		    });
			//toast("Error getting elibrary documents","long");
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
		 $(this).unbind(tapevent); 
         $(this).bind(tapevent,function() {
		   sdebug($(this).attr("id"));
		   activeTab=i;
		   setActiveTab(activeTab);
		 });
		 
        });
	 }
	 
	 function setActiveTab(n)
	 {
	  //console.log("setActiveTab "+n);	  
	  //return;	 
	 $("#gara #navbar ul li:eq("+n+")").trigger("vclick");
     //$("#gara #navbar ul li:eq("+n+")").trigger(tapevent);
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
	 
	 
 function loadCronaca(id,callback){
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
			 jGara.cronaca=cronaca;
			 
			 renderCronaca(cronaca);
             /*			 
			 var html = new EJS({url: 'tpl/cronaca2.ejs'}).render(data.rows); 
		
			 $("#gara #listacronaca").append(html);
			 $("#gara #listacronaca").listview();
			 $("#gara #listacronaca").listview("refresh");
			 */
			 } else 
			 {   //error
 			  console.log("error reading cronaca for this gara id="+id)	  
				 
				 
			 }
			 
			 if (callback) callback();
			
		 });


 } 
 

 
 function setCronacaRead(id){
	 
	  
	  
	
	  
	   
	  var fid=jcurrentgara.id+"_"+id; 
	  
	  if (jcurrentgara.stato.toLowerCase()!="disputata"){
	  
	  if (cronaca_read.indexOf(fid)==-1){
		  cronaca_read.push(fid);  
		  crnonletti++;
	  } 	  
	  
	  renderCronaca(jGara.cronaca);
	  }
	 
 }
 
 	
 function findCronacaRead(data) {
	 var found=false;
	 var status=jcurrentgara.stato;
	 conslog("status",status)
	// if (status=="disputata") return true;
	 //conslog("guardo se messaggio non letto",data)
	 
	 var fid=jcurrentgara.id+"_"+data.time;
	 
	 if (cronaca_read.indexOf(fid)>-1) found=true;
	 
	 /*
	 $(cronaca_unread).each(function(j){
					 
					 var crow=cronaca_unread[j];
					 console.log("crow",crow)
					 if ((loadcronb) && (crow.garaid==jcurrentgara.id)) {
						 found=true;
						 console.log("questo non è stato letto")
					 }
					 
				 });
	 */
	 return found;
 }
 	
 function findCronacaUnread(data) {
	 var found=false;
	 //conslog("guardo se messaggio non letto",data)
	 
	 $(cronaca_unread).each(function(j){
					 
					 var crow=cronaca_unread[j];
					 conslog("crow",crow)
					 if ((crow.time==data.time) && (crow.garaid==jcurrentgara.id)) {
						 found=true;
						 conslog("questo non è stato letto")
					 }
					 
				 });
	 
	 return found;
 }
	
 function renderCronaca($cronaca){
	 
	          //console.log($cronaca)
	 
	        /* $($cronaca.rows).each(function(i){
				 
				 var row=$cronaca.rows[i];
				 var id=row.time;
				 
				 var found=false;
				 
				 found=findCronacaRead(row);
				 console.log(row.time+" - "+found);
					 
				 
			 });*/
			 
			 var letti=cronaca_read.length;
			 var nonletti=$cronaca.rows.length-letti;
			 conslog("non letti prima del <0: "+nonletti);
			 
			 var stato=jcurrentgara.stato.toLowerCase();
			 
			 if (stato=="disputata") {
				 nonletti=0;
				 deleteCronacaReadForGara(jcurrentgara.id);
			 }
			 
			 if (nonletti<0) {
				 nonletti=0;
				 deleteCronacaReadForGara(jcurrentgara.id);
			 }	 
			 
			 
			 setCookie("cronaca_read",JSON.stringify(cronaca_read));
			 
			 conslog("cronaca non letti per questa gara: "+nonletti);
			 conslog("cronaca letti per questa gara",letti);
			 
			 conslog("cronaca non letti globale: "+crnonletti);
	         
 			 
			 var html = new EJS({url: 'tpl/cronaca2.ejs'}).render($cronaca); 
		
			 
			 $("#gara #listacronaca").empty();
			 $("#gara #listacronaca").append(html);
			 $("#gara #listacronaca").listview();
			 $("#gara #listacronaca").listview("refresh");
			 
			 
			/*  if (nonletti>0){
				 $("#gara #bubble").html(nonletti).show();
				 //if (isPhone)  cordova.plugins.notification.badge.set(nonletti);
				 
			 } else {
				$("#gara #bubble").html("0").hide(); 
				//if (isPhone)  cordova.plugins.notification.badge.clear();
			 } */
			 
		


 } 
 
 function getPunti(o,a,b){
	 var punti=0;
	 punti=o*7+a*3+b*1;
	 return punti;
	 
 }
 
 function resetFilters(){
	 $("#temppopup #sex").val("_");
	 $("#temppopup #categ").val("_");
	 $("#temppopup #medag").val("_");
	 $("#temppopup #quadrato").val("_");
	 
 }
 
 function setFilters(){
	 
	 var sex="";
	 if ($("#temppopup #sex").val()) sex=$("#temppopup #sex").val();
	 if (sex=="_") sex="";
	
	 var categ="";
	 if ($("#temppopup #categ").val()) categ=$("#temppopup #categ").val();
	 if (categ=="_") categ="";
	 
	 var medaglia="";
	 if ($("#temppopup #medag").val()) medaglia=$("#temppopup #medag").val();
	 if (medaglia=="_") medaglia="";
	 
	 var quadrato="";
	 if ($("#temppopup #quadrato").val()) quadrato=$("#temppopup #quadrato").val();
	 if (quadrato=="_") quadrato="";
	 
	 
	 garaFilters={
		 categoria: categ.toLowerCase().trim(),
		 sesso: sex,
		 medaglia: medaglia,
		 quadrato: quadrato
		 
	 }
	 
	 var text="<font color='yellow'><b>Filtri applicati</b></font>";
	 var border="2px solid yellow";
	 
	 if  (
	   (garaFilters.categoria=="") &&
	   (garaFilters.sesso=="") &&
	   (garaFilters.medaglia=="") &&
	   (garaFilters.quadrato=="") 
		 
	 
	 ) {
		 text="Nessun filtro";
		 border="0px solid white";
	 }	 
	 
	 
	 
	 $("#gara .spanfilt").html(text).css("border",border);
	 
	
	 popCloseRemove();
	 refreshCurrentGara();
	 
	 
 }
	 

 function loadMatchesByProgOld(id,options){
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
            url: rooturl+"/matches/findbygaraid/"+id+"?societa="+settings.mysocieta,
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
				colog("datanascita: "+dn)  //mitrovoqui
				
				
				
				/* ATTENZIONE RIMETTERE IN CASO DI MALF */
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
		   
		   
		   
		   ctext="ORI: "+$oro.rows.length+" ( M: "+mforo.maschi+", F: "+mforo.femmine+" ) - punti: "+getPunti($oro.rows.length,0,0)+"<br>ARGENTI: "+$arg.rows.length+" ( M: "+mfarg.maschi+", F: "+mfarg.femmine+" ) - punti: "+getPunti(0,$arg.rows.length,0)+"<br>BRONZI: "+$bro.rows.length+" ( M: "+mfbro.maschi+", F: "+mfbro.femmine+" ) - punti: "+getPunti(0,0,$bro.rows.length)+"<br><br>Punteggio totale medaglie: "+getPunti($oro.rows.length,$arg.rows.length,$bro.rows.length)+" "+mtext;
		   $("#limedaglie").html(ctext) 
		   
		   //$("#limatches").html($matches.rows.length+" incontri")
		   $("#gara #ulinfogara span").html(getMedaglieGara($matches));
		   $("#gara #navbar ul li").unbind(tapevent);
	     $("#gara #navbar ul li").bind(tapevent,function(){
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
			//alert(activeTab)
			cacheViews();
			if (opt.callback) opt.callback();
        });
		    setActiveTab(activeTab);
			
		   
			 //alert(data.length);
		 });
	
	 
	 
 }
 
 function cacheViews(){
	 return;
	 if (activeTab==1) {
				
				renderMatchesByAtleta();
				$("ul#listabyprog").empty();
				console.log("tab1")
			}
			if (activeTab==0) {
				
				renderMatchesByProg();
				$("ul#listabyatleta").empty();
				console.log("tab0")
				
			}
	 
	 
 }
 
 
 function filterMatches(matchrows,usedoc){
	 
	 //console.log("filterMatches:",matchrows)
	 
	 if (!usedoc) usedoc=false;
	 
	 var jmatches={
		 rows: []
	 }
	 var isFlt=false;
		    $(matchrows).each(function(i){
				
				var dn="";
				var medal="";
				var mid="";
				var quad="";
				var aid="";
				
				
				if (usedoc) {
					dn=matchrows[i].doc.datanascita;
				    medal=matchrows[i].doc.medagliamatch;
				    mid=matchrows[i].doc.matchid;
				    quad=mid.substring(0,mid.length-2);
				    aid=matchrows[i].doc.atletaid;
					
				} else {
					dn=matchrows[i].datanascita;
				    medal=matchrows[i].medagliamatch;
				    mid=matchrows[i].matchid;
				    quad=mid.substring(0,mid.length-2);
				    aid=matchrows[i].atletaid;
					
				}
				
				
				colog("datanascita: "+dn)  //mitrovoqui
				
				var addIt=true; 
				
			
				for (f in garaFilters) {
					//console.log("found filter "+f)
					if (garaFilters[f]!="")
					{
					 //console.log("trovato filtro "+f)	
					 isFlt=true;	
					 
					 if (f=="categoria"){
						 
						
						//var cond=false;
						
						var formula=(getCategoria(dn).toLowerCase().trim()!=garaFilters.categoria.toLowerCase().trim());
						
						
						
						if (garaFilters.categoria.toLowerCase().trim().indexOf("senior")>-1) formula=(getCategoria(dn).toLowerCase().trim().indexOf("senior")==-1);
						 
						 
						//if (getCategoria(dn).toLowerCase().trim()!=garaFilters.categoria.toLowerCase().trim()) addIt=addIt && false; 
						if (formula) addIt=addIt && false; 
						//console.log("filtro categoria: "+garaFilters.categoria)
					 }
					 
					  if (f=="medaglia"){
						 if (medal.toLowerCase().trim()!=garaFilters.medaglia.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					  if (f=="quadrato"){
						  
						 if (quad.toLowerCase().trim()!=garaFilters.quadrato.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					 if (f=="sesso"){
						  
						 $a=getAtletaById(aid); 
						 var sesso=$a.sesso;
						  
						 if (sesso.toLowerCase().trim()!=garaFilters.sesso.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					 
					 
					 
					}
   // propertyName is what you want
   // you can get the value like this: myObject[propertyName]
				}
				
				
				if (!isFlt){
					jmatches.rows.push(matchrows[i])
					
				} else {
					
					if (addIt) jmatches.rows.push(matchrows[i])
					
				}
				
	 
			});
			isFiltered=isFlt;
			return jmatches;
 }
 
 
 function filterMatchesByAtleta(matchrows,usedoc){
	 
	 //console.log("filterMatches:",matchrows)
	 
	 if (!usedoc) usedoc=false;
	 
	 var jmatches={
		 rows: []
	 }
	 var isFlt=false;
		    $(matchrows).each(function(i){
				
				var dn="";
				var medal="";
				var mid="";
				var quad="";
				var aid="";
				
				
				if (usedoc) {
					dn=matchrows[i].doc.datanascita;
				    //medal=matchrows[i].doc.medagliamatch;
				    //mid=matchrows[i].doc.matchid;
				    //quad=mid.substring(0,mid.length-2);
				    aid=matchrows[i].doc.id;
					
				} else {
					dn=matchrows[i].datanascita;
				    //medal=matchrows[i].medagliamatch;
				    //mid=matchrows[i].matchid;
				    //quad=mid.substring(0,mid.length-2);
				    aid=matchrows[i].id;
					
				}
				
				
				colog("datanascita: "+dn)  //mitrovoqui
				
				var addIt=true; 
				
			
				for (f in garaFilters) {
					//console.log("found filter "+f)
					if (garaFilters[f]!="")
					{
					 //console.log("trovato filtro "+f)	
					 isFlt=true;	
					 
					 if (f=="categoria"){
						 
						
						//var cond=false;
						
						var formula=(getCategoria(dn).toLowerCase().trim()!=garaFilters.categoria.toLowerCase().trim());
						
						
						
						if (garaFilters.categoria.toLowerCase().trim().indexOf("senior")>-1) formula=(getCategoria(dn).toLowerCase().trim().indexOf("senior")==-1);
						 
						 
						//if (getCategoria(dn).toLowerCase().trim()!=garaFilters.categoria.toLowerCase().trim()) addIt=addIt && false; 
						if (formula) addIt=addIt && false; 
						//console.log("filtro categoria: "+garaFilters.categoria)
					 }
					 
					 /* if (f=="medaglia"){
						 if (medal.toLowerCase().trim()!=garaFilters.medaglia.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					  if (f=="quadrato"){
						  
						 if (quad.toLowerCase().trim()!=garaFilters.quadrato.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }*/
					 
					 if (f=="sesso"){
						  
						 $a=getAtletaById(aid); 
						 var sesso=$a.sesso;
						  
						 if (sesso.toLowerCase().trim()!=garaFilters.sesso.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					 
					 
					 
					}
   // propertyName is what you want
   // you can get the value like this: myObject[propertyName]
				}
				
				
				if (!isFlt){
					jmatches.rows.push(matchrows[i])
					
				} else {
					
					if (addIt) jmatches.rows.push(matchrows[i])
					
				}
				
	 
			});
			isFiltered=isFlt;
			return jmatches;
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
            url: rooturl+"/matches/findbygaraid/"+id+"?societa="+settings.mysocieta,
            type: "GET"})
         .done(function(data) {
			 //alert(JSON.stringify(data));
			 $matches=data;
			 $allmatches=data;
			 colog("total matches: "+$matches.rows.length);
			 //var $jmatches=[];
	
			var $jmatches={
				rows: []
			}
			
			$jmatches=filterMatches(data.rows,true);
			
		/*
			var isFiltered=false;
		    $(data.rows).each(function(i){
				var dn=data.rows[i].doc.datanascita;
				var medal=data.rows[i].doc.medagliamatch;
				var mid=data.rows[i].doc.matchid;
				var quad=mid.substring(0,mid.length-2);
				var aid=data.rows[i].doc.atletaid;
				
				colog("datanascita: "+dn)  //mitrovoqui
				
				var addIt=true; 
				
			
				for (f in garaFilters) {
					//console.log("found filter "+f)
					if (garaFilters[f]!="")
					{
					 console.log("trovato filtro "+f)	
					 isFiltered=true;	
					 
					 if (f=="categoria"){
						 
						
						 
						 
						 if (getCategoria(dn).toLowerCase().trim()!=garaFilters.categoria.toLowerCase().trim()) addIt=addIt && false; 
						//console.log("filtro categoria: "+garaFilters.categoria)
					 }
					 
					  if (f=="medaglia"){
						 if (medal.toLowerCase().trim()!=garaFilters.medaglia.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					  if (f=="quadrato"){
						  
						 if (quad.toLowerCase().trim()!=garaFilters.quadrato.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					 if (f=="sesso"){
						  
						 $a=getAtletaById(aid); 
						 var sesso=$a.sesso;
						  
						 if (sesso.toLowerCase().trim()!=garaFilters.sesso.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					 
					 
					 
					}
   // propertyName is what you want
   // you can get the value like this: myObject[propertyName]
				}
				
				
				if (!isFiltered){
					$jmatches.rows.push(data.rows[i])
					
				} else {
					
					if (addIt) $jmatches.rows.push(data.rows[i])
					
				}
				
				
			
				
			})	
			
			*/
			$matches=$jmatches;
			colog("matches after categoria "+cat+": "+$matches.rows.length);
		
			jmatchesbyprog=$matches;
			
			//var mf=getMaschiFemmine($matches.rows)
			
            renderMatchesByProg();
		   
		   
		    var mtext="";
		   if (isFiltered) mtext=" (filtri applicati) ";
		   
		   
		   colog("$allmatches -------->"+JSON.stringify($allmatches))
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
		   
		   
		   
		   ctext="ORI: "+$oro.rows.length+" ( M: "+mforo.maschi+", F: "+mforo.femmine+" ) - punti: "+getPunti($oro.rows.length,0,0)+"<br>ARGENTI: "+$arg.rows.length+" ( M: "+mfarg.maschi+", F: "+mfarg.femmine+" ) - punti: "+getPunti(0,$arg.rows.length,0)+"<br>BRONZI: "+$bro.rows.length+" ( M: "+mfbro.maschi+", F: "+mfbro.femmine+" ) - punti: "+getPunti(0,0,$bro.rows.length)+"<br><br>Punteggio totale medaglie: "+getPunti($oro.rows.length,$arg.rows.length,$bro.rows.length)+" "+mtext;
		   $("#limedaglie").html(ctext) 
		   
		   //$("#limatches").html($matches.rows.length+" incontri")
		   $("#gara #ulinfogara span").html(getMedaglieGara($matches));
		   $("#gara #navbar ul li").unbind(tapevent);
	     $("#gara #navbar ul li").bind(tapevent,function(){
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
			cacheViews();
			if (opt.callback) opt.callback();
        });
		    setActiveTab(activeTab);
			
		   
			 //alert(data.length);
		 });
	
	 
	 
 }
 
 
 function renderMatchesByProg($mbp){
	 
	           var html = new EJS({url: 'tpl/matchesbyprog.ejs'}).render($mbp.rows); 
			//alert(html);
			
			
			var listaname="listabyprog";
		   var listview=$("#gara ul#"+listaname);
		  // alert(listview.length)
		   listview.empty();
		   listview.append(html);
		   listview.listview();
		   listview.listview("refresh");
		   $("#gara #nomatches").hide();
		  //bindFeedback();
		   
		   if ($mbp.rows.length==0) {
			   
			   
			    var atls=refreshIscritti(true);
				html=new EJS({url: 'tpl/iscritti.ejs'}).render(atls); 
             
			   
			    var listview2=$("#gara #nomatches ul.iscritti_nomatches");
				//alert(listview2.length)
				listview2.empty();
		        listview2.append(html);
		        listview2.listview();
		         listview2.listview("refresh");
					
				
				
				var p=$("#gara p.iscrittilength");
				p.html(atls.length+" iscritti a questa gara")

	      
			   
			   if (!isFiltered) $("#gara #nomatches").show();
			  
	
		   }
	 
 }


 
 function loadMatchesByAtletaOld(id){
	 colog("loadmatchesbyatleta "+id);
	   $.ajax({
            url: rooturl+"/matches/findbygaraid/byatleta/"+id+"?societa="+settings.mysocieta,
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
		   $("#gara #navbar ul li").unbind(tapevent);
	     $("#gara #navbar ul li").bind(tapevent,function(){
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
			cacheViews();
			
        });
		    setActiveTab(activeTab);
		   
			 //alert(data.length);
		 });
	
	 
	 
 }
 
 
 function loadMatchesByAtleta(id){
	 colog("loadmatchesbyatleta "+id);
	   $.ajax({
            url: rooturl+"/matches/findbygaraid/byatleta/"+id+"?societa="+settings.mysocieta,
            type: "GET"})
         .done(function(data) {
			 //alert(JSON.stringify(data));
			 var $matchesbyatleta=data;
			 
			 colog("total matches: "+$matchesbyatleta.length);
			
	
			var $jmatchesbyatleta=[];
			
			
			
			var isFlt=false;
		    $(data).each(function(i){
				var dn=data[i].datanascita;
				var aid=data[i].id;
				colog("datanascita: "+dn)
				
				
				var addIt=true; 
				
			
				for (var f in garaFilters) {
					//console.log("found filter "+f)
					if (garaFilters[f]!="")
					{
					 //console.log("trovato filtro "+f)	
					 isFlt=true;	
					 
					 if (f=="categoria"){
						 
						 if (garaFilters[f].toLowerCase().trim().indexOf("senior")>-1) {
						    if (getCategoria(dn).toLowerCase().trim().indexOf("senior")==-1) addIt=addIt && false; 
							 
						 } else 
						 {
						 if (getCategoria(dn).toLowerCase().trim()!=garaFilters.categoria.toLowerCase().trim()) addIt=addIt && false; 
						 }
						//console.log("filtro categoria: "+garaFilters.categoria)
					 }
					 
					 /* if (f=="medaglia"){
						 if (medal.toLowerCase().trim()!=garaFilters.medaglia.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					  if (f=="quadrato"){
						  
						 if (quad.toLowerCase().trim()!=garaFilters.quadrato.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					  */
					
					 if (f=="sesso"){
						  
						 var $a=getAtletaById(aid); 
						 var sesso=$a.sesso;
						  
						 if (sesso.toLowerCase().trim()!=garaFilters.sesso.toLowerCase().trim()) addIt=addIt && false; 
						 //console.log("filtro medaglia: "+garaFilters.categoria)
					 }
					 
					
					 
					 
					}
   // propertyName is what you want
   // you can get the value like this: myObject[propertyName]
				}
				
				
				if (!isFlt){
					$jmatchesbyatleta.push(data[i])
					
				} else {
					
					if (addIt) $jmatchesbyatleta.push(data[i])
					
				}
				
				
				
				/*if (getCategoria(dn).toLowerCase()==cat.toLowerCase()) {
					
					$jmatchesbyatleta.push(data[i])
				}*/
				
				
			})	
			
			isFiltered=isFlt;
			//alert($jmatchesbyatleta.length);
			$matchesbyatleta=$jmatchesbyatleta;
			colog("matches after categoria "+cat+": "+$matchesbyatleta.length);
			
			//jmatchesbyatleta=$matchesbyatleta;
		
		    renderMatchesByAtleta($matchesbyatleta)
       
		    
		   
			 //alert(data.length);
		 });
	
	 
	 
 }
 
 function renderMatchesByAtleta($mba){
	 
	 	conslog($mba);
		
		
			 var html = new EJS({url: 'tpl/matchesbyatleta2.ejs'}).render($mba); 
			  var listaname="listabyatleta";
		   var listview=$("ul#"+listaname);
		   listview.empty();
		   listview.append(html);
		   listview.listview();
		   listview.listview("refresh");
		  // $("#limatches").html(data.rows.length+" incontri")
		   //$("#gara #ulinfogara span").html(getMedaglieGara($matches));
		     /*listview.find("li a").off(tapevent);
		   listview.find("li a").on(tapevent,function(){
			   playFeedback();
			   
		   });*/
		   
	     $("#gara #navbar ul li").unbind(tapevent).bind(tapevent,function(){
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
			cacheViews();
			
			setActiveTab(activeTab);
	  });
	 
 
          //bindFeedback();
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
	 
function refreshSocietaServer()
{
	var caricamentotext=imgtext+"Caricamento..." 
	$("#page_societa #recnum span").html(caricamentotext);
	  //var pageid=$.mobile.activePage.attr('id');
	  //var pageId="#"+pageid;
	  debugga("refreshSocietaServer");
	  //navigator.notification.activityStart("Caricamento", "loading");
	  //progressStart("Lettura dati");
	  
	   $.ajax({
            url: rooturl+"/societa/findall",
            type: "GET"})
         .done(function(data) {
	  //app.loadAllSchede(function(data){
		  
		  if (data.error)
		  {
			toast("errore","long");  
			  
		  } else {
		  
		  //alert(data);
		  toast("Societa caricate da "+rooturl);

          var elencoSchede = $("#lista_societa");
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
			var html = new EJS({url: 'tpl/societa.ejs'}).render(data.rows); 
			elencoSchede.empty().append(html);
			progressStop();
			$("#page_societa #recnum span").html(data.rows.length+ " societa");
			elencoSchede.find("li").off(tapevent);
			elencoSchede.find("li").on(tapevent,function() {
				var id=$(this).find("a").attr("id").split("_")[0];
				 colog("requesting id "+id);
				 
				 progressStart("Lettura dati");
				 
				 $.ajax({
            url: rooturl+"/societa/findall",
            type: "GET"})
         .done(function(data) {
			 //alert(JSON.stringify(data));
			 //alert(data.length);
		 
				 
				 //atleta.loadById(id,function(data) {
					 progressStop();
					 //alert(JSON.stringify(data));
					  var obj=data.data.rows[0].doc;	
					   
                       var pophtm=createHtmGrid(obj);
					   var lv=createHtmListview(obj);
					   //alert(lv);
					   $("#page_societa  #listax_societa").empty().append(lv);
					   
					   $("#page_societa #societa").val(id);
					   $.mobile.changePage("#page_societa");
					   $("#page_societa  #listax_societa").listview();
		    		   //createPopup(pophtm);
					   return;
				 $("#txtNome").val(societa.data.nome);
               
				 
		
				  $("#scheda h3").html("Modifica "+boname);
                 $.mobile.changePage("#scheda");
					 
		});
         
                return false;
				
			})
			
	
			
			elencoSchede.find("li").off("taphold");
		elencoSchede.find("li").on("taphold",function() {
			 if (!loggedin) return;	
			 if (role!="tkdradmin") return;
				   var id=$(this).find("a").attr("id").split("_")[0];
				   var rev=$(this).find("a").attr("id").split("_")[1];
				   
				    gConfirm("Confermi l'eliminazione della societa ?","Conferma eliminazione",function() {
					var data={};
						data.id=id;
						data.rev=rev;						
					  
					 $.ajax({url : rooturl+"/societa/delete",
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
				refreshSocietaServer();
			
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

function getHistoryForAtleta(obj) {
	
	var atletaid=$("#page_atleta").find("input#atletaid").val();
	console.log(atletaid);
	var url=rooturl+"/gare/history/"+atletaid;
	progressStart("Calcolo storico in corso");
	$.get(url,function(dat){
		console.log(dat);
		console.log(dat.rows.length);
		
		var html = new EJS({url: 'tpl/historyatleta.ejs'}).render(dat); 
		//console.log(html);
		$("#page_atleta .historyatleta").html(html);
		progressStop();
		
	});
	
} 
	 

function refreshAtletiServer()
{
	  //var pageid=$.mobile.activePage.attr('id');
	  //var pageId="#"+pageid;
	  debugga("refreshAtletiServer");
	  //navigator.notification.activityStart("Caricamento", "loading");
	  //progressStart("Lettura dati");
	  var caricamentotext=imgtext+"Caricamento..."
	  $("#page_atleti #recnum span").html(caricamentotext);
	  app.loadAllSchede(function(data){
		  
		  if (data.error)
		  {
			toast("errore","long");  
			  
		  } else {
		  
		  //alert(data);
		  conslog("Atleti caricati da "+rooturl);

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
			$("#page_atleti #recnum span").html(data.rows.length+ " atleti in "+settings.mysocietaname);
			elencoSchede.find("li").off(tapevent);
			elencoSchede.find("li").on(tapevent,function() {
				playFeedback();
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
					   $("#page_atleta .historyatleta").empty();
					   getHistoryForAtleta();
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
                  $("#fotoAnteprima").on(tapevent,function() {
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
			
	
			
			elencoSchede.find("li").off("taphold");
		elencoSchede.find("li").on("taphold",function() {
			 if (!loggedin) return;	
			 if (role!="tkdradmin") return;
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
 //if (isPhone) {
 if (1==0) {	 
	 
   navigator.notification.activityStart(text, "caricamento...");	
 } else
 {
   $.mobile.loading( 'show', {
	text: text,
	textVisible: true,
	theme: 'b',
	html: ""
   });
     	 
 }	 
}
function progressStop()
{
 //if (isPhone) {
if (1==0) {	 
	 navigator.notification.activityStop();
 }	 else 
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
				
			   li.off(tapevent);	
               li.on(tapevent, function() {
         
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
                  $("#fotoAnteprima").on(tapevent,function() {
					  $("#fullPhoto").attr("src",scheda.data.photoURI).css({width: "400px", height: "700px"});
					   $.mobile.changePage("#viewPhoto",{role: "dialog"});
					  
					  
				  });				  
				 } else {
				 	 
				  $("#fotoAnteprima").attr("src","img/nophoto.jpg").css({width: "128px", height: "128px"}); 	 
				 }
				  $("#scheda h3").html("Modifica "+boname);
                 $.mobile.changePage("#scheda");
              });
    
				li.off("taphold");
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
 myToast({
    body: msg
 });	
 return;
 if (isPhone) {
  //window.plugins.toast.show(msg, duration, 'center', function(a){},
  //function(b){});		 
 
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
	
	  
	
		 
		 $("#gara #refresh").off(tapevent);
	 $("#gara #refresh").on(tapevent,function() {
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
	$('#gara .spancat').off(tapevent);
	$('#gara .spancat').on(tapevent,function(e) {
		sdebug("clicked on categorie");
		var lv=$("#gara ul#ulcategorie");
		   lv.listview();
		   lv.listview("refresh");
		//$("#gara #dialogCategorie").popup();
		//$("#dialogCategorie").popup('open', {positionTo: '.spancat'});
		e.preventDefault();
		var html= new EJS({url: 'tpl/popcategorie.ejs'}).render({});
		openPopup(html,"Categorie");
		//$("#gara #dialogCategorie").popup('open');
		
	});
	
	$('#gara .spanfilt').off(tapevent);
	$('#gara .spanfilt').on(tapevent,function(e) {
		sdebug("clicked on filters");
		var lv=$("#gara ul#ulcategorie");
		   lv.listview();
		   lv.listview("refresh");
		//$("#gara #dialogCategorie").popup();
		//$("#dialogCategorie").popup('open', {positionTo: '.spancat'});
		e.preventDefault();
		var html= new EJS({url: 'tpl/popfilters.ejs'}).render({});
		openPopup(html,"Filtri");
		$("#temppopup #setfilt").button();
		$("#temppopup #resetfilt").button();
		$("#temppopup td").css("padding","5px");
		$("#temppopup").css("padding","5px").css("top","10px !important");
		//$("#temppopup select").selectmenu();
		
		if (garaFilters.categoria!=""){ 
		   $("#temppopup #categ").val(garaFilters.categoria)
		} else $("#temppopup #categ").val("_");
		
		if (garaFilters.sesso!=""){
			$("#temppopup #sex").val(garaFilters.sesso);
		} else 	$("#temppopup #sex").val("_");
		
		if (garaFilters.medaglia!=""){
			$("#temppopup #medag").val(garaFilters.medaglia);
		} else 	$("#temppopup #medag").val("_");
		
		if (garaFilters.quadrato!="") {
			$("#temppopup #quadrato").val(garaFilters.quadrato);
		} else 	$("#temppopup #quadrato").val("_");
		//$("#gara #dialogCategorie").popup('open');
		
	});
	
	$("#gara #ulcategorie li").off(tapevent);
	$("#gara #ulcategorie li").on(tapevent,function() {
		
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
	
	$("#gara #listabyprog li").off(tapevent);
	$("#gara #listabyprog li").on(tapevent,function() {
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
			cacheViews();
        });
	 
	     setActiveTab(activeTab);
		 
		 
	
		 
		 
		 $("#gara #bubble").off(tapevent);
		 $("#gara #bubble").on(tapevent,function() {
		 
		    //$("#gara #bubble").css("background","black");
			
			setAllCronacaRead(jcurrentgara.id);
			
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
			//console.log("setting cookie cronacaletti_"+jcurrentgara.id+": "+c);
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
		 
		 $("#gara #panelright").off(tapevent);
		 	$("#gara #panelright").on(tapevent,function() {
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
	
    function setAllCronacaRead(garaid) {
		
		var cronaca=jGara.cronaca;
		
		$(cronaca.rows).each(function(i) {
			 var row=cronaca.rows[i];
			 var tid=row.time;
			 var text=garaid+"_"+tid;
			 
			 if (jcurrentgara.stato.toLowerCase()!="disputata") {
			 
			 if (cronaca_read.indexOf(text)==-1){
				 cronaca_read.push(text);
				 crnonletti--;
				 if (crnonletti<0) crnonletti=0;
			 }	 
			 
			 }
			
			
		});
		
		renderCronaca(cronaca);
		
		
		
	}
	
	
	function setCategoria(obj){
		
		var txt=$(obj).text();
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
		popCloseRemove();
		
	}
	
	function sdebug(txt)
	{
	 debugga(txt);	
		
	}
	function debug(txt)
	{
	 debugga(txt);	
		
	}
	
	function captureAudio(){
		navigator.device.capture.captureAudio(function (audioFiles) {
    var audioFile = audioFiles[0],
        fileReader = new FileReader(),
        file;
    fileReader.onload = function (readerEvt) {
        var base64 = readerEvt.target.result;
    };
    //fileReader.reasAsDataURL(audioFile); //This will result in your problem.
    file = new window.File(audioFile.name, audioFile.localURL, 
                           audioFile.type, audioFile.lastModifiedDate, audioFile.size);
    fileReader.readAsDataURL(file); //This will result in the solution.
    });
		
	}
	
	
	function openChatFoto(url) {
		console.log("openchatfoto")
		
			if (isPhone) {
				
				var img=url.replace("data:image/jpeg;base64,","");
			
			//window.open(url2,"_system");
			 window.Base64ImageSaverPlugin.saveImageDataToLibrary(
        function(msg){
            console.log(msg);
			msg="file://"+msg;
			window.cordova.plugins.FileOpener.openFile(msg,function(data){
				
				conslog("file "+msg+" successfully opened")
				
				
			},function(err){
				
				console.log("error opening file "+msg)
				console.log(err);
				
				
			});
        },
        function(err){
            console.log(err);
        },
        img
    );
			
			
			
		} else {
			
		  window.open(url, '_system', 'width=310,height=30')	
		}
		
		
	}
	
	function openImage(url){
		
		var url2=url.replace("thumb_","");
		
		if (isPhone) {
			
			//window.open(url2,"_system");
			window.cordova.plugins.FileOpener.openFile(url2,function(data){
				
				conslog("file "+url2+" successfully opened")
				
				
			},function(err){
				
				console.log("error opening file "+url2)
				
				
			});
			
			
			
		} else {
		
		var html= "<img id='img1' src='"+url.replace("thumb_","")+"' />";
		//$("#viewimage div.ui-content").html(html); //attr("src",url.replace("thumb_",""));
		$("#viewimage #img1").attr("src",url.replace("thumb_",""));
		//$("#viewimage div.fillimg").css("background-image","url("+url.replace("thumb_","")+")");
		$.mobile.changePage("#viewimage");
		//resizeImage("#viewimage #img1");
		
		//openPopup(html,"Immagine");
		}
		
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


function filterIscritti(arriscritti){
	   
	   var aiscr=[];
	   var isFiltered=false;
	   
	   $(arriscritti).each(function(i){
		   var $a=getAtletaById(arriscritti[i]);
		   var dn=$a.datanascita;
		   var categ=getCategoria(dn);
		   var sesso=$a.sesso;
		   
		   var addIt=true;
		   
		   if (arriscritti[i].trim()=="") addIt=addIt && false;
		   
		   for (f in garaFilters){
			   
			   
			   if (garaFilters[f]!=""){
				   
				  isFiltered=true; 
				  if (f=="sesso"){
					  
					  if (sesso.toLowerCase().trim()!=garaFilters[f].toLowerCase().trim()) addIt=addIt && false;
				  
				  } 
				  
				  if (f=="categoria"){
					  
					  if (garaFilters[f].toLowerCase().trim().indexOf("senior")>-1) {
						  
						 if (categ.toLowerCase().trim().indexOf("senior")==-1) addIt=addIt && false; 
					  } else {
					  
					  if (categ.toLowerCase().trim()!=garaFilters[f].toLowerCase().trim()) addIt=addIt && false;
					  }
				  
				  } 
				  
				  

				  
				   
				   
				   
				   
			   }
			   
			  
			   
			   
		   }
		   
		    if (isFiltered) {
				if (addIt) aiscr.push(arriscritti[i]);
				
			} else {
				
			    if (addIt) aiscr.push(arriscritti[i]);  	
			}
		   
		   
		   
	   })
	   
	    var niscritti=aiscr.length;
	   return aiscr;
	
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
	   
	  $("#gara #hdr").find("#hgara a").html(gara.doc.location+" -     "+gara.doc.data+" - "+settings.mysocietaname);
	    $("#hdriscritti").find("h1").html(gara.doc.title+" "+gara.doc.location+" -     "+gara.doc.data);
	   
	   var arriscritti=gara.doc.iscritti.split(",");
	  
	   /*
	   
	   var aiscr=[];
	   var isFiltered=false;
	   
	   $(arriscritti).each(function(i){
		   var $a=getAtletaById(arriscritti[i]);
		   var dn=$a.datanascita;
		   var categ=getCategoria(dn);
		   var sesso=$a.sesso;
		   
		   var addIt=true;
		   
		   
		   for (f in garaFilters){
			   
			   
			   if (garaFilters[f]!=""){
				   
				  isFiltered=true; 
				  if (f=="sesso"){
					  
					  if (sesso.toLowerCase().trim()!=garaFilters[f].toLowerCase().trim()) addIt=addIt && false;
				  
				  } 
				  
				  if (f=="categoria"){
					  
					  if (categ.toLowerCase().trim()!=garaFilters[f].toLowerCase().trim()) addIt=addIt && false;
				  
				  } 
				  
				  

				  
				   
				   
				   
				   
			   }
			   
			  
			   
			   
		   }
		   
		    if (isFiltered) {
				if (addIt) aiscr.push(arriscritti[i]);
				
			} else aiscr.push(arriscritti[i]);
		   
		   
		   
	   })
	   */
	    var aiscr=filterIscritti(arriscritti);
	    var niscritti=aiscr.length;
	   
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
	   $("#gara #hdr").find("#hgara a").html($gara.find("location").text()+" -     "+$gara.find("data").text()+" - "+settings.mysocietaname);
	    $("#hdriscritti").find("h1").html($gara.find("title").text()+" "+$gara.find("location").text()+" -     "+$gara.find("data").text());
	   
	   var arriscritti=$gara.find("iscritti").text().split(",");
	   /*
	   
	      var $a=getAtletaById(arriscritti[i]);
		   var dn=$a.datanascita;
		   var categ=getCategoria(dn);
		   var sesso=$a.sesso;
		   
		   var addIt=true;
		   
		   
		   for (f in garaFilters){
			   
			   
			   if (garaFilters[f]!=""){
				   
				  isFiltered=true; 
				  if (f=="sesso"){
					  
					  if (sesso.toLowerCase().trim()!=garaFilters[f].toLowerCase().trim()) addIt=addIt && false;
				  
				  } 
				  
				  if (f=="categoria"){
					  
					  if (categ.toLowerCase().trim()!=garaFilters[f].toLowerCase().trim()) addIt=addIt && false;
				  
				  } 
				  
				  

				  
				   
				   
				   
				   
			   }
			   
			  
			   
			   
		   }
		   
		    if (isFiltered) {
				if (addIt) aiscr.push(arriscritti[i]);
				
			} else aiscr.push(arriscritti[i]);
		   
		   
		   
	   })
	   */
	   var aiscr=filterIscritti(arriscritti);
	    var niscritti=aiscr.length;
	   
	   //var niscritti=arriscritti.length;
	   
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
	 if (!jcurrentgara.data) useCurrentDate=true;
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
	 $("#iscrittiPage #selectiscr").controlgroup();
	$("#iscrittiPage #selectiscr").controlgroup("refresh",{ shadow: true});
	$("#iscrittiPage input:checkbox").checkboxradio();
	$("#iscrittiPage input:checkbox").checkboxradio("refresh");
	$("#iscrittiPage input[type='checkbox']").attr("checked",true).checkboxradio("refresh");
	$("#iscrittiPage #selectiscr").trigger("create")
	
	$.mobile.changePage("#iscrittiPage");
	$("#iscrittiPage").page();


	
	}
	
	function getMatchesCountForAtleta(atletaid){
		colog("getmatchescount for atleta "+atletaid)
		colog($allmatches);
		var amatches=jGara.matchesbyprog;
		var count=0;
		$(amatches.rows).each(function(i){
			
			var id=amatches.rows[i].doc.atletaid;
			if (id==atletaid) count++;
			
			
		})
		
		return count;
	}
	
	function refreshIscritti(returnhtml) {
	if (!returnhtml) returnhtml=false;
	var iscritti="";
	
	var jcurrentgara=jGara.gara.rows[0].doc;
	conslog("refreshiscritti:");
	conslog(jcurrentgara);
	
	if (jcurrentgara.myiscritti) iscritti=jcurrentgara.myiscritti;
	 // var iscritti=jcurrentgara.myiscritti;
	  //var iscritti=jcurrentgara.iscritti;
     colog("iscritti: "+iscritti);
	 var arrx=iscritti.split(",");
	 var arr=filterIscritti(arrx);
	 //alert(arr.length)
	 //if (iscritti.trim()=="") arr=[];
	 //alert(arr.length)
	 
	 var html="";
	 var atls=[];
	
	$(arr).each(function(i){
		 
		 var at=getAtletaById(arr[i]);
		 var doc={};
		 doc.nome=at.cognome+" "+at.nome;
		 doc.id=at.id;
		 doc.sesso=at.sesso;
		 doc.categoria=getCategoria(at.datanascita);
		 
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

	 
	 if (returnhtml==true) return atls; 
	 
	 conslog("atls",atls)
	 
	 var html= new EJS({url: 'tpl/iscritti.ejs'}).render(atls); 
	 
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


var lastDisplayedAtletaId="";



function showMatchesForAtleta(id)
{
	lastDisplayedAtletaId=id;
 var $matchesForAtleta=[];	
 var atl=getAtletaById(id);
 selectedAtl=atl;
 var $allmatches=jGara.matchesbyprog;
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
 $('#matchesatleta ul#listampa li').off("taphold");
 $('#matchesatleta ul#listampa li').on("taphold",function(event){
 //$(document).on( 'taphold', '#matchesatleta ul#listampa li', function(event){
 if (role!="tkdradmin") return;	 
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
	 if (role!="tkdradmin") return;
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
	 
	  var usepopup=false;	 
	  if (!loggedin) return;
	  if (role!="tkdradmin") return;
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
	   var mtch=getMatchById(selectedid);
	   console.log("mtch",mtch)
	  //alert(li.attr("id"));
	  //$('#popResult #radio_vinto').prop('checked', true).checkboxradio('refresh');
	  
	  $('#popResult #risult').val("0-0");
	  //$("#popResult").popup();
	  
	  if (usepopup) {
	  $('#popResult #checkgp').prop('checked', false).checkboxradio('refresh');
	  $('#popResult #radio_round1').prop('checked', true).checkboxradio('refresh');
	  } else {
	 	$('#popResult #checkgp').prop('checked', false).checkboxradio().checkboxradio("refresh");
	  $('#popResult #radio_round1').prop('checked', true).checkboxradio().checkboxradio("refresh");;
		  
	  }
	  
	  var rt=false;
	  if (mtch.realtime)  {
		  if (String(mtch.realtime)=="true") rt=true;
		  
	  }
	  
	  console.log("rt: "+rt);
	  $('#popResult #ck_realtime').prop('checked', rt).checkboxradio().checkboxradio("refresh");
		  
	  //$("#popResult").popup("open");
	  $.mobile.changePage("#popResult",{
changeHash: true //do not track it in history
});
	  /*$( "#popResult" ).on({
		popupbeforeposition: function() {
        var h = $( window ).height();
		var w = $( window ).width();

        $( "#popResult" ).css( "height", h ).css("width",w);
      }
    });*/
	 
	  $(".ui-controlgroup-controls .incbutton").css("width","0.4em");
	  $("#popResult").css("padding",".4em");
	  
	  if (rt) {
		  $("#popResult #realtimediv").show();
		  
	  } else $("#popResult #realtimediv").hide(); 
	 }
	 
	 
	function setResultById(id,obj)
	 {
	 
	  if (!loggedin) return;
	  if (role!="tkdradmin") return;
	  
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
		 //$.mobile.back();
		 //$("#popResult").popup("close");
		 
		 selectedid="";
		 selectedmatchid="";
		 $.mobile.changePage("#matchesatleta");
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
	 
	 delMatchFromRealtime(id);
	 
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
		  dadisputare: dd,
		  realtime: false
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
						 
					  derbytext="";
				   
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
	      
		   $.mobile.back();
		  // $("#popResult").popup('close');  
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
		 
		 var rdata={
			 type: "realtime",
			 to: "all",
			 garaid: jcurrentgara.id,
			 matchid: selectedid,
			 matchnumber: selectedmatchid,
			 result: "",
			 ammoniz1: 0,
			 ammoniz2: 0,
			 event: "realtime",
			 text: "",
			 match: getMatchById(selectedid),
			 active: false
		 
		 }
	
	     socketNotify(rdata);
		 
		 if (notifica) {
		 socketNotify({
			 type: "notification",
			 to: "all",
			 text: cronacatxt,
			 
			 garaid: jcurrentgara.id,
			 updategara: "yes"
			 
		 })
		 }
		 postChat({
			 garaid: jcurrentgara.id,
			 nickname: chatuser.nickname,
			 sockid: chatuser.sockid,
			 color: "yellow",
			 text: cronacatxt
			 });
		 //sendGCM(cronacatxt);
		  $.ajax({
			type: "POST",
			url: rooturl+cronurl,
			async: false,
			data: { text: cronacatxt}
			},function() {
					
				loadCronaca();
			 
		     });
		 
		   openGara(jGara.gara.rows[0].doc.id,function(){
		 // refreshMatches(function(){
			     
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
		 var $allmatches=jGara.matchesbyprog;
		 colog($allmatches)
		 var $r=filterRows($allmatches,{ id: id});
			   
			   //console.log("$r-->"+JSON.stringify($r))
			   
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
	var caricamentotext=imgtext+"Aggiornamento match..."
	$("#gara .medals").html(caricamentotext)	
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
	  
	  
	
	//var progid=$mid.val().substring(1);
	
	var progid=Right($mid.val(),2);   //get last two characters for match progid- updated 25/01/2016
	
	
	//var datanascita=$atleta.find("datanascita").text();
	var datanascita=selectedAtl.datanascita;
	var atletaname=selectedAtl.cognome+" "+selectedAtl.nome;
	var atletaid=selectedAtl.id;
	//var atletaname=$atleta.find("cognome").text()+" "+$atleta.find("nome").text();
	//alert(datanascita);
	//return;
	
	var doc={
		 progid: progid,
		 societaid: settings.mysocieta,
		 societaname: settings.mysocietaname,
		 garaid: jcurrentgara.id,
		 atletaid: atletaid,
		 atletaname: atletaname,
		 risultato: "",
		 ordine: "1",
		 vinto: "no",
		 disputato: "no",
		 dadisputare: "yes",
		 matchid: $mid.val().toUpperCase().trim(),
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
					var $allmatches=jGara.matchesbyprog;
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
				openGara(jGara.gara.rows[0].doc.id,function(){
				//refreshMatches(function() { //devometterloqui
				    refreshIscritti();
					$("#popAddMatch").popup("close");
					showMatchesForAtleta(selectedAtl.id)
					
				})
				

			
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
		 //console.log($m)
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
		 
		 var quad="";
		 if ($("#searchMatches #quadrato").val()) quad=$("#searchMatches #quadrato").val().trim();
		 
		 //var quad=$("#searchMatches #quadrato").val().trim();
		 
		 if (!quad) quad="";
		 if (quad=="_") quad="";
		 //alert(quad);
		 
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
			  if (quad.trim()!=""){   //apply eventually quadrato filter
                var mid=doc.matchid.trim();
				var q=mid.substring(0,mid.length-2).trim();
				if (q==quad) result.push(doc);
				
              } else  result.push(doc);
			 }
			 
			 
			 
			 
			 
		 })
		 
		 
		 
		 
		 var htm="";
		 $(result).each(function(i) {
			 
			var d=result[i].disputato;
		    var dd=result[i].dadisputare;			
			var v=result[i].vinto;
			
			//console.log(d, dd, v)
			
			var bold1="";
			var bold2="";
			var color="blacknormal";
			
			
			
			if  (dd.toLowerCase().trim()=="yes") {
		
			  color="blacknormal";	
			  if (d.toLowerCase().trim()=="yes"){
				bold1="<b>";
				bold2="</b>";
				
				if (v.toLowerCase().trim()=="yes"){
					color="green";
				} else color="red";
				
				
			  }	
			  
			 
				
			} else {
				color="black";
				
			}
			 
			htm+="<li class='"+color+"'><span class='"+color+"'>"+bold1+result[i].atletaname+" - "+result[i].matchid+bold2+"</span></li>";
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
		
		
		 
		 //console.log(JSON.stringify(result));
		 
		 var txt="";
		 txt+="<b>totale incontri trovati: "+result.length+"</b><br>"
		 txt+="disputati: "+disputati+"<br>"
		 txt+="vinti: "+vinti+"<br>";
		 txt+="persi: "+persi+"<br>";
		 txt+="non disputati: "+nondisputati+"<br>";
		 txt+="ori: "+ori+"<br>";
		 txt+="argenti: "+argenti+"<br>";
		 txt+="bronzi: "+bronzi+"<br><br><br>";
		 
		 $("#searchMatches #searchResults").empty().html(txt);
		 $("#searchMatches #searchlist").empty();
		 $("#searchMatches #searchlist").append(htm);
		 $("#searchMatches #searchlist").listview();
		 $("#searchMatches #searchlist").listview("refresh");
		 
		 
	 }
	 
	 
	 function addGara(){
		 conslog("addgara");
		 $.mobile.changePage("#page_addgara");
		 
		 
	 }
	 
	  function addSocieta(){
		 conslog("addsocieta");
		 $.mobile.changePage("#page_addsocieta");
		 
		 
	 }
	 
	 function addAtleta(){
		 conslog("addatleta");
		 $("#page_addatleta").find("#societaid").val(settings.mysocieta);
		 
		  getSocietaById(settings.mysocieta,function(data){
			 
			 
			 if (data.rows.length>0){
			 $("#page_addatleta").find("#societa").html("Società: <b>"+data.rows[0].doc.nome.toUpperCase()+"</b>");
			 }
			 $.mobile.changePage("#page_addatleta");
		 })
		
		 
		 
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
	 
	   function addSocietaOk(obj){
		  var page=$(obj).closest("div[data-role=page]");
		 //page.css("background","yellow");
		  var data={};
		 /*
		 var vcheck=checkValidAtletaForm(page);
		  if (vcheck.error==true){
			  
			  alert("Errore di inserimento:\n\n"+vcheck.errors);
			  return;
		  }
		 */
		 page.find(".jform").each(function(){
			 var id=$(this).attr("id");
			 data[id]=$(this).val();
			 
			 
		 })
		 
		 
		
		 
		   $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: rooturl+"/societa/add",
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
				
				$.mobile.changePage("#page_societa");
				refreshSocietaServer();
			
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
		 
		 //console.log(atl)
		 
		 
		 //page.css("background","yellow");
		  var data={};
		 
		 $("#page_editatleta").find(".jform").each(function(){
			 
			 var campo=$(this).attr("id");
			 colog("campo "+campo+" - "+atl[campo])
			 $(this).val(atl[campo]);
			 //data[id]=$(this).val();
			 
			 
		 })
		 
		 
		  $("#page_editatleta").find("#atletaid").val(id);
		  $("#page_editatleta").find("#societaid").val(settings.mysocieta);
		 
		 getSocietaById(settings.mysocieta,function(data){
			 
			 
			 if (data.rows.length>0){
			 $("#page_editatleta").find("#societa").html("Società: "+data.rows[0].doc.nome.toUpperCase());
			 }
			 $.mobile.changePage("#page_editatleta");
		 })
		 
		 
		 
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
	 
	 function getAllAtleti(callback) {
		 
		 $.ajax({
				type: "GET",
				url: rooturl+"/atleti/findall/",
		     	success: function(data) {
			     callback(data);		
					
		 }});	
		 
	 }
	 
	 
	 function addIscritto(){
		 //alert($atleti.rows.length);
		 var atl=[];
		 var gis=jcurrentgara.iscritti;
		 progressStart();
		 getAllAtleti(function($allatleti){
		 
		 $($allatleti.rows).each(function(i){
			 var at=$allatleti.rows[i];
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
		 progressStop();
		 var htm = new EJS({url: 'tpl/selectiscritti.ejs'}).render(atl);
		$("#selectIscrittiPage #selectiscr").empty().append(htm)
		
		$.mobile.changePage("#selectIscrittiPage");
		//$('#selectIscrittiPage #collfs').trigger('expand');
		}) 
		 
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
				refreshCurrentGara(function(){
				  showIscritti();	
				  refreshGareServer();
					
				});
				
				
			
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
	     var mysocieta=$("#optionsPage #societaid").val();
		 var mysocietaname=$("#optionsPage #societaid option:selected").text();
		 
		 var options={
			 server: rooturl,
			 notifiche: notifiche,
			 mysocieta: mysocieta,
			 mysocietaname: mysocietaname
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
		 updateHomeInfos();
		 
	 }
	 
	 function setServer(srv){
		 $("#optionsPage #server").val(srv);
		 
	 }
	 
	 
	 function getSocieta(callback) {
		 $.ajax({
				type: "GET",
				url: rooturl+"/societa/findall/",
		     	success: function(data) {
			     callback(data);		
					
		 }});	
		 
		 
	 }
	 
	  function getSocietaById(id,callback) {
		 $.ajax({
				type: "GET",
				url: rooturl+"/societa/findbyid/"+id,
		     	success: function(data) {
			     callback(data);		
					
		 }});	
		 
		 
	 }
	 
	 function loadOptions(callback){
		 var defaultoptions={
			 server: rooturl,
			 notifiche: true,
			 mysocieta: "20160217220400",
			 mysocietaname: "ASD TAEKWONDO ROZZANO"
		 }
		 settings=defaultoptions;
		 
		getSocieta(function(data){
				 var html= new EJS({url: 'tpl/selectsocieta.ejs'}).render(data.rows); 
		         $("#optionsPage #societaid").empty().append(html)
		          
				 var opts=getCookie("options");
		   if (opts==null){
			 setCookie("options",JSON.stringify(defaultoptions));
			 settings=defaultoptions;
			 $("#optionsPage #server").val(settings.server);
			 $("#optionsPage #ckNotifiche").prop("checked",settings.notifiche);
			 $("#optionsPage #societaid").val(settings.mysocieta);
		 } else {
			 var o=JSON.parse(opts);
			 if (!o.server) o.server=defaultoptions.server;
			 if (!o.notifiche) o.notifiche=defaultoptions.notifiche;
			 if (!o.mysocieta) o.mysocieta=defaultoptions.mysocieta;
			 if (!o.mysocietaname) o.mysocietaname=defaultoptions.mysocietaname;
			 $("#optionsPage #server").val(o.server);
			 $("#optionsPage #ckNotifiche").prop("checked",o.notifiche);
			 $("#optionsPage #societaid").val(o.mysocieta);
			 settings=o;
		 }
		 
		 callback();
		  
				  
		   
			   
			 
		 });
		 
		  
		 
		
		 
		 
		 
	 }
	 
function delMatch()
{
	
	 var id=delmatchid;
	 
	gConfirm("Sei sicuro di voler cancellare l'incontro ?","Conferma",function() {
	 
	 colog("deleting matchid "+id);
	  
	  var url="updagent.php?action=delete&tag=match";
	  
	  
	  //find and reset its derby counterpart, if there is one
	  var $allmatches=jGara.matchesbyprog;
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
	  openGara(jcurrentgara.id,function(){
	  //refreshMatches(function() {
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
	fbloggedin=true;
	colog("autologin cookie: "+al);

	if (al)
	{
		//)alert(al);
	 if (al=="true")	{
	 if (em && pw)
	{
		console.log("doing autologin");
     $("#login #txt-email").val(em);
	 $("#login #txt-password").val(pw);
		doLogin();
	} else {
	  toast("Login automatico fallito");
	  deleteCookie("email");
	  deleteCookie("psw");
	  deleteCookie("autologin");
	  showLoginPage();
	}
	
		 
	 }
		
		
	}
	//alert("cookies: "+em+" - "+pw);
	
	
}

function showLoginPage() {
	
	//alert("showLoginPage");
	var em=getCookie("email");
	var pw=getCookie("psw");
	var al=getCookie("autologin");

	console.log(al); 
	
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
		/*
		$("#login #chck-autologin").attr("data-cacheval","false");
		} else $("#login #chck-autologin").attr("data-cacheval","true");*/
		if (String(al)=="true") {
			console.log("autologin is true, autologgin in"); 
			autoLogin();
			return;
		}	

		}
	
	//alert(em+" - "+pw);
	$.mobile.changePage("#login");

}


function resetChat() {
	
	var url=rooturl+"/chat/reset/"+jcurrentgara.id;
	if (!chatmultiroom) url=rooturl+"/chat/reset";
	
	gConfirm("Sei sicuro di voler resettare la chat per questa gara ? ?","Reset chat",function() {
		 $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: url,
            type: "GET",
		 data: {}})
        .done(function(data) {
			conslog("chat resettata");
			refreshChat();
			socketNotify({
			 type: "refreshchat",
			 to: "all",
			 nickname: chatuser.nickname
			 
		 })
			gotoChat(true);
		});
	},function() {});
}

function postChat(msg) {
	
	
	
	 var obj={
		 sockid: chatuser.sockid,
		 nickname: chatuser.nickname,
		 garaid: jcurrentgara.id,
		 text: $("#page_chat #chatmsg").val()
		 
	 }
	 
	 if (!msg) msg=obj;
	 
	 
	 var doReturn=false;
	 var hasFoto=false;
	 var hasAudio=false;
	 
	 
	 if (msg.foto) {
		 
		 if (msg.foto.trim()!="") hasFoto=true;
		 
	 }
	 if (msg.audio) {
		 if (msg.audio.trim()!="") hasAudio=true;
		 
	 }
	 
	 var hasMedia=hasFoto || hasAudio;
	 
	 if ((msg.text.trim()=="") && !hasMedia) doReturn=true;
	 
	 if (doReturn) return;
	
	 var url= rooturl+"/chat/put/"+jcurrentgara.id;
	 if (!chatmultiroom) url=rooturl+"/chat/put";
	
	 playSound("img/chatsend");
	 $.ajax({
            //url: "http://ssodemyapp.mybluemix.net/schede/addScheda",
			url: url,
            type: "POST",
            data: msg})
        .done(function(data) {
			console.log(data);
			
			 $("#page_chat #chatmsg").val("");
			 
			//gotoChat(true);
			
		})
		.error(function(err){
			 
			console.log("error",err)
		});
	
}

function gotoChat(slf) {
	
	
	
	var self=false;
	if (slf) {
		if (slf==true) self=true;
		
	} 
	
	var page=$("#page_chat");
	$.mobile.changePage("#page_chat");
	$('html,body').animate({scrollTop:9999999}, 500,function() {
					   	
					});
	//if (jcurrentgara.id) setChatNonLetti(jcurrentgara.id,0);
	
	chatunreadcount=0;
	setCookie("chat_unread",chatunreadcount)
	
	
	setChatBubbles();
	return;
	/*
	$.ajax({
				type: "GET",
				url: rooturl+"/chat/get/"+jcurrentgara.id,
		     	success: function(data) {
					 
					var rows=data.rows; 
					var html= new EJS({url: 'tpl/chat.ejs'}).render(rows); 
					page.find(".container").empty().append(html);
					if (!self) {
						$.mobile.changePage("#page_chat");
						setChatNonLetti(jcurrentgara.id,0);
					}	
					$('html,body').animate({scrollTop:9999999}, 500,function() {
					   	
					});
					var html2=new EJS({url: 'tpl/matchesrealtime.ejs'}).render(jGara.realtime.rows);
					//console.log(html2);
					page.find(".chatrealtime .rtul").empty().append(html2);
					
					//find last realtime data sent
					for (var i=0; i<realtimeArray.length; i++) {
						
						var rta=realtimeArray[i];
						var mid=rta.id;
						var liid="match_"+mid;
						console.log(liid);
						var li=page.find(".rtul #"+liid);
						//li.css("border","3px orange solid");
						
						var div=li.find("a").find("div");
						//div.css("border","3px pink solid");
						
						if (div.find("span.realtime").length==0){
						div.append("<span class='realtime'></span>");
						}
						
						if (rta.lastrealtimedata) {
							console.log("adding last text: "+rta.lastrealtimedata.text);
						div.find("span.realtime").html(rta.lastrealtimedata.text);
						}
						
					}
					
					
					/*
					var objDiv = page.find(".container");
					
					var height = 0;
					objDiv.each(function(i, value){
						height += parseInt($(this).height(),10)+50;
					});

					//height += '';
					console.log(height);
					objDiv.animate({scrollTop: height});
				
					
				},
				error: function(data) {
					
					
				}
	});*/
				
	
	 
	
	
}


function refreshChat(slf) {
	
	var self=false;
	if (slf) {
		if (slf==true) self=true;
		
	} 
	
	var page=$("#page_chat");
	
	var url=rooturl+"/chat/get/"+jcurrentgara.id;
	if (!chatmultiroom) url=rooturl+"/chat/get";
	
	$.ajax({
				type: "GET",
				url: url,
		     	success: function(data) {
					 
					var rows=data.rows; 
					var html= new EJS({url: 'tpl/chat.ejs'}).render(rows); 
					page.find(".container").empty().append(html);
					if (!self){ 
					//$.mobile.changePage("#page_chat");
					//$('html,body').animate({scrollTop:9999999}, 500,function() {
					   	
					//});
					}
					//var html2=new EJS({url: 'tpl/matchesrealtime.ejs'}).render(jGara.realtime.rows);
					var html2=new EJS({url: 'tpl/matchesrealtime2.ejs'}).render(realtimeArray);
					//console.log(html2);
					page.find(".chatrealtime .rtul").empty().append(html2);
					
					
					/*
					var objDiv = page.find(".container");
					
					var height = 0;
					objDiv.each(function(i, value){
						height += parseInt($(this).height(),10)+50;
					});

					//height += '';
					console.log(height);
					objDiv.animate({scrollTop: height});
				
					*/
				},
				error: function(data) {
					
					
				}
	});
				
	
	 
	
	
}


function gotoSocieta(){
	
	$.mobile.changePage("#page_societa");
	refreshSocietaServer();
	
	
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
			 deleteCookie("autologin");
			 $.mobile.changePage("#index_fb");
			 /*fb_logout(function(){
				//fb_revoke(); 
				$.mobile.changePage("#index_fb");
			 });*/
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

	 function notify(txt,obj) {
		 
		 //alert(JSON.stringify(obj));
		 
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
			
			
			//cordova.plugins.notification.local.off("click");
			cordova.plugins.notification.local.on("click", function (notification) {
				 console.log("clicked notification");
				 $.mobile.changePage("#page_chat");
				  $('html,body').animate({scrollTop:9999999}, 500);
				  chatunreadcount=0;
				  setCookie("chat_unread",chatunreadcount)
				  setChatBubbles();
				 return;
				 //alert(garanotifyid);
				 /*
				 if (jcurrentgara) {
					 if (jcurrentgara.id) {
						 
						 if (jcurrentgara.id=garanotifyid) {
							 gotoChat();
							 return;
							 
						 }
					 }
					 
				 }
				 
				 console.log("garanotifyid",garanotifyid);
				 
				 var openg=true;
				 
				 if (garanotifyid==undefined) {
					 openg=false;
				 }	 
				 //if (garanotifyid.trim()=="") openg=false;
				 
				 if (openg) {
					
				 openGara(garanotifyid,function(){
					 garaid=id;
					  $gara=data;
					  gotoChat();
					  //$("#gara #tab_cronaca").trigger(tapevent);
					 
				 });
				 }
				 */
			});
			
			 
		 } else	 console.log("Notification: "+txt);
		 
		 
		 
	 }
	 
	 function clickNotification(){
		 
		 console.log("clicked notifichation");
				 $.mobile.changePage("#gara");
				 
				 openGara(garanotifyid,function(){
					 garaid=id;
					  $gara=data;
					  gotoChat();
					  //$("#gara #tab_cronaca").trigger(tapevent);
					 
				 });
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
	
	
	function deleteCronacaReadForGara(garaid) {
	  
	  conslog("deleteCronacaRead for gara "+garaid);
	  conslog("parto con cronaca_read: "+cronaca_read.length)
	
      conslog(cronaca_read);
	  
				  for (var i=0; i<cronaca_read.length; i++) {
					  
					  var row=cronaca_read[i];
					  conslog("row: ",row);
					  var arr=row.split("_");
					  var gid=arr[0];
					  var id=arr[1];
					  if (gid==garaid){
						  conslog("elimino "+id);
						  cronaca_read.splice(i,1);
					  }
					  
					  
				  }
				  
		conslog("cronaca_read restante: "+cronaca_read.length)
		conslog(cronaca_read);
				  
				  
		
		
	}
	
	
	function resetCronaca() {
		var gid=jcurrentgara.id;
		
		
		gConfirm("Vuoi veramente resettare la cronaca per questa gara ?","conferma",
		function(){
			
			socketNotify({
							type: "realtime",
							to: "all",
							garaid: jcurrentgara.id,
							event: "resetcronaca"
		 
			})
			
			deleteCronacaReadForGara(gid);
			
			$.ajax({
				type: "GET",
				url: rooturl+"/gare/resetcronaca/"+gid,
		     	success: function(gxml) {
					
					toast("Cronaca resettata");
					
						
						
						socketNotify({
							type: "realtime",
							to: "all",
							garaid: jcurrentgara.id,
							event: "refreshcronaca"
		 
						})
						
			       
					
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
  //console.log($gare);
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
 
 function mapOpened() {
	 console.log("mapOpened");
	 
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
	 
	popGareCancel(); 
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
			
			$.mobile.changePage("#index");
								
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
								//autoLogin();
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
				$("#index #fbuser #userName").html(chatuser.nickname);
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
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)      return sParameterName[1];
       
    }
  }  
  
  
  function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}


function addCronaca(){
	$.mobile.changePage("#page_editcronaca")
	
	
}

function addCronacaOk(){
	
	 var cronurl="/matches/addcronaca/"+jcurrentgara.id;
	 var text=$("#page_editcronaca #testo").val();
	   progressStart();
	   $.ajax({
			type: "POST",
			url: rooturl+cronurl,
			async: true,
			data: { text: text},
			success: function() {
				progressStop();	
				
				var notifica=false;
				var ck=$("#page_editcronaca input:checkbox[name=ckNotifica]");
				notifica=ck.is(":checked");
				 
				 
				if (notifica) {
				 socketNotify({
						 type: "notification",
						 to: "all",
						 text: text,
						 garaid: jcurrentgara.id,
						 updategara: "yes"
						 
				 })
				}
		 
				
				loadCronaca(jcurrentgara.id,function(){
					
					$.mobile.changePage("#gara");
					
					
				});
				
				
				
				
				
			},
			error: function() {
				progressStop();
				alert("errore");
				
				
			}
			});
		
 
		/* 
		refreshMatches(function(){
			     
			 	 showMatchesForAtleta(selectedAtl.id);
				 progressStop();
		  });		 
		*/
				
			
		 
	
		
		
	
		 
		 //manda notifica ad altri device
		 
		 
	
	
}


function delCronaca(id){
	
	if (confirm("Sicuro di voler cancellare questa riga di cronaca da questa gara ?","Conferma")){
		
		$.ajax({
				type: "POST",
				url: rooturl+"/matches/delcronaca/"+jcurrentgara.id+"/"+id,
		     	success: function(c) {
					//conslog(c);
					toast("Cronaca aggiornata");
					loadCronaca(jcurrentgara.id);
		}}); 
		
		
		
	}
	
	
}



function updateRankingTkdr() {
	
	var anno=$("#page_ranking #selanno").val();
	
	var annotext="";
	
	if (anno.trim()!="") annotext=" per l'anno "+anno;
	
	
	
	var txt="Calcolo ranking TKDR "+annotext+" in corso....";
	$("#page_ranking #ranking").html(txt);
	progressStart(txt);
	
	$.ajax({
		type: "GET",
		url: rooturl+"/atleti/ranking/",
		async: true,
	 	success: function(data) {
				
				var html= new EJS({url: 'tpl/ranking.ejs'}).render(data.rows); 
	
				$("#page_ranking #ranking").html(html);
				progressStop();
						
					
	}});
	
	
}

function updateRankingTkdr_old() {
	
	//$.mobile.changePage("#page_ranking");
	
	//get atleti:
	
	/*var interval = setInterval(function(){
        //progressStart("Calcolo ranking TKDR in corso");
		//$("#page_ranking #ranking").html("Calcolo ranking TKDR in corso....");
        clearInterval(interval);
    },1000); */
	
	
	
	var atleti_json;
	var gare_json;
	var anno=$("#page_ranking #selanno").val();
	
	var annotext="";
	
	if (anno.trim()!="") annotext=" per l'anno "+anno;
	
	
	
	var txt="Calcolo ranking TKDR "+annotext+" in corso....";
	$("#page_ranking #ranking").html(txt);
	progressStart(txt);
	
	$.ajax({
				type: "GET",
				url: rooturl+"/atleti/findall?societaid="+settings.mysocieta,
				async: true,
		     	success: function(data) {
					
						atleti_json=data;
						
						//get all gare
						$.ajax({
							type: "GET",
							async: true,
							url: rooturl+"/gare/findall?societa="+settings.mysocieta,
							success: function(gdata) {
						          
								  gare_json=gdata;
								  
							$(gare_json.rows).each(function(y){	
                               
							  var gara=gare_json.rows[y].doc;
							  var gid=gara.id;
								  
							$.ajax({
							type: "GET",
							async: false,
							url: rooturl+"/matches/findbygaraid/"+gid+"?societa="+settings.mysocieta,
							success: function(mdata) {
								gare_json.rows[y].doc.matches=mdata;
								  }});
								  
							 }); 
								  
								
							
	
	//if (anno!="") gare_json=filterRows(gare_json.rows,{ data: "/"+anno},false);
		
	
	//console.log(gare_json)
	
	$(atleti_json.rows).each(function(i){
		
		var atleta=atleti_json.rows[i].doc;
		var dn=atleta.datanascita;
		var categoria=getCategoria(dn,true);
		
		var doItCateg=true;
		
		

		if (doItCateg) {
		
		atleti_json.rows[i].doc.ranking_tkdr=0;
		atleti_json.rows[i].doc.ori=0;
		atleti_json.rows[i].doc.argenti=0;
		atleti_json.rows[i].doc.bronzi=0;
		atleti_json.rows[i].doc.garedisputate=0;
		
		colog("calcolo ranking per "+atleta.cognome+" "+atleta.nome);
		
		$(gare_json.rows).each(function(j){
			
			var gara=gare_json.rows[j].doc;
			var garaid=gara.id;
			var data=gara.data;
			
			var doItAnno=false;
			
			if (anno=="") {
				doItAnno=true; 
			} else {
				if (data.indexOf("/"+anno)>-1) doItAnno=true;
				
			}	
			
			if (doItAnno)  {
						       
							  var matches_json=gare_json.rows[j].doc.matches; 
							  var found=false;			
								
							   $(matches_json.rows).each(function(x){
								   
								   var match=matches_json.rows[x].doc;
								   
								   var aid=match.atletaid;
								
								  
								  
								   if (aid==atleta.id) {
									   
									   
									   
									  found=true; 
									  if (match.medagliamatch){ 
									   var medaglia=match.medagliamatch.toLowerCase();
									   
									   if (medaglia=="oro") { 
									     atleti_json.rows[i].doc.ranking_tkdr+=7;
										 atleti_json.rows[i].doc.ori++;
									   }
									   
									   if (medaglia=="argento") {  
									     atleti_json.rows[i].doc.ranking_tkdr+=3;
										 atleti_json.rows[i].doc.argenti++;
									   }
									
									   if (medaglia=="bronzo") {
										   atleti_json.rows[i].doc.ranking_tkdr+=1;
										   atleti_json.rows[i].doc.bronzi++;
										
									   }										
									   }
									   
								   }
								   
								   
								   
								   
							   })	
								  
								  
								  
						
			
			                 if (found==true) atleti_json.rows[i].doc.garedisputate++;
		    }					 
			
			
		})
		
		
		
		
		
		}
	})
	
	
	//console.log(atleti_json);
	
	
	atleti_json.rows.sort(function(a,b){
		
		var a1=a.doc.ranking_tkdr;
		var b1=b.doc.ranking_tkdr;
		if (a1>b1) return -1;
		if (a1<b1) return 1;
		return 0;
		
		
	})
	
	var html= new EJS({url: 'tpl/ranking.ejs'}).render(atleti_json.rows); 
	
	$("#page_ranking #ranking").html(html);
	progressStop();

								
								  
						}});
					
					
		}}); 
		
	
	//$.mobile.changePage("#page_ranking");
	
	//console.log(JSON.stringify(atleti_json));
	
	
}



Date.prototype.juliandate = function() {
   var yyyy = this.getFullYear().toString();
   var MM = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   var hh = this.getHours();
   var mm = this.getMinutes();
   var ss = this.getSeconds();
   var ms = this.getMilliseconds();
   console.log("milliseconds: "+ms)
   
   var n=2;
   var jdate=yyyy+padZeros(MM,n)+padZeros(dd,n)+padZeros(hh,n)+padZeros(mm,n)+padZeros(ss,n)+padZeros(ms,3);
   console.log("jdate: "+jdate);
   
   //var jdate  =yyyy+(MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);
   return jdate; // padding
  };
  
  Date.prototype.juliandateshort = function() {
   var yyyy = this.getFullYear().toString();
   var MM = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   var hh = this.getHours();
   var mm = this.getMinutes();
   var ss = this.getSeconds();
   //var ms = this.getMilliseconds();
   //console.log("milliseconds: "+ms)
   
   var n=2;
   var jdate=yyyy+padZeros(MM,n)+padZeros(dd,n)+padZeros(hh,n)+padZeros(mm,n)+padZeros(ss,n);
   console.log("jdate: "+jdate);
   
   //var jdate  =yyyy+(MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);
   return jdate; // padding
  };

    
  function padZeros(theNumber, max) {
    var numStr = String(theNumber);
    
    while ( numStr.length < max) {
        numStr = '0' + numStr;
    }
    
    return numStr;
}