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
var Subject_1 = require("../Subject");
var Subscription_1 = require("../Subscription");
var tryCatch_1 = require("../util/tryCatch");
var errorObject_1 = require("../util/errorObject");
var OuterSubscriber_1 = require("../OuterSubscriber");
var subscribeToResult_1 = require("../util/subscribeToResult");
function windowToggle(openings, closingSelector) {
    return this.lift(new WindowToggleOperator(openings, closingSelector));
}
exports.windowToggle = windowToggle;
var WindowToggleOperator = (function () {
    function WindowToggleOperator(openings, closingSelector) {
        this.openings = openings;
        this.closingSelector = closingSelector;
    }
    WindowToggleOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
    };
    return WindowToggleOperator;
}());
var WindowToggleSubscriber = (function (_super) {
    __extends(WindowToggleSubscriber, _super);
    function WindowToggleSubscriber(destination, openings, closingSelector) {
        var _this = _super.call(this, destination) || this;
        _this.openings = openings;
        _this.closingSelector = closingSelector;
        _this.contexts = [];
        _this.add(_this.openSubscription = subscribeToResult_1.subscribeToResult(_this, openings, openings));
        return _this;
    }
    WindowToggleSubscriber.prototype._next = function (value) {
        var contexts = this.contexts;
        if (contexts) {
            var len = contexts.length;
            for (var i = 0; i < len; i++) {
                contexts[i].window.next(value);
            }
        }
    };
    WindowToggleSubscriber.prototype._error = function (err) {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.error(err);
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._error.call(this, err);
    };
    WindowToggleSubscriber.prototype._complete = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.complete();
                context.subscription.unsubscribe();
            }
        }
        _super.prototype._complete.call(this);
    };
    WindowToggleSubscriber.prototype._unsubscribe = function () {
        var contexts = this.contexts;
        this.contexts = null;
        if (contexts) {
            var len = contexts.length;
            var index = -1;
            while (++index < len) {
                var context = contexts[index];
                context.window.unsubscribe();
                context.subscription.unsubscribe();
            }
        }
    };
    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (outerValue === this.openings) {
            var closingSelector = this.closingSelector;
            var closingNotifier = tryCatch_1.tryCatch(closingSelector)(innerValue);
            if (closingNotifier === errorObject_1.errorObject) {
                return this.error(errorObject_1.errorObject.e);
            }
            else {
                var window_1 = new Subject_1.Subject();
                var subscription = new Subscription_1.Subscription();
                var context = { window: window_1, subscription: subscription };
                this.contexts.push(context);
                var innerSubscription = subscribeToResult_1.subscribeToResult(this, closingNotifier, context);
                if (innerSubscription.closed) {
                    this.closeWindow(this.contexts.length - 1);
                }
                else {
                    innerSubscription.context = context;
                    subscription.add(innerSubscription);
                }
                this.destination.next(window_1);
            }
        }
        else {
            this.closeWindow(this.contexts.indexOf(outerValue));
        }
    };
    WindowToggleSubscriber.prototype.notifyError = function (err) {
        this.error(err);
    };
    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
        if (inner !== this.openSubscription) {
            this.closeWindow(this.contexts.indexOf(inner.context));
        }
    };
    WindowToggleSubscriber.prototype.closeWindow = function (index) {
        if (index === -1) {
            return;
        }
        var contexts = this.contexts;
        var context = contexts[index];
        var window = context.window, subscription = context.subscription;
        contexts.splice(index, 1);
        window.complete();
        subscription.unsubscribe();
    };
    return WindowToggleSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93VG9nZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2luZG93VG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLHNDQUFxQztBQUNyQyxnREFBK0M7QUFFL0MsNkNBQTRDO0FBQzVDLG1EQUFrRDtBQUVsRCxzREFBcUQ7QUFFckQsK0RBQThEO0FBMkM5RCxzQkFBd0QsUUFBdUIsRUFDNUMsZUFBa0Q7SUFDbkYsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBb0IsQ0FBTyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQztBQUM5RSxDQUFDO0FBSEQsb0NBR0M7QUFFRDtJQUVFLDhCQUFvQixRQUF1QixFQUN2QixlQUFrRDtRQURsRCxhQUFRLEdBQVIsUUFBUSxDQUFlO1FBQ3ZCLG9CQUFlLEdBQWYsZUFBZSxDQUFtQztJQUN0RSxDQUFDO0lBRUQsbUNBQUksR0FBSixVQUFLLFVBQXFDLEVBQUUsTUFBVztRQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNCQUFzQixDQUNoRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUNoRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVlEO0lBQTJDLDBDQUF1QjtJQUloRSxnQ0FBWSxXQUFzQyxFQUM5QixRQUF1QixFQUN2QixlQUFrRDtRQUZ0RSxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUptQixjQUFRLEdBQVIsUUFBUSxDQUFlO1FBQ3ZCLHFCQUFlLEdBQWYsZUFBZSxDQUFtQztRQUw5RCxjQUFRLEdBQXVCLEVBQUUsQ0FBQztRQU94QyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxxQ0FBaUIsQ0FBQyxLQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7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QUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRUQsK0NBQWMsR0FBZCxVQUFlLEtBQW1CO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQVEsS0FBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDakUsQ0FBQztJQUNILENBQUM7SUFFTyw0Q0FBVyxHQUFuQixVQUFvQixLQUFhO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVPLElBQUEsd0JBQVEsQ0FBVTtRQUMxQixJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBQSx1QkFBTSxFQUFFLG1DQUFZLENBQWE7UUFDekMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xCLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBNUhELENBQTJDLGlDQUFlLEdBNEh6RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4uL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tICcuLi91dGlsL3RyeUNhdGNoJztcbmltcG9ydCB7IGVycm9yT2JqZWN0IH0gZnJvbSAnLi4vdXRpbC9lcnJvck9iamVjdCc7XG5cbmltcG9ydCB7IE91dGVyU3Vic2NyaWJlciB9IGZyb20gJy4uL091dGVyU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBJbm5lclN1YnNjcmliZXIgfSBmcm9tICcuLi9Jbm5lclN1YnNjcmliZXInO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9SZXN1bHQgfSBmcm9tICcuLi91dGlsL3N1YnNjcmliZVRvUmVzdWx0JztcblxuLyoqXG4gKiBCcmFuY2ggb3V0IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgYXMgYSBuZXN0ZWQgT2JzZXJ2YWJsZSBzdGFydGluZyBmcm9tXG4gKiBhbiBlbWlzc2lvbiBmcm9tIGBvcGVuaW5nc2AgYW5kIGVuZGluZyB3aGVuIHRoZSBvdXRwdXQgb2YgYGNsb3NpbmdTZWxlY3RvcmBcbiAqIGVtaXRzLlxuICpcbiAqIDxzcGFuIGNsYXNzPVwiaW5mb3JtYWxcIj5JdCdzIGxpa2Uge0BsaW5rIGJ1ZmZlclRvZ2dsZX0sIGJ1dCBlbWl0cyBhIG5lc3RlZFxuICogT2JzZXJ2YWJsZSBpbnN0ZWFkIG9mIGFuIGFycmF5Ljwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3dpbmRvd1RvZ2dsZS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyB3aW5kb3dzIG9mIGl0ZW1zIGl0IGNvbGxlY3RzIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZS4gVGhlIG91dHB1dCBPYnNlcnZhYmxlIGVtaXRzIHdpbmRvd3MgdGhhdCBjb250YWluIHRob3NlIGl0ZW1zXG4gKiBlbWl0dGVkIGJ5IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBiZXR3ZWVuIHRoZSB0aW1lIHdoZW4gdGhlIGBvcGVuaW5nc2BcbiAqIE9ic2VydmFibGUgZW1pdHMgYW4gaXRlbSBhbmQgd2hlbiB0aGUgT2JzZXJ2YWJsZSByZXR1cm5lZCBieVxuICogYGNsb3NpbmdTZWxlY3RvcmAgZW1pdHMgYW4gaXRlbS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FdmVyeSBvdGhlciBzZWNvbmQsIGVtaXQgdGhlIGNsaWNrIGV2ZW50cyBmcm9tIHRoZSBuZXh0IDUwMG1zPC9jYXB0aW9uPlxuICogdmFyIGNsaWNrcyA9IFJ4Lk9ic2VydmFibGUuZnJvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snKTtcbiAqIHZhciBvcGVuaW5ncyA9IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoMTAwMCk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLndpbmRvd1RvZ2dsZShvcGVuaW5ncywgaSA9PlxuICogICBpICUgMiA/IFJ4Lk9ic2VydmFibGUuaW50ZXJ2YWwoNTAwKSA6IFJ4Lk9ic2VydmFibGUuZW1wdHkoKVxuICogKS5tZXJnZUFsbCgpO1xuICogcmVzdWx0LnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayB3aW5kb3d9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dDb3VudH1cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RpbWV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dXaGVufVxuICogQHNlZSB7QGxpbmsgYnVmZmVyVG9nZ2xlfVxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZTxPPn0gb3BlbmluZ3MgQW4gb2JzZXJ2YWJsZSBvZiBub3RpZmljYXRpb25zIHRvIHN0YXJ0IG5ld1xuICogd2luZG93cy5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24odmFsdWU6IE8pOiBPYnNlcnZhYmxlfSBjbG9zaW5nU2VsZWN0b3IgQSBmdW5jdGlvbiB0aGF0IHRha2VzXG4gKiB0aGUgdmFsdWUgZW1pdHRlZCBieSB0aGUgYG9wZW5pbmdzYCBvYnNlcnZhYmxlIGFuZCByZXR1cm5zIGFuIE9ic2VydmFibGUsXG4gKiB3aGljaCwgd2hlbiBpdCBlbWl0cyAoZWl0aGVyIGBuZXh0YCBvciBgY29tcGxldGVgKSwgc2lnbmFscyB0aGF0IHRoZVxuICogYXNzb2NpYXRlZCB3aW5kb3cgc2hvdWxkIGNvbXBsZXRlLlxuICogQHJldHVybiB7T2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+Pn0gQW4gb2JzZXJ2YWJsZSBvZiB3aW5kb3dzLCB3aGljaCBpbiB0dXJuXG4gKiBhcmUgT2JzZXJ2YWJsZXMuXG4gKiBAbWV0aG9kIHdpbmRvd1RvZ2dsZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd1RvZ2dsZTxULCBPPih0aGlzOiBPYnNlcnZhYmxlPFQ+LCBvcGVuaW5nczogT2JzZXJ2YWJsZTxPPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2luZ1NlbGVjdG9yOiAob3BlblZhbHVlOiBPKSA9PiBPYnNlcnZhYmxlPGFueT4pOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgV2luZG93VG9nZ2xlT3BlcmF0b3I8VCwgTz4ob3BlbmluZ3MsIGNsb3NpbmdTZWxlY3RvcikpO1xufVxuXG5jbGFzcyBXaW5kb3dUb2dnbGVPcGVyYXRvcjxULCBPPiBpbXBsZW1lbnRzIE9wZXJhdG9yPFQsIE9ic2VydmFibGU8VD4+IHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wZW5pbmdzOiBPYnNlcnZhYmxlPE8+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNsb3NpbmdTZWxlY3RvcjogKG9wZW5WYWx1ZTogTykgPT4gT2JzZXJ2YWJsZTxhbnk+KSB7XG4gIH1cblxuICBjYWxsKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8T2JzZXJ2YWJsZTxUPj4sIHNvdXJjZTogYW55KTogYW55IHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgV2luZG93VG9nZ2xlU3Vic2NyaWJlcihcbiAgICAgIHN1YnNjcmliZXIsIHRoaXMub3BlbmluZ3MsIHRoaXMuY2xvc2luZ1NlbGVjdG9yXG4gICAgKSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFdpbmRvd0NvbnRleHQ8VD4ge1xuICB3aW5kb3c6IFN1YmplY3Q8VD47XG4gIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAaWdub3JlXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqL1xuY2xhc3MgV2luZG93VG9nZ2xlU3Vic2NyaWJlcjxULCBPPiBleHRlbmRzIE91dGVyU3Vic2NyaWJlcjxULCBhbnk+IHtcbiAgcHJpdmF0ZSBjb250ZXh0czogV2luZG93Q29udGV4dDxUPltdID0gW107XG4gIHByaXZhdGUgb3BlblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGRlc3RpbmF0aW9uOiBTdWJzY3JpYmVyPE9ic2VydmFibGU8VD4+LFxuICAgICAgICAgICAgICBwcml2YXRlIG9wZW5pbmdzOiBPYnNlcnZhYmxlPE8+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNsb3NpbmdTZWxlY3RvcjogKG9wZW5WYWx1ZTogTykgPT4gT2JzZXJ2YWJsZTxhbnk+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICAgIHRoaXMuYWRkKHRoaXMub3BlblN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIG9wZW5pbmdzLCBvcGVuaW5ncykpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgY29uc3QgeyBjb250ZXh0cyB9ID0gdGhpcztcbiAgICBpZiAoY29udGV4dHMpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY29udGV4dHNbaV0ud2luZG93Lm5leHQodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpIHtcblxuICAgIGNvbnN0IHsgY29udGV4dHMgfSA9IHRoaXM7XG4gICAgdGhpcy5jb250ZXh0cyA9IG51bGw7XG5cbiAgICBpZiAoY29udGV4dHMpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcbiAgICAgIGxldCBpbmRleCA9IC0xO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbikge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY29udGV4dHNbaW5kZXhdO1xuICAgICAgICBjb250ZXh0LndpbmRvdy5lcnJvcihlcnIpO1xuICAgICAgICBjb250ZXh0LnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1cGVyLl9lcnJvcihlcnIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCB7IGNvbnRleHRzIH0gPSB0aGlzO1xuICAgIHRoaXMuY29udGV4dHMgPSBudWxsO1xuICAgIGlmIChjb250ZXh0cykge1xuICAgICAgY29uc3QgbGVuID0gY29udGV4dHMubGVuZ3RoO1xuICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbikge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY29udGV4dHNbaW5kZXhdO1xuICAgICAgICBjb250ZXh0LndpbmRvdy5jb21wbGV0ZSgpO1xuICAgICAgICBjb250ZXh0LnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBzdXBlci5fY29tcGxldGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdW5zdWJzY3JpYmUoKSB7XG4gICAgY29uc3QgeyBjb250ZXh0cyB9ID0gdGhpcztcbiAgICB0aGlzLmNvbnRleHRzID0gbnVsbDtcbiAgICBpZiAoY29udGV4dHMpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcbiAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW4pIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNvbnRleHRzW2luZGV4XTtcbiAgICAgICAgY29udGV4dC53aW5kb3cudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgY29udGV4dC5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBub3RpZnlOZXh0KG91dGVyVmFsdWU6IGFueSwgaW5uZXJWYWx1ZTogYW55LFxuICAgICAgICAgICAgIG91dGVySW5kZXg6IG51bWJlciwgaW5uZXJJbmRleDogbnVtYmVyLFxuICAgICAgICAgICAgIGlubmVyU3ViOiBJbm5lclN1YnNjcmliZXI8VCwgYW55Pik6IHZvaWQge1xuXG4gICAgaWYgKG91dGVyVmFsdWUgPT09IHRoaXMub3BlbmluZ3MpIHtcblxuICAgICAgY29uc3QgeyBjbG9zaW5nU2VsZWN0b3IgfSA9IHRoaXM7XG4gICAgICBjb25zdCBjbG9zaW5nTm90aWZpZXIgPSB0cnlDYXRjaChjbG9zaW5nU2VsZWN0b3IpKGlubmVyVmFsdWUpO1xuXG4gICAgICBpZiAoY2xvc2luZ05vdGlmaWVyID09PSBlcnJvck9iamVjdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihlcnJvck9iamVjdC5lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IG5ldyBTdWJqZWN0PFQ+KCk7XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHsgd2luZG93LCBzdWJzY3JpcHRpb24gfTtcbiAgICAgICAgdGhpcy5jb250ZXh0cy5wdXNoKGNvbnRleHQpO1xuICAgICAgICBjb25zdCBpbm5lclN1YnNjcmlwdGlvbiA9IHN1YnNjcmliZVRvUmVzdWx0KHRoaXMsIGNsb3NpbmdOb3RpZmllciwgY29udGV4dCk7XG5cbiAgICAgICAgaWYgKGlubmVyU3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgICAgIHRoaXMuY2xvc2VXaW5kb3codGhpcy5jb250ZXh0cy5sZW5ndGggLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAoPGFueT4gaW5uZXJTdWJzY3JpcHRpb24pLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgIHN1YnNjcmlwdGlvbi5hZGQoaW5uZXJTdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHdpbmRvdyk7XG5cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbG9zZVdpbmRvdyh0aGlzLmNvbnRleHRzLmluZGV4T2Yob3V0ZXJWYWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIG5vdGlmeUVycm9yKGVycjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5lcnJvcihlcnIpO1xuICB9XG5cbiAgbm90aWZ5Q29tcGxldGUoaW5uZXI6IFN1YnNjcmlwdGlvbik6IHZvaWQge1xuICAgIGlmIChpbm5lciAhPT0gdGhpcy5vcGVuU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNsb3NlV2luZG93KHRoaXMuY29udGV4dHMuaW5kZXhPZigoPGFueT4gaW5uZXIpLmNvbnRleHQpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsb3NlV2luZG93KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBjb250ZXh0cyB9ID0gdGhpcztcbiAgICBjb25zdCBjb250ZXh0ID0gY29udGV4dHNbaW5kZXhdO1xuICAgIGNvbnN0IHsgd2luZG93LCBzdWJzY3JpcHRpb24gfSA9IGNvbnRleHQ7XG4gICAgY29udGV4dHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB3aW5kb3cuY29tcGxldGUoKTtcbiAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19