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
	 var retvalue="ORI: "+ori+"  ARG: "+argenti+"  BRO: "+bronzi;
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
	
	
	function compareXml()
	{
		var xmlText = '<bookstore>';
xmlText += '<book category="COOKING" section="en">';
xmlText += '<title lang="en">Everyday Italian</title>';
xmlText += '<author category="COOKING">Giada De Laurentiis</author>';
xmlText += '<year><leap>2005</leap></year>';
xmlText += '<price>30.00</price>';
xmlText += '</book>';
xmlText += '</bookstore>';
xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
xmlDoc.async = false;
xmlDoc.loadXML(xmlText);
xmlDoc.setProperty("SelectionLanguage", "XPath");
		 var tab = "&nbsp;&nbsp;"
    //alert(xmlDoc.documentElement.childNodes.length);
    removeElem = xmlDoc.selectSingleNode('/bookstore/book');
    removeElem.removeChild(xmlDoc.getElementsByTagName("year")[0]);
    var root = xmlDoc.documentElement;
    var childs = root.selectNodes('//*');
    for (var i = 0; i < childs.length; i++) {
        //alert(childs[i].xml);
        var XMLNode = childs[i];
        var XMLNodeName = childs[i].nodeName;
        var XMLNodeType = childs[i].nodeType;
        if (XMLNode.nodeType == 1) {
            var XMLNodeAttribute = XMLNode.selectNodes('attribute::*');
            debug("<br/>" + tab + "Element Name " + XMLNodeName + "<br/>");
            for (var j = 0; j < XMLNode.attributes.length; j++) {
                var attrib = XMLNode.attributes[j];
                if (attrib.specified == true) {
                    debug(tab + "Attributes " + attrib.name + " = " + attrib.value + "<br/>");
                }
            }
            if (XMLNode.firstChild.nodeType == 3) {
                debug(tab + "Node Value " + XMLNode.firstChild.nodeValue + "<br/>");
            }
            tab += tab;
        }
    }
		
		
	}
	
	
	function compareByDate($a,$b,tag)
	{
	 var r="<matches></matches>";
	 var xr=$.parseXML(r);
	 var $xr=$(xr);
     debug("a: "+$a.find("match").length) 	;	
	 debug("b: "+$b.find("match").length) 	;
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
		   debug("trovata data diversa in id "+id_a+" - matchid = "+matchid_a);	  
		   $xr.find("matches").append($bb.parent().clone());	 
		 }
		 
	 });	 
		
		
	  return $xr;	
	}
	
	function compareXmlFile($a,$b,tag)
	{
     var r="<matches></matches>";
	 var xr=$.parseXML(r);
	 var $xr=$(xr);
     debug("a: "+$a.find("match").length) 	;	
	 debug("b: "+$b.find("match").length) 	;
	 $a.find(tag).each(function() {
		 var $this=$(this);
		
		 var id=$this.find("id").text();
		 var $bb=$b.find(tag).find("id:contains("+id+")");
		 var l=$bb.length;
		 //debug("elementi con id="+id+" nel nuovo xml -->"+l);
		 if (l==1) {
			 
			 if (!compareXmlItem($this,$bb.parent())) {
				 $xr.find("matches").append($bb.parent().clone());
			 }
			 
			 
		 }
		 
		 
	 });	 
	 	
		debug("difference lenght: "+$xr.find("match").length);
	 if ($xr.find("match").length>0) {
		 debug("$xr matches: "+$xr.find("matches").html())	;
	 }	
		
	 return $xr;	
	}
	
	
	function compareXmlItem($a,$b)
	{
	 var $childs_a=$a.children();
	 var $childs_b=$b.children();
	 debug("$childsa: "+$childs_a.length+" -- $childsb: "+$childs_b.length);
	 //($childs.length);
	 var uguale=true;
	 $childs_a.each(function(){
		 
		 var foundtag=true;
		 var ch=$(this);
		 var tag=ch.get(0).tagName;
		 var val=ch.text();
		 var l=$b.find(tag).length;
		
		 

		 if (l==0) {
			 foundtag=false;
			 uguale=false;
		 } else		 
		 {
			  debug(tag.toUpperCase()+" - "+val+" --> "+$b.find(tag).text());
			 
			 
		 }
		 var changedtext;
		 if (foundtag) {
			 debug("il tag "+tag+"esiste in entrambi gli elementi");
			 
			 var val2=$b.find(tag).text();
			 if ($.trim(val)!=$.trim(val2)) {
				 debug("i tag "+tag+" hanno valori diversi: "+val+" --> "+val2);
				 uguale=false;
			 } //else debug("i tag "+tag+" hanno valori uguali: "+val+" --> "+val2);
		 }
		 
		 
		 
	 });
		
		
		if (!uguale) {
			debug("i due elementi sono diversi");
			
		} //else debug("i due elementi sono uguali");
		
		return uguale;
		
		
		
	}