 var atleti_xml=null;
 var gare_xml=null;
 var matches_xml=null;
 
 var $atleti=null;
 var $gare=null;
 var $matches=null;
 
 var debugActive=true;
 var iedebug=false;

 var $=jQuery;
 
 $(document).ready(function() {
  $(".tb").remove();

 $("#av_toolbar_regdiv").remove();
 $("#av_toolbar_iframe").remove();
  debug("removed av toolbar");
 
 });
 
function debug(text,plugname) {
    if (debugActive==false) return; 
    if (plugname==null) plugname="";
	 
	 if (iedebug==true) 
	 { 
	  alert("DEBUG\n"+text); 
	 }
	if (window.console && window.console.log)
	{
	  window.console.log("DEBUG (iedebug="+iedebug+") - "+plugname.toUpperCase()+" - "+text);
	 } 

  }
  
   function getQueryString(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
	
 
 
 function getGaraById(id)
 {
  var retvalue=null;
  debug("getGaraById "+id);
  var retvalue="";
  //$(gare_xml).find("gara").each(function() {
  $gare.find("gara").each(function() {
    var $gara=$(this);
    var garaid=$gara.find("id").text();
	 //debug("garaid "+garaid);
	if ($.trim(garaid)==$.trim(id)) {
	 debug("trovata gara");
	 retvalue=$gara;
	}
  });
  return retvalue;
 }
 
function getAtletaNameById(id)
{
 return "mango";
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

function getMedaglieGara(id)
	{
	var ori=0;
	  var argenti=0;
	  var bronzi=0;
	 $(matches_xml).find("match").each(function() {
	  var match=$(this);
	  var mid=match.find("garaid").text();
	  var med=$.trim(match.find("medagliamatch").text());
	  //debug(med);
	  
	  if ($.trim(mid)==$.trim(id))
	  {
	   if ($.trim(med)=="oro") ori++;
	   if ($.trim(med)=="argento") argenti++;
	   if ($.trim(med)=="bronzo") bronzi++;
	  
	  
	  }
	 
	 });
	 var retvalue="ORI: "+ori+"  ARGENTI: "+argenti+"  BRONZI: "+bronzi;
	 return retvalue;
	
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
	
	
		function getNormalDate(data)
	{
	 //data=data.substring(0,8);
	 var retvalue=data.substring(6)+data.substring(3,5)+data.substring(0,2);
	 
	 return retvalue;
	
	}
	
			function getNormalTime(data)
	{
	 data=data.substring(9);
	 var retvalue=data.substring(0,2)+data.substring(3,2)+data.substring(5,2);
	 
	 return retvalue;
	
	}
	
	function getNormalDateTime(data)
	{
	 debug(data);
	 
	 var d=data.substring(6,8) +"/"+data.substring(4,6)+"/"+data.substring(0,4);
	 var t=data.substring(8,10)+":"+data.substring(10,12);
	
	 var retvalue=d+" "+t;
	 
	 return retvalue;
	
	}
	