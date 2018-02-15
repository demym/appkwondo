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
var Subscription_1 = require("../Subscription");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
function bufferWhen(closingSelector) {
    return this.lift(new BufferWhenOperator(closingSelector));
}
exports.bufferWhen = bufferWhen;
var BufferWhenOperator = (function () {
    function BufferWhenOperator(closingSelector) {
        this.closingSelector = closingSelector;
    }
    BufferWhenOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
    };
    return BufferWhenOperator;
}());
var BufferWhenSubscriber = (function (_super) {
    __extends(BufferWhenSubscriber, _super);
    function BufferWhenSubscriber(destination, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.closingSelector = closingSelector;
        _this.subscribing = false;
        _this.openBuffer();
        return _this;
    }
    BufferWhenSubscriber.prototype._next = function (value) {
        this.buffer.push(value);
    };
    BufferWhenSubscriber.prototype._complete = function () {
        var buffer = this.buffer;
        if (buffer) {
            this.destination.next(buffer);
        }
        _super.prototype._complete.call(this);
    };
    BufferWhenSubscriber.prototype._unsubscribe = function () {
        this.buffer = null;
        this.subscribing = false;
    };
    BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.openBuffer();
    };
    BufferWhenSubscriber.prototype.notifyComplete = function () {
        if (this.subscribing) {
            this.complete();
        }
        else {
            this.openBuffer();
        }
    };
    BufferWhenSubscriber.prototype.openBuffer = function () {
        var closingSubscription = this.closingSubscription;
        if (closingSubscription) {
            this.remove(closingSubscription);
            closingSubscription.unsubscribe();
        }
        var buffer = this.buffer;
        if (this.buffer) {
            this.destination.next(buffer);
        }
        this.buffer = [];
        var closingNotifier = tryCatch_1.tryCatch(this.closingSelector)();
        if (closingNotifier === errorObject_1.errorObject) {
            this.error(errorObject_1.errorObject.e);
        }
        else {
            closingSubscription = new Subscription_1.Subscription();
            this.closingSubscription = closingSubscription;
            this.add(closingSubscription);
            this.subscribing = true;
            closingSubscription.add(subscribeToResult_1.subscribeToResult(this, closingNotifier));
            this.subscribing = false;
        }
    };
    return BufferWhenSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyV2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJ1ZmZlcldoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0EsZ0RBQStDO0FBQy9DLDZDQUE0QztBQUM1QyxtREFBa0Q7QUFFbEQsc0RBQXFEO0FBRXJELCtEQUE4RDtBQW1DOUQsb0JBQW1ELGVBQXNDO0lBQ3ZGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksa0JBQWtCLENBQUksZUFBZSxDQUFDLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBRkQsZ0NBRUM7QUFFRDtJQUVFLDRCQUFvQixlQUFzQztRQUF0QyxvQkFBZSxHQUFmLGVBQWUsQ0FBdUI7SUFDMUQsQ0FBQztJQUVELGlDQUFJLEdBQUosVUFBSyxVQUEyQixFQUFFLE1BQVc7UUFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFPRDtJQUFzQyx3Q0FBdUI7SUFLM0QsOEJBQVksV0FBNEIsRUFBVSxlQUFzQztRQUF4RixZQUNFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUhpRCxxQkFBZSxHQUFmLGVBQWUsQ0FBdUI7UUFIaEYsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFLbkMsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztJQUNwQixDQUFDO0lBRVMsb0NBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFUyx3Q0FBUyxHQUFuQjtRQUNFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxpQkFBTSxTQUFTLFdBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsMkNBQVksR0FBdEI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLFVBQWEsRUFBRSxVQUFlLEVBQzlCLFVBQWtCLEVBQUUsVUFBa0IsRUFDdEMsUUFBaUM7UUFDMUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCw2Q0FBYyxHQUFkO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQztJQUVELHlDQUFVLEdBQVY7UUFFUSxJQUFBLDhDQUFtQixDQUFVO1FBRW5DLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDakMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQU0sZUFBZSxHQUFHLG1CQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7UUFFekQsRUFBRSxDQUFDLENBQUMsZUFBZSxLQUFLLHlCQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixtQkFBbUIsR0FBRyxJQUFJLDJCQUFZLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7WUFDL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxxQ0FBaUIsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQXRFRCxDQUFzQyxpQ0FBZSxHQXNFcEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gJy4uL3V0aWwvdHJ5Q2F0Y2gnO1xuaW1wb3J0IHsgZXJyb3JPYmplY3QgfSBmcm9tICcuLi91dGlsL2Vycm9yT2JqZWN0JztcblxuaW1wb3J0IHsgT3V0ZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vT3V0ZXJTdWJzY3JpYmVyJztcbmltcG9ydCB7IElubmVyU3Vic2NyaWJlciB9IGZyb20gJy4uL0lubmVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBzdWJzY3JpYmVUb1Jlc3VsdCB9IGZyb20gJy4uL3V0aWwvc3Vic2NyaWJlVG9SZXN1bHQnO1xuXG4vKipcbiAqIEJ1ZmZlcnMgdGhlIHNvdXJjZSBPYnNlcnZhYmxlIHZhbHVlcywgdXNpbmcgYSBmYWN0b3J5IGZ1bmN0aW9uIG9mIGNsb3NpbmdcbiAqIE9ic2VydmFibGVzIHRvIGRldGVybWluZSB3aGVuIHRvIGNsb3NlLCBlbWl0LCBhbmQgcmVzZXQgdGhlIGJ1ZmZlci5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+Q29sbGVjdHMgdmFsdWVzIGZyb20gdGhlIHBhc3QgYXMgYW4gYXJyYXkuIFdoZW4gaXRcbiAqIHN0YXJ0cyBjb2xsZWN0aW5nIHZhbHVlcywgaXQgY2FsbHMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0XG4gKiB0ZWxscyB3aGVuIHRvIGNsb3NlIHRoZSBidWZmZXIgYW5kIHJlc3RhcnQgY29sbGVjdGluZy48L3NwYW4+XG4gKlxuICogPGltZyBzcmM9XCIuL2ltZy9idWZmZXJXaGVuLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIE9wZW5zIGEgYnVmZmVyIGltbWVkaWF0ZWx5LCB0aGVuIGNsb3NlcyB0aGUgYnVmZmVyIHdoZW4gdGhlIG9ic2VydmFibGVcbiAqIHJldHVybmVkIGJ5IGNhbGxpbmcgYGNsb3NpbmdTZWxlY3RvcmAgZnVuY3Rpb24gZW1pdHMgYSB2YWx1ZS4gV2hlbiBpdCBjbG9zZXNcbiAqIHRoZSBidWZmZXIsIGl0IGltbWVkaWF0ZWx5IG9wZW5zIGEgbmV3IGJ1ZmZlciBhbmQgcmVwZWF0cyB0aGUgcHJvY2Vzcy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IGFuIGFycmF5IG9mIHRoZSBsYXN0IGNsaWNrcyBldmVyeSBbMS01XSByYW5kb20gc2Vjb25kczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgYnVmZmVyZWQgPSBjbGlja3MuYnVmZmVyV2hlbigoKSA9PlxuICogICBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDAgKyBNYXRoLnJhbmRvbSgpICogNDAwMClcbiAqICk7XG4gKiBidWZmZXJlZC5zdWJzY3JpYmUoeCA9PiBjb25zb2xlLmxvZyh4KSk7XG4gKlxuICogQHNlZSB7QGxpbmsgYnVmZmVyfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyQ291bnR9XG4gKiBAc2VlIHtAbGluayBidWZmZXJUaW1lfVxuICogQHNlZSB7QGxpbmsgYnVmZmVyVG9nZ2xlfVxuICogQHNlZSB7QGxpbmsgd2luZG93V2hlbn1cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCk6IE9ic2VydmFibGV9IGNsb3NpbmdTZWxlY3RvciBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbm9cbiAqIGFyZ3VtZW50cyBhbmQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgc2lnbmFscyBidWZmZXIgY2xvc3VyZS5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8VFtdPn0gQW4gb2JzZXJ2YWJsZSBvZiBhcnJheXMgb2YgYnVmZmVyZWQgdmFsdWVzLlxuICogQG1ldGhvZCBidWZmZXJXaGVuXG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyV2hlbjxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBjbG9zaW5nU2VsZWN0b3I6ICgpID0+IE9ic2VydmFibGU8YW55Pik6IE9ic2VydmFibGU8VFtdPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IEJ1ZmZlcldoZW5PcGVyYXRvcjxUPihjbG9zaW5nU2VsZWN0b3IpKTtcbn1cblxuY2xhc3MgQnVmZmVyV2hlbk9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVFtdPiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbG9zaW5nU2VsZWN0b3I6ICgpID0+IE9ic2VydmFibGU8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFRbXT4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgQnVmZmVyV2hlblN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5jbG9zaW5nU2VsZWN0b3IpKTtcbiAgfVxufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQnVmZmVyV2hlblN1YnNjcmliZXI8VD4gZXh0ZW5kcyBPdXRlclN1YnNjcmliZXI8VCwgYW55PiB7XG4gIHByaXZhdGUgYnVmZmVyOiBUW107XG4gIHByaXZhdGUgc3Vic2NyaWJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBjbG9zaW5nU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VFtdPiwgcHJpdmF0ZSBjbG9zaW5nU2VsZWN0b3I6ICgpID0+IE9ic2VydmFibGU8YW55Pikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLm9wZW5CdWZmZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCkge1xuICAgIHRoaXMuYnVmZmVyLnB1c2godmFsdWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICBpZiAoYnVmZmVyKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoYnVmZmVyKTtcbiAgICB9XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3Vuc3Vic2NyaWJlKCkge1xuICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLnN1YnNjcmliaW5nID0gZmFsc2U7XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IFQsIGlubmVyVmFsdWU6IGFueSxcbiAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIGFueT4pOiB2b2lkIHtcbiAgICB0aGlzLm9wZW5CdWZmZXIoKTtcbiAgfVxuXG4gIG5vdGlmeUNvbXBsZXRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1YnNjcmliaW5nKSB7XG4gICAgICB0aGlzLmNvbXBsZXRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbkJ1ZmZlcigpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5CdWZmZXIoKSB7XG5cbiAgICBsZXQgeyBjbG9zaW5nU3Vic2NyaXB0aW9uIH0gPSB0aGlzO1xuXG4gICAgaWYgKGNsb3NpbmdTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucmVtb3ZlKGNsb3NpbmdTdWJzY3JpcHRpb24pO1xuICAgICAgY2xvc2luZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIGlmICh0aGlzLmJ1ZmZlcikge1xuICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgdGhpcy5idWZmZXIgPSBbXTtcblxuICAgIGNvbnN0IGNsb3NpbmdOb3RpZmllciA9IHRyeUNhdGNoKHRoaXMuY2xvc2luZ1NlbGVjdG9yKSgpO1xuXG4gICAgaWYgKGNsb3NpbmdOb3RpZmllciA9PT0gZXJyb3JPYmplY3QpIHtcbiAgICAgIHRoaXMuZXJyb3IoZXJyb3JPYmplY3QuZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb3NpbmdTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICB0aGlzLmNsb3NpbmdTdWJzY3JpcHRpb24gPSBjbG9zaW5nU3Vic2NyaXB0aW9uO1xuICAgICAgdGhpcy5hZGQoY2xvc2luZ1N1YnNjcmlwdGlvbik7XG4gICAgICB0aGlzLnN1YnNjcmliaW5nID0gdHJ1ZTtcbiAgICAgIGNsb3NpbmdTdWJzY3JpcHRpb24uYWRkKHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIGNsb3NpbmdOb3RpZmllcikpO1xuICAgICAgdGhpcy5zdWJzY3JpYmluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19