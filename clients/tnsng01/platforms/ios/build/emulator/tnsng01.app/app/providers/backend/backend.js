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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var Backend = (function () {
    function Backend(http) {
        this.http = http;
        this.rooturl = "http://tkdr.herokuapp.com";
        this.token = "token";
        this.atleti = [];
        this.chat = [];
        this.activegara = {};
    }
    Backend.prototype.fetchData = function (url, callback) {
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.token;
            }
            else
                url += "?token=" + this.token;
        }
        this.http.get(url).map(function (res) { return res.json(); }).subscribe(function (data) {
            console.log("got data", data);
            if (callback)
                callback(data);
        });
    };
    Backend.prototype.getCategoria = function (dn, referralDate) {
        var cat = "senior a";
        var curyear = new Date().getFullYear();
        if (referralDate) {
            var arrd = referralDate.split("/");
            var annogara = arrd[2];
            curyear = annogara;
        }
        if (dn.trim() == "") {
            return "senior b";
        }
        var ar = dn.split(".");
        var byear = ar[2];
        var eta = parseInt(curyear, 10) - parseInt(byear, 10);
        if ((eta >= 18) && (eta <= 35))
            cat = "senior a";
        if ((eta >= 15) && (eta <= 17))
            cat = "junior";
        if ((eta >= 12) && (eta <= 14))
            cat = "cadetti a";
        if ((eta >= 10) && (eta <= 11))
            cat = "cadetti b";
        if (eta > 35)
            cat = "senior b";
        if (eta < 10)
            cat = "esordienti";
        return cat;
    };
    Backend.prototype.getAtletaById = function (id) {
        var questo = this;
        var atl = {};
        this.atleti.forEach(function (item, idx) {
            if (item.doc.id == id) {
                atl = item.doc;
                atl.categoria = questo.getCategoria(atl.datanascita, null);
            }
        });
        return atl;
    };
    Backend = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], Backend);
    return Backend;
}());
exports.Backend = Backend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBR3hELGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUI7SUFTSSxpQkFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFQN0IsWUFBTyxHQUFHLDJCQUEyQixDQUFDO1FBQ3RDLFVBQUssR0FBQyxPQUFPLENBQUM7UUFDZCxXQUFNLEdBQUMsRUFBRSxDQUFDO1FBQ1YsU0FBSSxHQUFDLEVBQUUsQ0FBQztRQUNSLGVBQVUsR0FBTSxFQUFFLENBQUM7SUFLbkIsQ0FBQztJQUdELDJCQUFTLEdBQVQsVUFBVSxHQUFHLEVBQUUsUUFBUTtRQUVuQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsR0FBRyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWxDLENBQUM7WUFBQyxJQUFJO2dCQUFDLEdBQUcsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV6QyxDQUFDO1FBR0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUFDLFFB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XCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2VuZCB7XG4gICAgLy9yb290dXJsPVwiaHR0cHM6Ly9icGVpdGFseS5teWJsdWVtaXgubmV0XCI7XG4gICAgcm9vdHVybCA9IFwiaHR0cDovL3RrZHIuaGVyb2t1YXBwLmNvbVwiO1xuICAgIHRva2VuPVwidG9rZW5cIjtcbiAgICBhdGxldGk9W107XG4gICAgY2hhdD1bXTtcbiAgICBhY3RpdmVnYXJhOiBhbnk9e307XG5cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwKSB7XG5cbiAgICB9XG5cblxuICAgIGZldGNoRGF0YSh1cmwsIGNhbGxiYWNrKSB7XG4gICAgICAgIC8vKFwiZmV0Y2hkYXRhXCIpO1xuICAgICAgICBpZiAodXJsLmluZGV4T2YoXCJ0b2tlblwiKSA9PSAtMSkge1xuICAgICAgICAgICAgaWYgKHVybC5pbmRleE9mKFwiP1wiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdXJsICs9IFwiJnRva2VuPVwiICsgdGhpcy50b2tlbjtcblxuICAgICAgICAgICAgfSBlbHNlIHVybCArPSBcIj90b2tlbj1cIiArIHRoaXMudG9rZW47XG5cbiAgICAgICAgfVxuICAgICAgICAvL3V0aWxzLmNvbG9nKFwiY2FsbGluZyB1cmwgXCIsIHVybCk7XG5cbiAgICAgICAgdGhpcy5odHRwLmdldCh1cmwpLm1hcCgocmVzKSA9PiByZXMuanNvbigpKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IGRhdGFcIixkYXRhKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNlY3V0aXZlLWJsYW5rLWxpbmVzXG5cbiAgZ2V0Q2F0ZWdvcmlhKGRuLCByZWZlcnJhbERhdGUpIHtcbiAgICBcbiAgICAgICAgdmFyIGNhdCA9IFwic2VuaW9yIGFcIjtcbiAgICAgICAgdmFyIGN1cnllYXI6IGFueSA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImN1cnllYXIgXCIrY3VyeWVhcilcbiAgICAgICAgLy9pZiAoIWpjdXJyZW50Z2FyYS5kYXRhKSB1c2VDdXJyZW50RGF0ZSA9IHRydWU7XG4gICAgICAgIGlmIChyZWZlcnJhbERhdGUpIHtcbiAgICAgICAgICB2YXIgYXJyZCA9IHJlZmVycmFsRGF0ZS5zcGxpdChcIi9cIik7XG4gICAgICAgICAgdmFyIGFubm9nYXJhID0gYXJyZFsyXTtcbiAgICAgICAgICBjdXJ5ZWFyID0gYW5ub2dhcmE7XG4gICAgICAgIH1cbiAgICAgICAgLy9zZGVidWcoXCJjdXJ5ZWFyOiBcIitjdXJ5ZWFyKTtcbiAgICBcbiAgICAgICAgaWYgKGRuLnRyaW0oKSA9PSBcIlwiKSB7XG4gICAgICAgICAgcmV0dXJuIFwic2VuaW9yIGJcIjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXIgPSBkbi5zcGxpdChcIi5cIik7XG4gICAgICAgIHZhciBieWVhciA9IGFyWzJdO1xuICAgIFxuICAgICAgICB2YXIgZXRhID0gcGFyc2VJbnQoY3VyeWVhciwgMTApIC0gcGFyc2VJbnQoYnllYXIsIDEwKTtcbiAgICAgICAgLy9zZGVidWcoXCJjYWxjb2xvIGV0w6A6IFwiK2V0YSk7XG4gICAgXG4gICAgICAgIGlmICgoZXRhID49IDE4KSAmJiAoZXRhIDw9IDM1KSkgY2F0ID0gXCJzZW5pb3IgYVwiO1xuICAgICAgICBpZiAoKGV0YSA+PSAxNSkgJiYgKGV0YSA8PSAxNykpIGNhdCA9IFwianVuaW9yXCI7XG4gICAgICAgIGlmICgoZXRhID49IDEyKSAmJiAoZXRhIDw9IDE0KSkgY2F0ID0gXCJjYWRldHRpIGFcIjtcbiAgICAgICAgaWYgKChldGEgPj0gMTApICYmIChldGEgPD0gMTEpKSBjYXQgPSBcImNhZGV0dGkgYlwiO1xuICAgICAgICBpZiAoZXRhID4gMzUpIGNhdCA9IFwic2VuaW9yIGJcIjtcbiAgICAgICAgaWYgKGV0YSA8IDEwKSBjYXQgPSBcImVzb3JkaWVudGlcIjtcbiAgICBcbiAgICBcbiAgICAgICAgcmV0dXJuIGNhdFxuICAgIFxuICAgICAgfVxuXG5cblxuXG4gIGdldEF0bGV0YUJ5SWQoaWQpIHtcbiAgICB2YXIgcXVlc3RvPXRoaXM7XG4gICAgdmFyIGF0bDogYW55ID0ge307XG4gICAgLy9jb25zb2xlLmxvZyhcImF0bGV0aVwiLHRoaXMuYXRsZXRpKTtcbiAgICB0aGlzLmF0bGV0aS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcbiAgICAgIC8vY29uc29sZS5sb2coaXRlbSk7XG4gICAgICBpZiAoaXRlbS5kb2MuaWQgPT0gaWQpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRyb3ZhdG8gISFcIik7XG4gICAgICAgIGF0bCA9IGl0ZW0uZG9jO1xuICAgICAgICBhdGwuY2F0ZWdvcmlhPXF1ZXN0by5nZXRDYXRlZ29yaWEoYXRsLmRhdGFuYXNjaXRhLG51bGwpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGF0bDtcbiAgfVxuXG5cbn1cbiJdfQ==