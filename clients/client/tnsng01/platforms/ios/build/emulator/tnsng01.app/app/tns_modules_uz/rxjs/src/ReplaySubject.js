"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("./Subject");
var queue_1 = require("./scheduler/queue");
var Subscription_1 = require("./Subscription");
var observeOn_1 = require("./operator/observeOn");
var ObjectUnsubscribedError_1 = require("./util/ObjectUnsubscribedError");
var SubjectSubscription_1 = require("./SubjectSubscription");
var ReplaySubject = (function (_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
        var _this = _super.call(this) || this;
        _this.scheduler = scheduler;
        _this._events = [];
        _this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
        _this._windowTime = windowTime < 1 ? 1 : windowTime;
        return _this;
    }
    ReplaySubject.prototype.next = function (value) {
        var now = this._getNow();
        this._events.push(new ReplayEvent(now, value));
        this._trimBufferThenGetEvents();
        _super.prototype.next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function (subscriber) {
        var _events = this._trimBufferThenGetEvents();
        var scheduler = this.scheduler;
        var subscription;
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscription = Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
        if (scheduler) {
            subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
        }
        var len = _events.length;
        for (var i = 0; i < len && !subscriber.closed; i++) {
            subscriber.next(_events[i].value);
        }
        if (this.hasError) {
            subscriber.error(this.thrownError);
        }
        else if (this.isStopped) {
            subscriber.complete();
        }
        return subscription;
    };
    ReplaySubject.prototype._getNow = function () {
        return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
        var now = this._getNow();
        var _bufferSize = this._bufferSize;
        var _windowTime = this._windowTime;
        var _events = this._events;
        var eventsCount = _events.length;
        var spliceCount = 0;
        while (spliceCount < eventsCount) {
            if ((now - _events[spliceCount].time) < _windowTime) {
                break;
            }
            spliceCount++;
        }
        if (eventsCount > _bufferSize) {
            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
        }
        if (spliceCount > 0) {
            _events.splice(0, spliceCount);
        }
        return _events;
    };
    return ReplaySubject;
}(Subject_1.Subject));
exports.ReplaySubject = ReplaySubject;
var ReplayEvent = (function () {
    function ReplayEvent(time, value) {
        this.time = time;
        this.value = value;
    }
    return ReplayEvent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwbGF5U3ViamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJlcGxheVN1YmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW9DO0FBRXBDLDJDQUEwQztBQUUxQywrQ0FBOEM7QUFDOUMsa0RBQTJEO0FBQzNELDBFQUF5RTtBQUN6RSw2REFBNEQ7QUFJNUQ7SUFBc0MsaUNBQVU7SUFLOUMsdUJBQVksVUFBNkMsRUFDN0MsVUFBNkMsRUFDckMsU0FBc0I7UUFGOUIsMkJBQUEsRUFBQSxhQUFxQixNQUFNLENBQUMsaUJBQWlCO1FBQzdDLDJCQUFBLEVBQUEsYUFBcUIsTUFBTSxDQUFDLGlCQUFpQjtRQUR6RCxZQUdFLGlCQUFPLFNBR1I7UUFKbUIsZUFBUyxHQUFULFNBQVMsQ0FBYTtRQU5sQyxhQUFPLEdBQXFCLEVBQUUsQ0FBQztRQVFyQyxLQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUNuRCxLQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQzs7SUFDckQsQ0FBQztJQUVELDRCQUFJLEdBQUosVUFBSyxLQUFRO1FBQ1gsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLGlCQUFNLElBQUksWUFBQyxLQUFLLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRVMsa0NBQVUsR0FBcEIsVUFBcUIsVUFBeUI7UUFDNUMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNB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QUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXZGRCxDQUFzQyxpQkFBTyxHQXVGNUM7QUF2Rlksc0NBQWE7QUF5RjFCO0lBQ0UscUJBQW1CLElBQVksRUFBUyxLQUFRO1FBQTdCLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFHO0lBQ2hELENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vU3ViamVjdCc7XG5pbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi9TY2hlZHVsZXInO1xuaW1wb3J0IHsgcXVldWUgfSBmcm9tICcuL3NjaGVkdWxlci9xdWV1ZSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE9ic2VydmVPblN1YnNjcmliZXIgfSBmcm9tICcuL29wZXJhdG9yL29ic2VydmVPbic7XG5pbXBvcnQgeyBPYmplY3RVbnN1YnNjcmliZWRFcnJvciB9IGZyb20gJy4vdXRpbC9PYmplY3RVbnN1YnNjcmliZWRFcnJvcic7XG5pbXBvcnQgeyBTdWJqZWN0U3Vic2NyaXB0aW9uIH0gZnJvbSAnLi9TdWJqZWN0U3Vic2NyaXB0aW9uJztcbi8qKlxuICogQGNsYXNzIFJlcGxheVN1YmplY3Q8VD5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlcGxheVN1YmplY3Q8VD4gZXh0ZW5kcyBTdWJqZWN0PFQ+IHtcbiAgcHJpdmF0ZSBfZXZlbnRzOiBSZXBsYXlFdmVudDxUPltdID0gW107XG4gIHByaXZhdGUgX2J1ZmZlclNpemU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfd2luZG93VGltZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGJ1ZmZlclNpemU6IG51bWJlciA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgICAgICAgd2luZG93VGltZTogbnVtYmVyID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLFxuICAgICAgICAgICAgICBwcml2YXRlIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2J1ZmZlclNpemUgPSBidWZmZXJTaXplIDwgMSA/IDEgOiBidWZmZXJTaXplO1xuICAgIHRoaXMuX3dpbmRvd1RpbWUgPSB3aW5kb3dUaW1lIDwgMSA/IDEgOiB3aW5kb3dUaW1lO1xuICB9XG5cbiAgbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IG5vdyA9IHRoaXMuX2dldE5vdygpO1xuICAgIHRoaXMuX2V2ZW50cy5wdXNoKG5ldyBSZXBsYXlFdmVudChub3csIHZhbHVlKSk7XG4gICAgdGhpcy5fdHJpbUJ1ZmZlclRoZW5HZXRFdmVudHMoKTtcbiAgICBzdXBlci5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8VD4pOiBTdWJzY3JpcHRpb24ge1xuICAgIGNvbnN0IF9ldmVudHMgPSB0aGlzLl90cmltQnVmZmVyVGhlbkdldEV2ZW50cygpO1xuICAgIGNvbnN0IHNjaGVkdWxlciA9IHRoaXMuc2NoZWR1bGVyO1xuICAgIGxldCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgdGhyb3cgbmV3IE9iamVjdFVuc3Vic2NyaWJlZEVycm9yKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc0Vycm9yKSB7XG4gICAgICBzdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgc3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9ic2VydmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YmplY3RTdWJzY3JpcHRpb24odGhpcywgc3Vic2NyaWJlcik7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVkdWxlcikge1xuICAgICAgc3Vic2NyaWJlci5hZGQoc3Vic2NyaWJlciA9IG5ldyBPYnNlcnZlT25TdWJzY3JpYmVyPFQ+KHN1YnNjcmliZXIsIHNjaGVkdWxlcikpO1xuICAgIH1cblxuICAgIGNvbnN0IGxlbiA9IF9ldmVudHMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuICYmICFzdWJzY3JpYmVyLmNsb3NlZDsgaSsrKSB7XG4gICAgICBzdWJzY3JpYmVyLm5leHQoX2V2ZW50c1tpXS52YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGFzRXJyb3IpIHtcbiAgICAgIHN1YnNjcmliZXIuZXJyb3IodGhpcy50aHJvd25FcnJvcik7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gIH1cblxuICBfZ2V0Tm93KCk6IG51bWJlciB7XG4gICAgcmV0dXJuICh0aGlzLnNjaGVkdWxlciB8fCBxdWV1ZSkubm93KCk7XG4gIH1cblxuICBwcml2YXRlIF90cmltQnVmZmVyVGhlbkdldEV2ZW50cygpOiBSZXBsYXlFdmVudDxUPltdIHtcbiAgICBjb25zdCBub3cgPSB0aGlzLl9nZXROb3coKTtcbiAgICBjb25zdCBfYnVmZmVyU2l6ZSA9IHRoaXMuX2J1ZmZlclNpemU7XG4gICAgY29uc3QgX3dpbmRvd1RpbWUgPSB0aGlzLl93aW5kb3dUaW1lO1xuICAgIGNvbnN0IF9ldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgICBsZXQgZXZlbnRzQ291bnQgPSBfZXZlbnRzLmxlbmd0aDtcbiAgICBsZXQgc3BsaWNlQ291bnQgPSAwO1xuXG4gICAgLy8gVHJpbSBldmVudHMgdGhhdCBmYWxsIG91dCBvZiB0aGUgdGltZSB3aW5kb3cuXG4gICAgLy8gU3RhcnQgYXQgdGhlIGZyb250IG9mIHRoZSBsaXN0LiBCcmVhayBlYXJseSBvbmNlXG4gICAgLy8gd2UgZW5jb3VudGVyIGFuIGV2ZW50IHRoYXQgZmFsbHMgd2l0aGluIHRoZSB3aW5kb3cuXG4gICAgd2hpbGUgKHNwbGljZUNvdW50IDwgZXZlbnRzQ291bnQpIHtcbiAgICAgIGlmICgobm93IC0gX2V2ZW50c1tzcGxpY2VDb3VudF0udGltZSkgPCBfd2luZG93VGltZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHNwbGljZUNvdW50Kys7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50c0NvdW50ID4gX2J1ZmZlclNpemUpIHtcbiAgICAgIHNwbGljZUNvdW50ID0gTWF0aC5tYXgoc3BsaWNlQ291bnQsIGV2ZW50c0NvdW50IC0gX2J1ZmZlclNpemUpO1xuICAgIH1cblxuICAgIGlmIChzcGxpY2VDb3VudCA+IDApIHtcbiAgICAgIF9ldmVudHMuc3BsaWNlKDAsIHNwbGljZUNvdW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gX2V2ZW50cztcbiAgfVxufVxuXG5jbGFzcyBSZXBsYXlFdmVudDxUPiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0aW1lOiBudW1iZXIsIHB1YmxpYyB2YWx1ZTogVCkge1xuICB9XG59XG4iXX0=