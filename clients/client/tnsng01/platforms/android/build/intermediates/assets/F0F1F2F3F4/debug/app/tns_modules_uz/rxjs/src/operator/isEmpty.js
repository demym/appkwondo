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
function isEmpty() {
    return this.lift(new IsEmptyOperator());
}
exports.isEmpty = isEmpty;
var IsEmptyOperator = (function () {
    function IsEmptyOperator() {
    }
    IsEmptyOperator.prototype.call = function (observer, source) {
        return source.subscribe(new IsEmptySubscriber(observer));
    };
    return IsEmptyOperator;
}());
var IsEmptySubscriber = (function (_super) {
    __extends(IsEmptySubscriber, _super);
    function IsEmptySubscriber(destination) {
        return _super.call(this, destination) || this;
    }
    IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
        var destination = this.destination;
        destination.next(isEmpty);
        destination.complete();
    };
    IsEmptySubscriber.prototype._next = function (value) {
        this.notifyComplete(false);
    };
    IsEmptySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return IsEmptySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNFbXB0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzRW1wdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQTJDO0FBWTNDO0lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFGRCwwQkFFQztBQUVEO0lBQUE7SUFJQSxDQUFDO0lBSEMsOEJBQUksR0FBSixVQUFNLFFBQTZCLEVBQUUsTUFBVztRQUM5QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFPRDtJQUFnQyxxQ0FBZTtJQUM3QywyQkFBWSxXQUFnQztlQUMxQyxrQkFBTSxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVPLDBDQUFjLEdBQXRCLFVBQXVCLE9BQWdCO1FBQ3JDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFckMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQixXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVTLGlDQUFLLEdBQWYsVUFBZ0IsS0FBYztRQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFUyxxQ0FBUyxHQUFuQjtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUFnQyx1QkFBVSxHQW1CekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPcGVyYXRvciB9IGZyb20gJy4uL09wZXJhdG9yJztcbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcblxuLyoqXG4gKiBJZiB0aGUgc291cmNlIE9ic2VydmFibGUgaXMgZW1wdHkgaXQgcmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgdHJ1ZSwgb3RoZXJ3aXNlIGl0IGVtaXRzIGZhbHNlLlxuICpcbiAqIDxpbWcgc3JjPVwiLi9pbWcvaXNFbXB0eS5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBAcmV0dXJuIHtPYnNlcnZhYmxlfSBBbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYSBCb29sZWFuLlxuICogQG1ldGhvZCBpc0VtcHR5XG4gKiBAb3duZXIgT2JzZXJ2YWJsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eTxUPih0aGlzOiBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gIHJldHVybiB0aGlzLmxpZnQobmV3IElzRW1wdHlPcGVyYXRvcigpKTtcbn1cblxuY2xhc3MgSXNFbXB0eU9wZXJhdG9yIGltcGxlbWVudHMgT3BlcmF0b3I8YW55LCBib29sZWFuPiB7XG4gIGNhbGwgKG9ic2VydmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+LCBzb3VyY2U6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IElzRW1wdHlTdWJzY3JpYmVyKG9ic2VydmVyKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIElzRW1wdHlTdWJzY3JpYmVyIGV4dGVuZHMgU3Vic2NyaWJlcjxhbnk+IHtcbiAgY29uc3RydWN0b3IoZGVzdGluYXRpb246IFN1YnNjcmliZXI8Ym9vbGVhbj4pIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUNvbXBsZXRlKGlzRW1wdHk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHRoaXMuZGVzdGluYXRpb247XG5cbiAgICBkZXN0aW5hdGlvbi5uZXh0KGlzRW1wdHkpO1xuICAgIGRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX25leHQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm5vdGlmeUNvbXBsZXRlKGZhbHNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY29tcGxldGUoKSB7XG4gICAgdGhpcy5ub3RpZnlDb21wbGV0ZSh0cnVlKTtcbiAgfVxufVxuIl19