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
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLDRDQUEyQztBQW9EM0MsZ0JBQStDLFNBQStDLEVBQ3BFLE9BQWE7SUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUhELHdCQUdDO0FBRUQ7SUFDRSx3QkFBb0IsU0FBK0MsRUFDL0MsT0FBYTtRQURiLGNBQVMsR0FBVCxTQUFTLENBQXNDO1FBQy9DLFlBQU8sR0FBUCxPQUFPLENBQU07SUFDakMsQ0FBQztJQUVELDZCQUFJLEdBQUosVUFBSyxVQUF5QixFQUFFLE1BQVc7UUFDekMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQU9EO0lBQWtDLG9DQUFhO0lBSTdDLDBCQUFZLFdBQTBCLEVBQ2xCLFNBQStDLEVBQy9DLE9BQVk7UUFGaEMsWUFHRSxrQkFBTSxXQUFXLENBQUMsU0FDbkI7UUFIbUIsZUFBUyxHQUFULFNBQVMsQ0FBc0M7UUFDL0MsYUFBTyxHQUFQLE9BQU8sQ0FBSztRQUpoQyxXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQU1sQixDQUFDO0lBSVMsZ0NBQUssR0FBZixVQUFnQixLQUFRO1FBQ3RCLElBQUksTUFBVyxDQUFDO1FBQ2hCLElBQUksQ0FBQztZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUF4QkQsQ0FBa0MsdUJBQVUsR0F3QjNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3BlcmF0b3IgfSBmcm9tICcuLi9PcGVyYXRvcic7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUZWFyZG93bkxvZ2ljIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcblxuLyogdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoICovXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyPFQsIFMgZXh0ZW5kcyBUPih0aGlzOiBPYnNlcnZhYmxlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IHZhbHVlIGlzIFMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzQXJnPzogYW55KTogT2JzZXJ2YWJsZTxTPjtcbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXI8VD4odGhpczogT2JzZXJ2YWJsZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmc/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+O1xuLyogdHNsaW50OmVuYWJsZTptYXgtbGluZS1sZW5ndGggKi9cblxuLyoqXG4gKiBGaWx0ZXIgaXRlbXMgZW1pdHRlZCBieSB0aGUgc291cmNlIE9ic2VydmFibGUgYnkgb25seSBlbWl0dGluZyB0aG9zZSB0aGF0XG4gKiBzYXRpc2Z5IGEgc3BlY2lmaWVkIHByZWRpY2F0ZS5cbiAqXG4gKiA8c3BhbiBjbGFzcz1cImluZm9ybWFsXCI+TGlrZVxuICogW0FycmF5LnByb3RvdHlwZS5maWx0ZXIoKV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZmlsdGVyKSxcbiAqIGl0IG9ubHkgZW1pdHMgYSB2YWx1ZSBmcm9tIHRoZSBzb3VyY2UgaWYgaXQgcGFzc2VzIGEgY3JpdGVyaW9uIGZ1bmN0aW9uLjwvc3Bhbj5cbiAqXG4gKiA8aW1nIHNyYz1cIi4vaW1nL2ZpbHRlci5wbmdcIiB3aWR0aD1cIjEwMCVcIj5cbiAqXG4gKiBTaW1pbGFyIHRvIHRoZSB3ZWxsLWtub3duIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2QsIHRoaXMgb3BlcmF0b3JcbiAqIHRha2VzIHZhbHVlcyBmcm9tIHRoZSBzb3VyY2UgT2JzZXJ2YWJsZSwgcGFzc2VzIHRoZW0gdGhyb3VnaCBhIGBwcmVkaWNhdGVgXG4gKiBmdW5jdGlvbiBhbmQgb25seSBlbWl0cyB0aG9zZSB2YWx1ZXMgdGhhdCB5aWVsZGVkIGB0cnVlYC5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbWl0IG9ubHkgY2xpY2sgZXZlbnRzIHdob3NlIHRhcmdldCB3YXMgYSBESVYgZWxlbWVudDwvY2FwdGlvbj5cbiAqIHZhciBjbGlja3MgPSBSeC5PYnNlcnZhYmxlLmZyb21FdmVudChkb2N1bWVudCwgJ2NsaWNrJyk7XG4gKiB2YXIgY2xpY2tzT25EaXZzID0gY2xpY2tzLmZpbHRlcihldiA9PiBldi50YXJnZXQudGFnTmFtZSA9PT0gJ0RJVicpO1xuICogY2xpY2tzT25EaXZzLnN1YnNjcmliZSh4ID0+IGNvbnNvbGUubG9nKHgpKTtcbiAqXG4gKiBAc2VlIHtAbGluayBkaXN0aW5jdH1cbiAqIEBzZWUge0BsaW5rIGRpc3RpbmN0VW50aWxDaGFuZ2VkfVxuICogQHNlZSB7QGxpbmsgZGlzdGluY3RVbnRpbEtleUNoYW5nZWR9XG4gKiBAc2VlIHtAbGluayBpZ25vcmVFbGVtZW50c31cbiAqIEBzZWUge0BsaW5rIHBhcnRpdGlvbn1cbiAqIEBzZWUge0BsaW5rIHNraXB9XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbih2YWx1ZTogVCwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW59IHByZWRpY2F0ZSBBIGZ1bmN0aW9uIHRoYXRcbiAqIGV2YWx1YXRlcyBlYWNoIHZhbHVlIGVtaXR0ZWQgYnkgdGhlIHNvdXJjZSBPYnNlcnZhYmxlLiBJZiBpdCByZXR1cm5zIGB0cnVlYCxcbiAqIHRoZSB2YWx1ZSBpcyBlbWl0dGVkLCBpZiBgZmFsc2VgIHRoZSB2YWx1ZSBpcyBub3QgcGFzc2VkIHRvIHRoZSBvdXRwdXRcbiAqIE9ic2VydmFibGUuIFRoZSBgaW5kZXhgIHBhcmFtZXRlciBpcyB0aGUgbnVtYmVyIGBpYCBmb3IgdGhlIGktdGggc291cmNlXG4gKiBlbWlzc2lvbiB0aGF0IGhhcyBoYXBwZW5lZCBzaW5jZSB0aGUgc3Vic2NyaXB0aW9uLCBzdGFydGluZyBmcm9tIHRoZSBudW1iZXJcbiAqIGAwYC5cbiAqIEBwYXJhbSB7YW55fSBbdGhpc0FyZ10gQW4gb3B0aW9uYWwgYXJndW1lbnQgdG8gZGV0ZXJtaW5lIHRoZSB2YWx1ZSBvZiBgdGhpc2BcbiAqIGluIHRoZSBgcHJlZGljYXRlYCBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge09ic2VydmFibGV9IEFuIE9ic2VydmFibGUgb2YgdmFsdWVzIGZyb20gdGhlIHNvdXJjZSB0aGF0IHdlcmVcbiAqIGFsbG93ZWQgYnkgdGhlIGBwcmVkaWNhdGVgIGZ1bmN0aW9uLlxuICogQG1ldGhvZCBmaWx0ZXJcbiAqIEBvd25lciBPYnNlcnZhYmxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXI8VD4odGhpczogT2JzZXJ2YWJsZTxUPiwgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIpID0+IGJvb2xlYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNBcmc/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHRoaXMubGlmdChuZXcgRmlsdGVyT3BlcmF0b3IocHJlZGljYXRlLCB0aGlzQXJnKSk7XG59XG5cbmNsYXNzIEZpbHRlck9wZXJhdG9yPFQ+IGltcGxlbWVudHMgT3BlcmF0b3I8VCwgVD4ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHByZWRpY2F0ZTogKHZhbHVlOiBULCBpbmRleDogbnVtYmVyKSA9PiBib29sZWFuLFxuICAgICAgICAgICAgICBwcml2YXRlIHRoaXNBcmc/OiBhbnkpIHtcbiAgfVxuXG4gIGNhbGwoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxUPiwgc291cmNlOiBhbnkpOiBUZWFyZG93bkxvZ2ljIHtcbiAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgRmlsdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByZWRpY2F0ZSwgdGhpcy50aGlzQXJnKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXZSBuZWVkIHRoaXMgSlNEb2MgY29tbWVudCBmb3IgYWZmZWN0aW5nIEVTRG9jLlxuICogQGlnbm9yZVxuICogQGV4dGVuZHMge0lnbm9yZWR9XG4gKi9cbmNsYXNzIEZpbHRlclN1YnNjcmliZXI8VD4gZXh0ZW5kcyBTdWJzY3JpYmVyPFQ+IHtcblxuICBjb3VudDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihkZXN0aW5hdGlvbjogU3Vic2NyaWJlcjxUPixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gYm9vbGVhbixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0aGlzQXJnOiBhbnkpIHtcbiAgICBzdXBlcihkZXN0aW5hdGlvbik7XG4gIH1cblxuICAvLyB0aGUgdHJ5IGNhdGNoIGJsb2NrIGJlbG93IGlzIGxlZnQgc3BlY2lmaWNhbGx5IGZvclxuICAvLyBvcHRpbWl6YXRpb24gYW5kIHBlcmYgcmVhc29ucy4gYSB0cnlDYXRjaGVyIGlzIG5vdCBuZWNlc3NhcnkgaGVyZS5cbiAgcHJvdGVjdGVkIF9uZXh0KHZhbHVlOiBUKSB7XG4gICAgbGV0IHJlc3VsdDogYW55O1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSB0aGlzLnByZWRpY2F0ZS5jYWxsKHRoaXMudGhpc0FyZywgdmFsdWUsIHRoaXMuY291bnQrKyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfVxuICB9XG59XG4iXX0=