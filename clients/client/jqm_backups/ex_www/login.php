<?php
$u=$_POST['username'];
$p=$_POST['password'];

$r="notok";

if (($u==="demy") && ($p==="stevevai"))
{
 $r="ok";	
}	
if (($u=="marika") && ($p=="gabriele"))
{
 $r="ok";	
}	
if (($u=="victor") && ($p=="gabriele"))
{
 $r="ok";	
}	
if (($u=="general") && ($p=="inter"))
{
 $r="ok";	
}	

if ($r=="ok")
{
	session_register("myusername");
    $_SESSION['login_user']=$u;
	header("Location: index_app.html", true, 301);
	exit;
} else
{
	$error="Utente non valido";
}

?>
<html>
<head>
 <link rel="stylesheet" href="jqm/jquery.mobile-1.4.4.min.css" />
 <script src="jqm/jquery-1.11.1.min.js"></script>
  <script src="jqm/jquery.mobile-1.4.4.min.js"></script>
  <script type="text/javascript">
  var $=jQuery;
  
  $(document).on("pageinit",function() {
	  	 $.mobile.ajaxLinksEnabled = false;
	  	  $(".tb").remove();
		 $("#av_toolbar_regdiv").remove();
		 $("#av_toolbar_iframe").remove();
       //alert("removed av toolbar
	   	 if(navigator.userAgent.match(/Android/i)){
    window.scrollTo(0,1);
}
	  
  })
  </script>
</head>
<body>
<div id="loginPage" data-role="page" data-theme="b">
<div data-role="header">
<h1>Autenticazione</h1>
</div>

<div data-role="content">   
    <div id="landmark-1" data-landmark-id="1">
	<div id="msg" style="text-align: center"></div>
    <form id="loginForm"  action="" method="post">
    <div data-role="fieldcontain" class="ui-hide-label">
        <label for="username">User:</label>
        <input type="text" name="username" id="username" value="" placeholder="User" />
    </div>

    <div data-role="fieldcontain" class="ui-hide-label">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" value="" placeholder="Password" />
    </div>

    <input type="submit" value="login"/>
    </form>
</div>  
</div>

<div data-role="footer">
    <h4>AppKwonDo Rozzano</h4>
</div>
</body>
</html>