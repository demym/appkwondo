import { Component,ViewChild } from '@angular/core';
import { NavController, Navbar, NavParams, Events, AlertController, ToastController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { SocketService } from '../../providers/socket-service/socket-service';
import { ChatPage } from '../../pages/chat/chat';
/**
 * Generated class for the MatchconsolePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-matchconsole',
  templateUrl: 'matchconsole.html',
})
export class MatchconsolePage {
  @ViewChild(Navbar) navBar: Navbar;
  consoles: any = [];
  selectedMatchId = "";
  selectedMatch: any = {};
  selectedConsole: any = {};
  selConsoleIndex = -1;
  disabledcontrols=false;

  constructor(public socket: SocketService, public events: Events,public toastCtrl: ToastController, public alertCtrl: AlertController, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
    var questo=this;

   

  }

  ionViewDidLoad(){
    this.backend.setBackButtonAction(this.navBar,this.navCtrl);
    this.backend.setupNavbarBack(this.navBar,this.navCtrl);
  }

  ionViewWillLoad() {

    var questo = this;

    /*questo.events.subscribe("updategara",function(msg,time){
      console.log("refreshgara in matchconsole.ts !!");
      //questo.disabledcontrols=false;
      //questo.refresh(function(){
        //questo.backend.syncConsoles(questo.gara.matchesbyprog);
        //questo.events.publish("updatematchesforatleta",questo.gara.matchesbyprog);
      //});
    })*/

    var match = this.navParams.get("match");
    var id = match.id;
    this.selectedMatchId = id;
    this.selectedMatch = match;
    this.backend.removeConsolesIfNotRealtime();
    this.backend.addConsoleIfNotExists(this.selectedMatch);

    this.consoles = this.backend.matchconsoles;
    this.consoles.forEach(function (item, idx) {
      if (item.match.id == questo.selectedMatchId) {
        questo.selectedConsole = item;
        questo.selConsoleIndex = idx;
      }
    })
    //this.selectedMatchId=this.selectedMatch.id;
    console.log('ionViewDidLoad MatchconsolePage, selectedconsole', questo.selectedConsole);

   
  }

  tapSegment(c, i) {
 
    this.selectedMatchId = c.match.id;
    this.selectedMatch = c.match;
    this.selectedConsole = c;
    this.selConsoleIndex = i;
    console.log("tapSegment", c);
    this.backend.playFeedback();

  }


  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
    //this.events.unsubscribe("updategara");
    this.events.unsubscribe("hwbackbutton");
    
    
  }

  ionViewWillEnter(){
    var questo=this;
    this.events.subscribe("hwbackbutton",function(data){
      console.log("hwbackbutton in gare.ts");
      questo.navCtrl.pop();
    })
  }

  isRealTime(c) {
    var isrt = false;
    if (c.hasOwnProperty("realtime")) {
      if (String(c.realtime) == "true") {
        isrt = true;
      }
    }
    return isrt;
  }

  toggleTempoReale() {
    
    var questo = this;
    questo.backend.playFeedback();
    var active = true;
    var url = this.backend.rooturl +"/matches/update/" + this.selectedConsole.match.garaid + "/" + this.selectedConsole.match.id;
    var newvalue = "true";
    var newtesto = "attivato";
    if (String(this.selectedConsole.match.realtime) == "true") {
      newvalue = "false";
      newtesto = "disattivato"
      active = false;
    }


    var action = "realtime_off";
    if (active) action = "realtime_on";
    console.log("sending admin_action", action);



    //alert(action);
    var testo = "disattivato";
    if (active) testo = "attivato";

    var doc = {
      realtime: active,
      admin_action: action
    }
    //sendRealtime(true);
    questo.disabledcontrols=true;
    questo.backend.postData(url, doc, function (data) {
      let toast = questo.toastCtrl.create({
        message: 'Tempo reale ' + newtesto + " per il match " + questo.selectedConsole.match.matchid,
        duration: 3000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        questo.disabledcontrols=false;
      });

      toast.present();
     



    })



    if (1 == 1) return;

    if (String(this.selectedConsole.match.realtime) == "true") {
      newvalue = "false";
      newtesto = "disattivato"
    }
    this.selectedConsole.match.realtime = newvalue;

    this.backend.matchconsoles.forEach(function (item, idx) {
      if (questo.selectedConsole.match.id == item.match.id) {
        questo.backend.matchconsoles[idx] = questo.selectedConsole;
      }
    })

    questo.consoles = questo.backend.matchconsoles;

    let toast = this.toastCtrl.create({
      message: 'Tempo reale ' + newtesto + " per il match " + questo.selectedConsole.match.matchid,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  tapPlus(t) {
    var questo=this;
    var result = this.selectedConsole.result;
    var p1 = parseInt(result.split("-")[0]);
    var p2 = parseInt(result.split("-")[1]);

    var arr = t.split("_");
    var oper = arr[0];
    var side = arr[1];


    if (oper == 'plus') {
      if (side == '1') {
        p1++;

      }
      if (side == '2') {
        p2++;

      }


    }
    if (oper == 'minus') {
      if (side == '1') {
        p1--;
        if (p1 < 0) p1 = 0;

      }
      if (side == '2') {
        p2--;
        if (p2 < 0) p2 = 0;

      }


    }

    result = p1 + "-" + p2;
    this.selectedConsole.result = result;

    questo.sendRealtime();
    questo.backend.playFeedback();
    //prepare text
    
    
    

  }

  sendRealtime(){
    var questo=this;
    var text = "TEMPO REALE !<br> ";



		var color = "black";
		var mtext = "in pausa";
		if (questo.selectedConsole.running) {
			mtext = "IN CORSO";
			color = "blue";
		}

		if (questo.selectedConsole.fineround) {
			mtext = "FINE ROUND " + questo.selectedConsole.round;
			color = "black";
		}

		var rtext = "<font color='" + color + "'>Round " + questo.selectedConsole.round;
		if (questo.selectedConsole.round == "GP") rtext = "<font color='" + color + "'>GoldenPoint"

		text += " " + rtext;

		text += ", " + mtext;

		text += ", " + questo.selectedConsole.result + "</font>";

		/*

		if (rta) {
			if (rta.foto) {

				text += "<br><img style='float: left' src='" + rta.foto + "' width='60px' height='60px' />";

			}
    }
    */
		//addMatchToRealtime(selectedid);

		color = "black";

		if (questo.selectedConsole.active) color = "blue";

		var htext = "<span style='color: " + color + "'>" + text + "</span>";
    //

    var rdata = {
			type: "realtime",
			to: "all",
			garaid: questo.selectedConsole.match.garaid,
			//matchid: selectedid,
			matchid: questo.selectedConsole.match.id,
			//matchnumber: selectedmatchid,
			matchnumber: questo.selectedConsole.match.matchid,
			result: questo.selectedConsole.result,
			round: questo.selectedConsole.round,
			fineround: questo.selectedConsole.fineround,
			running: questo.selectedConsole.running,
			paused: questo.selectedConsole.paused,
			ammoniz1: 0,
			ammoniz2: 0,
			event: "realtime",
			text: text,
			//match: getMatchById(selectedid),
			match: questo.selectedConsole.match,
			active: true //questo.selectedConsole.active

    }

    if (questo.selectedConsole.match.realtime){
      if (String(questo.selectedConsole.match.realtime)=="true") questo.socket.sendMessage(rdata);
    }
    
  }

  tapRound(n) {
    this.selectedConsole.round = n;
    this.selectedConsole.paused = false;
    this.selectedConsole.running = true;
    this.selectedConsole.fineround = false;
    this.sendRealtime();
     this.backend.playFeedback();
  }

  tapFineround() {
    this.selectedConsole.fineround = true;
    this.selectedConsole.paused = true;
    this.selectedConsole.running = false;
     this.sendRealtime();
     this.backend.playFeedback();
  }

  getPauseText() {
    var text = "IN CORSO";
    if (this.selectedConsole.paused) {
      text = "IN PAUSA";
    }
    return text;
  }

  tapPause() {
    if (!this.selectedConsole.fineround) {
      this.selectedConsole.paused = !this.selectedConsole.paused;
      this.selectedConsole.running = !this.selectedConsole.running;
    }
     this.sendRealtime();
     this.backend.playFeedback();
  }

  getTemporealeText() {
    var text = "TEMPO REALE: NON ATTIVO";
    if (this.selectedConsole.match.realtime) {
      if (String(this.selectedConsole.match.realtime) == "true") {
        text = "TEMPO REALE: ATTIVO !";
      }
    }
    return text;
  }

  setResult() {
    this.backend.playFeedback();
    console.log("setResult");
    var questo = this;
    let alert = questo.alertCtrl.create({
      title: 'Conferma validazione risultato',
      message: 'Vuoi davvero convalidare il risultato di questo incontro ?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            questo.backend.playFeedback();
          }
        },
        {
          text: 'OK',
          handler: () => {
             questo.backend.playFeedback();
            var match=questo.selectedConsole.match;
            var goldenpoint=false;
            if (questo.selectedConsole.round.toLowerCase()=="gp") goldenpoint=true;
            match.goldenpoint=goldenpoint;
            match.risultato=questo.selectedConsole.result;
            var atl=questo.backend.getAtletaById(questo.selectedConsole.match.atletaid);
            var mfa=questo.backend.filterRows(questo.backend.activegara.matchesbyprog,{atletaid: atl.id});
            questo.backend.setResult(match,atl,mfa,function(data){
              console.log("setted result !!",data);
            })
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();

  }

  gotoChat(){
    this.backend.playFeedback();
    this.navCtrl.push(ChatPage);
  }
}
