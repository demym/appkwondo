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
var subscribeToResult_1 = require("../util/subscribeToResult");
var OuterSubscriber_1 = require("../OuterSubscriber");
function bufferToggle(openings, closingSelector) {
    return this.lift(new BufferToggleOperator(openings, closingSelector));
}
exports.bufferToggle = bufferToggle;
var BufferToggleOperator = (function () {
    function BufferToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    BufferToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return BufferToggleOperator;
}());
var BufferToggleSubscriber = (function (_super) {
    __extends(BufferToggleSubscriber, _super);
    function BufferToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(subscribeToResult_1.subscribeToResult(_this, openings));
        return _this;
    }
    BufferToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        var len = contexts.length;
        for (var i = 0; i < len; i++) {
            contexts[i].buffer.push(value);
        }
    };
    BufferToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._error.call(this, err);
    };
    BufferToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        while (contexts.length > 0) {
            var context = contexts.shift();
            this.destination.next(context.buffer);
            context.subscription.unsubscribe();
            context.buffer = null;
            context.subscription = null;
        }
        this.contexts = null;
        _super.prototype._complete.call(this);
    };
    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
    };
    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
        this.closeBuffer(innerSub.context);
    };
    BufferToggleSubscriber.prototype.openBuffer = function (value) {
        try {
            var closingSelector = this.closingSelector;
            var closingNotifier = closingSelector.call(this, value);
            if (closingNotifier) {
                this.trySubscribe(closingNotifier);
            }
        }
        catch (err) {
            this._error(err);
        }
    };
    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
        var contexts = this.contexts;
        if (contexts && context) {
            var buffer = context.buffer, subscription = context.subscription;
            this.destination.next(buffer);
            contexts.splice(contexts.indexOf(context), 1);
            this.remove(subscription);
            subscription.unsubscribe();
        }
    };
    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
        var contexts = this.contexts;
        var buffer = [];
        var subscription = new Subscription_1.Subscription();
        var context = { buffer: buffer, subscription: subscription };
        contexts.push(context);
        var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
        if (!innerSubscription || innerSubscription.closed) {
            this.closeBuffer(context);
        }
        else {
            innerSubscription.context = context;
            this.add(innerSubscription);
            subscription.add(innerSubscription);
        }
    };
    return BufferToggleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyVG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVmZmVyVG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLGdEQUErQztBQUUvQywrREFBOEQ7QUFDOUQsc0RBQXFEO0FBeUNyRCxzQkFBd0QsUUFBa0MsRUFDdkQsZUFBeUQ7SUFDMUYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBTyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBSEQsb0NBR0M7QUFFRDtJQUVFLDhCQUFvQixRQUFrQyxFQUNsQyxlQUF5RDtRQUR6RCxhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBMEM7SUFDN0UsQ0FBQztJQUVELG1DQUFJLEdBQUosVUFBSyxVQUEyQixFQUFFLE1BQVc7UUFDM0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQVlEO0lBQTJDLDBDQUFxQjtJQUc5RCxnQ0FBWSxXQUE0QixFQUNwQixRQUFrQyxFQUNsQyxlQUFnRTtRQUZwRixZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUptQixjQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxxQkFBZSxHQUFmLGVBQWUsQ0FBaUQ7UUFKNUUsY0FBUSxHQUE0QixFQUFFLENBQUM7UUFNN0MsS0FBSSxDQUFDLEdBQUcsQ0FBQyxxQ0FBaUIsQ0FBQyxLQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQzs7SUFDOUMsQ0FBQztJQUVTLHNDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMs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eyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpYmFibGVPclByb21pc2UgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5cbmltcG9ydCB7IHN1YnNjcmliZVRvUmVzdWx0IH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUb1Jlc3VsdCc7XG5pbXBvcnQgeyBPdXRlclN1YnNjcmliZXIgfSBmcm9tICcuLi9PdXRlclN1YnNjcmliZXInO1xuaW1wb3J0IHsgSW5uZXJTdWJzY3JpYmVyIH0gZnJvbSAnLi4vSW5uZXJTdWJzY3JpYmVyJztcblxuLyoqXG4gKiBCdWZmZXJzIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgc3RhcnRpbmcgZnJvbSBhbiBlbWlzc2lvbiBmcm9tXG4gKiBgb3BlbmluZ3NgIGFuZCBlbmRpbmcgd2hlbiB0aGUgb3V0cHV0IG9mIGBjbG9zaW5nU2VsZWN0b3JgIGVtaXRzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5Db2xsZWN0cyB2YWx1ZXMgZnJvbSB0aGUgcGFzdCBhcyBhbiBhcnJheS4gU3RhcnRzXG4gKiBjb2xsZWN0aW5nIG9ubHkgd2hlbiBgb3BlbmluZ2AgZW1pdHMsIGFuZCBjYWxscyB0aGUgYGNsb3NpbmdTZWxlY3RvcmBcbiAqIGZ1bmN0aW9uIHRvIGdldCBhbiBPYnNlcnZhYmxlIHRoYXQgdGVsbHMgd2hlbiB0byBjbG9zZSB0aGUgYnVmZmVyLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2J1ZmZlclRvZ2dsZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBCdWZmZXJzIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgYnkgb3BlbmluZyB0aGUgYnVmZmVyIHZpYSBzaWduYWxzIGZyb20gYW5cbiAqIE9ic2VydmFibGUgcHJvdmlkZWQgdG8gYG9wZW5pbmdzYCwgYW5kIGNsb3NpbmcgYW5kIHNlbmRpbmcgdGhlIGJ1ZmZlcnMgd2hlblxuICogYSBTdWJzY3JpYmFibGUgb3IgUHJvbWlzZSByZXR1cm5lZCBieSB0aGUgYGNsb3NpbmdTZWxlY3RvcmAgZnVuY3Rpb24gZW1pdHMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+RXZlcnkgb3RoZXIgc2Vjb25kLCBlbWl0IHRoZSBjbGljayBldmVudHMgZnJvbSB0aGUgbmV4dCA1MDBtczwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgb3BlbmluZ3MgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICogdmFyIGJ1ZmZlcmVkID0gY2xpY2tzLmJ1ZmZlclRvZ2dsZShvcGVuaW5ncywgaSA9PlxuICogICBpICUgMiA/IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoNTAwKSA6IFJ4Lk9ic2VydmFibGUuZW1wdHkoKVxuICogKTtcbiAqIGJ1ZmZlcmVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBidWZmZXJ9XG4gKiBAc2VlIHtAbGluayBidWZmZXJDb3VudH1cbiAqIEBzZWUge0BsaW5rIGJ1ZmZlclRpbWV9XG4gKiBAc2VlIHtAbGluayBidWZmZXJXaGVufVxuICogQHNlZSB7QGxpbmsgd2luZG93VG9nZ2xlfVxuICpcbiAqIEBwYXJhbSB7U3Vic2NyaWJhYmxlT3JQcm9taXNlPE8+fSBvcGVuaW5ncyBBIFN1YnNjcmliYWJsZSBvciBQcm9taXNlIG9mIG5vdGlmaWNhdGlvbnMgdG8gc3RhcnQgbmV3XG4gKiBidWZmZXJzLlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogTyk6IFN1YnNjcmliYWJsZU9yUHJvbWlzZX0gY2xvc2luZ1NlbGVjdG9yIEEgZnVuY3Rpb24gdGhhdCB0YWtlc1xuICogdGhlIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIGBvcGVuaW5nc2Agb2JzZXJ2YWJsZSBhbmQgcmV0dXJucyBhIFN1YnNjcmliYWJsZSBvciBQcm9taXNlLFxuICogd2hpY2gsIHdoZW4gaXQgZW1pdHMsIHNpZ25hbHMgdGhhdCB0aGUgYXNzb2NpYXRlZCBidWZmZXIgc2hvdWxkIGJlIGVtaXR0ZWRcbiAqIGFuZCBjbGVhcmVkLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxUW10+fSBBbiBvYnNlcnZhYmxlIG9mIGFycmF5cyBvZiBidWZmZXJlZCB2YWx1ZXMuXG4gKiBAbWV0aG9kIGJ1ZmZlclRvZ2dsZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlclRvZ2dsZTxULCBPPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBvcGVuaW5nczogU3Vic2NyaWJhYmxlT3JQcm9taXNlPE8+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zaW5nU2VsZWN0b3I6ICh2YWx1ZTogTykgPT4gU3Vic2NyaWJhYmxlT3JQcm9taXNlPGFueT4pOiBPYnNlcnZhYmxlPFRbXT4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBCdWZmZXJUb2dnbGVPcGVyYXRvcjxULCBPPihvcGVuaW5ncywgY2xvc2luZ1NlbGVjdG9yKSk7XG59XG5cbmNsYXNzIEJ1ZmZlclRvZ2dsZU9wZXJhdG9yPFQsIE8+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVFtdPiB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcGVuaW5nczogU3Vic2NyaWJhYmxlT3JQcm9taXNlPE8+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNsb3NpbmdTZWxlY3RvcjogKHZhbHVlOiBPKSA9PiBTdWJzY3JpYmFibGVPclByb21pc2U8YW55Pikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPFRbXT4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgQnVmZmVyVG9nZ2xlU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLm9wZW5pbmdzLCB0aGlzLmNsb3NpbmdTZWxlY3RvcikpO1xuICB9XG59XG5cbmludGVyZmFjZSBCdWZmZXJDb250ZXh0PFQ+IHtcbiAgYnVmZmVyOiBUW107XG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgQnVmZmVyVG9nZ2xlU3Vic2NyaWJlcjxULCBPPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBPPiB7XG4gIHByaXZhdGUgY29udGV4dHM6IEFycmF5PEJ1ZmZlckNvbnRleHQ8VD4+ID0gW107XG5cbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8VFtdPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBvcGVuaW5nczogU3Vic2NyaWJhYmxlT3JQcm9taXNlPE8+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNsb3NpbmdTZWxlY3RvcjogKHZhbHVlOiBPKSA9PiBTdWJzY3JpYmFibGVPclByb21pc2U8YW55PiB8IHZvaWQpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gICAgdGhpcy5hZGQoc3Vic2NyaWJlVG9SZXN1bHQodGhpcywgb3BlbmluZ3MpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfbmV4dCh2YWx1ZTogVCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRleHRzID0gdGhpcy5jb250ZXh0cztcbiAgICBjb25zdCBsZW4gPSBjb250ZXh0cy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29udGV4dHNbaV0uYnVmZmVyLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0cyA9IHRoaXMuY29udGV4dHM7XG4gICAgd2hpbGUgKGNvbnRleHRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBjb250ZXh0cy5zaGlmdCgpO1xuICAgICAgY29udGV4dC5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIGNvbnRleHQuYnVmZmVyID0gbnVsbDtcbiAgICAgIGNvbnRleHQuc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0cyA9IG51bGw7XG4gICAgc3VwZXIuX2Vycm9yKGVycik7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRleHRzID0gdGhpcy5jb250ZXh0cztcbiAgICB3aGlsZSAoY29udGV4dHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRzLnNoaWZ0KCk7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoY29udGV4dC5idWZmZXIpO1xuICAgICAgY29udGV4dC5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIGNvbnRleHQuYnVmZmVyID0gbnVsbDtcbiAgICAgIGNvbnRleHQuc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0cyA9IG51bGw7XG4gICAgc3VwZXIuX2NvbXBsZXRlKCk7XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IGFueSwgaW5uZXJWYWx1ZTogTyxcbiAgICAgICAgICAgICBvdXRlckluZGV4OiBudW1iZXIsIGlubmVySW5kZXg6IG51bWJlcixcbiAgICAgICAgICAgICBpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIE8+KTogdm9pZCB7XG4gICAgb3V0ZXJWYWx1ZSA/IHRoaXMuY2xvc2VCdWZmZXIob3V0ZXJWYWx1ZSkgOiB0aGlzLm9wZW5CdWZmZXIoaW5uZXJWYWx1ZSk7XG4gIH1cblxuICBub3RpZnlDb21wbGV0ZShpbm5lclN1YjogSW5uZXJTdWJzY3JpYmVyPFQsIE8+KTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZUJ1ZmZlcigoPGFueT4gaW5uZXJTdWIpLmNvbnRleHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBvcGVuQnVmZmVyKHZhbHVlOiBPKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNsb3NpbmdTZWxlY3RvciA9IHRoaXMuY2xvc2luZ1NlbGVjdG9yO1xuICAgICAgY29uc3QgY2xvc2luZ05vdGlmaWVyID0gY2xvc2luZ1NlbGVjdG9yLmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgaWYgKGNsb3NpbmdOb3RpZmllcikge1xuICAgICAgICB0aGlzLnRyeVN1YnNjcmliZShjbG9zaW5nTm90aWZpZXIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsb3NlQnVmZmVyKGNvbnRleHQ6IEJ1ZmZlckNvbnRleHQ8VD4pOiB2b2lkIHtcbiAgICBjb25zdCBjb250ZXh0cyA9IHRoaXMuY29udGV4dHM7XG5cbiAgICBpZiAoY29udGV4dHMgJiYgY29udGV4dCkge1xuICAgICAgY29uc3QgeyBidWZmZXIsIHN1YnNjcmlwdGlvbiB9ID0gY29udGV4dDtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChidWZmZXIpO1xuICAgICAgY29udGV4dHMuc3BsaWNlKGNvbnRleHRzLmluZGV4T2YoY29udGV4dCksIDEpO1xuICAgICAgdGhpcy5yZW1vdmUoc3Vic2NyaXB0aW9uKTtcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJ5U3Vic2NyaWJlKGNsb3NpbmdOb3RpZmllcjogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY29udGV4dHMgPSB0aGlzLmNvbnRleHRzO1xuXG4gICAgY29uc3QgYnVmZmVyOiBBcnJheTxUPiA9IFtdO1xuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICBjb25zdCBjb250ZXh0ID0geyBidWZmZXIsIHN1YnNjcmlwdGlvbiB9O1xuICAgIGNvbnRleHRzLnB1c2goY29udGV4dCk7XG5cbiAgICBjb25zdCBpbm5lclN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIGNsb3NpbmdOb3RpZmllciwgPGFueT5jb250ZXh0KTtcblxuICAgIGlmICghaW5uZXJTdWJzY3JpcHRpb24gfHwgaW5uZXJTdWJzY3JpcHRpb24uY2xvc2VkKSB7XG4gICAgICB0aGlzLmNsb3NlQnVmZmVyKGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAoPGFueT4gaW5uZXJTdWJzY3JpcHRpb24pLmNvbnRleHQgPSBjb250ZXh0O1xuXG4gICAgICB0aGlzLmFkZChpbm5lclN1YnNjcmlwdGlvbik7XG4gICAgICBzdWJzY3JpcHRpb24uYWRkKGlubmVyU3Vic2NyaXB0aW9uKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==