<?php


$txt=$_GET['text'];
$garaid=$_GET['garaid'];
$file = 'cronaca_'.$garaid.'.txt';
$xfile = 'cronaca_'.$garaid.'.xml';
$action=$_GET['action'];
echo $txt.'<br>';
// no username entered

if (trim($garaid)==""){
	
	echo 'Garaid not specified, exiting<br>';
	die();
	
}


// Write the contents to the file, 
// using the FILE_APPEND flag to append the content to the end of the file
// and the LOCK_EX flag to prevent anyone else writing to the file at the same time
 $file_content = file_get_contents ($file);
$timestamp=date('YmdHis');
  file_put_contents($file, $timestamp.'   '.$txt . "\n" . $file_content);
  echo 'Testo inserito in file '.$file.'<br>';

//file_put_contents($file, $txt."\n", FILE_APPEND | LOCK_EX);





if ($action==='clear')
{
 file_put_contents($file, '');
 echo 'Resettato file '.$file.'<br>';
 exit;
}




 $xmldoc = new DomDocument();    
    $xmldoc->formatOutput = true;
 		 $xmldoc->preserveWhiteSpace = false;
  
    
 
    if (trim($txt)!='')
	{
   
    
     $timestamp=date('YmdHis');
    
   if (!file_exists($xfile)) {  
       echo 'file '.$xfile.' doest not exist, creating it<br>';	
       $filefound = '0';   
       $ftag="atleti";
       if ($tag=='gara') $ftag='gare';	   
	   if ($tag=='match') $ftag='matches';
       $cont='<cronaca><garaid>'.$garaid.'</garaid></cronaca>';	   
       file_put_contents($xfile, $cont, FILE_APPEND | LOCK_EX);	 
       echo 'file '.$xfile.' created and initialized<br>';	   
    }

	
    

    if($xml = file_get_contents($xfile)){
    
    
        
    
        $xmldoc->loadXML($xml);

 

        $root = $xmldoc->firstChild;
        
        $newElement = $xmldoc->createElement('cronacarow');
        $root->appendChild($newElement);
      
         $nameElement = $xmldoc->createElement('id');
        $newElement->appendChild($nameElement);
        $nameText = $xmldoc->createTextNode($timestamp);
        $nameElement->appendChild($nameText); 
	    
        $nameElement = $xmldoc->createElement('data');
        $newElement->appendChild($nameElement);
        $nameText = $xmldoc->createTextNode($timestamp);
        $nameElement->appendChild($nameText);
		
		$nameElement = $xmldoc->createElement('testo');
        $newElement->appendChild($nameElement);
        $nameText = $xmldoc->createTextNode($txt);
        $nameElement->appendChild($nameText);

		
		echo 'Saving file '.$xfile.'<br>';
        $xmldoc->save($xfile);
    } else
	{
	  echo 'file '.$xfile.' non trovato<br>';	
	}
    
	}

?>