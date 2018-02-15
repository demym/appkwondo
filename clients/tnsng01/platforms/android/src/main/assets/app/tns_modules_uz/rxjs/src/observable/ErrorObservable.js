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
var Observable_1 = require("../Observable");
var ErrorObservable = (function (_super) {
    __extends(ErrorObservable, _super);
    function ErrorObservable(error, scheduler) {
        var _this = _super.call(this) || this;
        _this.error = error;
        _this.scheduler = scheduler;
        return _this;
    }
    ErrorObservable.create = function (error, scheduler) {
        return new ErrorObservable(error, scheduler);
    };
    ErrorObservable.dispatch = function (arg) {
        var error = arg.error, subscriber = arg.subscriber;
        subscriber.error(error);
    };
    ErrorObservable.prototype._subscribe = function (subscriber) {
        var error = this.error;
        var scheduler = this.scheduler;
        subscriber.syncErrorThrowable = true;
        if (scheduler) {
            return scheduler.schedule(ErrorObservable.dispatch, 0, {
                error: error, subscriber: subscriber
            });
        }
        else {
            subscriber.error(error);
        }
    };
    return ErrorObservable;
}(Observable_1.Observable));
exports.ErrorObservable = ErrorObservable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JPYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXJyb3JPYnNlcnZhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEyQztBQWMzQztJQUFxQyxtQ0FBZTtJQW1EbEQseUJBQW1CLEtBQVUsRUFBVSxTQUFzQjtRQUE3RCxZQUNFLGlCQUFPLFNBQ1I7UUFGa0IsV0FBSyxHQUFMLEtBQUssQ0FBSztRQUFVLGVBQVMsR0FBVCxTQUFTLENBQWE7O0lBRTdELENBQUM7SUFYTSxzQkFBTSxHQUFiLFVBQWMsS0FBVSxFQUFFLFNBQXNCO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLHdCQUFRLEdBQWYsVUFBZ0IsR0FBZ0I7UUFDdEIsSUFBQSxpQkFBSyxFQUFFLDJCQUFVLENBQVM7UUFDbEMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBTVMsb0NBQVUsR0FBcEIsVUFBcUIsVUFBMkI7UUFDOUMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRWpDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFFckMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO2dCQUNyRCxLQUFLLE9BQUEsRUFBRSxVQUFVLFlBQUE7YUFDbEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQXJFRCxDQUFxQyx1QkFBVSxHQXFFOUM7QUFyRVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2NoZWR1bGVyIH0gZnJvbSAnLi4vU2NoZWR1bGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFRlYXJkb3duTG9naWMgfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc3BhdGNoQXJnIHtcbiAgZXJyb3I6IGFueTtcbiAgc3Vic2NyaWJlcjogYW55O1xufVxuXG4vKipcbiAqIFdlIG5lZWQgdGhpcyBKU0RvYyBjb21tZW50IGZvciBhZmZlY3RpbmcgRVNEb2MuXG4gKiBAZXh0ZW5kcyB7SWdub3JlZH1cbiAqIEBoaWRlIHRydWVcbiAqL1xuZXhwb3J0IGNsYXNzIEVycm9yT2JzZXJ2YWJsZSBleHRlbmRzIE9ic2VydmFibGU8YW55PiB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG5vIGl0ZW1zIHRvIHRoZSBPYnNlcnZlciBhbmQgaW1tZWRpYXRlbHlcbiAgICogZW1pdHMgYW4gZXJyb3Igbm90aWZpY2F0aW9uLlxuICAgKlxuICAgKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+SnVzdCBlbWl0cyAnZXJyb3InLCBhbmQgbm90aGluZyBlbHNlLlxuICAgKiA8L3NwYW4+XG4gICAqXG4gICAqIDxpbWcgc3JjPVwiLi9pbWcvdGhyb3cucG5nXCIgd2lkdGg9XCIxMDAlXCI+XG4gICAqXG4gICAqIFRoaXMgc3RhdGljIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgY3JlYXRpbmcgYSBzaW1wbGUgT2JzZXJ2YWJsZSB0aGF0IG9ubHlcbiAgICogZW1pdHMgdGhlIGVycm9yIG5vdGlmaWNhdGlvbi4gSXQgY2FuIGJlIHVzZWQgZm9yIGNvbXBvc2luZyB3aXRoIG90aGVyXG4gICAqIE9ic2VydmFibGVzLCBzdWNoIGFzIGluIGEge0BsaW5rIG1lcmdlTWFwfS5cbiAgICpcbiAgICogQGV4YW1wbGUgPGNhcHRpb24+RW1pdCB0aGUgbnVtYmVyIDcsIHRoZW4gZW1pdCBhbiBlcnJvci48L2NhcHRpb24+XG4gICAqIHZhciByZXN1bHQgPSBSeC5PYnNlcnZhYmxlLnRocm93KG5ldyBFcnJvcignb29wcyEnKSkuc3RhcnRXaXRoKDcpO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCksIGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gICAqXG4gICAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcCBhbmQgZmxhdHRlbiBudW1iZXJzIHRvIHRoZSBzZXF1ZW5jZSAnYScsICdiJywgJ2MnLCBidXQgdGhyb3cgYW4gZXJyb3IgZm9yIDEzPC9jYXB0aW9uPlxuICAgKiB2YXIgaW50ZXJ2YWwgPSBSeC5PYnNlcnZhYmxlLmludGVydmFsKDEwMDApO1xuICAgKiB2YXIgcmVzdWx0ID0gaW50ZXJ2YWwubWVyZ2VNYXAoeCA9PlxuICAgKiAgIHggPT09IDEzID9cbiAgICogICAgIFJ4Lk9ic2VydmFibGUudGhyb3coJ1RoaXJ0ZWVucyBhcmUgYmFkJykgOlxuICAgKiAgICAgUnguT2JzZXJ2YWJsZS5vZignYScsICdiJywgJ2MnKVxuICAgKiApO1xuICAgKiByZXN1bHQuc3Vic2NyaWJlKHggPT4gY29uc29sZS5sb2coeCksIGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gICAqXG4gICAqIEBzZWUge0BsaW5rIGNyZWF0ZX1cbiAgICogQHNlZSB7QGxpbmsgZW1wdHl9XG4gICAqIEBzZWUge0BsaW5rIG5ldmVyfVxuICAgKiBAc2VlIHtAbGluayBvZn1cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IGVycm9yIFRoZSBwYXJ0aWN1bGFyIEVycm9yIHRvIHBhc3MgdG8gdGhlIGVycm9yIG5vdGlmaWNhdGlvbi5cbiAgICogQHBhcmFtIHtTY2hlZHVsZXJ9IFtzY2hlZHVsZXJdIEEge0BsaW5rIElTY2hlZHVsZXJ9IHRvIHVzZSBmb3Igc2NoZWR1bGluZ1xuICAgKiB0aGUgZW1pc3Npb24gb2YgdGhlIGVycm9yIG5vdGlmaWNhdGlvbi5cbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZX0gQW4gZXJyb3IgT2JzZXJ2YWJsZTogZW1pdHMgb25seSB0aGUgZXJyb3Igbm90aWZpY2F0aW9uXG4gICAqIHVzaW5nIHRoZSBnaXZlbiBlcnJvciBhcmd1bWVudC5cbiAgICogQHN0YXRpYyB0cnVlXG4gICAqIEBuYW1lIHRocm93XG4gICAqIEBvd25lciBPYnNlcnZhYmxlXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlKGVycm9yOiBhbnksIHNjaGVkdWxlcj86IElTY2hlZHVsZXIpOiBFcnJvck9ic2VydmFibGUge1xuICAgIHJldHVybiBuZXcgRXJyb3JPYnNlcnZhYmxlKGVycm9yLCBzY2hlZHVsZXIpO1xuICB9XG5cbiAgc3RhdGljIGRpc3BhdGNoKGFyZzogRGlzcGF0Y2hBcmcpIHtcbiAgICBjb25zdCB7IGVycm9yLCBzdWJzY3JpYmVyIH0gPSBhcmc7XG4gICAgc3Vic2NyaWJlci5lcnJvcihlcnJvcik7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZXJyb3I6IGFueSwgcHJpdmF0ZSBzY2hlZHVsZXI/OiBJU2NoZWR1bGVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfc3Vic2NyaWJlKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8YW55Pik6IFRlYXJkb3duTG9naWMge1xuICAgIGNvbnN0IGVycm9yID0gdGhpcy5lcnJvcjtcbiAgICBjb25zdCBzY2hlZHVsZXIgPSB0aGlzLnNjaGVkdWxlcjtcblxuICAgIHN1YnNjcmliZXIuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcblxuICAgIGlmIChzY2hlZHVsZXIpIHtcbiAgICAgIHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoRXJyb3JPYnNlcnZhYmxlLmRpc3BhdGNoLCAwLCB7XG4gICAgICAgIGVycm9yLCBzdWJzY3JpYmVyXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Vic2NyaWJlci5lcnJvcihlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=