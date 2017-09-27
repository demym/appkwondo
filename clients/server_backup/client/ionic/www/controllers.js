angular.module('starter.controllers', [])


.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

 
.factory('globals', function($ionicLoading) {
	
    var globals = [];
    var globalsService = {};
	
	globalsService.rooturl="http://tkdr.herokuapp.com";
	//globalsService.rooturl="http://ssodemyapp.mybluemix.net";
	//globalsService.rooturl="http://appkwondo.mybluemix.net";
	//globalsService.rooturl="http://localhost:3000";
	
	
	globalsService.atleti={};
	
	/*
	globalsService.getAtleti=function(){
		
	   //no params for atleti
       var callobj={
		   dbname: "atleti"
		   
	   }	   
	   BluemixService.listObjects(callobj,function(data){
	    globalsService.atleti=data.rows;
	   });
	} 
	*/
	  
 
	  
  
	
	globalsService.getAtletaById=function(id){
		var retvalue={};
		for (var i=0; i<globalsService.atleti.length; i++){
			var row=globalsService.atleti[i];
			var doc=row.doc;
			var aid=doc.id;
			if (aid==id) retvalue=row;
			
		}
		
	 return retvalue;	
	}	
	
	
	 
    

	//globalsService.userrole="";
	


	
	
	globalsService.Loading=function(text) {
	  if (!text) text="";
	  $ionicLoading.show({
    content: text,
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
	template: '<ion-spinner icon="ios"></ion-spinner>',
	
    showDelay: 0
  });
	}

   globalsService.getUserGroups=function(users) {
	   var usergroups=[];
	   
	   colog("USERS:::")
	   colog(users)
	   
	   for (var i=0; i<users.length; i++){
		   var user=users[i];
		   var group=user.doc.group.toLowerCase();
		   var found=false;
		   for (var x=0; x<usergroups.length; x++) {
			   if (usergroups[x].name.toLowerCase()==group) found=true;
			   
		   }
		   if (!found) {
			   var ugroup={
				   name: group,
				   isChecked: false
			   }
			   usergroups.push(ugroup)
		   }
		   
		   
	   }
	   usergroups.sort(function(a,b){
		   var a1=a.name;
		   var b1=b.name;
		   if (a1>b1) return 1;
		   if (a1<b1) return -1;
		   return 0;
	   });
	   
	   return usergroups;
   }

    return globalsService;
})

.controller('AppCtrl', function(globals,$scope, $ionicActionSheet,$cordovaInAppBrowser, $state,$rootScope,$ionicLoading,BluemixService) {
	
/*	
   var callobj={
		   dbname: "atleti"
	 
	   }	   
	BluemixService.listObjects(callobj,function(data){
		colog("got atleti in appctrl")
	    globals.atleti=data.rows;
	});  	
	*/
	
  //globals.getAtleti();	
	
	
  $scope.hideBackButton = true;
  $scope.rooturl=globals.rooturl; 
  
  
  $rootScope.Loading=function(text) {
	  if (!text) text="";
	  $ionicLoading.show({
    content: text,
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
	template: '<ion-spinner icon="ios"></ion-spinner>',
	
    showDelay: 0
  });
	  
	  
  } 
  
   var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no'
    };

  /*document.addEventListener(function () {
    $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });


    $cordovaInAppBrowser.close();

  });
  */
  
  $scope.closeApp = function(){
	  
	  if (confirm("Sicuro di voler chiudere AppKwonDo Rozzano ?")){
		navigator.app.exitApp();  
		  
	  }
	  
  }
  
  $scope.logOut = function(){
	  
	  if (confirm("Are you sure to log out from Client365 ?")){
		$state.go('app.login', {});
		  
	  }
	  
  }


  
  $scope.openUrl = function(url) {
	 
	  //var options="location=no,toolbar=no";
	  
	  //alert(url)
	  var inappb=true;
      if (url.toLowerCase().indexOf("tel:")>-1) inappb=false;
		 if (url.toLowerCase().indexOf("mailto:")>-1) inappb=false;
		 //aler t(closeit);
	  
	  if (!inappb){
		  
		location.href=url;  
	  } else
      {
	  
	   $cordovaInAppBrowser
     .open(url, '_blank',options)
     .then(function(event) {
		 
       // success
     }, function(event) {
       // error
    });
	
	  }
	/*)var closeit=false;
		 if (url.toLowerCase().indexOf("tel:")>-1) closeit=true;
		 if (url.toLowerCase().indexOf("mailto:")>-1) closeit=true;*/
		 //alert(closeit);
		 //if (closeit) $cordovaInAppBrowser.close();
  //$cordovaInAppBrowser.open(url , '_blank', 'location=yes'); 
};

  
  $scope.showActionsheet = function() {
    
    $ionicActionSheet.show({
      titleText: 'ActionSheet Example',
      buttons: [
        { text: '<i class="icon ion-share"></i> Share' },
        { text: '<i class="icon ion-arrow-move"></i> Move' },
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };
    
	
	
  

})



.controller('PlannerCtrl', function ($scope, $http, $ionicLoading,$location,$ionicModal,globals,$cordovaGeolocation, EventService,BluemixService) {

  $scope.planner_visible=true;
  $scope.calendar_visible=false;


  $scope.events=[];
   $scope.shares=[];
   $scope.rooturl=globals.rooturl;
  //$scope.shownGroup2="users";

   var c=JSON.parse(getCookie("user"));
   var role=c.role.toUpperCase();
   var customers=c.customers;
   $scope.isIBM_SALESREP=false;
   if (role.toLowerCase()=="ibm_salesrep") $scope.isIBM_SALESREP=true;
   colog("is IBM_SALESREP: "+$scope.isIBM_SALESREP)
   var userid=c.id;
   colog("get planner for user role: "+role);  

     $ionicModal.fromTemplateUrl('sharewith.html', {
	   scope: $scope,
       animation: 'slide-in-up',
       focusFirstInput: true
  }).then(function(modal) {
	   $scope.modal = modal;
	   
  })  
  
  
  
     
  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    //$scope.modal.remove();
  });

   
  $scope.getUserById=function(id){
	  var retvalue={};
	  for (var i=0; i<$scope.users.length; i++){
		  var doc=$scope.users[i].doc;
		  var docid=doc._id;
		  if (docid.trim()==id.trim()) retvalue=doc;
		  
	  }
	  colog("getUserById("+id+") result: ");
	  colog(retvalue)
	  return retvalue;
	  
  }
  
     $scope.getUsers = function() {
	/*  $scope.loading =$ionicLoading.show({
    content: '<ion-spinner class="ion-spin-animation" icon="dots"></ion-spinner>Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });*/
	
	var callobj={
	     
		 dbname: "users",
		 filters: [],
		 sortby: "lastname"
	 }
	 
	
		 

	  
	  BluemixService.listObjects(callobj,function(data){
	
	
  //$http.get($scope.rooturl+"/events/listobjects/users", { params: { "key1": "value1", "key2": "value2" } })
    //        .success(function(data) {
				if (!data.rows) data.rows=[];
				$scope.users=data.rows;
				usersArray=[];
				for (var i=0; i<$scope.users.length; i++){
					if ($scope.users[i].doc.lastname) usersArray.push($scope.users[i]);
					
				}
				
				usersArray.sort(function(a,b){
					var a1=a.doc.lastname;
					var b1=b.doc.lastname;
					if (a1>b1) return 1;
					if (a1<b1) return -1;
					return 0;
				})
				
				//alert(usersArray.length);
                //$scope.firstname = data.firstname;
                //$scope.lastname = data.lastname;
				//$ionicLoading.hide();
            })
			/*
            .error(function(data) {
                colog("error getting Users list");
				//$ionicLoading.hide();
            });*/
    }
  
  
  
   
  $scope.selectShareUsers = function(index) {
	
	   
	   
	   var obj=$scope.events[index];
	  
	   $scope.users=getUsersFromCompanies(customers,usersArray);
	   
	   colog("USERSFROMCOMPANY:")
	   colog($scope.users);
	   
	   //$scope.shareobject=JSON.parse(obj);
	   $scope.shareobject=obj;
	   //get sharewith string
	    $scope.usergroups=globals.getUserGroups($scope.users);
	   
	   colog("USERGROUPS: ")
	   colog($scope.usergroups)
	   
	   var shw="";
	   $scope.sharewith="";
	   colog("$scope.shares: ")
	   colog($scope.shares)
	   for (var i=0;i<$scope.shares.length; i++){
		    var doc=$scope.shares[i].doc;
			var shobj=doc.shareobject;
			var shwith=doc.sharewith;
			//alert(shwith)
			var shobjid=shobj.id;
			var objid=$scope.shareobject.id;
			
			
			if (shobjid==objid) {
				colog("trovato sharewith")
				colog("ID: "+shobjid+" - "+objid + " - " + shwith )
				if (shwith) {
					$scope.sharewith=shwith;
				}
				
				
			}
			
		   
	   }
	   
	  
	   //var shwith=$scope.shareobject.doc.sharewith;
	   //$scope.sharewith=shwith;
	   colog("this doc is already shared with: "+$scope.sharewith);
	   
	   var arr=$scope.sharewith.split(",");
	   
	   for (var i=0; i<arr.length; i++){
		   var user=$scope.getUserById(arr[i]);
		   
		   var uname=user.firstname+" "+user.lastname;
		   colog("username: "+uname);
		   
	   }
	   
	   colog("$scope.users:")
	   colog($scope.users)
	   for (var i=0; i<$scope.users.length; i++){
		    var user=$scope.users[i];
			colog("$scope.sharewith: "+$scope.sharewith+" - userid: "+user.id)
			if ($scope.sharewith.indexOf(user.id)>-1){
				$scope.users[i].isChecked=true;
				} else $scope.users[i].isChecked=false;
		   
	   }
	   
	   
	   
	   $scope.openModal();
	
	 
  }	
  
  $scope.setSharewith=function() {
	  
	  var cklist="";
	  var count=0;
	  for (var i=0; i<$scope.users.length; i++){
		  var user=$scope.users[i];
		  if (user.isChecked) {
			  count++;
			  colog("questo è "+user.isChecked) 
			  if (cklist.trim()!="") cklist+=",";
			  cklist+=user.id;
			  
		  } else ("questo no")
		  
	  }
	  //alert(cklist);
	  colog("selected elibrary object: "+$scope.shareobject.id);
	  colog("selected users: "+cklist);
	  
	  var shobj={
		  db: "eventcalendar",
		  ids: $scope.shareobject.id,
		  shareobject: JSON.stringify($scope.shareobject),
		  users: cklist
		  
	  }
	  
	  colog(shobj)
	  
	  $http.post($scope.rooturl+"/events/addshare", shobj)
            .success(function(data) {
				
				colog(data);
				$scope.getPlanner();
				$scope.closeModal();
				$ionicLoading.show({ template: "Event now shared with "+count+ " users", noBackdrop: true, duration: 2000 });
	  
			})
			.error(function(data){
				
				colog(data);
				$scope.closeModal();
	  
			})
			
	  
	  
  }  
  
        
  $scope.getPlanner_old = function() {
	  
	 $scope.getUsers();  
	 
	 
	 	$scope.groups = [
	{
		name: "USERS",
		items: []
	},
	{
		name: "USER-GROUPS",
		items: []
	}
	];
	  
	 var c=JSON.parse(getCookie("user"));
     var role=c.role.toUpperCase();
	 var userid=c.id;
     colog("get events for user role: "+role);  	 
	  
	 globals.Loading(); 
	 
	 
		
  var url="/events/listobjects/eventcalendar";
  if (role=="CUSTOMER") url="/events/listobjects/byfield/shares/what/event" 
  
 
  
	
  $http.get($scope.rooturl+url, { params: { "key1": "value1", "key2": "value2" } })
            .success(function(data) {
			
              colog("read "+data.rows.length+" total rows")			
				
			  if (role=="IBM_SALESREP"){
				  colog("IBM_SALESREP, getting plain Events in db")
				  $scope.events=data.rows;
				  
				  //get feeds
				  //var repemail=c.email;
				  var repemail="dino_ravasi@it.ibm.com"
				  //var repurl_templ='http://gse.dst.ibm.com/sales/gss/download/repenabler/FeedProvider?repid={repemail}&pagetype=rep&country=IT&language=it&item=events&type=rss&callback=?';
				  var repurl_templ="http://www.ibm.com/events/it/it/index.rss?ca=rss_eventi&me=W&met=eventirh";
				  var furl=repurl_templ.replace("{repemail}",repemail);
				  var crossurl=$scope.rooturl+"/events/crossd"
				   $http.post(crossurl, {
						host: "http://gse.dst.ibm.com",
						path: "sales/gss/download/repenabler/FeedProvider?repid=anna.scarsi@it.ibm.com&pagetype=rep&country=IT&language=it&item=Messages&type=rss&callback=?",
						url: repurl_templ,
						format: "xml"
				
					})
                        .success(function(fdata) {
							var ev=rssToEvents({
								fromdata: fdata,
								evarray: $scope.events,
								evtype: "event"
								
							});
							
							colog("EV LENGTH: "+ev.length)
							for (var j=0; j<ev.length; j++){
								$scope.events.push(ev[j]);
								
							}
							
									   
			  colog("TOTAL EVENTS: "+$scope.events.length);
			  colog($scope.events)
			  for (var x=0; x<$scope.events.length; x++ ){
				  $scope.events[x].eventdate=moment($scope.events[x].doc.start,"YYYYMMDDHHmm").format("LLLL");
				  colog("DATA:"+$scope.events[x].eventdate)
				  if ($scope.events[x].eventdate.toLowerCase()=="invalid date") $scope.events[x].eventdate=moment($scope.events[x].doc.start).format("LLLL");
				  
				  $scope.events[x].source="";
				  
				  if ($scope.events[x].id.indexOf("rss")>-1) $scope.events[x].source="RSS";
				  
				  //colog($scope.events[x].eventdate);
				  
			  }
			  
			  $ionicLoading.hide();
							
							
			})
						.error(function(fdata) {
							
						});
				  
			  }	else {
				  colog("not IBM_SALESREP, getting shared Events in db")
				  $scope.events=[];
				  
				  $scope.events=getShareObjects(data,userid);
				  colog("EVENTS");
				  colog($scope.events);
			
				  colog("found "+$scope.events.length+" events to populate")
				  
				  
				  
				  
				   
			  colog("STOTAL EVENTS: "+$scope.events.length);
			  for (var x=0; x<$scope.events.length; x++ ){
				  $scope.events[x].eventdate=moment($scope.events[x].doc.start,"YYYYMMDDHHmm").format("LLLL");
				  colog("DATA:"+$scope.events[x].eventdate)
				  if ($scope.events[x].eventdate.toLowerCase()=="invalid date") $scope.events[x].eventdate=moment($scope.events[x].doc.start).format("LLLL");
				  
				  $scope.events[x].source="";
				  
				  if ($scope.events[x].id.indexOf("rss")>-1) $scope.events[x].source="RSS";
				  
				  //colog($scope.events[x].eventdate);
				  
			  }
			  $ionicLoading.hide();
				  
				  
			  }
			  
			 
			  
			   var url="/events/listobjects/shares";
			   $http.get($scope.rooturl+url, { params: { "key1": "value1", "key2": "value2" } })
                   .success(function(sdata) {
					   
					   $scope.shares=sdata.rows;
					   $ionicLoading.hide();
				   });
				  
			  //$scope.data.eventcount=$scope.events.length;	
                //$scope.firstname = data.firstname;
                //$scope.lastname = data.lastname;
				
            })
            .error(function(data) {
                alert("ERROR");
				$ionicLoading.hide();
            });
    }
	
	
 $scope.getPlanner = function() {
	  
	 $scope.getUsers();  
	 
	 
	 	$scope.groups = [
	{
		name: "USERS",
		items: []
	},
	{
		name: "USER-GROUPS",
		items: []
	}
	];
	  
	 var c=JSON.parse(getCookie("user"));
     var role=c.role.toUpperCase();
	 var userid=c.id;
     colog("get events for user role: "+role);  	 
	  
	 globals.Loading(); 
		
  var url="/events/listallevents";
  if (role!="IBM_SALESREP") url="/events/listobjects/byfield/shares/what/event" 

  var repemail="dino_ravasi@it.ibm.com";  
  
  var callobj={
	     url: url,
		 type: "POST",
		 parms: {
			 repemail: repemail,
			 rssibm_url: "http://www.ibm.com/events/it/it/index.rss?ca=rss_eventi&me=W&met=eventirh",
			 rsspp_url: "http://gse.dst.ibm.com/sales/gss/download/repenabler/FeedProvider?repid="+repemail+"&pagetype=rep&country=IT&language=it&item=events&type=rss&callback=?",
			 format: "json"
		  },
		 dbname: "elibrary",
		 filters: [],
		 sortby: ""
	 }
	 
	
		 
	 
	  //if (filters) callobj.filters=filters;
	  
	  //BluemixService.listObjects(callobj,function(data){
  
	
 $http.post($scope.rooturl+url, {
     repemail: repemail,
	 rssibm_url: "http://www.ibm.com/events/it/it/index.rss?ca=rss_eventi&me=W&met=eventirh",
	 rsspp_url: "http://gse.dst.ibm.com/sales/gss/download/repenabler/FeedProvider?repid="+repemail+"&pagetype=rep&country=IT&language=it&item=events&type=rss&callback=?",
	 format: "json"
  })
            .success(function(data) {
			 
              if (!data.rows) data.rows=[]; 		
			  
				
			  if (role=="IBM_SALESREP"){
				  colog("read "+data.rows.length+" legacy client365 events rows")	
				  $scope.events=data.rows;
				  
				  var ev_rssibm=rssToEvents({
								fromdata: data.events_rssibm,
								evarray: $scope.events,
								evtype: "event"
    				});
				  colog("read "+ev_rssibm.length+" rssibm events")
				  for (var j=0; j<ev_rssibm.length; j++){
								$scope.events.push(ev_rssibm[j]);
								
							}
							
				 var ev_rsspp=rssToEvents({
								fromdata: data.events_rsspp,
								evarray: $scope.events,
								evtype: "event"
    			 });
				  colog("read "+ev_rsspp.length+" rsspp events")
				  for (var j=0; j<ev_rsspp.length; j++){
								$scope.events.push(ev_rsspp[j]);
								
				 }
				  

				 
							
				
				  
			  }	else {
				  colog("not IBM_SALESREP, getting shared Events in db")
				  $scope.events=[];
				  
				  $scope.events=getShareObjects(data,userid);
				  colog("EVENTS");
				  colog($scope.events);
			
				  colog("found "+$scope.events.length+" events to populate")
				  
				  
				  
				  
				   
			  
			  $ionicLoading.hide();
				  
				  
			  }
			  
			  colog("TOTAL EVENTS: "+$scope.events.length);
			  for (var x=0; x<$scope.events.length; x++ ){
				  $scope.events[x].eventdate=moment($scope.events[x].doc.start,"YYYYMMDDHHmm").format("LLLL");
				  colog("DATA:"+$scope.events[x].eventdate)
				  if ($scope.events[x].eventdate.toLowerCase()=="invalid date") $scope.events[x].eventdate=moment($scope.events[x].doc.start).format("LLLL");
				  
				  $scope.events[x].source="";
				  
				  if ($scope.events[x].id.indexOf("rss")>-1) $scope.events[x].source="RSS";
				  
				  //colog($scope.events[x].eventdate);
				  
			  } 
			  $ionicLoading.hide();
			  
			   var callobj={
					  dbname: "shares",
					  filters: [],
					  sortby: ""
				  }
	  //if (filters) callobj.filters=filters;
	  
	  BluemixService.listObjects(callobj,function(sdata){	
			  
			  
			   var url="/events/listobjects/shares";
			//   $http.get($scope.rooturl+url, { params: { "key1": "value1", "key2": "value2" } })
              //     .success(function(sdata) {
					   
					   $scope.shares=sdata.rows;
					   $ionicLoading.hide();
				   });
				  
			  //$scope.data.eventcount=$scope.events.length;	
                //$scope.firstname = data.firstname;
                //$scope.lastname = data.lastname;
				
            })
			
            .error(function(data) {
                alert("ERROR");
				$ionicLoading.hide();
            });
    }
	
	$scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.toggleGroup2 = function(gname) {
	 gname=gname.toLowerCase();
     colog("toggleGroup2 "+gname)	 
    if ($scope.isGroupShown2(gname)) {
      $scope.shownGroup2 = null;
    } else {
      $scope.shownGroup2 = gname;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  $scope.isGroupShown2 = function(gname) {
	gname=gname.toLowerCase()  
	
	var retvalue=  $scope.shownGroup2 === gname;
	//colog("isGroupShown2 "+gname+": "+retvalue)
    return retvalue;
  };
  
  
  $scope.toggleUserGroup = function(n) {
	  var ugroup=$scope.usergroups[n];
	 //alert(ugroup.name);
	 var name=ugroup.name.toLowerCase();
     colog("toggleUserGroup "+name)	 
	 //alert(ugroup.isChecked);
	 $scope.usergroups[n].isChecked=ugroup.isChecked;
	 //ugroup.isChecked=!ugroup.isChecked;
	 
	 //update users of group checked
	 var val=ugroup.isChecked;
         var count=0;
		 for (var i=0; i<$scope.users.length; i++){
			 var u=$scope.users[i];
			 var g=u.doc.group.toLowerCase();
			 colog(g);
			 if (g==name) {
				 u.isChecked=val;
				 count++;
			}	 
			 
			 
		 }
		 var text="unchecked";
		 if (val) text="checked";
		 text=count+" users in group "+name.toUpperCase()+" "+text;
		 $ionicLoading.show({ template: text, noBackdrop: true, duration: 2000 });
		 //alert(count+" users in group "+name.toUpperCase()+" "+text)
		 
		 

	 
    
  };
  
  
  
  $scope.showPlanner=function(){
	  $scope.planner_visible=true;
	  $scope.calendar_visible=false;
	  
  }
  
  $scope.showCalendar=function(){
	  $scope.planner_visible=false;
	  $scope.calendar_visible=true;
	  
  }
  
  
  
  
  
  
  
  
  
  
  
  //calendar part of the controller
    $scope.searchKey = "";
  
  var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
  
  $scope.eventSources = [
    [
        {
            "title": 'All Day Event',
            "start": new Date(y, m, d, 15, 0),
         },
         {
            "title": 'Long Event',
            "start": new Date(y, m, d - 5),
            "end": new Date(y, m, d - 2)
        }
    ]
];
  
  /*
  $scope.eventSources=[
  {
    "@context": "http://schema.org",
    "@type": "Event",
    "id": 1,
    "name": "event01",
    "startDate": "2015-06-07",
    "endDate": "2015-06-28",
    "location": {
      "@type": "Place",
      "name": "luogo",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "via del mango",
        "addressRegion": "lombardia",
        "postalCode": "286-0004"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "35.760999",
        "longitude": "140.279543"
      }
    },
    "image": "http://i.ytimg.com/vi/6SiCIyJc47Y/hqdefault.jpg",
    "description": "evento assolutamente inutile"
  }];*/
  
  
  $scope.clearSearch = function() {
    $scope.searchKey = null;
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // 検索期間の指定
  var currentDate = new Date();
  $scope.searchStartDate = new Date(currentDate.getFullYear(),currentDate.getMonth()-1,currentDate.getDate());
  $scope.searchEndDate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,currentDate.getDate());
  $scope.startDateSelected = function (startDate) {
    if(startDate > $scope.searchEndDate) {
      var msg = {title: '検索期間不正', template: '検索期間の開始日が終了日より後になってはいけません。'};
      $ionicPopup.alert(msg);
      throw msg;
    }
    EventService.find($scope.searchKey,startDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
    return startDate;
  };
  $scope.endDateSelected = function (endDate) {
    if(endDate < $scope.searchStartDate) {
      var msg = {title: '検索期間不正', template: '検索期間の終了日が開始日より前になってはいけません。'};
      $ionicPopup.alert(msg);
      endDate = $scope.searchEndDate;
      throw msg;
    }
    EventService.find($scope.searchKey,$scope.searchStartDate,endDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // 検索距離の指定
  $scope.distance = 100000;
  $scope.changeDistance = function() {
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // 現在地の緯度経度の設定
  $scope.latitude = 0;
  $scope.longitude = 0;
  $cordovaGeolocation.getCurrentPosition().then(function(position){
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;
  }, function (err) {
    // TODO エラー処理
  });

  // 検索
  $scope.search = function() {
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };
  
  // 初期表示のための検索
  var firstSearch = function() {
	  alert("firstsearch");
	  
    EventService.findAll().then(function(events) {
      $scope.events = events;
	  alert($scope.events.length)
    });
  }
  
  //firstSearch();

  // ui-Calendar用
  //$scope.eventSources = [];

  
  $scope.uiConfig = {
    calendar:{
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      height: 500,
      lang: 'ja',
      scrollTime: '10:00:00',
      buttonIcons: false, 
      weekNumbers: false,
      editable: false,
      eventLimit: true,
	  events: $scope.eventSources
      //events: EventService.getCalendarInfo()
    }
  };

  // Google Map初期呼出
  $scope.map = {
      center: {
	  latitude: 35.613281,
	  longitude: 140.112869
      },
      zoom: 10,
      markers: EventService.getMarkerInfo()
  };
})

.controller('ElibraryCtrl', function ($scope, $http, $ionicLoading,$state,$location,$ionicModal,globals,$sce,BluemixService) {
   
   
   $scope.elibrary=[];
   $scope.shares=[];
   $scope.modals=[{name: "sharewith"},{name: "videoview"}];
   
   //$scope.shownGroup2="users";
  

   var c=JSON.parse(getCookie("user"));
   var role=c.role.toUpperCase();
   var customers=c.customers;
   $scope.isIBM_SALESREP=false;
   if (role.toLowerCase()=="ibm_salesrep") $scope.isIBM_SALESREP=true;
   colog("is IBM_SALESREP: "+$scope.isIBM_SALESREP)
   var userid=c.id;
   colog("get elibrary for user role: "+role);  
   
   
    $ionicModal.fromTemplateUrl('sharewith.html', {
	   scope: $scope,
       animation: 'slide-in-up',
       focusFirstInput: true
  }).then(function(modal) {
	   $scope.modals[0] = modal;
	   
  })  
	   
	   
  $scope.openModal = function(idx) {
	$scope.modals[idx].show()
    
  }

  $scope.closeModal = function(idx) {
    $scope.modals[idx].hide();
  };

  $scope.$on('$destroy', function(idx) {
	 // alert(idx);
	 // alert($scope.modals.length)
    //$scope.modals[idx].remove();
  });	   
  
   
  $scope.selectShareUsers = function(obj) {
	   colog("obj:")
	   colog(JSON.parse(obj))
	  
	   //$scope.users=usersArray;
	    $scope.users=getUsersFromCompanies(customers,usersArray);
	   $scope.shareobject=JSON.parse(obj);
	   $scope.usergroups=globals.getUserGroups($scope.users);
	   
	   colog("USERGROUPS: ")
	   colog($scope.usergroups)
	   
	   
	   
	   //get sharewith string
	   
	   var shw="";
	   $scope.sharewith="";
	   colog("$scope.shares: ")
	   colog($scope.shares)
	   for (var i=0;i<$scope.shares.length; i++){
		    var doc=$scope.shares[i].doc;
			var shobj=doc.shareobject;
			var shwith=doc.sharewith;
			//alert(shwith)
			var shobjid=shobj.id;
			var objid=$scope.shareobject.id;
			
			
			if (shobjid==objid) {
				colog("trovato sharewith")
				colog("ID: "+shobjid+" - "+objid + " - " + shwith )
				if (shwith) {
					$scope.sharewith=shwith;
				}
				
				
			}
			
		   
	   }
	   
	  
	   //var shwith=$scope.shareobject.doc.sharewith;
	   //$scope.sharewith=shwith;
	   colog("this doc is already shared with: "+$scope.sharewith);
	   
	   var arr=$scope.sharewith.split(",");
	   
	   for (var i=0; i<arr.length; i++){
		   var user=$scope.getUserById(arr[i]);
		   
		   var uname=user.firstname+" "+user.lastname;
		   colog("username: "+uname);
		   
	   }
	   
	   colog("$scope.users:")
	   colog($scope.users)
	   for (var i=0; i<$scope.users.length; i++){
		    var user=$scope.users[i];
			colog("$scope.sharewith: "+$scope.sharewith+" - userid: "+user.id)
			if ($scope.sharewith.indexOf(user.id)>-1){
				$scope.users[i].isChecked=true;
				} else $scope.users[i].isChecked=false;
		   
	   }
	   
	   
	   
	   $scope.openModal(0);
	
	 
  }	
  
  $scope.getUserById=function(id){
	  var retvalue={};
	  for (var i=0; i<$scope.users.length; i++){
		  var doc=$scope.users[i].doc;
		  var docid=doc._id;
		  if (docid.trim()==id.trim()) retvalue=doc;
		  
	  }
	  colog("getUserById("+id+") result: ");
	  colog(retvalue)
	  return retvalue;
	  
  }

  $scope.setSharewith=function() {
	  
	  var cklist="";
	  var count=0;
	  for (var i=0; i<$scope.users.length; i++){
		  var user=$scope.users[i];
		  if (user.isChecked) {
			  
			  colog("questo è "+user.isChecked) 
			  if (cklist.trim()!="") cklist+=",";
			  cklist+=user.id;
			  count++;
			  
		  } else ("questo no")
		  
	  }
	  //alert(cklist);
	  colog("selected elibrary object: "+$scope.shareobject.id);
	  colog("selected users: "+cklist);
	  
	  var shobj={
		  db: "elibrary",
		  ids: $scope.shareobject.id,
		  shareobject: JSON.stringify($scope.shareobject),
		  users: cklist
		  
	  }
	  
	  colog(shobj)
	  
	  $http.post($scope.rooturl+"/events/addshare", shobj)
            .success(function(data) {
				
				colog(data);
				$scope.getElibrary();
				$scope.closeModal(0);
				$ionicLoading.show({ template: "Dcoument now shared with "+count+ " users", noBackdrop: true, duration: 2000 });
	  
			})
			.error(function(data){
				
				colog(data);
				$scope.closeModal(0);
	  
			})
			
	  
	  
  }  
  
   $scope.getUsers = function() {
	/*  $scope.loading =$ionicLoading.show({
    content: '<ion-spinner class="ion-spin-animation" icon="dots"></ion-spinner>Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });*/
	
 var callobj={
		 dbname: "users",
		 filters: [],
		 sortby: "lastname"
	 }	

   BluemixService.listObjects(callobj,function(data){	 
	
  //$http.get($scope.rooturl+"/events/listobjects/users", { params: { "key1": "value1", "key2": "value2" } })
       //     .success(function(data) {
				$scope.users=data.rows;
				usersArray=[];
				for (var i=0; i<$scope.users.length; i++){
					if ($scope.users[i].doc.lastname) usersArray.push($scope.users[i]);
					
				}
				usersArray.sort(function(a,b){
					var a1=a.doc.lastname;
					var b1=b.doc.lastname;
					if (a1>b1) return 1;
					if (a1<b1) return -1;
					return 0;
				})
				
				//alert(usersArray.length);
                //$scope.firstname = data.firstname;
                //$scope.lastname = data.lastname;
				//$ionicLoading.hide();
            })
			/*
            .error(function(data) {
                colog("error getting Users list");
				//$ionicLoading.hide();
            });*/
    }
  
		
		
		//gets e-library and shares
  $scope.getElibrary = function() {
	  
	 $scope.getUsers();  
	 
	  globals.Loading(); 
	/*$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });*/
  
   var url="/events/listobjects/elibrary";
   
   var callobj={
		 dbname: "elibrary",
		 filters: [],
		 sortby: ""
	 }
	 
	 if (role!="IBM_SALESREP") {
		url="/events/listobjects/byfield/shares/what/elibrary"; 
		callobj={
		 dbname: "shares",
		 byfield: "what",
		 byfieldvalue: "elibrary",
		 filters: [],
		 sortby: ""
		}
	 } 
		 
	 
	  //if (filters) callobj.filters=filters;
	  
	  BluemixService.listObjects(callobj,function(data){	 
   
   
   

	
	
  // $http.get($scope.rooturl+url, { params: { "key1": "value1", "key2": "value2" } })
   //  .success(function(data) {
				
				
				colog("read "+data.rows.length+" total rows")			
				
			  if (role=="IBM_SALESREP"){
				  $scope.elibrary=[];
				  
				  $scope.elibrary=data.rows;
			  }	else {
				  
				  $scope.elibrary=[];
				  
				  
				  $scope.elibrary=getShareObjects(data,userid);
				  
			
			  } 
			  
			  
			  
			   colog("elibrary resulting: ");
			   colog($scope.elibrary);
			   
			   
			   //getShares
			   
			   
			    var callobj={
					  dbname: "shares",
					  filters: [],
					  sortby: ""
				  }
	  //if (filters) callobj.filters=filters;
	  
	  BluemixService.listObjects(callobj,function(sdata){	
			   
			   
			   var url="/events/listobjects/shares";
			  // $http.get($scope.rooturl+url, { params: { "key1": "value1", "key2": "value2" } })
                //   .success(function(sdata) {
					   
					   $scope.shares=sdata.rows;
			   
							   for (var i=0; i<$scope.elibrary.length;i++){
									var doc=$scope.elibrary[i].doc;
									
									var imgurl="pdf.png"
									var tipo="pdf";
									if (doc.tipo) tipo=doc.tipo;
									
									if ($scope.elibrary[i].tipo) tipo=$scope.elibrary[i].tipo;
									
									colog("doc.url: "+doc.url);
									
									
									
									if (doc.url)
									{	
									if (doc.url.toLowerCase().indexOf("youtube")>-1)  {
										colog("there is youtube url")
										imgurl="video.png";
										tipo="video"
										}
									}
									colog("TIPO: "+tipo)
									colog("IMGURL: "+imgurl)
									$scope.elibrary[i].imgurl="img/"+imgurl;
									$scope.elibrary[i].doc.imgurl="img/"+imgurl;
									$scope.elibrary[i].ngshow=true;  
									$scope.elibrary[i].tipo=tipo;
									$scope.elibrary[i].doc.tipo=tipo;
									
								   
							   }
							  
								colog("found "+$scope.elibrary.length+" elibrary docs to populate")
							    $ionicLoading.hide();
				                colog("finito");	
				   });
			
				
				
				//freewallElib();
			
				
            })
    /* .error(function(data) {
                alert("ERROR");
				$ionicLoading.hide();
      });*/
    
  }

  
  
  	$scope.groups = [
	{
		name: "USERS",
		items: []
	},
	{
		name: "USER-GROUPS",
		items: []
	}
	];
  /*for (var i=0; i<5; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<2; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }*/
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.toggleGroup2 = function(gname) {
	 gname=gname.toLowerCase();
     colog("toggleGroup2 "+gname)	 
    if ($scope.isGroupShown2(gname)) {
      $scope.shownGroup2 = null;
    } else {
      $scope.shownGroup2 = gname;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  $scope.isGroupShown2 = function(gname) {
	gname=gname.toLowerCase()  
	
	var retvalue=  $scope.shownGroup2 === gname;
	//colog("isGroupShown2 "+gname+": "+retvalue)
    return retvalue;
  };
  
  
  $scope.toggleUserGroup = function(n) {
	  var ugroup=$scope.usergroups[n];
	 //alert(ugroup.name);
	 var name=ugroup.name.toLowerCase();
     colog("toggleUserGroup "+name)	 
	 //alert(ugroup.isChecked);
	 $scope.usergroups[n].isChecked=ugroup.isChecked;
	 //ugroup.isChecked=!ugroup.isChecked;
	 
	 //update users of group checked
	 var val=ugroup.isChecked;
         var count=0;
		 for (var i=0; i<$scope.users.length; i++){
			 var u=$scope.users[i];
			 var g=u.doc.group.toLowerCase();
			 colog(g);
			 if (g==name) {
				 u.isChecked=val;
				 count++;
			}	 
			 
			 
		 }
		 var text="unchecked";
		 if (val) text="checked";
		 text=count+" users in group "+name.toUpperCase()+" "+text;
		 $ionicLoading.show({ template: text, noBackdrop: true, duration: 2000 });
		 //alert(count+" users in group "+name.toUpperCase()+" "+text)
		 
		 

	 
    
  };
  
  
  $scope.viewDoc=function(obj) {
	  colog("OBJ")
	  colog(obj)
	  var tipo=obj.tipo;
	  
	  if (obj.tipo=="video"){
		  //$scope.openUrl(obj.url)
		  //alert(obj.url)
		  var url=obj.url.replace("watch?v=","embed/");
		  //alert(url);
		  $scope.videourl=$sce.trustAsResourceUrl(url);
		  
		  $ionicModal.fromTemplateUrl('viewvideo.html', {
	   scope: $scope,
       animation: 'slide-in-up',
       focusFirstInput: true
  }).then(function(modal) {
	   $scope.modals[1] = modal;
	   //$scope.videourl=url;
	
	   $scope.openModal(1);
  })  
   
  
		  
	  }
	   if (obj.tipo=="pdf"){
		   colog("PDF file, obj.path="+obj.path);
		   var url=obj.path.replace("public/","");
		   colog("PDF url: "+url);
		   var uri=$scope.rooturl+"/"+url;
		   window.open(encodeURI(uri), '_system');
		  //$scope.openUrl($scope.rooturl+"/"+url)
		  
	  }
	  colog("url: "+obj.url+"    - path: "+obj.path)
  }
})

.controller('LoginCtrl', function($scope,$state,$http,$ionicLoading,$ionicHistory,globals) {
    $scope.data = {};
	var em=getCookie("email");
	var pw=getCookie("psw");
	
	if (em && pw)
	{
     $scope.data.username=em;
	 $scope.data.password=pw;
	 $scope.data.isChecked=true; 
     colog("setted user and password for rememberme")
	} else {
	 $scope.data.username="";
	 $scope.data.password="";
	 $scope.data.isChecked=false; 
	}
	
	$scope.signin=function() {
		
		$state.go("app.signin")
		
	}
 
    $scope.login = function() {
		
      globals.Loading();

  
	   var email=$scope.data.username;
	   var psw=$scope.data.password;
	   var rememberme=$scope.data.isChecked;  
	   globals.userrole="";
	   //alert(rememberme)
	   
	   var c=JSON.parse(getCookie("user"));
	   if (c){
	   c.token="";
	   //setCookie("user",JSON.stringify(c));
	   }
		$http.post($scope.rooturl+"/events/login", {  "email": email, "password": psw, login: true } )
            .success(function(data) {
				//alert("success")
				if (data.loggedin=="true"){
				 $scope.elibrary=data.rows;
						//$scope.firstname = data.firstname;
						//$scope.lastname = data.lastname;
						
						 console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
				
				 
				 
				 
				 if (rememberme)
				 {
				 
					 setCookie("email",email,cookieDays);	 
					 setCookie("psw",psw,cookieDays);
					 colog('cookies: '+getCookie("email")+" - "+getCookie("psw"));
					 colog("setted cookies")
				  } else {
						deleteCookie("email");
						deleteCookie("psw");
						console.log("deleted cookies");
				 
				  }
				 console.log(data.email+" "+data.firstname+" "+data.lastname+" "+data.role+" "+data.company)
				 console.log("userid: "+data.id);
				 //deleteCookie("user");
				 globals.userrole=data.role;
				 setCookie("token",data.token)
				 setCookie("user",JSON.stringify(data));
				 colog("saved user in storage, token: "+data.token)
				// alert(data.token)
				 
				 $ionicLoading.hide();
				$scope.hideBackButton = true;
				 $state.reload();
				 $state.go('app.homepage', {});
				
				 $scope.hideBackButton = true;
				 
				 
				} else {
					$ionicLoading.hide();
					alert("Cannot log in")
				}
				
			
		
            })
            .error(function(data) {
                colog("ERROR!!");
				colog(data);
				$ionicLoading.hide();
            });
		
       
    }

	$scope.ibmlogin = function() {
		 $ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	  });
  
	   var email=$scope.data.username;
	   var psw=$scope.data.password;
	   var rememberme=$scope.data.isChecked;
	   globals.userrole="";
	   //alert(rememberme)
	   
	   var url="https://www-304.ibm.com/easytools/runtime/demo/protect/fstore/admin/webservices/authentication.wss"
	   //url="/ibmlogin";
	   
	   //$http.defaults.headers.common["Authorization"] = "Basic " + window.btoa(email+":"+psw);
	
		$http.get(url, {   
		    headers: {
			"Authorization": "Basic " + window.btoa(email+":"+psw)} //, 
			   // "email": email, 
			//	"password": psw 
			})
			.then(function(response) {
				colog("response from wse login: "+response.status)
				colog("checking user authorization");
				 colog("loginw response status: "+response.status)
				 if (response.status==200){
					 
					 
						 $http.post($scope.rooturl+"/events/loginw", {  "email": email, "password": psw } )
						.success(function(data) {
							//alert("success")
							if (data.loggedin=="true"){
							 $scope.elibrary=data.rows;
									//$scope.firstname = data.firstname;
									//$scope.lastname = data.lastname;
									
									 console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
							
							 
							 
							 
							 if (rememberme)
							 {
							 
								 setCookie("email",email,cookieDays);	 
								 setCookie("psw",psw,cookieDays);
								 colog('cookies: '+getCookie("email")+" - "+getCookie("psw"));
								 colog("setted cookies")
							  } else {
									deleteCookie("email");
									deleteCookie("psw");
									console.log("deleted cookies");
							 
							  }
							 console.log(data.email+" "+data.firstname+" "+data.lastname+" "+data.role+" "+data.company)
							 console.log("userid: "+data.id);
							 setCookie("user",JSON.stringify(data));
							 globals.userrole=data.role;
							 $ionicLoading.hide();
							$scope.hideBackButton = true;
							 $state.go('app.homepage', {});
							 $scope.hideBackButton = true;
							 
							 
							} else {
								$ionicLoading.hide();
								alert("Cannot log in")
							}
							
						
					
						})
						.error(function(data) {
							alert("ERROR");
							$ionicLoading.hide();
						});
					 
					 
					 
				 } else 
				 {
				 $ionicLoading.hide();
				}
			},function(error){
				colog("error in wse login: "+error.status)
				colog("not valid wse user")
				$ionicLoading.hide();
				
			});
			
			
			           
		
	//});
	
}
	
})
.controller('SigninCtrl', function($scope,$http,cloudant,globals) {
 //alert("braf")
 $scope.data = {};
 
 $scope.goSignin=function() {
	 

	 
	  var email=$scope.data.email;
	  var firstname=$scope.data.firstname;
	  var lastname=$scope.data.lastname;
	  var seller=$scope.data.seller;
	  var company=$scope.data.customer;
	  
	  var psw="password"
	  
	 /*cloudant.listObjects("users",function(data){
		  
		  alert("bravo martufone")
		  
	  });
	  return;*/
	  //alert(email)
	  // var psw=$scope.data.password;
	  //var rememberme=$scope.data.isChecked;
	   //alert(rememberme)
	   
	   //first check if the provided e-mail has a WebIdentity
	   
	    //var url="https://www-304.ibm.com/easytools/runtime/demo/protect/fstore/admin/webservices/authentication.wss"
		var url="https://g03cxnp01070.gho.boulder.ibm.com/webidentity/directory/cgi-bin/application/wiquery_uid.pl?uid="+email;
	   //url="/ibmlogin";
	   
	   
	    
	   //$http.defaults.headers.common["Authorization"] = "Basic " + window.btoa(email+":"+psw);
	
	
		$http.post($scope.rooturl+"/events/signupuser", { 
  		   "email": email,
		   "firstname": firstname,
		   "lastname": lastname,
		   "company": company,
		   "seller": seller

		
		} )
            .success(function(data) {

				colog(data)
			})
			.error(function(data) {
				
				colog(data)
				
			})
	 
	 
	 
	 
	 
	 
	 
	 
 }
 
})

.controller('MyMessageCtrl', function ($scope, $http, $ionicLoading,globals,BluemixService) {
  
  $scope.data=[];
        
  $scope.getAll = function() {
	  globals.Loading(); 
	 /* $scope.loading =$ionicLoading.show({
    content: '<ion-spinner class="ion-spin-animation" icon="dots"></ion-spinner>Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
	
    showDelay: 0
  });*/
  
  var rss={ rows: []};
	var u=getCookie("user");
	
	var custlist="";
	
	if (u){
		var c=JSON.parse(u);
		var role=c.role.toLowerCase();
		var customers=c.customers;
		
		custlist=customers;
		
		if (role=="customer"){
			custlist=c.company;
			
		}
		
		if (role=="ibm_salesrep"){
			custlist=c.customers;
			
		}
		
		
		
		
	}
	
	
	colog("retrieving NEWS for customer: "+custlist);
	
	var arr=custlist.split(",");
	var rss=[];
	
	arr.forEach(function (element, i) {
	//angular.element(arr).each(function(i){
		var cust=arr[i].toLowerCase();
		
		//retrieve salesrep for cust
		 var callobj={
		  dbname: "customers",
		  byfield: "customername",
		  byfieldvalue: cust,
		  filters: [],
		  sortby: "category"
	    }
	  //if (filters) callobj.filters=filters;
	  
	  BluemixService.listObjects(callobj,function(data){	
		
		
		
		var url=$scope.rooturl+"/events/listobjects/byfield/customers/customername/"+cust;
		
		//$http.get(url, {  "email": "", "password": "" } )
         //   .success(function(data) {
			 if (data.rows[0]){
				colog("retrieved from "+url+": "+JSON.stringify(data));
				var repmail=data.rows[0].doc.isr_email;
				repmail="dino_ravasi@it.ibm.com"
				var uri="http://gse.dst.ibm.com/sales/gss/download/repenabler/FeedProvider?repid="+repmail+"&pagetype=rep&country=IT&language=it&item=Messages&type=rss&callback=?";
				var urlx=$scope.rooturl+"/events/crossd"
				
				$http.post(urlx, {
					host: "http://gse.dst.ibm.com",
					path: "sales/gss/download/repenabler/FeedProvider?repid=anna.scarsi@it.ibm.com&pagetype=rep&country=IT&language=it&item=Messages&type=rss&callback=?",
					url: uri,
					format: "xml"
					
				} )
				.success(function(data) {
					 
					 if (data.rss.channel[0].item)
					 {
					 
					 var arrx=data.rss.channel[0].item;
					 colog(arrx.length);
					 
					 arrx.forEach(function(element,j){
						 rss.push(arrx[j]);
					 })
					 
					 colog(JSON.stringify(rss))
					 
					 $scope.rss=rss;
					 colog($scope.rss.length)
					 } else {
						 colog("no news items found");
					 }
					
					$ionicLoading.hide();
				})
				.error(function(data) {
					alert("ERROR");
					$ionicLoading.hide();
				});
			  }	
			});
	      
	
	});
	
 
		
		
}
})
.controller('UsersCtrl', function ($scope, $http, $ionicLoading,globals,BluemixService) {

        
  $scope.getAll = function() {
	  globals.Loading(); 
	/*  $scope.loading =$ionicLoading.show({
    content: '<ion-spinner class="ion-spin-animation" icon="dots"></ion-spinner>Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
	
    showDelay: 0
  });*/
	
   var callobj={
		  dbname: "users",
		  filters: [],
		  sortby: "lastname"
	  }
	  //if (filters) callobj.filters=filters;
	  
	  BluemixService.listObjects(callobj,function(data){		
	
  //$http.get($scope.rooturl+"/events/listobjects/users", { params: { "key1": "value1", "key2": "value2" } })
    //        .success(function(data) {
				$scope.users=data.rows;
                //$scope.firstname = data.firstname;
                //$scope.lastname = data.lastname;
				$ionicLoading.hide();
            })
			/*
            .error(function(data) {
                alert("ERROR");
				$ionicLoading.hide();
            });*/
    }
})
.controller('SharewithCtrl', function ($scope, $http, $ionicLoading, $state,$ionicModal,globals) {

  console.log('SharewithCtrl');
  


    
  $scope.getUsers = function() {
	 
	   $scope.users=usersArray;
	   
	   $scope.users.sort(function(a,b){
		   
		   var la=getSafe(a.doc.lastname).trim()+" "+getSafe(a.doc.firstname).trim();
		   var lb=getSafe(b.doc.lastname).trim()+" "+getSafe(b.doc.firstname).trim();
		   colog(la + " - "+lb)
		   if (la>lb) return 1;
		   if (la<lb) return -1;
		   return 0;
		   
	   })
	   
	   //$state.go("app.sharewith");
	   //alert($scope.shareobject)
	    /*  
	  $scope.loading =$ionicLoading.show({
    content: '<ion-spinner class="ion-spin-animation" icon="dots"></ion-spinner>Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  
  
	
  $http.get($scope.rooturl+"/events/listobjects/users", { params: { "key1": "value1", "key2": "value2" } })
            .success(function(data) {
				$scope.users=data.rows;
                //$scope.firstname = data.firstname;
                //$scope.lastname = data.lastname;
				$ionicLoading.hide();
				$state.go("app.sharewith");
            })
            .error(function(data) {
                alert("ERROR");
				$ionicLoading.hide();
            });*/
    }
})
.controller('TrybuyCtrl', function ($scope, $http, $ionicLoading,$sce,globals,BluemixService) {

 $scope.trybuy=[];

        
$scope.getAll = function() {
	globals.Loading(); 
	/*  $scope.loading =$ionicLoading.show({
    content: '<ion-spinner class="ion-spin-animation" icon="dots"></ion-spinner>Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });*/
	
   var callobj={
		  dbname: "trybuy",
		  filters: [],
		  sortby: "category"
	  }
	  //if (filters) callobj.filters=filters;
	  
	  BluemixService.listObjects(callobj,function(data){	
	
	
 // $http.get($scope.rooturl+"/events/listobjects/trybuy", { params: { "key1": "value1", "key2": "value2" } })
   //         .success(function(data) {
				
				$scope.trybuy=data.rows;
				for (var i=0; i<$scope.trybuy.length; i++){
					$scope.trybuy[i].category=$scope.trybuy[i].doc.category;
					
				}
                //$scope.firstname = data.firstname;
                //$scope.lastname = data.lastname;
				$ionicLoading.hide();
				
				//return $scope;
				
				var html=renderTryBuy($scope.trybuy);
				
				
				
				
				
	//$scope.htm="<p>ciao minchione</p>";
	//alert(html)
				//$scope.htm=html;
				
				jQuery("#freewallTryBuy").html(html);
				
				
				
				var wall = new Freewall("#freewallTryBuy");
				wall.reset({
					selector: '.brick',
					animate: false,
					cellW: 160,
					cellH: 300,
					/*fixSize: 0, */
					onResize: function() {
						wall.fitWidth();
					}
				});
				wall.filter(".Analytics");
		
				jQuery(".filter-labelTB").click(function() {
					jQuery(".filter-labelTB").removeClass("active");
					var filter = jQuery(this).addClass('active').data('filter');
					if (filter) {
						wall.filter(filter);
					} else {
						wall.unFilter();
					}
					wall.fitWidth();
					jQuery(".brick").css("height","300px").css("border","1px solid gray");
				jQuery(".imagefiltro").css("height","160px");
				jQuery(".bodyfiltro").css("height","30px");
				//jQuery(".sfilter-items").find(".button").css("width","100px");
	;
				});
				wall.fitWidth();
				jQuery("#freewallTryBuy .brick").css("height","300px").css("border","1px solid gray");
				jQuery("#freewallTryBuy .imagefiltro").css("height","160px");
				jQuery("#freewallTryBuy .bodyfiltro").css("height","30px");
				//jQuery(".sfilter-items").find(".button").css("width","100px");
				
				
				//$scope.pagehtm=$sce.trustAsHtml($scope.htm)
				
				//$scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml("<a href='#'>ciao minchione</a>")
            })
			/*
            .error(function(data) {
                alert("ERROR");
				$ionicLoading.hide();
            });
			*/
    }

	
	
 $scope.renderHtml = function(html_code)
{
	
	
	var html=renderTryBuy($scope.trybuy);
	
	 
	//var html="<b>ma vaffanculo</b>"; 
    return $sce.trustAsHtml(html);
};	
})

.controller('SharesCtrl', function ($scope, $http, $ionicLoading,globals,BluemixService) {

        
  $scope.getAll = function() {
	  globals.Loading(); 
	/*  $scope.loading =$ionicLoading.show({
    content: '<ion-spinner class="ion-spin-animation" icon="dots"></ion-spinner>Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,

    showDelay: 0
  });*/
  var callobj={
		  dbname: "shares",
		  filters: [],
		  sortby: ""
	  }
	  //if (filters) callobj.filters=filters;
	  
	  BluemixService.listObjects(callobj,function(data){
 	
	
  //$http.get($scope.rooturl+"/events/listobjects/shares", { params: { "key1": "value1", "key2": "value2" } })
    //        .success(function(data) {
				$scope.shares=data.rows;
                //$scope.firstname = data.firstname;
                //$scope.lastname = data.lastname;
				$ionicLoading.hide();
            })
			/*
            .error(function(data) {
                alert("ERROR");
				$ionicLoading.hide();
            });*/
    }
})

.controller('ReachmeCtrl', function ($scope, $http, $ionicLoading,globals,BluemixService) {

  $scope.reachme=[];      
	  
  $scope.getAll = function() {
	  globals.Loading(); 
	/*  $scope.loading =$ionicLoading.show({
    content: '<ion-spinner class="ion-spin-animation" icon="dots"></ion-spinner>Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });*/
	
    var callobj={
		  dbname: "users",
		  filters: [],
		  sortby: "lastname"
	  }
	  //if (filters) callobj.filters=filters;
	  
	  BluemixService.listObjects(callobj,function(data){

	           colog("reachme data: ")
			   colog(data);
	
  //$http.get($scope.rooturl+"/events/listobjects/users", { params: { "key1": "value1", "key2": "value2" } })
    //        .success(function(data) {
				
				for (var i=0; i<data.rows.length; i++){ 
					if (data.rows[i].doc.company=="IBM") $scope.reachme.push(data.rows[i]);
				}
				
				//$scope.reachme=data.rows;
                //$scope.firstname = data.firstname;
                //$scope.lastname = data.lastname;
				$ionicLoading.hide();
            })/*
            .error(function(data) {
                alert("ERROR");
				$ionicLoading.hide();
            });*/
    }
})

.controller('AtletiCtrl', function($scope,BluemixService,globals) {
 
  $scope.atleti=globals.atleti; 
  
  var callobj={
	  dbname: "atleti"
  }
  
  
  $scope.getAll=function(){
	   BluemixService.listObjects(callobj,function(data){
	  $scope.atleti=data.rows;
	  globals.atleti=data.rows;
	  
	  
  }) 
	  
  }
  
 
	
 
})

.controller('GareCtrl', function($scope,BluemixService) {
  
$scope.gare=[]; 
  
  var callobj={
	  dbname: "gare"
  }
  
  
  $scope.getAll=function(){
	   BluemixService.listObjects(callobj,function(data){
	  $scope.gare=data.rows;
	  
	  
  }) 
	  
  }  
	
	
	
 
})


.controller('MatchesCtrl', function($scope,BluemixService,$stateParams,$http,globals,$sce) {
  
$scope.activetab="byatleta";  
  
$scope.iconsize=55;  
$scope.matches=[]; 
$scope.matchesbyatleta=[]; 
$scope.cronaca=[];
$scope.gara={};
$scope.garaid=$stateParams.garaid;
$scope.garaDetails="";


  
  $scope.getAll=function(){
	    $scope.activetab="byatleta";  
	  $scope.getByProg();
	  $scope.getByAtleta();
	  $scope.getCronaca();
	  $scope.setActiveTab("byatleta")
	  
	
  }
  
  $scope.getGaraDetails=function(){
	
	colog("getgaradetails")
	colog($scope.matches)
	var $b=filterRows($scope.matches,{ dadisputare: "yes"});
	var $c=filterRows($b.rows,{ disputato: "yes"});
	
	var gf=$scope.getMaschiFemmine($b.rows);
	var cf=$scope.getMaschiFemmine($c.rows);
	
	var htm=$b.rows.length+" match da disputare (F: "+gf.femmine+", M: "+gf.maschi+")";
	htm+="<br>"+$c.rows.length+" match disputati (F: "+cf.femmine+", M: "+cf.maschi+")";
	
	var $v=filterRows($c.rows,{ vinto: "yes"});
	 var $p=filterRows($c.rows,{ vinto: "no"});
	 var p=$c.rows.length-$v.rows.length;
	 
	 var vf=$scope.getMaschiFemmine($v.rows);
	 var pf=$scope.getMaschiFemmine($p.rows);
	 
	 htm+="<br>"+$v.rows.length+" vinti (F: "+vf.femmine+", M: "+vf.maschi+")";
	 htm+="<br>"+$p.rows.length+" persi (F: "+pf.femmine+", M: "+pf.maschi+")";
	
	var mtext="";
			   var $oro=filterRows($c.rows,{ medagliamatch: "oro"});
		   var $arg=filterRows($c.rows,{ medagliamatch: "argento"});
		   var $bro=filterRows($c.rows,{ medagliamatch: "bronzo"});
		   
		   var mforo=$scope.getMaschiFemmine($oro.rows);
		   var mfarg=$scope.getMaschiFemmine($arg.rows);
		   var mfbro=$scope.getMaschiFemmine($bro.rows);
		   
		   var ctext="ORI: <b>"+$oro.rows.length+"</b> ( F: "+mforo.femmine+", M: "+mforo.maschi+" )<br>ARGENTI: <b>"+$arg.rows.length+"</b> ( F: "+mfarg.femmine+", M: "+mfarg.maschi+" )<br>BRONZI: <b>"+$bro.rows.length+"</b> ( F: "+mfbro.femmine+", M: "+mfbro.maschi+" ) "+mtext;
	htm+="<br>"+ctext;
	//htm=$sce.trustAsHtml(htm)
	return htm;
 }
  
  
  $scope.setActiveTab=function(val){
	  
	  $scope.activetab=val;
	  jQuery(".tab").hide();
	  jQuery(".tabber").removeClass("active");
	  jQuery("."+val).show();
	  jQuery("."+val+"tab").addClass("active");
  }
 
 
  $scope.getMedagliaAtleta=function(data) {
	  for (var i=0; i<data.length; i++){
			var doc=data[i];
			var matchesarray=doc.matchesarray;
			data[i].imgsrc="img/matchtoplay.png";
			var foundmedal=false;
			for (var j=0; j<matchesarray.length; j++){
				
				var med="none";
				if (matchesarray[j].medagliamatch) med=matchesarray[j].medagliamatch.toLowerCase();
				
				
				colog(med);
				if (med!="none") {
					foundmedal=true;
					data[i].imgsrc="img/medaglia_"+med+".png";
				}
				
			}
			
			
			
		}   
		return data;
	  
  }
  
  
  $scope.getMedagliaMatch=function(data){
	  
	  for (var i=0; i<data.rows.length; i++){
		  
		  var imgsrc="img/matchtoplay.png"
		  var row=data.rows[i];
		  var doc=row.doc;
		  var med="none";
		  if (doc.medagliamatch) med=doc.medagliamatch.toLowerCase();
		  var disputato=doc.disputato;
		  var dadisputare=doc.dadisputare;
		  var vinto=doc.vinto;
		  
		  if (disputato=="yes"){
			  if (vinto=="yes") imgsrc="img/matchok.png";
			  if (vinto=="no") imgsrc="img/matchko.png";
			  
			  
		  }
		  
		  if (dadisputare=="no") imgsrc="img/matchnoplay.png"
		  
		  if (med!="none") {
			  imgsrc="img/medaglia_"+med+".png";
			  
			  
		  }
		  data.rows[i].imgsrc=imgsrc;
		  
	  }
	  
	  
	  
	 return data; 
  }
  
  $scope.getByProg=function(){
	   var callobj={
		   dbname: "gare",
           id: $scope.garaid		   
        }
	    BluemixService.listObject(callobj,function(data){
	  
	  
	     
	     $scope.gara=data.rows[0];
	  
	  
	    var callobj2={
	  
	  url: "/matches/findbygaraid/"+$scope.garaid
  }
	   BluemixService.listObjects(callobj2,function(data){
		   
		   
		   for (var i=0; i<data.rows.length; i++){
			   
			   var dn=data.rows[i].doc.datanascita;
			   data.rows[i].doc.categoriaatleta=$scope.getCategoria(dn).toUpperCase();
			   
			   var vinto=data.rows[i].doc.vinto;
			   var disp=data.rows[i].doc.disputato;
			   var ris=data.rows[i].doc.risultato;
			   
			   data.rows[i].doc.ristext="";
			   if (disp=="yes"){
				   var ristext="";
				   var vintotext="Perso";
				   if (vinto=="yes"){
					   vintotext="Vinto"
					   
				   }
				   if (ris){
					   if (ris.trim()!=""){
						   ristext=", risultato: "+ris;
					   }
				   }
				   
				   data.rows[i].doc.ristext=vintotext+ristext;
			   }
			   
		   }
		   
		   
		   data=$scope.getMedagliaMatch(data);
		   
	  $scope.matches=data.rows;
	  var htm=$scope.getGaraDetails();
	  $scope.garaDetails=$sce.trustAsHtml(htm);
	  
	  
  }) 
		});
	  
  }  
	
	
	
	 $scope.getByAtleta=function(){
	   var callobj={
		   dbname: "gare",
           id: $scope.garaid		   
        }
	    BluemixService.listObject(callobj,function(data){
	  
	     $scope.gara=data.rows[0];
	  
	  
	 var callobj2={
	  
	  url: "/matches/findbygaraid/byatleta/"+$scope.garaid
      }
	  var url=callobj2.url;
     $http.get(globals.rooturl+url,{})
     .success(function(data) {
	   //BluemixService.listObjects(callobj2,function(data){
		 
		 for (var i=0; i<data.length; i++){
			 
			 var row=data[i];
			 var doc=row.doc;
			 var dn=row.datanascita;
			 data[i].categoriaatleta=$scope.getCategoria(dn).toUpperCase();
			 
		 }
		 
		 data=$scope.getMedagliaAtleta(data);
		   
		/*for (var i=0; i<data.length; i++){
			var doc=data[i];
			var matchesarray=doc.matchesarray;
			data[i].imgsrc="img/matchtoplay.png";
			var foundmedal=false;
			for (var j=0; j<matchesarray.length; j++){
				
				var med="none";
				if (matchesarray[j].medagliamatch) med=matchesarray[j].medagliamatch.toLowerCase();
				
				
				colog(med);
				if (med!="none") {
					foundmedal=true;
					data[i].imgsrc="img/medaglia_"+med+".png";
				}
				
			}
			
			
			
		}  */ 
		   
	  $scope.matchesbyatleta=data;
	  
	  
	  }) 
	});
	  
  }  
  
  	 $scope.getCronaca=function(){
	   var callobj={
		   dbname: "gare",
           id: $scope.garaid		   
        }
	    BluemixService.listObject(callobj,function(data){
	  
	     $scope.gara=data.rows[0];
	  
	  
	 var callobj2={
	  
	  url: "/matches/getcronaca/"+$scope.garaid
      }
	  var url=callobj2.url;
     $http.get(globals.rooturl+url,{})
     .success(function(data) {
	   //BluemixService.listObjects(callobj2,function(data){
		   colog("GOTCRONACA")
	  $scope.cronaca=data.rows;
	  
	  
	  }) 
	});
	  
  }  
  
  
  	$scope.getCategoria=function(dn)
	{
     var cat="senior a";		 
	 var curyear=new Date().getFullYear();
	 
	 colog($scope.gara)
	 var arrd=$scope.gara.doc.data.split("/");
     var annogara=arrd[2];	
	 curyear=annogara;
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
		
	$scope.getMaschiFemmine=function($m,su_cosa){
		 colog("getmaschifemmine");
		 colog("gara")
		 colog($scope.gara)
		
		 var iscritti=$scope.gara.doc.iscritti.split(",");
		 var maschi=0;
		 var femmine=0;
		 jQuery($m).each(function(i){
			  //console.log("$M: "+JSON.stringify($m[i]))
			  var $a;
			  if (su_cosa=="iscritti"){
				  $a=globals.getAtletaById($m[i]);
			  } else $a=globals.getAtletaById($m[i].doc.atletaid);
			  
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
	
 
})

.controller('AtletaCtrl', function($scope,BluemixService,$stateParams) {
  
//$scope.atletaid=atletaid;  
  
$scope.atleta=[]; 
  
  
  
  
  $scope.getAtleta=function(){
	  
	  $scope.atletaid=$stateParams.atletaid;
	  
	  var callobj={
	  dbname: "atleti",
	  id: $scope.atletaid
  }
	  
	   BluemixService.listObject(callobj,function(data){
	  $scope.atleta=data.rows[0];
	  
	  
  }) 
	  
  }  
	
	

})

.controller('GaraCtrl', function($scope,BluemixService,$stateParams,globals) {
  
//$scope.atletaid=atletaid;  
  
$scope.gara=[]; 
  
  
  
  
  $scope.getGara=function(){
	  
	  $scope.garaid=$stateParams.garaid;
	  
	  var callobj={
	  dbname: "gare",
	  id: $scope.garaid
  }
	  
	   BluemixService.listObject(callobj,function(data){
	  $scope.gara=data.rows[0];
	  
	  
  }) 
	  
  }  
	
	

})

.controller('IscrittiCtrl', function($scope,BluemixService,$stateParams,globals,$ionicPopup) {
  $scope.iscritti=[];
  $scope.garaid=$stateParams.garaid;
  
  $scope.addIscritto=function(){
	  
	    var alertPopup = $ionicPopup.alert({
     title: 'Don\'t eat that!',
     template: 'It might taste good'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  }
  
  $scope.getAll=function() {
	  
	  var callobj={
		  id: $scope.garaid,
		  dbname: "gare"
		  
	  }
	  
	  BluemixService.listObject(callobj,function(data){
		  
		  var iscritti=data.rows[0].doc.iscritti;
		  //alert(iscritti);
		  var arr=iscritti.split(",");
		  
		  for (var i=0; i<arr.length; i++){
			  
			  var atl=globals.getAtletaById(arr[i]);
			  
			  colog(atl)
			  $scope.iscritti.push(atl)
			  
		  }
		  
	  })
	  
	  
  }
})

.controller('HomepageCtrl', function($scope,$state,$ionicHistory,globals) {
   //alert("eccoci in homepage")
   //startWall();
   
   var c;
   if (screenwidth<1000){
	  var mh="130px"
	  jQuery(".cardhp").css("min-height",mh)
	}
   
  c =JSON.parse(getCookie("user"));
   colog("USERCOOKIE")
   colog(c)
   if (c)
   {
   $scope.user=c.firstname+" "+c.lastname;
   
   $scope.username=$scope.user;
   $scope.useremail=c.email;
   $scope.userrole=c.role;
   }
   
  $scope.$on('$ionicView.enter', function() {
     // Code you want executed every time view is opened
     colog('Opened Homepage');
	 //$scope.init();
  })
  
  $scope.$on("$ionicView.afterLeave", function () {
     $ionicHistory.clearCache();
}); 
   
   $scope.init=function(){

    colog("init")
   if (screenwidth<1000){
	  var mh="130px"
	  jQuery(".cardhp").css("min-height",mh)
	}
   
  c =JSON.parse(getCookie("user"));
   colog("USERCOOKIE")
   colog(c)
   $scope.user=c.firstname+" "+c.lastname;
   
   $scope.username=$scope.user;
   $scope.useremail=c.email;
   $scope.userrole=c.role;
   $scope.showAdmin=$scope.isAdmin();
	   
   }
   
   
   
   $scope.gotoPlanner=function(){
	   $state.go("planner");
	   
   }
   
   $scope.gotoPage=function(page){
	  // $state.go("planner");
	   	$state.go('app.'+page, {});
	   
   }
   

   $scope.isAdmin=function() {
	   colog("called isAdmin");
	   var retvalue=false;
	   var role=globals.userrole.toLowerCase();
	   if (role=="ibm_salesrep") retvalue=true;
	   colog("isAdmin="+retvalue);
	   return retvalue;
   }
   
   })
.controller('ToolsCtrl', function($scope,$state) {
   //alert("eccoci in homepage")
   //startWall();
  
$scope.getTools=function() {  
   $scope.tools=[
   {
	   type: "e-Solution",
	   productname:"PGmP",
	   imgurl: "img/pgmp.png",
	   descr: "Send SO requests to IBM and track their lifecycle"
   },
   {
	   type: "e-Solution",
	   productname:"WAMS",
	   imgurl: "img/wams.png",
	   descr: "Send AMS requests to IBM and track their lifecycle"
   },
   {
	   type: "e-Solution",
	   productname:"eSOW",
	   imgurl: "img/esal.png",
	   descr: "eSal helps you and IBM to share and approve your billing reports"
   },
   {
	   type: "Capabilities",
	   productname:"B2b",
	   imgurl: "img/b2b.png",
	   descr: "Easily connect with IBM"
   }
   ]
   
   }
   
   
})
.controller('AdminCtrl', function($scope,$state,globals,$ionicLoading,$ionicModal,$http,BluemixService,$sce) {
   //alert("eccoci in homepage")
   //startWall();
  $scope.modals=["user","customer"];
  
  $scope.customers=[];
  $scope.users=[];
  $scope.allusers=[];
  $scope.user={};
  $scope.customer={};
  $scope.showActivateButton=false;
  $scope.showDeActivateButton=false;
  $scope.newuser=false;
  $scope.showUsers="All";
  
  $scope.usersFilter = [
        {'id': 0, 'label': 'All'},
        {'id': 1, 'label': 'Active'},
        {'id': 2, 'label': 'Not active'},
    ]
  
  $scope.filterUsers=function(id){
	  //alert(id)
	  var filt=$scope.usersFilter[id].label.toLowerCase();
	  //alert(filt)
	  var f=[{
		  tagname:"",
		  tagvalue: ""
	  }]
	  
	
	  
	  if (filt==""){
		  f[0].tagname="";
		  f[0].tagvalue="";
	   }
	   
	     if (filt=="active"){
		  f[0].tagname="useractive";
		  f[0].tagvalue="true";
	   }
	   
	     if (filt=="not active"){
		  f[0].tagname="useractive";
		  f[0].tagvalue="false";
	   }
	   
	   
	   $scope.getUsers(f);
	  
	  //alert($scope.usersFilter[idx].label.toLowerCase());
	  
	  
	  
	  
  }
  
  $scope.openModal = function(idx) {
	$scope.modals[idx].show()
    
  }

  $scope.closeModal = function(idx) {
    $scope.modals[idx].hide();
  };

  
  
  $scope.getCustomers=function(){
	  globals.Loading();
	  
	  BluemixService.listObjects({dbname: "customers"},function(data){
		  
		  
		  $scope.customers=data.rows;
		  $ionicLoading.hide();
		  
	  })
	  
	  
	  
  }
  
   $scope.getUsers=function(filters,callback){
	  globals.Loading();
	  
	  var callobj={
		  dbname: "users",
		  filters: [],
		  sortby: "lastname"
	  }
	  if (filters) callobj.filters=filters;
	  
	  BluemixService.listObjects(callobj,function(data){
		  
		   
		 
			 
			 for (var i=0; i<data.rows.length; i++){
				 
				 var useractive="true";
				 data.rows[i].rowcolor="white";
				 
				 if (data.rows[i].doc.useractive) useractive=data.rows[i].doc.useractive;
					  
					  
					 
					  				 
				 if (useractive=="false") data.rows[i].rowcolor="silver";
				 if (useractive=="true") data.rows[i].rowcolor="white";
				 
				  colog("USERACTIVE: "+useractive+" - "+data.rows[i].rowcolor)
				 
			 }
			  
			  $scope.users=data.rows;  
			 
		 
		  
		  
		 
		  $ionicLoading.hide();
		  
		  if (callback) callback();
		  
	  })
	  
	  
	  
  }
  
  $scope.editUser=function(idx){
	  
	  $scope.user=$scope.users[idx];
	  $scope.newuser=false;
	  $scope.verifyhtm="";
	  $ionicModal.fromTemplateUrl('edituser.html', {
	   scope: $scope,
       animation: 'slide-in-up',
       focusFirstInput: true
      }).then(function(modal) {
	   $scope.modals[0] = modal;
	   //$scope.videourl=url;
	   $scope.data=$scope.user.doc;
	   $scope.openModal(0);
	   $scope.verifyUserIbmId();
  })  
	  
	  
	  
  }
  
  
  $scope.deleteUser=function(idx){
	  $scope.user=$scope.users[idx];
	  var user=$scope.user.doc;
	  var id=user._id;
	  var rev=user._rev;
	  var uname=user.firstname+" "+user.lastname;
      var url="/events/deleteobject/byid/users/"+id;
	  if ($scope.newuser) url="/events/addobject/users/"
	  globals.Loading();
	  $http.post($scope.rooturl+url, user)
     .success(function(data) {
		 colog("User deleted")
		$ionicLoading.hide();
		$ionicLoading.show({ template: "User "+uname+" deleted", noBackdrop: true, duration: 2000 });
	 })
	 .error(function(data){
		 colog("ERROR ! "+error.message)
		 $ionicLoading.hide();
		 
	 })
	  
  }   
  
  $scope.addUser=function(){
	   $scope.newuser=true;
	   $ionicModal.fromTemplateUrl('edituser.html', {
	   scope: $scope,
       animation: 'slide-in-up',
       focusFirstInput: true
      }).then(function(modal) {
	   $scope.modals[0] = modal;
	   //$scope.videourl=url;
	   var newuser={
		   firstname: "",
		   lastname: "",
		   email: "",
		   company: "",
		   customers: "",
		   role: "",
		   useractive: false,
		 
 
	   }
	   
	   $scope.user={ doc: newuser}
	    $scope.data=$scope.user.doc;
	 
	   $scope.openModal(0);
	   //$scope.verifyUserIbmId();
	  });
  }
  
  $scope.editCustomer=function(idx){
	  
	  $scope.customer=$scope.customers[idx];
	  $ionicModal.fromTemplateUrl('editcustomer.html', {
	   scope: $scope,
       animation: 'slide-in-up',
       focusFirstInput: true
      }).then(function(modal) {
	   $scope.modals[1] = modal;
	   //$scope.videourl=url;
	   $scope.data=$scope.customer.doc;
	   $scope.openModal(1);
  })  
	  
	  
	  
  }

   
  $scope.saveUser=function(){
	  var user=$scope.user.doc;
	  var id=user._id;
	  var rev=user._rev;
	  
	  //alert(id+" - "+rev);
	  colog("saving following user")
	  colog(user)
	  
	  var url="/events/updateobject/byid/users/"+id;
	  if ($scope.newuser) url="/events/addobject/users/"
	  globals.Loading();
	  $http.post($scope.rooturl+url, user)
     .success(function(data) {
	    colog("User saved")
		$ionicLoading.hide();
		$scope.closeModal(0);
		var uname=user.firstname+" "+user.lastname;
		
		$scope.getUsers(null,function() {
			$ionicLoading.show({ template: "User "+uname+" saved", noBackdrop: true, duration: 2000 });
			
		});
		
	 })
	 .error(function(error){
		 colog("ERROR ! "+error.message)
		 $ionicLoading.hide();
	 })
	 
	  
	  
	  
  } 
  
  $scope.saveUserObject=function(u){
	  var user=u.doc;
	  var id=user._id;
	  var rev=user._rev;
	  
	  //alert(id+" - "+rev);
	  colog("saving following user")
	  colog(user)
	  
	  var url="/events/updateobject/byid/users/"+id;
	  globals.Loading();
	  $http.post($scope.rooturl+url, user)
     .success(function(data) {
	    colog("User saved")
		$ionicLoading.hide();
		$scope.closeModal(0);
		var uname=user.firstname+" "+user.lastname;
		$ionicLoading.show({ template: "User "+uname+" saved", noBackdrop: true, duration: 2000 });
		
	 })
	 .error(function(error){
		 colog("ERROR ! "+error.message)
		 $ionicLoading.hide();
	 })
	 
	  
	  
	  
  } 
  
  
  $scope.saveCustomer=function(){
	  var customer=$scope.customer.doc;
	  var id=customer._id;
	  var rev=customer._rev;
	  
	  //alert(id+" - "+rev);
	  colog("saving following customer")
	  colog(customer)
	  
	  var url="/events/updateobject/byid/customers/"+id;
	  globals.Loading();
	  $http.post($scope.rooturl+url, { params: customer })
     .success(function(data) {
	    colog("Customer saved")
		$ionicLoading.hide();
		$scope.closeModal(1);
		$ionicLoading.show({ template: "Customer saved", noBackdrop: true, duration: 2000 });
		
	 })
	 .error(function(error){
		 colog("ERROR ! "+error.message)
		 $ionicLoading.hide();
	 })
	 
	  
	  
	  
  } 

  
  $scope.deActivateUser=function() {
	 colog($scope.user)
	  $scope.user.doc.useractive=false;
	  
	  
	  var user=$scope.user.doc;
	   var id=user._id;
	  var rev=user._rev;
	  
	  var url="/events/updateobject/byid/users/"+id;
	  globals.Loading();
	  //$scope.saveUserObject(user);
	  
	   $http.post($scope.rooturl+url, user)
     .success(function(data) {
	    colog("User activated")
		$ionicLoading.hide();
		$scope.closeModal(0);
		$scope.getUsers(null,function() {
			$ionicLoading.show({ template: "User "+user.firstname+" "+user.lastname+" deactivated", noBackdrop: true, duration: 2000 });
			
		});
		
		
	 })
	 .error(function(error){
		 colog("ERROR ! "+error.message)
		 $ionicLoading.hide();
	 })
	 
	  
	  
	  
	  
	  
	  
	  
  }
  
  $scope.activateUser=function(){
	  colog($scope.user)
	  $scope.user.doc.useractive=true;
	  
	  
	  var user=$scope.user.doc;
	   var id=user._id;
	  var rev=user._rev;
	  
	  
	  
	 
	  
	  var url="/events/updateobject/byid/users/"+id;
	  globals.Loading();
	  //$scope.saveUserObject(user);
	  
	   $http.post($scope.rooturl+url, user)
     .success(function(data) {
	    colog("User activated")
		
		var mailobj={
			from: "IBM Client365 <ibmclient365@it.ibm.com>",
			to: "marilena.fontana@it.ibm.com",
			subject: "Your IBM Client365 account has been activated",
			text: "Here we are",
			html: "Dear "+user.firstname+" "+user.lastname+", <br><br>your IBM Client365 account is now active. You can access the application using <br>the app that can be donwloaded from the AppStore."
		}
		
	    BluemixService.sendMail(mailobj,function(data){
			colog(data);
			$ionicLoading.hide();
		    $scope.closeModal(0);
			$scope.getUsers(null,function() {
			$ionicLoading.show({ template: "User "+user.firstname+" "+user.lastname+" activated", noBackdrop: true, duration: 2000 });
			
		});
		    
		})
		
		
		
		
		
		
	 })
	 .error(function(error){
		 colog("ERROR ! "+error.message)
		 $ionicLoading.hide();
	 })
	 
	  
	  
	  
	  
	  
	  
  }
  
  $scope.verifyUserIbmId=function(){
	  $scope.verifyhtm=$sce.trustAsHtml("<span style='color: blue'>Verifying user IBM ID existance......</span>"); 
	  var user=$scope.user.doc;
	  var vurl="https://g03cxnp01070.gho.boulder.ibm.com/webidentity/directory/cgi-bin/application/wiquery_uid.pl?uid="+user.email;
	
				
	  
	  
	  
	   $http.get(vurl, {})
         .success(function(data) {
			 
			 if (data.length>200){
			 $scope.verifyhtm=$sce.trustAsHtml(data);
			 $scope.showActivateButton=true;
			 
			 } else {
				$scope.verifyhtm=$sce.trustAsHtml("<b style='color: red'>No IBM ID found for this user</b>"); 
				$scope.showActivateButton=false;
			 }
			 data.error=false;
			 
			 data.errormsg="";
			 colog(data);
			 colog(data.length)
		 })
		 .error(function(data){
			 data.error=true;
			 data.errormsg=error.message;
			 colog(data);
			 
			 
		 })
	  
	  
  }
  })
.controller('SocialCtrl', function($scope, $ionicPlatform, TwitterService,globals) {
    // 1
	
	colog("initializing SocialCtrl")
    $scope.correctTimestring = function(string) {
        return new Date(Date.parse(string));
    };
    // 2
    $scope.showHomeTimeline = function() {
        $scope.home_timeline = TwitterService.getHomeTimeline();
    };
    // 3
    $scope.doRefresh = function() {
        $scope.showHomeTimeline();
        $scope.$broadcast('scroll.refreshComplete');
    };
    // 4
    $ionicPlatform.ready(function() {
		alert(TwitterService.isAuthenticated())
        if (TwitterService.isAuthenticated()) {
            $scope.showHomeTimeline();
        } else {
            TwitterService.initialize().then(function(result) {
				alert(result)
                if(result === true) {
                    $scope.showHomeTimeline();
                }
            });
        }
    });
})


.controller('LoadingCtrl', function($scope, $ionicLoading) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('TourCtrl', function($scope, $stateParams,$ionicSlideBoxDelegate) {
	
	$scope.nextSlide = function() {
     $ionicSlideBoxDelegate.next();
    }
	
})

.controller('EventCtrl', function($scope, $ionicPopup, $ionicLoading, $cordovaGeolocation, EventService) {


  $scope.searchKey = "";
  
  var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();
  
  $scope.eventSources = [
    [
        {
            "title": 'All Day Event',
            "start": new Date(y, m, d, 15, 0),
         },
         {
            "title": 'Long Event',
            "start": new Date(y, m, d - 5),
            "end": new Date(y, m, d - 2)
        }
    ]
];
  
  /*
  $scope.eventSources=[
  {
    "@context": "http://schema.org",
    "@type": "Event",
    "id": 1,
    "name": "event01",
    "startDate": "2015-06-07",
    "endDate": "2015-06-28",
    "location": {
      "@type": "Place",
      "name": "luogo",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "via del mango",
        "addressRegion": "lombardia",
        "postalCode": "286-0004"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "35.760999",
        "longitude": "140.279543"
      }
    },
    "image": "http://i.ytimg.com/vi/6SiCIyJc47Y/hqdefault.jpg",
    "description": "evento assolutamente inutile"
  }];*/
  
  
  $scope.clearSearch = function() {
    $scope.searchKey = null;
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // 検索期間の指定
  var currentDate = new Date();
  $scope.searchStartDate = new Date(currentDate.getFullYear(),currentDate.getMonth()-1,currentDate.getDate());
  $scope.searchEndDate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,currentDate.getDate());
  $scope.startDateSelected = function (startDate) {
    if(startDate > $scope.searchEndDate) {
      var msg = {title: '検索期間不正', template: '検索期間の開始日が終了日より後になってはいけません。'};
      $ionicPopup.alert(msg);
      throw msg;
    }
    EventService.find($scope.searchKey,startDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
    return startDate;
  };
  $scope.endDateSelected = function (endDate) {
    if(endDate < $scope.searchStartDate) {
      var msg = {title: '検索期間不正', template: '検索期間の終了日が開始日より前になってはいけません。'};
      $ionicPopup.alert(msg);
      endDate = $scope.searchEndDate;
      throw msg;
    }
    EventService.find($scope.searchKey,$scope.searchStartDate,endDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // 検索距離の指定
  $scope.distance = 100000;
  $scope.changeDistance = function() {
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // 現在地の緯度経度の設定
  $scope.latitude = 0;
  $scope.longitude = 0;
  $cordovaGeolocation.getCurrentPosition().then(function(position){
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;
  }, function (err) {
    // TODO エラー処理
  });

  // 検索
  $scope.search = function() {
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };
  
  // 初期表示のための検索
  var firstSearch = function() {
	  alert("firstsearch");
	  
    EventService.findAll().then(function(events) {
      $scope.events = events;
	  alert($scope.events.length)
    });
  }
  
  //firstSearch();

  // ui-Calendar用
  //$scope.eventSources = [];

  
  $scope.uiConfig = {
    calendar:{
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      height: 500,
      lang: 'ja',
      scrollTime: '10:00:00',
      buttonIcons: false, 
      weekNumbers: false,
      editable: false,
      eventLimit: true,
	  events: $scope.eventSources
      //events: EventService.getCalendarInfo()
    }
  };

  // Google Map初期呼出
  $scope.map = {
      center: {
	  latitude: 35.613281,
	  longitude: 140.112869
      },
      zoom: 10,
      markers: EventService.getMarkerInfo()
  };
})


