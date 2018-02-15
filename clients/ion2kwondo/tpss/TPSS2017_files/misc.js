
function ShowTip(fArg)
{
	var tooltipOBJ = (document.getElementById) ? document.getElementById('tt' + fArg) : eval("document.all['tt" + fArg + "']");
	if (tooltipOBJ != null) {
		var tooltipLft = (document.body.offsetWidth?document.body.offsetWidth:document.body.style.pixelWidth) - (tooltipOBJ.offsetWidth?tooltipOBJ.offsetWidth:(tooltipOBJ.style.pixelWidth?tooltipOBJ.style.pixelWidth:380)) - 30;
		if (navigator.appName != 'Netscape') {
			var tooltipTop = (document.body.scrollTop>=0?document.body.scrollTop+10:event.clientY+10);
			if ((event.clientX > tooltipLft) && (event.clientY < (tooltipOBJ.scrollHeight?tooltipOBJ.scrollHeight:tooltipOBJ.style.pixelHeight) + 10)) {
				tooltipTop = (document.body.scrollTop?document.body.scrollTop:document.body.offsetTop) + event.clientY + 20;
			}
			tooltipOBJ.style.pixelLeft = tooltipLft; tooltipOBJ.style.pixelTop = tooltipTop;
		}
		else {
			var tooltipTop = 10;
			tooltipOBJ.style.left = tooltipLft; tooltipOBJ.style.top = tooltipTop;
		}
		tooltipOBJ.style.visibility = "visible";
	}
}

function HideTip(fArg)
{
	var tooltipOBJ = (document.getElementById) ? document.getElementById('tt' + fArg) : eval("document.all['tt" + fArg + "']");
	if (tooltipOBJ != null) {
		tooltipOBJ.style.visibility = "hidden";
	}
}



function ShowNews(fArg)
{
	var tooltipOBJ = (document.getElementById) ? document.getElementById('tt' + fArg) : eval("document.all['tt" + fArg + "']");
	if (tooltipOBJ != null) {
		var tooltipLft = (document.body.offsetWidth?document.body.offsetWidth:document.body.style.pixelWidth) - (tooltipOBJ.offsetWidth?tooltipOBJ.offsetWidth:(tooltipOBJ.style.pixelWidth?tooltipOBJ.style.pixelWidth:380)) - 30;
		if (navigator.appName != 'Netscape') {
			var tooltipTop = (document.body.scrollTop>=0?document.body.scrollTop+10:event.clientY+10);
			if ((event.clientX > tooltipLft) && (event.clientY < (tooltipOBJ.scrollHeight?tooltipOBJ.scrollHeight:tooltipOBJ.style.pixelHeight) + 10)) {
				tooltipTop = (document.body.scrollTop?document.body.scrollTop:document.body.offsetTop) + event.clientY + 20;
			}
			tooltipOBJ.style.pixelLeft = 20; tooltipOBJ.style.pixelTop = tooltipTop;
		}
		else {
			var tooltipTop = 20;
			tooltipOBJ.style.left = 20; tooltipOBJ.style.top = tooltipTop;
		}
		tooltipOBJ.style.visibility = "visible";
	}
}


function HideNews(fArg)
{
	var tooltipOBJ = (document.getElementById) ? document.getElementById('tt' + fArg) : eval("document.all['tt" + fArg + "']");
	if (tooltipOBJ != null) {
		tooltipOBJ.style.visibility = "hidden";
	}
}





var gAutoPrint = true; // Tells whether to automatically call the print function

function printSpecial()


{
if (top.frames["main"].document.getElementById != null)
{
var html = '<HTML>\n<HEAD>\n';

if (top.frames["main"].document.getElementsByTagName != null)
{
var headTags = top.frames["main"].document.getElementsByTagName("head");
if (headTags.length > 0)
html += headTags[0].innerHTML;
}

html += '\n</HE>\n<BODY>\n';

var printReadyElem = top.frames["main"].document.getElementById("printReady");

if (printReadyElem != null)
{
html += printReadyElem.innerHTML;
}
else
{
alert("Could not find the printReady function");
return;
}

html += '\n</BO>\n</HT>';

var printWin = window.open("","printSpecial");
printWin.document.open();
printWin.document.write(html);
printWin.document.close();
if (gAutoPrint)
printWin.print();
}
else
{
alert("The print ready feature is only available if you are using an browser. Please update your browswer.");
}
}

// constants to define the title of the alert and button text.
var ALERT_TITLE = "TaekoPlan Tournament Subscription Site";
var ALERT_BUTTON_TEXT = "Close";

// over-ride the alert method only if this a newer browser.
// Older browser will see standard alerts
//if(document.getElementById) {
//	window.alert = function(txt) {
//		createCustomAlert(txt);
//	}
//}

function createCustomAlert(txt) {
	// shortcut reference to the document object
	d = document;

	// if the modalContainer object already exists in the DOM, bail out.
	if(d.getElementById("modalContainer")) return;

	// create the modalContainer div as a child of the BODY element
	mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
	mObj.id = "modalContainer";
	 // make sure its as tall as it needs to be to overlay all the content on the page
	mObj.style.height = document.documentElement.scrollHeight + "px";

	// create the DIV that will be the alert 
	alertObj = mObj.appendChild(d.createElement("div"));
	alertObj.id = "alertBox";
	// MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
	if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
	// center the alert box
	alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";

	// create an H1 element as the title bar
	h1 = alertObj.appendChild(d.createElement("h1"));
	h1.appendChild(d.createTextNode(ALERT_TITLE));

	// create a paragraph element to contain the txt argument
	msg = alertObj.appendChild(d.createElement("p"));
	//var str = txt;
	//var result = str.replace("\n", "<BR>");
	msg.appendChild(d.createTextNode(txt));

	// create an anchor element to use as the confirmation button.
	btn = alertObj.appendChild(d.createElement("a"));
	btn.id = "closeBtn";
	btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
	btn.href = "#";
	// set up the onclick event to remove the alert when the anchor is clicked
	btn.onclick = function() { removeCustomAlert();return false; }

	
}

// removes the custom alert from the DOM
function removeCustomAlert() {
	document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}


// This JavaScript makes capitalizes the initial letter 
//   of all words and the rest of the letters lowercase.
// It also removes extra space between words.
//
// Two values need to be specified, the form name and the 
//   field name to be processed.


function CapitalizeNames(myform,fieldname) {
var ValueString = new String();
eval('ValueString=document.'+FormName+'.'+FieldName+'.value');
ValueString = ValueString.replace(/ +/g,' ');
var names = ValueString.split(' ');
for(var i = 0; i < names.length; i++) {
   if(names[i].length > 1) {
	   names[i] = names[i].toLowerCase();
	   letters = names[i].split('');
   	letters[0] = letters[0].toUpperCase();
	   names[i] = letters.join('');
	   }
	else { names[i] = names[i].toUpperCase(); }
	}
ValueString = names.join(' ');
eval('document.'+FormName+'.'+FieldName+'.value=ValueString');
return true;
}
