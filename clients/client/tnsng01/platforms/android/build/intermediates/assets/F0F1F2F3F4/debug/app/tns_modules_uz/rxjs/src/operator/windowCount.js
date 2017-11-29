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
var Subscriber_1 = require("../Subscriber");
var Subject_1 = require("../Subject");
function windowCount(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) { startWindowEvery = 0; }
    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
}
exports.windowCount = windowCount;
var WindowCountOperator = (function () {
    function WindowCountOperator(windowSize, startWindowEvery) {
        this.windowSize = windowSize;
        this.startWindowEvery = startWindowEvery;
    }
    WindowCountOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
    };
    return WindowCountOperator;
}());
var WindowCountSubscriber = (function (_super) {
    __extends(WindowCountSubscriber, _super);
    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
        var _this = _super.call(this, destination) || this;
        _this.destination = destination;
        _this.windowSize = windowSize;
        _this.startWindowEvery = startWindowEvery;
        _this.windows = [new Subject_1.Subject()];
        _this.count = 0;
        destination.next(_this.windows[0]);
        return _this;
    }
    WindowCountSubscriber.prototype._next = function (value) {
        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
        var destination = this.destination;
        var windowSize = this.windowSize;
        var windows = this.windows;
        var len = windows.length;
        for (var i = 0; i < len && !this.closed; i++) {
            windows[i].next(value);
        }
        var c = this.count - windowSize + 1;
        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
            windows.shift().complete();
        }
        if (++this.count % startWindowEvery === 0 && !this.closed) {
            var window_1 = new Subject_1.Subject();
            windows.push(window_1);
            destination.next(window_1);
        }
    };
    WindowCountSubscriber.prototype._error = function (err) {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().error(err);
            }
        }
        this.destination.error(err);
    };
    WindowCountSubscriber.prototype._complete = function () {
        var windows = this.windows;
        if (windows) {
            while (windows.length > 0 && !this.closed) {
                windows.shift().complete();
            }
        }
        this.destination.complete();
    };
    WindowCountSubscriber.prototype._unsubscribe = function () {
        this.count = 0;
        this.windows = null;
    };
    return WindowCountSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93Q291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aW5kb3dDb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSw0Q0FBMkM7QUFFM0Msc0NBQXFDO0FBa0RyQyxxQkFBb0QsVUFBa0IsRUFDdkMsZ0JBQTRCO0lBQTVCLGlDQUFBLEVBQUEsb0JBQTRCO0lBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQW1CLENBQUksVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBSEQsa0NBR0M7QUFFRDtJQUVFLDZCQUFvQixVQUFrQixFQUNsQixnQkFBd0I7UUFEeEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNsQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7SUFDNUMsQ0FBQztJQUVELGtDQUFJLEdBQUosVUFBSyxVQUFxQyxFQUFFLE1BQVc7UUFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBT0Q7SUFBdUMseUNBQWE7SUFJbEQsK0JBQXNCLFdBQXNDLEVBQ3hDLFVBQWtCLEVBQ2xCLGdCQUF3QjtRQUY1QyxZQUdFLGtCQUFNLFdBQVcsQ0FBQyxTQUVuQjtRQUxxQixpQkFBVyxHQUFYLFdBQVcsQ0FBMkI7UUFDeEMsZ0JBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUFRO1FBTHBDLGFBQU8sR0FBaUIsQ0FBRSxJQUFJLGlCQUFPLEVBQUssQ0FBRSxDQUFDO1FBQzdDLFdBQUssR0FBVyxDQUFDLENBQUM7UUFNeEIsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxD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dCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuLi9TdWJqZWN0JztcblxuLyoqXG4gKiBCcmFuY2ggb3V0IHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSB2YWx1ZXMgYXMgYSBuZXN0ZWQgT2JzZXJ2YWJsZSB3aXRoIGVhY2hcbiAqIG5lc3RlZCBPYnNlcnZhYmxlIGVtaXR0aW5nIGF0IG1vc3QgYHdpbmRvd1NpemVgIHZhbHVlcy5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SXQncyBsaWtlIHtAbGluayBidWZmZXJDb3VudH0sIGJ1dCBlbWl0cyBhIG5lc3RlZFxuICogT2JzZXJ2YWJsZSBpbnN0ZWFkIG9mIGFuIGFycmF5Ljwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL3dpbmRvd0NvdW50LnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdpbmRvd3Mgb2YgaXRlbXMgaXQgY29sbGVjdHMgZnJvbSB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlLiBUaGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHMgd2luZG93cyBldmVyeSBgc3RhcnRXaW5kb3dFdmVyeWBcbiAqIGl0ZW1zLCBlYWNoIGNvbnRhaW5pbmcgbm8gbW9yZSB0aGFuIGB3aW5kb3dTaXplYCBpdGVtcy4gV2hlbiB0aGUgc291cmNlXG4gKiBPYnNlcnZhYmxlIGNvbXBsZXRlcyBvciBlbmNvdW50ZXJzIGFuIGVycm9yLCB0aGUgb3V0cHV0IE9ic2VydmFibGUgZW1pdHNcbiAqIHRoZSBjdXJyZW50IHdpbmRvdyBhbmQgcHJvcGFnYXRlcyB0aGUgbm90aWZpY2F0aW9uIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZS4gSWYgYHN0YXJ0V2luZG93RXZlcnlgIGlzIG5vdCBwcm92aWRlZCwgdGhlbiBuZXcgd2luZG93cyBhcmVcbiAqIHN0YXJ0ZWQgaW1tZWRpYXRlbHkgYXQgdGhlIHN0YXJ0IG9mIHRoZSBzb3VyY2UgYW5kIHdoZW4gZWFjaCB3aW5kb3cgY29tcGxldGVzXG4gKiB3aXRoIHNpemUgYHdpbmRvd1NpemVgLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPklnbm9yZSBldmVyeSAzcmQgY2xpY2sgZXZlbnQsIHN0YXJ0aW5nIGZyb20gdGhlIGZpcnN0IG9uZTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLndpbmRvd0NvdW50KDMpXG4gKiAgIC5tYXAod2luID0+IHdpbi5za2lwKDEpKSAvLyBza2lwIGZpcnN0IG9mIGV2ZXJ5IDMgY2xpY2tzXG4gKiAgIC5tZXJnZUFsbCgpOyAvLyBmbGF0dGVuIHRoZSBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzXG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPklnbm9yZSBldmVyeSAzcmQgY2xpY2sgZXZlbnQsIHN0YXJ0aW5nIGZyb20gdGhlIHRoaXJkIG9uZTwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgcmVzdWx0ID0gY2xpY2tzLndpbmRvd0NvdW50KDIsIDMpXG4gKiAgIC5tZXJnZUFsbCgpOyAvLyBmbGF0dGVuIHRoZSBPYnNlcnZhYmxlLW9mLU9ic2VydmFibGVzXG4gKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCkpO1xuICpcbiAqIEBzZWUge0BsaW5rIHdpbmRvd31cbiAqIEBzZWUge0BsaW5rIHdpbmRvd1RpbWV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dUb2dnbGV9XG4gKiBAc2VlIHtAbGluayB3aW5kb3dXaGVufVxuICogQHNlZSB7QGxpbmsgYnVmZmVyQ291bnR9XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHdpbmRvd1NpemUgVGhlIG1heGltdW0gbnVtYmVyIG9mIHZhbHVlcyBlbWl0dGVkIGJ5IGVhY2hcbiAqIHdpbmRvdy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnRXaW5kb3dFdmVyeV0gSW50ZXJ2YWwgYXQgd2hpY2ggdG8gc3RhcnQgYSBuZXcgd2luZG93LlxuICogRm9yIGV4YW1wbGUgaWYgYHN0YXJ0V2luZG93RXZlcnlgIGlzIGAyYCwgdGhlbiBhIG5ldyB3aW5kb3cgd2lsbCBiZSBzdGFydGVkXG4gKiBvbiBldmVyeSBvdGhlciB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UuIEEgbmV3IHdpbmRvdyBpcyBzdGFydGVkIGF0IHRoZVxuICogYmVnaW5uaW5nIG9mIHRoZSBzb3VyY2UgYnkgZGVmYXVsdC5cbiAqIEByZXR1cm4ge09ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj59IEFuIE9ic2VydmFibGUgb2Ygd2luZG93cywgd2hpY2ggaW4gdHVyblxuICogYXJlIE9ic2VydmFibGUgb2YgdmFsdWVzLlxuICogQG1ldGhvZCB3aW5kb3dDb3VudFxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0NvdW50PFQ+KHRoaXM6IE9ic2VydmFibGU8VD4sIHdpbmRvd1NpemU6IG51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFdpbmRvd0V2ZXJ5OiBudW1iZXIgPSAwKTogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+PiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IFdpbmRvd0NvdW50T3BlcmF0b3I8VD4od2luZG93U2l6ZSwgc3RhcnRXaW5kb3dFdmVyeSkpO1xufVxuXG5jbGFzcyBXaW5kb3dDb3VudE9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgT2JzZXJ2YWJsZTxUPj4ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2luZG93U2l6ZTogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHN0YXJ0V2luZG93RXZlcnk6IG51bWJlcikge1xuICB9XG5cbiAgY2FsbChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPE9ic2VydmFibGU8VD4+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFdpbmRvd0NvdW50U3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLndpbmRvd1NpemUsIHRoaXMuc3RhcnRXaW5kb3dFdmVyeSkpO1xuICB9XG59XG5cbi8qKlxuICogV2UgbmVlZCB0aGlzIEpTRG9jIGNvbW1lbnQgZm9yIGFmZmVjdGluZyBFU0RvYy5cbiAqIEBpZ25vcmVcbiAqIEBleHRlbmRzIHtJZ25vcmVkfVxuICovXG5jbGFzcyBXaW5kb3dDb3VudFN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcbiAgcHJpdmF0ZSB3aW5kb3dzOiBTdWJqZWN0PFQ+W10gPSBbIG5ldyBTdWJqZWN0PFQ+KCkgXTtcbiAgcHJpdmF0ZSBjb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGVzdGluYXRpb246IFN1YnNjcmliZXI8T2JzZXJ2YWJsZTxUPj4sXG4gICAgICAgICAgICAgIHByaXZhdGUgd2luZG93U2l6ZTogbnVtYmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHN0YXJ0V2luZG93RXZlcnk6IG51bWJlcikge1xuICAgIHN1cGVyKGRlc3RpbmF0aW9uKTtcbiAgICBkZXN0aW5hdGlvbi5uZXh0KHRoaXMud2luZG93c1swXSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IFQpIHtcbiAgICBjb25zdCBzdGFydFdpbmRvd0V2ZXJ5ID0gKHRoaXMuc3RhcnRXaW5kb3dFdmVyeSA+IDApID8gdGhpcy5zdGFydFdpbmRvd0V2ZXJ5IDogdGhpcy53aW5kb3dTaXplO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBjb25zdCB3aW5kb3dTaXplID0gdGhpcy53aW5kb3dTaXplO1xuICAgIGNvbnN0IHdpbmRvd3MgPSB0aGlzLndpbmRvd3M7XG4gICAgY29uc3QgbGVuID0gd2luZG93cy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbiAmJiAhdGhpcy5jbG9zZWQ7IGkrKykge1xuICAgICAgd2luZG93c1tpXS5uZXh0KHZhbHVlKTtcbiAgICB9XG4gICAgY29uc3QgYyA9IHRoaXMuY291bnQgLSB3aW5kb3dTaXplICsgMTtcbiAgICBpZiAoYyA+PSAwICYmIGMgJSBzdGFydFdpbmRvd0V2ZXJ5ID09PSAwICYmICF0aGlzLmNsb3NlZCkge1xuICAgICAgd2luZG93cy5zaGlmdCgpLmNvbXBsZXRlKCk7XG4gICAgfVxuICAgIGlmICgrK3RoaXMuY291bnQgJSBzdGFydFdpbmRvd0V2ZXJ5ID09PSAwICYmICF0aGlzLmNsb3NlZCkge1xuICAgICAgY29uc3Qgd2luZG93ID0gbmV3IFN1YmplY3Q8VD4oKTtcbiAgICAgIHdpbmRvd3MucHVzaCh3aW5kb3cpO1xuICAgICAgZGVzdGluYXRpb24ubmV4dCh3aW5kb3cpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBfZXJyb3IoZXJyOiBhbnkpIHtcbiAgICBjb25zdCB3aW5kb3dzID0gdGhpcy53aW5kb3dzO1xuICAgIGlmICh3aW5kb3dzKSB7XG4gICAgICB3aGlsZSAod2luZG93cy5sZW5ndGggPiAwICYmICF0aGlzLmNsb3NlZCkge1xuICAgICAgICB3aW5kb3dzLnNoaWZ0KCkuZXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jb21wbGV0ZSgpIHtcbiAgICBjb25zdCB3aW5kb3dzID0gdGhpcy53aW5kb3dzO1xuICAgIGlmICh3aW5kb3dzKSB7XG4gICAgICB3aGlsZSAod2luZG93cy5sZW5ndGggPiAwICYmICF0aGlzLmNsb3NlZCkge1xuICAgICAgICB3aW5kb3dzLnNoaWZ0KCkuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF91bnN1YnNjcmliZSgpIHtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLndpbmRvd3MgPSBudWxsO1xuICB9XG59XG4iXX0=