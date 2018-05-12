var connection = null;
var getPublicModeratorsResponse = false;
var facingCameraId = "";
var videosources = [];
var initiator = false;
var expectStream = "";

var feed = document.getElementById('feed');
var feedContext = feed.getContext('2d');

broadcast_init();

function broadcast_init() {


  
    conslog("broadcast_init");

    if (typeof MediaStreamTrack === 'undefined' || typeof MediaStreamTrack.getSources === 'undefined') {
        console.log('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
    } else {
        videosources = [];
        MediaStreamTrack.getSources(broadcast_gotSources);
    }

    conslog("loadingrtcmulti", connection);
    loadRTCMultiConnection();
    conslog("loadingrtcmulti loaded", connection);
  

}

function leaveRoom() {
     if (role != "tkdradmin") {
            exitBroadcastPage();
        } else {
            closeBroadcast();
        }

}


function openOrJoinRoom(){

      var roomid = document.getElementById('room-id').value;
        joinBroadcast(roomid);
}




function broadcast_gotSources(sourceInfos) {
    conslog("sources", sourceInfos);
    videosources = [];
    $("#videoSource").empty();
    $("#audioSource").empty();
    var videoSelect = $("#videoSource").get(0);
    var audioSelect = $("#audioSource").get(0);

    var videosrc = $("#page_broadcast #videosrc");
    var audiosrc = $("#page_broadcast #audiosrc");
    videosrc.empty();
    audiosrc.empty();

    for (var i = 0; i !== sourceInfos.length; ++i) {
        var sourceInfo = sourceInfos[i];

        var option = document.createElement('option');
        option.value = sourceInfo.id;
        if (sourceInfo.kind === 'audio') {
            option.text = sourceInfo.label || 'microphone ' + (audioSelect.length + 1);
            audioSelect.appendChild(option);
            //audiosrc.get(0).appendChild(option);
            conslog(option.text);

        } else if (sourceInfo.kind === 'video') {
            option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
            conslog(option.text);
            videoSelect.appendChild(option);
            //videosrc.get(0).appendChild(option);
            videosources.push(sourceInfo);
            if (sourceInfo.facing == "environment") facingCameraId = sourceInfo.id;
        } else {
            conslog('Some other kind of source: ', sourceInfo);
        }

        $("#videoSource").selectmenu("refresh");
        $("#audioSource").selectmenu("refresh");
        /*$("#videosrc").controlgroup().controlgroup("refresh");
        $("#audiosrc").controlgroup().controlgroup("refresh");
        $("#page_broadcast").trigger("create");*/
    }

    conslog("sources", videosources);



}



window.requestAnimationFrame ||
	(window.requestAnimationFrame = window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function( callback ){
        window.setTimeout(callback, 1000 / 60);
    });

    function streamFeed() {
        requestAnimationFrame(streamFeed);
        feedContext.drawImage(video, 0, 0, width, height);
        imageData = feedContext.getImageData(0, 0, width, height);
        //imageData.data = addEffects(imageData.data); //call this to add effects to the output stream
		outputContext.putImageData(imageData, 0, 0);
    }

function broadcast_connect() {
    conslog("attempting connection");
    if (!connection) {
        conslog("connection not existing, creating it");
        connection = new RTCMultiConnection();



        conslog("connection instantiated", connection);
        conslog("your userid: ", connection.userid);


        //$("#leave-room").show();



        // by default, socket.io server is assumed to be deployed on your own URL
        //connection.socketURL = '/';

        // comment-out below line if you do not have your own socket.io server
        connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
        connection.socketURL = 'https://rtcdem.mybluemix.net:443/';
        //connection.socketURL ="https://192.168.1.100:9001/";

        connection.enableLogs = true;

        connection.socketMessageEvent = 'video-broadcast-demo';
        connection.connectSocket(function () {
            conslog('Successfully connected to broadcast socket.io server.');

            //connection.socket.emit('howdy', 'hello');
        });
        connection.session = {
            audio: false,
            video: true,
            oneway: true
        };

        connection.extra = {
            joinedAt: (new Date).toLocaleString()
        }

  

        /*connection.mediaConstraints.video.mandatory = {
            width: 640,
            height: 480,
            minFrameRate: 30
        };*/


        connection.autoCloseEntireSession = true;



        //conslog("mediaDevices",mediaDevices);

        // conslog("mediaDevices",mediaDevices);

        connection.videosContainer = document.getElementById('videos-container');


        connection.onNewSession = function (session) {
            conslog("newsession", session);
        };

        connection.onSessionClosed = function (e) {
            conslog("SESSION HAS BEEN CLOSED");

        }

        connection.onleave = function (e) {
            conslog("session left", e);
        }

        connection.onstreamended = function (e) {
            conslog("broadcast was ended", e);
            e.mediaElement.parentNode.removeChild(e.mediaElement);
            //$("#page_broadcast #videos-container").empty();
            //e.mediaElement.parentNode.removeChild(e.mediaElement);

            //e.mediaElement.parentNode.removeChild(e.mediaElement);
            renderPublicModerators();
            if (connection.isInitiator) {
                connection.socket.emit("refreshPublicModerators");
                closeBroadcast();
            } else {
                closeBroadcast();
            }


        }

        connection.onmessage = function (e) {
            conslog("onmessage", e);

        }







        connection.onstream = function (event) {
           conslog("onstream", event);
            if (event.userid != expectStream) return;
           
            //renderParticipants();
            //conslog("videoInputDevices",videoInputDevices);
            conslog("stream constraints", connection.mediaConstraints);
            conslog("stream type", event.type);


            if (event.type == "local") {
                /*connection.extra = {
                    divcolor: "red"
                }*/
                //connection.setCustomSocketEvent("rpm");
                connection.socket.emit("refreshPublicModerators");

                $("#page_broadcast #participants").show();
                $("#page_broadcast #sources").show();


                /*conslog(io);
                var socket=connection.socket.socket;
                socket.broadcast("rpm");*/



            }
            if (event.type == "remote") {

                /*connection.extra = {
                    divcolor: "green"
                }*/
                $("#page_broadcast #participants").hide();
                $("#page_broadcast #sources").hide();
            }


            //var c=connection.mediaConstraints;
            //c.video.optional[1].facingMode="environment";


            $("#page_broadcast #videos-container").empty();
            connection.videosContainer.appendChild(event.mediaElement);
            if (connection.isInitiator) {
                var txt = event.userid;
                if (event.extra.matchid) {
                    txt = event.extra.matchnum + " - " + event.extra.atletaname;
                }
                $("#page_broadcast #participants").show();
                var txt2 = "<span style='color: green;'>SEI LIVE SUL CANALE <br><b>" + txt + "</b></span>";
                $("#page_broadcast #participants #msg").html(txt2)
                $("#page_broadcast #viewing").empty().hide();

            } else {
                $("#page_broadcast #participants").hide();
                $("#page_broadcast #roomslist").hide();
                var txt = event.userid;
                if (event.extra.matchid) {
                    txt = event.extra.matchnum + " - " + event.extra.atletaname;
                }
                $("#page_broadcast #viewing").html("Stai guardando: <br><b>" + txt + "</b>").show();
            }
            $("#page_broadcast #inputtext").hide();
            //var h2=document.createElement("h2");
            //h2.innerHTML=event.extra.joinedAt;
            //connection.videosContainer.appendChild(h2);
            //$("#leave-room").show();
            //$("#open-or-join-room").hide();
            event.mediaElement.play();
            setTimeout(function () {
                event.mediaElement.play();
            }, 5000);
        };


    }
    renderPublicModerators();
    broadcast_altro();

}


function broadcast_altro() {

    (function () {
        var params = {},
            r = /([^&=]+)=?([^&]*)/g;

        function d(s) {
            return decodeURIComponent(s.replace(/\+/g, ' '));
        }
        var match, search = window.location.search;
        while (match = r.exec(search.substring(1))) params[d(match[1])] = d(match[2]);
        window.params = params;
    })()

    var roomid = '';
    if (connection) {
        if (localStorage.getItem(connection.socketMessageEvent)) {
            roomid = localStorage.getItem(connection.socketMessageEvent);
        } else {
            roomid = connection.token();
        }
    }
    document.getElementById('room-id').value = roomid;
    document.getElementById('room-id').onkeyup = function () {
        if (connection) localStorage.setItem(connection.socketMessageEvent, this.value);
    }

    var hashString = location.hash.replace('#', '');
    if (hashString.length && hashString.indexOf('comment-') == 0) {
        hashString = '';
    }

    var roomid = params.roomid;
    if (!roomid && hashString.length) {
        roomid = hashString;
    }

    if (connection) {
        if (roomid && roomid.length) {
            document.getElementById('room-id').value = roomid;
            localStorage.setItem(connection.socketMessageEvent, roomid);

            // auto-join-room
            if (1 == 2) {
                (function reCheckRoomPresence() {
                    connection.checkPresence(roomid, function (isRoomExists) {
                        if (isRoomExists) {
                            connection.join(roomid);

                            return;
                        }

                        setTimeout(reCheckRoomPresence, 5000);
                    });
                })();
            }

            // disableInputButtons();
        }
    }
}





function renderPublicModerators() {
    $("#page_broadcast #roomslist #rooms ricerca").html("Ricerca trasmissioni....").show();
    conslog("renderPublicModerators");
    conslog("connection", connection);
    var div = $("#page_broadcast #listarooms");
    var divls = $("#livestreams");
    divls.find("ul").html("");
    getPublicModeratorsResponse = false;

    if (!connection) broadcast_connect();
    connection.getPublicModerators(function (arrayOfModerators) {
        conslog("getPublicModerators callback");
        getPublicModeratorsResponse = true;
        if (arrayOfModerators) conslog("arrayOfModerators", arrayOfModerators);
        var html = "";
        div.empty();
        divls.find("ul").html("");
        divls.find("ul").listview().listview("refresh");
        var count = 0;
        arrayOfModerators.forEach(function (moderator) {
            // moderator.extra
            conslog("moderator", moderator);
            var txt = moderator.userid;
            /*if (txt.indexOf("match_")>-1) {
                var matchid=txt.replace("match_","");
                var mid=getMatchById(matchid);
                conslog("mid",mid);

            }*/

            if (moderator.extra) {
                if (moderator.extra.matchid) {
                    txt = moderator.extra.matchnum + " - " + moderator.extra.atletaname;
                }
            }

            html += "<li class='roomli'><a href=javascript:joinBroadcast('" + moderator.userid + "')>" + txt + "</a></li>";
            //connection.join(moderator.userid);
            count++;
        });

        conslog("html", html);

        if (!arrayOfModerators.length) {
            conslog("macheccazz");
        }


        if (html != "") {
            //html="<ul data-role='listview' style='margin: 0'>"+html+"</ul>";
            // $("#page_broadcast #roomslist .title").html("Trasmissioni attive: "+count);
            div.append(html);
            divls.find("ul").append(html);
            divls.find("ul").listview().listview("refresh");
        }

        if (count == 0) {
            html = "Nessun trasmissione attiva";
            $("#floatbutton").hide();
        } else $("#floatbutton").show();
        $("#page_broadcast #roomslist .title").html("Trasmissioni attive: " + count);
        $("#page_broadcast #roomslist #rooms ricerca").html("Ricerca trasmissioni....").hide();
        //conslog("html",html);

        $("#page_broadcast #listarooms").listview().listview("refresh");
    });

    conslog("getPublicModeratorsResponse", getPublicModeratorsResponse);
}




function joinBroadcast(roomid) {


    broadcast_connect();
    //var roomid = document.getElementById('room-id').value;
    conslog("roomid", roomid);
    connection.checkPresence(roomid, function (isRoomExists, roomid) {
        conslog('isRoomExists (' + roomid + '): ' + isRoomExists);

        if (isRoomExists) {
            //document.getElementById('join-room').disabled = false;

            connection.join(roomid);
            conslog("joined room " + roomid);
            conslog("isInitiator", connection.isInitiator);
            initiator = connection.isInitiator;
            if (connection.isInitiator) {
                showRoomURL(roomid);

            } else hideRoomURL(roomid);

            disableInputButtons();
        }
        else {
            //switchCamera();
            connection.open(roomid, true);
            //document.getElementById('open-room').disabled = false;
            // var r = confirm("Il broadcast " + roomid + " non esiste, vuoi avviare la trasmissione ?");

            conslog("opened room " + roomid);
            conslog("isInitiator", connection.isInitiator);
            initiator = connection.isInitiator;
            if (connection.isInitiator) {
                showRoomURL(roomid);
            } else hideRoomURL(roomid);




        }


    });
    expectStream = roomid;
    var pageid = $.mobile.activePage.attr('id');
    if (pageid != "page_broadcast") $.mobile.changePage("#page_broadcast");

    $("#page_broadcast #leave-room").show();
    //$("#page_broadcast #sources").hide();
    $("#livestreams").hide();
    //$("#floatbutton").hide();
    if (connection.isInitiator) {
        $("#page_broadcast #participants").show();
        $("#page_broadcast #sources").show();
    } else {
        $("#page_broadcast #sources").hide();
        $("#page_broadcast #participants").hide();
    }
}


function showRoomURL(roomid) {
    $("#page_broadcast #roomslist").hide();
    var roomHashURL = '#' + roomid;
    var roomQueryStringURL = '?roomid=' + roomid;

    var html = '<p>Unique URL for your room:<br>';

    html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
    html += '<br>';
    html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a></p>';

    var roomURLsDiv = document.getElementById('room-urls');
    roomURLsDiv.innerHTML = html;
    // $("#page_broadcast #room-urls").show();
    //roomURLsDiv.style.display = 'block';
}


function hideRoomURL(roomid) {
    if (connection.isInitiator) {
        $("#page_broadcast #roomslist").show();
    }
    var roomURLsDiv = document.getElementById('room-urls');
    roomURLsDiv.innerHTML = "";

    //roomURLsDiv.style.display = 'none';
    $("#page_broadcast #room-urls").hide();
}


function disableInputButtons() {
    document.getElementById('open-or-join-room').disabled = true;
    /*document.getElementById('open-room').disabled = true;
    document.getElementById('join-room').disabled = true;*/
    document.getElementById('room-id').disabled = true;
}
function enableInputButtons() {
    document.getElementById('open-or-join-room').disabled = false;
    /*document.getElementById('open-room').disabled = false;
    document.getElementById('join-room').disabled = false;*/
    document.getElementById('room-id').disabled = false;
}

function closeBroadcast() {
    conslog("close connection button click");
    conslog("connection", connection);
    if (connection) {
        try {
            window.connection.attachStreams.forEach(function (stream) {
                stream.stop();
            });


            if (initiator) {
                conslog("isInitiator", connection.isInitiator);
                //connection.closeEntireSession();
                connection.close();
                connection.socket.emit("refreshPublicModerators");
                initiator = false;
            } else connection.leave();
            conslog("connection left");

        }
        catch (e) {
            conslog("error on close connection", e);
        }

        //connection = null;
        enableInputButtons();
        renderPublicModerators();
        $("#page_broadcast #room-urls").hide();
        $("#page_broadcast #participants").hide();
        $("#page_broadcast #leave-room").hide();
        $("#page_broadcast #roomslist").show();
        $("#page_broadcast #inputtext").show();
        $("#page_broadcast #viewing").empty().hide();
        $("#page_broadcast #sources").show();

    }

}

function rtcevent(e) {

    conslog("rtcevent received", e.detail);
    if (e.detail.evname == "useronline") {

        renderParticipants();

    }
    if (e.detail.evname == "useroffline") {
        renderParticipants();

    }
    if (e.detail.evname == "rpm") {
        conslog("received rpm !!!");
        renderPublicModerators();

    }
    if (e.detail.evname == "userleft") {

        conslog("detail", e.detail);
        var con = e.detail.data.connection;
        var uid = e.detail.data.userid;


        //if (initiator) connection.eject(uid);
        renderParticipants();

    }
    /*if (e.detail.evname == "streamended") {
        conslog("streamended");
        if (!initiator) {
            conslog("The broadcast was terminated by broadcaster");
        }

        renderParticipants();

    }*/

}




function renderParticipants() {

    var div = $("#page_broadcast #participants");
    var divc = div.find("#content");
    var divt = div.find("#title");
    var divm = div.find("#msg");
    divc.empty();
    conslog("renderparticipants, connection", connection);

    var l = connection.getAllParticipants().length;
    conslog("l", l);
    divt.html("Spettatori: " + l);
    if (l > 0) {
        html = "<ul style='display:none'>";
        connection.getAllParticipants().forEach(function (participantId) {
            // typeof participantId === 'string'
            var peer = connection.peers[participantId];
            html += "<li>" + peer.userid + "</li>"
            //divc.append(html);

            conslog("PEER DATA", peer.connection, peer.userid, peer.streams, peer.channels);
        });
        html += "</ul>";
        divc.append(html);
        //divm.html("<span style='color: green; font-weight: bold'>Sei LIVE sul canale ")
        if (connection.isInitiator) div.show();
    } else {
        divc.empty();
        div.hide();
    }


}


function switchCamera() {
    conslog("facingCameraid", facingCameraId);
    connection.mediaConstraints.video.optional = [{
        sourceId: facingCameraId
    }];


}


function switchCamera2() {

    var videoSources = $("#videoSource").get(0);
    var videoSourceId = videoSources.value;

    if (connection.mediaConstraints.video.optional.length && connection.attachStreams.length) {
        if (connection.mediaConstraints.video.optional[0].sourceId === videoSourceId) {
            alert('Selected video device is already selected.');
            return;
        }
    }

    connection.attachStreams.forEach(function (stream) {
        stream.getVideoTracks().forEach(function (track) {
            stream.removeTrack(track);

            if (track.stop) {
                track.stop();
            }
        });
    });

    connection.mediaConstraints.video.optional = [{
        sourceId: videoSourceId
    }];

    $("#page_broadcast #videoSource").selectmenu("refresh");
    $("#audioSource").selectmenu("refresh");

    //connection.captureUserMedia();

}

function getStream(stream) {
		video.src = window.URL.createObjectURL(stream);
		video.play();
		feed.width = output.width = width;
		feed.height = output.height = height;	
		streamFeed();
	}



function fanculo() {
    navigator.getUserMedia = navigator.getUserMedia ||
        /* chrome и safari           */
        navigator.webkitGetUserMedia ||
        /* firefox                   */
        navigator.mozGetUserMedia ||
        /* ie                        */
        navigator.msGetUserMedia;

    /* обьект, который переводит MediaStream в Blob */
    //window.URL = window.URL || window.webkitURL;

    /* запрашиваем доступ к веб-камере */
    navigator.getUserMedia({ audio: true, video: true },
        function (pLocalMediaStream) {
            /*
             * создаём элемент Video,
             * в который помещаем картинку с веб-камеры\
             */
            var Video = document.getElementById("videos-container");
            var lVideo = document.createElement("video")
            lVideo.autoplay = true;
            lVideo.src = URL.createObjectURL(pLocalMediaStream);
            $("#videos-container").get(0).appendChild(lVideo);
            streamFeed();
        },
        function (pError) { /* если возникла ошибка - выводим её */
            conslog("error", pError);
        });
}


function broadcastMatch(mid) {

    gConfirm("Stai per trasmettere il video in diretta di questo incontro. Sei sicuro ?", "Conferma trasmissione video", function () {
        conslog("intent to broadcast match " + mid);
        gotoBroadcast();
        $("#page_broadcast #room-id").val(mid);
        var match = getMatchById(mid.replace("match_", ""));
        conslog("match", match);

        if (!connection) broadcast_connect();

        connection.extra = {
            joinedAt: (new Date).toLocaleString(),
            matchid: match.id,
            matchnum: match.matchid,
            atletaname: match.atletaname
        }
        connection.updateExtraData();
        joinBroadcast(mid);
    }, function () {

    });





}

function clickFloatBroadcast() {

    var pageid = $.mobile.activePage.attr('id');
    var newpage = "page_broadcast";
    if (pageid == "page_broadcast") {
        //$.mobile.back();
        return;
    }

    //gotoBroadcast();   
    $("#livestreams").toggle();


}


function resetSessions() {

    connection.attachStreams.forEach(function (stream) {
        conslog("stream", stream);
        stream.stop();

        var videoElement = document.getElementById(stream.id);
        if (videoElement && videoElement.parentNode) {
            videoElement.pause();
            videoElement.src = null; // for iOS
            videoElement.parentNode.removeChild(videoElement);
        }
    });

    connection.getAllParticipants().forEach(function (p) {
        conslog("particip", p);
        connection.disconnectWith(p);
    });

    connection.closeSocket(); // socket.io connection

    broadcast_init();
    // optionally:
    // connection.userid = connection.token();

}


function exitBroadcastPage() {



    if (initiator) {
        gConfirm("Vuoi veramente terminare la tramissione live  ?", "Conferma trasmissione video", function () {
            closeBroadcast();
            $.mobile.back();
            $("#livestreams ul").html("");

            renderPublicModerators();
        }, function () {

        });


    } else {
        closeBroadcast();
        $.mobile.back();
        $("#livestreams ul").html("");
        renderPublicModerators();
    }






}