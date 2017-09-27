     var showMsg=false;
    
	 var atleti_xml=null;
	 var gare_xml=null;
	 var matches_xml=null;
	 
	 
	 var xatleti=null;
	 var xgare=null;
	 var xmatches=null;
	  var gares_xml="<matches></matches>";
	 //var $gare=null;
	 var xgare="";
	 var garaid="";
	 var refreshMode="byprog";
	 var matches;
	 var $gara;
	 var timerTime=60000;
	 var timerCronaca=20000;
	 var arrCronaca=new Array();
	 var first=true;
	 var datagara="";
	 var annogara="";
	 var cattxt="Categoria: ";
	 
	 var msavona="<matches></matches>";
	 var xmsav = $.parseXML(msavona);
	 var $msav=$(xmsav);
	 var $matches=null;
	 
	 var matchfile="matches_savona.xml";
	 
	 var anninascita="";
	 var viewcat="";
	 
	 var selectedatletaname="";
	 var selectedatletaid="";
	 var selecteddatanasc="";
	 
	 var selectedid="";
	 var selectedmatchid="";
	 
	 var rooturl="http://demym.altervista.org/";

	 
	 
	 
	         var prevSelection = "tab1";
	 
	 var tabs=new Array("byprog","byatleta","cronaca");
	 var activeTab=1;
	 var notifyseen=false;
	 var notifycount=0;
	 var nonletti=0;
	 var lastcronaca="";
	 var searchgara="";
	 
	 var dd = $.Deferred();
     var jqd = $.Deferred();
     $.when(dd, jqd).done(doInit);
	 
	// $.support.cors = true; $.mobile.allowCrossDomainPages = true;

     $(document).bind('mobileinit', function () {
         jqd.resolve();
		   $.mobile.allowCrossDomainPages = true;
		 
     });
	 
	
     
     
     document.addEventListener('deviceready', deviceReady, false);
     function deviceReady() {
         dd.resolve();
     }

     function doInit() {
         //alert('Ready');

	
     }
	 
	 $(document).bind("pagebeforechange", function( event, data ) {
    $.mobile.pageData = (data && data.options && data.options.pageData)
        ? data.options.pageData
        : null;
});

var parm_garaid="";
$(document).on("pagebeforeshow", "#gare", function(e, data){ 
        if ($.mobile.pageData && $.mobile.pageData.id){
            parm_garaid=$.mobile.pageData.id;
        }
 });

function count(){
    var elements = $("#lista li:visible").length;
    $("#recnum").html(elements+" atleti");
}
	 
	 
$(document).on("pageshow","#matchesatleta",function() {

	  
	  sdebug(selectedatletaid+" "+selectedatletaname);
	  
	  var $m=$("<matches></matches>");
	  var anome="";
	  $matches.find("match").each(function() {
	        var $this=$(this); 
			var aid=$(this).find("atletaid").text();
			var datanasc=$(this).find("datanascita").text();
			var anome=$(this).find("atletaname").text();
			
			
			if ($.trim(aid)==$.trim(selectedatletaid))
			{
			  $m.append($this.clone());
			  selectedatletaid=aid;
			  selectedatletaname=anome;
			  selecteddatanasc=datanasc;
			}
	   });
	   sdebug("matches for atleta "+selectedatletaid+": "+$m.find("match").length);
	
	   refreshMeByProg({
	    matches: $m,
		ulSelector: "listampa",
		showUpdated: false,
		showNullMatches: true,
		clickAtletaMatches: false,
		callback: function() {
		
		   $("#mparecnum").html($m.find("match").length+" incontri per <i><b>"+selectedatletaname+"</b></i>");
		
		
		}
	   });
	   //$.mobile.changePage('#matchesatleta', {transition: 'pop', role: 'popup', theme: 'b
	  // '}); 
	   
	   //$('#dialogForAtleta').popup();
       //$('#dialogForAtleta').popup('open');
});	 
	 
	 
$(document).on("pageshow","#iscrittiPage",function() {
 
	
	 debug("iscrittiPage pageinit");
	 //return;
	
	 $.ajax({
		type: "GET",
		url: rooturl+"atleti.xml",
		dataType: "xml",
		success: function(axml) {
		 atleti_xml=axml;
		 $atleti=$(axml);
	
	
	
	 $g=getGaraById(garaid);
	 var iscritti=$g.find("iscritti").text();
	 
	 sdebug("iscritti: "+iscritti);
	 var arr=iscritti.split(",");
	 
	 var htm="";
	 $(arr).each(function(i) {
	 var atleta=sgetAtletaNameById(arr[i]);
	 var datanasc=sgetAtletaById(arr[i],"datanascita");
	    iscritti=iscritti.replace(arr[i],atleta+"|"+arr[i]+"|"+datanasc);
		
	    
	    //htm+="<li><div>"+atleta+"</div></li>";
	 });
	// alert(iscritti);
	 
	 arr=iscritti.split(",");
	 arr.sort();
	 
	 
	 $(arr).each(function(i) {
	 
	    
		var riga=arr[i];
		var arrx=riga.split("|");
		var nome=arrx[0];
		
		var aid=arrx[1];
		var dat=arrx[2];
	    
	    htm+="<li><a data-ajax='false' href=\"javascript:matchesPerAtleta('"+aid+"','"+nome+"','"+dat+"')\"  shref='gareatleta.html?garaid="+garaid+"&atletaid="+aid+"'>"+nome+"</a></li>";
		sdebug(htm);
	 });
	 

	 
	 //alert($("#uliscritti").length);
	 $("#iscrittiPage #uliscritti").empty();
	 $("#iscrittiPage #uliscritti").append(htm);
	 $("#iscrittiPage #uliscritti").listview();
	 $("#iscrittiPage #uliscritti").listview("refresh");
		   
	 $("#iscrittiPage #infogaraiscritti").html(arr.length+" iscritti a questa gara");
	 
	
	 //alert($("#iscrittiPage").length());
	 
	 }});

});	 
	 
$(document).on("pageshow","#page_atleti",function(){
		 
	  $.ajaxSetup({ cache: false });
	//alert("atleti pageinit");
	/*
$( '#lista' ).on( 'filterStart',function(event,listview){
  alert( 'This listview just got filtered' );
});
$( '#lista' ).on( 'filterEnd',function(event,listview){
  alert( 'This listview filter was just canceled' );
});
    $("#myFilter").on("keyup",function(){
        count();
    });
	*/
/*
    $("#one").css("background","yellow");
    $("#lista").append("<li>caz</li>");
	$("#lista").append("<li>caz2</li>");
	$("#lista").append("<li>caz3</li>");
	$("#lista").listview("refresh");
*/
	
	/*$.ajax({
		type: "GET",
		url: "atleti.xml",
		dataType: "xml",
		success: */
		// alert("getting atleti");
		$.get(rooturl+"atleti.xml",function(xml) {
		   //alert(xml);
		  // alert("got atleti");
		   var atl=$(xml).find("atleta");
		  // alert(atl.length);
		  debug(atl.length+" atleti trovati");
		   atl.sort(function(a, b){
		     	var cognome_a = $(a).find('cognome').text();
				var nome_a = $(a).find('nome').text();
				var cognome_b = $(b).find('cognome').text();
				var nome_b = $(b).find('nome').text();
				var cognonome_a=cognome_a+" "+nome_a;
				var cognonome_b=cognome_b+" "+nome_b;
		        //debug(cognonome_a+" "+cognonome_b);
				
				if ( cognonome_a< cognonome_b )   return -1;
if ( cognonome_a> cognonome_b  )  return 1;
return 0;
		  // return cognonome_a-cognonome_b;
		   }); 
		   
		   
		    var htm="";
		    //htm+="<ul id='lista' data-role='listview' data-theme='c' >";
			var count=0;
			atl.each(function(){
				var id = $(this).find("id").text();
				var cognome = $(this).find('cognome').text();
				var nome = $(this).find('nome').text();
				//htm+="<li><a data-ajax='true' href='atleta.html?id="+id+"'>"+cognome+" "+nome+"</a></li>";
				htm+="<li><a data-ajax='true' href=javascript:showAtleta('"+id+"') >"+cognome+" "+nome+"</a></li>";
				count++;
				debug(cognome+" "+nome);
			});
		   //htm+="</ul>";
		   //alert(htm);
		   $("#page_atleti #lista_atleti").empty();
		   $("#page_atleti #lista_atleti").append(htm);
		   $("#page_atleti #lista_atleti").listview();
		   $("#page_atleti #lista_atleti").listview("refresh");
		   $("#page_atleti #recnum").html(count+ " atleti");
		  //} 
	    
     });		

});


function showAtleta(id)
{
	var aid=id;
	$.mobile.changePage("#page_atleta");
    $.ajax({
		type: "GET",
		url: rooturl+"atleti.xml",
		dataType: "xml",
		success: function(xml) {
		   
		    var htm="";
		    //htm+="<ul id='lista' data-role='listview' data-theme='c' >";
			$(xml).find('atleta').each(function(){
				var id = $(this).find("id").text();
				
				if (id==aid)
				{
				 var cognome = $(this).find('cognome').text();
				 var nome = $(this).find('nome').text();
				 htm+="<li><a href='"+id+"'>"+cognome+" "+nome+"</a></li>";
				  $("#id").text($(this).find('id').text());
				 $("#page_atleta #listax_atleta #datanascita").text($(this).find('datanascita').text());
				 $("#page_atleta #listax_atleta #cognomenome").text(cognome+" "+nome);
				 $("#page_atleta #listax_atleta #categoria").text($(this).find('categoria').text());
				 $("#page_atleta #listax_atleta #categoriapeso").text($(this).find('categoriapeso').text());
				 $("#page_atleta #listax_atleta #palestra").text($(this).find('palestra').text());
				 $("#page_atleta #listax_atleta #cintura").text($(this).find('cintura').text());
				 $("#page_atleta #listax_atleta #squadra").text($(this).find('squadra').text());
				 $("#page_atleta #listax_atleta #punticlass").text($(this).find('punticlass').text());
				} 
				
			});
		   //htm+="</ul>";
		   
		   /*$("#listax_atleta").empty();
		   $("#listax_atleta").append(htm);
		   $("#listax_atleta").listview();
		   $("#listax_atleta").listview("refresh");*/
		   
		    
		  } 
	    
     });		
	   	
	
	
	
 
 
	
	
}

$(document).on("pageinit","#gare",function(){

$('#dialogForAtleta').popup();

});
	 
$(document).on("pageshow","#gare",function(){

 debug("gare pageinit");
  		 
 $.ajaxSetup({ cache: false });

   $(".tb").remove();
		 $("#av_toolbar_regdiv").remove();
		 $("#av_toolbar_iframe").remove();
/*
    $("#one").css("background","yellow");
    $("#lista").append("<li>caz</li>");
	$("#lista").append("<li>caz2</li>");
	$("#lista").append("<li>caz3</li>");
	$("#lista").listview("refresh");
*/
 /*   $( "#lista" ).loader({
  html: "<span class='ui-icon ui-icon-loading'><img src='jquery-logo.png' /><h2>is loading for you ...</h2></span>"
});*/

   /* $.mobile.loading( 'show', {
	text: 'Caricamento in corso..',
	textVisible: true,
	theme: 'z',
	html: ""
});*/

    $.ajax({
		type: "GET",
		url: rooturl+"atleti.xml",
		dataType: "xml",
		success: function(axml) {
		   //alert(xml);
		   atleti_xml=axml;
		    xatleti = $.parseXML( atleti_xml );
		     $.ajax({
		type: "GET",
		url: rooturl+"gare.xml",
		dataType: "xml",
		success: function(gxml) {
		   //alert(xml);
		   gare_xml=gxml;
		    xgare = $.parseXML( gare_xml );
		   $.ajax({
		type: "GET",
		url: rooturl+"matches.xml",
		dataType: "xml",
		success: function(mxml) {
		 matches_xml=mxml;
		 //alert(matches_xml);
		  xmatches = $.parseXML( matches_xml );
		 refreshGare();
		// $.mobile.loading('hide');
		
		 }});
		} 
	    
     });	
		 
		} 
	    
     });		
		

});

	function getNormalD(data)
	{
	 //data=data.substring(0,8);
	 var retvalue=data.substring(6)+data.substring(3,5)+data.substring(0,2);
	 
	 return retvalue;
	
	}

function refreshGare(filter)
{ 
  debug("filter: "+filter);
  if (!filter) filter="";
  debug("filter: "+filter);
  $("#lista").empty();
  var xml=gare_xml;
  var atl=$(xml).find("gara");
		  // alert(atl.length);
		  debug(atl.length+" gare trovati");
		   atl.sort(function(a, b){
		     	var data_a = $(a).find('data').text();
				data_a=getNormalD(data_a);
				var data_b = $(b).find('data').text();
				data_b=getNormalD(data_b);
		
		
		        debug(data_a+" "+data_b);
				if ( data_a< data_b ) return 1;
				if ( data_a> data_b ) return -1;
				return 0;
		   }); 
		    var htm="";
		    //htm+="<ul id='lista' data-role='listview' data-theme='c' >";
			var count=0;
			atl.each(function(){
				var id = $(this).find("id").text();
				var cognome = $(this).find('location').text();
				var data = $(this).find('data').text();
				var nome = $(this).find('title').text();
				var stato = $(this).find('stato').text();
				var iscritti = $(this).find('iscritti').text();
				var medaglie=getMedaglieGara(id);
				var arriscr=iscritti.split(",");
				
				var bcolor="";
				var color="";
				if (stato=="disputata") {
				  bcolor="black";
				  
				}
				if (stato=="incorso") {
				  bcolor="#006600";
				  color="black";
				}
				
				var style="";
				if ($.trim(bcolor)!=""){
				  style=" style='background-color:  "+bcolor+"; color: "+color+";' ";
				}
				
				var doIt=false;
				if ($.trim(filter)!="")
				{
				 debug("stato: "+stato+" filter: "+filter);
				 if ($.trim(stato)==$.trim(filter)) doIt=true;
				
				} else doIt=true;
				
				if (doIt)
				{
				count++;
				htm+="<li><a "+style+"  sdata-ajax='false' data-parm-id='"+id+"' onclick='openGara(this)' href='#gara?id='"+id+"'><div>"+"<span class='riga1 font13'>"+nome+"</span><br><span class='riga2 font13'>"+cognome+" - "+data+"</span><br><span class='riga3 font13'>"+stato+"</span><br><span class='riga4 font13'>Iscritti: "+arriscr.length+" - "+medaglie+"</span></div></a></li>";
				}
			});
		   //htm+="</ul>";
		   //alert(htm);
		   
		   $("#listagare").empty();
		   $("#listagare").append(htm);
		   $("#listagare").listview();
		   $("#listagare").listview("refresh");
		   $("#recnum").html(count+ " gare");
		   
		   debug("fine listagare");
}

	var parm_garaid="";
	function openGara(obj)
	{
     var id=$(obj).attr("data-parm-id");
	 parm_garaid=id;
	 
	}
	 
	 
	  $.ajaxSetup({ cache: false });
	  
	 $(document).on("pageinit","#matchesatleta",function() {
		 
	  $("#popResult").popup();
	  $("#popDelMatch").popup();
	   $("#popAddMatch").popup();  
	   
		 
	 }) 
	  
	 $(document).on("pageshow","#gara",function() {
		
		 var durl=$(this).data("url");
		 debug("durl: "+durl);
		 /*garaid=durl.split("id=")[1];
		 garaid=sessionStorage["id"];*/
		 garaid=parm_garaid;
		// alert("ricevo "+garaid);
		 //garaid=parm_garaid;
		 
		 
		 
	$("#gara #dialogCategorie").popup();
	 $('#gara #dialogForAtleta').popup();
	
	  
	
		 
		 
	 $("#gara #refresh").bind("click",function() {
	   debug("activetab: "+activeTab);
	   refreshGara();
	   refreshCronaca();
	  })
	 $(".tb").remove();
		 $("#av_toolbar_regdiv").remove();
		 $("#av_toolbar_iframe").remove();
		 
	 if(navigator.userAgent.match(/Android/i)){
    window.scrollTo(0,1);
	}
	
	$('#gara .spancat').bind('click',function() {
		sdebug("clicked on categorie");
		var lv=$("#gara ul#ulcategorie");
		   lv.listview();
		   lv.listview("refresh");
		//$("#gara #dialogCategorie").popup();
		//$("#dialogCategorie").popup('open', {positionTo: '.spancat'});
		$("#gara #dialogCategorie").popup('open');
		
	});
	
	$("#gara #ulcategorie li").bind("click",function() {
		
		var txt=$(this).text();
		viewcat=txt.toLowerCase();
		var t=txt.toLowerCase();
		if (viewcat=="tutte") viewcat="";
		document.cookie="cookiecat="+viewcat+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
		$("#dialogCategorie").popup('close');
		
		
		if (t.indexOf("esordienti")>-1) t=t.replace("esordienti","eso");
		if (t.indexOf("cadetti")>-1) t=t.replace("cadetti","cad");
		if (t.indexOf("juniores")>-1) t=t.replace("juniores","jun");
		if (t.indexOf("seniores")>-1) t=t.replace("seniores","sen");
		$(".spancat").text(cattxt+t.toUpperCase());
		refreshGara(true);
		
	});
	
	$("#gara #listabyprog li").bind("click",function() {
	   var id=$(this).attr("id");
	   var id=id.replace("prog","");
	   //alert(id);
	
	});
	
	

	     $("#gara #navbar ul li").bind("click",function(){
		    sdebug("clicked tab");
			var idx=$(this).index();
			sdebug("index: "+idx);
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
			sdebug(dtc);
			
            
			//$(this).find("a").removeClass("ui-btn");
			activeTab=idx;
        });
	 
	     //setActiveTab(activeTab);
		 
		 
	
		 
		 
		 
		 $("#gara #bubble").bind("click",function() {
		 
		    $("#gara #bubble").css("background","black");
			notifyseen=true;
			notifycount=0;
			nonletti=0;
			$("#gara .nonvisto").removeClass("nonvisto");
			$("#gara #bubble").html("0").hide();
			
			$("#gara a#tab_cronaca").trigger("click");
	        document.cookie="notifycount="+notifycount+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
			document.cookie="cronacanonletti= ; expires=Thu, 18 Dec 2023 12:00:00 UTC";
		 });
		 
		  
		 
	     document.title="Incontri gara";
	     
		 //$("ul.cachedlistview").hide();
	    
		 //alert($gare.length);
		 
		 	$("#gara #panelright").click(function() {
                $(this).panel( "close" );
            });
	 
	  //$.mobile.ajaxLinksEnabled = false;
	   
	   //garaid = getParameterByName('id');
	   //alert(garaid);
	   anninascita=getParameterByName('anni');
	   cat=getParameterByName('cat');
	   searchgara = getParameterByName('gara');
	   
	   if ($.trim(cat)!="") {
		   sdebug("viewing category: "+cat);
		   viewcat=cat;
	   }
	   
	   var cookiecat=getCookie("cookiecat");
	   
	   if ($.trim(cookiecat)!="") viewcat=cookiecat;
	   
	   
	   var t=viewcat;
	   
	   if ($.trim(t)=="") t="tutte";
	   if (t.indexOf("esordienti")>-1) t=t.replace("esordienti","eso");
		if (t.indexOf("cadetti")>-1) t=t.replace("cadetti","cad");
		if (t.indexOf("juniores")>-1) t=t.replace("juniores","jun");
		if (t.indexOf("seniores")>-1) t=t.replace("seniores","sen");
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
	   
	   refreshGara(true);
	   //refreshCronaca();
	 
	 
	   
	 
	 });
	 
	 
	  function getNDT(data)
	{
	 //sdebug(data);
	 
	 var d=data.substring(6,8) +"/"+data.substring(4,6)+"/"+data.substring(0,4);
	 var t=data.substring(8,10)+":"+data.substring(10,12);
	
	 var retvalue=d+" "+t;
	 
	 return retvalue;
	
	}
	 
	 function initTabs()
	 {
	  $("#gara a[data-role=tab]").each(function (i) {
         $(this).bind("click",function() {
		   sdebug($(this).attr("id"));
		   activeTab=i;
		   setActiveTab(activeTab);
		 });
		 
        });
	 }
	 
	 function setActiveTab(n)
	 {
	 $("#gara #navbar ul li:eq("+n+")").trigger("click");
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
	 
	 var oldupdatetext="";
	 
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
	   
	   $.ajax({
		type: "GET",
		url: rooturl+"gare.xml",
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
	 
	 
	 
var delmatchid="";

$(document).on( 'taphold', 'ul#listampa li', tapholdHandler );

            function tapholdHandler( event ){
			    $(this).addClass("tapped");
				var id=$(this).attr("id").replace("match_","");
				delmatchid=id;
			    $("#popDelMatch").popup('open');
              //alert('Hello');
            }      

			function delMatch()
			{
			  var id=delmatchid;
	  
	  var url="updagent.php?action=delete&tag=match";
	
	url+="&id="+id;
	url+="&garaid="+garaid;
	
	
	
	$.post(rooturl+url,{ a: '1'},function() {
	  delmatchid="";
	  refreshGara(true,{
		 callback: function() {
		refreshMatchesPerAtleta();	 
		$("#popDelMatch").popup('close');
		  //matchesPerAtleta(selectedatletaid,selectedatletaname);
		 }
		
		});
	  
	});
	  
 }
 
 function cancelDelMatch()
 {
  $("#popDelMatch").popup("close");
 }
	 
	 function addMatchOK()
	 {
	  var $mid=$("#matchid");
	
	var progid=$mid.val().substring(1);
	//var datanascita=$atleta.find("datanascita").text();
	var datanascita=selecteddatanasc;
	var atletaname=selectedatletaname;
	var atletaid=selectedatletaid;
	//var atletaname=$atleta.find("cognome").text()+" "+$atleta.find("nome").text();
	//alert(datanascita);
	//return;
	
	var url="updagent.php?action=add&tag=match";
	
	url+="&progid="+progid;
	url+="&garaid="+garaid;
	url+="&atletaid="+atletaid;
	url+="&atletaname="+atletaname;
	url+="&risultato=nd";
	url+="&ordine=1";
	url+="&vinto=no";
	url+="&disputato=no";
	url+="&dadisputare=yes";
	url+="&matchid="+$mid.val();
	url+="&medagliamatch=none";
	url+="&lastupdated=never";	
	url+="&datanascita="+datanascita;
	
	$.post(rooturl+url,{ a: '1'},function() {
	
	 $("#popAddMatch").popup('close');  
	 
	  // history.back();
	  refreshMatchesPerAtleta();	 
	//	$("#popDelMatch").popup('close');
	 /*
	   $.mobile.changePage('#page1',{
	    transition: "none"
	   });
	   
	 //refreshMe(true);
	 refreshGara(true,{
		 callback: function() {
		  matchesPerAtleta(selectedatletaid,selectedatletaname);
		 }
		
		});
	 
	 
	 
	 */
	
	  
	});
	 }
	 
	 function initButtons()
	 {
	 
  /*
  $("ul#lista li a").bind("click",function() {
     //alert("cc");
     $("#popResult").popup("open");
  });
  */
 
	 }
	 
	 function setInt()
	 {
	  setInterval(function () {
	  
	   
	   /*$.ajax({
		type: "GET",
		url: "matches.xml",
		dataType: "xml",
		success: function(mxml) {
		 matches_xml=mxml;
		 $matches=$(mxml);
		 sdebug("caricati "+$matches.find("match").length+" matches");
	  
	     //if (refreshMode=="byatleta") refreshMeByAtleta();
	     //if (refreshMode=="byprog") refreshMeByProg();
		 
		 refreshMeByAtleta();
		 refreshMeByProg();
		 refreshCronaca();
		 
	    }
       });		*/
	  refreshGara();
	  }, timerTime);
	 }
	 
	 
	  function setIntCronaca()
	 {
	  setInterval(function () {refreshCronaca();}, timerCronaca);
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
		   $("#limatches").html(matches.length+" incontri"+mtext);
		   
		   
		
		     var d = new Date();  // 30 Jan 2011
           var dd=formatDateTime(d);  // '30.01.11'
		   sdebug("data "+dd);
		   
		    $("li.liprog").find("span").html("Aggiornato: "+dd);
		   }
		    //debug($msav.find("matches").html());
			
			if (opt.callback!=null) opt.callback();
	    
	 } 
	 
	 
	 function matchAtletaDetail(atletaid)
	 {
	  sdebug(atletaid);
	  
	  var $m=$("<matches></matches>");
	  $matches.find("match").each(function() {
	        var $this=$(this); 
			var aid=$(this).find("atletaid").text();
			if ($.trim(aid)==$.trim(atletaid))
			{
			  $m.append($this.clone());
			}
	   });
	   sdebug("matches for atleta "+atletaid+": "+$m.find("match").length);
	
	   refreshMeByProg({
	    matches: $m,
		ulSelector: "ulForAtleta",
		showUpdated: false,
		showNullMatches: true
	   });
	   //$.mobile.changePage('#dialogForAtleta', {transition: 'pop', role: 'popup', theme: 'b
	   //'}); 
	   
       $('#dialogForAtleta').popup('open');
	   //$.mobile.changePage('#dialogForAtleta');
	 }
	 
	 function matchesPerAtleta(atletaid,atletaname,datanasc)
	 {
	  sdebug("matchesperatleta: "+atletaid);
	  selectedatletaid=atletaid;
	  selectedatletaname=atletaname;
	  selecteddatanasc=datanasc;
	    /*$.mobile.changePage('matchesperatleta.html',{
	    transition: 'none'
	   
	   });
       */
      $.mobile.changePage('#matchesatleta',{
	    transition: 'none'
	   
	   });
	   
	
	 }
	 
	  function setResult(obj)
	 {
	  sdebug("setresult");
	  var li=$(obj).closest("li");
	  li.addClass("liselected");
	  
	  var id=li.attr("id").replace("match_","");
	  sdebug("clicked matchid: "+id);
	  selectedid=id;
	  selectedmatchid=li.attr("tkdr-matchid");
	  //alert(li.attr("id"));
	  $('#radio_vinto').attr('checked', true);
	  $("#popResult").popup("open");
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
	  var cronacatxt="";
	  var ordarr=new Array("primo","secondo","terzo","quarto","quinto","sesto","settimo","ottavo","nono","decimo");
     var result=$("#risult").val();
	 
	 //alert($("ul#lista li.liselected").length);
	 
	 var id=selectedid;
	 var name=selectedatletaname;
	 //alert(id);
	 
	 var valore=$("input:radio[name=radio-choice-0]:checked").val();
	 //alert(v);
	 	  
	  var url="updagent.php?action=edit&tag=match";
	  
	    var ln=$("#matchesatleta ul#listampa li").length;
	   var ord=$("#matchesatleta ul#listampa li#match_"+id).index();
	
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
	  cronacatxt+=selectedatletaname+" "+vintotxt+" il suo "+ordarr[ord]+" "+eunico+"incontro (n."+nincontro+") ";
	  if ($.trim(result)!="") cronacatxt+=" per "+result;
	  
	 
	  }
	  
	  
	   
	   url+="&id="+id;
	   url+="&garaid="+garaid;
	   url+="&vinto="+v;
	   url+="&disputato="+d;
	   url+="&dadisputare="+dd;
	   if ($.trim(result)!="")  url+="&risultato="+result;
	   
	 
	   
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
	  
	   //alert(ord);
	   
	   $("#matchesatleta ul#listampa li").each(function(i) {
	      var id=$(this).attr("id").replace("match_","");
	      var urlx="updagent.php?action=edit&tag=match&garaid="+garaid+"&id="+id;
		  if (i<ord)
		  {
		   sdebug("gara precedente "+i);
		   if (d=="yes")
		   {
		    urlx+="&disputato=yes&vinto=yes&dadisputare=yes&medagliamatch=none";
		   
		   }
		   
		    sdebug(urlx);
			$.ajax({
			type: "POST",
			url: rooturl+urlx,
			async: false
			});
			
		    /*$.post(urlx,{ a: '1'},function() {
			});*/
		  
		  }
		  
		  if (i>ord)
		  {
		   sdebug("gara successiva "+i);
		   if (d=="yes")
		   {
		    if (v=="yes")
			{
		     urlx+="&disputato=no&vinto=no&dadisputare=yes&medagliamatch=none";
		    } 
			if (v=="no")
			{
		     urlx+="&disputato=no&vinto=no&dadisputare=no&medagliamatch=none";
		    } 
		   }
		   
		   if (d=="no")
		   {
		     urlx+="&disputato=no&vinto=no&dadisputare=yes&medagliamatch=none";
		   }
		   
		    sdebug(urlx);
			$.ajax({
			type: "POST",
			url: rooturl+ urlx,
			async: false
			});
			
		    /*$.post(urlx,{ a: '1'},function() {
			});*/
		  
		  }
		  
		 
	   });
	   
	   
	   var cronurl="savecronaca.php?garaid="+garaid+"&text="+encodeURI(cronacatxt);
	   
	   $.post(rooturl+url,{ a: '1'},function() {
	     
		   $("#popResult").popup('close');  
		   var atletaid=$("ul#listampa li.liselected").find("input:hidden.atletaid").val();
	    $("#matchesatleta ul#listampa li").removeClass("liselected");
		
		
		$.ajax({
			type: "POST",
			url: rooturl+cronurl,
			async: false
			});
		 
		 refreshMatchesPerAtleta();
		
		
		
	  
	});
	 }
	 
	 
	 function refreshMatchesPerAtleta()
	 {
		 
		 
		  $.ajax({
		type: "GET",
		url: rooturl+matchfile,
		dataType: "xml",
		success: function(mxml) {
			var $mx=$(mxml);
			var xm=$.parseXML("<matches></matches>");
			var $m=$(xm);
			$mx.find("match").each(function() {
				 
				 var aid=$(this).find("atletaid").text();
				 sdebug("atletaid: "+aid+" - selectedatletaid: "+selectedatletaid);
				 if (aid==selectedatletaid)
				 {
				  $m.find("matches").append($(this).clone());	 
				 }
				 
				
			});
			//alert($m.find("matches").length);
			
			refreshMeByProg({
	    matches: $m,
		ulSelector: "listampa",
		showUpdated: false,
		showNullMatches: true,
		clickAtletaMatches: false,
		callback: function() {
		
		   $("#mparecnum").html($m.find("match").length+" incontri per <i><b>"+selectedatletaname+"</b></i>");
		   $m=null;
		
		
		}
	   });
		}});
		 
	 }
	 
	 function addMatch() {

  $("#popAddMatch").popup('open');

}
	 
	  
function sgetAtletaNameById(id)
{
 //return "mango";
 //debug("getAtletaNameById("+id+")");
 var retvalue="";
 
 $atleti.find("atleta").each(function() {
		     var aid=$(this).find("id").text();
			 var cognome=$(this).find("cognome").text();
			 var nome=$(this).find("nome").text();
			 //debug(aid+" "+cognome+" "+nome);
			 if (aid==id) {
			  retvalue=cognome+" "+nome;
			  return retvalue;
			 }
			 
 });
		 
	
 return retvalue;
}

	  
function sgetAtletaById(id,campo)
{
 //return "mango";
 //debug("getAtletaNameById("+id+")");
 var retvalue="";
 
 
 $atleti.find("atleta").each(function() {
		     var aid=$(this).find("id").text();
			 var cognome=$(this).find("cognome").text();
			 var nome=$(this).find("nome").text();
			 //debug(aid+" "+cognome+" "+nome);
			 if (aid==id) {
			  retvalue=$(this).find(campo).text();;
			  return retvalue;
			 }
			 
 });
		 
	
 return retvalue;
}
	 
	  function refreshMeByAtleta()
	 {
	  var xmatchesgara=$.parseXML("<matches></matches>");
	  var $matchesgara=$(xmatchesgara);
	   //$("#panel-02").panel( "close" );
	   sdebug("refreshMeByAtleta");
	 /*  $.mobile.loading( 'show', {
	text: 'Caricamento...',
	textVisible: true,
	theme: 'b',
	html: ""
	});*/
	  var xml=matches_xml;
	  refreshMode="byatleta";
		    var aid=garaid;
		    var htm="";
		    //htm+="<ul id='lista' data-role='listview' data-theme='c' >";
			 
			//var allmatches=$(xml).find("match");
			var allmatches=$matches.find("match");
			sdebug("Estrazione match per questa gara da "+allmatches.length+" matches");
			
			
			var matchcount=0; 
			allmatches.each(function(){
			    matchcount++;
			    var match=$(this);
				var id = $(this).find("garaid").text();
				//sdebug(id);
				if (id==aid)
				{
				 var cognome = $(this).find('progid').text();
				 var nome = $(this).find('atletaid').text();
				 var datanasc = $(this).find('datanascita').text();
				 
			     //sdebug(cognome+" - "+nome);
				 
				 //$gare.empty();
				 
				 var $m=match.clone();
				 
				 //$gare.find("matches").append($m);
				  if ($.trim(viewcat)!="")
				 {
				  sdebug("viewcat vale:"+viewcat);	  
				  var catatleta=getCategoria(datanasc);
                  sdebug("categoria for "+nome+": "+catatleta);				  
				  if  ($.trim(viewcat)==$.trim(catatleta)) $matchesgara.find("matches").append($m);	 
					 
				 } else   $matchesgara.find("matches").append($m);
				// sdebug(match);
				
				} 
				
			});
			sdebug("ciclato su "+matchcount+" matches");
			sdebug("popolati "+$matchesgara.find("match").length+" per questa gara");
			
			matches=$matchesgara.find("match");
		

		   matches.sort(function(a, b){
		     	var progid_a = $(a).find('atletaid').text();
				var progid_b = $(b).find('atletaid').text();
				
				if ( progid_a< progid_b )  return -1;
                if ( progid_a> progid_b  ) return 1;
               return 0;
           }); 
		   
		   var curratleta="";
		   var curratletaname="";
		   var currmatches="";
		   var currcategoria="";
		   var currdatanasc="";
		   var count=0;
		   var lista=$("<lista></lista>");
		   
		   
		   var ca="";
		   var atleticount=0;
		   matches.each(function() {
		     var aid=$(this).find("atletaid").text(); 
			 if ($.trim(aid)!=ca) {
			 atleticount++;
			 ca=aid;
			 }
		   });
		   
		   sdebug(atleticount+ " unique atleti");
		   
		   var mtext="";
		   if ($.trim(viewcat)!="") mtext=" in cat. "+viewcat.toUpperCase();
		   
		   
		   
		   matches.each(function() {
		     
			count++;
			//sdebug(count);
			var progid=$(this).find("progid").text(); 
			var aid=$(this).find("atletaid").text(); 
			var aname=$(this).find("atletaname").text(); 
			var matchid=$(this).find("matchid").text(); 
			var vinto=$(this).find("vinto").text(); 
			var disputato=$(this).find("disputato").text(); 
			var dadisputare=$(this).find("dadisputare").text(); 
			var medaglia=$(this).find("medagliamatch").text(); 
			var risultato=$(this).find("risultato").text(); 
			var datanasc=$(this).find("datanascita").text(); 
			var categoria=getCategoria(datanasc);
				
			sdebug("matchid: "+matchid+" - atleta: "+aname);
			//era qui
			
			
			
			
			if (aid!=curratleta)
			{
			if (count==1)
				 
			 {
				
			  curratleta=aid;
			  currmatches=matchid;
			  curratletaname=aname;
			  currcategoria=categoria;
			  currdatanasc=datanasc;
			  //anome=aname;
			  sdebug("primo atleta");
			 
			 } else
			 {
			  
			  //var anome=sgetAtletaNameById(curratleta);
			  //var anome=aname;
			  var anome=curratletaname;
			  lista.append("<atleta><nome>"+anome+"</nome><id>"+curratleta+"</id><datanascita>"+currdatanasc+"</datanascita><categoria>"+currcategoria+"</categoria><matches>"+currmatches+"</matches></atleta>");
			  
			 /*htm+="<li><img src='images/matchtoplay.png' alt='France' class='ui-li-icon ui-corner-none'><div>"+getAtletaNameById(curratleta)+" "+currmatches+"</div></li>";*/
			  sdebug("depositato "+anome+" - "+currmatches);
			  sdebug("cambiato atleta: "+curratleta+" "+anome+" "+currmatches);
			 curratleta=aid;
			 curratletaname=aname;
			 currcategoria=categoria;
			 currdatanasc=datanasc;
			 currmatches="";
			 currmatches+=matchid;
			 }
			
			
			} else {
			  if ($.trim(currmatches)!="") currmatches+=",";
			  currmatches+=matchid;
			
			}
			
			if (count==matches.length)
			{
			  sdebug("count = matches.length ");
			  //if ($.trim(currmatches)!="") currmatches+=",";
			  //currmatches+=matchid;
			  
			  //var anome=sgetAtletaNameById(curratleta);
			  var anome=curratletaname;
			  if (matches.length==1) {
			   //anome=sgetAtletaNameById(aid);
			   anome=aname;
			   currmatches=matchid;
			   curratleta=aid;
			   curratletaname=aname;
			   currcategoria=categoria;
			   currdatanasc=datanasc;
			   sdebug("matches.length = 1 ");
			  } 
			  lista.append("<atleta><nome>"+anome+"</nome><id>"+curratleta+"</id><datanascita>"+currdatanasc+"</datanascita><categoria>"+currcategoria+"</categoria><matches>"+currmatches+"</matches></atleta>");
             
			}
			
			
			
			
			 
		  });
		   //htm+="</ul>";
		   
		    var list=lista.find("atleta");
		    list.sort(function(a, b){
		     	var nome_a = $(a).find('nome').text();
				var nome_b = $(b).find('nome').text();
				
				if ( nome_a< nome_b )  return -1;
                if ( nome_a> nome_b  ) return 1;
               return 0;
           }); 
		   
		   //sdebug(list.html());
		   list.each(function() {
		      var nome=$(this).find("nome").text();
			  var categ=$(this).find("categoria").text().toUpperCase();
			  var datan=$(this).find("datanascita").text().toUpperCase();
			  //alert(nome);
			  var incontri=$(this).find("matches").text();
			  var aid=$(this).find("id").text();
		
			  
			  var arr=incontri.split(",");
			  arr.sort(function(a, b){
		     	var nome_a = $(a).find('progid').text();
				var nome_b = $(b).find('progid').text();
				
			    var proga=a.substring(1);
				var progb=b.substring(1);
			    /* 
		     	var nome_a = $(a).find('progid').text();
				var nome_b = $(b).find('progid').text();
				
				if ( nome_a< nome_b )  return 1;
                if ( nome_a> nome_b  ) return -1;
				*/
				if ( proga< progb )  return -1;
                if ( proga> progb ) return 1;
               return 0;
           }); 
			  
			  var incontri2="";
			  
			  $(arr).each(function(i) {
			   // sdebug("incontro "+arr[i]);
				//sdebug(matches.length);
			    incontri2+=getMatchString(arr[i],aid);
			  });
			  
			  var med=getMedaglieGaraAtleta(matches,garaid,aid);
			  var medarr=med.split(",");
			  //sdebug(med);
			  var imgsrc="images/matchtoplay.png";
			  if (medarr[0]>0) imgsrc="images/medaglia_oro.png";
			  if (medarr[1]>0) imgsrc="images/medaglia_argento.png";
			  if (medarr[2]>0) imgsrc="images/medaglia_bronzo.png";
			  
			 // sdebug("creating li with "+nome);
		      htm+="<li data-icon='false'><a data-ajax='false' shref='#matchesatleta' data-rel='popup' shref='gareatleta.html?atletaid="+aid+"&garaid="+garaid+"' shref=javascript:matchAtletaDetail('"+aid+"')  href=\"javascript:matchesPerAtleta('"+aid+"','"+nome+"','"+datan+"')\" id='atleta"+aid+"'><img src='"+imgsrc+"' class='imgicon sui-li-icon sui-corner-none' /><span class='categoria'>"+categ+"</span><br><span class='atleta'>"+nome+"</span><br><span class='match'>"+incontri2+"</span></a></li>";
		   });
		   
		  /* $("#lista").empty();
		   $("#lista").append(htm);
		   $("#lista").listview();
		   $("#lista").listview("refresh");
		   */
		    var listaname="listabyatleta";
		   
		   var listview=$("ul#"+listaname);
		   listview.empty();
		   listview.append(htm);
		   listview.listview();
		   listview.listview("refresh");
		   
		 //$.mobile.loading( 'hide');
		 	  //$("#ulinfogara li span.left").html(sgetMedaglieGara(garaid)+ " - "+matches.length+" match");
			  $("#ulinfogara li span.left").html(sgetMedaglieGara(garaid));
			  $("#limatches").html(matches.length+" incontri");
			  
			     var d = new Date();  // 30 Jan 2011
           var dd=formatDateTime(d);  // '30.01.11'
		   sdebug("data "+dd);
		   
		    $("li.liatleta").find("span").html("Aggiornato: "+dd);
			sdebug("quiliatleta");
	    
	 }
	 
	  function refreshCronaca()
	 {
	  var ht="";	
	  var lastcronaca=getCookie("lastcronaca");
	  var cronacanonletti=getCookie("cronacanonletti");
	  debug("lastcronaca from cookie: "+lastcronaca);	 
	  var cronurl="cronaca_"+garaid+".txt";
	  debug("refreshCronaca from file "+cronurl);
	  var bubcount=0;
	  $.ajax({
		type: "GET",
		url: rooturl+ cronurl,
		dataType: "text",
		success: function(data) {
		   
		   //alert(data);
		   
		   var marr=data.split("\n");
		   
		   sdebug("marr lenght: "+marr.length);
		   sdebug("arrCronaca lenght: "+arrCronaca.length);
		   
		   $(marr).each(function(i) {
			if ($.trim(marr[i])!="")
			 {
			  var d=marr[i].substring(0,14);
			  var t=marr[i].substring(14);
			  
			  
			 var sclass="";
				
			 if (cronacanonletti.indexOf(d)>-1)
             {
			  bubcount++;
              sclass="nonvisto";	
              debug("non letto questo");			  
			 }				 
			
			 if (d>lastcronaca) {
				bubcount++;
				sclass="nonvisto"; 
				if ($.trim(cronacanonletti)!="") cronacanonletti+=",";
				cronacanonletti+=d;
				lastcronaca=d;
			 }
				
			  debug(d+"--"+t+" ---> "+sclass);	
			  
			  var d2=getNDT(d);
			
			
			 // if (diffcount<=nonletti) sclass="nonvisto";
		      ht+="<li><span class=data>"+d2+"</span><input type=hidden class=sortdate value='"+d+"'/><br><span class='testo "+sclass+"'>"+t+"</span></li>";
			 } 
		   });
		   
		   debug("bubblecount: "+bubcount);
		    var listaname="listacronaca";
		    var listview=$("#gara ul#"+listaname);
			 
		   listview.empty();
			listview.append(ht);
			 
		   listview.listview();
		   listview.listview("refresh");
		   
		   
		     var d = new Date();  // 30 Jan 2011
           var dd=formatDateTime(d);  // '30.01.11'
		   $("#gara li.linotify").find("span").html("Aggiornato: "+dd);
		   
		    if (bubcount>0)
		   {
		    $("#gara #bubble").html(bubcount).show();
			$("#gara #bubble").css("background","green");
		
		   } else
		   {
		     $("#gara #bubble").html("0").hide();
			$("#gara #bubble").css("background","black");
		   }
		  
		    document.cookie="lastcronaca="+lastcronaca+"; expires=Thu, 18 Dec 2023 12:00:00 UTC"; 
			document.cookie="cronacanonletti="+cronacanonletti+"; expires=Thu, 18 Dec 2023 12:00:00 UTC"; 
		  
		   
		/*   $("#gara #listacronaca li").on("mouseover",function() {
			  
			  debug("mouseover li"); 
			  
		  });*/
		 
		 $("#gara #listacronaca li").on("click",function() {
			 
			var bubcount=$("#gara #bubble").text();
			var testo=$(this).find("span.testo");
			
			if (testo.hasClass("nonvisto"))
			{	
			var data=$(this).find("input:hidden.sortdate").val();
			
			var cnv=getCookie("cronacanonletti");
			
			
			debug("cnv before removaL: "+cnv);
			var data2=cnv.substring(6,9)+cnv.substring(3,4)+cnv.substring(0,1)+cnv.substring(11,12)+cnv.substring(14,15)+cnv.substring(17,18);
			debug("data to remove: "+data)
			
			var cnv2="";
			
			cnv2=cnv.replace(data+",","");
			cnv2=cnv2.replace(","+data,"");
			cnv2=cnv2.replace(data,"");
			
			debug("cnv after removal: "+cnv2);
			
			
			document.cookie="cronacanonletti="+cnv2+" ; expires=Thu, 18 Dec 2023 12:00:00 UTC";
			
            testo.removeClass("nonvisto");
			bubcount--;
			if (bubcount<0) bubcount=0;
			 
			testo.removeClass("nonvisto");
			$("#bubble").html(bubcount);
			
			if (bubcount==0) $("#bubble").hide();
			 
			 debug("clicked listacronaca item");
			 
			} 
			 
		 })
		   
		  
		  
		  
		   return;
		   
		   
		    var d = new Date();  // 30 Jan 2011
           var dd=formatDateTime(d);  // '30.01.11'
		   sdebug("data "+dd);
		   
		   
		    sdebug("diff "+diff);
		   
		 
		   //logica di incremento bubbles
		   
		   var diff=0;
		   
		   if (marr.length!=arrCronaca.length)
		   {
		    //diff=marr.length-arrCronaca.length;
			diff=marr.length-arrCronaca.length;
			//if (first) diff=0;
		    arrCronaca=marr;
		   var htm="";
		   var diffcount=0;
		
			  
		
			  
			  var bubblecount=0;
		   $(arrCronaca).each(function(i) {
		     diffcount++;
		     if ($.trim(arrCronaca[i])!="")
			 {
			  var d=arrCronaca[i].substring(0,14);
			  var t=arrCronaca[i].substring(14);
			  
			    var sclass="";
			
			 if (d>lastcronaca) {
				bubblecount++;
				sclass="nonvisto"; 
				lastcronaca=d;
				}
			  
			  d=getNDT(d);
			
			
			 // if (diffcount<=nonletti) sclass="nonvisto";
		      htm+="<li><span class=data>"+d+"</span><br><span class='testo "+sclass+"'>"+t+"</span></li>";
			 } 
		   
		   });
		   
		   sdebug("bubblecount: "+bubblecount);
		   document.cookie="lastcronaca="+lastcronaca+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
		   
		   nonletti=nonletti+bubblecount;
		   
	
		 
		   
		   if (nonletti>0)
		   {
		    $("#bubble").html(nonletti).show();
			$("#bubble").css("background","green");
		
		   } else
		   {
		     $("#bubble").html("0").hide();
			$("#bubble").css("background","black");
		   }
		   
		  /* $("#lista").empty();
		   $("#lista").append(htm);
		   $("#lista").listview("refresh");*/
		   
		  //	  listview.empty();
		  
		  
		  sdebug("updating cronaca listview");
		 var listaname="listacronaca";
		    var listview=$("#gara ul#"+listaname);
		   listview.empty();
			listview.append(htm);
		   listview.listview();
		   listview.listview("refresh");
		   
		   
		   listview.find("li").each(function(i) {
		     if (i<nonletti) {
			  $(this).find("span.testo").addClass("nonvisto");
			 
			 }
		    
		   });
		   
		   
		   /*
		   if (first)
		   {
		    sdebug("setting interval for cronaca");
		    setIntCronaca();
		    first=false;
			notifycount=0;
			
		   }
		   */
		   }
		   var d = new Date();  // 30 Jan 2011
           var dd=formatDateTime(d);  // '30.01.11'
		   sdebug("data "+dd);
		   
		    $("#gara li.linotify").find("span").html("Aggiornato: "+dd);
		    sdebug("diff "+diff);
			
			/*
		   if (diff>0)
		   {  
		    notifycount+=parseInt(diff,10);
		    var quanti=parseInt(diff,10)+parseInt(notifycount,10);
		    $("#bubble").html(nonletti+" nuovi");
			$("#bubble").css("background","green");
			notifyseen=false;
			document.cookie="notifycount="+nonletti+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
			
		   }	else
		   {
		   if (notifyseen)
		   {
		    $("#bubble").html("0 nuovi");
		    $("#bubble").css("background","black");
			nonletti=0;
			document.cookie="notifycount="+nonletti+"; expires=Thu, 18 Dec 2023 12:00:00 UTC";
			}
		   }
		   */
		   
		  } 
		  
	    
     });		
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
	 
	 function formatDate(d) {

  var dd = d.getDate()
  if ( dd < 10 ) dd = '0' + dd

  var mm = d.getMonth()+1
  if ( mm < 10 ) mm = '0' + mm

  var yy = d.getFullYear() % 100
  if ( yy < 10 ) yy = '0' + yy

  return dd+'.'+mm+'.'+yy
}

	 function formatDateTime(d) {

  var dd = d.getDate()
  if ( dd < 10 ) dd = '0' + dd

  var mm = d.getMonth()+1
  if ( mm < 10 ) mm = '0' + mm

 // var yy = d.getFullYear() % 100
 // if ( yy < 10 ) yy = '0' + yy

 var yy=d.getFullYear();
 
  var hh=d.getHours();
  var MM=d.getMinutes();
  var ss=d.getSeconds();
  
   if ( hh < 10 ) hh = '0' + hh;
   if ( MM < 10 ) MM = '0' + MM;
   if ( ss < 10 ) ss = '0' + ss;
  
  
  return dd+'/'+mm+'/'+yy+" "+hh+":"+MM+":"+ss;
}



	 
	 
	 function getMatchString(matchid,atleta)
	 {
	  //sdebug("getMatchString for matchid="+matchid+" and atletaid="+atleta);
	  var incontri2="";
	  
	  matches.each(function() {
			    var gid=$(this).find("garaid").text();
				var mid=$(this).find("matchid").text();
				var atid=$(this).find("atletaid").text();
				var disputato=$(this).find("disputato").text();
				var vinto=$(this).find("vinto").text();
				var dadisputare=$(this).find("dadisputare").text();
				var medaglia=$(this).find("medaglia").text();
				
				
				//sdebug(gid+" "+mid+" "+disputato+" "+vinto+"   "+atid); 
				if (($.trim(gid)==$.trim(garaid)) && ($.trim(mid)==$.trim(matchid)) && ($.trim(atleta)==$.trim(atid))) 
{
				 //sdebug("trovato");
				 if ($.trim(dadisputare)=="yes")
				 {
				  if ($.trim(disputato)=="yes")
				  {
				   if ($.trim(vinto)=="yes") incontri2="   <span class=green>"+mid+"</span>";
				   if ($.trim(vinto)!="yes") incontri2="   <span class=red>"+mid+"</span>";
				  } else incontri2="   <span class=gray>"+mid+"</span>"; 
				 } else incontri2="    <span class=black style='text-decoration: line-through;'>"+mid+"</span>";
				// sdebug("restitusisco: "+incontri2);
				 return incontri2;
				}
				 
			  });
			  return incontri2;
	 }
	 
	 function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
	
	
	function showIscritti(){
	
	 //$.mobile.changePage("iscritti.html");
	 $.mobile.changePage("#iscrittiPage");
	


	
	}
	
	function sdebug(txt)
	{
	 return;
	 debug(txt);
	
	}
	
	
	function compare()
	{
	 var $a=$matches.find("match:first");
     compareXmlItem($a,$a);	 
		
		
	}
	
	
	function compareByDate($a,$b,tag)
	{
	 var r="<matches></matches>";
	 var xr=$.parseXML(r);
	 var $xr=$(xr);
     sdebug("a: "+$a.find("match").length) 	;	
	 sdebug("b: "+$b.find("match").length) 	;
	 $a.find(tag).each(function() {	
	   var $this=$(this);
		
		 var id_a=$this.find("id").text();
		 var matchid_a=$this.find("matchid").text();
		 var lu_a=$this.find("lastupdated").text();
		 var $bb=$b.find(tag).find("id:contains("+id_a+")");
		 	
		 var id_b=$bb.parent().find("id").text();
		 var lu_b=$bb.parent().find("lastupdated").text();
		 
		 
		 if (lu_a!=lu_b)
		 {
		   sdebug("trovata data diversa in id "+id_a+" - matchid = "+matchid_a);	  
		   $xr.find("matches").append($bb.parent().clone());	 
		 }
		 
	 });	 
		
		
	  return $xr;	
	}
	
	
	function getCategoria(dn)
	{
     var cat="seniores a";		 
	 var curyear=new Date().getFullYear();
	 curyear=annogara;
	 //sdebug("curyear: "+curyear);
     
	 if ($.trim(dn)=="") {
		 return "seniores b";
	 }
     var ar=dn.split(".");	
     var byear=ar[2];	 
	 
	 var eta=parseInt(curyear,10)-parseInt(byear,10);
	 //sdebug("calcolo età: "+eta);
	 
	 if ((eta>=18) && (eta<=35)) cat="seniores a"; 
	 if ((eta>=15) && (eta<=17)) cat="juniores"; 
	 if ((eta>=12) && (eta<=14)) cat="cadetti a"; 
	 if ((eta>=10) && (eta<=11)) cat="cadetti b"; 
	 if (eta>35) cat="seniores b";
	 if (eta<10) cat="esordienti";
	
	 
	 return cat	
		
	}
	
	
	
function sgetMedaglieGara(id)
	{
	var ori=0;
	  var argenti=0;
	  var bronzi=0;
	 $(matches_xml).find("match").each(function() {
	  var match=$(this);
	  var mid=match.find("garaid").text();
	  var datanasc=match.find("datanascita").text();
	  var med=$.trim(match.find("medagliamatch").text());
	  //debug(med);
	  var computa=false;
	   if ($.trim(viewcat)!="")
		{
		var catatleta=getCategoria(datanasc);
        sdebug("categoria : "+catatleta);				  
		if  ($.trim(viewcat)==$.trim(catatleta)) computa=true;	 
					 
		} else computa=true;
	  
	  if (($.trim(mid)==$.trim(id)) && (computa))
	  {
	   if ($.trim(med)=="oro") ori++;
	   if ($.trim(med)=="argento") argenti++;
	   if ($.trim(med)=="bronzo") bronzi++;
	  
	  
	  }
	 
	 });
	 var retvalue="<span style='color: yellow;'>ORI: "+ori+"</span>&nbsp;&nbsp;&nbsp;<span style='color: silver;'>ARG: "+argenti+"</span>&nbsp;&nbsp;&nbsp;<span style='color: brown;'>BRO: "+bronzi+"</span>";
	 return retvalue;
	
	}
	
	
	
 function getGaraById(id)
 {
  var retvalue=null;
  sdebug("getGaraById "+id);
  var retvalue="";
  //$(gare_xml).find("gara").each(function() {
  $gare.find("gara").each(function() {
    var $gara=$(this);
    var garaid=$gara.find("id").text();
	 //debug("garaid "+garaid);
	if ($.trim(garaid)==$.trim(id)) {
	 sdebug("trovata gara");
	 retvalue=$gara;
	}
  });
  return retvalue;
 }
 
 
 function hideAddressBar()
{
 sdebug("hideaddressbar");
  if(!window.location.hash)
  {
      if(document.height < window.outerHeight)
      {
          document.body.style.height = (window.outerHeight + 50) + 'px';
      }
 
      setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
  }
}
 
 function debug(text,plugname) {
	 return; 
 
	if (window.console && window.console.log)
	{
	  window.console.log(text);
	 } 

  }
  
  
	function getMedaglieGaraAtleta($m,garaid,atletaid)
	{
	 var ori=0;
	  var argenti=0;
	  var bronzi=0;
	  //debug("cerco medaglie gara per atleta su "+$m.length);
	 //$(matches_xml).find("match").each(function() {
	 //$matches.find("match").each(function() {
	 $m.each(function() {
	  var match=$(this);
	  var mid=match.find("garaid").text();
	  var aid=match.find("atletaid").text();
	  var med=$.trim(match.find("medagliamatch").text());
	  //debug(med);
	  
	  if (($.trim(mid)==$.trim(garaid)) && ($.trim(aid)==$.trim(atletaid)))
	  {
	   if ($.trim(med)=="oro") ori++;
	   if ($.trim(med)=="argento") argenti++;
	   if ($.trim(med)=="bronzo") bronzi++;
	  
	  
	  }
	 
	 });
	 var retvalue=ori+","+  argenti+","+bronzi;
	 return retvalue;
	
	}
	