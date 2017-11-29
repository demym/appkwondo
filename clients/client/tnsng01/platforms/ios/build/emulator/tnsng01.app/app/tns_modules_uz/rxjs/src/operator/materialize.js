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
var Notification_1 = require("../Notification");
function materialize() {
    return this.lift(new MaterializeOperator());
}
exports.materialize = materialize;
var MaterializeOperator = (function () {
    function MaterializeOperator() {
    }
    MaterializeOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MaterializeSubscriber(subscriber));
    };
    return MaterializeOperator;
}());
var MaterializeSubscriber = (function (_super) {
    __extends(MaterializeSubscriber, _super);
    function MaterializeSubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    MaterializeSubscriber.prototype._next = function (value) {
        this.destination.next(Notification_1.Notification.createNext(value));
    };
    MaterializeSubscriber.prototype._error = function (err) {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createError(err));
        destination.complete();
    };
    MaterializeSubscriber.prototype._complete = function () {
        var destination = this.destination;
        destination.next(Notification_1.Notification.createComplete());
        destination.complete();
    };
    return MaterializeSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRlcmlhbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSw0Q0FBMkM7QUFDM0MsZ0RBQStDO0FBOEMvQztJQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFGRCxrQ0FFQztBQUVEO0lBQUE7SUFJQSxDQUFDO0lBSEMsa0NBQUksR0FBSixVQUFLLFVBQXVDLEVBQUUsTUFBVztRQUN2RCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFPRDtJQUF1Qyx5Q0FBYTtJQUNsRCwrQkFBWSxXQUF3QztlQUNsRCxrQkFBTSxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVTLHFDQUFLLEdBQWYsVUFBZ0IsS0FBUTtRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQywyQkFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFUyxzQ0FBTSxHQUFoQixVQUFpQixHQUFRO1FBQ3ZCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsV0FBVyxDQUFDLElBQUksQ0FBQywyQkFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hELFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVMseUNBQVMsR0FBbkI7UUFDRSxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3JDLFdBQVcsQ0FBQyxJQUFJLENBQUMsMkJBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBcEJELENBQXVDLHVCQUFVLEdBb0JoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9wZXJhdG9yIH0gZnJvbSAnLi4vT3BlcmF0b3InO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaWJlciB9IGZyb20gJy4uL1N1YnNjcmliZXInO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9uJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFsbCBvZiB0aGUgbm90aWZpY2F0aW9ucyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSBhcyBgbmV4dGBcbiAqIGVtaXNzaW9ucyBtYXJrZWQgd2l0aCB0aGVpciBvcmlnaW5hbCB0eXBlcyB3aXRoaW4ge0BsaW5rIE5vdGlmaWNhdGlvbn1cbiAqIG9iamVjdHMuXG4gKlxuICogPHNwYW4gY2xhc3M9XCJpbmZvcm1hbFwiPldyYXBzIGBuZXh0YCwgYGVycm9yYCBhbmQgYGNvbXBsZXRlYCBlbWlzc2lvbnMgaW5cbiAqIHtAbGluayBOb3RpZmljYXRpb259IG9iamVjdHMsIGVtaXR0ZWQgYXMgYG5leHRgIG9uIHRoZSBvdXRwdXQgT2JzZXJ2YWJsZS5cbiAqIDwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL21hdGVyaWFsaXplLnBuZ1wiIHdpZHRoPVwiMTAwJVwiPlxuICpcbiAqIGBtYXRlcmlhbGl6ZWAgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBgbmV4dGAgbm90aWZpY2F0aW9uIGZvciBlYWNoXG4gKiBgbmV4dGAsIGBlcnJvcmAsIG9yIGBjb21wbGV0ZWAgZW1pc3Npb24gb2YgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBXaGVuIHRoZVxuICogc291cmNlIE9ic2VydmFibGUgZW1pdHMgYGNvbXBsZXRlYCwgdGhlIG91dHB1dCBPYnNlcnZhYmxlIHdpbGwgZW1pdCBgbmV4dGAgYXNcbiAqIGEgTm90aWZpY2F0aW9uIG9mIHR5cGUgXCJjb21wbGV0ZVwiLCBhbmQgdGhlbiBpdCB3aWxsIGVtaXQgYGNvbXBsZXRlYCBhcyB3ZWxsLlxuICogV2hlbiB0aGUgc291cmNlIE9ic2VydmFibGUgZW1pdHMgYGVycm9yYCwgdGhlIG91dHB1dCB3aWxsIGVtaXQgYG5leHRgIGFzIGFcbiAqIE5vdGlmaWNhdGlvbiBvZiB0eXBlIFwiZXJyb3JcIiwgYW5kIHRoZW4gYGNvbXBsZXRlYC5cbiAqXG4gKiBUaGlzIG9wZXJhdG9yIGlzIHVzZWZ1bCBmb3IgcHJvZHVjaW5nIG1ldGFkYXRhIG9mIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgdG9cbiAqIGJlIGNvbnN1bWVkIGFzIGBuZXh0YCBlbWlzc2lvbnMuIFVzZSBpdCBpbiBjb25qdW5jdGlvbiB3aXRoXG4gKiB7QGxpbmsgZGVtYXRlcmlhbGl6ZX0uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+Q29udmVydCBhIGZhdWx0eSBPYnNlcnZhYmxlIHRvIGFuIE9ic2VydmFibGUgb2YgTm90aWZpY2F0aW9uczwvY2FwdGlvbj5cbiAqIHZhciBsZXR0ZXJzID0gUnguT2JzZXJ2YWJsZS5vZignYScsICdiJywgMTMsICdkJyk7XG4gKiB2YXIgdXBwZXJDYXNlID0gbGV0dGVycy5tYXAoeCA9PiB4LnRvVXBwZXJDYXNlKCkpO1xuICogdmFyIG1hdGVyaWFsaXplZCA9IHVwcGVyQ2FzZS5tYXRlcmlhbGl6ZSgpO1xuICogbWF0ZXJpYWxpemVkLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiAvLyBSZXN1bHRzIGluIHRoZSBmb2xsb3dpbmc6XG4gKiAvLyAtIE5vdGlmaWNhdGlvbiB7a2luZDogXCJOXCIsIHZhbHVlOiBcIkFcIiwgZXJyb3I6IHVuZGVmaW5lZCwgaGFzVmFsdWU6IHRydWV9XG4gKiAvLyAtIE5vdGlmaWNhdGlvbiB7a2luZDogXCJOXCIsIHZhbHVlOiBcIkJcIiwgZXJyb3I6IHVuZGVmaW5lZCwgaGFzVmFsdWU6IHRydWV9XG4gKiAvLyAtIE5vdGlmaWNhdGlvbiB7a2luZDogXCJFXCIsIHZhbHVlOiB1bmRlZmluZWQsIGVycm9yOiBUeXBlRXJyb3I6XG4gKiAvLyAgIHgudG9VcHBlckNhc2UgaXMgbm90IGEgZnVuY3Rpb24gYXQgTWFwU3Vic2NyaWJlci5sZXR0ZXJzLm1hcC54XG4gKiAvLyAgIFthcyBwcm9qZWN0XSAoaHR0cDovLzHigKYsIGhhc1ZhbHVlOiBmYWxzZX1cbiAqXG4gKiBAc2VlIHtAbGluayBOb3RpZmljYXRpb259XG4gKiBAc2VlIHtAbGluayBkZW1hdGVyaWFsaXplfVxuICpcbiAqIEByZXR1cm4ge09ic2VydmFibGU8Tm90aWZpY2F0aW9uPFQ+Pn0gQW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzXG4gKiB7QGxpbmsgTm90aWZpY2F0aW9ufSBvYmplY3RzIHRoYXQgd3JhcCB0aGUgb3JpZ2luYWwgZW1pc3Npb25zIGZyb20gdGhlIHNvdXJjZVxuICogT2JzZXJ2YWJsZSB3aXRoIG1ldGFkYXRhLlxuICogQG1ldGhvZCBtYXRlcmlhbGl6ZVxuICogQG93bmVyIE9ic2VydmFibGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGVyaWFsaXplPFQ+KHRoaXM6IE9ic2VydmFibGU8VD4pOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvbjxUPj4ge1xuICByZXR1cm4gdGhpcy5saWZ0KG5ldyBNYXRlcmlhbGl6ZU9wZXJhdG9yKCkpO1xufVxuXG5jbGFzcyBNYXRlcmlhbGl6ZU9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgTm90aWZpY2F0aW9uPFQ+PiB7XG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxOb3RpZmljYXRpb248VD4+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IE1hdGVyaWFsaXplU3Vic2NyaWJlcihzdWJzY3JpYmVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIE1hdGVyaWFsaXplU3Vic2NyaWJlcjxUPiBleHRlbmRzIFN1YnNjcmliZXI8VD4ge1xuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxOb3RpZmljYXRpb248VD4+KSB7XG4gICAgc3VwZXIoZGVzdGluYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KE5vdGlmaWNhdGlvbi5jcmVhdGVOZXh0KHZhbHVlKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Vycm9yKGVycjogYW55KSB7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgIGRlc3RpbmF0aW9uLm5leHQoTm90aWZpY2F0aW9uLmNyZWF0ZUVycm9yKGVycikpO1xuICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbXBsZXRlKCkge1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gdGhpcy5kZXN0aW5hdGlvbjtcbiAgICBkZXN0aW5hdGlvbi5uZXh0KE5vdGlmaWNhdGlvbi5jcmVhdGVDb21wbGV0ZSgpKTtcbiAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=