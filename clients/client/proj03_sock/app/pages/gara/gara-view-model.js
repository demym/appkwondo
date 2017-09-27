var observable = require("data/observable");
var GaraViewModel = (function (_super) {
    __extends(GaraViewModel, _super);
    function GaraViewModel() {
        _super.call(this);
        this.counter = 42;
        
        
        this.set("message", this.counter + " taps left");
		this.set("messaggio", "fangaulers");
		this.set("items",[{name: "Home"},{name: "Atleti"},{name: "Gare"},{name: "Impostazioni"},{name: "Connessioni"},{name: "Logout"},{name:"Chiudi AppKwonDo"},{name: "Home"},{name: "Atleti"},{name: "Gare"},{name: "Impostazioni"},{name: "Connessioni"},{name: "Logout"},{name:"Chiudi AppKwonDo"}])
		
    }
    GaraViewModel.prototype.setModel = function (data){
        this.set("model",data);
    }
    GaraViewModel.prototype.tapAction = function () {
        this.counter--;
        if (this.counter <= 0) {
            this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
        }
        else {
            this.set("message", this.counter + " taps left");
        }
    }
	
    return GaraViewModel;
})(observable.Observable);
exports.GaraViewModel = GaraViewModel;
exports.GaraViewModel = new GaraViewModel();

