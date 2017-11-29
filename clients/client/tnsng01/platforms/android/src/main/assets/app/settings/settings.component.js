"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-telerik-ui/sidedrawer");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var nativescript_speech_recognition_1 = require("nativescript-speech-recognition");
var SettingsComponent = (function () {
    function SettingsComponent() {
        this.listening = false;
        this.buttontext = "START";
        this.speechtext = "Dimmi qualcosa";
        this.speechRecognition = new nativescript_speech_recognition_1.SpeechRecognition();
        this.checkAvailability();
    }
    SettingsComponent.prototype.checkAvailability = function () {
        this.speechRecognition.available().then(function (available) { return console.log(available ? "YES!" : "NO"); }, function (err) { return console.log(err); });
    };
    SettingsComponent.prototype.startListening = function () {
        var questo = this;
        var sptext = "";
        this.speechRecognition.startListening({
            locale: "it-IT",
            onResult: function (transcription) {
                console.log("User said: " + transcription.text);
                sptext = "" + transcription.text;
                console.log("speechtext", sptext);
                console.log("User finished?: " + transcription.finished);
                questo.speechtext = sptext;
            },
        }).then(function (started) { console.log("started listening"); }, function (errorMessage) { console.log("Error: " + errorMessage); });
    };
    SettingsComponent.prototype.stopListening = function () {
        this.speechRecognition.stopListening().then(function () { console.log("stopped listening"); }, function (errorMessage) { console.log("Stop error: " + errorMessage); });
    };
    SettingsComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    };
    Object.defineProperty(SettingsComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    SettingsComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    SettingsComponent.prototype.setListening = function (v) {
        this.listening = v;
        this.renderListening();
    };
    SettingsComponent.prototype.renderListening = function () {
        var questo = this;
        var text = "START";
        if (questo.listening)
            text = "STOP";
        questo.buttontext = text;
        if (questo.listening) {
            questo.startListening();
        }
        else {
            questo.stopListening();
        }
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SettingsComponent.prototype, "drawerComponent", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "Settings",
            moduleId: module.id,
            templateUrl: "./settings.component.html"
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZEO0FBQzdELGlFQUFrRztBQUNsRyxzRUFBb0Y7QUFFcEYsbUZBQW9HO0FBT3BHO0lBYUk7UUFaQSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxPQUFPLENBQUM7UUFDckIsZUFBVSxHQUFHLGdCQUFnQixDQUFDO1FBUXRCLHNCQUFpQixHQUFHLElBQUksbURBQWlCLEVBQUUsQ0FBQztRQUdoRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBSUQsNkNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FDbkMsVUFBQyxTQUFrQixJQUFLLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUF0QyxDQUFzQyxFQUM5RCxVQUFDLEdBQVcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQWhCLENBQWdCLENBQ3BDLENBQUM7SUFDTixDQUFDO0lBRUQsMENBQWMsR0FBZDtRQUNJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQztZQUdsQyxNQUFNLEVBQUUsT0FBTztZQUVmLFFBQVEsRUFBRSxVQUFDLGFBQTZDO2dCQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFjLGFBQWEsQ0FBQyxJQUFNLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxHQUFHLEtBQUcsYUFBYSxDQUFDLElBQU0sQ0FBQztnQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQW1CLGFBQWEsQ0FBQyxRQUFVLENBQUMsQ0FBQztnQkFHekQsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDL0IsQ0FBQztTQUNKLENBQUMsQ0FBQyxJQUFJLENBQ0gsVUFBQyxPQUFnQixJQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFDMUQsVUFBQyxZQUFvQixJQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBVSxZQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbkUsQ0FBQztJQUNWLENBQUM7SUFFRCx5Q0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FDdkMsY0FBUSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUEsQ0FBQyxDQUFDLEVBQzFDLFVBQUMsWUFBb0IsSUFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFlLFlBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM1RSxDQUFDO0lBQ04sQ0FBQztJQUtELG9DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxtQ0FBc0IsRUFBRSxDQUFDO0lBQzlELENBQUM7SUFFRCxzQkFBSSxtREFBb0I7YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBTUQsNkNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUdELHdDQUFZLEdBQVosVUFBYSxDQUFDO1FBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwyQ0FBZSxHQUFmO1FBQ0ksSUFBSSxNQUFNLEdBQUUsSUFBSSxDQUFDO1FBSWpCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNwQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLENBQUM7SUFDTCxDQUFDO0lBdEZvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCOzhEQUFDO0lBUnBELGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7U0FDM0MsQ0FBQzs7T0FDVyxpQkFBaUIsQ0FrRzdCO0lBQUQsd0JBQUM7Q0FBQSxBQWxHRCxJQWtHQztBQWxHWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5cclxuaW1wb3J0IHsgU3BlZWNoUmVjb2duaXRpb24sIFNwZWVjaFJlY29nbml0aW9uVHJhbnNjcmlwdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc3BlZWNoLXJlY29nbml0aW9uXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIlNldHRpbmdzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBsaXN0ZW5pbmcgPSBmYWxzZTtcclxuICAgIGJ1dHRvbnRleHQgPSBcIlNUQVJUXCI7XHJcbiAgICBzcGVlY2h0ZXh0ID0gXCJEaW1taSBxdWFsY29zYVwiO1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBAVmlld0NoaWxkIGRlY29yYXRvciB0byBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIGRyYXdlciBjb21wb25lbnQuXHJcbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG4gICAgcHJpdmF0ZSBzcGVlY2hSZWNvZ25pdGlvbiA9IG5ldyBTcGVlY2hSZWNvZ25pdGlvbigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tBdmFpbGFiaWxpdHkoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGNoZWNrQXZhaWxhYmlsaXR5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3BlZWNoUmVjb2duaXRpb24uYXZhaWxhYmxlKCkudGhlbihcclxuICAgICAgICAgICAgKGF2YWlsYWJsZTogYm9vbGVhbikgPT4gY29uc29sZS5sb2coYXZhaWxhYmxlID8gXCJZRVMhXCIgOiBcIk5PXCIpLFxyXG4gICAgICAgICAgICAoZXJyOiBzdHJpbmcpID0+IGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0TGlzdGVuaW5nKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBxdWVzdG8gPSB0aGlzO1xyXG4gICAgICAgIGxldCBzcHRleHQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc3BlZWNoUmVjb2duaXRpb24uc3RhcnRMaXN0ZW5pbmcoe1xyXG4gICAgICAgICAgICAvLyBvcHRpb25hbCwgdXNlcyB0aGUgZGV2aWNlIGxvY2FsZSBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgIC8vbG9jYWxlOiBcImVuLVVTXCIsXHJcbiAgICAgICAgICAgIGxvY2FsZTogXCJpdC1JVFwiLFxyXG4gICAgICAgICAgICAvLyB0aGlzIGNhbGxiYWNrIHdpbGwgYmUgaW52b2tlZCByZXBlYXRlZGx5IGR1cmluZyByZWNvZ25pdGlvblxyXG4gICAgICAgICAgICBvblJlc3VsdDogKHRyYW5zY3JpcHRpb246IFNwZWVjaFJlY29nbml0aW9uVHJhbnNjcmlwdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVzZXIgc2FpZDogJHt0cmFuc2NyaXB0aW9uLnRleHR9YCk7XHJcbiAgICAgICAgICAgICAgICBzcHRleHQgPSBgJHt0cmFuc2NyaXB0aW9uLnRleHR9YDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3BlZWNodGV4dFwiLCBzcHRleHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVzZXIgZmluaXNoZWQ/OiAke3RyYW5zY3JpcHRpb24uZmluaXNoZWR9YCk7XHJcbiAgICAgICAgICAgICAgIC8vIHF1ZXN0by5zZXRMaXN0ZW5pbmcoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgLy9xdWVzdG8ucmVuZGVyTGlzdGVuaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBxdWVzdG8uc3BlZWNodGV4dCA9IHNwdGV4dDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAoc3RhcnRlZDogYm9vbGVhbikgPT4geyBjb25zb2xlLmxvZyhgc3RhcnRlZCBsaXN0ZW5pbmdgKSB9LFxyXG4gICAgICAgICAgICAoZXJyb3JNZXNzYWdlOiBzdHJpbmcpID0+IHsgY29uc29sZS5sb2coYEVycm9yOiAke2Vycm9yTWVzc2FnZX1gKTsgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BMaXN0ZW5pbmcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zcGVlY2hSZWNvZ25pdGlvbi5zdG9wTGlzdGVuaW5nKCkudGhlbihcclxuICAgICAgICAgICAgKCkgPT4geyBjb25zb2xlLmxvZyhgc3RvcHBlZCBsaXN0ZW5pbmdgKSB9LFxyXG4gICAgICAgICAgICAoZXJyb3JNZXNzYWdlOiBzdHJpbmcpID0+IHsgY29uc29sZS5sb2coYFN0b3AgZXJyb3I6ICR7ZXJyb3JNZXNzYWdlfWApOyB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNldExpc3RlbmluZyh2KSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5pbmcgPSB2O1xyXG4gICAgICAgIHRoaXMucmVuZGVyTGlzdGVuaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyTGlzdGVuaW5nKCkge1xyXG4gICAgICAgIGxldCBxdWVzdG89IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgbGV0IHRleHQgPSBcIlNUQVJUXCI7XHJcbiAgICAgICAgaWYgKHF1ZXN0by5saXN0ZW5pbmcpIHRleHQgPSBcIlNUT1BcIjtcclxuICAgICAgICBxdWVzdG8uYnV0dG9udGV4dCA9IHRleHQ7XHJcbiAgICAgICAgaWYgKHF1ZXN0by5saXN0ZW5pbmcpIHtcclxuICAgICAgICAgICAgcXVlc3RvLnN0YXJ0TGlzdGVuaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVlc3RvLnN0b3BMaXN0ZW5pbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19