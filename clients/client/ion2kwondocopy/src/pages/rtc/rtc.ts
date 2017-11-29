import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import * as Peer from "peerjs"

/**
 * Generated class for the RtcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 

@Component({
  selector: 'page-rtc',
  templateUrl: 'rtc.html',
})
export class RtcPage {
  SERVER_IP = ""
  SERVER_PORT = 80;
  callerId = null;
  
    // PeerJS object, instantiated when this client connects with its
    // caller ID
    peer = null;
  
    // the local video stream captured with getUserMedia()
   localStream = null;
   localVideo;
   remoteVideo;
   callerIdEntry;
   recipientIdEntry ;
  
  

  constructor(public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RtcPage');
    this.SERVER_IP=this.backend.rooturl.replace("http://","");
    this.localVideo = document.querySelector('#local-video');
    this.remoteVideo = document.querySelector('#remote-video');
    this.callerIdEntry = document.querySelector('#caller-id');
    this.recipientIdEntry=document.querySelector('#recipient-id')
    

  }

  getLocalStream = function (successCb?:any) {
    var questo=this;
    if (questo.localStream && successCb) {
      successCb(questo.localStream);
    }
    else {
      navigator.mediaDevices.getUserMedia(
        {
          audio: true,
          video: true
        }).then(

        function (stream) {
          questo.localStream = stream;

          questo.localVideo.src = window.URL.createObjectURL(stream);

          if (successCb) {
            successCb(stream);
          }
        }).catch(

        function (err) {
          questo.logError('failed to access local camera');
          questo.logError(err.message);
        }
      );
    }
  };

  logError(text) {
    /*
    var p = makePara('ERROR: ' + text);
    p.style.color = 'red';
    addMessage(p);*/
    console.log(text);

  };

  showRemoteStream(stream) {
    this.remoteVideo.src = window.URL.createObjectURL(stream);
  };

  connect() {
    var questo=this;
    questo.callerId = questo.callerIdEntry.value;

    if (!questo.callerId) {
      questo.logError('please set caller ID first');
      return;
    }

    console.log("callerId",questo.callerId);

    try {
      // create connection to the ID server
      
      questo.peer = new Peer(questo.callerId, {host: questo.SERVER_IP, port: 80, path: "/peerjs"});
      console.log("peer",questo.peer);
      // hack to get around the fact that if a server connection cannot
      // be established, the peer and its socket property both still have
      // open === true; instead, listen to the wrapped WebSocket
      // and show an error if its readyState becomes CLOSED
      questo.peer.socket._socket.onclose = function () {
        console.log('no connection to server');
        questo.peer = null;
      };

      // get local stream ready for incoming calls once the wrapped
      // WebSocket is open
      questo.peer.socket._socket.onopen = function () {
        console.log("socket opened !")
        questo.getLocalStream();
      };

      // handle events representing incoming calls
      questo.peer.on('call', questo.answer);
    }
    catch (e) {
      questo.peer = null;
      console.log('error while connecting to server',e);
    }
  };

  answer(call) {
    var questo=this;
    if (!questo.peer) {
      console.log('cannot answer a call without a connection');
      return;
    }

    if (!questo.localStream) {
      console.log('could not answer call as there is no localStream ready');
      return;
    }

    console.log('incoming call answered');

    call.on('stream', questo.showRemoteStream);

    call.answer(questo.localStream);
  };

 dial () {
   var questo=this;
    if (!questo.peer) {
      questo.logError('please connect first');
      return;
    }

    if (!questo.localStream) {
      questo.logError('could not start call as there is no local camera');
      return
    }

    var recipientId = questo.recipientIdEntry.value;
    

    if (!recipientId) {
      questo.logError('could not start call as no recipient ID is set');
      return;
    }

    questo.getLocalStream(function (stream) {
     console.log('outgoing call initiated');

      var call = questo.peer.call(recipientId, stream);

      call.on('stream', questo.showRemoteStream);

      call.on('error', function (e) {
        console.log('error with call',e.message);
        
      });
    });
  };


}
