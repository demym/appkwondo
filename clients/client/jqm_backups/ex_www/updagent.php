<?php

$qs=$_GET;
$fname="provaccia.xml";


	
	
if (!hasQs("tag")) {
	echo 'tagname not provided, exiting<br>';
	die();
}
if (!hasQs("action")) {
	echo 'action not provided, exiting<br>';
	die();
}	

$action=$qs["action"];
$tag=$qs["tag"];

echo 'action='.$action.'<br>';


if ($tag=="match")
{
 if (!hasQs("garaid"))
 {
  echo 'garaid not provided, exiting<br>';
  die();
 } else
 {
  $fname="matches_".$qs["garaid"].".xml";
 }
}


echo 'Using filename '.$fname.'<br>';

if (!file_exists($fname)) {  
       echo 'file '.$fname.' doest not exist, creating it<br>';	
       $filefound = '0';   
       $ftag="atleti";
       if ($tag=='gara') $ftag='gare';	   
	   if ($tag=='match') $ftag='matches';
       $cont='<'.$ftag.'></'.$ftag.'>';	   
       file_put_contents($fname, $cont, FILE_APPEND | LOCK_EX);	 
       echo 'file '.$fname.' created and initialized<br>';	   
    }

	if($xmlfile = file_get_contents($fname)){
		echo 'file '.$fname.' exists';
	} else {
	  echo 'impossible to read xml from file '.$fname.'<br>';	
	  die();
		
	}	




if ($action=='add')
{
 //$xmldoc->loadXML();
 $xml = new DOMDocument();
 $xml->preserveWhiteSpace = false;
 $xml->formatOutput = true;
 $xml->loadXML($xmlfile);
 echo 'file '.$fname.'loaded';

 $root = $xml->firstChild;
 //$xml->appendChild($root);
 
 $ttag= $xml->createElement($tag);

 
 foreach ($qs as $key => $value) {
	 
    if  (($key!='action') && ($key!='tag'))
	{
		echo'adding tag '.$key.' with value='.$value.'<br>';
        $tkey   = $xml->createElement($key);
        $tvalue = $xml->createTextNode($value);
        $tkey->appendChild($tvalue);
		
		$ttag->appendChild($tkey); 
		
		
	}
 }	
 
 
	
if (!hasQs("id")) {
        $tkey   = $xml->createElement("id");
		$timestamp=date('YmdHis');
        $tvalue = $xml->createTextNode($timestamp);
        $tkey->appendChild($tvalue);
		
		$ttag->appendChild($tkey); 
}
 
 

  
  $root->appendChild($ttag);
 
 
	
$xml->save($fname);
	
	
}

//EDIT

if ($action=='edit')
{
 if (!hasQs("id")) {
	echo 'id not provided, exiting<br>';
	die();
 }	
 
   echo 'Searching tag '.$tag.' id='.$qs["id"].' in file '.$fname.'<br>';
 
  $xml = new DOMDocument();
  $xml->preserveWhiteSpace = false;
  $xml->formatOutput = true;
  $xml->loadXML($xmlfile);
   
      
        $root = $xml->firstChild;

         
        echo 'Loaded xml from file '.$fname.'<br>'; 
        $found=false;
        
        //$segarr = $xml->match;
		//$segarr=$xml->getElementsByTagName($tag);
	
	

        //$count = count($segarr);

        $j = 0;
		
		$tags = $xml->getElementsByTagName($tag);
		
		$count=-1;

        foreach ($tags as $el) {
			
          $count=$count+1;
		  echo 'reading tag '.$tag.' n. '.(string)$count.'<br>';
        
         $currel=$el;
		 
         	 
			$ids=$currel->getElementsByTagName("id");
		 
		//if (isset($currel->getElementsBtTagName("id")->item(0)))
		if ($ids->length>0)	
		{	 
		 
	
         $tid=$ids->item(0)->nodeValue;

 
         
         
         echo 'id '.$tid.'<br>';
       

           if ( strcmp( $tid, $qs["id"]) == 0  )
		   {
    
             echo 'Modifying tag  '.$tag.' id='.$tid.'in file '.$fname.'<br>';
             $xel=$currel;
					 
            foreach ($qs as $key => $value) {
	 
                  if  (($key!='action') && ($key!='tag') && ($key!='id'))
	              {
		           echo'updating tag '.$key.' with value='.$value.'<br>';
				   
				   $xvalue = $currel->getElementsByTagName($key);
                   $xvalue->item(0)->nodeValue=$value;
				   

	             }
             }	
 
 
  
                    
            
             
    
              $found=true;
           }
		} else
		{
		 echo 'node id not found in tag '.$tag.' n.'.$count.'<br>';	
			
		}	
           
        }
        
		if ($found)
        {
  
          echo 'tag '.$tag.' da modificare trovati, scrivo file '.$fname.'<br>';
          $xml->save($fname);
  
        }
  
	
 	
	
}

//FINE EDIT


//DELETE

 //DELETE MATCH BY ID
 
  if ($action=='delete')
 {

 if ($qs["id"]=='')
 {
  echo 'No id to remove specified'.'<br>';
 } else
 {
  echo 'Searching "+$tag+" id='.$qs["id"].' in file '.$fname.'<br>';

 
   $xml = simplexml_load_file($fname); 
   



    
    
    
    
        
          $root = $xmldoc->firstChild;

         
        echo 'Loaded xml from file '.$fname.'<br>'; 
        $found=false;
        
        $segarr = $xml->match;

        $count = count($segarr);

        $j = 0;

        for ($i = 0; $i < $count; $i++) {
        
         echo 'matchid'.$segarr[$j]->matchid.'<br>';

           if ( strcmp ( $segarr[$j]->id, $qs["id"]) == 0  ){
           //if ($segarr[$j]->id === $id) {
           echo 'Delete matchid '.$segarr[$j]->matchid.'<br>';
              unset($segarr[$j]);
              
              $j = $j - 1;
              $found=true;
           }
           $j = $j + 1;
        }
        
		if ($found)
 {
  
  echo 'matches da cancellare trovati, scrivo file '.$fname.'<br>';
  $xml->asXml($fname);
  
 }
      
	  

}
}
//FINE DELETE

function hasQs($parm)
{
  echo 'hasQs<br>';	 
	 
  if (isset($_GET[$parm]))
  {	
  
   if (trim($_GET[$parm])!='')
   {
    	   
   $retval=true;
    echo 'isset<br>';
   } else {
	   $retval=false;
	    echo 'notset<br>';
   }	   
  } else {
	 echo 'notset<br>';
	 $retval=false;  
  }
  
  echo $retval.'<br>';
  return $retval;
}

?>
